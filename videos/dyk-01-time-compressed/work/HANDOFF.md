# DYK No. 01 — Time, Compressed · HANDOFF

Status: **1080p preview master built and QA'd** — `../dyk-01-time-compressed-1080P.mp4`, 9:27.1 (audited, format v2 — see docs/DYK-FORMAT.md), rubric A 26/30 (RUBRIC.md).
Channel: **Did You Know That?** (YouTube @Did-You-Know-that-2026) — its own brand, NOT DansLab. Brand kit: `remotion/src/lib/dytbrand.tsx`
(real logo/banner in `media/library/logos/dyk-avatar.jpg`, `dyk-banner.jpg`): `DytSting` (4.5 s signature intro + fixed sonic logo,
reuse unchanged every episode), `DytLogoAnimated`, `DytWordmark`, `DytBg`. Ep-1-only welcome = `TcWelcome`; end screen = last 15 s of `TcOutro`
(two 16:9 video slots at x150/x1050 y230 720×405 + subscribe ring centred at y720 — place YouTube end-screen elements on them).
Branch: `video/dyk-01-time-compressed` (uncommitted at handoff).

## Pipeline (re-run from repo root)
```
python3 videos/dyk-01-time-compressed/work/gen_voice.py      # Brian, /with-timestamps; skips existing mp3s (never re-bill)
python3 videos/dyk-01-time-compressed/work/make_vo_json.py  # narration/*.words.json -> remotion/src/shots/dyk-01/vo.json
cd remotion && npm run gen && node scripts/render-all.mjs TcHook TcIntro TcWelcome TcPromise Tc1500 Tc1600 Tc1700 Tc1800 Tc1900 Tc2000 TcReveal Tc2100 TcClose TcOutro --scale=1
python3 videos/dyk-01-time-compressed/work/build_final.py    # concat (video-only) + VO + 107 SFX + ducked bed, −14 LUFS, CFR
python3 videos/dyk-01-time-compressed/work/qa_final.py <master> <sweep_dir>
```
4K delivery = same render with `--scale=2`, then build (needs disk headroom).

## Series kit
`remotion/src/lib/dykkit.tsx` — reusable for every Did You Know episode: `makeCue` (word-synced frames from the
alignment JSON), `EraHeader`, `EraHud` (live year counter), `Timeline7`, `FactCard`, `ClockFace`, `Squeeze`.
Shot prefix for No. 01 = `Tc`; pick a new unique prefix per episode.
`remotion/scripts/stills-at.mjs` — QA stills at any frames (bundles once).

## Gotchas hit this episode
- `remotion/out` is a symlink to `~/.cache/claude-youtube-render/out`; recreate the target if the cache was pruned.
- Remotion MP4s carry a padded silent AAC (~+0.05 s per shot): concat video-only copies or every join gaps.
- Repeated words in VO ("three" in "ninety three", "not" ×3): cue the nth occurrence explicitly.
- Limiter ceiling −2.6 dB sample keeps true peak ≤ −1 dBTP after AAC.

## Open
- Dan's watch (Channel Law 5). No. 02 teaser is promised in the outro: "the Sun you see is not the Sun as it is right now" (F17).
- Packaging (title + 3 thumbnails) via `/packaging`, then `tools/yt_upload.py` (private draft).
