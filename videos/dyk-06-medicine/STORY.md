# Did You Know That? No. 06 · "Medicine" · STORY v2 (approved 2026-10-17: eras 1500, 1799, 1847, 1941, 1948, today; narration drafted)

Status: **approved on paper; narration v1 written.** No voice, renders, paid API or commit. Facts: `RESEARCH.md` (M1-M13; M2, M7, M9 re-checked 2026-10-17). Narration: `work/narration-draft.md` (spoken words only: `work/narration-words.txt`).
Template: No. 05 *Food*. Scene ids `me00…me14` (+ `me13b-next`, `me13c-signoff`), shot prefix **`Me`** (grep `remotion/src` before production).
No. 05's voiced teaser is the contract: it opens with Washington 1799 and asks "how did we find out what really heals us?"

## 0. Logline
You sit with six patients, from a French army camp to an Oxford ward. In each, you watch what the doctor believed, what
the treatment did and how long people lived. Then you find out what really changed medicine: **not better doctors or
stronger drugs first, but a better question: compared with what?**

## 0.1 The two mysteries
| | Question (on screen) | Answer (in `me10-reveal`) | Facts |
|---|---|---|---|
| **Hook question** | "Did you know that in 1799 George Washington's doctors drained, by some estimates, around two fifths of his blood? They were not fools. So how did we find out what really heals us?" | **By counting.** Doctors then trusted authority and what they saw. Medicine changed when someone compared a treated group with an untreated one and counted: Semmelweis's monthly deaths (1847), the streptomycin trial (1948). | M1, M2, M5, M7 |
| **The guess** | "In 1948 doctors gave streptomycin to some tuberculosis patients and nothing to the rest. Of the treated group, about how many died within six months?" | **A handful, against many in the untreated group** (counts RE-CHECK, M7). | M7 |

## 1. The spine: how humans saw medicine, rung by rung
**fate/balance → observation → pattern → cure → proof → prevention → an arms race (2100)**

| Era | `HOW WE SAW IT` chip | Plain sentence (Brian) | THE PATIENT | THE EVIDENCE | THE YEARS (at birth · average) | Facts |
|---|---|---|---|---|---|---|
| **1500s** France (army camp near Turin, 1537) | **BALANCE** | "Balance. Illness is something to rebalance." | surgeon dresses gunshot wounds with boiling oil; the oil runs out, a plain salve is used and the men sleep better | one surgeon notices; it is written decades later | ≈ 35 (No. 05 F8, England) | M4, M11 |
| **1799** Mount Vernon (USA) | **AUTHORITY** | "Authority. Trust the experts, and the experts bleed you." | a sore throat, three doctors, hours of bloodletting | nobody counts what the bleeding does | world ≈ 29 (1800: 28.5) | M1, M2, M3, M9 |
| **1847** Vienna (Austria) | **PATTERN** | "Pattern. Count the deaths and look for the cause." | the First Clinic, mothers dying after birth | 18.3 % in April, then 2.2 %, 1.2 %, 1.9 % after handwashing; he is not believed | Britain ≈ 38 (38.5) | M5, M12, M9 |
| **1941** Oxford (UK) | **CURE** | "Cure. A drug that finds the germ and leaves you." | a police officer with an infection, a drug better within a day, then it runs out | 5 more patients; the supply, not the idea, is the limit | Britain ≈ 61 (61.3) | M6, M13, M9 |
| **1948** a hospital ward in Britain | **PROOF** | "Proof. Don't believe it. Test it, fairly." | TB patients; the drug is scarce, so a draw decides who gets it | two groups, a hidden allocation, deaths counted | Britain ≈ 68 (68.4) | M7, M9 |
| **Today** Merca, Somalia (smallpox's last natural case) | **PREVENTION** | "Prevention. Stop the disease before it starts." | a child vaccinated; smallpox gone since 1980 | the only human disease eradicated so far | 73.3 world (2024) | M8, M9 |
| **2100** PREDICTION | **AN ARMS RACE?** | "If resistance wins, the cure stops working." | scenario: 1.91 m deaths a year attributable to resistance by 2050 | Lancet GRAM; UN projection ≈ 82 | `PREDICTION · a scenario, not a fact` | M10, M9 |

Countries: France, USA, Austria, UK ×2, Somalia. (Italy is the camp's location.) (UK repeats; swap 1941 or 1948 for another country if David prefers.)

## 2. Cold open (~28 s)
> Last time, I left you with a question: how did we find out what really heals us? In seventeen ninety nine, George
> Washington had a sore throat. His doctors drained, by some estimates, around two fifths of his blood. They were
> experts. They meant to help. [beat] So how did we ever find out what really heals us? And are we still wrong about something?

Frame 0: a candle, a basin, a lancet. Don't show any "evidence", "trial", "count" or "73" before its word.

## 3. Beat sheet (five beats per era)
Rough budget ~10:30 (the length tool governs): hook ~28 s, sting 7.5 s, welcome+guess ~21 s, promise ~18 s, six eras ~60-68 s each,
answer ~65 s, 2100 ~50 s, close ~6 s, outro ritual ~50 s with the No. 07 teaser, end screen 15 s.

## 4. Narration and length
Full draft: `work/narration-draft.md`. **1,697 spoken words → master ≈ 10:40 (10:21-10:59)** by `tools/dyk/length_estimate.py` (0.377 s/word; Ep 05 ran 10:27 on 1,664 words). Humanizer checks done: no AI-tell words or frames, no digits, no em-dashes, contractions throughout, one "how long do you live" and one plain "what is medicine" sentence per era, hedges kept ("by some estimates", "by his own account", "reportedly", "by one account", "might", "could").

Scene ids: `me01-02` hook · `me00` welcome + guess · `me03` promise · `me04` 1537 · `me05` 1799 · `me06` 1847 · `me07` 1941 · `me08` 1948 · `me09` today · `me10` answer · `me11` 2100 · `me12` close · `me13` outro · `me13b` next (own chunk) · `me13c` sign-off · `me14` end screen.

Judgement calls made while writing (change any of them):
1. **Year 1537, not 1500:** Paré's story is 1537 (Britannica; others say 1536). The chip row still reads the 1500s.
2. **Today = Merca, Somalia:** it carries the smallpox story. Prevention in general is one sentence.
3. **No. 07 teaser = "light"** (Ep 05's candidate B, fact F44) as a placeholder in its own chunk `me13b-next`; swapping re-voices only that chunk.
4. **2100:** only UN (81.7) and Lancet GRAM antibiotic-resistance figures; nothing on AI diagnostics (no named projection found).
5. **Comment of the Week:** fallback line, as in Nos. 03-05 (needs real Ep 05 comments, which do not exist yet).
6. **Guess = trial deaths** (4 of 55 vs 14 of 52); the answer says "within six months".

## 5. Still open before voicing
- The BMJ 1948 PDF has no text layer; the counts rest on Senn's book plus Armitage's statistics. A glance at the BMJ table is still worth it.
- M12 confirmed 2026-10-17 (98.4 vs 36.2 deaths per 1,000 births, 1840-46; fivefold in 1846); me06 wording tightened.
- Pick the No. 07 subject (item 3 above).
- ElevenLabs (live, 2026-10-17): 26,061 credits left of 363,000, resets 2026-11-06, no overage. Estimate and batching plan in `work/HANDOFF.md`; nothing is voiced until David approves the cost. The ro/fr/es/zh dubs of this episode will not fit before the reset.

## 6. Next steps
`work/narration/script.json` built from the draft (done, 17 scenes / 58 chunks / 9,497 characters) → quota check (done) → David approves the cost → voice → Whisper round-trip → pre-flight → BEATMAP → shots (prefix `Me`).
