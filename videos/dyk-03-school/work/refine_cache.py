#!/usr/bin/env python3
"""One-off (No. 03, 2026-10-13): apply gen_voice.refine_ends to chunk takes cached before the energy refinement
existed, and to single-chunk scene takes, so every word timing in the episode is measured the same way."""
import base64, glob, json, os, sys
WORK = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, WORK)
import gen_voice as g  # noqa: E402

for meta in sorted(glob.glob(os.path.join(g.NARR, 'chunks', '*.json'))):
    base = meta[:-5]
    audio = next((base + e for e in ('.mp3', '.wav') if os.path.exists(base + e)), None)
    if not audio:
        continue
    d = json.load(open(meta))
    new = g.refine_ends(d['words'], base64.b64encode(open(audio, 'rb').read()).decode())
    if new != d['words']:
        json.dump({**d, 'words': new}, open(meta, 'w'))
        print('refined', os.path.basename(base))
script = json.load(open(os.path.join(g.NARR, 'script.json')))
for sc in script['scenes']:
    if len(g.chunks_of(sc)) == 1 and os.path.exists(os.path.join(g.NARR, f"{sc['id']}.mp3")):
        p = os.path.join(g.NARR, f"{sc['id']}.words.json")
        w = json.load(open(p))
        new = g.refine_ends(w, base64.b64encode(open(os.path.join(g.NARR, f"{sc['id']}.mp3"), 'rb').read()).decode())
        if new != w:
            json.dump(new, open(p, 'w'), indent=0)
            print('refined scene', sc['id'])
