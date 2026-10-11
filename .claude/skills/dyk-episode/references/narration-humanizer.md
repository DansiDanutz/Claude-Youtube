# Narration humanizer — make Brian sound like a person talking to one person

Run this pass on `work/narration/script.json` AFTER the facts are locked and BEFORE any voice is generated.
It rewrites wording only — never a fact, number, date, name or hedge from `RESEARCH.md`. Then read every line
out loud (or `say -v Daniel`): if you wouldn't say it to a friend across a table, rewrite it.

## Talk to one person
- "You", not "we" or "people" — the viewer is inside the story ("You wake up in 1500…", "Look at your phone").
- Contractions everywhere they're natural: you're, it's, didn't, they'd, here's, won't.
- Ask the viewer things and leave a beat to answer: "Would you have believed him?" "Guess." (0.3–0.5 s pause via `pauses`).
- Admit things a person would admit: "Honestly, this one surprised me." "Nobody really knows why." (only where true).
- React to the facts like a human: "Wait. Sixteen hours. For ninety-eight words." — short, then the meaning.

## Sound like speech, not like an essay
- Vary sentence length hard: a long winding sentence that carries you somewhere, then a short one. Then a fragment.
- One idea per sentence. Put the surprising word at the END of the sentence (that's where TTS stresses it).
- Concrete before abstract: a person, a place, a smell, a number — then the idea it proves.
- Sensory detail in every era opening: what you hear, smell, feel at that hour.
- Use real people's feelings where sources support them ("Harrison waited forty years for the prize").

## Cut the AI tells (rewrite any line that has one)
- Words: delve, tapestry, testament, realm, landscape (figurative), navigate (figurative), pivotal, crucial,
  vibrant, profound, intricate, seamless, robust, leverage, unlock, embark, journey (figurative), game-changer.
- Frames: "It's not just X, it's Y." · "In today's fast-paced world…" · "Little did they know…" ·
  "Let's dive in." · "Buckle up." · "But here's the thing:" more than once per episode · "Imagine a world where…".
- Reflex triplets: lists of exactly three adjectives/nouns in line after line. Use two, or four, or one strong one.
- Stated morals and summaries ("This shows us that…", "In conclusion…"). Let the image or the question land it.
- Over-hedging piled up ("perhaps it may possibly"). One honest hedge, where the source hedges.
- Em-dash chains and colon lists in narration — TTS reads them flat. Use full stops and commas.

## The human relationship arc in plain words
Each era's narration says, in one sentence a child could repeat, how people SAW the subject then
("In 1500, the Sun wasn't a star. It was the difference between working and sleeping.") — and the reveal
walks the whole ladder back in one breath each: then → then → now → next.

## Check before voicing
1. Every line passes the read-aloud test.
2. No AI-tell word or frame left (grep the list above).
3. Each era has its "how people saw it" sentence; the reveal recaps the arc; 2100 is evidence → scenario, hedged.
4. Facts unchanged: diff the numbers/dates/names against the previous script — they must be identical.
5. Pace targets still fit (shorter, punchier lines usually help; never slow the voice to fit).

If the `humanizer` plugin is installed, run it on the narration text as an extra pass, then re-apply rule 4.
