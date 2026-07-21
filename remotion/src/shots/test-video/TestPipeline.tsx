import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Scissors, Clapperboard, Mic, Volume2, Image as ImageIcon, Upload } from 'lucide-react';
import { COLORS, EASINGS, RADIUS, SHADOW } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { BrandBg, useRise, CLAMP } from '../../lib/kit';

// =============================================================================
// Test video 2/5 — the six pipeline steps stagger in, then the flow line joins
// them. cut -> visuals -> voice -> sfx -> packaging -> upload.
// =============================================================================
export const compositionConfig = { id: 'TestPipeline', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const STEPS = [
  { label: 'The cut', Icon: Scissors, color: COLORS.accent, at: 34 },
  { label: 'Visuals', Icon: Clapperboard, color: COLORS.accent2, at: 52 },
  { label: 'Voice', Icon: Mic, color: COLORS.signal, at: 70 },
  { label: 'Sound', Icon: Volume2, color: COLORS.signalAlt, at: 88 },
  { label: 'Packaging', Icon: ImageIcon, color: COLORS.warn, at: 106 },
  { label: 'Upload', Icon: Upload, color: COLORS.danger, at: 124 },
];
const FLOW = 148; // the joining line draws

const TestPipeline: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useRise();
  const flow = interpolate(frame, [FLOW, FLOW + 26], [0, 1], { ...CLAMP, easing: EASINGS.easeInOut });
  const tagOp = interpolate(frame, [FLOW + 20, FLOW + 36], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY }}>
      <BrandBg glow={COLORS.accent2} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ ...rise(4, 20), fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 88, color: COLORS.ink, margin: 0, marginBottom: 90 }}>
          One pipeline. <span style={{ color: COLORS.accent2 }}>Six steps.</span>
        </h1>

        <div style={{ position: 'relative', display: 'flex', gap: 34 }}>
          {/* flow line behind the cards */}
          <div style={{ position: 'absolute', top: '50%', left: 30, right: 30, height: 6, borderRadius: 999, background: COLORS.line, overflow: 'hidden', zIndex: 0 }}>
            <div style={{ height: '100%', width: '100%', background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2}, ${COLORS.signal})`, transform: `scaleX(${flow})`, transformOrigin: 'left' }} />
          </div>
          {STEPS.map((s) => {
            const op = interpolate(frame, [s.at, s.at + 14], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
            const y = interpolate(frame, [s.at, s.at + 14], [30, 0], { ...CLAMP, easing: EASINGS.overshoot });
            return (
              <div key={s.label} style={{
                opacity: op, transform: `translateY(${y}px)`, zIndex: 1,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18,
                background: COLORS.paper, border: `1px solid ${COLORS.line}`,
                borderRadius: RADIUS.card, boxShadow: SHADOW.card, padding: '34px 30px', width: 210,
              }}>
                <div style={{ width: 74, height: 74, borderRadius: 20, background: `${s.color}1c`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <s.Icon size={38} color={s.color} strokeWidth={2.1} />
                </div>
                <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 32, color: COLORS.ink }}>{s.label}</span>
              </div>
            );
          })}
        </div>

        <div style={{ opacity: tagOp, fontFamily: FONT_MONO, fontSize: 28, letterSpacing: 3, color: COLORS.muted, marginTop: 80 }}>
          RECORD&nbsp;THE&nbsp;TALKING&nbsp;HEAD&nbsp;—&nbsp;CLAUDE&nbsp;DOES&nbsp;THE&nbsp;REST
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default TestPipeline;
