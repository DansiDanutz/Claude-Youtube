#!/usr/bin/env python3
"""Merge narration/<id>.words.json (or <id>.paused.json) + durations.json into remotion/src/shots/dyk-01/vo.json (read by makeCue)."""
import json, os

WORK = os.path.dirname(os.path.abspath(__file__))
NARR = os.path.join(WORK, 'narration')
DEST = os.path.join(WORK, '..', '..', '..', 'remotion', 'src', 'shots', 'dyk-01', 'vo.json')
script = json.load(open(os.path.join(NARR, 'script.json')))
durations = json.load(open(os.path.join(NARR, 'durations.json')))


def scene_vo(sc):
    """A scene with `pauses` uses insert_pauses.py's output (shifted words + longer dur)."""
    sid = sc['id']
    raw = os.path.join(NARR, f'{sid}.words.json')
    if sc.get('pauses'):
        paused = os.path.join(NARR, f'{sid}.paused.json')
        if not os.path.exists(paused) or os.path.getmtime(paused) < os.path.getmtime(raw):
            raise SystemExit(f'{sid}: run insert_pauses.py first (paused take missing or older than the words)')
        return json.load(open(paused))
    return {'dur': durations[sid], 'words': json.load(open(raw))}


vo = {sc['id']: scene_vo(sc) for sc in script['scenes']}
json.dump(vo, open(DEST, 'w'), separators=(',', ':'))
print('vo.json:', len(vo), 'scenes')
