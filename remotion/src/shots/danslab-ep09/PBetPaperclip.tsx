import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { ImageCard } from '../../lib/ep07kit';
import { BetTag } from '../../lib/ep09kit';

// Ep09 — bet no. 2. VO 0.8s (21.5s).
export const compositionConfig = { id: 'PBetPaperclip', durationInSeconds: 25, fps: 30, width: 1920, height: 1080 };

const PBetPaperclip: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="09" label="THE BETS // NO. 2" />

      <div style={{ position: 'absolute', top: 150, left: 170, width: 850 }}>
        <div style={{ marginBottom: 26 }}><BetTag n={2} label="FOLD YOUR OWN HAND" at={20} /></div>
        <Headline at={50} size={48}>Admitting someone else&rsquo;s tool beat his daily rebuild.</Headline>
        <div style={{ marginTop: 28, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 38, color: DL.warm, lineHeight: 1.45, opacity: interpolate(frame, [170, 198], [0, 1], DCLAMP) }}>
          His dashboard broke every morning. The bet was swallowing pride — adopting Paperclip. The overseer episode exists because Dan knew when to fold.
        </div>
      </div>
      <div style={{ position: 'absolute', top: 250, right: 150 }}>
        <ImageCard src={staticFile('projects/danslab-ep09/paperclip.png')} at={90} w={600} rot={2} />
      </div>
    </AbsoluteFill>
  );
};
export default PBetPaperclip;
