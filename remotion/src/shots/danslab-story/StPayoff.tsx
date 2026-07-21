import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Cutout } from '../../lib/danslab';

// =============================================================================
// $100 Stack 6/8 — the reveal. $50,000 collapses to $100; zoe reacts in wonder.
// The honest caveat rides underneath: same grunt work, one human still steering.
// =============================================================================
export const compositionConfig = { id: 'StPayoff', durationInSeconds: 8.5, fps: 30, width: 1920, height: 1080 };

const ARROW = 70;
const NEW = 96;

const StPayoff: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const oldFade = interpolate(frame, [NEW, NEW + 20], [1, 0.32], { ...DCLAMP, easing: DL_EASE.inOut });
  const strike = interpolate(frame, [NEW, NEW + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const arrowW = interpolate(frame, [ARROW, ARROW + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const newOp = interpolate(frame, [NEW, NEW + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const newPop = interpolate(frame, [NEW, NEW + 18], [0.8, 1], { ...DCLAMP, easing: DL_EASE.out });
  const caveat = interpolate(frame, [150, 168], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg />
      <Kicker n="05" label="THE MATH // 500x LEVERAGE" />

      <div style={{ position: 'absolute', top: 320, left: 120, right: 560, display: 'flex', alignItems: 'center', gap: 44 }}>
        {/* old */}
        <div style={{ position: 'relative', opacity: oldFade }}>
          <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 132, color: DL.dim }}>$50,000</div>
          <div style={{ position: 'absolute', top: '52%', left: -6, right: -6, height: 6, borderRadius: 4, background: DL.red, transform: `scaleX(${strike})`, transformOrigin: 'left' }} />
        </div>
        {/* arrow */}
        <div style={{ width: 120, height: 6, borderRadius: 4, background: `linear-gradient(90deg, ${DL.red}, ${DL.gold})`, transform: `scaleX(${arrowW})`, transformOrigin: 'left' }} />
        {/* new */}
        <div style={{ opacity: newOp, transform: `scale(${newPop})`, transformOrigin: 'left center', fontFamily: DL_SERIF, fontWeight: 700, fontSize: 180, color: DL.green }}>$100</div>
      </div>

      <div style={{ position: 'absolute', top: 560, left: 120, right: 560 }}>
        <div style={{ ...rise(30, 18), fontFamily: DL_SANS, fontSize: 42, color: DL.warm }}>The leverage math just changed.</div>
        <div style={{ opacity: caveat, marginTop: 22, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: DL.gold }} />
          <span style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.dim }}>Same grunt work. One human still in charge.</span>
        </div>
      </div>

      {/* right: wonder */}
      <div style={{ position: 'absolute', right: 150, bottom: 0, display: 'flex', alignItems: 'flex-end', height: 840 }}>
        <Cutout src={staticFile('projects/danslab-story/characters/zoe.png')} h={720} start={40} />
      </div>
    </AbsoluteFill>
  );
};
export default StPayoff;
