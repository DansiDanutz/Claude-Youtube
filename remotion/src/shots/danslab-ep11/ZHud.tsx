import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP } from '../../lib/danslab';

// Ep11 — bottom strip: DansLab link (mandatory every episode) + the flywheel
// assembly ticker: PRODUCTS CONNECTED n/5, ticking as each node chapter lands.
// Canvas 1920×170 (chips pop above the 70px bar), composited at mux.
export const compositionConfig = {
  id: 'ZHud', durationInSeconds: 400, fps: 30, width: 1920, height: 170, transparent: true,
};

const FPS = 30;
const BAR_IN = 40.0;
const BAR_OUT = 377.0;
// (secondsFinal, count, label) — node ignition moments
const NODES: [number, number, string][] = [
  [73.0, 1, 'CHANNEL — trust'],
  [88.0, 2, 'NERVIX — nervix.ai'],
  [141.0, 3, 'YOUTUBE MACHINE — 14k proof'],
  [197.0, 4, 'ZMARTY — zmarty.me'],
  [247.0, 5, 'SEMECLAW — the window'],
];

const ZHud: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  let count = 0, lastAt = -1, lastLabel = '';
  for (const [t, c, label] of NODES) {
    if (f >= t * FPS) { count = c; lastAt = t * FPS; lastLabel = label; }
  }
  const flash = lastAt < 0 ? 0 : interpolate(f, [lastAt, lastAt + 48], [1, 0], DCLAMP);
  const chipLife = lastAt < 0 ? 0 : f - lastAt;
  const chipIn = spring({ frame: chipLife, fps, config: { damping: 13, mass: 0.6 } });
  const chipOp = lastAt < 0 ? 0 : interpolate(chipLife, [0, 4, 66, 80], [0, 1, 1, 0], DCLAMP);
  const inOp = interpolate(f, [BAR_IN * FPS, BAR_IN * FPS + 24], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const outOp = interpolate(f, [BAR_OUT * FPS, BAR_OUT * FPS + 24], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  const y = interpolate(f, [BAR_IN * FPS, BAR_IN * FPS + 24], [70, 0], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: inOp * outOp }}>
      <div style={{
        position: 'absolute', right: 48, top: 14, display: 'flex', alignItems: 'center', gap: 14,
        opacity: chipOp, transform: `translateY(${(1 - chipIn) * 26}px)`,
      }}>
        <span style={{
          fontFamily: DL_MONO, fontWeight: 700, fontSize: 26, color: DL.bg,
          background: DL.gold, borderRadius: 10, padding: '8px 18px',
        }}>+ {lastLabel}</span>
        <svg width="30" height="40" viewBox="0 0 30 40">
          <path d="M15 2 V30 M15 30 L5 19 M15 30 L25 19" stroke={DL.gold} strokeWidth="5"
                fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 70, display: 'flex', alignItems: 'center',
        background: 'rgba(9,7,6,0.88)', borderTop: `1px solid ${DL.border}`,
        padding: '0 48px', gap: 40, transform: `translateY(${y}px)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 30 }}>
            <span style={{ color: DL.text }}>Dans</span><span style={{ color: DL.red }}>Lab</span>
          </span>
          <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.gold }}>danslab.vercel.app</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 4, color: DL.faint }}>PRODUCTS CONNECTED</span>
          <span style={{
            fontFamily: DL_MONO, fontWeight: 700, fontSize: 34, color: DL.gold,
            display: 'inline-block', transformOrigin: 'right center',
            transform: `scale(${1 + 0.35 * flash})`,
            textShadow: `0 0 ${22 * flash}px rgba(212,160,23,${0.9 * flash})`,
          }}>{count}/5</span>
          <span style={{ fontFamily: DL_SANS, fontSize: 20, color: DL.muted }}>· the flywheel</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default ZHud;
