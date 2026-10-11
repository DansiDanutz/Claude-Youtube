import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DYT, DYT_DISPLAY, DYT_GRADIENT, DytLogo } from '../../lib/dytbrand';

// =============================================================================
// DYK 02 · YouTube thumbnail (adapted from TcThumb) (one frame). 2560x1440 so stills-at.mjs (scale 0.5)
// writes exactly 1280x720. Channel-logo palette: deep navy, neon blue/purple on the
// left, green/orange on the right, the "?" gradient (orange → magenta) for the key
// words. One idea at phone size: one Sun, three centuries — spotted in 1500, 8 min 20 s old
// today, and a ringed "?" Sun for 2100. Bottom-right stays clear for YouTube's duration badge.
// =============================================================================
export const compositionConfig = { id: 'SuThumb', durationInSeconds: 1, fps: 30, width: 2560, height: 1440 };

const CLOCK = 500;   // column width; the clock face is CLOCK - 60
const COLS = [500, 1280, 2060];   // column centres: 1500 · today · 2100
const QMARK = `linear-gradient(90deg, #ffd23f, ${DYT.orange} 40%, ${DYT.magenta} 85%)`;

// sparkles in fixed positions (deterministic — no randomness in a render)
const SPARKS: [number, number, number, string][] = [
  [180, 520, 10, DYT.cyan], [420, 300, 7, DYT.white], [700, 1180, 9, DYT.magenta], [1180, 640, 6, DYT.white],
  [1380, 1260, 8, DYT.orange], [1900, 300, 9, DYT.green], [2250, 540, 7, DYT.white], [2380, 1050, 10, DYT.orange],
  [980, 1330, 6, DYT.cyan], [1620, 560, 6, DYT.magenta], [2080, 1300, 7, DYT.green], [320, 1000, 6, DYT.purple],
];

// A neon Sun in the logo palette. ring = rim/glow colour; badge = small overlay (clock / orbit ring / "?").
const NeonSun: React.FC<{ ring: string; glow: string; size: number; variant: 'past' | 'now' | 'future' }> = ({ ring, glow, size, variant }) => {
  const c = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible', filter: `drop-shadow(0 0 30px ${glow}) drop-shadow(0 0 80px ${glow}99)` }}>
      <defs>
        <radialGradient id={`ns-${variant}`} cx="42%" cy="40%" r="62%">
          <stop offset="0" stopColor="#fff3c4" /><stop offset="0.55" stopColor="#ffc94a" /><stop offset="1" stopColor={ring} />
        </radialGradient>
      </defs>
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <line key={i} x1={c + Math.sin(a) * (c - 10)} y1={c - Math.cos(a) * (c - 10)} x2={c + Math.sin(a) * (c + 26)} y2={c - Math.cos(a) * (c + 26)} stroke={ring} strokeWidth={12} strokeLinecap="round" />;
      })}
      <circle cx={c} cy={c} r={c - 40} fill={`url(#ns-${variant})`} />
      {variant === 'past' && [[0.38, 0.42, 22], [0.5, 0.5, 14], [0.6, 0.38, 16]].map(([x, y, r], i) => <circle key={i} cx={size * x} cy={size * y} r={r} fill="#5a2a08" />)}
      {variant === 'now' && (
        <g>
          <rect x={c - 150} y={c - 50} width={300} height={100} rx={18} fill={DYT.navy} stroke={DYT.white} strokeWidth={6} />
          <text x={c} y={c + 30} textAnchor="middle" fill={DYT.white} fontFamily="monospace" fontWeight={900} fontSize={78}>8:20</text>
        </g>
      )}
      {variant === 'future' && (
        <g>
          <ellipse cx={c} cy={c} rx={c + 40} ry={c * 0.36} fill="none" stroke={DYT.green} strokeWidth={10} strokeDasharray="22 16" />
          <text x={c} y={c + 64} textAnchor="middle" fill={DYT.navy} fontWeight={900} fontSize={190}>?</text>
        </g>
      )}
    </svg>
  );
};

const YearLabel: React.FC<{ text: string; color: string }> = ({ text, color }) => (
  <div style={{ marginTop: 30, fontWeight: 900, fontSize: 130, whiteSpace: 'nowrap', letterSpacing: '0.03em', color: DYT.white, textShadow: `0 0 18px ${color}, 0 0 50px ${color}, 0 8px 30px rgba(0,0,0,0.8)` }}>{text}</div>
);

const Column: React.FC<{ x: number; label: string; color: string; children: React.ReactNode }> = ({ x, label, color, children }) => (
  <div style={{ position: 'absolute', left: x - CLOCK / 2, top: 700, width: CLOCK, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {children}
    <YearLabel text={label} color={color} />
  </div>
);

// rainbow arrow in the logo gradient, 380 px long, carrying the eye left → right
const Arrow: React.FC<{ x: number }> = ({ x }) => (
  <svg style={{ position: 'absolute', left: x, top: 860, filter: `drop-shadow(0 0 16px ${DYT.magenta})` }} width={380} height={140} viewBox="0 0 380 140">
    <defs><linearGradient id={`rb${x}`} gradientUnits="userSpaceOnUse" x1="12" y1="0" x2="366" y2="0"><stop offset="0" stopColor={DYT.blue} /><stop offset="0.4" stopColor={DYT.purple} /><stop offset="0.7" stopColor={DYT.magenta} /><stop offset="1" stopColor={DYT.orange} /></linearGradient></defs>
    <path d="M12 70 H300" stroke={`url(#rb${x})`} strokeWidth={26} strokeLinecap="round" />
    <path d="M262 18 L366 70 L262 122" fill="none" stroke={DYT.orange} strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SuThumb: React.FC = () => (
  <AbsoluteFill style={{ background: DYT.bg, fontFamily: DYT_DISPLAY }}>
    {/* the logo's neon smoke: blue/purple left, green/orange right, a magenta core */}
    <AbsoluteFill style={{ background: [
      `radial-gradient(ellipse 30% 50% at 4% 70%, ${DYT.blue} 0%, ${DYT.blue}55 45%, transparent 75%)`,
      `radial-gradient(ellipse 30% 42% at 18% 102%, ${DYT.purple} 0%, ${DYT.purple}55 45%, transparent 75%)`,
      `radial-gradient(ellipse 22% 36% at 2% 28%, ${DYT.cyan}aa 0%, transparent 72%)`,
      `radial-gradient(ellipse 22% 30% at 30% 88%, ${DYT.magenta}88 0%, transparent 72%)`,
      `radial-gradient(ellipse 28% 46% at 98% 36%, ${DYT.green} 0%, ${DYT.green}44 45%, transparent 75%)`,
      `radial-gradient(ellipse 32% 44% at 94% 104%, ${DYT.orange} 0%, #ff4d2e66 45%, transparent 75%)`,
      `radial-gradient(ellipse 20% 26% at 78% 80%, #ffd23f55 0%, transparent 72%)`,
    ].join(', ') }} />
    {SPARKS.map(([x, y, r, col], i) => (
      <div key={i} style={{ position: 'absolute', left: x, top: y, width: r * 2, height: r * 2, borderRadius: '50%', background: col, boxShadow: `0 0 ${r * 3}px ${r}px ${col}` }} />
    ))}

    {/* headline: white like the banner wordmark, the key words in the "?" gradient */}
    <div style={{ position: 'absolute', top: 60, width: '100%', textAlign: 'center', lineHeight: 0.96 }}>
      <div style={{ fontWeight: 900, fontSize: 230, color: DYT.white, textShadow: `0 0 30px ${DYT.blue}cc, 0 10px 40px rgba(0,0,0,0.85)` }}>THE SUN</div>
      <div style={{ fontWeight: 900, fontSize: 260, background: QMARK, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', filter: `drop-shadow(0 0 26px ${DYT.magenta}aa) drop-shadow(0 10px 30px rgba(0,0,0,0.8))` }}>IN 2100?</div>
    </div>

    {/* 1500 (spots, blue/purple) → today (8:20, orange) → 2100 (orbit ring + ?, green) */}
    <Column x={COLS[0]} label="1500" color={DYT.purple}><NeonSun ring={DYT.cyan} glow={DYT.blue} size={CLOCK - 60} variant="past" /></Column>
    <Arrow x={COLS[0] + 250} />
    <Column x={COLS[1]} label="TODAY" color={DYT.orange}>
      <NeonSun ring={DYT.orange} glow={DYT.orange} size={CLOCK - 60} variant="now" />
    </Column>
    <Arrow x={COLS[1] + 200} />
    <Column x={COLS[2]} label="2100" color={DYT.green}><NeonSun ring={DYT.green} glow={DYT.green} size={CLOCK - 60} variant="future" /></Column>

    {/* channel mark, top-left, and a thin logo-gradient rule along the top */}
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 12, background: DYT_GRADIENT }} />
    <div style={{ position: 'absolute', left: 60, top: 64 }}><DytLogo size={170} /></div>
  </AbsoluteFill>
);
export default SuThumb;
