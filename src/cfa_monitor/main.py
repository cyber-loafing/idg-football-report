from __future__ import annotations

import asyncio
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse, JSONResponse, PlainTextResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
import uvicorn

from .config import PERFORM_COMPETITION_ID, Settings, ensure_runtime_dirs
from .events import EventHub, encode_sse
from .monitor import MonitorService
from .perturbation import PerturbationError, PerturbationService
from .sources import FITNESS_GAME_INFOS, fixture_id_from_opta_url
from .storage import Database
from .upstream import UpstreamClient


FINAL_MATCH_STATUSES = {"played", "cancelled", "postponed", "abandoned", "awarded"}


def create_app(settings: Settings | None = None) -> FastAPI:
    settings = settings or Settings.load()
    ensure_runtime_dirs(settings)
    db = Database(settings.db_path)
    db.init()
    events = EventHub()
    upstream = UpstreamClient(settings, db)
    perturbation = PerturbationService(settings)
    monitor = MonitorService(settings, db, upstream, events)
    monitor_task: asyncio.Task[None] | None = None

    @asynccontextmanager
    async def lifespan(app: FastAPI) -> AsyncIterator[None]:
        nonlocal monitor_task
        app.state.settings = settings
        app.state.db = db
        app.state.events = events
        app.state.upstream = upstream
        app.state.perturbation = perturbation
        app.state.monitor = monitor
        monitor.ensure_fixtures(db.list_monitor_candidate_fixture_ids())
        for fixture_id in settings.configured_fixtures:
            monitor.ensure_fixture(fixture_id)
        if settings.monitor_enabled:
            monitor_task = asyncio.create_task(monitor.run_forever(), name="cfa-monitor")
        try:
            yield
        finally:
            await monitor.stop()
            if monitor_task:
                monitor_task.cancel()
                try:
                    await monitor_task
                except asyncio.CancelledError:
                    pass
            await upstream.close()

    app = FastAPI(title="CFA Local Monitor", version="0.1.0", lifespan=lifespan)

    if (settings.static_root / "static").exists():
        app.mount("/zx/static", StaticFiles(directory=settings.static_root / "static"), name="zx-static")
    if (settings.static_root / "assets").exists():
        app.mount("/zx/assets", StaticFiles(directory=settings.static_root / "assets"), name="zx-assets")

    @app.get("/")
    async def root() -> dict[str, str]:
        return {
            "service": "cfa-local-monitor",
            "site": "/zx/",
            "frontend": "served-by-nginx",
            "events": "/api/events",
        }

    @app.get("/zx/")
    @app.get("/zx/index.html")
    async def zx_index():
        index_path = settings.static_root / "index.html"
        if not index_path.exists():
            return PlainTextResponse(
                "Static mirror is missing. Run `uv run cfa-mirror-site` first.",
                status_code=503,
            )
        return FileResponse(index_path, media_type="text/html")

    @app.get("/bsApi/{path:path}")
    async def bsapi_proxy(path: str, request: Request) -> JSONResponse:
        clean_path = f"/{path}"
        params = dict(request.query_params.multi_items())
        url_param = params.get("url")
        if url_param:
            fixture_id = fixture_id_from_opta_url(url_param)
            if fixture_id:
                monitor.ensure_fixture(fixture_id)

        try:
            payload = await upstream.fetch_bsapi(clean_path, params, use_cache=True)
        except Exception as exc:  # noqa: BLE001 - page should degrade to cached data when possible.
            cached = upstream.cached_bsapi(clean_path, params)
            if cached is not None:
                source, fixture_id = perturbation.source_from_bsapi(clean_path, params)
                return JSONResponse(perturbation.apply_source_payload(cached, source, fixture_id))
            raise HTTPException(status_code=502, detail=f"Upstream request failed: {exc}") from exc

        source, fixture_id = perturbation.source_from_bsapi(clean_path, params)
        return JSONResponse(perturbation.apply_source_payload(payload, source, fixture_id))

    @app.get("/api/fixtures")
    async def fixtures() -> list[dict[str, Any]]:
        return db.list_fixtures()

    @app.get("/api/source-config")
    async def source_config() -> dict[str, Any]:
        return {
            "perform_competition_id": PERFORM_COMPETITION_ID,
            "fitness_game_infos": FITNESS_GAME_INFOS,
        }

    @app.get("/api/perturbation/catalog")
    async def perturbation_catalog() -> list[dict[str, Any]]:
        return perturbation.catalog()

    @app.get("/api/perturbation/policy")
    async def perturbation_policy() -> dict[str, Any]:
        try:
            return perturbation.load_policy()
        except PerturbationError as exc:
            raise HTTPException(status_code=500, detail=str(exc)) from exc

    @app.put("/api/perturbation/policy")
    async def update_perturbation_policy(request: Request) -> dict[str, Any]:
        try:
            payload = await request.json()
            return perturbation.save_policy(payload)
        except PerturbationError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc

    @app.get("/api/fixtures/{fixture_id}/latest")
    async def latest(fixture_id: str) -> dict[str, Any]:
        monitor.ensure_fixture(fixture_id)
        fixture = db.get_fixture(fixture_id)
        snapshots = db.latest_snapshots(fixture_id)
        if settings.monitor_enabled and _needs_core_refresh(fixture, snapshots, settings):
            await monitor.poll_fixture_once(fixture_id, source_names={"matchstats"}, force=True)
            fixture = db.get_fixture(fixture_id)
            snapshots = db.latest_snapshots(fixture_id)
        return perturbation.apply_latest_response({"fixture": fixture, "sources": snapshots}, fixture_id)

    @app.get("/api/fixtures/{fixture_id}/history")
    async def history(fixture_id: str, limit: int = 100) -> list[dict[str, Any]]:
        return db.history(fixture_id, limit=max(1, min(limit, 500)))

    @app.get("/api/fixtures/{fixture_id}/changes")
    async def changes(fixture_id: str, limit: int = 100) -> list[dict[str, Any]]:
        return db.changes(fixture_id, limit=max(1, min(limit, 500)))

    @app.get("/api/events")
    async def sse_events() -> StreamingResponse:
        queue = events.subscribe()

        async def stream() -> AsyncIterator[str]:
            try:
                yield encode_sse({"event": "ready"})
                while True:
                    try:
                        event = await asyncio.wait_for(queue.get(), timeout=20)
                        yield encode_sse(event)
                    except asyncio.TimeoutError:
                        yield ": keepalive\n\n"
            finally:
                events.unsubscribe(queue)

        return StreamingResponse(stream(), media_type="text/event-stream")

    return app


def _needs_core_refresh(fixture: dict[str, Any] | None, snapshots: dict[str, Any], settings: Settings) -> bool:
    matchstats = snapshots.get("matchstats")
    if not matchstats:
        return True

    status = str((fixture or {}).get("status") or "").lower()
    if status in FINAL_MATCH_STATUSES:
        return False

    observed_at = _parse_utc(matchstats.get("observed_at"))
    if observed_at is None:
        return True
    max_age = max(30.0, settings.core_interval_seconds)
    return (datetime.now(timezone.utc) - observed_at).total_seconds() > max_age


def _parse_utc(value: Any) -> datetime | None:
    if not isinstance(value, str) or not value:
        return None
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None
    if parsed.tzinfo is None:
        return parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def run() -> None:
    settings = Settings.load()
    uvicorn.run(
        "cfa_monitor.main:create_app",
        factory=True,
        host=settings.host,
        port=settings.port,
        reload=False,
    )


app = create_app()
