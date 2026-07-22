import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP } from './danslab';

// ── Ep03 "The Trader" shared trading widgets — native vector, on-brand, 4K-crisp.
// All animated by frame; `at` is the local start frame for each element's entrance.

export const rise = (frame: number, at: number, dy = 22, dur = 16) => ({
  opacity: interpolate(frame, [at, at + dur], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
  transform: `translateY(${interpolate(frame, [at, at + dur], [dy, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
});

// Framed dark card, the sienna-pro "sp-card" look.
export const Panel: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; at?: number; glow?: string }> = ({ children, style, at = 0, glow }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [at, at + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const sc = interpolate(frame, [at, at + 20], [0.97, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ opacity: op, transform: `scale(${sc})`, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 20, boxShadow: glow ? `0 30px 80px rgba(0,0,0,0.5), 0 0 60px ${glow}22` : '0 30px 80px rgba(0,0,0,0.5)', ...style }}>
      {children}
    </div>
  );
};

export const SLabel: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = DL.red }) => (
  <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 5, textTransform: 'uppercase', color }}>{children}</div>
);

// A stat card: label / big number / sub.
export const StatCard: React.FC<{ label: string; big: string; sub: string; color?: string; at?: number; w?: number }> = ({ label, big, sub, color = DL.text, at = 0, w = 360 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ ...rise(frame, at), width: w, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 18, padding: '26px 30px' }}>
      <div style={{ fontFamily: DL_MONO, fontSize: 19, letterSpacing: 3, color: DL.faint, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 58, color, marginTop: 10, lineHeight: 1 }}>{big}</div>
      <div style={{ fontFamily: DL_SANS, fontSize: 22, color: DL.dim, marginTop: 12 }}>{sub}</div>
    </div>
  );
};

// A weighted score row with an animated fill bar (value 0..100).
export const ScoreRow: React.FC<{ label: string; weight: string; value: number; color: string; at: number; w?: number }> = ({ label, weight, value, color, at, w = 900 }) => {
  const frame = useCurrentFrame();
  const fill = interpolate(frame, [at, at + 26], [0, value], { ...DCLAMP, easing: DL_EASE.out });
  const num = Math.round(fill);
  return (
    <div style={{ ...rise(frame, at, 14), display: 'flex', alignItems: 'center', gap: 26, width: w }}>
      <div style={{ width: 220, fontFamily: DL_SANS, fontSize: 30, color: DL.text }}>{label}</div>
      <div style={{ width: 90, fontFamily: DL_MONO, fontSize: 22, color: DL.faint }}>{weight}</div>
      <div style={{ flex: 1, height: 16, background: DL.panel2, borderRadius: 8, overflow: 'hidden', border: `1px solid ${DL.border}` }}>
        <div style={{ width: `${fill}%`, height: '100%', background: color, opacity: 0.85, borderRadius: 8 }} />
      </div>
      <div style={{ width: 70, textAlign: 'right', fontFamily: DL_MONO, fontWeight: 700, fontSize: 32, color: DL.text }}>{num}</div>
    </div>
  );
};

// One rung of the doubling ladder: $margin at Nx. Highlights when active.
export const LadderStep: React.FC<{ margin: string; lev: string; note: string; at: number; active?: boolean; color?: string }> = ({ margin, lev, note, at, active, color = DL.red }) => {
  const frame = useCurrentFrame();
  const p = spring({ frame: frame - at, fps: 30, config: { damping: 16, mass: 0.7 } });
  const op = interpolate(frame, [at, at + 10], [0, 1], DCLAMP);
  return (
    <div style={{ opacity: op, transform: `translateX(${interpolate(p, [0, 1], [-40, 0])}px) scale(${interpolate(p, [0, 1], [0.9, 1])})`, display: 'flex', alignItems: 'center', gap: 22, background: active ? `${color}18` : DL.panel, border: `1px solid ${active ? color : DL.border}`, borderRadius: 14, padding: '18px 26px', width: 620 }}>
      <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 40, color: active ? color : DL.text, width: 150 }}>{margin}</div>
      <div style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.gold, width: 90 }}>{lev}</div>
      <div style={{ fontFamily: DL_SANS, fontSize: 22, color: DL.dim, flex: 1 }}>{note}</div>
    </div>
  );
};

// A liquidation cluster row: price · distance · strength bar. side colors it.
export const ClusterRow: React.FC<{ price: string; dist: string; strength: number; side: 'long' | 'short'; at: number }> = ({ price, dist, strength, side, at }) => {
  const frame = useCurrentFrame();
  const col = side === 'short' ? DL.red : DL.green;
  const w = interpolate(frame, [at, at + 22], [0, strength], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ ...rise(frame, at, 10, 12), display: 'flex', alignItems: 'center', gap: 20, width: 820 }}>
      <div style={{ width: 150, fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: col }}>{price}</div>
      <div style={{ width: 90, fontFamily: DL_MONO, fontSize: 22, color: DL.faint }}>{dist}</div>
      <div style={{ flex: 1, height: 14, background: DL.panel2, borderRadius: 7, overflow: 'hidden' }}>
        <div style={{ width: `${w}%`, height: '100%', background: col, opacity: 0.5 }} />
      </div>
    </div>
  );
};

// Animated equity curve — draws in left→right. pts are 0..1 normalized heights.
export const EquityCurve: React.FC<{ pts: number[]; at: number; w?: number; h?: number; color?: string }> = ({ pts, at, w = 1000, h = 300, color = DL.green }) => {
  const frame = useCurrentFrame();
  const prog = interpolate(frame, [at, at + 70], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const n = pts.length;
  const x = (i: number) => (i / (n - 1)) * w;
  const y = (v: number) => h - v * (h - 30) - 12;
  const shown = Math.max(2, Math.floor(prog * n));
  const line = pts.slice(0, shown).map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const lastX = x(shown - 1), lastY = y(pts[shown - 1]);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="ekfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.22" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" x2={w} y1={y(0.16)} y2={y(0.16)} stroke="#ffffff14" strokeDasharray="4 8" />
      <polygon points={`0,${h} ${line} ${lastX},${h}`} fill="url(#ekfill)" />
      <polyline points={line} fill="none" stroke={color} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lastX} cy={lastY} r={7} fill={color} stroke={DL.bg} strokeWidth={3} />
    </svg>
  );
};

// Small pill chip.
export const Chip: React.FC<{ children: React.ReactNode; color?: string; at?: number }> = ({ children, color = DL.gold, at = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <span style={{ ...rise(frame, at, 10, 12), display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: DL_MONO, fontSize: 22, color, border: `1px solid ${color}55`, borderRadius: 999, padding: '8px 18px', background: `${color}14` }}>{children}</span>
  );
};

// Big animated headline line (serif), rises + fades.
export const Headline: React.FC<{ children: React.ReactNode; at?: number; size?: number; color?: string; italic?: boolean }> = ({ children, at = 0, size = 66, color = DL.text, italic }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ ...rise(frame, at, 24, 18), fontFamily: DL_SERIF, fontStyle: italic ? 'italic' : 'normal', fontWeight: 500, fontSize: size, color, lineHeight: 1.15, letterSpacing: '-0.01em' }}>{children}</div>
  );
};
