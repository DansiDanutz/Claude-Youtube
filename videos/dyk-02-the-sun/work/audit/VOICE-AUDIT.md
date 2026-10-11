# DYK No. 02 — The Sun · VOICE AUDIT (2026-10-12)

Input: the 9:59 v2 master David watched ("everything perfect except some bugs in the narration in the voice").
Output: `videos/dyk-02-the-sun/dyk-02-the-sun-1080P.mp4` — **10:16.7**, QA PASS (A/V 0 ms, 0 pts gaps, −14.1 LUFS, TP −2.2 dBTP).
Times marked *old* are in the 9:59 master; *new* in the 10:16.7 master (only the end screen grew after 9:59; earlier new times are unchanged).

## Method (all measured, nothing by ear)
- **Words**: Whisper `base` (cached) on every final `work/mix/*.wav` and on the master audio, diffed against `script.json`
  (numerals normalised), probability < 0.5 listed. Before: 315 diff/low-p lines; after: 231 (all remaining diffs are
  numeral formatting, UK/US spelling, homophones or Whisper dropping the first word after music — listed below).
- **Delivery**: per chunk speed, raw w/s (TTS take) and delivered w/s (after the pauses step), speech rate (syl/s,
  pauses excluded), per-word durations (drag), sentence gaps, pace steps between chunks.
- **Sound**: per-chunk loudness (BS.1770 K-weighted, gated — numpy), median F0 (autocorrelation) + spectral centroid,
  level at every inserted silence edge (cuts into speech / clicks), unaligned energy bursts, tails past the last word.
- **Mix**: power-domain voice-vs-background per word in the master (voice bus rebuilt from `mix/*.wav`); SFX that start
  inside words; voice lead-in after every cut.
- **Gate**: `tools/dyk/voice_preflight.py` (coordinator's tool, unchanged) on script + vo.json + timeline + cuesheet.

## Findings (before) and fixes
| # | where (old) | category | issue | evidence | sev | fix | new |
|---|---|---|---|---|---|---|---|
| 1 | 0:37.9–0:38.6 su00 | pause bug | **David's 0:36–0:38**: the `after: "that?"` breath matched the first *That.* (channel name) — 0.63 s hole between "Did You Know That." and "Episode two." (Brian's raw gap 0.023 s, the title ran on); the intended beat after "How old is that?" was missing | `plan_pauses` matched `norm('That.') == norm('that?')`; 0.627 s digital silence at 1.823 s in the take | CRIT | exact-token pause rules (`insert_pauses.py`, tested) | 0:38.8 gap 0.30 s; "that?" → "Guess" 1.05 s (0:46.9) |
| 2 | 1:14.2 su04 | pause bug | **David's 1:13–1:15**: `"you?"` matched "You" of "You wake up" — 0.35 s silence cut INTO "You…wake" (−15 dBFS at the cut, edge step 0.05 FS = click); beat after "the Sun to you?" missing | cut level −14.6/−16.6 dB; Whisper (master) drops "You" | CRIT | exact-token rules + cut at the quietest point + 8 ms fades | "You wake" gap 0.07 s (natural); "you?" beat 0.84 s at 1:31.5 |
| 3 | 6:52.9 / 6:57.0 su10 | pause bug | `"answer?"` fired on "Here's the answer." (+0.45 s) and `"it?"` on "It │ takes" (+0.25 s, cut at −45 dB) | plan diagnostics | HIGH | as #1 | "It takes" 0.02 s; "inside it?" 0.76 s; "your answer?" 0.74 s |
| 4 | 0:09.6 su01 | stitch/click | "right now, │ you" breath cut through continuous speech | −27 dBFS at the cut, edge 0.025 FS | HIGH | quietest-point cut + raised-cosine fades (tested) | no cut above −40 dB |
| 5 | 7 spots (1:00.0, 3:22.8, 3:49.8, 3:52.1, 4:49.4, 5:36.3, 8:18.9) | stitch | low-level steps (−40…−55 dB) into inserted silence | edge samples 0.004–0.012 FS | MED | fades at every inserted silence; 6 ms fades at every chunk edge | fixed |
| 6 | 7:15–7:41 su10, 8:15–8:21 su11, + every era | speed lurch | **David's 7:15–7:41 and 8:15–8:21**: chunk speeds zig-zag 0.85 ↔ 1.13–1.2 (29 boundaries > 0.08; 8 chunks > 1.10) — lean-in chunks floored at 0.85 next to chunks pushed to the 1.2 cap | script.json speeds (table below) | CRIT | continuity gate in `gen_voice.py` (band 0.90–1.08, ≤ 0.08 step, payoff ≤ 1.0, tested); 33 chunks re-voiced (cache kept the rest); su10 re-chunked by mood (text unchanged); pace targets re-derived from natural delivery | every chunk 0.90–1.08, steps ≤ 0.08, payoff 1.00 |
| 7 | 9:41.6–9:43.0 su13 c4 | sign-off | **David's 9:41**: "Ask... Wonder... Repeat." in 1.35 s (gaps 0.03/0.02 s), +3.1 LU over the scene, started on a 0.10 FS step (click) | alignment; LUFS; edge sample | HIGH | voiced word by word (3 one-word chunks cut from the paid take, no re-bill), 1.0 s beats, levelled, faded; thocks moved after each word | 9:55.8–9:59.1, beats 1.00/1.00 s, 1.5 s quiet before "Next time…" (10:00.6) |
| 8 | 3:17.1 su06 c2; 9:41.9 su13 c4 | loudness | chunk > 1.5 LU from scene median (+1.7, +3.1) | ebur128-equivalent per chunk | MED | data-driven chunk levelling in `stitch()` (peak-speech median, ±1.5 dB, tested) | all chunks within ±1.5 dB |
| 9 | 8:59.6 su13; 9:44.6/9:46.0 su14 | gaps | sentence gaps 0.05 / 0.21 / 0.13 s ("The Sun. Now…", "comment. Pick…", "mystery. And…") | vo.json | MED | `pauses` blocks (min 0.3 s) | ≥ 0.30 s |
| 10 | 0:52.8, 0:36.2, 8:48.1 | lead-in | voice 0.50 s after the cut (welcome, promise, close); hook 0.40 s | timeline.json | MED | leads 0.6 s (`make_timeline.py`) | all ≥ 0.60 s |
| 11 | 8:17.3 su11 | masking | "in Pasadena" heard as "capacity" in the master only (pop-reveal + stream-soft on the words); 133 words < +3 dB voice/background | Whisper master vs mix; power model | MED | loud SFX never start inside a word (`off_word` in the cue resolver, tested), SFX sidechain 3:1@0.04 → 5:1@0.03 | Pasadena heard correctly; 107 words < +3 dB (38 < 0 dB, was 49) |
| 12 | 7:36–7:41 su10 | SFX clutter | 9 cues (clicks, riser, impact, chime) on the payoff words | cue_parts/SuReveal.py | HIGH | only the riser (ending before "Only") + one soft hit after "ago." (new `WE` word-end cue, tested) | 7:54.6–7:59.0 clean |
| 13 | 4:02.9 (new take) su06 c5 | pitch | a re-voiced take came back +5 semitones (F0 med 141 Hz vs 102–109 neighbours) | F0 percentiles | HIGH | retired, re-voiced | 115 Hz |
| 14 | 1:17.3, 3:44.1, 4:35.0, 8:13.3 | names | Ptolemy "tollamy" (correct pronunciation), Harriot "Harriet" (homophone), Jan Ingen-house "John Ingenhaus", Becquerel "Beckerel", Herschel "Hershel", Dex-tee dot live → Whisper writes "dextee.live" | Whisper | LOW | none needed | — |
| 15 | old 2:59.0, 8:03.0, 8:53.4 | breaths | unaligned energy −33…−36 dB, 60–140 ms, between sentences | envelope vs alignment | LOW | natural breaths — kept | — |
| 16 | — | tails / clipping | no hallucinated tails (all chunk tails ≤ 0.0 s past the last character); no clipped first words except #7 | alignment vs audio | — | — | — |

Numbers and dates: every year/number is spoken as written (fifteen hundred, sixteen ten, seventeen seventy nine,
eighteen hundred, eighteen thirty nine, eighteen fifty nine, nineteen twenty eight, eighteen ninety three, nineteen
fifty four, twenty twenty four/five, twenty thirty, twenty one hundred, "almost nine percent", "one and a half percent",
"about six percent", "a hundred and seventy thousand years"); Whisper transcribes all of them as the right numerals.
IEA is read in full ("International Energy Agency"); TWh is screen-only; MAPLE is read "Maple" (was low-p at speed 1.2
— now at 1.00).

Wording changed for the voice only (facts unchanged): su03 one take (was two); su07 "Tiny. But real electricity."
(was "Tiny. But real." — "real." dragged 0.59–0.67 s in every take ≤ speed 1.08); su08 "…the source of every meal you
eat." (was "every meal." — "meal." dragged 0.57–0.70 s); su13 "collect the facts and play" (comma removed).

## Speed / w/s before → after (every chunk)
Raw w/s = the TTS take; delivered w/s = after the pauses step (what the viewer hears; `even_pace` keeps neighbours ≤ 10 %).
| scene | chunk(s) before | speed before | w/s before | chunk(s) after | speed after | raw w/s after | delivered w/s after | starts (new master) | changed |
|---|---|---|---|---|---|---|---|---|---|
| su01-hook | c1 | 1.00 | 3.33 | c1 | 1.00 | 3.33 | 3.23 | 0:00.6 |  |
|  | c2 | 1.12 | 3.54 | c2 | 1.00 | 3.06 | 2.96 | 0:08.3 | yes |
| su02-question | c1 | 1.00 | 3.48 | c1 | 1.00 | 3.48 | 3.48 | 0:16.5 |  |
|  | c2 | 0.95 | 3.43 | c2 | 0.95 | 3.92 | 3.69 | 0:23.1 | yes |
| su00-welcome | c1 | 1.00 | 2.99 | c1 | 1.00 | – | 2.99 | 0:37.0 |  |
| su03-promise | c1 | 1.00 | 2.94 | c1 | 1.00 | – | 3.18 | 0:53.8 | yes |
|  | c2 | 0.85 | 3.34 | – | – | – | – | – | yes |
| su04-1500 | c1 | 1.00 | 3.22 | c1 | 1.00 | 3.22 | 3.17 | 1:13.9 |  |
|  | c2 | 1.00 | 3.04 | c2 | 1.00 | 3.04 | 3.04 | 1:21.7 |  |
|  | c3 | 1.04 | 2.93 | c3 | 1.04 | 2.93 | 2.82 | 1:30.2 |  |
|  | c4 | 1.05 | 2.95 | c4 | 1.05 | 2.95 | 2.95 | 1:55.0 |  |
|  | c5 | 1.00 | 2.85 | c5 | 1.00 | 2.85 | 2.85 | 2:06.4 |  |
| su05-1610 | c1 | 1.00 | 3.08 | c1 | 1.00 | 3.08 | 3.00 | 2:13.8 |  |
|  | c2 | 0.90 | 2.75 | c2 | 1.00 | 2.88 | 2.73 | 2:27.9 | yes |
|  | c3 | 1.13 | 2.85 | c3 | 1.00 | 2.48 | 2.48 | 2:36.6 | yes |
|  | c4 | 1.00 | 3.09 | c4 | 0.92 | 2.73 | 2.70 | 2:57.4 | yes |
|  | c5 | 1.00 | 2.95 | c5 | 1.00 | 2.95 | 2.95 | 3:06.6 |  |
| su06-1700 | c1 | 1.00 | 2.97 | c1 | 1.00 | 2.97 | 2.97 | 3:11.7 |  |
|  | c2 | 0.85 | 3.15 | c2 | 1.00 | 3.59 | 3.24 | 3:20.6 | yes |
|  | c3 | 1.00 | 3.11 | c3 | 1.00 | 3.11 | 2.95 | 3:26.4 |  |
|  | c4 | 1.13 | 3.14 | c4 | 1.08 | 2.70 | 2.69 | 3:47.7 | yes |
|  | c5 | 0.85 | 2.88 | c5 | 1.00 | 3.44 | 2.92 | 4:02.9 | yes |
| su07-1800 | c1 | 1.00 | 2.80 | c1 | 1.00 | 2.80 | 2.74 | 4:09.7 |  |
|  | c2 | 0.85 | 3.06 | c2 | 0.92 | 3.26 | 2.93 | 4:20.7 | yes |
|  | c3 | 1.15 | 3.03 | c3 | 1.00 | 2.67 | 2.67 | 4:28.8 | yes |
|  | c4 | 1.09 | 3.00 | c4 | 1.07 | 3.00 | 2.90 | 4:49.7 | yes |
|  | c5 | 0.87 | 2.78 | c5 | 0.99 | 3.29 | 3.16 | 5:01.3 | yes |
| su08-1900 | c1 | 1.00 | 2.99 | c1 | 1.00 | 2.99 | 2.95 | 5:09.4 |  |
|  | c2 | 0.85 | 2.87 | c2 | 1.00 | 3.23 | 3.18 | 5:18.0 | yes |
|  | c3 | 1.00 | 2.90 | c3 | 1.00 | 2.90 | 2.89 | 5:24.0 |  |
|  | c4 | 1.14 | 3.00 | c4 | 0.96 | 2.84 | 2.79 | 5:35.7 | yes |
|  | c5 | 1.00 | 2.76 | c5 | 1.00 | 2.66 | 2.66 | 5:59.3 | yes |
|  | c6 | 0.85 | 2.80 | c6 | 0.98 | 3.33 | 2.91 | 6:06.7 | yes |
| su09-2000 | c1 | 1.00 | 3.06 | c1 | 1.00 | 3.06 | 3.05 | 6:12.9 |  |
|  | c2 | 0.88 | 2.74 | c2 | 1.00 | 3.41 | 2.82 | 6:20.9 | yes |
|  | c3 | 1.18 | 3.10 | c3 | 1.00 | 2.62 | 2.55 | 6:29.1 | yes |
|  | c4 | 1.00 | 3.27 | c4 | 1.00 | 3.27 | 2.78 | 6:54.4 |  |
| su10-reveal | c1 | 0.89 | 2.87 | c1 | 0.98 | 2.95 | 2.90 | 7:08.0 | yes |
|  | c2 | 1.00 | 2.88 | c2 | 1.00 | 3.13 | 2.98 | 7:20.1 | yes |
|  | c3 | 1.20 | 3.10 | c3 | 1.00 | 2.90 | 2.71 | 7:35.9 | yes |
|  | c4 | 0.85 | 2.76 | c4 | 1.00 | 2.53 | 2.51 | 7:40.6 | yes |
|  | – | – | – | c5 | 1.00 | 3.04 | 2.74 | 7:50.9 | yes |
| su11-2100 | c1 | 0.85 | 2.92 | c1 | 0.90 | 3.14 | 2.99 | 8:00.7 | yes |
|  | c2 | 1.00 | 2.97 | c2 | 0.98 | 2.94 | 2.94 | 8:08.3 | yes |
|  | c3 | 1.20 | 3.25 | c3 | 1.00 | 2.75 | 2.74 | 8:27.0 | yes |
|  | c4 | 1.00 | 3.07 | c4 | 1.00 | 3.07 | 2.98 | 8:37.9 |  |
|  | c5 | 0.89 | 3.01 | c5 | 1.00 | 3.22 | 3.22 | 8:56.3 | yes |
| su12-close | c1 | 0.85 | 2.77 | c1 | 0.90 | – | 3.11 | 9:05.5 | yes |
| su13-outro | c1 | 1.05 | 3.06 | c1 | 1.08 | 3.43 | 3.41 | 9:15.6 | yes |
|  | c2 | 1.00 | 3.32 | c2 | 1.00 | 3.32 | 3.25 | 9:38.5 | yes |
|  | c3 | 1.06 | 2.96 | c3 | 1.07 | 2.96 | 2.96 | 9:47.1 | yes |
|  | c4 | 1.00 | 2.23 | c4 | 1.00 | – | – | 9:55.8 | yes |
|  | – | – | – | c5 | 1.00 | – | – | 9:57.2 | yes |
|  | – | – | – | c6 | 1.00 | – | – | 9:58.5 | yes |
| su14-endscreen | c1 | 1.00 | 3.31 | c1 | 1.00 | – | 3.14 | 10:00.6 |  |

## Gates after the fix
- `voice_preflight.py`: **1 issue** — `'Photosynthesis.' 1.07 s` (su08, 5:43.1–5:44.2 new). The tool fails any word > 1.0 s;
  this is a 5-syllable word at 0.21 s/syllable (its own per-syllable limit is 0.55). It came out at 1.02–1.29 s in all
  12 takes at speed ≤ 1.08 (0.88 s only at the old 1.14). Reported to the coordinator; not forced.
- `gen_voice.py` continuity gate: all scenes pass. Speech-rate steps 10–25 % (listed, not failed — same-speed takes of
  Brian differ up to ~20 %): su02 1→2, su06 1→2 / 3→4 / 4→5, su07 1→2 / 2→3, su08 3→4 / 4→5 / 5→6, su10 1→2 / 2→3.
- `tests/test_dyk02_pipeline.py`: 55 passed.
- QA: `qa_final.py` QA PASS; 1 s sweep (615 frames, 52 sheets) for the reviewer.

## Listen list for David (new master)
0:37–0:40 welcome title · 1:13–1:16 "You wake up in fifteen hundred" · 4:02.9 su06 cliffhanger (new take) ·
4:47.1 "Tiny. But real electricity." · 5:36.0 "Now look…" (Whisper heard "luluk" on the voice-only mix,
"look" p 0.49 on the master — envelope shows no repeated onset) and 5:43.1 "Photosynthesis." · 7:08–8:00 the answer, ladder and
payoff · 8:30.2 Maple / 8:34.9 Pasadena · 9:55.8–9:59.1 sign-off · sentence-final words under stamp hits (0:07.5 "ago.",
5:23.2 "myth?", 5:34.9 "off.") — Whisper hears them, but they measure below the background.

## Re-check (fresh read-only reviewers on the 1 s sweep + cue/word data)
- Round 1 (whole master): C0 · H1 · M4 · L8 — end screen only ~13.4 s at full opacity (HIGH); flashes "a day off" 5:35
  and "IT WORKED" 8:37; payoff line landed on "was" not "Only"; outro frames stale. Fixed: end screen 16.6 s (15 s full
  + build-in + 0.6 s fade), lunch scene on "picnic", Maple holds to "scenario", payoff line + glow on "Only".
- Round 2 (changed seconds): C0 · H0 · M1 · L4 — scenario whoosh 0.5 s late (pushed off the word). Fixed: keyed on the
  word onset. Round 3: **C0 · H0 · M0** · L4 (end-screen sub-parts 12.6 s incl. the late "Comment below ↓"; three
  end-screen sounds under "Next time…"; 0.2–0.3 s text overlap at 7:54; a stale code comment — fixed).
