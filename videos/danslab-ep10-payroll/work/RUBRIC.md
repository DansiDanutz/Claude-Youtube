# EP10 — The Payroll · rubric scorecard (v3 final)

Graded against `docs/VIDEO-DESIGN-SYSTEM.md`. Deliverables: `danslab-episode-10-payroll-4K-v2.mp4` + `-1080P-v2.mp4`
(23:30, 58 segments, 80 VO lines — 77 original + audit12/why05 new + outro, voice drift 0.0s).
v3: classic DansLab logo intro (series-standard), story-true cold open (episode montage removed,
no title repeat), YHuman 90/10 human-part scene, narrated outro (subscribe + like +
Build. Ship. Repeat. landing on Brian's words), top-right VO panel with pointer sign,
bottom link/bill bar with named +$ chips, number pops (scale+hot color), chapter fades,
~120-cue interaction sound layer, CFR masters (zero pts gaps, +faststart).
All VO whisper-checked English; new lines verified individually.

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Token fidelity | 5 | Every shot uses `DL` tokens + shared components (`SiteBg`, `Kicker`, `Headline`, `StatCard`, ep10kit `SpendLedger`/`WorkerRow`/`Slam`/`ImagePlate`/`ImageBackdrop`). Zero per-shot hex values or new fonts (grep-verified: only `DL.*` colors in shots). |
| 2 | Typography & legibility | 4 | Meaningful text ≥24px everywhere (worker sub-roles 22px are decorative duplicates of VO); 120px gutters; text on `#050404` ≈19:1, gold ≈9:1, red ≈5.5:1 (tokens, chroma-checked previously in danslab.tsx). One point held back: kickers at 22–26px mono are near the decorative floor. |
| 3 | Narrative sync | 4 | Every `at:` frame derived from ffprobe-measured wav lengths; VO offsets per shot in assemble.py ORDER; no overlap (assemble.py hard-fails on overlap). Verified against final MP4 frames at 455s (pay01/YAttrib), 492s (Dexter row landed on his name), 863s (159× held), 1335s (recap before "Revenue." — fixed a 0.5s pre-empt during still QA). Word-level timing is measured-per-line, estimated-within-line. |
| 4 | Motion craft | 4 | DL_EASE entrances/exits only, 3–6-frame staggers, springs damped 200 (no cartoon bounce), one counting number at a time. Long single-VO holds (YGood 40s, YZero 44s) carry mid-beats + SiteBg drift; a few reading-state stretches exceed 4s of layout stillness. |
| 5 | Sound | 5 | whoosh per cut (wind on chapter openers), impacts on slams/lock, riser→159× payoff, chime on reward cards, ducked ambient bed, PLUS the interaction layer: stamp-hit on payroll/verdict rows, ui clicks on every ledger line, pop-reveal on cards, trap-snap on ✗ beats, glitch-zap on `return False`, piano-a-min tension into the audit, warm-shimmer payoffs, thocks on the motto words — mixed in 40-input groups, −15.8 LUFS / −1.4 dBTP, nothing louder than Brian. |
| 6 | Evidence & truth | 5 | Every on-screen figure traces to `model.py`/`econ.json` (rates, mults, $109,958, $10,749 overhead ledger sums exactly, 89/398/159×, $98.83 vs $0.54, 2,304 h) or the audited script claims (76/39/8, June 29 `return False`, 242/122 services). Stills framed via ImagePlate/ImageBackdrop, never raw. |

**Total: 27 / 30 → A. Shipped.**

4K master shipped (chunked mux — long single-pass encodes get killed on this Mac;
see work/mux_chunked.py, and note unscoped ffmpeg fade=in/out blacks the whole
timeline — always scope with enable='between(t,..)').
Optional polish: pull loudnorm to a true −14 (currently −15.8).

_Last verified: 2026-07-26_
