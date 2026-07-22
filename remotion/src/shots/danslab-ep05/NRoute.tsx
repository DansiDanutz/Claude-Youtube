import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { RouteBeam } from '../../lib/ep05kit';

// Ep05 10 — it routes each task to the right mind. VO 0.8s (20.4s).
export const compositionConfig = { id: 'NRoute', durationInSeconds: 23, fps: 30, width: 1920, height: 1080 };

const AGENTS = [
  { img: 'dexter.jpg', name: 'Dexter', color: DL.green },
  { img: 'memo.jpg', name: 'Memo', color: DL.sky },
  { img: 'nano.png', name: 'Nano', color: DL.gold },
  { img: 'sienna.jpg', name: 'Sienna', color: DL.red },
];

const NRoute: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="05" label="HOW IT THINKS // WHO SHOULD DO IT" />

      <div style={{ position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={50}>Knowing what to do is only half of it.</Headline>
        <div style={{ marginTop: 6 }}><Headline at={48} size={44} italic color={DL.sky}>You have to know <span style={{ color: DL.text }}>who.</span></Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 320, left: '50%', transform: 'translateX(-50%)' }}>
        <RouteBeam at={110} agents={AGENTS} target={0} label="security job" />
      </div>

      <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [380, 402], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>A careful security job → Dexter. A patient build → Memo. A risky trade → Sienna. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.text }}>Every task, matched to the mind most likely to win it.</span>
      </div>
    </AbsoluteFill>
  );
};
export default NRoute;
