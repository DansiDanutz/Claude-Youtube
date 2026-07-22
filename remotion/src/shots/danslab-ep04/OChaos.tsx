import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep04 7 — supervising one is hard; four is almost impossible. Chaos. VO 0.8s (22.8s).
export const compositionConfig = { id: 'OChaos', durationInSeconds: 25, fps: 30, width: 1920, height: 1080 };

const FLEET = [
  { f: 'dexter.jpg', c: DL.green, x: -420, y: -40 },
  { f: 'memo.jpg', c: DL.sky, x: 380, y: 30 },
  { f: 'nano.png', c: DL.gold, x: -320, y: 200 },
  { f: 'sienna.jpg', c: DL.red, x: 420, y: 220 },
];

const OChaos: React.FC = () => {
  const frame = useCurrentFrame();
  const scatter = interpolate(frame, [150, 220], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="04" label="THE PROBLEM // FOUR AT ONCE" />

      <div style={{ position: 'absolute', top: 150, left: 130, right: 130, zIndex: 3, textAlign: 'center' }}>
        <Headline at={20} size={52}>Supervising one OpenClaw is already hard.</Headline>
        <div style={{ marginTop: 8 }}><Headline at={54} size={58} italic color={DL.red}>Now imagine four.</Headline></div>
      </div>

      {/* scattered agents drifting in 4 directions */}
      <div style={{ position: 'absolute', top: 560, left: '50%' }}>
        {FLEET.map((a, i) => {
          const op = interpolate(frame, [150 + i * 8, 170 + i * 8], [0, 1], DCLAMP);
          const drift = Math.sin((frame + i * 40) / 9) * 14;
          const rot = Math.sin((frame + i * 25) / 11) * 8;
          return (
            <div key={a.f} style={{ position: 'absolute', left: a.x * scatter, top: a.y * scatter + drift, opacity: op, transform: `rotate(${rot}deg)` }}>
              <Avatar src={staticFile(`projects/danslab-ep04/${a.f}`)} size={130} color={a.c} />
            </div>
          );
        })}
        {/* frantic connecting lines */}
        <svg style={{ position: 'absolute', left: -700, top: -260, width: 1400, height: 700, opacity: 0.25 }} viewBox="0 0 1400 700">
          {FLEET.map((a, i) => <line key={i} x1={700} y1={350} x2={700 + a.x * scatter} y2={350 + a.y * scatter} stroke={a.c} strokeWidth={2} strokeDasharray="6 8" />)}
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', zIndex: 3, opacity: interpolate(frame, [420, 442], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>It wasn&rsquo;t a company yet. It was </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.red }}>barely controlled chaos.</span>
      </div>
    </AbsoluteFill>
  );
};
export default OChaos;
