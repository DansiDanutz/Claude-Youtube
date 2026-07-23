import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 33c — the flywheel: products built to be used by strangers, funds the build (pre-revenue). VO 0.8s (~28s).
export const compositionConfig = { id: 'PFlywheel', durationInSeconds: 38, fps: 30, width: 1920, height: 1080 };

const PRODUCTS = ['the trader', 'the marketplace', 'the war room', 'the factory'];
const PLAN: [string, string][] = [
  ['NERVIX', 'will take its cut'],
  ['AD NOW', 'will sell the seat'],
  ['THE FACTORY', 'will open a channel'],
];

const PFlywheel: React.FC = () => {
  const frame = useCurrentFrame();
  const planOp = interpolate(frame, [300, 326], [0, 1], DCLAMP);
  const punch = interpolate(frame, [620, 646], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="09" label="THE STAKE // BUILT TO BE USED" />
      <div style={{ position: 'absolute', top: 128, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={46}>The whole machine is designed to <span style={{ color: DL.gold }}>pay for itself.</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 296, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 16 }}>
        {PRODUCTS.map((p, i) => {
          const a = 90 + i * 22; const op = interpolate(frame, [a, a + 16], [0, 1], DCLAMP);
          return <div key={p} style={{ opacity: op, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 999, padding: '10px 24px' }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 26, color: DL.text }}>{p}</span>
          </div>;
        })}
      </div>
      <div style={{ position: 'absolute', top: 372, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [200, 226], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 30, color: DL.warm }}>not trophies — products, built to be used by strangers</span>
      </div>
      <div style={{ position: 'absolute', top: 468, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 22, opacity: planOp }}>
        {PLAN.map(([tag, desc], i) => {
          const a = 320 + i * 26; const op = interpolate(frame, [a, a + 16], [0, 1], DCLAMP);
          return <div key={tag} style={{ opacity: op, width: 360, background: DL.panel, border: `1px solid ${DL.gold}44`, borderRadius: 14, padding: '20px 22px', textAlign: 'center' }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 19, letterSpacing: 2, color: DL.gold, marginBottom: 8 }}>{tag}</div>
            <div style={{ fontFamily: DL_SERIF, fontSize: 26, color: DL.text }}>{desc}</div>
          </div>;
        })}
      </div>
      <div style={{ position: 'absolute', top: 682, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [430, 456], [0, 1], DCLAMP) }}>
        <div style={{ display: 'inline-block', background: `${DL.gold}12`, border: `1px dashed ${DL.gold}66`, borderRadius: 999, padding: '10px 26px' }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 2, color: DL.gold }}>PAYMENTS SHIP NEXT · THEN THE METER IS ON</span>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 72, left: 0, right: 0, textAlign: 'center', opacity: punch }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 40, color: DL.text }}>Survival, bet on other people </span>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 40, color: DL.gold }}>winning with its tools.</span>
      </div>
    </AbsoluteFill>
  );
};
export default PFlywheel;
