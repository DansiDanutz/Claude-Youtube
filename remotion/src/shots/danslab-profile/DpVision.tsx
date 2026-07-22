import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS, GRADIENT } from '../../brand';
import { FONT_DISPLAY, FONT_BODY } from '../../fonts';
import { BrandBg, CLAMP } from '../../lib/kit';

// =============================================================================
// Profile 5/6 — the reframe payoff. What "human led AI lab" actually means:
// not human limited. Direction from one person, shifts worked by software,
// decisions made by evidence. Full screen statements, no character.
// =============================================================================
export const compositionConfig = { id: 'DpVision', durationInSeconds: 12, fps: 30, width: 1920, height: 1080 };

const S1 = 20;
const S2 = 120;
const S3 = 252;
const PARTS = [
  { lead: 'One person', rest: 'sets the direction.' },
  { lead: 'Software', rest: 'works the shifts.' },
  { lead: 'Evidence', rest: 'makes the calls.' },
];

const DpVision: React.FC = () => {
  const frame = useCurrentFrame();
  const s1Op = interpolate(frame, [S1, S1 + 16], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const s1Y = interpolate(frame, [S1, S1 + 18], [28, 0], { ...CLAMP, easing: EASINGS.easeOut });
  const strike = interpolate(frame, [S1 + 34, S1 + 48], [0, 1], { ...CLAMP, easing: EASINGS.easeInOut });
  const s3Op = interpolate(frame, [S3, S3 + 16], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const s3Y = interpolate(frame, [S3, S3 + 18], [26, 0], { ...CLAMP, easing: EASINGS.easeOut });
  const rule = interpolate(frame, [S3 + 14, S3 + 40], [0, 1], { ...CLAMP, easing: EASINGS.easeInOut });
  const fadeOut = interpolate(frame, [342, 360], [1, 0], { ...CLAMP, easing: EASINGS.easeIn });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY, opacity: fadeOut }}>
      <BrandBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ opacity: s1Op, transform: `translateY(${s1Y}px)`, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 84, letterSpacing: -2, color: COLORS.ink, textAlign: 'center' }}>
          Human led does not mean{' '}
          <span style={{ position: 'relative', whiteSpace: 'nowrap' }}>
            <span style={{ position: 'relative', color: COLORS.muted }}>human limited.</span>
            <span style={{ position: 'absolute', left: 0, right: 0, top: '54%', height: 7, borderRadius: 4, background: COLORS.danger, transform: `scaleX(${strike})`, transformOrigin: 'left' }} />
          </span>
        </div>

        <div style={{ display: 'flex', gap: 70, marginTop: 92 }}>
          {PARTS.map((p, i) => {
            const at = S2 + i * 26;
            const op = interpolate(frame, [at, at + 14], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
            const y = interpolate(frame, [at, at + 16], [24, 0], { ...CLAMP, easing: EASINGS.easeOut });
            return (
              <div key={p.lead} style={{ opacity: op, transform: `translateY(${y}px)`, textAlign: 'center' }}>
                <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 52, letterSpacing: -1, color: [COLORS.accent, COLORS.accent2, COLORS.signalAlt][i] }}>{p.lead}</div>
                <div style={{ marginTop: 10, fontSize: 36, fontWeight: 500, color: COLORS.muted }}>{p.rest}</div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 96, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 620, height: 5, borderRadius: 999, background: '#14141f10', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '100%', background: GRADIENT, transform: `scaleX(${rule})`, transformOrigin: 'center' }} />
          </div>
          <div style={{ opacity: s3Op, transform: `translateY(${s3Y}px)`, marginTop: 34, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 54, letterSpacing: -1, color: COLORS.ink }}>
            That is a <span style={{ color: COLORS.accent }}>human led</span> AI lab.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default DpVision;
