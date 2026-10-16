# DYK localization: subtitles and voice-over in other languages

One English video per episode. Each extra language is a subtitle file plus a full-mix voice-over audio file timed to the English
picture, so nothing is re-rendered. Dexty.live plays them over the English YouTube embed: subtitles only (English audio kept), or,
when the visitor mutes the English, the voice-over in sync.

## Steps for one episode

1. **Sentence map** (needs the English files once): `python3 tools/dyk/localize/en_map.py 05` writes `videos/<ep>/loc/sentences.en.json`
   (every English sentence with master-time start/end and the slot it may fill) and `loc/bed.json` (music, level, SFX cues).
   No. 01 has no matching script files; `en_from_whisper.py` builds its map from a Whisper transcript of the published master.
2. **Translate** each sentence, one for one: `loc/script.<lang>.json` with `say` (what Brian speaks, numbers as words) and an optional
   `show` (the whole subtitle, digits allowed). `check_translation.py <ep> <lang> [--worksheet]` is the gate: same ids, no digits in
   `say`, time budget per sentence, cascade lag per chunk, no fragment-only `show`. Run it before any paid call.
3. **Voice** (paid, resumable): `gen_dub.py <ep> <lang>`. One ElevenLabs call per chunk, cached by text, speed and voice. The quota
   gate reads the live plan (the measured cost is 0.43 credits per character on the Creator plan), keeps a reserve for the next
   English episode, and exits 3 when it stops. One run per episode and language at a time; paid calls of all runs are serialised.
   A take whose alignment does not match its text is kept as `*.rejected.*` and reported (exit 4), never used.
4. **Build** (free): `build_dub.py <ep> <lang...>` cuts every chunk into sentences by the character alignment, places each at its
   English sentence start (a long sentence pushes the next one; small tempo squeeze only as a last resort, never above 1.12),
   writes `loc/<lang>/placement.json`, mixes the voice over the sound bed to -14 LUFS with the English master's ducking and limiter,
   encodes `loc/<lang>/dub.m4a`, and rebuilds the subtitles from the placement. It lists the sentences that are still pushed more than
   0.8 s: those need a shorter translation.
5. **Subtitles only**: `build_vtt.py <ep> <lang>` (English sentence windows until a dub exists, dub placement after).
6. **Publish**: `publish.py <ep>` copies the subtitles into the Dexty checkout, uploads the audio to the public Blob store
   (`dub/v1/<slug>/<lang>.m4a`, token read with `vercel env pull` into a temporary file, never printed) and writes `localizations`
   into `website/data/episodes.json`. Then branch, pull request, merge, `vercel --prod --yes` from `website/`.

`run.py <ep> ro fr es zh` chains steps 3 and 4 and reports quota stops and failures in its exit status.

## What to know

- Everything after step 1 works from the committed `loc/` files, so an episode whose branch is not merged still builds.
- Git-ignored: `loc/<lang>/chunks/` (the paid takes) and `loc/<lang>/dub.m4a` (the audio, which lives in the Blob store).
  Keep the chunks: they are the only copy of what was paid for.
- Re-voiced audio needs a new version folder in `publish.py` (`VERSION`): the files are cached for a year.
- Speaking rates (`lang.py`) were measured with Brian on a typical sentence; the English runs at about 18.6 characters per second inside
  its sentences, Romanian and Spanish need to be a few percent shorter than English, French about equal, Chinese about a quarter.
- Tests: `python3 -m unittest tests.test_localize_core tests.test_localize_tools`.
