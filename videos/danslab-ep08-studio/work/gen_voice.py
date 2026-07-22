#!/usr/bin/env python3
"""Generate Brian narration for each scene in script.json via ElevenLabs.
Writes narration/{id}.mp3 and mix/{id}.wav (48k mono) for assemble.py."""
import json, os, subprocess, urllib.request

WORK = os.path.dirname(os.path.abspath(__file__))
NARR = os.path.join(WORK, "narration")
MIX = os.path.join(WORK, "mix")
os.makedirs(MIX, exist_ok=True)
VOICE = "nPczCjzI2devNBz1zQrb"          # Brian
MODEL = "eleven_flash_v2_5"


def api_key():
    for p in (os.path.expanduser("~/.openclaw/fleet.env"),):
        try:
            for line in open(p):
                if line.startswith("ELEVENLABS_API_KEY="):
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
        except Exception:
            pass
    return os.environ.get("ELEVENLABS_API_KEY", "")


def tts(text, out_mp3, key):
    body = json.dumps({
        "text": text, "model_id": MODEL,
        "voice_settings": {"stability": 0.42, "similarity_boost": 0.85, "style": 0.30, "use_speaker_boost": True},
    }).encode()
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE}?output_format=mp3_44100_128"
    req = urllib.request.Request(url, data=body, method="POST",
                                 headers={"xi-api-key": key, "Content-Type": "application/json", "accept": "audio/mpeg"})
    with urllib.request.urlopen(req, timeout=120) as r, open(out_mp3, "wb") as f:
        f.write(r.read())


def main():
    key = api_key()
    if not key:
        raise SystemExit("no ELEVENLABS_API_KEY")
    script = json.load(open(os.path.join(NARR, "script.json")))
    only = os.environ.get("ONLY")  # optional comma list of ids to (re)generate
    for sc in script["scenes"]:
        sid, text = sc["id"], sc["text"]
        if only and sid not in only.split(","):
            continue
        mp3 = os.path.join(NARR, f"{sid}.mp3")
        tts(text, mp3, key)
        wav = os.path.join(MIX, f"{sid}.wav")
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", mp3, "-ar", "48000", "-ac", "1", wav], check=True)
        d = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", wav],
                                 capture_output=True, text=True).stdout.strip())
        print(f"  {sid}: {d:.1f}s")
    print("voice done")


if __name__ == "__main__":
    main()
