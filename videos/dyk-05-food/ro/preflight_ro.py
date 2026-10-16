#!/usr/bin/env python3
"""Voice pre-flight for the Romanian pilot — runs the SHARED tools/dyk/voice_preflight.py unchanged, with two
Romanian adaptations patched in at run time (never edited in the shared file):
  --lang ro   syllables() = ro_text.syllables_ro (drag limits and articulation rate need Romanian syllables), and the
              sign-off check finds the Romanian three beats "Întreabă... Uimește-te. Repetă." (the shared check only
              knows "Ask Wonder Repeat"; a Romanian sign-off it cannot find FAILS, it is never skipped silently)
  --only sfx,data   report only these checks (used for the warped-English vo.ro.json, where speed/pace/drag/gap
              numbers describe nobody's real speech — only the SFX-on-word and data checks mean something there)
Same exit codes: 0 = PASS, 1 = FAIL.
  python3 ro/preflight_ro.py --lang ro --script ro/script.ro.json --vo ro/vo.ro.true.json \
      --timeline ro/timeline.ro.json --cuesheet ro/cuesheet.ro.json --out ro/audit/VOICE-PREFLIGHT-RO.md
"""
import argparse
import os
import re
import sys

RO = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(RO, "..", "..", ".."))
sys.path.insert(0, os.path.join(ROOT, "tools", "dyk"))
sys.path.insert(0, RO)
import voice_preflight as vp  # noqa: E402
from ro_text import fold, syllables_ro  # noqa: E402

SIGNOFF_RO = {"intreaba": "Ask...", "uimestete": "Wonder...", "repeta": "Repeat."}
_shared_signoff = vp.check_signoff


def check_signoff_ro(vo, timeline):
    """The shared sign-off check on a copy of vo whose Romanian sign-off words carry the English tokens it looks for."""
    renamed, found = {}, 0
    for sid, scene in vo.items():
        words = []
        for w in scene.get("words") or []:
            key = re.sub(r"[^a-z]", "", fold(w["w"]))
            if key in SIGNOFF_RO:
                found += 1
                w = {**w, "w": SIGNOFF_RO[key]}
            words.append(w)
        renamed[sid] = {**scene, "words": words}
    if found < 3:
        return [("sign-off", "-", f"Romanian sign-off (Întreabă... Uimește-te. Repetă.) not found ({found}/3 words)")]
    return _shared_signoff(renamed, timeline)


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", choices=("ro", "en"), default="ro")
    ap.add_argument("--only", default="")
    ap.add_argument("--script", required=True)
    ap.add_argument("--vo", required=True)
    ap.add_argument("--timeline", required=True)
    ap.add_argument("--cuesheet")
    ap.add_argument("--out")
    a = ap.parse_args(argv)
    if a.lang == "ro":
        vp.syllables = syllables_ro
        vp.check_signoff = check_signoff_ro
    import json
    load = lambda p: json.load(open(p, encoding="utf-8"))
    issues = vp.run(load(a.script), load(a.vo), load(a.timeline), load(a.cuesheet) if a.cuesheet else None)
    if a.only:
        keep = set(a.only.split(","))
        issues = [i for i in issues if i[0] in keep]
    text = vp.report(issues)
    header = f"<!-- preflight_ro.py --lang {a.lang}{' --only ' + a.only if a.only else ''} · vo {os.path.basename(a.vo)} -->\n"
    print(text)
    if a.out:
        open(a.out, "w", encoding="utf-8").write(header + text + "\n")
    return 1 if issues else 0


if __name__ == "__main__":
    sys.exit(main())
