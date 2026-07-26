import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// Ch8 · the promise. VO flw23: next episode we wire the money, on camera.
export const compositionConfig = { id: 'ZPromise', durationInSeconds: 16, fps: 30, width: 1920, height: 1080 };

const ZPromise: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  const zero = interpolate(f, [260, 286], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="11" label="THE FLYWHEEL // NEXT" />
      <div style={{ position: 'absolute', top: 200, left: 120, width: 1000 }}>
        <div style={{ ...rise(30), fontFamily: DL_SERIF, fontSize: 54, color: DL.text, lineHeight: 1.35 }}>
          Next episode: we wire the money <span style={{ color: DL.gold, fontStyle: 'italic' }}>end to end.</span>
        </div>
        <div style={{ ...rise(180), fontFamily: DL_SANS, fontSize: 30, color: DL.warm, marginTop: 34, lineHeight: 1.55 }}>
          And you watch the first real dollar land — or fail to.
          <span style={{ color: DL.text, fontWeight: 600 }}> No staging. No tricks.</span>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 280, right: 170, textAlign: 'center', opacity: zero, transform: `scale(${0.9 + 0.1 * zero})` }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 6, color: DL.faint }}>THE COUNTER</div>
        <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 170, color: DL.gold, letterSpacing: -4, marginTop: 8 }}>$0.00</div>
        <div style={{ fontFamily: DL_SANS, fontSize: 26, color: DL.dim }}>starts on camera</div>
      </div>
    </AbsoluteFill>
  );
};
export default ZPromise;
