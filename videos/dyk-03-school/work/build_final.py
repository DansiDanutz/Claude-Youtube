#!/usr/bin/env python3
"""Assemble DYK No. 03 "School": concat the Sc* shots, lay Brian's VO, the word-synced SFX pass
from cues.py and a sidechain-ducked music bed, master to the delivery spec (stereo 48 kHz,
-14 LUFS, <= -1 dBTP true peak, CFR 30, +faststart).

Adapted from episode 01 (hardened commits 1edb248 + ec795c8):
  * repo root from __file__; shot lengths + VO offsets from timeline.json (computed from narration)
  * narration_fit_problems() gate: a line ending < 0.5 s before its cut, or overlapping, stops the build
  * SFX times come from the Brian alignment (vo.json) via cues.py — the same table as BEATMAP.md
  * SFX mixed in groups of <= 35 inputs; limiter at 4x oversampling; final CFR 30 encode
Run from anywhere:  python3 videos/dyk-03-school/work/build_final.py
"""
import json, os, re, subprocess, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))  # repo root, from this file
OUT = os.path.join(ROOT, 'remotion', 'out')
PROJ = os.path.join(ROOT, 'videos', 'dyk-03-school')
WORK = os.path.join(PROJ, 'work')
NARR = os.path.join(WORK, 'narration')
BUS = os.path.join(WORK, 'bus')
SFX = os.path.join(ROOT, 'media', 'library', 'sfx', 'clips')
MUSIC = os.path.join(ROOT, 'media', 'library', 'music', 'clips', 'cinematic-min.mp3')
VO = json.load(open(os.path.join(ROOT, 'remotion', 'src', 'shots', 'dyk-03', 'vo.json')))
sys.path.insert(0, WORK)
import cues as CUE_TABLE  # noqa: E402  (the shared cue table)

TARGET_LUFS = -14.0
LIMIT_DBTP = -2.6          # limiter ceiling (sample) — skill: keeps true peak <= -1 dBTP after AAC
MUSIC_LEVEL = 0.32
SFX_GROUP = 35
FPS = 30
MIN_TAIL_S = 0.5           # a voice line must end at least this long before its shot cuts
SHOT_ORDER = ['ScHook', 'ScIntro', 'ScWelcome', 'ScPromise', 'Sc1500', 'Sc1647', 'Sc1763', 'Sc1810',
              'Sc1948', 'ScToday', 'ScReveal', 'Sc2100', 'ScClose', 'ScOutro']

_TL = json.load(open(os.path.join(WORK, 'timeline.json')))
SHOTS = [(sid, _TL[sid][0], sorted(_TL[sid][1].items(), key=lambda kv: kv[1])) for sid in SHOT_ORDER]
START, t = {}, 0.0
for sid, dur, _ in SHOTS:
    START[sid] = t
    t += dur
TOTAL = t
VO_AT = {scene: START[sid] + off for sid, _, vos in SHOTS for scene, off in vos}
DUR = {sid: dur for sid, dur, _ in SHOTS}
# end screen (ScOutro): starts 24 frames after the outro line ends — same rule as the shot
ES_S = (round((0.6 + VO['sc13-outro']['dur']) * FPS) + 24) / FPS


def narration_fit_problems(shots, vo, min_tail=MIN_TAIL_S):
    """Lines that no longer fit their shot (a regenerated take grew) or overlap the next line."""
    probs = []
    for sid, dur, vos in shots:
        spans = sorted((off, off + vo[sc]['dur'], sc) for sc, off in vos)
        for (a0, a1, sc), nxt in zip(spans, spans[1:] + [None]):
            if a1 > dur - min_tail:
                probs.append(f'{sc} ends {a1:.2f}s but {sid} cuts at {dur:.2f}s (needs {min_tail}s tail)')
            if nxt and a1 > nxt[0]:
                probs.append(f'{sc} overlaps {nxt[2]} in {sid} ({a1:.2f}s > {nxt[0]:.2f}s)')
    return probs


def norm(w):
    return re.sub(r'[^a-z0-9]', '', w.lower())


def w(scene, token, nth=1, shift=0.0):
    """Absolute time (s) of the nth occurrence of token in a VO scene."""
    seen = 0
    for word in VO[scene]['words']:
        if norm(word['w']) == norm(token):
            seen += 1
            if seen == nth:
                return VO_AT[scene] + word['s'] + shift
    sys.exit(f'cue "{token}"#{nth} missing in {scene}')


def w_end(scene, token, nth=1, shift=0.0):
    """Absolute time (s) of the END of the nth occurrence of token in a VO scene (a hit after the word, not on it)."""
    seen = 0
    for word in VO[scene]['words']:
        if norm(word['w']) == norm(token):
            seen += 1
            if seen == nth:
                return VO_AT[scene] + word['e'] + shift
    sys.exit(f'cue end "{token}"#{nth} missing in {scene}')


def s(shot, sec):
    return START[shot] + sec


def after_did(scene):
    """End of 'that' in 'Did you know that' — the chime lands AFTER the phrase, never on it."""
    words = VO[scene]['words']
    i = next(k for k, wd in enumerate(words) if norm(wd['w']) == 'did')
    return VO_AT[scene] + words[i + 3]['e'] + 0.05


def resolve(when):
    kind = when[0]
    if kind == 'w':
        return w(*when[1:])
    if kind == 's':
        return s(*when[1:])
    if kind == 'we':
        return w_end(*when[1:])
    if kind == 'after_did':
        return after_did(when[1])
    raise ValueError(when)


# voice preflight (2026-10-12): a loud SFX never starts INSIDE a spoken word — same clip families and 30 ms margin as
# tools/dyk/voice_preflight.py. A cue in the first ONSET_SNAP_S of a word moves to its onset, otherwise to its end
# (the gap after it), so the sound still marks its visual within a word's length.
LOUD_SFX = re.compile(r'impact|whoosh|pop|chime|riser|thock|sparkle|stamp|snap|hit|boom')
WORD_MARGIN_S = 0.03
ONSET_SNAP_S = 0.1


def word_spans():
    """Absolute (start, end) of every spoken word in the master."""
    return sorted((VO_AT[sc] + wd['s'], VO_AT[sc] + wd['e']) for sc in VO_AT for wd in VO[sc]['words'])


def off_word(t, clip, spans):
    """t, or the nearest word boundary when a loud clip would start inside a word."""
    if not LOUD_SFX.search(clip):
        return t
    for s0, e0 in spans:
        if s0 + WORD_MARGIN_S < t < e0 - WORD_MARGIN_S:
            if 'riser' in clip:           # a riser is timed by its END: start it earlier so it still ends before its payoff
                return s0
            return s0 if t - s0 <= ONSET_SNAP_S else e0
    return t


def cue_sheet():
    """[(time, clip, gain, visual)] from cues.py + ticks + era exits + end screen, time-sorted; loud clips kept off words."""
    out = [(resolve(when), clip, gain, vis) for when, clip, gain, vis in CUE_TABLE.C]
    for scene, token, n, step_f, nth, shift, vis in CUE_TABLE.T:
        t0 = w(scene, token, nth, shift)
        out += [(t0 + i * step_f / FPS, 'ui-click-soft', 0.15, f'{vis} ({i + 1}/{n})') for i in range(n)]
    for shot in CUE_TABLE.EXIT_SHOTS:     # the EraExit pull-in carries a reverse whoosh into the next era
        out.append((START[shot] + DUR[shot] - 0.95, 'whoosh-reverse', 0.30, 'era exit pull-in'))
    es = START['ScOutro'] + ES_S
    out += [(es + 12 / FPS, 'pencil-scribble', 0.30, 'end screen: BEST COMMENT · READ HERE writes on'),
            (es + 18 / FPS, 'ui-toggle-on', 0.24, 'end screen: logo switches on (subscribe slot)'),
            (es + 25 / FPS, 'sparkle-soft', 0.22, 'end screen: logo glow')]
    spans = word_spans()
    return sorted((round(off_word(t, clip, spans), 3), clip, gain, vis) for t, clip, gain, vis in out)


SHEET = cue_sheet()
CUES = [(t, clip, gain) for t, clip, gain, _ in SHEET]


CUESHEET = os.path.join(WORK, 'cuesheet.json')


def write_cuesheet(path=CUESHEET):
    """The resolved cue list the mix uses, [{t, clip, gain}] in master seconds — read by tools/dyk/voice_preflight.py."""
    json.dump([{'t': round(t, 3), 'clip': clip, 'gain': gain} for t, clip, gain in CUES], open(path, 'w'), indent=0)
    return path


def run(args):
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-nostdin'] + args, check=True)


def duration(path):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path],
                                capture_output=True, text=True, check=True).stdout.strip())


def loudness(path):
    err = subprocess.run(['ffmpeg', '-nostdin', '-i', path, '-af', 'ebur128=peak=true', '-f', 'null', '-'],
                         capture_output=True, text=True).stderr
    summary = err[err.rfind('Summary:'):]
    lufs = float(re.search(r'I:\s+(-?[\d.]+) LUFS', summary).group(1))
    peak = float(re.search(r'Peak:\s+(-?[\d.]+) dBFS', summary).group(1))
    return lufs, peak


def delayed_mix(items, out, channels=2):
    """items: [(path, seconds, gain)] → one wav, each placed by adelay, mixed without normalisation."""
    inputs, filt = [], []
    for i, (path, at, gain) in enumerate(items):
        inputs += ['-i', path]
        ms = max(0, int(round(at * 1000)))
        filt.append(f'[{i}:a]aformat=sample_rates=48000:channel_layouts=stereo,volume={gain},adelay={ms}|{ms}[a{i}]')
    labels = ''.join(f'[a{i}]' for i in range(len(items)))
    filt.append(f'{labels}amix=inputs={len(items)}:normalize=0:duration=longest,apad=whole_dur={TOTAL:.3f},atrim=0:{TOTAL:.3f}[out]')
    run(inputs + ['-filter_complex', ';'.join(filt), '-map', '[out]', '-ar', '48000', '-ac', str(channels), out])


def rm(*paths):
    """Disk is critical: delete each intermediate as soon as it has been consumed."""
    for p in paths:
        if os.path.exists(p):
            os.remove(p)


def main():
    write_cuesheet()
    if '--cuesheet-only' in sys.argv:
        print('cuesheet ->', CUESHEET, f'({len(CUES)} cues)')
        return
    os.makedirs(BUS, exist_ok=True)
    fit = narration_fit_problems(SHOTS, VO)
    if fit:
        sys.exit('narration no longer fits the shots — regenerate timeline.json and re-render the shots:\n  ' + '\n  '.join(fit))
    # 1) every shot rendered at its planned length (frame count), then video-only copies so the
    #    concat offsets come from the video stream, not the padded silent AAC track Remotion adds
    listfile = os.path.join(BUS, 'concat.txt')
    with open(listfile, 'w') as f:
        for sid, dur, _ in SHOTS:
            src = os.path.join(OUT, f'{sid}.mp4')
            frames = int(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v', '-count_packets',
                                         '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', src],
                                        capture_output=True, text=True, check=True).stdout.strip().strip(','))
            if frames != round(dur * 30):
                sys.exit(f'{sid}: {frames} frames, planned {round(dur * 30)} — re-render before building')
            vonly = os.path.join(BUS, f'v_{sid}.mp4')
            run(['-i', src, '-map', '0:v', '-c', 'copy', vonly])
            f.write(f"file '{vonly}'\n")
    silent = os.path.join(BUS, 'video_silent.mp4')
    run(['-f', 'concat', '-safe', '0', '-i', listfile, '-c', 'copy', silent])
    print(f'video {duration(silent):.2f}s (planned {TOTAL:.2f}s)')

    # 2) voice bus
    voice = os.path.join(BUS, 'voice.wav')
    delayed_mix([(os.path.join(WORK, 'mix', f'{scene}.wav'), at, 1.0) for scene, at in VO_AT.items()], voice)

    # 3) sfx bus in groups
    groups = []
    for g in range(0, len(CUES), SFX_GROUP):
        part = os.path.join(BUS, f'sfx_{g // SFX_GROUP}.wav')
        delayed_mix([(os.path.join(SFX, f'{clip}.mp3'), at, gain) for at, clip, gain in CUES[g:g + SFX_GROUP]], part)
        groups.append((part, 0.0, 1.0))
    sfx_raw = os.path.join(BUS, 'sfx_raw.wav')
    delayed_mix(groups, sfx_raw)
    rm(*[g[0] for g in groups])
    sfx = os.path.join(BUS, 'sfx.wav')
    run(['-i', sfx_raw, '-i', voice, '-filter_complex',
         '[0:a][1:a]sidechaincompress=threshold=0.03:ratio=5:attack=5:release=220:makeup=1[out]',
         '-map', '[out]', '-ar', '48000', '-ac', '2', sfx])
    rm(sfx_raw)
    print(f'{len(CUES)} sfx cues in {len(groups)} groups')

    # 4) music bed, looped, sidechain-ducked 12:1 under the voice
    music = os.path.join(BUS, 'music.wav')
    clip_d = duration(MUSIC)
    xf = 4.0
    copies = int(TOTAL // (clip_d - xf)) + 2
    inputs, chain = [], []
    for i in range(copies):
        inputs += ['-i', MUSIC]
    label = '[0:a]'
    for i in range(1, copies):
        chain.append(f'{label}[{i}:a]acrossfade=d={xf}:c1=tri:c2=tri[x{i}]')
        label = f'[x{i}]'
    chain.append(f'{label}atrim=0:{TOTAL:.3f},aformat=sample_rates=48000:channel_layouts=stereo,volume={MUSIC_LEVEL},'
                 f'afade=t=in:d=2,afade=t=out:st={TOTAL - 5:.3f}:d=5[m]')
    chain.append(f'[m][{copies}:a]sidechaincompress=threshold=0.03:ratio=12:attack=20:release=450[out]')
    run(inputs + ['-i', voice, '-filter_complex', ';'.join(chain), '-map', '[out]', '-ar', '48000', '-ac', '2', music])

    # 5) master: mix → measure → flat gain → limiter → verify (same ebur128 meter)
    pre = os.path.join(BUS, 'master_pre.wav')
    run(['-i', voice, '-i', sfx, '-i', music, '-filter_complex',
         '[0:a][1:a][2:a]amix=inputs=3:normalize=0[out]', '-map', '[out]', '-ar', '48000', '-ac', '2', pre])
    rm(sfx, music)
    lufs, _ = loudness(pre)
    master = os.path.join(BUS, 'master.wav')
    limit = 10 ** (LIMIT_DBTP / 20)
    gain_db = TARGET_LUFS - lufs
    for _ in range(3):
        run(['-i', pre, '-af', f'volume={gain_db:.2f}dB,aresample=192000,alimiter=limit={limit:.4f}:level=disabled,aresample=48000',
             '-ar', '48000', '-ac', '2', master])
        lufs_m, peak_m = loudness(master)
        if abs(lufs_m - TARGET_LUFS) <= 0.3:
            break
        gain_db += TARGET_LUFS - lufs_m
    print(f'master {lufs_m:.1f} LUFS, peak {peak_m:.1f} dBFS')

    # 6) final encode: CFR 30, stereo AAC, faststart
    final = os.path.join(PROJ, 'dyk-03-school-1080P.mp4')
    run(['-i', silent, '-i', master, '-map', '0:v', '-map', '1:a',
         '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', '30', '-fps_mode', 'cfr',
         '-c:a', 'aac', '-b:a', '256k', '-ar', '48000', '-ac', '2', '-movflags', '+faststart', '-shortest', final])
    print('final ->', final, f'{duration(final):.2f}s')
    rm(pre, master, voice, silent, listfile, *[os.path.join(BUS, f'v_{sid}.mp4') for sid, _, _ in SHOTS])
    try:
        os.rmdir(BUS)
    except OSError:
        pass


if __name__ == '__main__':
    main()
