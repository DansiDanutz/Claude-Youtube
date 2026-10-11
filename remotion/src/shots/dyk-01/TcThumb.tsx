import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DYT, DYT_DISPLAY, DYT_GRADIENT, DytLogo } from '../../lib/dytbrand';

// =============================================================================
// DYK 01 · YouTube thumbnail (one frame). 2560x1440 so stills-at.mjs (scale 0.5)
// writes exactly 1280x720. Channel-logo palette: deep navy, neon blue/purple on the
// left, green/orange on the right, the "?" gradient (orange → magenta) for the key
// words. One idea at phone size: the same clock, round in 1500, squeezed to a sliver
// today, and a handless "?" clock for 2100. Bottom-right stays clear for YouTube's duration badge.
// =============================================================================
export const compositionConfig = { id: 'TcThumb', durationInSeconds: 1, fps: 30, width: 2560, height: 1440 };

const CLOCK = 500;   // column width; the clock face is CLOCK - 60
const COLS = [500, 1280, 2060];   // column centres: 1500 · today · 2100
const SQUEEZED = 0.2;
const QMARK = `linear-gradient(90deg, #ffd23f, ${DYT.orange} 40%, ${DYT.magenta} 85%)`;

// sparkles in fixed positions (deterministic — no randomness in a render)
const SPARKS: [number, number, number, string][] = [
  [180, 520, 10, DYT.cyan], [420, 300, 7, DYT.white], [700, 1180, 9, DYT.magenta], [1180, 640, 6, DYT.white],
  [1380, 1260, 8, DYT.orange], [1900, 300, 9, DYT.green], [2250, 540, 7, DYT.white], [2380, 1050, 10, DYT.orange],
  [980, 1330, 6, DYT.cyan], [1620, 560, 6, DYT.magenta], [2080, 1300, 7, DYT.green], [320, 1000, 6, DYT.purple],
];

const NeonClock: React.FC<{ ring: string; glow: string; size: number; mystery?: boolean }> = ({ ring, glow, size, mystery = false }) => {
  const c = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ filter: `drop-shadow(0 0 28px ${glow}) drop-shadow(0 0 70px ${glow}99)` }}>
      <circle cx={c} cy={c} r={c - 14} fill={DYT.navy} stroke={ring} strokeWidth={18} strokeDasharray={mystery ? '46 22' : undefined} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const r1 = c - 44, r2 = c - (i % 3 === 0 ? 92 : 70);
        return <line key={i} x1={c + Math.sin(a) * r1} y1={c - Math.cos(a) * r1} x2={c + Math.sin(a) * r2} y2={c - Math.cos(a) * r2} stroke={DYT.white} strokeWidth={i % 3 === 0 ? 14 : 7} strokeLinecap="round" />;
      })}
      {mystery ? (
        // the future has no hands yet: a glowing "?" in the logo gradient
        <text x={c} y={c + size * 0.17} textAnchor="middle" fontFamily={DYT_DISPLAY} fontWeight={900} fontSize={size * 0.5} fill="url(#qm)" style={{ filter: `drop-shadow(0 0 18px ${DYT.magenta})` }}>?</text>
      ) : (
        <>
          <line x1={c} y1={c} x2={c - c * 0.42} y2={c - c * 0.24} stroke={DYT.white} strokeWidth={22} strokeLinecap="round" />
          <line x1={c} y1={c} x2={c} y2={c - c * 0.66} stroke={DYT.magenta} strokeWidth={14} strokeLinecap="round" />
          <circle cx={c} cy={c} r={22} fill={DYT.orange} />
        </>
      )}
      <defs><linearGradient id="qm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffd23f" /><stop offset="0.45" stopColor={DYT.orange} /><stop offset="1" stopColor={DYT.magenta} /></linearGradient></defs>
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

const TcThumb: React.FC = () => (
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
      <div style={{ fontWeight: 900, fontSize: 230, color: DYT.white, textShadow: `0 0 30px ${DYT.blue}cc, 0 10px 40px rgba(0,0,0,0.85)` }}>WHERE DID</div>
      <div style={{ fontWeight: 900, fontSize: 260, background: QMARK, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', filter: `drop-shadow(0 0 26px ${DYT.magenta}aa) drop-shadow(0 10px 30px rgba(0,0,0,0.8))` }}>TIME GO?</div>
    </div>

    {/* 1500 (round, blue/purple) → today (squeezed, orange) → 2100 (no hands yet, green/magenta) */}
    <Column x={COLS[0]} label="1500" color={DYT.purple}><NeonClock ring={DYT.cyan} glow={DYT.blue} size={CLOCK - 60} /></Column>
    <Arrow x={COLS[0] + 250} />
    <Column x={COLS[1]} label="TODAY" color={DYT.orange}>
      <div style={{ transform: `scaleX(${SQUEEZED})` }}><NeonClock ring={DYT.orange} glow={DYT.orange} size={CLOCK - 60} /></div>
    </Column>
    <Arrow x={COLS[1] + 130} />
    <Column x={COLS[2]} label="2100 ?" color={DYT.green}><NeonClock ring={DYT.green} glow={DYT.green} size={CLOCK - 60} mystery /></Column>

    {/* channel mark, top-left, and a thin logo-gradient rule along the top */}
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 12, background: DYT_GRADIENT }} />
    <div style={{ position: 'absolute', left: 60, top: 64 }}><DytLogo size={170} /></div>
  </AbsoluteFill>
);
export default TcThumb;
