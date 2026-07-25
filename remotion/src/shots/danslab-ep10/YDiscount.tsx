import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ch5 · attacking the number. VO reck05 26.8. The three admissions land as
// strikes ~4s/~7s/~12s; the 40% discount lands on "forty percent" ~21s.
export const compositionConfig = { id: 'YDiscount', durationInSeconds: 29, fps: 30, width: 1920, height: 1080 };

const ADMITS: [string, number][] = [
  ['These agents get stuck.', 110],
  ['Work gets bounced back.', 210],
  ['The fleet ran at 12% of its closure target — their own handbook admits it.', 330],
  ['There is an agent whose entire job is checking the others.', 480],
];

const YDiscount: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 14) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [20, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="10" label="THE PAYROLL // ATTACKING MY OWN NUMBER" />
      <div style={{ position: 'absolute', top: 140, left: 120, right: 120 }}>
        <Headline at={8} size={46}>Let me attack it <span style={{ color: DL.red }}>in front of you.</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 290, left: 120, width: 1200, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {ADMITS.map(([t, at]) => (
          <div key={t} style={{
            ...rise(at), display: 'flex', alignItems: 'center', gap: 20,
            background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${DL.red}`,
            borderRadius: 12, padding: '16px 26px',
          }}>
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 26, color: DL.red }}>✗</div>
            <div style={{ fontFamily: DL_SANS, fontSize: 27, color: DL.text }}>{t}</div>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 130, left: 120, ...rise(640), display: 'flex', alignItems: 'baseline', gap: 30 }}>
        <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 110, color: DL.gold, letterSpacing: -3 }}>40%</span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>
          of a senior human hour. Harsh — and fair.
        </span>
      </div>
    </AbsoluteFill>
  );
};
export default YDiscount;
