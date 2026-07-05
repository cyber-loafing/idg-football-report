from cfa_monitor.config import PERFORM_COMPETITION_ID
from cfa_monitor.sources import fixture_id_from_opta_url, fixture_sources


def test_fixture_sources_include_core_and_aux_urls() -> None:
    sources = {source.source: source for source in fixture_sources("abc123", tournament_calendar_id="tmcl1")}

    assert sources["matchstats"].interval_kind == "core"
    assert f"matchstats/{PERFORM_COMPETITION_ID}/abc123" in sources["matchstats"].params["url"]
    assert sources["expected_goals"].interval_kind == "aux"
    assert sources["standings"].params["url"].endswith("tmcl=tmcl1&live=yes&_lcl=zh-cn")


def test_fixture_sources_include_fitness_for_mapped_fixture() -> None:
    sources = {source.source: source for source in fixture_sources("cq1wnjypozp0xc3b1z3b2hlp0", season_year="2026")}

    assert sources["zx_tnsj"].path == "/api/data/zx_tnsj"
    assert sources["zx_tnsj"].params == {
        "year": "cfa2026",
        "tmcl": "u16",
        "fixtureUuid": "cq1wnjypozp0xc3b1z3b2hlp0",
    }


def test_fixture_sources_include_fitness_for_u17_fixtures() -> None:
    sources = {source.source: source for source in fixture_sources("17x6hz87xt7zl404uchnd9jx0", season_year="2026")}

    assert sources["zx_tnsj"].params == {
        "year": "cfa2026",
        "tmcl": "u17",
        "fixtureUuid": "17x6hz87xt7zl404uchnd9jx0",
    }


def test_fixture_id_from_opta_url() -> None:
    url = f"https://api.performfeeds.com/soccerdata/matchplaytime/{PERFORM_COMPETITION_ID}/abc123?_fmt=json&_rt=b"

    assert fixture_id_from_opta_url(url) == "abc123"
