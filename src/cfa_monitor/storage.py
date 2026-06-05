from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
import json
from pathlib import Path
import sqlite3
from typing import Any

from .hashdiff import content_hash, summarize_diff


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def utc_after(seconds: float) -> str:
    return (datetime.now(timezone.utc) + timedelta(seconds=seconds)).isoformat()


@dataclass(frozen=True)
class SnapshotResult:
    changed: bool
    content_hash: str
    event_id: int | None


class Database:
    def __init__(self, path: Path):
        self.path = path
        self.path.parent.mkdir(parents=True, exist_ok=True)

    def connect(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.path)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA journal_mode=WAL")
        conn.execute("PRAGMA foreign_keys=ON")
        return conn

    def init(self) -> None:
        with self.connect() as conn:
            conn.executescript(
                """
                CREATE TABLE IF NOT EXISTS fixtures (
                    id TEXT PRIMARY KEY,
                    description TEXT,
                    competition TEXT,
                    home_name TEXT,
                    away_name TEXT,
                    local_date TEXT,
                    local_time TEXT,
                    status TEXT,
                    tournament_calendar_id TEXT,
                    stage_id TEXT,
                    series_id TEXT,
                    source TEXT,
                    discovered_at TEXT NOT NULL,
                    updated_at TEXT NOT NULL
                );

                CREATE TABLE IF NOT EXISTS source_snapshots (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    fixture_id TEXT,
                    source TEXT NOT NULL,
                    source_url TEXT,
                    content_hash TEXT NOT NULL,
                    payload_json TEXT NOT NULL,
                    success INTEGER NOT NULL,
                    observed_at TEXT NOT NULL
                );

                CREATE INDEX IF NOT EXISTS idx_snapshots_fixture_source
                    ON source_snapshots(fixture_id, source, id DESC);

                CREATE TABLE IF NOT EXISTS change_events (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    fixture_id TEXT,
                    source TEXT NOT NULL,
                    observed_at TEXT NOT NULL,
                    previous_hash TEXT,
                    current_hash TEXT NOT NULL,
                    diff_json TEXT NOT NULL
                );

                CREATE INDEX IF NOT EXISTS idx_events_fixture
                    ON change_events(fixture_id, id DESC);

                CREATE TABLE IF NOT EXISTS poll_state (
                    source_key TEXT PRIMARY KEY,
                    fixture_id TEXT,
                    source TEXT NOT NULL,
                    source_url TEXT,
                    last_hash TEXT,
                    last_success_at TEXT,
                    last_error_at TEXT,
                    error_count INTEGER NOT NULL DEFAULT 0,
                    next_poll_at TEXT,
                    last_error TEXT
                );

                CREATE TABLE IF NOT EXISTS proxy_cache (
                    cache_key TEXT PRIMARY KEY,
                    path TEXT NOT NULL,
                    query_string TEXT NOT NULL,
                    payload_json TEXT NOT NULL,
                    stored_at TEXT NOT NULL,
                    expires_at TEXT NOT NULL
                );
                """
            )

    def upsert_fixture(self, fixture_id: str, payload: dict[str, Any], source: str) -> None:
        now = utc_now()
        info = payload.get("matchInfo", payload) if isinstance(payload, dict) else {}
        live_data = payload.get("liveData", {}) if isinstance(payload, dict) else {}
        match_details = live_data.get("matchDetails", {}) if isinstance(live_data, dict) else {}
        contestants = info.get("contestant", []) if isinstance(info, dict) else []
        home = next((c for c in contestants if c.get("position") == "home"), contestants[0] if contestants else {})
        away = next((c for c in contestants if c.get("position") == "away"), contestants[1] if len(contestants) > 1 else {})
        competition = info.get("competition", {}) if isinstance(info, dict) else {}
        tournament = info.get("tournamentCalendar", {}) if isinstance(info, dict) else {}
        stage = info.get("stage", {}) if isinstance(info, dict) else {}

        with self.connect() as conn:
            conn.execute(
                """
                INSERT INTO fixtures (
                    id, description, competition, home_name, away_name, local_date, local_time,
                    status, tournament_calendar_id, stage_id, series_id, source,
                    discovered_at, updated_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    description = COALESCE(excluded.description, fixtures.description),
                    competition = COALESCE(excluded.competition, fixtures.competition),
                    home_name = COALESCE(excluded.home_name, fixtures.home_name),
                    away_name = COALESCE(excluded.away_name, fixtures.away_name),
                    local_date = COALESCE(excluded.local_date, fixtures.local_date),
                    local_time = COALESCE(excluded.local_time, fixtures.local_time),
                    status = COALESCE(excluded.status, fixtures.status),
                    tournament_calendar_id = COALESCE(excluded.tournament_calendar_id, fixtures.tournament_calendar_id),
                    stage_id = COALESCE(excluded.stage_id, fixtures.stage_id),
                    series_id = COALESCE(excluded.series_id, fixtures.series_id),
                    source = excluded.source,
                    updated_at = excluded.updated_at
                """,
                (
                    fixture_id,
                    info.get("description"),
                    competition.get("name"),
                    home.get("name") or home.get("shortName"),
                    away.get("name") or away.get("shortName"),
                    info.get("localDate"),
                    info.get("localTime"),
                    match_details.get("matchStatus"),
                    tournament.get("id"),
                    stage.get("id"),
                    info.get("series", {}).get("id") if isinstance(info.get("series"), dict) else None,
                    source,
                    now,
                    now,
                ),
            )

    def ensure_fixture(self, fixture_id: str, source: str = "configured") -> None:
        now = utc_now()
        with self.connect() as conn:
            conn.execute(
                """
                INSERT INTO fixtures (id, source, discovered_at, updated_at)
                VALUES (?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET updated_at = excluded.updated_at
                """,
                (fixture_id, source, now, now),
            )

    def list_fixtures(self) -> list[dict[str, Any]]:
        with self.connect() as conn:
            rows = conn.execute("SELECT * FROM fixtures ORDER BY COALESCE(local_date, '') DESC, id").fetchall()
        return [dict(row) for row in rows]

    def get_fixture(self, fixture_id: str) -> dict[str, Any] | None:
        with self.connect() as conn:
            row = conn.execute("SELECT * FROM fixtures WHERE id = ?", (fixture_id,)).fetchone()
        return dict(row) if row else None

    def record_snapshot(
        self,
        *,
        fixture_id: str | None,
        source: str,
        source_url: str | None,
        payload: Any,
        success: bool,
    ) -> SnapshotResult:
        now = utc_now()
        new_hash = content_hash(payload)
        payload_json = json.dumps(payload, ensure_ascii=False, sort_keys=True)
        source_key = f"{fixture_id}:{source}" if fixture_id else source

        with self.connect() as conn:
            previous = conn.execute(
                """
                SELECT content_hash, payload_json
                FROM source_snapshots
                WHERE fixture_id IS ? AND source = ?
                ORDER BY id DESC
                LIMIT 1
                """,
                (fixture_id, source),
            ).fetchone()
            previous_hash = previous["content_hash"] if previous else None
            old_payload = json.loads(previous["payload_json"]) if previous else None
            changed = previous_hash != new_hash

            conn.execute(
                """
                INSERT INTO source_snapshots (
                    fixture_id, source, source_url, content_hash, payload_json, success, observed_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (fixture_id, source, source_url, new_hash, payload_json, 1 if success else 0, now),
            )

            event_id: int | None = None
            if changed:
                diff = summarize_diff(old_payload, payload)
                cur = conn.execute(
                    """
                    INSERT INTO change_events (
                        fixture_id, source, observed_at, previous_hash, current_hash, diff_json
                    )
                    VALUES (?, ?, ?, ?, ?, ?)
                    """,
                    (fixture_id, source, now, previous_hash, new_hash, json.dumps(diff, ensure_ascii=False)),
                )
                event_id = int(cur.lastrowid)

            conn.execute(
                """
                INSERT INTO poll_state (
                    source_key, fixture_id, source, source_url, last_hash, last_success_at,
                    error_count, next_poll_at, last_error
                )
                VALUES (?, ?, ?, ?, ?, ?, 0, NULL, NULL)
                ON CONFLICT(source_key) DO UPDATE SET
                    last_hash = excluded.last_hash,
                    last_success_at = excluded.last_success_at,
                    error_count = 0,
                    last_error = NULL
                """,
                (source_key, fixture_id, source, source_url, new_hash, now),
            )

        return SnapshotResult(changed=changed, content_hash=new_hash, event_id=event_id)

    def record_poll_error(self, source_key: str, fixture_id: str | None, source: str, source_url: str | None, error: str) -> int:
        now = utc_now()
        with self.connect() as conn:
            row = conn.execute("SELECT error_count FROM poll_state WHERE source_key = ?", (source_key,)).fetchone()
            count = int(row["error_count"]) + 1 if row else 1
            conn.execute(
                """
                INSERT INTO poll_state (
                    source_key, fixture_id, source, source_url, last_error_at, error_count, last_error
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(source_key) DO UPDATE SET
                    last_error_at = excluded.last_error_at,
                    error_count = excluded.error_count,
                    last_error = excluded.last_error
                """,
                (source_key, fixture_id, source, source_url, now, count, error[:1000]),
            )
        return count

    def update_next_poll(self, source_key: str, next_poll_at: str) -> None:
        with self.connect() as conn:
            conn.execute(
                """
                UPDATE poll_state
                SET next_poll_at = ?
                WHERE source_key = ?
                """,
                (next_poll_at, source_key),
            )

    def latest_snapshots(self, fixture_id: str) -> dict[str, Any]:
        with self.connect() as conn:
            rows = conn.execute(
                """
                SELECT s.*
                FROM source_snapshots s
                JOIN (
                    SELECT source, MAX(id) AS id
                    FROM source_snapshots
                    WHERE fixture_id = ?
                    GROUP BY source
                ) latest ON latest.id = s.id
                ORDER BY s.source
                """,
                (fixture_id,),
            ).fetchall()
        return {
            row["source"]: {
                "source": row["source"],
                "source_url": row["source_url"],
                "content_hash": row["content_hash"],
                "success": bool(row["success"]),
                "observed_at": row["observed_at"],
                "payload": json.loads(row["payload_json"]),
            }
            for row in rows
        }

    def history(self, fixture_id: str, limit: int = 100) -> list[dict[str, Any]]:
        with self.connect() as conn:
            rows = conn.execute(
                """
                SELECT id, source, source_url, content_hash, success, observed_at
                FROM source_snapshots
                WHERE fixture_id = ?
                ORDER BY id DESC
                LIMIT ?
                """,
                (fixture_id, limit),
            ).fetchall()
        return [dict(row) | {"success": bool(row["success"])} for row in rows]

    def changes(self, fixture_id: str, limit: int = 100) -> list[dict[str, Any]]:
        with self.connect() as conn:
            rows = conn.execute(
                """
                SELECT *
                FROM change_events
                WHERE fixture_id = ?
                ORDER BY id DESC
                LIMIT ?
                """,
                (fixture_id, limit),
            ).fetchall()
        return [dict(row) | {"diff": json.loads(row["diff_json"])} for row in rows]

    def cache_get(self, cache_key: str, now: str) -> Any | None:
        with self.connect() as conn:
            row = conn.execute(
                "SELECT payload_json FROM proxy_cache WHERE cache_key = ? AND expires_at > ?",
                (cache_key, now),
            ).fetchone()
        return json.loads(row["payload_json"]) if row else None

    def cache_put(self, cache_key: str, path: str, query_string: str, payload: Any, ttl_seconds: float) -> None:
        now_dt = datetime.now(timezone.utc)
        now = now_dt.isoformat()
        expires = datetime.fromtimestamp(now_dt.timestamp() + ttl_seconds, tz=timezone.utc).isoformat()
        with self.connect() as conn:
            conn.execute(
                """
                INSERT INTO proxy_cache (cache_key, path, query_string, payload_json, stored_at, expires_at)
                VALUES (?, ?, ?, ?, ?, ?)
                ON CONFLICT(cache_key) DO UPDATE SET
                    payload_json = excluded.payload_json,
                    stored_at = excluded.stored_at,
                    expires_at = excluded.expires_at
                """,
                (cache_key, path, query_string, json.dumps(payload, ensure_ascii=False), now, expires),
            )
