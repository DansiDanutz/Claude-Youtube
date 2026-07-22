import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { ArrowUp } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep04 19 — Hermes upgrades them, a little sharper every day. VO 0.8s (20.4s).
export const compositionConfig = { id: 'OUpgrade', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const AG = [['dexter.jpg', DL.green], ['memo.jpg', DL.sky], ['nano.png', DL.gold], ['sienna.jpg', DL.red]] as const;

const OUpgrade: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="04" label="THE BRAIN // A LITTLE SHARPER, DAILY" />

      <div style={{ position: 'absolute', top: 200, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={20} size={54}>Then it did what Dan never could, at scale.</Headline>
        <div style={{ marginTop: 10 }}><Headline at={56} size={56} italic color={DL.green}>It upgraded them.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 480, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 60 }}>
        {AG.map(([f, c], i) => {
          const at = 160 + i * 20;
          const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
          const lift = interpolate(frame, [at + 20, at + 60], [0, -18], { ...DCLAMP, easing: DL_EASE.out });
          const arrOp = interpolate(frame, [at + 24, at + 44], [0, 1], DCLAMP);
          return (
            <div key={f} style={{ opacity: op, transform: `translateY(${lift}px)`, position: 'relative' }}>
              <Avatar src={staticFile(`projects/danslab-ep04/${f}`)} size={130} color={c} />
              <div style={{ position: 'absolute', top: -18, right: -10, opacity: arrOp, display: 'flex', alignItems: 'center', gap: 4, background: DL.bg, border: `1px solid ${c}`, borderRadius: 999, padding: '4px 10px' }}>
                <ArrowUp size={20} color={c} /><span style={{ fontFamily: DL_MONO, fontSize: 18, color: c }}>+1</span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [340, 362], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>Every agent, every day — quietly getting better, under a mind that finally </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.green }}>understood them.</span>
      </div>
    </AbsoluteFill>
  );
};
export default OUpgrade;
