// Did You Know That? — No. 05 "Food" episode kit. NEW file only: dykkit.tsx, dykkit-sun.tsx, dykkit-school.tsx,
// dykkit-money.tsx and dytbrand.tsx stay byte-identical so Nos. 01–04 render exactly as audited. The generic No. 03 parts
// (HOW WE SAW IT chip + ladder, labels, stamps, figures) are re-exported unchanged; this file adds the food arc,
// the YEARS strip (life expectancy at birth per era, STORY §1) and the plate illustrations.
//   FOOD_ARC / foodRungs     the relationship arc (STORY §1, approved): chip text (big) and the short dock label
//   YearsStrip               bottom strip: one "≈ 35 · England" pill per era, each landing on its spoken word
//   Food                     one SVG per food (bread, porridge, beans, beer, fish, biscuit, lemon, rice, …)
//   PlateWeek                a week of plates (1500 fast days, 1747 rations, 1915 "every day the same")
//   Ship, Wheat, Motorbike   era props
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS } from './danslab';
import { DYT } from './dytbrand';
import { ease } from './dykkit';
export {
  EpisodeHud, WakePlace, win, SunCliffhanger, OnWord, SchoolChip as FoodChip, SchoolLadder as FoodLadder, SCHOOL_FULL as LADDER_FULL,
  StampText, Label, Source, Kid, PeopleRow, BigWord, Panel, AskMark, QGRAD, INK,
} from './dykkit-school';

// ── the arc (STORY §1, approved): chip text on its word, short label in the docked ladder
export type FoodRung = { year: string; label: string; at: number };
export const FOOD_ARC: { year: string; chip: string; dock: string }[] = [
  { year: '1500', chip: 'FUEL', dock: 'FUEL' },
  { year: '1747', chip: 'MEDICINE', dock: 'MEDICINE' },
  { year: '1884', chip: 'SOMETHING TO MEASURE', dock: 'TO MEASURE' },
  { year: '1915', chip: 'SOMETHING WE FIX', dock: 'WE FIX IT' },
  { year: '1966', chip: 'ENOUGH, AT LAST', dock: 'ENOUGH, AT LAST' },
  { year: 'TODAY', chip: 'TOO MUCH?', dock: 'TOO MUCH?' },
];
export const NEXT_RUNG = 'A LONGER LIFE?';
// already-spoken rungs (at = -1: on screen from the shot's first frame); `full` uses the long chip text
export const foodRungs = (n: number, full = false): FoodRung[] =>
  FOOD_ARC.slice(0, n).map((r) => ({ year: r.year, label: full ? r.chip : r.dock, at: -1 }));

// ── THE YEARS: life expectancy at birth, one pill per era (RESEARCH "Life expectancy per era"). The strip sits just
// above the HUD (bottom 116–156) and is hidden while a cliffhanger band (bottom 132) is up — `show` carries that.
export type YearsItem = { year: string; value: string; place: string; at: number; projection?: boolean };
export const YEARS_PAST: YearsItem[] = [
  { year: '1500', value: '≈35', place: 'ENG', at: -1 },
  { year: '1747', value: '≈36', place: 'ENG', at: -1 },
  { year: '1884', value: '≈43', place: 'JPN', at: -1 },
  { year: '1915', value: '≈55', place: 'USA', at: -1 },
  { year: '1966', value: '≈46', place: 'IND', at: -1 },
  { year: 'TODAY', value: '≈76', place: 'BRA', at: -1 },
];
export const yearsUpTo = (n: number): YearsItem[] => YEARS_PAST.slice(0, n);
export const YearsStrip: React.FC<{ items: YearsItem[]; show: number; hotLast?: boolean }> = ({ items, show, hotLast = true }) => {
  const f = useCurrentFrame();
  if (show <= 0.001) return null;
  const visible = items.filter((it) => f >= it.at - 2);
  return (
    <div style={{ position: 'absolute', left: 160, right: 160, bottom: 116, height: 40, display: 'flex', alignItems: 'center', gap: 10, opacity: show }}>
      <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.dim, whiteSpace: 'nowrap' }}>THE YEARS · AT BIRTH</span>
      {visible.map((it, i) => {
        const appear = it.at < 0 ? 1 : ease(f, it.at - 2, it.at + 8);
        const hot = hotLast && i === visible.length - 1;
        const col = it.projection ? DL.red : hot ? DL.gold : DL.warm;
        return (
          <span key={it.year} style={{ opacity: appear, transform: `scale(${it.at < 0 ? 1 : ease(f, it.at - 2, it.at + 10, 1.3, 1)})`, padding: '2px 12px', borderRadius: 999, border: `2px ${it.projection ? 'dashed' : 'solid'} ${col}`, fontFamily: DL_MONO, fontSize: 24, color: col, whiteSpace: 'nowrap', background: '#0e0b0ae6' }}>
            {it.year} {it.value} {it.place}
          </span>
        );
      })}
    </div>
  );
};

// ── foods (simple line illustrations, DansLab palette) ───────────────────────────────────────────────
export type FoodKind = 'bread' | 'porridge' | 'beans' | 'beer' | 'fish' | 'meat' | 'biscuit' | 'cheese' | 'oatmeal' | 'lemon' | 'orange'
  | 'rice' | 'barley' | 'milk' | 'veg' | 'cornbread' | 'grits' | 'pork' | 'molasses' | 'flatbread' | 'lentils' | 'soda' | 'snack' | 'ricebeans' | 'cider' | 'vinegar';
export const FOOD_NAME: Record<FoodKind, string> = {
  bread: 'BREAD', porridge: 'PORRIDGE', beans: 'PEAS & BEANS', beer: 'BEER', fish: 'DRIED FISH', meat: 'MEAT', biscuit: 'BISCUIT',
  cheese: 'CHEESE', oatmeal: 'OATMEAL', lemon: 'LEMON', orange: 'ORANGE', rice: 'WHITE RICE', barley: 'BARLEY', milk: 'MILK',
  veg: 'VEGETABLES', cornbread: 'CORNBREAD', grits: 'GRITS', pork: 'SALT PORK', molasses: 'MOLASSES', flatbread: 'FLATBREAD',
  lentils: 'LENTILS', soda: 'SOFT DRINK', snack: 'SNACKS', ricebeans: 'RICE & BEANS', cider: 'CIDER', vinegar: 'VINEGAR',
};
const Bowl: React.FC<{ fill: string; bits?: string; n?: number }> = ({ fill, bits, n = 0 }) => (
  <g>
    <ellipse cx={50} cy={46} rx={40} ry={11} fill={fill} />
    {bits && Array.from({ length: n }, (_, i) => <circle key={i} cx={22 + ((i * 13) % 56)} cy={42 + (i % 3) * 3} r={4.5} fill={bits} />)}
    <path d="M10 46 Q14 86 50 86 Q86 86 90 46 Z" fill="#8a6a48" stroke="#5a3e24" strokeWidth={3} />
  </g>
);
export const Food: React.FC<{ kind: FoodKind; size?: number; dim?: number; glow?: number }> = ({ kind, size = 90, dim = 0, glow = 0 }) => {
  const body = (() => {
    switch (kind) {
      case 'bread': return <g><path d="M8 66 C8 30 92 30 92 66 Z" fill="#c8893c" stroke="#7a4e1c" strokeWidth={3} />{[30, 50, 70].map((x) => <path key={x} d={`M${x - 8} 44 l12 12`} stroke="#7a4e1c" strokeWidth={3} />)}<rect x={8} y={64} width={84} height={10} rx={4} fill="#a86a2c" /></g>;
      case 'porridge': return <Bowl fill="#e8dcc0" bits="#c8b890" n={5} />;
      case 'beans': return <Bowl fill="#6a8a3a" bits="#a8c070" n={9} />;
      case 'oatmeal': return <Bowl fill="#d8c8a0" bits="#b8a070" n={6} />;
      case 'grits': return <Bowl fill="#f0e8d0" bits="#e0d0a0" n={4} />;
      case 'lentils': return <Bowl fill="#d8902a" bits="#b86a1a" n={8} />;
      case 'rice': return <g><Bowl fill="#f8f6ee" />{Array.from({ length: 10 }, (_, i) => <ellipse key={i} cx={22 + ((i * 11) % 56)} cy={40 + (i % 2) * 4} rx={4} ry={2} fill="#e0ddd0" />)}</g>;
      case 'barley': return <Bowl fill="#d0b070" bits="#a88848" n={8} />;
      case 'ricebeans': return <g><ellipse cx={50} cy={60} rx={44} ry={20} fill="#f4efe0" stroke="#c8c0b0" strokeWidth={3} /><ellipse cx={36} cy={58} rx={20} ry={10} fill="#f8f6ee" /><ellipse cx={64} cy={60} rx={20} ry={10} fill="#4a2a1a" /></g>;
      case 'beer': return <g><rect x={24} y={22} width={44} height={64} rx={6} fill="#d8a030" stroke="#7a5a20" strokeWidth={3} /><rect x={22} y={14} width={48} height={14} rx={7} fill="#f4eee0" /><path d="M68 36 q20 0 20 18 q0 18 -20 18" fill="none" stroke="#7a5a20" strokeWidth={5} /></g>;
      case 'cider': return <g><rect x={30} y={20} width={40} height={66} rx={6} fill="#e8c860" stroke="#8a6a20" strokeWidth={3} /><rect x={42} y={8} width={16} height={14} fill="#8a6a20" /></g>;
      case 'vinegar': return <g><path d="M38 8 L62 8 L62 26 L74 40 L74 88 L26 88 L26 40 L38 26 Z" fill="#a85a3a" stroke="#5a2a1a" strokeWidth={3} /></g>;
      case 'fish': return <g><path d="M10 50 C30 24 70 24 82 50 C70 76 30 76 10 50 Z" fill="#b8a888" stroke="#6a5a40" strokeWidth={3} /><path d="M82 50 L96 34 L96 66 Z" fill="#b8a888" stroke="#6a5a40" strokeWidth={3} /><circle cx={26} cy={46} r={4} fill="#3a2a1a" /></g>;
      case 'meat': return <g><path d="M14 54 C14 30 60 22 80 40 C94 54 80 78 54 76 C34 76 14 72 14 54 Z" fill="#b84a3a" stroke="#6a2a1a" strokeWidth={3} /><circle cx={70} cy={50} r={8} fill="#f0e8d8" /></g>;
      case 'pork': return <g><rect x={14} y={30} width={72} height={44} rx={8} fill="#e8c0b0" stroke="#8a5a4a" strokeWidth={3} /><rect x={14} y={30} width={72} height={14} rx={6} fill="#f8f0e8" /></g>;
      case 'biscuit': return <g><rect x={14} y={18} width={72} height={66} rx={8} fill="#d8b878" stroke="#8a6a38" strokeWidth={3} />{[0, 1, 2].map((r) => [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={32 + c * 18} cy={36 + r * 16} r={3} fill="#8a6a38" />))}</g>;
      case 'cheese': return <g><path d="M10 74 L90 74 L90 40 L10 60 Z" fill="#f0c840" stroke="#a0801a" strokeWidth={3} /><circle cx={40} cy={64} r={5} fill="#c8a020" /><circle cx={70} cy={58} r={4} fill="#c8a020" /></g>;
      case 'lemon': return <g><ellipse cx={50} cy={52} rx={36} ry={28} fill="#f8e040" stroke="#b8a010" strokeWidth={3} /><path d="M86 52 l8 -4 l0 8 Z" fill="#b8a010" /></g>;
      case 'orange': return <g><circle cx={50} cy={52} r={34} fill="#f89a20" stroke="#b86a10" strokeWidth={3} /><path d="M50 18 q10 -10 20 -6" stroke="#3a7a2a" strokeWidth={5} fill="none" /></g>;
      case 'milk': return <g><path d="M30 20 L70 20 L70 30 L80 44 L80 88 L20 88 L20 44 L30 30 Z" fill="#f4f4f0" stroke="#9a9a9a" strokeWidth={3} /><rect x={20} y={56} width={60} height={14} fill="#5aa0e0" /></g>;
      case 'veg': return <g><path d="M30 86 L40 30 L50 86 Z" fill="#e8742a" /><path d="M40 30 l-8 -16 M40 30 l8 -18" stroke="#3a8a3a" strokeWidth={5} /><circle cx={70} cy={60} r={22} fill="#4caf50" stroke="#2a6a2a" strokeWidth={3} /></g>;
      case 'cornbread': return <g><rect x={14} y={34} width={72} height={46} rx={6} fill="#f0c040" stroke="#a07a10" strokeWidth={3} /><rect x={14} y={34} width={72} height={10} rx={5} fill="#c8902a" /></g>;
      case 'molasses': return <g><rect x={26} y={26} width={48} height={60} rx={8} fill="#3a1a0a" stroke="#1a0a04" strokeWidth={3} /><rect x={22} y={16} width={56} height={12} rx={4} fill="#8a6a40" /><rect x={30} y={46} width={40} height={18} fill="#e8dcc0" /></g>;
      case 'flatbread': return <g><ellipse cx={50} cy={56} rx={42} ry={30} fill="#e0b870" stroke="#9a7030" strokeWidth={3} />{[[34, 46], [60, 50], [46, 66], [66, 66]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={5} fill="#9a6a20" opacity={0.7} />)}</g>;
      case 'soda': return <g><rect x={30} y={16} width={40} height={72} rx={8} fill="#c0392b" stroke="#7a1a10" strokeWidth={3} /><rect x={30} y={42} width={40} height={14} fill="#f4eee0" /></g>;
      case 'snack': return <g><path d="M22 14 L78 14 L84 88 L16 88 Z" fill="#f0a020" stroke="#9a6010" strokeWidth={3} /><path d="M22 14 l6 8 l6 -8 l6 8 l6 -8 l6 8 l6 -8 l6 8 l6 -8 l6 8" stroke="#9a6010" strokeWidth={3} fill="none" /><circle cx={50} cy={54} r={14} fill="#f8e070" /></g>;
      default: return null;
    }
  })();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible', filter: `${dim > 0.01 ? `grayscale(${dim}) brightness(${1 - 0.55 * dim})` : ''}${glow > 0.01 ? ` drop-shadow(0 0 ${16 * glow}px ${DL.gold})` : ''}` || undefined }}>{body}</svg>
  );
};

// a food icon + its name, landing on its word
export const FoodTag: React.FC<{ kind: FoodKind; at: number; size?: number; color?: string; name?: string; dim?: number; row?: boolean }> = ({ kind, at, size = 110, color = DL.text, name, dim = 0, row = false }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: 'flex', flexDirection: row ? 'row' : 'column', alignItems: 'center', gap: row ? 14 : 6, opacity: ease(f, at - 2, at + 6), transform: `translateY(${ease(f, at - 2, at + 10, 18, 0)}px) scale(${ease(f, at - 2, at + 8, 1.2, 1)})` }}>
      <Food kind={kind} size={size} dim={dim} />
      <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color, whiteSpace: 'nowrap' }}>{name ?? FOOD_NAME[kind]}</span>
    </div>
  );
};

// ── a week of plates: 7 columns, each a stack of food icons; `shade` days are tinted and tagged (fast days)
export type PlateDay = { d: string; foods: FoodKind[]; tag?: string; shade?: boolean };
export const PlateWeek: React.FC<{ title: React.ReactNode; days: PlateDay[]; at: number; step?: number; tagAt?: number; tagColor?: string; foot: string; icon?: number }> = ({ title, days, at, step = 4, tagAt = 1e9, tagColor = DL.sky, foot, icon = 56 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ opacity: ease(f, at - 6, at + 6) }}>
      <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.dim }}>{title}</div>
      <div style={{ display: 'flex', gap: 14, marginTop: 18 }}>
        {days.map((d, i) => {
          const g = ease(f, at + i * step, at + i * step + 10);
          const tagOn = d.shade ? ease(f, tagAt - 2, tagAt + 8) : 0;
          return (
            <div key={d.d} style={{ width: 132, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: g }}>
              <div style={{ height: 34, fontFamily: DL_MONO, fontSize: 24, letterSpacing: 1, color: tagColor, opacity: tagOn, whiteSpace: 'nowrap' }}>{d.tag ?? ''}</div>
              <div style={{ width: 132, height: 300, boxSizing: 'border-box', borderRadius: 14, border: `2px solid ${tagOn > 0.5 ? tagColor : DL.border}`, background: tagOn > 0.5 ? `${tagColor}22` : DL.panel2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 6, paddingTop: 12 }}>
                {d.foods.map((k, j) => <Food key={j} kind={k} size={icon} />)}
              </div>
              <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.muted }}>{d.d}</span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 12, maxWidth: days.length * 146 - 14, fontFamily: DL_MONO, fontSize: 24, color: DL.muted }}>{foot}</div>
    </div>
  );
};

// ── props ─────────────────────────────────────────────────────────────────────────────────────────
export const Ship: React.FC<{ w?: number; f: number; sails?: string; flag?: string }> = ({ w = 520, f, sails = '#e8e0cc', flag = '#c0392b' }) => (
  <svg width={w} height={w * 0.7} viewBox="0 0 300 210" style={{ overflow: 'visible', transform: `rotate(${Math.sin(f / 22) * 2}deg) translateY(${Math.sin(f / 15) * 4}px)` }}>
    <path d="M20 150 L280 150 L250 192 L50 192 Z" fill="#5a3a22" stroke="#2a1a0e" strokeWidth={4} />
    {[90, 160, 230].map((x, i) => <g key={x}><line x1={x} y1={150} x2={x} y2={18 + i * 6} stroke="#3a2a1a" strokeWidth={5} /><path d={`M${x - 34} ${40 + i * 6} Q${x} ${32 + i * 6} ${x + 34} ${40 + i * 6} L${x + 30} ${96 + i * 4} Q${x} ${104 + i * 4} ${x - 30} ${96 + i * 4} Z`} fill={sails} opacity={0.92} /></g>)}
    <path d="M90 18 l22 6 l-22 6 Z" fill={flag} />
    {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={60 + k * 32} y={160} width={12} height={10} fill="#1a0e06" />)}
  </svg>
);

export const Waves: React.FC<{ f: number; w?: number; color?: string; y?: number }> = ({ f, w = 1600, color = '#2f6f9f', y = 0 }) => (
  <svg width={w} height={120} viewBox={`0 0 ${w} 120`} style={{ position: 'absolute', left: 0, top: y }}>
    {[0, 1, 2].map((k) => <path key={k} d={`M0 ${30 + k * 28} ${Array.from({ length: Math.ceil(w / 100) + 2 }, () => 'q 50 -14 100 0').join(' ')}`} stroke={color} strokeWidth={4} fill="none" opacity={0.6 - k * 0.12} transform={`translate(${-((f * (1.2 + k * 0.4) + k * 30) % 100)} 0)`} />)}
  </svg>
);

export const Wheat: React.FC<{ h?: number; dwarf?: boolean; sway?: number }> = ({ h = 220, dwarf = false, sway = 0 }) => {
  const stem = dwarf ? 0.55 : 1;
  return (
    <svg width={60} height={h} viewBox="0 0 60 220" style={{ overflow: 'visible' }}>
      <g transform={`rotate(${sway} 30 220)`}>
        <line x1={30} y1={220} x2={30} y2={220 - 160 * stem} stroke="#b8a040" strokeWidth={4} />
        {Array.from({ length: 6 }, (_, i) => <g key={i}><ellipse cx={22} cy={220 - 160 * stem - i * 11} rx={7} ry={10} fill={dwarf ? '#e8c040' : '#d8b850'} /><ellipse cx={38} cy={220 - 160 * stem - i * 11 - 5} rx={7} ry={10} fill={dwarf ? '#e8c040' : '#d8b850'} /></g>)}
      </g>
    </svg>
  );
};

export const Motorbike: React.FC<{ size?: number; box?: string }> = ({ size = 180, box = DYT.orange }) => (
  <svg width={size} height={size * 0.62} viewBox="0 0 180 112" style={{ overflow: 'visible' }}>
    <circle cx={36} cy={86} r={22} fill="none" stroke="#ccc" strokeWidth={7} /><circle cx={146} cy={86} r={22} fill="none" stroke="#ccc" strokeWidth={7} />
    <path d="M36 86 L80 60 L130 60 L146 86" stroke="#555" strokeWidth={8} fill="none" />
    <rect x={20} y={20} width={46} height={40} rx={6} fill={box} />
    <circle cx={96} cy={22} r={12} fill="#333" /><path d="M90 34 L106 60" stroke="#333" strokeWidth={10} />
    <line x1={120} y1={40} x2={136} y2={60} stroke="#555" strokeWidth={6} />
  </svg>
);

// a prediction badge for 2100 (STORY §5: "PREDICTION · a scenario, not a fact")
export const PredictionTag: React.FC<{ at: number; out?: number }> = ({ at, out = 1e9 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', right: 160, top: 96, opacity: ease(f, at - 2, at + 8) * (1 - ease(f, out - 8, out)), padding: '10px 22px', borderRadius: 999, border: `3px dashed ${DL.red}`, background: '#0e0b0af0', fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.red, whiteSpace: 'nowrap' }}>
      PREDICTION · a scenario, not a fact
    </div>
  );
};

// a figure with a number, for the 1 in 5 / pellagra / crew counts
export const Figure: React.FC<{ value: React.ReactNode; label: React.ReactNode; at: number; color?: string; size?: number }> = ({ value, label, at, color = DL.gold, size = 120 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, opacity: ease(f, at - 2, at + 6) }}>
      <span style={{ fontFamily: DL_SERIF, fontSize: size, lineHeight: 1, color, transform: `scale(${ease(f, at - 2, at + 8, 1.2, 1)})`, transformOrigin: 'left center', display: 'inline-block' }}>{value}</span>
      <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 2, color: DL.dim }}>{label}</span>
    </div>
  );
};

export { DL_SANS };
