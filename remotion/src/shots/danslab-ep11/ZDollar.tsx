import React, { useMemo, useRef, useEffect } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';

// Ep11 cold open · signature effect: ~2,600 gold particles drift as dust, then
// condense into "$1". Fully deterministic — particle starts come from a seeded
// hash, targets from sampling the glyph raster once (fonts are loaded by the
// danslab font loaders before render). VO lands after the number forms.
export const compositionConfig = { id: 'ZDollar', durationInSeconds: 26, fps: 30, width: 1920, height: 1080 };

const W = 1920, H = 1080;
const N = 2600;
const CONDENSE = 90;   // particles start seeking their glyph target
const FORMED = 220;    // fully formed — subline can land

// deterministic pseudo-random from index (no Math.random — breaks resume/renders)
const rnd = (i: number, salt: number) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const useTargets = () => useMemo(() => {
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d')!;
  g.fillStyle = '#fff';
  g.font = `700 620px ${DL_SERIF}`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('$1', W / 2, H / 2 + 20);
  const px = g.getImageData(0, 0, W, H).data;
  const pts: [number, number][] = [];
  for (let y = 0; y < H; y += 6) {
    for (let x = 0; x < W; x += 6) {
      if (px[(y * W + x) * 4 + 3] > 128) pts.push([x, y]);
    }
  }
  return pts;
}, []);

const ZDollar: React.FC = () => {
  const f = useCurrentFrame();
  const targets = useTargets();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const g = ref.current?.getContext('2d');
    if (!g || targets.length === 0) return;
    g.clearRect(0, 0, W, H);
    const seek = interpolate(f, [CONDENSE, FORMED], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
    for (let i = 0; i < N; i++) {
      // drifting dust position (slow deterministic wander)
      const dx = W * rnd(i, 1) + Math.sin(f / 40 + i) * 30;
      const dy = H * rnd(i, 2) + Math.cos(f / 52 + i * 0.7) * 24;
      const [tx, ty] = targets[i % targets.length];
      // per-particle stagger so the glyph forms as a wave, not a snap
      const lag = interpolate(seek, [rnd(i, 3) * 0.4, 0.6 + rnd(i, 4) * 0.4], [0, 1], DCLAMP);
      const x = dx + (tx - dx) * lag;
      const y = dy + (ty - dy) * lag;
      const size = 1.4 + rnd(i, 5) * 2.2 - lag * 0.8;
      const glow = lag > 0.95 ? 0.95 : 0.45 + rnd(i, 6) * 0.3;
      g.fillStyle = `rgba(212,160,23,${glow})`;
      g.fillRect(x, y, size, size);
    }
  }, [f, targets]);

  const sub = interpolate(f, [FORMED + 20, FORMED + 40], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const kick = interpolate(f, [20, 40], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, background: DL.bg }}>
      <SiteBg glow="#14100a" />
      <canvas ref={ref} width={W} height={H} style={{ position: 'absolute', inset: 0 }} />
      <div style={{
        position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center', opacity: kick,
        fontFamily: DL_MONO, fontSize: 26, letterSpacing: 10, color: DL.faint,
      }}>
        SEASON TWO
      </div>
      <div style={{
        position: 'absolute', bottom: 150, left: 0, right: 0, textAlign: 'center', opacity: sub,
        fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm,
      }}>
        Eight workers. One number that has never moved.
      </div>
    </AbsoluteFill>
  );
};
export default ZDollar;
