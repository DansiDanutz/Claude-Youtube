# EP12 — first real sale runbook (NervixPay Starter, 10 USDC, invited merchant)

Written 2026-10-24 from the live code (`~/ZCodeProject/NervixPay` @ c70c04c) and the production database.
Goal: the true ending for `dol23a`. If nobody pays, `dol23b` is the true ending — that is also a valid result.

## Ground truth before the sale (checked 2026-10-24)

- NervixPay has **one** merchant: "Fake or Real" (Dan, `37b595c2…`). Any second merchant is the newcomer.
- Every payment so far came from Dan's own sender `0xee7ae85f…4055` (tx signer `0xe7804c37…e245`).
- Plan invoices are paid to the platform subscription wallet `0x0aa08528…61DF` on Polygon.
- Only the Polygon USDC plan-invoice path is certified, so the merchant must use **Polygon + USDC**.
- The invoice shows the exact amount to send: 10 USDC plus a few cents that identify the order (Dan's was
  10.30). The video shows the real amount; the VO says "ten dollar Starter plan".

## Hard rules (the episode is void if any is broken)

1. **Outside money only.** The merchant pays from their own wallet with USDC they already own. Dan does not
   send, lend, refund, reimburse or "top up" them before or after. No refunds, discounts or side deals that make
   the sale circular.
2. **Consent first.** Get written OK (a message is enough) to show: their business name (or "an invited
   merchant"), the shortened wallet address and the amount. No full name, email, or full address on screen.
3. **No secrets on screen.** No seed phrases, private keys, email codes, session cookies or API keys.

## What the invited merchant does (~10 minutes)

1. Have a wallet such as MetaMask or Trust Wallet on **Polygon**, with **at least 11 USDC** plus a little POL
   for gas (≈0.05 POL).
2. Open **https://nervixpay.live/signup** and create an account (their own email or Google).
3. Complete the **one-time business profile** (mandatory; checkout refuses with "Complete NervixPay merchant
   onboarding" until it is done): business name, category, country, description, support email, support phone,
   street address, city, postcode. No KYC and no wallet connection are needed for this. Once submitted it can
   only be corrected later in Profile, not undone — tell the merchant this is real data for their account and
   that none of it appears on screen.
4. Go to **Settings → Billing**. Network defaults to **Polygon** but the token defaults to **POL** — switch the
   token to **USDC**, then choose **Starter ($10)**.
5. The checkout shows the exact amount, QR code and receiving address. Pay that **exact** amount from their
   own wallet within the time shown (scan the QR or use "Open wallet").
6. Wait on the page until it says the payment is confirmed (usually under a minute on Polygon). Their plan
   then shows **Starter**.
7. Send Dan the transaction hash (wallet → activity → the payment → copy hash).

## What to capture for RECEIPTS.md (real captures only)

Dan's screen (screen recording, 1080p or higher, plus PNG stills of each):

- [ ] Merchant's phone or screen (with consent) at checkout: exact amount, Polygon, USDC, QR.
- [ ] The wallet confirm screen (amount + network visible; no balances or other assets if they object).
- [ ] The "Payment confirmed" state, then Billing showing plan **Starter**.
- [ ] Polygonscan page for the transaction: status Success, from (shortened on screen), to `0x0aa08528…61DF`,
      USDC amount, block number, timestamp.
- [ ] The subscription wallet's USDC balance before and after (Polygonscan token holdings or a wallet view).
- [ ] The written consent message (kept off-screen; filed with the receipts).

Record in RECEIPTS.md: date/time (UTC and Bucharest), exact amount, tx hash, block, payer address (full in the
file, shortened on screen), merchant display name as approved, and who invited them.

## How Claude verifies it (read-only)

Give Claude the transaction hash. Claude then checks, without touching production:

1. **NervixPay database** (`kisncxslqjgdesgxmwen`): a `subscription_payments` row with `purpose = plan`,
   `plan = starter`, `status = paid`, network Polygon, token USDC, matching hash and amount — and its
   `merchant_id` is **not** Dan's `37b595c2…`. The merchant row was created by the newcomer.
2. **On-chain** (public Polygon RPC): the transaction succeeded, it is a USDC (`0x3c499c…3359`) transfer to
   `0x0aa08528…61DF` of exactly the invoiced amount, with enough confirmations.
3. **Outside money**: the payer address is not one of Dan's known addresses, and the USDC it spent did not come
   from any of Dan's wallets (Claude traces the payer's incoming USDC/POL before the payment). If the merchant
   pays **from an exchange** (KuCoin, Binance…), the on-chain sender is the exchange's shared hot wallet, and
   Dan's own KuCoin withdrawals come from `0xee7ae85f…4055` too. Then the address proves nothing either way:
   get the merchant's withdrawal screenshot (with the tx hash) as the evidence, and ideally have them pay
   from a personal wallet instead.
4. **No refund**: no transfer from the subscription wallet or Dan's wallets back to the payer afterwards (re-checked
   on render day).

Only if all four pass is the `dol23a` ending true. Then: `ONLY=dol23a python3.13 work/gen_voice.py`, verify with
`python3.13 work/verify_voice.py --only dol23a`, re-run `work/build_timing.py`, and put the real amount and
shortened address into WLands / WHud.

## Truth check before voicing anything else

- `dol20` says the "second source" (F-2) is still open. The 2026-10-20 audit says the witnesses are live and only
  the certification evidence row is unrecorded. Re-read `docs/production-readiness-audit-2026-10-20.md` and
  adjust the line if needed. Voicing a corrected line costs credits, so get Dan's OK first.
- The beta link for the description is still missing (RECEIPTS decision 2).
</content>
</invoke>
