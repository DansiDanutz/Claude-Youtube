import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { DYT } from '../../lib/dytbrand';
import { makeCue, ease, rise, Vignette, ClockFace } from '../../lib/dykkit';
import { Banknote, Sovereign, Digits, Label, QGRAD, NOTE } from '../../lib/dykkit-money';
import vo from './vo.json';

// =============================================================================
// DYK 04 · 1/14 — cold open (No. 03 continuity + RESEARCH F1 characterisation, answered in MoReveal). Frame 0: a
// banknote fills the frame, slowly turning. "Last time": a LAST TIME · NO. 03 card, its question on "Did". "Take a note
// out of your wallet": a wallet, the note slides out on "note"; "Any note": it flips through three designs. "paper" /
// "plastic" / "ink": the note splits into its layers, each labelled on its word. "hours of your life": a clock sweeps
// round the note; "a few of them": three notes fan out. Beat 2: DID YOU KNOW THAT… on "Did"; MOST MONEY TODAY on
// "most"; PAPER ✗ / METAL ✗ on their words; on "hold?" the note dissolves into digits and fades — an empty open hand;
// "?" on "actually". Nothing shows IOU / promise / 97 % (never spoil the answer). VO mo01 @0.6 s, mo02 @16.08 s.
// =============================================================================
export const compositionConfig = { id: 'MoHook', durationInSeconds: 25.8, fps: 30, width: 1920, height: 1080 };
const DUR = 774;

const A = makeCue(vo, 'mo01-hook', 0.6);
const B = makeCue(vo, 'mo02-question', 16.08);
const LAST = A.at('Last');
const QUESTION = A.at('question');
const DID_A = A.at('Did');
const MONEY_A = A.at('money');
const TAKE = A.at('Take');
const NOTE1 = A.at('note', 1);
const WALLET = A.at('wallet');
const ANY = A.at('Any');
const PAPER = A.at('paper');
const PLASTIC = A.at('plastic');
const INK = A.at('ink');
const STILL = A.at('still');
const HOURS = A.at('hours');
const LIFE = A.at('life');
const FEW = A.at('few');
const STRANGE = B.at('strange');
const DID_B = B.at('Did');
const MOST = B.at('most');
const TODAY = B.at('today');
const PAPER_B = B.at('paper');
const METAL = B.at('metal');
const ANYTHING = B.at('anything');
const HOLD = B.at('hold');
const SO = B.at('So');
const ACTUALLY = B.at('actually');

const DESIGNS: { big: string; color: string; ink: string }[] = [
  { big: '£20', color: NOTE.paper, ink: NOTE.ink },
  { big: '€50', color: '#f0d8c0', ink: '#8a4a2a' },
  { big: '$10', color: '#dfe8d8', ink: '#2a4a3a' },
];

const OpenHand: React.FC<{ size?: number }> = ({ size = 360 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <path d="M40 120 C40 100 46 92 56 92 L62 92 L62 40 C62 30 76 30 76 40 L76 86 L82 86 L82 28 C82 18 96 18 96 28 L96 86 L102 86 L102 32 C102 22 116 22 116 32 L116 90 L122 90 L122 50 C122 40 136 40 136 50 L136 128 C136 160 116 184 88 184 C60 184 40 160 40 130 Z" fill="none" stroke={DL.warm} strokeWidth={6} strokeLinejoin="round" />
  </svg>
);

const MoHook: React.FC = () => {
  const f = useCurrentFrame();
  const fade = ease(f, DUR - 3, DUR, 1, 0); // no fade-in: the note is on screen at frame 0
  const p1 = 1 - ease(f, STRANGE - 6, STRANGE + 6, 0, 1, DL_EASE.in);
  const p2 = ease(f, STRANGE - 2, STRANGE + 10);
  // the note: slow turn from frame 0, slides into the wallet frame on "Take", out again on "note"
  const turn = Math.sin(f / 40) * 8;
  const designIdx = f < ANY ? 0 : Math.min(2, Math.floor((f - ANY) / 6) % 3);
  const d = f >= ANY + 18 ? DESIGNS[0] : DESIGNS[designIdx];
  const peel = ease(f, PAPER - 4, PAPER + 12, 0, 1, DL_EASE.inOut);
  const peel2 = ease(f, PLASTIC - 4, PLASTIC + 12, 0, 1, DL_EASE.inOut);
  const regroup = ease(f, STILL - 4, STILL + 10, 0, 1, DL_EASE.inOut);
  const noteScale = interpolate(f, [0, TAKE - 6, TAKE + 6], [1.5, 1.4, 1.05], { ...DCLAMP, easing: DL_EASE.inOut });
  const out = ease(f, NOTE1 - 2, NOTE1 + 14, 0, 1, DL_EASE.out);
  const wallet = ease(f, TAKE - 4, TAKE + 8) * (1 - ease(f, PAPER - 8, PAPER + 4));
  const sweep = interpolate(f, [HOURS - 2, STRANGE], [0, 720], DCLAMP);
  const clockOp = ease(f, HOURS - 2, HOURS + 8);
  const fan = ease(f, FEW - 2, FEW + 10, 0, 1, DL_EASE.out);
  const pulse = (at: number) => ease(f, at, at + 5) * (1 - ease(f, at + 8, at + 24));
  // beat 2: the note dissolves into digits on "anything … hold"
  const dissolve = ease(f, ANYTHING, HOLD + 10, 0, 1, DL_EASE.inOut);
  const digitsOp = ease(f, ANYTHING - 2, ANYTHING + 10) * (1 - ease(f, HOLD + 6, SO + 4));
  const hand = ease(f, HOLD - 2, HOLD + 10);
  const qmark = ease(f, ACTUALLY - 2, ACTUALLY + 6);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0e1a10" />
      <Vignette />

      {/* ── beat 1: a note in your hand */}
      <AbsoluteFill style={{ opacity: p1 }}>
        {/* LAST TIME · No. 03's closing question */}
        <div style={{ position: 'absolute', left: 120, top: 50, width: 640, padding: '22px 30px', borderRadius: 16, background: '#0b1030e6', border: `2px solid ${DYT.magenta}`, opacity: ease(f, LAST - 2, LAST + 8) * (1 - ease(f, TAKE - 8, TAKE + 2)), transform: `translateY(${ease(f, LAST - 2, LAST + 12, 20, 0)}px)` }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 5, color: DYT.dim }}>LAST TIME · NO. 03<span style={{ opacity: ease(f, QUESTION - 2, QUESTION + 6) }}> · A QUESTION</span></div>
          <div style={{ marginTop: 14, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, lineHeight: 1.2, color: DYT.white }}>
            <span style={{ opacity: ease(f, DID_A - 2, DID_A + 6) }}>Did school ever teach you</span>
            <span style={{ opacity: ease(f, MONEY_A - 2, MONEY_A + 6), color: DL.gold }}> what money actually is?</span>
          </div>
        </div>
        {/* the wallet */}
        <svg width={560} height={330} viewBox="0 0 560 330" style={{ position: 'absolute', left: 680, top: 560, opacity: wallet }}>
          <rect x={10} y={30} width={540} height={290} rx={30} fill="#4a2e18" stroke="#2a1808" strokeWidth={6} />
          <rect x={10} y={30} width={540} height={110} rx={30} fill="#5e3a1e" />
          <circle cx={490} cy={180} r={18} fill="#c8a060" />
        </svg>
        <Label at={WALLET} color={DL.warm} size={28} style={{ position: 'absolute', left: 680, top: 910, opacity: wallet }}>YOUR WALLET</Label>
        {/* the note: three layers that split apart on paper / plastic / ink */}
        <div style={{ position: 'absolute', left: 960 - 270, top: 340 - out * 80 + (1 - out) * (f >= TAKE - 6 ? 150 : 0), transform: `scale(${noteScale}) rotate(${turn * (1 - regroup * 0.5)}deg)`, transformOrigin: 'center center', width: 540 }}>
          {[0, 1, 2].map((k) => {
            const dy = (k - 1) * 120 * (k === 0 ? peel : k === 2 ? peel2 : 0) * (1 - regroup);
            const op = k === 1 ? 1 : ease(f, k === 0 ? PAPER - 4 : PLASTIC - 4, k === 0 ? PAPER + 6 : PLASTIC + 6) * (1 - regroup);
            return (
              <div key={k} style={{ position: k === 1 ? 'relative' : 'absolute', left: 0, top: 0, transform: `translateY(${dy}px)`, opacity: op }}>
                <Banknote w={540} big={d.big} title="Bank of Somewhere" color={k === 0 ? '#f4efe0' : k === 2 ? '#cfe6f2' : d.color} ink={d.ink} />
              </div>
            );
          })}
          {/* three more notes fan out on "few" */}
          {[1, 2, 3].map((k) => (
            <div key={`fan${k}`} style={{ position: 'absolute', left: 0, top: 0, opacity: fan, transform: `rotate(${k * 7 * fan}deg) translate(${k * 30 * fan}px, ${k * 12 * fan}px)`, transformOrigin: '20% 100%', zIndex: -k }}>
              <Banknote w={540} big={d.big} title="Bank of Somewhere" color={d.color} ink={d.ink} />
            </div>
          ))}
        </div>
        {/* layer labels */}
        <div style={{ position: 'absolute', left: 1360, top: 250, display: 'flex', flexDirection: 'column', gap: 70, opacity: 1 - regroup }}>
          <Label at={PAPER} color={DL.text} size={34}>PAPER</Label>
          <Label at={PLASTIC} color={DYT.cyan} size={34}>OR PLASTIC</Label>
          <Label at={INK} color={DL.gold} size={34}>+ A BIT OF INK</Label>
        </div>
        {/* hours of your life: a clock sweeping round */}
        <div style={{ position: 'absolute', left: 160, top: 560, opacity: clockOp, transform: `scale(${1 + 0.06 * pulse(HOURS)})` }}>
          <ClockFace size={300} hourDeg={sweep / 12} minDeg={sweep} />
        </div>
        <div style={{ position: 'absolute', left: 160, top: 880 }}><Label at={HOURS} color={DL.text} size={30}>HOURS<span style={{ opacity: ease(f, LIFE - 2, LIFE + 6) }}> OF YOUR LIFE</span></Label></div>
        <div style={{ position: 'absolute', left: 1360, top: 820 }}><Label at={FEW} color={DL.gold} size={30}>FOR A FEW OF THESE</Label></div>
      </AbsoluteFill>

      {/* ── beat 2: the question */}
      <AbsoluteFill style={{ opacity: p2 }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 110, textAlign: 'center' }}>
          <div style={{ ...rise(f, DID_B), fontFamily: DL_MONO, fontWeight: 700, fontSize: 34, letterSpacing: 10, color: DL.red, textShadow: `0 0 18px ${DL.red}99` }}>DID YOU KNOW THAT…</div>
          <div style={{ marginTop: 22, fontFamily: DL_SERIF, fontSize: 96, color: DL.text }}>
            <span style={{ opacity: ease(f, MOST - 2, MOST + 6) }}>most money</span>
            <span style={{ opacity: ease(f, TODAY - 2, TODAY + 6), color: DL.gold }}> today</span>
          </div>
        </div>
        {/* PAPER ✗ · METAL ✗ */}
        <div style={{ position: 'absolute', left: 230, top: 400, display: 'flex', flexDirection: 'column', gap: 60 }}>
          {([['ISN’T PAPER', PAPER_B, 'note'], ['OR METAL', METAL, 'coin']] as const).map(([t, at, kind]) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 30, opacity: ease(f, at - 2, at + 6) }}>
              <div style={{ position: 'relative' }}>
                {kind === 'note' ? <Banknote w={220} big="£20" /> : <Sovereign size={120} label="£1" />}
                <svg width={kind === 'note' ? 220 : 120} height={kind === 'note' ? 115 : 120} viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, top: 0, opacity: ease(f, at + 4, at + 10) }}>
                  <line x1={8} y1={8} x2={92} y2={92} stroke={DL.red} strokeWidth={8} /><line x1={92} y1={8} x2={8} y2={92} stroke={DL.red} strokeWidth={8} />
                </svg>
              </div>
              <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 44, letterSpacing: 4, color: DL.text }}>{t}</span>
            </div>
          ))}
        </div>
        {/* anything you could ever hold: a note that dissolves into digits over an open hand */}
        <div style={{ position: 'absolute', left: 1080, top: 340, width: 640, height: 600 }}>
          <div style={{ position: 'absolute', left: 140, top: 230, opacity: hand }}><OpenHand size={360} /></div>
          <div style={{ position: 'absolute', left: 120, top: 60, opacity: ease(f, ANYTHING - 4, ANYTHING + 6) * (1 - dissolve), transform: `scale(${1 - 0.2 * dissolve}) translateY(${-40 * dissolve}px)`, filter: `blur(${6 * dissolve}px)` }}><Banknote w={400} big="£20" title="Bank of Somewhere" /></div>
          <Digits w={640} h={600} op={digitsOp} speed={5} cols={12} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: -40, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 300, lineHeight: 1, background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: qmark, transform: `scale(${ease(f, ACTUALLY - 2, ACTUALLY + 10, 1.3, 1)})` }}>?</div>
        </div>
        <div style={{ position: 'absolute', left: 1080, top: 960, width: 640, textAlign: 'center' }}>
          <Label at={ANYTHING} color={DL.dim} size={28} style={{ justifyContent: 'center' }}>OR ANYTHING YOU COULD EVER <span style={{ color: DL.text, opacity: ease(f, HOLD - 2, HOLD + 6) }}>HOLD</span></Label>
        </div>
        <div style={{ position: 'absolute', left: 230, top: 820, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 80, color: DL.gold, opacity: ease(f, SO - 2, SO + 6) }}>
          So what is it, <span style={{ opacity: ease(f, ACTUALLY - 2, ACTUALLY + 6) }}>actually?</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default MoHook;
