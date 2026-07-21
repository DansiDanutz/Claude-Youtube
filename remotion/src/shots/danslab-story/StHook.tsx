import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Cutout } from '../../lib/danslab';

// =============================================================================
// $100 Stack 2/8 — the problem. A small team's burn rate counts up to $50,000;
// marcus (the founder) stands beside it. Tension line: most never reach month 6.
// =============================================================================
export const compositionConfig = { id: 'StHook', durationInSeconds: 9, fps: 30, width: 1920, height: 1080 };

const COUNT_A = 46;
const COUNT_B = 128;

const StHook: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const val = Math.round(interpolate(frame, [COUNT_A, COUNT_B], [0, 50000], DCLAMP));
  const numPop = interpolate(frame, [COUNT_B, COUNT_B + 12], [1, 1.03], { ...DCLAMP, easing: DL_EASE.out });
  const tension = interpolate(frame, [176, 194], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const tensionY = interpolate(frame, [176, 194], [18, 0], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg />
      <Kicker n="01" label="THE PROBLEM // BURN RATE" />

      {/* left: the number */}
      <div style={{ position: 'absolute', top: 300, left: 120, right: 720 }}>
        <div style={{ ...rise(20, 18), fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.muted }}>A SMALL STARTUP TEAM COSTS</div>
        <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 176, color: DL.text, lineHeight: 1, marginTop: 14, transform: `scale(${numPop})`, transformOrigin: 'left center' }}>
          <span style={{ color: DL.red }}>$</span>{val.toLocaleString('en-US')}
        </div>
        <div style={{ ...rise(120, 16), fontFamily: DL_SANS, fontSize: 40, color: DL.warm, marginTop: 18 }}>every single month.</div>

        <div style={{ opacity: tension, transform: `translateY(${tensionY}px)`, marginTop: 54, display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: DL.red }} />
          <span style={{ fontFamily: DL_SANS, fontSize: 34, color: DL.dim }}>and most never reach month six.</span>
        </div>
      </div>

      {/* right: the founder */}
      <div style={{ position: 'absolute', right: 150, bottom: 0, display: 'flex', alignItems: 'flex-end', height: 900 }}>
        <Cutout src={staticFile('projects/danslab-story/characters/marcus.png')} h={820} start={30} flip />
      </div>
    </AbsoluteFill>
  );
};
export default StHook;
