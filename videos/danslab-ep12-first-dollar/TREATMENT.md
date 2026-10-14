# EP12 — The First Dollar (Season Two, No. 2)

**Working title:** *The First Dollar* (alt: *The Wire*, *The Coin Slot*)
**Promise being kept:** ep11 closed on flw23 — *"That's the next episode. We wire the money end to end,
in the open, and you watch the first real dollar land — or fail to. No staging. No tricks. The
counter starts at zero, on camera."* This episode IS that promise. Nothing else.

**Shot prefix `W`** (unused across the repo — checked 2026-10-14: Ct E T O N M F St P Y Z Do Dp Dl Nx Fd are
taken). VO id prefix `dol` (`dol01`…). Signature cold open `WDollar` reuses the ep11 particle `$1` glyph —
but this time the particles are *waiting* at the coin slot, not forming.

## Evidence base (verified 2026-10-14 — refresh on render day)

| Fact | Source | Status |
|---|---|---|
| danslab.vercel.app, nervix.ai (+/api/health), zmarty.me, worldcup26.world all 200 | curl 2026-10-14 | ✅ |
| nervixpay.live 200 — crypto payments straight to the merchant's own wallet | curl + `~/Projects/nervixpay-promo` storyboard | ✅ live |
| `DansiDanutz/purchase-webhook` — Stripe Checkout → webhook → GitHub repo access (private repo, last push 2026-10-06) | `gh repo view` | ✅ code exists |
| purchase-webhook Wave-1 audit, 27 Jul 2026: 0 critical open, 5/5 high fixed, 7/7 medium+low fixed; **production deliberately not claimed** (SQLite + file lock needs a stateful host, not Vercel) | `~/Projects/repoaudit/reports/purchase-webhook.html` | ✅ receipt |
| Stripe **account** status (live mode? payouts enabled? which entity?) | — | ❓ **Dan** |
| Which product takes the first dollar, and its price | — | ❓ **Dan** |
| Revenue to date | ep11 flw01 | $0 (unless Dan says otherwise) |

Two pipes exist. The episode must say so honestly:
- **Pipe A — Stripe (fiat)**: purchase-webhook. Audited, hardened, never deployed. Wiring it = deploy to a
  stateful host + Stripe live keys + webhook secret + first real checkout.
- **Pipe B — NervixPay (crypto)**: live today. No processor, money lands in Dan's wallet. Already the
  subject of its own promo.

Default spine (unless Dan redirects): **wire Stripe on camera** (the literal ep11 promise), with NervixPay
shown as "the pipe that was already open" — a reveal in CH5, not a replacement.

## Persistent surfaces

- **Top-right panel — THE PIPE**: four segments that light as each is proven live on camera:
  `CHECKOUT → WEBHOOK → LEDGER → PAYOUT`. Pointer sign when first introduced (ep10 YHudTop pattern).
- **Bottom bar** (`WHud`): DansLab wordmark + `danslab.vercel.app` + **REVENUE $0.00** live counter.
  The counter is the whole episode. It changes exactly once — or never. Number POP on change
  (scale ~1.3×, blend to white, glow, ~1.5s) + `warm-shimmer` + `chime-reward`.

## Chapters

0. **Cold open — `WDollar`**: the ep11 particle $1, frozen mid-form. "Eighty days ago I promised you a dollar."
1. **Logo intro** (classic, no VO) → **stakes card**: no title repeat; "If it fails, you watch it fail."
2. **CH1 — THE SLOT**: what "wired end to end" actually means. Four boxes. Checkout. Webhook. Ledger. Payout.
   Most "we take payments" demos stop at box one.
3. **CH2 — THE RECEIPT**: the pipe already existed — purchase-webhook. The July audit on screen (real report
   in `SiteFrame`): five highs fixed, zero critical, and the honest line *"production deliberately not claimed."*
   Why: it needed a machine that remembers.
4. **CH3 — THE WIRE (the build, on camera)**: terminal plates, real. Deploy to the stateful host. Stripe keys
   (redacted on screen, always). Webhook endpoint registered. Signed test event → ledger row. Segment lights:
   CHECKOUT, WEBHOOK, LEDGER.
5. **CH4 — THE OTHER PIPE**: reveal — NervixPay is already live at nervixpay.live. Crypto, no processor,
   wallet-to-wallet. The company had a coin slot all along; it was for a different coin.
6. **CH5 — THE DOLLAR**: a real customer (or Dan's own card — stated plainly if so) pays the real price.
   Stripe dashboard → webhook log → ledger → bottom-bar counter POPS. **Two cuts are scripted (dol19a/b)**:
   it lands / it doesn't. Only the true one gets voiced.
7. **Human beat**: the fleet wrote and hardened the pipe; a human put a name on the Stripe account, signed the
   terms, and owns the liability. The 10% again.
8. **Honest close**: one dollar is not a business. What's next: the second dollar, from a stranger.
9. **Narrated outro** (series pattern): *"This was DansLab, number twelve. The First Dollar… Build. Ship. Repeat."*

## Effects map

- `WDollar` particle hold → single-particle drop into a slot (cold open) and the payoff reuse in CH5
- THE PIPE segment ignition (top-right) with gold pulse travelling checkout→payout
- Terminal plates in `SiteFrame` with marker-sweep highlights (HyperFrames alpha overlays) on the lines that matter
- Stripe dashboard / webhook log plates: real screenshots, keys and emails blurred in-plate (never rely on blur at mux)
- Counter POP (bottom bar) — the single most important frame of the episode; QA still at the exact frame
- Full CLICKS interaction layer from ep11 (stamp-hit on ledger rows, trap-snap on any ✗, glitch-zap on failures)

## Needed from Dan before VO (paid — no `gen_voice.py` until sign-off)

See `RECEIPTS.md`. The blocking three: Stripe account status · which product + price · who pays the first dollar.

_Drafted 2026-10-14 from ep11's close and the state of the repos that day._
