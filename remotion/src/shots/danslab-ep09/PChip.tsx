import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { Card, ChipStack, Felt } from '../../lib/ep06kit';

// Ep09 4 — the chip: Players Poker Club, 25 years. VO 0.8s (18.2s).
export const compositionConfig = { id: 'PChip', durationInSeconds: 24, fps: 30, width: 1920, height: 1080 };

const PChip: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="09" label="THE TABLE // THE CHIP" />

      <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={50}>Twenty-five years <span style={{ color: DL.gold }}>at the table.</span></Headline>
        <div style={{ marginTop: 10, fontFamily: DL_MONO, fontSize: 23, letterSpacing: 3, color: DL.faint }}>PLAYERS POKER CLUB · CO-OWNER</div>
      </div>

      <div style={{ position: 'absolute', top: 330, left: '50%', transform: 'translateX(-50%)' }}>
        <Felt at={60} w={1200} h={430} />
      </div>
      <div style={{ position: 'absolute', top: 430, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 34, alignItems: 'center' }}>
        <ChipStack at={120} count={7} color={DL.red} size={96} />
        <Card rank="A" suit="♠" at={170} w={150} rot={-5} />
        <Card rank="K" suit="♥" at={190} w={150} rot={4} />
        <ChipStack at={140} count={5} color={DL.gold} size={96} />
      </div>

      <div style={{ position: 'absolute', bottom: 84, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [420, 448], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>Not a hobby. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.gold }}>An education.</span>
      </div>
    </AbsoluteFill>
  );
};
export default PChip;
