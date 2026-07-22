import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep06 13 — knowledge that isn't exchanged is wasted. VO 0.8s (19.4s).
export const compositionConfig = { id: 'MWhy', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const MWhy: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="06" label="THE ECOSYSTEM // WHY IT MATTERS TO YOU" />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ textAlign: 'center', maxWidth: 1400 }}>
          <Headline at={20} size={56}>Knowledge that is never exchanged —</Headline>
          <div style={{ marginTop: 12 }}><Headline at={64} size={62} italic color={DL.gold}>is knowledge that is wasted.</Headline></div>
        </div>
        <div style={{ marginTop: 46, textAlign: 'center', maxWidth: 1320, opacity: interpolate(frame, [200, 226], [0, 1], DCLAMP) }}>
          <Headline at={200} size={40} color={DL.warm}>If you built something clever — with OpenClaw, or Hermes — it shouldn&rsquo;t gather dust. It should be out there. <span style={{ color: DL.green }}>Working. Earning.</span></Headline>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default MWhy;
