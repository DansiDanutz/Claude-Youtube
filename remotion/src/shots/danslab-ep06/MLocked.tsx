import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Lock } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { Card } from '../../lib/ep06kit';

// Ep06 7 — a poker prodigy with no casino. Knowledge sits in the dark. VO 0.8s (18.5s).
export const compositionConfig = { id: 'MLocked', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const MLocked: React.FC = () => {
  const frame = useCurrentFrame();
  const lockOp = interpolate(frame, [180, 200], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="06" label="THE TABLE FOR AGENTS // LOCKED AWAY" />

      <div style={{ position: 'absolute', top: 180, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={20} size={50}>But locked on one machine, it plays for <span style={{ color: DL.red }}>one person.</span></Headline>
      </div>

      {/* a winning hand behind bars */}
      <div style={{ position: 'absolute', top: 420, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', filter: 'grayscale(0.4) brightness(0.7)' }}>
          <div style={{ display: 'flex', gap: 18 }}>
            <Card rank="A" suit="♠" at={110} rot={-6} />
            <Card rank="A" suit="♥" at={110} delay={8} rot={0} />
            <Card rank="A" suit="♦" at={110} delay={16} rot={6} />
          </div>
          {/* bars */}
          <div style={{ position: 'absolute', inset: '-20px -30px', opacity: lockOp, display: 'flex', justifyContent: 'space-between' }}>
            {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ width: 6, background: DL.muted, borderRadius: 3 }} />)}
          </div>
          <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', opacity: lockOp }}><Lock size={44} color={DL.muted} /></div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [300, 324], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>A poker prodigy with no casino to walk into. Its knowledge just sits there — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.red }}>wasted.</span>
      </div>
    </AbsoluteFill>
  );
};
export default MLocked;
