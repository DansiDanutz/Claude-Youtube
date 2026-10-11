---
name: dyk-episode
description: Produce, fix, audit or publish an episode of the "Did You Know That?" YouTube channel (@Did-You-Know-that-2026, site Dexty.live) — one subject traced from 1500 to today and 2100, narrated only by ElevenLabs Brian, built as word-synced Remotion shots in this repo. Use when the user wants a new DYK episode ("next episode", "episode 2", "the Sun episode"), a DYK script or story, changes to an existing DYK episode, a DYK audit, or to publish a DYK video on Dexty.live. Not for DansLab-channel videos (use danslab-episode-production) or generic shots (make-tsx).
---

# Did You Know That? — episode production

Reference build: `videos/dyk-01-time-compressed` (9:26, audited). The format is law: `docs/DYK-FORMAT.md`.
Brand kit `remotion/src/lib/dytbrand.tsx` · episode kit `remotion/src/lib/dykkit.tsx` · rubric `docs/VIDEO-DESIGN-SYSTEM.md`.

## Non-negotiables
- **One subject per episode**: how people's behaviour toward it changed per century (1500 → today), how we live with it now, and **2100 from real published data only**, labelled `PREDICTION · a scenario, not a fact`.
- **Five beats per era**: "You wake up in [exact year], [place]" → "Did you know that…" brand card (one sourced, surprising fact) → how people lived (`DayClock` / `WeekStrip`, labelled illustration) → what changed it → `Cliffhanger` + "NEXT ▸". Every era, including the last before the answer.
- **Narrator = Brian only** (`gen_voice.py`: voice `nPczCjzI2devNBz1zQrb`, `eleven_flash_v2_5`, stability .42 / similarity .85 / style .30). Never another voice. Only regenerate lines that change (`ONLY=id1,id2`). Uses the ElevenLabs Creator subscription (no overage) — check `/v1/user/subscription` before big batches.
- **Brand** = Did You Know That? (real logo/banner in `media/library/logos/dyk-*`), never DansLab logos/URLs. Episode art may reuse DansLab tokens. Signature sting `DytSting` + its fixed sound cues, identical every episode, AFTER the cold-open hook.
- **Outro ritual**: subject-specific comment prompt · "At the end of every episode, I will read the best comment…" (Comment of the Week) · "Dex-tee dot live" (spell it like that for TTS; show **Dexty.live**) · like / share / subscribe on his words · ONE teaser for the next episode · "Ask... Wonder... Repeat." End screen 15 s: Comment of the Week card (left; real comment from the previous episode with @handle — or a clearly labelled EXAMPLE), WATCH NEXT slot (right), subscribe ring.
- **Truth**: every on-screen number traces to `RESEARCH.md`; hedge where historians disagree; never fabricate a viewer comment, quote or name. Paid research seats (Story Council) only with David's budget — otherwise research directly with web sources.

- **The human relationship arc (the spine — David, 2026-10-11)**: every era states, in one plain sentence, how humans
  SAW and USED the subject then, and the arc must climb — experience → explanation → measurement → harnessing →
  dependence → what 2100 makes of it. Ep02 example: 1500 the Sun is the difference between day and night (work vs
  sleep) · 1600s something to measure (spots) · 1800s invisible light and electricity · by 1900 the source of all food
  (photosynthesis) · 2000s power we harvest (solar) · 2100 the energy behind everything we run — internet, AI, cities
  (published projections only). On screen: a `HOW WE SAW IT` chip per era that stacks into an arc ladder; the answer
  walks the ladder back (then → now → next) and 2100 grows from it. `STORY.md` carries the arc table before any script.
- **Human narration**: Brian talks to ONE person. Run the humanizer pass in `references/narration-humanizer.md` on the
  script after research and before any voice — contractions, direct questions with a beat to answer, sentence-length
  variety, sensory openings, no AI-tell words/frames, facts untouched — then the read-aloud test.

## Pipeline (per episode, from repo root)
1. `videos/dyk-NN-<slug>/STORY.md` (beat sheet in the five-beat grid + the relationship-arc table: per era "how humans saw/used it", rising to 2100) → David approves.
2. `RESEARCH.md` (F-numbered facts + sources) → `work/narration/script.json` → humanizer pass + read-aloud (scene ids `xxNN-…`, second person, open loops, one "Did you know that…" per era).
3. Copy and adapt `work/{gen_voice.py,make_vo_json.py,build_final.py,qa_final.py,qa_sweep.py}` from episode 01. `python3 work/gen_voice.py` (timestamps) → `python3 work/make_vo_json.py`.
4. Shots in `remotion/src/shots/dyk-NN/` with a NEW unique shot-ID prefix; durations = VO offset + VO + ~1 s. Use `makeCue(vo, id, offset)`; `at('word', nth)`.
4b. **Voice pre-flight — must PASS before the first render** (`references/voice-preflight.md`): export `work/cuesheet.json`, run `python3 tools/dyk/voice_preflight.py …`; it fails on speed jumps, rushed/dragged words, run-on sentences, voice entering on a cut, SFX on words and a rushed sign-off. Fix and re-run until PASS — never render on a FAIL.
5. Stills at cue frames: `node remotion/scripts/stills-at.mjs <dir> Shot:frame,frame` — LOOK at them.
6. `node remotion/scripts/render-all.mjs <ids…> --scale=1` → `python3 work/build_final.py` → `python3 work/qa_final.py` + `python3 work/qa_sweep.py <master> <dir> 2`.
7. **Audit loop** (below) until no CRITICAL/HIGH and MEDIUMs fixed → `work/RUBRIC.md` (ship A/S) → HTML audit report → David's watch.
8. Packaging in `packaging/`: `thumbnail.png` rendered from `<Prefix>Thumb.tsx` (2560×1440 → stills-at writes
   1280×720) in the **logo palette** (deep navy, neon blue/purple left, green/orange right, the "?" orange→magenta
   gradient on the key words, white headline, logo top-left, bottom-right clear for the duration badge; ≤ 4 words);
   `YOUTUBE.md` with 3 titles ≤ 60 chars — every title names the episode's core idea (e.g. "Time Compression") AND "2100" (the future is the hook), description (hook, chapters from `timeline.json` starting 0:00, Comment of
   the Week prompt, Dexty.live, next episode, sources, AI-voice note), tags ≤ 500 chars, upload settings.
   Copy master + thumbnail + YOUTUBE.md to `~/Downloads/` for David's upload.
9. After upload: in `~/Projects/Did-You-Know-That/website`: `node tools/add-video.mjs <slug> <youtubeId>` → tests → PR → merge → **manual** `vercel --prod --yes` (merging does not deploy) → verify https://dexty.live.

## Audit loop (what episode 01 taught us)
- **Narration**: `whisper <mp3s> --model base --word_timestamps True` (base is cached; never download bigger models on this disk); diff vs script ignoring numerals; flag words with probability < 0.35, gaps > 1.1 s, meaning flips ("can" → "can't"). Fix by **rephrasing** (shorter clauses, split sentences, avoid double sibilants like "Keynes's", phonetic brand spelling) and regenerating only that line; re-check.
- **Voice identity**: if anyone doubts the voice, compare median F0 per line (numpy autocorrelation on `work/mix/*.wav`); Brian sits ~89–101 Hz.
- **Cues**: after ANY script edit, rescan every `C.at(...)` / `w(...)` token for duplicates — a new earlier copy of a cue word ("next", "ask", "three", "not", "same") silently fires the reveal/sound early. Always pass `nth` when a word repeats.
- **Frames**: dense sweep sheets (`qa_sweep.py`, every 2 s) reviewed end to end by an independent read-only auditor agent; check reveals vs words, title-safe (HUD sits at bottom 54 px), empty holds > 4 s, contradictions between screen text and narration, wrong years.
- **Mix**: SFX bus is sidechain-ducked under the voice; brand-card click lands BEFORE "Did you know that", chime AFTER it; risers end exactly on their payoff (`shift=-1.36`); no stacks of effects on the end-screen line; music loop crossfaded; -14 LUFS, true peak ≤ -1 dBTP (limiter -2.6 dB sample).

## Design every second BEFORE rendering (episode 01 needed 6 audit rounds without this)
Write `work/BEATMAP.md` from the word timings before writing a shot: one row per second of narration →
the word(s) spoken, the visual event that answers them, the SFX that marks it. Render only when every row is filled.
- **Never spoil the word.** No title, subtitle, era label, caption, chip or image may name or show the payoff
  before Brian says it (ep01: "the smell of coffee" subtitle + cup 7 s before "Coffee."; "midnight" 2 s early).
  Era headers use a neutral place line ("London · something new in the air"); the reveal lands ON its word.
- **No empty or static stretch ≥ 2 s** while he talks: every sentence gets its own visual beat. Watch the
  quiet sentences (atmosphere lines like "The air smells of smoke…") and the seconds right after a card fades.
- **No flashes**: anything shown must stay ≥ 1.5 s before it is covered (ep01 phone badge 1.2 s).
- **Builds pace with the voice**: lists/legends/figures build one item per ~12 frames, each with ONE soft
  click on the same step — never > 3 clicks per second. A highlight moves to each item on the word that names it.
- **Text fits**: long lines wrap inside a 160 px side margin; nothing touches the HUD (bottom 54–110 px) or the
  cliffhanger band (bottom 132).
- **Payoff words appear on the spoken word** (not at sentence start); cliffhanger bands build part by part.
- After the first full render, run ONE full 1 s audit; after fixes, re-check only the changed seconds with a
  fresh reviewer (tile by tile) — do not re-render untouched shots.

## Hard gates (automatic — a line or master that fails is rejected, never shipped)
- **Narration pace**: every line within ±10 % of Brian's story pace (2.9 words/s); `gen_voice.py` retries up to 4× and nudges ElevenLabs `voice_settings.speed` (0.7–1.2) until it passes, and stores the passing speed in `script.json`. Opening and outro lines need ~0.82–0.93 or they rush.
- **Stretched words**: any word > 1.0 s, or > 0.42 s per syllable mid-sentence, fails (the "railroaaads" drag at 4:12 in ep 01). ElevenLabs alignment HIDES these as long words, not silences — check word durations, not just gaps.
- **No dips to black**: shots cut hard (2–3 frame fades) and the whoosh carries the cut; voice lead-in 0.5–0.8 s, tail 0.6–0.9 s (longer only for an intentional question beat). `timeline.json` is computed from the narration and drives both shots and `build_final.py`.
- **QA scripts fail hard**: `qa_final.py` exits 1 on any spec violation (format, A/V ≤ 50 ms, 0 pts gaps, −14 ± 1 LUFS,
  TP ≤ −1 dBTP) and `gen_voice.py` rejects a line still failing its gates after all retries (`<id>.rejected.mp3`,
  override only with `ALLOW_GATE_FAIL=1`). Never ship on a FAIL. Scripts derive the repo root from `__file__`.
- **True peak**: limit at 4× oversampling (`aresample=192000,alimiter,aresample=48000`); measure the FINAL AAC file: ≤ −1.0 dBTP.
- **Frame audit**: one frame per SECOND (`qa_sweep.py <master> <dir> 1`) + `audit/timeline-by-second.txt` (words + SFX per second) reviewed sheet by sheet by an independent read-only auditor: picture follows narration, every visual event has a sound and every sound a visual, no flashes (< 1 s then covered), no empty ≥ 2 s, no rushed seconds. Only then call it audited.

## Gotchas (each cost real time)
- `remotion/out` → `~/.cache/claude-youtube-render/out` (pruned cache): `mkdir -p` the target if renders fail with ENOENT.
- Remotion MP4s carry a padded silent AAC (+~0.05 s): `build_final.py` concatenates video-only copies and checks frame counts.
- Disk floor: the `danslab-workflow` guard holds bare `ffmpeg` commands — run media steps through the preflighted python scripts (`danslab-workflow check --command "…"` first); never bypass a hold.
- Deliver previews ≤ 30 MB (720p ~300 kb/s) so David can watch on his phone; the 1080p master only shows in the desktop app.
- Test data never touches real episode data (a placeholder YouTube id once reached the site preview).
- The site's game layer must never reward watching YouTube (fake-engagement policy) — points come from knowledge (quizzes, guesses, cards).
