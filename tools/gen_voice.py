#!/usr/bin/env python3
"""Generate ElevenLabs narration for specific scenes of a project.

Usage: python tools/gen_voice.py videos/<project> <sceneId> [<sceneId> ...]

Reads ELEVENLABS_API_KEY from the environment or the repo-root .env.
Voice: Brian (nPczCjzI2devNBz1zQrb), model eleven_flash_v2_5 — matching the series.
Writes work/narration/<id>.mp3 and work/mix/<id>.wav (48 kHz mono, ready for assemble.py).
Stdlib only (urllib) — no pip deps. Needs ffmpeg/ffprobe on PATH.
"""
import os, sys, json, subprocess, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOICE_ID = "nPczCjzI2devNBz1zQrb"  # Brian
MODEL = "eleven_flash_v2_5"


def load_key():
    k = os.environ.get("ELEVENLABS_API_KEY")
    if k:
        return k
    envp = os.path.join(ROOT, ".env")
    if os.path.exists(envp):
        for line in open(envp, encoding="utf-8"):
            if line.startswith("ELEVENLABS_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    sys.exit("no ELEVENLABS_API_KEY in env or .env")


def tts(text, key, out_mp3):
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}?output_format=mp3_44100_128"
    body = json.dumps({
        "text": text,
        "model_id": MODEL,
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.75, "style": 0.0, "use_speaker_boost": True},
    }).encode("utf-8")
    req = urllib.request.Request(url, data=body, method="POST", headers={
        "xi-api-key": key, "Content-Type": "application/json", "Accept": "audio/mpeg",
    })
    with urllib.request.urlopen(req, timeout=180) as r, open(out_mp3, "wb") as f:
        f.write(r.read())


def main():
    if len(sys.argv) < 3:
        sys.exit("usage: gen_voice.py videos/<project> <sceneId> [<sceneId> ...]")
    proj = os.path.abspath(sys.argv[1])
    ids = sys.argv[2:]
    work = os.path.join(proj, "work")
    script = json.load(open(os.path.join(work, "narration", "script.json"), encoding="utf-8"))
    scenes = {s["id"]: s["text"] for s in script["scenes"]}
    key = load_key()
    os.makedirs(os.path.join(work, "narration"), exist_ok=True)
    os.makedirs(os.path.join(work, "mix"), exist_ok=True)
    for sid in ids:
        if sid not in scenes:
            sys.exit(f"scene {sid} not in script.json")
        mp3 = os.path.join(work, "narration", f"{sid}.mp3")
        wav = os.path.join(work, "mix", f"{sid}.wav")
        print(f"tts {sid} ({len(scenes[sid])} chars)...", flush=True)
        tts(scenes[sid], key, mp3)
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", mp3, "-ar", "48000", "-ac", "1", wav], check=True)
        dur = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", wav],
                             capture_output=True, text=True).stdout.strip()
        print(f"  -> {wav}  ({float(dur):.1f}s)")


if __name__ == "__main__":
    main()
