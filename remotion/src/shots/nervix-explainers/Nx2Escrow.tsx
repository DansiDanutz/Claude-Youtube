import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NX_EASE, NCLAMP, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// Escrow — the trust beat. VO m08. Credits move into a LOCK, not to the agent.
export const compositionConfig = { id: 'Nx2Escrow', durationInSeconds: 14, fps: 30, width: 1920, height: 1080 };

const Nx2Escrow: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const travel = interpolate(f, [110, 175], [0, 330], { ...NCLAMP, easing: NX_EASE.inOut });
  const locked = interpolate(f, [175, 200], [0, 1], NCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.gold} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(8)} color={NX.gold}>The moment you post</NxEyebrow>
        <div style={{ ...rise(32), fontFamily: NX_SERIF, fontSize: 60, color: NX.text, marginTop: 22 }}>
          Your credits move into <span style={{ color: NX.gold, fontStyle: 'italic' }}>escrow</span>.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 60, marginTop: 70 }}>
          <div style={{ ...rise(70), width: 330, padding: '28px 26px', borderRadius: 18, border: `1px solid ${NX.border}`, background: NX.panel + 'dd', textAlign: 'center' }}>
            <div style={{ fontFamily: NX_MONO, fontSize: 24, color: NX.muted, letterSpacing: 2 }}>YOUR WALLET</div>
            <div style={{ fontFamily: NX_MONO, fontSize: 40, color: NX.text, marginTop: 10 }}>−20 cr</div>
          </div>
          {/* the credit in transit — absorbed by the lock on arrival, so it
              never parks on top of the escrow figure */}
          <div style={{
            transform: `translateX(${travel - 165}px) scale(${interpolate(f, [168, 182], [1, 0.4], NCLAMP)})`,
            opacity: interpolate(f, [110, 120, 168, 182], [0, 1, 1, 0], NCLAMP),
            fontFamily: NX_MONO, fontSize: 38, color: NX.gold,
          }}>●</div>
          <div style={{
            ...rise(110), width: 330, padding: '28px 26px', borderRadius: 18,
            border: `1px solid ${NX.gold}66`, background: NX.gold + '12', textAlign: 'center',
            boxShadow: `0 0 ${40 * locked}px ${NX.gold}44`,
          }}>
            <div style={{ fontFamily: NX_MONO, fontSize: 24, color: NX.gold, letterSpacing: 2 }}>🔒 ESCROW</div>
            <div style={{ fontFamily: NX_MONO, fontSize: 40, color: NX.gold, marginTop: 10 }}>20 cr held</div>
          </div>
          <div style={{ ...rise(150), width: 330, padding: '28px 26px', borderRadius: 18, border: `1px dashed ${NX.border}`, textAlign: 'center', opacity: 0.55 }}>
            <div style={{ fontFamily: NX_MONO, fontSize: 24, color: NX.muted, letterSpacing: 2 }}>THE AGENT</div>
            <div style={{ fontFamily: NX_MONO, fontSize: 40, color: NX.muted, marginTop: 10 }}>not yet</div>
          </div>
        </div>
        <div style={{ ...rise(270), fontFamily: NX_SERIF, fontSize: 42, color: NX.dim, marginTop: 58, fontStyle: 'italic', textAlign: 'center', maxWidth: 1400 }}>
          The agent sees the money is real. You see it hasn't left.
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default Nx2Escrow;
