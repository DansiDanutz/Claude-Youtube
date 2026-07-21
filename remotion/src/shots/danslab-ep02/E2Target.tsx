import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// =============================================================================
// Ep02 one target. VO 0.8s (10.1s): "Four droplets. Four platforms. One target.
// Not activity. Not busywork. Business. And profit. Every agent, pointed at the
// same thing." Four platforms converge into one word.
// =============================================================================
export const compositionConfig = { id: 'E2Target', durationInSeconds: 12, fps: 30, width: 1920, height: 1080 };

const PLATFORMS = ['YouTube pipeline', 'The framework', 'Nervix', 'Zmarty'];
const CONVERGE = 130;
const NOT = 210;
const TARGET = 280;

const E2Target: React.FC = () => {
  const frame = useCurrentFrame();
  const arrows = interpolate(frame, [CONVERGE, CONVERGE + 26], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const notOp = interpolate(frame, [NOT, NOT + 14], [1, 0.25], { ...DCLAMP, easing: DL_EASE.inOut });
  const targetOp = interpolate(frame, [TARGET, TARGET + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const targetScale = interpolate(frame, [TARGET, TARGET + 20], [0.7, 1], { ...DCLAMP, easing: DL_EASE.out });
  const glow = 0.5 + 0.5 * Math.abs(Math.sin(frame / 16));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="04" label="ONE TARGET // BUSINESS + PROFIT" />

      {/* four platforms top */}
      <div style={{ position: 'absolute', top: 260, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 26 }}>
        {PLATFORMS.map((p, i) => {
          const op = interpolate(frame, [30 + i * 16, 44 + i * 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={p} style={{ opacity: op * (0.4 + 0.6 * (1 - arrows * 0.4)), border: `1px solid ${DL.border}`, background: DL.panel, borderRadius: 12, padding: '18px 28px', fontFamily: DL_MONO, fontSize: 24, color: DL.dim }}>{p}</div>
          );
        })}
      </div>

      {/* converging arrows */}
      <div style={{ position: 'absolute', top: 380, left: 0, right: 0, textAlign: 'center', opacity: arrows }}>
        <span style={{ fontSize: 44, color: DL.gold }}>↓ ↓ ↓ ↓</span>
      </div>

      {/* not / but */}
      <div style={{ position: 'absolute', top: 500, left: 0, right: 0, textAlign: 'center', opacity: notOp }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.muted }}>Not activity. Not busywork.</span>
      </div>

      {/* the target */}
      <div style={{ position: 'absolute', top: 590, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 40, opacity: targetOp, transform: `scale(${targetScale})` }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 700, fontSize: 130, color: DL.text, textShadow: `0 0 ${40 * glow}px ${DL.gold}55` }}>Business.</span>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 700, fontStyle: 'italic', fontSize: 130, color: DL.gold }}>Profit.</span>
      </div>
    </AbsoluteFill>
  );
};
export default E2Target;
