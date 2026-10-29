#!/usr/bin/env python3
"""The recut cold open (VidNinjas pre-roll rule, 2026-10-29): ONE scene `lt01-cold` cut on word boundaries from
Brian's existing paused takes, no new voice. Premise (lt01 without "Last time…") → "We didn't. And tonight… slowly
disappearing." (lt02 up to the DYK card) → the guess (lt00 from "Here's your guess."). 89 words.

Called by make_vo_json.py after the paused takes are merged, so it always cuts from the current mix/<id>.wav and
<id>.paused.json; writes mix/lt01-cold.wav and returns the scene's {dur, words} for vo.json.
`python3 splice_coldopen.py --voiced` also writes the scene into audit/script-voiced.json for the voice pre-flight."""
import json, os, sys, wave

WORK = os.path.dirname(os.path.abspath(__file__))
MIX = os.path.join(WORK, 'mix')
SCENE = 'lt01-cold'
DROPPED = ['lt00-welcome', 'lt01-hook', 'lt02-question', 'lt03-promise']   # replaced in the master by SCENE
# (source scene, cut start s, cut end s, first word, last word, silence added after s) — cuts sit in the silences
CUTS = [
    ('lt01-hook', 2.55, 13.56, 'What', 'savings.', 0.50),          # drops "Last time, I left you with a question."
    ('lt02-question', 0.0, 4.93, 'We', 'disappearing.', 0.30),      # stops before "Did you know that…" (the stars card)
    ('lt00-welcome', 4.94, None, "Here's", 'guess.', 0.0),          # drops "Welcome back… You know the rule."
]
MAX_CUT_GAP_S = 0.12   # a cut point must be at least this far from any word (no clipped breaths or consonants)


def _read(path):
    with wave.open(path, 'rb') as w:
        return w.getparams(), w.readframes(w.getnframes())


def _check_cut(sid, words, t0, t1, dur, first, last):
    inside = [w for w in words if w['s'] >= t0 and w['e'] <= t1]
    if not inside or inside[0]['w'] != first or inside[-1]['w'] != last:
        raise SystemExit(f'{SCENE}: cut {sid} [{t0}, {t1}] holds {inside[:1]}…{inside[-1:]}, expected {first}…{last}')
    for edge in (t0, t1):
        if edge <= 0 or edge >= dur:   # the take's own start/end
            continue
        near = [w for w in words if w['s'] - MAX_CUT_GAP_S < edge < w['e'] + MAX_CUT_GAP_S]
        if near:
            raise SystemExit(f'{SCENE}: cut {sid} at {edge} s is within {MAX_CUT_GAP_S} s of "{near[0]["w"]}"')
    return inside


def build(vo):
    """vo: {scene: {dur, words}} with the paused takes. Writes mix/lt01-cold.wav, returns {SCENE: {dur, words}}."""
    params, out, words, t = None, bytearray(), [], 0.0
    for sid, t0, t1, first, last, gap in CUTS:
        p, raw = _read(os.path.join(MIX, f'{sid}.wav'))
        if params is None:
            params = p
        elif (p.nchannels, p.sampwidth, p.framerate) != (params.nchannels, params.sampwidth, params.framerate):
            raise SystemExit(f'{SCENE}: {sid}.wav format differs from the first cut')
        t1 = vo[sid]['dur'] if t1 is None else t1
        inside = _check_cut(sid, vo[sid]['words'], t0, t1, vo[sid]['dur'], first, last)
        frame_bytes = p.nchannels * p.sampwidth
        a, b = round(t0 * p.framerate), min(round(t1 * p.framerate), p.nframes)
        out += raw[a * frame_bytes:b * frame_bytes]
        words += [{'w': w['w'], 's': round(t + w['s'] - t0, 3), 'e': round(t + w['e'] - t0, 3)} for w in inside]
        silence = round(gap * p.framerate)
        out += b'\x00' * (silence * frame_bytes)
        t += (b - a + silence) / p.framerate
    with wave.open(os.path.join(MIX, f'{SCENE}.wav'), 'wb') as w:
        w.setparams(params)
        w.writeframes(bytes(out))
    return {SCENE: {'dur': round(t, 3), 'words': words}}


def voiced_scene(script):
    """The scene entry for the pre-flight: one chunk per cut, each with its source chunk's pace/speed/floor."""
    by_id = {sc['id']: sc for sc in script['scenes']}
    vo = json.load(open(os.path.join(WORK, '..', '..', '..', 'remotion', 'src', 'shots', 'dyk-07', 'vo.json')))
    chunks = []
    for sid, t0, t1, *_ in CUTS:
        src = by_id[sid]
        if len(src['chunks']) != 1:
            raise SystemExit(f'{SCENE}: {sid} has {len(src["chunks"])} chunks; map the cut to one chunk first')
        t1 = vo[sid]['dur'] if t1 is None else t1
        text = ' '.join(w['w'] for w in vo[sid]['words'] if w['s'] >= t0 and w['e'] <= t1)
        chunks.append({**src['chunks'][0], 'text': text})
    return {'id': SCENE, 'shot': 'LtHook', 'text': ' '.join(ch['text'] for ch in chunks), 'chunks': chunks,
            'floor': by_id[CUTS[0][0]].get('floor', 0.95)}


def write_voiced():
    path = os.path.join(WORK, 'audit', 'script-voiced.json')
    script = json.load(open(path))
    scenes = [sc for sc in script['scenes'] if sc['id'] not in DROPPED + [SCENE]]
    script['scenes'] = [voiced_scene(json.load(open(os.path.join(WORK, 'narration', 'script.json'))))] + scenes
    json.dump(script, open(path, 'w'), indent=1)
    print(f'{path}: {SCENE} replaces {", ".join(DROPPED)}')


if __name__ == '__main__':
    if '--voiced' in sys.argv:
        write_voiced()
