#!/usr/bin/env python3
"""Merge narration/<id>.words.json + durations.json into remotion/src/shots/dyk-01/vo.json (read by makeCue)."""
import json, os

WORK = os.path.dirname(os.path.abspath(__file__))
NARR = os.path.join(WORK, 'narration')
DEST = os.path.join(WORK, '..', '..', '..', 'remotion', 'src', 'shots', 'dyk-01', 'vo.json')
script = json.load(open(os.path.join(NARR, 'script.json')))
durations = json.load(open(os.path.join(NARR, 'durations.json')))
vo = {sc['id']: {'dur': durations[sc['id']], 'words': json.load(open(os.path.join(NARR, f"{sc['id']}.words.json")))}
      for sc in script['scenes']}
json.dump(vo, open(DEST, 'w'), separators=(',', ':'))
print('vo.json:', len(vo), 'scenes')
