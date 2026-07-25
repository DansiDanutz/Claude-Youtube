import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, Kicker } from '../../lib/danslab';
import { ImageBackdrop } from '../../lib/ep10kit';

// Ch6 · the dangerous failure. VO audit05 41.7. "Closures went to zero. Nothing
// alarmed." Then items 3 and 4: the backup job that never ran ~24s, 242 services ~30s.
export const compositionConfig = { id: 'YZero', durationInSeconds: 44, fps: 30, width: 1920, height: 1080 };

const YZero: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <ImageBackdrop src={staticFile('projects/danslab-ep10/06-green-lights.png')} dim={0.82} />
      <Kicker n="10" label="THE PAYROLL // LOOKING ALIVE" />
      <div style={{ position: 'absolute', top: 170, left: 120, width: 1500 }}>
        <div style={{ ...rise(20), fontFamily: DL_SERIF, fontSize: 62, color: DL.text, lineHeight: 1.3 }}>
          Closures went to <span style={{ color: DL.red, fontStyle: 'italic' }}>zero.</span> Nothing alarmed.
        </div>
        <div style={{ ...rise(200), fontFamily: DL_SANS, fontSize: 32, color: DL.warm, marginTop: 34, lineHeight: 1.5, maxWidth: 1380 }}>
          The company was monitoring machines, not output. It could report every service
          healthy while producing <span style={{ color: DL.red, fontWeight: 600 }}>nothing at all</span> —
          looking alive while being dead. It's a hard-wired alarm now. But it happened.
        </div>
        <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ ...rise(720), display: 'flex', gap: 22, alignItems: 'center' }}>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: DL.red, width: 46 }}>3</span>
            <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim }}>
              A database backup job that has <span style={{ color: DL.text }}>never produced a single backup.</span> Still open.
            </span>
          </div>
          <div style={{ ...rise(920), display: 'flex', gap: 22, alignItems: 'center' }}>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: DL.red, width: 46 }}>4</span>
            <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim }}>
              <span style={{ fontFamily: DL_MONO, color: DL.text }}>242</span> services installed,
              <span style={{ fontFamily: DL_MONO, color: DL.text }}> 122</span> loaded. Nobody holds that in their head.
              Complexity is a cost — and this company is paying it.
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YZero;
