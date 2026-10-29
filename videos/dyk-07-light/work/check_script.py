"""Read-only checks on work/narration/script.json: same words as the approved draft, every pause marker has its word,
and which chunks already have a passing take (this episode's cache, or No. 06's under the same text/pace/voice hash).
No API call, no audio written."""
import importlib.util, json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
PREV = os.path.join(HERE, "..", "..", "dyk-06-medicine", "work", "narration", "chunks")
norm = lambda s: re.sub(r"\s+", " ", s).strip()

d = json.load(open(os.path.join(HERE, "narration", "script.json")))
built = norm(" ".join(s["text"] for s in d["scenes"]))
draft = norm(open(os.path.join(HERE, "narration-words.txt")).read())
print("scenes", len(d["scenes"]), "| chunks", sum(len(s["chunks"]) for s in d["scenes"]), "| matches approved draft:", built == draft)
if built != draft:
    a, b = built.split(), draft.split()
    for i, (x, y) in enumerate(zip(a, b)):
        if x != y:
            print(" first diff at word", i, repr(x), repr(y), "...", " ".join(a[max(0, i - 5):i + 5]))
            break
    print(" lengths", len(a), len(b))

missing = [(s["id"], p["word"]) for s in d["scenes"] for p in s["pauses"].get("after", [])
           if s["text"].split().count(p["word"]) < p["nth"]]
print("pause words missing:", missing)
print("beats in draft:", open(os.path.join(HERE, "narration-draft.md")).read().count("[beat]"),
      "| pauses set:", sum(len(s["pauses"].get("after", [])) for s in d["scenes"]))

spec = importlib.util.spec_from_file_location("gv7", os.path.join(HERE, "gen_voice.py"))
g = importlib.util.module_from_spec(spec)
spec.loader.exec_module(g)
prev = set(os.listdir(PREV)) if os.path.isdir(PREV) else set()
reuse = []
for s in d["scenes"]:
    for k, c in enumerate(s["chunks"]):
        h = os.path.basename(g.chunk_key(s["id"], k, c)).split(".")[-1]
        own = os.path.exists(g.chunk_key(s["id"], k, c) + ".json")
        hit = [f for f in prev if f.endswith(h + ".json")]
        if own or hit:
            reuse.append((s["id"], k + 1, len(c["text"]), "own cache" if own else hit[0]))
print("chunks with a reusable take:", reuse)
print("total characters:", sum(len(c["text"]) for s in d["scenes"] for c in s["chunks"]))
print("characters in reusable chunks:", sum(r[2] for r in reuse))
