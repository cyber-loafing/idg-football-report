import json
from pathlib import Path
from typing import Any

import pytest

from cfa_monitor.config import Settings
from cfa_monitor.events import EventHub
from cfa_monitor.monitor import MonitorService, source_payload_success
from cfa_monitor.sources import SourceSpec
from cfa_monitor.storage import Database


def load_fixture(name: str) -> dict:
    path = Path(__file__).parent / "fixtures" / name
    return json.loads(path.read_text(encoding="utf-8"))


def test_source_payload_success_rejects_fitness_detail_errors() -> None:
    payload = {"success": True, "result": {"detail": ["读取文件失败: 550 Failed to open file."]}}

    assert source_payload_success("zx_tnsj", payload) is False
    assert source_payload_success("matchstats", payload) is True


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
    assert len(upstream.calls) == 2
    assert [call[0] for call in upstream.calls] == ["/api/data/zx", "/api/data/zx"]


def test_monitor_uses_live_interval_for_playing_fixture(tmp_path: Path) -> None:
    settings = Settings(
        data_dir=tmp_path,
        db_path=tmp_path / "test.sqlite3",
        configured_fixtures=(),
        core_interval_seconds=100,
        live_interval_seconds=5,
    )
    db = Database(settings.db_path)
    db.init()
    payload = load_fixture("matchstats.json")["result"]
    payload["matchInfo"]["id"] = "playing-fixture"
    payload["liveData"]["matchDetails"]["matchStatus"] = "Playing"
    db.upsert_fixture("playing-fixture", payload, source="matchstats")
    monitor = MonitorService(settings, db, FakeUpstream(), EventHub())  # type: ignore[arg-type]
    source = SourceSpec("matchstats", "/api/data/zx", {"url": "feed"}, "core", "playing-fixture")

    assert monitor._base_interval(source) == 5


def test_monitor_poll_fixture_ids_prioritize_live_and_skip_final(tmp_path: Path) -> None:
    settings = Settings(
        data_dir=tmp_path,
        db_path=tmp_path / "test.sqlite3",
        configured_fixtures=(),
    )
    db = Database(settings.db_path)
    db.init()
    base = load_fixture("matchstats.json")["result"]

    playing = json.loads(json.dumps(base))
    playing["matchInfo"]["id"] = "playing-fixture"
    playing["liveData"]["matchDetails"]["matchStatus"] = "Playing"
    db.upsert_fixture("playing-fixture", playing, source="matchstats")

    fixture = json.loads(json.dumps(base))
    fixture["matchInfo"]["id"] = "fixture-fixture"
    fixture["liveData"]["matchDetails"]["matchStatus"] = "Fixture"
    db.upsert_fixture("fixture-fixture", fixture, source="matchstats")

    played = json.loads(json.dumps(base))
    played["matchInfo"]["id"] = "played-fixture"
    played["liveData"]["matchDetails"]["matchStatus"] = "Played"
    db.upsert_fixture("played-fixture", played, source="matchstats")

    monitor = MonitorService(settings, db, FakeUpstream(), EventHub())  # type: ignore[arg-type]
    monitor.ensure_fixtures(["playing-fixture", "fixture-fixture", "played-fixture"])

    assert monitor._poll_fixture_ids() == ["playing-fixture", "fixture-fixture"]
