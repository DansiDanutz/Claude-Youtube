import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, DlLogoAnimated } from '../../lib/danslab';

// =============================================================================
// $100 Stack 8/8 — end card. Real animated DansLab logo, the motto lands word
// by word, channel links, fade out.
// =============================================================================
export const compositionConfig = { id: 'StEnd', durationInSeconds: 6, fps: 30, width: 1920, height: 1080 };

const MOTTO = 96;

const StEnd: React.FC = () => {
  const frame = useCurrentFrame();
  const rule = interpolate(frame, [60, 86], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const m1 = interpolate(frame, [MOTTO, MOTTO + 10], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const m2 = interpolate(frame, [MOTTO + 18, MOTTO + 28], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const m3 = interpolate(frame, [MOTTO + 36, MOTTO + 46], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const links = interpolate(frame, [150, 166], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <DlLogoAnimated size={158} start={4} />

        <div style={{ marginTop: 40, height: 5, width: 460, borderRadius: 999, background: '#ffffff10', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '100%', background: `linear-gradient(90deg, ${DL.red}, ${DL.gold})`, transform: `scaleX(${rule})`, transformOrigin: 'center' }} />
        </div>

        <div style={{ display: 'flex', gap: 40, marginTop: 48, fontFamily: DL_MONO, fontSize: 42, letterSpacing: 4 }}>
          <span style={{ opacity: m1, color: DL.text }}>BUILD.</span>
          <span style={{ opacity: m2, color: DL.gold }}>SHIP.</span>
          <span style={{ opacity: m3, color: DL.red }}>REPEAT.</span>
        </div>

        <div style={{ opacity: links, display: 'flex', gap: 28, marginTop: 60, fontFamily: DL_MONO, fontSize: 24, color: DL.faint }}>
          <span>danslab.vercel.app</span>
          <span>·</span>
          <span>github.com/DansiDanutz</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default StEnd;
