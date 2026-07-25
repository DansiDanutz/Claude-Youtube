import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { WorkerRow } from '../../lib/ep10kit';

// Ch4 · Doctor. VO pay09 36.5. On-call rules land as log lines on their words:
// restart ~9s, escalate-with-exact-line ~14s, disk 85% ~24s. Row lands ~32s.
export const compositionConfig = { id: 'YDoctor', durationInSeconds: 39, fps: 30, width: 1920, height: 1080 };

const RULES: [string, string, number][] = [
  ['every 15 min', 'error state → Doctor restarts it', 270],
  ['fails twice', "escalate to Dan's phone — the exact error line", 430],
  ['disk > 85%', 'maintenance runs before a human ever knows', 720],
];

const YDoctor: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="10" label="THE PAYROLL // PAYROLL 6 OF 8" />
      <div style={{ position: 'absolute', top: 150, left: 120, right: 120 }}>
        <Headline at={8} size={48}><span style={{ color: DL.gold }}>Doctor.</span> On call. Every fifteen minutes. <span style={{ color: DL.red }}>Forever.</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 300, left: 120, width: 1300, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {RULES.map(([trig, action, at]) => (
          <div key={trig} style={{
            ...rise(at), display: 'flex', alignItems: 'center', gap: 26,
            background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${DL.red}`,
            borderRadius: 14, padding: '20px 28px',
          }}>
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: DL.red, width: 260 }}>{trig}</div>
            <div style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.text }}>{action}</div>
          </div>
        ))}
        <div style={{ ...rise(880), fontFamily: DL_SANS, fontSize: 26, color: DL.dim, marginTop: 6 }}>
          An SRE with genuine 24/7 on-call: <span style={{ color: DL.red }}>$140k/yr</span>.
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 120, left: 120, right: 120 }}>
        <WorkerRow name="Doctor" role="SRE, on-call owner" rate="$0.28/h" human="$94.79/h" mult="336×" at={960} hot />
      </div>
    </AbsoluteFill>
  );
};
export default YDoctor;
