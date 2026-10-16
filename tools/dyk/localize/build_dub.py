#!/usr/bin/env python3
"""Free step: turn the cached Brian takes into the finished dub for an episode: placement, voice track, mix, subtitles.

  python3 tools/dyk/localize/build_dub.py 05 ro [fr es zh]

For every language: cut each chunk's audio into sentences (character alignment), place each sentence at its English sentence
start (cascade push when one runs long, small tempo squeeze only as a last resort, never above MAX_TEMPO), write
loc/<lang>/placement.json, mix the voice over the episode's sound bed to -14 LUFS (bedmix.py), encode
loc/<lang>/dub.m4a (Git-ignored: it goes to the Blob store), and rebuild loc/vtt/<lang>.vtt from the placement.
The report lists every sentence that is still pushed more than MAX_PUSH_S or had to be squeezed: those need a shorter translation.
"""
import glob, json, os, subprocess, sys, wave

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bedmix  # noqa: E402
import build_vtt  # noqa: E402
import dub_core as C  # noqa: E402
import lang as L  # noqa: E402
from check_translation import load_english, sentences_flat  # noqa: E402
from episodes import LANGUAGES, episode, loc_dir  # noqa: E402

SR = bedmix.SR
MAX_PUSH_S = 0.8
MAX_TEMPO = 1.12
TEMPO_STEP = 1.04


def decode_mp3(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-nostdin', '-i', path, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0


def stretch(samples, tempo):
    """Speed a slice up by `tempo` without changing pitch (ffmpeg atempo)."""
    raw = (np.clip(samples, -1, 1) * 32767).astype(np.int16).tobytes()
    out = subprocess.run(['ffmpeg', '-v', 'error', '-nostdin', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-',
                          '-af', f'atempo={tempo:.4f}', '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'],
                         input=raw, capture_output=True, check=True).stdout
    return np.frombuffer(out, dtype=np.int16).astype(np.float32) / 32768.0


def load_take(cdir, unit):
    """(samples, json) of the cached take whose text equals the chunk's text, else None."""
    for js in sorted(glob.glob(os.path.join(cdir, f"{unit['id']}.*.json")), key=os.path.getmtime, reverse=True):
        meta = json.load(open(js, encoding='utf-8'))
        if meta['text'] == unit['text']:
            return decode_mp3(js[:-5] + '.mp3'), meta
    return None


def fade(x, n):
    if len(x) > 2 * n:
        ramp = np.linspace(0, 1, n, dtype=np.float32)
        x = x.copy()
        x[:n] *= ramp
        x[-n:] *= ramp[::-1]
    return x


def write_wav(path, mono, total_s):
    n = int(total_s * SR)
    buf = np.zeros(n, dtype=np.float32)
    k = min(n, len(mono))
    buf[:k] = mono[:k]
    pcm = (np.clip(buf, -1, 1) * 32767).astype(np.int16)
    stereo = np.repeat(pcm[:, None], 2, axis=1)
    with wave.open(path, 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(stereo.tobytes())


def assemble(doc, units, cdir):
    """Slice, place (cascade + squeeze) and sum the sentences. Returns (voice, placement dict, report dict)."""
    english = [s for _, _, s in sentences_flat(doc)]
    order = {s['id']: i for i, s in enumerate(english)}
    slices, base, missing = {}, {}, []
    for u in units:
        take = load_take(cdir, u)
        if take is None:
            missing.append(u['id'])
            continue
        samples, meta = take
        times = [(s['start'], s['end']) for s in meta['sentences']]
        cuts = C.cut_points(times, len(samples) / SR)
        for (a, b), (s, e), sent in zip(cuts, times, u['sentences']):
            slices[sent['id']] = samples[int(a * SR):int(b * SR)]
            base[sent['id']] = (e - s, s - a)          # speech duration, lead-in kept before the speech
    if missing:
        sys.exit(f'{len(missing)} chunk(s) not voiced yet: {", ".join(missing[:6])}{"..." if len(missing) > 6 else ""} (run gen_dub.py)')
    ids = [s['id'] for s in english]
    starts = [s['start'] for s in english]
    tempo = {sid: 1.0 for sid in ids}
    stuck = set()
    for _ in range(400):
        durs = [base[sid][0] / tempo[sid] for sid in ids]
        placed = C.place(starts, durs)
        pushed = [i for i, (p, st) in enumerate(zip(placed, starts)) if p[0] - st > MAX_PUSH_S]
        pushed = [i for i in pushed if i - 1 >= 0 and ids[i - 1] not in stuck]
        if not pushed:
            break
        culprit = ids[pushed[0] - 1]
        if tempo[culprit] * TEMPO_STEP > MAX_TEMPO + 1e-9:
            stuck.add(culprit)
        else:
            tempo[culprit] *= TEMPO_STEP
    durs = [base[sid][0] / tempo[sid] for sid in ids]
    placed = C.place(starts, durs)
    master_s = doc['master_s']
    voice = np.zeros(int((master_s + 2) * SR), dtype=np.float32)
    placement = {}
    for i, sid in enumerate(ids):
        samples = slices[sid]
        lead = base[sid][1]
        if tempo[sid] > 1.0001:
            samples, lead = stretch(samples, tempo[sid]), lead / tempo[sid]
        at = int(round((placed[i][0] - lead) * SR))
        samples = fade(samples, int(C.FADE_S * SR))
        lo, hi = max(0, at), min(len(voice), at + len(samples))
        if hi > lo:
            voice[lo:hi] += samples[lo - at:hi - at]
        placement[sid] = {'start': round(placed[i][0], 3), 'end': round(placed[i][1], 3), 'tempo': round(tempo[sid], 3),
                          'push': round(placed[i][0] - starts[i], 2)}
    end_of_speech = max(p['end'] for p in placement.values())
    report = {
        'sentences': len(ids),
        'squeezed': sorted((sid for sid, t in tempo.items() if t > 1.0001), key=order.get),
        'still_pushed': [(ids[i], round(placed[i][0] - starts[i], 2)) for i in range(len(ids)) if placed[i][0] - starts[i] > MAX_PUSH_S],
        'max_push': max(p['push'] for p in placement.values()),
        'speech_ends': round(end_of_speech, 2),
        'peak': float(np.max(np.abs(voice))),
    }
    return voice, placement, report


def build(num, lang, keep_bed=True):
    ep = episode(num)
    doc = load_english(ep)
    tr = json.load(open(os.path.join(loc_dir(ep), f'script.{lang}.json'), encoding='utf-8'))
    units = C.chunk_units(doc, tr, lang)
    cdir = os.path.join(loc_dir(ep), lang, 'chunks')
    voice, placement, report = assemble(doc, units, cdir)
    if report['speech_ends'] > doc['master_s'] - 0.3:
        sys.exit(f"{lang}: the voice runs to {report['speech_ends']}s, past the picture ({doc['master_s']}s)")
    with open(os.path.join(loc_dir(ep), lang, 'placement.json'), 'w', encoding='utf-8') as f:
        json.dump(placement, f, ensure_ascii=False, indent=0)
    work = bedmix.bed_dir(ep)
    sfx, music = bedmix.ensure_bed(ep, doc['master_s'])
    vwav = os.path.join(work, f'voice_{lang}.wav')
    write_wav(vwav, voice, doc['master_s'])
    out = os.path.join(loc_dir(ep), lang, 'dub.m4a')
    lufs, peak = bedmix.mix_master(vwav, sfx, music, out, work)
    os.remove(vwav)
    build_vtt.build(num, lang, 'dub')
    dur = bedmix.probe_duration(out)
    print(f"No. {num} {lang}: {out} {os.path.getsize(out) / 1e6:.1f} MB, {dur:.2f}s (picture {doc['master_s']:.2f}s), {lufs:.1f} LUFS, peak {peak:.1f} dBFS")
    print(f"   max push {report['max_push']}s, squeezed {len(report['squeezed'])}, still pushed {len(report['still_pushed'])}")
    for sid, push in report['still_pushed'][:12]:
        print(f'   LONG {sid}: pushed {push}s -> shorten this translation')
    if abs(dur - doc['master_s']) > 0.25:
        print(f"   !! duration differs from the picture by {dur - doc['master_s']:+.2f}s")
    return report


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    if len(args) < 2 or any(a not in LANGUAGES for a in args[1:]):
        sys.exit(__doc__)
    ep = episode(args[0])
    for lg in args[1:]:
        build(args[0], lg)
    if '--keep-bed' not in sys.argv:
        for name in ('sfx_raw.wav', 'music_raw.wav'):
            p = os.path.join(bedmix.bed_dir(ep), name)
            if os.path.exists(p):
                os.remove(p)
