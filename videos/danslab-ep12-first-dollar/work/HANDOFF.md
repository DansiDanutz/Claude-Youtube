# EP12 — The First Dollar · HANDOFF

Status: **SCAFFOLDED 2026-10-14 — script draft v2 (NervixPay + stablecoins spine, 26 lines + alt ending), NOT approved, NO voice, NO shots rendered.**

v2 direction (Dan, 2026-10-14): NervixPay = our own rails (no third-party gate, sell instantly, any business can use it);
stablecoins = future of money (no bank, no card %); "this is the moment the first money appears". Plus CH0 "what changed":
Claude Code / Codex / Kimi / Zcode / Hermes / GrokBot; OpenClaw replaced by Hermes; droplets redesigned (Dexter + Nano).

Branch `video/danslab-ep12-first-dollar` in the worktree `~/Projects/Claude-Youtube-fix-ids` (cut from
`video/danslab-story-ai`, which holds ep10/ep11). The main checkout `~/Projects/Claude-Youtube` is on
`video/dyk-05-food` with uncommitted dyk work — leave it alone.

## What exists

- `../TREATMENT.md` — premise, evidence table (verified 2026-10-14), chapters, persistent surfaces.
- `../SCRIPT.md` — VO lines `dol01`–`dol26` (`dol23a`/`dol23b` are the two endings; voice only the true one).
  ❓ placeholders in dol20, dol22, dol23a, dol23b must be real words before TTS (`build_script_json.py` exits 1 until then).
- `../RECEIPTS.md` — six decisions for Dan + capture checklist + publish blocker (NervixPay audit F-1).
- `narration/script.json` — generated from SCRIPT.md (regenerate after edits: see README resume step; the
  one-liner lives in the DansLab-Series hub README history / rerun the parse).
- `gen_voice.py` — ep11's, unchanged (Brian, flash v2.5, 48k mono wavs; skips existing wavs so it never re-bills).
- `assemble.py` — ep11's with ORDER/CLICKS/chapters remapped to `W*` shots, `OUT` pointed at THIS checkout's
  `remotion/out`, and the master forced **stereo** (`-ac 2`) per the delivery spec. VO offsets are placeholders (0.7s).
- `mux_chunked.py` — ep11's single-pass chunked mux with `WHud.mov`, SEGS/CHAPTERS remapped, output
  `danslab-episode-12-first-dollar-{1080P,4K}-v1.mp4`.
- `remotion/src/shots/danslab-ep12/WIntro.tsx` (NO. 12 · The First Dollar) and `WHud.tsx` (REVENUE $0.00 counter
  with the single POP at `LANDS_AT`, pipe-step chips). Registry regenerated via `npm run gen`.

## Not yet built (in order)

1. Dan's sign-off + the six decisions in RECEIPTS.md.
2. Real NervixPay captures (setup, share panel, phone checkout, dashboard, certification log, 12 Oct audit) → `media/`.
3. Shots (25 in ORDER): WDollar (reuse ep11 ZDollar particles), WStakes, WNewCrew, WRebuilt, WWhy, WTurn, WLandlord,
   WOwnRail, WInstant, WForYou, WStable, WNoBank, WAgentMoney, WHonestDeps, WSetup, WScan, WReceipts, WAudit, WMoment,
   WOffer, WLands/WFails, WHuman, WNext, WOutro + `WHudTop` (THE RAIL: LINK → SCAN → VERIFIED → IN THE WALLET).
4. Voice (true branch only) → ffprobe wavs → real `at:`/offsets → assemble → mux → QA gate → RUBRIC.md.

## Gotchas to re-read before rendering

`~/.claude/skills/danslab-episode-production/SKILL.md` — esp. 4K batch silently skipping shots, 48k silence gaps,
scoped fades, chunked encodes, ElevenLabs hallucinated tails, and "render stereo directly".
