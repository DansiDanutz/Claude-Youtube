import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 2 — the promise. VO 0.8s (8.8s).
export const compositionConfig = { id: 'PPromise', durationInSeconds: 12, fps: 30, width: 1920, height: 1080 };

const PPromise: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="09" label="FINALE // WHY THIS ONE IS LONG" />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 200px', textAlign: 'center' }}>
        <div>
          <Headline at={14} size={62}>The story <span style={{ color: DL.gold }}>all the others come from.</span></Headline>
          <div style={{ marginTop: 30, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm, lineHeight: 1.45, opacity: interpolate(frame, [84, 108], [0, 1], DCLAMP) }}>Not the machines, this time. The man.</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default PPromise;
