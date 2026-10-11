// "Did You Know That?" — the channel brand (YouTube @Did-You-Know-that-2026), separate from DansLab.
// Source of truth = the channel's own artwork: media/library/logos/dyk-avatar.jpg (neon question-mark
// bulb) and dyk-banner.jpg (heavy white "DID YOU KNOW THAT?", rainbow neon on deep navy, tagline
// "AMAZING FACTS • INCREDIBLE STORIES • ENDLESS CURIOSITY"). Tokens below are eyedropped from those.
import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, Easing } from 'remotion';
import { loadFont as loadMontserrat } from '@remotion/google-fonts/Montserrat';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

export const DYT_DISPLAY = loadMontserrat('normal', { weights: ['700', '800', '900'], subsets: ['latin'] }).fontFamily;
export const DYT_BODY = loadInter('normal', { weights: ['400', '600'], subsets: ['latin'] }).fontFamily;

export const DYT = {
  bg: '#060818', navy: '#0b1030', panel: '#111638', border: '#262c5c',
  white: '#ffffff', dim: '#b8bce0', muted: '#7d82ad',
  orange: '#ff9a1f', magenta: '#ff3db4', purple: '#8b5cf6', blue: '#3b82f6', cyan: '#22d3ee', green: '#34d058',
} as const;
export const DYT_TAGLINE = 'AMAZING FACTS • INCREDIBLE STORIES • ENDLESS CURIOSITY';
export const DYT_HANDLE = '@Did-You-Know-that-2026';
export const DYT_GRADIENT = `linear-gradient(90deg, ${DYT.blue}, ${DYT.purple}, ${DYT.magenta}, ${DYT.orange}, ${DYT.green})`;
const LOGO = 'library/logos/dyk-avatar.jpg';

const EASE_OUT = Easing.bezier(0.33, 1, 0.68, 1);
const POP = Easing.bezier(0.34, 1.56, 0.64, 1);
const CL = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };
const e = (f: number, a: number, b: number, from = 0, to = 1, ease = EASE_OUT) => interpolate(f, [a, b], [from, to], { ...CL, easing: ease });

const seeded = (n: number) => { const x = Math.sin(n * 9301 + 49297) * 233280; return x - Math.floor(x); };
const NEON = [DYT.orange, DYT.magenta, DYT.purple, DYT.blue, DYT.cyan, DYT.green];
const SPARKS = Array.from({ length: 22 }, (_, i) => ({ ang: (i / 22) * Math.PI * 2 + seeded(i) * 0.3, dist: 0.75 + seeded(i + 40) * 0.7, s: 4 + seeded(i + 80) * 7, c: NEON[i % NEON.length], d: Math.floor(seeded(i + 120) * 6) }));
const BLOBS = Array.from({ length: 6 }, (_, i) => ({ x: seeded(i + 7) * 1920, y: seeded(i + 17) * 1080, r: 420 + seeded(i + 27) * 360, c: NEON[(i * 2) % NEON.length], sp: 0.6 + seeded(i + 37) }));
const DUST = Array.from({ length: 70 }, (_, i) => ({ x: seeded(i + 200) * 1920, y: seeded(i + 300) * 1080, s: 1 + seeded(i + 400) * 2.4, c: NEON[i % NEON.length], ph: seeded(i + 500) * 6 }));

// Deep-navy nebula: drifting neon smoke + twinkling dust (the banner's atmosphere, in motion).
export const DytBg: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  const f = useCurrentFrame();
  return (
    <>
      <AbsoluteFill style={{ backgroundColor: DYT.bg }} />
      {BLOBS.map((b, i) => (
        <div key={i} style={{ position: 'absolute', left: b.x - b.r + Math.sin(f / (90 * b.sp) + i) * 90, top: b.y - b.r + Math.cos(f / (110 * b.sp) + i) * 60, width: b.r * 2, height: b.r * 2, borderRadius: '50%', background: `radial-gradient(circle, ${b.c}2e, transparent 65%)`, opacity: 0.55 * intensity }} />
      ))}
      {DUST.map((d, i) => (
        <div key={i} style={{ position: 'absolute', left: d.x + Math.sin(f / 80 + d.ph) * 14, top: d.y - ((f * 0.25 * (1 + d.s / 3)) % 1080) + (d.y > 540 ? 0 : 0), width: d.s, height: d.s, borderRadius: '50%', background: d.c, opacity: (0.35 + 0.35 * Math.sin(f / 12 + d.ph)) * intensity }} />
      ))}
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, #000000b8 100%)' }} />
    </>
  );
};

// The real logo with the signature "bulb switches on" moment: dark → flicker → full glow,
// a conic neon ring spins in, sparks burst. start = first frame; settles ~start+40.
export const DytLogoAnimated: React.FC<{ size?: number; start?: number }> = ({ size = 320, start = 0 }) => {
  const f = useCurrentFrame();
  const t = f - start;
  const pop = e(t, 0, 14, 0.55, 1, POP);
  // deterministic flicker: off · on · off · ON
  const flick = t < 10 ? 0.18 : t < 13 ? 1 : t < 16 ? 0.3 : t < 19 ? 1.1 : t < 22 ? 0.6 : 1;
  const glow = e(t, 18, 34, 0, 1);
  const breathe = t > 34 ? 0.85 + 0.15 * Math.sin((t - 34) / 14) : glow;
  const ring = e(t, 16, 40, 0, 1);
  const sparkT = e(t, 19, 46, 0, 1);
  return (
    <div style={{ position: 'relative', width: size, height: size, transform: `scale(${pop})`, opacity: e(t, 0, 4) }}>
      <div style={{ position: 'absolute', inset: -size * 0.09, borderRadius: '50%', background: `conic-gradient(from ${t * 3}deg, ${DYT.orange}, ${DYT.magenta}, ${DYT.purple}, ${DYT.blue}, ${DYT.cyan}, ${DYT.green}, ${DYT.orange})`, opacity: ring, filter: `blur(${2 + 14 * (1 - ring)}px)` }} />
      <div style={{ position: 'absolute', inset: -size * 0.06, borderRadius: '50%', background: DYT.bg }} />
      <div style={{ position: 'absolute', inset: -size * 0.35, borderRadius: '50%', background: `radial-gradient(circle, ${DYT.orange}55, ${DYT.magenta}22 45%, transparent 70%)`, opacity: breathe }} />
      {SPARKS.map((p, i) => {
        const pt = Math.max(0, sparkT - p.d / 40);
        const d = size * 0.5 * (0.9 + pt * p.dist);
        const op = pt <= 0 ? 0 : interpolate(pt, [0, 0.2, 1], [0, 1, 0], CL);
        return <div key={i} style={{ position: 'absolute', left: size / 2 - p.s / 2, top: size / 2 - p.s / 2, width: p.s, height: p.s, borderRadius: '50%', background: p.c, boxShadow: `0 0 ${p.s * 3}px ${p.c}`, opacity: op, transform: `translate(${Math.cos(p.ang) * d}px, ${Math.sin(p.ang) * d}px)` }} />;
      })}
      <Img src={staticFile(LOGO)} style={{ position: 'absolute', inset: 0, width: size, height: size, borderRadius: '50%', filter: `brightness(${flick}) saturate(${0.6 + 0.4 * Math.min(1, flick)})` }} />
    </div>
  );
};

// Static logo chip (HUD, end screen).
export const DytLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <Img src={staticFile(LOGO)} style={{ width: size, height: size, borderRadius: '50%', boxShadow: `0 0 ${size / 3}px ${DYT.magenta}66` }} />
);

// Heavy white two-line wordmark with rainbow glow; words slam in from `at`, 6 frames apart.
export const DytWordmark: React.FC<{ at: number; size?: number; align?: 'left' | 'center' }> = ({ at, size = 150, align = 'left' }) => {
  const f = useCurrentFrame();
  const words = [['DID', 'YOU'], ['KNOW', 'THAT?']];
  let k = 0;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: align === 'left' ? 'flex-start' : 'center', fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: size, lineHeight: 0.98, letterSpacing: -2, color: DYT.white, textShadow: `0 0 18px ${DYT.magenta}aa, 0 0 42px ${DYT.blue}77, 0 6px 0 #00000066` }}>
      {words.map((line, li) => (
        <div key={li} style={{ display: 'flex', gap: size * 0.28 }}>
          {line.map((w) => {
            const a = at + (k++) * 6;
            const s = interpolate(f, [a, a + 7], [1.5, 1], { ...CL, easing: EASE_OUT });
            return <span key={w} style={{ display: 'inline-block', opacity: e(f, a, a + 4), transform: `scale(${s})` }}>{w}</span>;
          })}
        </div>
      ))}
    </div>
  );
};

// The signature channel sting — identical in every episode (visual + sonic mnemonic, ~4.5 s).
// 0 bulb flickers on · 1.3 s logo slides left as the wordmark slams in word by word · 2.6 s
// tagline sweeps in under a rainbow rule · holds. Sound: build_final cue group "sting".
export const STING_FRAMES = 135;
export const DytSting: React.FC = () => {
  const f = useCurrentFrame();
  const slide = e(f, 36, 54, 0, 1, Easing.bezier(0.65, 0, 0.35, 1));
  const rule = e(f, 76, 98, 0, 1);
  const tag = e(f, 84, 102);
  return (
    <AbsoluteFill>
      <DytBg intensity={e(f, 0, 30, 0.4, 1)} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 70 * slide, transform: `translateX(${(1 - slide) * 0}px)` }}>
          <DytLogoAnimated size={interpolate(slide, [0, 1], [380, 300])} start={4} />
          <div style={{ width: 860 * slide, overflow: 'visible', opacity: slide > 0.05 ? 1 : 0 }}>
            <DytWordmark at={46} size={142} />
          </div>
        </div>
        <div style={{ marginTop: 56, width: 1180 * rule, height: 5, borderRadius: 4, background: DYT_GRADIENT, boxShadow: `0 0 20px ${DYT.magenta}88` }} />
        <div style={{ marginTop: 26, opacity: tag, transform: `translateY(${(1 - tag) * 14}px)`, fontFamily: DYT_DISPLAY, fontWeight: 700, fontSize: 30, letterSpacing: 6, color: DYT.dim }}>{DYT_TAGLINE}</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
