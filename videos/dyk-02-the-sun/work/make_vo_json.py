#!/usr/bin/env python3
"""Merge narration/<id>.words.json (or <id>.paused.json) + durations.json into remotion/src/shots/dyk-02/vo.json (read by makeCue).
A scene with a `pauses` block uses insert_pauses.py's output (shifted words + longer dur), so vo.json, the shot cues,
the SFX cues and timeline.json all follow the breaths."""
import json, os

WORK = os.path.dirname(os.path.abspath(__file__))
NARR = os.path.join(WORK, 'narration')
DEST = os.path.join(WORK, '..', '..', '..', 'remotion', 'src', 'shots', 'dyk-02', 'vo.json')


def scene_vo(sc, durations):
    sid = sc['id']
    raw = os.path.join(NARR, f'{sid}.words.json')
    if sc.get('pauses'):
        paused = os.path.join(NARR, f'{sid}.paused.json')
        if not os.path.exists(paused) or os.path.getmtime(paused) < os.path.getmtime(raw):
            raise SystemExit(f'{sid}: run insert_pauses.py first (paused take missing or older than the words)')
        return json.load(open(paused))
    return {'dur': durations[sid], 'words': json.load(open(raw))}


def main():
    script = json.load(open(os.path.join(NARR, 'script.json')))
    durations = json.load(open(os.path.join(NARR, 'durations.json')))
    vo = {sc['id']: scene_vo(sc, durations) for sc in script['scenes']}
    json.dump(vo, open(DEST, 'w'), separators=(',', ':'))
    # make_timeline.py reads durations.json: keep it in step with the paused takes
    json.dump({**durations, **{k: v['dur'] for k, v in vo.items()}}, open(os.path.join(NARR, 'durations.json'), 'w'), indent=2)
    print('vo.json:', len(vo), 'scenes')


if __name__ == '__main__':
    main()
