# EP12 — The First Dollar (Season Two, No. 2) · v2 — NervixPay spine

**Working title:** *The First Dollar* (alts: *Our Own Rails*, *Money an AI Can Hold*)
**YouTube title candidates:** "I Built My Own Payment System So My AI Company Could Get Paid" ·
"No Bank. No Card Fees. My AI Company's First Dollar." · "Why My AI Company Only Takes Stablecoins"

**Direction from Dan (2026-10-14):** the episode is about **NervixPay** — why we built our own payment system:
1. **No dependence on any third party.** Nobody can freeze it, approve it, or switch it off.
2. **Instant use.** When we have a product, we can sell it *that day*.
3. **Other businesses can use it too.** Any website, any service.
4. **Why stablecoins:** the future of money. No bank. No card commissions.
5. **Leverage: this is the moment the first money has to appear.**

**The thesis in one line:** an AI company's first dollar should arrive in money an AI can hold, on rails the
company owns — and it should arrive *now*, because every piece is finally in place.

**Kept from ep11:** shot prefix `W`, VO ids `dol01`–`dol26` (`dol23a`/`dol23b` = lands / doesn't),
REVENUE counter on the bottom bar, signature particle `$1` cold open.
**Changed from v1:** Stripe is no longer the spine. ep11 said *"Stripe is not wired yet"* — so the episode must
own that change openly in the first chapter ("I said Stripe. I changed my mind. Here's why.").

## Evidence base (verified 2026-10-14 — refresh every number on render day)

| Claim | Source | Status |
|---|---|---|
| nervixpay.live is live (200) | curl 2026-10-14 | ✅ |
| Accepts native POL / ETH / BNB plus **USDC and USDT** on **Polygon, Ethereum, BNB Chain** (canonical contracts) | nervixpay.live landing page text | ✅ |
| TON / TRON: code shipped, **kept off** until a second data source cross-checks them | readiness audit 2026-10-12 F-2 | ✅ — do NOT say "TON" in the VO as live |
| **Non-custodial**: customer wallet → merchant wallet; NervixPay "never holds, custodies, or can move" funds; can't refund or reverse | landing page + `docs/operations/network-certification.md` | ✅ |
| "No card processor, no chargebacks, no custody" | landing page | ✅ |
| Every payment verified **server-side on-chain**, exact randomized amount, QR expires | landing page "Security & trust" | ✅ |
| Merchant setup: account → connect + sign wallet (no funds move) → product → link / QR / embed snippet | NervixPay promo storyboard + landing walkthrough | ✅ |
| **Fees (be exact):** 3 free confirmed payments, then flat 30-day plans **$10 / $20 / $100** (Starter 20 / Growth 50 / Business unlimited payments); **$0.50 flat platform fee** per payment on trial + Starter from prepaid credit, never taken from the customer's payment; Growth/Business include it. **No percentage of the sale.** Customer pays network gas. | `docs/payments-and-fees.md`, `docs/fees.md` | ✅ |
| Referral model 2.5 % is an **unfunded bookkeeping accrual**, not a charge | `docs/operations/network-certification.md` | ✅ — don't mention, or say exactly this |
| Built for agents too: scoped, expiring, revocable agent access (Claude Code, Codex) + CLI | NervixPay README | ✅ |
| **Live test payments (all from wallets Dan controls):** 24 Sep 0.01 TON checkout · 26 Sep 3 USDC Polygon checkout · 26 Sep **10.30 USDC Starter plan invoice — certified** | `network-certification.md` evidence log | ✅ — these are plumbing, NOT revenue |
| **Readiness audit 2026-10-12:** "Not ready for a public launch yet. Ready for a controlled, invited-merchant beta once the two P0 items are closed." P0s: no privacy/terms/company identity; single RPC provider per chain. 912 tests pass, 0 runtime errors in 7 days. | `docs/production-readiness-audit-2026-10-12.md` | ✅ |
| Card processing costs "around three percent plus a fixed fee" | general industry pricing (Stripe US list: 2.9 % + 30¢) | ⚠️ verify on render day; keep it "around" |
| Fleet today: 2 droplets, Dexter + Nano (Memo + Sienna closed 2026-10-11); OpenClaw replaced by Hermes; tools Claude Code, Codex, Kimi, Zcode, Hermes, GrokBot | `~/Desktop/DavidAi/SYSTEM.md` + Dan 2026-10-14 | ✅ |
| Revenue to date: **$0** from any outside customer | ep11 + evidence log | ✅ unless Dan says otherwise |

## Persistent surfaces

- **Top-right — THE RAIL** (`WHudTop`): four segments that light only when shown working on camera:
  `LINK → SCAN → VERIFIED ON-CHAIN → IN THE WALLET`. Pointer sign at dol13.
- **Bottom bar** (`WHud`): DansLab wordmark + `danslab.vercel.app` + **REVENUE $0.00 · since episode one**.
  Changes exactly once (dol23a, POP + chime) or never (dol23b). Test payments never move it — the episode says so.

## Chapters

0. **Cold open — `WDollar`**: particle `$1` frozen; the counter. "Eleven episodes. Zero dollars."
1. **Logo intro** → **stakes**: "Tonight the first money appears — or you watch exactly why it doesn't."
1b. **CH0 — WHAT CHANGED** (Dan, 2026-10-14): AI moved fast — Dan's workbench is now Claude Code, Codex, Kimi,
   Zcode, Hermes and GrokBot. OpenClaw cost more time than it saved and was replaced by Hermes. The droplet agents
   were redesigned: two droplets (Dexter + Nano; Memo and Sienna closed 2026-10-11), each on our priorities only.
   Payoff line: that rebuild is why the payment rail got finished.
2. **CH1 — THE TURN**: "Last episode I said Stripe. I changed my mind." What a processor can do to you:
   approve you, hold your payouts, take its percentage, reverse a sale, close the account.
3. **CH2 — OUR OWN RAILS**: why we built NervixPay — no landlord; sell the day a product exists; and
   anyone else can bolt it onto their business.
4. **CH3 — WHY STABLECOINS**: one USDC is one dollar, not a bet. No bank in the middle, no percentage,
   no chargebacks, open all night, no borders. The killer beat: **agents have no bank accounts** — this is
   the only money an AI worker can actually hold (ties NERVIX + ep11's "workers with no bank accounts").
   Honest beat: what we still depend on (the chain, the coin issuers, a flat plan fee).
5. **CH4 — HOW IT WORKS**: five steps, real UI captures (merchant setup → customer scans → verified
   on-chain → money in the wallet). THE RAIL lights segment by segment.
6. **CH5 — THE RECEIPTS**: the three test payments on screen with block numbers — "plumbing, not revenue";
   the 12 October audit verdict in its own words.
7. **CH6 — THE MOMENT**: why the first money has to appear *now*: rail built, product live, audit says
   invited beta — the only thing missing is a customer. The offer (❓ Dan). The real attempt.
   `dol23a` counter moves / `dol23b` it doesn't.
8. **Human beat** — the fleet built the rail; a human signs the terms, puts a name on the company, owns it.
9. **Honest close + next** — one dollar is a start; next: the stranger's dollar / the open launch.
10. **Narrated outro** — "This was DansLab, number twelve. The First Dollar… Build. Ship. Repeat."

## Effects map

- `WDollar`: ep11 `ZDollar` particle system, frozen; one particle drops into a wallet slot at the end of dol03.
- `WLandlord`: a processor drawn as a toll gate between two wallets; five gates slam (approve, hold, %, reverse, close).
- `WStable`: `1 USDC = $1` on a flat line vs a jagged crypto price line (no real price data — schematic, labelled).
- `WNoBank`: the old path (customer → card network → processor → bank → merchant, 2–3 days) collapses into
  one arrow (customer wallet → merchant wallet, verified on-chain).
- `WNewCrew` / `WRebuilt`: six tool cards land; OpenClaw card dims out, Hermes slides in; droplet map redraws 4 → 2.
- `WAgentMoney`: Hermes / Dexter / Nano cards each try "open bank account" ✗, then "receive USDC" ✓.
- THE RAIL segment ignition (top-right) with a gold pulse; real UI captures in `SiteFrame`.
- `WReceipts`: three ledger rows stamp in with block numbers and a red "TEST — NOT REVENUE" stamp.
- Counter POP — the single most important frame; QA still at the exact frame.

## Before publishing (not just before rendering) — F-1 CLOSED 2026-10-15 (legal pages live); keep this note for the record

The episode sends viewers to nervixpay.live as potential merchants. The 12 October audit lists **no privacy
policy, no terms, no company identity** as a launch blocker (F-1). Close F-1 before this video goes public,
or the CTA in dol22 must be "join the invited beta / waitlist", not "sign up and take payments".

_v2 rewritten 2026-10-14 after Dan's direction (NervixPay + stablecoins + "the moment the first money appears")._
