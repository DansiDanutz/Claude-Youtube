import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_EASE, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, Vignette, ClockFace } from '../../lib/dykkit';
import { Banknote, QGRAD } from '../../lib/dykkit-money';
import vo from './vo.json';

// =============================================================================
// DYK 04 · 13/14 — close inside the viewer. A clock sweeps while notes stack up from "spend" (your working hours turned
// into money — illustration, no number); "so much of your life earning it" builds on its words; the stack dims on "So
// tell me", then the direct question: "Who would you trust" / "to keep that promise" (gradient on "promise") / "in 2100?"
// lands on "hundred". VO mo12 @0.6 s; 1.4 s question beat after.
// =============================================================================
export const compositionConfig = { id: 'MoClose', durationInSeconds: 9.6667, fps: 30, width: 1920, height: 1080 };
const DUR = 290;

const C = makeCue(vo, 'mo12-close', 0.6);
const SPEND = C.at('spend');
const LIFE = C.at('life');
const EARNING = C.at('earning');
const SO = C.at('So', 2); // 'So tell me' (1 = 'so much')
const WHO = C.at('Who');
const TRUST = C.at('trust');
const PROMISE = C.at('promise');
const TWENTY = C.at('twenty');
const HUNDRED = C.at('hundred');

const MoClose: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR, 2, 4);
  const wall = ease(f, 0, 10) * (1 - ease(f, SO, SO + 14, 0, 0.8, DL_EASE.in)) * (1 - ease(f, WHO - 6, WHO + 4));
  const stack = Math.floor(ease(f, SPEND - 2, EARNING + 10, 0, 10));
  const sweep = (f - SPEND) * 18;
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0e1a10" />
      <Vignette />
      <AbsoluteFill style={{ opacity: wall, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 100 }}>
          <ClockFace size={300} hourDeg={sweep / 12} minDeg={sweep} />
          <div style={{ position: 'relative', width: 380, height: 360 }}>
            {Array.from({ length: stack }, (_, i) => <div key={i} style={{ position: 'absolute', left: (i % 3) * 8, bottom: i * 26 }}><Banknote w={340} big="£" /></div>)}
          </div>
        </div>
        <div style={{ marginTop: 44, fontFamily: DL_SERIF, fontSize: 64, color: DL.text, display: 'flex', gap: 18 }}>
          <span style={rise(f, SPEND - 1)}>So much</span>
          <span style={rise(f, LIFE - 1)}>of your life</span>
          <span style={{ ...rise(f, EARNING - 1), color: DL.gold }}>earning it.</span>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: ease(f, WHO - 4, WHO + 8) }}>
        <div style={{ ...rise(f, WHO), width: 1500, textAlign: 'center', fontFamily: DL_SERIF, fontWeight: 500, fontSize: 96, lineHeight: 1.15, color: DL.text }}>
          Who would you <span style={{ opacity: ease(f, TRUST - 2, TRUST + 6) }}>trust</span>{' '}
          <span style={{ opacity: ease(f, PROMISE - 6, PROMISE + 4) }}>to keep that </span>
          <span style={{ display: 'inline-block', background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: ease(f, PROMISE - 2, PROMISE + 6) }}>promise,</span>{' '}
          <span style={{ color: DL.gold, fontStyle: 'italic', opacity: ease(f, TWENTY - 2, TWENTY + 6) }}>in <span style={{ opacity: ease(f, HUNDRED - 2, HUNDRED + 6), textShadow: `0 0 ${28 * ease(f, HUNDRED, HUNDRED + 20)}px ${DL.gold}` }}>2100?</span></span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default MoClose;
