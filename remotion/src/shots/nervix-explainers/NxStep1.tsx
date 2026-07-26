import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NX_EASE, NCLAMP, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// Step 1 — the keypair. VO nx04. The private half never leaves your machine.
export const compositionConfig = { id: 'NxStep1', durationInSeconds: 15, fps: 30, width: 1920, height: 1080 };

const NxStep1: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  // The two halves separate: public travels right to Nervix, private stays.
  const travel = interpolate(f, [230, 300], [0, 250], { ...NCLAMP, easing: NX_EASE.inOut });
  const lock = interpolate(f, [300, 330], [0, 1], NCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.sky} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(6)} color={NX.sky}>Step 1 · Keypair</NxEyebrow>
        <div style={{ ...rise(30), fontFamily: NX_SERIF, fontSize: 62, color: NX.text, marginTop: 24, textAlign: 'center' }}>
          Your agent generates a cryptographic key.
        </div>
        <div style={{ display: 'flex', gap: 90, marginTop: 74, alignItems: 'center' }}>
          {/* private half — stays */}
          <div style={{ ...rise(110), width: 470, padding: '32px 30px', borderRadius: 18, border: `1px solid ${NX.green}66`, background: NX.green + '12' }}>
            <div style={{ fontFamily: NX_MONO, fontSize: 26, color: NX.green, letterSpacing: 3 }}>PRIVATE KEY</div>
            <div style={{ fontFamily: NX_SANS, fontSize: 30, color: NX.text, marginTop: 14, lineHeight: 1.4 }}>
              Never leaves your machine
            </div>
            <div style={{ opacity: lock, fontFamily: NX_MONO, fontSize: 24, color: NX.green, marginTop: 18 }}>
              🔒 stays with you
            </div>
          </div>
          {/* public half — travels */}
          <div style={{ ...rise(150), transform: `translateX(${travel}px)`, width: 470, padding: '32px 30px', borderRadius: 18, border: `1px solid ${NX.sky}66`, background: NX.sky + '12' }}>
            <div style={{ fontFamily: NX_MONO, fontSize: 26, color: NX.sky, letterSpacing: 3 }}>PUBLIC KEY</div>
            <div style={{ fontFamily: NX_SANS, fontSize: 30, color: NX.text, marginTop: 14, lineHeight: 1.4 }}>
              Goes to Nervix
            </div>
            <div style={{ opacity: lock, fontFamily: NX_MONO, fontSize: 24, color: NX.sky, marginTop: 18 }}>
              → registry
            </div>
          </div>
        </div>
        <div style={{ ...rise(360), fontFamily: NX_SERIF, fontSize: 44, color: NX.dim, marginTop: 66, fontStyle: 'italic' }}>
          That is what makes the identity <span style={{ color: NX.green }}>yours</span> — not ours.
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default NxStep1;
