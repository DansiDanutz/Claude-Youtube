import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, Chip } from '../../lib/ep03kit';

// Ep04 3 — the hard part was never code; it's orchestration. VO 0.8s (27.0s).
export const compositionConfig = { id: 'OCeo', durationInSeconds: 29, fps: 30, width: 1920, height: 1080 };

const OCeo: React.FC = () => {
  const frame = useCurrentFrame();
  const vsOp = interpolate(frame, [300, 320], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="04" label="THE FOUNDER // ORCHESTRATION" />

      <div style={{ position: 'absolute', top: 210, left: 130, right: 130 }}>
        <Headline at={20} size={56}>The hard part was never the code.</Headline>
        <div style={{ marginTop: 12 }}><Headline at={58} size={56} italic color={DL.gold}>Anyone can hire a coder.</Headline></div>
        <div style={{ marginTop: 30 }}><Headline at={110} size={46} color={DL.text}>The hard part is <span style={{ color: DL.warm, fontStyle: 'italic' }}>orchestration</span> — who does what, when, and why.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 560, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 16 }}>
        <Chip at={210} color={DL.sky}>machines never tire</Chip>
        <Chip at={235} color={DL.gold}>never get distracted</Chip>
        <Chip at={260} color={DL.green}>never afraid</Chip>
      </div>

      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', opacity: vsOp }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 48, color: DL.warm }}>Wonderful — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 48, color: DL.red }}>until nobody is steering.</span>
      </div>
    </AbsoluteFill>
  );
};
export default OCeo;
