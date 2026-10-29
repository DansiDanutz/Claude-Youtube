// Did You Know That? — No. 07 "Light" episode kit. NEW file only: dykkit.tsx and the No. 01–06 kits stay
// byte-identical so earlier episodes render exactly as audited. The generic parts No. 05/06 used (labels on their word,
// the HOW WE SAW IT chip + ladder, stamps, figures, the hold rules) are re-exported unchanged from dykkit-food.tsx;
// this file adds the light arc (STORY §1, approved 2026-10-29), the price-of-light row (RESEARCH L3, Nordhaus) and
// simple line props in the DansLab palette.
//   LIGHT_ARC / lightRungs  the relationship arc: chip text (big) and the short dock label
//   PRICE_PAST / PriceStrip THE PRICE OF ONE HOUR OF LIGHT, one pill per measured year, each landing on its spoken number
//   LightProp / PropTag     one SVG per prop (rushlight, tallow, beeswax, bell, gaslamp, pipe, whale, derrick, kerosene,
//                           can, bulb, switch, generator, meter, led, streetlight, window, telescope)
//   NightSky                a sky whose glow rises and whose stars thin out (hook, today, answer, 2100, close)
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_MONO } from './danslab';
import { ease } from './dykkit';
export {
  EpisodeHud, WakePlace, win, SunCliffhanger, FoodChip as LightChip, FoodLadder as LightLadder, LADDER_FULL,
  StampText, Kid, PeopleRow, BigWord, Panel, AskMark, QGRAD, INK,
  Source, Label, OnWord, Baby, CountUp, PredictionTag, Figure, hold, pane, cardOut, HOLD_F, DL_SANS,
} from './dykkit-food';

// ── the arc (STORY §1): a luxury you make → a service piped to you → a liquid you buy → a network → a crystal →
// too cheap to switch off → (2100) darkness is the luxury
export const LIGHT_ARC: { year: string; chip: string; dock: string }[] = [
  { year: '1500', chip: 'A LUXURY', dock: 'A LUXURY' },
  { year: '1807', chip: 'A SERVICE', dock: 'A SERVICE' },
  { year: '1859', chip: 'A LIQUID', dock: 'A LIQUID' },
  { year: '1882', chip: 'A NETWORK', dock: 'A NETWORK' },
  { year: '1993', chip: 'A CRYSTAL', dock: 'A CRYSTAL' },
  { year: 'TODAY', chip: 'TOO CHEAP TO SWITCH OFF', dock: 'TOO CHEAP' },
];
export const NEXT_RUNG = 'DARKNESS IS THE LUXURY?';
export type LightRung = { year: string; label: string; at: number };
// already-spoken rungs (at = -1: on screen from the shot's first frame); `full` uses the long chip text
export const lightRungs = (n: number, full = false): LightRung[] =>
  LIGHT_ARC.slice(0, n).map((r) => ({ year: r.year, label: full ? r.chip : r.dock, at: -1 }));

// ── THE PRICE OF ONE HOUR OF LIGHT: hours of work for 1,000 lumen-hours (≈ one ordinary bulb for an hour),
// Nordhaus table 1.4 (RESEARCH L3), worded as Brian says it. Eras that speak no price carry the previous pills.
export type PriceItem = { year: string; value: string; at: number };
export const PRICE_PAST: PriceItem[] = [
  { year: 'BABYLON', value: '≈41 H', at: -1 },
  { year: '1800', value: '>5 H', at: -1 },
  { year: '1870', value: '≈20 MIN', at: -1 },
  { year: '1900', value: '≈13 MIN', at: -1 },
  { year: '1992', value: '<½ SEC', at: -1 },
];
export const priceUpTo = (n: number): PriceItem[] => PRICE_PAST.slice(0, n);
// sits just above the HUD (bottom 116–156) like No. 05's THE YEARS strip; hide it (`show` 0) under a cliffhanger band
export const PriceStrip: React.FC<{ items: PriceItem[]; show: number; hotLast?: boolean }> = ({ items, show, hotLast = true }) => {
  const f = useCurrentFrame();
  if (show <= 0.001) return null;
  const visible = items.filter((it) => f >= it.at - 2);
  return (
    <div style={{ position: 'absolute', left: 160, right: 160, bottom: 116, height: 40, display: 'flex', alignItems: 'center', gap: 10, opacity: show }}>
      <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.dim, whiteSpace: 'nowrap' }}>1 HOUR OF LIGHT · WORK</span>
      {visible.map((it, i) => {
        const appear = it.at < 0 ? 1 : ease(f, it.at - 2, it.at + 8);
        const col = hotLast && i === visible.length - 1 ? DL.gold : DL.warm;
        return (
          <span key={it.year} style={{ opacity: appear, transform: `scale(${it.at < 0 ? 1 : ease(f, it.at - 2, it.at + 10, 1.3, 1)})`, padding: '2px 12px', borderRadius: 999, border: `2px solid ${col}`, fontFamily: DL_MONO, fontSize: 24, color: col, whiteSpace: 'nowrap', background: '#0e0b0ae6' }}>
            {it.year} {it.value}
          </span>
        );
      })}
    </div>
  );
};

// ── props (simple line illustrations, DansLab palette) ─────────────────────────────────────────────
export const FLAME = '#ffcf5a';
export const LED_BLUE = '#3b6bff';
export type PropKind = 'rushlight' | 'tallow' | 'beeswax' | 'bell' | 'gaslamp' | 'pipe' | 'whale' | 'derrick' | 'kerosene'
  | 'can' | 'bulb' | 'switch' | 'generator' | 'meter' | 'led' | 'streetlight' | 'window' | 'telescope';
export const PROP_NAME: Record<PropKind, string> = {
  rushlight: 'RUSHLIGHT', tallow: 'TALLOW CANDLE', beeswax: 'BEESWAX', bell: 'CURFEW BELL', gaslamp: 'GAS LAMP',
  pipe: 'GAS PIPE', whale: 'WHALE OIL', derrick: 'OIL WELL', kerosene: 'KEROSENE LAMP', can: 'KEROSENE CAN', bulb: 'BULB',
  switch: 'SWITCH', generator: 'GENERATOR', meter: 'METER', led: 'BLUE LED', streetlight: 'STREETLIGHT', window: 'WINDOW',
  telescope: 'OBSERVATORY',
};
// flame / lit: 0–1 brightness (flames, bulb, LED, lamps); level: 0–1 fill (can, gas flow); swing: bell angle (deg)
const Flame: React.FC<{ x: number; y: number; h: number; lit: number; f: number; color?: string }> = ({ x, y, h, lit, f, color = FLAME }) => {
  const flick = 0.85 + 0.15 * Math.sin(f / 4 + x);
  const top = y - h * lit * flick;
  return (
    <g opacity={lit}>
      <circle cx={x} cy={y - h * 0.45} r={h * 0.75 * lit} fill={color} opacity={0.16} />
      <path d={`M${x} ${top} Q${x + h * 0.32} ${y - h * 0.35} ${x} ${y} Q${x - h * 0.32} ${y - h * 0.35} ${x} ${top} Z`} fill={color} />
    </g>
  );
};
export const LightProp: React.FC<{ kind: PropKind; size?: number; f?: number; lit?: number; level?: number; swing?: number; dim?: number; glow?: number }> = ({ kind, size = 100, f = 0, lit = 1, level = 1, swing = 0, dim = 0, glow = 0 }) => {
  const body = (() => {
    switch (kind) {
      case 'rushlight': return <g><line x1={50} y1={92} x2={50} y2={58} stroke="#5a4a32" strokeWidth={5} /><path d="M38 92 L62 92 L56 84 L44 84 Z" fill="#4a3a28" /><line x1={30} y1={60} x2={66} y2={40} stroke="#a89060" strokeWidth={4} strokeLinecap="round" /><Flame x={67} y={40} h={16} lit={lit} f={f} /></g>;
      case 'tallow': return <g><rect x={38} y={46} width={24} height={44} rx={3} fill="#d8c89a" stroke="#9a8858" strokeWidth={2} /><path d="M44 46 q2 8 0 14" stroke="#b8a878" strokeWidth={3} fill="none" /><ellipse cx={50} cy={92} rx={28} ry={6} fill="#6a5a40" /><Flame x={50} y={46} h={24} lit={lit} f={f} />{[0, 1].map((k) => <path key={k} d={`M${46 + k * 8} ${20 - ((f * 0.5 + k * 9) % 18)} q4 -6 0 -12`} stroke="#6a6a6a" strokeWidth={2} fill="none" opacity={0.5 * lit} />)}</g>;
      case 'beeswax': return <g><rect x={40} y={30} width={20} height={60} rx={3} fill="#f2d27a" stroke="#c8a040" strokeWidth={2} /><ellipse cx={50} cy={92} rx={26} ry={6} fill="#c8a040" /><Flame x={50} y={30} h={24} lit={lit} f={f} /></g>;
      case 'bell': return <g><line x1={50} y1={6} x2={50} y2={18} stroke="#6a5a40" strokeWidth={4} /><g transform={`rotate(${swing} 50 18)`}><path d="M24 74 Q24 26 50 22 Q76 26 76 74 L84 82 L16 82 Z" fill="#c8a040" stroke="#8a6a20" strokeWidth={3} /><circle cx={50} cy={88} r={7} fill="#8a6a20" /></g></g>;
      case 'gaslamp': return <g><line x1={50} y1={98} x2={50} y2={44} stroke="#2a2a30" strokeWidth={6} /><path d="M34 44 L66 44 L60 14 L40 14 Z" fill="#1a1a20" stroke="#4a4a50" strokeWidth={3} /><path d="M38 40 L62 40 L57 18 L43 18 Z" fill="#fff2c0" opacity={0.15 + 0.75 * lit} /><circle cx={50} cy={28} r={26 * lit} fill={FLAME} opacity={0.18 * lit} /><path d="M46 8 L54 8 L50 2 Z" fill="#2a2a30" /></g>;
      case 'pipe': return <g><rect x={4} y={44} width={92} height={18} rx={4} fill="#5a5a60" stroke="#2a2a30" strokeWidth={3} />{[0, 1, 2, 3].map((k) => <circle key={k} cx={((f * 2 + k * 25) % 92) + 4} cy={53} r={4} fill="#c8d8e0" opacity={0.7 * level} />)}<rect x={20} y={40} width={8} height={26} fill="#3a3a40" /><rect x={72} y={40} width={8} height={26} fill="#3a3a40" /></g>;
      case 'whale': return <g><path d="M8 60 Q20 30 58 34 Q82 36 90 52 L98 40 L96 62 L86 60 Q70 80 36 76 Q14 74 8 60 Z" fill="#3a5a7a" stroke="#1a3a5a" strokeWidth={3} /><circle cx={24} cy={54} r={3} fill="#0a1a2a" /><path d="M40 34 q-4 -14 4 -22 M44 34 q4 -12 12 -16" stroke="#8fc8e8" strokeWidth={3} fill="none" opacity={0.7} /></g>;
      case 'derrick': return <g><path d="M30 94 L46 10 L54 10 L70 94" fill="none" stroke="#6a4a2a" strokeWidth={5} />{[30, 50, 70].map((y) => <line key={y} x1={30 + (94 - y) * 0} x2={70} y1={y} y2={y} stroke="#6a4a2a" strokeWidth={3} transform={`translate(${(y - 94) * -0.0} 0)`} />)}<rect x={20} y={90} width={60} height={6} fill="#4a3a28" />{[0, 1, 2].map((k) => <circle key={k} cx={50 + (k - 1) * 10} cy={86 - ((f * 0.8 + k * 11) % 30) * level} r={4} fill="#1a1a1a" opacity={level} />)}</g>;
      case 'kerosene': return <g><ellipse cx={50} cy={84} rx={26} ry={10} fill="#8a6a40" stroke="#5a3e24" strokeWidth={3} /><path d="M30 84 Q30 64 50 62 Q70 64 70 84" fill="#c8a868" stroke="#8a6a40" strokeWidth={3} /><path d="M40 62 L40 30 Q40 18 50 16 Q60 18 60 30 L60 62 Z" fill="#e8f0f4" opacity={0.35} stroke="#9aa8b0" strokeWidth={2} /><Flame x={50} y={52} h={22} lit={lit} f={f} /></g>;
      case 'can': return <g><rect x={24} y={24} width={52} height={68} rx={6} fill="#b8322a" stroke="#7a1a14" strokeWidth={3} /><rect x={56} y={12} width={12} height={14} fill="#8a8a90" /><rect x={30} y={44} width={40} height={24} fill="#efe2c4" /><text x={50} y={61} textAnchor="middle" fontFamily={DL_MONO} fontSize={11} fill="#7a1a14">OIL</text></g>;
      case 'bulb': return <g><circle cx={50} cy={38} r={38 * lit} fill={FLAME} opacity={0.2 * lit} /><path d="M50 8 Q76 8 76 36 Q76 52 62 62 L62 72 L38 72 L38 62 Q24 52 24 36 Q24 8 50 8 Z" fill={`rgba(255,236,170,${0.15 + 0.7 * lit})`} stroke="#c8b070" strokeWidth={3} /><path d="M42 50 Q46 32 50 50 Q54 32 58 50" stroke={lit > 0.3 ? '#ff9a2a' : '#7a6a50'} strokeWidth={3} fill="none" /><rect x={38} y={72} width={24} height={16} rx={3} fill="#9aa0a8" /><rect x={42} y={88} width={16} height={6} rx={2} fill="#5a6068" /></g>;
      case 'switch': return <g><rect x={26} y={14} width={48} height={72} rx={8} fill="#e8e4d8" stroke="#9a9080" strokeWidth={3} /><rect x={42} y={lit > 0.5 ? 26 : 50} width={16} height={24} rx={4} fill="#6a6058" /></g>;
      case 'generator': return <g><rect x={10} y={40} width={80} height={44} rx={8} fill="#4a5a6a" stroke="#2a3a4a" strokeWidth={3} /><g transform={`rotate(${(f * 6 * lit) % 360} 50 62)`}><circle cx={50} cy={62} r={16} fill="#8a9aaa" />{[0, 1, 2, 3].map((k) => <rect key={k} x={48} y={46} width={4} height={16} fill="#2a3a4a" transform={`rotate(${k * 90} 50 62)`} />)}</g><path d="M20 40 L20 26 M80 40 L80 26" stroke="#b87333" strokeWidth={4} /></g>;
      case 'meter': return <g><rect x={20} y={12} width={60} height={78} rx={8} fill="#e8e4d8" stroke="#9a9080" strokeWidth={3} /><circle cx={50} cy={44} r={20} fill="#ffffff" stroke="#6a6058" strokeWidth={2} /><line x1={50} y1={44} x2={50 + 16 * Math.cos(f / 10)} y2={44 + 16 * Math.sin(f / 10)} stroke="#b8322a" strokeWidth={3} /><rect x={32} y={70} width={36} height={10} fill="#2a2a30" /></g>;
      case 'led': return <g><circle cx={50} cy={34} r={40 * lit} fill={LED_BLUE} opacity={0.22 * lit} /><path d="M32 60 L32 30 Q32 14 50 14 Q68 14 68 30 L68 60 Z" fill={`rgba(90,140,255,${0.25 + 0.7 * lit})`} stroke="#6a8ad8" strokeWidth={3} /><rect x={28} y={60} width={44} height={8} rx={2} fill="#8a929c" /><line x1={40} y1={68} x2={40} y2={94} stroke="#9aa0a8" strokeWidth={3} /><line x1={60} y1={68} x2={60} y2={88} stroke="#9aa0a8" strokeWidth={3} /></g>;
      case 'streetlight': return <g><line x1={30} y1={98} x2={30} y2={14} stroke="#3a3a40" strokeWidth={5} /><path d="M30 14 Q30 8 40 8 L70 8" stroke="#3a3a40" strokeWidth={5} fill="none" /><path d="M58 8 L82 8 L76 18 L64 18 Z" fill="#5a5a60" /><path d="M64 18 L76 18 L96 98 L44 98 Z" fill="#ffd27a" opacity={0.22 * lit} /></g>;
      case 'window': return <g><rect x={14} y={10} width={72} height={80} rx={3} fill="#0b1630" stroke="#6a6058" strokeWidth={5} /><line x1={50} y1={10} x2={50} y2={90} stroke="#6a6058" strokeWidth={4} /><line x1={14} y1={50} x2={86} y2={50} stroke="#6a6058" strokeWidth={4} />{[[24, 70], [34, 78], [62, 66], [74, 76], [42, 64]].map(([x, y], k) => <rect key={k} x={x} y={y} width={5} height={7} fill={FLAME} opacity={lit * (0.6 + 0.4 * Math.sin(f / 9 + k))} />)}</g>;
      case 'telescope': return <g><path d="M14 92 L50 50 L86 92" fill="none" stroke="#6a6a70" strokeWidth={4} /><path d="M20 70 Q20 24 50 20 Q80 24 80 70 Z" fill="#c8ccd2" stroke="#7a828c" strokeWidth={3} /><rect x={46} y={20} width={8} height={30} fill="#2a2a30" transform="rotate(-20 50 40)" /></g>;
      default: return null;
    }
  })();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible', filter: `${dim > 0.01 ? `grayscale(${dim}) brightness(${1 - 0.55 * dim})` : ''}${glow > 0.01 ? ` drop-shadow(0 0 ${16 * glow}px ${DL.gold})` : ''}` || undefined }}>{body}</svg>
  );
};

// a prop + its name, landing on its word
export const PropTag: React.FC<{ kind: PropKind; at: number; size?: number; color?: string; name?: string; row?: boolean; f?: number; lit?: number; level?: number; swing?: number }> = ({ kind, at, size = 110, color = DL.text, name, row = false, f, lit, level, swing }) => {
  const fr = useCurrentFrame();
  return (
    <div style={{ display: 'flex', flexDirection: row ? 'row' : 'column', alignItems: 'center', gap: row ? 14 : 6, opacity: ease(fr, at - 2, at + 4), transform: `translateY(${ease(fr, at - 2, at + 8, 18, 0)}px) scale(${ease(fr, at - 2, at + 8, 1.2, 1)})` }}>
      <LightProp kind={kind} size={size} f={f ?? fr} lit={lit} level={level} swing={swing} />
      <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color, whiteSpace: 'nowrap' }}>{name ?? PROP_NAME[kind]}</span>
    </div>
  );
};

// ── the night sky: `stars` 0–1 of the 250 stars visible, `glow` 0–1 orange skyglow from the horizon, `milky` 0–1 band.
// Stars are seeded (deterministic) and thin out brightest-last, so "two hundred and fifty → a hundred" reads as a count.
const rnd = (s: number) => { const x = Math.sin(s * 9973) * 10000; return x - Math.floor(x); };
const SKY_STARS = Array.from({ length: 250 }, (_, i) => ({ x: rnd(i * 3 + 1), y: rnd(i * 7 + 2) * 0.72, m: rnd(i * 11 + 5), r: 1.2 + rnd(i * 13 + 3) * 2.4 }));
export const SKY_STAR_COUNT = SKY_STARS.length;
export const NightSky: React.FC<{ stars?: number; glow?: number; milky?: number; width?: number; height?: number; style?: React.CSSProperties }> = ({ stars = 1, glow = 0, milky = 0, width = 1920, height = 1080, style }) => {
  const f = useCurrentFrame();
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute', inset: 0, ...style }}>
      <defs>
        <linearGradient id="skyglow" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#ff8a2a" stopOpacity={0.55 * glow} /><stop offset="0.6" stopColor="#ff8a2a" stopOpacity={0.12 * glow} /><stop offset="1" stopColor="#ff8a2a" stopOpacity={0} /></linearGradient>
      </defs>
      <rect width={width} height={height} fill="#04060f" />
      {milky > 0.01 && <path d={`M${-0.1 * width} ${0.75 * height} Q${0.45 * width} ${0.15 * height} ${1.1 * width} ${0.05 * height}`} stroke="#b8c4ff" strokeWidth={0.12 * height} strokeLinecap="round" fill="none" opacity={0.13 * milky} style={{ filter: 'blur(30px)' }} />}
      {SKY_STARS.map((s, i) => {
        const keep = s.m < stars;   // dimmest stars (high m) vanish first as `stars` falls
        if (!keep) return null;
        const tw = 0.7 + 0.3 * Math.sin(f / 13 + i);
        return <circle key={i} cx={s.x * width} cy={s.y * height} r={s.r} fill="#ffffff" opacity={tw * (1 - 0.6 * glow * s.m)} />;
      })}
      <rect width={width} height={height} fill="url(#skyglow)" />
    </svg>
  );
};

// ── the guess / the answer: ten people, the lit ones under a brightened sky (STORY guess, RESEARCH L13)
export const SkyPerson: React.FC<{ size?: number; lit?: number }> = ({ size = 90, lit = 0 }) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 100 130" style={{ overflow: 'visible' }}>
    <circle cx={50} cy={20} r={60} fill="#ff8a2a" opacity={0.18 * lit} />
    <circle cx={50} cy={40} r={18} fill={lit > 0.5 ? DL.gold : DL.warm} />
    <path d="M22 126 Q22 70 50 70 Q78 70 78 126 Z" fill={lit > 0.5 ? DL.gold : DL.warm} />
  </svg>
);
export const TenPeople: React.FC<{ litAt: number[]; at: number; size?: number }> = ({ litAt, at, size = 90 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: 'flex', gap: 22 }}>
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} style={{ opacity: ease(f, at + i * 3 - 2, at + i * 3 + 6) }}>
          <SkyPerson size={size} lit={i < litAt.length && litAt[i] >= 0 ? ease(f, litAt[i] - 2, litAt[i] + 10) : 0} />
        </div>
      ))}
    </div>
  );
};

// a big serif number/word in the episode's warm light, for single-figure panels ("6,500×", "9.6 %")
export const LightFigure: React.FC<{ value: React.ReactNode; label: React.ReactNode; at: number; size?: number }> = ({ value, label, at, size = 150 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ opacity: ease(f, at - 2, at + 6), transform: `scale(${ease(f, at - 2, at + 10, 1.15, 1)})` }}>
      <div style={{ fontFamily: DL_SERIF, fontSize: size, color: FLAME, lineHeight: 1, textShadow: `0 0 40px ${FLAME}55` }}>{value}</div>
      <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 2, color: DL.dim, marginTop: 10 }}>{label}</div>
    </div>
  );
};
