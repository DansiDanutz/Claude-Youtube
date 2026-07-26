import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// Ch3 · the lesson. VO flw13: treat a product like a poker player treats a table.
export const compositionConfig = { id: 'ZPoker', durationInSeconds: 18, fps: 30, width: 1920, height: 1080 };

const WORDS: [string, number][] = [['PATIENCE.', 190], ['WORK.', 240], ['LONG-TERM.', 290]];

const ZPoker: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="11" label="THE FLYWHEEL // THE LESSON" />
      <div style={{ position: 'absolute', top: 200, left: 120, width: 1440 }}>
        <div style={{ ...rise(20), fontFamily: DL_SERIF, fontSize: 56, color: DL.text, lineHeight: 1.35 }}>
          A magic trick? Sure. <span style={{ color: DL.gold, fontStyle: 'italic' }}>A winning one.</span>
        </div>
        <div style={{ ...rise(120), fontFamily: DL_SANS, fontSize: 32, color: DL.warm, marginTop: 36, lineHeight: 1.5 }}>
          And the real lesson Dexter taught the fleet: treat a product like a poker
          player treats a table.
        </div>
        <div style={{ marginTop: 60, display: 'flex', gap: 46 }}>
          {WORDS.map(([w, at], i) => (
            <span key={w} style={{
              opacity: interpolate(f, [at, at + 12], [0, 1], DCLAMP),
              fontFamily: DL_MONO, fontWeight: 700, fontSize: 44, letterSpacing: 4,
              color: i === 0 ? DL.text : i === 1 ? DL.gold : DL.red,
            }}>{w}</span>
          ))}
        </div>
        <div style={{ ...rise(360), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 38, color: DL.muted, marginTop: 50 }}>
          No desperate all-ins.
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default ZPoker;
