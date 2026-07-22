import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { BrandBg, CLAMP } from '../../lib/kit';
import { DlLogo, DlLogoAnimated } from '../../lib/profilekit';
import { NightBg, AuroraCurtains, TelegraphKey, CutCable } from '../../lib/carringtonkit';

// =============================================================================
// Carrington 1/7 — cold open. Real DansLab logo builds in under 2s, then the
// paradox is on screen by 0:05: a telegraph key clicking beside a visibly
// disconnected battery, red sky pulsing. Facts: STORY.md beat 1.
// =============================================================================
export const compositionConfig = { id: 'CtHook', durationInSeconds: 12, fps: 30, width: 1920, height: 1080 };

const NIGHT = 58; // paper -> night crossfade (logo held < 2s)
const L1 = 92; // ~3.1s
const L2 = 140;
const WHY = 210;

const CtHook: React.FC = () => {
  const frame = useCurrentFrame();
  const wordOp = interpolate(frame, [18, 34], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const paperOp = interpolate(frame, [NIGHT, NIGHT + 20], [1, 0], { ...CLAMP, easing: EASINGS.easeInOut });
  const rise = (start: number, dur = 14) => ({
    opacity: interpolate(frame, [start, start + dur], [0, 1], { ...CLAMP, easing: EASINGS.easeOut }),
    transform: `translateY(${interpolate(frame, [start, start + dur + 2], [26, 0], { ...CLAMP, easing: EASINGS.easeOut })}px)`,
  });
  const whyScale = interpolate(frame, [WHY, WHY + 14], [0.94, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const fadeOut = interpolate(frame, [342, 360], [1, 0], { ...CLAMP, easing: EASINGS.easeIn });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY, opacity: fadeOut, backgroundColor: COLORS.d900 }}>
      {/* night scene under the paper intro */}
      <NightBg />
      <AuroraCurtains start={NIGHT} strength={0.9} />

      <div style={{ position: 'absolute', top: 84, left: 130, right: 130, display: 'flex', alignItems: 'center', gap: 24, opacity: rise(NIGHT + 26).opacity }}>
        <div style={{ width: 12, height: 12, borderRadius: 3, background: COLORS.danger }} />
        <span style={{ fontFamily: FONT_MONO, fontSize: 25, letterSpacing: 6, color: COLORS.d400 }}>SEPTEMBER 2, 1859 · BOSTON TELEGRAPH OFFICE</span>
        <div style={{ flex: 1, height: 1, background: COLORS.d600 }} />
      </div>

      {/* the working key beside its severed battery cable */}
      <div style={{ position: 'absolute', left: 150, bottom: 130, display: 'flex', alignItems: 'flex-end', gap: 60 }}>
        <div style={rise(NIGHT + 18)}><CutCable start={NIGHT + 18} w={430} /></div>
        <div style={rise(NIGHT + 10)}><TelegraphKey start={NIGHT + 10} w={520} tapEvery={30} /></div>
      </div>

      {/* the paradox, on screen by 0:05 */}
      <div style={{ position: 'absolute', left: 130, right: 130, top: 250 }}>
        <div style={{ ...rise(L1), fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 84, letterSpacing: -2, lineHeight: 1.14, color: COLORS.paper, maxWidth: 1360 }}>
          Every battery, disconnected.
        </div>
        <div style={{ ...rise(L2), marginTop: 30, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 66, letterSpacing: -1, lineHeight: 1.2, color: COLORS.warn, maxWidth: 1360 }}>
          And the messages became <span style={{ color: '#f3cf5f' }}>clearer</span>.
        </div>
        <div style={{ ...rise(WHY), transform: `${rise(WHY).transform} scale(${whyScale})`, marginTop: 46, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 118, letterSpacing: -2, color: COLORS.danger }}>
          Why?
        </div>
      </div>

      {/* branded intro on top: real logo + wordmark, done in under 2s */}
      <AbsoluteFill style={{ opacity: paperOp, pointerEvents: 'none' }}>
        <BrandBg />
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            <div style={{ position: 'relative', width: 170, height: 170 }}>
              <div style={{ position: 'absolute', inset: 0 }}><DlLogo size={170} /></div>
              <div style={{ position: 'absolute', inset: 0 }}><DlLogoAnimated size={170} start={2} /></div>
            </div>
            <span style={{ opacity: wordOp, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 120, letterSpacing: -3, color: COLORS.ink }}>
              Dans<span style={{ color: COLORS.accent }}>Lab</span>
            </span>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default CtHook;
