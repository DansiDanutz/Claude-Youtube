// Did You Know That? — No. 06 "Medicine" episode kit. NEW file only: dykkit.tsx and the No. 01–05 kits stay
// byte-identical so earlier episodes render exactly as audited. The generic parts No. 05 used (labels on their word,
// the HOW WE SAW IT chip + ladder, stamps, figures, the THE YEARS strip, the hold rules) are re-exported unchanged from
// dykkit-food.tsx; this file adds the medicine arc (STORY §1, approved 2026-10-17), the six THE YEARS values (RESEARCH M9)
// and simple line props in the DansLab palette.
//   MED_ARC / medRungs      the relationship arc: chip text (big) and the short dock label
//   YEARS_PAST_MED          one THE YEARS pill per era, each landing on its spoken number
//   MedProp / PropTag       one SVG per prop (lancet, bowl, candle, oil pot, salve, scale, basin, lime, vial, germ, bed,
//                           envelope, syringe, pills, boat, sleeve)
//   MonthBars               Semmelweis's monthly deaths, one bar per month on its word
//   TwoGroups               the 1948 trial: two rows of figures, deaths dimming on their number
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_MONO } from './danslab';
import { ease } from './dykkit';
export {
  EpisodeHud, WakePlace, win, SunCliffhanger, FoodChip as MedChip, FoodLadder as MedLadder, LADDER_FULL,
  StampText, Kid, PeopleRow, BigWord, Panel, AskMark, QGRAD, INK,
  Source, Label, OnWord, YearsStrip, Baby, CountUp, PredictionTag, Figure, hold, pane, cardOut, HOLD_F, DL_SANS,
} from './dykkit-food';
export type { YearsItem } from './dykkit-food';

// ── the arc (STORY §1): fate/balance → observation → pattern → cure → proof → prevention → an arms race (2100)
export const MED_ARC: { year: string; chip: string; dock: string }[] = [
  { year: '1537', chip: 'BALANCE', dock: 'BALANCE' },
  { year: '1799', chip: 'AUTHORITY', dock: 'AUTHORITY' },
  { year: '1847', chip: 'A PATTERN', dock: 'A PATTERN' },
  { year: '1941', chip: 'A CURE', dock: 'A CURE' },
  { year: '1948', chip: 'PROOF', dock: 'PROOF' },
  { year: 'TODAY', chip: 'PREVENTION', dock: 'PREVENTION' },
];
export const NEXT_RUNG = 'AN ARMS RACE?';
export type MedRung = { year: string; label: string; at: number };
// already-spoken rungs (at = -1: on screen from the shot's first frame); `full` uses the long chip text
export const medRungs = (n: number, full = false): MedRung[] =>
  MED_ARC.slice(0, n).map((r) => ({ year: r.year, label: full ? r.chip : r.dock, at: -1 }));

// ── THE YEARS: life expectancy at birth (RESEARCH M9; 1537 = No. 05's England ≈ 35, F8). `at` is set per shot.
export const YEARS_PAST_MED = [
  { year: '1537', value: '≈35', place: 'ENG', at: -1 },
  { year: '1799', value: '≈29', place: 'WORLD', at: -1 },
  { year: '1847', value: '≈38', place: 'GBR', at: -1 },
  { year: '1941', value: '≈61', place: 'GBR', at: -1 },
  { year: '1948', value: '≈68', place: 'GBR', at: -1 },
  { year: 'TODAY', value: '≈73', place: 'WORLD', at: -1 },
];
export const medYearsUpTo = (n: number) => YEARS_PAST_MED.slice(0, n);

// ── props (simple line illustrations, DansLab palette) ─────────────────────────────────────────────
export const BLOOD = '#b3262e';
export type PropKind = 'lancet' | 'bowl' | 'candle' | 'oilpot' | 'salve' | 'scale' | 'basin' | 'lime' | 'vial' | 'germ'
  | 'bed' | 'envelope' | 'syringe' | 'pills' | 'boat' | 'sleeve';
export const PROP_NAME: Record<PropKind, string> = {
  lancet: 'LANCET', bowl: 'BLEEDING BOWL', candle: 'CANDLE', oilpot: 'BOILING OIL', salve: 'EGG YOLK · ROSE OIL · TURPENTINE',
  scale: 'FOUR HUMOURS', basin: 'WASH BASIN', lime: 'CHLORINATED LIME', vial: 'PENICILLIN', germ: 'GERM', bed: 'BED REST',
  envelope: 'SEALED ENVELOPE', syringe: 'VACCINE', pills: 'MEDICINE', boat: 'FISHING BOAT', sleeve: 'A SLEEVE ROLLED UP',
};
// level: 0–1 fill for bowl / vial / basin; tilt: degrees for the scale beam; flame: 0–1 for candle and oil pot
export const MedProp: React.FC<{ kind: PropKind; size?: number; f?: number; level?: number; tilt?: number; flame?: number; dim?: number; glow?: number }> = ({ kind, size = 100, f = 0, level = 1, tilt = 0, flame = 1, dim = 0, glow = 0 }) => {
  const flick = 0.85 + 0.15 * Math.sin(f / 4);
  const body = (() => {
    switch (kind) {
      case 'lancet': return <g transform="rotate(-30 50 50)"><rect x={46} y={40} width={8} height={54} rx={3} fill="#c8b48a" stroke="#7a6438" strokeWidth={2} /><path d="M50 6 L58 40 L42 40 Z" fill="#d8dde4" stroke="#8a929c" strokeWidth={2} /></g>;
      case 'bowl': return <g><path d="M10 40 Q14 86 50 86 Q86 86 90 40 Z" fill="#c8ccd2" stroke="#7a828c" strokeWidth={3} /><clipPath id="bowlc"><path d="M10 40 Q14 86 50 86 Q86 86 90 40 Z" /></clipPath><rect x={0} y={86 - 46 * level} width={100} height={60} fill={BLOOD} clipPath="url(#bowlc)" /><ellipse cx={50} cy={40} rx={40} ry={8} fill="none" stroke="#7a828c" strokeWidth={3} /></g>;
      case 'candle': return <g><rect x={38} y={44} width={24} height={46} rx={3} fill="#efe2c4" stroke="#b8a888" strokeWidth={2} /><ellipse cx={50} cy={92} rx={30} ry={6} fill="#8a6a40" /><path d={`M50 ${44 - 26 * flame * flick} Q58 30 50 44 Q42 30 50 ${44 - 26 * flame * flick} Z`} fill="#ffcf5a" opacity={flame} /><circle cx={50} cy={34} r={18 * flame} fill="#ffcf5a" opacity={0.18 * flame} /></g>;
      case 'oilpot': return <g><path d="M14 40 L86 40 L80 82 Q50 92 20 82 Z" fill="#3a3a3e" stroke="#1a1a1e" strokeWidth={3} /><ellipse cx={50} cy={40} rx={36} ry={8} fill="#d8a030" />{[0, 1, 2].map((k) => <circle key={k} cx={34 + k * 16} cy={38 - ((f * (0.6 + k * 0.2) + k * 7) % 14)} r={3} fill="#f0c860" opacity={flame} />)}{[0, 1, 2, 3].map((k) => <path key={k} d={`M${28 + k * 14} 98 q4 -10 0 -16`} stroke="#ff8a1f" strokeWidth={4} fill="none" opacity={flame * flick} />)}</g>;
      case 'salve': return <g><path d="M12 46 Q16 84 50 84 Q84 84 88 46 Z" fill="#8a6a48" stroke="#5a3e24" strokeWidth={3} /><ellipse cx={50} cy={46} rx={38} ry={10} fill="#f4c040" /><circle cx={42} cy={44} r={9} fill="#f8a020" /><ellipse cx={64} cy={46} rx={8} ry={3} fill="#f4b8c8" opacity={0.8} /></g>;
      case 'scale': return <g><line x1={50} y1={20} x2={50} y2={88} stroke="#b8a070" strokeWidth={4} /><path d="M30 92 L70 92 L62 84 L38 84 Z" fill="#8a6a40" /><g transform={`rotate(${tilt} 50 24)`}><line x1={12} y1={24} x2={88} y2={24} stroke="#d8b850" strokeWidth={4} /><path d="M12 24 L4 48 L20 48 Z" fill="none" stroke="#d8b850" strokeWidth={2} /><path d="M88 24 L80 48 L96 48 Z" fill="none" stroke="#d8b850" strokeWidth={2} /><circle cx={8} cy={44} r={5} fill={BLOOD} /><circle cx={16} cy={44} r={5} fill="#e8e4d8" /><circle cx={84} cy={44} r={5} fill="#2a2a2a" /><circle cx={92} cy={44} r={5} fill="#e8c040" /></g><circle cx={50} cy={24} r={5} fill="#d8b850" /></g>;
      case 'basin': return <g><ellipse cx={50} cy={56} rx={44} ry={14} fill="#e8ecef" stroke="#9aa2aa" strokeWidth={3} /><ellipse cx={50} cy={56} rx={34} ry={9} fill="#8fc8e8" opacity={0.4 + 0.6 * level} /><path d="M10 58 Q14 86 50 86 Q86 86 90 58" fill="#d8dde2" stroke="#9aa2aa" strokeWidth={3} /><path d="M40 20 q4 12 0 20 M56 18 q4 12 0 22" stroke="#8fc8e8" strokeWidth={3} fill="none" opacity={level} /></g>;
      case 'lime': return <g><rect x={24} y={30} width={52} height={58} rx={6} fill="#efefe8" stroke="#9a9a90" strokeWidth={3} /><rect x={20} y={20} width={60} height={14} rx={4} fill="#8a8a80" /><rect x={30} y={48} width={40} height={20} fill="#d8e8c0" /><text x={50} y={63} textAnchor="middle" fontFamily={DL_MONO} fontSize={12} fill="#4a5a30">Ca</text></g>;
      case 'vial': return <g><rect x={36} y={14} width={28} height={10} rx={2} fill="#8a6a40" /><path d="M38 24 L62 24 L62 34 L70 46 L70 88 Q70 92 66 92 L34 92 Q30 92 30 88 L30 46 L38 34 Z" fill="#e8f0f4" stroke="#8a9aa4" strokeWidth={3} /><clipPath id="vialc"><path d="M30 46 L70 46 L70 88 Q70 92 66 92 L34 92 Q30 92 30 88 Z" /></clipPath><rect x={28} y={92 - 46 * level} width={44} height={50} fill="#e8c040" clipPath="url(#vialc)" /></g>;
      case 'germ': return <g transform={`rotate(${(f * 1.5) % 360} 50 50)`}><ellipse cx={50} cy={50} rx={30} ry={18} fill="#6aa84f" stroke="#2f6a2a" strokeWidth={3} />{Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; return <line key={i} x1={50 + Math.cos(a) * 30} y1={50 + Math.sin(a) * 18} x2={50 + Math.cos(a) * 42} y2={50 + Math.sin(a) * 28} stroke="#2f6a2a" strokeWidth={3} strokeLinecap="round" />; })}<circle cx={42} cy={46} r={4} fill="#2f6a2a" /><circle cx={58} cy={54} r={3} fill="#2f6a2a" /></g>;
      case 'bed': return <g><rect x={6} y={52} width={88} height={18} rx={4} fill="#efe8dc" stroke="#9a9080" strokeWidth={3} /><rect x={6} y={40} width={22} height={14} rx={6} fill="#ffffff" stroke="#9a9080" strokeWidth={2} /><line x1={8} y1={70} x2={8} y2={88} stroke="#6a6a70" strokeWidth={4} /><line x1={92} y1={70} x2={92} y2={88} stroke="#6a6a70" strokeWidth={4} /><line x1={6} y1={30} x2={6} y2={70} stroke="#6a6a70" strokeWidth={4} /><path d="M30 52 Q60 40 92 52" fill="#c8d4e0" stroke="#8a9aaa" strokeWidth={2} /></g>;
      case 'envelope': return <g><rect x={10} y={26} width={80} height={52} rx={4} fill="#efe2c4" stroke="#9a8a6a" strokeWidth={3} /><path d="M10 26 L50 58 L90 26" fill="none" stroke="#9a8a6a" strokeWidth={3} /><circle cx={50} cy={58} r={9} fill={BLOOD} /></g>;
      case 'syringe': return <g transform="rotate(-35 50 50)"><rect x={30} y={40} width={44} height={20} rx={3} fill="#e8f0f4" stroke="#8a9aa4" strokeWidth={3} /><rect x={32} y={43} width={30 * level} height={14} fill="#5ab0ff" opacity={0.7} /><line x1={74} y1={50} x2={96} y2={50} stroke="#8a929c" strokeWidth={2} /><rect x={14} y={46} width={16} height={8} fill="#8a9aa4" /><rect x={8} y={38} width={6} height={24} fill="#8a9aa4" /></g>;
      case 'pills': return <g><rect x={28} y={30} width={44} height={60} rx={8} fill="#e8a020" opacity={0.85} stroke="#9a6010" strokeWidth={3} /><rect x={24} y={18} width={52} height={14} rx={4} fill="#efefe8" stroke="#9a9a90" strokeWidth={2} /><rect x={32} y={50} width={36} height={20} fill="#efefe8" /><ellipse cx={20} cy={88} rx={9} ry={5} fill="#efefe8" /><ellipse cx={82} cy={90} rx={9} ry={5} fill="#5ab0ff" /></g>;
      case 'boat': return <g transform={`rotate(${Math.sin(f / 18) * 3} 50 70)`}><path d="M8 62 L92 62 L80 82 L20 82 Z" fill="#2f6f9f" stroke="#1a3f5f" strokeWidth={3} /><line x1={50} y1={62} x2={50} y2={16} stroke="#5a3a22" strokeWidth={4} /><path d="M52 18 L82 56 L52 56 Z" fill="#efe2c4" /></g>;
      case 'sleeve': return <g><path d="M4 40 L58 40 Q66 50 58 62 L4 62 Z" fill="#5a9ad8" stroke="#2a5a8a" strokeWidth={3} /><path d="M56 42 L96 46 L96 58 L56 60 Z" fill="#c8906a" stroke="#8a5a3a" strokeWidth={3} /><circle cx={78} cy={52} r={4} fill="#efd8c8" stroke="#8a5a3a" strokeWidth={1} /></g>;
      default: return null;
    }
  })();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible', filter: `${dim > 0.01 ? `grayscale(${dim}) brightness(${1 - 0.55 * dim})` : ''}${glow > 0.01 ? ` drop-shadow(0 0 ${16 * glow}px ${DL.gold})` : ''}` || undefined }}>{body}</svg>
  );
};

// a prop + its name, landing on its word
export const PropTag: React.FC<{ kind: PropKind; at: number; size?: number; color?: string; name?: string; row?: boolean; f?: number; level?: number }> = ({ kind, at, size = 110, color = DL.text, name, row = false, f, level }) => {
  const fr = useCurrentFrame();
  return (
    <div style={{ display: 'flex', flexDirection: row ? 'row' : 'column', alignItems: 'center', gap: row ? 14 : 6, opacity: ease(fr, at - 2, at + 4), transform: `translateY(${ease(fr, at - 2, at + 8, 18, 0)}px) scale(${ease(fr, at - 2, at + 8, 1.2, 1)})` }}>
      <MedProp kind={kind} size={size} f={f ?? fr} level={level} />
      <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color, whiteSpace: 'nowrap' }}>{name ?? PROP_NAME[kind]}</span>
    </div>
  );
};

// ── Semmelweis's monthly deaths (M5): one bar per month, each growing on its own word; value label on the bar
export type MonthBar = { m: string; value: number; label: string; at: number; color?: string };
export const MonthBars: React.FC<{ bars: MonthBar[]; max?: number; h?: number; w?: number; title?: React.ReactNode; titleAt?: number }> = ({ bars, max = 20, h = 360, w = 170, title, titleAt = -1 }) => {
  const f = useCurrentFrame();
  return (
    <div>
      {title && <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.dim, opacity: titleAt < 0 ? 1 : ease(f, titleAt - 2, titleAt + 4) }}>{title}</div>}
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-end', height: h + 60, marginTop: 16 }}>
        {bars.map((b) => {
          const g = ease(f, b.at - 2, b.at + 14);
          const col = b.color ?? DL.gold;
          return (
            <div key={b.m} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: ease(f, b.at - 2, b.at + 4) }}>
              <span style={{ fontFamily: DL_SERIF, fontSize: 48, color: col }}>{b.label}</span>
              <div style={{ width: w, height: Math.max(6, (h * b.value * g) / max), borderRadius: 10, background: col, opacity: 0.9 }} />
              <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.muted }}>{b.m}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── the 1948 trial (M7): two groups as rows of small figures; the deaths in each group dim on their spoken number.
// Figures are drawn in rows of `perRow`; `deadAt` = the frame the group's deaths grey out (−1 = never on this shot).
export const TwoGroups: React.FC<{ a: { label: React.ReactNode; n: number; dead: number; deadAt: number; at: number; color?: string }; b: { label: React.ReactNode; n: number; dead: number; deadAt: number; at: number; color?: string }; perRow?: number; dot?: number }> = ({ a, b, perRow = 28, dot = 22 }) => {
  const f = useCurrentFrame();
  const Group: React.FC<{ g: typeof a }> = ({ g }) => {
    const col = g.color ?? DL.gold;
    const dim = g.deadAt < 0 ? 0 : ease(f, g.deadAt - 2, g.deadAt + 12);
    return (
      <div style={{ opacity: ease(f, g.at - 2, g.at + 6) }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 2, color: col }}>{g.label}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, width: perRow * (dot + 6), marginTop: 12 }}>
          {Array.from({ length: g.n }, (_, i) => {
            const isDead = i >= g.n - g.dead;
            const cell = ease(f, g.at + Math.floor(i / 4), g.at + Math.floor(i / 4) + 6);
            return <div key={i} style={{ width: dot, height: dot, borderRadius: '50%', background: isDead ? `color-mix(in srgb, ${col} ${100 - 85 * dim}%, #2a2a2a)` : col, opacity: cell * (isDead ? 1 - 0.55 * dim : 1), border: isDead && dim > 0.5 ? `2px solid ${BLOOD}` : 'none', boxSizing: 'border-box' }} />;
          })}
        </div>
      </div>
    );
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
      <Group g={a} />
      <Group g={b} />
    </div>
  );
};
