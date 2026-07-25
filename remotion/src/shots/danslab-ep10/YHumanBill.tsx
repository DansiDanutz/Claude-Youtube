import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ch7 · the human bill starts. VO vs02 23.8. Payroll lands ~4s; the "payroll is
// never the bill" turn ~9s; the hidden line items tick in on their words.
export const compositionConfig = { id: 'YHumanBill', durationInSeconds: 26, fps: 30, width: 1920, height: 1080 };

const HIDDEN: [string, number][] = [
  ['rents desks', 400], ['buys laptops', 460], ['software seats', 510],
  ['an accountant', 560], ['a payroll service', 610], ['recruits — people leave', 660],
];

const YHumanBill: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 14) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [18, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="10" label="THE PAYROLL // THE HUMAN COMPANY" />
      <div style={{ position: 'absolute', top: 150, left: 120 }}>
        <Headline at={8} size={46}>Start with the <span style={{ color: DL.red }}>human one.</span></Headline>
        <div style={{ ...rise(90), marginTop: 40 }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 5, color: DL.faint }}>PAYROLL, LOADED / MONTH</div>
          <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 120, color: DL.red, letterSpacing: -3, marginTop: 10 }}>
            $109,958
          </div>
        </div>
        <div style={{ ...rise(280), fontFamily: DL_SANS, fontSize: 32, color: DL.warm, marginTop: 30 }}>
          But payroll is <span style={{ color: DL.text, fontWeight: 600 }}>never the bill.</span> A real company also —
        </div>
      </div>
      <div style={{ position: 'absolute', top: 320, right: 140, width: 560, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {HIDDEN.map(([t, at]) => (
          <div key={t} style={{
            ...rise(at), fontFamily: DL_SANS, fontSize: 28, color: DL.dim,
            background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 10, padding: '12px 22px',
          }}>{t}</div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
export default YHumanBill;
