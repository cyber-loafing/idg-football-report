from __future__ import annotations

import copy
import hashlib
import json
from typing import Any


VOLATILE_ROOT_KEYS = {"timestamp"}
VOLATILE_RESULT_KEYS_FOR_ERRORS = {"token"}


def strip_volatile(value: Any, path: tuple[str, ...] = ()) -> Any:
    if isinstance(value, dict):
        out = {}
        for key, item in value.items():
            if path == () and key in VOLATILE_ROOT_KEYS:
                continue
            if path == ("result",) and key in VOLATILE_RESULT_KEYS_FOR_ERRORS:
                continue
            out[key] = strip_volatile(item, path + (str(key),))
        return out
    if isinstance(value, list):
        return [strip_volatile(item, path) for item in value]
    return value


def canonical_json(value: Any) -> str:
    normalized = strip_volatile(value)
    return json.dumps(normalized, sort_keys=True, ensure_ascii=False, separators=(",", ":"))


def content_hash(value: Any) -> str:
    return hashlib.sha256(canonical_json(value).encode("utf-8")).hexdigest()


def summarize_diff(old: Any | None, new: Any, limit: int = 100) -> dict[str, Any]:
    changes: list[dict[str, Any]] = []
    if old is None:
        return {"added_paths": [{"path": "$", "value": _short(new)}], "changed_paths": [], "removed_paths": [], "truncated": False}

    old_clean = strip_volatile(copy.deepcopy(old))
    new_clean = strip_volatile(copy.deepcopy(new))
    _walk_diff("$", old_clean, new_clean, changes, limit)
    truncated = len(changes) > limit
    changes = changes[:limit]
    return {
        "added_paths": [c for c in changes if c["kind"] == "added"],
        "changed_paths": [c for c in changes if c["kind"] == "changed"],
        "removed_paths": [c for c in changes if c["kind"] == "removed"],
        "truncated": truncated,
    }


def _walk_diff(path: str, old: Any, new: Any, changes: list[dict[str, Any]], limit: int) -> None:
    if len(changes) > limit:
        return
    if isinstance(old, dict) and isinstance(new, dict):
        old_keys = set(old)
        new_keys = set(new)
        for key in sorted(new_keys - old_keys):
            changes.append({"kind": "added", "path": f"{path}.{key}", "value": _short(new[key])})
        for key in sorted(old_keys - new_keys):
            changes.append({"kind": "removed", "path": f"{path}.{key}", "old": _short(old[key])})
        for key in sorted(old_keys & new_keys):
            _walk_diff(f"{path}.{key}", old[key], new[key], changes, limit)
        return
    if isinstance(old, list) and isinstance(new, list):
        shared = min(len(old), len(new))
        for index in range(shared):
            _walk_diff(f"{path}[{index}]", old[index], new[index], changes, limit)
        for index in range(shared, len(new)):
            changes.append({"kind": "added", "path": f"{path}[{index}]", "value": _short(new[index])})
        for index in range(shared, len(old)):
            changes.append({"kind": "removed", "path": f"{path}[{index}]", "old": _short(old[index])})
        return
    if old != new:
        changes.append({"kind": "changed", "path": path, "old": _short(old), "new": _short(new)})


def _short(value: Any, max_len: int = 500) -> Any:
    if isinstance(value, (str, int, float, bool)) or value is None:
        return value
    rendered = json.dumps(value, ensure_ascii=False, sort_keys=True)
    if len(rendered) <= max_len:
        return value
    return rendered[: max_len - 3] + "..."

