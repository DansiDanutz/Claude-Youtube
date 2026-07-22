import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Bell, ArrowRight } from 'lucide-react';
import { COLORS, EASINGS, GRADIENT, RADIUS, SHADOW } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { BrandBg, CLAMP } from '../../lib/kit';
import { DlLogo } from '../../lib/profilekit';
import { NightBg } from '../../lib/carringtonkit';

// =============================================================================
// Carrington 7/7 — payoff question, forward hook, end card. STORY.md ending:
// the modern-network question, the share invitation, then the real logo and
// "Build. Ship. Repeat." Never a limp fade (CHANNEL-LAW Law 3).
// =============================================================================
export const compositionConfig = { id: 'CtEnd', durationInSeconds: 11, fps: 30, width: 1920, height: 1080 };

const HOOK = 96;
const CARD = 168;
const MOTTO = CARD + 74;

const CtEnd: React.FC = () => {
  const frame = useCurrentFrame();
  const qOp = interpolate(frame, [10, 24, HOOK + 52, HOOK + 66], [0, 1, 1, 0], { ...CLAMP, easing: EASINGS.easeOut });
  const qY = interpolate(frame, [10, 26], [24, 0], { ...CLAMP, easing: EASINGS.easeOut });
  const hookOp = interpolate(frame, [HOOK, HOOK + 14, HOOK + 52, HOOK + 66], [0, 1, 1, 0], { ...CLAMP, easing: EASINGS.easeOut });
  const nightOp = interpolate(frame, [CARD - 10, CARD + 8], [1, 0], { ...CLAMP, easing: EASINGS.easeInOut });
  const cardOp = interpolate(frame, [CARD, CARD + 16], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const cardY = interpolate(frame, [CARD, CARD + 18], [30, 0], { ...CLAMP, easing: EASINGS.easeOut });
  const rule = interpolate(frame, [CARD + 30, CARD + 54], [0, 1], { ...CLAMP, easing: EASINGS.easeInOut });
  const m = (d: number) => interpolate(frame, [MOTTO + d, MOTTO + d + 10], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const subOp = interpolate(frame, [MOTTO + 48, MOTTO + 62], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const subPulse = 1 + 0.02 * Math.abs(Math.sin(Math.max(0, frame - (MOTTO + 62)) / 15));
  const shareOp = interpolate(frame, [MOTTO + 74, MOTTO + 90], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY }}>
      <BrandBg />
      {/* night layer carries the closing question, then hands to the end card */}
      <AbsoluteFill style={{ opacity: nightOp }}>
        <NightBg intensity={0.7} />
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ opacity: qOp, transform: `translateY(${qY}px)`, maxWidth: 1420, textAlign: 'center', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 66, letterSpacing: -1.5, lineHeight: 1.25, color: COLORS.paper }}>
            When your network stops obeying but keeps speaking, will <span style={{ color: COLORS.danger }}>YOU</span> disconnect, or keep listening?
          </div>
        </AbsoluteFill>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, opacity: hookOp }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 24, letterSpacing: 7, color: COLORS.warn }}>NEXT ON DANSLAB</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 46, letterSpacing: -1, color: COLORS.d300 }}>
            Could a storm like this find today's grid?
            <ArrowRight size={42} color={COLORS.warn} strokeWidth={2.4} />
          </div>
        </div>
      </AbsoluteFill>

      {/* end card on the brand paper */}
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

        <div style={{ display: 'flex', gap: 38, marginTop: 44, fontFamily: FONT_MONO, fontWeight: 700, fontSize: 34, letterSpacing: 3 }}>
          <span style={{ opacity: m(0), color: COLORS.ink }}>BUILD.</span>
          <span style={{ opacity: m(16), color: COLORS.accent2 }}>SHIP.</span>
          <span style={{ opacity: m(32), color: COLORS.accent }}>REPEAT.</span>
        </div>

        <div style={{ opacity: subOp, transform: `scale(${subPulse})`, display: 'flex', alignItems: 'center', gap: 16, background: COLORS.accent, borderRadius: RADIUS.pill, padding: '20px 46px', marginTop: 48, boxShadow: SHADOW.card }}>
          <Bell size={28} color={COLORS.paper} />
          <span style={{ fontSize: 32, fontWeight: 600, color: COLORS.paper }}>Subscribe and watch the lab build in public</span>
        </div>

        <div style={{ opacity: shareOp, marginTop: 44, fontFamily: FONT_BODY, fontWeight: 500, fontSize: 29, color: COLORS.muted }}>
          Share this with someone you would want at the other end of the wire.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default CtEnd;
