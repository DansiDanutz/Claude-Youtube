import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS, RADIUS, SHADOW } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { BrandBg, CLAMP } from '../../lib/kit';
import { MotionChar, SectionTag } from '../../lib/profilekit';

// =============================================================================
// Profile 4/6 — how it runs (DANSLAB-OS daily rhythm). The timeline of a lab
// day: agents scope at 06:30, the one page CEO brief at 07:00, evidence all
// day, self repair on failure. Zoe reacts to the payoff: one page a day.
// =============================================================================
export const compositionConfig = { id: 'DpDay', durationInSeconds: 14, fps: 30, width: 1920, height: 1080 };

const STEPS = [
  { time: '06:30', text: 'The agents scope the day of work', at: 40 },
  { time: '07:00', text: 'A one page brief lands. Dan reads it in a minute.', at: 105, hot: true },
  { time: 'ALL DAY', text: 'Agents close work and attach the evidence', at: 170 },
  { time: 'ON FAILURE', text: 'The system repairs itself before it asks a human', at: 235 },
];
const CHAR = 285;
const PAYOFF = 310;

const DpDay: React.FC = () => {
  const frame = useCurrentFrame();
  const lineGrow = interpolate(frame, [36, 260], [0, 1], { ...CLAMP, easing: EASINGS.easeInOut });
  const payOp = interpolate(frame, [PAYOFF, PAYOFF + 14], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const payY = interpolate(frame, [PAYOFF, PAYOFF + 16], [26, 0], { ...CLAMP, easing: EASINGS.easeOut });
  const fadeOut = interpolate(frame, [402, 420], [1, 0], { ...CLAMP, easing: EASINGS.easeIn });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY, opacity: fadeOut }}>
      <BrandBg glow={COLORS.signalAlt} />
      <SectionTag text="HOW IT RUNS / ONE PAGE A DAY" color={COLORS.signalAlt} />

      {/* timeline */}
      <div style={{ position: 'absolute', left: 150, top: 216, width: 1020 }}>
        <div style={{ position: 'absolute', left: 15, top: 12, bottom: 12, width: 4, borderRadius: 999, background: COLORS.line }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: `${lineGrow * 100}%`, borderRadius: 999, background: `linear-gradient(180deg, ${COLORS.accent}, ${COLORS.signalAlt})` }} />
        </div>
        {STEPS.map((s, i) => {
          const op = interpolate(frame, [s.at, s.at + 14], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
          const x = interpolate(frame, [s.at, s.at + 16], [30, 0], { ...CLAMP, easing: EASINGS.easeOut });
          return (
            <div key={s.time} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 34, marginBottom: i < 3 ? 44 : 0, paddingLeft: 52, position: 'relative' }}>
              <div style={{ position: 'absolute', left: 5, width: 24, height: 24, borderRadius: '50%', background: s.hot ? COLORS.accent : '#fff', border: `4px solid ${s.hot ? COLORS.accent : COLORS.line}` }} />
              <div style={{ width: 210, flexShrink: 0, fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, color: s.hot ? COLORS.accent : COLORS.accent2 }}>{s.time}</div>
              <div style={{ background: '#fff', border: `1px solid ${s.hot ? `${COLORS.accent}66` : COLORS.line}`, borderRadius: RADIUS.panel, boxShadow: SHADOW.soft, padding: '22px 30px', fontSize: 31, fontWeight: 500, color: COLORS.ink, lineHeight: 1.35 }}>
                {s.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Zoe reacts to the payoff */}
      <div style={{ position: 'absolute', right: -330, bottom: -12 }}>
        <MotionChar name="zoe-react-wow" h={660} start={CHAR} />
      </div>
      <div style={{ position: 'absolute', right: 150, bottom: 690, width: 560, opacity: payOp, transform: `translateY(${payY}px)` }}>
        <div style={{ background: '#fff', border: `1px solid ${COLORS.line}`, borderRadius: RADIUS.card, boxShadow: SHADOW.card, padding: '30px 36px', fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 40, letterSpacing: -0.5, lineHeight: 1.3, color: COLORS.ink }}>
          One person. <span style={{ color: COLORS.accent }}>One page.</span> A whole company moving.
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default DpDay;
