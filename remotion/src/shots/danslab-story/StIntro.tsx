import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, DlLogoAnimated, useDlRise } from '../../lib/danslab';

// =============================================================================
// $100 Stack 1/8 — intro. Real animated DansLab logo (red tile + gold cursor,
// staggered reveal) over the site backdrop, then the title lands. Fades at end.
// =============================================================================
export const compositionConfig = { id: 'StIntro', durationInSeconds: 5.6, fps: 30, width: 1920, height: 1080 };

const StIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const kickerOp = interpolate(frame, [30, 46], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const rule = interpolate(frame, [120, 146], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const fade = interpolate(frame, [140, 168], [1, 0], { ...DCLAMP, easing: DL_EASE.in });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        {/* start pre-settled so frame 0 already shows the real red logo, then a
            shine sweep + particle tail + cursor blink carry the reveal. */}
        <DlLogoAnimated size={168} start={-26} />

        <div style={{ opacity: kickerOp, fontFamily: DL_MONO, fontSize: 24, letterSpacing: 8, color: DL.red, marginTop: 44 }}>
          DANSLAB // FIELD NOTES
        </div>

        <div style={{ ...rise(56, 26), fontFamily: DL_SERIF, fontWeight: 500, fontSize: 100, color: DL.text, marginTop: 24, lineHeight: 1.06, textAlign: 'center' }}>
          The <span style={{ color: DL.gold }}>$100</span> stack
        </div>
        <div style={{ ...rise(78, 24), fontFamily: DL_SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 58, color: DL.warm, marginTop: 6 }}>
          that replaces a $50k team.
        </div>

        <div style={{ marginTop: 40, height: 4, width: 360, borderRadius: 999, background: '#ffffff10', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '100%', background: `linear-gradient(90deg, ${DL.red}, ${DL.gold})`, transform: `scaleX(${rule})`, transformOrigin: 'center' }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default StIntro;
