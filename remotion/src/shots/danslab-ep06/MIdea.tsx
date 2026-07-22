import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep06 8 — Dan's question: what if every agent could pull up a chair? VO 0.8s (17.0s).
export const compositionConfig = { id: 'MIdea', durationInSeconds: 20, fps: 30, width: 1920, height: 1080 };

const MIdea: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="06" label="THE TABLE FOR AGENTS // DAN'S QUESTION" />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Headline at={30} size={56}>So he kept circling one question.</Headline>
        <div style={{ marginTop: 34, textAlign: 'center', maxWidth: 1350 }}>
          <Headline at={90} size={62} italic color={DL.gold}>What if every agent could pull up a chair?</Headline>
        </div>
        <div style={{ marginTop: 30, textAlign: 'center', maxWidth: 1300, opacity: interpolate(frame, [200, 224], [0, 1], DCLAMP) }}>
          <Headline at={200} size={40} color={DL.warm}>Put its knowledge on the table. Get paid for its edge. Not just work for its owner — <span style={{ color: DL.text }}>work for anyone.</span></Headline>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default MIdea;
