import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, Panel } from '../../lib/ep03kit';

// The rules of the episode. VO rules01 24.0. The two-column device is announced:
// what Dan pays vs what a human costs. Reveals land on the words.
export const compositionConfig = { id: 'YRules', durationInSeconds: 26, fps: 30, width: 1920, height: 1080 };

const YRules: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // THE RULES" />
      <div style={{ position: 'absolute', top: 150, left: 120, right: 120 }}>
        <Headline at={8} size={50}>The panel <span style={{ color: DL.gold }}>never resets.</span></Headline>
        <div style={{ ...rise(120), fontFamily: DL_SANS, fontSize: 30, color: DL.dim, marginTop: 22, lineHeight: 1.5, maxWidth: 1240 }}>
          Every piece of this company goes in at cost — and every worker gets a real
          human salary beside them, loaded with tax and benefits.
        </div>
        <div style={{ ...rise(320), fontFamily: DL_MONO, fontSize: 26, color: DL.muted, marginTop: 30, letterSpacing: 1 }}>
          top-right panel · runs the next twenty minutes · never resets
        </div>
      </div>
      {/* the two columns, revealed on "Two columns." ~19.5s */}
      <div style={{ position: 'absolute', top: 480, left: 120, right: 120, display: 'flex', gap: 28 }}>
        <Panel at={560} glow={DL.gold} style={{ flex: 1, padding: '40px 48px' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 6, color: DL.gold }}>COLUMN ONE</div>
          <div style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 46, color: DL.text, marginTop: 16 }}>What Dan pays</div>
        </Panel>
        <Panel at={610} style={{ flex: 1, padding: '40px 48px' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 6, color: DL.red }}>COLUMN TWO</div>
          <div style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 46, color: DL.text, marginTop: 16 }}>What a human costs</div>
        </Panel>
      </div>
    </AbsoluteFill>
  );
};
export default YRules;
