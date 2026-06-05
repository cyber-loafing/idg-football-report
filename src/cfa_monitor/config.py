from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
import os
import tomllib


PROJECT_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_FIXTURE_ID = "d4vguyrwop1mcc3d9a9ox280k"
PERFORM_COMPETITION_ID = "10n54vtx4fi2s1frl9ipw2t6bu"


@dataclass(frozen=True)
class Settings:
    host: str = "127.0.0.1"
    port: int = 8000
    remote_origin: str = "https://dmpda.thecfa.info"
    remote_bsapi_base: str = "https://dmpda.thecfa.info/bsApi"
    static_origin_base: str = "https://dmpda.thecfa.info/zx"
    project_root: Path = PROJECT_ROOT
    static_root: Path = PROJECT_ROOT / "static_mirror" / "zx"
    data_dir: Path = PROJECT_ROOT / "data"
    db_path: Path = PROJECT_ROOT / "data" / "cfa_monitor.sqlite3"
    configured_fixtures: tuple[str, ...] = (DEFAULT_FIXTURE_ID,)
    monitor_enabled: bool = True
    list_interval_seconds: float = 30.0
    core_interval_seconds: float = 15.0
    aux_interval_seconds: float = 30.0
    max_backoff_seconds: float = 300.0
    request_timeout_seconds: float = 20.0
    proxy_cache_ttl_seconds: float = 12.0
    user_agent: str = (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/125.0 Safari/537.36"
    )
    volatile_root_keys: frozenset[str] = field(default_factory=lambda: frozenset({"timestamp"}))

    @classmethod
    def load(cls, path: Path | None = None) -> "Settings":
        config_path = path or PROJECT_ROOT / "config.toml"
        data: dict = {}
        if config_path.exists():
            data = tomllib.loads(config_path.read_text(encoding="utf-8"))

        server = data.get("server", {})
        monitor = data.get("monitor", {})
        env_disable = os.getenv("CFA_MONITOR_DISABLE", "").lower() in {"1", "true", "yes"}

        return cls(
            host=str(server.get("host", "127.0.0.1")),
            port=int(server.get("port", 8000)),
            configured_fixtures=tuple(monitor.get("fixtures", [DEFAULT_FIXTURE_ID])),
            monitor_enabled=bool(monitor.get("enabled", True)) and not env_disable,
            list_interval_seconds=float(monitor.get("list_interval_seconds", 30)),
            core_interval_seconds=float(monitor.get("core_interval_seconds", 15)),
            aux_interval_seconds=float(monitor.get("aux_interval_seconds", 30)),
            max_backoff_seconds=float(monitor.get("max_backoff_seconds", 300)),
        )


def ensure_runtime_dirs(settings: Settings) -> None:
    settings.data_dir.mkdir(parents=True, exist_ok=True)
    settings.static_root.mkdir(parents=True, exist_ok=True)

