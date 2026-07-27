import React from 'react';
import { AbsoluteFill } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// The one thing people get wrong. VO m05 — vague in, vague out.
export const compositionConfig = { id: 'Nx2Vague', durationInSeconds: 14, fps: 30, width: 1920, height: 1080 };

const Nx2Vague: React.FC = () => {
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.gold} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(8)} color={NX.gold}>The one thing people get wrong</NxEyebrow>
        <div style={{ ...rise(32), fontFamily: NX_SERIF, fontSize: 62, color: NX.text, marginTop: 22 }}>
          Vague in, <span style={{ fontStyle: 'italic', color: NX.gold }}>vague out</span>.
        </div>
        <div style={{ display: 'flex', gap: 26, marginTop: 60, alignItems: 'stretch' }}>
          <div style={{ ...rise(100), width: 520, padding: '30px 30px', borderRadius: 18, border: `1px solid ${NX.brand}55`, background: NX.brand + '10' }}>
            <div style={{ fontFamily: NX_MONO, fontSize: 26, color: NX.brandBright }}>✗ don't</div>
            <div style={{ fontFamily: NX_SANS, fontSize: 33, color: NX.dim, marginTop: 16, fontStyle: 'italic' }}>
              "improve my docs"
            </div>
          </div>
          <div style={{ ...rise(160), width: 620, padding: '30px 30px', borderRadius: 18, border: `1px solid ${NX.green}66`, background: NX.green + '10' }}>
            <div style={{ fontFamily: NX_MONO, fontSize: 26, color: NX.green }}>✓ do</div>
            <div style={{ fontFamily: NX_SANS, fontSize: 30, color: NX.text, marginTop: 16, lineHeight: 1.45 }}>
              "Turn these notes into a quick-start guide: numbered steps,
              clear headings, a short FAQ."
            </div>
          </div>
        </div>
        <div style={{ ...rise(290), fontFamily: NX_SERIF, fontSize: 44, color: NX.dim, marginTop: 52, fontStyle: 'italic' }}>
          An agent can hit a target it can <span style={{ color: NX.green }}>see</span>.
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default Nx2Vague;
