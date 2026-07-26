import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP } from '../../lib/danslab';

// Ep10 — the bottom strip: DansLab link (always) + THE COMPANY BILL accruing.
// Every time a piece of the company is named, a labelled chip pops above the
// counter SAYING what just landed (+$153 Mac Studio …) — we point at what we show.
// Canvas 1920×170: bar is the bottom 70px, chips pop in the 100px above it.
export const compositionConfig = {
  id: 'YHud', durationInSeconds: 1353, fps: 30, width: 1920, height: 170, transparent: true,
};

const FPS = 30;

// blend a hex color toward white by t (the "hot" pop when a number changes)
const hot = (hex: string, t: number) => {
  const n = parseInt(hex.slice(1), 16);
  const ch = (c: number) => Math.round(c + (255 - c) * t * 0.85);
  return `rgb(${ch(n >> 16)},${ch((n >> 8) & 255)},${ch(n & 255)})`;
};
const BAR_IN = 46.6;
const BAR_OUT = 1289.1;

// (secondsFinal, newTotal, what just landed)
const BILL: [number, number, string][] = [
  [138.7, 153, '+$153 · Mac Studio'],
  [153.0, 175, '+$22 · Mac Mini'],
  [185.6, 415, '+$240 · four servers'],
  [284.0, 815, '+$400 · Anthropic ×2'],
  [293.0, 1015, '+$200 · ChatGPT Pro'],
  [308.5, 1065, '+$50 · GLM + Kimi'],
  [390.0, 1110, '+$45 · Supabase + Vercel'],
  [442.0, 1242, '+$132 · tools — LOCKED'],
];

const YHud: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  let value = 0, prev = 0, lastAt = -1, lastLabel = '';
  for (const [t, v, label] of BILL) {
    const at = t * FPS;
    const s = spring({ frame: f - at, fps, config: { damping: 200, mass: 0.6 } });
    value += (v - prev) * (f >= at ? s : 0);
    prev = v;
    if (f >= at) { lastAt = at; lastLabel = label; }
  }
  const flash = lastAt < 0 ? 0 : interpolate(f, [lastAt, lastAt + 48], [1, 0], DCLAMP);
  // the sign chip: pops above the counter for ~2.6s naming what landed
  const chipLife = lastAt < 0 ? 0 : f - lastAt;
  const chipIn = spring({ frame: chipLife, fps, config: { damping: 13, mass: 0.6 } });
  const chipOp = lastAt < 0 ? 0 : interpolate(chipLife, [0, 4, 66, 80], [0, 1, 1, 0], DCLAMP);
  const inOp = interpolate(f, [BAR_IN * FPS, BAR_IN * FPS + 24], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const outOp = interpolate(f, [BAR_OUT * FPS, BAR_OUT * FPS + 24], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  const y = interpolate(f, [BAR_IN * FPS, BAR_IN * FPS + 24], [70, 0], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: inOp * outOp }}>
      {/* the sign — names what just hit the bill, points down at the counter */}
      <div style={{
        position: 'absolute', right: 48, top: 14, display: 'flex', alignItems: 'center', gap: 14,
        opacity: chipOp, transform: `translateY(${(1 - chipIn) * 26}px)`,
      }}>
        <span style={{
          fontFamily: DL_MONO, fontWeight: 700, fontSize: 26, color: DL.bg,
          background: DL.gold, borderRadius: 10, padding: '8px 18px',
        }}>{lastLabel}</span>
        <svg width="30" height="40" viewBox="0 0 30 40">
          <path d="M15 2 V30 M15 30 L5 19 M15 30 L25 19" stroke={DL.gold} strokeWidth="5"
                fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* the bar */}
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
          <span style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 4, color: DL.faint }}>THE COMPANY BILL</span>
          <span style={{
            fontFamily: DL_MONO, fontWeight: 700, fontSize: 34,
            color: flash > 0.05 ? hot(DL.gold, flash) : DL.gold,
            display: 'inline-block', transformOrigin: 'right center',
            transform: `scale(${1 + 0.35 * flash})`,
            textShadow: `0 0 ${22 * flash}px rgba(212,160,23,${0.9 * flash})`,
          }}>${Math.round(value).toLocaleString('en-US')}</span>
          <span style={{ fontFamily: DL_SANS, fontSize: 20, color: DL.muted }}>/mo · never resets</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YHud;
