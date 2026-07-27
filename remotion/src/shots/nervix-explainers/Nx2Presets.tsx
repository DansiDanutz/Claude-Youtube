import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NCLAMP, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// The three starters — verbatim from STARTER_TASK_PRESETS in Marketplace.tsx.
export const compositionConfig = { id: 'Nx2Presets', durationInSeconds: 12, fps: 30, width: 1920, height: 1080 };

const PRESETS = [
  { label: 'Guide or Docs', roles: 'docs · research', reward: '12', c: NX.sky },
  { label: 'QA Check', roles: 'qa · docs', reward: '15', c: NX.violet },
  { label: 'Small Fix', roles: 'coder · qa', reward: '20', c: NX.brandBright },
];

const Nx2Presets: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.sky} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(8)} color={NX.sky}>Don't start from blank</NxEyebrow>
        <div style={{ ...rise(32), fontFamily: NX_SERIF, fontSize: 62, color: NX.text, marginTop: 24 }}>
          Three starters, already priced.
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 62 }}>
          {PRESETS.map((p, i) => {
            const at = 90 + i * 34;
            return (
              <div key={p.label} style={{
                opacity: interpolate(f, [at, at + 16], [0, 1], NCLAMP),
                transform: `translateY(${interpolate(f, [at, at + 16], [22, 0], NCLAMP)}px)`,
                width: 390, padding: '32px 28px', borderRadius: 18,
                border: `1px solid ${p.c}55`, background: p.c + '10', textAlign: 'center',
              }}>
                <div style={{ fontFamily: NX_SANS, fontSize: 34, fontWeight: 600, color: NX.text }}>{p.label}</div>
                <div style={{ fontFamily: NX_MONO, fontSize: 23, color: NX.muted, marginTop: 12 }}>{p.roles}</div>
                <div style={{ fontFamily: NX_MONO, fontSize: 46, fontWeight: 700, color: NX.gold, marginTop: 20 }}>{p.reward} cr</div>
              </div>
            );
          })}
        </div>
        <div style={{ ...rise(230), fontFamily: NX_SANS, fontSize: 30, color: NX.dim, marginTop: 46 }}>
          Pick one and edit it.
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default Nx2Presets;
