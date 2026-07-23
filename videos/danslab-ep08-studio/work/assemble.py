#!/usr/bin/env python3
"""Assemble Episode 08 — The Studio. Usage: python assemble.py [--tag 4k]"""
import subprocess, os, sys

OUT = os.path.expanduser("~/Projects/Claude-Youtube/remotion/out")
WORK = os.path.dirname(os.path.abspath(__file__))
SFX = os.path.expanduser("~/Projects/Claude-Youtube/media/library/sfx/clips")
MUSIC = os.path.expanduser("~/Projects/Claude-Youtube/media/library/music/clips")
TAG = "4k" if "--tag" in sys.argv and sys.argv[sys.argv.index("--tag") + 1] == "4k" else "1080p"

ORDER = [
    ("StIntro", None, 0), ("StRecap", "s01_recap", 0.8),
    ("StB1", None, 0), ("StDesk", "s02_desk", 0.8), ("StHome", "s03_home", 0.8),
    ("StDavid", "s04_david", 0.8), ("StRole", "s05_role", 0.8),
    ("StB2", None, 0), ("StBoard", "s06_board", 0.8), ("StMorning", "s07_morning", 0.8),
    ("StWatch", "s08_watch", 0.8), ("StRules", "s09_rules", 0.8), ("StLifeline", "s10_lifeline", 0.8),
    ("StB3", None, 0), ("StMemory", "s11_memory", 0.8), ("StNumbers", "s12_numbers", 0.8),
    ("StStack", "s12b_stack", 0.8),
    ("StWheel", "s13_wheel", 0.8), ("StNight", "s14_night", 0.8), ("StCliff", "s15_cliff", 0.8),
    ("StOutro", "s16_outro", 1.0),
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

with open(f"{OUT}/e8_concat.txt", "w") as f:
    for s, _, _ in ORDER: f.write(f"file '{s}.mp4'\n")
subprocess.run(["ffmpeg","-y","-v","error","-f","concat","-safe","0","-i",f"{OUT}/e8_concat.txt",
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

# SFX — transition on every scene change + per-scene beats
cues = []
BIG = ("StB1","StB2","StB3","StDesk","StWheel","StCliff","StOutro","StMorning")
for i, (s, vo, off) in enumerate(ORDER):
    if i == 0: continue
    cues.append((i, 0.0, "whoosh-wind" if s in BIG else "whoosh-soft", 0.40))
def sc(name): return [i for i,(s,_,_) in enumerate(ORDER) if s==name][0]
beats = {
 "StIntro":[(0.9,"impact-deep-soft",.5),(1.4,"sparkle-soft",.4),(4.7,"pop-reveal",.42),(6.0,"warm-shimmer",.38)],
 "StRecap":[(2.2,"stream-soft",.3),(21.0,"impact-soft",.44)],
 "StB1":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "StDesk":[(2.6,"launch-thump",.42),(3.4,"scan-hum",.3),(10.6,"impact-soft",.42)],
 "StHome":[(2.2,"pop-reveal",.34),(2.7,"pop-reveal",.32),(3.2,"pop-reveal",.32),(3.7,"pop-reveal",.32),(4.2,"pop-reveal",.32),(4.7,"pop-reveal",.32),(12.0,"warm-shimmer",.4)],
 "StDavid":[(2.2,"ui-click-soft",.32),(4.0,"pop-reveal",.42),(8.6,"chime-magic",.42)],
 "StRole":[(2.2,"pop-reveal",.34),(3.0,"pop-reveal",.32),(3.8,"pop-reveal",.32),(4.6,"pop-reveal",.32),(8.2,"impact-soft",.44),(9.4,"warm-shimmer",.4)],
 "StB2":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "StBoard":[(2.0,"ui-click-soft",.32),(5.4,"ui-click-soft",.3),(12.0,"ui-click-soft",.3),(14.6,"warm-shimmer",.38)],
 "StMorning":[(1.0,"clock-tick-soft",.4),(4.6,"ui-send",.4),(6.6,"ui-send",.38),(9.0,"ui-send",.38),(15.2,"chime-reward",.42)],
 "StWatch":[(2.6,"clock-tick-soft",.36),(3.4,"clock-tick-soft",.33),(4.2,"clock-tick-soft",.3),(5.2,"pop-reveal",.32),(6.6,"pop-reveal",.32),(8.0,"pop-reveal",.32),(15.4,"riser-soft",.38)],
 "StRules":[(3.4,"stamp-hit",.5),(5.0,"stamp-hit",.46),(6.6,"stamp-hit",.44),(8.2,"stamp-hit",.42),(9.8,"stamp-hit",.4),(20.4,"impact-soft",.44)],
 "StLifeline":[(4.0,"stream-soft",.34),(6.2,"ui-send",.4),(7.6,"ui-send",.38),(9.0,"ui-send",.38),(13.0,"impact-soft",.4)],
 "StB3":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "StMemory":[(2.6,"page-flip",.34),(6.0,"whoosh-reverse",.34),(7.2,"chime-magic",.42),(17.0,"impact-deep-soft",.48)],
 "StNumbers":[(2.4,"pop-reveal",.36),(3.2,"pop-reveal",.34),(4.0,"pop-reveal",.34),(4.8,"pop-reveal",.34),(5.6,"pop-reveal",.34),(9.0,"chime-reward",.44)],
 "StStack":[(3.0,"pop-reveal",.36),(10.0,"pop-reveal",.34),(17.0,"pop-reveal",.34),(24.0,"pop-reveal",.34),(36.5,"chime-reward",.42)],
 "StWheel":[(2.8,"scan-hum",.32),(4.4,"pop-reveal",.34),(5.1,"pop-reveal",.32),(5.8,"pop-reveal",.32),(6.5,"pop-reveal",.32),(7.2,"pop-reveal",.32),(15.0,"warm-shimmer",.4)],
 "StNight":[(2.0,"wind-soft",.32),(4.4,"ui-click-soft",.28),(6.4,"ui-click-soft",.26),(11.6,"clock-tick-soft",.38),(12.4,"riser-soft",.36)],
 "StCliff":[(2.0,"riser-soft",.4),(6.6,"impact-deep-soft",.5),(11.6,"chime-magic",.44)],
 "StOutro":[(0.8,"impact-soft",.5),(2.2,"chime-reward",.45),(12.0,"ui-click-soft",.35),(16.2,"impact-soft",.45)],
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
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{MUSIC}/cinematic-min.mp3","-af","atrim=0:70","-ar","48000","-ac","2",f"{WORK}/mix/mA.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-stream_loop","6","-i",f"{MUSIC}/tech-pulse.mp3","-af","atrim=0:240","-ar","48000","-ac","2",f"{WORK}/mix/mB.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{MUSIC}/cinematic-min.mp3","-af","atrim=0:110","-ar","48000","-ac","2",f"{WORK}/mix/mC.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/mA.wav","-i",f"{WORK}/mix/mB.wav","-i",f"{WORK}/mix/mC.wav",
                "-filter_complex","[0:a][1:a]acrossfade=d=3:c1=tri:c2=tri[ab];[ab][2:a]acrossfade=d=3:c1=tri:c2=tri[abc]","-map","[abc]",f"{WORK}/mix/music_long.wav"], check=True)
fadeout = float(TOTAL) - 5.0
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/music_long.wav","-af",
                f"apad=whole_dur={TOTAL},atrim=0:{TOTAL},afade=t=in:st=0:d=1.5,afade=t=out:st={fadeout:.2f}:d=5.0",f"{WORK}/mix/music.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/music.wav","-i",f"{WORK}/mix/voice.wav","-filter_complex",
                "[0:a][1:a]sidechaincompress=threshold=0.06:ratio=3:attack=40:release=420:makeup=1[d]","-map","[d]",f"{WORK}/mix/music_ducked.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/voice.wav","-i",f"{WORK}/mix/music_ducked.wav","-i",f"{WORK}/mix/sfx.wav",
                "-filter_complex","[1:a]volume=0.62[m];[0:a][m][2:a]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[out]","-map","[out]","-ar","48000","-ac","2",f"{WORK}/mix/master_audio.wav"], check=True)

final = os.path.expanduser(f"~/Projects/Claude-Youtube/videos/danslab-ep08-studio/danslab-episode-08-studio-{TAG.upper()}.mp4")
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/video_full_{TAG}.mp4","-i",f"{WORK}/mix/master_audio.wav",
                "-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","224k","-ac","2","-shortest",final], check=True)
print("FINAL:", final, f"{dur(final):.1f}s")
