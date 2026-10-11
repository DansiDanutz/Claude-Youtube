# DYK No. 02 — The Sun · HANDOFF

Branch `video/dyk-02-the-sun` (uncommitted — nothing committed, pushed or amended). Episode-01 files untouched by this work
(see "Shared checkout" below). Master length **8:50.1**.

## State
**1080p master built, QA PASS, audited to CRITICAL 0 · HIGH 0 · MEDIUM 0** — `videos/dyk-02-the-sun/dyk-02-the-sun-1080P.mp4`
(8:50.1, 62 MB): h264 1920×1080 30/1, AAC 48 kHz stereo, A/V diff 0 ms, 0 pts gaps > 50 ms, **−14.1 LUFS, true peak −2.3 dBTP**,
loudness sweep flags none. Rubric **A 26/30** (`work/RUBRIC.md`).
Audit: 1 s sweep (`work/audit/sweep-1s/sheet-00…44.jpg`, `work/audit/timeline-by-second.txt`) reviewed in 3 rounds by independent
read-only auditors: round 1 CRITICAL 1 / HIGH 21 / MEDIUM 41 → round 2 HIGH 1 / MEDIUM 8 → round 3 MEDIUM 1 → fixed and verified on
full frames. Details: `work/audit/AUDIT-FINDINGS.md`, `work/audit/AUDIT-REPORT.html`.
Stills at cue frames: `work/audit/stills/stills-00…09-*.jpg` (all shots) + `fixes-00…04.jpg`, `round3-check.jpg` (fix checks).
Beat map: `work/BEATMAP.md` (531 rows, 445 cues). Thumbnail: `packaging/thumbnail.png`.
Not yet done: David's watch/listen; 4K (`--scale=2`) delivery render (needs disk); copy to ~/Downloads (skipped — disk critical); upload; Dexty.live entry.

## Done
1. **RESEARCH.md**: F1–F17 with sources. STORY gaps closed: F16 = John Stow, *Survey of London* (Midsummer bonfires,
   St John's Eve doors with green birch / St John's wort / glass lamps all night, quoted verbatim from the 1603 text);
   F4b = V&A record of Maria Gunning (1733–1760), white-lead face powder blamed (hedged: "at least in part"; TB too).
   Hedged: Chanel tan story = "probably a myth" (Segrave 2005 → unsigned 1971 *Mademoiselle* piece); "first *telescope*
   drawing of sunspots" (Harriot, 8 Dec 1610 — naked-eye records are older); STORY's "Padua" corrected to Florence;
   170,000 years = "NASA estimate · other estimates vary widely" on screen; 2100 = MAPLE (a demonstration) + IEA 2014
   (explicitly "not a forecast") + NASA ~5 bn years, labelled `PREDICTION · A SCENARIO, NOT A FACT`.
2. **Script** `work/narration/script.json`: 15 scenes `su00…su14`, per-chunk `pace` targets, `floor: 0.95` on hook,
   welcome, outro and end-screen lines. Cold open → sting → short "welcome back" (No. 02) → promise → 7 eras (five beats each:
   wake-up place line on its word · DYK card · Day Clock / Week Strip · what changed · cliffhanger + NEXT) → answer → 2100 →
   close → outro ritual (comment prompt "In which century would you rather watch the Sun rise?", Comment of the Week line,
   "Dex-tee dot live" / **Dexty.live**, like / share / subscribe, **No. 03 · School** teaser as a question only, "Ask... Wonder... Repeat.").
3. **Voice**: Brian only (`nPczCjzI2devNBz1zQrb`, eleven_flash_v2_5), never-sleepy settings stability .32 / similarity .85 /
   style .45. All 15 scenes regenerated under those settings (mixing old and new settings would change Brian's timbre between
   eras). 34 chunks, every one passing: pace ±10 % of its own target, stretched words (> 1.0 s, > 0.42 s/syllable mid-sentence,
   **> 0.55 s/syllable sentence-final**), no mid-sentence silence > 1.1 s. Whisper (base) diff clean apart from spelling
   variants (centre/center, neighbours/neighbors) and one low-confidence but correctly recognised "share" in the outro.
   **ElevenLabs: 20,952 characters used for this episode** (account 222,907 / 363,000 Creator; no overage possible).
4. **Shots** `remotion/src/shots/dyk-02/` (prefix `Su`): SuHook, SuIntro, SuWelcome, SuPromise, Su1500, Su1610, Su1700,
   Su1800, Su1900, Su2000, SuReveal, Su2100, SuClose, SuOutro + SuThumb. New kit exports in `remotion/src/lib/dykkit-sun.tsx`
   only (EpisodeHud with episode number, SunDisc, SafetyTag, LightBeam, Spectrum, DigitalClock, SunChip, QuoteCard,
   WakePlace, win). `dykkit.tsx` / `dytbrand.tsx` not edited by this work. `tsc` clean.
5. **Beat map**: `work/BEATMAP.md` (one row per second: words → visual event → SFX) is generated from `work/cues.py`, the SAME
   table `build_final.py` mixes (445 cues). Gates: every cue word resolves (`check_cues.py`, `cue_sheet()`), ≤ 3 clicks/s,
   every narrated stretch ≥ 2.9 s got its own beat; 7 stretches of 2.6–2.9 s remain, each covered by named continuous motion.
6. **Stills** at cue frames reviewed (contact sheets in the scratchpad; findings below) and fixed before the final render.
7. **Packaging** `videos/dyk-02-the-sun/packaging/`: `thumbnail.png` (from SuThumb, logo palette, "THE SUN / IN 2100?"),
   `YOUTUBE.md` (3 titles, all naming the Sun + 2100, ≤ 60 chars), `description.txt` (2,660 chars, plain "Dexty.live",
   no `<`/`>`; 2100 teaser in paragraph 2), `tags.txt` (445 chars, includes "life in 2100").
8. **Tests** `tests/test_dyk02_pipeline.py` (29, incl. lean-in 0.85 floor and TSX↔timeline sync): pace/stretch/gap gates, per-chunk pace target, 0.95 floor, sentence-final
   drag, comma ≠ sentence end, chunk stitching gap, chunk cache re-gated, quota gate, rejection keeps the canonical take,
   wav rebuild, fit gate, cue sheet (resolves, ≤ 3 clicks/s, DYK click/chime order, whole-frame timeline).

## Coordinator changes applied
- Option A (David): 13 lean-in chunks (facts, cliffhangers, close) re-recorded at pace 3.0 / floor 0.85; passing siblings came from the
  chunk cache (seeded from the stitched takes by `seed_chunk_cache.py`), never re-billed. Shots re-synced to the new timeline with
  `sync_shots.py` (found that durations/offsets had been stale in an earlier render — that render was discarded; now a tested gate).
- No. 03 = **School** (outro teaser line + end-screen WATCH NEXT slot "NO. 03 · COMING NEXT · SCHOOL"); Comment of the Week
  line kept; the card stays a labelled EXAMPLE (no real No. 01 comments existed).
- Episode-01 hardening ported (1edb248, ec795c8): repo root from `__file__`; `qa_final.py` hard fails; rejected takes never
  canonical (`ALLOW_GATE_FAIL=1` to override); `mp3_to_wav()` + wav rebuild without API; `narration_fit_problems()` gate;
  `qa_sweep.py` clears its old frames.
- Never-sleepy voice: per-chunk pace, floor 0.95, new settings, chunk stitching (0.25 s), full regeneration.
- Sentence-final gate (> 0.55 s/syllable): added + tested; it failed 17 chunks of the first re-take; fixed by re-rolls (passing
  chunks cached, never re-billed) and by rewriting sentence ends that dragged on every take: "full of fire." → "glowing with
  firelight.", "painted black." → "blackened.", "nothing to see?" → "nothing was visible?", "as it is?" → "as it is today?",
  "Only as it was." → "Only as it was, eight minutes ago.", "were right." → "were correct.", "nobody can see." → "our eyes
  cannot detect.", "even have walls?" → "even exist?".
- Skill "design every second" rules: no spoilers (place lines land on the spoken place; chips split so no payoff text appears
  before its word — e.g. "GALILEO: NO." on "disagreed", "ON THE SUN ITSELF" on "itself"; card clauses build on their words);
  nothing shown < 1.5 s (place lines held ≥ 1.5 s by moving the dock); builds at 12-frame steps with one click each
  (≤ 3 clicks/s, tested); long lines wrap inside 160 px margins, clear of the HUD and the cliffhanger band; payoff words on the
  spoken word.

## Voice table (every chunk: pace target · floor · final ElevenLabs speed · measured words/s — none below 0.85)
| scene | chunk | words | pace target | floor | final speed | measured w/s |
|---|---|---|---|---|---|---|
| su01-hook | 1 | 33 | 3.3 | 0.95 | 1.0 | 3.57 |
| su02-question | 1 | 16 | 3.2 | 0.95 | 1.2 | 3.19 |
| su02-question | 2 | 18 | 3.3 | 0.95 | 1.0 | 3.49 |
| su00-welcome | 1 | 48 | 3.15 | 0.95 | 0.95 | 3.37 |
| su03-promise | 1 | 46 | 3.0 | – | 1.0 | 3.22 |
| su04-1500 | 1 | 25 | 3.0 | – | 0.946 | 3.11 |
| su04-1500 | 2 | 27 | 3.0 | 0.85 | 0.877 | 3.16 |
| su04-1500 | 3 | 87 | 3.0 | – | 1.167 | 3.26 |
| su04-1500 | 4 | 15 | 3.0 | 0.85 | 0.85 | 2.88 |
| su05-1610 | 1 | 46 | 3.0 | – | 1.0 | 3.25 |
| su05-1610 | 2 | 24 | 2.8 | – | 1.0 | 3.06 |
| su05-1610 | 3 | 75 | 3.0 | – | 1.121 | 3.24 |
| su05-1610 | 4 | 11 | 3.0 | 0.85 | 0.864 | 2.72 |
| su06-1700 | 1 | 22 | 3.0 | – | 1.0 | 3.22 |
| su06-1700 | 2 | 18 | 3.0 | 0.85 | 0.85 | 3.15 |
| su06-1700 | 3 | 101 | 3.0 | – | 0.933 | 3.17 |
| su06-1700 | 4 | 12 | 3.0 | 0.85 | 0.85 | 3.04 |
| su07-1800 | 1 | 27 | 3.0 | – | 1.0 | 3.11 |
| su07-1800 | 2 | 23 | 3.0 | 0.85 | 0.85 | 2.91 |
| su07-1800 | 3 | 91 | 3.0 | – | 1.093 | 3.18 |
| su07-1800 | 4 | 12 | 3.0 | 0.85 | 0.85 | 3.15 |
| su08-1900 | 1 | 38 | 3.0 | – | 1.0 | 3.29 |
| su08-1900 | 2 | 18 | 3.0 | 0.85 | 0.85 | 2.87 |
| su08-1900 | 3 | 76 | 3.0 | – | 1.131 | 3.23 |
| su08-1900 | 4 | 14 | 3.0 | 0.85 | 0.85 | 3.28 |
| su09-2000 | 1 | 33 | 2.8 | – | 0.991 | 2.90 |
| su09-2000 | 2 | 92 | 3.0 | – | 1.18 | 3.21 |
| su09-2000 | 3 | 22 | 3.0 | 0.85 | 0.85 | 3.29 |
| su10-reveal | 1 | 88 | 2.9 | – | 1.0 | 3.18 |
| su10-reveal | 2 | 33 | 3.0 | – | 1.0 | 2.97 |
| su10-reveal | 3 | 16 | 3.0 | 0.85 | 0.85 | 3.22 |
| su11-2100 | 1 | 116 | 3.0 | – | 1.061 | 2.82 |
| su11-2100 | 2 | 25 | 3.0 | 0.85 | 0.85 | 3.28 |
| su12-close | 1 | 25 | 3.0 | 0.85 | 0.853 | 2.86 |
| su13-outro | 1 | 77 | 3.15 | 0.95 | 1.047 | 3.06 |
| su13-outro | 2 | 27 | 3.2 | 0.95 | 1.0 | 3.32 |
| su13-outro | 3 | 25 | 3.1 | 0.95 | 1.065 | 2.96 |
| su13-outro | 4 | 3 | none (sign-off) | 0.95 | 1.0 | 2.23 |
| su14-endscreen | 1 | 16 | 3.1 | 0.95 | 1.0 | 3.31 |

## Still-review findings (fixed before the final render)
- SuPromise: "Seven mornings." collided with the docked title → moved down. Su1500: telescope crowded the cliffhanger band → moved.
- Su1610: chip text overflowed its border (all `SunChip`s now size to content); 3 s empty ending → a prism splits the beam on "apart".
- Su1700: Week Strip's "IN THE SUN" day was still empty on "tan" → strip starts on "poor".
- Su1900: `C.at('Four')` matched "fifty **four**" → the Vanguard scene covered Bell Labs; fixed with nth=2.
- Su2000: the IEA quote held 4 s alone → 2020 chip + a solar farm that builds and lights on "cheapest".
- Su2100: scenario Sun clipped at the viewBox edge; IEA block top-heavy → both fixed.
- Pacing: years in SuPromise and century chips in SuOutro were 6-frame builds (5 clicks/s) → 12-frame steps.
- Narration bugs caught by the gates: whisper heard "Slough" as "slow" (now "near Windsor, in England"; the place line still reads
  "Slough, near Windsor"), "an earl" as "a neural", "Bell Labs" as "bells station", "fighting" as "fusting" — all rephrased.

## Render / disk
Disk went from 14.2 GiB free at the start to ~6.2 GiB (CRITICAL) during the session — almost all from other processes
on the machine; this episode's footprint: work dir ~60 MB (narration, chunk cache, audit sheets), shot renders ~150 MB in
`~/.cache/claude-youtube-render/out`, master 61 MB. The danslab-workflow guard allowed every step (render-all, build_final,
qa_final, qa_sweep, whisper — all "ordinary"); nothing was bypassed and no other project's files were touched. build_final.py now
deletes each bus intermediate as soon as it is consumed (the bus dir is removed at the end). A 4K render would need roughly
another 0.5–1 GB plus ~2 GB transient bus space.

## Shared checkout (not this agent's changes)
`git status` also shows edits to episode-01 files, `dykkit.tsx` (EraHeader `place` type widened string → ReactNode),
`stills-at.mjs`, `SKILL.md` and `CLAUDE.md` made by the episode-01 fixer in this same working tree. Episode 02 compiles
against them; nothing here modified them.

## Open questions for David
1. **Listen to the first 30 s and one era** before upload (option A applied: lean-in chunks now pace 3.0, floor 0.85 — none below 0.85).
2. Comment of the Week card is still an EXAMPLE — swap in a real No. 01 comment (+ @handle) before upload if one exists.
3. Thumbnail headline "THE SUN / IN 2100?" vs an alternative on the 8-minute hook ("8 MIN OLD?") — your pick.
4. Pick a title (recommended #1 in YOUTUBE.md).
