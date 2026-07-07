from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
APP_TSX = ROOT / "src" / "App.tsx"
RULES_JSON = Path(__file__).with_name("layout-rules.json")


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


def load_rules() -> list[dict[str, str]]:
    if not RULES_JSON.exists():
        return []
    return json.loads(RULES_JSON.read_text(encoding="utf-8"))


def check_direction(source: dict[str, float], target: dict[str, float], direction: str) -> bool:
    if direction == "left":
        return source["x"] < target["x"]
    if direction == "right":
        return source["x"] > target["x"]
    if direction == "above":
        return source["y"] < target["y"]
    if direction == "below":
        return source["y"] > target["y"]
    if direction == "before":
        return source["x"] < target["x"] or source["y"] < target["y"]
    raise ValueError(f"Unsupported direction: {direction}")


def main() -> int:
    nodes = load_nodes()
    rules = load_rules()
    issues = []

    for rule in rules:
        source_id = rule["source"]
        target_id = rule["target"]
        direction = rule["direction"]
        if source_id not in nodes or target_id not in nodes:
            issues.append({"rule": rule, "type": "missing_node"})
            continue
        if not check_direction(nodes[source_id], nodes[target_id], direction):
            issues.append(
                {
                    "rule": rule,
                    "type": "wrong_direction",
                    "source_position": nodes[source_id],
                    "target_position": nodes[target_id],
                },
            )

    report = {"ok": not issues, "rule_count": len(rules), "issue_count": len(issues), "issues": issues}
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if not issues else 1


if __name__ == "__main__":
    raise SystemExit(main())
