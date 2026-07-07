from __future__ import annotations

import json
import re
from itertools import combinations
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
APP_TSX = ROOT / "src" / "App.tsx"
NODE_WIDTH = 280
NODE_HEIGHT = 190
NODE_GAP = 72


def load_nodes() -> dict[str, dict[str, float]]:
    text = APP_TSX.read_text(encoding="utf-8")
    pattern = re.compile(
        r"id:\s*'(?P<id>[^']+)'.*?position:\s*\{\s*x:\s*(?P<x>-?\d+(?:\.\d+)?),\s*y:\s*(?P<y>-?\d+(?:\.\d+)?)\s*\}",
        re.S,
    )
    return {
        match.group("id"): {"x": float(match.group("x")), "y": float(match.group("y"))}
        for match in pattern.finditer(text)
    }


def overlaps(a: dict[str, float], b: dict[str, float]) -> bool:
    horizontal = abs(a["x"] - b["x"]) < NODE_WIDTH + NODE_GAP
    vertical = abs(a["y"] - b["y"]) < NODE_HEIGHT + NODE_GAP
    return horizontal and vertical


def main() -> int:
    nodes = load_nodes()
    issues = []

    for left_id, right_id in combinations(nodes, 2):
        if overlaps(nodes[left_id], nodes[right_id]):
            issues.append({"source": left_id, "target": right_id, "type": "overlap"})

    report = {"ok": not issues, "node_count": len(nodes), "overlap_count": len(issues), "issues": issues}
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if not issues else 1


if __name__ == "__main__":
    raise SystemExit(main())
