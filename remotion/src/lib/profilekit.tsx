// Shared pieces for the danslab-profile brand film. NOT a shot (no
// compositionConfig; lives outside src/shots so gen-registry skips it).
// The film runs on the channel brand (brand.ts: paper / green / gold, Sora)
// with the real red DansLab logo mark on top.
import React from 'react';
import { interpolate, staticFile, useCurrentFrame, OffthreadVideo, Loop } from 'remotion';
import { COLORS, EASINGS } from '../brand';
import { FONT_MONO } from '../fonts';

export const PCLAMP = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

// Source motion clips are 145 frames @ 24fps (~6.04s). At 30fps comp time that
// is ~181 frames; loop a hair early so the tail never freezes.
const CLIP_LOOP_FRAMES = 176;

// Animated presenter: loops a background-removed motion clip
// (library/characters/motion/<name>-alpha.webm) with the brand entrance
// (fade + rise) and a soft ground shadow. h = rendered clip height; the clip
// is 16:9 so the box is h*16/9 wide with the character in the middle third.
export const MotionChar: React.FC<{
  name: string;
  h?: number;
  start?: number;
  flip?: boolean;
}> = ({ name, h = 700, start = 0, flip = false }) => {
  const frame = useCurrentFrame();
  const t = frame - start;
  const op = interpolate(t, [0, 16], [0, 1], { ...PCLAMP, easing: EASINGS.easeOut });
  const y = interpolate(t, [0, 20], [34, 0], { ...PCLAMP, easing: EASINGS.easeOut });
  const w = (h * 16) / 9;
  return (
    <div style={{ opacity: op, transform: `translateY(${y}px)`, width: w, height: h, position: 'relative' }}>
      <div style={{ position: 'absolute', left: '50%', bottom: h * 0.015, transform: 'translateX(-50%)', width: h * 0.52, height: h * 0.075, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(20,20,31,0.22), transparent)' }} />
      <div style={{ position: 'absolute', inset: 0, transform: flip ? 'scaleX(-1)' : undefined }}>
        <Loop durationInFrames={CLIP_LOOP_FRAMES}>
          <OffthreadVideo
            src={staticFile(`library/characters/motion/${name}-alpha.webm`)}
            transparent
            muted
            style={{ width: '100%', height: '100%' }}
          />
        </Loop>
      </div>
    </div>
  );
};

// The real DansLab logo mark on the channel-brand canvas: red tile, paper D,
// gold cursor. Static version (the animated build lives in lib/danslab).
export { DlLogo, DlLogoAnimated } from './danslab';

// mono section label, top of frame ("THE PROOF // REAL SYSTEMS")
export const SectionTag: React.FC<{ text: string; start?: number; color?: string }> = ({ text, start = 6, color = COLORS.accent }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [start, start + 12], [0, 1], { ...PCLAMP, easing: EASINGS.easeOut });
  return (
    <div style={{ position: 'absolute', top: 84, left: 130, right: 130, display: 'flex', alignItems: 'center', gap: 24, opacity: op }}>
      <div style={{ width: 12, height: 12, borderRadius: 3, background: color }} />
      <span style={{ fontFamily: FONT_MONO, fontSize: 25, letterSpacing: 6, color: COLORS.muted }}>{text}</span>
      <div style={{ flex: 1, height: 1, background: COLORS.line }} />
    </div>
  );
};
