import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP, SiteBg, DlLogoAnimated } from '../../lib/danslab';

// Ep09 0 — title: the season finale. No VO.
export const compositionConfig = { id: 'PIntro', durationInSeconds: 14, fps: 30, width: 1920, height: 1080 };

const TITLE = 150;

const PIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const logoOut = interpolate(frame, [TITLE - 22, TITLE - 4], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  const numOp = interpolate(frame, [TITLE, TITLE + 14], [0, 1], DCLAMP);
  const nameOp = interpolate(frame, [TITLE + 12, TITLE + 30], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const nameScale = interpolate(frame, [TITLE + 12, TITLE + 34], [1.06, 1], { ...DCLAMP, easing: DL_EASE.out });
  const ruleW = interpolate(frame, [TITLE + 34, TITLE + 58], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const tagOp = interpolate(frame, [TITLE + 62, TITLE + 80], [0, 1], DCLAMP);
  const finaleOp = interpolate(frame, [TITLE - 130, TITLE - 108], [0, 1], DCLAMP);
  const fadeOut = interpolate(frame, [386, 416], [1, 0], { ...DCLAMP, easing: DL_EASE.in });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fadeOut }}>
      <SiteBg glow="#160b09" />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: logoOut }}>
        <DlLogoAnimated size={230} start={16} />
        <div style={{ opacity: finaleOp, marginTop: 36, fontFamily: DL_MONO, fontSize: 22, letterSpacing: 12, color: DL.faint }}>SEASON FINALE</div>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: nameOp, transform: `scale(${nameScale})` }}>
        <div style={{ opacity: numOp, fontFamily: DL_MONO, fontSize: 27, letterSpacing: 10, color: DL.red }}>DANSLAB · NO. 09 · FINALE</div>
        <div style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 148, color: DL.text, marginTop: 20 }}>
          The <span style={{ fontStyle: 'italic', color: DL.gold }}>Player</span>
        </div>
        <div style={{ marginTop: 26, height: 5, width: 560, borderRadius: 999, background: '#ffffff10', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '100%', background: `linear-gradient(90deg, ${DL.red}, ${DL.gold})`, transform: `scaleX(${ruleW})`, transformOrigin: 'center' }} />
        </div>
        <div style={{ opacity: tagOp, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm, marginTop: 30 }}>
          Every table has one player who says nothing.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default PIntro;
