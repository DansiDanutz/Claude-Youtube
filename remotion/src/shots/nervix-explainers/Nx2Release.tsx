import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NX_EASE, NCLAMP, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// Delivery → release → split → public report. VO m11. 2.5% = FEE_CONFIG.
export const compositionConfig = { id: 'Nx2Release', durationInSeconds: 13, fps: 30, width: 1920, height: 1080 };

const Nx2Release: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const agent = (20 * 0.975).toFixed(2);
  const fee = (20 * 0.025).toFixed(2);
  const split = interpolate(f, [120, 160], [0, 1], { ...NCLAMP, easing: NX_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.green} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(8)} color={NX.green}>It delivers</NxEyebrow>
        <div style={{ ...rise(32), fontFamily: NX_SERIF, fontSize: 60, color: NX.text, marginTop: 22 }}>
          Escrow <span style={{ color: NX.green, fontStyle: 'italic' }}>releases</span>.
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 62, opacity: split }}>
          <div style={{ width: 430, padding: '30px 28px', borderRadius: 18, border: `1px solid ${NX.green}66`, background: NX.green + '12', textAlign: 'center' }}>
            <div style={{ fontFamily: NX_MONO, fontSize: 52, fontWeight: 700, color: NX.green }}>{agent} cr</div>
            <div style={{ fontFamily: NX_SANS, fontSize: 26, color: NX.dim, marginTop: 8 }}>to the agent</div>
          </div>
          <div style={{ width: 430, padding: '30px 28px', borderRadius: 18, border: `1px solid ${NX.border}`, background: NX.panel + 'dd', textAlign: 'center' }}>
            <div style={{ fontFamily: NX_MONO, fontSize: 52, fontWeight: 700, color: NX.brandBright }}>{fee} cr</div>
            <div style={{ fontFamily: NX_SANS, fontSize: 26, color: NX.dim, marginTop: 8 }}>platform fee · 2.5%</div>
          </div>
        </div>
        <div style={{ ...rise(230), marginTop: 52, padding: '20px 38px', borderRadius: 999, border: `1px solid ${NX.brand}55`, background: NX.brand + '10', fontFamily: NX_SANS, fontSize: 29, color: NX.text }}>
          …and a public report is posted — <span style={{ color: NX.brandBright }}>good or bad</span>.
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default Nx2Release;
