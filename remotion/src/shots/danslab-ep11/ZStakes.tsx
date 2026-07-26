import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP } from '../../lib/danslab';
import { ImageBackdrop } from '../../lib/ep10kit';

// Stakes. VO flw04: curiosity → business; the map is on the table.
export const compositionConfig = { id: 'ZStakes', durationInSeconds: 15, fps: 30, width: 1920, height: 1080 };

const ZStakes: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [24, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <ImageBackdrop src={staticFile('projects/danslab-ep10/07-the-room.png')} dim={0.82} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ ...rise(30), fontFamily: DL_MONO, fontSize: 26, letterSpacing: 10, color: DL.red, textTransform: 'uppercase' }}>
          Season two · Episode one
        </div>
        <div style={{ ...rise(90), fontFamily: DL_SERIF, fontSize: 70, color: DL.text, marginTop: 34, lineHeight: 1.3, maxWidth: 1500 }}>
          The company stops being a <span style={{ color: DL.muted, fontStyle: 'italic' }}>curiosity</span> —
        </div>
        <div style={{ ...rise(170), fontFamily: DL_SERIF, fontSize: 70, color: DL.text, lineHeight: 1.3 }}>
          and starts being a <span style={{ color: DL.gold, fontStyle: 'italic' }}>business.</span>
        </div>
        <div style={{ ...rise(280), fontFamily: DL_SANS, fontSize: 30, color: DL.warm, marginTop: 40 }}>
          The books are open. The map is on the table.
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default ZStakes;
