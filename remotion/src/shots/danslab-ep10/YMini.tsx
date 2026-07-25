import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, StatCard } from '../../lib/ep03kit';
import { ImagePlate } from '../../lib/ep10kit';

// Ch1 · the CEO's desk. VO iron04 8.9 + iron05 6.2. Mac Mini $800 → $22/mo;
// the phone-plan comparison lands at ~11s.
export const compositionConfig = { id: 'YMini', durationInSeconds: 17, fps: 30, width: 1920, height: 1080 };

const YMini: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // THE IRON" />
      <div style={{ position: 'absolute', top: 160, left: 120, width: 800 }}>
        <Headline at={8} size={50}>The <span style={{ color: DL.gold }}>human console.</span></Headline>
        <div style={{ ...rise(70), fontFamily: DL_SANS, fontSize: 30, color: DL.dim, marginTop: 24, lineHeight: 1.5 }}>
          A Mac Mini — Dan's own seat. Where he reads, and says yes or no.
        </div>
        <div style={{ marginTop: 44, display: 'flex', gap: 20 }}>
          <StatCard label="Mac Mini" big="$800" sub="36-month spread" color={DL.dim} at={190} w={320} />
          <StatCard label="Per month" big="$22" sub="CEO's desk" color={DL.gold} at={280} w={320} />
        </div>
        <div style={{ ...rise(390), fontFamily: DL_SANS, fontSize: 30, color: DL.warm, marginTop: 44, lineHeight: 1.5 }}>
          Head office + CEO's desk: <span style={{ fontFamily: DL_MONO, fontWeight: 700, color: DL.gold }}>$175/mo</span> —
          less than a cheap phone plan.
        </div>
      </div>
      <div style={{ position: 'absolute', top: 230, right: 110 }}>
        <ImagePlate src={staticFile('projects/danslab-ep10/02-ceo-desk.png')} at={30} w={820} h={460}
                    caption="the ceo's desk" />
      </div>
    </AbsoluteFill>
  );
};
export default YMini;
