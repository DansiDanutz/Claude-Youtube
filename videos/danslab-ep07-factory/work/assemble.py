#!/usr/bin/env python3
"""Assemble Episode 07 — The Factory. Usage: python assemble.py [--tag 4k]"""
import subprocess, os, sys

OUT = os.path.expanduser("~/Projects/Claude-Youtube/remotion/out")
WORK = os.path.dirname(os.path.abspath(__file__))
SFX = os.path.expanduser("~/Projects/Claude-Youtube/media/library/sfx/clips")
MUSIC = os.path.expanduser("~/Projects/Claude-Youtube/media/library/music/clips")
TAG = "4k" if "--tag" in sys.argv and sys.argv[sys.argv.index("--tag") + 1] == "4k" else "1080p"

ORDER = [
    ("FIntro", None, 0), ("FRecap", "s01_recap", 0.8),
    ("FB1", None, 0), ("FDexter", "s02_dexter", 0.8), ("FProblem", "s03_problem", 0.8), ("FIdea", "s04_idea", 0.8),
    ("FB2", None, 0), ("FScript", "s05_script", 0.8), ("FVoice", "s06_voice", 0.8), ("FScenes", "s07_scenes", 0.8),
    ("FDesign", "s08_design", 0.8), ("FRender", "s09_render", 0.8), ("FAssemble", "s10_assemble", 0.8),
    ("FDeliver", "s11_deliver", 0.8),
    ("FB3", None, 0), ("FCatalog", "s12_catalog", 0.8), ("FNumbers", "s13_numbers", 0.8), ("FMeta", "s14_meta", 0.8),
    ("FCode", "s15_code", 0.8), ("FFlywheel", "s16_flywheel", 0.8), ("FClose", "s17_close", 0.8),
    ("FOutro", "s18_outro", 1.0),
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

with open(f"{OUT}/e7_concat.txt", "w") as f:
    for s, _, _ in ORDER: f.write(f"file '{s}.mp4'\n")
subprocess.run(["ffmpeg","-y","-v","error","-f","concat","-safe","0","-i",f"{OUT}/e7_concat.txt",
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

# SFX — transition on every scene change, then per-scene beats
cues = []
BIG = ("FB1","FB2","FB3","FCatalog","FMeta","FFlywheel","FClose","FOutro","FRender")
for i, (s, vo, off) in enumerate(ORDER):
    if i == 0: continue
    cues.append((i, 0.0, "whoosh-wind" if s in BIG else "whoosh-soft", 0.40))
def sc(name): return [i for i,(s,_,_) in enumerate(ORDER) if s==name][0]
beats = {
 # ── open ──
 "FIntro":[(0.9,"impact-deep-soft",.5),(1.4,"sparkle-soft",.4),(4.7,"pop-reveal",.42),(6.0,"warm-shimmer",.38)],
 "FRecap":[(2.2,"stream-soft",.3),(17.5,"impact-soft",.42)],
 # ── part one: the machine ──
 "FB1":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "FDexter":[(2.2,"ui-click-soft",.32),(4.2,"pop-reveal",.4),(6.9,"stamp-hit",.55)],
 "FProblem":[(3.8,"page-flip",.34),(4.4,"page-flip",.34),(5.0,"page-flip",.34),(5.6,"page-flip",.34),
             (6.2,"page-flip",.34),(6.8,"page-flip",.34),(11.2,"impact-soft",.42)],
 "FIdea":[(1.7,"warm-shimmer",.4),(3.2,"launch-thump",.45),(4.0,"scan-hum",.3)],
 # ── part two: the line ──
 "FB2":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "FScript":[(2.4,"pencil-scribble",.34),(3.3,"keys-typing-soft",.34),(4.0,"keys-typing-soft",.3),(7.8,"pop-reveal",.36)],
 "FVoice":[(2.4,"riser-soft",.36),(3.2,"chime-magic",.42),(8.4,"warm-shimmer",.36)],
 "FScenes":[(2.4,"keys-typing-soft",.34),(3.4,"keys-typing-soft",.3),(6.1,"whoosh-reverse",.34),(6.8,"pop-reveal",.44),(12.4,"impact-soft",.4)],
 "FDesign":[(2.4,"pop-reveal",.36),(2.9,"pop-reveal",.34),(3.4,"pop-reveal",.34),(3.9,"pop-reveal",.34),
            (4.4,"pop-reveal",.34),(4.9,"pop-reveal",.34),(10.2,"ui-toggle-on",.32),(14.2,"warm-shimmer",.4)],
 "FRender":[(2.4,"scan-hum",.36),(3.7,"stream-soft",.34),(10.5,"chime-reward",.42)],
 "FAssemble":[(4.2,"ui-click-soft",.3),(4.8,"ui-click-soft",.3),(5.4,"ui-click-soft",.3),(6.0,"ui-click-soft",.3),
              (7.4,"trap-snap",.32),(17.6,"chime-magic",.42)],
 "FDeliver":[(4.2,"ui-send",.4),(5.2,"ui-toggle-on",.32),(5.9,"ui-toggle-on",.32),(6.6,"ui-toggle-on",.32),
             (7.3,"chime-reward",.45),(11.6,"impact-soft",.42)],
 # ── part three: the output ──
 "FB3":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "FCatalog":[(2.2,"page-flip",.4),(2.8,"page-flip",.4),(3.4,"page-flip",.4),
             (5.2,"page-flip",.4),(5.8,"page-flip",.4),(6.4,"page-flip",.4),(14.4,"warm-shimmer",.4)],
 "FNumbers":[(2.6,"pop-reveal",.4),(3.5,"pop-reveal",.4),(4.4,"pop-reveal",.4),(5.3,"pop-reveal",.4),(11.4,"chime-reward",.45)],
 "FMeta":[(2.0,"whoosh-reverse",.34),(7.2,"glitch-zap",.34),(8.4,"glitch-zap",.3),(9.6,"glitch-zap",.28),(14.4,"impact-deep-soft",.5)],
 "FCode":[(2.2,"ui-click-soft",.32),(3.4,"scan-hum",.32),(8.6,"impact-soft",.4)],
 "FFlywheel":[(3.0,"pop-reveal",.36),(3.8,"pop-reveal",.36),(4.6,"pop-reveal",.36),(5.4,"pop-reveal",.36),
              (6.2,"pop-reveal",.36),(9.0,"scan-hum",.3),(15.5,"chime-magic",.45)],
 "FClose":[(2.4,"pop-reveal",.38),(3.3,"pop-reveal",.38),(4.2,"pop-reveal",.38),(5.1,"pop-reveal",.38),
           (6.0,"pop-reveal",.38),(11.2,"warm-shimmer",.42),(18.5,"riser-soft",.4)],
 "FOutro":[(0.8,"impact-soft",.5),(2.2,"chime-reward",.45),(11.2,"ui-click-soft",.35),(15.0,"impact-soft",.45)],
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

# MUSIC — reflective open -> tech middle (the line) -> reflective close
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{MUSIC}/cinematic-min.mp3","-af","atrim=0:78","-ar","48000","-ac","2",f"{WORK}/mix/mA.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-stream_loop","4","-i",f"{MUSIC}/tech-pulse.mp3","-af","atrim=0:230","-ar","48000","-ac","2",f"{WORK}/mix/mB.wav"], check=True)
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

final = os.path.expanduser(f"~/Projects/Claude-Youtube/videos/danslab-ep07-factory/danslab-episode-07-factory-{TAG.upper()}.mp4")
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/video_full_{TAG}.mp4","-i",f"{WORK}/mix/master_audio.wav",
                "-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","224k","-ac","2","-shortest",final], check=True)
print("FINAL:", final, f"{dur(final):.1f}s")
