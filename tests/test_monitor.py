import json
from pathlib import Path
from typing import Any

import pytest

from cfa_monitor.config import Settings
from cfa_monitor.events import EventHub
from cfa_monitor.monitor import MonitorService
from cfa_monitor.storage import Database


def load_fixture(name: str) -> dict:
    path = Path(__file__).parent / "fixtures" / name
    return json.loads(path.read_text(encoding="utf-8"))


class FakeUpstream:
    def __init__(self) -> None:
        self.calls: list[tuple[str, dict[str, Any]]] = []

    async def fetch_bsapi(self, path: str, params: dict[str, Any] | None = None, *, use_cache: bool = True) -> Any:
        self.calls.append((path, params or {}))
        if path == "/api/data/zx_list":
            return load_fixture("zx_list.json")
        return load_fixture("matchstats.json")


@pytest.mark.asyncio
async def test_monitor_discovers_fixtures_and_records_snapshots(tmp_path: Path) -> None:
    settings = Settings(
        data_dir=tmp_path,
        db_path=tmp_path / "test.sqlite3",
        configured_fixtures=("d4vguyrwop1mcc3d9a9ox280k",),
        monitor_enabled=False,
        list_interval_seconds=100,
        core_interval_seconds=100,
        aux_interval_seconds=100,
    )
    db = Database(settings.db_path)
    db.init()
    upstream = FakeUpstream()
    monitor = MonitorService(settings, db, upstream, EventHub())  # type: ignore[arg-type]

    await monitor.poll_once()

    ids = {fixture["id"] for fixture in db.list_fixtures()}
    assert "fixture-list-1" in ids
    assert "d4vguyrwop1mcc3d9a9ox280k" in ids
    assert db.latest_snapshots("d4vguyrwop1mcc3d9a9ox280k")["matchstats"]["success"] is True


@pytest.mark.asyncio
async def test_monitor_can_force_refresh_single_fixture(tmp_path: Path) -> None:
    settings = Settings(
        data_dir=tmp_path,
        db_path=tmp_path / "test.sqlite3",
        configured_fixtures=(),
        monitor_enabled=False,
        list_interval_seconds=100,
        core_interval_seconds=100,
        aux_interval_seconds=100,
    )
    db = Database(settings.db_path)
    db.init()
    upstream = FakeUpstream()
    monitor = MonitorService(settings, db, upstream, EventHub())  # type: ignore[arg-type]

    await monitor.poll_fixture_once("runtime-fixture", source_names={"matchstats"}, force=True)
    await monitor.poll_fixture_once("runtime-fixture", source_names={"matchstats"}, force=True)

    assert db.latest_snapshots("runtime-fixture")["matchstats"]["success"] is True
    assert len(upstream.calls) == 1
    assert upstream.calls[0][0] == "/api/data/zx"
