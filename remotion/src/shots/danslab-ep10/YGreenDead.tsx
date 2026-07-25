import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ch6 · what June 29 looked like. VO audit08 28.6. Green health rows tick while
// output flatlines; the closing line ("not one pointed at the other end") ~24s.
export const compositionConfig = { id: 'YGreenDead', durationInSeconds: 31, fps: 30, width: 1920, height: 1080 };

const CHECKS: [string, number][] = [
  ['processes up', 130], ['disks fine', 190], ['heartbeats landing', 250], ['122 services healthy', 310],
];

const YGreenDead: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 14) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [18, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="10" label="THE PAYROLL // JUNE 29" />
      <div style={{ position: 'absolute', top: 140, left: 120, right: 120 }}>
        <Headline at={8} size={46}>Every alarm pointed at the <span style={{ color: DL.green }}>machinery.</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 300, left: 120, width: 760, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {CHECKS.map(([t, at]) => (
          <div key={t} style={{
            ...rise(at), display: 'flex', alignItems: 'center', gap: 20,
            background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 12, padding: '16px 24px',
          }}>
            <div style={{ width: 16, height: 16, borderRadius: 8, background: DL.green }} />
            <div style={{ fontFamily: DL_MONO, fontSize: 27, color: DL.text }}>{t}</div>
            <div style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.green, marginLeft: 'auto' }}>OK</div>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', top: 300, right: 130, width: 620, ...rise(430) }}>
        <div style={{ background: DL.panel, border: `1px solid ${DL.red}`, borderRadius: 14, padding: '28px 32px' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 5, color: DL.faint }}>OUTPUT — CLOSURES</div>
          <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 130, color: DL.red, letterSpacing: -3, marginTop: 8 }}>0</div>
          <div style={{ fontFamily: DL_SANS, fontSize: 26, color: DL.dim }}>for days · unnoticed</div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 120, left: 120, right: 120, ...rise(720) }}>
        <div style={{ fontFamily: DL_SANS, fontSize: 32, color: DL.warm, lineHeight: 1.45 }}>
          Not one alarm was pointed at whether anything came out
          <span style={{ color: DL.red, fontWeight: 600 }}> the other end.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YGreenDead;
