# EP12 — The First Dollar · HANDOFF

Status: **SCRIPT v2 APPROVED 2026-10-15** — no ❓ left; script.json rebuilt (25 lines + 2 conditional endings). NO voice yet, NO shots rendered.

**Voice 2026-10-15: 25/25 unconditional lines generated and whisper-verified** (`work/verify_voice.py`, local whisper base;
report `work/verify/REPORT.md`). Speech total 433.5 s (7:14). dol11 take 1 repeated "a product of a product" (confirmed by a
beam-5 + word-timestamp decode) → regenerated once; bad take kept in `work/rejected/`. dol19 has a 0.18 s low-confidence
token ("had", p=0.25) between "actually" and "worked" at ~1.1 s — likely a breath; LISTEN before final mix.
Next: run the real 10 USDC Starter attempt with an invited merchant, then `ONLY=dol23a python3.13 gen_voice.py` (or dol23b)
and `python3.13 verify_voice.py --only dol23a`.

v2 direction (Dan, 2026-10-14): NervixPay = our own rails (no third-party gate, sell instantly, any business can use it);
stablecoins = future of money (no bank, no card %); "this is the moment the first money appears". Plus CH0 "what changed":
Claude Code / Codex / Kimi / Zcode / Hermes / GrokBot; OpenClaw replaced by Hermes; droplets redesigned (Dexter + Nano).

Branch `video/danslab-ep12-first-dollar` in the worktree `~/Projects/Claude-Youtube-fix-ids` (cut from
`video/danslab-story-ai`, which holds ep10/ep11). The main checkout `~/Projects/Claude-Youtube` is on
`video/dyk-05-food` with uncommitted dyk work — leave it alone.

## What exists

- `../TREATMENT.md` — premise, evidence table (verified 2026-10-14), chapters, persistent surfaces.
- `../SCRIPT.md` — VO lines `dol01`–`dol26` (`dol23a`/`dol23b` are the two endings; voice only the true one).
  All ❓ resolved 2026-10-15. `build_script_json.py` marks dol23a/b `conditional`; `gen_voice.py` skips them unless in `ONLY`.
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

1. ~~Dan's sign-off + decisions~~ done 2026-10-15 (see RECEIPTS.md). Still needed: the beta link URL for the description.
2. Real NervixPay captures (setup, share panel, phone checkout, dashboard, certification log, 12 Oct audit) → `media/`.
3. Shots (25 in ORDER): WDollar (reuse ep11 ZDollar particles), WStakes, WNewCrew, WRebuilt, WWhy, WTurn, WLandlord,
   WOwnRail, WInstant, WForYou, WStable, WNoBank, WAgentMoney, WHonestDeps, WSetup, WScan, WReceipts, WAudit, WMoment,
   WOffer, WLands/WFails, WHuman, WNext, WOutro + `WHudTop` (THE RAIL: LINK → SCAN → VERIFIED → IN THE WALLET).
4. Voice (true branch only) → ffprobe wavs → real `at:`/offsets → assemble → mux → QA gate → RUBRIC.md.

## Gotchas to re-read before rendering

`~/.claude/skills/danslab-episode-production/SKILL.md` — esp. 4K batch silently skipping shots, 48k silence gaps,
scoped fades, chunked encodes, ElevenLabs hallucinated tails, and "render stereo directly".

## Shots built 2026-10-15 (26 W* + WHud + WHudTop) — stills QA passed

- **Timing is generated, not guessed:** `work/build_timing.py` reads the real `mix/dol*.wav` durations + whisper word
  timestamps (`work/verify/words/`) → `remotion/src/lib/ep12timing.gen.ts` (`SHOT_SEC`, `at(vo, word)`, `voAt`, `abs`,
  `shotStart`) + `work/timing.json` (read by assemble.py for VO offsets) and patches every shot's literal
  `durationInSeconds`. Every reveal lands on a spoken word. Re-run it after ANY re-voice (and after dol23a/b is voiced).
- Cut (WLands branch, dol23a estimated 15 s): **511.5 s ≈ 8:32**. dol23a/b cues use fallback seconds until voiced.
- Shared kit `remotion/src/lib/ep12kit.tsx`; frame-specific QA stills: `node scripts/qa-stills.mjs WAudit:960 …` (→ `out/qa/`).
- mux_chunked.py now overlays **WHudTop** (THE RAIL, x 1190–1830 / y 60–186) as well as WHud.
- **Stills QA:** all 28 rendered at the 60 % frame (1080p) + 11 end-state frames, every one read. Fixed in the pass:
  Hermes/OpenClaw collision (WRebuilt), wrapped gate label (WLandlord), chip past the right margin + note over the frame
  (WOwnRail), arrow through a label (WNoBank), title hidden by a panning frame (WScan), stamps covering the evidence
  amounts (WReceipts → one stamp), orphaned word (WMoment), rail panel + pointer colliding with the kicker
  (WHudTop / WSetup / WScan kickers shortened), placeholder stamp over the kicker (WLands), an invented ep11 quote
  (WTurn → ep11's real words). `tsc --noEmit` clean.
- **Real captures used** (hard links from `~/Projects/nervixpay-promo` captures): nervixpay.live hero + "four steps"
  section, the real 26 Sep 3 USDC test checkout, the checkout QR.

## Open before render

1. **Fake-Real (Dan, 2026-10-15):** fake-real.live is live, built on JEV, membership checkout ENABLED via NervixPay
   (USDC/USDT on Polygon + Ethereum; $9/$20/$33; per Fake-Real `docs/STATUS.md`, 2026-09-28). **If any real member has
   paid, "this company has never been paid" (dol01/dol02/dol19/dol21) is false** — Dan must confirm, and the script
   likely gains a Fake-Real beat (first business on NervixPay). Not yet reflected in VO or shots.
2. WLands needs the real payment row/amount; WHud `LANDED`/`AMOUNT` flip only after the on-chain verification.
3. CLICKS table in assemble.py is still placement-only — re-time from `ep12timing.gen.ts` cues.
4. dol19 ~1.1 s low-confidence token — listen.

## v3 — option A (Dan, 2026-10-24)

The ending is no longer conditional. Dan's own 9 USDC payment (Fake or Real "Subscription", order #35096a88, Polygon
block 96097042, tx 0x9cbae7ff…, sent from his KuCoin account) is shown as a LIVE TEST, never revenue; REVENUE stays
$0.00. SCRIPT.md v3: new dol21, dol22, dol23 (single), dol25; dol20 now says the second source is live and only its
certification run is missing. v2 kept at `work/rejected/SCRIPT.v2-2026-10-15.md`.

- **Voiced 2026-10-24** (ElevenLabs, Brian): dol20 32.8 s, dol21 16.4 s, dol22 29.4 s, dol23 19.3 s, dol25 17.5 s.
  Whisper 5/5 PASS (`verify/REPORT.md`). Old takes + their transcripts in `work/rejected/` (`*.v2.*`, `verify-v2/`).
  Listen to dol22 ("built"/"matched" heard as "build"/"match" by base) and dol23 ("A company" heard as "to company").
- **Gotcha:** `verify_voice.py` reuses `verify/<id>.json` if present — move old transcripts aside after any re-voice.
- **Built 2026-10-25:** word timestamps for the 5 new takes (whisper base, beam 5) in `verify/words/`;
  build_timing.py is single-ending (PLAN: WLive=dol22, WCounter=dol23; no BRANCH/EST; a missing wav now stops it).
  New shots **WLive** (Dan's real KuCoin capture, address/txid masked to short forms, order/block/tx card, PAID BY
  DAN stamp) and **WCounter** (LIVE TEST $9.00 vs REVENUE $0.00); WHud gains a muted LIVE TEST $9.00 counter from
  dol23 "counter" to the end, no POP; WReceipts shows all five Dan-paid tests; WMoment, WAudit (F-2 "live ·
  certification run pending"), WNext updated. WOffer/WLands/WFails removed. Cut **526.6 s (8:47)**. tsc clean.
  Stills QA read: WLive, WCounter, WReceipts, WMoment, WAudit, WNext, WHud — fixed a stamp under the rail steps and
  two orphaned words. Media: `media/projects/danslab-ep12/dan-kucoin-withdrawal-9usdc-2026-10-24.jpg`.
- **Remapped 2026-10-25:** assemble.py ORDER uses WLive/WCounter/dol23 and refuses to run if it drifts from
  `timing.json`; no win chime/impact near the live test (one riser into WLive); CLICKS for WReceipts, WMoment, WLive,
  WCounter and WNext are timed to the real word cues. mux_chunked.py reads SEGS from `timing.json`. Checked: ORDER ==
  timing shots, every VO timed, every CLICK inside its shot, every SFX file present. Nothing rendered yet.
- **Still to do before render:** listen to dol22 ("ours" heard as "hours") and dol23 ("A company"); WNext's
  pre-existing "worth it." wrap; then the 4K render (ffprobe every width == 3840) → assemble --no-mux → mux.
- **Captures needed from Dan:** KuCoin withdrawal screen (have it), PAYMENT CONFIRMED screen, the nervixpay.live
  Fake or Real checkout page.
