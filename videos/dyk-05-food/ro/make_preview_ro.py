#!/usr/bin/env python3
"""ro/narration-ro-preview.mp3: the whole Romanian narration (paused takes, ro/mix/<id>.wav) in master scene order
with 0.5 s of silence between scenes, 128 kb/s mono — for David's native listen before any render. No picture, no SFX.
Run (after `danslab-workflow check --command "python3 videos/dyk-05-food/ro/make_preview_ro.py"`):
  python3 videos/dyk-05-food/ro/make_preview_ro.py"""
import json
import os
import subprocess
import sys
import wave

RO = os.path.dirname(os.path.abspath(__file__))
GAP_S = 0.5
OUT = os.path.join(RO, "narration-ro-preview.mp3")


def scene_order():
    """Scene ids in master order, from ro/timeline.ro.json (shots in order, scenes by offset)."""
    tl = json.load(open(os.path.join(RO, "timeline.ro.json")))
    return [sid for _, (_, offs) in tl.items() for sid, _ in sorted(offs.items(), key=lambda kv: kv[1])]


def main():
    tmp = os.path.join(RO, "mix", "_preview.wav")
    params, frames = None, []
    for i, sid in enumerate(scene_order()):
        with wave.open(os.path.join(RO, "mix", f"{sid}.wav"), "rb") as w:
            if params and (w.getframerate(), w.getnchannels(), w.getsampwidth()) != params:
                sys.exit(f"{sid}: wav format differs")
            params = (w.getframerate(), w.getnchannels(), w.getsampwidth())
            if i:
                frames.append(b"\x00" * int(GAP_S * params[0]) * params[1] * params[2])
            frames.append(w.readframes(w.getnframes()))
    try:
        with wave.open(tmp, "wb") as w:
            w.setnchannels(params[1]); w.setsampwidth(params[2]); w.setframerate(params[0])
            w.writeframes(b"".join(frames))
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-nostdin", "-i", tmp, "-c:a", "libmp3lame", "-b:a", "128k", OUT],
                       check=True)
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", OUT],
                               capture_output=True, text=True, check=True).stdout)
    print(f"preview -> {OUT} ({dur:.1f} s, {os.path.getsize(OUT) / 1e6:.1f} MB)")


if __name__ == "__main__":
    main()
