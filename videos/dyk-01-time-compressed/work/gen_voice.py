#!/usr/bin/env python3
"""Brian narration for DYK No. 01 via ElevenLabs /with-timestamps.

Same voice + settings as ep11 gen_voice.py, plus per-word timings so every reveal
lands on its word (RUBRIC dimension 3). Writes, per scene id:
  narration/<id>.mp3        the paid render (never regenerated unless ONLY=<id>)
  narration/<id>.words.json [{w, s, e}] word timings in seconds
  mix/<id>.wav              48 kHz mono for the mix
and narration/durations.json. Flags a hallucinated tail (audio running >0.9s past
the last aligned character), the ElevenLabs failure mode logged in the episode skill.
"""
import base64, json, os, re, subprocess, urllib.request

WORK = os.path.dirname(os.path.abspath(__file__))
NARR = os.path.join(WORK, "narration")
MIX = os.path.join(WORK, "mix")
os.makedirs(MIX, exist_ok=True)
VOICE = "nPczCjzI2devNBz1zQrb"          # Brian
MODEL = "eleven_flash_v2_5"
TAIL_LIMIT_S = 0.9


def api_key():
    path = os.path.expanduser("~/.openclaw/fleet.env")
    if os.path.exists(path):
        for line in open(path):
            if line.startswith("ELEVENLABS_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    return os.environ.get("ELEVENLABS_API_KEY", "")


# Livelier Brian (David, after ep01: hook/welcome/outro sounded sleepy). Used for every line
# generated from now on; lines already paid for keep the take they were made with.
VOICE_SETTINGS = {"stability": 0.32, "similarity_boost": 0.85, "style": 0.45, "use_speaker_boost": True}


def tts_with_timestamps(text, key, speed=1.0):
    body = json.dumps({
        "text": text, "model_id": MODEL,
        "voice_settings": {**VOICE_SETTINGS, "speed": round(speed, 3)},
    }).encode()
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE}/with-timestamps?output_format=mp3_44100_128"
    req = urllib.request.Request(url, data=body, method="POST",
                                 headers={"xi-api-key": key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.load(r)


def words_from_alignment(al):
    words, cur, start, end = [], "", None, None
    for ch, s, e in zip(al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]):
        if ch.isspace():
            if cur:
                words.append({"w": cur, "s": round(start, 3), "e": round(end, 3)})
            cur, start = "", None
            continue
        if start is None:
            start = s
        cur, end = cur + ch, e
    if cur:
        words.append({"w": cur, "s": round(start, 3), "e": round(end, 3)})
    return words


PACE_TARGET = 2.9            # words/s — default story pace when a scene sets no `pace`
PACE_TOL = 0.10              # every line within ±10 % of ITS scene's target
MAX_TRIES = 4
SPEED_MIN, SPEED_MAX = 0.7, 1.2   # ElevenLabs range; a scene's `speed_min` raises the floor
MID_MAX_S_PER_SYL = 0.42     # mid-sentence word drag ("railroaaads")
END_MAX_S_PER_SYL = 0.55     # sentence-final word drag ("yeeet.")
WORD_MAX_S = 1.0


def syllables(w):
    w = re.sub(r"[^a-z]", "", w.lower())
    silent_e = w.endswith("e") and not w.endswith(("ee", "ye")) and not re.search(r"[^aeiouy]le$", w) and len(w) > 3
    split_vowels = 1 if re.search(r"ience$", w) else 0    # sci-ence, experi-ence
    return max(1, len(re.findall(r"[aeiouy]+", w)) - (1 if silent_e else 0) + split_vowels)


def stretched(words):
    """Words the voice drags: any word > 1.0 s; mid-sentence > 0.42 s/syllable; sentence-final
    (. ? ! … or the last word) > 0.55 s/syllable. Words ending a clause (, : ;) only get the 1.0 s rule."""
    probs = []
    for i, w in enumerate(words):
        d = w["e"] - w["s"]
        per_syl = d / syllables(w["w"])
        sentence_end = i + 1 == len(words) or re.search(r"[.?!…]$", w["w"])
        clause_end = re.search(r"[,:;]$", w["w"])
        if d > WORD_MAX_S or (sentence_end and per_syl > END_MAX_S_PER_SYL) or \
                (not sentence_end and not clause_end and per_syl > MID_MAX_S_PER_SYL):
            probs.append(f"stretched '{w['w']}' {d:.2f}s")
    return probs


def quality(words, target=PACE_TARGET):
    """Return (pace, problems): stretched words plus a pace outside ±10 % of `target` words/s."""
    pace = len(words) / max(0.1, words[-1]["e"] - words[0]["s"])
    probs = stretched(words)
    if abs(pace - target) / target > PACE_TOL:
        probs.append(f"pace {pace:.2f} w/s (target {target}±{int(PACE_TOL * 100)}%)")
    return pace, probs


def next_speed(speed, pace, target, floor=SPEED_MIN):
    """Nudge the ElevenLabs speed toward the target pace, never below the scene's floor."""
    return min(SPEED_MAX, max(floor, SPEED_MIN, speed * target / pace))


def probe_duration(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
                         capture_output=True, text=True, check=True).stdout.strip()
    return float(out)


def mp3_to_wav(mp3, wav):
    """48 kHz mono PCM for the mix; returns its duration in seconds."""
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", mp3, "-ar", "48000", "-ac", "1", "-c:a", "pcm_s16le", wav], check=True)
    return probe_duration(wav)


def main():
    key = api_key()
    if not key:
        raise SystemExit("no ELEVENLABS_API_KEY")
    script = json.load(open(os.path.join(NARR, "script.json")))
    only = set(filter(None, os.environ.get("ONLY", "").split(",")))
    durations_path = os.path.join(NARR, "durations.json")
    durations = json.load(open(durations_path)) if os.path.exists(durations_path) else {}
    rejected = []
    for sc in script["scenes"]:
        sid, text = sc["id"], sc["text"]
        mp3 = os.path.join(NARR, f"{sid}.mp3")
        if os.path.exists(mp3) and sid not in only:
            wav = os.path.join(MIX, f"{sid}.wav")
            if not os.path.exists(wav):   # fresh checkout / interrupted run: rebuild from the paid mp3, no API call
                durations[sid] = round(mp3_to_wav(mp3, wav), 3)
                print(f"  {sid}: rebuilt {os.path.basename(wav)} from the saved mp3")
            continue                      # already paid for; never re-bill
        if only and sid not in only:
            continue
        target = float(sc.get("pace", PACE_TARGET))
        floor = float(sc.get("speed_min", SPEED_MIN))
        speed, best = max(floor, float(sc.get("speed", 1.0))), None
        for attempt in range(1, MAX_TRIES + 1):
            resp = tts_with_timestamps(text, key, speed)
            words = words_from_alignment(resp["alignment"])
            pace, probs = quality(words, target)
            print(f"    try {attempt} speed {speed:.2f}: pace {pace:.2f} w/s {'OK' if not probs else probs}")
            if best is None or len(probs) < len(best[2]):
                best = (resp, words, probs, speed)
            if not probs:
                break
            speed = next_speed(speed, pace, target, floor)
        resp, words, probs, speed = best
        if probs and os.environ.get("ALLOW_GATE_FAIL") != "1":
            # hard gate: keep the best attempt for listening, but never as the canonical take
            with open(os.path.join(NARR, f"{sid}.rejected.mp3"), "wb") as f:
                f.write(base64.b64decode(resp["audio_base64"]))
            json.dump(words, open(os.path.join(NARR, f"{sid}.rejected.words.json"), "w"), indent=0)
            print(f"  !! {sid} REJECTED after {MAX_TRIES} tries: {probs} (rephrase the line, or ALLOW_GATE_FAIL=1 to accept)")
            rejected.append(sid)
            continue
        if probs:
            print(f"  !! {sid} accepted despite {probs} (ALLOW_GATE_FAIL=1)")
        sc["speed"] = round(speed, 3)
        with open(mp3, "wb") as f:
            f.write(base64.b64decode(resp["audio_base64"]))
        json.dump(words, open(os.path.join(NARR, f"{sid}.words.json"), "w"), indent=0)
        wav = os.path.join(MIX, f"{sid}.wav")
        dur = mp3_to_wav(mp3, wav)
        durations[sid] = round(dur, 3)
        tail = dur - words[-1]["e"]
        flag = "  <-- CHECK TAIL" if tail > TAIL_LIMIT_S else ""
        print(f"  {sid}: {dur:.2f}s, {len(words)} words, tail {tail:.2f}s{flag}")
    json.dump(durations, open(durations_path, "w"), indent=2)
    json.dump(script, open(os.path.join(NARR, "script.json"), "w"), indent=2)   # remembers the speed that passed
    print("voice done:", round(sum(durations.values()), 1), "s total")
    if rejected:
        raise SystemExit(f"hard gate failed for: {', '.join(rejected)}")


if __name__ == "__main__":
    main()
