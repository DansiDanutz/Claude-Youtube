// DansLab site design system — per-video art direction for the shots/danslab/
// project, extracted from the LIVE danslab.vercel.app (2026-07-21): black
// editorial base, red/coral accent, gold italic serif, terminal aesthetic.
// This deliberately does NOT touch the channel brand (brand.ts) — it is the
// look of one video about the DansLab product, not the channel look.
import React from 'react';
import { AbsoluteFill, Img, interpolate, useCurrentFrame, Easing } from 'remotion';
import { loadFont as loadNewsreader } from '@remotion/google-fonts/Newsreader';
import { loadFont as loadInterDl } from '@remotion/google-fonts/Inter';
import { loadFont as loadMonoDl } from '@remotion/google-fonts/JetBrainsMono';

export const DL_SERIF = loadNewsreader('normal', { weights: ['400', '500', '600'], subsets: ['latin'] }).fontFamily;
loadNewsreader('italic', { weights: ['400', '500'], subsets: ['latin'] });
export const DL_SANS = loadInterDl('normal', { weights: ['400', '500', '600'], subsets: ['latin'] }).fontFamily;
export const DL_MONO = loadMonoDl('normal', { weights: ['400', '500', '700'], subsets: ['latin'] }).fontFamily;

export const DL = {
  bg: '#050404', panel: '#0e0b0a', panel2: '#141010', border: '#2a2220',
  text: '#fafafa', dim: '#a1a1aa', muted: '#71717a', faint: '#55555e', warm: '#b9b1a4',
  red: '#e74c3c', redDeep: '#c0392b', gold: '#d4a017',
  green: '#22c55e', sky: '#38bdf8',
} as const;

export const DL_EASE = {
  out: Easing.bezier(0.33, 1, 0.68, 1),
  inOut: Easing.bezier(0.37, 0, 0.63, 1),
  in: Easing.bezier(0.32, 0, 0.67, 0),
} as const;

export const DCLAMP = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

// pre-generated star specks (module level — deterministic, no per-frame recompute)
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};
const STARS = Array.from({ length: 70 }, (_, i) => ({
  x: seededRandom(i * 3 + 1) * 1920,
  y: seededRandom(i * 7 + 2) * 1080,
  s: 1 + seededRandom(i * 11 + 3) * 2.2,
  o: 0.12 + seededRandom(i * 13 + 5) * 0.4,
  warm: seededRandom(i * 17 + 7) > 0.8,
}));

// Site backdrop: near-black + faint red glow + star specks + dotted grid
export const SiteBg: React.FC<{ glow?: string }> = ({ glow = DL.red }) => (
  <>
    <AbsoluteFill style={{ backgroundColor: DL.bg }} />
    <AbsoluteFill style={{ background: `radial-gradient(1200px 640px at 50% -10%, ${glow}14, transparent 60%)` }} />
    <AbsoluteFill style={{ backgroundImage: `radial-gradient(#ffffff08 1px, transparent 1px)`, backgroundSize: '44px 44px' }} />
    <AbsoluteFill>
      {STARS.map((st, i) => (
        <div key={i} style={{ position: 'absolute', left: st.x, top: st.y, width: st.s, height: st.s, borderRadius: '50%', background: st.warm ? DL.gold : '#ffffff', opacity: st.o }} />
      ))}
    </AbsoluteFill>
  </>
);

// "§ 0X  LABEL // SUB" kicker row, site-style
export const Kicker: React.FC<{ n: string; label: string; start?: number }> = ({ n, label, start = 4 }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [start, start + 12], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ position: 'absolute', top: 74, left: 120, right: 120, display: 'flex', alignItems: 'center', gap: 26, opacity: op }}>
      <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.red }}>§ {n}</span>
      <div style={{ flex: 1, height: 1, background: DL.border }} />
      <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DL.muted }}>{label}</span>
    </div>
  );
};

// rise-in helper on the site's easing
export const useDlRise = () => {
  const frame = useCurrentFrame();
  return (start: number, dist = 26, dur = 15) => ({
    opacity: interpolate(frame, [start, start + dur], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(frame, [start, start + dur], [dist, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
};

// Browser window frame around a full-bleed screenshot (site-style dark chrome).
// Screenshot should be a 1920x1080 capture; scales to fit the given box.
export const SiteFrame: React.FC<{ src: string; url: string; w?: number; h?: number }> = ({ src, url, w = 1480, h = 880 }) => (
  <div style={{ width: w, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.55)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', borderBottom: `1px solid ${DL.border}` }}>
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: DL.red }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: DL.gold }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: DL.green }} />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: DL.bg, border: `1px solid ${DL.border}`, borderRadius: 8, padding: '6px 26px', fontFamily: DL_MONO, fontSize: 19, color: DL.dim }}>{url}</div>
      </div>
      <div style={{ width: 40 }} />
    </div>
    <Img src={src} style={{ width: '100%', height: h - 50, objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
  </div>
);

// Animated phone mockup. A realistic device frame (titanium edge, dynamic
// island, side buttons) around a portrait screen. Floats + tilts continuously
// for life; rises + settles on entrance. Pass a screenshot `src` OR `children`
// as the screen content (children render behind the notch/status bar).
//   h = screen height in px; width derives from a 9:19.5 aspect ratio.
export const Phone: React.FC<{
  src?: string;
  children?: React.ReactNode;
  h?: number;
  start?: number;
  statusTime?: string;
  tilt?: number;
}> = ({ src, children, h = 820, start = 0, statusTime = '3:12', tilt = -5 }) => {
  const frame = useCurrentFrame();
  const t = frame - start;
  const screenW = h * (9 / 19.5);
  const bezel = h * 0.018;
  const radius = h * 0.06;
  // entrance
  const inOp = interpolate(t, [0, 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const inY = interpolate(t, [0, 20], [46, 0], { ...DCLAMP, easing: DL_EASE.out });
  const inScale = interpolate(t, [0, 22], [0.92, 1], { ...DCLAMP, easing: DL_EASE.out });
  // idle float + tilt (starts once settled)
  const floatY = Math.sin(t / 42) * 8;
  const tiltNow = tilt + Math.sin(t / 55) * 1.4;

  return (
    <div style={{ opacity: inOp, transform: `translateY(${inY + floatY}px) scale(${inScale}) rotate(${tiltNow}deg)`, transformOrigin: 'center', filter: `drop-shadow(0 40px 80px rgba(0,0,0,0.6))` }}>
      {/* device body */}
      <div style={{ position: 'relative', width: screenW + bezel * 2, height: h + bezel * 2, borderRadius: radius + bezel, background: 'linear-gradient(145deg, #2a2725, #0e0c0b 55%, #201d1b)', padding: bezel, boxShadow: `inset 0 0 0 1.5px #48423d, inset 0 0 ${bezel}px rgba(255,255,255,0.06)` }}>
        {/* side buttons */}
        <div style={{ position: 'absolute', left: -3, top: h * 0.20, width: 3, height: h * 0.05, borderRadius: 2, background: '#3a3531' }} />
        <div style={{ position: 'absolute', left: -3, top: h * 0.29, width: 3, height: h * 0.08, borderRadius: 2, background: '#3a3531' }} />
        <div style={{ position: 'absolute', left: -3, top: h * 0.40, width: 3, height: h * 0.08, borderRadius: 2, background: '#3a3531' }} />
        <div style={{ position: 'absolute', right: -3, top: h * 0.26, width: 3, height: h * 0.11, borderRadius: 2, background: '#3a3531' }} />
        {/* screen */}
        <div style={{ position: 'relative', width: screenW, height: h, borderRadius: radius, overflow: 'hidden', background: DL.bg }}>
          {src ? <Img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} /> : children}
          {/* status bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: h * 0.052, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${screenW * 0.09}px`, zIndex: 5, pointerEvents: 'none' }}>
            <span style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: h * 0.021, color: '#fff' }}>{statusTime}</span>
            <div style={{ display: 'flex', gap: h * 0.008, alignItems: 'center' }}>
              <div style={{ width: h * 0.02, height: h * 0.012, borderRadius: 2, background: '#fff' }} />
              <div style={{ width: h * 0.022, height: h * 0.012, borderRadius: 2, border: '1.5px solid #fff', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 1.5, background: DL.green, borderRadius: 1 }} />
              </div>
            </div>
          </div>
          {/* dynamic island */}
          <div style={{ position: 'absolute', top: h * 0.014, left: '50%', transform: 'translateX(-50%)', width: screenW * 0.30, height: h * 0.034, borderRadius: 999, background: '#000', zIndex: 6 }} />
          {/* screen glare */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.08), transparent 40%)', zIndex: 4, pointerEvents: 'none' }} />
        </div>
      </div>
    </div>
  );
};

// The DansLab logo mark — red lab tile, serif D, gold terminal cursor.
// size = tile edge in px. Same geometry as media/library/logos/danslab-mark.svg.
export const DlLogo: React.FC<{ size?: number }> = ({ size = 120 }) => {
  const s = size / 512; // author at 512, scale down
  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 104 * s, background: `linear-gradient(135deg, ${DL.red}, ${DL.redDeep})`, border: `${Math.max(1, 5 * s)}px solid #ffffff24` }} />
      <span style={{ position: 'absolute', left: '46%', top: '47%', transform: 'translate(-50%,-50%)', fontFamily: DL_SERIF, fontWeight: 600, fontSize: 300 * s, lineHeight: 1, color: '#fffef7' }}>D</span>
      <div style={{ position: 'absolute', left: 352 * s, top: 308 * s, width: 52 * s, height: 76 * s, borderRadius: 10 * s, background: DL.gold }} />
    </div>
  );
};

// pre-generated logo particles (deterministic)
const LOGO_SPARKS = Array.from({ length: 14 }, (_, i) => ({
  ang: (i / 14) * Math.PI * 2,
  dist: 0.72 + seededRandom(i * 5 + 11) * 0.55,
  s: 3 + seededRandom(i * 9 + 4) * 5,
  delay: Math.floor(seededRandom(i * 13 + 6) * 8),
  gold: seededRandom(i * 3 + 2) > 0.45,
}));

// Animated DansLab logo: tile pops with gentle overshoot, D fades up, gold
// cursor blinks, a shine sweeps the tile, a ring pulse + particles burst.
// start = frame the animation begins. ~55 frames to fully settle.
export const DlLogoAnimated: React.FC<{ size?: number; start?: number }> = ({ size = 200, start = 0 }) => {
  const frame = useCurrentFrame();
  const t = frame - start;
  const s = size / 512;
  const pop = interpolate(t, [0, 16], [0, 1], { ...DCLAMP, easing: Easing.bezier(0.34, 1.42, 0.64, 1) });
  const tileRot = interpolate(t, [0, 16], [-10, 0], { ...DCLAMP, easing: DL_EASE.out });
  const dOp = interpolate(t, [10, 24], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const dY = interpolate(t, [10, 24], [18 * s * 3, 0], { ...DCLAMP, easing: DL_EASE.out });
  const cursorOn = t > 22 && Math.floor((t - 22) / 14) % 2 === 0;
  const shineX = interpolate(t, [26, 46], [-0.6, 1.4], { ...DCLAMP, easing: DL_EASE.inOut });
  const shineOp = interpolate(t, [26, 30, 42, 46], [0, 0.5, 0.5, 0], DCLAMP);
  const ring = interpolate(t, [14, 40], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const ringOp = interpolate(t, [14, 20, 40], [0, 0.55, 0], DCLAMP);
  const sparkT = interpolate(t, [16, 44], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      {/* ring pulse */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', width: size * (1 + ring * 0.9), height: size * (1 + ring * 0.9), transform: 'translate(-50%,-50%)', borderRadius: '32%', border: `${Math.max(1.5, 3 * s * 2)}px solid ${DL.red}`, opacity: ringOp }} />
      {/* particles */}
      {LOGO_SPARKS.map((p, i) => {
        const pt = Math.max(0, sparkT - p.delay / 60);
        const d = size * 0.5 * (0.6 + pt * p.dist);
        const op = pt <= 0 ? 0 : interpolate(pt, [0, 0.25, 1], [0, 0.9, 0], DCLAMP);
        return (
          <div key={i} style={{ position: 'absolute', left: '50%', top: '50%', width: p.s * s * 3.4, height: p.s * s * 3.4, borderRadius: '50%', background: p.gold ? DL.gold : DL.red, opacity: op, transform: `translate(${Math.cos(p.ang) * d}px, ${Math.sin(p.ang) * d}px)` }} />
        );
      })}
      {/* tile */}
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${pop}) rotate(${tileRot}deg)` }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 104 * s, background: `linear-gradient(135deg, ${DL.red}, ${DL.redDeep})`, border: `${Math.max(1, 5 * s)}px solid #ffffff24`, overflow: 'hidden' }}>
          {/* shine sweep */}
          <div style={{ position: 'absolute', top: '-20%', bottom: '-20%', left: `${shineX * 100}%`, width: '34%', background: 'linear-gradient(105deg, transparent, #ffffff88, transparent)', opacity: shineOp, transform: 'rotate(8deg)' }} />
        </div>
        <span style={{ position: 'absolute', left: '46%', top: '47%', transform: `translate(-50%,-50%) translateY(${dY}px)`, opacity: dOp, fontFamily: DL_SERIF, fontWeight: 600, fontSize: 300 * s, lineHeight: 1, color: '#fffef7' }}>D</span>
        <div style={{ position: 'absolute', left: 352 * s, top: 308 * s, width: 52 * s, height: 76 * s, borderRadius: 10 * s, background: DL.gold, opacity: t <= 22 ? dOp : (cursorOn ? 1 : 0.25) }} />
      </div>
    </div>
  );
};

// Chapter bumper: animated logo + "PART N · TITLE" — 8s scene body shared by
// the DoBumper* shots.
export const DlBumper: React.FC<{ part: string; title: string }> = ({ part, title }) => {
  const frame = useCurrentFrame();
  const lineW = interpolate(frame, [34, 58], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const partOp = interpolate(frame, [40, 54], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const titleOp = interpolate(frame, [58, 74], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const titleY = interpolate(frame, [58, 74], [16, 0], { ...DCLAMP, easing: DL_EASE.out });
  const fade = interpolate(frame, [206, 236], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <SiteBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <DlLogoAnimated size={170} start={4} />
        <div style={{ marginTop: 40, height: 4, width: 380, borderRadius: 999, background: '#ffffff10', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '100%', background: `linear-gradient(90deg, ${DL.red}, ${DL.gold})`, transform: `scaleX(${lineW})`, transformOrigin: 'center' }} />
        </div>
        <div style={{ opacity: partOp, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 8, color: DL.red, marginTop: 36 }}>{part}</div>
        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, fontFamily: DL_SERIF, fontWeight: 500, fontSize: 84, color: DL.text, marginTop: 14 }}>{title}</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// The DansLab wordmark: "Dans" white + "Lab" red, serif, with mono suffix
export const DlWordmark: React.FC<{ size?: number; suffix?: string }> = ({ size = 44, suffix }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
    <span style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: size, color: DL.text }}>
      Dans<span style={{ color: DL.red }}>Lab</span>
    </span>
    {suffix && <span style={{ fontFamily: DL_MONO, fontSize: size * 0.42, color: DL.faint }}>{suffix}</span>}
  </div>
);
