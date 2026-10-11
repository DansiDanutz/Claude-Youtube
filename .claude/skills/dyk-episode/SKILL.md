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

## Pipeline (per episode, from repo root)
1. `videos/dyk-NN-<slug>/STORY.md` (beat sheet in the five-beat grid) → David approves.
2. `RESEARCH.md` (F-numbered facts + sources) → `work/narration/script.json` (scene ids `xxNN-…`, second person, open loops, one "Did you know that…" per era).
3. Copy and adapt `work/{gen_voice.py,make_vo_json.py,build_final.py,qa_final.py,qa_sweep.py}` from episode 01. `python3 work/gen_voice.py` (timestamps) → `python3 work/make_vo_json.py`.
4. Shots in `remotion/src/shots/dyk-NN/` with a NEW unique shot-ID prefix; durations = VO offset + VO + ~1 s. Use `makeCue(vo, id, offset)`; `at('word', nth)`.
5. Stills at cue frames: `node remotion/scripts/stills-at.mjs <dir> Shot:frame,frame` — LOOK at them.
6. `node remotion/scripts/render-all.mjs <ids…> --scale=1` → `python3 work/build_final.py` → `python3 work/qa_final.py` + `python3 work/qa_sweep.py <master> <dir> 2`.
7. **Audit loop** (below) until no CRITICAL/HIGH and MEDIUMs fixed → `work/RUBRIC.md` (ship A/S) → HTML audit report → David's watch.
8. After upload: in `~/Projects/Did-You-Know-That/website`: `node tools/add-video.mjs <slug> <youtubeId>` → tests → PR → merge → **manual** `vercel --prod --yes` (merging does not deploy) → verify https://dexty.live.

## Audit loop (what episode 01 taught us)
- **Narration**: `whisper <mp3s> --model base --word_timestamps True` (base is cached; never download bigger models on this disk); diff vs script ignoring numerals; flag words with probability < 0.35, gaps > 1.1 s, meaning flips ("can" → "can't"). Fix by **rephrasing** (shorter clauses, split sentences, avoid double sibilants like "Keynes's", phonetic brand spelling) and regenerating only that line; re-check.
- **Voice identity**: if anyone doubts the voice, compare median F0 per line (numpy autocorrelation on `work/mix/*.wav`); Brian sits ~89–101 Hz.
- **Cues**: after ANY script edit, rescan every `C.at(...)` / `w(...)` token for duplicates — a new earlier copy of a cue word ("next", "ask", "three", "not", "same") silently fires the reveal/sound early. Always pass `nth` when a word repeats.
- **Frames**: dense sweep sheets (`qa_sweep.py`, every 2 s) reviewed end to end by an independent read-only auditor agent; check reveals vs words, title-safe (HUD sits at bottom 54 px), empty holds > 4 s, contradictions between screen text and narration, wrong years.
- **Mix**: SFX bus is sidechain-ducked under the voice; brand-card click lands BEFORE "Did you know that", chime AFTER it; risers end exactly on their payoff (`shift=-1.36`); no stacks of effects on the end-screen line; music loop crossfaded; -14 LUFS, true peak ≤ -1 dBTP (limiter -2.6 dB sample).

## Hard gates (automatic — a line or master that fails is rejected, never shipped)
- **Narration pace**: every line within ±10 % of Brian's story pace (2.9 words/s); `gen_voice.py` retries up to 4× and nudges ElevenLabs `voice_settings.speed` (0.7–1.2) until it passes, and stores the passing speed in `script.json`. Opening and outro lines need ~0.82–0.93 or they rush.
- **Stretched words**: any word > 1.0 s, or > 0.42 s per syllable mid-sentence, fails (the "railroaaads" drag at 4:12 in ep 01). ElevenLabs alignment HIDES these as long words, not silences — check word durations, not just gaps.
- **No dips to black**: shots cut hard (2–3 frame fades) and the whoosh carries the cut; voice lead-in 0.5–0.8 s, tail 0.6–0.9 s (longer only for an intentional question beat). `timeline.json` is computed from the narration and drives both shots and `build_final.py`.
- **True peak**: limit at 4× oversampling (`aresample=192000,alimiter,aresample=48000`); measure the FINAL AAC file: ≤ −1.0 dBTP.
- **Frame audit**: one frame per SECOND (`qa_sweep.py <master> <dir> 1`) + `audit/timeline-by-second.txt` (words + SFX per second) reviewed sheet by sheet by an independent read-only auditor: picture follows narration, every visual event has a sound and every sound a visual, no flashes (< 1 s then covered), no empty ≥ 2 s, no rushed seconds. Only then call it audited.

## Gotchas (each cost real time)
- `remotion/out` → `~/.cache/claude-youtube-render/out` (pruned cache): `mkdir -p` the target if renders fail with ENOENT.
- Remotion MP4s carry a padded silent AAC (+~0.05 s): `build_final.py` concatenates video-only copies and checks frame counts.
- Disk floor: the `danslab-workflow` guard holds bare `ffmpeg` commands — run media steps through the preflighted python scripts (`danslab-workflow check --command "…"` first); never bypass a hold.
- Deliver previews ≤ 30 MB (720p ~300 kb/s) so David can watch on his phone; the 1080p master only shows in the desktop app.
- Test data never touches real episode data (a placeholder YouTube id once reached the site preview).
- The site's game layer must never reward watching YouTube (fake-engagement policy) — points come from knowledge (quizzes, guesses, cards).
