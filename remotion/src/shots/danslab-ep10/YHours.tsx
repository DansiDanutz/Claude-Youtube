import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ch7 · hours. VO vs06 22.9 + vs07 4.2. Human hours ~14s, agent hours ~19s,
// the 4.7× / one-97th line ~24s.
export const compositionConfig = { id: 'YHours', durationInSeconds: 30, fps: 30, width: 1920, height: 1080 };

const YHours: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // HOURS" />
      <div style={{ position: 'absolute', top: 150, left: 120, right: 120 }}>
        <Headline at={8} size={46}>Where it stops being a <span style={{ color: DL.gold }}>salary argument.</span></Headline>
        <div style={{ ...rise(120), fontFamily: DL_SANS, fontSize: 28, color: DL.dim, marginTop: 22, lineHeight: 1.5, maxWidth: 1340 }}>
          Eight people, 40-hour weeks, minus 25 days holiday and 6 sick — because those
          are real, and they're in every contract.
        </div>
      </div>
      <div style={{ position: 'absolute', top: 440, left: 120, right: 120, display: 'flex', gap: 28 }}>
        <div style={{ ...rise(400), flex: 1, background: DL.panel, border: `1px solid ${DL.border}`, borderTop: `4px solid ${DL.red}`, borderRadius: 16, padding: '34px 44px' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 23, letterSpacing: 5, color: DL.red }}>HUMAN TEAM / MONTH</div>
          <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 96, color: DL.red, letterSpacing: -2, marginTop: 12 }}>1,221 h</div>
        </div>
        <div style={{ ...rise(560), flex: 1, background: DL.panel, border: `1px solid ${DL.border}`, borderTop: `4px solid ${DL.gold}`, borderRadius: 16, padding: '34px 44px' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 23, letterSpacing: 5, color: DL.gold }}>8 AGENTS, 24/7</div>
          <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 96, color: DL.gold, letterSpacing: -2, marginTop: 12 }}>5,760 h</div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 110, left: 120, ...rise(720) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 54, color: DL.warm }}>
          4.7× the hours, for <span style={{ color: DL.gold }}>one ninety-seventh</span> of the cost.
        </span>
      </div>
    </AbsoluteFill>
  );
};
export default YHours;
