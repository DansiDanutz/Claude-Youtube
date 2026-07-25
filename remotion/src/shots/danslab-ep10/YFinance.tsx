import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { WorkerRow } from '../../lib/ep10kit';

// Ch4 · Finance. VO pay07 16.4. The handbook line ("reporting. It's hiding.")
// lands ~9.5s.
export const compositionConfig = { id: 'YFinance', durationInSeconds: 19, fps: 30, width: 1920, height: 1080 };

const YFinance: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // PAYROLL 4 OF 8" />
      <div style={{ position: 'absolute', top: 150, left: 120, right: 120 }}>
        <Headline at={8} size={48}><span style={{ color: DL.gold }}>Finance.</span> Twice a day, unprompted.</Headline>
        <div style={{ ...rise(120), fontFamily: DL_SANS, fontSize: 28, color: DL.dim, marginTop: 20, lineHeight: 1.5, maxWidth: 1300 }}>
          Posts what the company spent and what it earned. A FinOps analyst:
          <span style={{ color: DL.red }}> $95k/yr</span>.
        </div>
        <div style={{ ...rise(280), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm, marginTop: 40 }}>
          The handbook, next to Finance's name: “reporting. <span style={{ color: DL.red }}>It's hiding.</span>”
        </div>
      </div>
      <div style={{ position: 'absolute', top: 560, left: 120, right: 120 }}>
        <WorkerRow name="Finance" role="FinOps Analyst" rate="$0.19/h" human="$64.32/h" mult="342×" at={410} hot />
      </div>
    </AbsoluteFill>
  );
};
export default YFinance;
