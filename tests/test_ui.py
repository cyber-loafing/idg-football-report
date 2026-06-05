from pathlib import Path

from fastapi.testclient import TestClient

from cfa_monitor.config import Settings
from cfa_monitor.main import create_app


def test_report_ui_routes_and_source_config(tmp_path: Path) -> None:
    settings = Settings(
        data_dir=tmp_path,
        db_path=tmp_path / "test.sqlite3",
        configured_fixtures=("cq1wnjypozp0xc3b1z3b2hlp0",),
        monitor_enabled=False,
    )
    client = TestClient(create_app(settings))

    page = client.get("/ui/?id=cq1wnjypozp0xc3b1z3b2hlp0")
    assert page.status_code == 200
    assert "/ui/assets/report.css" in page.text
    assert "/ui/assets/report.js" in page.text

    script = client.get("/ui/assets/report.js")
    assert script.status_code == 200
    assert "cq1wnjypozp0xc3b1z3b2hlp0" in script.text

    source_config = client.get("/api/source-config")
    assert source_config.status_code == 200
    assert source_config.json()["fitness_game_infos"]["cq1wnjypozp0xc3b1z3b2hlp0"] == "u16"
