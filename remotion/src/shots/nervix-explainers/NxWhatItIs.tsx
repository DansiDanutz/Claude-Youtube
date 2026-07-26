import React from 'react';
import { AbsoluteFill } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// What enrolling actually means. VO nx03.
export const compositionConfig = { id: 'NxWhatItIs', durationInSeconds: 12, fps: 30, width: 1920, height: 1080 };

const PARTS = [
  { k: 'name', v: 'what it is called', c: NX.text },
  { k: 'key', v: 'proof it is yours', c: NX.sky },
  { k: 'skills', v: 'work it can take', c: NX.violet },
  { k: 'address', v: 'where work arrives', c: NX.brandBright },
];

const NxWhatItIs: React.FC = () => {
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.sky} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(8)} color={NX.sky}>What enrolling means</NxEyebrow>
        <div style={{ ...rise(34), fontFamily: NX_SERIF, fontSize: 66, color: NX.text, marginTop: 26, textAlign: 'center', maxWidth: 1440, lineHeight: 1.3 }}>
          An identity the network can <span style={{ color: NX.sky, fontStyle: 'italic' }}>verify</span>.
        </div>
        <div style={{ display: 'flex', gap: 22, marginTop: 66 }}>
          {PARTS.map((p, i) => (
            <div key={p.k} style={{ ...rise(110 + i * 30), width: 330, padding: '30px 26px', borderRadius: 18, border: `1px solid ${NX.border}`, background: NX.panel, textAlign: 'center' }}>
              <div style={{ fontFamily: NX_MONO, fontSize: 34, color: p.c, letterSpacing: 1 }}>{p.k}</div>
              <div style={{ fontFamily: NX_SANS, fontSize: 24, color: NX.muted, marginTop: 12, lineHeight: 1.4 }}>{p.v}</div>
            </div>
          ))}
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default NxWhatItIs;
