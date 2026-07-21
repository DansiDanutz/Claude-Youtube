import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Check } from 'lucide-react';
import { COLORS, EASINGS, RADIUS, SHADOW } from '../../brand';
import { FONT_DISPLAY, FONT_BODY } from '../../fonts';
import { BrandBg, useRise, CLAMP } from '../../lib/kit';

// =============================================================================
// Test video 4/5 — the three "no" claims land as checked rows.
// =============================================================================
export const compositionConfig = { id: 'TestChecklist', durationInSeconds: 7, fps: 30, width: 1920, height: 1080 };

const ROWS = [
  { text: 'No video editor', at: 40 },
  { text: 'No screen recording', at: 76 },
  { text: 'No raw footage — this whole video is TSX', at: 112 },
];

const TestChecklist: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useRise();

  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY }}>
      <BrandBg glow={COLORS.signal} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ ...rise(4, 20), fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 92, color: COLORS.ink, margin: 0, marginBottom: 80 }}>
          What it took to make <span style={{ color: COLORS.signal }}>this</span>
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, width: 1080 }}>
          {ROWS.map((row) => {
            const op = interpolate(frame, [row.at, row.at + 14], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
            const x = interpolate(frame, [row.at, row.at + 14], [-36, 0], { ...CLAMP, easing: EASINGS.easeOut });
            const pop = interpolate(frame, [row.at + 8, row.at + 20], [0, 1], { ...CLAMP, easing: EASINGS.overshoot });
            return (
              <div key={row.text} style={{
                opacity: op, transform: `translateX(${x}px)`,
                display: 'flex', alignItems: 'center', gap: 26,
                background: COLORS.paper, border: `1px solid ${COLORS.line}`,
                borderRadius: RADIUS.card, boxShadow: SHADOW.soft, padding: '30px 40px',
              }}>
                <div style={{ width: 54, height: 54, borderRadius: '50%', background: COLORS.signal, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop})` }}>
                  <Check size={32} color="#fff" strokeWidth={3.4} />
                </div>
                <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 46, color: COLORS.ink }}>{row.text}</span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default TestChecklist;
