#!/usr/bin/env python3
"""Assemble Episode 02 — measures rendered scene durations, builds voice+sfx+music, muxes 4K."""
import json, subprocess, os, sys

OUT = os.path.expanduser("~/Projects/Claude-Youtube/remotion/out")
WORK = os.path.dirname(os.path.abspath(__file__))
SFX = os.path.expanduser("~/Projects/Claude-Youtube/media/library/sfx/clips")
MUSIC = os.path.expanduser("~/Projects/Claude-Youtube/media/library/music/clips")

# scene -> narration id (None = no VO), vo offset seconds
ORDER = [
    ("E2Intro", None, 0), ("E2Recap", "s01_recap", 0.8), ("E2Love", "s02_love", 0.8),
    ("E2Nano", "s03_nano", 0.8), ("E2Memo", "s04_memo", 0.8), ("E2Dexter", "s05_dexter", 0.8),
    ("E2Alive", "s06_alive", 0.8), ("E2Heal", "s07_heal", 0.8), ("E2Chief", "s08_chief", 0.8),
    ("E2Keys", "s08b_keys", 0.8),
    ("E2Sienna", "s09_sienna", 0.8), ("E2Zmarty", "s10_zmarty", 0.8), ("E2Jobs", "s11_jobs", 0.8),
    ("E2Target", "s12_target", 0.8), ("E2Scoring", "s13_scoring", 0.8), ("E2Race", "s14_race", 0.8),
    ("E2Cliff", "s15_cliff", 0.8), ("E2Outro", "s16_outro", 1.0),
]

def dur(path):
    return float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",path],
                                capture_output=True, text=True).stdout.strip())

# measure rendered scene durations + compute starts
durs = [dur(f"{OUT}/{s}.mp4") for s, _, _ in ORDER]
starts, t = [], 0.0
for d in durs:
    starts.append(t); t += d
TOTAL = f"{t:.3f}"
print(f"total {t:.1f}s = {int(t//60)}:{int(t%60):02d}")

# concat video
with open(f"{OUT}/e2_concat.txt", "w") as f:
    for s, _, _ in ORDER: f.write(f"file '{s}.mp4'\n")
subprocess.run(["ffmpeg","-y","-v","error","-f","concat","-safe","0","-i",f"{OUT}/e2_concat.txt",
                "-c","copy",f"{WORK}/video_full_4k.mp4"], check=True)

# VOICE
inputs, delays, vi = [], [], 0
for i, (s, vo, off) in enumerate(ORDER):
    if not vo: continue
    inputs += ["-i", f"{WORK}/mix/{vo}.wav"]
    ms = int((starts[i] + off) * 1000)
    delays.append(f"[{vi}:a]adelay={ms}|{ms}[v{vi}]"); vi += 1
fc = ";".join(delays) + ";" + "".join(f"[v{j}]" for j in range(vi)) + f"amix=inputs={vi}:normalize=0,apad=whole_dur={TOTAL}[out]"
subprocess.run(["ffmpeg","-y","-v","error"]+inputs+["-filter_complex",fc,"-map","[out]","-t",TOTAL,f"{WORK}/mix/voice.wav"], check=True)

# SFX — whoosh on every scene start + per-scene beats
cues = []
for i, (s, vo, off) in enumerate(ORDER):
    if i == 0: continue
    f = "whoosh-wind" if s in ("E2Heal","E2Alive","E2Outro","E2Target","E2Cliff") else "whoosh-soft"
    cues.append((i, 0.0, f, 0.42))
def sc(name): return [i for i,(s,_,_) in enumerate(ORDER) if s==name][0]
beats = {
 "E2Intro":[(0.9,"impact-deep-soft",.5),(1.5,"sparkle-soft",.4),(5.6,"pop-reveal",.4)],
 "E2Recap":[(12.7,"pop-reveal",.35),(13.3,"impact-soft",.4),(13.9,"impact-soft",.4)],
 "E2Love":[(2.3,"warm-shimmer",.4),(3.2,"ui-send",.35),(5.0,"ui-send",.35),(11.3,"whoosh-soft",.4),(12.7,"impact-soft",.45)],
 "E2Nano":[(5.0,"keys-typing-soft",.3),(11.3,"glitch-zap",.5),(13.3,"impact-deep-soft",.5)],
 "E2Memo":[(10.0,"glitch-zap",.5),(12.0,"impact-deep-soft",.5)],
 "E2Dexter":[(5.0,"ui-click-soft",.3),(7.0,"ui-click-soft",.3),(8.9,"ui-click-soft",.3),(11.3,"impact-soft",.45)],
 "E2Alive":[(5.0,"riser-soft",.4),(6.5,"chime-reward",.55),(8.3,"pop-reveal",.4)],
 "E2Heal":[(10.0,"scan-hum",.35),(13.3,"riser-soft",.4),(13.5,"chime-magic",.5),(18.0,"chime-reward",.5)],
 "E2Chief":[(7.6,"riser-soft",.35),(8.5,"chime-reward",.55)],
 "E2Keys":[(1.8,"impact-soft",.45),(5.0,"pop-reveal",.34),(5.7,"pop-reveal",.32),(6.3,"pop-reveal",.32),(7.0,"pop-reveal",.32),(7.7,"pop-reveal",.32),(14.0,"riser-soft",.34),(14.6,"chime-reward",.5)],
 "E2Sienna":[(3.6,"ui-click-soft",.3),(5.0,"ui-click-soft",.3),(6.3,"ui-click-soft",.3),(10.0,"chime-magic",.5),(14.3,"pop-reveal",.4)],
 "E2Zmarty":[(2.0,"pop-reveal",.4),(11.3,"warm-shimmer",.4),(15.6,"pop-reveal",.4)],
 "E2Jobs":[(4.0,"pop-reveal",.4),(8.3,"pop-reveal",.4),(12.6,"pop-reveal",.4)],
 "E2Target":[(1.0,"whoosh-soft",.3),(2.0,"whoosh-soft",.3),(9.3,"impact-deep-soft",.55)],
 "E2Scoring":[(6.6,"scan-hum",.32),(13.3,"chime-magic",.45)],
 "E2Race":[(4.3,"ui-click-soft",.3),(5.1,"ui-click-soft",.3),(5.9,"ui-click-soft",.3),(6.7,"impact-soft",.4),(15.6,"chime-reward",.5)],
 "E2Cliff":[(3.2,"ui-click-soft",.3),(4.6,"ui-click-soft",.3),(6.1,"ui-click-soft",.3),(12.0,"impact-deep-soft",.55)],
 "E2Outro":[(1.5,"impact-soft",.5),(6.6,"pop-reveal",.4),(10.6,"chime-reward",.5),(13.3,"ui-click-soft",.35),(14.0,"ui-click-soft",.35),(14.7,"impact-soft",.45)],
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
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{MUSIC}/cinematic-min.mp3","-af","atrim=0:60","-ar","48000","-ac","2",f"{WORK}/mix/mA.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-stream_loop","3","-i",f"{MUSIC}/tech-pulse.mp3","-af","atrim=0:200","-ar","48000","-ac","2",f"{WORK}/mix/mB.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{MUSIC}/cinematic-min.mp3","-af","atrim=0:80","-ar","48000","-ac","2",f"{WORK}/mix/mC.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/mA.wav","-i",f"{WORK}/mix/mB.wav","-i",f"{WORK}/mix/mC.wav",
                "-filter_complex","[0:a][1:a]acrossfade=d=3:c1=tri:c2=tri[ab];[ab][2:a]acrossfade=d=3:c1=tri:c2=tri[abc]","-map","[abc]",f"{WORK}/mix/music_long.wav"], check=True)
fadeout = float(TOTAL) - 5.0
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/music_long.wav","-af",
                f"apad=whole_dur={TOTAL},atrim=0:{TOTAL},afade=t=in:st=0:d=1.5,afade=t=out:st={fadeout:.2f}:d=5.0",f"{WORK}/mix/music.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/music.wav","-i",f"{WORK}/mix/voice.wav","-filter_complex",
                "[0:a][1:a]sidechaincompress=threshold=0.02:ratio=6:attack=60:release=700:makeup=1[d]","-map","[d]",f"{WORK}/mix/music_ducked.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/voice.wav","-i",f"{WORK}/mix/music_ducked.wav","-i",f"{WORK}/mix/sfx.wav",
                "-filter_complex","[1:a]volume=0.42[m];[0:a][m][2:a]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[out]","-map","[out]","-ar","48000",f"{WORK}/mix/master_audio.wav"], check=True)

# mux
final = os.path.expanduser("~/Projects/Claude-Youtube/videos/danslab-ep02-survivors/danslab-episode-02-survivors-4K.mp4")
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/video_full_4k.mp4","-i",f"{WORK}/mix/master_audio.wav",
                "-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","224k","-shortest",final], check=True)
print("FINAL:", final, f"{dur(final):.1f}s")
