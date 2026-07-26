import React from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { loadFont as loadInterNx } from '@remotion/google-fonts/Inter';
import { loadFont as loadMonoNx } from '@remotion/google-fonts/JetBrainsMono';
import { loadFont as loadSerifNx } from '@remotion/google-fonts/CormorantGaramond';

/**
 * Nervix explainer kit — the DansLab production system re-skinned to the LIVE
 * nervix.ai design tokens, plus the thing the brand is actually named after:
 * nerves. The backdrop is a starfield with a synapse network firing across it,
 * and the real product logo (a soma with six axons) appears — animated — in
 * every single shot.
 */
export const NX_SANS = loadInterNx('normal', { weights: ['400', '500', '600', '700'], subsets: ['latin'] }).fontFamily;
export const NX_MONO = loadMonoNx('normal', { weights: ['400', '500', '700'], subsets: ['latin'] }).fontFamily;
export const NX_SERIF = loadSerifNx('normal', { weights: ['500', '600'], subsets: ['latin'] }).fontFamily;

export const NX = {
  bg: '#0e0e0d',
  panel: '#171614',
  panel2: '#1f1d1a',
  border: '#2e2b26',
  text: '#faf9f5',
  dim: '#a8a29a',
  muted: '#7c766d',
  brand: '#cf3a24',
  brandBright: '#f2643f',
  coral: '#cc785c', // the logo's own coral
  gold: '#d4a017',
  green: '#2fb56a',
  sky: '#38bdf8',
  violet: '#8b7bd8',
} as const;

export const NX_EASE = {
  out: Easing.bezier(0.33, 1, 0.68, 1),
  inOut: Easing.bezier(0.37, 0, 0.63, 1),
} as const;

export const NCLAMP = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

export const useRise = () => {
  const f = useCurrentFrame();
  return (at: number, d = 16, dy = 24) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...NCLAMP, easing: NX_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [dy, 0], { ...NCLAMP, easing: NX_EASE.out })}px)`,
  });
};

// ── deterministic scatter (module level — no per-frame recompute) ──────────
const rnd = (seed: number): number => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

/** Starfield: depth, twinkle speed, phase — the DansLab SiteBg pattern. */
const STARS = Array.from({ length: 130 }, (_, i) => ({
  x: rnd(i * 3 + 1) * 1920,
  y: rnd(i * 7 + 2) * 1080,
  s: 0.9 + rnd(i * 11 + 3) * 2.4,
  o: 0.10 + rnd(i * 13 + 5) * 0.42,
  warm: rnd(i * 17 + 7) > 0.80,
  tw: 0.5 + rnd(i * 19 + 9) * 1.8,
  ph: rnd(i * 23 + 11) * Math.PI * 2,
  depth: 0.25 + rnd(i * 29 + 13) * 0.75,
}));

/**
 * The nerve net. Neurons scattered with a clear hole in the middle so the
 * network frames the copy instead of fighting it; edges connect neighbours
 * within reach, and signals travel the edges like impulses down an axon.
 */
const NEURONS = Array.from({ length: 34 }, (_, i) => {
  const a = rnd(i * 31 + 3) * Math.PI * 2;
  // push outward from centre: radius 520..1180 on the long axis
  const rad = 520 + rnd(i * 37 + 5) * 660;
  return {
    x: 960 + Math.cos(a) * rad,
    y: 540 + Math.sin(a) * rad * 0.62,
    r: 2.4 + rnd(i * 41 + 7) * 3.4,
    ph: rnd(i * 43 + 11) * Math.PI * 2,
    drift: 8 + rnd(i * 47 + 13) * 16,
    brand: rnd(i * 53 + 17) > 0.76, // a few carry the brand colour
  };
});

const EDGES: { a: number; b: number; len: number }[] = [];
for (let i = 0; i < NEURONS.length; i++) {
  for (let j = i + 1; j < NEURONS.length; j++) {
    const dx = NEURONS[i].x - NEURONS[j].x;
    const dy = NEURONS[i].y - NEURONS[j].y;
    const len = Math.hypot(dx, dy);
    if (len < 330) EDGES.push({ a: i, b: j, len });
  }
}
/** Which edges carry an impulse, and when — staggered so firing never bunches. */
const IMPULSES = Array.from({ length: 10 }, (_, i) => ({
  edge: Math.floor(rnd(i * 59 + 19) * EDGES.length),
  period: 90 + Math.floor(rnd(i * 61 + 23) * 110), // frames per traversal
  offset: Math.floor(rnd(i * 67 + 29) * 200),
}));

/**
 * Backdrop: near-black canvas, brand glow, drifting starfield, and the living
 * nerve network. Everything is frame-driven and deterministic.
 */
export const NxBackdrop: React.FC<{ glow?: string; children?: React.ReactNode }> = ({
  glow = NX.brand,
  children,
}) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', inset: 0, background: NX.bg, overflow: 'hidden' }}>
      {/* breathing glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(${1250 + Math.sin(f / 70) * 140}px 700px at 50% -8%, ${glow}22, transparent 62%)`,
        opacity: 0.8 + 0.2 * Math.sin(f / 52),
      }} />

      {/* starfield — parallax drift + twinkle */}
      <div style={{ position: 'absolute', inset: 0, transform: `translate(${Math.sin(f / 185) * 26}px, ${Math.cos(f / 225) * 19}px)` }}>
        {STARS.map((st, i) => {
          const tw = 0.5 + 0.5 * Math.sin(f * 0.062 * st.tw + st.ph);
          const dx = Math.sin(f / 150 + st.ph) * 20 * st.depth;
          const dy = Math.cos(f / 170 + st.ph) * 15 * st.depth;
          return (
            <div key={`s${i}`} style={{
              position: 'absolute', left: st.x + dx, top: st.y + dy,
              width: st.s, height: st.s, borderRadius: '50%',
              background: st.warm ? NX.gold : '#ffffff',
              opacity: st.o * (0.5 + 0.55 * tw),
              boxShadow: st.s > 2.4 ? `0 0 ${st.s * 2.4}px ${st.warm ? NX.gold : '#ffffff'}55` : undefined,
            }} />
          );
        })}
      </div>

      {/* the nerve net */}
      <svg viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {EDGES.map((e, i) => {
          const A = NEURONS[e.a];
          const B = NEURONS[e.b];
          const ax = A.x + Math.sin(f / 190 + A.ph) * A.drift;
          const ay = A.y + Math.cos(f / 210 + A.ph) * A.drift * 0.7;
          const bx = B.x + Math.sin(f / 190 + B.ph) * B.drift;
          const by = B.y + Math.cos(f / 210 + B.ph) * B.drift * 0.7;
          // nearer neurons hold a brighter connection
          const strength = interpolate(e.len, [120, 330], [0.30, 0.05], NCLAMP);
          return (
            <line key={`e${i}`} x1={ax} y1={ay} x2={bx} y2={by}
              stroke={NX.coral} strokeWidth={1.1} opacity={strength} />
          );
        })}
        {/* impulses travelling the axons */}
        {IMPULSES.map((im, i) => {
          const e = EDGES[im.edge];
          if (!e) return null;
          const A = NEURONS[e.a];
          const B = NEURONS[e.b];
          const t = (((f + im.offset) % im.period) / im.period);
          const ax = A.x + Math.sin(f / 190 + A.ph) * A.drift;
          const ay = A.y + Math.cos(f / 210 + A.ph) * A.drift * 0.7;
          const bx = B.x + Math.sin(f / 190 + B.ph) * B.drift;
          const by = B.y + Math.cos(f / 210 + B.ph) * B.drift * 0.7;
          const x = ax + (bx - ax) * t;
          const y = ay + (by - ay) * t;
          // fade in at the start of the run, out at the end
          const op = Math.sin(t * Math.PI) * 0.9;
          return (
            <g key={`i${i}`}>
              <circle cx={x} cy={y} r={3.4} fill={NX.brandBright} opacity={op} />
              <circle cx={x} cy={y} r={9} fill={NX.brandBright} opacity={op * 0.22} />
            </g>
          );
        })}
        {/* somas */}
        {NEURONS.map((n, i) => {
          const px = n.x + Math.sin(f / 190 + n.ph) * n.drift;
          const py = n.y + Math.cos(f / 210 + n.ph) * n.drift * 0.7;
          const pulse = 0.55 + 0.45 * Math.sin(f * 0.045 + n.ph);
          const c = n.brand ? NX.brandBright : NX.coral;
          return (
            <g key={`n${i}`}>
              <circle cx={px} cy={py} r={n.r * 3.2} fill={c} opacity={0.05 * pulse} />
              <circle cx={px} cy={py} r={n.r} fill={c} opacity={0.34 + 0.3 * pulse} />
            </g>
          );
        })}
      </svg>

      {/* hairline grid, last so it sits over the net */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${NX.border}44 1px, transparent 1px), linear-gradient(90deg, ${NX.border}44 1px, transparent 1px)`,
        backgroundSize: '96px 96px', opacity: 0.3,
      }} />
      {children}
    </div>
  );
};

/**
 * NxMark — the REAL product logo (client/public/nervix-mark.svg): a soma with
 * six axons ending in terminal nodes. Animated: each terminal fires in a slow
 * clockwise sequence and an impulse runs out along that axon, so the mark does
 * on screen exactly what the network does behind it.
 */
export const NxMark: React.FC<{
  size?: number;
  /** frames per full clockwise cycle */
  period?: number;
  /** draw the axons on, stroke by stroke, over this many frames from `drawAt` */
  drawAt?: number;
  drawFor?: number;
  glow?: boolean;
  style?: React.CSSProperties;
}> = ({ size = 96, period = 96, drawAt, drawFor = 40, glow = true, style }) => {
  const f = useCurrentFrame();
  const TERMINALS: [number, number][] = [
    [32, 7], [54, 19.5], [54, 44.5], [32, 57], [10, 44.5], [10, 19.5],
  ];
  const AXONS: [number, number][] = [
    [32, 9], [52, 20.5], [52, 43.5], [32, 55], [12, 43.5], [12, 20.5],
  ];
  // draw-on: axons extend from the soma one after another
  const grow = (i: number) => {
    if (drawAt === undefined) return 1;
    const per = drawFor / AXONS.length;
    return interpolate(f, [drawAt + i * per, drawAt + (i + 1) * per], [0, 1], { ...NCLAMP, easing: NX_EASE.out });
  };
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={style}>
      {AXONS.map(([x, y], i) => {
        const g = grow(i);
        return (
          <line key={`a${i}`} x1={32} y1={32} x2={32 + (x - 32) * g} y2={32 + (y - 32) * g}
            stroke={NX.coral} strokeWidth={4.5} strokeLinecap="round" />
        );
      })}
      {TERMINALS.map(([x, y], i) => {
        // clockwise firing: this terminal is hot when the sweep passes it
        const phase = ((f / period) % 1) * TERMINALS.length;
        const d = Math.min(Math.abs(phase - i), TERMINALS.length - Math.abs(phase - i));
        const hot = Math.max(0, 1 - d);
        const g = grow(i);
        return (
          <g key={`t${i}`} opacity={g}>
            {glow && <circle cx={x} cy={y} r={4.5 + hot * 5} fill={NX.brandBright} opacity={hot * 0.35} />}
            <circle cx={x} cy={y} r={4.5} fill={hot > 0.45 ? NX.brandBright : NX.coral} />
          </g>
        );
      })}
      {/* impulse running out along the firing axon */}
      {(() => {
        const phase = ((f / period) % 1) * TERMINALS.length;
        const i = Math.floor(phase);
        const t = phase - i;
        const [tx, ty] = AXONS[i % AXONS.length];
        return (
          <circle cx={32 + (tx - 32) * t} cy={32 + (ty - 32) * t} r={2.6}
            fill={NX.brandBright} opacity={(1 - t) * 0.9 * grow(i % AXONS.length)} />
        );
      })()}
      <circle cx={32} cy={32} r={8.5} fill={NX.bg} />
      <circle cx={32} cy={32} r={8.5} fill="none" stroke={NX.coral} strokeWidth={1.2}
        opacity={0.5 + 0.5 * Math.sin(f * 0.06)} />
    </svg>
  );
};

export const NxEyebrow: React.FC<{ children: React.ReactNode; color?: string; style?: React.CSSProperties }> = ({
  children, color = NX.brandBright, style,
}) => (
  <div style={{ fontFamily: NX_MONO, fontSize: 24, letterSpacing: 10, textTransform: 'uppercase', color, ...style }}>
    {children}
  </div>
);

export const NxStat: React.FC<{ value: string; label: string; color?: string }> = ({
  value, label, color = NX.text,
}) => (
  <div style={{
    padding: '24px 34px', borderRadius: 16, border: `1px solid ${NX.border}`,
    background: NX.panel + 'dd', textAlign: 'center', minWidth: 240,
    backdropFilter: 'blur(2px)',
  }}>
    <div style={{ fontFamily: NX_MONO, fontSize: 54, fontWeight: 700, color }}>{value}</div>
    <div style={{ fontFamily: NX_SANS, fontSize: 22, color: NX.muted, marginTop: 6, letterSpacing: 1 }}>{label}</div>
  </div>
);

/** Persistent bottom bar — carries the ANIMATED logo in every single shot. */
export const NxFooter: React.FC<{ note?: string }> = ({ note = 'nervix.ai' }) => (
  <div style={{
    position: 'absolute', left: 0, right: 0, bottom: 0, height: 70,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 54px', background: `linear-gradient(to top, ${NX.bg}ee, transparent)`,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <NxMark size={38} period={110} />
      <span style={{ fontFamily: NX_SANS, fontSize: 24, fontWeight: 600, color: NX.text, letterSpacing: 1 }}>
        NERVIX
      </span>
    </div>
    <div style={{ fontFamily: NX_MONO, fontSize: 22, color: NX.brandBright }}>{note}</div>
  </div>
);
