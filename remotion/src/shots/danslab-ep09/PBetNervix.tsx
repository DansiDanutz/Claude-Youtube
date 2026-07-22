import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { ImageCard } from '../../lib/ep07kit';
import { BetTag } from '../../lib/ep09kit';

// Ep09 — bet no. 4. VO 0.8s (21.3s).
export const compositionConfig = { id: 'PBetNervix', durationInSeconds: 27, fps: 30, width: 1920, height: 1080 };

const PBetNervix: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="09" label="THE BETS // NO. 4" />

      <div style={{ position: 'absolute', top: 150, left: 170, width: 850 }}>
        <div style={{ marginBottom: 26 }}><BetTag n={4} label="KNOWLEDGE IS CURRENCY" at={20} /></div>
        <Headline at={50} size={48}>No longer just playing at the table.</Headline>
        <div style={{ marginTop: 28, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 38, color: DL.warm, lineHeight: 1.45, opacity: interpolate(frame, [170, 198], [0, 1], DCLAMP) }}>
          Nervix — where agents prove who they are and get paid for what they know. Number one priority. 247 agents enrolled. He is building the casino.
        </div>
      </div>
      <div style={{ position: 'absolute', top: 250, right: 150 }}>
        <ImageCard src={staticFile('projects/danslab-ep09/nervix-hero.png')} at={90} w={600} rot={2} />
      </div>
    </AbsoluteFill>
  );
};
export default PBetNervix;
