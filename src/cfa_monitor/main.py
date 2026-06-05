from __future__ import annotations

import asyncio
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse, JSONResponse, PlainTextResponse, RedirectResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
import uvicorn

from .config import PERFORM_COMPETITION_ID, Settings, ensure_runtime_dirs
from .events import EventHub, encode_sse
from .monitor import MonitorService
from .sources import FITNESS_GAME_INFOS, fixture_id_from_opta_url
from .storage import Database
from .upstream import UpstreamClient


def create_app(settings: Settings | None = None) -> FastAPI:
    settings = settings or Settings.load()
    ensure_runtime_dirs(settings)
    web_root = Path(__file__).resolve().parent / "web"
    db = Database(settings.db_path)
    db.init()
    events = EventHub()
    upstream = UpstreamClient(settings, db)
    monitor = MonitorService(settings, db, upstream, events)
    monitor_task: asyncio.Task[None] | None = None

    @asynccontextmanager
    async def lifespan(app: FastAPI) -> AsyncIterator[None]:
        nonlocal monitor_task
        app.state.settings = settings
        app.state.db = db
        app.state.events = events
        app.state.upstream = upstream
        app.state.monitor = monitor
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
    if web_root.exists():
        app.mount("/ui/assets", StaticFiles(directory=web_root), name="ui-assets")

    @app.get("/")
    async def root() -> dict[str, str]:
        return {
            "service": "cfa-local-monitor",
            "site": "/zx/",
            "report": "/ui/",
            "events": "/api/events",
        }

    @app.get("/ui")
    async def ui_redirect() -> RedirectResponse:
        return RedirectResponse("/ui/")

    @app.get("/ui/")
    @app.get("/ui/{path:path}")
    async def ui_index(path: str = ""):
        index_path = web_root / "report.html"
        if not index_path.exists():
            return PlainTextResponse("Report UI is missing.", status_code=503)
        return FileResponse(index_path, media_type="text/html")

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
            payload = await upstream.fetch_bsapi(clean_path, params, use_cache=False)
        except Exception as exc:  # noqa: BLE001 - page should degrade to cached data when possible.
            cached = upstream.cached_bsapi(clean_path, params)
            if cached is not None:
                return JSONResponse(cached)
            raise HTTPException(status_code=502, detail=f"Upstream request failed: {exc}") from exc

        return JSONResponse(payload)

    @app.get("/api/fixtures")
    async def fixtures() -> list[dict[str, Any]]:
        return db.list_fixtures()

    @app.get("/api/source-config")
    async def source_config() -> dict[str, Any]:
        return {
            "perform_competition_id": PERFORM_COMPETITION_ID,
            "fitness_game_infos": FITNESS_GAME_INFOS,
        }

    @app.get("/api/fixtures/{fixture_id}/latest")
    async def latest(fixture_id: str) -> dict[str, Any]:
        fixture = db.get_fixture(fixture_id)
        if fixture is None:
            monitor.ensure_fixture(fixture_id)
            fixture = db.get_fixture(fixture_id)
        return {"fixture": fixture, "sources": db.latest_snapshots(fixture_id)}

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
