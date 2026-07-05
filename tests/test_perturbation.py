import json
from pathlib import Path

from fastapi.testclient import TestClient

from cfa_monitor.config import Settings
from cfa_monitor.main import _needs_core_refresh, create_app
from cfa_monitor.perturbation import PerturbationService
from cfa_monitor.storage import Database


def load_fixture(name: str) -> dict:
    path = Path(__file__).parent / "fixtures" / name
    return json.loads(path.read_text(encoding="utf-8"))


def test_catalog_covers_visible_sections(tmp_path: Path) -> None:
    service = PerturbationService(Settings(data_dir=tmp_path, db_path=tmp_path / "test.sqlite3", monitor_enabled=False))
    catalog = service.catalog()
    ids = {row["field_id"] for row in catalog}

    assert "team.shots" in ids
    assert "player.attack.goals" in ids
    assert "player.passing.pass_accuracy" in ids
    assert "matrix.pass_value" in ids
    assert "fitness.team.total_distance" in ids
    assert "lineup.pitch" in ids
    assert next(row for row in catalog if row["field_id"] == "player.passing.pass_accuracy")["perturbable"] is False
    assert next(row for row in catalog if row["field_id"] == "lineup.pitch")["perturbable"] is False
    assert next(row for row in catalog if row["field_id"] == "fitness.team.total_distance")["perturbable"] is True


def test_policy_save_and_apply_is_stable_and_clamped(tmp_path: Path) -> None:
    settings = Settings(data_dir=tmp_path, db_path=tmp_path / "test.sqlite3", monitor_enabled=False)
    service = PerturbationService(settings)
    payload = {
        "result": {
            "liveData": {
                "lineUp": [
                    {
                        "stat": [
                            {"type": "totalScoringAtt", "value": "3"},
                            {"type": "ontargetScoringAtt", "value": "2"},
                        ],
                        "player": [
                            {
                                "playerId": "p1",
                                "stat": [
                                    {"type": "totalScoringAtt", "value": "1"},
                                    {"type": "ontargetScoringAtt", "value": "1"},
                                ],
                            }
                        ],
                    }
                ]
            }
        }
    }

    service.save_policy(
        {
            "fields": {
                "team.shots_on": {
                    "enabled": True,
                    "method": "delta",
                    "min": 5,
                    "max": 5,
                    "rounding": "int",
                    "clamp_min": 0,
                    "clamp_max": None,
                }
            }
        }
    )
    first = service.apply_source_payload(payload, "matchstats", "fixture-1")
    second = service.apply_source_payload(payload, "matchstats", "fixture-1")

    assert first == second
    stats = first["result"]["liveData"]["lineUp"][0]["stat"]
    values = {stat["type"]: stat["value"] for stat in stats}
    assert values["ontargetScoringAtt"] == "3"
    assert payload["result"]["liveData"]["lineUp"][0]["stat"][1]["value"] == "2"


def test_latest_endpoint_applies_policy_without_mutating_snapshot(tmp_path: Path) -> None:
    settings = Settings(data_dir=tmp_path, db_path=tmp_path / "test.sqlite3", monitor_enabled=False)
    db = Database(settings.db_path)
    db.init()
    raw = {
        "result": {
            "matchInfo": {"id": "fx"},
            "liveData": {
                "lineUp": [
                    {"stat": [{"type": "totalScoringAtt", "value": "10"}], "player": []},
                    {"stat": [{"type": "totalScoringAtt", "value": "8"}], "player": []},
                ]
            },
        }
    }
    db.ensure_fixture("fx")
    db.record_snapshot(fixture_id="fx", source="matchstats", source_url="url", payload=raw, success=True)
    client = TestClient(create_app(settings))

    unchanged = client.get("/api/fixtures/fx/latest")
    assert unchanged.status_code == 200
    assert unchanged.json()["sources"]["matchstats"]["payload"]["result"]["liveData"]["lineUp"][0]["stat"][0]["value"] == "10"

    policy = client.put(
        "/api/perturbation/policy",
        json={
            "fields": {
                "team.shots": {
                    "enabled": True,
                    "method": "delta",
                    "min": 2,
                    "max": 2,
                    "rounding": "int",
                    "clamp_min": 0,
                    "clamp_max": None,
                }
            }
        },
    )
    assert policy.status_code == 200

    changed = client.get("/api/fixtures/fx/latest")
    assert changed.status_code == 200
    assert changed.json()["sources"]["matchstats"]["payload"]["result"]["liveData"]["lineUp"][0]["stat"][0]["value"] == "12"
    assert db.latest_snapshots("fx")["matchstats"]["payload"]["result"]["liveData"]["lineUp"][0]["stat"][0]["value"] == "10"


def test_perturbation_policy_routes_without_admin_static_hosting(tmp_path: Path) -> None:
    settings = Settings(data_dir=tmp_path, db_path=tmp_path / "test.sqlite3", monitor_enabled=False)
    client = TestClient(create_app(settings))

    assert client.get("/admin/perturbation").status_code == 404

    catalog = client.get("/api/perturbation/catalog")
    assert catalog.status_code == 200
    assert any(row["field_id"] == "team.passes" for row in catalog.json())

    policy = client.get("/api/perturbation/policy")
    assert policy.status_code == 200
    assert policy.json()["fields"]["team.passes"]["enabled"] is False


def test_team_fitness_perturbation_reaggregates_from_players(tmp_path: Path) -> None:
    settings = Settings(data_dir=tmp_path, db_path=tmp_path / "test.sqlite3", monitor_enabled=False)
    service = PerturbationService(settings)
    payload = {
        "result": {
            "Teams": [
                {
                    "TeamName": "home",
                    "TotalDistance": 3000,
                    "SprintingDistance": 300,
                    "OffensiveDistance": 1200,
                    "DefensiveDistance": 900,
                }
            ],
            "Players": [
                {"TeamName": "home", "ShirtNumber": 1, "TotalDistance": 1000, "SprintingDistance": 100},
                {"TeamName": "home", "ShirtNumber": 2, "TotalDistance": 2000, "SprintingDistance": 200},
            ],
        }
    }
    service.save_policy(
        {
            "fields": {
                field_id: {
                    "enabled": True,
                    "method": "percent",
                    "min": 5,
                    "max": 5,
                    "rounding": "int",
                    "clamp_min": 0,
                    "clamp_max": None,
                }
                for field_id in (
                    "fitness.team.total_distance",
                    "fitness.team.sprint_distance",
                    "fitness.team.offensive_distance",
                    "fitness.team.defensive_distance",
                )
            }
        }
    )

    adjusted = service.apply_source_payload(payload, "zx_tnsj", "fixture-1")
    body = adjusted["result"]
    players = body["Players"]
    team = body["Teams"][0]

    for field in ("TotalDistance", "SprintingDistance", "OffensiveDistance", "DefensiveDistance"):
        assert team[field] == sum(player[field] for player in players)

    assert team["TotalDistance"] == 3150
    assert team["SprintingDistance"] == 315
    assert team["OffensiveDistance"] == 1260
    assert team["DefensiveDistance"] == 945


def test_latest_core_refresh_decision_for_stale_active_fixture(tmp_path: Path) -> None:
    settings = Settings(data_dir=tmp_path, db_path=tmp_path / "test.sqlite3", core_interval_seconds=15)
    snapshots = {"matchstats": {"observed_at": "2000-01-01T00:00:00+00:00"}}

    assert _needs_core_refresh({"status": "Playing"}, snapshots, settings) is True
    assert _needs_core_refresh({"status": "Played"}, snapshots, settings) is False
    assert _needs_core_refresh({"status": "Playing"}, {}, settings) is True
