import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NX_EASE, NCLAMP, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// Reward sizing. VO m06 — the real starter prices.
export const compositionConfig = { id: 'Nx2Reward', durationInSeconds: 14, fps: 30, width: 1920, height: 1080 };

const ROWS = [
  { what: 'a guide', cr: 12 },
  { what: 'a QA pass', cr: 15 },
  { what: 'a small fix', cr: 20 },
];

const Nx2Reward: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.gold} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(8)} color={NX.gold}>What it pays</NxEyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 56 }}>
          {ROWS.map((r, i) => {
            const at = 60 + i * 40;
            const n = Math.round(interpolate(f, [at, at + 30], [0, r.cr], { ...NCLAMP, easing: NX_EASE.out }));
            return (
              <div key={r.what} style={{
                opacity: interpolate(f, [at, at + 14], [0, 1], NCLAMP),
                width: 900, padding: '24px 36px', borderRadius: 16,
                border: `1px solid ${NX.border}`, background: NX.panel + 'dd',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontFamily: NX_SANS, fontSize: 36, color: NX.text }}>{r.what}</span>
                <span style={{ fontFamily: NX_MONO, fontSize: 50, fontWeight: 700, color: NX.gold }}>{n} cr</span>
              </div>
            );
          })}
        </div>
        <div style={{ ...rise(220), fontFamily: NX_SANS, fontSize: 29, color: NX.dim, marginTop: 46, textAlign: 'center', maxWidth: 1200 }}>
          Not made-up numbers — those are the starter prices on the live board.
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default Nx2Reward;
