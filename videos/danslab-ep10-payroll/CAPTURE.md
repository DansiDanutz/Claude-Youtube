# EP10 — capture checklist

Everything the edit needs, in shooting order. Terminal shots have exact commands —
paste and record. Record terminal at 1920×1080, large font, dark theme.

`✅` = asset already rendered in this folder · `🎥` = you record · `🖼` = AI image, prompt in `PROMPTS.md`

---

## Already done

| Asset | File |
|---|---|
| ✅ Title plate (1920×1080) | `title-card.png` |
| ✅ 16 HUD overlay plates, transparent | `hud-plates/hud-01…16.png` |
| ✅ 3 multiplier slams, transparent | `hud-plates/slam-12/13/14.png` |
| ✅ 6 full-frame design cards | `cards/card-1…6.png` |
| ✅ Live HUD (if you'd rather screen-record the animation) | `hud.html?bg=transparent` |
| 🖼 8 image prompts, ready to paste into ChatGPT | `PROMPTS.md` → save to `images/` |

The HUD plates are top-right anchored at 1920×1080 with alpha — drop them straight on the
timeline above your footage, no keying needed. Use the live HTML only if you want the
number-tween animation between states.

---

## 0:00 — COLD OPEN

**🎥 Shot 1 — the typing line.** Empty terminal, type slowly, do not run it:
```bash
curl -s localhost:18900/v1/health
```

**🎥 Shot 2 — the nine plates.** Pull one title frame from each prior episode:
```bash
cd ~/Desktop/claudeYouTube
for e in 01-origin 02-survivors 03-trader 04-overseer 05-brain 06-marketplace 07-factory 08-studio 09-player; do ffmpeg -v error -ss 6 -i danslab-episode-$e/danslab-episode-$e-1080P.mp4 -frames:v 1 danslab-episode-10-payroll/plates/$e.png -y; done
```
⚠️ Eps 02, 04, 06 are iCloud-evicted. Rehydrate first or the command fails:
```bash
brctl download ~/Desktop/claudeYouTube/danslab-episode-0{2,4,6}-*/*-1080P.mp4
```

**✅ Shot 3 — the two stacked numbers.** `cards/card-1.png` — the yearly figure struck
through in coral, the monthly in gold. Hold ~3s.

---

## CHAPTER 1 — THE IRON

**🎥 / 🖼 B-roll.** Shoot the real hardware if you can — it's your actual office and reads
more honest than a render. Otherwise use the generated stand-ins:
`images/img-1-head-office.png` (Mac Studio, 1:40) · `images/img-2-ceo-desk.png` (Mac Mini, 2:40).
Add a slow push-in or 3% Ken Burns drift in the edit — stills read as stills if they sit still.

**🎥 Shot 4 — twelve local models:**
```bash
ollama list
```

**🎥 Shot 5 — LM Studio** holding the 30B model, or:
```bash
curl -s http://127.0.0.1:1234/v1/models | python3 -m json.tool
```

**🎥 Shot 6 — the four droplets.** DigitalOcean console, all four green, Frankfurt visible.
Zoom each size badge: `dexter 8GB` · `memo 16GB` · `sienna 8GB` · `nano 8GB`.

**🖼 Shot 6b — Frankfurt.** `images/img-3-frankfurt.png` under the "four separate ones,
deliberately" line, before cutting back to the console.

---

## CHAPTER 2 — WHAT THE BRAIN COSTS

**🎥 Shot 7 — the router answering:**
```bash
source ~/.openclaw/fleet.env && curl -sS -H "Authorization: Bearer $DLS_MODEL_AGENT_TOKEN" -X POST http://127.0.0.1:18900/v1/route -H "Content-Type: application/json" -d '{"agent":"dexter","task_type":"code_generation"}' | python3 -m json.tool
```

**🖼 Shot 7b — one door.** `images/img-5-one-door.png` on "it does not call an AI provider.
It isn't allowed to. It calls this." Hold ~2s, then cut to the diagram.

**✅ Shot 8 — the adapter diagram.** `cards/card-3.png` — 8 agents → the Model Agent gate
→ 3 tiers. If you want it built up, animate the three tier bands in one at a time.

**✅ Shot 9 — the law card.** `cards/card-2.png`. ⭐ *Carries the episode.* Reveal the four
lines one at a time on the beat — green, gold, bone, coral — then the caps line underneath.

**🎥 Shot 10 — the config inversion.** ⭐ *One of the five shots that carries the episode.*
```bash
python3 -c "
import json,os
d=json.load(open(os.path.expanduser('~/.openclaw/openclaw.json')))
a=[x for x in d['agents']['list'] if x.get('id')=='david'][0]
print(json.dumps(a['model'],indent=2))"
```
Highlight `\"primary\": \"moonshot/kimi-k2.6\"` and the Claude entry sitting in `fallbacks`.

**🎥 Shot 11 — the spend caps:**
```bash
python3 -c "
import json,os
p=json.load(open(os.path.expanduser('~/.openclaw/fleet-routing-policy.json')))
print(json.dumps({k:v for k,v in p.items() if 'cap' in str(k).lower() or 'budget' in str(k).lower()},indent=2)[:600])"
```
If the caps aren't top-level, just grep and show the lines:
```bash
grep -n -A2 -iE "soft_cap|hard_cap|per_agent" ~/.openclaw/fleet-routing-policy.json | head -20
```

---

## CHAPTER 3 — THE PLUMBING

**🎥 Shot 12** — Supabase dashboard, tables loading.
**🎥 Shot 13** — a Vercel deploy going green.
**🎥 Shot 14** — 4-up montage: Firecrawl crawling · Perplexity answering with sources ·
Kilo generating · Manus running a chain. ~2s each.

---

## CHAPTER 4 — THE PAYROLL

**🎥 Shot 15** — three server racks, lit, cut rhythmically (Frankfurt three).
**🎥 Shot 16** — Telegram, the 08:00 cost report and 08:15 revenue report landing.
**🎥 Shot 17** — watchdog log scrolling, a red alert firing, an auto-restart succeeding:
```bash
tail -f ~/.openclaw/logs/*watchdog* 2>/dev/null | head -40
```
**🎥 Shot 18** — the Paperclip board at `localhost:3210`, cards moving, comments landing
under David's name.

**🖼 Chapter opener.** `images/img-4-eight-desks.png` ⭐ under "I did something specific
with that twelve hundred" at 10:15. This is the thesis image — also use it in the cold
open behind "eight workers, 720 hours a month each".

**✅ Optional — the cost ladder.** `cards/card-6.png` fits the closing beat of Chapter 4,
where the ladder is revealed to match a human org chart. Cut to it on "nobody designed that".

**Overlay:** `hud-plates/hud-10.png` at 10:15, then hold `hud-11.png` from 16:45.
If you want the rows to appear one at a time, screen-record `hud.html?bg=transparent`
and press → once at each name.

---

## CHAPTER 5 — THE RECKONING

Three slams, each over whatever is on screen:
`slam-12.png` (89×) at 17:25 · `slam-13.png` (398×) at 18:05 · `slam-14.png` (159×) at 18:40.

Hold each ~2.5s. The 159× is the one that should breathe — give it an extra beat.

---

## CHAPTER 6 — THE AUDIT

**✅ Shot 19** — `cards/card-4.png`. Reveal the green column first, then the red as narrated.

**🎥 Shot 20 — the `return False` diff.** ⭐ *The episode's best shot.* Hold it.
```bash
cd ~/.openclaw/scripts 2>/dev/null && git log -S "should_mark_done_for_read_only" --oneline | head -5
```
If it isn't in git, show the backup diff referenced in `DANSLAB-OS.md` v1.2:
```bash
diff ~/.openclaw/scripts/paperclip_droplet_exec.py.bak-2026-07-02-before-close-fix ~/.openclaw/scripts/paperclip_droplet_exec.py | head -30
```
Failing both, recreate the line as a clean code card — but a real diff is worth more.

**🎥 Shot 20b — the 77 cron jobs** (new, for the accumulation beat). Let it scroll:
```bash
python3 -c "
import json,os
d=json.load(open(os.path.expanduser('~/.openclaw/cron/jobs.json.migrated')))
for j in [x for x in d['jobs'] if x.get('enabled',True)]:
    s=j.get('schedule',{})
    print(f\"{(j.get('agent') or '?'):14} {s.get('expr') or s.get('kind',''):18} {str(j.get('name'))[:46]}\")"
```

**🖼 Shot 20c — every light green.** ⭐ `images/img-6-green-lights.png` on "every alarm was
pointed at whether the machinery was turning". The one dead light lands the whole chapter.

**🎥 Shot 21 — the service sprawl:**
```bash
launchctl list | grep -cE "danslab|davidai|openclaw|paperclip|hermes"; ls ~/Library/LaunchAgents | wc -l
```

**Overlay:** `hud-plates/hud-15.png` (carries the B+ verdict card).

---

## CHAPTER 7 — OUTRO

**🎥 / 🖼 Shot 22** — wide of the room, warm, night. Real if you can shoot it;
otherwise `images/img-7-the-room.png`.
**🎨 Shot 23** — the nine plates as a held grid (build from `plates/` once rehydrated).
**Overlay:** `hud-plates/hud-16.png`.
**🖼 Pre-end beat:** `images/img-8-season-two.png` on the final word — "Revenue."
**✅ End card:** `cards/card-5.png`

---

## Audio

- VO: `VO.txt` — 2,921 words, **20:08 at 145 wpm**. With the marked beats and holds that
  lands at ~21:30. If you read faster, stretch the `[BEAT]`s rather than speeding through
  the numbers — every figure needs air.
- Music: `~/Desktop/DavidAi/Videos/_channel/channel_bgm_dark.mp3` fits chapters 6–7;
  `channel_bgm.mp3` for the rest.
- The cold open has no music until 0:12 — the relay click and the typing carry it.
