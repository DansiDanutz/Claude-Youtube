import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { Card } from '../../lib/ep06kit';

// Ep06 4 — life is the same game: poker with the cards face down. VO 0.8s (18.2s).
export const compositionConfig = { id: 'MLife', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

// a face-down card back
const Back: React.FC<{ at: number; rot: number; delay?: number }> = ({ at, rot, delay = 0 }) => {
  const frame = useCurrentFrame();
  const t = frame - at - delay;
  const op = interpolate(t, [0, 10], [0, 1], DCLAMP);
  const y = interpolate(t, [0, 12], [50, 0], { ...DCLAMP, easing: DL_EASE.out });
  const float = Math.sin((frame + at * 4) / 42) * 4;
  return (
    <div style={{ opacity: op, transform: `translateY(${y + float}px) rotate(${rot}deg)`, width: 150, height: 210, borderRadius: 14, background: `repeating-linear-gradient(45deg, ${DL.redDeep}, ${DL.redDeep} 8px, #7d2318 8px, #7d2318 16px)`, border: '5px solid #fff', boxShadow: '0 18px 40px rgba(0,0,0,0.5)' }} />
  );
};

const MLife: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="06" label="THE PLAYER // LIFE IS THE SAME GAME" />

      <div style={{ position: 'absolute', top: 200, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={20} size={54}>Dan believes life is the very same game.</Headline>
        <div style={{ marginTop: 12 }}><Headline at={62} size={40} italic color={DL.warm}>Incomplete information. Everyone betting on what they think they know.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 480, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 30 }}>
        <Back at={150} rot={-8} />
        <Back at={150} rot={4} delay={10} />
        <Back at={150} rot={-3} delay={20} />
        <Back at={150} rot={7} delay={30} />
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [320, 344], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>Over the long run, the sharpest knowledge always wins. Life — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.gold }}>just poker, with the cards face down.</span>
      </div>
    </AbsoluteFill>
  );
};
export default MLife;
