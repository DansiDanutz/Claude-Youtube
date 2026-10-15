import React, { useMemo, useRef, useEffect } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { at, voAt } from '../../lib/ep12timing.gen';

// Ep12 cold open. The ep11 particle $1 — but FROZEN mid-form: the dollar that never finished forming.
// dol01 (the zero) · dol02 (a way to get paid nobody else controls → wallet slot appears) ·
// dol03 "…the first money has to APPEAR" → the glyph completes and one particle drops into the wallet.
// Deterministic (seeded) like ZDollar; glyph raster sampled once.
export const compositionConfig = { id: 'WDollar', durationInSeconds: 30.3, fps: 30, width: 1920, height: 1080 };

const W = 1920, H = 1080, N = 2600;
const rnd = (i: number, s: number) => { const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x); };

const useTargets = () => useMemo(() => {
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d')!;
  g.fillStyle = '#fff'; g.font = `700 560px ${DL_SERIF}`; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('$1', W / 2, H / 2 - 20);
  const px = g.getImageData(0, 0, W, H).data;
  const pts: [number, number][] = [];
  for (let y = 0; y < H; y += 6) for (let x = 0; x < W; x += 6) if (px[(y * W + x) * 4 + 3] > 128) pts.push([x, y]);
  return pts;
}, []);

const WDollar: React.FC = () => {
  const f = useCurrentFrame();
  const targets = useTargets();
  const ref = useRef<HTMLCanvasElement>(null);
  const APPEAR = at('dol03', 'appear');
  const SLOT = at('dol02', 'way');
  const DROP0 = APPEAR + 6, DROP1 = APPEAR + 30;

  useEffect(() => {
    const g = ref.current?.getContext('2d');
    if (!g || !targets.length) return;
    g.clearRect(0, 0, W, H);
    // stalls at 68% formed — then completes on "appear"
    const stall = interpolate(f, [20, 150], [0, 0.68], { ...DCLAMP, easing: DL_EASE.inOut });
    const done = interpolate(f, [APPEAR - 4, APPEAR + 20], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
    const seek = stall + (1 - stall) * done;
    for (let i = 0; i < N; i++) {
      const dx = W * rnd(i, 1) + Math.sin(f / 40 + i) * 30;
      const dy = H * rnd(i, 2) + Math.cos(f / 52 + i * 0.7) * 24;
      const [tx, ty] = targets[i % targets.length];
      const lag = interpolate(seek, [rnd(i, 3) * 0.4, 0.6 + rnd(i, 4) * 0.4], [0, 1], DCLAMP);
      const jitter = (1 - done) * lag * Math.sin(f / 9 + i) * 2.2;   // the unfinished glyph trembles
      const x = dx + (tx - dx) * lag + jitter, y = dy + (ty - dy) * lag;
      const size = 1.4 + rnd(i, 5) * 2.2 - lag * 0.8;
      g.fillStyle = `rgba(212,160,23,${lag > 0.95 ? 0.95 : 0.4 + rnd(i, 6) * 0.3})`;
      g.fillRect(x, y, size, size);
    }
    // the one particle that drops into the wallet
    if (f >= DROP0) {
      const p = interpolate(f, [DROP0, DROP1], [0, 1], { ...DCLAMP, easing: DL_EASE.in });
      const y = interpolate(p, [0, 1], [700, 905]);
      g.fillStyle = 'rgba(255,236,180,1)';
      g.beginPath(); g.arc(W / 2, y, 7 - 3 * p, 0, Math.PI * 2); g.fill();
    }
  }, [f, targets, APPEAR, DROP0, DROP1]);

  const slotOp = interpolate(f, [SLOT, SLOT + 20], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const landed = interpolate(f, [DROP1, DROP1 + 10], [0, 1], DCLAMP);
  const sub = interpolate(f, [at('dol01', 'moved'), at('dol01', 'moved') + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const subOut = interpolate(f, [SLOT - 10, SLOT + 6], [1, 0], DCLAMP);
  const blackout = interpolate(f, [DROP1 + 24, DROP1 + 40], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, background: DL.bg }}>
      <SiteBg glow="#14100a" />
      <canvas ref={ref} width={W} height={H} style={{ position: 'absolute', inset: 0 }} />
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(f, [voAt('dol01'), voAt('dol01') + 20], [0, 1], DCLAMP),
        fontFamily: DL_MONO, fontSize: 26, letterSpacing: 10, color: DL.faint }}>
        SEASON TWO · NO. 2
      </div>
      <div style={{ position: 'absolute', top: 820, left: 0, right: 0, textAlign: 'center', opacity: sub * subOut,
        fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>
        Eleven episodes. <span style={{ color: DL.red }}>Zero dollars.</span>
      </div>
      {/* wallet slot */}
      <div style={{ position: 'absolute', left: W / 2 - 130, top: 880, width: 260, height: 74, opacity: slotOp,
        border: `3px solid ${landed > 0 ? DL.gold : DL.muted}`, borderRadius: 16, background: '#0e0b0acc',
        boxShadow: landed ? `0 0 ${40 * landed}px rgba(212,160,23,${0.7 * landed})` : undefined,
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: -3, left: 90, width: 80, height: 6, background: DL.bg }} />
        <span style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 4, color: landed ? DL.gold : DL.muted }}>OUR WALLET</span>
      </div>
      <AbsoluteFill style={{ background: '#000', opacity: blackout }} />
    </AbsoluteFill>
  );
};
export default WDollar;
