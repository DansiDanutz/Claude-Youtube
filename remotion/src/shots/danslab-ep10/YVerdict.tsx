import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// Ch6 close · the verdict. VO audit11 17.1. B+ lands ~1.5s; the three grades on
// their words: economics ~4s, discipline ~6s, resilience ~8s; the C line ~10s.
export const compositionConfig = { id: 'YVerdict', durationInSeconds: 20, fps: 30, width: 1920, height: 1080 };

const GRADES: [string, string, string, number][] = [
  ['Economics', 'A', DL.green, 120],
  ['Operating discipline', 'A−', DL.green, 180],
  ['Resilience', 'C', DL.red, 250],
];

const YVerdict: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 14) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [20, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // THE VERDICT" />
      <div style={{ position: 'absolute', top: 190, left: 120, ...rise(40) }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 6, color: DL.faint }}>MY VERDICT</div>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 230, color: DL.gold, lineHeight: 1 }}>B+</div>
      </div>
      <div style={{ position: 'absolute', top: 240, right: 140, width: 760, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {GRADES.map(([label, g, color, at]) => (
          <div key={label} style={{
            ...rise(at), display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 12, padding: '18px 28px',
          }}>
            <div style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.text }}>{label}</div>
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 44, color }}>{g}</div>
          </div>
        ))}
        <div style={{ ...rise(330), fontFamily: DL_SANS, fontSize: 27, color: DL.warm, marginTop: 10, lineHeight: 1.5 }}>
          The entire distance between “clever” and “a real company” sits inside that
          <span style={{ color: DL.red, fontWeight: 600 }}> C</span> — and it's the cheapest of the three to fix.
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YVerdict;
