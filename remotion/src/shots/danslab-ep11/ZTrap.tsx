import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ch1 · the trap. VO flw05: great product + nobody understands = nothing.
export const compositionConfig = { id: 'ZTrap', durationInSeconds: 15, fps: 30, width: 1920, height: 1080 };

const ZTrap: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  const STEPS: [string, string, number][] = [
    ['01', 'You build a great product.', 60],
    ['02', 'You put it online.', 150],
    ['03', 'Nothing happens.', 240],
  ];
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="11" label="THE FLYWHEEL // THE TRAP" />
      <div style={{ position: 'absolute', top: 150, left: 120 }}>
        <Headline at={8} size={50}>The trap every builder falls into.</Headline>
      </div>
      <div style={{ position: 'absolute', top: 320, left: 120, display: 'flex', flexDirection: 'column', gap: 26 }}>
        {STEPS.map(([n, t, at], i) => (
          <div key={n} style={{ ...rise(at), display: 'flex', alignItems: 'baseline', gap: 30 }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.faint }}>{n}</span>
            <span style={{ fontFamily: DL_SERIF, fontSize: 60, color: i === 2 ? DL.red : DL.text }}>{t}</span>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 150, left: 120, ...rise(330) }}>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>
          A great product nobody understands earns <span style={{ color: DL.red }}>exactly nothing.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default ZTrap;
