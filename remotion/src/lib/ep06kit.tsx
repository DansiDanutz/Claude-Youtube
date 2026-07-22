import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP } from './danslab';
import { rise } from './ep03kit';

const seed = (n: number) => { const x = Math.sin(n * 7919.7) * 43758.5; return x - Math.floor(x); };
const SUITS: Record<string, { g: string; red: boolean }> = { '♠': { g: '♠', red: false }, '♥': { g: '♥', red: true }, '♦': { g: '♦', red: true }, '♣': { g: '♣', red: false } };

// A playing card — deals in with a spring, gentle float, optional flip.
export const Card: React.FC<{ rank: string; suit: string; at: number; w?: number; rot?: number; delay?: number }> = ({ rank, suit, at, w = 130, rot = 0, delay = 0 }) => {
  const frame = useCurrentFrame();
  const t = frame - at - delay;
  const p = spring({ frame: t, fps: 30, config: { damping: 15, mass: 0.8 } });
  const y = interpolate(p, [0, 1], [70, 0]);
  const op = interpolate(t, [0, 8], [0, 1], DCLAMP);
  const float = Math.sin((frame + at * 5) / 40) * 4;
  const red = SUITS[suit]?.red;
  const col = red ? '#c0392b' : '#1a1a1a';
  const h = w * 1.4;
  return (
    <div style={{ opacity: op, transform: `translateY(${y + float}px) rotate(${rot}deg) scale(${interpolate(p, [0, 1], [0.85, 1])})`, width: w, height: h, borderRadius: w * 0.09, background: 'linear-gradient(160deg,#fff,#eee)', boxShadow: '0 18px 40px rgba(0,0,0,0.5)', position: 'relative', border: '1px solid #ddd' }}>
      <div style={{ position: 'absolute', top: 8, left: 10, textAlign: 'center', lineHeight: 1 }}>
        <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: w * 0.24, color: col }}>{rank}</div>
        <div style={{ fontSize: w * 0.2, color: col }}>{suit}</div>
      </div>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: w * 0.5, color: col }}>{suit}</div>
      <div style={{ position: 'absolute', bottom: 8, right: 10, textAlign: 'center', lineHeight: 1, transform: 'rotate(180deg)' }}>
        <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: w * 0.24, color: col }}>{rank}</div>
        <div style={{ fontSize: w * 0.2, color: col }}>{suit}</div>
      </div>
    </div>
  );
};

// A stack of poker chips.
export const ChipStack: React.FC<{ at: number; count?: number; color?: string; size?: number }> = ({ at, count = 6, color = DL.red, size = 84 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: 'relative', width: size, height: size * 0.5 + count * 9 }}>
      {Array.from({ length: count }, (_, i) => {
        const t = frame - at - i * 4;
        const op = interpolate(t, [0, 8], [0, 1], DCLAMP);
        const drop = interpolate(t, [0, 10], [-40, 0], { ...DCLAMP, easing: DL_EASE.out });
        return (
          <div key={i} style={{ position: 'absolute', bottom: i * 9 + drop, left: 0, width: size, height: size * 0.42, borderRadius: '50%', background: `radial-gradient(ellipse at 50% 40%, ${color}, ${color}bb)`, border: `${size * 0.05}px dashed #ffffffcc`, boxShadow: '0 4px 8px rgba(0,0,0,0.4)', opacity: op }} />
        );
      })}
    </div>
  );
};

// A felt table surface (green), sits behind cards/chips.
export const Felt: React.FC<{ at?: number; w?: number; h?: number }> = ({ at = 0, w = 1400, h = 460 }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [at, at + 24], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ opacity: op, width: w, height: h, borderRadius: h / 2, background: 'radial-gradient(ellipse at 50% 40%, #0e5a3a, #073d27 70%)', border: '10px solid #3a2a1e', boxShadow: 'inset 0 0 80px rgba(0,0,0,0.5), 0 40px 90px rgba(0,0,0,0.5)' }} />
  );
};

// The three Nervix "doors": earn / hire / barter.
export const ThreeDoors: React.FC<{ at: number; doors: { icon: React.ReactNode; k: string; title: string; body: string; color: string }[] }> = ({ at, doors }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 30 }}>
      {doors.map((d, i) => {
        const a = at + i * 30;
        return (
          <div key={d.k} style={{ ...rise(frame, a, 26, 18), width: 400, background: DL.panel, border: `1px solid ${d.color}55`, borderRadius: 20, padding: '34px 36px', boxShadow: `0 0 50px ${d.color}14` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {d.icon}
              <span style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 2, color: d.color }}>{d.k}</span>
            </div>
            <div style={{ fontFamily: DL_SERIF, fontSize: 34, color: DL.text, margin: '16px 0 10px' }}>{d.title}</div>
            <div style={{ fontFamily: DL_SANS, fontSize: 23, color: DL.dim, lineHeight: 1.45 }}>{d.body}</div>
          </div>
        );
      })}
    </div>
  );
};

// The ecosystem catching fire — nodes multiply + connect, faster and faster.
export const NetworkFuel: React.FC<{ at: number; w?: number; h?: number }> = ({ at, w = 1400, h = 520 }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - at);
  const N = 46;
  const nodes = Array.from({ length: N }, (_, i) => ({
    x: 120 + seed(i * 2 + 1) * (w - 240),
    y: 60 + seed(i * 3 + 2) * (h - 120),
    born: Math.floor(seed(i * 5 + 3) * 200),      // appear over time (accelerating)
    c: [DL.green, DL.sky, DL.gold, DL.red][Math.floor(seed(i * 7 + 4) * 4)],
    r: 5 + seed(i * 11 + 6) * 5,
  }));
  const live = nodes.filter((n) => t >= n.born);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ overflow: 'visible' }}>
      {live.map((n, i) => live.slice(i + 1).map((m, j) => {
        const d = Math.hypot(n.x - m.x, n.y - m.y);
        if (d > 240) return null;
        return <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke={DL.sky} strokeWidth={0.7} opacity={0.12} />;
      }))}
      {live.map((n, i) => {
        const age = t - n.born;
        const pop = interpolate(age, [0, 12], [0, 1], DCLAMP);
        const gl = 0.4 + 0.6 * Math.abs(Math.sin((frame + i * 20) / 22));
        return (
          <g key={i} opacity={pop}>
            <circle cx={n.x} cy={n.y} r={n.r + 6} fill={n.c} opacity={0.15 * gl} />
            <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} opacity={0.85} />
          </g>
        );
      })}
    </svg>
  );
};

// A stat pill (for the live Nervix numbers).
export const StatPill: React.FC<{ big: string; label: string; at: number; color?: string }> = ({ big, label, at, color = DL.text }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ ...rise(frame, at, 18, 14), background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 16, padding: '20px 30px', textAlign: 'center', minWidth: 200 }}>
      <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 48, color }}>{big}</div>
      <div style={{ fontFamily: DL_MONO, fontSize: 18, color: DL.faint, letterSpacing: 2, textTransform: 'uppercase', marginTop: 6 }}>{label}</div>
    </div>
  );
};
