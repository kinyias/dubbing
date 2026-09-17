"""
Generic JSON file persistence helpers.

Replaces the repeated open/json.load/json.dump pairs that used to be duplicated
across load_users/save_users, load_voices/save_voices, load_activities/save_activities,
load_history/save_history in backend/app.py (docs/refactor/01-backend-spec.md, Phase 1).

save_json now writes atomically (write to a temp file, then os.replace) instead of
truncating the target file in place, so a crash/power-loss mid-write can't leave a
corrupt/empty JSON file behind. This is a small behavioural improvement over the
original direct `open(path, "w")` writes -- everything else is a pure extraction.

save_json_atomic / load_json_resilient are the designated writers/readers for
crash-critical documents: project.json today and batch.json in Phase 1 (Batch Mode,
design doc §3.1, §6.7#10). Unlike save_json they fsync before replace and rotate a
`.bak` of the previous good version; unlike load_json they quarantine a corrupt main
file to `.corrupt` (never delete it) and fall back to `.bak`, re-seeding the main file.
"""

from __future__ import annotations

import json
import os
import shutil
import tempfile
import threading
import time
from typing import Any, TypeVar

T = TypeVar("T")

_path_locks: dict[str, threading.Lock] = {}
_path_locks_guard = threading.Lock()


def _lock_for(path: str) -> threading.Lock:
    key = os.path.abspath(path)
    with _path_locks_guard:
        lock = _path_locks.get(key)
        if lock is None:
            lock = threading.Lock()
            _path_locks[key] = lock
        return lock


def load_json(path: str, default: T) -> Any:
    """Return the parsed JSON at `path`, or `default` if missing/unreadable.

    The `open()` is inside the try on purpose: it can fail on its own (permission denied, the
    path is a directory, a locked file on Windows, a decoding error) and the whole point of
    passing a default is that the caller does not want to handle that.
    """
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return default


def save_text_atomic(path: str, text: str, *, encoding: str = "utf-8") -> None:
    """Write `text` to `path` atomically (temp file in the same dir, then os.replace).

    Same guarantee save_json gives, for the plain-text exports (SRT/VTT/ASS): a crash, a full
    disk or a killed process mid-write used to leave a TRUNCATED subtitle file where a complete
    one had been — the user's previous export destroyed by the failed one.
    """
    directory = os.path.dirname(path) or "."
    if directory and not os.path.exists(directory):
        os.makedirs(directory, exist_ok=True)
    with _lock_for(path):
        fd, tmp_path = tempfile.mkstemp(dir=directory, prefix=".tmp_")
        try:
            with open(fd, "w", encoding=encoding) as f:
                f.write(text)
            os.replace(tmp_path, path)
        except Exception:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
            raise


def save_json(path: str, data: Any) -> None:
    """Write `data` to `path` as indented UTF-8 JSON, atomically."""
    directory = os.path.dirname(path) or "."
    if directory and not os.path.exists(directory):
        os.makedirs(directory, exist_ok=True)
    with _lock_for(path):
        fd, tmp_path = tempfile.mkstemp(dir=directory, prefix=".tmp_")
        try:
            with open(fd, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            os.replace(tmp_path, path)
        except Exception:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
            raise


def save_json_atomic(
    path: str, data: Any, *, keep_bak: bool = True, indent: int = 2
) -> None:
    """Crash-safe write of `data` to `path` with fsync + optional `.bak` rotation.

    Writes to a temp file in the SAME directory (⇒ same volume ⇒ os.replace is atomic),
    fsyncs the file descriptor before closing, rotates the previous good version to
    `path + '.bak'` (a cheap rename), then os.replace(tmp, path). Designated writer for
    project.json / batch.json (see module docstring). There is a brief window between the
    main→.bak rename and tmp→main replace where `path` is momentarily absent; readers must
    use load_json_resilient (which falls back to `.bak`).
    """
    directory = os.path.dirname(path) or "."
    if directory and not os.path.exists(directory):
        os.makedirs(directory, exist_ok=True)
    with _lock_for(path):
        fd, tmp_path = tempfile.mkstemp(dir=directory, prefix=".tmp_")
        try:
            with open(fd, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=indent)
                f.flush()
                os.fsync(f.fileno())
            if keep_bak and os.path.exists(path):
                os.replace(path, path + ".bak")
            os.replace(tmp_path, path)
        except Exception:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
            raise


def load_json_resilient(path: str) -> tuple[Any | None, str]:
    """Read `path`, falling back to `path + '.bak'` if the main file is corrupt.

    Returns (data, source) with source in {'main', 'bak', 'none'}:
      - main parses     → (data, 'main')
      - main corrupt     → quarantine to `path + '.corrupt'` (never deleted; epoch suffix
                          if one already exists), then try `.bak`; on success copy the bak
                          back over the main file to re-seed it and return (data, 'bak')
      - nothing readable → (None, 'none')
    """
    if os.path.exists(path):
        try:
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f), "main"
        except Exception:
            corrupt = path + ".corrupt"
            if os.path.exists(corrupt):
                corrupt = f"{path}.corrupt.{int(time.time())}"
            try:
                os.replace(path, corrupt)
            except Exception:
                pass

    bak = path + ".bak"
    if os.path.exists(bak):
        try:
            with open(bak, "r", encoding="utf-8") as f:
                data = json.load(f)
            try:
                shutil.copy2(bak, path)
            except Exception:
                pass
            return data, "bak"
        except Exception:
            pass

    return None, "none"
