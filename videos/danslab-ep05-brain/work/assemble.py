#!/usr/bin/env python3
"""Assemble Episode 05 — The Brain. Usage: python assemble.py [--tag 4k]"""
import json, subprocess, os, sys

OUT = os.path.expanduser("~/Projects/Claude-Youtube/remotion/out")
WORK = os.path.dirname(os.path.abspath(__file__))
SFX = os.path.expanduser("~/Projects/Claude-Youtube/media/library/sfx/clips")
MUSIC = os.path.expanduser("~/Projects/Claude-Youtube/media/library/music/clips")
TAG = "4k" if "--tag" in sys.argv and sys.argv[sys.argv.index("--tag") + 1] == "4k" else "1080p"

ORDER = [
    ("NIntro", None, 0), ("NRecap", "s01_recap", 0.8),
    ("NB1", None, 0), ("NDefine", "s02_define", 0.8), ("NHermes", "s02b_hermes", 0.8), ("NProblem", "s03_problem", 0.8),
    ("NAttention", "s03b_attention", 0.8), ("NPerceive", "s04_perceive", 0.8), ("NBoard", "s04b_board", 0.8),
    ("NB2", None, 0), ("NThink", "s05_think", 0.8), ("NScore", "s06_score", 0.8), ("NQueue", "s06b_queue", 0.8),
    ("NRoute", "s07_route", 0.8), ("NLanguage", "s07b_language", 0.8), ("NModels", "s07c_models", 0.8), ("NReason", "s08_reason", 0.8), ("NOptions", "s08b_options", 0.8),
    ("NB3", None, 0), ("NWatch", "s09_watch", 0.8), ("NLearn", "s10_learn", 0.8), ("NDossier", "s10b_dossier", 0.8), ("NMemory", "s10c_memory", 0.8), ("NUpgrade", "s11_upgrade", 0.8),
    ("NNight", "s11b_night", 0.8), ("NClock", "s11c_clock", 0.8), ("NResult", "s12_result", 0.8), ("NLimits", "s12b_limits", 0.8), ("NCliff", "s13_cliff", 0.8), ("NOutro", "s14_outro", 1.0),
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

with open(f"{OUT}/e5_concat.txt", "w") as f:
    for s, _, _ in ORDER: f.write(f"file '{s}.mp4'\n")
subprocess.run(["ffmpeg","-y","-v","error","-f","concat","-safe","0","-i",f"{OUT}/e5_concat.txt",
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
    f = "whoosh-wind" if s in ("NB1","NB2","NB3","NHermes","NThink","NPerceive","NCliff","NOutro","NResult") else "whoosh-soft"
    cues.append((i, 0.0, f, 0.40))
def sc(name): return [i for i,(s,_,_) in enumerate(ORDER) if s==name][0]
beats = {
 "NBoard":[(2.4,"ui-click-soft",.32),(4.0,"ui-click-soft",.3),(6.2,"scan-hum",.3),(10.4,"ui-click-soft",.3),(19.0,"warm-shimmer",.38)],
 "NDossier":[(2.6,"page-flip",.36),(3.8,"page-flip",.36),(5.0,"page-flip",.36),(6.2,"page-flip",.36),(10.4,"warm-shimmer",.4)],
 "NMemory":[(3.0,"impact-deep-soft",.46),(3.3,"warm-shimmer",.4),(7.7,"scan-hum",.3),(17.3,"chime-magic",.48)],
 "NClock":[(3.0,"clock-tick-soft",.34),(3.9,"clock-tick-soft",.32),(4.8,"clock-tick-soft",.3),(5.7,"clock-tick-soft",.28),(12.4,"riser-soft",.4),(13.6,"chime-reward",.44)],
 "NLimits":[(3.8,"knock-solid",.42),(4.7,"knock-solid",.38),(5.6,"knock-solid",.34),(8.6,"ui-send",.4),(9.8,"ui-send",.36),(11.2,"ui-send",.36),(14.6,"ui-send",.44)],

 "NIntro":[(0.9,"impact-deep-soft",.5),(1.4,"sparkle-soft",.4),(5.0,"pop-reveal",.42)],
 "NRecap":[(11.0,"riser-soft",.38),(11.4,"chime-magic",.5)],
 "NB1":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "NDefine":[(5.0,"page-flip",.35),(7.6,"chime-magic",.45),(11.0,"warm-shimmer",.4)],
 "NHermes":[(2.0,"scan-hum",.35),(2.4,"riser-soft",.4),(5.6,"chime-magic",.55)],
 "NProblem":[(4.0,"pop-reveal",.32),(5.0,"pop-reveal",.32),(6.0,"pop-reveal",.32),(10.0,"impact-soft",.42)],
 "NAttention":[(5.3,"trap-snap",.35),(6.1,"trap-snap",.35),(10.3,"impact-deep-soft",.5)],
 "NPerceive":[(3.2,"ui-click-soft",.32),(7.0,"ui-click-soft",.32),(9.0,"scan-hum",.3)],
 "NB2":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "NThink":[(3.5,"scan-hum",.4),(14.0,"chime-magic",.5)],
 "NScore":[(5.0,"ui-toggle-on",.35),(6.0,"scan-hum",.3),(14.6,"chime-reward",.45)],
 "NQueue":[(4.0,"page-flip",.35),(6.0,"ui-click-soft",.3),(8.0,"ui-click-soft",.3)],
 "NRoute":[(4.0,"scan-hum",.3),(6.0,"launch-thump",.4),(9.0,"chime-reward",.45)],
 "NLanguage":[(4.6,"pop-reveal",.35),(5.6,"pop-reveal",.35),(6.6,"pop-reveal",.35)],
 "NModels":[(4.0,"pop-reveal",.36),(6.7,"pop-reveal",.34),(9.3,"pop-reveal",.34),(26.0,"chime-reward",.45)],
 "NReason":[(4.3,"scan-hum",.3),(11.0,"chime-magic",.5)],
 "NOptions":[(6.0,"glitch-zap",.4),(10.6,"whoosh-soft",.35),(12.6,"chime-reward",.45)],
 "NB3":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "NWatch":[(4.0,"stream-soft",.32),(8.0,"stream-soft",.32),(11.3,"impact-soft",.4)],
 "NLearn":[(4.6,"keys-typing-soft",.3),(5.7,"keys-typing-soft",.3),(6.8,"keys-typing-soft",.3),(7.9,"keys-typing-soft",.3)],
 "NUpgrade":[(5.3,"ui-toggle-on",.4),(6.0,"ui-toggle-on",.4),(6.7,"chime-reward",.45)],
 "NNight":[(1.4,"warm-shimmer",.4),(5.6,"chime-magic",.4)],
 "NResult":[(4.0,"pop-reveal",.4),(5.0,"pop-reveal",.4),(6.0,"pop-reveal",.4),(11.3,"chime-reward",.5)],
 "NCliff":[(15.6,"riser-soft",.42),(16.0,"impact-deep-soft",.55)],
 "NOutro":[(0.8,"impact-soft",.5),(2.0,"chime-reward",.45),(11.6,"ui-click-soft",.35),(14.9,"impact-soft",.45)],
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

# MUSIC — reflective open -> tech middle -> reflective close (present bed)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{MUSIC}/cinematic-min.mp3","-af","atrim=0:80","-ar","48000","-ac","2",f"{WORK}/mix/mA.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-stream_loop","8","-i",f"{MUSIC}/tech-pulse.mp3","-af","atrim=0:360","-ar","48000","-ac","2",f"{WORK}/mix/mB.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{MUSIC}/cinematic-min.mp3","-af","atrim=0:140","-ar","48000","-ac","2",f"{WORK}/mix/mC.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/mA.wav","-i",f"{WORK}/mix/mB.wav","-i",f"{WORK}/mix/mC.wav",
                "-filter_complex","[0:a][1:a]acrossfade=d=3:c1=tri:c2=tri[ab];[ab][2:a]acrossfade=d=3:c1=tri:c2=tri[abc]","-map","[abc]",f"{WORK}/mix/music_long.wav"], check=True)
fadeout = float(TOTAL) - 5.0
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/music_long.wav","-af",
                f"apad=whole_dur={TOTAL},atrim=0:{TOTAL},afade=t=in:st=0:d=1.5,afade=t=out:st={fadeout:.2f}:d=5.0",f"{WORK}/mix/music.wav"], check=True)
# softer, present duck (matches Ep04 fix)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/music.wav","-i",f"{WORK}/mix/voice.wav","-filter_complex",
                "[0:a][1:a]sidechaincompress=threshold=0.06:ratio=3:attack=40:release=420:makeup=1[d]","-map","[d]",f"{WORK}/mix/music_ducked.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/voice.wav","-i",f"{WORK}/mix/music_ducked.wav","-i",f"{WORK}/mix/sfx.wav",
                "-filter_complex","[1:a]volume=0.62[m];[0:a][m][2:a]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[out]","-map","[out]","-ar","48000","-ac","2",f"{WORK}/mix/master_audio.wav"], check=True)

final = os.path.expanduser(f"~/Projects/Claude-Youtube/videos/danslab-ep05-brain/danslab-episode-05-brain-{TAG.upper()}.mp4")
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/video_full_{TAG}.mp4","-i",f"{WORK}/mix/master_audio.wav",
                "-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","224k","-ac","2","-shortest",final], check=True)
print("FINAL:", final, f"{dur(final):.1f}s")
