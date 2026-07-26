import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, AbsoluteFill } from 'remotion';
import { DL, DL_MONO, DL_SANS, DL_SERIF, DL_EASE, DCLAMP } from '../../lib/danslab';

// Ep10 — THE panel the narration promises: "Top right corner. That panel stays
// for the next twenty minutes and it never resets." Slides in on those words and
// an arrow SIGN points at it while Brian introduces it (anything we show, we
// point at). Canvas 1080×140: panel is the right 660×130, callout lives left.
export const compositionConfig = {
  id: 'YHudTop', durationInSeconds: 1353, fps: 30, width: 1080, height: 140, transparent: true,
};

const FPS = 30;

const hot = (hex: string, t: number) => {
  const n = parseInt(hex.slice(1), 16);
  const ch = (c: number) => Math.round(c + (255 - c) * t * 0.85);
  return `rgb(${ch(n >> 16)},${ch((n >> 8) & 255)},${ch(n & 255)})`;
};
const IN_AT = 46.6;    // "Top right corner."
const SIGN_UNTIL = 60.0; // arrow holds while the panel is explained
const OUT_AT = 1289.1;

const DAN: [number, number][] = [
  [138.7, 153], [153.0, 175], [185.6, 415], [284.0, 815], [293.0, 1015],
  [308.5, 1065], [390.0, 1110], [442.0, 1242],
];
const HUMAN: [number, number][] = [
  [499.4, 14625], [522.4, 27625], [538.8, 39542], [569.2, 49834],
  [582.3, 61751], [632.6, 76918], [682.8, 92626], [731.9, 109958],
];

const useTicker = (events: [number, number][]) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  let lastAt = -1;
  for (const [t] of events) {
    if (f >= t * FPS) lastAt = t * FPS;
  }
  let value = 0, prev = 0;
  for (const [t, v] of events) {
    const at = t * FPS;
    const s = spring({ frame: f - at, fps, config: { damping: 200, mass: 0.6 } });
    value += (v - prev) * (f >= at ? s : 0);
    prev = v;
  }
  const flash = lastAt < 0 ? 0 : interpolate(f, [lastAt, lastAt + 48], [1, 0], DCLAMP);
  return { value: Math.round(value), flash };
};

const Line: React.FC<{ label: string; value: number; color: string; flash: number }> =
({ label, value, color, flash }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
    <span style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 4, color: DL.faint }}>{label}</span>
    <span style={{
      fontFamily: DL_MONO, fontWeight: 700, fontSize: 34,
      color: flash > 0.05 ? hot(color, flash) : color,
      display: 'inline-block', transformOrigin: 'right center',
      transform: `scale(${1 + 0.3 * flash})`,
      textShadow: `0 0 ${22 * flash}px ${color}`,
    }}>
      ${value.toLocaleString('en-US')}<span style={{ fontFamily: DL_SANS, fontSize: 18, color: DL.muted, fontWeight: 400 }}> /mo</span>
    </span>
  </div>
);

const YHudTop: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dan = useTicker(DAN);
  const human = useTicker(HUMAN);
  const inOp = interpolate(f, [IN_AT * FPS, IN_AT * FPS + 20], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const outOp = interpolate(f, [OUT_AT * FPS, OUT_AT * FPS + 24], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  const x = interpolate(f, [IN_AT * FPS, IN_AT * FPS + 20], [60, 0], { ...DCLAMP, easing: DL_EASE.out });
  // the SIGN: arrow + label pointing at the panel while Brian introduces it
  const signIn = spring({ frame: f - (IN_AT + 0.5) * FPS, fps, config: { damping: 14, mass: 0.6 } });
  const signOut = interpolate(f, [SIGN_UNTIL * FPS, SIGN_UNTIL * FPS + 20], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  const signOp = (f >= (IN_AT + 0.5) * FPS ? 1 : 0) * signOut;
  const bob = Math.sin(f / 9) * 6;
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: inOp * outOp }}>
      {/* the sign */}
      <div style={{
        position: 'absolute', left: 20, top: 26, display: 'flex', alignItems: 'center', gap: 16,
        opacity: signOp, transform: `translateX(${(1 - signIn) * -40 + bob}px)`,
      }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.gold }}>the panel</span>
        <svg width="150" height="44" viewBox="0 0 150 44">
          <path d="M4 22 H126 M126 22 L104 8 M126 22 L104 36" stroke={DL.gold} strokeWidth="5"
                fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* the panel */}
      <div style={{
        position: 'absolute', right: 0, top: 5, width: 660, height: 130, transform: `translateX(${x}px)`,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8,
        background: 'rgba(12,9,8,0.94)', border: `1px solid ${DL.border}`,
        borderLeft: `3px solid ${DL.gold}`, borderRadius: 14, padding: '14px 26px',
      }}>
        <Line label="DAN PAYS" value={dan.value} color={DL.gold} flash={dan.flash} />
        <Line label="8 HUMANS" value={human.value} color={DL.red} flash={human.flash} />
      </div>
    </AbsoluteFill>
  );
};
export default YHudTop;
