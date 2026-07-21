// Video brand tokens (see /brand.md). Import these in every shot
// so all videos stay consistent; change a value here and every shot updates.
//
// DansLab brand — a light, premium "builder's lab" look: forest-green accent,
// gold secondary, emerald success. Set by /brand-setup on 2026-07-21; brand.md
// and fonts.ts were rewritten in the same pass. Keep all three in sync.
import { Easing } from 'remotion';

// Channel identity. Any shot that puts your name on screen reads it from here,
// so one edit re-brands every video you have ever made in this repo.
export const BRAND = {
  // The wordmark, split in three so the MIDDLE part renders in the accent color.
  // ['Dans','Lab',''] renders "Lab" in the DansLab green.
  wordmark: ['Dans', 'Lab', ''] as readonly string[],
  signoff: 'Build. Ship. Repeat.',
} as const;

export const COLORS = {
  // roles
  accent: '#15803d', // forest green — primary (key words, CTAs, wordmark middle)
  accent2: '#a16207', // deep gold — secondary emphasis, gradient partner
  signal: '#047857', // emerald — success / "free" / checkmarks
  signalAlt: '#059669', // emerald companion for gradients/success
  warn: '#d4a017', // bright gold — attention sweeps, highlights
  danger: '#e11d48', // rose — errors, "the hard/expensive way"
  ink: '#14141f', // primary text on light
  muted: '#5f5f6e', // secondary text
  paper: '#fffef7', // light surface / bg
  cream: '#faf8f5', // alt light band
  line: '#e7e3da', // 1px borders on light
  // dark UI / terminal scale (GitHub-ink)
  d900: '#0d1117',
  d800: '#161b22',
  d600: '#30363d',
  d400: '#8b949e',
  d300: '#c9d1d9',
} as const;

// signature gradient: forest green -> emerald -> gold
export const GRADIENT = `linear-gradient(120deg, ${COLORS.accent}, ${COLORS.signalAlt}, ${COLORS.warn})`;

export const RADIUS = { card: 16, panel: 14, window: 10, pill: 999 } as const;

export const SHADOW = {
  soft: '0 8px 32px rgba(20,20,31,0.10)',
  card: '0 10px 40px rgba(20,20,31,0.08)',
} as const;

// Calm, premium easings (confirmed brand motion). Use these — never Easing.out(...) wrappers.
export const EASINGS = {
  easeOut: Easing.bezier(0.33, 1, 0.68, 1),
  easeIn: Easing.bezier(0.32, 0, 0.67, 0),
  easeInOut: Easing.bezier(0.37, 0, 0.63, 1),
  overshoot: Easing.bezier(0.34, 1.4, 0.64, 1), // gentle, no cartoon bounce
} as const;
