import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP, SiteBg } from './danslab';

// Ep12 — shared building blocks so every W* shot reads as one system.
// All `at` values are frames inside the shot, normally from ep12timing.gen.ts (real word times).

export const useRise = () => {
  const f = useCurrentFrame();
  return (at: number, dist = 22, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [dist, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
};

export const usePop = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (at: number, from = 0.6) => {
    const s = spring({ frame: f - at, fps, config: { damping: 12, mass: 0.6 } });
    return { opacity: f < at ? 0 : Math.min(1, (f - at) / 4), transform: `scale(${from + (1 - from) * s})` };
  };
};

/** 0→1 over [at, at+d] on the site easing */
export const useT = () => {
  const f = useCurrentFrame();
  return (at: number, d = 16, ease = DL_EASE.out) => interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: ease });
};

/** Stage: SiteBg + "§ 12 —— LABEL" kicker. `kickerRight` shortens the rule when the top-right RAIL panel is on screen. */
export const Stage: React.FC<{ label: string; glow?: string; kickerRight?: number; children: React.ReactNode }> = ({
  label, glow = DL.red, kickerRight = 120, children,
}) => {
  const f = useCurrentFrame();
  const op = interpolate(f, [4, 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={glow} />
      <div style={{ position: 'absolute', top: 74, left: 120, right: kickerRight, display: 'flex', alignItems: 'center', gap: 26, opacity: op }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.red }}>§ 12</span>
        <div style={{ flex: 1, height: 1, background: DL.border }} />
        <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DL.muted }}>THE FIRST DOLLAR // {label}</span>
      </div>
      {children}
    </AbsoluteFill>
  );
};

export const Title: React.FC<{ at: number; size?: number; color?: string; italic?: boolean; children: React.ReactNode }> = ({
  at, size = 54, color = DL.text, italic, children,
}) => {
  const rise = useRise();
  return (
    <div style={{ ...rise(at, 24, 18), fontFamily: DL_SERIF, fontWeight: 500, fontStyle: italic ? 'italic' : 'normal', fontSize: size, color, lineHeight: 1.2 }}>
      {children}
    </div>
  );
};

type Mark = 'ok' | 'no' | 'todo' | 'dot' | 'warn';
const MARK: Record<Mark, [string, string]> = {
  ok: ['✓', DL.green], no: ['✗', DL.red], todo: ['☐', DL.gold], dot: ['•', DL.gold], warn: ['!', DL.gold],
};

/** list row card (ZMissing pattern) */
export const Row: React.FC<{ at: number; mark?: Mark; size?: number; pulse?: boolean; children: React.ReactNode }> = ({
  at, mark = 'dot', size = 30, pulse = false, children,
}) => {
  const rise = useRise();
  const f = useCurrentFrame();
  const [sym, col] = MARK[mark];
  const glow = pulse ? 0.5 + 0.5 * Math.sin((f - at) / 7) : 0;
  return (
    <div style={{
      ...rise(at), display: 'flex', alignItems: 'center', gap: 24,
      background: DL.panel, border: `1px solid ${mark === 'no' ? DL.red : pulse ? DL.gold : DL.border}`,
      borderLeft: `4px solid ${col}`, borderRadius: 14, padding: '18px 28px',
      boxShadow: pulse ? `0 0 ${30 * glow}px rgba(212,160,23,${0.45 * glow})` : undefined,
    }}>
      <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: size, color: col, width: size }}>{sym}</span>
      <span style={{ fontFamily: DL_SANS, fontSize: size, color: DL.text, lineHeight: 1.3 }}>{children}</span>
    </div>
  );
};

export const Chip: React.FC<{ at: number; color?: string; solid?: boolean; size?: number; children: React.ReactNode }> = ({
  at, color = DL.gold, solid = false, size = 26, children,
}) => {
  const pop = usePop();
  return (
    <span style={{
      ...pop(at), display: 'inline-block', fontFamily: DL_MONO, fontWeight: 700, fontSize: size,
      color: solid ? DL.bg : color, background: solid ? color : 'transparent',
      border: `2px solid ${color}`, borderRadius: 10, padding: '8px 18px', letterSpacing: 1,
    }}>{children}</span>
  );
};

/** rotated rubber stamp (TEST — NOT REVENUE etc.) */
export const Stamp: React.FC<{ at: number; color?: string; size?: number; rot?: number; children: React.ReactNode }> = ({
  at, color = DL.red, size = 24, rot = -6, children,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - at, fps, config: { damping: 10, mass: 0.5 } });
  return (
    <span style={{
      display: 'inline-block', opacity: f < at ? 0 : 1, transform: `rotate(${rot}deg) scale(${1.6 - 0.6 * s})`,
      fontFamily: DL_MONO, fontWeight: 700, fontSize: size, letterSpacing: 3, color,
      border: `3px solid ${color}`, borderRadius: 8, padding: '6px 14px', whiteSpace: 'nowrap',
    }}>{children}</span>
  );
};

/** closing italic line, bottom-left above the HUD bar */
export const Note: React.FC<{ at: number; bottom?: number; children: React.ReactNode }> = ({ at, bottom = 140, children }) => {
  const rise = useRise();
  return (
    <div style={{ position: 'absolute', bottom, left: 120, right: 120, ...rise(at) }}>
      <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>{children}</span>
    </div>
  );
};

/** down-right pointer toward the bottom-bar REVENUE counter */
export const CounterPointer: React.FC<{ at: number; label?: string }> = ({ at, label = 'the counter is live' }) => {
  const pop = usePop();
  const f = useCurrentFrame();
  const bob = Math.sin((f - at) / 8) * 6;
  return (
    <div style={{ position: 'absolute', right: 150, bottom: 96, display: 'flex', alignItems: 'center', gap: 14, ...pop(at) }}>
      <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.gold, letterSpacing: 2 }}>{label}</span>
      <svg width="44" height="54" viewBox="0 0 44 54" style={{ transform: `translateY(${bob}px)` }}>
        <path d="M22 2 V44 M22 44 L8 29 M22 44 L36 29" stroke={DL.gold} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

export const fadeOutLast = (f: number, total: number, d = 12) =>
  interpolate(f, [total - d, total], [1, 0], { ...DCLAMP, easing: DL_EASE.in });

export { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP };
