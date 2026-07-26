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
    ("YIntro",     []),
    ("YHook",      [("open01", 0.5), ("open02", 3.1), ("open03", 4.6)]),
    ("YAsk",       [("open04", 0.6), ("open05", 3.2), ("open06", 7.4)]),
    (("CLIP", f"{EP}/plates/montage{'-4k' if TAG == '4k' else ''}.mp4"), []),
    ("YTonight",   [("open07", 0.8)]),
    ("YRules",     [("rules01", 0.8)]),
    ("YHonest",    [("rules02", 0.8)]),
    ("YIron",      [("iron01", 0.8)]),
    ("YSpec",      [("iron02", 0.8), ("iron03", 31.0)]),
    ("YMini",      [("iron04", 0.6), ("iron05", 10.2)]),
    ("YFrankfurt", [("iron06", 0.6), ("iron07", 13.8)]),
    ("YWhyFour",   [("iron08", 0.5), ("iron09", 6.0)]),
    ("YDoor",      [("brain01", 0.8)]),
    ("YLaw",       [("brain02", 0.5), ("brain03", 5.2)]),
    ("YSubs",      [("brain04", 0.6), ("brain05", 10.6), ("brain06", 18.5)]),
    ("YInvert",    [("brain07", 0.6), ("brain08", 10.2)]),
    ("YCaps",      [("brain09", 0.5), ("brain10", 10.5)]),
    ("YPlumb",     [("plumb01", 0.6), ("plumb02", 14.0)]),
    ("YTools",     [("plumb03", 0.8)]),
    ("YLock",      [("plumb04", 0.8)]),
    ("YAttrib",    [("pay01", 0.8)]),
    ("YDexter",    [("pay02", 0.6), ("pay03", 20.3)]),
    ("YSienna",    [("pay04", 0.7)]),
    ("YNano",      [("pay05", 0.6), ("pay06", 17.2)]),
    ("YFinance",   [("pay07", 0.7)]),
    ("YMemo",      [("pay08", 0.8)]),
    ("YDoctor",    [("pay09", 0.8)]),
    ("YOnCall",    [("pay10", 0.7)]),
    ("YDavid",     [("pay11", 0.8)]),
    ("YClosure",   [("pay12", 0.8)]),
    ("YHermes",    [("pay13", 0.6), ("pay14", 10.4)]),
    ("YLadder",    [("pay15", 0.7)]),
    ("YReckon",    [("reck01", 0.7)]),
    ("YSlam89",    [("reck02", 0.6)]),
    ("YCoverage",  [("reck03", 0.7)]),
    ("YSlam398",   [("reck04", 0.8)]),
    ("YDiscount",  [("reck05", 0.8)]),
    ("YSlam159",   [("reck06", 0.8)]),
    ("YAuditOpen", [("audit01", 0.7)]),
    ("YGood",      [("audit02", 0.8)]),
    ("YPaused",    [("audit03", 0.7)]),
    ("YBroken",    [("audit04", 0.8)]),
    ("YZero",      [("audit05", 0.8)]),
    ("YThread",    [("audit06", 0.6), ("audit07", 5.6)]),
    ("YGreenDead", [("audit08", 0.8)]),
    ("YLesson",    [("audit09", 0.8)]),
    ("YOneLine",   [("audit10", 0.5)]),
    ("YVerdict",   [("audit11", 0.7)]),
    ("YVsOpen",    [("vs01", 0.6)]),
    ("YHumanBill", [("vs02", 0.7)]),
    ("YOverhead",  [("vs03", 0.6), ("vs04", 20.4)]),
    ("YAllIn",     [("vs05", 0.7)]),
    ("YHours",     [("vs06", 0.6), ("vs07", 24.4)]),
    ("YPerHour",   [("vs08", 0.6), ("vs09", 23.8)]),
    ("YWhy",       [("why01", 0.7)]),
    ("YFive",      [("why02", 0.8)]),
    ("YSeason2",   [("why03", 0.5), ("why04", 12.2)]),
    ("YNext",      []),
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
IMPACT = ("YSlam89", "YSlam398", "YSlam159", "YLock", "YReckon")
CHIME = ("YSeason2",)
sfx_events = []  # (time, file, vol)
for i, (s, _) in enumerate(ORDER):
    if i == 0 or isinstance(s, tuple):
        continue
    if s in IMPACT:
        sfx_events.append((starts[i] + 0.05, f"{SFX}/impact-deep-soft.mp3", 0.5))
    elif s in CHIME:
        sfx_events.append((starts[i] + 0.05, f"{SFX}/chime-reward.mp3", 0.4))
    elif s in ("YHook", "YTonight", "YAttrib", "YAuditOpen", "YVsOpen", "YWhy"):
        sfx_events.append((starts[i], f"{SFX}/whoosh-wind.mp3", 0.42))
    else:
        sfx_events.append((starts[i], f"{SFX}/whoosh-soft.mp3", 0.3))
slam159_at = starts[[s for s, _ in ORDER].index("YSlam159")]
sfx_events.append((max(0, slam159_at - 3.0), f"{SFX}/riser-soft.mp3", 0.45))
# intro sound design: ticking under the payroll record, riser into the title stamp
sfx_events.append((0.6, f"{SFX}/clock-tick-soft.mp3", 0.35))
sfx_events.append((5.0, f"{SFX}/riser-soft.mp3", 0.4))
sfx_events.append((7.85, f"{SFX}/impact-deep-soft.mp3", 0.5))
# end tease: impact on the NEXT card
next_at = starts[[s for s, _ in ORDER].index("YNext")]
sfx_events.append((next_at + 0.05, f"{SFX}/impact-deep-soft.mp3", 0.45))
sfx_events = [(t, f, v) for (t, f, v) in sfx_events if os.path.exists(f)]
if sfx_events:
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
