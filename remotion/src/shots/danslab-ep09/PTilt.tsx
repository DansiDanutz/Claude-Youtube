import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 31 — tilt. VO 0.8s (26.8s).
export const compositionConfig = { id: 'PTilt', durationInSeconds: 32, fps: 30, width: 1920, height: 1080 };

const PTilt: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="09" label="THE PLAYER // THE WORD THAT DESTROYS PLAYERS" />

      <div style={{ position: 'absolute', top: 200, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 130, letterSpacing: 20, color: DL.red, opacity: interpolate(frame, [30, 56], [0, 1], DCLAMP), transform: `rotate(${interpolate(frame, [30, 90], [0, -3], DCLAMP)}deg)` }}>TILT</div>
        <div style={{ marginTop: 20, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm, opacity: interpolate(frame, [130, 158], [0, 1], DCLAMP) }}>
          the loss gets into your head — and you start playing emotionally.
        </div>
        <div style={{ marginTop: 14, fontFamily: DL_SANS, fontSize: 30, color: DL.dim, opacity: interpolate(frame, [250, 278], [0, 1], DCLAMP) }}>
          bigger, to win it back · faster, to feel better
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 160, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm, opacity: interpolate(frame, [500, 530], [0, 1], DCLAMP) }}>Two dead servers in two days puts most men on tilt.</div>
        <div style={{ marginTop: 16, fontFamily: DL_SERIF, fontSize: 54, color: DL.gold, opacity: interpolate(frame, [700, 734], [0, 1], DCLAMP) }}>The edge was never the cards. <span style={{ fontStyle: 'italic' }}>He does not tilt.</span></div>
      </div>
    </AbsoluteFill>
  );
};
export default PTilt;
