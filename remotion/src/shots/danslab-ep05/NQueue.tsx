import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { PriorityQueue } from '../../lib/ep05kit';

// Ep05 9 — the day re-orders itself, every few minutes. VO 0.8s (20.3s).
export const compositionConfig = { id: 'NQueue', durationInSeconds: 23, fps: 30, width: 1920, height: 1080 };

const NQueue: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="05" label="HOW IT THINKS // THE PLAN BREATHES" />

      <div style={{ position: 'absolute', top: 150, left: 130, right: 700 }}>
        <Headline at={20} size={50}>Every few minutes, the day quietly <span style={{ color: DL.gold }}>re-orders itself.</span></Headline>
        <div style={{ marginTop: 20 }}><Headline at={70} size={36} italic color={DL.warm}>The urgent trade slides down. A user problem jumps to the top. A blocked task waits.</Headline></div>
        <div style={{ marginTop: 40, opacity: interpolate(frame, [420, 445], [0, 1], DCLAMP) }}>
          <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.sky }}>The plan is never frozen. It breathes — with the market, and the moment.</span>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 300, right: 160 }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.faint, marginBottom: 20 }}>PRIORITY QUEUE · RE-RANKING</div>
        <PriorityQueue at={110} />
      </div>
    </AbsoluteFill>
  );
};
export default NQueue;
