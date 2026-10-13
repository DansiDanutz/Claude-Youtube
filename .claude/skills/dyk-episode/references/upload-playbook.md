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
