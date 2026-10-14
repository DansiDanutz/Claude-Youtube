# EP12 — The First Dollar · full script (draft v2 for Dan's approval)

Season Two, No. 2 · target ~11–12 min · narrator: Brian · shot prefix `W` · VO ids `dol01`–`dol26`
Spine: **NervixPay** — our own payment rail, in stablecoins, and the moment the first money has to appear.
Evidence base: TREATMENT.md table (verified 2026-10-14). ❓ = Dan must confirm or replace before TTS.
VO lines are TTS-ready (numbers spelled out). Visual notes in [brackets].

**Approval gate: Dan reads → edits → THEN `gen_voice.py` (paid). No VO before sign-off.**

---

## COLD OPEN — the zero

**dol01** [WDollar — the ep11 particle $1, frozen mid-form; bottom-bar counter fades in: REVENUE $0.00]
"Eleven episodes. Nine products live on the internet. A fleet of AI workers running day and night. And in all
that time, this company has not been paid one single dollar by anyone. That counter at the bottom has never moved."

**dol02** [particles drift; the counter holds; a faint wallet outline appears under the $]
"Tonight it can. Not because we found a customer. Because we finally finished the one thing a company
needs before any customer can pay it — a way to get paid that nobody else controls."

**dol03** [one particle breaks loose and drops into the wallet — soft chime, cut to black]
"This is the episode where the first money has to appear."

## LOGO INTRO (no VO) → STAKES

**dol04** [WStakes — stakes card over dark room; no title repeat]
"And if it doesn't, you'll watch exactly why. Same rule as always. Real numbers. Real failures. No staging."

## CH0 — WHAT CHANGED (since ep11)

**dol05** [WNewCrew — tool cards land one by one: Claude Code · Codex · Kimi · Zcode · Hermes · GrokBot; chapter whoosh]
"Before the money — what changed. In the last few months, AI moved faster than this channel could film it.
Dan's workbench today is Claude Code, Codex, Kimi, Zcode, Hermes and GrokBot. Each one does a job that used to
take a week of wiring. Together, they're the reason this company moves at all."

**dol06** [WRebuilt — OpenClaw card dims and slides out, Hermes card takes its place; then the droplet map redraws: four droplets → two, Dexter and Nano, each with its own priority label]
"And some things had to go. OpenClaw — the system this fleet was born on — was costing more time than it saved.
Hermes replaced it. The droplet agents were redesigned from scratch: fewer machines, and every one of them now
works on exactly one thing — our priorities. No busywork. No agents running just because they exist."

**dol07** [WWhy — the new crew converges on one word: SHIP]
"That rebuild is how the next thing got finished so fast. Because the most important thing this company built
since last episode isn't another product. It's the way every product gets paid."

## CH1 — THE TURN (owning the change from ep11)

**dol08** [WTurn — the ep11 line on screen, struck through in red: "Stripe is not wired yet"]
"First, a correction. Last episode I told you we'd wire up Stripe on camera. I changed my mind. Not because
Stripe is bad. Because of what it means to put somebody else's gate between your customer and your money."

**dol09** [WLandlord — a toll gate between two wallets; five gates slam one by one with labels]
"A payment processor has to approve you. It can hold your payouts for days. It takes a percentage of every
sale — around three percent, plus a fee on top. A customer can reverse a payment weeks later. And on a bad
day, it can close the account. Five gates. Every one of them belongs to someone else."

## CH2 — OUR OWN RAILS (why we built NervixPay)

**dol10** [WOwnRail — SiteFrame: nervixpay.live live; chapter whoosh]
"So the fleet built its own. This is NervixPay — live at nervix pay dot live. A checkout that takes payment
straight from the customer's wallet into the merchant's wallet. It never holds the money. It can't freeze it.
It can't move it. It only does one job: prove, on the blockchain itself, that the payment really happened."

**dol11** [WInstant — three cards: "No approval queue" · "Sell the same day" · "Nobody can switch it off"]
"And here's why that matters for a company like this one. When we build a product, we don't wait for anyone
to say yes. We make a link, and we can sell it that afternoon. No application. No underwriting. No landlord."

**dol12** [WForYou — the share panel: checkout link, QR code, embed snippet]
"And it's not only for us. Any business can use it. A website, a consultant, a shop, a service. You connect a
wallet, you name a price, you get a link, a QR code, or a snippet for your site. That's the whole setup."

## CH3 — WHY STABLECOINS

**dol13** [WStable — a flat line labelled "1 USDC = $1" vs a jagged line labelled "volatile crypto" (schematic)]
"Now — why crypto? Because people hear 'crypto' and think of a coin that doubles on Monday and halves on
Friday. That's not what we take. We take stablecoins. USDC and USDT. One coin is one dollar. Today, tomorrow,
next year. It's not a bet. It's a dollar that moves like an email."

**dol14** [WNoBank — the old path collapses: customer → card network → processor → bank → merchant, "two to three days" → one arrow: customer wallet → merchant wallet, "minutes"]
"Look at what disappears. No bank in the middle. No card network taking its cut. No chargebacks. No waiting
until Tuesday for Friday's money. It settles in minutes, on a Sunday night, across any border. That's why I
think this is the future of money — not because it's new. Because it's simpler."

**dol15** [WAgentMoney — Hermes, Dexter, Nano cards: "open a bank account" ✗ ✗ ✗ → "receive USDC" ✓ ✓ ✓]
"And for this company there's one more reason — the biggest one. Our workers are AI agents. An agent cannot
open a bank account. It has no passport, no signature, no branch to walk into. But it can hold a wallet. For
an AI company, stablecoins aren't the fancy option. They're the only money our workers can actually touch."

**dol16** [WHonestDeps — checklist: what we still depend on]
"Full honesty. 'No third party' isn't perfectly true. We still depend on the blockchain to run, and on the
companies that issue those coins. Customers pay a small network fee. And NervixPay charges merchants a flat
monthly plan — ten dollars to start. A flat fee. Never a percentage of your sale. Nobody stands between the
customer and the money."

## CH4 — HOW IT WORKS (THE RAIL lights)

**dol17** [WSetup — real UI captures in SiteFrame: sign in → connect wallet → sign once → "Ownership verified"; top-right THE RAIL appears with a pointer sign]
"Here's the rail, end to end. That panel in the corner lights one segment at a time, only when you've seen it
work. A merchant signs in and connects the wallet they already use. They sign once to prove it's theirs. No
money moves. They create a product, and they get a link. LINK lights."

**dol18** [WScan — phone: checkout, pick USDC on Polygon, exact amount + QR, confirm in wallet → SCAN lights → confirmations 1-2-3 → VERIFIED ON-CHAIN lights → dashboard row, "Paid directly to your wallet" → IN THE WALLET lights]
"The customer opens the link, picks a coin and a network, scans, and confirms in their own wallet. NervixPay
doesn't take their word for it. It reads the chain itself, finds the exact amount, and only then marks it paid.
And the money is already where it belongs — in the merchant's wallet. Four segments. Lit."

## CH5 — THE RECEIPTS

**dol19** [WReceipts — three ledger rows stamp in with block numbers; each gets a red stamp: TEST — NOT REVENUE]
"Has it ever actually worked? Yes — three times, and here are the receipts. The twenty-fourth of September:
one cent's worth of TON. The twenty-sixth: three dollars in USDC on Polygon. And the same day, a ten dollar
Starter plan, paid in USDC, certified end to end. And here's why the counter didn't move: every one of those
came from a wallet we control. That's plumbing. Not revenue."

**dol20** [WAudit — SiteFrame: the 12 October audit, verdict line highlighted; nine-row grade table]
"On the twelfth of October the fleet audited the whole thing. Nine hundred and twelve tests passing. Zero
errors in production for a week. And the verdict, in its own words: not ready for a public launch yet — ready
for a controlled beta with invited merchants, once two blockers are closed. A legal page. And a second source
to double-check the blockchain. ❓STATUS OF THE TWO BLOCKERS ON RENDER DAY."

## CH6 — THE MOMENT

**dol21** [WMoment — the season so far in one line: products ✓ · rail ✓ · audit ✓ · customer ☐ — the empty box pulses]
"So this is the moment. Eleven episodes building. A rail we own. A product that works. An audit that says
we're ready to invite the first merchants. There's exactly one box left on this list — and nobody inside this
company can tick it. The first money has to come from outside. And it has to come now."

**dol22** [WOffer — the offer card: ❓WHAT IS SOLD, ❓PRICE in USDC, ❓WHERE (link / invited beta)]
"Here's the offer. ❓THE PRODUCT, for ❓THE PRICE in USDC, paid through NervixPay, straight into the company
wallet. ❓HOW VIEWERS JOIN. The counter is live. Let's see if it moves."

**dol23a** [WLands — real dashboard row from an outside wallet; the bottom-bar counter POPS $0.00 → ❓AMOUNT; chime]
"And there it is. ❓WHO PAID — not us, not a test wallet — ❓AMOUNT in USDC, verified on the chain, sitting in
the company wallet. Eleven episodes of zero. And the first dollar this company ever earned arrived in money an
AI can hold, on rails we built ourselves."

**dol23b** [WFails — the counter holds at $0.00; the empty box flashes red]
"And — not yet. ❓WHAT HAPPENED. The rail works, and you've seen it work. What's missing isn't code. It's a
customer. That's the honest result, and it's the job of the next episode."

> Only ONE of dol23a / dol23b is voiced — the true one, after the real attempt. Do not generate both.

## HUMAN BEAT

**dol24** [WHuman — 90/10 echo from ep10 and ep11]
"The fleet wrote the rail. It tested it, audited it, and fixed what the audit found. But it couldn't decide
that this company would never rent its cash register from somebody else. That was a human choice. Like a poker
player refusing a table where the house can change the rules mid-hand. The ten percent. Again."

## HONEST CLOSE + NEXT

**dol25** [WNext — the promise card; the counter stays on screen]
"One dollar isn't a business. It's a door opening. Next episode: the open launch — and the first stranger who
finds this company through the flywheel and pays because the product was worth it. The counter stays on screen
from now on. It never resets."

## OUTRO (narrated, series pattern)

**dol26** [WOutro — Subscribe pill + link + BUILD./SHIP./REPEAT. landing word-by-word on his words]
"This was DansLab, number twelve. The First Dollar. If you want to see that counter climb — subscribe, and hit
like. You'll be here when it happens. Build. Ship. Repeat."

---

## Production notes

- 27 VO entries (26 voiced; dol23 is one of two) ≈ 1,300 words ≈ 11–12 min with breathing room on the UI plates.
- Never say "no commissions" as an absolute: the honest line is **"a flat fee — never a percentage of your sale"**
  (plans $10/$20/$100; $0.50 per payment on trial/Starter from prepaid credit; customer pays network gas).
- Never call the three September payments revenue. They are on screen with a TEST stamp.
- Do not name TON or TRON as live networks in VO (kept off until cross-checked, audit F-2). Polygon, Ethereum and
  BNB Chain only.
- The "around three percent" card figure is a general industry figure — re-check on render day and keep "around".
- All UI plates are real captures of nervixpay.live; the promo's demo merchant "Maya Studio" is fine for the how-it-works
  chapter, but the dol23a dashboard row must be the real payment.
- **Publish blocker:** close audit F-1 (privacy / terms / company identity) before the video goes public, or change the
  CTA in dol22 to "join the invited beta".
- Fleet facts in CH0 (dol05–dol07): Memo and Sienna droplets closed 2026-10-11 → fleet is 2 droplets, Dexter + Nano
  (`~/Desktop/DavidAi/SYSTEM.md` line 3). OpenClaw → Hermes and the tool list are from Dan (2026-10-14). Do not
  show Sienna as a current worker anywhere in this episode; paper trading is retired (`~/AGENTS.md`).
