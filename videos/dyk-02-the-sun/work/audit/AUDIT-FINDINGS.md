# DYK No. 02 "The Sun" v2 — audit findings

Method: master → `qa_sweep.py <master> audit/sweep-v2 1` (one frame per second, 50 sheets) + `timeline-by-second.txt`
+ `BEATMAP.md`, reviewed by five fresh, independent, read-only auditor agents (2-minute ranges). Fixes by the shot owners;
changed seconds re-checked by fresh reviewers. v1 findings archived in `../../v1-archive/AUDIT-FINDINGS-v1.md`.

## Round 1 (first full v2 render) — CRITICAL 1 · HIGH 9 · MEDIUM 39 · LOW 29
| range | C | H | M | L | main items |
|---|---|---|---|---|---|
| 0:00–1:59 | 0 | 1 | 7 | 7 | 0:52 black star-field frame at SuPromise start (H); hook cards over old countdown; "? years old" hints the unit; static 0:44–0:46, 1:08–1:10; 2100 node late on "twenty one hundred"; dim Day Clock after "Simple." |
| 2:00–3:59 | 0 | 0 | 14 | 6 | cliffhanger/card clauses 0.3–0.5 s before their words; band at x 112 + NEXT pill x 1796 (outside 160 px margin); place label "BY THE THAMES" over Florence; no sunspot drawing shown for the Harriot fact; Saturday "IN THE SUN" nonsense; 3:46 rushed second; sprout flash |
| 4:00–5:59 | 0 | 5 | 9 | 5 | 4:13 blackened-bulb flash (H); 4:24–4:26 and 4:55–4:57 static (H); eye strike never visible (H); ON PURPOSE flash (H); place tags SLOUGH / THE BEACH contradict later scenes; 5:09 near-black dip; Carrington stage frozen 9 s |
| 6:00–7:59 | 0 | 2 | 9 | 5 | 6:44–6:50 static room (H); "Only as it was," visible before "was" (H); 6:19 rushed chart; 170,000 twice; card over ladder rungs; "2100 · ?" rung before "hundred"; small text |
| 8:00–9:59 | 1 | 1 | 0 | 6 | SuOutro century chips said **1752** (v1 leftover; v2 era is 1779) (C); INTERNET/AI/CITIES labels 3 s early (H); end-screen text < 24 px; 593 s near-silence = music bed under the end screen (not a defect) |

Accepted, documented (not defects): era year slams at shot start before it is spoken (format — the previous NEXT pill
already named it; VISUAL-PLAN §3); SuClose/SuOutro 2.0–2.5 s gaps between cues are covered by continuous motion (v1-audited);
the 593 s loudness dip is the music bed under the silent end screen.

Kit fixes applied for round 2: ladder text ≥ 24 px (`LADDER_DOCK` font 26 / kicker 24), `SunCliffhanger` (band and NEXT pill
inside the 160 px margins) used by every era shot.

## Round 2 (all shots re-rendered) — CRITICAL 0 · HIGH 4 · MEDIUM 14 · LOW 20
Round-1 items confirmed fixed (1752 → 1779, black frame, flashes, statics, spoilers, margins, labels). New/remaining:
ON PURPOSE still < 1.5 s (H); SuReveal counter showed a legible "≈ 80,000" (H, unsourced); "? old" card a 0.9 s flash (H);
Su2000 room static 6:41–6:43 (H); 170,000 shown twice; ring count-up showed "6.8 %"; static 6:52–6:54; energy line short;
HUD PREDICTION 19 px; SuPromise nodes ~0.2 s early; "might" early; 1:23 line ahead; weak "?"; bulbs only 1.2 s; BELL LABS
label early; SuClose caption ahead; 9:34–9:35 static.

## Round 3 — CRITICAL 0 · HIGH 1 · MEDIUM 14 · LOW 26
"AND THE ENERGY INSIDE IT?" partly covered by the cut-away zoom (H). Mediums: Day Clock 1.9 s hold, "the Earth." / quote tail
early, Carrington stage frozen under the band, 8.7 % held only ~1.2 s, quote header contrast, counter-column timing, 6:52 static,
"you've ever watched" late, phone / 1.5 % fill late, end-screen + CTA text size, bulbs blackening before "blackened" (accepted
trade-off, see below).

## Round 4 (changed seconds only) — CRITICAL 0 · HIGH 0 · MEDIUM 6 · LOW 15
"as it is right now?" withheld 1 s; Stow label / fine print contrast; week-strip footnote 20 px (ep01 kit); 1807 chip vs SLOUGH
label; 8.7 % 0.7 s after "nine"; outro teaser line ahead of "class". Ranges 6:50–8:20 clean.

## Round 5 (changed seconds) — CRITICAL 0 · HIGH 1 · MEDIUM 0 · LOW 4
Su2000 card footnote visible ~1 s only (H) → now appears with "solar power".

## Round 6 (6:11–6:24) — 0 · 0 · MEDIUM 1 · LOW 2 → card words revealed word by word.
## Round 7 (6:10–6:24) — **CRITICAL 0 · HIGH 0 · MEDIUM 0** · LOW 1. Final Stow-label contrast tweak checked on the master frame (1:52).

## Final state: CRITICAL 0 · HIGH 0 · MEDIUM 0
Accepted (documented, not defects): era year slam at shot start (format); bulbs blacken 8 frames before "bulbs" so they show
≥ 1.5 s before the DYK card (flash gate vs on-word gate); place line "Slough, near Windsor" while Brian says "near Windsor"
(F6, v1 whisper fix); 593 s loudness dip = music bed under the end screen; kit-owned 19–20 px HUD/beam labels (ep01 kit
untouched). Open LOWs (polish): see the round reports in the HTML report.
Verification gap: stills at the final cue frames could not be rendered (disk guard hold on `stills-at.mjs`); every change was
verified on the 1 s master sweep instead.
