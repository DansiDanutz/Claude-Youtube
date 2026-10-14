# Did You Know That? No. 04 · "Money" · STORY (paper stage, for David's approval)

Status: **paper only**. No voice, no renders, no paid API, no git, nothing committed. Facts: `RESEARCH.md` (F1–F28).
Template: No. 03 *School* (`STORY.md`, `script.json`, `packaging/description.txt`), with No. 02 v2's spine and rituals.
Proposed scene ids `mo00…mo14`, shot prefix **`Mo`**. A grep of `remotion/src` found only `MorseStrip` / `MotionChar`
starting with "Mo", so shot names must be `Mo1500`, `MoHook`, … (check for clashes again at production, or pick `Mn`, §12).

---

## 0. Logline
You were promised an answer. No. 03 ended by asking whether school ever taught you what money actually is. Over seven
mornings, from an Aztec market in 1500 to a phone in Nairobi today and on to 2100, you hold money as cacao beans, a
twenty-kilo copper plate, a paper note, a gold-backed promise, a TV speech and a text message. Then you find out what it
is: **a promise.** A special IOU that works only because everyone trusts everyone else to accept it. Most of it was typed
into existence when somebody took out a loan.

## 0.1 The two mysteries (planted in the first 40 s, both paid in the answer)
| | Question (on screen at the hook / welcome) | Answer (in `mo10-reveal`) | Facts |
|---|---|---|---|
| **Hook question** | "Did you know that most money today isn't paper, or metal, or anything you could ever hold? So what is it, actually?" | **A promise.** "Money today is a type of IOU. A special one, because everyone trusts that other people will accept it." (Bank of England). Most of it is created by ordinary banks when they lend: "Within limits, a loan creates new money." | F2, F1 |
| **The guess** (the channel's rule) | "In Britain, out of every hundred pounds people have, how many exist as real notes and coins?" | **About three.** ~97 of every 100 pounds of broad money are bank deposits (Bank of England, 2014). | F1 (F3 re-check) |

Why this hook works: everyone has money in their pocket, and almost nobody knows that most of it isn't "there". It
flips the viewer's prior (see RESEARCH "Viewer prior vs. claim"), it rests on a central bank's own published words rather than
an internet claim, and the guess gives a number people will repeat (97 / 3). The **promise** thread runs the whole episode:
planted in 1661 ("Remember that word, promise"), printed on a note in 1821, stripped to "trust" in 1971, named in the
reveal and carried into 2100.

**Continuity:** No. 03's published teaser was "Next time: money… But did school ever teach you what money actually is?"
The cold open picks up that exact question in its first line, and the reveal answers it.

---

## 1. The spine: how humans saw money, rung by rung
**something useful → a promise on paper → a belief → as good as gold → trust alone → numbers on a screen → a promise in code? (2100)**

| Era | `HOW WE SAW IT` chip | The plain sentence (said by Brian, a child could repeat it) | Everyday behaviour that proves it | Fact · source |
|---|---|---|---|---|
| **1500** Tenochtitlan (Mexico) | **SOMETHING USEFUL** | "Something useful. Something you could even drink." | small buys in cacao beans (avocado = 1 bean, turkey hen = 100), big ones in cotton cloaks; counterfeit beans | F4 Cornell / *quachtli* · F5 Tlaxcala list 1545 · F6 Florentine Codex · F7 Humphrey (barter myth) |
| **1661** Stockholm (Sweden) | **A PROMISE ON PAPER** | "A promise. Written on paper." | carting 19.7 kg copper plates → swapping them for Stockholms Banco notes, Europe's first real banknotes; the bank over-issues and fails | F8 · F9 · F10 Riksbank |
| **1720** Paris (France) | **A BELIEF** | "It's worth whatever everyone believes it's worth. Until they don't." | owning > 500 livres of gold or silver made illegal; crowds on rue Quincampoix; shares up ~40×, then the crash | F11 · F13 · F14 · F15 Velde / NY Fed · F12 Law |
| **1821** London (UK) | **AS GOOD AS GOLD** | "As good as gold. A promise you can swap for metal." | "I promise to pay the bearer on demand": £5 note = five sovereigns; gold payments back after 24 years | F16 BoE · F17 · F18 · F19 |
| **1971** Pittsburgh suburb (USA) | **JUST TRUST** | "A promise backed by trust. Trust in the people who run it." | gold coins/bars illegal for most Americans since 1933; $35 an ounce for governments; Nixon's Sunday-evening TV address | F20 · F21 Fed History |
| **Today** Nairobi (Kenya) | **NUMBERS ON A SCREEN** | "Numbers on a screen. You almost never touch it." | ~8 in 10 Kenyan adults use mobile money (2009: < 3 in 10); euro-area cash 79 % → 52 % of shop payments | F22 · F23 FinAccess · F24 ECB |
| **2100** PREDICTION | **A PROMISE IN CODE?** | "In twenty one hundred, it might be written in code." | scenario only: cash rare, money as code, still a promise | F25 BIS · F26 ECB · F27 BIS AER, labelled `PREDICTION · a scenario, not a fact` |

The arc climbs in **abstraction**, and each step moves money further from your hands: a thing you can eat → a paper claim on
a thing → a shared belief → a belief chained to metal → a belief chained to people → digits → code. The viewer feels the
floor drop away rung by rung, which is the reveal's point: it was a promise all along. Global spread: Mexico,
Sweden, France, UK, USA, Kenya, one era per country (No. 03 had two US settings; this has one).

On screen, each chip appears **on the word** Brian says it (never before) and stacks into the arc ladder at the left
edge: SOMETHING USEFUL → A PROMISE ON PAPER → A BELIEF → AS GOOD AS GOLD → JUST TRUST → NUMBERS ON A SCREEN → ? (2100).
"JUST TRUST" is the chip; Brian says "A promise backed by trust", and the chip lands on "trust" (nth = 1 inside mo08's ladder line).

---

## 2. Cold open (~29 s): a concrete paradox + the No. 03 nod
> Last time, I left you with a question. Did school ever teach you what money actually is? Take a note out of your
> wallet. Any note. It's paper, or plastic, and a bit of ink. And still, you'd trade hours of your life for a few of them.
> And here's the strange part. Did you know that most money today isn't paper, or metal, or anything you could ever
> hold? So what is it, actually?

- **Frame 0:** a banknote filling the frame, slowly turning, with the episode-03 outro line as a small quote card ("Did
  school ever teach you what money actually is?", No. 03 end-screen style) on "Last time".
- "paper, or plastic, and a bit of ink" = the note peels into its layers. "hours of your life" = a clock face sweeps
  around the note. "anything you could ever hold" = the note dissolves into falling digits that fade out. The hook question
  ends on an empty open hand and a "?".
- **Don't show** "IOU", "promise", "97 %", "loan" or a bank ledger anywhere before `mo10` (never spoil the word). The
  1661 chip "A PROMISE ON PAPER" is the first time the word appears, and the reveal's job is to show it was the answer.
- No clock time is spoken or shown (unlike No. 03's 7:45), so nothing in the description auto-links (§8).

Then `DytSting` (unchanged, 4.5 s plus title card "MONEY") → `mo00-welcome` with the guess → `mo03-promise`.

---

## 3. The beat sheet: five beats per era, with rough timings
Timings use the No. 03 calibration (§10: 2.835 spoken words/s, plus lead-in/tail and question beats per shot, the
7.5 s sting and the 15 s end screen). They come to **~10:28 master** (range 10:15–10:45).

| Start | Scene | Length | Wake up (sensory) | Did you know that… | How people lived (Day Clock / Week Strip) | What changed | Cliffhanger → NEXT |
|---|---|---|---|---|---|---|---|
| 0:00 | mo01–02 hook + question | ~29 s | a note in your hand | most money isn't anything you could hold (hook question) | — | — | → sting |
| 0:29 | sting + title | 7.5 s | | | | | |
| 0:36 | mo00 welcome + guess | ~19 s | "You know the rule." | the guess: notes & coins out of £100? | — | — | "stay to the end" |
| 0:55 | mo03 promise | ~20 s | "seven mornings… with money in your hand" | — | — | "what money really is" | |
| 1:16 | **mo04 · 1500 Tenochtitlan** | ~61 s | canoes on canals; chilli and wood smoke | money grows on trees: cacao (F4) | **Day Clock** of a market morning: avocado = 1 bean, turkey hen = 100 (F5) · cloaks for big deals · the faker's bean (F6) | **Myth beat:** barter (F7) | "beans are bulky, and they rot… one country's money has the opposite problem. It's so heavy, you need a cart." → 1661 |
| 2:17 | **mo05 · 1661 Stockholm** | ~65 s | frozen harbour; a sledge of copper | Sweden's biggest coin weighed almost 20 kg (F8) | **Week Strip** of a merchant: cart the plates → leave them at the bank → carry paper (F9) | over-issue, failure, Palmstruch sentenced to death (F10) · **debt planted:** "Remember that word, promise." | "Paper only works while people believe in it… one man will push that belief further than anyone ever had." → 1720 |
| 3:22 | **mo06 · 1720 Paris** | ~67 s | horses; everyone talking about paper | owning > 500 livres in gold or silver made illegal (F11) | **Day Clock** of rue Quincampoix: trading day and night, ~40× (F13), the hunchback desk ("the story goes", F14) | John Law, the duel (F12), the crash, Law escapes (F15) | "people want money they don't just have to believe in. Something they can bite. And in London, they get it." → 1821 |
| 4:29 | **mo07 · 1821 London** | ~56 s | coal smoke, wet cobbles, a queue at the Bank | notes still say "I promise to pay the bearer on demand" (F16) | £5 → five sovereigns (F16) · 24 years of paper and forgers' gallows (F17, F18) | gold payments resume; the world follows onto gold (F19) | "Anchors feel safe. But in nineteen seventy one, one television speech cuts the rope." → 1971 |
| 5:25 | **mo08 · 1971 Pittsburgh suburb** | ~59 s | Sunday in August, family in front of the TV | gold coins or bars illegal for most Americans since 1933 (F20) | **Week Strip:** paycheck, bank, dollars; gold only for governments at $35 (F21) | Nixon, 15 Aug 1971 (F21) | "a generation later, that trust takes a strange new shape… In Kenya, it moves into a text message." → today |
| 6:24 | **mo09 · Today Nairobi** | ~56 s | matatus honk; your phone buzzes | ~8 in 10 Kenyan adults use mobile money; 2009 under 3 in 10 (F23) | **Day Clock:** school fees and taxi rides by text (F22) · Europe's cash slide 79 % → 52 % (F24) | (the phone is the change) | "So here's the question you came for. If it isn't paper, and it isn't gold, what is money, actually?" → answer |
| 7:19 | **mo10 · the answer** | ~54 s | | a promise / IOU (F2) · loans create deposits (F1) · guess: ~97 / 3 (F1) | ladder walk-back (§4b) | | "So what's the next rung?" |
| 8:14 | **mo11 · 2100** | ~60 s | "That morning hasn't happened yet." | (evidence, not a DYK card) | BIS → ECB → BIS warning → scenario (§5) | | → close |
| 9:13 | mo12 close | ~10 s | | | | | |
| 9:23 | mo13 outro | ~50 s | ritual + **swappable No. 05 teaser** (§7) | | | | |
| 10:13 | mo14 end screen | 15 s hold | **Comment of the Week** card (real comment or fallback, §7.2) · WATCH NEXT: No. 05 placeholder · subscribe ring | | | | |

Re-hooks on the clock (no block > 90 s without a new question): 0:28 hook Q · 0:45 guess · 1:40 "money grows on
trees?" · every era repeats "So what is money now?" + a cliffhanger · 2:00 barter myth · 3:30 the gold ban · 4:00 the
hunchback · 6:10 "cuts the rope / text message" · 7:15 the hook question returns · 7:55 "How close were you?" · 8:14 "next
rung?" · 9:13 close question.

---

## 4. Draft narration (read-aloud; humanizer pass applied)
Chunk splits follow No. 03: sensory 3.0 · DYK 2.9 (floor 0.85) · behaviour 3.0 · what changed 3.0 · cliffhanger 2.9. No
chunk is over ~70 words. Suggested `pauses` beats are marked `[beat]`. **1,659 words in total** (No. 03: 1,729).

**mo01–02 · hook (3.2 / 3.1)**
Last time, I left you with a question. Did school ever teach you what money actually is? Take a note out of your wallet. Any note. It's paper, or plastic, and a bit of ink. And still, you'd trade hours of your life for a few of them.
And here's the strange part. Did you know that most money today isn't paper, or metal, or anything you could ever hold? So what is it, actually?

**mo00 · welcome + guess (3.15, floor 0.95)**
Welcome back to Did You Know That. Episode four. You know the rule. Here's your guess. In Britain, out of every hundred pounds people have, how many exist as real notes and coins? [beat] Guess in the comments, right now. Then stay to the end, and check your guess.

**mo03 · promise (3.1)**
Seven mornings, from fifteen hundred to twenty one hundred. In each one, you wake up somewhere new, with money in your hand. Or on your phone. You start with money you could drink. You end with money that might be nothing but code. And at the end, you'll find out what money really is.

**mo04 · 1500**
You wake up in fifteen hundred, in Tenochtitlan, the island city of the Aztecs. Canoes bump along the canals. The market's already loud, and it smells of chilli and wood smoke.
Did you know that here, money grows on trees? [beat] Cacao beans. The same beans that make chocolate.
A price list from a few decades later says it plainly. One ripe avocado, one bean. A good turkey hen, a hundred. Bigger deals get paid in standard cotton cloaks. And a Spanish friar wrote about sellers who faked cacao beans. Forgery. With chocolate.
So what is money to you? [beat] Something useful. Something you could even drink.
You might have heard that money was invented because swapping goats for grain got awkward. Anthropologists say they've never found a whole society that ran on barter alone. People have always found something to count with.
But beans are bulky, and they rot. Across the ocean, one country's money has the opposite problem. It's so heavy, you need a cart.

**mo05 · 1661**
You wake up in sixteen sixty one, in Stockholm. The harbour's frozen, and a sledge scrapes past your window, loaded with copper.
Did you know that Sweden's biggest coin weighed almost twenty kilos? It's a copper plate. You don't put it in your pocket. You put it on a cart.
So a banker called Johan Palmstruch has an idea. Leave your copper at his bank, and take a sheet of paper instead. It says your copper is waiting for you. These are the first real banknotes in Europe.
So what is money now? [beat] A promise. Written on paper. Remember that word, promise. It comes back at the end.
People love the notes. So the bank prints more, and lends more, than it has copper to pay back. When people come for their copper, it isn't there. The bank fails. Palmstruch is sentenced to death. He's spared, and dies a few years later.
Paper only works while people believe in it. And in the next century, one man will push that belief further than anyone ever had.

**mo06 · 1720**
You wake up in seventeen twenty, in Paris. The street smells of horses, and everyone's talking about paper.
Did you know that this year, France made it illegal to own more than five hundred livres in gold or silver? [beat] The government wanted you to trust paper. By law.
The man behind it is John Law. A Scottish gambler. Like Palmstruch, he was once sentenced to death, for killing a man in a duel. Now he runs France's money.
On the rue Quincampoix, the street's packed day and night. People are buying shares in Law's Mississippi Company. In about a year and a half, the price has gone up about forty times. The story goes that a hunchback rents out his back, as a writing desk.
So what is money now? [beat] A belief. It's worth whatever everyone believes it's worth. Until they don't.
By December, the shares have crashed, the notes are losing value, and Law escapes France.
For the next hundred years, people want money they don't just have to believe in. Something they can bite. And in London, they get it.

**mo07 · 1821**
You wake up in eighteen twenty one, in London. Coal smoke, wet cobbles, and a queue outside the Bank of England.
Did you know that Bank of England notes still say, I promise to pay the bearer on demand? Back then, that promise meant gold. A five pound note could be swapped for five gold coins. Sovereigns.
For twenty four years, through the wars with France, the Bank had stopped paying out gold. Paper took over. So did forgers, and many of them were hanged. Now the Bank is paying gold again. Paper you can turn into metal, any day you like.
So what is money now? [beat] As good as gold. A promise you can swap for metal.
Over the next century, much of the world follows Britain onto gold. Gold becomes the anchor. And anchors feel safe. [beat] But in nineteen seventy one, one television speech cuts the rope.

**mo08 · 1971**
You wake up in nineteen seventy one, in a suburb of Pittsburgh. It's a Sunday in August, and after dinner, the whole family's in front of the TV.
Did you know that in nineteen seventy one, it was illegal for most Americans to own gold coins or bars? It had been since nineteen thirty three.
Gold was for governments. Since nineteen forty four, they could swap dollars for American gold, at thirty five dollars an ounce. The dollar was tied to gold, and most other money was tied to the dollar.
That evening, President Nixon comes on. From now on, foreign governments can't swap their dollars for gold. Within a few years, the whole system's gone.
So what is money now? [beat] A promise backed by trust. Trust in the people who run it.
And a generation later, that trust takes a strange new shape. Money doesn't need paper at all. In Kenya, it moves into a text message.

**mo09 · Today**
You wake up today, in Nairobi. Matatus honk on the road outside, and your phone buzzes. Your sister just sent you money, from a village far upcountry. It took seconds.
Did you know that about eight in ten adults in Kenya now use mobile money? In two thousand and nine, it was under three in ten.
M-Pesa launched here in two thousand and seven. You hand cash to a shopkeeper, and it turns into numbers on your phone. School fees and taxi rides get paid with a text.
And it isn't just Kenya. In Europe, cash paid for about eight in ten shop purchases in twenty sixteen. By twenty twenty four, it was about half.
So what is money to you? [beat] Numbers on a screen. You almost never touch it.
So here's the question you came for. If it isn't paper, and it isn't gold, what is money, actually?

(The answer, 2100, close and outro are in §4b, §5 and §7.)

## 4b. The answer walks the ladder back (then → now → next) · `mo10-reveal`, chunks marked `"payoff": true`
1. **The answer (F2):** "Here's the answer. The Bank of England puts it plainly. Money today is a type of IOU. A special
   one, because everyone trusts that other people will accept it."
   On screen: the word **PROMISE** lands on "IOU" (orange→magenta gradient), with `Bank of England, 2014` small underneath.
2. **Where it comes from (F1):** "And most of it is made by ordinary banks. When a bank gives you a loan, it doesn't hand you
   someone else's savings. It types a new deposit into your account. Within limits, a loan creates new money."
   On screen: a loan form → a deposit line appears in an account → `+ new money` on "creates new money". "Within limits" stays
   on screen as a small caption (BoE's own qualification).
3. **The guess (F1):** "And your guess? When the Bank of England checked, about ninety seven out of every hundred pounds were
   bank deposits. Only about three were notes and coins. How close were you? [0.45 s beat]"
   On screen: 100 coin icons, 97 dissolve into digits on "ninety seven", 3 stay solid on "three" (`BoE, 2014`).
4. **The ladder:** "Now walk down the ladder with me. In fifteen hundred, money was something useful. Then, a promise on paper.
   Then, a belief. Then, as good as gold. Then, trust, and nothing else. Today, numbers on a screen." Each rung lights on its word.
5. **Payoff (pays the 1661 debt):** "Remember that word from Stockholm? Promise. It was there all along."
6. **Next:** `mo11` opens "So what's the next rung?", so 2100 grows from the top of the ladder.

---

## 5. 2100: evidence → scenario (labelled `PREDICTION · a scenario, not a fact` throughout)
**The debt is paid twice:** "promise" (1661 → reveal → "it would still be a promise") and the cacao callback (1500
"money grows on trees" → "written in code").

| Step | Narration (draft) | Source / hedge |
|---|---|---|
| Open | "So what's the next rung? Twenty one hundred. That morning hasn't happened yet. But we can follow the evidence." | format line |
| Evidence 1: central banks are moving | "Cash is shrinking, and central banks have noticed. In a survey published in twenty twenty five, more than nine in ten of the central banks asked were exploring a digital currency of their own." | F24 (cash) · F25 BIS Paper 159: 85 of 93 = 91 %. "Exploring" ≠ issuing. On screen: `85 of 93 central banks · BIS, 2025` |
| Evidence 2: a real timetable | "In Europe, the central bank is getting ready for a possible digital euro. The first could come as early as twenty twenty nine, if lawmakers agree." | F26 ECB 30 Oct 2025. **RE-CHECK** legislative status; the fallback wording is in RESEARCH |
| Evidence 3: the anchor | "And the Bank for International Settlements, the central banks' own bank, warned that stablecoins, crypto tokens pegged to a currency, fail key tests of good money. It wants the central bank's promise to stay the anchor." | F27 BIS AER 2025 ch. III (singleness, elasticity, integrity). Paraphrase, attributed |
| Scenario | "So here's one scenario. Not a fact. By twenty one hundred, the note in your wallet could be a museum piece. Money could be code. But it would still be a promise." | "could" ×2. No share of cash, no date, no number past the cited sources |
| Callback | "In fifteen hundred, money grew on trees. In twenty one hundred, it might be written in code." | "might". A reflective line, not a forecast |

**What I did NOT claim:** no 2100 figure of any kind (no published 2100 money forecast exists; BIS/ECB/IMF horizons are
years, not decades), no "cash will disappear", no "crypto will replace money", no "CBDCs are coming everywhere". IMF CBDC
material wasn't needed; BIS + ECB carry it.

Visual idea: the ladder's top rung is a cacao pod on the left (1500) and a glowing ledger block on the right (2100), with
the word PROMISE spanning both. The BIS figure builds 93 dots, 85 lit. The digital-euro line shows a calendar page
"2029?" with the question mark kept. The stablecoin warning shows three test boxes ticking red.

---

## 6. Close (inside the viewer) · `mo12-close`
"You spend so much of your life earning it. So tell me. Who would you trust to keep that promise, in twenty one hundred?"

## 7. Outro ritual, the swappable No. 05 teaser, Comment of the Week · `mo13-outro`, `mo14-endscreen`
> This was Did You Know That, episode four. Money. Now it's your turn. Which century's money would you have trusted
> most? Tell me in the comments. At the end of every episode, I will read the best comment, right here, on this screen.
> And the subject you ask for most becomes a future episode. On our website, Dex-tee dot live, you can watch every
> episode, collect the facts, and play the guessing game. If this changed how you see the money in your pocket, like it.
> Share it with the friend who always pays you back. And subscribe, so the next mystery finds you.
> **Next time: [EP05 TEASER, voiced as its own chunk, see §7.1].**
> Ask... Wonder... Repeat.

- Ritual wording kept verbatim from No. 02/03 where the format fixes it. Screen text **Dexty.live**; TTS "Dex-tee dot live".
- Sign-off: three tiny chunks or `pauses` ≥ 0.8 s (voice pre-flight sign-off rule).

### 7.1 No. 05 teaser + WATCH NEXT (swappable placeholder)
- **Make it its own scene chunk** `mo13b-next` (one line, ~20–25 words, pace 2.9). Changing the subject then re-voices only
  that chunk (`ONLY=mo13b-next`), and the outro and sign-off stay locked. Template:
  `Next time: <subject>. <one sourced line from No. 05 RESEARCH>. <open-loop question that claims nothing>?`
- **WATCH NEXT slot:** teaser art `No. 05 · <SUBJECT>` from a single `<Prefix>NextCard` prop (`subject`, `icon`), YouTube
  video element "Best for viewer" until No. 05 exists. No release date anywhere.
- **Description line** mirrors the same sentence (§8), so swapping the subject is one string in three places.
- Candidates (§12 Q6). The draft carries **food** as the placeholder only so the timing is real. Its sourced line still
  needs No. 05 research.

### 7.2 Comment of the Week (first real one: No. 03's pinned question)
No. 03's pinned question: **"Which century's classroom would you survive — and why?"** The rule: never fabricate.
- **Production-time step (after No. 03 has been live ≥ 7 days):** David (or the agent, read-only in YouTube Studio) picks
  the best **real, public** comment under No. 03. Record in `work/COTW.md`: the comment's URL, @handle, exact text
  (verbatim, typos kept or trimmed with "…"), the date captured, and David's OK. No paraphrase presented as a quote, no
  private data, no editing of meaning. If it's longer than ~25 words, use an excerpt with "…".
- **Card (left end-screen slot):** `COMMENT OF THE WEEK · from No. 03` · the quote · `@handle`. Built from a data file
  (`work/cotw.json`), so the voice and card change together.
- **Voice `mo14-endscreen`** (its own chunk, generated only after the comment is chosen, so it costs one short line):
  "Last time, I asked which century's classroom you'd survive. The best answer comes from <handle, spelled for TTS>. <quote>.
  Next time, this could be your comment. Pick a mystery. And I will see you there." (~38 words with a 15-word quote → fits
  the 15 s hold. A longer quote extends the hold by the overrun, max 20 s.)
- **Fallback (no suitable comment: too few, off-topic, unsafe, or David says no):** the card shows the **pinned-question
  card** used in No. 03 (`THIS WEEK'S QUESTION · Which century's money would you have trusted most? · pinned in the
  comments`), and `mo14` reverts to No. 03's exact line ("Next time... this could be your comment. Pick a mystery. And I
  will see you there."). That line is already voiced in No. 03, so it can be reused after a word-count and voice check.
- **Most-requested subject:** if comments under No. 03 clearly ask for one subject, it can become the No. 05 teaser (§7.1)
  and the outro's "the subject you ask for most" promise is kept. Count the requests honestly in `work/COTW.md`.
- **Proposed pinned comment for No. 04 (A, recommended):** "Which century's money would you have trusted most, and why?
  The best answer gets read in the next episode." **B:** "What's the first thing you remember buying with your own money?
  The best answer gets read in the next episode." (more personal, easier to answer, but less tied to the ladder.)

---

## 8. Packaging
**Titles (≤ 60 chars, each names the core idea AND 2100):**
1. **Money from 1500 to 2100: It Was Always a Promise** (48). Recommended: it names the reveal and the span, like No. 03's "It Once Meant Free Time".
2. **What Is Money, Really? From Cacao Beans to 2100** (47). Asks the hook question and pays No. 03's teaser.
3. **Money from 1500 to 2100: From Cacao Beans to Code** (49). Names the arc's two ends.

**Thumbnail (logo palette, same system as "SCHOOL / IN 2100?"):** deep navy ground; left half neon blue/purple with a
glowing cacao pod and a copper plate; right half green/orange with a phone dissolving into code digits. White headline
**MONEY / IN 2100?**, with "2100?" in the logo's orange→magenta "?" gradient. Logo top-left, bottom-right clear for the
duration badge, 3 words. Alternative (more curiosity, weaker on the future): **MONEY IS A / PROMISE?** with "PROMISE?" in
the gradient (4 words). Render from `MoThumb.tsx` (2560×1440 → 1280×720).

**Description (planned):** paragraph 1 = hook ("Take a note out of your wallet… most money today isn't anything you could
ever hold"), paragraph 2 = 2100 (BIS survey, the digital euro, scenario labelled as a prediction), paragraph 3 = the ladder
rung by rung, then chapters from `timeline.json` (start 0:00), Comment of the Week (the No. 04 pinned question), Dexty.live,
"Next episode: <EP05 line>", sources (the F-list), AI-voice note. **No clock times in the prose:** No. 03's first line "It's
7:45" became a clickable timestamp, and YouTube links any `m:ss` pattern. Keep `m:ss` only in the CHAPTERS block. Write
years as plain numbers (fine), and avoid ratios written with a colon ("1:1").

---

## 9. Fact trace per scene (every number / date / name → F)
| Scene | Numbers · dates · names → source |
|---|---|
| mo01–02 | No. 03 teaser (continuity) · "most money today isn't… anything you could hold" (F1 characterisation, answered in mo10) |
| mo00 | "out of every hundred pounds… notes and coins" (F1, answered in mo10) |
| mo03 | 1500, 2100 (settings) · "money you could drink" (F4) · "might be nothing but code" (scenario, mo11 sources) |
| mo04 | 1500, Tenochtitlan, Aztecs (setting) · cacao money (F4) · avocado 1, turkey hen 100, "a few decades later" (F5) · cotton cloaks (F4) · Spanish friar, faked beans (F6) · barter myth, anthropologists (F7) |
| mo05 | 1661, Stockholm · ~20 kg plate (F8) · Johan Palmstruch, his bank, first real banknotes in Europe (F9) · over-issue, failure, death sentence, spared, died a few years later (F10) |
| mo06 | 1720, Paris · > 500 livres gold/silver illegal (F11) · John Law, Scottish gambler, duel, death sentence, runs France's money (F12) · rue Quincampoix, Mississippi Company, ~40× in ~1.5 years (F13) · hunchback "story goes" (F14) · December crash, Law escapes (F15) |
| mo07 | 1821, London, Bank of England · "I promise to pay the bearer on demand", £5 = five sovereigns (F16) · 24 years, wars with France (F17) · forgers hanged, "many" (F18) · much of the world onto gold (F19) |
| mo08 | 1971, Pittsburgh suburb (fictional household), Sunday in August (F21 + calendar) · gold coins/bars illegal for most since 1933 (F20) · 1944, $35 an ounce, dollar tied to gold, others to the dollar, Nixon, foreign governments, "within a few years" (F21) · "a generation later" (2007, F22) |
| mo09 | today, Nairobi · ~8 in 10 adults, 2009 under 3 in 10 (F23) · M-Pesa 2007 (F22) · Europe 8 in 10 (2016) → about half (2024) (F24) |
| mo10 | Bank of England, IOU, trust (F2) · loans create deposits, "within limits" (F1) · 97 / 3 (F1, F3) · ladder = mo04–mo09 sentences · Stockholm callback (F9) |
| mo11 | 2025 survey, > 9 in 10 central banks (F25) · digital euro, 2029, "if lawmakers agree" (F26) · BIS, stablecoins fail tests (F27) · PREDICTION label |
| mo12 | none |
| mo13 | Dexty.live · No. 05 teaser (from No. 05 research) |
| mo14 | the real comment and @handle (`work/COTW.md`), or the fallback card |

---

## 10. Length estimate (honest) and how it's calibrated
- **No. 03, measured:** `script.json` = **1,729 spoken words** → master **650.9 s** (10:51). The sum of the voiced lines in
  `durations.json` = **609.9 s**, so the real rate was **2.835 words/s of voice**, and everything else (sting 7.5 s, shot
  lead-ins/tails, question beats, end-screen hold beyond its line) cost **41.0 s**.
- **Why No. 03's estimate missed by 41 s:** it summed per-chunk *target* paces (~3.0 w/s), and Brian, with the gates
  and `pauses` beats, delivered ~5–6 % slower. This estimate uses the measured rate instead.
- **No. 04:** **1,659 words** → 1,659 ÷ 2.835 = **585 s of voice** + **41 s** overhead (same sting, same number of
  shots, same end screen) = **~626 s ≈ 10:26–10:28** (the per-scene table in §3 gives 10:28).
- **Range: 10:15–10:45.** Risks upward: more spoken years and numbers than No. 03 (each "seventeen twenty" style year costs
  syllables), the guess beat, a longer real comment in `mo14`. Risk downward: shorter sentences in the eras.
- **If David wants ≤ 10:15:** cut ~35 words: the hunchback sentence (−13), "People have always found something to count
  with." (−8), "Gold was for governments." (−4), and the Europe cash sentence moves to the description (−24, but 2100's
  "Cash is shrinking" then leans on mo09's Kenya line). Each cut removes no F-fact the story depends on.
- **Clears the 8-minute mid-roll line** comfortably.

## 11. Humanizer checklist (references/narration-humanizer.md)
1. **Read-aloud:** done on §2, §4, §4b, §5–7. Rewrites made while drafting: "Paper, or plastic, and a bit of ink" (concrete
   before abstract); "Forgery. With chocolate." (react like a human); "Something they can bite." (sensory, not "tangible
   value"); "cuts the rope" (an image instead of "ended the system"); one idea per sentence in the 1971 mechanics; "the
   central banks' own bank" instead of naming the BIS acronym; a triplet ("school fees, a taxi, bread") cut to two items.
2. **AI-tell grep** on the draft narration:
   ```
   grep -inwE "delve|tapestry|testament|realm|landscape|navigate|pivotal|crucial|vibrant|profound|intricate|seamless|robust|leverage|unlock|embark|journey|game-changer"   → no matches
   grep -inE "it's not just|in today's|little did|let's dive|buckle up|imagine a world|this shows us|in conclusion|here's the thing|—"   → no matches
   ```
   "Here's" appears five times as format/plain speech ("here's the strange part", "Here's your guess", "here's the question
   you came for", "Here's the answer", "here's one scenario"). There's no "But here's the thing". The only colon is the
   ritual "Next time:". **Reflex triplets:** the ritual "Ask... Wonder... Repeat."; "Coal smoke, wet cobbles, and a queue"
   (sensory opening, kept deliberately); the 1720 crash line ("shares… notes… Law escapes") is three *events*. Say if you
   want it split.
3. Every era has its "what is money now?" sentence ✓ · the reveal walks the ladder ✓ · 2100 is evidence → scenario, hedged ✓.
4. **Facts vs RESEARCH:** every number in §9 is said as in RESEARCH ✓. Hedges kept: "a few decades later", "a Spanish
   friar wrote", "Anthropologists say", "almost twenty kilos", "in Europe", "about forty times", "The story goes", "many",
   "much of the world", "most Americans", "foreign governments", "within a few years", "about eight in ten", "under three in
   ten", "about half", "When the Bank of England checked", "about ninety seven", "Within limits", "more than nine in ten",
   "exploring", "possible", "could", "if lawmakers agree", "might".
5. **Pace:** shorter lines than No. 03 overall. The reveal ladder and payoff are marked `payoff` (≤ 2.8 w/s, speed ≤ 1.0).

## 11b. Risks (honest)
- **Cold open is ~29 s** (format 15–25 s). If it feels long, cut "Any note." and "Last time, I left you with a question."
  → "Last time I asked: did school…" (but keep the No. 03 nod, it's the continuity payoff).
- **1720 is the longest era (~67 s).** Trim candidates: the hunchback sentence.
- **Cue collisions:** "money" is in nearly every line; also "promise" (1661 ×2, 1821 ×2, 1971, reveal ×3, 2100, close), "gold",
  "paper", "trust", "cart", "code", "bean(s)". Pass `nth` everywhere, especially the chip cue for "promise" in 1661 vs. the
  reveal's PROMISE card.
- **Drag candidates (TTS):** "Tenochtitlan" (spell "Teh-noch-TEET-lan", test), "Quincampoix" ("Kan-kam-PWAH"), "Palmstruch"
  ("PALM-strook"), "livres" ("LEE-vruh"), "M-Pesa" ("Em-PESS-ah"), "Matatus" ("ma-TAH-toos"), "Sovereigns.", "Nairobi".
- **Sensitive lines:** "many of them were hanged" (1821) and "sentenced to death" ×2. Both are historical, unsensational and
  needed for the arc. Visuals stay symbolic (Cruikshank's satirical note, not gallows imagery).
- **Re-checks before voicing:** F3 (current cash share), F19 (gold-standard page), F26 (digital-euro law). See RESEARCH.

---

## 12. Open questions for David (my recommended default in **bold**)
1. **Approve the hook + guess:** "most money today isn't… anything you could ever hold. So what is it, actually?" (answer:
   a promise / IOU, loans create deposits) plus the guess "out of every hundred pounds, how many are notes and coins?"
   (answer: about three). **Default: approve as written.**
2. **Approve the ladder:** SOMETHING USEFUL → A PROMISE ON PAPER → A BELIEF → AS GOOD AS GOLD → JUST TRUST → NUMBERS ON A
   SCREEN → A PROMISE IN CODE? Rename any rung? (e.g. "A BELIEF" → "A BET"; "JUST TRUST" → "TRUST, NOTHING ELSE").
   **Default: as written.**
3. **Eras:** Tenochtitlan / Stockholm / Paris / London / USA / Nairobi, one per country. Swap 1500 Tenochtitlan (cacao)
   for **Potosí 1545+ (silver)**? It would add a second "metal" rung and push past 1500. **Default: keep Tenochtitlan.**
4. **Myth beat:** keep the barter debunk in 1500? (It's the episode's only debunk, like No. 03's Prussia beat.) **Default: keep.**
5. **The guess's region:** UK pounds (Bank of England data). Viewers outside the UK still get the point, and the US/euro
   numbers are similar in kind but I haven't verified them. **Default: keep UK, say "In Britain".**
6. **No. 05 subject (swappable teaser + WATCH NEXT):**
   - **A. Food** (**default placeholder**): "Next time: food. In fifteen hundred, feeding the family took most of what people
     earned. So who decided you'd eat three meals a day?" (needs a source for the budget share, e.g. Allen's welfare ratios,
     before voicing.)
   - **B. Medicine:** "Next time: medicine. Five hundred years ago, a doctor might treat a fever by draining your blood. So
     how did we find out what really makes us sick?" (bloodletting is well documented; still needs No. 05 sources.)
   - **C. Light after dark:** "Next time: light. For most of history, an hour of light at night cost real money. So what
     happened when we switched the night off?" (Nordhaus's price-of-light work bridges neatly from money, but it overlaps a
     little with No. 02's Sun.)
   - (Sleep was considered and dropped: No. 01 already used segmented sleep, F18 there.)
   - Or the most-requested subject from No. 03's comments, if one clearly leads (§7.2).
7. **Comment of the Week:** OK with the production-time selection rule and the pinned-question fallback (§7.2)? Who
   picks: **you, from a shortlist of three real comments I pull (read-only)**, or me with your OK?
8. **No. 04 pinned question:** **A "Which century's money would you have trusted most, and why?"** or B "What's the first
   thing you remember buying with your own money?"
9. **Title / thumbnail:** **title 1 "Money from 1500 to 2100: It Was Always a Promise" + "MONEY / IN 2100?"**, or the
   "MONEY IS A / PROMISE?" thumbnail?
10. **Optional extras** (each ~5–8 s, pushes towards 10:40): the M-Pesa poverty study with its hedge ("one study estimated
    it lifted about two percent of Kenyan households out of extreme poverty; other researchers dispute it"), or Palmstruch's
    bank becoming the Riksbank (needs one more check). **Default: none.**
11. **Shot prefix `Mo`** (only `MorseStrip`/`MotionChar` start with "Mo" today; real shot names like `Mo1500` don't clash)
    or `Mn`? **Default: `Mo`.**
12. Next step on approval: re-check F3/F19/F26 in a browser → `work/narration/script.json` (chunks, pace, `pauses`,
    `payoff`, separate `mo13b-next` and `mo14-endscreen` chunks) → voice budget check (Creator plan, Brian only; ~1,660 words
    ≈ 9,300 characters on the first pass) → voice → pre-flight PASS → shots. All before any render.

## 13. David's decisions
2026-10-13 — David: "I approve Episode 4 story, go with your defaults".
1. Hook + guess approved as written ("In Britain", dated to the Bank of England's 2014 check).
2. Ladder approved: SOMETHING USEFUL → A PROMISE ON PAPER → A BELIEF → AS GOOD AS GOLD → JUST TRUST → NUMBERS ON A SCREEN → A PROMISE IN CODE?
3. Keep 1500 Tenochtitlan (cacao); no Potosí swap.
4. Barter-myth debunk kept.
5. Guess region: UK pounds, "In Britain".
6. No. 05 placeholder = A. Food (teaser + WATCH NEXT swappable; budget-share source needed before voicing).
7. Comment of the Week: David picks from a shortlist of three real No. 03 comments pulled read-only; pinned-question fallback if none suitable.
8. No. 04 pinned question A: "Which century's money would you have trusted most, and why?"
9. Title 1 "Money from 1500 to 2100: It Was Always a Promise" + "MONEY / IN 2100?" thumbnail (logo palette).
10. No optional extras.
11. Shot prefix `Mo`.
12. Next: browser re-check F3/F19/F26 → script.json → voice (Creator quota gate) → pre-flight PASS → shots → render (disk guard permitting).
