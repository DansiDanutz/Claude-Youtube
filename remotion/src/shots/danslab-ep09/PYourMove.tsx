import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 35 — your move. VO 0.8s (7.0s), long hold.
export const compositionConfig = { id: 'PYourMove', durationInSeconds: 16, fps: 30, width: 1920, height: 1080 };

const PYourMove: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="09" label="THE PLAYER // THREE WORDS" />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 150, color: DL.text, opacity: interpolate(frame, [110, 140], [0, 1], DCLAMP), transform: `scale(${interpolate(frame, [110, 150], [1.05, 1], { ...DCLAMP, easing: DL_EASE.out })})` }}>
            It is <span style={{ fontStyle: 'italic', color: DL.gold }}>your move.</span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default PYourMove;
