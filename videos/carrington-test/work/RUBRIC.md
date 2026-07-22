# RUBRIC — Carrington Event stack test (carrington-test, 98s, graded 2026-07-22, re-graded after VO pass)

Full-stack test: Story Council treatment (`~/Desktop/DavidAi/Council/sessions/20260722-1330-the-1859-carrington-event/`)
+ ClaudeYoutube fast lane + animated characters + Channel Law. 7 scenes, 1:38, 1920x1080/30.
Structure: real-logo cold open (<2s build) -> paradox hook by 0:04 ("Every battery, disconnected. /
And the messages became clearer. / Why?") -> promise at 0:13 (two hours on a current nobody
switched on) -> stakes 0:25-0:40 with direct address -> Carrington flashback -> the experiment ->
induction reveal -> closing question + forward hook + end card. First-30s law satisfied.

**Story source:** STORY.md logline used as the hook; honesty rule honored — the Boston and
Portland operators stay UNNAMED on screen ("History never recorded their names. Only their
signal."). All numbers/dates traced to RESEARCH.md: Sept 1 1859 flare, two white patches in a
sunspot group, ~5 minute apparition, instrument self-doubt, 17.6-hour interval, currents
strengthening/weakening/reversing, sparks/fires/one operator stunned, print readable ~1 a.m.
in Boston, battery-cut + grounded line, "more steadily without the batteries" (reported speech,
no invented verbatim quotes), two hours of dispatches on auroral current, Loomis connecting the
reports. No contested claims used (no Royce, no injuries beyond "stunned", no revenue).

**Environment-native animation, never generic presenters (Dan, 2026-07-22):** the first cut
composited the library presenter cast (Arlo/Elena/Zoe) into the 1859 night world — rejected:
out-of-world characters add no value and break immersion. Replaced with three scene clips
generated FOR this film (new prompts, t2i still -> xAI i2v, ~63s each): the operator at his key
under the red sky (CtPromise), the sparking relay with smoldering tape (CtStakes), the
observatory sun projection (CtCarrington) — framed `FootageCard` insets that play ONCE, slowed
to span their full on-screen window (no loop restart — Dan 2026-07-22). Real people
appear as period steel-engraving STILL portraits (Carrington, Prescott, Loomis). The presenter
motion library remains for channel-brand films only (danslab-profile), never historical stories.

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Token fidelity | 5 | brand.ts throughout; night treatment uses the brand dark scale + danger rose for the 1859 red aurora, green reserved for "signal alive"; real red DlLogo mark opens and closes |
| 2 | Typography & legibility | 5 | Sora display 46-136px, body 27-42px, mono tags 22-25px; 130px gutters; paper-on-ink contrast; QA caught and fixed two overlaps (Arlo/portrait plate, diagram label/Loomis card) before delivery |
| 3 | Narrative sync | 5 | Hook 0:04, promise 0:13, stakes+direct address by 0:35, reveal withheld until 1:17 (STORY.md kill-list: explanation held to finale), forward hook before end card |
| 4 | Motion craft | 5 | Logo build <2s; 4 live i2v presenter clips loop in-shot (final-frame diff 20s vs 21s rms 11.6); animated key taps, wire draw+pulse, flare erupt/fade, aurora curtains; brand fade+rise easings |
| 5 | Sound | 5 | VOICE narration leads (7 Brian segments via the zurich ElevenLabs lane, VO peaks -6dB vs -26dB bed; CtStakes/CtExperiment/CtReveal extended to fit the read) + cinematic-min bed at 0.22 + 37 function-picked cues; limiter at -1dB |
| 6 | Evidence & truth | 5 | Every on-screen fact exists in RESEARCH.md (verified-findings section only); operators unnamed per the honesty rule; em-dash-free overlays audited |

**Total: 30/30 -> S.** Narration is VOICE ONLY per Dan (2026-07-22): ElevenLabs Brian via
`zurich engines/step5_audio.elevenlabs_synthesize`; script + mp3s + measured durations in
`work/narration/`. On-screen text is visual support, not the narration channel.

QA stills: `~/Desktop/claudeYouTube/carrington-test/stills/`. Delivery:
`~/Desktop/carrington-council-test.mp4` (+ `~/Desktop/claudeYouTube/carrington-test/final.mp4`).
