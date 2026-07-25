# EP10 — The Payroll · rubric scorecard (v2, Remotion rebuild)

Graded against `docs/VIDEO-DESIGN-SYSTEM.md`. Deliverable: `danslab-episode-10-payroll-1080P-v2.mp4`
(22:19, 56 segments, 77 VO lines, voice track drift 0.0s — measured, not assumed).

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Token fidelity | 5 | Every shot uses `DL` tokens + shared components (`SiteBg`, `Kicker`, `Headline`, `StatCard`, ep10kit `SpendLedger`/`WorkerRow`/`Slam`/`ImagePlate`/`ImageBackdrop`). Zero per-shot hex values or new fonts (grep-verified: only `DL.*` colors in shots). |
| 2 | Typography & legibility | 4 | Meaningful text ≥24px everywhere (worker sub-roles 22px are decorative duplicates of VO); 120px gutters; text on `#050404` ≈19:1, gold ≈9:1, red ≈5.5:1 (tokens, chroma-checked previously in danslab.tsx). One point held back: kickers at 22–26px mono are near the decorative floor. |
| 3 | Narrative sync | 4 | Every `at:` frame derived from ffprobe-measured wav lengths; VO offsets per shot in assemble.py ORDER; no overlap (assemble.py hard-fails on overlap). Verified against final MP4 frames at 455s (pay01/YAttrib), 492s (Dexter row landed on his name), 863s (159× held), 1335s (recap before "Revenue." — fixed a 0.5s pre-empt during still QA). Word-level timing is measured-per-line, estimated-within-line. |
| 4 | Motion craft | 4 | DL_EASE entrances/exits only, 3–6-frame staggers, springs damped 200 (no cartoon bounce), one counting number at a time. Long single-VO holds (YGood 40s, YZero 44s) carry mid-beats + SiteBg drift; a few reading-state stretches exceed 4s of layout stillness. |
| 5 | Sound | 4 | whoosh-soft on every cut, impact-deep-soft on YReckon/YLock/89×/398×/159×, riser-soft → 159× payoff, chime-reward on the end card, ambient-pad bed sidechain-ducked 12:1 under Brian, loudnorm master. Measured: −15.8 LUFS integrated / −1.4 dBTP (target −14/−1.5 — slightly quiet, no clipping). |
| 6 | Evidence & truth | 5 | Every on-screen figure traces to `model.py`/`econ.json` (rates, mults, $109,958, $10,749 overhead ledger sums exactly, 89/398/159×, $98.83 vs $0.54, 2,304 h) or the audited script claims (76/39/8, June 29 `return False`, 242/122 services). Stills framed via ImagePlate/ImageBackdrop, never raw. |

**Total: 26 / 30 → A. Ship-eligible.**

Remaining before channel delivery to `~/Desktop/claudeYouTube/`:
- 4K master: `node scripts/render-all.mjs <all 55 Y ids> --scale=2` then `python3.13 assemble.py --tag 4k` (or drive via `tools/finish_episodes.py`).
- Optional polish: pull loudnorm to a true −14 (currently −15.8).

_Last verified: 2026-07-26_
