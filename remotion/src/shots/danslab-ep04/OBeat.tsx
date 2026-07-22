import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Heart } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep04 16 — Hermes beat OpenClaw. Not with power — with respect. VO 0.8s (19.1s).
export const compositionConfig = { id: 'OBeat', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const RESPECTS = ['the team', 'the work', 'the boss'];

const OBeat: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="04" label="THE BRAIN // IT WON BY RESPECT" />

      <div style={{ position: 'absolute', top: 210, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={20} size={56}>Hermes did what none of the others had done.</Headline>
        <div style={{ marginTop: 12 }}><Headline at={58} size={58} italic color={DL.sky}>It beat OpenClaw — not with power.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 500, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 34 }}>
        {RESPECTS.map((r, i) => {
          const at = 160 + i * 34;
          const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
          const sc = interpolate(frame, [at, at + 20], [0.8, 1], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={r} style={{ opacity: op, transform: `scale(${sc})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, background: DL.panel, border: `1px solid ${DL.sky}44`, borderRadius: 18, padding: '30px 44px', minWidth: 300 }}>
              <Heart size={40} color={DL.sky} fill={DL.sky} />
              <span style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 2, color: DL.faint }}>RESPECT FOR</span>
              <span style={{ fontFamily: DL_SERIF, fontSize: 40, color: DL.text }}>{r}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [340, 362], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>It didn&rsquo;t try to dominate the fleet. It tried to </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.sky }}>understand it.</span>
      </div>
    </AbsoluteFill>
  );
};
export default OBeat;
