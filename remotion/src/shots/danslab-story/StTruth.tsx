import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Cutout } from '../../lib/danslab';

// =============================================================================
// $100 Stack 7/8 — the honest part. The stack replaces the headcount, not the
// judgment. arlo (the veteran) delivers the caveat. Evidence-first, no hype.
// =============================================================================
export const compositionConfig = { id: 'StTruth', durationInSeconds: 7, fps: 30, width: 1920, height: 1080 };

const L2 = 78;

const StTruth: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const l1 = interpolate(frame, [34, 52], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const l1y = interpolate(frame, [34, 52], [20, 0], { ...DCLAMP, easing: DL_EASE.out });
  const l2 = interpolate(frame, [L2, L2 + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const l2y = interpolate(frame, [L2, L2 + 18], [20, 0], { ...DCLAMP, easing: DL_EASE.out });
  const sweep = interpolate(frame, [L2 + 10, L2 + 34], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg />
      <Kicker n="06" label="THE HONEST PART // WHAT STAYS" />

      {/* right: the veteran */}
      <div style={{ position: 'absolute', right: 160, bottom: 0, display: 'flex', alignItems: 'flex-end', height: 820 }}>
        <Cutout src={staticFile('projects/danslab-story/characters/arlo.png')} h={720} start={24} flip />
      </div>

      <div style={{ position: 'absolute', top: 350, left: 120, right: 720 }}>
        <div style={{ opacity: l1, transform: `translateY(${l1y}px)`, fontFamily: DL_SERIF, fontWeight: 500, fontSize: 74, color: DL.text, lineHeight: 1.14 }}>
          It doesn&rsquo;t replace your judgment.
        </div>
        <div style={{ opacity: l2, transform: `translateY(${l2y}px)`, marginTop: 22, fontFamily: DL_SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 66, lineHeight: 1.18, position: 'relative', display: 'inline-block' }}>
          <span style={{ position: 'absolute', left: -6, right: -6, bottom: 12, height: 22, background: `${DL.gold}44`, borderRadius: 6, transform: `scaleX(${sweep})`, transformOrigin: 'left', zIndex: 0 }} />
          <span style={{ position: 'relative', zIndex: 1, color: DL.gold }}>It replaces the headcount you needed to find it.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default StTruth;
