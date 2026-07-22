import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 15 — the bets, introduced. VO 0.8s (16.9s).
export const compositionConfig = { id: 'PBetsIntro', durationInSeconds: 20, fps: 30, width: 1920, height: 1080 };

const PBetsIntro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="09" label="THE BETS // LOOK CLOSER" />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 200px', textAlign: 'center' }}>
        <div>
          <Headline at={16} size={62}>It looks like a stack of product launches. <span style={{ color: DL.gold }}>It is a sequence of bets.</span></Headline>
          <div style={{ marginTop: 30, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm, lineHeight: 1.45, opacity: interpolate(frame, [86, 110], [0, 1], DCLAMP) }}>Placed one at a time. Sized carefully. And placed after reading the table — not before.</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default PBetsIntro;
