#!/usr/bin/env python3
"""Assemble Nervix Explainers No. 1 — Enroll Your Agent.

All 15 shots come out of Remotion with identical codec/res (3840x2160 h264),
so the video is CONCAT-COPIED — no re-encode, which sidesteps the ~3-6 min
ffmpeg-kill gotcha that forces mux_chunked.py on the DansLab episodes.

Voice is a SEQUENTIAL CONCAT (silence gap + wav, repeat) rather than a big
adelay/amix graph, and every gap is computed from the ACTUAL rendered shot
durations read back with ffprobe — never from the config values.

Usage: python3.13 assemble.py
"""
import json
import os
import subprocess

OUT = os.path.expanduser("~/Projects/Claude-Youtube/remotion/out")
WORK = os.path.dirname(os.path.abspath(__file__))
MIX = os.path.join(WORK, "mix")
BUILD = os.path.join(WORK, "build")
BGM = os.path.expanduser("~/.claude/skills/huashu-design/assets/bgm-tech.mp3")
SR = 48000  # Kokoro writes 24k; everything is resampled to 48k on the way in

# (shotId, [(voId, offset_into_shot_seconds), ...])
ORDER = [
    ("NxHook", [("nx01", 0.7)]),
    ("NxIntro", []),
    ("NxPromise", [("nx02", 0.7)]),
    ("NxWhatItIs", [("nx03", 0.7)]),
    ("NxStep1", [("nx04", 0.7)]),
    ("NxStep2", [("nx05", 0.7)]),
    ("NxStep3", [("nx06", 0.7)]),
    ("NxAudit", [("nx07", 0.7)]),
    ("NxStep4", [("nx08", 0.7)]),
    ("NxHermes", [("nx09", 0.7)]),
    ("NxEarn", [("nx10", 0.7)]),
    ("NxProof", [("nx11", 0.7)]),
    ("NxHuman", [("nx12", 0.7)]),
    ("NxNoAgent", [("nx13", 0.7)]),
    ("NxOutro", [("nx14", 0.7)]),
]


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def dur(path: str) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=nw=1:nk=1", path],
        capture_output=True, text=True, check=True,
    )
    return float(out.stdout.strip())


def main() -> None:
    os.makedirs(BUILD, exist_ok=True)

    # ── 1. video: concat-copy ────────────────────────────────────────────
    shots = [os.path.join(OUT, f"{s}.mp4") for s, _ in ORDER]
    missing = [p for p in shots if not os.path.exists(p)]
    if missing:
        raise SystemExit(f"missing rendered shots: {missing}")
    widths = {
        json.loads(subprocess.run(
            ["ffprobe", "-v", "error", "-select_streams", "v", "-show_entries",
             "stream=width", "-of", "json", p], capture_output=True, text=True,
            check=True).stdout)["streams"][0]["width"]
        for p in shots
    }
    if len(widths) != 1:
        raise SystemExit(f"mixed resolutions {widths} — re-render the stragglers")

    listfile = os.path.join(BUILD, "concat.txt")
    with open(listfile, "w") as fh:
        for p in shots:
            fh.write(f"file '{p}'\n")
    silent = os.path.join(BUILD, "video.mp4")
    run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0",
         "-i", listfile, "-c", "copy", silent])
    total = dur(silent)
    print(f"video: {total:.2f}s")

    # ── 2. voice: silence + line, in shot order ──────────────────────────
    pieces: list[str] = []
    cursor = 0.0  # absolute position on the timeline we have already written
    at = 0.0      # start of the current shot
    for shot, vos in ORDER:
        shot_dur = dur(os.path.join(OUT, f"{shot}.mp4"))
        for vid, off in vos:
            wav = os.path.join(MIX, f"{vid}.wav")
            start = at + off
            gap = start - cursor
            if gap < 0:
                raise SystemExit(f"{vid} overlaps the previous line by {-gap:.2f}s")
            if gap > 0.01:
                sil = os.path.join(BUILD, f"sil_{vid}.wav")
                run(["ffmpeg", "-y", "-v", "error", "-f", "lavfi", "-i",
                     f"anullsrc=r={SR}:cl=mono", "-t", f"{gap:.3f}", sil])
                pieces.append(sil)
            norm = os.path.join(BUILD, f"vo_{vid}.wav")
            run(["ffmpeg", "-y", "-v", "error", "-i", wav, "-ar", str(SR),
                 "-ac", "1", norm])
            pieces.append(norm)
            cursor = start + dur(norm)
        at += shot_dur

    tail = total - cursor
    if tail > 0.01:
        sil = os.path.join(BUILD, "sil_tail.wav")
        run(["ffmpeg", "-y", "-v", "error", "-f", "lavfi", "-i",
             f"anullsrc=r={SR}:cl=mono", "-t", f"{tail:.3f}", sil])
        pieces.append(sil)

    vlist = os.path.join(BUILD, "vo.txt")
    with open(vlist, "w") as fh:
        for p in pieces:
            fh.write(f"file '{p}'\n")
    vo = os.path.join(BUILD, "vo.wav")
    run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0",
         "-i", vlist, "-c", "copy", vo])
    print(f"voice: {dur(vo):.2f}s (video {total:.2f}s)")

    # ── 3. music bed, sidechain-ducked under the voice ───────────────────
    mixed = os.path.join(BUILD, "master.wav")
    run(["ffmpeg", "-y", "-v", "error", "-stream_loop", "-1", "-i", BGM,
         "-i", vo, "-filter_complex",
         f"[0:a]atrim=0:{total:.3f},asetpts=PTS-STARTPTS,volume=0.30,"
         f"afade=t=in:st=0:d=1.5,afade=t=out:st={total - 4:.3f}:d=4[bed];"
         "[1:a]asplit=2[voMain][voKey];"
         "[bed][voKey]sidechaincompress=threshold=0.02:ratio=8:attack=80:release=600[duck];"
         "[duck][voMain]amix=inputs=2:normalize=0,"
         "loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[out]",
         "-map", "[out]", "-ac", "2", mixed])

    # ── 4. mux (video copied; -r/-fps_mode would force a re-encode and are
    #        unnecessary here because concat-copy preserves Remotion's CFR) ──
    final = os.path.join(WORK, "..", "nervix-explainer-01-enroll-your-agent.mp4")
    final = os.path.abspath(final)
    run(["ffmpeg", "-y", "-v", "error", "-i", silent, "-i", mixed,
         "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac",
         "-b:a", "192k", "-movflags", "+faststart", final])
    print(f"MASTER: {final}  {dur(final):.2f}s")


if __name__ == "__main__":
    main()
