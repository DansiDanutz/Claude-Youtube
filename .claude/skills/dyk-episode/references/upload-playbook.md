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
   must print `[960, 767]`. The **video element** cannot fill the WATCH NEXT frame the outro draws (720 × 405 at
   1040, 230): YouTube keeps a minimum spacing between elements, and anything whose bottom comes within ~40 px of the
   Subscribe circle (top 619) shows red handles and is silently dropped on save — a 720 × 405 element would have to float
   58 px above the frame. The accepted placement, used on No. 01–05 (verified 2026-10-14), is the default 623 × 351
   element flush with the frame's top edge and centred: drag its body so the readout gives
   `const r=document.querySelector('.ytp-ce-video').getBoundingClientRect();[r.left-vr.left,r.top-vr.top,r.width,r.height].map(n=>Math.round(n*sx))`
   → `[1093, 230, 623, 351]` (±15 px is invisible). "Import from latest video" carries these positions over, so once an
   episode is right the next one only needs its target changed. If a future outro frame is redrawn to 623 × 351 at
   (1093, 230) the thumbnail will cover it exactly.
5. **Card** at ~0:40 → the previous episode.
6. **No subtitles** (David's standing requirement): never upload or publish a subtitle track, and remove any caption
   track that appears. YouTube's help describes deleting a track via *Subtitles* → the language row → ⋮ → *Delete*; on
   this channel's current *Languages* page (2026-10-14, all five episodes) the auto-generated `a.en` track is not listed
   as a row, so there is nothing to delete there — check the page again after processing and delete any row that shows
   up. *Edit subtitles* opens a manual draft seeded from the auto text: never *Save draft* or *Publish* it; close with
   *Discard changes*. Public check: the watch page's `captionTracks` must contain only `kind: "asr"` tracks.
7. Visibility as David says → confirm the public link (oEmbed answers with the title once it is public).
8. **Pin the Comment of the Week question** (the exact text in `YOUTUBE.md`). YouTube refuses pinning while the
   video is "being reviewed" (up to 24 h) — pin it then. Verify: on the watch page
   `document.querySelector('ytd-comment-thread-renderer #pinned-comment-badge').innerText` → "Pinned by @…", and Studio
   → Comments → *Published* lists it (remove the "Unresponded" filter). Other viewers may see it only minutes later.
9. Update the **previous** episode's end screen video element **and** its card to this new episode, then verify both on
   its watch page: end screen — `.ytp-ce-video a` href = the new video id, boxes still `[1093, 230, 623, 351]` /
   `[812, 619, 296, 296]`; card — in Studio → Cards the 0:40 card panel reads "Video: <new title>", and on the watch page
   at ~0:41 the cards button opens a panel whose link href contains the new video id.
10. **Studio quirks (cost time on No. 05):** pressing Escape in the upload dialog with no popup open *closes the dialog*
   (the draft autosaves — reopen with *Edit draft*); element refs go stale after any dialog change — re-find before clicking;
   "Import from latest video" carries the previous episode's element **positions** (good) and its **target** (wrong —
   re-point it); Category comes from the channel default (Education) — still read it back under *Show more*.

## 3. Dexty.live
`~/Projects/Did-You-Know-That` is a partial sparse clone (restored 2026-10-14). If it is missing again:
```bash
git clone --filter=blob:none --no-checkout https://github.com/DansiDanutz/Did-You-Know-That.git ~/Projects/Did-You-Know-That
cd ~/Projects/Did-You-Know-That && git sparse-checkout set --cone brand docs episodes intro neon-card outro tools website && git checkout main
cd website && vercel link --yes --project did-you-know-that-2026
``` Work in a worktree (`danslab-workflow check` first).
Add the episode exactly like the previous entry in `website/data/episodes.json` (8 era questions → 8 `<slug>-*` cards,
F-refs, 2100 never quizzed), `episodes/00N-<slug>/RESEARCH.md` + its source test, thumbnail + webp sizes, previous
episode's "What's next" → this one, this one's → the next subject placeholder; then
`node tools/add-video.mjs <slug> <youtubeId> --date YYYY-MM-DD` → `node tools/build-site.mjs --check` → `npm test` → PR →
merge → **manual** `vercel --prod --yes` from `website/` (merging does not deploy; re-run once if not applied) → verify
https://dexty.live (`/episodes/<slug>/` embeds the id, `/data/episodes.json` counts the new episode) and walk the site as a
viewer (home, journey, collection, daily question) for stale copy or links. Hook quirk: never put a short `-f` flag
(e.g. `gh api -f`) in the same command as a push — the fleet-safety hook holds it; use `--raw-field`, push alone.

## 4. Record it
Video id, end screen / card targets, pinned state, captions state and the Dexty.live deploy go into the episode's
`work/HANDOFF.md` and the central audit tracker.
