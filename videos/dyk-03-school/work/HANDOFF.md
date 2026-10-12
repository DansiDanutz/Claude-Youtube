# HANDOFF — Did You Know That? No. 03 · "School" (2026-10-13)

Branch `video/dyk-03-school` (pushed). Status: **approval package ready** — David's watch/listen, then upload.

## Deliverables
- Master: `videos/dyk-03-school/dyk-03-school-1080P.mp4` (10:50.9, not in Git) · preview `dyk-03-school-720p-preview.mp4` (26.8 MB)
- Copies for upload: `~/Downloads/DYK-03-School/` (master, thumbnail, title/description/tags, YOUTUBE.md)
- Packaging: `videos/dyk-03-school/packaging/` (thumbnail.png 1280×720 from `ScThumb.tsx`, title.txt, description.txt 3,593 chars, tags.txt 433 chars, YOUTUBE.md)
- Audit: `work/audit/AUDIT-REPORT.html`, `work/audit/VOICE-PREFLIGHT.md` (PASS), `work/audit/STILLS-CONTACT-SHEET.jpg`, `work/audit/WHISPER-DIFF.txt`, `work/RUBRIC.md`, `work/BEATMAP.md`, `work/audit/timeline-by-second.txt`

## What was done
1. Re-checked the three blocked sources in the built-in browser (UNESCO 2026 GEM 1.4 bn; UNESCO 1.6 bn / 91 %; UK Parliament 1880/1891). RESEARCH.md updated; 251 m superseded (273 m) and not used.
2. `work/narration/script.json` (built by `work/make_script.py`, which keeps passing speeds) → humanizer grep clean → Brian via `gen_voice.py`.
3. Voice: 8,246 ElevenLabs characters used (Creator count 233,433 → 241,679 of 363,000). `gen_voice.py` gained `refine_ends()`: alignment stretched sentence-final words over silence; word ends are now measured from the audio (real drags still fail).
4. Re-voiced after whisper/audit: "from the age of five", "the cost", "So, what is school to you (now)?" ×2, "said to have used" (hedge kept), one 1647 chunk re-paced. One chunk (`sc11-2100.c5`) had a hallucinated 0.4 s tail; trimmed at 8.92 s in the local chunk cache (media, not in Git — keep the local cache if sc11 is ever rebuilt).
5. Shots `remotion/src/shots/dyk-03/Sc*.tsx` (prefix `Sc`), kit `remotion/src/lib/dykkit-school.tsx` (Sun kit untouched), cue table `work/cues.py` + `work/cue_parts/`.
6. `build_final.py`: loud SFX near a word onset now land 60 ms before it (audit: 207 on-onset hits → 23 within ±30 ms, none inside words).
7. Audit loop: visual + voice/AV auditors, fixes, fresh re-audit, final HIGH fixed and verified.

## Open / unverified
- Human listen: "Skelton" may sound like "Skeleton"; "next rung" like "next wrong"; "So, what is school to you?" (1810) like "cool"; low-confidence year words (1810/1880) read correctly on the isolated takes. LOW.
- BEATMAP: 9 narrated gaps ≥ 2 s (8 × 2.0–2.2 s with motion; the payoff's 3.9 s is deliberately click-free).
- 4K render, upload, pinned comment, Dexty.live entry (skill step 9) not done.
- Central audit tracker (`~/Desktop/DavidAi/audit-dashboard.html`) not updated (outside this worktree).
