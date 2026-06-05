from __future__ import annotations

from hashlib import sha256
from typing import Any

import httpx

from .config import Settings
from .storage import Database, utc_now


class UpstreamClient:
    def __init__(self, settings: Settings, db: Database):
        self.settings = settings
        self.db = db
        self.client = httpx.AsyncClient(
            timeout=settings.request_timeout_seconds,
            headers={"User-Agent": settings.user_agent, "Accept": "application/json,text/plain,*/*"},
            follow_redirects=True,
        )

    async def close(self) -> None:
        await self.client.aclose()

    def cache_key_for(self, path: str, params: dict[str, Any] | None = None) -> tuple[str, str, str]:
        clean_path = path if path.startswith("/") else f"/{path}"
        request = self.client.build_request("GET", f"{self.settings.remote_bsapi_base}{clean_path}", params=params or {})
        query_string = str(request.url).split("?", 1)[1] if "?" in str(request.url) else ""
        cache_key = sha256(f"{clean_path}?{query_string}".encode("utf-8")).hexdigest()
        return cache_key, clean_path, query_string

    def cached_bsapi(self, path: str, params: dict[str, Any] | None = None) -> Any | None:
        cache_key, _, _ = self.cache_key_for(path, params)
        return self.db.cache_get(cache_key, utc_now())

    async def fetch_bsapi(self, path: str, params: dict[str, Any] | None = None, *, use_cache: bool = True) -> Any:
        params = params or {}
        cache_key, clean_path, query_string = self.cache_key_for(path, params)
        if use_cache:
            cached = self.db.cache_get(cache_key, utc_now())
            if cached is not None:
                return cached

        request = self.client.build_request("GET", f"{self.settings.remote_bsapi_base}{clean_path}", params=params)
        response = await self.client.send(request)
        response.raise_for_status()
        payload = response.json()
        self.db.cache_put(cache_key, clean_path, query_string, payload, self.settings.proxy_cache_ttl_seconds)
        return payload
