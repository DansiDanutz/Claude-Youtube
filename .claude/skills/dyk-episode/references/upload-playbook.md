# Upload playbook — packaging gate, YouTube Studio, Dexty.live

Upload, publishing, comments and the site deploy are public actions: each one needs David's go-ahead in chat.
David uploads the master file himself (the browser tool caps file uploads at 10 MB); the rest can be prepared.

## 1. Packaging gate (before anything goes to ~/Downloads)
```
python3 tools/dyk/packaging_check.py --packaging videos/<ep>/packaging \
  --timeline videos/<ep>/work/timeline.json --core <CoreIdea> --out videos/<ep>/work/audit/PACKAGING-CHECK.md
```
It fails on what YouTube punished before:
- **Chapters**: start at 0:00, ascend, ≥ 3, every chapter ≥ 10 s (the last starts ≥ 10 s before the end).
  No. 03 shipped 9:34 / 9:43 and YouTube dropped *all* chapters until the live description was fixed. Merge or
  drop a short chapter (fold "Comment of the Week" into "One question for you").
- **No clock times outside the chapter lines**: YouTube links every m:ss (No. 03 "It's 7:45" jumped to 7:45).
  Write "quarter to eight", "eight o'clock".
- Description ≤ 5,000 chars, no `http(s)://` (plain **Dexty.live**), no `<` `>`; title ≤ 60 chars naming 2100 and
  the core idea; tags ≤ 500 chars as YouTube counts them (quotes around multi-word tags), no empty or duplicate tag.
Chapter times come from `timeline.json` shot starts; re-run the gate after every re-voice that moves a shot.

## 2. YouTube Studio (after David's upload)
1. Details: title from `title.txt`, whole `description.txt`, thumbnail, playlist **"Did You Know That? — Every
   Episode"**, Not made for kids, tags from `tags.txt` (check the chip count — a trailing comma adds an empty chip).
2. Show more: language English (video + title/description), category Education (channel default), no paid promotion.
3. **Altered or synthetic content → "No, AI wasn't used".** Studio lists the cases that need a Yes (a realistic
   person saying or doing something they didn't, altered footage of a real event or place, a realistic-looking scene
   that never happened, and similar realistic synthetic media) — re-read the list in Studio each time; none applies
   to a disclosed AI narrator over illustrated graphics. The AI voice is disclosed in the description.
4. **End screen**: *Import from video* → the previous episode, then point its **video element at the previous
   episode** (WATCH NEXT slot, right); subscribe element over the ring. Last 15 s.
   **Geometry (learned on No. 04, 2026-10-14):** YouTube keeps end-screen elements out of a bottom safe zone — the
   Subscribe circle (296 × 296 video px) cannot go lower than box top **619** (centre y **767**); dragging it lower is
   silently clamped. So the ring the outro draws must sit at centre **(960, 767)** — in the outro component that is
   `left: 960 - 130, top: 637, width: 260, height: 260` (No. 01–04 shipped with `top: 720`, centre y 850, which leaves a
   crescent of the drawn disc visible under YouTube's circle; those four are centred horizontally and left as they are).
   After importing, verify on the public watch page (seek to the last 6 s, DevTools/JS):
   `const v=document.querySelector('video'),vr=v.getBoundingClientRect(),sx=1920/vr.width,r=document.querySelector('.ytp-ce-channel').getBoundingClientRect();[Math.round((r.left-vr.left+r.width/2)*sx),Math.round((r.top-vr.top+r.height/2)*sx)]`
   must print `[960, 767]`. The **video element** should fill the WATCH NEXT frame the outro draws — No. 02–04:
   `left: 1040, top: 230, width: 720, height: 405` (No. 01: left 1050) — not the default YouTube imports (623 × 351 at
   1140, 302), which leaves the frame's border and headline peeking around it. Two constraints YouTube enforces: elements
   may not overlap (the frame's bottom, 635, crosses the Subscribe circle's top, 619, where x 1040–1108 overlaps) and the
   editor shows red handles and silently discards the save when they do. So place the element at about
   `(1043, 212, 720 × 405)` — bottom 617, just above the circle — by dragging its body up first, then its top-left handle.
   Check: `const r=document.querySelector('.ytp-ce-video').getBoundingClientRect();[r.left-vr.left,r.top-vr.top,r.width,r.height].map(n=>Math.round(n*sx))`
   → about `[1043, 212, 720, 405]` (±15 px is invisible; YouTube keeps the 16:9 ratio). Better still for new episodes:
   draw the WATCH NEXT frame at `top: 212` so the element can fill it exactly without touching the circle.
5. **Card** at ~0:40 → the previous episode.
6. **No subtitles**: after processing, open *Languages* and delete any automatic captions (David wants none).
   Check again later — auto-captions can appear hours after upload.
7. Visibility as David says → confirm the public link (oEmbed answers with the title once it is public).
8. **Pin the Comment of the Week question** (the exact text in `YOUTUBE.md`). YouTube refuses pinning while the
   video is "being reviewed" (up to 24 h) — pin it then.
9. Update the **previous** episode's end screen and card to point at this new episode.

## 3. Dexty.live
In `~/Projects/Did-You-Know-That/website`: `node tools/add-video.mjs <slug> <youtubeId>` → tests → PR → merge →
**manual** `vercel --prod --yes` (merging does not deploy; a second run is sometimes needed) → verify https://dexty.live
shows the episode.

## 4. Record it
Video id, end screen / card targets, pinned state, captions state and the Dexty.live deploy go into the episode's
`work/HANDOFF.md` and the central audit tracker.
