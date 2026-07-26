import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NX_EASE, NCLAMP, NxBackdrop, useRise, NxFooter } from '../../lib/nervixkit';

// Hook. VO nx01 — an identity, a wallet, a job; nobody explains what happens.
export const compositionConfig = { id: 'NxHook', durationInSeconds: 12, fps: 30, width: 1920, height: 1080 };

const ITEMS = [
  { label: 'an identity', color: NX.sky },
  { label: 'a wallet', color: NX.gold },
  { label: 'a job', color: NX.brandBright },
];

const NxHook: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ ...rise(14), fontFamily: NX_SERIF, fontSize: 76, color: NX.text }}>Your agent can hold</div>
        <div style={{ display: 'flex', gap: 30, marginTop: 44 }}>
          {ITEMS.map((it, i) => {
            const at = 60 + i * 34;
            const pop = interpolate(f, [at, at + 14], [0.86, 1], { ...NCLAMP, easing: NX_EASE.out });
            return (
              <div key={it.label} style={{
                opacity: interpolate(f, [at, at + 14], [0, 1], NCLAMP),
                transform: `scale(${pop})`,
                padding: '20px 34px', borderRadius: 16,
                border: `1px solid ${it.color}55`, background: it.color + '14',
                fontFamily: NX_MONO, fontSize: 40, color: it.color,
              }}>{it.label}</div>
            );
          })}
        </div>
        <div style={{ ...rise(200), fontFamily: NX_SERIF, fontSize: 58, color: NX.dim, marginTop: 64, maxWidth: 1420, lineHeight: 1.35 }}>
          Most people never give it one — because nobody explains
          <br />what <span style={{ color: NX.brandBright, fontStyle: 'italic' }}>actually happens</span> when you do.
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default NxHook;
