import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Moon } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep05 17 — most of it happens in the dark, while Dan sleeps. VO 0.8s (16.7s).
export const compositionConfig = { id: 'NNight', durationInSeconds: 19, fps: 30, width: 1920, height: 1080 };

const NNight: React.FC = () => {
  const frame = useCurrentFrame();
  const moonOp = interpolate(frame, [40, 66], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const glow = 0.3 + 0.3 * Math.abs(Math.sin(frame / 28));
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow="#101a2e" />
      <Kicker n="05" label="IT LEARNS // WHILE EVERYONE SLEEPS" />

      <div style={{ position: 'absolute', top: 420, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: moonOp }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: -30, borderRadius: '50%', background: `radial-gradient(circle, ${DL.sky}33, transparent 70%)`, opacity: glow }} />
          <Moon size={120} color={DL.sky} strokeWidth={1.3} />
        </div>
      </div>

      <div style={{ position: 'absolute', top: 200, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={20} size={54}>Most of this happens in the <span style={{ color: DL.sky }}>dark.</span></Headline>
      </div>

      <div style={{ position: 'absolute', bottom: 130, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [170, 195], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>Hermes rewrites a few instructions, sharpens a routine, and puts the fleet to bed a little smarter.</span>
        <div style={{ marginTop: 10 }}><span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.text }}>Morning comes, and the company is better. Nobody had to ask.</span></div>
      </div>
    </AbsoluteFill>
  );
};
export default NNight;
