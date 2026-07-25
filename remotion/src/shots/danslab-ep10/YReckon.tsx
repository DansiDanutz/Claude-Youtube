import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ch5 open · the reckoning. VO reck01 14.3. $109,958 counts up on the words
// ~5s; the $1,242 answer lands on "Dan pays" ~12s.
export const compositionConfig = { id: 'YReckon', durationInSeconds: 16, fps: 30, width: 1920, height: 1080 };

const YReckon: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = interpolate(f, [140, 200], [0, 109958], { ...DCLAMP, easing: DL_EASE.inOut });
  const s = spring({ frame: f - 350, fps, config: { damping: 200, mass: 0.6 } });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="10" label="THE PAYROLL // THE NUMBER" />
      <div style={{ position: 'absolute', top: 160, left: 120 }}>
        <Headline at={10} size={50}>So. <span style={{ color: DL.gold }}>The number.</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 330, left: 120, right: 120, display: 'flex', gap: 60, alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 5, color: DL.faint }}>8 HUMANS, LOADED / MONTH</div>
          <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 130, color: DL.red, letterSpacing: -3, marginTop: 14 }}>
            ${Math.round(c).toLocaleString('en-US')}
          </div>
          <div style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim, marginTop: 8 }}>$1.3M a year</div>
        </div>
        <div style={{ opacity: interpolate(f, [350, 366], [0, 1], DCLAMP), transform: `scale(${0.94 + s * 0.06})` }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 5, color: DL.faint }}>DAN PAYS</div>
          <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 130, color: DL.gold, letterSpacing: -3, marginTop: 14 }}>
            $1,242
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YReckon;
