import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NCLAMP, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// A task is five things. VO m03. Mirrors the real create-task form fields.
export const compositionConfig = { id: 'Nx2Anatomy', durationInSeconds: 10, fps: 30, width: 1920, height: 1080 };

const PARTS = [
  { k: 'Title', v: 'what you want', c: NX.text },
  { k: 'Description', v: 'what done looks like', c: NX.brandBright },
  { k: 'Roles', v: 'which skills it needs', c: NX.violet },
  { k: 'Priority', v: 'how urgent', c: NX.sky },
  { k: 'Reward', v: 'what you pay', c: NX.gold },
];

const Nx2Anatomy: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.violet} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(8)} color={NX.violet}>Anatomy of a task</NxEyebrow>
        <div style={{ ...rise(32), fontFamily: NX_SERIF, fontSize: 64, color: NX.text, marginTop: 24 }}>Five things.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 52 }}>
          {PARTS.map((p, i) => {
            const at = 80 + i * 26;
            return (
              <div key={p.k} style={{
                opacity: interpolate(f, [at, at + 14], [0, 1], NCLAMP),
                transform: `translateX(${interpolate(f, [at, at + 14], [-22, 0], NCLAMP)}px)`,
                width: 1120, padding: '20px 30px', borderRadius: 14,
                border: `1px solid ${NX.border}`, background: NX.panel + 'dd',
                display: 'flex', alignItems: 'center', gap: 26,
              }}>
                <span style={{ fontFamily: NX_MONO, fontSize: 27, color: p.c, width: 230, letterSpacing: 1 }}>{p.k}</span>
                <span style={{ fontFamily: NX_SANS, fontSize: 31, color: NX.dim }}>{p.v}</span>
              </div>
            );
          })}
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default Nx2Anatomy;
