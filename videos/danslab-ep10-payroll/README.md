# No. 10 — The Payroll

**What eight AI workers actually cost.** The double-length special that opens the books on
the company Season 1 introduced. Target 21:30 — roughly double the Season 1 average.

Series context: [../README.md](../README.md) · Working rules: [../CLAUDE.md](../CLAUDE.md)

## Status

| Stage | State |
|---|---|
| Script | ✅ done — 2,921 words VO, 20:08 at 145 wpm |
| Design assets | ✅ done — 1 title plate, 6 cards, 19 HUD plates |
| AI images | ⏳ 0 of 8 — prompts staged in `images/`, Dan generates |
| Animatic | ⏳ blocked on images (partial is fine) |
| VO recording | ⏳ not started |
| Terminal + b-roll | ⏳ not started |
| Final render | ⏳ |

Run `bash images/status.sh` for live image status.

## Files

**Read first**
- `SCRIPT.md` — the timecoded script, all cues
- `CAPTURE.md` — every shot in order, paste-ready commands
- `COSTS.md` — the source ledger: verified vs assumed, and what each assumption risks

**Produce from**
- `VO.txt` — narration only, for teleprompter or TTS
- `PUBLISH.md` — titles, description, chapters, tags, clip candidates
- `images/` — 8 subfolders, one per image, each with its prompt and accept/reject rule

**Rendered assets**
- `title-card.png` — the episode plate
- `cards/card-1…6.png` — full-frame design cards
- `hud-plates/hud-01…16.png` — transparent overlay states, top-right anchored
- `hud-plates/slam-12/13/14.png` — the three multiplier reveals

**Sources** — `title-card.html` · `cards.html` · `hud.html` · `model.py`

## The numbers this episode asserts

| | |
|---|---|
| Monthly spend | **$1,242** |
| Human equivalent (8 seats, loaded) | **$109,958/mo** · $1,319,500/yr |
| Blended rate | **$0.216** per agent-hour vs **$85.90** per human-hour |
| Savings — naive / coverage / **honest** | 89× / 398× / **159×** |
| Architecture verdict | **B+** — economics A, discipline A−, resilience C |

Rerun `python3 model.py` after any price correction — it rewrites `econ.json` and prints
every figure. The HUD and the script tables carry these by hand, so re-check those two if
anything moves.

Subscription tiers were confirmed by Dan on 2026-07-25 (2× Anthropic Max @ $200, ChatGPT
Pro @ $200, z.ai GLM $360/yr prepaid, Kimi Alegro $20/mo). Remaining assumptions are
hardware prices and the tools block — worst case ±$75 on the total.

## Next action

Generate `images/04-eight-desks/` and `images/06-green-lights/` first — those two carry
the most narrative weight. Then say the word and the animatic gets cut.

_Last verified: 2026-07-25_
