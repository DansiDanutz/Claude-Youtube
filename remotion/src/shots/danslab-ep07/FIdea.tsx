import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { StationLine } from '../../lib/ep07kit';

// Ep07 4 — he didn't build an editor, he built a line. VO 0.8s (10.2s).
export const compositionConfig = { id: 'FIdea', durationInSeconds: 13, fps: 30, width: 1920, height: 1080 };

const STATIONS = ['SCRIPT', 'VOICE', 'SCENES', 'RENDER', 'ASSEMBLE', 'DELIVER'];

const FIdea: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="07" label="THE MACHINE // A PRODUCTION LINE" />

      <div style={{ position: 'absolute', top: 190, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={50}>So Dexter didn&rsquo;t build an editor.</Headline>
        <div style={{ marginTop: 8 }}><Headline at={48} size={54} italic color={DL.gold}>He built a factory.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 470, left: '50%', transform: 'translateX(-50%)' }}>
        <StationLine stations={STATIONS} at={90} w={1560} />
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [250, 274], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>One idea in at one end — a finished 4K film out the other.</span>
      </div>
    </AbsoluteFill>
  );
};
export default FIdea;
