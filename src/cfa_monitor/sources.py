from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from urllib.parse import quote

from .config import PERFORM_COMPETITION_ID


@dataclass(frozen=True)
class SourceSpec:
    source: str
    path: str
    params: dict[str, str]
    interval_kind: str
    fixture_id: str | None = None

    @property
    def key(self) -> str:
        if self.fixture_id:
            return f"{self.fixture_id}:{self.source}"
        return self.source


FITNESS_GAME_INFOS = {
    "cuh2yizci0zegngiof1k2tces": "supercup2026",
    "5vkov7ynys30yqg1f2vzue42c": "u19",
    "5vu3vgvpntjg08g2a61ybx0yc": "u19",
    "6typtoaffmdx62lch529476s4": "u20",
    "6uo1pzpra8by5gck3zsfscpw4": "u20",
    "6v12o39cybul13noyge7renmc": "u20",
    "a6hlhu89cw2l1p14plt85rb4k": "u23",
    "a6rcn0iuu9r8pzm2hcy3vr0gk": "u23",
    "7iy43eba4cu5gb50i37tp8tuc": "u23",
    "cpljrc17klz2t5bfy3zx1nz10": "u16",
    "cptt5wn9h9mo0vx2zqngv75ec": "u16",
    "cq1wnjypozp0xc3b1z3b2hlp0": "u16",
    "bh2vvtcxqkz5ppi8ia84xn47o": "u23",
    "bhbgv3yzwv5mrszbwl5tvmo0k": "u23",
    "athcre2fq4vbaykdau8wkf0us": "nationalteam",
}


def zx_list_source() -> SourceSpec:
    return SourceSpec(source="zx_list", path="/api/data/zx_list", params={}, interval_kind="list")


def opta_url(feed: str, fixture_id: str, *, scheme: str = "http", query: str = "_rt=b&_fmt=json") -> str:
    return f"{scheme}://api.performfeeds.com/soccerdata/{feed}/{PERFORM_COMPETITION_ID}/{fixture_id}?{query}"


def fixture_sources(
    fixture_id: str,
    tournament_calendar_id: str | None = None,
    season_year: str | int | None = None,
) -> list[SourceSpec]:
    sources = [
        SourceSpec(
            source="matchstats",
            path="/api/data/zx",
            params={
                "url": opta_url(
                    "matchstats",
                    fixture_id,
                    query="_rt=b&_fmt=json&detailed=yes&_lcl=zh-cn",
                )
            },
            interval_kind="core",
            fixture_id=fixture_id,
        ),
        SourceSpec(
            source="expected_goals",
            path="/api/data/zx",
            params={"url": opta_url("matchexpectedgoals", fixture_id)},
            interval_kind="aux",
            fixture_id=fixture_id,
        ),
        SourceSpec(
            source="passmatrix",
            path="/api/data/zx",
            params={"url": opta_url("passmatrix", fixture_id, query="_rt=b&_fmt=json&_lcl=zh-cn")},
            interval_kind="aux",
            fixture_id=fixture_id,
        ),
        SourceSpec(
            source="matchplaytime",
            path="/api/data/zx",
            params={
                "url": opta_url(
                    "matchplaytime",
                    fixture_id,
                    scheme="https",
                    query="_fmt=json&_rt=b",
                )
            },
            interval_kind="aux",
            fixture_id=fixture_id,
        ),
    ]
    if tournament_calendar_id:
        encoded_tmcl = quote(tournament_calendar_id, safe="")
        sources.extend(
            [
                SourceSpec(
                    source="standings",
                    path="/api/data/zx",
                    params={
                        "url": (
                            f"http://api.performfeeds.com/soccerdata/standings/{PERFORM_COMPETITION_ID}"
                            f"?_rt=b&_fmt=json&tmcl={encoded_tmcl}&live=yes&_lcl=zh-cn"
                        )
                    },
                    interval_kind="aux",
                    fixture_id=fixture_id,
                ),
                SourceSpec(
                    source="squads",
                    path="/api/data/zx",
                    params={
                        "url": (
                            f"http://api.performfeeds.com/soccerdata/squads/{PERFORM_COMPETITION_ID}"
                            f"?_rt=b&_fmt=json&_pgSz=50&_pgNm=1&tmcl={encoded_tmcl}"
                        )
                    },
                    interval_kind="aux",
                    fixture_id=fixture_id,
                ),
            ]
        )
    fitness_group = FITNESS_GAME_INFOS.get(fixture_id)
    if fitness_group:
        year = str(season_year or datetime.now().year)
        if not year.startswith("cfa"):
            year = f"cfa{year}"
        sources.append(
            SourceSpec(
                source="zx_tnsj",
                path="/api/data/zx_tnsj",
                params={"year": year, "tmcl": fitness_group, "fixtureUuid": fixture_id},
                interval_kind="aux",
                fixture_id=fixture_id,
            )
        )
    return sources


def fixture_id_from_opta_url(url: str) -> str | None:
    for marker in (
        "/matchstats/",
        "/matchexpectedgoals/",
        "/passmatrix/",
        "/matchplaytime/",
    ):
        if marker in url:
            tail = url.split(marker, 1)[1]
            parts = tail.split("/")
            if len(parts) >= 2 and parts[0] == PERFORM_COMPETITION_ID:
                return parts[1].split("?", 1)[0]
    return None
