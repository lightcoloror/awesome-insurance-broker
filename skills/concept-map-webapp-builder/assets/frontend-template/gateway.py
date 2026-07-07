from __future__ import annotations

import json
import mimetypes
import os
import subprocess
import sys
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"
CONFIG_PATH = ROOT / "gateway_config.json"


def load_config() -> dict:
    return json.loads(CONFIG_PATH.read_text(encoding="utf-8"))


def resolve_target(target: str) -> Path:
    path = Path(target)
    if not path.is_absolute():
        path = (ROOT / path).resolve()
    return path


def open_entry(entry: dict) -> dict:
    entry_type = entry.get("type")
    target = entry.get("target")
    if not entry_type or not target:
        return {"ok": False, "error": "entry requires type and target"}

    if entry_type == "url":
        if not (target.startswith("http://127.0.0.1") or target.startswith("http://localhost") or target.startswith("https://")):
            return {"ok": False, "error": "url target is not allowed by the template gateway"}
        webbrowser.open(target)
        return {"ok": True, "opened": target, "type": entry_type}

    path = resolve_target(target)
    if entry_type in {"file", "directory"}:
        if not path.exists():
            return {"ok": False, "error": f"target does not exist: {path}"}
        if sys.platform.startswith("win"):
            os.startfile(path)  # type: ignore[attr-defined]
        elif sys.platform == "darwin":
            subprocess.Popen(["open", str(path)])
        else:
            subprocess.Popen(["xdg-open", str(path)])
        return {"ok": True, "opened": str(path), "type": entry_type}

    if entry_type == "app":
        subprocess.Popen([str(path)], cwd=str(path.parent if path.exists() else ROOT))
        return {"ok": True, "opened": str(path), "type": entry_type}

    if entry_type == "python_ui":
        if not path.exists():
            return {"ok": False, "error": f"target does not exist: {path}"}
        subprocess.Popen([sys.executable, str(path)], cwd=str(path.parent))
        return {"ok": True, "opened": str(path), "type": entry_type}

    return {"ok": False, "error": f"unsupported entry type: {entry_type}"}


class GatewayHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path: str) -> str:
        parsed = urlparse(path)
        route = parsed.path
        if route == "/":
            route = "/index.html"
        return str((DIST / route.lstrip("/")).resolve())

    def send_json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        config = load_config()
        path = urlparse(self.path).path
        if path == "/api/health":
            self.send_json(200, {"ok": True, "service": config.get("service", "concept-map-local-gateway")})
            return
        if path.startswith("/api/entries/") and path.endswith("/entry"):
            entry_id = path.split("/")[3]
            entry = config.get("entries", {}).get(entry_id)
            self.send_json(200 if entry else 404, {"ok": bool(entry), "entryId": entry_id, "entry": entry})
            return
        return super().do_GET()

    def do_POST(self) -> None:
        config = load_config()
        path = urlparse(self.path).path
        if path.startswith("/api/entries/") and path.endswith("/open"):
            entry_id = path.split("/")[3]
            entry = config.get("entries", {}).get(entry_id)
            if not entry:
                self.send_json(404, {"ok": False, "error": f"unknown entry: {entry_id}"})
                return
            result = open_entry(entry)
            self.send_json(200 if result.get("ok") else 400, result)
            return
        self.send_json(404, {"ok": False, "error": "not found"})


def main() -> int:
    config = load_config()
    if not DIST.exists():
        print("dist/ not found. Run npm run build first.", file=sys.stderr)
        return 1
    handler = GatewayHandler
    mimetypes.add_type("application/javascript", ".js")
    server = ThreadingHTTPServer((config.get("host", "127.0.0.1"), int(config.get("port", 5178))), handler)
    print(f"Serving concept map gateway at http://{server.server_address[0]}:{server.server_address[1]}")
    server.serve_forever()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
