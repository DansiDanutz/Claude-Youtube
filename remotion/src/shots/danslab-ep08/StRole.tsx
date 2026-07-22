import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep08 5 — they all have jobs; David has the house. VO 0.8s (19.1s).
export const compositionConfig = { id: 'StRole', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const CREW: [string, string, string, string][] = [
  ['sienna.jpg', 'Sienna', 'trades', DL.green],
  ['dexter.jpg', 'Dexter', 'builds', DL.sky],
  ['memo.jpg', 'Memo', 'runs frameworks', DL.gold],
  ['nano.png', 'Nano', 'builds the marketplace', DL.red],
];

const StRole: React.FC = () => {
  const frame = useCurrentFrame();
  const davidAt = 230;
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="08" label="THE RIGHT HAND // A DIFFERENT JOB" />

      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>They all have <span style={{ color: DL.sky }}>jobs.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 300, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 48 }}>
        {CREW.map(([img, name, job, color], i) => {
          const at = 60 + i * 22;
          const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
          const y = interpolate(frame, [at, at + 20], [24, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={name} style={{ opacity: op, transform: `translateY(${y}px)`, textAlign: 'center' }}>
              <Avatar src={staticFile(`projects/danslab-ep08/${img}`)} size={140} color={color} />
              <div style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.text, marginTop: 10 }}>{name}</div>
              <div style={{ fontFamily: DL_SANS, fontSize: 20, color: DL.dim }}>{job}</div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', top: 620, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40, opacity: interpolate(frame, [davidAt, davidAt + 26], [0, 1], { ...DCLAMP, easing: DL_EASE.out }) }}>
        <Avatar src={staticFile('projects/danslab-ep08/david.jpg')} size={170} color={DL.gold} />
        <div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 52, color: DL.text }}>David has <span style={{ fontStyle: 'italic', color: DL.gold }}>the house.</span></div>
          <div style={{ marginTop: 8, fontFamily: DL_SANS, fontSize: 27, color: DL.dim, maxWidth: 760 }}>the place where everything else gets decided</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default StRole;
