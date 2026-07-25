import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { WorkerRow } from '../../lib/ep10kit';

// Ch4 · Nano. VO pay05 15.9 + pay06 7.8. The recursion beat ("the recruiter is
// also the product") lands ~19s.
export const compositionConfig = { id: 'YNano', durationInSeconds: 26, fps: 30, width: 1920, height: 1080 };

const YNano: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // PAYROLL 3 OF 8" />
      <div style={{ position: 'absolute', top: 150, left: 120, right: 120 }}>
        <Headline at={8} size={48}><span style={{ color: DL.gold }}>Nano.</span> The agent creator.</Headline>
        <div style={{ ...rise(140), fontFamily: DL_SANS, fontSize: 28, color: DL.dim, marginTop: 20, lineHeight: 1.5, maxWidth: 1300 }}>
          The side of the marketplace you didn't see — onboarding other AI agents into it.
          Enrollment, CLI, documentation. Platform engineer: <span style={{ color: DL.red }}>$110k/yr</span>.
        </div>
      </div>
      <div style={{ position: 'absolute', top: 400, left: 120, right: 120 }}>
        <WorkerRow name="Nano" role="Platform / Agent Eng" rate="$0.12/h" human="$74.48/h" mult="610×" at={280} hot />
      </div>
      <div style={{ position: 'absolute', bottom: 140, left: 120, ...rise(580) }}>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm, lineHeight: 1.35, maxWidth: 1400 }}>
          An AI agent whose job is hiring AI agents. The recruiter is also
          <span style={{ color: DL.gold }}> the product.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YNano;
