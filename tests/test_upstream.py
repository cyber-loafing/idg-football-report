from pathlib import Path

import httpx
import pytest

from cfa_monitor.config import Settings
from cfa_monitor.storage import Database
from cfa_monitor.upstream import UpstreamClient


async def make_client(tmp_path: Path, handler) -> tuple[UpstreamClient, list[httpx.Request]]:
    settings = Settings(
        data_dir=tmp_path,
        db_path=tmp_path / "test.sqlite3",
        proxy_cache_ttl_seconds=30,
    )
    db = Database(settings.db_path)
    db.init()
    upstream = UpstreamClient(settings, db)
    await upstream.client.aclose()
    requests: list[httpx.Request] = []

    async def tracked_handler(request: httpx.Request) -> httpx.Response:
        requests.append(request)
        return await handler(request)

    upstream.client = httpx.AsyncClient(
        transport=httpx.MockTransport(tracked_handler),
        headers={"User-Agent": settings.user_agent, "Accept": "application/json,text/plain,*/*"},
        follow_redirects=True,
    )
    return upstream, requests


@pytest.mark.asyncio
async def test_upstream_uses_proxy_cache_for_repeated_requests(tmp_path: Path) -> None:
    async def handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(200, json={"success": True, "value": "fresh"})

    upstream, requests = await make_client(tmp_path, handler)
    try:
        first = await upstream.fetch_bsapi("/api/data/zx", {"url": "feed"}, use_cache=True)
        second = await upstream.fetch_bsapi("/api/data/zx", {"url": "feed"}, use_cache=True)
    finally:
        await upstream.close()

    assert first == second == {"success": True, "value": "fresh"}
    assert len(requests) == 1


@pytest.mark.asyncio
async def test_upstream_cools_down_repeated_failures(tmp_path: Path) -> None:
    async def handler(request: httpx.Request) -> httpx.Response:
        raise httpx.ReadTimeout("upstream timed out")

    upstream, requests = await make_client(tmp_path, handler)
    try:
        with pytest.raises(httpx.ReadTimeout):
            await upstream.fetch_bsapi("/api/data/zx", {"url": "feed"}, use_cache=True)
        with pytest.raises(httpx.TimeoutException):
            await upstream.fetch_bsapi("/api/data/zx", {"url": "feed"}, use_cache=True)
    finally:
        await upstream.close()

    assert len(requests) == 1


@pytest.mark.asyncio
async def test_upstream_retries_transient_fitness_detail_errors(tmp_path: Path) -> None:
    responses = [
        {"success": True, "result": {"detail": ["读取文件失败: [Errno 32] Broken pipe"]}},
        {"success": True, "result": {"detail": ["读取文件失败: [Errno 32] Broken pipe"]}},
        {"success": True, "result": {"Teams": [{"TeamName": "home"}], "Players": [{"TeamName": "home"}]}},
    ]

    async def handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(200, json=responses.pop(0))

    upstream, requests = await make_client(tmp_path, handler)
    try:
        first = await upstream.fetch_bsapi(
            "/api/data/zx_tnsj",
            {"year": "cfa2026", "tmcl": "u17", "fixtureUuid": "fixture"},
            use_cache=True,
        )
        second = await upstream.fetch_bsapi(
            "/api/data/zx_tnsj",
            {"year": "cfa2026", "tmcl": "u17", "fixtureUuid": "fixture"},
            use_cache=True,
        )
    finally:
        await upstream.close()

    assert first == second == {"success": True, "result": {"Teams": [{"TeamName": "home"}], "Players": [{"TeamName": "home"}]}}
    assert len(requests) == 3
