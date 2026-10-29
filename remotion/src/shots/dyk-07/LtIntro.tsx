import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF } from '../../lib/danslab';
import { DYT, DYT_DISPLAY, DYT_GRADIENT, DytBg, DytSting, STING_FRAMES } from '../../lib/dytbrand';
import { ease } from '../../lib/dykkit';

// =============================================================================
// DYK 07 · 2/14 — the channel intro: the "Did You Know That?" signature sting
// (identical every episode — the sonic + visual mnemonic), then this episode's
// title card (Light). Lands AFTER the cold-open hook (Channel Law 2). No VO.
// =============================================================================
export const compositionConfig = { id: 'LtIntro', durationInSeconds: 7.5, fps: 30, width: 1920, height: 1080 };
const DUR = 225;

const LtIntro: React.FC = () => {
  const f = useCurrentFrame();
  const c = f - STING_FRAMES;
  const cardIn = ease(f, STING_FRAMES - 8, STING_FRAMES + 6);
  const fadeOut = ease(f, DUR - 3, DUR, 1, 0); // last frame not fully black: no blink at the join
  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <Sequence durationInFrames={STING_FRAMES + 8}><DytSting /></Sequence>
      <AbsoluteFill style={{ opacity: cardIn }}>
        <DytBg />
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ opacity: ease(c, 0, 12), fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 34, letterSpacing: 12, color: DYT.dim }}>EPISODE 07</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 34, marginTop: 18, opacity: ease(c, 6, 20), transform: `scale(${ease(c, 6, 28, 1.06, 1)})` }}>
            <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: 170, color: DYT.white }}>Light</span>
          </div>
          <div style={{ marginTop: 30, height: 5, width: 600 * ease(c, 26, 48), borderRadius: 4, background: DYT_GRADIENT }} />
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default LtIntro;
