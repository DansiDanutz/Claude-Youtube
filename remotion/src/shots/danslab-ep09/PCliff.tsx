import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 37 — season two tease. VO 0.8s (14.3s).
export const compositionConfig = { id: 'PCliff', durationInSeconds: 20, fps: 30, width: 1920, height: 1080 };

const PCliff: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="09" label="FINALE // NOT THE END" />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Headline at={16} size={54}>A player does not leave the table <span style={{ color: DL.gold }}>while he is running good.</span></Headline>
          <div style={{ marginTop: 40, opacity: interpolate(frame, [260, 290], [0, 1], DCLAMP) }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 6, color: DL.red }}>SEASON TWO</span>
            <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm, marginLeft: 24 }}>is already being dealt.</span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default PCliff;
