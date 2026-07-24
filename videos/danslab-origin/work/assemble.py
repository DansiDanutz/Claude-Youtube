#!/usr/bin/env python3
"""Assemble Episode 01 — Origin. RECONSTRUCTED assembler (the pilot shipped
without a committed one). Play order = narrative scene order + logo intro +
4 bumpers as chapter breaks; DoSemeClaw slotted after Nervix. Review pacing."""
import subprocess, os

OUT = os.path.expanduser("~/Projects/Claude-Youtube/remotion/out")
WORK = os.path.dirname(os.path.abspath(__file__))
SFX = os.path.expanduser("~/Projects/Claude-Youtube/media/library/sfx/clips")
MUSIC = os.path.expanduser("~/Projects/Claude-Youtube/media/library/music/clips")

# scene shot -> narration id (None = no VO), vo offset seconds
ORDER = [
    ("DoLogoIntro", None, 0),
    ("DoHook", "o01_hook", 0.8),
    ("DoDan", "o02_dan", 0.8), ("DoJourney", "o02b_journey", 0.8),
    ("DoBumperOne", None, 0),
    ("DoProblem", "o03_problem", 0.8), ("DoManifesto", "o03b_manifesto", 0.8),
    ("DoLab", "o04_lab", 0.8), ("DoLabTour", "o04b_labtour", 0.8),
    ("DoBrain", "o05_brain", 0.8), ("DoModels", "o05b_models", 0.8),
    ("DoPaperclip", "o06_paperclip", 0.8), ("DoTelegram", "o06b_telegram", 0.8), ("DoDay", "o06c_day", 0.8),
    ("DoBumperTwo", None, 0),
    ("DoPipeline", "o07_pipeline", 0.8), ("DoPipeDeep", "o07b_pipedeep", 0.8),
    ("DoWorldCup", "o08_worldcup", 0.8), ("DoFlywheel", "o08b_flywheel", 0.8),
    ("DoZmarty", "o09_zmarty", 0.8),
    ("DoNervix", "o10_nervix", 0.8), ("DoSemeClaw", "o10b_semeclaw", 0.8),
    ("DoBumperThree", None, 0),
    ("DoKrypto", "o11_krypto", 0.8), ("DoCrewWall", "o11b_crew", 0.8), ("DoEconomics", "o11c_econ", 0.8),
    ("DoThesis", "o12_thesis", 0.8), ("DoVision", "o12b_vision", 0.8),
    ("DoBumperFour", None, 0),
    ("DoFamily", "o13_family", 0.8), ("DoNext", "o13b_next", 0.8), ("DoOutro", "o14_outro", 1.0),
]


def dur(path):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
                                capture_output=True, text=True).stdout.strip())


durs = [dur(f"{OUT}/{s}.mp4") for s, _, _ in ORDER]
starts, t = [], 0.0
for d in durs:
    starts.append(t); t += d
TOTAL = f"{t:.3f}"
print(f"total {t:.1f}s = {int(t//60)}:{int(t%60):02d}")

with open(f"{OUT}/e1_concat.txt", "w") as f:
    for s, _, _ in ORDER:
        f.write(f"file '{s}.mp4'\n")
subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", f"{OUT}/e1_concat.txt",
                "-c", "copy", f"{WORK}/video_full_4k.mp4"], check=True)

# VOICE
inputs, delays, vi = [], [], 0
for i, (s, vo, off) in enumerate(ORDER):
    if not vo:
        continue
    inputs += ["-i", f"{WORK}/mix/{vo}.wav"]
    ms = int((starts[i] + off) * 1000)
    delays.append(f"[{vi}:a]adelay={ms}|{ms}[v{vi}]"); vi += 1
fc = ";".join(delays) + ";" + "".join(f"[v{j}]" for j in range(vi)) + f"amix=inputs={vi}:normalize=0,apad=whole_dur={TOTAL}[out]"
subprocess.run(["ffmpeg", "-y", "-v", "error"] + inputs + ["-filter_complex", fc, "-map", "[out]", "-t", TOTAL, f"{WORK}/mix/voice.wav"], check=True)

# SFX — whoosh on every scene start + light per-scene beats
cues = []
BIG = ("DoLogoIntro", "DoBumperOne", "DoBumperTwo", "DoBumperThree", "DoBumperFour", "DoOutro", "DoHook", "DoNervix", "DoSemeClaw")
for i, (s, vo, off) in enumerate(ORDER):
    if i == 0:
        continue
    cues.append((i, 0.0, "whoosh-wind" if s in BIG else "whoosh-soft", 0.40))
def sc(name): return [i for i, (s, _, _) in enumerate(ORDER) if s == name][0]
beats = {
 "DoLogoIntro": [(0.8, "impact-deep-soft", .5), (1.6, "sparkle-soft", .4)],
 "DoHook": [(1.0, "riser-soft", .4), (4.0, "impact-soft", .44)],
 "DoNervix": [(2.0, "pop-reveal", .4), (6.0, "chime-magic", .44)],
 "DoSemeClaw": [(2.0, "impact-deep-soft", .46), (5.0, "pop-reveal", .34), (5.7, "pop-reveal", .32), (6.5, "pop-reveal", .32), (12.0, "chime-reward", .44)],
 "DoEconomics": [(3.0, "pop-reveal", .4), (8.0, "chime-reward", .44)],
 "DoOutro": [(1.5, "impact-soft", .5), (3.0, "chime-reward", .5)],
}
for name, bl in beats.items():
    idx = sc(name)
    for offb, ff, v in bl:
        cues.append((idx, offb, ff, v))
inputs, parts = [], []
for i, (scn, offb, ff, v) in enumerate(cues):
    inputs += ["-i", f"{SFX}/{ff}.mp3"]
    ms = int((starts[scn] + offb) * 1000); parts.append(f"[{i}:a]volume={v},adelay={ms}|{ms}[s{i}]")
fc = ";".join(parts) + ";" + "".join(f"[s{j}]" for j in range(len(cues))) + f"amix=inputs={len(cues)}:normalize=0,apad=whole_dur={TOTAL}[out]"
subprocess.run(["ffmpeg", "-y", "-v", "error"] + inputs + ["-filter_complex", fc, "-map", "[out]", "-ar", "48000", "-t", TOTAL, f"{WORK}/mix/sfx.wav"], check=True)
print(f"sfx: {len(cues)} cues")

# MUSIC — reflective open -> tech middle -> reflective close (sized for ~10 min)
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", f"{MUSIC}/cinematic-min.mp3", "-af", "atrim=0:70", "-ar", "48000", "-ac", "2", f"{WORK}/mix/mA.wav"], check=True)
subprocess.run(["ffmpeg", "-y", "-v", "error", "-stream_loop", "10", "-i", f"{MUSIC}/tech-pulse.mp3", "-af", "atrim=0:520", "-ar", "48000", "-ac", "2", f"{WORK}/mix/mB.wav"], check=True)
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", f"{MUSIC}/cinematic-min.mp3", "-af", "atrim=0:120", "-ar", "48000", "-ac", "2", f"{WORK}/mix/mC.wav"], check=True)
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", f"{WORK}/mix/mA.wav", "-i", f"{WORK}/mix/mB.wav", "-i", f"{WORK}/mix/mC.wav",
                "-filter_complex", "[0:a][1:a]acrossfade=d=3:c1=tri:c2=tri[ab];[ab][2:a]acrossfade=d=3:c1=tri:c2=tri[abc]", "-map", "[abc]", f"{WORK}/mix/music_long.wav"], check=True)
fadeout = float(TOTAL) - 5.0
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", f"{WORK}/mix/music_long.wav", "-af",
                f"apad=whole_dur={TOTAL},atrim=0:{TOTAL},afade=t=in:st=0:d=1.5,afade=t=out:st={fadeout:.2f}:d=5.0", f"{WORK}/mix/music.wav"], check=True)
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", f"{WORK}/mix/music.wav", "-i", f"{WORK}/mix/voice.wav", "-filter_complex",
                "[0:a][1:a]sidechaincompress=threshold=0.02:ratio=6:attack=60:release=700:makeup=1[d]", "-map", "[d]", f"{WORK}/mix/music_ducked.wav"], check=True)
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", f"{WORK}/mix/voice.wav", "-i", f"{WORK}/mix/music_ducked.wav", "-i", f"{WORK}/mix/sfx.wav",
                "-filter_complex", "[1:a]volume=0.42[m];[0:a][m][2:a]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[out]", "-map", "[out]", "-ar", "48000", f"{WORK}/mix/master_audio.wav"], check=True)

final = os.path.expanduser("~/Projects/Claude-Youtube/videos/danslab-origin/danslab-episode-01-origin-4K.mp4")
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", f"{WORK}/video_full_4k.mp4", "-i", f"{WORK}/mix/master_audio.wav",
                "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "224k", "-shortest", final], check=True)
print("FINAL:", final, f"{dur(final):.1f}s")
