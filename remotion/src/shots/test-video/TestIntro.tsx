import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { BrandBg, useRise, CLAMP, Sunburst } from '../../lib/kit';

// =============================================================================
// Test video 1/5 — intro statement. "This video was edited by Claude Code."
// =============================================================================
export const compositionConfig = { id: 'TestIntro', durationInSeconds: 6, fps: 30, width: 1920, height: 1080 };

const TestIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useRise();
  const sweep = interpolate(frame, [58, 82], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const subOp = interpolate(frame, [88, 104], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY }}>
      <BrandBg glow={COLORS.accent} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 160px' }}>
        <div style={{ ...rise(4, 14), display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
          <Sunburst size={40} />
          <span style={{ fontFamily: FONT_MONO, fontSize: 28, letterSpacing: 5, color: COLORS.muted }}>CLAUDE&nbsp;·&nbsp;YOUTUBE&nbsp;·&nbsp;TEST</span>
        </div>
        <h1 style={{ ...rise(14, 26), fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 118, lineHeight: 1.06, color: COLORS.ink, textAlign: 'center', margin: 0 }}>
          This video was edited by{' '}
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ position: 'absolute', left: -10, right: -10, bottom: 12, height: 34, background: `${COLORS.accent}33`, borderRadius: 8, transform: `scaleX(${sweep})`, transformOrigin: 'left', zIndex: 0 }} />
            <span style={{ position: 'relative', zIndex: 1, color: COLORS.accent }}>Claude Code</span>
          </span>
        </h1>
        <div style={{ opacity: subOp, fontSize: 38, color: COLORS.muted, marginTop: 36 }}>
          No editor. Every frame is code.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default TestIntro;
