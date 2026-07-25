import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP } from '../../lib/danslab';
import { ImageBackdrop } from '../../lib/ep10kit';

// Cold open close · the title. VO open07 4.7. "Tonight, the books — and the two
// places this company is quietly broken."
export const compositionConfig = { id: 'YTonight', durationInSeconds: 7, fps: 30, width: 1920, height: 1080 };

const YTonight: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [24, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <ImageBackdrop src={staticFile('projects/danslab-ep10/07-the-room.png')} dim={0.8} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...rise(4), fontFamily: DL_MONO, fontSize: 26, letterSpacing: 10, color: DL.red, textTransform: 'uppercase' }}>
          Episode 10
        </div>
        <div style={{ ...rise(14), fontFamily: DL_SERIF, fontSize: 150, color: DL.text, marginTop: 24, lineHeight: 1 }}>
          The Payroll
        </div>
        <div style={{ ...rise(64), fontFamily: DL_SANS, fontSize: 34, color: DL.dim, marginTop: 36 }}>
          The books — and the two places this company is quietly <span style={{ color: DL.red }}>broken.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YTonight;
