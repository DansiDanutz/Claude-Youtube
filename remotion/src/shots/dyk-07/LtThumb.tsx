import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DYT, DYT_DISPLAY, DYT_GRADIENT, DytLogo } from '../../lib/dytbrand';
import { LightProp, NightSky, FLAME } from '../../lib/dykkit-light';

// =============================================================================
// DYK 07 · YouTube thumbnail (adapted from MeThumb) (one frame). 2560x1440 so stills-at.mjs (scale 0.5) writes exactly
// 1280x720. Channel-logo palette: deep navy, neon blue/purple on the left, green/orange on the right, the "?" gradient
// (orange → magenta) on the question mark. One idea at phone size, ≤ 4 words: LOST THE NIGHT? — the night we switched
// off: TODAY (a streetlight under an orange skyglow, almost no stars) → 2100 (a dark sky, the Milky Way back, a
// telescope and a "?": will we keep the dark?). Bottom-right stays clear for YouTube's duration badge.
// Only ONE NightSky on the page (its gradient id is fixed), so TODAY's glowing sky is drawn here.
// =============================================================================
export const compositionConfig = { id: 'LtThumb', durationInSeconds: 1, fps: 30, width: 2560, height: 1440 };

const ICON = 480;   // ring size
const SKY = ICON - 88;   // the sky disc inside the ring
const COLS = [720, 1840];   // column centres: TODAY · 2100
const QMARK = `linear-gradient(90deg, #ffd23f, ${DYT.orange} 40%, ${DYT.magenta} 85%)`;

// sparkles in fixed positions (deterministic — no randomness in a render)
const SPARKS: [number, number, number, string][] = [
  [180, 520, 10, DYT.cyan], [420, 300, 7, DYT.white], [700, 1240, 9, DYT.magenta], [1240, 640, 6, DYT.white],
  [1380, 1260, 8, DYT.orange], [1900, 260, 9, DYT.green], [2250, 560, 7, DYT.white], [2420, 900, 10, DYT.orange],
  [980, 1330, 6, DYT.cyan], [1560, 600, 6, DYT.magenta], [2120, 1180, 7, DYT.green], [320, 1000, 6, DYT.purple],
];
// TODAY's last few stars, washed out by the glow
const FAINT: [number, number][] = [[90, 80], [270, 60], [320, 140], [150, 170]];

const NeonRing: React.FC<{ ring: string; glow: string; size: number; future?: boolean; children?: React.ReactNode }> = ({ ring, glow, size, future = false, children }) => {
  const c = size / 2;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', inset: 0, overflow: 'visible', filter: `drop-shadow(0 0 30px ${glow}) drop-shadow(0 0 80px ${glow}99)` }}>
        <circle cx={c} cy={c} r={c - 30} fill={`${ring}22`} stroke={ring} strokeWidth={14} />
        {future && <ellipse cx={c} cy={c} rx={c + 30} ry={c * 0.34} fill="none" stroke={DYT.cyan} strokeWidth={8} strokeDasharray="22 16" />}
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>
    </div>
  );
};

// a round window of sky inside the ring
const SkyDisc: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'relative', width: SKY, height: SKY, borderRadius: '50%', overflow: 'hidden', background: '#04060f' }}>{children}</div>
);

const YearLabel: React.FC<{ text: string; color: string }> = ({ text, color }) => (
  <div style={{ marginTop: 30, fontWeight: 900, fontSize: 140, whiteSpace: 'nowrap', letterSpacing: '0.03em', color: DYT.white, textShadow: `0 0 18px ${color}, 0 0 50px ${color}, 0 8px 30px rgba(0,0,0,0.8)` }}>{text}</div>
);

const Column: React.FC<{ x: number; label: string; color: string; children: React.ReactNode }> = ({ x, label, color, children }) => (
  <div style={{ position: 'absolute', left: x - ICON / 2, top: 600, width: ICON, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {children}
    <YearLabel text={label} color={color} />
  </div>
);

// rainbow arrow in the logo gradient, carrying the eye left → right
const Arrow: React.FC<{ x: number }> = ({ x }) => (
  <svg style={{ position: 'absolute', left: x, top: 770, filter: `drop-shadow(0 0 16px ${DYT.magenta})` }} width={460} height={140} viewBox="0 0 460 140">
    <defs><linearGradient id="rbLt" gradientUnits="userSpaceOnUse" x1="12" y1="0" x2="446" y2="0"><stop offset="0" stopColor={DYT.blue} /><stop offset="0.4" stopColor={DYT.purple} /><stop offset="0.7" stopColor={DYT.magenta} /><stop offset="1" stopColor={DYT.orange} /></linearGradient></defs>
    <path d="M12 70 H380" stroke="url(#rbLt)" strokeWidth={26} strokeLinecap="round" />
    <path d="M342 18 L446 70 L342 122" fill="none" stroke={DYT.orange} strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LtThumb: React.FC = () => (
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

    {/* headline: white like the banner wordmark, the "?" in the gradient */}
    <div style={{ position: 'absolute', top: 230, width: '100%', textAlign: 'center', lineHeight: 0.96, whiteSpace: 'nowrap' }}>
      <span style={{ fontWeight: 900, fontSize: 230, color: DYT.white, textShadow: `0 0 30px ${DYT.blue}cc, 0 10px 40px rgba(0,0,0,0.85)` }}>LOST THE NIGHT</span>
      <span style={{ fontWeight: 900, fontSize: 260, background: QMARK, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', filter: `drop-shadow(0 0 26px ${DYT.magenta}aa) drop-shadow(0 10px 30px rgba(0,0,0,0.8))` }}>?</span>
    </div>

    {/* TODAY (a streetlight under an orange skyglow, blue ring) → 2100 (the Milky Way back, a telescope, green ring) */}
    <Column x={COLS[0]} label="TODAY" color={DYT.purple}>
      <NeonRing ring={DYT.cyan} glow={DYT.blue} size={ICON}>
        <SkyDisc>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 90% 70% at 50% 100%, #ff8a2acc 0%, #ff8a2a55 45%, transparent 80%)' }} />
          {FAINT.map(([x, y], i) => <div key={i} style={{ position: 'absolute', left: x, top: y, width: 6, height: 6, borderRadius: '50%', background: '#ffffff88' }} />)}
          <div style={{ position: 'absolute', left: 70, top: 70, filter: `drop-shadow(0 0 30px ${FLAME})` }}><LightProp kind="streetlight" size={300} /></div>
        </SkyDisc>
      </NeonRing>
    </Column>
    <Arrow x={COLS[0] + 290} />
    <Column x={COLS[1]} label="2100" color={DYT.green}>
      <NeonRing ring={DYT.green} glow={DYT.green} size={ICON} future>
        <SkyDisc>
          <NightSky stars={1} milky={1} width={SKY} height={SKY} />
          <div style={{ position: 'absolute', left: 40, top: 170 }}><LightProp kind="telescope" size={200} /></div>
          <div style={{ position: 'absolute', left: 230, top: 60, fontWeight: 900, fontSize: 200, lineHeight: 1, background: QMARK, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>?</div>
        </SkyDisc>
      </NeonRing>
    </Column>

    {/* channel mark, top-left, and a thin logo-gradient rule along the top */}
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 12, background: DYT_GRADIENT }} />
    <div style={{ position: 'absolute', left: 60, top: 64 }}><DytLogo size={170} /></div>
  </AbsoluteFill>
);
export default LtThumb;
