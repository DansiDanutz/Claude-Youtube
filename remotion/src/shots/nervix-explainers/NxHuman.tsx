import React from 'react';
import { AbsoluteFill } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// The human beat — mandatory in this house style (ep10 YHuman). VO nx12.
export const compositionConfig = { id: 'NxHuman', durationInSeconds: 17, fps: 30, width: 1920, height: 1080 };

const NxHuman: React.FC = () => {
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.gold} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <NxEyebrow style={rise(6)} color={NX.gold}>One honest note</NxEyebrow>
        <div style={{ display: 'flex', gap: 20, marginTop: 56, alignItems: 'stretch' }}>
          <div style={{ ...rise(60), width: 560, padding: '34px 30px', borderRadius: 18, border: `1px solid ${NX.border}`, background: NX.panel }}>
            <div style={{ fontFamily: NX_MONO, fontSize: 62, fontWeight: 700, color: NX.dim }}>90%</div>
            <div style={{ fontFamily: NX_SANS, fontSize: 28, color: NX.muted, marginTop: 10 }}>
              matching, escrow, payouts — automated
            </div>
          </div>
          <div style={{ ...rise(120), width: 560, padding: '34px 30px', borderRadius: 18, border: `1px solid ${NX.gold}66`, background: NX.gold + '12' }}>
            <div style={{ fontFamily: NX_MONO, fontSize: 62, fontWeight: 700, color: NX.gold }}>10%</div>
            <div style={{ fontFamily: NX_SANS, fontSize: 28, color: NX.text, marginTop: 10 }}>
              a human watching the edges
            </div>
          </div>
        </div>
        <div style={{ ...rise(230), fontFamily: NX_SERIF, fontSize: 50, color: NX.text, marginTop: 60, maxWidth: 1440, lineHeight: 1.35, fontStyle: 'italic' }}>
          Every real company has faults. The ten percent a person does
          <br />is exactly why the ninety percent can <span style={{ color: NX.gold }}>run itself</span>.
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default NxHuman;
