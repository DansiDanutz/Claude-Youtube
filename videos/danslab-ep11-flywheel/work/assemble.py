#!/usr/bin/env python3
"""Assemble Episode 10 — The Payroll.  Usage: python3.13 assemble.py [--tag 4k]

Concats rendered shot MP4s from remotion/out/ against work/mix/*.wav.
Voice track is built as a SEQUENTIAL CONCAT (silence gaps + wavs) — a 77-input
adelay/amix graph fails on this ffmpeg. Silence padding is derived from the
ACTUAL rendered segment durations (concat drift rule)."""
import subprocess, os, sys

OUT = os.path.expanduser("~/Projects/Claude-Youtube/remotion/out")
WORK = os.path.dirname(os.path.abspath(__file__))
EP = os.path.dirname(WORK)
TAG = "4k" if "--tag" in sys.argv and sys.argv[sys.argv.index("--tag") + 1] == "4k" else "1080p"

# (shotId | ("CLIP", path), [(voId, offset_in_shot_s), ...])
ORDER = [
    ("ZDollar",     [("flw01", 0.7), ("flw02", 11.8), ("flw03", 19.6)]),
    ("ZIntro",      []),
    ("ZStakes",     [("flw04", 0.7)]),
    ("ZTrap",       [("flw05", 0.7)]),
    ("ZTrust",      [("flw06", 0.7)]),
    ("ZNervix",     [("flw07", 0.7)]),
    ("ZWhoJoins",   [("flw08", 0.7)]),
    ("ZFrontDoor",  [("flw09", 0.7)]),
    ("ZDexterIntro",[("flw10", 0.7)]),
    ("Z14k",        [("flw11", 0.7)]),
    ("ZCards",      [("flw12", 0.6)]),
    ("ZPoker",      [("flw13", 0.7)]),
    ("ZZmarty",     [("flw14", 0.7)]),
    ("ZSienna",     [("flw15", 0.7)]),
    ("ZTeacher",    [("flw16", 0.7)]),
    ("ZSemeClaw",   [("flw17", 0.7)]),
    ("ZAdsLoop",    [("flw18", 0.7)]),
    ("ZFlywheel",   [("flw19", 0.8)]),
    ("ZSpin",       [("flw20", 0.7)]),
    ("ZHumanBeat",  [("flw21", 0.7)]),
    ("ZMissing",    [("flw22", 0.7)]),
    ("ZPromise",    [("flw23", 0.7)]),
    ("ZOutro",      [("flw24", 0.6)]),
]

def dur(path):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                 "-of", "csv=p=0", path], capture_output=True, text=True).stdout.strip())

def seg_path(item):
    return item[1] if isinstance(item, tuple) else f"{OUT}/{item}.mp4"

segs = [seg_path(s) for s, _ in ORDER]
missing = [p for p in segs if not os.path.exists(p)]
if missing:
    sys.exit("missing segments:\n  " + "\n  ".join(missing))
durs = [dur(p) for p in segs]
starts, t = [], 0.0
for d in durs:
    starts.append(t); t += d
TOTAL = t
print(f"total {t:.1f}s = {int(t // 60)}:{int(t % 60):02d}  ({len(segs)} segments)")

# VIDEO — concat copy
with open(f"{OUT}/e10_concat.txt", "w") as fh:
    for p in segs:
        fh.write(f"file '{p}'\n")
subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0",
                "-i", f"{OUT}/e10_concat.txt", "-c", "copy", f"{WORK}/video_full_{TAG}.mp4"], check=True)

# VOICE — sequential concat: silence gap before each wav, sized from actual timeline
events = []  # (abs_start, wav_path, wav_dur)
for i, (s, vos) in enumerate(ORDER):
    for vo, off in vos:
        w = f"{WORK}/mix/{vo}.wav"
        events.append((starts[i] + off, w, dur(w)))
events.sort()
prev_end, prev_name = 0.0, ""
for st, w, d in events:
    if st < prev_end - 0.005:
        sys.exit(f"VO overlap at {st:.2f}s: {os.path.basename(w)} (prev {prev_name} ends {prev_end:.2f})")
    prev_end, prev_name = st + d, os.path.basename(w)

SR = 48000
sil_dir = f"{WORK}/mix/_gaps"; os.makedirs(sil_dir, exist_ok=True)
concat_list = f"{WORK}/mix/_voice_concat.txt"
cursor = 0.0
with open(concat_list, "w") as fh:
    for j, (st, w, d) in enumerate(events):
        gap = st - cursor
        if gap > 0.005:
            g = f"{sil_dir}/gap{j:03d}.wav"
            subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "lavfi",
                            "-i", f"anullsrc=r={SR}:cl=mono", "-t", f"{gap:.3f}", g], check=True)
            fh.write(f"file '{g}'\n")
        fh.write(f"file '{w}'\n")
        cursor = st + d
    tail = TOTAL - cursor
    if tail > 0.005:
        g = f"{sil_dir}/gap_tail.wav"
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "lavfi",
                        "-i", f"anullsrc=r={SR}:cl=mono", "-t", f"{tail:.3f}", g], check=True)
        fh.write(f"file '{g}'\n")
subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", concat_list,
                "-ar", str(SR), "-ac", "1", "-c:a", "pcm_s16le", f"{WORK}/mix/voice.wav"], check=True)
print(f"voice.wav {dur(f'{WORK}/mix/voice.wav'):.1f}s (target {TOTAL:.1f}s)")

# SFX — whoosh on scene cuts, impacts on the slams, chime on the lock + end card
SFX = os.path.expanduser("~/Projects/Claude-Youtube/media/library/sfx/clips")
IMPACT = ("ZDollar", "ZSpin")
CHIME = ("ZOutro",)
sfx_events = []  # (time, file, vol)
for i, (s, _) in enumerate(ORDER):
    if i == 0 or isinstance(s, tuple):
        continue
    if s in IMPACT:
        sfx_events.append((starts[i] + 0.05, f"{SFX}/impact-deep-soft.mp3", 0.5))
    elif s in CHIME:
        sfx_events.append((starts[i] + 0.05, f"{SFX}/chime-reward.mp3", 0.4))
    elif s in ("ZTrap", "ZNervix", "ZDexterIntro", "ZZmarty", "ZSemeClaw", "ZFlywheel", "ZMissing"):
        sfx_events.append((starts[i], f"{SFX}/whoosh-wind.mp3", 0.42))
    else:
        sfx_events.append((starts[i], f"{SFX}/whoosh-soft.mp3", 0.3))
slam159_at = starts[[s for s, _ in ORDER].index("ZSpin")]
sfx_events.append((max(0, slam159_at - 3.0), f"{SFX}/riser-soft.mp3", 0.45))
# intro sound design: ticking under the payroll record, riser into the title stamp
sfx_events.append((0.6, f"{SFX}/clock-tick-soft.mp3", 0.35))
sfx_events.append((5.0, f"{SFX}/riser-soft.mp3", 0.4))
sfx_events.append((7.85, f"{SFX}/impact-deep-soft.mp3", 0.5))
# end tease: impact on the NEXT card
next_at = starts[[s for s, _ in ORDER].index("ZOutro")]
sfx_events.append((next_at + 0.05, f"{SFX}/impact-deep-soft.mp3", 0.45))

# INTERACTION LAYER — every card, chip, ledger line and counter gets a physical
# sound on its landing frame (design system: clicks for list staggering).
# (shotId, localSeconds, sfxName, volume)
CLICKS = [
    ("ZDollar", 7.5, "warm-shimmer", .35), ("ZIntro", 4.67, "stamp-hit", .5), ("ZIntro", 5.2, "sparkle-soft", .3),
    ("ZTrap", 2.0, "ui-click-soft", .3), ("ZTrap", 5.0, "ui-click-soft", .3), ("ZTrap", 8.0, "trap-snap", .38),
    ("ZTrust", 4.4, "warm-shimmer", .33), ("ZTrust", 6.8, "ui-click-soft", .25), ("ZTrust", 7.9, "ui-click-soft", .25), ("ZTrust", 9.0, "ui-click-soft", .25),
    ("ZNervix", 2.4, "pop-reveal", .35), ("ZNervix", 8.8, "ui-click-soft", .28),
    ("ZWhoJoins", 5.4, "ui-click-soft", .3), ("ZWhoJoins", 7.7, "ui-click-soft", .3), ("ZWhoJoins", 10.0, "ui-click-soft", .3),
    ("ZFrontDoor", 2.0, "pop-reveal", .3), ("ZFrontDoor", 3.7, "pop-reveal", .3), ("ZFrontDoor", 7.0, "stream-soft", .25),
    ("ZDexterIntro", 5.0, "trap-snap", .4),
    ("Z14k", 6.0, "keys-typing-soft", .28), ("Z14k", 11.0, "impact-soft", .45), ("Z14k", 13.3, "ui-click-soft", .3), ("Z14k", 14.3, "ui-click-soft", .3),
    ("ZCards", 2.0, "pop-reveal", .35), ("ZCards", 8.7, "chess-piece-thock", .4), ("ZCards", 10.7, "chess-piece-thock", .4), ("ZCards", 12.7, "chess-piece-thock", .45),
    ("ZPoker", 6.3, "chess-piece-thock", .4), ("ZPoker", 8.0, "chess-piece-thock", .4), ("ZPoker", 9.7, "chess-piece-thock", .45), ("ZPoker", 12.0, "trap-snap", .35),
    ("ZZmarty", 2.4, "pop-reveal", .35), ("ZZmarty", 9.4, "ui-click-soft", .28),
    ("ZSienna", 6.7, "ui-click-soft", .3), ("ZSienna", 7.4, "stream-soft", .25), ("ZSienna", 11.0, "trap-snap", .33),
    ("ZTeacher", 7.3, "pop-reveal", .3), ("ZTeacher", 9.3, "pop-reveal", .3), ("ZTeacher", 11.3, "pop-reveal", .3), ("ZTeacher", 14.7, "warm-shimmer", .33),
    ("ZSemeClaw", 3.0, "keys-typing-soft", .3), ("ZSemeClaw", 6.3, "keys-typing-soft", .3), ("ZSemeClaw", 10.0, "keys-typing-soft", .3),
    ("ZAdsLoop", 4.0, "ui-click-soft", .3), ("ZAdsLoop", 7.3, "pop-reveal", .33), ("ZAdsLoop", 10.7, "ui-click-soft", .3), ("ZAdsLoop", 14.7, "warm-shimmer", .32),
    ("ZFlywheel", 2.0, "ui-toggle-on", .3), ("ZFlywheel", 4.3, "ui-toggle-on", .3), ("ZFlywheel", 8.7, "ui-toggle-on", .3),
    ("ZFlywheel", 13.3, "ui-toggle-on", .3), ("ZFlywheel", 18.0, "ui-toggle-on", .32), ("ZFlywheel", 22.0, "stream-soft", .28),
    ("ZSpin", 2.0, "riser-soft", .4), ("ZSpin", 3.0, "warm-shimmer", .38),
    ("ZHumanBeat", 6.7, "ui-click-soft", .28), ("ZHumanBeat", 14.3, "stamp-hit", .4),
    ("ZMissing", 3.0, "ui-toggle-on", .3), ("ZMissing", 5.3, "ui-toggle-on", .3), ("ZMissing", 8.3, "glitch-zap", .4), ("ZMissing", 11.3, "trap-snap", .38),
    ("ZPromise", 8.7, "pop-reveal", .38),
    ("ZOutro", 7.5, "ui-toggle-on", .4), ("ZOutro", 11.5, "chess-piece-thock", .45), ("ZOutro", 12.5, "chess-piece-thock", .45), ("ZOutro", 13.5, "chess-piece-thock", .45),
]
sidx = {sh: i for i, (sh, _) in enumerate(ORDER) if not isinstance(sh, tuple)}
for sh, loc, name, vol in CLICKS:
    if sh in sidx:
        sfx_events.append((starts[sidx[sh]] + loc, f"{SFX}/{name}.mp3", vol))

sfx_events = [(t, f, v) for (t, f, v) in sfx_events if os.path.exists(f)]
if sfx_events:
    sfx_events.sort()
    group_wavs = []
    G = 40
    for g in range(0, len(sfx_events), G):
        grp = sfx_events[g:g + G]
        ins, parts = [], []
        for k, (t, f, v) in enumerate(grp):
            ins += ["-i", f]
            ms = int(t * 1000)
            parts.append(f"[{k}:a]volume={v},adelay={ms}|{ms}[s{k}]")
        fc = ";".join(parts) + ";" + "".join(f"[s{k}]" for k in range(len(grp))) + \
             f"amix=inputs={len(grp)}:normalize=0,apad=whole_dur={TOTAL:.3f}[out]"
        gw = f"{WORK}/mix/_sfxg{g//G}.wav"
        subprocess.run(["ffmpeg", "-y", "-v", "error"] + ins + ["-filter_complex", fc, "-map", "[out]",
                        "-ar", "48000", "-ac", "1", "-t", f"{TOTAL:.3f}", gw], check=True)
        group_wavs.append(gw)
    gins = sum((["-i", w] for w in group_wavs), [])
    gfc = "".join(f"[{k}:a]" for k in range(len(group_wavs))) + \
          f"amix=inputs={len(group_wavs)}:normalize=0[out]"
    subprocess.run(["ffmpeg", "-y", "-v", "error"] + gins + ["-filter_complex", gfc, "-map", "[out]",
                    "-ar", "48000", "-ac", "1", f"{WORK}/mix/sfx.wav"], check=True)
if False:
    ins, parts = [], []
    for k, (t, f, v) in enumerate(sfx_events):
        ins += ["-i", f]
        ms = int(t * 1000)
        parts.append(f"[{k}:a]volume={v},adelay={ms}|{ms}[s{k}]")
    fc = ";".join(parts) + ";" + "".join(f"[s{k}]" for k in range(len(sfx_events))) + \
         f"amix=inputs={len(sfx_events)}:normalize=0,apad=whole_dur={TOTAL:.3f}[out]"
    subprocess.run(["ffmpeg", "-y", "-v", "error"] + ins + ["-filter_complex", fc, "-map", "[out]",
                    "-ar", "48000", "-ac", "1", "-t", f"{TOTAL:.3f}", f"{WORK}/mix/sfx.wav"], check=True)

# MUSIC bed — ducked under voice, loudnorm master
MUSIC = os.path.expanduser("~/Projects/Claude-Youtube/media/library/music/clips")
bed = None
if os.path.isdir(MUSIC):
    cands = [f for f in sorted(os.listdir(MUSIC)) if f.endswith((".mp3", ".wav", ".m4a"))]
    if cands:
        bed = f"{MUSIC}/{cands[0]}"

have_sfx = os.path.exists(f"{WORK}/mix/sfx.wav")
if bed:
    n = 3 if have_sfx else 2
    sfx_in = ["-i", f"{WORK}/mix/sfx.wav"] if have_sfx else []
    sfx_lbl = "[2:a]" if have_sfx else ""
    fc = (f"[1:a]aloop=loop=-1:size=2e9,atrim=0:{TOTAL:.3f},volume=0.16[m];"
          f"[0:a]asplit=2[v1][v2];"
          f"[m][v1]sidechaincompress=threshold=0.03:ratio=12:attack=5:release=400[duck];"
          f"[v2][duck]{sfx_lbl}amix=inputs={n}:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[out]")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", f"{WORK}/mix/voice.wav", "-i", bed] + sfx_in +
                   ["-filter_complex", fc, "-map", "[out]", "-ar", "48000",
                    f"{WORK}/mix/master.wav"], check=True)
else:
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", f"{WORK}/mix/voice.wav",
                    "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-ar", "48000",
                    f"{WORK}/mix/master.wav"], check=True)

if "--no-mux" in sys.argv:
    print("audio + concat rebuilt; skipping legacy mux (use work/mux_chunked.py)")
    sys.exit(0)

# MUX — composite the persistent HUD bar (YHud.mov, alpha) into the reserved
# bottom 70px, with quick fade-through-black at chapter boundaries.
out = f"{EP}/danslab-episode-10-payroll-{TAG.upper()}-v2.mp4"
hud = f"{OUT}/YHud.mov"
W, H = (3840, 2160) if TAG == "4k" else (1920, 1080)
chapters = ["YRules", "YIron", "YDoor", "YPlumb", "YAttrib", "YReckon", "YAuditOpen", "YVsOpen", "YWhy", "YNext"]
idx = {s: i for i, (s, _) in enumerate(ORDER) if not isinstance(s, tuple)}
fades = ""
for c in chapters:
    T = starts[idx[c]]
    fades += f",fade=t=out:st={T - 0.4:.3f}:d=0.4,fade=t=in:st={T:.3f}:d=0.4"
if os.path.exists(hud):
    fc = (f"[0:v]null{fades}[base];"
          f"[1:v]scale={W}:{int(70 * H / 1080)}[hud];"
          f"[base][hud]overlay=0:{H - int(70 * H / 1080)}:shortest=0[v]")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", f"{WORK}/video_full_{TAG}.mp4", "-i", hud,
                    "-i", f"{WORK}/mix/master.wav", "-filter_complex", fc,
                    "-map", "[v]", "-map", "2:a", "-c:v", "libx264", "-preset", "medium",
                    "-crf", "17" if TAG == "4k" else "18", "-pix_fmt", "yuv420p",
                    "-c:a", "aac", "-b:a", "256k", "-shortest", out], check=True)
else:
    print("NOTE: YHud.mov missing — muxing without the ledger bar")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", f"{WORK}/video_full_{TAG}.mp4",
                    "-i", f"{WORK}/mix/master.wav", "-map", "0:v", "-map", "1:a",
                    "-c:v", "copy", "-c:a", "aac", "-b:a", "256k", "-shortest", out], check=True)
print(f"wrote {out}")
