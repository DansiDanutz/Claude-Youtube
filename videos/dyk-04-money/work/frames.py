#!/usr/bin/env python3
"""Cue frame lookup for stills: frames.py <scene> <offset_s> word[#nth][+df] ...  -> comma list."""
import json, os, re, sys
VO = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'remotion', 'src', 'shots', 'dyk-04', 'vo.json')))
norm = lambda t: re.sub(r'[^a-z0-9]', '', t.lower())
scene, off = sys.argv[1], float(sys.argv[2])
out = []
for tok in sys.argv[3:]:
    m = re.match(r'(.+?)(?:#(\d+))?([+-]\d+)?$', tok)
    word, nth, df = m.group(1), int(m.group(2) or 1), int(m.group(3) or 0)
    hits = [w for w in VO[scene]['words'] if norm(w['w']) == norm(word)]
    out.append(str(round((off + hits[nth - 1]['s']) * 30) + df))
print(','.join(out))
