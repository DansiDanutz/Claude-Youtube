import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP } from '../../lib/danslab';

// Ep12 — bottom strip: DansLab link (mandatory every episode) + the REVENUE counter.
// The counter is the episode: it reads $0.00 from the cold open and changes exactly
// once (POP: scale ~1.3×, blend to white, glow, ~1.5s) at LANDS_AT — or never.
// Canvas 1920×170 (chips pop above the 70px bar), composited at mux.
export const compositionConfig = {
  id: 'WHud', durationInSeconds: 660, fps: 30, width: 1920, height: 170, transparent: true,
};

const FPS = 30;
// TODO(ep12): set from the real concat (assemble.py prints segment starts). All seconds FINAL timeline.
const BAR_IN = 12.0;           // counter fades in during dol02 ("That counter is live")
const BAR_OUT = 999.0;         // never — "the counter stays on screen from here on" (dol22); set to TOTAL-1 at mux
const LANDS_AT: number | null = null;  // seconds of the real counter change in WLands; null = dol23b (stays $0.00)
const AMOUNT = '$10.00';       // ❓ Dan: the real first payment (RECEIPTS.md decision 1) — USDC, 1:1
// (secondsFinal, label) — THE RAIL segment chips (set times from the real concat; 0 = hidden)
const STEPS: [number, string][] = [
  [0, 'LINK — checkout created'],
  [0, 'SCAN — paid from their wallet'],
  [0, 'VERIFIED — on-chain'],
  [0, 'IN THE WALLET — no custody'],
];

const WHud: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  let lastAt = -1, lastLabel = '';
  for (const [t, label] of STEPS) {
    if (t > 0 && f >= t * FPS) { lastAt = t * FPS; lastLabel = label; }
  }
  const chipLife = lastAt < 0 ? 0 : f - lastAt;
  const chipIn = spring({ frame: chipLife, fps, config: { damping: 13, mass: 0.6 } });
  const chipOp = lastAt < 0 ? 0 : interpolate(chipLife, [0, 4, 66, 80], [0, 1, 1, 0], DCLAMP);

  const landed = LANDS_AT !== null && f >= LANDS_AT * FPS;
  const popLife = LANDS_AT === null ? 0 : f - LANDS_AT * FPS;
  const pop = landed ? interpolate(popLife, [0, 12, 45], [0, 1, 0], { ...DCLAMP, easing: DL_EASE.out }) : 0;
  const glow = landed ? interpolate(popLife, [0, 8, 90], [0, 1, 0.25], DCLAMP) : 0;

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
        }}>✓ {lastLabel}</span>
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
          <span style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 4, color: DL.faint }}>REVENUE</span>
          <span style={{
            fontFamily: DL_MONO, fontWeight: 700, fontSize: 34, color: landed ? '#ffffff' : DL.gold,
            display: 'inline-block', transformOrigin: 'right center',
            transform: `scale(${1 + 0.3 * pop})`,
            textShadow: `0 0 ${26 * glow}px rgba(212,160,23,${0.95 * glow})`,
          }}>{landed ? AMOUNT : '$0.00'}</span>
          <span style={{ fontFamily: DL_SANS, fontSize: 20, color: DL.muted }}>· since episode one</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default WHud;
