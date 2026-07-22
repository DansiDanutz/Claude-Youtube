import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { FoldedRow } from '../../lib/ep09kit';

// Ep09 — the folds. VO 0.8s (22.8s).
export const compositionConfig = { id: 'PFolds', durationInSeconds: 26, fps: 30, width: 1920, height: 1080 };

const PFolds: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="09" label="THE BETS // THE HANDS YOU NEVER SAW" />

      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>And the graveyard of <span style={{ color: DL.red }}>almosts.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 300, left: '50%', transform: 'translateX(-50%)' }}>
        <FoldedRow text="dashboards abandoned mid-build" at={80} />
        <FoldedRow text="models tested — and banned from the fleet for wasting money" at={150} />
        <FoldedRow text="automation loops paused the day they flooded the board" at={220} />
      </div>

      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm, opacity: interpolate(frame, [400, 428], [0, 1], DCLAMP) }}>That graveyard is not failure. That graveyard is the discipline.</div>
        <div style={{ marginTop: 12, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.gold, opacity: interpolate(frame, [560, 590], [0, 1], DCLAMP) }}>Measured by what they refuse to play.</div>
      </div>
    </AbsoluteFill>
  );
};
export default PFolds;
