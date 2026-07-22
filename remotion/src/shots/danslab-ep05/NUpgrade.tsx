import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { ArrowUp } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep05 16 — it upgrades them — the thing Dan could never do alone. VO 0.8s (17.2s).
export const compositionConfig = { id: 'NUpgrade', durationInSeconds: 20, fps: 30, width: 1920, height: 1080 };

const AG = [['dexter.jpg', DL.green], ['memo.jpg', DL.sky], ['nano.png', DL.gold], ['sienna.jpg', DL.red]] as const;

const NUpgrade: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="05" label="IT LEARNS // THEN IT UPGRADES THEM" />

      <div style={{ position: 'absolute', top: 200, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={20} size={52}>Then it does the one thing Dan never could alone.</Headline>
        <div style={{ marginTop: 10 }}><Headline at={54} size={54} italic color={DL.green}>It upgrades them.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 480, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 60 }}>
        {AG.map(([f, c], i) => {
          const at = 160 + i * 20;
          const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
          const lift = interpolate(frame, [at + 20, at + 60], [0, -18], { ...DCLAMP, easing: DL_EASE.out });
          const arrOp = interpolate(frame, [at + 24, at + 44], [0, 1], DCLAMP);
          return (
            <div key={f} style={{ opacity: op, transform: `translateY(${lift}px)`, position: 'relative' }}>
              <Avatar src={staticFile(`projects/danslab-ep05/${f}`)} size={130} color={c} />
              <div style={{ position: 'absolute', top: -18, right: -10, opacity: arrOp, display: 'flex', alignItems: 'center', gap: 4, background: DL.bg, border: `1px solid ${c}`, borderRadius: 999, padding: '4px 10px' }}>
                <ArrowUp size={20} color={c} /><span style={{ fontFamily: DL_MONO, fontSize: 18, color: c }}>tuned</span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [340, 362], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>A slightly better version of itself — handed to every agent, </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.green }}>every day.</span>
      </div>
    </AbsoluteFill>
  );
};
export default NUpgrade;
