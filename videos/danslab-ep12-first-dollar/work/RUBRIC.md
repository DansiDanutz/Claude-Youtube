# EP12 — The First Dollar · rubric scorecard (v3, scored 2026-10-25)

Gate: `docs/VIDEO-DESIGN-SYSTEM.md` — ship A or S only (≥ 25/30, no dimension below 4 without a stated reason).
Master: `danslab-episode-12-first-dollar-4K-v1.mp4` — 3840×2160 · 30 fps · 15,837 frames · 527.9 s (8:47) · AAC
stereo 48 kHz · faststart (moov before mdat). 1080p not derived yet.

QA evidence:
- All 25 shots rendered at scale 2 and probed: every one 3840×2160, frame count == timed length.
- HUDs: WHud 3840×340, WHudTop 2160×280, yuva444p12le, 15,828 frames each.
- assemble: concat / voice / sfx / master all 527.9 s; no VO overlap. assemble.ORDER == timing.json shots.
- pts-gap scan (> 50 ms): video 0, audio 0 — after the final re-mux.
- Frame sweep: 32 frames read (every 4 s to 60 s, every 45 s after, plus six v3 sync moments: receipts stamp,
  WLive stamp + "payment confirmed", WCounter counters + "stranger", WNext "still at zero"). One defect found and
  fixed: the WReceipts stamp's 1.6× slam ran off the right edge for ~1 s (smaller, moved left; re-rendered,
  re-muxed with --force, re-checked at 359.6 s).
- Whisper: 26/26 lines pass (5 v3 lines 2026-10-24); dol22/dol23 listened to by Dan 2026-10-25.
- Loudness (ebur128), master: −15.9 LUFS integrated, −4.4 dBTP, LRA 4.1 LU — below the −14 target.
- **Delivery pass 2026-10-25** (make_delivery.py method run on the LOCAL master, never iCloud): flat +1.90 dB measured
  by ebur128, alimiter at −1 dBTP, AAC 256k stereo 48 kHz, video stream-copied, +faststart →
  `delivery/danslab-episode-12-first-dollar-4K-v1.mp4`. Re-measured independently: **−14.0 LUFS, −2.4 dBTP,
  LRA 4.1 LU**; 15,837 frames == master; 527.915 s; video/audio pts gaps 0; moov before mdat.

| Dimension | Score | Evidence |
|---|---|---|
| Story | 5/5 | Hook on the zero counter → why own rails → receipts → audit → Dan pays live → "a company paying itself isn't revenue" → the stranger is EP13. The ending is honest and still lands. |
| Visual craft | 4/5 | Real captures framed (checkout, Dan's KuCoin withdrawal with address/txid masked); token-consistent. −1: WNewCrew holds a title-only frame ~7 s before its tool reveals (52–60 s); the bottom bar is already on screen over the logo intro. |
| Motion | 4/5 | Brand easings, staggered rows, reveals on spoken words (timing generated from whisper word stamps). −1: the same WNewCrew title-only hold, and WWhy reads as one line for most of its 12.8 s. |
| Sound | 4/5 | Delivery file at spec: −14.0 LUFS / −2.4 dBTP / stereo 48 kHz (ebur128, re-measured). CLICKS for the v3 shots sit on word cues; one riser into WLive; no win chime on the test; no clipping. −1: the v2 shots' CLICKS are still placements, not measurements. |
| Truth | 4/5 | Every on-screen number traced to the NervixPay DB or Polygon (checked 24 Oct); Dan's payment stamped PAID BY DAN — TEST, NOT REVENUE; REVENUE never moves. −1: dol19 says "three times" while WReceipts shows all five tests (Dan's choice, 2026-10-24). |
| Series craft | 5/5 | Classic intro, bottom bar with the live counter (+ LIVE TEST from dol23), top-right RAIL panel with pointer sign, outro motto on his words. |

**Total: 26/30 → A** (S = 28+, A = 24–27 per the design system; this file's gate is ≥ 25). Was 25 before the delivery pass.

Upload candidate: `delivery/danslab-episode-12-first-dollar-4K-v1.mp4`. Still open before upload: the upload package
(thumbnail, `youtube-metadata.md`, the beta link for the description), the 1080p derivative if wanted, and the
`episodes-v1` release asset. Optional polish: fill the WNewCrew opening hold; re-time the v2 CLICKS.
