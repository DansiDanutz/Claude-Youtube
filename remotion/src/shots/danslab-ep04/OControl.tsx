import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { MissionControl } from '../../lib/ep04kit';

// Ep04 9 — Paperclip: one control plane over the whole fleet, always live. VO 0.8s (19.9s).
export const compositionConfig = { id: 'OControl', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const OControl: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="04" label="THE OVERSEER // ONE CONTROL PLANE" />

      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={50}>A single plane, on top of the entire fleet.</Headline>
        <div style={{ marginTop: 6 }}><Headline at={48} size={38} italic color={DL.warm}>Every agent, every project, every task — in one place.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 330, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <MissionControl at={110} rowsAt={150} />
      </div>

      <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [420, 442], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>It doesn&rsquo;t break when OpenClaw updates — it was built to </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.gold }}>govern.</span>
      </div>
    </AbsoluteFill>
  );
};
export default OControl;
