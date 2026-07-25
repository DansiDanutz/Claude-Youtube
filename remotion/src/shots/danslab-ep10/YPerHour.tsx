import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { Slam } from '../../lib/ep10kit';

// Ch7 close · cost per delivered hour. VO vs08 22.4 + vs09 4.9. The 40% discount
// held; effective hours ~11s; per-hour figures ~17s; the 183× slam ~23s.
export const compositionConfig = { id: 'YPerHour', durationInSeconds: 30, fps: 30, width: 1920, height: 1080 };

const YPerHour: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // PER DELIVERED HOUR" />
      <div style={{ position: 'absolute', top: 140, left: 120 }}>
        <Headline at={8} size={44}>Same 40% discount, held <span style={{ color: DL.gold }}>honestly.</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 280, left: 120, display: 'flex', gap: 60, ...rise(320) }}>
        <div>
          <div style={{ fontFamily: DL_MONO, fontSize: 23, letterSpacing: 5, color: DL.faint }}>EFFECTIVE HOURS DELIVERED</div>
          <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 62, marginTop: 12 }}>
            <span style={{ color: DL.gold }}>2,304</span><span style={{ color: DL.faint }}> vs </span><span style={{ color: DL.red }}>1,221</span>
          </div>
        </div>
        <div style={{ ...rise(520) }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 23, letterSpacing: 5, color: DL.faint }}>COST PER DELIVERED HOUR</div>
          <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 62, marginTop: 12 }}>
            <span style={{ color: DL.red }}>$98.83</span><span style={{ color: DL.faint }}> vs </span><span style={{ color: DL.gold }}>$0.54</span>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 470, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <Slam value="183×" sub="the whole argument — the last number" at={690} />
      </div>
    </AbsoluteFill>
  );
};
export default YPerHour;
