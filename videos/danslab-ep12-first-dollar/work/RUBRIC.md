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
- **WNewCrew fix 2026-10-25:** the title no longer holds alone 52–60 s — dol05's opening line lands on "last" and
  "faster". Re-rendered 4K (3840×2160, 630 frames), reassembled, re-muxed with --force, delivery pass re-run
  (−14.0 LUFS / −2.4 dBTP, 15,837 frames, pts gaps 0). Checked in the delivery file at 53.5 / 55.8 / 57.5 s.
- **Upload package 2026-10-25:** `~/Desktop/claudeYouTube/danslab-episode-12-first-dollar/` — `youtube-upload.mp4`
  (byte-identical to the 4K delivery file, SHA-256 15c33331…d4c0 after the masked rebuild below, full decode clean), `youtube-metadata.md` (chapters
  from the rendered shot starts; placeholders for the previous-video URL and the beta link),
  `danslab-first-dollar-thumbnail.jpg` (1280×720, from the `WThumb` composition — no paid image model).

| Dimension | Score | Evidence |
|---|---|---|
| Story | 5/5 | Hook on the zero counter → why own rails → receipts → audit → Dan pays live → "a company paying itself isn't revenue" → the stranger is EP13. The ending is honest and still lands. |
| Visual craft | 4/5 | Real captures framed (checkout, Dan's KuCoin withdrawal with address/txid masked); token-consistent. −1: the bottom bar is already on screen over the logo intro. (The WNewCrew title-only hold at 52–60 s was fixed 2026-10-25.) |
| Motion | 4/5 | Brand easings, staggered rows, reveals on spoken words (timing generated from whisper word stamps). −1: WWhy reads as one line for most of its 12.8 s. (WNewCrew's hold fixed 2026-10-25: nothing there is static > 4 s now.) |
| Sound | 4/5 | Delivery file at spec: −14.0 LUFS / −2.4 dBTP / stereo 48 kHz (ebur128, re-measured). CLICKS for the v3 shots sit on word cues; one riser into WLive; no win chime on the test; no clipping. −1: the v2 shots' CLICKS are still placements, not measurements. |
| Truth | 4/5 | Every on-screen number traced to the NervixPay DB or Polygon (checked 24 Oct); Dan's payment stamped PAID BY DAN — TEST, NOT REVENUE; REVENUE never moves. −1: dol19 says "three times" while WReceipts shows all five tests (Dan's choice, 2026-10-24). |
| Series craft | 5/5 | Classic intro, bottom bar with the live counter (+ LIVE TEST from dol23), top-right RAIL panel with pointer sign, outro motto on his words. |

**Total: 26/30 → A** (S = 28+, A = 24–27 per the design system; this file's gate is ≥ 25). Was 25 before the delivery pass.

- **Masked rebuild 2026-10-25:** before the public push, the KuCoin capture in the repo was replaced (history rewritten
  on the unpushed commits) by a copy with the status bar, full address and full txid filled; WLive re-rendered from it
  (3840×2160, 945 frames); 4K master re-muxed with --force; 1080p master derived from it in 110 s chunks (Lanczos,
  CFR 30, audio stream-copied). Both delivery files re-verified: −14.0 LUFS / −2.4 dBTP, 15,837 frames, 527.915 s,
  pts gaps 0, faststart, full decode clean — 4K 124 MB, 1080p 53 MB (`delivery/…-1080P-v1.mp4`).

Upload package built (see above). Still open before publishing: paste the previous-video URL and the beta link into
the description and pinned comment; upload the `episodes-v1` release asset (4K + 1080p delivery files).
Optional polish: hide the bottom bar during the logo intro; give WWhy a second beat; re-time the v2 CLICKS.
