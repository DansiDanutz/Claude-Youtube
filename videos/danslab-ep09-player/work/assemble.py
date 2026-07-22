#!/usr/bin/env python3
"""Assemble Episode 09 — The Player (season finale). Usage: python assemble.py [--tag 4k]"""
import subprocess, os, sys

OUT = os.path.expanduser("~/Projects/Claude-Youtube/remotion/out")
WORK = os.path.dirname(os.path.abspath(__file__))
SFX = os.path.expanduser("~/Projects/Claude-Youtube/media/library/sfx/clips")
MUSIC = os.path.expanduser("~/Projects/Claude-Youtube/media/library/music/clips")
TAG = "4k" if "--tag" in sys.argv and sys.argv[sys.argv.index("--tag") + 1] == "4k" else "1080p"

ORDER = [
    ("PIntro", None, 0), ("PHook", "s01_hook", 0.8), ("PPromise", "s02_promise", 0.8),
    ("PB1", None, 0), ("PCluj", "s03_cluj", 0.8), ("PBank", "s03b_bank", 0.8), ("PChip", "s04_chip", 0.8),
    ("PLesson1", "s05_lesson1", 0.8), ("PLesson2", "s06_lesson2", 0.8), ("PRead", "s06b_read", 0.8), ("PFold", "s07_fold", 0.8),
    ("PB2", None, 0), ("PNotCoder", "s08_notcoder", 0.8), ("PKrypto", "s09_krypto", 0.8), ("PIrise", "s10_irise", 0.8),
    ("PSpeed", "s11_speed", 0.8), ("PCrush", "s12_crush", 0.8), ("PWhy", "s12b_why", 0.8), ("PHacks", "s13_hacks", 0.8), ("PDexterS", "s14_dexter", 0.8),
    ("PB3", None, 0), ("PBetsIntro", "s15_betsintro", 0.8), ("PBetSienna", "s16_bet_sienna", 0.8), ("PBetPaperclip", "s17_bet_paperclip", 0.8),
    ("PBetHermes", "s18_bet_hermes", 0.8), ("PBetNervix", "s19_bet_nervix", 0.8), ("PBetFactory", "s20_bet_factory", 0.8), ("PFolds", "s21_folds", 0.8),
    ("PB4", None, 0), ("PNoCode", "s22_nocode", 0.8), ("POneLine", "s23_oneline", 0.8), ("PApprove", "s24_approve", 0.8),
    ("PWarRoom", "s24b_warroom", 0.8), ("PLaws", "s25_laws", 0.8), ("PEcon", "s26_econ", 0.8), ("PGame", "s26b_game", 0.8),
    ("PDay", "s27_day", 0.8), ("PNight", "s28_night", 0.8),
    ("PB5", None, 0), ("PWho", "s29_who", 0.8), ("PLosses", "s30_losses", 0.8), ("PTilt", "s31_tilt", 0.8), ("PStake", "s31b_stake", 0.8),
    ("PTableNow", "s32_table_now", 0.8), ("PThesis", "s33_thesis", 0.8), ("POpen", "s33b_open", 0.8),
    ("PYou", "s34_you", 0.8), ("PCards", "s34b_cards", 0.8), ("PYourMove", "s35_yourmove", 0.8),
    ("PSeason", "s36_season", 0.8), ("PThanks", "s36b_thanks", 0.8), ("PCliff", "s37_cliff", 0.8),
    ("POutro", "s38_outro", 1.0),
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

with open(f"{OUT}/e9_concat.txt", "w") as f:
    for s, _, _ in ORDER: f.write(f"file '{s}.mp4'\n")
subprocess.run(["ffmpeg","-y","-v","error","-f","concat","-safe","0","-i",f"{OUT}/e9_concat.txt",
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
BIG = ("PB1","PB2","PB3","PB4","PB5","PChip","PHacks","PTilt","PSeason","PYourMove","POutro","PCliff")
for i, (s, vo, off) in enumerate(ORDER):
    if i == 0: continue
    cues.append((i, 0.0, "whoosh-wind" if s in BIG else "whoosh-soft", 0.40))
def sc(name): return [i for i,(s,_,_) in enumerate(ORDER) if s==name][0]
beats = {
 "PIntro":[(0.9,"impact-deep-soft",.5),(1.4,"sparkle-soft",.4),(2.2,"riser-soft",.34),(5.2,"pop-reveal",.42),(6.6,"warm-shimmer",.38)],
 "PHook":[(2.2,"stream-soft",.3),(18.0,"impact-soft",.46),(19.4,"riser-soft",.38),(34.6,"impact-deep-soft",.52)],
 "PPromise":[(2.0,"warm-shimmer",.38)],
 "PB1":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "PCluj":[(3.0,"pop-reveal",.34),(4.0,"pop-reveal",.32),(4.9,"pop-reveal",.32),(6.5,"chime-magic",.4),(8.0,"launch-thump",.38)],
 "PBank":[(2.4,"knock-solid",.4),(8.0,"warm-shimmer",.4)],
 "PChip":[(2.4,"chess-piece-thock",.42),(4.4,"page-flip",.38),(5.2,"page-flip",.36),(6.0,"chess-piece-thock",.4),(14.6,"impact-soft",.42)],
 "PLesson1":[(2.0,"impact-soft",.42),(8.6,"chime-reward",.42)],
 "PLesson2":[(3.0,"page-flip",.4),(4.0,"page-flip",.38),(7.6,"warm-shimmer",.38),(15.0,"impact-soft",.42)],
 "PRead":[(3.4,"ui-click-soft",.32),(5.4,"ui-click-soft",.3),(7.4,"ui-click-soft",.3),(13.0,"warm-shimmer",.38)],
 "PFold":[(2.2,"page-flip",.42),(10.2,"impact-soft",.44)],
 "PB2":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "PNotCoder":[(2.0,"ui-click-soft",.32),(4.4,"pop-reveal",.34),(5.8,"pop-reveal",.32),(7.2,"pop-reveal",.32),(8.6,"chime-magic",.42)],
 "PKrypto":[(3.0,"pop-reveal",.36),(4.0,"pop-reveal",.34),(5.0,"pop-reveal",.34),(13.0,"impact-soft",.42)],
 "PIrise":[(2.2,"glitch-zap",.36),(7.8,"impact-soft",.42)],
 "PSpeed":[(2.0,"pop-reveal",.34),(3.7,"pop-reveal",.32),(5.4,"pop-reveal",.32),(8.6,"launch-thump",.46)],
 "PCrush":[(2.0,"warm-shimmer",.36),(12.2,"trap-snap",.4),(13.0,"scan-hum",.32)],
 "PWhy":[(5.4,"page-flip",.36),(9.4,"knock-solid",.38),(10.4,"chime-magic",.42)],
 "PHacks":[(3.0,"glitch-zap",.42),(4.0,"impact-soft",.4),(5.6,"glitch-zap",.4),(6.6,"impact-soft",.4),(11.2,"warm-shimmer",.36),(19.2,"riser-soft",.4)],
 "PDexterS":[(2.0,"knock-solid",.4),(3.2,"ui-toggle-on",.36),(7.0,"chime-reward",.42)],
 "PB3":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "PBetsIntro":[(2.4,"chess-piece-thock",.4),(3.4,"chess-piece-thock",.38),(9.0,"warm-shimmer",.38)],
 "PBetSienna":[(1.0,"stamp-hit",.5),(3.4,"pop-reveal",.36),(9.0,"chime-reward",.4)],
 "PBetPaperclip":[(1.0,"stamp-hit",.5),(3.4,"pop-reveal",.36),(9.4,"page-flip",.38)],
 "PBetHermes":[(1.0,"stamp-hit",.5),(3.4,"pop-reveal",.36),(10.0,"chime-magic",.42)],
 "PBetNervix":[(1.0,"stamp-hit",.5),(3.4,"pop-reveal",.36),(10.6,"chime-reward",.44)],
 "PBetFactory":[(1.0,"stamp-hit",.5),(3.4,"pop-reveal",.36),(8.0,"sparkle-soft",.4)],
 "PFolds":[(3.4,"page-flip",.4),(4.2,"stamp-hit",.42),(5.7,"page-flip",.38),(6.5,"stamp-hit",.4),(8.0,"page-flip",.36),(8.8,"stamp-hit",.38),(15.4,"impact-soft",.44)],
 "PB4":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "PNoCode":[(2.0,"impact-soft",.42),(10.6,"chime-magic",.44)],
 "POneLine":[(4.6,"keys-typing-soft",.36),(5.6,"ui-send",.42),(21.0,"chime-reward",.46)],
 "PApprove":[(3.6,"ui-click-soft",.36),(6.0,"ui-toggle-on",.38),(8.4,"knock-solid",.4),(16.0,"warm-shimmer",.38)],
 "PWarRoom":[(3.4,"pop-reveal",.36),(5.0,"pop-reveal",.34),(6.6,"pop-reveal",.34),(11.0,"pencil-scribble",.4),(17.0,"stamp-hit",.46)],
 "PLaws":[(3.4,"stamp-hit",.46),(5.2,"stamp-hit",.43),(7.0,"stamp-hit",.4),(8.8,"stamp-hit",.38),(15.4,"impact-soft",.42)],
 "PEcon":[(3.0,"pop-reveal",.36),(4.2,"pop-reveal",.34),(5.4,"pop-reveal",.34),(6.6,"pop-reveal",.34),(12.0,"chime-reward",.44)],
 "PGame":[(3.6,"pop-reveal",.34),(5.0,"pop-reveal",.32),(6.4,"pop-reveal",.32),(7.8,"pop-reveal",.32),(12.0,"chime-reward",.4)],
 "PDay":[(2.4,"clock-tick-soft",.36),(3.4,"clock-tick-soft",.33),(4.4,"clock-tick-soft",.3),(12.0,"warm-shimmer",.38)],
 "PNight":[(2.4,"wind-soft",.32),(8.0,"warm-shimmer",.42),(12.4,"piano-a-min",.36)],
 "PB5":[(1.5,"impact-soft",.45),(2.4,"pop-reveal",.4)],
 "PWho":[(2.0,"ui-click-soft",.32),(4.6,"pop-reveal",.32),(6.2,"pop-reveal",.3),(7.8,"pop-reveal",.3),(9.4,"pop-reveal",.3),(15.0,"warm-shimmer",.38)],
 "PLosses":[(3.4,"page-flip",.38),(5.4,"page-flip",.36),(7.4,"page-flip",.34),(9.4,"page-flip",.32),(17.0,"impact-soft",.44)],
 "PTilt":[(1.4,"impact-deep-soft",.54),(5.0,"glitch-zap",.36),(17.6,"riser-soft",.4),(24.2,"impact-soft",.48)],
 "PStake":[(2.0,"clock-tick-soft",.38),(9.0,"warm-shimmer",.4),(16.4,"chime-reward",.44)],
 "PTableNow":[(2.4,"whoosh-reverse",.36),(3.6,"chess-piece-thock",.38),(5.0,"pop-reveal",.32),(6.2,"pop-reveal",.3),(7.4,"pop-reveal",.3),(8.6,"pop-reveal",.3),(18.0,"warm-shimmer",.38)],
 "PThesis":[(2.4,"riser-soft",.38),(15.0,"impact-soft",.44)],
 "POpen":[(3.4,"page-flip",.42),(4.2,"page-flip",.4),(5.0,"page-flip",.38),(5.8,"page-flip",.36),(13.4,"warm-shimmer",.4),(19.4,"impact-soft",.44)],
 "PYou":[(2.0,"impact-soft",.44),(11.4,"chime-magic",.42)],
 "PCards":[(3.0,"page-flip",.4),(4.2,"page-flip",.38),(5.4,"page-flip",.36),(6.6,"page-flip",.34),(11.6,"chime-reward",.42)],
 "PYourMove":[(3.6,"impact-deep-soft",.56),(4.6,"sparkle-soft",.4)],
 "PSeason":[(2.0,"riser-soft",.4)] + [(2.6 + i * 0.5, "pop-reveal", .3) for i in range(9)] + [(9.0,"chime-reward",.46),(24.0,"warm-shimmer",.4)],
 "PThanks":[(2.0,"warm-shimmer",.42),(8.6,"piano-c-maj",.38)],
 "PCliff":[(2.0,"chess-piece-thock",.42),(9.4,"riser-soft",.44),(10.6,"impact-deep-soft",.52)],
 "POutro":[(0.8,"impact-soft",.5),(2.2,"chime-reward",.45),(14.0,"ui-click-soft",.35),(19.6,"impact-soft",.45),(23.0,"sparkle-soft",.4)],
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

# MUSIC — a five-movement arc for the ~20-minute finale:
# reflective open -> tech (schools/bets) -> reflective mid (method/night) ->
# tech (final act) -> reflective close. All crossfaded.
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{MUSIC}/cinematic-min.mp3","-af","atrim=0:100","-ar","48000","-ac","2",f"{WORK}/mix/mA.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-stream_loop","9","-i",f"{MUSIC}/tech-pulse.mp3","-af","atrim=0:390","-ar","48000","-ac","2",f"{WORK}/mix/mB.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{MUSIC}/cinematic-min.mp3","-af","atrim=0:150","-ar","48000","-ac","2",f"{WORK}/mix/mC.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-stream_loop","9","-i",f"{MUSIC}/tech-pulse.mp3","-af","atrim=0:380","-ar","48000","-ac","2",f"{WORK}/mix/mD.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{MUSIC}/cinematic-min.mp3","-af","atrim=0:200","-ar","48000","-ac","2",f"{WORK}/mix/mE.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/mA.wav","-i",f"{WORK}/mix/mB.wav","-i",f"{WORK}/mix/mC.wav","-i",f"{WORK}/mix/mD.wav","-i",f"{WORK}/mix/mE.wav",
                "-filter_complex","[0:a][1:a]acrossfade=d=3:c1=tri:c2=tri[ab];[ab][2:a]acrossfade=d=3:c1=tri:c2=tri[abc];[abc][3:a]acrossfade=d=3:c1=tri:c2=tri[abcd];[abcd][4:a]acrossfade=d=3:c1=tri:c2=tri[abcde]","-map","[abcde]",f"{WORK}/mix/music_long.wav"], check=True)
fadeout = float(TOTAL) - 5.0
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/music_long.wav","-af",
                f"apad=whole_dur={TOTAL},atrim=0:{TOTAL},afade=t=in:st=0:d=1.5,afade=t=out:st={fadeout:.2f}:d=5.0",f"{WORK}/mix/music.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/music.wav","-i",f"{WORK}/mix/voice.wav","-filter_complex",
                "[0:a][1:a]sidechaincompress=threshold=0.06:ratio=3:attack=40:release=420:makeup=1[d]","-map","[d]",f"{WORK}/mix/music_ducked.wav"], check=True)
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/mix/voice.wav","-i",f"{WORK}/mix/music_ducked.wav","-i",f"{WORK}/mix/sfx.wav",
                "-filter_complex","[1:a]volume=0.62[m];[0:a][m][2:a]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[out]","-map","[out]","-ar","48000","-ac","2",f"{WORK}/mix/master_audio.wav"], check=True)

final = os.path.expanduser(f"~/Projects/Claude-Youtube/videos/danslab-ep09-player/danslab-episode-09-player-{TAG.upper()}.mp4")
subprocess.run(["ffmpeg","-y","-v","error","-i",f"{WORK}/video_full_{TAG}.mp4","-i",f"{WORK}/mix/master_audio.wav",
                "-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","224k","-ac","2","-shortest",final], check=True)
print("FINAL:", final, f"{dur(final):.1f}s")
