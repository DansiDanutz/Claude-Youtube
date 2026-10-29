"""Live ElevenLabs quota (read-only GET /v1/user/subscription; no audio, no spend) and the No. 07 voice cost estimate.
The key is read by gen_voice.api_key() and never printed."""
import datetime, importlib.util, json, os

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("gv7", os.path.join(HERE, "gen_voice.py"))
g = importlib.util.module_from_spec(spec)
spec.loader.exec_module(g)

key = g.api_key()
if not key:
    raise SystemExit("no ELEVENLABS_API_KEY visible to this shell")
sub = g.subscription(key)
used, limit = sub["character_count"], sub["character_limit"]
left = limit - used
reset = datetime.datetime.fromtimestamp(sub["next_character_count_reset_unix"]).strftime("%Y-%m-%d %H:%M")
print(f"plan {sub['tier']} | used {used} / {limit} | left {left} | resets {reset} | status {sub.get('status')}")
print("allowed overage:", sub.get("can_extend_character_limit"), "/", sub.get("allowed_to_extend_character_limit"),
      "| overage used:", sub.get("character_count_overage", "n/a") if "character_count_overage" in sub else "n/a")

script = json.load(open(os.path.join(HERE, "narration", "script.json")))
todo = [(s["id"], k, c) for s in script["scenes"] for k, c in enumerate(g.chunks_of(s)) if not g.cached_take(s["id"], k, c)]
chars = sum(len(c["text"]) for _, _, c in todo)
print(f"\nchunks to generate: {len(todo)} of {sum(len(g.chunks_of(s)) for s in script['scenes'])} | characters: {chars}")
print(f"gen_voice gate 1 (worst case, every chunk {g.MAX_TRIES} tries, 1 credit per character): {chars * g.MAX_TRIES} <= {left}? {chars * g.MAX_TRIES <= left}")
print(f"gen_voice gate 2 (remaining >= characters x {g.BUDGET_MARGIN}): {chars * g.BUDGET_MARGIN:.0f} <= {left}? {chars * g.BUDGET_MARGIN <= left}")

print("\nper scene (characters, worst case at 4 tries):")
per = {}
for sid, _, c in todo:
    per[sid] = per.get(sid, 0) + len(c["text"])
for sid, n in per.items():
    print(f"  {sid:15s} {n:5d}  worst {n * g.MAX_TRIES:6d}")
