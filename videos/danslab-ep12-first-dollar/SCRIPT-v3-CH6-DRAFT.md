# EP12 — CH6 rewrite, option A (DRAFT v3, 2026-10-24) — NOT APPROVED, NOT VOICED

Replaces dol21, dol22 and the conditional dol23a/dol23b with one dol23. The ending is no longer conditional.

Facts every line traces to (checked 2026-10-24, NervixPay DB + Polygon):
- Order #35096a88 · "Subscription" · Fake or Real merchant · 9 USDC on Polygon · created 14:02 UTC, paid in
  block 96097042 at 14:08:54 UTC · tx 0x9cbae7ff… · 9.002511 USDC received · sent by Dan from his own exchange
  account (KuCoin withdrawal screenshot).
- No outside merchant or customer has ever paid. Revenue = $0.00.

---

## CH6 — THE MOMENT

**dol21** [WMoment — the season so far in one line: products ✓ · rail ✓ · audit ✓ · customer ☐ — the empty box pulses]
"So this is the moment. Eleven episodes building. A rail we own. A product that works. An audit that says
we're ready to invite the first merchants. But nobody had watched the whole machine run, end to end, on the
product we actually sell. So I paid for it myself."

**dol22** [WLive — real captures in SiteFrame: Fake or Real checkout on nervixpay.live → Dan's exchange
withdrawal screen (address + txid shortened, balances hidden) → "PAYMENT CONFIRMED · Order #35096a88" → Polygonscan
row, block 96097042. THE RAIL lights LINK → SCAN → VERIFIED → IN THE WALLET. Red stamp lands on the row:
PAID BY DAN — TEST, NOT REVENUE]
"The twenty-fourth of October. Fake or Real — the fact-checking site the fleet built on JEV. A nine dollar
subscription, through a NervixPay link. I paid it from my own exchange account, in USDC, on Polygon. It
landed in a single block. NervixPay read the chain, matched the exact amount, and the page said: payment
confirmed. The site, the rail, the checkout — all of it ours. Working."

**dol23** [WHud — the bottom bar splits into two counters: LIVE TEST $9.00 ✓ (soft tick, no chime) ·
REVENUE $0.00 (holds; the empty "customer" box pulses); beta-link chip pointing to the description]
"But look at the counter at the bottom. It didn't move — and it shouldn't. That money came from me. A company
paying itself isn't revenue. It's a rehearsal. The rail is ready. The checkout is ready. What's missing now
isn't code. It's a stranger. If you run a business and want a seat in the invited beta, the link is in the
description."

---

## Required knock-on change (must be voiced too, or the close contradicts the ending)

**dol25** [WNext — the promise card; the REVENUE $0.00 counter stays on screen]
- Old: "One dollar isn't a business. It's a door opening. Next episode: …"
- New: "Nine dollars from the founder isn't a business. It's a dress rehearsal. Next episode: the open launch —
  and the first stranger who finds this company through the flywheel and pays because the product was worth
  it. The counter stays on screen from now on. It's still at zero. It never resets."

## Lines to check (already voiced — only change if you approve paid re-voicing)

- **dol19** says "it has worked three times" (24 Sep TON, 26 Sep 3 USDC, 26 Sep 10 USDC Starter). The database
  shows two more Dan-paid tests it leaves out: the 21 Sep 9 USDC "Fake or Real — Starter" go-live payment and a
  second 0.01 TON test on 24 Sep. "Three times, and here are the receipts" undercounts. Options: re-voice as
  "Yes — every time we tried" or keep and show all five rows on screen with the TEST stamp.
- **dol20** says the second blockchain source (F-2) "is still on the list". The 20 Oct audit says the witnesses
  are live and only the certification record is missing. Suggested fix: "The second source is now live; its
  certification run is still on the list."
- **dol02/dol03** ("Tonight it can … the first money has to appear") still work: the payoff becomes "it
  appeared — and it was mine". No change needed.

## Production impact

- New voice: dol21, dol22, dol23, dol25 (≈ 4 lines, ~230 words) — paid ElevenLabs, new lines only. Optional:
  dol19, dol20.
- Shots: WMoment reused (VO only); WOffer → **WLive** (new, real captures); WLands/WFails dropped; WHud gains the
  second counter; WNext text update.
- Captures needed from Dan: the exchange withdrawal screen (already sent), the PAYMENT CONFIRMED screen, the
  nervixpay.live checkout page for the Fake or Real link.
- SCRIPT.md, build_script_json.py (no more conditional dol23a/b), RECEIPTS.md and FIRST-SALE-RUNBOOK.md get
  updated only after approval.
</content>
</invoke>
<invoke name="mcp__ccd_turn__update_plan">
<parameter name="advance">true