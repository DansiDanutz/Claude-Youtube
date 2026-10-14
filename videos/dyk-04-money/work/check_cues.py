#!/usr/bin/env python3
"""Static cue check: every makeCue(...).at('word', nth) in remotion/src/shots/dyk-04/*.tsx must resolve in vo.json,
and every single-argument at('word') whose word repeats in its scene is listed (it silently means nth=1)."""
import glob, json, os, re, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
VO = json.load(open(os.path.join(ROOT, 'remotion', 'src', 'shots', 'dyk-04', 'vo.json')))
norm = lambda t: re.sub(r'[^a-z0-9]', '', t.lower())
bad, warn = [], []
for path in sorted(glob.glob(os.path.join(ROOT, 'remotion', 'src', 'shots', 'dyk-04', 'Mo*.tsx'))):
    src = open(path).read()
    cues = dict(re.findall(r"const (\w+) = makeCue\(vo, '([\w-]+)'", src))
    for var, tok, nth in re.findall(r"\b(\w+)\.at\('([^']+)'(?:,\s*(\d+))?", src):
        if var not in cues:
            continue
        words = [norm(w['w']) for w in VO[cues[var]]['words']]
        n, count = int(nth or 1), words.count(norm(tok))
        if count < n:
            bad.append(f"{os.path.basename(path)}: {var}.at('{tok}', {n}) — only {count} in {cues[var]}")
        elif count > 1 and not nth:
            warn.append(f"{os.path.basename(path)}: {var}.at('{tok}') — '{tok}' occurs {count}x in {cues[var]} (nth=1 used)")
print('\n'.join(['MISSING ' + b for b in bad] + ['repeat  ' + w for w in warn]) or 'all cues resolve')
sys.exit(1 if bad else 0)
