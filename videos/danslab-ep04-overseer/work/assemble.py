#!/usr/bin/env python3
"""Assemble Episode 04 — The Overseer. Usage: python assemble.py [--tag 4k]"""
import json, subprocess, os, sys

OUT = os.path.expanduser("~/Projects/Claude-Youtube/remotion/out")
WORK = os.path.dirname(os.path.abspath(__file__))
SFX = os.path.expanduser("~/Projects/Claude-Youtube/media/library/sfx/clips")
MUSIC = os.path.expanduser("~/Projects/Claude-Youtube/media/library/music/clips")
TAG = "4k" if "--tag" in sys.argv and sys.argv[sys.argv.index("--tag") + 1] == "4k" else "1080p"

ORDER = [
    ("OIntro", None, 0), ("ORecap", "s01_recap", 0.8),
    ("OB1", None, 0), ("ODan", "s02_dan", 0.8), ("OCeo", "s02b_ceo", 0.8), ("OMission", "s03_mission", 0.8),
    ("ODashboard", "s04_dashboard", 0.8), ("OBreak", "s05_break", 0.8), ("OChaos", "s06_chaos", 0.8),
    ("OB2", None, 0), ("OFind", "s07_find", 0.8), ("OControl", "s08_control", 0.8), ("OGovern", "s08b_govern", 0.8),
    ("OManaged", "s09_managed", 0.8), ("OSpine", "s10_spine", 0.8), ("OSee", "s11_see", 0.8),
    ("OB3", None, 0), ("OIndependent", "s12_independent", 0.8), ("OHermes", "s13_hermes", 0.8),
    ("OBeat", "s14_beat", 0.8), ("OBrain", "s15_brain", 0.8), ("OProfile", "s16b_profile", 0.8),
    ("OUpgrade", "s16_upgrade", 0.8), ("OClock", "s17_clock", 0.8), ("OCliff", "s18_cliff", 0.8), ("OOutro", "s19_outro", 1.0),
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

with open(f"{OUT}/e4_concat.txt", "w") as f:
    for s, _, _ in ORDER: f.write(f"file '{s}.mp4'\n")
subprocess.run(["ffmpeg","-y","-v","error","-f","concat","-safe","0","-i",f"{OUT}/e4_concat.txt",
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

# SFX
cues = []
for i, (s, vo, off) in enumerate(ORDER):
    if i == 0: continue
    f = "whoosh-wind" if s in ("OB1","OB2","OB3","OBreak","OChaos","OFind","OSpine","OHermes","OClock","OCliff","OOutro") else "whoosh-soft"
    cues.append((i, 0.0, f, 0.40))
def sc(name): return [i for i,(s,_,_) in enumerate(ORDER) if s==name][0]
beats = {
 "OIntro":[(0.9,"impact-deep-soft",.5),(1.4,"sparkle-soft",.4),(5.0,"pop-reveal",.42)],
 "ORecap":[(5.0,"ui-click-soft",.3),(11.0,"impact-soft",.4)],
 "OB1":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "ODan":[(5.0,"pop-reveal",.4),(6.3,"pop-reveal",.4),(7.6,"pop-reveal",.4)],
 "OCeo":[(7.0,"warm-shimmer",.4),(10.0,"impact-soft",.45)],
 "OMission":[(5.3,"chime-magic",.45),(9.0,"warm-shimmer",.4)],
 "ODashboard":[(4.0,"ui-toggle-on",.4),(9.3,"impact-soft",.4)],
 "OBreak":[(5.0,"glitch-zap",.5),(7.6,"glitch-zap",.5),(10.3,"glitch-zap",.5),(13.0,"glitch-zap",.5),(16.0,"impact-deep-soft",.5)],
 "OChaos":[(5.3,"whoosh-reverse",.4),(6.0,"whoosh-reverse",.35),(14.3,"impact-soft",.45)],
 "OB2":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "OFind":[(6.6,"riser-soft",.42),(7.0,"chime-reward",.5)],
 "OControl":[(4.0,"ui-toggle-on",.4),(5.3,"scan-hum",.3),(14.3,"impact-soft",.4)],
 "OGovern":[(4.3,"pop-reveal",.4),(5.5,"pop-reveal",.4),(6.7,"pop-reveal",.4),(7.9,"pop-reveal",.4)],
 "OManaged":[(5.3,"page-flip",.4),(6.9,"stamp-hit",.45),(11.6,"impact-soft",.4)],
 "OSpine":[(5.0,"scan-hum",.32),(6.0,"chime-magic",.45),(18.0,"impact-deep-soft",.5)],
 "OSee":[(2.0,"warm-shimmer",.4),(6.6,"chime-reward",.45)],
 "OB3":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "OIndependent":[(6.6,"glitch-zap",.42),(7.6,"glitch-zap",.42),(8.6,"glitch-zap",.42),(14.6,"impact-soft",.45)],
 "OHermes":[(1.5,"riser-soft",.42),(4.6,"chime-magic",.55)],
 "OBeat":[(5.3,"chime-reward",.45),(6.5,"chime-reward",.45),(7.7,"chime-reward",.45)],
 "OBrain":[(4.0,"riser-soft",.4),(6.6,"chime-magic",.5),(7.0,"stamp-hit",.5)],
 "OProfile":[(4.6,"ui-click-soft",.3),(7.6,"ui-click-soft",.3),(10.6,"ui-click-soft",.3),(13.6,"ui-click-soft",.3)],
 "OUpgrade":[(5.3,"ui-toggle-on",.4),(6.0,"ui-toggle-on",.4),(6.7,"ui-toggle-on",.4),(7.4,"chime-reward",.45)],
 "OClock":[(6.6,"scan-hum",.32),(7.6,"chime-magic",.4)],
 "OCliff":[(15.6,"riser-soft",.42),(16.0,"impact-deep-soft",.55)],
 "OOutro":[(0.8,"impact-soft",.5),(2.0,"chime-reward",.45),(11.6,"ui-click-soft",.35),(14.9,"impact-soft",.45)],
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
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{MUSIC}/cinematic-min.mp3","-af","atrim=0:80","-ar","48000","-ac","2",f"{WORK}/mix/mA.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-stream_loop","4","-i",f"{MUSIC}/tech-pulse.mp3","-af","atrim=0:280","-ar","48000","-ac","2",f"{WORK}/mix/mB.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{MUSIC}/cinematic-min.mp3","-af","atrim=0:95","-ar","48000","-ac","2",f"{WORK}/mix/mC.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/mA.wav","-i",f"{WORK}/mix/mB.wav","-i",f"{WORK}/mix/mC.wav",
                "-filter_complex","[0:a][1:a]acrossfade=d=3:c1=tri:c2=tri[ab];[ab][2:a]acrossfade=d=3:c1=tri:c2=tri[abc]","-map","[abc]",f"{WORK}/mix/music_long.wav"], check=True)
fadeout = float(TOTAL) - 5.0
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/music_long.wav","-af",
                f"apad=whole_dur={TOTAL},atrim=0:{TOTAL},afade=t=in:st=0:d=1.5,afade=t=out:st={fadeout:.2f}:d=5.0",f"{WORK}/mix/music.wav"], check=True)
# softer, faster-recovering duck so the music bed stays present the whole way through
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/music.wav","-i",f"{WORK}/mix/voice.wav","-filter_complex",
                "[0:a][1:a]sidechaincompress=threshold=0.06:ratio=3:attack=40:release=420:makeup=1[d]","-map","[d]",f"{WORK}/mix/music_ducked.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/voice.wav","-i",f"{WORK}/mix/music_ducked.wav","-i",f"{WORK}/mix/sfx.wav",
                "-filter_complex","[1:a]volume=0.62[m];[0:a][m][2:a]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[out]","-map","[out]","-ar","48000","-ac","2",f"{WORK}/mix/master_audio.wav"], check=True)

final = os.path.expanduser(f"~/Projects/Claude-Youtube/videos/danslab-ep04-overseer/danslab-episode-04-overseer-{TAG.upper()}.mp4")
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/video_full_{TAG}.mp4","-i",f"{WORK}/mix/master_audio.wav",
                "-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","224k","-ac","2","-shortest",final], check=True)
print("FINAL:", final, f"{dur(final):.1f}s")
