import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP } from '../../lib/danslab';

// Ep10 — the persistent ledger bar. Rendered as a transparent 1920×70 strip and
// composited into the reserved bottom 70px of the final master (design system:
// nothing critical lives there, so it never collides with a shot).
// The two columns the narration promises in rules01: what Dan pays vs what the
// same eight seats cost in humans. Numbers move only when Brian lands them.
// Times are FINAL-timeline seconds (YIntro 13.0s is segment 0).
export const compositionConfig = {
  id: 'YHud', durationInSeconds: 1353, fps: 30, width: 1920, height: 70, transparent: true,
};

const FPS = 30;
const BAR_IN = 65.9;   // "Two columns. What Dan pays. What a human costs."
const BAR_OUT = 1289.1; // YWhy — the close runs clean

// (secondsFinal, newTotal)
const DAN: [number, number][] = [
  [138.7, 153], [153.0, 175], [185.6, 415], [284.0, 815], [293.0, 1015],
  [308.5, 1065], [390.0, 1110], [442.0, 1242],
];
const HUMAN: [number, number][] = [
  [499.4, 14625], [522.4, 27625], [538.8, 39542], [569.2, 49834],
  [582.3, 61751], [632.6, 76918], [682.8, 92626], [731.9, 109958],
];

const useTicker = (events: [number, number][]) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  let value = 0, lastAt = -1;
  for (const [t] of events) {
    const at = t * FPS;
    if (f >= at) lastAt = at;
  }
  // eased accumulate: each step springs from the previous value
  let prev = 0;
  for (const [t, v] of events) {
    const at = t * FPS;
    const s = spring({ frame: f - at, fps, config: { damping: 200, mass: 0.6 } });
    value += (v - prev) * (f >= at ? s : 0);
    prev = v;
  }
  const flash = lastAt < 0 ? 0 : interpolate(f, [lastAt, lastAt + 24], [1, 0], DCLAMP);
  return { value: Math.round(value), flash };
};

const YHud: React.FC = () => {
  const f = useCurrentFrame();
  const dan = useTicker(DAN);
  const human = useTicker(HUMAN);
  const inOp = interpolate(f, [BAR_IN * FPS, BAR_IN * FPS + 24], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const outOp = interpolate(f, [BAR_OUT * FPS, BAR_OUT * FPS + 24], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  const y = interpolate(f, [BAR_IN * FPS, BAR_IN * FPS + 24], [70, 0], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: inOp * outOp, transform: `translateY(${y}px)` }}>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
        background: 'rgba(9,7,6,0.88)', borderTop: `1px solid ${DL.border}`,
        padding: '0 48px', gap: 40,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 30 }}>
            <span style={{ color: DL.text }}>Dans</span><span style={{ color: DL.red }}>Lab</span>
          </span>
          <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.gold }}>danslab.vercel.app</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 4, color: DL.faint }}>DAN PAYS</span>
          <span style={{
            fontFamily: DL_MONO, fontWeight: 700, fontSize: 32, color: DL.gold,
            textShadow: `0 0 ${14 * dan.flash}px rgba(212,160,23,${0.8 * dan.flash})`,
          }}>${dan.value.toLocaleString('en-US')}</span>
          <span style={{ fontFamily: DL_SANS, fontSize: 20, color: DL.muted }}>/mo</span>
        </div>
        <div style={{ width: 1, height: 34, background: DL.border }} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 4, color: DL.faint }}>8 HUMANS</span>
          <span style={{
            fontFamily: DL_MONO, fontWeight: 700, fontSize: 32, color: DL.red,
            textShadow: `0 0 ${14 * human.flash}px rgba(231,76,60,${0.8 * human.flash})`,
          }}>${human.value.toLocaleString('en-US')}</span>
          <span style={{ fontFamily: DL_SANS, fontSize: 20, color: DL.muted }}>/mo</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YHud;
