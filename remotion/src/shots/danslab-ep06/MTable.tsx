import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep06 5 — a player is nothing without a table. VO 0.8s (17.0s).
export const compositionConfig = { id: 'MTable', durationInSeconds: 20, fps: 30, width: 1920, height: 1080 };

const MTable: React.FC = () => {
  const frame = useCurrentFrame();
  const emptyOp = interpolate(frame, [140, 170], [0.15, 0.5], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="06" label="THE PLAYER // NO TABLE, NO GAME" />

      <div style={{ position: 'absolute', top: 210, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={20} size={54}>But a player is nothing without a <span style={{ color: DL.gold }}>table.</span></Headline>
      </div>

      {/* an empty felt outline — the missing table */}
      <div style={{ position: 'absolute', top: 440, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: emptyOp }}>
        <div style={{ width: 900, height: 320, borderRadius: 160, border: `3px dashed ${DL.muted}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 6, color: DL.faint }}>NO TABLE</span>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [300, 324], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>No table, no pot — and no way to turn what you know, </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.text }}>into what you earn.</span>
      </div>
    </AbsoluteFill>
  );
};
export default MTable;
