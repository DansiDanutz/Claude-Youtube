import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Store, Clapperboard, Server, MessageCircle } from 'lucide-react';
import { COLORS, EASINGS, RADIUS, SHADOW } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { BrandBg, CLAMP } from '../../lib/kit';
import { MotionChar, SectionTag } from '../../lib/profilekit';

// =============================================================================
// Profile 3/6 — the proof wall. Arlo points at four shipped systems (facts
// from brand.md / DANSLAB-OS.md / SYSTEM.md): Nervix marketplace, the AI
// video pipeline (made this film), the 24/7 agent fleet, digital assistants.
// =============================================================================
export const compositionConfig = { id: 'DpProof', durationInSeconds: 20, fps: 30, width: 1920, height: 1080 };

const SYSTEMS = [
  { icon: Store, title: 'Nervix', line: 'An AI agent marketplace, live on the internet', at: 70 },
  { icon: Clapperboard, title: 'AI video pipeline', line: 'It made the film you are watching right now', at: 130 },
  { icon: Server, title: 'The agent fleet', line: 'Eight core agents on five machines, around the clock', at: 190 },
  { icon: MessageCircle, title: 'Digital assistants', line: 'Personal AI assistants on call in chat, all day', at: 250 },
];
const PAYOFF = 380;
const PAYOFF2 = 470;

const DpProof: React.FC = () => {
  const frame = useCurrentFrame();
  const payOp = interpolate(frame, [PAYOFF, PAYOFF + 14], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const payY = interpolate(frame, [PAYOFF, PAYOFF + 16], [24, 0], { ...CLAMP, easing: EASINGS.easeOut });
  const pay2Op = interpolate(frame, [PAYOFF2, PAYOFF2 + 14], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  const fadeOut = interpolate(frame, [580, 600], [1, 0], { ...CLAMP, easing: EASINGS.easeIn });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY, opacity: fadeOut }}>
      <BrandBg />
      <SectionTag text="THE PROOF / REAL SYSTEMS, RUNNING NOW" />

      {/* Arlo points at the wall (his left = card side) */}
      <div style={{ position: 'absolute', left: -300, bottom: -10 }}>
        <MotionChar name="arlo-point" h={730} start={10} flip />
      </div>

      {/* 2x2 system cards */}
      <div style={{ position: 'absolute', left: 720, right: 130, top: 185, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }}>
        {SYSTEMS.map((s) => {
          const op = interpolate(frame, [s.at, s.at + 14], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
          const y = interpolate(frame, [s.at, s.at + 16], [30, 0], { ...CLAMP, easing: EASINGS.easeOut });
          const Icon = s.icon;
          return (
            <div key={s.title} style={{ opacity: op, transform: `translateY(${y}px)`, background: '#ffffff', border: `1px solid ${COLORS.line}`, borderRadius: RADIUS.card, boxShadow: SHADOW.card, padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ width: 54, height: 54, borderRadius: 14, background: `${COLORS.accent}14`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={28} color={COLORS.accent} strokeWidth={2.2} />
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 35, letterSpacing: -0.5, color: COLORS.ink }}>{s.title}</div>
              <div style={{ fontSize: 24, lineHeight: 1.4, color: COLORS.muted }}>{s.line}</div>
            </div>
          );
        })}
      </div>

      {/* payoff */}
      <div style={{ position: 'absolute', left: 720, right: 130, bottom: 92 }}>
        <div style={{ opacity: payOp, transform: `translateY(${payY}px)`, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 44, letterSpacing: -1, lineHeight: 1.25, color: COLORS.ink }}>
          Not demos. <span style={{ color: COLORS.accent }}>Deployed systems</span> doing daily work.
        </div>
        <div style={{ opacity: pay2Op, marginTop: 16, fontFamily: FONT_MONO, fontSize: 24, letterSpacing: 2, color: COLORS.muted }}>
          built by one person, run with the fleet
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default DpProof;
