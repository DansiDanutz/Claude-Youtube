# DYK No. 05 "Food": Romanian translation notes (pilot)

Source: `work/narration/script.json` (English, voiced). Target: `ro/script.ro.json`, built by `ro/make_script_ro.py`, where all the Romanian text lives in one `TEXT` table. Same 17 scene ids and the same chunk count per scene. `floor`, `payoff` and every `pauses` beat length are unchanged; each pause is re-anchored on the Romanian word that ends the same beat (`PAUSE_ANCHORS`).

**For David (native check):** read `script.ro.json` alongside `narration-ro-preview.mp3`. The listen items are at the end of this file.

## Choices

- **Register.** Brian talks to one person with "tu", in colloquial but correct Romanian: "Uite ce ai în farfurie", "Știi regula", "dă-i like". Contractions are used where natural ("n-a", "ce-ai", "ne-a"), and each sentence ends on its surprising word where Romanian allows it.
- **Hedges kept one to one.** "about" became *cam* / *vreo* / *în jur de* / *aproximativ*. "nearly / almost" became *aproape*. "could expect" became *putea spera la*, "can expect" *poate spera la*, and "could / might" *ar putea*. "historians estimate" became *istoricii estimează*, "by one widely quoted estimate" *după o estimare des citată*, "by some estimates" *după unele estimări*, "argued" *a susținut*, and "Many historians disagree" *Mulți istorici nu sunt de acord*. "Not a fact." became *Nu un fapt.* and the 2100 lines stay conditional (*ar putea*).
- **Numbers** are written out the way Brian reads them, and every value matches the English:
  - years: *o mie cinci sute* (1500), *o mie șapte sute patruzeci și șapte* (1747), *o mie șapte sute nouăzeci și cinci* (1795), *o mie opt sute* (1800), *o mie opt sute optzeci și patru* (1884), *o mie nouă sute cincisprezece* (1915), *o mie nouă sute șaizeci și șase* (1966), *două mii o sută* (2100), *o mie șapte sute nouăzeci și nouă* (1799)
  - counts: *o sută șaizeci și nouă* (169), *optsprezece mii de tone* (18,000 t), *șaptesprezece milioane de tone* (17 Mt), *cincisprezece milioane* (15 M), *o sută de mii* (100,000)
  - fractions and shares: *șaptezeci până la optzeci la sută* (70–80 %), *o cincime* (a fifth), *două cincimi* (two fifths)
  - Wake-up years read "în anul …" because "în o mie" is a hiatus.
- **Fact map (RESEARCH.md).** Each line is a translation of its English line, so the F-refs are the English ones:
  - hook/question: F1, F2
  - guess: F3, F4
  - 1500: F5–F8
  - 1747: F9–F13
  - 1884: F14–F19
  - 1915: F20–F24
  - 1966: F25–F30
  - today: F31–F35
  - reveal: F36–F38, F2, F3, F4
  - 2100: F39–F41
  - teaser: F43
  - No fact, name or qualification was added or dropped.
- **Units stay imperial** where the source is: *o livră de pesmet tare și un galon de bere* (a pound of hard biscuit, a gallon of beer), F9. *Cincisprezece centimetri* is unchanged.
- **Brand.** The channel name stays English: "Did You Know That". The site is written for the voice as **"Dexti punct laiv"** so the Romanian model says "Dexty dot live" the English way; on screen it is still Dexty.live. The "Did you know that…" card line is spoken as *Știai că…*.
- **Sign-off**: *Întreabă... Minunează-te. Repetă.* This keeps the three words, three one-word chunks and the same two pause beats (0.33 s and 0.36 s). "Minunează-te..." with an ellipsis dragged to 2–2.9 s with a tail artefact in 4 takes, so the middle beat ends on a full stop. The text and the timing are otherwise the same.
- **Ladder** (fd10 c6) reuses the exact era words: *combustibil → leac → ceva de măsurat → ceva ce reparăm → destulă, în sfârșit → prea multă*. "Medicine" in 1747 is *Un leac* because it echoes *leacul* in that era's DYK line.
- **Small rewordings for speech**, same meaning:
  - "So did food give us our longer lives?" became *Deci mâncarea ne-a lungit viața?*
  - "sailors start falling apart" became *marinarii încep să se destrame*
  - "Soft drinks. Packaged snacks." became *Sucuri. Gustări ambalate.*
  - "Grown by the tonne" became *Produsă la tonă*
  - "the danger has flipped" became *pericolul s-a inversat*
  - "Its climate panel" became *Grupul lor de experți pentru climă* (the IPCC)

## Ambiguous, for David to decide

1. **Advent → *Adventul*.** Flanders in 1500 was Catholic, so this is the accurate term. *Postul Crăciunului* is what most Romanian (Orthodox) listeners know, but that fast is longer, so it is slightly less accurate.
2. **Wonder → *Minunează-te*.** Alternatives are *Uimește-te* or *Fii curios* (two words, which would break the three-word rule).
3. **"oatmeal" → *făină de ovăz*** (ground oats, as in the 1747 ration). *fulgi de ovăz* would be anachronistic.
4. **"grits" → *terci de porumb***. *mămăligă moale* would sound homely but less exact.
5. **"life tables" → *tabele de mortalitate*** (the demographic term). *tabele de speranță de viață* is plainer.
6. **"the subject you ask for most" → *pe care îl cereți*** (plural, addressing the audience). The rest of the outro uses "tu".
7. **"nineteen forties" → *anii o mie nouă sute patruzeci*.** This is exact but long. *anii patruzeci* is natural and unambiguous in context.
8. **Names read by a Romanian voice** (listen): HMS (letters read as Romanian), Salisbury, Shinagawa, Tsukuba, Ryujo, Takaki Kanehiro, Goldberger, Lal Bahadur Shastri, Norman Borlaug, Thomas McKeown, São Paulo, *EAT Lancet*, George Washington, "Did You Know That", "Dexti punct laiv" and "like".

## Word-count and time ratio, Romanian / English, per scene

Time is the paused take's length (the Romanian mix vs the English `vo.json`).

| scene | EN words | RO words | RO/EN words | EN s | RO s | RO/EN time |
|---|---|---|---|---|---|---|
| fd01-hook | 37 | 45 | 1.22 | 13.0 | 15.9 | 1.23 |
| fd02-question | 40 | 33 | 0.82 | 11.6 | 12.0 | 1.04 |
| fd00-welcome | 50 | 60 | 1.20 | 18.5 | 23.3 | 1.26 |
| fd03-promise | 50 | 51 | 1.02 | 15.7 | 15.6 | 0.99 |
| fd04-1500 | 166 | 175 | 1.05 | 59.6 | 71.0 | 1.19 |
| fd05-1747 | 159 | 190 | 1.19 | 59.9 | 76.7 | 1.28 |
| fd06-1884 | 173 | 183 | 1.06 | 61.8 | 76.4 | 1.24 |
| fd07-1915 | 187 | 211 | 1.13 | 71.2 | 86.9 | 1.22 |
| fd08-1966 | 166 | 188 | 1.13 | 60.9 | 70.1 | 1.15 |
| fd09-today | 147 | 173 | 1.18 | 55.2 | 63.7 | 1.15 |
| fd10-reveal | 183 | 210 | 1.15 | 70.7 | 90.0 | 1.27 |
| fd11-2100 | 144 | 177 | 1.23 | 48.8 | 64.4 | 1.32 |
| fd12-close | 14 | 13 | 0.93 | 4.4 | 5.3 | 1.21 |
| fd13-outro | 103 | 103 | 1.00 | 34.0 | 41.6 | 1.22 |
| fd13b-next | 30 | 37 | 1.23 | 11.1 | 12.1 | 1.09 |
| fd13c-signoff | 3 | 3 | 1.00 | 3.2 | 4.1 | 1.26 |
| fd14-endscreen | 16 | 15 | 0.94 | 5.1 | 5.8 | 1.13 |
| **total** | 1668 | 1867 | **1.12** | 604.8 | 734.8 | **1.22** |

The programme timeline grows from 10:50 (English) to 12:59 (Romanian, `timeline.ro.json`).

## Pace targets (how the English gates were scaled)

`pace_ro = pace_en × (syllables/word EN ÷ syllables/word RO) × 1.17`.

- **1.17 is measured, not assumed.** It is Brian's Romanian articulation rate over his English one on fd01 at speed 1.0 (5.93 vs 5.05 syllables per second). Without it, the first take failed four times at 2.9–3.2 w/s against a 2.53 target.
- **Retuned chunks.** The per-chunk English syllable estimate is noisy on number-heavy lines. 12 chunks were retuned to their measured natural Romanian pace (`PACE_OVERRIDES`, `SPEED_OVERRIDES` in `make_script_ro.py`, each with its reason).
- **Syllable counter.** Syllables come from `ro_text.syllables_ro`. The shared English counter strips ă/â/î and drops the pronounced final -e.
