"""Characters sent to ElevenLabs in one gen_voice run, from its log and script.json (read-only).
usage: python3 tally_run.py audit/gen_voice_run1.log"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
script = json.load(open(os.path.join(HERE, "narration", "script.json")))
log = open(sys.argv[1]).read().split("\n")

sent, tries_total, cur = 0, 0, None
rows = []
for line in log:
    m = re.match(r"\s+(me\d+\w*-\w+) chunk (\d+): pace target", line)
    if m:
        cur = (m.group(1), int(m.group(2)))
        continue
    m = re.match(r"\s+(me\d+\w*-\w+): [\d.]+s, ", line)       # single-chunk scene finished: its try lines came just before
    t = re.match(r"\s+try (\d+) speed", line)
    if t:
        n = int(t.group(1))
        key = cur
        if key is None:
            continue
        rows.append((key, n))
# single-chunk scenes print no "chunk k" header: attribute their try lines by scene order
scenes = {s["id"]: s for s in script["scenes"]}
single = [s["id"] for s in script["scenes"] if len(s["chunks"]) == 1]
cur_single, per = None, {}
for line in log:
    m = re.match(r"\s+(me\d+\w*-\w+) chunk (\d+): pace target", line)
    if m:
        cur_single = (m.group(1), int(m.group(2)))
        continue
    t = re.match(r"\s+try (\d+) speed", line)
    done = re.match(r"\s+(me\d+\w*-\w+): [\d.]+s, ", line)
    if t:
        if cur_single is None:
            per.setdefault("_pending", 0)
            per["_pending"] += 1
        else:
            per[cur_single] = per.get(cur_single, 0) + 1
    if done and not cur_single:
        per[(done.group(1), 1)] = per.pop("_pending", 0)
    if done:
        cur_single = None
total_attempts = 0
for (sid, k), n in per.items():
    if sid == "_pending":
        continue
    chars = len(scenes[sid]["chunks"][k - 1]["text"])
    sent += chars * n
    total_attempts += n
print("chunk attempts:", total_attempts, "| characters sent:", sent)
