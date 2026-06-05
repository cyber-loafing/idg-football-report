from __future__ import annotations

import asyncio
from collections.abc import Iterable
import time
from typing import Any

from .config import Settings
from .events import EventHub
from .sources import SourceSpec, fixture_sources, zx_list_source
from .storage import Database, utc_after, utc_now
from .upstream import UpstreamClient


class MonitorService:
    def __init__(self, settings: Settings, db: Database, upstream: UpstreamClient, events: EventHub):
        self.settings = settings
        self.db = db
        self.upstream = upstream
        self.events = events
        self._fixture_ids: set[str] = set(settings.configured_fixtures)
        self._stop = asyncio.Event()
        self._next_due: dict[str, float] = {}
        self._error_counts: dict[str, int] = {}

    def ensure_fixture(self, fixture_id: str) -> None:
        if not fixture_id:
            return
        self._fixture_ids.add(fixture_id)
        self.db.ensure_fixture(fixture_id, source="runtime")

    def ensure_fixtures(self, fixture_ids: Iterable[str]) -> None:
        for fixture_id in fixture_ids:
            self.ensure_fixture(fixture_id)

    async def run_forever(self) -> None:
        self.db.init()
        self.ensure_fixtures(self.settings.configured_fixtures)
        while not self._stop.is_set():
            await self.poll_once()
            try:
                await asyncio.wait_for(self._stop.wait(), timeout=1.0)
            except asyncio.TimeoutError:
                pass

    async def stop(self) -> None:
        self._stop.set()

    async def poll_once(self) -> None:
        await self._poll_source(zx_list_source())
        fixtures = list(self._fixture_ids)
        for fixture_id in fixtures:
            fixture = self.db.get_fixture(fixture_id) or {}
            tmcl = fixture.get("tournament_calendar_id")
            season_year = self._season_year(fixture)
            for source in fixture_sources(fixture_id, tournament_calendar_id=tmcl, season_year=season_year):
                await self._poll_source(source)

    async def _poll_source(self, source: SourceSpec) -> None:
        now = time.monotonic()
        if self._next_due.get(source.key, 0) > now:
            return
        source_url = source.params.get("url")
        try:
            payload = await self.upstream.fetch_bsapi(source.path, source.params, use_cache=False)
            success = bool(isinstance(payload, dict) and payload.get("success") is True)
            snapshot = self.db.record_snapshot(
                fixture_id=source.fixture_id,
                source=source.source,
                source_url=source_url,
                payload=payload,
                success=success,
            )
            self._extract_fixtures(source, payload)
            self._schedule_success(source)
            if snapshot.changed:
                await self.events.publish(
                    {
                        "event": "change",
                        "fixture_id": source.fixture_id,
                        "source": source.source,
                        "content_hash": snapshot.content_hash,
                        "event_id": snapshot.event_id,
                        "observed_at": utc_now(),
                    }
                )
        except Exception as exc:  # noqa: BLE001 - background monitor must keep running.
            count = self.db.record_poll_error(
                source.key,
                source.fixture_id,
                source.source,
                source_url,
                f"{type(exc).__name__}: {exc}",
            )
            self._schedule_error(source, count)
            await self.events.publish(
                {
                    "event": "poll_error",
                    "fixture_id": source.fixture_id,
                    "source": source.source,
                    "error_count": count,
                    "error": str(exc),
                    "observed_at": utc_now(),
                }
            )

    def _base_interval(self, source: SourceSpec) -> float:
        if source.interval_kind == "list":
            return self.settings.list_interval_seconds
        if source.interval_kind == "core":
            return self.settings.core_interval_seconds
        return self.settings.aux_interval_seconds

    def _season_year(self, fixture: dict[str, Any]) -> str | None:
        local_date = fixture.get("local_date")
        if isinstance(local_date, str) and len(local_date) >= 4 and local_date[:4].isdigit():
            return local_date[:4]
        return None

    def _schedule_success(self, source: SourceSpec) -> None:
        self._error_counts[source.key] = 0
        delay = self._base_interval(source)
        self._next_due[source.key] = time.monotonic() + delay
        self.db.update_next_poll(source.key, utc_after(delay))

    def _schedule_error(self, source: SourceSpec, error_count: int) -> None:
        self._error_counts[source.key] = error_count
        base = self._base_interval(source)
        delay = min(self.settings.max_backoff_seconds, base * (2 ** min(error_count - 1, 6)))
        self._next_due[source.key] = time.monotonic() + delay
        self.db.update_next_poll(source.key, utc_after(delay))

    def _extract_fixtures(self, source: SourceSpec, payload: Any) -> None:
        if not isinstance(payload, dict) or not payload.get("success"):
            return
        result = payload.get("result")
        if not isinstance(result, dict):
            return

        if source.source == "zx_list":
            matches = result.get("match") or []
            if isinstance(matches, list):
                for item in matches:
                    if not isinstance(item, dict):
                        continue
                    info = item.get("matchInfo") or {}
                    fixture_id = info.get("id")
                    if fixture_id:
                        self._fixture_ids.add(fixture_id)
                        self.db.upsert_fixture(fixture_id, item, source="zx_list")
            return

        info = result.get("matchInfo")
        if not isinstance(info, dict):
            return
        fixture_id = info.get("id") or source.fixture_id
        if fixture_id:
            self._fixture_ids.add(fixture_id)
            self.db.upsert_fixture(fixture_id, result, source=source.source)
