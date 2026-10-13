import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, SiteBg } from '../../lib/danslab';
import { DYT } from '../../lib/dytbrand';
import { makeCue, ease, rise, useShotFade, Vignette } from '../../lib/dykkit';
import { MoneyLadder, moneyRungs, LADDER_FULL, PeopleRow, Label, Source, win, QGRAD, Banknote, CoinGrid, GOLD } from '../../lib/dykkit-money';
import vo from './vo.json';

// =============================================================================
// DYK 04 · 11/14 — the answer (RESEARCH F2, F1). THE ANSWER from frame 0 (pulse on "answer"); BANK OF ENGLAND · 2014 on
// "Bank"; the card I · O · U builds on "I-O-U", "= A PROMISE TO PAY" (logo gradient) lands just after it; six people
// pass one note around on "everyone"/"accept". Where it comes from (F1): MOST OF IT · MADE BY ORDINARY BANKS on "banks";
// a loan form on "loan"; a savings jar ✗ on "savings"; an account where + NEW DEPOSIT types itself on "types"/"deposit";
// WITHIN LIMITS on "limits"; + NEW MONEY on "creates"/"money". The guess (F1, BoE 2014): 100 coins, 97 dissolve into digits
// on "ninety", 97 £ BANK DEPOSITS on "deposits", the 3 left glow on "three", 3 £ NOTES & COINS on "coins"; HOW CLOSE WERE
// YOU? on "How". The walk-back: the full ladder appears dim on "climb", each rung lights on its word (useful · paper ·
// belief · gold · trust · screen). Payoff: PROMISE. lands on "Promise" (2nd) over the whole ladder; IT WAS THERE ALL
// ALONG on "along". The ladder dims and stays: Mo2100 grows from it. VO mo10 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'MoReveal', durationInSeconds: 54.5667, fps: 30, width: 1920, height: 1080 };
const DUR = 1637;

const C = makeCue(vo, 'mo10-reveal', 0.8);
const ANSWER = C.at('answer');
const BANK1 = C.at('Bank', 1);
const PLAINLY = C.at('plainly');
const MONEY1 = C.at('Money', 1);
const IOU = C.at('I-O-U');
const SPECIAL = C.at('special');
const EVERYONE = C.at('everyone');
const ACCEPT = C.at('accept');
const MOST = C.at('most');
const BANKS = C.at('banks');
const LOAN1 = C.at('loan', 1);
const HAND = C.at('hand');
const SAVINGS = C.at('savings');
const TYPES = C.at('types');
const DEPOSIT = C.at('deposit');
const ACCOUNT = C.at('account');
const LIMITS = C.at('limits');
const CREATES = C.at('creates');
const MONEY2 = C.at('money', 2);
const AND2 = C.at('And', 2); // 'And your guess?'
const GUESS = C.at('guess');
const CHECKED = C.at('checked');
const NINETY = C.at('ninety');
const DEPOSITS = C.at('deposits');
const THREE = C.at('three');
const COINS = C.at('coins');
const HOW = C.at('How');
const CLIMB = C.at('climb');
const ME = C.at('me');
const FIFTEEN = C.at('fifteen');
const LIT = [C.at('fifteen'), C.at('Then', 1), C.at('Then', 2), C.at('Then', 3), C.at('Then', 4), C.at('Today', 2)]; // each rung lights as its line starts
const REMEMBER = C.at('Remember');
const STOCKHOLM = C.at('Stockholm');
const PROMISE2 = C.at('Promise', 2);
const ALONG = C.at('along');

const RIGHT = { left: 1160, width: 600 } as const;
const LADDER_DIM = 0.6;

const MoReveal: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const iou = win(f, 0, MOST - 2, 1, 8);
  const banks = win(f, MOST - 4, AND2 - 4, 6, 10);
  const guess = win(f, AND2 - 4, CLIMB + 4, 6, 10);
  const ladderShow = ease(f, CLIMB, CLIMB + 12) * (1 - (1 - LADDER_DIM) * ease(f, ALONG - 6, ALONG + 10));
  const card = ease(f, IOU - 4, IOU + 6);
  const cardDock = 0; // v1.1: the card no longer docks (it collided with the loan panel); it clears on "most"
  const typed = Math.max(0, Math.min(14, Math.floor((f - DEPOSIT + 2) / 2)));
  const pass = f >= EVERYONE ? ((f - EVERYONE) / 8) % 6 : -1;
  const solid = (i: number) => (i >= 97 ? 1 : 1 - ease(f, NINETY + (i % 20) * 0.6, NINETY + 10 + (i % 20) * 0.6));
  const glow3 = ease(f, THREE - 2, THREE + 8);
  const payoff = ease(f, PROMISE2 - 2, PROMISE2 + 8);
  const glowAll = ease(f, PROMISE2 - 36, PROMISE2, 0, 1, DL_EASE.in) * (1 - 0.5 * ease(f, PROMISE2 + 10, PROMISE2 + 40));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0e1a10" />
      <Vignette />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 80, textAlign: 'center', fontFamily: DL_MONO, fontSize: 40, letterSpacing: 18, color: DL.red, opacity: ease(f, -6, 0) * (1 - ease(f, CLIMB - 10, CLIMB)), transform: `scale(${1 + 0.15 * ease(f, ANSWER, ANSWER + 4) * (1 - ease(f, ANSWER + 6, ANSWER + 20))})` }}>THE ANSWER</div>

      {/* the IOU card: built centre-left, then docks to the right column and stays to the guess */}
      <div style={{ position: 'absolute', left: 200 + (RIGHT.left - 200) * cardDock, top: 330, transformOrigin: 'top left', transform: `scale(${1 - 0.35 * cardDock})`, width: 900, opacity: card * (1 - ease(f, MOST - 8, MOST + 2)) }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 30 }}>
          <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 170, letterSpacing: 10, color: DL.text }}>I·O·U</span>
        </div>
        <div style={{ fontFamily: DL_SERIF, fontSize: 92, display: 'inline-block', background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: ease(f, IOU + 8, IOU + 16), transform: `scale(${ease(f, IOU + 8, IOU + 20, 1.2, 1)})`, transformOrigin: 'left center', filter: `drop-shadow(0 0 24px ${DYT.magenta}88)` }}>= a promise to pay</div>
        <div style={{ marginTop: 14 }}><Label at={SPECIAL} color={DYT.orange} size={30}>A SPECIAL ONE</Label></div>
      </div>
      <AbsoluteFill style={{ opacity: iou }}>
        <div style={{ position: 'absolute', left: 200, top: 200 }}><Label at={BANK1} color={DL.dim} size={30}>THE BANK OF ENGLAND<span style={{ opacity: ease(f, PLAINLY - 2, PLAINLY + 6) }}> PUTS IT PLAINLY</span></Label></div>
        <div style={{ position: 'absolute', left: 200, top: 260 }}><Label at={MONEY1} color={DL.text} size={30}>MONEY TODAY IS A TYPE OF…</Label></div>
        {/* everyone trusts that other people will accept it: one note passes round a ring of six */}
        <div style={{ position: 'absolute', left: 1180, top: 300, width: 520, height: 520, opacity: ease(f, EVERYONE - 4, EVERYONE + 8) }}>
          {Array.from({ length: 6 }, (_, i) => {
            const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
            return <div key={i} style={{ position: 'absolute', left: 230 + Math.cos(a) * 200, top: 200 + Math.sin(a) * 200, opacity: ease(f, EVERYONE + i * 3, EVERYONE + i * 3 + 6) }}><PeopleRow n={1} size={56} lit={() => (Math.floor(pass) === i ? 1 : 0.3)} /></div>;
          })}
          {pass >= 0 && (() => {
            const a = (pass / 6) * Math.PI * 2 - Math.PI / 2;
            return <div style={{ position: 'absolute', left: 200 + Math.cos(a) * 130, top: 230 + Math.sin(a) * 130 }}><Banknote w={110} /></div>;
          })()}
          <div style={{ position: 'absolute', left: 0, right: 0, top: 540, textAlign: 'center' }}><Label at={EVERYONE} color={DL.text} size={26} style={{ textAlign: 'center' }}>EVERYONE TRUSTS OTHERS<span style={{ opacity: ease(f, ACCEPT - 2, ACCEPT + 6) }}> WILL ACCEPT IT</span></Label></div>
        </div>
        <div style={{ position: 'absolute', left: 200, top: 950 }}><Source at={IOU}>McLeay, Radia & Thomas, "Money in the modern economy", BoE Quarterly Bulletin 2014 Q1</Source></div>
      </AbsoluteFill>

      {/* where it comes from: a loan creates a deposit */}
      <AbsoluteFill style={{ opacity: banks }}>
        <div style={{ position: 'absolute', left: 200, top: 190 }}><Label at={MOST} color={DL.text} size={32}>MOST OF IT<span style={{ opacity: ease(f, BANKS - 2, BANKS + 6) }}> · MADE BY ORDINARY BANKS</span></Label></div>
        <div style={{ position: 'absolute', left: 1460, top: 270, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: ease(f, BANKS - 2, BANKS + 8) }}>
          <svg width={220} height={190} viewBox="0 0 220 190"><path d="M10 60 L110 10 L210 60 Z" fill="#4a5a7a" />{[30, 70, 110, 150, 190].map((x) => <rect key={x} x={x - 8} y={66} width={16} height={100} fill="#8a9aba" />)}<rect x={10} y={166} width={200} height={20} fill="#4a5a7a" /><text x={110} y={52} textAnchor="middle" fontFamily={DL_MONO} fontSize={16} fill="#e8e8f0">BANK</text></svg>
          <Label at={BANKS} color={DL.dim} size={24}>AN ORDINARY BANK</Label>
        </div>
        <div style={{ position: 'absolute', left: 200, top: 280, display: 'flex', alignItems: 'flex-start', gap: 50 }}>
          <div style={{ width: 240, padding: 20, borderRadius: 12, background: '#f4efe0', opacity: ease(f, LOAN1 - 2, LOAN1 + 8), transform: `rotate(-3deg)` }}>
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: '#1a1a1a' }}>LOAN</div>
            {[0, 1, 2, 3].map((k) => <div key={k} style={{ height: 6, marginTop: 14, width: 180 - k * 30, background: '#8a8070' }} />)}
            <div style={{ marginTop: 16, fontFamily: DL_MONO, fontSize: 22, color: DL.green }}>✓ APPROVED</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: ease(f, HAND - 2, HAND + 8) }}>
            <svg width={150} height={170} viewBox="0 0 150 170"><rect x={25} y={40} width={100} height={120} rx={16} fill="none" stroke={DL.warm} strokeWidth={5} /><rect x={35} y={20} width={80} height={24} rx={6} fill={DL.warm} />{[0, 1, 2].map((k) => <circle key={k} cx={55 + k * 20} cy={130 - k * 18} r={14} fill={GOLD.mid} />)}<line x1={10} y1={10} x2={140} y2={160} stroke={DL.red} strokeWidth={10} opacity={ease(f, SAVINGS - 2, SAVINGS + 6)} /></svg>
            <Label at={SAVINGS} color={DL.red} size={24}>NOT SOMEONE ELSE'S SAVINGS</Label>
          </div>
          <div style={{ width: 460, padding: '20px 26px', borderRadius: 14, background: '#0b1630', border: `2px solid ${DYT.cyan}`, opacity: ease(f, TYPES - 4, TYPES + 6) }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 24, color: DYT.dim }}>YOUR <span style={{ opacity: ease(f, ACCOUNT - 2, ACCOUNT + 6) }}>ACCOUNT</span></div>
            <div style={{ marginTop: 12, fontFamily: DL_MONO, fontSize: 26, color: DL.muted }}>…</div>
            <div style={{ marginTop: 8, fontFamily: DL_MONO, fontWeight: 700, fontSize: 32, color: DYT.cyan }}>{'+ NEW DEPOSIT'.slice(0, typed)}<span style={{ opacity: Math.floor(f / 8) % 2 }}>▌</span></div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 200, top: 620, display: 'flex', alignItems: 'center', gap: 40 }}>
          <div style={{ ...rise(f, LIMITS - 2), padding: '10px 22px', borderRadius: 999, border: `2px solid ${DL.dim}`, fontFamily: DL_MONO, fontSize: 30, letterSpacing: 3, color: DL.dim }}>WITHIN LIMITS</div>
          <span style={{ fontFamily: DL_SERIF, fontSize: 90, color: DYT.green, opacity: ease(f, CREATES - 2, CREATES + 6), textShadow: `0 0 26px ${DYT.green}88` }}>+ new<span style={{ opacity: ease(f, MONEY2 - 2, MONEY2 + 6) }}> money</span></span>
        </div>
        <div style={{ position: 'absolute', left: 200, top: 780 }}><Source at={LIMITS}>McLeay, Radia & Thomas, "Money creation in the modern economy", BoE QB 2014 Q1 · limited by policy, regulation, profit</Source></div>
      </AbsoluteFill>

      {/* the guess */}
      <AbsoluteFill style={{ opacity: guess }}>
        <div style={{ position: 'absolute', left: 160, top: 190 }}><Label at={GUESS} color={DYT.magenta} size={32}>YOUR GUESS<span style={{ opacity: ease(f, CHECKED - 2, CHECKED + 6) }}> · WHEN THE BANK OF ENGLAND CHECKED (2014)</span></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 270, opacity: ease(f, CHECKED - 4, CHECKED + 8) }}>
          <CoinGrid solid={(i) => solid(i)} size={40} cols={20} />
          {/* the 3 survivors glow */}
          <div style={{ position: 'absolute', left: (17 * 48), top: 4 * 48 - 6, width: 3 * 48 + 4, height: 52, borderRadius: 26, boxShadow: `0 0 ${30 * glow3}px ${GOLD.light}`, border: `3px solid ${glow3 > 0.1 ? GOLD.light : 'transparent'}` }} />
        </div>
        <div style={{ position: 'absolute', left: 160, top: 560, display: 'flex', gap: 80 }}>
          <div style={{ opacity: ease(f, NINETY - 2, NINETY + 8) }}>
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 70, color: DYT.cyan }}>~97 £</div>
            <div style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.dim, opacity: ease(f, DEPOSITS - 2, DEPOSITS + 6) }}>BANK DEPOSITS</div>
          </div>
          <div style={{ opacity: ease(f, THREE - 2, THREE + 8) }}>
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 70, color: GOLD.light }}>~3 £</div>
            <div style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.dim, opacity: ease(f, COINS - 2, COINS + 6) }}>NOTES &amp; COINS</div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 740, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 70, color: DYT.magenta, opacity: ease(f, HOW - 2, HOW + 6), transform: `scale(${1 + 0.08 * ease(f, HOW, HOW + 5) * (1 - ease(f, HOW + 8, HOW + 22))})`, transformOrigin: 'left center' }}>How close were you?</div>
        <div style={{ position: 'absolute', left: 160, top: 860 }}><Source at={NINETY}>BoE Quarterly Bulletin 2014 Q1 · UK broad money · out of every £100</Source></div>
      </AbsoluteFill>

      {/* the walk-back */}
      <MoneyLadder rungs={moneyRungs(6, true)} show={ladderShow} mode="full" litAt={LIT} glowAt={PROMISE2} />
      <div style={{ position: 'absolute', left: LADDER_FULL.left, top: 96, opacity: ease(f, CLIMB, CLIMB + 10) * (1 - ease(f, FIFTEEN - 6, FIFTEEN + 4)) }}><Label at={CLIMB} color={DL.gold} size={30}>NOW CLIMB IT AGAIN, WITH ME<span style={{ opacity: ease(f, ME - 2, ME + 6) }}> ↑</span></Label></div>

      {/* payoff, right column */}
      <div style={{ position: 'absolute', left: RIGHT.left, top: 300, width: RIGHT.width, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ fontFamily: DL_SERIF, fontSize: 48, lineHeight: 1.15, color: DL.dim, opacity: ease(f, REMEMBER - 2, REMEMBER + 6) }}>Remember that word<span style={{ opacity: ease(f, STOCKHOLM - 2, STOCKHOLM + 6) }}> from Stockholm?</span></div>
        <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 150, lineHeight: 1, display: 'inline-block', background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: payoff, transform: `scale(${ease(f, PROMISE2 - 2, PROMISE2 + 12, 1.3, 1)})`, transformOrigin: 'left center', filter: `drop-shadow(0 0 ${30 * glowAll}px ${DYT.magenta})` }}>Promise.</div>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, color: DL.gold, opacity: ease(f, ALONG - 14, ALONG - 4) }}>It was there all along.</div>
      </div>
    </AbsoluteFill>
  );
};
export default MoReveal;
