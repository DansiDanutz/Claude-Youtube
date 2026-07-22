import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 36b — thanks. VO 0.8s (12.0s).
export const compositionConfig = { id: 'PThanks', durationInSeconds: 16, fps: 30, width: 1920, height: 1080 };

const PThanks: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="09" label="FINALE // TO THE SEATS" />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 200px', textAlign: 'center' }}>
        <div>
          <Headline at={16} size={62}>You were not watching this story.</Headline>
          <div style={{ marginTop: 30, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm, lineHeight: 1.45, opacity: interpolate(frame, [86, 110], [0, 1], DCLAMP) }}>You were the table it was played at.</div>
        </div>
      </AbsoluteFill>
      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [240, 266], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.gold }}>Thank you for the seats.</span>
      </div>
    </AbsoluteFill>
  );
};
export default PThanks;
