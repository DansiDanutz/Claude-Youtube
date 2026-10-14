# EP12 — The First Dollar · full script (draft v1 for Dan's approval)

Season Two, No. 2 · target ~9–11 min · narrator: Brian · shot prefix `W` · VO ids `dol01`–`dol23`
Evidence base: TREATMENT.md table (verified 2026-10-14). Items marked ❓ are placeholders Dan must
confirm or replace before this is voiced. VO lines are TTS-ready (numbers spelled out). Visual notes in [brackets].

**Approval gate: Dan reads → edits → THEN `gen_voice.py` (paid). No VO before sign-off.**

---

## COLD OPEN — the promise

**dol01** [WDollar — the ep11 particle $1, frozen mid-form, one particle drifting]
"Eighty days ago I made you a promise. Wire the money end to end, in the open, and let you watch the
first real dollar land — or fail to. No staging. No tricks. Counter at zero, on camera."

**dol02** [particles hold; the bottom-bar counter fades in reading $0.00]
"That counter is live. It reads zero. By the end of this episode it either reads one dollar — or it
still reads zero, and you'll know exactly why."

**dol03** [beat — red accent, single particle drops into a slot]
"Let's build the coin slot."

## LOGO INTRO (no VO) → STAKES

**dol04** [WStakes — stakes card over dark room; no title repeat]
"Nine products. Eight workers. Fifteen thousand dollars a year going out. And in eleven episodes, not one
dollar coming in. Tonight that changes — or it doesn't, and you see the failure, frame by frame."

## CH1 — THE SLOT (what 'wired' means)

**dol05** [WFourBoxes — four empty boxes draw in: CHECKOUT · WEBHOOK · LEDGER · PAYOUT]
"First, a definition. Most 'we take payments' demos stop at box one: a checkout page. That's a doorbell,
not a door. Wired end to end means four things, in order. A checkout a stranger can pay. A webhook that
proves the payment really happened. A ledger that writes it down once — and only once. And a payout that
puts the money in a bank account with a human name on it."

**dol06** [the four boxes dim; the top-right PIPE panel appears with a pointer sign]
"That panel in the corner is the pipe. Four segments. Dark means unproven. Each one lights only when you
have seen it work. Watch it."

## CH2 — THE RECEIPT (the pipe already existed)

**dol07** [WRepo — SiteFrame: github.com/DansiDanutz/purchase-webhook (private; blur nothing sensitive, show the README)]
"Here's the part nobody expected. The pipe was already written. Back in July the fleet built this —
purchase-webhook. Stripe sends a signed event, the service checks it, and on a real paid order it grants
the buyer access to a private repository. Code as the product. Payment as the key."

**dol08** [WAudit — SiteFrame: the July audit report; rows land one by one; stamp-hit on each]
"And it was audited. Twenty-seventh of July. Five high-severity findings — all fixed. Seven medium and
low — all fixed. Zero critical open. A signed event alone no longer proves a purchase; it has to match
the mode, the product, the amount, and the currency the server owns."

**dol09** [WNotClaimed — the audit's own line in red: "Production is deliberately not claimed"]
"And then the honest line, written by the auditor: production is deliberately not claimed. Because the
ledger lives in a small database with a file lock — it needs a machine that remembers. Not a serverless
function that forgets between requests. So for eighty days the pipe sat on the shelf. Finished. Unplugged."

## CH3 — THE WIRE (the build, on camera)

**dol10** [WDeploy — terminal plate, real: the deploy to the stateful host, health check returns ready]
"So tonight we plug it in. Step one: a home. One container, one worker, one lock — exactly what the audit
demanded. ❓HOST NAME. Readiness comes back green only when the database and the configuration are both
present. It does."

**dol11** [WKeys — terminal plate: environment variables set; every value redacted on screen]
"Step two: the keys. Live mode, not test mode. The secret key, the webhook signing secret, the product
mapping the server owns. You will not see a single value on this screen. Not blurred. Never rendered."

**dol12** [WEndpoint — SiteFrame: Stripe dashboard, webhook endpoint registered; glitch-zap if the first attempt fails]
"Step three: Stripe has to know where to knock. One endpoint. One event type. Stripe sends a signed test
ping — the service checks the signature and answers two hundred. The first segment lights. CHECKOUT.
The second lights. WEBHOOK."

**dol13** [WLedger — terminal plate: a test-mode event lands; ledger row written; replay the same event; row count stays 1]
"Step four, the one that matters. Send the same event twice. A bad ledger writes it twice and gives the
product away twice. This one writes it once. Replay — one row. Replay — one row. LEDGER lights."

## CH4 — THE OTHER PIPE (the reveal)

**dol14** [WNervixPay — SiteFrame: nervixpay.live live; chapter open, whoosh]
"Now a confession. While Stripe sat on the shelf, the company grew a second coin slot — and it's been live
for weeks. NervixPay. Crypto payments for any website and any service. No processor. No approval. The money
goes wallet to wallet, straight to the merchant."

**dol15** [WTwoPipes — two pipes side by side: FIAT · CRYPTO; the flywheel mini-map from ep11 in the corner]
"Two pipes, two kinds of customer. Fiat for people with a card and a company name. Crypto for the builders
already living on-chain. The flywheel from last episode doesn't care which coin turns it. It only cares
that one does."

## CH5 — THE DOLLAR

**dol16** [WPrice — the product card: ❓PRODUCT NAME, ❓PRICE; a real Checkout link]
"So here is the product. ❓PRODUCT, ❓PRICE. One real checkout link, live on the internet right now. And
here is the rule: I don't pay myself and call it revenue. ❓WHO PAYS — stated plainly, on screen."

**dol17** [WCheckout — SiteFrame: the Stripe Checkout page, card entry blurred in-plate, Pay button]
"Card in. Pay."

**dol18** [WWebhookLog — Stripe dashboard webhook log → terminal: event received, signature ok, ledger row 1]
"Stripe fires the event. The service checks the signature. Checks the mode. Checks the product, the amount,
the currency. Writes one row. Grants the access. Four seconds, end to end."

**dol19a** [WLands — the bottom-bar counter POPS $0.00 → $1.00 (or ❓PRICE); PAYOUT lights; chime]
"And there it is. The counter moves. Not a mockup. Not a staging key. Eleven episodes of zero — and one
real dollar, from a real card, through a pipe you just watched get built. PAYOUT lights when the bank
confirms — ❓ two business days. We'll show the statement next episode."

**dol19b** [WFails — the counter stays $0.00; the failing step flashes red; trap-snap]
"And — nothing. The counter doesn't move. ❓WHAT FAILED. That's the episode. I promised you'd watch it land
or fail, and this is what failing looks like. Here's exactly where it broke, and here's what gets fixed
before the next one."

> Only ONE of dol19a / dol19b is voiced — the true one, after the real attempt. Do not generate both.

## HUMAN BEAT

**dol20** [WHuman — 90/10 echo from ep10 and ep11]
"The fleet wrote the pipe. The fleet hardened it, audited it, and tonight deployed it. But look at what it
could not do. It cannot open a Stripe account. It cannot sign the terms. It cannot put a legal name on the
payout and carry the liability if something goes wrong. That ten percent is a human. That ten percent is
why the ninety can be trusted with money at all."

## HONEST CLOSE

**dol21** [WOneDollar — checklist: pipe wired ✓, first dollar (✓ or ✗), second dollar from a stranger ☐]
"Full honesty, like always. One dollar is not a business. One dollar from a known card is a plumbing test.
The real milestone is the second dollar — from a stranger, who found this company through the wheel, and
paid because the product was worth it. That's the one that proves the flywheel."

**dol22** [WNext — the promise card]
"Next episode: the stranger's dollar. Where they came from, which product, and what the wheel did to bring
them. The counter stays on screen from here on. It doesn't reset."

## OUTRO (narrated, series pattern)

**dol23** [WOutro — Subscribe pill + link + BUILD./SHIP./REPEAT. landing word-by-word on his words]
"This was DansLab, number twelve. The First Dollar. If you want to see the second one land — subscribe, and
hit like. You'll be here when it happens. Build. Ship. Repeat."

---

## Production notes

- 23 VO lines (22 voiced; dol19 is one of two) ≈ 9–11 min with terminal plates breathing. Shorter than ep10,
  longer than ep11's opener — right for a build episode.
- Persistent top-right: **THE PIPE** (4 segments, pointer sign at dol06). Bottom bar: link + **REVENUE $0.00**
  counter — changes exactly once (dol19a) or never (dol19b).
- Every terminal plate is a real capture from the real deploy session (no synthetic logs). Secrets never
  rendered — redact at capture time with the terminal's own output (`***`), not at mux.
- Receipts needed from Dan before render: see `RECEIPTS.md`. The ❓ placeholders in dol10, dol16, dol19a/b must
  be resolved to real words before TTS (the voice must not say "placeholder").
- Approval gate: Dan reads this script → edits → THEN gen_voice.py (paid). No VO before sign-off.
