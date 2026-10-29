#!/usr/bin/env python3
"""Merge narration/<id>.words.json (or <id>.paused.json) + durations.json into remotion/src/shots/dyk-07/vo.json (read by makeCue).
A scene with a `pauses` block uses insert_pauses.py's output (shifted words + longer dur), so vo.json, the shot cues,
the SFX cues and timeline.json all follow the breaths."""
import json, os, wave

WORK = os.path.dirname(os.path.abspath(__file__))
NARR = os.path.join(WORK, 'narration')
MIX = os.path.join(WORK, 'mix')
DUR_TOL_S = 0.02             # the mix and the paused timings come from the same insert_pauses run
DEST = os.path.join(WORK, '..', '..', '..', 'remotion', 'src', 'shots', 'dyk-07', 'vo.json')


def wav_seconds(path):
    if not os.path.exists(path):
        return None
    with wave.open(path, 'rb') as w:
        return w.getnframes() / w.getframerate()


def scene_vo(sc, durations):
    sid = sc['id']
    raw = os.path.join(NARR, f'{sid}.words.json')
    if sc.get('pauses'):
        paused = os.path.join(NARR, f'{sid}.paused.json')
        if not os.path.exists(paused) or os.path.getmtime(paused) < os.path.getmtime(raw):
            raise SystemExit(f'{sid}: run insert_pauses.py first (paused take missing or older than the words)')
        take = json.load(open(paused))
        if take.get('pauses') != sc['pauses']:
            raise SystemExit(f'{sid}: pause settings changed since the paused take — run insert_pauses.py again')
        mix_s = wav_seconds(os.path.join(MIX, f'{sid}.wav'))
        if mix_s is None or abs(mix_s - take['dur']) > DUR_TOL_S:
            # e.g. gen_voice.py rebuilt mix/<id>.wav from the unpaused mp3: captions and SFX would drift off the voice
            raise SystemExit(f'{sid}: mix/{sid}.wav ({mix_s} s) does not match the paused take ({take["dur"]} s) '
                             f'— run insert_pauses.py again')
        return take
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
