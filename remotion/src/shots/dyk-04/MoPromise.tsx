import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { DYT } from '../../lib/dytbrand';
import { makeCue, ease, rise, useShotFade, Vignette } from '../../lib/dykkit';
import { CacaoBean, CopperPlate, Banknote, Sovereign, Phone, Label } from '../../lib/dykkit-money';
import vo from './vo.json';

// =============================================================================
// DYK 04 · 4/14 — the promise. Seven year chips build one per 12 f from "Seven"; 1500 lights on "fifteen", the dashed
// 2100 chip on "twenty". "with money in your hand": the money of each era pops above its chip one per 6 f (a cacao
// bean, a copper plate, a note, a gold coin, a dollar note, a phone, a dashed "?") — just objects, no labels that name
// what money is. "Or on your phone": the TODAY phone glows. "money you could drink": a cup steams over 1500 + YOU COULD
// DRINK IT. "nothing but code": 2100 fills with digits + CODE? on "code". "what money really is": MONEY = ? lands on
// "is" (no answer). VO mo03 @0.6 s.
// =============================================================================
export const compositionConfig = { id: 'MoPromise', durationInSeconds: 17.9, fps: 30, width: 1920, height: 1080 };
const DUR = 537;

const C = makeCue(vo, 'mo03-promise', 0.6);
const SEVEN = C.at('Seven');
const FIFTEEN = C.at('fifteen');
const TWENTY = C.at('twenty');
const EACH = C.at('each');
const WAKE = C.at('wake');
const HAND = C.at('hand');
const PHONE = C.at('phone');
const START = C.at('start');
const DRINK = C.at('drink');
const END1 = C.at('end', 1); // 'You end with money'
const CODE = C.at('code');
const FIND = C.at('end', 2); // 'And at the end' — the row clears here
const MONEY4 = C.at('money', 4); // 'what money really is'
const IS = C.at('is');

const YEARS = ['1500', '1661', '1720', '1821', '1971', 'TODAY', '2100'];
const X0 = 255, STEP = 235;

const Cup: React.FC<{ f: number }> = ({ f }) => (
  <svg width={110} height={110} viewBox="0 0 110 110" style={{ overflow: 'visible' }}>
    {[0, 1, 2].map((k) => <path key={k} d={`M${36 + k * 18} 34 q -8 -12 0 -24 q 8 -12 0 -24`} stroke="#d8c8b0" strokeWidth={4} fill="none" opacity={0.5 + 0.3 * Math.sin(f / 6 + k)} />)}
    <path d="M18 40 L92 40 L84 100 L26 100 Z" fill="#8a5a3a" stroke="#c89a6a" strokeWidth={4} />
    <ellipse cx={55} cy={42} rx={36} ry={8} fill="#4a2a18" />
  </svg>
);

const Icon: React.FC<{ i: number; f: number }> = ({ i, f }) => {
  switch (i) {
    case 0: return <CacaoBean size={110} />;
    case 1: return <CopperPlate w={150} />;
    case 2: return <Banknote w={170} />;
    case 3: return <Sovereign size={100} />;
    case 4: return <Banknote w={170} big="$" color="#dfe8d8" ink="#2a4a3a" />;
    case 5: return <Phone size={150} glow={ease(f, PHONE - 2, PHONE + 8) * (1 - 0.6 * ease(f, PHONE + 20, PHONE + 40))}><div style={{ height: 20, borderRadius: 6, background: DYT.green, opacity: 0.8 }} /></Phone>;
    default: return <div style={{ width: 120, height: 120, borderRadius: 16, border: `3px dashed ${DL.red}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DL_SERIF, fontSize: 80, color: DL.red }}>?</div>;
  }
};

const MoPromise: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const rowOut = 1 - ease(f, FIND - 8, FIND + 4);
  const dawn = ease(f, WAKE - 2, WAKE + 20);
  const code = ease(f, CODE - 4, CODE + 10);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0e1a10" />
      <Vignette />
      <AbsoluteFill style={{ opacity: rowOut }}>
        <div style={{ position: 'absolute', left: 160, right: 160, top: 640, height: 260, borderRadius: '50%', background: `radial-gradient(ellipse at 50% 100%, ${DL.gold}33, transparent 70%)`, opacity: dawn }} />
        <div style={{ ...rise(f, SEVEN), position: 'absolute', left: 0, right: 0, top: 180, textAlign: 'center', fontFamily: DL_MONO, fontSize: 34, letterSpacing: 10, color: DL.dim }}>SEVEN MORNINGS · SEVEN KINDS OF MONEY</div>
        {YEARS.map((y, i) => {
          const at = SEVEN + i * 12;
          const iconAt = HAND + i * 6;
          const future = i === 6;
          const lit = (i === 0 && f >= FIFTEEN) || (future && f >= TWENTY);
          const pulse = ease(f, EACH + i, EACH + i + 5) * (1 - ease(f, EACH + i + 8, EACH + i + 22))
            + (i === 0 ? ease(f, START, START + 5) * (1 - ease(f, START + 8, START + 24)) : 0)
            + (future ? ease(f, END1, END1 + 5) * (1 - ease(f, END1 + 8, END1 + 24)) : 0);
          const x = X0 + i * STEP;
          const s = interpolate(f, [at, at + 8], [0.7, 1], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <React.Fragment key={y}>
              <div style={{ position: 'absolute', left: x - 90, top: 800, width: 180, textAlign: 'center', opacity: ease(f, at, at + 6), transform: `scale(${s * (1 + 0.12 * pulse)})`, padding: '14px 0', borderRadius: 12, border: `3px ${future ? 'dashed' : 'solid'} ${future ? DL.red : lit ? DL.gold : DL.border}`, background: lit ? '#1a1406' : DL.panel, fontFamily: DL_SERIF, fontSize: 46, color: future ? DL.red : lit ? DL.gold : DL.text, boxShadow: lit ? `0 0 26px ${future ? DL.red : DL.gold}66` : undefined }}>{y}</div>
              <div style={{ position: 'absolute', left: x - 90, top: 560, width: 180, height: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', opacity: ease(f, iconAt, iconAt + 6), transform: `translateY(${ease(f, iconAt, iconAt + 10, 20, 0)}px) scale(1.4)`, transformOrigin: 'bottom center' }}>
                <Icon i={i} f={f} />
              </div>
            </React.Fragment>
          );
        })}
        {/* 1500: money you could drink */}
        <div style={{ position: 'absolute', left: X0 - 130, top: 330, width: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: ease(f, DRINK - 2, DRINK + 8) }}>
          <Cup f={f} />
          <Label at={DRINK} color={DL.gold} size={26}>YOU COULD DRINK IT</Label>
        </div>
        {/* 2100: nothing but code */}
        <div style={{ position: 'absolute', left: X0 + 6 * STEP - 150, top: 330, width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: code }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 34, lineHeight: 1.1, color: DYT.cyan, textAlign: 'center', textShadow: `0 0 14px ${DYT.cyan}` }}>{['10110', '01101', '11010'].map((r, k) => <div key={k} style={{ opacity: ease(f, CODE + k * 3, CODE + k * 3 + 6) }}>{r}</div>)}</div>
          <Label at={CODE} color={DYT.cyan} size={26}>NOTHING BUT CODE?</Label>
        </div>
      </AbsoluteFill>
      {/* the promise: what money is — revealed only in MoReveal */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: ease(f, FIND - 4, FIND + 6) }}>
        <div style={{ ...rise(f, FIND - 2), fontFamily: DL_MONO, fontSize: 32, letterSpacing: 10, color: DL.dim }}>AT THE END</div>
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'baseline', gap: 36 }}>
          <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 180, color: DL.text, opacity: ease(f, MONEY4 - 2, MONEY4 + 6) }}>MONEY</span>
          <span style={{ fontFamily: DL_SERIF, fontSize: 180, color: DL.gold, opacity: ease(f, IS - 2, IS + 6), transform: `scale(${ease(f, IS - 2, IS + 10, 1.3, 1)})`, display: 'inline-block' }}>= ?</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default MoPromise;
