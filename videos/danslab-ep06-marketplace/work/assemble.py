#!/usr/bin/env python3
"""Assemble Episode 06 — The Marketplace. Usage: python assemble.py [--tag 4k]"""
import subprocess, os, sys

OUT = os.path.expanduser("~/Projects/Claude-Youtube/remotion/out")
WORK = os.path.dirname(os.path.abspath(__file__))
SFX = os.path.expanduser("~/Projects/Claude-Youtube/media/library/sfx/clips")
MUSIC = os.path.expanduser("~/Projects/Claude-Youtube/media/library/music/clips")
TAG = "4k" if "--tag" in sys.argv and sys.argv[sys.argv.index("--tag") + 1] == "4k" else "1080p"

ORDER = [
    ("MIntro", None, 0), ("MRecap", "s01_recap", 0.8),
    ("MB1", None, 0), ("MDan", "s02_dan", 0.8), ("MPoker", "s03_poker", 0.8), ("MLife", "s04_life", 0.8), ("MTable", "s05_table", 0.8),
    ("MB2", None, 0), ("MEdge", "s06_edge", 0.8), ("MLocked", "s07_locked", 0.8), ("MIdea", "s08_idea", 0.8), ("MNervix", "s09_nervix", 0.8), ("MEnroll", "s09b_enroll", 0.8),
    ("MWays", "s10_ways", 0.8), ("MRoles", "s10b_roles", 0.8), ("MReal", "s11_real", 0.8), ("MEconomics", "s11b_economics", 0.8), ("MPowered", "s12_powered", 0.8), ("MReputation", "s12b_reputation", 0.8),
    ("MB3", None, 0), ("MWhy", "s13_why", 0.8), ("MAdopt", "s14_adopt", 0.8), ("MNano", "s14b_nano", 0.8), ("MFuel", "s15_fuel", 0.8), ("MOpen", "s15b_open", 0.8),
    ("MOutside", "s15c_outside", 0.8), ("MAdNow", "s15d_adnow", 0.8), ("MModel", "s15e_model", 0.8),
    ("MVision", "s16_vision", 0.8), ("MCliff", "s17_cliff", 0.8), ("MOutro", "s18_outro", 1.0),
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

with open(f"{OUT}/e6_concat.txt", "w") as f:
    for s, _, _ in ORDER: f.write(f"file '{s}.mp4'\n")
subprocess.run(["ffmpeg","-y","-v","error","-f","concat","-safe","0","-i",f"{OUT}/e6_concat.txt",
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
    f = "whoosh-wind" if s in ("MB1","MB2","MB3","MNervix","MPoker","MFuel","MCliff","MOutro","MPowered") else "whoosh-soft"
    cues.append((i, 0.0, f, 0.40))
def sc(name): return [i for i,(s,_,_) in enumerate(ORDER) if s==name][0]
beats = {
 "MEnroll":[(2.6,"keys-typing-soft",.34),(4.2,"pop-reveal",.36),(5.6,"pop-reveal",.36),(7.0,"ui-toggle-on",.36),(8.4,"chime-reward",.44),(19.4,"warm-shimmer",.4)],
 "MRoles":[(2.2,"pop-reveal",.32),(2.7,"pop-reveal",.3),(3.2,"pop-reveal",.3),(3.7,"pop-reveal",.3),(4.2,"pop-reveal",.3),(11.2,"whoosh-reverse",.34),(19.2,"chime-magic",.42)],
 "MEconomics":[(2.6,"ui-click-soft",.32),(4.0,"trap-snap",.36),(5.4,"chime-magic",.34),(6.8,"stamp-hit",.38),(8.2,"chime-reward",.44),(9.6,"sparkle-soft",.4),(14.0,"warm-shimmer",.38)],
 "MReputation":[(3.0,"scan-hum",.3),(4.2,"pop-reveal",.32),(5.4,"pop-reveal",.32),(6.6,"pop-reveal",.32),(11.4,"impact-soft",.46),(12.6,"glitch-zap",.32)],
 "MOpen":[(2.4,"knock-solid",.4),(6.6,"whoosh-reverse",.36),(7.6,"chime-magic",.44),(12.4,"warm-shimmer",.4)],
 "MOutside":[(2.7,"pop-reveal",.36),(5.0,"pop-reveal",.34),(9.3,"chime-magic",.44)],
 "MAdNow":[(2.0,"impact-deep-soft",.46),(2.3,"chime-magic",.44),(5.0,"pop-reveal",.34),(5.7,"pop-reveal",.32),(6.5,"pop-reveal",.32),(10.0,"chime-reward",.44),(14.3,"ui-toggle-on",.36)],
 "MModel":[(3.7,"pop-reveal",.36),(5.7,"pop-reveal",.34),(7.7,"pop-reveal",.34),(14.3,"chime-reward",.45)],

 "MIntro":[(0.9,"impact-deep-soft",.5),(1.4,"sparkle-soft",.4),(5.0,"pop-reveal",.42)],
 "MRecap":[(9.0,"warm-shimmer",.4),(11.6,"impact-soft",.42)],
 "MB1":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "MDan":[(2.0,"ui-click-soft",.32),(10.3,"page-flip",.4)],
 "MPoker":[(4.6,"page-flip",.35),(4.9,"page-flip",.35),(5.2,"page-flip",.35),(6.7,"chess-piece-thock",.4),(6.9,"chess-piece-thock",.4),(7.1,"chess-piece-thock",.4)],
 "MLife":[(5.3,"page-flip",.35),(5.6,"page-flip",.35),(5.9,"page-flip",.35),(11.0,"warm-shimmer",.4)],
 "MTable":[(5.0,"whoosh-reverse",.35),(10.3,"impact-soft",.42)],
 "MB2":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "MEdge":[(4.6,"pop-reveal",.35),(5.1,"pop-reveal",.35),(5.6,"pop-reveal",.35),(6.1,"pop-reveal",.35)],
 "MLocked":[(6.0,"knock-solid",.45),(10.3,"impact-soft",.42)],
 "MIdea":[(3.0,"warm-shimmer",.4),(6.6,"chime-magic",.45)],
 "MNervix":[(2.4,"riser-soft",.42),(5.6,"chime-magic",.55),(9.0,"ui-click-soft",.3)],
 "MWays":[(5.6,"pop-reveal",.4),(6.6,"pop-reveal",.4),(7.6,"pop-reveal",.4),(24.0,"chime-reward",.5)],
 "MReal":[(2.0,"ui-click-soft",.3),(6.0,"pop-reveal",.4),(7.0,"pop-reveal",.4),(8.0,"pop-reveal",.4)],
 "MPowered":[(6.0,"riser-soft",.4),(6.6,"chime-magic",.5)],
 "MB3":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "MWhy":[(2.0,"warm-shimmer",.4),(7.0,"impact-soft",.42)],
 "MAdopt":[(5.0,"ui-toggle-on",.35),(5.7,"ui-toggle-on",.35),(6.4,"ui-toggle-on",.35),(7.1,"chime-reward",.4)],
 "MNano":[(2.7,"pop-reveal",.36),(6.3,"scan-hum",.3),(10.0,"chime-reward",.44),(14.3,"impact-soft",.42)],
 "MFuel":[(2.4,"scan-hum",.35),(3.0,"stream-soft",.35),(10.0,"riser-soft",.4)],
 "MVision":[(2.0,"pop-reveal",.4),(3.3,"pop-reveal",.4),(4.6,"pop-reveal",.4),(8.0,"chime-magic",.45)],
 "MCliff":[(15.6,"riser-soft",.42),(16.6,"impact-deep-soft",.55)],
 "MOutro":[(0.8,"impact-soft",.5),(2.0,"chime-reward",.45),(11.0,"ui-click-soft",.35),(14.0,"impact-soft",.45)],
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
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{MUSIC}/cinematic-min.mp3","-af","atrim=0:78","-ar","48000","-ac","2",f"{WORK}/mix/mA.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-stream_loop","8","-i",f"{MUSIC}/tech-pulse.mp3","-af","atrim=0:380","-ar","48000","-ac","2",f"{WORK}/mix/mB.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{MUSIC}/cinematic-min.mp3","-af","atrim=0:130","-ar","48000","-ac","2",f"{WORK}/mix/mC.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/mA.wav","-i",f"{WORK}/mix/mB.wav","-i",f"{WORK}/mix/mC.wav",
                "-filter_complex","[0:a][1:a]acrossfade=d=3:c1=tri:c2=tri[ab];[ab][2:a]acrossfade=d=3:c1=tri:c2=tri[abc]","-map","[abc]",f"{WORK}/mix/music_long.wav"], check=True)
fadeout = float(TOTAL) - 5.0
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/music_long.wav","-af",
                f"apad=whole_dur={TOTAL},atrim=0:{TOTAL},afade=t=in:st=0:d=1.5,afade=t=out:st={fadeout:.2f}:d=5.0",f"{WORK}/mix/music.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/music.wav","-i",f"{WORK}/mix/voice.wav","-filter_complex",
                "[0:a][1:a]sidechaincompress=threshold=0.06:ratio=3:attack=40:release=420:makeup=1[d]","-map","[d]",f"{WORK}/mix/music_ducked.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/voice.wav","-i",f"{WORK}/mix/music_ducked.wav","-i",f"{WORK}/mix/sfx.wav",
                "-filter_complex","[1:a]volume=0.62[m];[0:a][m][2:a]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[out]","-map","[out]","-ar","48000","-ac","2",f"{WORK}/mix/master_audio.wav"], check=True)

final = os.path.expanduser(f"~/Projects/Claude-Youtube/videos/danslab-ep06-marketplace/danslab-episode-06-marketplace-{TAG.upper()}.mp4")
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/video_full_{TAG}.mp4","-i",f"{WORK}/mix/master_audio.wav",
                "-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","224k","-ac","2","-shortest",final], check=True)
print("FINAL:", final, f"{dur(final):.1f}s")
