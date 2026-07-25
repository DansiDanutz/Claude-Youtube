import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, StatCard } from '../../lib/ep03kit';

// Ch4 open · the attribution method. VO pay01 30.1. "I did not split it eight
// ways, because that would be a lie." Stats land on "seventy-seven jobs" ~21s.
export const compositionConfig = { id: 'YAttrib', durationInSeconds: 32, fps: 30, width: 1920, height: 1080 };

const YAttrib: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // CH.4 — PAYROLL" />
      <div style={{ position: 'absolute', top: 150, left: 120, width: 1400 }}>
        <Headline at={10} size={50}>Not split eight ways. <span style={{ color: DL.gold }}>Attributed.</span></Headline>
        <div style={{ ...rise(260), fontFamily: DL_SANS, fontSize: 30, color: DL.dim, marginTop: 28, lineHeight: 1.55, maxWidth: 1280 }}>
          Every server cost goes to the worker living on that server. Every shared
          subscription is split by how much each worker <span style={{ color: DL.text, fontWeight: 600 }}>actually runs</span> —
          measured off the real schedule.
        </div>
        <div style={{ marginTop: 52, display: 'flex', gap: 22 }}>
          <StatCard label="Live recurring jobs" big="77" sub="the real schedule" color={DL.gold} at={630} w={380} />
          <StatCard label="Executions / month" big="~4,500" sub="measured, not assumed" color={DL.gold} at={700} w={380} />
          <StatCard label="Rates" big="8" sub="real, differentiated — cheapest first" color={DL.dim} at={800} w={380} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YAttrib;
