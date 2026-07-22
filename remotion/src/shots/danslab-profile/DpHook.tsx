import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { BrandBg, CLAMP } from '../../lib/kit';
import { DlLogo, DlLogoAnimated, MotionChar } from '../../lib/profilekit';

// =============================================================================
// Profile 1/6 — cold open. Logo builds fast (<2s), then the paradox hook by
// 0:05 ("One person. / A company that never sleeps."), then Marcus walks the
// promise in by 0:12: this is DansLab, real AI systems built in public.
// =============================================================================
export const compositionConfig = { id: 'DpHook', durationInSeconds: 14, fps: 30, width: 1920, height: 1080 };

const HOOK = 88; // ~2.9s
const HOOK2 = 118;
const CHAR = 220; // ~7.3s
const PROMISE = 288; // ~9.6s

const DpHook: React.FC = () => {
  const frame = useCurrentFrame();
  // stage 1: logo block center, then it glides up to make room for the hook
  const wordOp = interpolate(frame, [26, 44], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const blockY = interpolate(frame, [66, 92], [0, -260], { ...CLAMP, easing: EASINGS.easeInOut });
  const blockScale = interpolate(frame, [66, 92], [1, 0.52], { ...CLAMP, easing: EASINGS.easeInOut });
  const hookOp = interpolate(frame, [HOOK, HOOK + 14], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const hookY = interpolate(frame, [HOOK, HOOK + 16], [26, 0], { ...CLAMP, easing: EASINGS.easeOut });
  const hook2Op = interpolate(frame, [HOOK2, HOOK2 + 14], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const hook2Y = interpolate(frame, [HOOK2, HOOK2 + 16], [26, 0], { ...CLAMP, easing: EASINGS.easeOut });
  const shiftX = interpolate(frame, [CHAR - 10, CHAR + 14], [0, -240], { ...CLAMP, easing: EASINGS.easeInOut });
  const promOp = interpolate(frame, [PROMISE, PROMISE + 14], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const promY = interpolate(frame, [PROMISE, PROMISE + 16], [22, 0], { ...CLAMP, easing: EASINGS.easeOut });
  const fadeOut = interpolate(frame, [400, 420], [1, 0], { ...CLAMP, easing: EASINGS.easeIn });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY, opacity: fadeOut }}>
      <BrandBg />
      {/* logo + wordmark, builds in under 2s then tucks up */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', transform: `translateY(${blockY}px) scale(${blockScale})` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 44 }}>
          {/* static mark underneath so the real logo is on screen from frame 0;
              the animated build pops over it (reads as an instant-on + pulse) */}
          <div style={{ position: 'relative', width: 190, height: 190 }}>
            <div style={{ position: 'absolute', inset: 0 }}><DlLogo size={190} /></div>
            <div style={{ position: 'absolute', inset: 0 }}><DlLogoAnimated size={190} start={4} /></div>
          </div>
          <span style={{ opacity: wordOp, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 132, letterSpacing: -3, color: COLORS.ink }}>
            Dans<span style={{ color: COLORS.accent }}>Lab</span>
          </span>
        </div>
      </AbsoluteFill>

      {/* the paradox hook */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ transform: `translateX(${shiftX}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 90 }}>
          <div style={{ opacity: hookOp, transform: `translateY(${hookY}px)`, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 104, letterSpacing: -2, color: COLORS.ink }}>
            One person.
          </div>
          <div style={{ opacity: hook2Op, transform: `translateY(${hook2Y}px)`, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 76, letterSpacing: -1, color: COLORS.accent2, marginTop: 18 }}>
            A company that never sleeps.
          </div>
          <div style={{ opacity: promOp, transform: `translateY(${promY}px)`, marginTop: 54, maxWidth: 980, textAlign: 'center', fontFamily: FONT_BODY, fontWeight: 500, fontSize: 42, lineHeight: 1.45, color: COLORS.muted }}>
            This is <span style={{ color: COLORS.accent, fontWeight: 600 }}>DansLab</span>. Real AI systems, built in public, shown working.
          </div>
        </div>
      </AbsoluteFill>

      {/* Marcus walks the promise in */}
      <div style={{ position: 'absolute', right: -210, bottom: -8 }}>
        <MotionChar name="marcus-talk" h={640} start={CHAR} />
      </div>

      <div style={{ position: 'absolute', bottom: 58, left: 0, right: 0, textAlign: 'center', fontFamily: FONT_MONO, fontSize: 23, letterSpacing: 6, color: COLORS.muted, opacity: hookOp * 0.85 }}>
        A HUMAN LED AI LAB
      </div>
    </AbsoluteFill>
  );
};
export default DpHook;
