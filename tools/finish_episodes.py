#!/usr/bin/env python3
"""Render + assemble the remaining DansLab episodes to finished 4K + 1080p.

For each episode: heal any missing voice wavs, render every ORDER shot at 4K
(small batches + retry to survive OOM crashes), run assemble.py, transcode
1080p, and copy both to the ~/Desktop/claudeYouTube delivery folder.
Logs progress; touches /tmp/finish.done when the whole run completes.
"""
import os, re, subprocess

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REM = os.path.join(REPO, "remotion")
OUT = os.path.join(REM, "out")
DELIV = os.path.expanduser("~/Desktop/claudeYouTube")
GENV = os.path.join(REPO, "tools", "gen_voice.py")

EPISODES = [
    "danslab-ep02-survivors", "danslab-ep03-trader", "danslab-ep04-overseer",
    "danslab-ep05-brain", "danslab-ep06-marketplace", "danslab-ep07-factory",
    "danslab-ep09-player",
]


def log(m):
    print(m, flush=True)


def order_entries(vd):
    src = open(os.path.join(REPO, "videos", vd, "work", "assemble.py"), encoding="utf-8").read()
    m = re.search(r"ORDER\s*=\s*\[(.*?)\]", src, re.S)
    out = []
    for shot, raw in re.findall(r'\("([A-Za-z0-9]+)"\s*,\s*(None|"[a-z0-9_]+")', m.group(1)):
        out.append((shot, None if raw == "None" else raw.strip('"')))
    return out


def render_missing(ids, rounds=12, batch=4):
    for r in range(rounds):
        miss = [s for s in ids if not os.path.exists(f"{OUT}/{s}.mp4")]
        if not miss:
            return True
        log(f"    render round {r}: {len(miss)} left -> {miss[:batch]}")
        subprocess.run(["node", "scripts/render-all.mjs", *miss[:batch], "--scale=2"],
                       cwd=REM, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return not [s for s in ids if not os.path.exists(f"{OUT}/{s}.mp4")]


def main():
    log("gen registry...")
    subprocess.run(["npm", "run", "gen"], cwd=REM, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for vd in EPISODES:
        log(f"=== {vd} ===")
        entries = order_entries(vd)
        shots = [e[0] for e in entries]
        voices = [e[1] for e in entries if e[1]]
        mixdir = os.path.join(REPO, "videos", vd, "work", "mix")
        missv = [v for v in voices if not os.path.exists(os.path.join(mixdir, f"{v}.wav"))]
        if missv:
            log(f"  voicing {len(missv)} missing: {missv}")
            subprocess.run(["python3", GENV, f"videos/{vd}", *missv], cwd=REPO)
        log(f"  {len(shots)} shots to render")
        if not render_missing(shots):
            log(f"  !! render INCOMPLETE for {vd}; skipping assemble")
            continue
        r = subprocess.run(["python3", os.path.join(REPO, "videos", vd, "work", "assemble.py"), "--tag", "4k"],
                           cwd=REPO, capture_output=True, text=True)
        tail = (r.stdout or r.stderr).strip().splitlines()
        log("  assemble: " + (tail[-1] if tail else "(no output)"))
        vdir = os.path.join(REPO, "videos", vd)
        f4ks = [f for f in os.listdir(vdir) if f.endswith("-4K.mp4")]
        if not f4ks:
            log(f"  !! no 4K output for {vd}")
            continue
        f4k = f4ks[0]
        base = f4k[:-7]  # strip "-4K.mp4"
        p4 = os.path.join(vdir, f4k)
        p1 = os.path.join(vdir, base + "-1080P.mp4")
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", p4, "-vf", "scale=1920:1080",
                        "-c:v", "libx264", "-crf", "22", "-preset", "medium", "-c:a", "aac", "-b:a", "224k", p1])
        d = os.path.join(DELIV, base)
        os.makedirs(d, exist_ok=True)
        subprocess.run(["cp", "-f", p4, p1, d])
        log(f"  DONE {vd} -> {base}")
    log("ALL_DONE")
    open("/tmp/finish.done", "w").write("ok")


if __name__ == "__main__":
    main()
