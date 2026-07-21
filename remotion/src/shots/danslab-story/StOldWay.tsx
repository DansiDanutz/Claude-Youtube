import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, RosterCard } from '../../lib/danslab';

// =============================================================================
// $100 Stack 3/8 — the old way. The four hires you used to need, as a roster of
// characters, each with a monthly cost. They sum to the $50k on a badge.
// =============================================================================
export const compositionConfig = { id: 'StOldWay', durationInSeconds: 11, fps: 30, width: 1920, height: 1080 };

const ROLES = [
  { src: 'marcus.png', role: 'Engineer', value: '$18k', at: 96 },
  { src: 'elena.png', role: 'Designer', value: '$12k', at: 120 },
  { src: 'arlo.png', role: 'Operations', value: '$11k', at: 144 },
  { src: 'rosa.png', role: 'Growth', value: '$9k', at: 168 },
];
const SUM = 210;

const StOldWay: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const sumOp = interpolate(frame, [SUM, SUM + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const sumY = interpolate(frame, [SUM, SUM + 14], [22, 0], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg />
      <Kicker n="02" label="THE OLD WAY // HEADCOUNT" />

      <div style={{ position: 'absolute', top: 168, left: 120, right: 120, ...rise(8, 20) }}>
        <div style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 68, color: DL.text }}>
          You used to hire <span style={{ fontStyle: 'italic', color: DL.gold }}>the whole team.</span>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 300, left: 120, right: 120, display: 'flex', gap: 24 }}>
        {ROLES.map((r) => (
          <RosterCard key={r.role} src={staticFile(`projects/danslab-story/characters/${r.src}`)} role={r.role} value={r.value} at={r.at} />
        ))}
      </div>

      {/* sum badge */}
      <div style={{ position: 'absolute', bottom: 96, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <div style={{ opacity: sumOp, transform: `translateY(${sumY}px)`, display: 'flex', alignItems: 'center', gap: 26, background: `${DL.red}18`, border: `1px solid ${DL.red}`, borderRadius: 999, padding: '20px 44px' }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 3, color: DL.dim }}>TOTAL BURN</span>
          <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 56, color: DL.red }}>$50,000 / mo</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default StOldWay;
