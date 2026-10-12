// Did You Know That? — No. 03 "School" episode kit. NEW file only: dykkit.tsx, dykkit-sun.tsx and dytbrand.tsx
// stay byte-identical so No. 01 and No. 02 render exactly as audited. Generic No. 02 parts (EpisodeHud, SunChip,
// WakePlace, win, SunCliffhanger, SunWeekStrip, OnWord) are re-exported from the Sun kit unchanged.
//   SCHOOL_ARC / schoolRungs   the relationship arc (STORY §1) with short dock labels
//   SchoolLadder               ArcLadder with a wider dock (the school labels are longer than the Sun's)
//   SchoolChip                 the HOW WE SAW IT chip, flying into the wider dock
//   Kid, Desk, Bell, Book, …   small line illustrations in the DansLab palette
//   PeopleRow                  n figures, k of them lit (literacy guess, "one in five")
//   StampText                  a stamp that lands on its word
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE } from './danslab';
import { DYT } from './dytbrand';
import { ease } from './dykkit';
export { EpisodeHud, SunChip, WakePlace, win, SunCliffhanger, SunWeekStrip, OnWord } from './dykkit-sun';

export const INK = { chalk: '#e8e4d8', slate: '#1d2a24', wood: '#8a5a34', woodDark: '#4a2e18', paper: '#efe2c4', sky: '#5aa0e0', leaf: '#4caf50', brick: '#a0472c' } as const;
export const QGRAD = `linear-gradient(90deg, #ffd23f, ${DYT.orange} 40%, ${DYT.magenta} 85%)`;

// ── the arc (STORY §1): chip text (big, on its word) and the dock label (short, fits the ladder)
export type SchoolRung = { year: string; label: string; at: number };
export const SCHOOL_ARC: { year: string; chip: string; dock: string }[] = [
  { year: '1500', chip: 'FOR THE FEW', dock: 'FOR THE FEW' },
  { year: '1647', chip: "TO READ GOD'S WORD", dock: "GOD'S WORD" },
  { year: '1763', chip: "THE KING'S ORDER", dock: "KING'S ORDER" },
  { year: '1810', chip: 'BY THE HUNDRED', dock: 'BY THE HUNDRED' },
  { year: '1948', chip: 'A RIGHT · A LADDER', dock: 'RIGHT · LADDER' },
  { year: 'TODAY', chip: 'ALWAYS ON', dock: 'ALWAYS ON' },
];
export const schoolRungs = (n: number): SchoolRung[] => SCHOOL_ARC.slice(0, n).map((r) => ({ year: r.year, label: r.dock, at: -1 }));
export const SCHOOL_DOCK = { left: 1300, top: 136, width: 460, rungH: 40, gap: 6, font: 26, kick: 24 } as const; // x 1300–1760, y 136–490
export const SCHOOL_FULL = { left: 160, top: 170, width: 900, rungH: 82, gap: 12, font: 44, kick: 26 } as const;

export const SchoolChip: React.FC<{ text: string; at: number; dockAt: number; slot: number; left?: number; top?: number; icon?: React.ReactNode }> = ({ text, at, dockAt, slot, left = 160, top = 760, icon }) => {
  const f = useCurrentFrame();
  const D = SCHOOL_DOCK;
  const fly = ease(f, dockAt, dockAt + 14, 0, 1, DL_EASE.inOut);
  const toX = D.left - left;
  const toY = D.top + D.kick + 8 + (6 - slot) * (D.rungH + D.gap) - top;
  const s = ease(f, at, at + 8, 1.25, 1) * (1 - 0.45 * fly);
  return (
    <div style={{ position: 'absolute', left, top, transformOrigin: 'top left', transform: `translate(${toX * fly}px, ${toY * fly + ease(f, at, at + 15, 26, 0)}px) scale(${s})`, opacity: ease(f, at - 1, at + 8) * (1 - ease(f, dockAt + 8, dockAt + 14)), padding: '16px 28px', borderRadius: 12, border: `2px solid ${DL.gold}`, background: '#0e0b0af2', display: 'flex', alignItems: 'center', gap: 20, boxShadow: `0 0 36px ${DL.gold}33` }}>
      {icon}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 5, color: DL.dim }}>HOW WE SAW IT</span>
        <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 40, letterSpacing: 4, color: DL.gold, whiteSpace: 'nowrap' }}>{text}</span>
      </div>
    </div>
  );
};

// The ladder: 'dock' = top-right column (newest rung gold); 'full' = left half, rungs dim until litAt.
export const SchoolLadder: React.FC<{ rungs: SchoolRung[]; show: number; mode?: 'dock' | 'full'; litAt?: number[]; glowAt?: number; next?: { at: number; fillAt?: number; fill?: string }; left?: number; top?: number }> = ({ rungs, show, mode = 'dock', litAt, glowAt, next, left, top }) => {
  const f = useCurrentFrame();
  if (show <= 0.001) return null;
  const full = mode === 'full';
  const B = full ? SCHOOL_FULL : SCHOOL_DOCK;
  const D = { ...B, left: left ?? B.left, top: top ?? B.top };
  const slots = 7;
  const visible = rungs.filter((r) => f >= r.at);
  const newest = visible.length - 1;
  const glow = glowAt === undefined ? 0 : ease(f, glowAt, glowAt + 8) * (1 - ease(f, glowAt + 18, glowAt + 40));
  const rowTop = (i: number) => D.kick + 8 + (slots - 1 - i) * (D.rungH + D.gap);
  const rung = (i: number, year: string, label: string, appear: number, lit: boolean, dashed = false, tint: string = DL.gold) => (
    <div key={`${year}-${i}`} style={{ position: 'absolute', left: 0, top: rowTop(i), width: D.width, height: D.rungH, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: full ? 22 : 12, padding: `0 ${full ? 26 : 14}px`, borderRadius: full ? 14 : 8, border: `${full ? 3 : 2}px ${dashed ? 'dashed' : 'solid'} ${lit ? tint : DL.border}`, background: lit ? '#1a1406f2' : '#0e0b0ae6', opacity: appear, transform: `translateX(${(1 - appear) * 24}px)`, boxShadow: lit ? `0 0 ${18 + 30 * glow}px ${tint}${glow > 0.05 ? '88' : '44'}` : undefined }}>
      <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: D.font, color: lit ? tint : DL.dim, fontVariantNumeric: 'tabular-nums' }}>{year}</span>
      <span style={{ fontFamily: DL_MONO, fontSize: D.font * 0.8, color: lit ? tint : DL.faint }}>·</span>
      <span style={{ fontFamily: DL_MONO, fontSize: D.font, letterSpacing: full ? 3 : 2, color: lit ? (dashed ? tint : DL.text) : DL.dim, whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  );
  return (
    <div style={{ position: 'absolute', left: D.left, top: D.top, width: D.width, height: D.kick + 8 + slots * (D.rungH + D.gap), opacity: show }}>
      <div style={{ position: 'absolute', left: 0, top: 0, fontFamily: DL_MONO, fontSize: D.kick, letterSpacing: full ? 8 : 5, color: DL.dim }}>HOW WE SAW IT</div>
      {visible.map((r, i) => {
        const appear = r.at < 0 ? 1 : ease(f, r.at, r.at + 10);
        const lit = litAt ? f >= (litAt[i] ?? 1e9) : i === newest;
        return rung(i, r.year, r.label, appear, lit || glow > 0.05);
      })}
      {next && f >= next.at && rung(6, '2100', next.fillAt !== undefined && f >= next.fillAt ? next.fill ?? '?' : '?', ease(f, next.at, next.at + 12), true, true, DL.red)}
    </div>
  );
};

// ── stamp: lands on its word (scale 1.6 → 1, slight tilt)
export const StampText: React.FC<{ text: string; at: number; color?: string; size?: number; tilt?: number }> = ({ text, at, color = DL.red, size = 40, tilt = -6 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: 'inline-block', opacity: ease(f, at - 1, at + 4), transform: `rotate(${tilt}deg) scale(${ease(f, at - 1, at + 7, 1.6, 1)})`, padding: '10px 24px', border: `4px solid ${color}`, borderRadius: 10, fontFamily: DL_MONO, fontWeight: 700, fontSize: size, letterSpacing: 5, color, whiteSpace: 'nowrap', background: '#0e0b0acc' }}>{text}</div>
  );
};

// a mono label that fades in on its word
export const Label: React.FC<{ at: number; children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties }> = ({ at, children, color = DL.dim, size = 26, style }) => {
  const f = useCurrentFrame();
  return <div style={{ fontFamily: DL_MONO, fontSize: size, letterSpacing: 3, color, opacity: ease(f, at - 2, at + 8), transform: `translateY(${ease(f, at - 2, at + 10, 12, 0)}px)`, ...style }}>{children}</div>;
};

// a small source line (≥ 24 px)
export const Source: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, children, style }) => {
  const f = useCurrentFrame();
  return <div style={{ fontFamily: DL_MONO, fontSize: 24, lineHeight: 1.3, color: DL.muted, opacity: ease(f, at - 2, at + 10), ...style }}>{children}</div>;
};

// ── figures ─────────────────────────────────────────────────────────────────────────────────────────
export const Kid: React.FC<{ size?: number; color?: string; tool?: 'hammer' | 'book' | 'crown' | 'cap' | 'none'; adult?: boolean; glow?: number; girl?: boolean }> = ({ size = 120, color = DL.warm, tool = 'none', adult = false, glow = 0, girl = false }) => {
  const h = adult ? 1.15 : 1;
  return (
    <svg width={size} height={size * 1.4 * h} viewBox={`0 0 100 ${140 * h}`} style={{ overflow: 'visible', filter: glow > 0.01 ? `drop-shadow(0 0 ${16 * glow}px ${color})` : undefined }}>
      <g transform={`translate(0 ${140 * h - 140})`}>
        <circle cx={50} cy={adult ? 22 : 30} r={adult ? 17 : 20} fill={color} />
        {girl
          ? <path d={`M50 ${adult ? 42 : 52} L82 138 L18 138 Z`} fill={color} />
          : <path d={`M22 138 C22 ${adult ? 70 : 80} 32 ${adult ? 44 : 54} 50 ${adult ? 44 : 54} C68 ${adult ? 44 : 54} 78 ${adult ? 70 : 80} 78 138 Z`} fill={color} />}
        {tool === 'hammer' && <g transform="translate(76 70) rotate(-30)"><rect x={-3} y={0} width={6} height={44} rx={2} fill={INK.wood} /><rect x={-12} y={-6} width={24} height={12} rx={2} fill="#9a9a9a" /></g>}
        {tool === 'book' && <g transform="translate(30 86)"><rect x={0} y={0} width={40} height={28} rx={3} fill={INK.paper} /><line x1={20} y1={0} x2={20} y2={28} stroke={INK.woodDark} strokeWidth={2} /></g>}
        {tool === 'crown' && <path d="M30 12 L36 -6 L44 6 L50 -10 L56 6 L64 -6 L70 12 Z" fill={DL.gold} />}
        {tool === 'cap' && <g><path d="M22 12 L50 0 L78 12 L50 24 Z" fill="#1b1b2a" stroke={DL.gold} strokeWidth={2} /><line x1={74} y1={13} x2={78} y2={34} stroke={DL.gold} strokeWidth={3} /></g>}
      </g>
    </svg>
  );
};

// n figures in a row; `lit(i)` 0..1 per figure (lit = gold, else dim)
export const PeopleRow: React.FC<{ n: number; lit: (i: number) => number; size?: number; gap?: number; color?: string }> = ({ n, lit, size = 70, gap = 16, color = DL.gold }) => (
  <div style={{ display: 'flex', gap, alignItems: 'flex-end' }}>
    {Array.from({ length: n }, (_, i) => {
      const l = Math.max(0, Math.min(1, lit(i)));
      return (
        <svg key={i} width={size} height={size * 1.5} viewBox="0 0 60 90">
          <circle cx={30} cy={16} r={12} fill={l > 0.5 ? color : '#3a3532'} opacity={0.5 + 0.5 * l} />
          <path d="M10 90 C10 46 18 32 30 32 C42 32 50 46 50 90 Z" fill={l > 0.5 ? color : '#3a3532'} opacity={0.5 + 0.5 * l} style={{ filter: l > 0.5 ? `drop-shadow(0 0 ${10 * l}px ${color})` : undefined }} />
        </svg>
      );
    })}
  </div>
);

export const Desk: React.FC<{ size?: number; color?: string; glow?: number }> = ({ size = 120, color = INK.wood, glow = 0 }) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 120 96" style={{ filter: glow > 0.01 ? `drop-shadow(0 0 ${14 * glow}px ${DL.gold})` : undefined }}>
    <path d="M10 30 L110 30 L104 40 L16 40 Z" fill={color} />
    <rect x={20} y={40} width={8} height={52} fill={INK.woodDark} /><rect x={92} y={40} width={8} height={52} fill={INK.woodDark} />
    <rect x={20} y={62} width={80} height={6} fill={INK.woodDark} />
  </svg>
);

export const Bell: React.FC<{ size?: number; swing?: number; color?: string }> = ({ size = 120, swing = 0, color = DL.gold }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{ overflow: 'visible' }}>
    <g transform={`rotate(${swing * 18} 60 14)`}>
      <rect x={56} y={4} width={8} height={14} rx={3} fill={color} />
      <path d="M30 88 Q30 26 60 22 Q90 26 90 88 Z" fill={color} />
      <rect x={22} y={86} width={76} height={10} rx={4} fill={color} />
      <circle cx={60 + swing * 10} cy={104} r={8} fill={color} />
    </g>
    {Math.abs(swing) > 0.2 && [0, 1].map((k) => <path key={k} d={`M${12 - k * 10} ${40 + k * 8} q -8 18 0 36 M${108 + k * 10} ${40 + k * 8} q 8 18 0 36`} stroke={color} strokeWidth={4} fill="none" opacity={0.6} />)}
  </svg>
);

export const Book: React.FC<{ size?: number; open?: number; color?: string; text?: string }> = ({ size = 160, open = 1, color = INK.paper, text }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 160 112">
    <path d={`M80 20 Q${80 - 70 * open} 8 ${80 - 74 * open} 18 L${80 - 74 * open} 100 Q${80 - 70 * open} 92 80 104 Z`} fill={color} stroke={INK.woodDark} strokeWidth={3} />
    <path d={`M80 20 Q${80 + 70 * open} 8 ${80 + 74 * open} 18 L${80 + 74 * open} 100 Q${80 + 70 * open} 92 80 104 Z`} fill={color} stroke={INK.woodDark} strokeWidth={3} />
    {[0, 1, 2, 3].map((k) => <g key={k} opacity={open}><line x1={22} y1={36 + k * 16} x2={70} y2={34 + k * 16} stroke="#8a7a5a" strokeWidth={3} /><line x1={90} y1={34 + k * 16} x2={138} y2={36 + k * 16} stroke="#8a7a5a" strokeWidth={3} /></g>)}
    {text && <text x={80} y={12} textAnchor="middle" fontFamily={DL_MONO} fontSize={14} fill={DL.gold}>{text}</text>}
  </svg>
);

export const SchoolHouse: React.FC<{ size?: number; color?: string; lit?: number; bell?: boolean }> = ({ size = 160, color = INK.brick, lit = 1, bell = true }) => (
  <svg width={size} height={size * 0.9} viewBox="0 0 160 144">
    <path d="M10 64 L80 14 L150 64 Z" fill="#5a2a1a" />
    <rect x={22} y={62} width={116} height={78} fill={color} />
    {bell && <><rect x={70} y={0} width={20} height={22} fill="#5a2a1a" /><circle cx={80} cy={14} r={5} fill={DL.gold} /></>}
    <rect x={68} y={98} width={24} height={42} fill="#2a1408" />
    {[36, 104].map((x) => <rect key={x} x={x} y={80} width={22} height={22} fill={DL.gold} opacity={0.25 + 0.65 * lit} />)}
  </svg>
);

export const Coin: React.FC<{ size?: number; label?: string }> = ({ size = 70, label = '' }) => (
  <svg width={size} height={size} viewBox="0 0 70 70"><circle cx={35} cy={35} r={30} fill={DL.gold} stroke="#8a6a10" strokeWidth={4} /><text x={35} y={44} textAnchor="middle" fontFamily={DL_MONO} fontWeight={700} fontSize={24} fill="#5a4208">{label}</text></svg>
);

export const Cow: React.FC<{ size?: number }> = ({ size = 160 }) => (
  <svg width={size} height={size * 0.62} viewBox="0 0 160 100">
    <ellipse cx={78} cy={50} rx={52} ry={26} fill="#e8e0d0" />
    <circle cx={62} cy={44} r={9} fill="#3a2a1c" /><circle cx={92} cy={56} r={11} fill="#3a2a1c" />
    <ellipse cx={136} cy={40} rx={16} ry={12} fill="#e8e0d0" /><path d="M128 28 l-4 -10 M144 28 l4 -10" stroke="#b9b1a4" strokeWidth={3} />
    {[38, 56, 98, 116].map((x) => <rect key={x} x={x} y={68} width={7} height={28} fill="#d8d0c0" />)}
  </svg>
);

export const Scroll: React.FC<{ size?: number; seal?: boolean; title?: string }> = ({ size = 200, seal = true, title }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 200 140">
    <rect x={20} y={14} width={160} height={112} fill={INK.paper} />
    <rect x={10} y={8} width={180} height={14} rx={7} fill="#c9b48a" /><rect x={10} y={118} width={180} height={14} rx={7} fill="#c9b48a" />
    {[0, 1, 2, 3, 4].map((k) => <line key={k} x1={40} y1={40 + k * 14} x2={160 - (k % 2) * 30} y2={40 + k * 14} stroke="#8a7a5a" strokeWidth={3} />)}
    {seal && <circle cx={150} cy={106} r={14} fill={DL.red} />}
    {title && <text x={100} y={34} textAnchor="middle" fontFamily={DL_MONO} fontSize={14} fill={INK.woodDark}>{title}</text>}
  </svg>
);

export const Screen: React.FC<{ size?: number; on?: number; kind?: 'phone' | 'laptop' }> = ({ size = 160, on = 1, kind = 'laptop' }) => kind === 'phone' ? (
  <svg width={size * 0.55} height={size} viewBox="0 0 88 160"><rect x={4} y={4} width={80} height={152} rx={14} fill="#111" stroke="#666" strokeWidth={4} /><rect x={12} y={20} width={64} height={116} rx={4} fill={DL.sky} opacity={0.15 + 0.7 * on} /></svg>
) : (
  <svg width={size} height={size * 0.7} viewBox="0 0 160 112"><rect x={22} y={6} width={116} height={78} rx={6} fill="#111" stroke="#666" strokeWidth={4} /><rect x={30} y={14} width={100} height={62} fill={DL.sky} opacity={0.15 + 0.7 * on} style={{ filter: on > 0.5 ? `drop-shadow(0 0 ${10 * on}px ${DL.sky})` : undefined }} /><path d="M6 92 L154 92 L144 106 L16 106 Z" fill="#444" /></svg>
);

// a big headline word that lands on its word (scale 1.2 → 1)
export const BigWord: React.FC<{ at: number; children: React.ReactNode; size?: number; color?: string; italic?: boolean; gradient?: boolean }> = ({ at, children, size = 120, color = DL.text, italic = false, gradient = false }) => {
  const f = useCurrentFrame();
  const g = gradient ? { background: QGRAD, WebkitBackgroundClip: 'text' as const, backgroundClip: 'text' as const, color: 'transparent' } : { color };
  return <span style={{ display: 'inline-block', fontFamily: DL_SERIF, fontWeight: 500, fontStyle: italic ? 'italic' : 'normal', fontSize: size, lineHeight: 1.05, opacity: ease(f, at - 1, at + 6), transform: `scale(${ease(f, at - 1, at + 8, 1.2, 1)})`, ...g }}>{children}</span>;
};

// a panel with a mono kicker
export const Panel: React.FC<{ kicker?: string; accent?: string; w?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ kicker, accent = DL.gold, w = 700, children, style }) => (
  <div style={{ width: w, boxSizing: 'border-box', padding: '26px 32px', background: '#0e0b0af0', border: `1px solid ${DL.border}`, borderLeft: `5px solid ${accent}`, borderRadius: 14, ...style }}>
    {kicker && <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.dim, marginBottom: 12 }}>{kicker}</div>}
    <div style={{ fontFamily: DL_SANS }}>{children}</div>
  </div>
);

// a 24-hour bar (left → right) with segments drawing in from `at`
export type BarSeg = { from: number; to: number; label: string; color: string; at: number };
export const DayBar: React.FC<{ title: string; segs: BarSeg[]; w?: number; at: number }> = ({ title, segs, w = 1200, at }) => {
  const f = useCurrentFrame();
  const x = (h: number) => (h / 24) * w;
  return (
    <div style={{ opacity: ease(f, at - 4, at + 6) }}>
      <div style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 4, color: DL.text, marginBottom: 12 }}>{title}</div>
      <div style={{ position: 'relative', width: w, height: 66, borderRadius: 10, background: DL.panel2, border: `1px solid ${DL.border}` }}>
        {segs.map((s, i) => {
          const g = ease(f, s.at, s.at + 12);
          return (
            <div key={i} style={{ position: 'absolute', left: x(s.from), top: 6, width: Math.max(0, (x(s.to) - x(s.from)) * g), height: 54, borderRadius: 8, background: s.color, opacity: 0.9, overflow: 'hidden', display: 'flex', alignItems: 'center', paddingLeft: 10, boxSizing: 'border-box' }}>
              <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 24, color: '#0e0b0a', whiteSpace: 'nowrap', opacity: ease(f, s.at + 6, s.at + 14) }}>{s.label}</span>
            </div>
          );
        })}
        {[0, 6, 12, 18, 24].map((h) => <div key={h} style={{ position: 'absolute', left: x(h) - 20, top: 72, width: 40, textAlign: 'center', fontFamily: DL_MONO, fontSize: 24, color: DL.muted }}>{String(h).padStart(2, '0')}</div>)}
      </div>
    </div>
  );
};

// "So what is school to you?" — a big gold "?" that holds the beat until the answer's first visual
export const AskMark: React.FC<{ at: number; out: number; left?: number; top?: number; size?: number; pulseAt?: number }> = ({ at, out, left = 760, top = 260, size = 420, pulseAt }) => {
  const f = useCurrentFrame();
  const op = ease(f, at - 2, at + 8) * (1 - ease(f, out - 6, out + 2));
  if (op <= 0.001) return null;
  const pulse = pulseAt === undefined ? 0 : ease(f, pulseAt, pulseAt + 5) * (1 - ease(f, pulseAt + 8, pulseAt + 24));
  return <div style={{ position: 'absolute', left, top, width: size, textAlign: 'center', fontFamily: DL_SERIF, fontSize: size, lineHeight: 1, color: DL.gold, opacity: 0.75 * op, transform: `scale(${ease(f, at - 2, at + 14, 0.85, 1) * (1 + 0.03 * Math.sin((f - at) / 8) + 0.12 * pulse)})`, textShadow: `0 0 40px ${DL.gold}55` }}>?</div>;
};

export { DL_EASE };
