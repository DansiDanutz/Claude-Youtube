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

// The DansLab wordmark: "Dans" white + "Lab" red, serif, with mono suffix
export const DlWordmark: React.FC<{ size?: number; suffix?: string }> = ({ size = 44, suffix }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
    <span style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: size, color: DL.text }}>
      Dans<span style={{ color: DL.red }}>Lab</span>
    </span>
    {suffix && <span style={{ fontFamily: DL_MONO, fontSize: size * 0.42, color: DL.faint }}>{suffix}</span>}
  </div>
);
