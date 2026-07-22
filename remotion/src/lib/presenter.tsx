import React from 'react';
import { useCurrentFrame, interpolate, OffthreadVideo } from 'remotion';
import { DL, DL_MONO, DL_SANS, DL_EASE, DCLAMP } from './danslab';

// ── The presenter layer ─────────────────────────────────────────────────────
// Dan on camera, cut out of his background, standing inside the scene — so an
// episode can switch from the narrator to a human addressing the audience
// directly, without cutting away from the graphics.
//
// Source clips are produced by tools/cutout_video.py, which writes VP9 + alpha
// WebM. `transparent` is REQUIRED on OffthreadVideo: without it Remotion
// extracts frames as JPEG and the alpha is silently flattened to black.

export type PresenterSide = 'left' | 'right';

export const Presenter: React.FC<{
  src: string;
  at?: number;
  side?: PresenterSide;
  /** rendered height in px; the clip keeps its own aspect ratio */
  h?: number;
  /** distance from the bottom of the frame */
  bottom?: number;
  /** distance from the nearest side */
  inset?: number;
  /** frames to hold before easing back out; omit to stay for the whole scene */
  out?: number;
  /** ground shadow — off for clips that are already cropped at the waist */
  shadow?: boolean;
}> = ({ src, at = 0, side = 'right', h = 720, bottom = 0, inset = 90, out, shadow = true }) => {
  const frame = useCurrentFrame();
  const t = frame - at;

  // slide up from the frame edge, and back down if an exit is given
  const inP = interpolate(t, [0, 22], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const outP = out === undefined ? 1 : interpolate(t, [out, out + 20], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  const p = Math.min(inP, outP);
  const y = interpolate(p, [0, 1], [70, 0]);
  // a slow breathing drift so a short loop does not read as a frozen cutout
  const drift = Math.sin(t / 62) * 5;

  return (
    <div
      style={{
        position: 'absolute',
        bottom,
        [side]: inset,
        height: h,
        opacity: p,
        transform: `translateY(${y + drift}px)`,
        pointerEvents: 'none',
      }}
    >
      {shadow && (
        <div
          style={{
            position: 'absolute',
            bottom: -6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: h * 0.5,
            height: h * 0.035,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.55), transparent 70%)',
          }}
        />
      )}
      <OffthreadVideo src={src} transparent style={{ height: h, width: 'auto', display: 'block' }} />
    </div>
  );
};

// A name plate to sit under the presenter the first time they appear.
export const PresenterTag: React.FC<{
  name: string;
  role?: string;
  at?: number;
  side?: PresenterSide;
  inset?: number;
  bottom?: number;
}> = ({ name, role, at = 0, side = 'right', inset = 90, bottom = 60 }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [at, at + 18], [0, 1], DCLAMP);
  const x = interpolate(frame, [at, at + 22], [side === 'right' ? 30 : -30, 0], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div
      style={{
        position: 'absolute',
        bottom,
        [side]: inset,
        opacity: op,
        transform: `translateX(${x}px)`,
        background: DL.panel,
        border: `1px solid ${DL.border}`,
        borderLeft: `3px solid ${DL.red}`,
        borderRadius: 12,
        padding: '14px 24px',
      }}
    >
      <div style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 30, color: DL.text }}>{name}</div>
      {role && (
        <div style={{ fontFamily: DL_MONO, fontSize: 19, letterSpacing: 2, color: DL.faint, marginTop: 4 }}>{role}</div>
      )}
    </div>
  );
};
