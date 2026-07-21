import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise } from '../../lib/danslab';

// =============================================================================
// Origin — model routing. VO 0.8s (18.7s): "The fleet does not run on one
// model. It runs on whichever model earns the task. Claude for the deep work.
// Qwen and GLM for volume. Gemini for research. Every job is routed to the
// cheapest model that can do it well... That is a business decision."
// =============================================================================
export const compositionConfig = { id: 'DoModels', durationInSeconds: 20.8, fps: 30, width: 1920, height: 1080 };

const MODELS = [
  { name: 'CLAUDE', use: 'the deep work', at: 148 },
  { name: 'QWEN', use: 'volume', at: 218 },
  { name: 'GLM', use: 'volume', at: 246 },
  { name: 'GEMINI', use: 'research', at: 292 },
];
const ROUTE = 360; // "routed to the cheapest model that can do it well"
const BIZ = 508; // "business decision"

const DoModels: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const routeW = interpolate(frame, [ROUTE, ROUTE + 26], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const bizOp = interpolate(frame, [BIZ, BIZ + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="04" label="THE MODELS // ROUTED BY COST" />

      <div style={{ position: 'absolute', top: 200, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 74, color: DL.text }}>
          Whichever model <span style={{ fontStyle: 'italic', color: DL.gold }}>earns the task.</span>
        </span>
      </div>

      <div style={{ position: 'absolute', top: 420, left: 120, right: 120, display: 'flex', gap: 28 }}>
        {MODELS.map((m) => {
          const op = interpolate(frame, [m.at, m.at + 13], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const y = interpolate(frame, [m.at, m.at + 13], [26, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={m.name} style={{ opacity: op, transform: `translateY(${y}px)`, flex: 1, background: DL.panel, border: `1px solid ${DL.border}`, borderTop: `3px solid ${DL.gold}`, borderRadius: 14, padding: '38px 34px', textAlign: 'center' }}>
              <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 44, letterSpacing: 3, color: DL.text }}>{m.name}</div>
              <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 30, color: DL.dim, marginTop: 16 }}>{m.use}</div>
            </div>
          );
        })}
      </div>

      {/* routing bar */}
      <div style={{ position: 'absolute', top: 700, left: 220, right: 220 }}>
        <div style={{ height: 6, borderRadius: 999, background: '#ffffff0c', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '100%', background: `linear-gradient(90deg, ${DL.gold}, ${DL.red})`, transform: `scaleX(${routeW})`, transformOrigin: 'left' }} />
        </div>
        <div style={{ textAlign: 'center', marginTop: 20, fontFamily: DL_MONO, fontSize: 25, letterSpacing: 3, color: DL.muted, opacity: routeW }}>
          EVERY JOB → CHEAPEST MODEL THAT DOES IT WELL
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 96, left: 0, right: 0, textAlign: 'center', opacity: bizOp }}>
        <span style={{ fontFamily: DL_SERIF, fontSize: 50, color: DL.text }}>
          Not a technical detail. <span style={{ fontStyle: 'italic', color: DL.red }}>A business decision.</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
export default DoModels;
