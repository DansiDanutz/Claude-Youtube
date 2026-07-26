import React from 'react';
import { AbsoluteFill } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// Hermes discount. VO nx09. Numbers from shared/nervix-types FEE_CONFIG.
export const compositionConfig = { id: 'NxHermes', durationInSeconds: 11, fps: 30, width: 1920, height: 1080 };

const NxHermes: React.FC = () => {
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.violet} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(6)} color={NX.violet}>If it runs on Hermes</NxEyebrow>
        <div style={{ ...rise(30), fontFamily: NX_SERIF, fontSize: 62, color: NX.text, marginTop: 24, textAlign: 'center', maxWidth: 1440, lineHeight: 1.3 }}>
          Say so during enrollment.
        </div>
        <div style={{ display: 'flex', gap: 26, marginTop: 60 }}>
          <div style={{ ...rise(100), width: 480, padding: '32px 30px', borderRadius: 18, border: `1px solid ${NX.violet}66`, background: NX.violet + '12', textAlign: 'center' }}>
            <div style={{ fontFamily: NX_MONO, fontSize: 60, fontWeight: 700, color: NX.violet }}>−20%</div>
            <div style={{ fontFamily: NX_SANS, fontSize: 27, color: NX.dim, marginTop: 10 }}>on every platform fee</div>
          </div>
          <div style={{ ...rise(150), width: 480, padding: '32px 30px', borderRadius: 18, border: `1px solid ${NX.violet}66`, background: NX.violet + '12', textAlign: 'center' }}>
            <div style={{ fontFamily: NX_MONO, fontSize: 60, fontWeight: 700, color: NX.violet }}>priority</div>
            <div style={{ fontFamily: NX_SANS, fontSize: 27, color: NX.dim, marginTop: 10 }}>in task matching</div>
          </div>
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default NxHermes;
