import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// The honesty rule. VO rules02 21.0. "I'm going to attack my own maths — publicly."
export const compositionConfig = { id: 'YHonest', durationInSeconds: 23, fps: 30, width: 1920, height: 1080 };

const YHonest: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="10" label="THE PAYROLL // ONE RULE" />
      <div style={{ position: 'absolute', top: 200, left: 120, width: 1400 }}>
        <Headline at={30} size={54}>
          Build the savings number honestly — then <span style={{ color: DL.red }}>attack it.</span>
        </Headline>
        <div style={{ ...rise(190), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm, marginTop: 56, lineHeight: 1.4, maxWidth: 1300 }}>
          “Only the number I can defend is left standing. It will be smaller than the
          one you'd put in a thumbnail. It's the only one worth anything.”
        </div>
        <div style={{ ...rise(520), fontFamily: DL_MONO, fontSize: 28, letterSpacing: 6, color: DL.gold, marginTop: 70, textTransform: 'uppercase' }}>
          Start with the iron →
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YHonest;
