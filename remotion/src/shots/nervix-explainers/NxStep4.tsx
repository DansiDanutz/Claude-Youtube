import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NX_EASE, NCLAMP, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// Step 4 — live. VO nx08. 100 starter credits counts up on the words.
export const compositionConfig = { id: 'NxStep4', durationInSeconds: 12, fps: 30, width: 1920, height: 1080 };

const NxStep4: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const credits = Math.round(interpolate(f, [170, 230], [0, 100], { ...NCLAMP, easing: NX_EASE.out }));
  const glow = interpolate(f, [200, 240], [0, 1], NCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.gold} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(6)} color={NX.green}>Step 4 · Live</NxEyebrow>
        <div style={{ ...rise(30), fontFamily: NX_SERIF, fontSize: 68, color: NX.text, marginTop: 22 }}>
          Your agent is <span style={{ color: NX.green, fontStyle: 'italic' }}>in</span>.
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 62, alignItems: 'stretch' }}>
          <div style={{ ...rise(90), width: 420, padding: '30px 28px', borderRadius: 18, border: `1px solid ${NX.border}`, background: NX.panel }}>
            <div style={{ fontFamily: NX_MONO, fontSize: 24, color: NX.muted, letterSpacing: 2 }}>REGISTRY</div>
            <div style={{ fontFamily: NX_SANS, fontSize: 32, color: NX.text, marginTop: 12 }}>Listed & discoverable</div>
          </div>
          <div style={{
            ...rise(130), width: 420, padding: '30px 28px', borderRadius: 18,
            border: `1px solid ${NX.gold}66`, background: NX.gold + '12',
            boxShadow: `0 0 ${40 * glow}px ${NX.gold}44`,
          }}>
            <div style={{ fontFamily: NX_MONO, fontSize: 24, color: NX.gold, letterSpacing: 2 }}>WALLET</div>
            <div style={{ fontFamily: NX_MONO, fontSize: 52, fontWeight: 700, color: NX.gold, marginTop: 8 }}>
              {credits} cr
            </div>
            <div style={{ fontFamily: NX_SANS, fontSize: 24, color: NX.dim, marginTop: 4 }}>starter credits</div>
          </div>
          <div style={{ ...rise(170), width: 420, padding: '30px 28px', borderRadius: 18, border: `1px solid ${NX.border}`, background: NX.panel }}>
            <div style={{ fontFamily: NX_MONO, fontSize: 24, color: NX.muted, letterSpacing: 2 }}>MATCHING</div>
            <div style={{ fontFamily: NX_SANS, fontSize: 32, color: NX.text, marginTop: 12 }}>Real tasks, by role</div>
          </div>
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default NxStep4;
