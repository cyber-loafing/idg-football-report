from pathlib import Path

from fastapi.testclient import TestClient

from cfa_monitor.config import Settings
from cfa_monitor.main import create_app


def test_frontend_is_not_served_by_fastapi(tmp_path: Path) -> None:
    settings = Settings(
        data_dir=tmp_path,
        db_path=tmp_path / "test.sqlite3",
        configured_fixtures=("cq1wnjypozp0xc3b1z3b2hlp0",),
        monitor_enabled=False,
    )
    client = TestClient(create_app(settings))

    root = client.get("/")
    assert root.status_code == 200
    assert root.json()["frontend"] == "served-by-nginx"

    assert client.get("/ui/?id=cq1wnjypozp0xc3b1z3b2hlp0").status_code == 404
    assert client.get("/admin/perturbation").status_code == 404

    source_config = client.get("/api/source-config")
    assert source_config.status_code == 200
    assert source_config.json()["fitness_game_infos"]["cq1wnjypozp0xc3b1z3b2hlp0"] == "u16"
