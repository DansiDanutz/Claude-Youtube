# Audit round 3 — No. 05 Food (master 647.80 s) — 3 fresh read-only auditors
Round-1/2 HIGH/MEDIUM: 73 checked, 70 fixed; FdHook/Welcome/Promise had not been re-rendered after the hold change (stale), now re-rendered.
New: CRITICAL 0 · HIGH 3 · MEDIUM 13 (incl. 8 "next heading > 1 s late" instances) · LOW 13. Mix: 0 violations.

## Round-3 HIGH/MEDIUM and fixes (round-4 master 649.30 s: Fd1884/Fd1915/Fd1966 tails +0.5 s each)
- Systemic: legibility inside a hold was eaten by the caption fade-in (Label 12 f, OnWord 10 f) and the panel fade-out (8–10 f), and the long hold pushed the next heading > 1 s late. Now: kit Label/OnWord fully visible 4 f after the word, `pane()` windows fade out in 4 f, HOLD_F 53 f (4 + 45 legible + 4), cue `H()` uses the same 53 f (whooshes had drifted 0.4–0.8 s ahead of the picture).
- 1:29 THE CHURCH CALLS THEM FAST DAYS flash → the DYK card holds after "fast".
- 2:43 OLD WOUNDS OPENING UP flash → body panel holds.
- 1:16 / 2:18 / (5:36) docking year over the first label → labels wait for the dock.
- 4:16 / 5:29 / 6:32 last cliffhanger line cut by the shot end → those shots' tails 0.9 → 1.4 s.
- 6:23 "grown by the tonne" running into the docked ladder → text wraps at 380 px.
- 7:50 MANY HISTORIANS DISAGREE short → dispute panel holds; 8:02 "And today?" late → water panel holds from "did".
- 9:15 2100 week icons before their words → plants on "plants", meat on "Meat", "· MOSTLY PLANTS" on its word.
- 9:25 source line naming "heart and planet" 5 s early → that half lands on "heart".
- 9:11 EARLY DEATHS A YEAR short → held.
- 2:32 ration source listing peas/oatmeal/cheese early → lands on "cheese".
- LOW fixed: bread before flour (1915), sparkle on the obesity bars, field showing through the fading DYK card, "≈ 1/5" next to the reveal's "1 in 5" (now "≈ 20 %", "> 50 %").
LOW open: FLIPPED ends upside-down (deliberate); 2100 rung "?" visible from frame 0 (it is No. 04's question); chip crossing the seesaw; two "Food" titles crossing in the outro crossfade (< 0.5 s); doctor line text ahead of the words in the reveal; plus the round-2 LOW list.
