import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { COLORS, GRADIENT, EASINGS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { BrandBg, useRise, CLAMP, Sunburst } from '../../lib/kit';

// =============================================================================
// Test video 5/5 — end card. Wordmark, gradient rule, sign-off.
// =============================================================================
export const compositionConfig = { id: 'TestEndCard', durationInSeconds: 6, fps: 30, width: 1920, height: 1080 };

const TestEndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useRise();
  const rule = interpolate(frame, [34, 58], [0, 1], { ...CLAMP, easing: EASINGS.easeInOut });
  const signOp = interpolate(frame, [60, 76], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const fadeOut = interpolate(frame, [156, 178], [1, 0], { ...CLAMP, easing: EASINGS.easeIn });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY, opacity: fadeOut }}>
      <BrandBg glow={COLORS.accent} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...rise(4, 16), display: 'flex', alignItems: 'center', gap: 22 }}>
          <Sunburst size={64} />
          <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 110, color: COLORS.ink }}>
            Claude <span style={{ color: COLORS.accent }}>YouTube</span>
          </span>
        </div>
        <div style={{ marginTop: 44, height: 8, width: 620, borderRadius: 999, background: COLORS.line, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '100%', borderRadius: 999, background: GRADIENT, transform: `scaleX(${rule})`, transformOrigin: 'left' }} />
        </div>
        <div style={{ opacity: signOp, fontFamily: FONT_MONO, fontSize: 30, letterSpacing: 3, color: COLORS.muted, marginTop: 40 }}>
          TEST&nbsp;PASSED&nbsp;·&nbsp;THE&nbsp;PIPELINE&nbsp;IS&nbsp;LIVE
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default TestEndCard;
