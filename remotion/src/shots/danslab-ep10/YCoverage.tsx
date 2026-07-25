import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ch5 · the coverage correction. VO reck03 18.9. It's a lie because it's TOO LOW:
// 160 human hours vs 720 agent hours. Bars land on their numbers ~5s and ~8s.
export const compositionConfig = { id: 'YCoverage', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const YCoverage: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  const bar = (at: number, to: number) => interpolate(f, [at, at + 34], [0, to], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // WHY 89× IS TOO LOW" />
      <div style={{ position: 'absolute', top: 150, left: 120, right: 120 }}>
        <Headline at={10} size={48}>The lie runs the <span style={{ color: DL.gold }}>other way.</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 330, left: 120, width: 1500, display: 'flex', flexDirection: 'column', gap: 44 }}>
        <div style={{ ...rise(130) }}>
          <div style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.dim }}>A human works, per month</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 14 }}>
            <div style={{ height: 52, width: bar(150, 300), background: DL.panel2, border: `1px solid ${DL.border}`, borderRadius: 10 }} />
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 48, color: DL.red }}>160 h</div>
          </div>
        </div>
        <div style={{ ...rise(230) }}>
          <div style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.dim }}>These agents run</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 14 }}>
            <div style={{ height: 52, width: bar(250, 1350), background: 'rgba(212,160,23,0.25)', border: `1px solid ${DL.gold}`, borderRadius: 10 }} />
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 48, color: DL.gold }}>720 h</div>
          </div>
        </div>
        <div style={{ ...rise(400), fontFamily: DL_SANS, fontSize: 30, color: DL.warm, lineHeight: 1.5, maxWidth: 1360 }}>
          4.5× the coverage. Matching it with people means <span style={{ color: DL.red, fontWeight: 600 }}>shifts</span> —
          and shifts mean more headcount, not the same headcount working harder.
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YCoverage;
