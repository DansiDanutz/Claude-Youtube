import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { ImageCard } from '../../lib/ep07kit';
import { BetTag } from '../../lib/ep09kit';

// Ep09 — bet no. 3. VO 0.8s (20.0s).
export const compositionConfig = { id: 'PBetHermes', durationInSeconds: 24, fps: 30, width: 1920, height: 1080 };

const PBetHermes: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="09" label="THE BETS // NO. 3" />

      <div style={{ position: 'absolute', top: 150, left: 170, width: 850 }}>
        <div style={{ marginBottom: 26 }}><BetTag n={3} label="AUTHORITY" at={20} /></div>
        <Headline at={50} size={48}>He gave the machine the keys to the day.</Headline>
        <div style={{ marginTop: 28, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 38, color: DL.warm, lineHeight: 1.45, opacity: interpolate(frame, [170, 198], [0, 1], DCLAMP) }}>
          Hermes decides what the company does. Dan kept exactly one thing — deciding what the company is. That split is the whole art.
        </div>
      </div>
      <div style={{ position: 'absolute', top: 250, right: 150 }}>
        <ImageCard src={staticFile('projects/danslab-ep07/ep05a.png')} at={90} w={600} rot={2} />
      </div>
    </AbsoluteFill>
  );
};
export default PBetHermes;
