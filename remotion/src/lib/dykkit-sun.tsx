// Did You Know That? — No. 02 "The Sun" additions to the episode kit. NEW exports only:
// lib/dykkit.tsx and lib/dytbrand.tsx stay byte-identical so episode 01 renders exactly as audited.
//   EpisodeHud      the bottom HUD with an episode number (dykkit's EraHud hard-codes "NO. 01")
//   SunDisc         the Sun as a glowing disc, optional sunspots + rotation
//   SafetyTag       "never look at the Sun" warning chip
//   LightBeam       Sun → Earth light path with a travelling photon (the 8 min 20 s idea)
//   Spectrum        prism + rainbow fan + optional thermometers (Newton 1704 / Herschel 1800)
//   DigitalClock    hh:mm:ss readout
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_EASE } from './danslab';
import { DytLogo, DYT_DISPLAY } from './dytbrand';
import { ease, SERIES } from './dykkit';

export const SUN = { core: '#fff3c4', mid: '#ffc94a', rim: '#ff8a1f', deep: '#c2410c', glow: '#ffb347' } as const;
export const RAINBOW = ['#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#32ade6', '#5856d6', '#af52de'];

// ── Bottom HUD: same geometry and type as dykkit EraHud, episode number as a prop.
export const EpisodeHud: React.FC<{ year: number | string; episode: string; prediction?: boolean }> = ({ year, episode, prediction = false }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', left: 96, right: 96, bottom: 54, height: 56, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 28, borderTop: `1px solid ${DL.border}`, background: '#05040499', opacity: ease(f, 2, 14) }}>
      <DytLogo size={40} />
      <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 24, letterSpacing: 1, color: DL.text }}>{SERIES}</span>
      <span style={{ fontFamily: DL_MONO, fontSize: 19, letterSpacing: 5, color: DL.faint }}>NO. {episode}</span>
      <div style={{ flex: 1 }} />
      <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 22, letterSpacing: 1, color: DL.gold }}>Dexty.live</span>
      {prediction && <span style={{ fontFamily: DL_MONO, fontSize: 19, letterSpacing: 4, color: DL.red }}>PREDICTION</span>}
      <span style={{ fontFamily: DL_MONO, fontSize: 19, letterSpacing: 5, color: DL.faint }}>YEAR</span>
      <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: DL.gold, fontVariantNumeric: 'tabular-nums', minWidth: 80, textAlign: 'right' }}>{year}</span>
    </div>
  );
};

export type Spot = { x: number; y: number; r: number; at?: number };
// The Sun. `spin` slides the spots across the disc (Galileo: the Sun is turning); spots fade in at `at`.
export const SunDisc: React.FC<{ size?: number; glow?: number; spots?: Spot[]; spin?: number; dim?: number; id?: string }> = ({ size = 320, glow = 1, spots = [], spin = 0, dim = 0, id = 'sun' }) => {
  const f = useCurrentFrame();
  const r = size / 2;
  const pulse = 1 + 0.03 * Math.sin(f / 18);
  return (
    <svg width={size * 1.8} height={size * 1.8} viewBox={`${-r * 0.8} ${-r * 0.8} ${size * 1.8} ${size * 1.8}`} style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={`${id}-g`} cx="42%" cy="40%" r="62%">
          <stop offset="0" stopColor={SUN.core} />
          <stop offset="0.5" stopColor={SUN.mid} />
          <stop offset="0.9" stopColor={SUN.rim} />
          <stop offset="1" stopColor={SUN.deep} />
        </radialGradient>
        <radialGradient id={`${id}-h`}>
          <stop offset="0.45" stopColor={SUN.glow} stopOpacity={0.55 * glow} />
          <stop offset="1" stopColor={SUN.glow} stopOpacity={0} />
        </radialGradient>
        <clipPath id={`${id}-c`}><circle cx={r} cy={r} r={r} /></clipPath>
      </defs>
      <circle cx={r} cy={r} r={r * 1.75 * pulse} fill={`url(#${id}-h)`} />
      <circle cx={r} cy={r} r={r} fill={`url(#${id}-g)`} />
      <g clipPath={`url(#${id}-c)`}>
        {spots.map((s, i) => {
          const x = s.x + spin * size;
          const edge = Math.abs(x - r) / r; // foreshortened near the limb
          return <ellipse key={i} cx={x} cy={s.y} rx={s.r * Math.max(0.25, 1 - edge * edge)} ry={s.r} fill="#3a1a06" opacity={(s.at === undefined ? 1 : ease(f, s.at, s.at + 10)) * 0.85} />;
        })}
        <circle cx={r} cy={r} r={r} fill="#000" opacity={dim} />
      </g>
    </svg>
  );
};

export const SafetyTag: React.FC<{ at: number; out?: number }> = ({ at, out = 1e9 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: '12px 22px', borderRadius: 10, border: `2px solid ${DL.red}`, background: '#1a0606ee', opacity: ease(f, at, at + 8) * (1 - ease(f, out - 8, out)), fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.red }}>
      <svg width={30} height={30} viewBox="0 0 30 30"><path d="M15 3 L28 26 H2 Z" fill="none" stroke={DL.red} strokeWidth={3} strokeLinejoin="round" /><rect x={13.5} y={11} width={3} height={8} fill={DL.red} /><rect x={13.5} y={21} width={3} height={3} fill={DL.red} /></svg>
      NEVER LOOK AT THE SUN — IT CAN BLIND YOU
    </div>
  );
};

// Sun (left) → Earth (right). progress 0..1 = how far the photon has travelled.
export const LightBeam: React.FC<{ w?: number; progress: number; label?: string; at?: number }> = ({ w = 1500, progress, label, at = 0 }) => {
  const f = useCurrentFrame();
  const x0 = 120, x1 = w - 60, y = 90;
  const px = x0 + (x1 - x0) * progress;
  return (
    <svg width={w} height={180} viewBox={`0 0 ${w} 180`} style={{ opacity: ease(f, at, at + 10) }}>
      <defs><radialGradient id="lbSun"><stop offset="0" stopColor={SUN.core} /><stop offset="0.7" stopColor={SUN.mid} /><stop offset="1" stopColor={SUN.rim} /></radialGradient></defs>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke={DL.border} strokeWidth={3} strokeDasharray="8 10" />
      <line x1={x0} y1={y} x2={px} y2={y} stroke={SUN.mid} strokeWidth={4} opacity={0.8} />
      <circle cx={x0 - 20} cy={y} r={70} fill="url(#lbSun)" />
      <circle cx={x1} cy={y} r={22} fill="#2f7fd6" />
      <path d={`M${x1 - 14} ${y - 8} q 10 -8 18 0 q -4 10 -14 8 z`} fill="#34c759" opacity={0.8} />
      <circle cx={px} cy={y} r={11} fill={SUN.core} style={{ filter: `drop-shadow(0 0 12px ${SUN.mid})` }} />
      {label && <text x={(x0 + x1) / 2} y={y + 64} textAnchor="middle" fill={DL.dim} fontFamily={DL_MONO} fontSize={24} letterSpacing={4}>{label}</text>}
      <text x={x1} y={y + 56} textAnchor="middle" fill={DL.dim} fontFamily={DL_MONO} fontSize={20} letterSpacing={3}>YOU</text>
    </svg>
  );
};

// Prism splits a white beam into a fan of colours. `fan` 0..1 opens the rainbow; `beyond` lights the
// invisible band past red; `thermo` shows Herschel's three thermometers (readings 0..1 rise with `heat`).
// redOp / violetOp fade the end labels in on their spoken words (never before).
// bulbs 0..1 = thermometer bulbs grey → blackened (Herschel painted them black).
export const Spectrum: React.FC<{ fan: number; beyond?: number; thermo?: number; heat?: number; redOp?: number; violetOp?: number; bulbs?: number }> = ({ fan, beyond = 0, thermo = 0, heat = 0, redOp = 1, violetOp = 1, bulbs = 1 }) => {
  const W = 1120, H = 520, px = 360, py = 290;
  const bands = RAINBOW.length;
  const fanY = (i: number) => py + ((i - (bands - 1) / 2) * 44 + 30) * fan;
  const xEnd = 1000;
  // thermometer positions: violet-ish, red, beyond red
  const tY = [fanY(5), fanY(0), fanY(0) - 46 * fan];
  const tX = [760, 860, 960];
  const reads = [0.35, 0.6, 0.85].map((v) => v * heat);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <line x1={0} y1={py - 40} x2={px - 40} y2={py - 10} stroke="#fff8e1" strokeWidth={10} opacity={0.9} />
      <path d={`M${px - 70} ${py + 70} L${px} ${py - 90} L${px + 70} ${py + 70} Z`} fill="#bfe8ff22" stroke="#d6f0ff" strokeWidth={4} />
      {RAINBOW.map((c, i) => (
        <polygon key={c} points={`${px + 20},${py - 4} ${px + 20},${py + 4} ${px + 20 + (xEnd - px - 20) * fan},${fanY(i) + 16} ${px + 20 + (xEnd - px - 20) * fan},${fanY(i) - 16}`} fill={c} opacity={0.85 * Math.min(1, fan * 1.5)} />
      ))}
      {/* the invisible band beyond red: a dashed outline, never a colour */}
      <polygon points={`${px + 20},${py - 4} ${px + 20 + (xEnd - px - 20) * fan},${fanY(0) - 66} ${px + 20 + (xEnd - px - 20) * fan},${fanY(0) - 22}`} fill={DL.red} opacity={0.12 * beyond} stroke={DL.red} strokeDasharray="6 8" strokeWidth={2} strokeOpacity={beyond} />
      <text x={xEnd + 12} y={fanY(0) + 8} fill={RAINBOW[0]} opacity={redOp * fan} fontFamily={DL_MONO} fontSize={22}>RED</text>
      <text x={xEnd + 12} y={fanY(6) + 8} fill={RAINBOW[6]} opacity={violetOp * fan} fontFamily={DL_MONO} fontSize={22}>VIOLET</text>
      {beyond > 0.01 && <text x={xEnd + 12} y={fanY(0) - 40} fill={DL.red} opacity={beyond} fontFamily={DL_MONO} fontSize={22}>?</text>}
      {thermo > 0 && tY.map((y, i) => (
        <g key={i} transform={`translate(${tX[i]} ${y - 96})`} opacity={thermo}>
          <rect x={-8} y={0} width={16} height={86} rx={8} fill="#1b1716" stroke={DL.dim} strokeWidth={2} />
          <circle cx={0} cy={94} r={14} fill={bulbs > 0.5 ? '#000' : '#c8c8c8'} stroke={DL.dim} strokeWidth={2} />
          <rect x={-4} y={86 - 80 * reads[i]} width={8} height={80 * reads[i] + 8} fill={DL.red} />
        </g>
      ))}
    </svg>
  );
};

export const DigitalClock: React.FC<{ text: string; color?: string; size?: number }> = ({ text, color = DL.text, size = 120 }) => (
  <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: size, color, letterSpacing: 4, fontVariantNumeric: 'tabular-nums' }}>{text}</span>
);

export const fmtClock = (totalSec: number) => {
  const s = Math.max(0, Math.round(totalSec));
  const hh = Math.floor(s / 3600), mm = Math.floor((s % 3600) / 60), ss = s % 60;
  return [hh, mm, ss].map((n) => String(n).padStart(2, '0')).join(':');
};

// Visible window: fades in over [a-inF, a], out over [b-outF, b].
export const win = (f: number, a: number, b: number, inF = 8, outF = 10) => ease(f, a - inF, a) * (1 - ease(f, b - outF, b));

// A stamp-like chip that lands on its word (scale 1.3 → 1).
export const SunChip: React.FC<{ text: string; at: number; color?: string; size?: number }> = ({ text, at, color = DL.gold, size = 30 }) => {
  const f = useCurrentFrame();
  const s = ease(f, at, at + 8, 1.3, 1);
  return <div style={{ alignSelf: 'flex-start', opacity: ease(f, at - 1, at + 6), transform: `scale(${s})`, padding: '14px 26px', border: `2px solid ${color}`, borderRadius: 10, background: '#0e0b0ae6', fontFamily: DL_MONO, fontSize: size, letterSpacing: 4, color, whiteSpace: 'nowrap' }}>{text}</div>;
};

// A sourced quote: the header (who, where) lands on `at`; each quote part fades in on its own word.
export const QuoteCard: React.FC<{ who: string; at: number; parts: { text: string; at: number }[]; w?: number; accent?: string }> = ({ who, at, parts, w = 820, accent = DL.gold }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ width: w, padding: '28px 36px', borderRadius: 16, background: '#0e0b0af0', border: `1px solid ${DL.border}`, borderLeft: `5px solid ${accent}`, opacity: ease(f, at - 4, at + 6), transform: `translateY(${ease(f, at - 4, at + 10, 20, 0)}px)` }}>
      <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.muted }}>{who}</div>
      <div style={{ marginTop: 14, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 48, lineHeight: 1.2, color: DL.text }}>
        {parts.map((p, i) => <span key={i} style={{ opacity: ease(f, p.at - 2, p.at + 8), color: i === parts.length - 1 ? accent : DL.text }}>{i ? ' ' : ''}{p.text}</span>)}
      </div>
    </div>
  );
};

// "YOU WAKE UP IN" + place line in the same positions as dykkit EraHeader's `place`, but the place
// lands ON its spoken word (`at`) instead of frame 2. Use with <EraHeader … /> without `place`.
// yearAt: a gold underline sweeps under the big year on the spoken year.
export const WakePlace: React.FC<{ place: string; at: number; dockAt: number; yearAt?: number }> = ({ place, at, dockAt, yearAt }) => {
  const f = useCurrentFrame();
  const out = 1 - ease(f, dockAt - 6, dockAt + 6);
  return (
    <>
      <div style={{ position: 'absolute', top: 290, left: 0, right: 0, textAlign: 'center', opacity: ease(f, 2, 14) * out, fontFamily: DL_MONO, fontSize: 32, letterSpacing: 12, color: DL.dim }}>YOU WAKE UP IN</div>
      {yearAt !== undefined && <div style={{ position: 'absolute', top: 618, left: 960 - 220 * ease(f, yearAt, yearAt + 12), width: 440 * ease(f, yearAt, yearAt + 12), height: 4, borderRadius: 2, background: DL.gold, opacity: out, boxShadow: `0 0 16px ${DL.gold}` }} />}
      <div style={{ position: 'absolute', top: 640, left: 0, right: 0, textAlign: 'center', opacity: ease(f, at - 2, at + 8) * out, transform: `translateY(${ease(f, at - 2, at + 10, 14, 0)}px)`, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 54, color: DL.warm }}>{place}</div>
    </>
  );
};

// The DYK card's source footnote, shown inside the card body only from `at` (the payoff word) — the kit card's
// own \`source\` prop is visible from the card's first frame, which can name the answer before Brian says it.
export const CardSource: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const f = useCurrentFrame();
  return <div style={{ marginTop: 22, fontFamily: DL_MONO, fontSize: 22, lineHeight: 1.3, color: '#9aa0cc', opacity: ease(f, at - 2, at + 8) }}>{children}</div>;
};
// A clause of card/caption text that fades in on its word.
export const OnWord: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const f = useCurrentFrame();
  return <span style={{ opacity: ease(f, at - 4, at + 6) }}>{children}</span>;
};

export { DL_EASE, DL_SERIF };
