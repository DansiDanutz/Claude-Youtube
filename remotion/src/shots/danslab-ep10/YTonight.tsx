import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP } from '../../lib/danslab';
import { ImageBackdrop } from '../../lib/ep10kit';

// Cold open close · the promise. VO open07 4.7 at +3.2s: "Tonight, the books —
// and the two places this company is quietly broken." No title repeat here —
// the title already ran in YIntro; this card sets the stakes over the dark room.
// 9.4s exactly: absorbs the removed 2.4s episode-montage so the timeline holds.
export const compositionConfig = { id: 'YTonight', durationInSeconds: 9.4, fps: 30, width: 1920, height: 1080 };

const YTonight: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [24, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <ImageBackdrop src={staticFile('projects/danslab-ep10/07-the-room.png')} dim={0.8} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ ...rise(40), fontFamily: DL_MONO, fontSize: 26, letterSpacing: 10, color: DL.red, textTransform: 'uppercase' }}>
          Tonight
        </div>
        {/* lands with the VO: "the books —" (~3.4s) "…quietly broken." (~6s) */}
        <div style={{ ...rise(100), fontFamily: DL_SERIF, fontSize: 74, color: DL.text, marginTop: 34, lineHeight: 1.3, maxWidth: 1500 }}>
          The books —
        </div>
        <div style={{ ...rise(168), fontFamily: DL_SERIF, fontSize: 74, color: DL.text, lineHeight: 1.3, maxWidth: 1500 }}>
          and the two places this company is quietly <span style={{ fontStyle: 'italic', color: DL.red }}>broken.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YTonight;
