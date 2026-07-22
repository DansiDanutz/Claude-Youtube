import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { Card } from '../../lib/ep06kit';

// Ep09 33b — the open hand. VO 0.8s (24.4s).
export const compositionConfig = { id: 'POpen', durationInSeconds: 30, fps: 30, width: 1920, height: 1080 };

const POpen: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="09" label="THE PLAYER // WHY SHOW THE HAND" />

      <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>Poker players hide their hands. <span style={{ color: DL.gold }}>Dan publishes his.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 330, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 26 }}>
        <Card rank="A" suit="♠" at={90} w={170} rot={-7} />
        <Card rank="A" suit="♥" at={115} w={170} rot={-2} />
        <Card rank="K" suit="♦" at={140} w={170} rot={3} />
        <Card rank="K" suit="♣" at={165} w={170} rot={8} />
      </div>
      <div style={{ position: 'absolute', top: 620, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [200, 226], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.faint }}>THE CODE · THE LOSSES · THE PLAYBOOK · THIS SERIES — FACE UP</span>
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm, opacity: interpolate(frame, [380, 408], [0, 1], DCLAMP) }}>Because the edge was never the secret. It is the speed of execution.</div>
        <div style={{ marginTop: 12, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.gold, opacity: interpolate(frame, [560, 590], [0, 1], DCLAMP) }}>You can copy his cards tomorrow. You cannot copy twenty-five years of knowing when to bet them.</div>
      </div>
    </AbsoluteFill>
  );
};
export default POpen;
