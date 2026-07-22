import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { Felt, Card, ChipStack } from '../../lib/ep06kit';

// Ep06 3 — the poker table: you get paid for what you KNOW. VO 0.8s (18.7s).
export const compositionConfig = { id: 'MPoker', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const MPoker: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow="#0e5a3a" />
      <Kicker n="06" label="THE PLAYER // WHAT A TABLE TEACHES YOU" />

      <div style={{ position: 'absolute', top: 130, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={16} size={50}>Nobody pays you for showing up.</Headline>
        <div style={{ marginTop: 8 }}><Headline at={50} size={54} italic color={DL.gold}>You get paid for what you <span style={{ color: DL.text }}>know.</span></Headline></div>
      </div>

      {/* felt + community cards + chips */}
      <div style={{ position: 'absolute', top: 350, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative' }}>
          <Felt at={90} w={1280} h={420} />
          <div style={{ position: 'absolute', top: 120, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 22 }}>
            <Card rank="A" suit="♠" at={130} rot={-4} />
            <Card rank="K" suit="♥" at={130} delay={8} rot={2} />
            <Card rank="Q" suit="♠" at={130} delay={16} rot={-2} />
            <Card rank="J" suit="♦" at={130} delay={24} rot={3} />
            <Card rank="10" suit="♠" at={130} delay={32} rot={-3} />
          </div>
          <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 26 }}>
            <ChipStack at={200} count={6} color={DL.red} />
            <ChipStack at={210} count={5} color={DL.gold} />
            <ChipStack at={220} count={7} color={DL.green} />
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [380, 402], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>Read the table better than everyone else — and the pot slides to you.</span>
      </div>
    </AbsoluteFill>
  );
};
export default MPoker;
