import json
from pathlib import Path

from cfa_monitor.storage import Database


def load_fixture(name: str) -> dict:
    path = Path(__file__).parent / "fixtures" / name
    return json.loads(path.read_text(encoding="utf-8"))


def test_record_snapshot_ignores_volatile_wrapper_fields(tmp_path: Path) -> None:
    db = Database(tmp_path / "test.sqlite3")
    db.init()

    payload = load_fixture("matchplaytime_error.json")
    first = db.record_snapshot(
        fixture_id="fx",
        source="matchplaytime",
        source_url="url",
        payload=payload,
        success=True,
    )
    changed = dict(payload)
    changed["timestamp"] = 999
    changed["result"] = dict(changed["result"], token="another-token")
    second = db.record_snapshot(
        fixture_id="fx",
        source="matchplaytime",
        source_url="url",
        payload=changed,
        success=True,
    )

    assert first.changed is True
    assert second.changed is False


def test_fixture_upsert_from_matchstats(tmp_path: Path) -> None:
    db = Database(tmp_path / "test.sqlite3")
    db.init()
    payload = load_fixture("matchstats.json")["result"]

    db.upsert_fixture("d4vguyrwop1mcc3d9a9ox280k", payload, source="matchstats")

    fixture = db.get_fixture("d4vguyrwop1mcc3d9a9ox280k")
    assert fixture is not None
    assert fixture["description"] == "中国 vs 俄罗斯"
    assert fixture["home_name"] == "中国"
    assert fixture["away_name"] == "俄罗斯"
    assert fixture["tournament_calendar_id"] == "8onhsmn4720dr6y0l3c77lm38"


def test_fixture_upsert_preserves_existing_metadata_on_sparse_payload(tmp_path: Path) -> None:
    db = Database(tmp_path / "test.sqlite3")
    db.init()
    payload = load_fixture("matchstats.json")["result"]

    db.upsert_fixture("d4vguyrwop1mcc3d9a9ox280k", payload, source="matchstats")
    db.upsert_fixture("d4vguyrwop1mcc3d9a9ox280k", {"squad": []}, source="squads")

    fixture = db.get_fixture("d4vguyrwop1mcc3d9a9ox280k")
    assert fixture is not None
    assert fixture["description"] == "中国 vs 俄罗斯"
    assert fixture["source"] == "squads"
