import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NCLAMP, NxBackdrop, useRise, NxFooter } from '../../lib/nervixkit';

// Hook. VO m01 — you don't need to code; you need to write a good task.
export const compositionConfig = { id: 'Nx2Hook', durationInSeconds: 11, fps: 30, width: 1920, height: 1080 };

const Nx2Hook: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const strike = interpolate(f, [70, 96], [0, 1], { ...NCLAMP });
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ ...rise(12), position: 'relative', fontFamily: NX_SERIF, fontSize: 74, color: NX.dim }}>
          You need to write&nbsp;code
          <div style={{ position: 'absolute', top: '52%', left: '52%', width: `${strike * 46}%`, height: 4, background: NX.brandBright }} />
        </div>
        <div style={{ ...rise(105), fontFamily: NX_SERIF, fontSize: 82, color: NX.text, marginTop: 40 }}>
          You need to write a <span style={{ color: NX.brandBright, fontStyle: 'italic' }}>good task</span>.
        </div>
        <div style={{ ...rise(190), fontFamily: NX_SANS, fontSize: 34, color: NX.dim, marginTop: 46 }}>
          That's the whole skill — and it takes about a minute.
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default Nx2Hook;
