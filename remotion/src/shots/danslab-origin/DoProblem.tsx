import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// =============================================================================
// Origin 3/14 — the problem. VO 0.8s (14.5s): "...The day has twenty-four
// hours. Dan needed thirty. So he made a decision... He stopped hiring...
// and started building." 24→30 swap ~f150-200; the two verdict lines close.
// =============================================================================
export const compositionConfig = { id: 'DoProblem', durationInSeconds: 16.2, fps: 30, width: 1920, height: 1080 };

const H24 = 130, H30 = 186, STOP = 300, BUILD = 372;

const DoProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const h24op = interpolate(frame, [H24, H24 + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const strike = interpolate(frame, [H30 - 8, H30 + 6], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const h30op = interpolate(frame, [H30, H30 + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const stopOp = interpolate(frame, [STOP, STOP + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const buildOp = interpolate(frame, [BUILD, BUILD + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const sweep = interpolate(frame, [BUILD + 10, BUILD + 28], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="02" label="THE PROBLEM // 24H" />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 34 }}>
          <span style={{ opacity: h24op, fontFamily: DL_SERIF, fontSize: 72, color: DL.text }}>
            The day has{' '}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <span style={{ fontFamily: DL_MONO, fontWeight: 700, color: DL.muted }}>24</span>
              <span style={{ position: 'absolute', left: -6, right: -6, top: '52%', height: 6, background: DL.red, transform: `scaleX(${strike})`, transformOrigin: 'left' }} />
            </span>{' '}
            hours.
          </span>
        </div>
        <div style={{ opacity: h30op, fontFamily: DL_SERIF, fontSize: 100, marginTop: 40, color: DL.text }}>
          Dan needed <span style={{ fontFamily: DL_MONO, fontWeight: 700, color: DL.gold }}>30.</span>
        </div>

        <div style={{ display: 'flex', gap: 56, marginTop: 100, alignItems: 'baseline' }}>
          <span style={{ opacity: stopOp, fontFamily: DL_SERIF, fontSize: 60, color: DL.dim }}>He stopped hiring.</span>
          <span style={{ opacity: buildOp, position: 'relative', fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, color: DL.text }}>
            <span style={{ position: 'absolute', left: -12, right: -12, bottom: 4, height: 22, background: `${DL.red}44`, transform: `scaleX(${sweep})`, transformOrigin: 'left' }} />
            <span style={{ position: 'relative' }}>He started <span style={{ color: DL.red }}>building.</span></span>
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default DoProblem;
