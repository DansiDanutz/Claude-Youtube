#!/usr/bin/env python3
"""Regenerate narration/script.json from ../SCRIPT.md (run after every script edit, before gen_voice.py).
Lines look like:  **dol07** [visual note]\n"VO text"  — dol19a/dol19b are the two endings; voice only the true one."""
import json, os, re, sys
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = open(os.path.join(EP, "SCRIPT.md"), encoding="utf-8").read()
scenes = []
for m in re.finditer(r'\*\*(dol\d+[ab]?)\*\* \[([^\]]*)\]\n(.*?)(?=\n\n)', src, flags=re.S):
    scenes.append({"id": m.group(1), "visual": " ".join(m.group(2).split()), "text": " ".join(m.group(3).split()).strip('"')})
bad = [s["id"] for s in scenes if "❓" in s["text"] or "placeholder" in s["text"].lower()]
out = os.path.join(EP, "work", "narration", "script.json")
json.dump({"episode": os.path.basename(EP), "narrator": "Brian",
           "status": ("BLOCKED — placeholders in " + ",".join(bad)) if bad else "ready for Dan's sign-off",
           "scenes": scenes}, open(out, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
print(f"{len(scenes)} scenes, {sum(len(s['text'].split()) for s in scenes)} words → {out}")
if bad:
    print("NOT voiceable yet — placeholders in:", ", ".join(bad)); sys.exit(1)
