import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// Ch8 · the honest close. VO flw22: Stripe not wired — the coin slot is missing.
export const compositionConfig = { id: 'ZMissing', durationInSeconds: 14.5, fps: 30, width: 1920, height: 1080 };

const ITEMS: [string, boolean, number][] = [
  ['The wheel — five live products, connected', true, 90],
  ['The audience engine — proven at 14,000/month', true, 160],
  ['Stripe · checkout · webhook · ledger', false, 250],
];

const ZMissing: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [20, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="11" label="THE FLYWHEEL // FULL HONESTY" />
      <div style={{ position: 'absolute', top: 150, left: 120 }}>
        <div style={{ ...rise(10), fontFamily: DL_SERIF, fontSize: 52, color: DL.text }}>
          Full honesty, like always. <span style={{ color: DL.red, fontStyle: 'italic' }}>What's missing?</span>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 330, left: 120, width: 1400, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {ITEMS.map(([t, ok, at]) => (
          <div key={t} style={{
            ...rise(at), display: 'flex', alignItems: 'center', gap: 24,
            background: DL.panel, border: `1px solid ${ok ? DL.border : DL.red}`,
            borderLeft: `4px solid ${ok ? DL.green : DL.red}`, borderRadius: 14, padding: '20px 30px',
          }}>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: ok ? DL.green : DL.red }}>{ok ? '✓' : '✗'}</span>
            <span style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.text }}>{t}</span>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 130, left: 120, ...rise(340) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>
          The wheel is built. <span style={{ color: DL.red }}>The coin slot isn't.</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
export default ZMissing;
