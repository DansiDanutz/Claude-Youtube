// Did You Know That? — No. 04 "Money" episode kit. NEW file only: dykkit.tsx, dykkit-sun.tsx, dykkit-school.tsx and
// dytbrand.tsx stay byte-identical so Nos. 01–03 render exactly as audited. The generic No. 03 parts (the HOW WE SAW IT
// chip + ladder, labels, stamps, figures) are re-exported unchanged; this file adds the money arc and illustrations.
//   MONEY_ARC / moneyRungs   the relationship arc (STORY §1): chip text (big) and the short dock label
//   CacaoPod, CacaoBean, Avocado, TurkeyHen, Cloak     1500 Tenochtitlan
//   CopperPlate, Banknote                             1661 Stockholm (and every later note)
//   Sovereign, GoldBar, Anchor                        1821 London / 1971
//   TvSet, Phone, TextBubble                          1971 / today
//   CoinGrid, DotGrid, Digits                         the guess (97 / 3), the BIS survey (85 of 93), money as code
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS } from './danslab';
import { DYT } from './dytbrand';
import { ease } from './dykkit';
export {
  EpisodeHud, WakePlace, win, SunCliffhanger, OnWord, SchoolChip as MoneyChip, SchoolLadder as MoneyLadder, SCHOOL_FULL as LADDER_FULL,
  StampText, Label, Source, Kid, PeopleRow, BigWord, Panel, AskMark, QGRAD, INK,
} from './dykkit-school';

export const COPPER = { light: '#e8a070', mid: '#b8693a', dark: '#6e3a1a' } as const;
export const GOLD = { light: '#ffe08a', mid: '#e0b030', dark: '#8a6a10' } as const;
export const NOTE = { paper: '#e9e2c8', ink: '#3a5a48', green: '#3a7a4a', line: '#9bd06a' } as const;
export const CACAO = { pod: '#a0522d', podLight: '#d2843f', bean: '#5a3020', beanLight: '#8a5a3a' } as const;

// ── the arc (STORY §1, approved): chip text on its word, short label in the docked ladder
export type MoneyRung = { year: string; label: string; at: number };
export const MONEY_ARC: { year: string; chip: string; dock: string }[] = [
  { year: '1500', chip: 'SOMETHING USEFUL', dock: 'SOMETHING USEFUL' },
  { year: '1661', chip: 'A PROMISE ON PAPER', dock: 'PROMISE ON PAPER' },
  { year: '1720', chip: 'A BELIEF', dock: 'A BELIEF' },
  { year: '1821', chip: 'AS GOOD AS GOLD', dock: 'AS GOOD AS GOLD' },
  { year: '1971', chip: 'JUST TRUST', dock: 'JUST TRUST' },
  { year: 'TODAY', chip: 'NUMBERS ON A SCREEN', dock: 'NUMBERS ON SCREEN' },
];
export const NEXT_RUNG = 'A PROMISE IN CODE?';
// already-spoken rungs (at = -1: on screen from the shot's first frame); `full` uses the long chip text
export const moneyRungs = (n: number, full = false): MoneyRung[] =>
  MONEY_ARC.slice(0, n).map((r) => ({ year: r.year, label: full ? r.chip : r.dock, at: -1 }));

// ── 1500 ───────────────────────────────────────────────────────────────────────────────────────────
export const CacaoBean: React.FC<{ size?: number; fake?: number; rot?: number }> = ({ size = 60, fake = 0, rot = 0 }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 100 70" style={{ overflow: 'visible' }}>
    <g transform={`rotate(${rot} 50 35)`}>
      <ellipse cx={50} cy={35} rx={44} ry={28} fill={CACAO.bean} stroke={CACAO.beanLight} strokeWidth={4} />
      <path d="M12 35 Q50 22 88 35" fill="none" stroke={CACAO.beanLight} strokeWidth={3} opacity={1 - fake} />
      {/* a faked bean: split open, earth inside (illustration of the friar's 'counterfeit cacao') */}
      {fake > 0.01 && <g opacity={fake}><path d="M10 35 L90 35" stroke="#1a0e08" strokeWidth={6} /><ellipse cx={50} cy={35} rx={34} ry={10} fill="#6b5a3a" /></g>}
    </g>
  </svg>
);

export const CacaoPod: React.FC<{ size?: number; glow?: number }> = ({ size = 160, glow = 0 }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 100 150" style={{ overflow: 'visible', filter: glow > 0.01 ? `drop-shadow(0 0 ${18 * glow}px ${CACAO.podLight})` : undefined }}>
    <path d="M50 4 C82 20 92 70 78 112 C70 136 30 136 22 112 C8 70 18 20 50 4 Z" fill={CACAO.pod} stroke={CACAO.podLight} strokeWidth={4} />
    {[30, 42, 58, 70].map((x) => <path key={x} d={`M${x} 18 Q${x + (x < 50 ? -6 : 6)} 70 ${x} 126`} fill="none" stroke={CACAO.podLight} strokeWidth={3} opacity={0.7} />)}
    <rect x={46} y={0} width={8} height={10} rx={3} fill="#5a3a1a" />
  </svg>
);

export const Avocado: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 80 104">
    <path d="M40 4 C58 4 64 34 70 60 C78 92 56 100 40 100 C24 100 2 92 10 60 C16 34 22 4 40 4 Z" fill="#3e6b2a" stroke="#6fa040" strokeWidth={4} />
    <path d="M40 22 C52 22 56 44 60 62 C64 84 52 90 40 90 C28 90 16 84 20 62 C24 44 28 22 40 22 Z" fill="#c8d870" />
    <circle cx={40} cy={66} r={14} fill="#7a4a24" />
  </svg>
);

export const TurkeyHen: React.FC<{ size?: number }> = ({ size = 130 }) => (
  <svg width={size} height={size * 0.9} viewBox="0 0 130 117">
    {[0, 1, 2, 3, 4].map((k) => <ellipse key={k} cx={44} cy={52} rx={12} ry={40} fill={['#5a3a20', '#7a5030', '#5a3a20', '#7a5030', '#5a3a20'][k]} transform={`rotate(${-60 + k * 22} 44 80)`} />)}
    <ellipse cx={70} cy={74} rx={36} ry={28} fill="#4a3020" />
    <path d="M96 64 C104 40 112 34 118 40 C122 46 116 52 110 54 L104 70 Z" fill="#6a4a30" />
    <circle cx={114} cy={40} r={4} fill="#fff" /><path d="M118 44 Q124 52 118 58" stroke="#c0392b" strokeWidth={5} fill="none" />
    <line x1={62} y1={100} x2={58} y2={116} stroke="#c8a040" strokeWidth={5} /><line x1={80} y1={100} x2={84} y2={116} stroke="#c8a040" strokeWidth={5} />
  </svg>
);

export const Cloak: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x={10} y={10} width={80} height={80} rx={4} fill="#e8e0cc" stroke="#b8a888" strokeWidth={3} />
    {[26, 42, 58, 74].map((y) => <line key={y} x1={10} y1={y} x2={90} y2={y} stroke="#c0392b" strokeWidth={3} opacity={0.6} />)}
    {[24, 50, 76].map((x) => <line key={x} x1={x} y1={10} x2={x} y2={90} stroke="#2f6f9f" strokeWidth={2} opacity={0.5} />)}
  </svg>
);

// ── 1661 ───────────────────────────────────────────────────────────────────────────────────────────
export const CopperPlate: React.FC<{ w?: number; glow?: number }> = ({ w = 300, glow = 0 }) => (
  <svg width={w} height={w * 0.62} viewBox="0 0 300 186" style={{ overflow: 'visible', filter: glow > 0.01 ? `drop-shadow(0 0 ${20 * glow}px ${COPPER.light})` : undefined }}>
    <rect x={6} y={6} width={288} height={174} rx={6} fill={COPPER.mid} stroke={COPPER.dark} strokeWidth={6} />
    {[[30, 30], [270, 30], [30, 156], [270, 156], [150, 93]].map(([x, y], i) => (
      <g key={i}><circle cx={x} cy={y} r={22} fill={COPPER.light} stroke={COPPER.dark} strokeWidth={3} /><text x={x} y={y + 7} textAnchor="middle" fontFamily={DL_MONO} fontWeight={700} fontSize={18} fill={COPPER.dark}>{i === 4 ? '10' : '♛'}</text></g>
    ))}
  </svg>
);

// a banknote; `lines` = small text rows (kept short), `big` = the value
export const Banknote: React.FC<{ w?: number; big?: string; title?: string; color?: string; ink?: string; glow?: number; tilt?: number }> = ({ w = 360, big = '', title = '', color = NOTE.paper, ink = NOTE.ink, glow = 0, tilt = 0 }) => (
  <svg width={w} height={w * 0.52} viewBox="0 0 360 188" style={{ overflow: 'visible', transform: `rotate(${tilt}deg)`, filter: glow > 0.01 ? `drop-shadow(0 0 ${22 * glow}px ${DL.gold})` : undefined }}>
    <rect x={4} y={4} width={352} height={180} rx={10} fill={color} stroke={ink} strokeWidth={5} />
    <rect x={18} y={18} width={324} height={152} rx={6} fill="none" stroke={ink} strokeWidth={2} strokeDasharray="6 5" opacity={0.6} />
    <circle cx={280} cy={96} r={40} fill="none" stroke={ink} strokeWidth={3} opacity={0.5} />
    {title && <text x={36} y={56} fontFamily={DL_SERIF} fontStyle="italic" fontSize={26} fill={ink}>{title}</text>}
    {big && <text x={36} y={140} fontFamily={DL_SERIF} fontWeight={600} fontSize={64} fill={ink}>{big}</text>}
    {[0, 1, 2].map((k) => <line key={k} x1={36} y1={76 + k * 14} x2={200 - k * 30} y2={76 + k * 14} stroke={ink} strokeWidth={3} opacity={big ? 0 : 0.5} />)}
  </svg>
);

// ── 1821 / 1971 ────────────────────────────────────────────────────────────────────────────────────
export const Sovereign: React.FC<{ size?: number; glow?: number; label?: string }> = ({ size = 80, glow = 0, label = '£1' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" style={{ overflow: 'visible', filter: glow > 0.01 ? `drop-shadow(0 0 ${16 * glow}px ${GOLD.light})` : undefined }}>
    <circle cx={40} cy={40} r={36} fill={GOLD.mid} stroke={GOLD.dark} strokeWidth={4} />
    <circle cx={40} cy={40} r={28} fill="none" stroke={GOLD.light} strokeWidth={2} />
    <text x={40} y={48} textAnchor="middle" fontFamily={DL_SERIF} fontWeight={700} fontSize={24} fill={GOLD.dark}>{label}</text>
  </svg>
);

export const GoldBar: React.FC<{ w?: number; glow?: number }> = ({ w = 160, glow = 0 }) => (
  <svg width={w} height={w * 0.5} viewBox="0 0 160 80" style={{ overflow: 'visible', filter: glow > 0.01 ? `drop-shadow(0 0 ${18 * glow}px ${GOLD.light})` : undefined }}>
    <path d="M24 8 L136 8 L156 72 L4 72 Z" fill={GOLD.mid} stroke={GOLD.dark} strokeWidth={4} />
    <path d="M34 18 L126 18 L138 62 L22 62 Z" fill={GOLD.light} opacity={0.35} />
  </svg>
);

export const Anchor: React.FC<{ size?: number; color?: string }> = ({ size = 140, color = DL.gold }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
    <circle cx={50} cy={14} r={9} fill="none" stroke={color} strokeWidth={6} />
    <line x1={50} y1={23} x2={50} y2={88} stroke={color} strokeWidth={7} strokeLinecap="round" />
    <line x1={30} y1={36} x2={70} y2={36} stroke={color} strokeWidth={7} strokeLinecap="round" />
    <path d="M14 62 Q18 90 50 90 Q82 90 86 62" fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" />
  </svg>
);

export const TvSet: React.FC<{ size?: number; on?: number; children?: React.ReactNode }> = ({ size = 360, on = 1, children }) => (
  <div style={{ position: 'relative', width: size, height: size * 0.8 }}>
    <svg width={size} height={size * 0.8} viewBox="0 0 360 288" style={{ position: 'absolute', inset: 0 }}>
      <line x1={140} y1={40} x2={100} y2={0} stroke="#888" strokeWidth={4} /><line x1={220} y1={40} x2={260} y2={0} stroke="#888" strokeWidth={4} />
      <rect x={10} y={40} width={340} height={220} rx={26} fill="#5a3a22" stroke="#2a1a0e" strokeWidth={6} />
      <rect x={34} y={62} width={230} height={176} rx={30} fill="#0d1210" />
      <rect x={34} y={62} width={230} height={176} rx={30} fill="#9fc8d8" opacity={0.25 * on} />
      {[0, 1].map((k) => <circle key={k} cx={306} cy={100 + k * 50} r={14} fill="#c8a060" />)}
      <rect x={60} y={260} width={20} height={24} fill="#2a1a0e" /><rect x={280} y={260} width={20} height={24} fill="#2a1a0e" />
    </svg>
    <div style={{ position: 'absolute', left: (34 / 360) * size, top: (62 / 288) * size * 0.8, width: (230 / 360) * size, height: (176 / 288) * size * 0.8, overflow: 'hidden', borderRadius: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: on }}>{children}</div>
  </div>
);

export const Phone: React.FC<{ size?: number; glow?: number; children?: React.ReactNode }> = ({ size = 300, glow = 0, children }) => (
  <div style={{ position: 'relative', width: size * 0.52, height: size, borderRadius: size * 0.07, background: '#111', border: '5px solid #777', boxSizing: 'border-box', boxShadow: glow > 0.01 ? `0 0 ${40 * glow}px ${DYT.cyan}88` : undefined, overflow: 'hidden' }}>
    <div style={{ position: 'absolute', left: '7%', right: '7%', top: '7%', bottom: '7%', borderRadius: size * 0.02, background: '#0b1630', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: size * 0.03, padding: size * 0.03, boxSizing: 'border-box' }}>{children}</div>
  </div>
);

export const TextBubble: React.FC<{ at: number; children: React.ReactNode; color?: string; right?: boolean; size?: number }> = ({ at, children, color = DYT.green, right = false, size = 24 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ alignSelf: right ? 'flex-end' : 'flex-start', maxWidth: '92%', padding: '10px 14px', borderRadius: 14, background: color, color: '#06120a', fontFamily: DL_SANS, fontWeight: 600, fontSize: size, lineHeight: 1.2, opacity: ease(f, at - 2, at + 6), transform: `scale(${ease(f, at - 2, at + 8, 0.7, 1)})`, transformOrigin: right ? 'right center' : 'left center' }}>{children}</div>
  );
};

// ── the guess: 100 pounds as coins; `solid(i)` 0..1 = still a coin, else it dissolves into a digit
export const CoinGrid: React.FC<{ solid: (i: number) => number; size?: number; cols?: number; digitColor?: string }> = ({ solid, size = 40, cols = 20, digitColor = DYT.cyan }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, ${size}px)`, gap: 8 }}>
    {Array.from({ length: 100 }, (_, i) => {
      const s = Math.max(0, Math.min(1, solid(i)));
      return (
        <div key={i} style={{ position: 'relative', width: size, height: size }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: GOLD.mid, border: `3px solid ${GOLD.dark}`, boxSizing: 'border-box', opacity: s, transform: `scale(${0.6 + 0.4 * s})` }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DL_MONO, fontWeight: 700, fontSize: size * 0.6, color: digitColor, opacity: 1 - s }}>{(i * 7) % 10}</div>
        </div>
      );
    })}
  </div>
);

// ── 2100: n dots, the first `lit` light up one step at a time from `at`
export const DotGrid: React.FC<{ n: number; lit: number; at: number; step?: number; size?: number; cols?: number; color?: string }> = ({ n, lit, at, step = 0.5, size = 26, cols = 16, color = DYT.cyan }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, ${size}px)`, gap: 10 }}>
      {Array.from({ length: n }, (_, i) => {
        const on = i < lit ? ease(f, at + i * step, at + i * step + 6) : 0;
        return <div key={i} style={{ width: size, height: size, borderRadius: '50%', background: on > 0.5 ? color : DL.panel2, border: `2px solid ${on > 0.5 ? color : DL.border}`, boxSizing: 'border-box', boxShadow: on > 0.5 ? `0 0 ${10 * on}px ${color}` : undefined }} />;
      })}
    </div>
  );
};

// falling digits (money as numbers / code): deterministic columns
export const Digits: React.FC<{ w: number; h: number; op: number; speed?: number; color?: string; cols?: number }> = ({ w, h, op, speed = 4, color = DYT.cyan, cols = 18 }) => {
  const f = useCurrentFrame();
  if (op <= 0.001) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, width: w, height: h, overflow: 'hidden', opacity: op }}>
      {Array.from({ length: cols }, (_, c) => {
        const y = ((f * speed * (0.6 + ((c * 37) % 10) / 12) + c * 97) % (h + 400)) - 400;
        return (
          <div key={c} style={{ position: 'absolute', left: (c + 0.5) * (w / cols), top: y, fontFamily: DL_MONO, fontSize: 30, lineHeight: 1.1, color, opacity: 0.35 + ((c * 13) % 7) / 12, whiteSpace: 'pre' }}>
            {Array.from({ length: 10 }, (_, k) => String((c * 3 + k * 7) % 10)).join('\n')}
          </div>
        );
      })}
    </div>
  );
};
