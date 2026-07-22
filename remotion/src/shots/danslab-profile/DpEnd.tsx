import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Bell, ArrowRight } from 'lucide-react';
import { COLORS, EASINGS, GRADIENT, RADIUS, SHADOW } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { BrandBg, CLAMP } from '../../lib/kit';
import { DlLogo } from '../../lib/profilekit';

// =============================================================================
// Profile 6/6 — forward hook + end card. Tease the next video (inside the
// pipeline that made this film), then the card: real logo, wordmark,
// "Build. Ship. Repeat.", subscribe, links. Never a limp fade.
// =============================================================================
export const compositionConfig = { id: 'DpEnd', durationInSeconds: 14, fps: 30, width: 1920, height: 1080 };

const CARD = 130;
const MOTTO = CARD + 130;

const DpEnd: React.FC = () => {
  const frame = useCurrentFrame();
  const teaseOp = interpolate(frame, [12, 26, CARD - 24, CARD - 8], [0, 1, 1, 0], { ...CLAMP, easing: EASINGS.easeOut });
  const teaseY = interpolate(frame, [12, 28], [24, 0], { ...CLAMP, easing: EASINGS.easeOut });
  const cardOp = interpolate(frame, [CARD, CARD + 16], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const cardY = interpolate(frame, [CARD, CARD + 18], [30, 0], { ...CLAMP, easing: EASINGS.easeOut });
  const rule = interpolate(frame, [CARD + 40, CARD + 66], [0, 1], { ...CLAMP, easing: EASINGS.easeInOut });
  const m = (d: number) => interpolate(frame, [MOTTO + d, MOTTO + d + 10], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const subOp = interpolate(frame, [MOTTO + 70, MOTTO + 86], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const subPulse = 1 + 0.02 * Math.abs(Math.sin(Math.max(0, frame - (MOTTO + 86)) / 15));
  const linksOp = interpolate(frame, [MOTTO + 110, MOTTO + 126], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const fadeOut = interpolate(frame, [404, 420], [1, 0], { ...CLAMP, easing: EASINGS.easeIn });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY, opacity: fadeOut }}>
      <BrandBg />

      {/* forward hook */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: teaseOp }}>
        <div style={{ transform: `translateY(${teaseY}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 25, letterSpacing: 7, color: COLORS.accent2 }}>NEXT ON DANSLAB</div>
          <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', gap: 24, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 62, letterSpacing: -1, color: COLORS.ink, maxWidth: 1400, textAlign: 'center', lineHeight: 1.25 }}>
            Inside the pipeline that made this film
            <ArrowRight size={54} color={COLORS.accent} strokeWidth={2.4} />
          </div>
        </div>
      </AbsoluteFill>

      {/* end card */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: cardOp }}>
        <div style={{ transform: `translateY(${cardY}px)`, display: 'flex', alignItems: 'center', gap: 42 }}>
          <DlLogo size={140} />
          <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 136, letterSpacing: -3, color: COLORS.ink }}>
            Dans<span style={{ color: COLORS.accent }}>Lab</span>
          </span>
        </div>
        <div style={{ marginTop: 30, width: 560, height: 5, borderRadius: 999, background: '#14141f10', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '100%', background: GRADIENT, transform: `scaleX(${rule})`, transformOrigin: 'left' }} />
        </div>

        <div style={{ display: 'flex', gap: 38, marginTop: 46, fontFamily: FONT_MONO, fontWeight: 700, fontSize: 34, letterSpacing: 3 }}>
          <span style={{ opacity: m(0), color: COLORS.ink }}>BUILD.</span>
          <span style={{ opacity: m(20), color: COLORS.accent2 }}>SHIP.</span>
          <span style={{ opacity: m(40), color: COLORS.accent }}>REPEAT.</span>
        </div>

        <div style={{ opacity: subOp, transform: `scale(${subPulse})`, display: 'flex', alignItems: 'center', gap: 16, background: COLORS.accent, borderRadius: RADIUS.pill, padding: '20px 46px', marginTop: 54, boxShadow: SHADOW.card }}>
          <Bell size={28} color={COLORS.paper} />
          <span style={{ fontSize: 32, fontWeight: 600, color: COLORS.paper }}>Subscribe and watch the lab build in public</span>
        </div>

        <div style={{ opacity: linksOp, display: 'flex', gap: 26, marginTop: 50, fontFamily: FONT_MONO, fontSize: 23, color: COLORS.muted }}>
          <span>danslab.vercel.app</span><span>/</span><span>github.com/DansiDanutz</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default DpEnd;
