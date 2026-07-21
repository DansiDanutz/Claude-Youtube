import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';

// =============================================================================
// Origin 1/14 — the cold open. VO 1.2s (18.4s): "Three in the morning.
// Cluj-Napoca, Romania. Dan is asleep. His company is not. Right now, AI
// agents are shipping code, editing video, and watching the markets..."
// Clock first, then three activity pulses, then the promise line.
// =============================================================================
export const compositionConfig = { id: 'DoHook', durationInSeconds: 20.4, fps: 30, width: 1920, height: 1080 };

const PULSES = [
  { label: 'shipping code', at: 218 },
  { label: 'editing video', at: 248 },
  { label: 'watching the markets', at: 278 },
];
const PROMISE = 350; // "this is the story..."

const DoHook: React.FC = () => {
  const frame = useCurrentFrame();
  const clockOp = interpolate(frame, [10, 30], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const placeOp = interpolate(frame, [56, 74], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const asleepOp = interpolate(frame, [110, 128], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const notOp = interpolate(frame, [156, 172], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const promiseOp = interpolate(frame, [PROMISE, PROMISE + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const tick = Math.floor(frame / 30) % 60;

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow="#1a0f0d" />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ opacity: clockOp, fontFamily: DL_MONO, fontSize: 150, letterSpacing: 8, color: DL.text, fontVariantNumeric: 'tabular-nums' }}>
          03:00:{String(tick).padStart(2, '0')}
        </div>
        <div style={{ opacity: placeOp, fontFamily: DL_MONO, fontSize: 27, letterSpacing: 6, color: DL.muted, marginTop: 20 }}>
          CLUJ-NAPOCA · ROMANIA
        </div>

        <div style={{ display: 'flex', gap: 34, marginTop: 66, alignItems: 'baseline' }}>
          <span style={{ opacity: asleepOp, fontFamily: DL_SERIF, fontSize: 56, color: DL.dim }}>Dan is asleep.</span>
          <span style={{ opacity: notOp, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 56, color: DL.gold }}>His company is not.</span>
        </div>

        <div style={{ display: 'flex', gap: 26, marginTop: 60 }}>
          {PULSES.map((p) => {
            const op = interpolate(frame, [p.at, p.at + 12], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
            const pulse = 0.45 + 0.55 * Math.abs(Math.sin((frame - p.at) / 16));
            return (
              <div key={p.label} style={{ opacity: op, display: 'flex', alignItems: 'center', gap: 14, border: `1px solid ${DL.border}`, background: DL.panel, borderRadius: 999, padding: '14px 30px' }}>
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: DL.green, opacity: pulse }} />
                <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.dim }}>{p.label}</span>
              </div>
            );
          })}
        </div>

        <div style={{ opacity: promiseOp, marginTop: 80, fontFamily: DL_SERIF, fontSize: 44, color: DL.text, textAlign: 'center', maxWidth: 1300, lineHeight: 1.4 }}>
          The story of how one man taught software <span style={{ fontStyle: 'italic', color: DL.red }}>to run his businesses.</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default DoHook;
