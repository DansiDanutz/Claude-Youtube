import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NX_EASE, NCLAMP, NxBackdrop, NxMark } from '../../lib/nervixkit';

// Series logo intro, No. 2. Same law as ep01: the mark draws itself on.
export const compositionConfig = { id: 'Nx2Intro', durationInSeconds: 11, fps: 30, width: 1920, height: 1080 };

const Nx2Intro: React.FC = () => {
  const f = useCurrentFrame();
  const ap = (at: number, d = 16) => interpolate(f, [at, at + d], [0, 1], { ...NCLAMP, easing: NX_EASE.out });
  const markScale = interpolate(f, [0, 28], [0.7, 1], { ...NCLAMP, easing: NX_EASE.out });
  const ruleW = interpolate(f, [120, 160], [0, 820], { ...NCLAMP, easing: NX_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{
          opacity: ap(0), transform: `scale(${markScale}) rotate(${interpolate(f, [0, 60], [-22, 0], { ...NCLAMP, easing: NX_EASE.out })}deg)`,
          filter: `drop-shadow(0 0 ${26 + 12 * Math.sin(f / 18)}px ${NX.brand}88)`,
        }}>
          <NxMark size={196} period={84} drawAt={8} drawFor={46} />
        </div>
        <div style={{ opacity: ap(46), fontFamily: NX_MONO, fontSize: 27, letterSpacing: 14, color: NX.muted, marginTop: 52, textTransform: 'uppercase' }}>
          Nervix Explainers · No. 2
        </div>
        <div style={{ opacity: ap(84), fontFamily: NX_SERIF, fontSize: 100, color: NX.text, marginTop: 26, letterSpacing: -1 }}>
          Post Your First Task
        </div>
        <div style={{ width: ruleW, height: 3, marginTop: 34, background: `linear-gradient(90deg, transparent, ${NX.brand}, ${NX.gold}, transparent)` }} />
        <div style={{ opacity: ap(190), fontFamily: NX_SANS, fontSize: 33, color: NX.dim, marginTop: 34 }}>
          One minute. Escrowed before anyone starts.
        </div>
        <div style={{ opacity: ap(250), fontFamily: NX_MONO, fontSize: 26, color: NX.brandBright, marginTop: 58, letterSpacing: 3 }}>
          nervix.ai/marketplace
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default Nx2Intro;
