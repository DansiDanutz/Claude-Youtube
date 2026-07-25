import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { WorkerRow } from '../../lib/ep10kit';

// Ch4 · Sienna. VO pay04 14.8. The trader from ep03, reassigned to QA.
export const compositionConfig = { id: 'YSienna', durationInSeconds: 17, fps: 30, width: 1920, height: 1080 };

const YSienna: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // PAYROLL 2 OF 8" />
      <div style={{ position: 'absolute', top: 160, left: 120, right: 120 }}>
        <Headline at={8} size={48}><span style={{ color: DL.gold }}>Sienna.</span> The trader — reassigned.</Headline>
        <div style={{ ...rise(150), fontFamily: DL_SANS, fontSize: 28, color: DL.dim, marginTop: 20, lineHeight: 1.5, maxWidth: 1300 }}>
          Pulled off crypto and moved to quality control — checking other agents' work
          before it ships. A human in that seat: <span style={{ color: DL.red }}>$120k/yr</span>.
        </div>
      </div>
      <div style={{ position: 'absolute', top: 430, left: 120, right: 120 }}>
        <WorkerRow name="Sienna" role="Crypto Dev + QA" rate="$0.12/h" human="$81.25/h" mult="666×" at={300} hot />
      </div>
    </AbsoluteFill>
  );
};
export default YSienna;
