from __future__ import annotations

import asyncio
from hashlib import sha256
import time
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
        self._locks: dict[str, asyncio.Lock] = {}
        self._error_until: dict[str, float] = {}

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

        lock = self._locks.setdefault(cache_key, asyncio.Lock())
        async with lock:
            if use_cache:
                cached = self.db.cache_get(cache_key, utc_now())
                if cached is not None:
                    return cached
                error_until = self._error_until.get(cache_key, 0)
                if error_until > time.monotonic():
                    raise httpx.TimeoutException("Recent upstream failure is cooling down.")

            try:
                payload = await self._send_bsapi_with_retries(clean_path, params)
            except Exception:
                if use_cache:
                    cooldown = max(30.0, self.settings.proxy_cache_ttl_seconds)
                    self._error_until[cache_key] = time.monotonic() + cooldown
                raise

            self._error_until.pop(cache_key, None)
            self.db.cache_put(cache_key, clean_path, query_string, payload, self.settings.proxy_cache_ttl_seconds)
            return payload

    async def _send_bsapi_with_retries(self, clean_path: str, params: dict[str, Any]) -> Any:
        attempts = 4 if is_retryable_fitness_path(clean_path) else 1
        payload: Any = None
        for attempt in range(attempts):
            request = self.client.build_request("GET", f"{self.settings.remote_bsapi_base}{clean_path}", params=params)
            response = await self.client.send(request)
            response.raise_for_status()
            payload = response.json()
            if not is_fitness_detail_error(clean_path, payload):
                return payload
            if attempt < attempts - 1:
                await asyncio.sleep(0.35)
        return payload


def is_retryable_fitness_path(path: str) -> bool:
    return path.rstrip("/").endswith("/api/data/zx_tnsj")


def is_fitness_detail_error(path: str, payload: Any) -> bool:
    if not is_retryable_fitness_path(path):
        return False
    if not (isinstance(payload, dict) and payload.get("success") is True):
        return False
    result = payload.get("result")
    return isinstance(result, dict) and bool(result.get("detail"))
