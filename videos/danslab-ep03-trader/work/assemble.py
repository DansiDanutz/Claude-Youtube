#!/usr/bin/env python3
"""Assemble Episode 03 — The Trader. Measures rendered scene durations, builds
voice+sfx+music, muxes. Usage: python assemble.py [--tag 4k]"""
import json, subprocess, os, sys

OUT = os.path.expanduser("~/Projects/Claude-Youtube/remotion/out")
WORK = os.path.dirname(os.path.abspath(__file__))
SFX = os.path.expanduser("~/Projects/Claude-Youtube/media/library/sfx/clips")
MUSIC = os.path.expanduser("~/Projects/Claude-Youtube/media/library/music/clips")
TAG = "4k" if "--tag" in sys.argv and sys.argv[sys.argv.index("--tag") + 1] == "4k" else "1080p"

# scene -> narration id (None = no VO), vo offset seconds
ORDER = [
    ("TIntro", None, 0), ("TRecap", "s01_recap", 0.8),
    ("TB1", None, 0), ("TPaper", "s02_paper", 0.8), ("TLearn", "s02b_learn", 0.8), ("TPerps", "s03_perps", 0.8),
    ("TB2", None, 0), ("TScore", "s04_score", 0.8), ("TRisk", "s05_risk", 0.8), ("TClusters", "s06_clusters", 0.8),
    ("TEntry", "s07_entry", 0.8), ("TLadder", "s08_ladder", 0.8), ("TExit", "s09_exit", 0.8), ("TLosses", "s10_losses", 0.8),
    ("TWalk", "s07b_walk", 0.8), ("TWon", "s07c_won", 0.8),
    ("TB3", None, 0), ("TResults", "s11_results", 0.8), ("TBrief", "s11b_brief", 0.8), ("TJournal", "s12b_journal", 0.8),
    ("TTrust", "s12_trust", 0.8), ("TRace", "s13_race", 0.8), ("TCliff", "s14_cliff", 0.8), ("TOutro", "s15_outro", 1.0),
]

def dur(path):
    return float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",path],
                                capture_output=True, text=True).stdout.strip())

durs = [dur(f"{OUT}/{s}.mp4") for s, _, _ in ORDER]
starts, t = [], 0.0
for d in durs:
    starts.append(t); t += d
TOTAL = f"{t:.3f}"
print(f"total {t:.1f}s = {int(t//60)}:{int(t%60):02d}")

# concat video
with open(f"{OUT}/e3_concat.txt", "w") as f:
    for s, _, _ in ORDER: f.write(f"file '{s}.mp4'\n")
subprocess.run(["ffmpeg","-y","-v","error","-f","concat","-safe","0","-i",f"{OUT}/e3_concat.txt",
                "-c","copy",f"{WORK}/video_full_{TAG}.mp4"], check=True)

# VOICE
inputs, delays, vi = [], [], 0
for i, (s, vo, off) in enumerate(ORDER):
    if not vo: continue
    inputs += ["-i", f"{WORK}/mix/{vo}.wav"]
    ms = int((starts[i] + off) * 1000)
    delays.append(f"[{vi}:a]adelay={ms}|{ms}[v{vi}]"); vi += 1
fc = ";".join(delays) + ";" + "".join(f"[v{j}]" for j in range(vi)) + f"amix=inputs={vi}:normalize=0,apad=whole_dur={TOTAL}[out]"
subprocess.run(["ffmpeg","-y","-v","error"]+inputs+["-filter_complex",fc,"-map","[out]","-t",TOTAL,f"{WORK}/mix/voice.wav"], check=True)

# SFX — whoosh on every scene start + per-scene beats keyed to reveals
cues = []
for i, (s, vo, off) in enumerate(ORDER):
    if i == 0: continue
    f = "whoosh-wind" if s in ("TB1","TB2","TB3","TLadder","TCliff","TOutro","TResults") else "whoosh-soft"
    cues.append((i, 0.0, f, 0.40))
def sc(name): return [i for i,(s,_,_) in enumerate(ORDER) if s==name][0]
beats = {
 "TIntro":[(0.9,"impact-deep-soft",.5),(1.4,"sparkle-soft",.4),(5.2,"pop-reveal",.42)],
 "TRecap":[(10.0,"riser-soft",.35),(10.4,"chime-magic",.5),(11.2,"pop-reveal",.4)],
 "TB1":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "TPaper":[(5.0,"stamp-hit",.5),(5.2,"pop-reveal",.4),(6.2,"pop-reveal",.4),(7.4,"pop-reveal",.4)],
 "TLearn":[(5.8,"scan-hum",.32),(6.0,"warm-shimmer",.4)],
 "TPerps":[(5.0,"ui-toggle-on",.4),(6.2,"ui-toggle-on",.4)],
 "TB2":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "TScore":[(6.0,"ui-click-soft",.32),(8.6,"ui-click-soft",.32),(11.3,"ui-click-soft",.32),(16.6,"chime-reward",.5)],
 "TRisk":[(10.0,"scan-hum",.32),(11.3,"impact-soft",.4),(14.3,"chime-magic",.45)],
 "TClusters":[(5.3,"pop-reveal",.35),(7.0,"pop-reveal",.35),(11.0,"impact-soft",.4)],
 "TEntry":[(5.6,"trap-snap",.4),(12.0,"impact-deep-soft",.5)],
 "TLadder":[(4.3,"trap-snap",.42),(8.3,"trap-snap",.42),(12.3,"trap-snap",.42),(16.3,"impact-soft",.45),(20.0,"chime-reward",.5)],
 "TExit":[(5.3,"ui-toggle-on",.4),(6.3,"chime-reward",.45)],
 "TLosses":[(5.3,"page-flip",.4),(6.6,"page-flip",.4),(12.0,"impact-soft",.45)],
 "TWalk":[(5.0,"ui-click-soft",.3),(10.0,"ui-click-soft",.3),(13.6,"ui-click-soft",.3)],
 "TWon":[(10.0,"riser-soft",.35),(18.6,"chime-reward",.55)],
 "TB3":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "TResults":[(5.3,"pop-reveal",.4),(6.6,"pop-reveal",.4),(8.0,"pop-reveal",.4),(9.3,"impact-deep-soft",.5)],
 "TBrief":[(5.0,"ui-click-soft",.28),(8.6,"warm-shimmer",.4)],
 "TJournal":[(5.0,"stamp-hit",.4),(6.0,"stamp-hit",.4),(7.0,"stamp-hit",.4),(8.0,"stamp-hit",.45)],
 "TTrust":[(5.3,"chime-magic",.5),(7.6,"pop-reveal",.38),(8.3,"pop-reveal",.38)],
 "TRace":[(5.3,"ui-click-soft",.3),(6.3,"ui-click-soft",.3),(7.3,"ui-click-soft",.3),(8.3,"impact-soft",.4)],
 "TCliff":[(15.6,"riser-soft",.42),(16.0,"impact-deep-soft",.55)],
 "TOutro":[(0.8,"impact-soft",.5),(2.0,"chime-reward",.45),(11.0,"ui-click-soft",.35),(14.3,"impact-soft",.45)],
}
for name, bl in beats.items():
    idx = sc(name)
    for offb, ff, v in bl: cues.append((idx, offb, ff, v))
inputs, parts = [], []
for i, (scn, offb, ff, v) in enumerate(cues):
    inputs += ["-i", f"{SFX}/{ff}.mp3"]
    ms = int((starts[scn] + offb) * 1000); parts.append(f"[{i}:a]volume={v},adelay={ms}|{ms}[s{i}]")
fc = ";".join(parts) + ";" + "".join(f"[s{j}]" for j in range(len(cues))) + f"amix=inputs={len(cues)}:normalize=0,apad=whole_dur={TOTAL}[out]"
subprocess.run(["ffmpeg","-y","-v","error"]+inputs+["-filter_complex",fc,"-map","[out]","-ar","48000","-t",TOTAL,f"{WORK}/mix/sfx.wav"], check=True)
print(f"sfx: {len(cues)} cues")

# MUSIC — reflective open -> tech middle -> reflective close
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{MUSIC}/cinematic-min.mp3","-af","atrim=0:75","-ar","48000","-ac","2",f"{WORK}/mix/mA.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-stream_loop","4","-i",f"{MUSIC}/tech-pulse.mp3","-af","atrim=0:260","-ar","48000","-ac","2",f"{WORK}/mix/mB.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{MUSIC}/cinematic-min.mp3","-af","atrim=0:90","-ar","48000","-ac","2",f"{WORK}/mix/mC.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/mA.wav","-i",f"{WORK}/mix/mB.wav","-i",f"{WORK}/mix/mC.wav",
                "-filter_complex","[0:a][1:a]acrossfade=d=3:c1=tri:c2=tri[ab];[ab][2:a]acrossfade=d=3:c1=tri:c2=tri[abc]","-map","[abc]",f"{WORK}/mix/music_long.wav"], check=True)
fadeout = float(TOTAL) - 5.0
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/music_long.wav","-af",
                f"apad=whole_dur={TOTAL},atrim=0:{TOTAL},afade=t=in:st=0:d=1.5,afade=t=out:st={fadeout:.2f}:d=5.0",f"{WORK}/mix/music.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/music.wav","-i",f"{WORK}/mix/voice.wav","-filter_complex",
                "[0:a][1:a]sidechaincompress=threshold=0.06:ratio=3:attack=40:release=420:makeup=1[d]","-map","[d]",f"{WORK}/mix/music_ducked.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/voice.wav","-i",f"{WORK}/mix/music_ducked.wav","-i",f"{WORK}/mix/sfx.wav",
                "-filter_complex","[1:a]volume=0.62[m];[0:a][m][2:a]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[out]","-map","[out]","-ar","48000","-ac","2",f"{WORK}/mix/master_audio.wav"], check=True)

# mux
final = os.path.expanduser(f"~/Projects/Claude-Youtube/videos/danslab-ep03-trader/danslab-episode-03-trader-{TAG.upper()}.mp4")
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/video_full_{TAG}.mp4","-i",f"{WORK}/mix/master_audio.wav",
                "-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","224k","-shortest",final], check=True)
print("FINAL:", final, f"{dur(final):.1f}s")
