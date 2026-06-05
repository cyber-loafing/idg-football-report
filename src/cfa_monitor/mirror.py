from __future__ import annotations

from collections import deque
import argparse
import json
from pathlib import Path
import re
import urllib.error
import urllib.request

from .config import Settings, ensure_runtime_dirs


STATIC_RE = re.compile(r"(?:/zx/)?((?:static|assets)/[A-Za-z0-9_./~@:+-]+)")
SRC_RE = re.compile(r"""(?:src|href)=['"](/zx/[^'"]+)['"]""")
CHUNK_RE = re.compile(r'"([A-Za-z0-9_~-]+)":"([a-f0-9]{8,})"')
BSAPI_ORIGIN = "https://dmpda.thecfa.info/bsApi"


def download(url: str) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": Settings().user_agent})
    with urllib.request.urlopen(request, timeout=30) as response:  # noqa: S310 - controlled public site mirror.
        return response.read()


def patch_text(path: str, data: bytes) -> bytes:
    try:
        text = data.decode("utf-8")
    except UnicodeDecodeError:
        return data
    if path.endswith(".js"):
        text = text.replace(BSAPI_ORIGIN, "/bsApi")
    return text.encode("utf-8")


def discover_assets(path: str, data: bytes) -> set[str]:
    try:
        text = data.decode("utf-8")
    except UnicodeDecodeError:
        return set()
    found: set[str] = set()
    for match in SRC_RE.findall(text):
        found.add(match.removeprefix("/zx/"))
    for match in STATIC_RE.findall(text):
        if match.startswith(("static/", "assets/")) and not match.endswith("/") and "data:" not in match:
            found.add(match)
    for name, hash_part in CHUNK_RE.findall(text):
        if name.startswith("pages-"):
            found.add(f"static/js/{name}.{hash_part}.js")
    return found


def mirror_site(settings: Settings, *, force: bool = False) -> dict[str, object]:
    ensure_runtime_dirs(settings)
    root = settings.static_root
    queue: deque[str] = deque(["index.html"])
    seen: set[str] = set()
    downloaded: list[str] = []
    failed: dict[str, str] = {}

    while queue:
        path = queue.popleft()
        if path in seen:
            continue
        seen.add(path)

        url_path = "" if path == "index.html" else path
        url = f"{settings.static_origin_base.rstrip('/')}/{url_path}".rstrip("/")
        if path == "index.html":
            url = f"{settings.static_origin_base.rstrip('/')}/"
        dest = root / path
        try:
            if dest.exists() and not force:
                data = dest.read_bytes()
            else:
                data = download(url)
                data = patch_text(path, data)
                dest.parent.mkdir(parents=True, exist_ok=True)
                dest.write_bytes(data)
            downloaded.append(path)
            for asset in discover_assets(path, data):
                if asset not in seen:
                    queue.append(asset)
        except urllib.error.HTTPError as exc:
            failed[path] = f"HTTP {exc.code}"
        except Exception as exc:  # noqa: BLE001 - continue mirroring remaining assets.
            failed[path] = f"{type(exc).__name__}: {exc}"

    manifest = {
        "origin": settings.static_origin_base,
        "downloaded": downloaded,
        "failed": failed,
    }
    (root / "mirror-manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    return manifest


def main() -> None:
    parser = argparse.ArgumentParser(description="Mirror the CFA SPA static assets locally.")
    parser.add_argument("--config", type=Path, default=None)
    parser.add_argument("--force", action="store_true", help="Re-download files even when local copies exist.")
    args = parser.parse_args()
    settings = Settings.load(args.config)
    manifest = mirror_site(settings, force=args.force)
    print(json.dumps(manifest, ensure_ascii=False, indent=2))
