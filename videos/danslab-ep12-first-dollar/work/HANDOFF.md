# EP12 — The First Dollar · HANDOFF

Status: **SCAFFOLDED 2026-10-14 — script draft v1, NOT approved, NO voice generated, NO shots rendered.**

Branch `video/danslab-ep12-first-dollar` in the worktree `~/Projects/Claude-Youtube-fix-ids` (cut from
`video/danslab-story-ai`, which holds ep10/ep11). The main checkout `~/Projects/Claude-Youtube` is on
`video/dyk-05-food` with uncommitted dyk work — leave it alone.

## What exists

- `../TREATMENT.md` — premise, evidence table (verified 2026-10-14), chapters, persistent surfaces.
- `../SCRIPT.md` — 23 VO lines `dol01`–`dol23` (`dol19a`/`dol19b` are the two endings; voice only the true one).
  ❓ placeholders in dol10, dol16, dol19a, dol19b must be real words before TTS.
- `../RECEIPTS.md` — the five blocking decisions for Dan + capture checklist.
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

1. Dan's sign-off + the five decisions in RECEIPTS.md.
2. Wire day captures (real terminal/Stripe/NervixPay plates) → `media/` + `WRepo/WAudit/WDeploy/WKeys/WEndpoint/WLedger/WNervixPay/WCheckout/WWebhookLog` shots in `SiteFrame`.
3. `WDollar` (reuse ep11 `ZDollar` particle system, frozen state), `WStakes`, `WFourBoxes`, `WPipeIntro`,
   `WTwoPipes`, `WPrice`, `WLands`/`WFails`, `WHuman`, `WOneDollar`, `WNext`, `WOutro`, plus `WHudTop` (THE PIPE panel).
4. Voice (true branch only) → ffprobe wavs → real `at:`/offsets → assemble → mux → QA gate → RUBRIC.md.

## Gotchas to re-read before rendering

`~/.claude/skills/danslab-episode-production/SKILL.md` — esp. 4K batch silently skipping shots, 48k silence gaps,
scoped fades, chunked encodes, ElevenLabs hallucinated tails, and "render stereo directly".
