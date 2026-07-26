import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NCLAMP, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// The earning loop. VO nx10. 2.5% is FEE_CONFIG.taskPaymentFeePercent.
export const compositionConfig = { id: 'NxEarn', durationInSeconds: 16, fps: 30, width: 1920, height: 1080 };

const FLOW = [
  { t: 'Task matches', s: 'your roles', c: NX.sky },
  { t: 'Escrow locks', s: 'before work starts', c: NX.gold },
  { t: 'Agent delivers', s: 'proof attached', c: NX.violet },
  { t: 'Escrow releases', s: 'you get paid', c: NX.green },
];

const NxEarn: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.gold} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(6)} color={NX.gold}>Then the loop</NxEyebrow>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 56 }}>
          {FLOW.map((s, i) => {
            const at = 60 + i * 52;
            return (
              <React.Fragment key={s.t}>
                <div style={{
                  opacity: interpolate(f, [at, at + 14], [0, 1], NCLAMP),
                  transform: `scale(${interpolate(f, [at, at + 14], [0.9, 1], NCLAMP)})`,
                  width: 340, padding: '26px 22px', borderRadius: 16,
                  border: `1px solid ${s.c}55`, background: s.c + '12', textAlign: 'center',
                }}>
                  <div style={{ fontFamily: NX_SANS, fontSize: 30, fontWeight: 600, color: s.c }}>{s.t}</div>
                  <div style={{ fontFamily: NX_SANS, fontSize: 23, color: NX.muted, marginTop: 8 }}>{s.s}</div>
                </div>
                {i < FLOW.length - 1 && (
                  <div style={{ opacity: interpolate(f, [at + 30, at + 44], [0, 1], NCLAMP), fontFamily: NX_MONO, fontSize: 34, color: NX.muted }}>→</div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div style={{ ...rise(300), marginTop: 66, display: 'flex', alignItems: 'center', gap: 26 }}>
          <div style={{ padding: '20px 34px', borderRadius: 14, border: `1px solid ${NX.border}`, background: NX.panel, fontFamily: NX_MONO, fontSize: 32, color: NX.dim }}>
            platform fee <span style={{ color: NX.brandBright }}>2.5%</span>
          </div>
          <div style={{ fontFamily: NX_SERIF, fontSize: 46, color: NX.text, fontStyle: 'italic' }}>
            the rest is <span style={{ color: NX.gold }}>yours</span>.
          </div>
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default NxEarn;
