# EP12 — receipts & decisions needed from Dan (v2 — NervixPay spine)

Rule (series): every on-screen number traces to a file or to Dan. Every screenshot is a real capture.
A ❓ left open at render time is a Truth deduction on the rubric.

## Decisions — RESOLVED by Dan 2026-10-15 (script v2 approved)

1. First sale: a **NervixPay Starter plan, 10 USDC**, bought by an **invited merchant** (dol22, dol23a).
2. Viewers join the **invited beta** via the link in the description (dol22). Beta link URL still needed for the description.
3. Audit blockers (checked 2026-10-15): **F-1 closed** — /docs/legal/terms and /docs/legal/privacy live (200), operator
   details set (PRs #113, #123, #124). **F-2 open** (deferred in #113) — dol20 says so. Re-check on render day.
4. Outcome: still to happen. Run the real attempt, then voice ONLY the true ending: `ONLY=dol23a` or `ONLY=dol23b`.
5. Droplets: **Dexter = the video machine**, **Nano = NervixPay ops** (dol06).
6. Stripe reversal (dol08): approved as drafted.

### Original decision table (kept for the record)

| # | Decision | Lines | Suggested default |
|---|---|---|---|
| 1 | **What is the first thing sold, and at what price in USDC?** | dol22, dol23a | A NervixPay **Starter plan ($10 USDC)** bought by an invited outside merchant — the payment product earns its first money through itself. Alternative: a DansLab product (e.g. paid repo access) sold through a NervixPay link. |
| 2 | **Who are the first payers, and how do viewers join?** | dol22 | Invited-merchant beta (matches the audit verdict). Viewers join a waitlist/beta link, not open signup, unless F-1 is closed. |
| 3 | **Status of the two audit P0 blockers on render day** — F-1 legal surface (privacy, terms, company identity) · F-2 second RPC witness | dol20, publish gate | Close F-1 before publishing regardless. If F-2 is still open, the VO says so. |
| 4 | **The real outcome** — run the real attempt BEFORE voicing dol23; only the true branch is generated | dol23a/b | — |
| 5 | **CH0 fleet facts (dol05–dol07)** — confirm the tool list (Claude Code, Codex, Kimi, Zcode, Hermes, GrokBot), "OpenClaw replaced by Hermes", and how to describe each droplet's priority (Dexter = ?, Nano = ?) | dol05–dol07 | Tool list + OpenClaw→Hermes from Dan 2026-10-14; two droplets per SYSTEM.md (Memo + Sienna closed 2026-10-11) |
| 6 | **Is the Stripe change of heart worded the way you'd say it?** (dol08 — ep11 promised Stripe on camera) | dol08 | As drafted: "Not because Stripe is bad. Because of what it means to put somebody else's gate…" |

## Captures (real — collected on the day)

- [ ] nervixpay.live landing hero + "No custody. No card fees." line (live ✅ 2026-10-14)
- [ ] Merchant setup: sign in → Connect wallet → signature → "Ownership verified" (real account; no secrets on screen)
- [ ] Product → share panel: link, QR, embed snippet
- [ ] Customer phone: checkout → USDC on Polygon → exact amount + QR → wallet confirm → confirmations → "Payment confirmed"
- [ ] Dashboard Payments row + "Paid directly to your wallet"
- [ ] Evidence log rows from `NervixPay/docs/operations/network-certification.md` (24 Sep TON, 26 Sep 3 USDC, 26 Sep 10.30 USDC Starter) + the Polygonscan pages for `0x048ee6fa…` (block 94482064) and `0xb8bb1943…` (block 94471825)
- [ ] The 12 October readiness audit: verdict line + grade table
- [ ] **dol23a only:** the real outside payment — dashboard row, explorer page, wallet balance; payer identity only with their consent (wallet address shortened)

## Already verified (2026-10-14)

- nervixpay.live → 200. Networks live: Polygon, Ethereum, BNB Chain; assets POL/ETH/BNB + USDC + USDT (landing page).
- Non-custodial, server-side on-chain verification, exact randomized amounts, expiring QR (landing page).
- Fees: 3 free payments; plans $10 / $20 / $100 per 30 days; $0.50 flat per payment on trial/Starter from prepaid credit; no percentage of the sale (`docs/payments-and-fees.md`, `docs/fees.md`).
- Certification: only the Polygon USDC **plan invoice** path is certified (2026-09-26); all merchant-checkout paths "not certified" (`docs/operations/network-certification.md`).
- Readiness audit 2026-10-12: "Not ready for a public launch yet. Ready for a controlled, invited-merchant beta once the two P0 items below are closed." 912 tests pass; 0 production runtime errors over 7 days.

## Not allowed

- Calling any payment from a Dan-controlled wallet "revenue".
- Saying "no commissions" or "no fees" as an absolute — say "flat fee, never a percentage of your sale".
- Naming TON/TRON as live in VO while they're switched off.
- Regenerating any existing paid narration (ep01–ep11). New lines only, via `gen_voice.py`, whisper-verified.
- Rendering a secret, private key, seed phrase, or full payer identity.
