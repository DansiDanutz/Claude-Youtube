#!/usr/bin/env python3
"""Subtitles for one episode and language: videos/<episode>/loc/vtt/<lang>.vtt (free: no voice, no ffmpeg).

  python3 tools/dyk/localize/build_vtt.py 05 fr [--timing english|dub|auto]

Each translated sentence is shown over its English sentence window; a long sentence is split into two-line cues that share
the window. With `--timing auto` (default) the placement written by build_dub.py is used when it exists, so the subtitles
follow the voice-over exactly; otherwise the English timing is used (the English voice and the subtitles then agree).
A cue stays on screen long enough to read (see READ_CPS) as far as the next sentence allows.
"""
import json, os, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import dub_core as C  # noqa: E402
from check_translation import load_english, sentences_flat  # noqa: E402
from episodes import LANGUAGES, episode, loc_dir  # noqa: E402

READ_CPS = {'ro': 17.0, 'fr': 17.0, 'es': 17.0, 'zh': 5.0}   # characters a viewer reads per second
GAP_S = 0.04


def windows(doc, placement):
    """[(sentence id, start, end, slot_end)] — English timing, or the dub placement when given."""
    out = []
    for _, _, s in sentences_flat(doc):
        p = (placement or {}).get(s['id'])
        out.append((s['id'], p['start'] if p else s['start'], p['end'] if p else s['end'], s['slot_end']))
    return out


def build(num, lang, timing='auto'):
    ep = episode(num)
    doc = load_english(ep)
    tr = json.load(open(os.path.join(loc_dir(ep), f'script.{lang}.json'), encoding='utf-8'))
    pfile = os.path.join(loc_dir(ep), lang, 'placement.json')
    placement = json.load(open(pfile, encoding='utf-8')) if timing != 'english' and os.path.exists(pfile) else None
    if timing == 'dub' and not placement:
        sys.exit(f'{pfile}: missing (run build_dub.py first)')
    wins = windows(doc, placement)
    cues = []
    for i, (sid, start, end, slot_end) in enumerate(wins):
        text = C.show_of(tr['sentences'][sid])
        next_start = wins[i + 1][1] if i + 1 < len(wins) else slot_end
        need = max(1.0, len(text) / READ_CPS[lang])
        end = max(end, min(start + need, max(slot_end, end)))
        end = min(end, next_start - GAP_S) if next_start - GAP_S > start else end
        cues += C.cues_for(text, start, end, lang)
    cues = C.merge_short(cues, lang)
    out_dir = os.path.join(loc_dir(ep), 'vtt')
    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, f'{lang}.vtt')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(C.to_vtt(cues, header=f"WEBVTT\n\nNOTE Did You Know That? No. {num} {ep['slug']} — {lang} subtitles; timing: {'dub placement' if placement else 'English sentence windows'}"))
    print(f"No. {num} {lang}: {len(cues)} cues ({'dub' if placement else 'english'} timing) -> {os.path.relpath(path)}")
    return path


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    timing = sys.argv[sys.argv.index('--timing') + 1] if '--timing' in sys.argv else 'auto'
    if len(args) < 2 or args[1] not in LANGUAGES:
        sys.exit(__doc__)
    build(args[0], args[1], timing)
