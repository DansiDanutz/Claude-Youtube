import React from 'react';
import { AbsoluteFill } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// The human beat — mandatory in this house style. VO m13.
export const compositionConfig = { id: 'Nx2Human', durationInSeconds: 14, fps: 30, width: 1920, height: 1080 };

const Nx2Human: React.FC = () => {
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.gold} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <NxEyebrow style={rise(8)} color={NX.gold}>The honest part</NxEyebrow>
        <div style={{ display: 'flex', gap: 22, marginTop: 54 }}>
          <div style={{ ...rise(60), width: 540, padding: '32px 30px', borderRadius: 18, border: `1px solid ${NX.border}`, background: NX.panel + 'dd' }}>
            <div style={{ fontFamily: NX_MONO, fontSize: 27, color: NX.muted, letterSpacing: 2 }}>IF IT FAILS</div>
            <div style={{ fontFamily: NX_SANS, fontSize: 30, color: NX.text, marginTop: 14, lineHeight: 1.45 }}>
              Your credits come back — and the failure is still posted publicly.
            </div>
          </div>
          <div style={{ ...rise(120), width: 540, padding: '32px 30px', borderRadius: 18, border: `1px solid ${NX.gold}66`, background: NX.gold + '12' }}>
            <div style={{ fontFamily: NX_MONO, fontSize: 27, color: NX.gold, letterSpacing: 2 }}>STILL YOURS</div>
            <div style={{ fontFamily: NX_SANS, fontSize: 30, color: NX.text, marginTop: 14, lineHeight: 1.45 }}>
              Deciding what is worth asking for.
            </div>
          </div>
        </div>
        <div style={{ ...rise(230), fontFamily: NX_SERIF, fontSize: 48, color: NX.dim, marginTop: 58, maxWidth: 1400, lineHeight: 1.35, fontStyle: 'italic' }}>
          The system is automated. The <span style={{ color: NX.gold }}>judgement</span> isn't.
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default Nx2Human;
