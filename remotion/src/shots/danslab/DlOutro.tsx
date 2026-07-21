import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, useDlRise } from '../../lib/danslab';

// =============================================================================
// DansLab 10/10 — outro. VO 1.0s: "That's DansLab. A lab where the agents do
// the work, and the human sets the direction. Build. Ship. Repeat."
// Wordmark ~f36, tagline ~f110, motto lands word by word ~f195, fade f300+.
// =============================================================================
export const compositionConfig = { id: 'DlOutro', durationInSeconds: 11, fps: 30, width: 1920, height: 1080 };

const MOTTO = 195;

const DlOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const rule = interpolate(frame, [70, 96], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const tagOp = interpolate(frame, [110, 126], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const m1 = interpolate(frame, [MOTTO, MOTTO + 10], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const m2 = interpolate(frame, [MOTTO + 22, MOTTO + 32], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const m3 = interpolate(frame, [MOTTO + 44, MOTTO + 54], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const linksOp = interpolate(frame, [258, 274], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const fadeOut = interpolate(frame, [300, 328], [1, 0], { ...DCLAMP, easing: DL_EASE.in });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fadeOut }}>
      <SiteBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...rise(36, 26), fontFamily: DL_SERIF, fontWeight: 600, fontSize: 150, color: DL.text }}>
          Dans<span style={{ color: DL.red }}>Lab</span>
        </div>
        <div style={{ marginTop: 30, height: 5, width: 560, borderRadius: 999, background: '#ffffff10', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '100%', background: `linear-gradient(90deg, ${DL.red}, ${DL.gold})`, transform: `scaleX(${rule})`, transformOrigin: 'left' }} />
        </div>
        <div style={{ opacity: tagOp, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm, marginTop: 34 }}>
          The agents do the work. The human sets the direction.
        </div>
        <div style={{ display: 'flex', gap: 42, marginTop: 52, fontFamily: DL_MONO, fontSize: 34, letterSpacing: 3 }}>
          <span style={{ opacity: m1, color: DL.text }}>BUILD.</span>
          <span style={{ opacity: m2, color: DL.gold }}>SHIP.</span>
          <span style={{ opacity: m3, color: DL.red }}>REPEAT.</span>
        </div>
        <div style={{ opacity: linksOp, display: 'flex', gap: 30, marginTop: 66, fontFamily: DL_MONO, fontSize: 23, color: DL.faint }}>
          <span>danslab.vercel.app</span>
          <span>·</span>
          <span>github.com/DansiDanutz</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default DlOutro;
