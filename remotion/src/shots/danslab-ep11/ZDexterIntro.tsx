import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DCLAMP, DL_EASE, SiteBg, Kicker } from '../../lib/danslab';

// Ch3 open. VO flw10: "Dexter would like a word."
export const compositionConfig = { id: 'ZDexterIntro', durationInSeconds: 10, fps: 30, width: 1920, height: 1080 };

const ZDexterIntro: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [24, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="11" label="THE FLYWHEEL // THE PROOF" />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ ...rise(30), fontFamily: DL_SERIF, fontSize: 64, color: DL.text, lineHeight: 1.3, maxWidth: 1500 }}>
          "A YouTube channel can't be an <span style={{ fontStyle: 'italic', color: DL.muted }}>engine.</span>"
        </div>
        <div style={{ ...rise(150), fontFamily: DL_SERIF, fontSize: 64, color: DL.gold, marginTop: 30 }}>
          Dexter would like a word.
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default ZDexterIntro;
