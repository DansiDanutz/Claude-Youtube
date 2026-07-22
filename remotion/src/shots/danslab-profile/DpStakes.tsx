import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY } from '../../fonts';
import { BrandBg, CLAMP } from '../../lib/kit';
import { MotionChar, SectionTag } from '../../lib/profilekit';

// =============================================================================
// Profile 2/6 — the stakes (lands inside the first 30s). Elena presents the
// gap: everyone talks about agents, almost nobody shows them doing real work.
// House rule: nothing counts until it ships with evidence.
// =============================================================================
export const compositionConfig = { id: 'DpStakes', durationInSeconds: 12, fps: 30, width: 1920, height: 1080 };

const L1 = 34;
const L2 = 116;
const L3 = 216;

const DpStakes: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = (start: number) => ({
    opacity: interpolate(frame, [start, start + 14], [0, 1], { ...CLAMP, easing: EASINGS.easeOut }),
    transform: `translateY(${interpolate(frame, [start, start + 16], [26, 0], { ...CLAMP, easing: EASINGS.easeOut })}px)`,
  });
  const sweep = interpolate(frame, [L2 + 18, L2 + 30], [0, 1], { ...CLAMP, easing: EASINGS.easeInOut });
  const fadeOut = interpolate(frame, [342, 360], [1, 0], { ...CLAMP, easing: EASINGS.easeIn });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY, opacity: fadeOut }}>
      <BrandBg glow={COLORS.warn} />
      <SectionTag text="THE GAP" color={COLORS.warn} />

      {/* Elena, presenting from the left */}
      <div style={{ position: 'absolute', left: -260, bottom: -6 }}>
        <MotionChar name="elena-talk" h={720} start={8} />
      </div>

      <div style={{ position: 'absolute', left: 760, right: 130, top: 250, display: 'flex', flexDirection: 'column', gap: 56 }}>
        <div style={{ ...rise(L1), fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 66, letterSpacing: -1, lineHeight: 1.2, color: COLORS.ink }}>
          Everyone talks about AI agents.
        </div>
        <div style={{ ...rise(L2), fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 66, letterSpacing: -1, lineHeight: 1.25, color: COLORS.ink }}>
          Almost nobody{' '}
          <span style={{ position: 'relative', whiteSpace: 'nowrap' }}>
            <span style={{ position: 'absolute', left: 0, right: 0, bottom: 6, height: 20, background: `${COLORS.warn}55`, transform: `scaleX(${sweep})`, transformOrigin: 'left', borderRadius: 4 }} />
            <span style={{ position: 'relative' }}>shows them</span>
          </span>{' '}
          doing real work.
        </div>
        <div style={{ ...rise(L3), fontFamily: FONT_BODY, fontWeight: 500, fontSize: 42, lineHeight: 1.5, color: COLORS.muted, borderLeft: `5px solid ${COLORS.accent}`, paddingLeft: 34 }}>
          The house rule here: nothing counts until it ships, <span style={{ color: COLORS.accent, fontWeight: 600 }}>with evidence</span>.
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default DpStakes;
