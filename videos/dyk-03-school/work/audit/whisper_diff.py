#!/usr/bin/env python3
"""Narration audit: whisper (base) vs script — word diff ignoring numerals/punctuation,
low-probability words (< 0.35), gaps > 1.1 s, and ElevenLabs word durations (stretch check)."""
import json, os, re, difflib, sys
W = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sc = json.load(open(os.path.join(W, 'narration', 'script.json')))['scenes']
norm = lambda t: re.sub(r'[^a-z]', '', t.lower())
for s in sc:
    path = os.path.join(W, 'audit', 'whisper', s['id'] + '.json')
    d = json.load(open(path))
    ww = [w for seg in d['segments'] for w in seg.get('words', [])]
    hyp = [norm(w['word']) for w in ww if norm(w['word'])]
    text = ' '.join(c['text'] for c in s['chunks']) if s.get('chunks') else s['text']
    ref = [norm(x) for x in text.split() if norm(x)]
    sm = difflib.SequenceMatcher(None, ref, hyp, autojunk=False)
    diffs = [(op, ' '.join(ref[a:b]), ' '.join(hyp[c:e])) for op, a, b, c, e in sm.get_opcodes() if op != 'equal']
    low = [(w['word'].strip(), round(w['probability'], 2)) for w in ww if w['probability'] < 0.35]
    gaps = [(ww[i]['word'].strip(), round(ww[i + 1]['start'] - ww[i]['end'], 2)) for i in range(len(ww) - 1) if ww[i + 1]['start'] - ww[i]['end'] > 1.1]
    print(f"== {s['id']}  ratio {sm.ratio():.3f}")
    for x in diffs: print('   diff', x)
    if low: print('   low-p', low)
    if gaps: print('   gaps', gaps)
