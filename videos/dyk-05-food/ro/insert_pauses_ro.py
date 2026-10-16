#!/usr/bin/env python3
"""Pauses for the Romanian takes: reuses work/insert_pauses.py UNCHANGED, with its NARR/MIX paths pointed at ro/
and the scenes read from ro/script.ro.json (Romanian pause anchors, same beat lengths as English).
Writes ro/mix/<id>.wav (paused take for the mix) and ro/narration/<id>.paused.json."""
import json
import os
import sys

RO = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(RO, "..", "work"))
import insert_pauses as ip  # noqa: E402

ip.NARR = os.path.join(RO, "narration")
ip.MIX = os.path.join(RO, "mix")


def main():
    script = json.load(open(os.path.join(RO, "script.ro.json"), encoding="utf-8"))
    for sc in script["scenes"]:
        if not sc.get("pauses"):
            continue
        cuts, dur = ip.process(sc["id"], sc["pauses"], sc.get("chunks"))
        print(f"  {sc['id']}: {len(cuts)} pauses, +{sum(s for _, s in cuts):.2f}s → {dur:.2f}s")


if __name__ == "__main__":
    main()
