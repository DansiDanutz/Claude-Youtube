import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP, SiteBg, DlLogoAnimated } from '../../lib/danslab';

// =============================================================================
// Origin 0/31 — animated logo opening. No VO; SFX carries it. Logo builds
// (~f20-70), "DansLab" types under it, "PRESENTS", then the episode title
// card, then fade to the cold open.
// =============================================================================
export const compositionConfig = { id: 'DoLogoIntro', durationInSeconds: 20, fps: 30, width: 1920, height: 1080 };

const TYPE_START = 84;
const WORD = 'DansLab';
const PRESENTS = 168;
const TITLE = 300;

const DoLogoIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = WORD.slice(0, Math.floor(interpolate(frame, [TYPE_START, TYPE_START + 42], [0, WORD.length], { ...DCLAMP, easing: DL_EASE.inOut })));
  const presOp = interpolate(frame, [PRESENTS, PRESENTS + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const blockOut = interpolate(frame, [TITLE - 22, TITLE - 4], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  const titleOp = interpolate(frame, [TITLE, TITLE + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const titleScale = interpolate(frame, [TITLE, TITLE + 22], [1.05, 1], { ...DCLAMP, easing: DL_EASE.out });
  const subOp = interpolate(frame, [TITLE + 40, TITLE + 56], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const fadeOut = interpolate(frame, [566, 596], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  const cursorOn = Math.floor(frame / 14) % 2 === 0;

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fadeOut }}>
      <SiteBg glow="#160b09" />
      {/* stage 1: logo + typed wordmark */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: blockOut }}>
        <DlLogoAnimated size={260} start={20} />
        <div style={{ marginTop: 52, height: 74, display: 'flex', alignItems: 'baseline' }}>
          <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 96, color: DL.text }}>
            {typed.slice(0, 4)}<span style={{ color: DL.red }}>{typed.slice(4)}</span>
          </span>
          {frame >= TYPE_START && <span style={{ fontFamily: DL_MONO, fontSize: 72, color: DL.gold, opacity: cursorOn ? 1 : 0, marginLeft: 8 }}>▌</span>}
        </div>
        <div style={{ opacity: presOp, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 10, color: DL.muted, marginTop: 30 }}>PRESENTS</div>
      </AbsoluteFill>
      {/* stage 2: episode title card */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: titleOp, transform: `scale(${titleScale})` }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 27, letterSpacing: 8, color: DL.red }}>EPISODE 01</div>
        <div style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 128, color: DL.text, marginTop: 22 }}>
          The <span style={{ fontStyle: 'italic', color: DL.gold }}>Origin</span>
        </div>
        <div style={{ opacity: subOp, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm, marginTop: 26 }}>
          One human. Thirty agents. A real company.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default DoLogoIntro;
