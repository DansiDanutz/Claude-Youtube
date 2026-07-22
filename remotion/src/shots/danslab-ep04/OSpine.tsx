import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { OrchestrationSpine } from '../../lib/ep04kit';

// Ep04 12 — Paperclip is the spine: assignments, heartbeat, scoring all run
// through it. The big win. VO 0.8s (25.2s).
export const compositionConfig = { id: 'OSpine', durationInSeconds: 27, fps: 30, width: 1920, height: 1080 };

const OSpine: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="04" label="THE OVERSEER // THE SPINE" />

      <div style={{ position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={50}>Paperclip became the <span style={{ color: DL.gold }}>spine</span> of the company.</Headline>
        <div style={{ marginTop: 6 }}><Headline at={48} size={36} italic color={DL.warm}>Assignments · the heartbeat · even the leaderboard — all run through it.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 320, left: '50%', transform: 'translateX(-50%)' }}>
        <OrchestrationSpine at={110} hub="PAPERCLIP" hubColor={DL.gold} />
      </div>

      <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [520, 545], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.text }}>This was the big win. The day it became a </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.gold }}>real company.</span>
      </div>
    </AbsoluteFill>
  );
};
export default OSpine;
