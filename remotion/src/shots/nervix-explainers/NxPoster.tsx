import React from 'react';
import { AbsoluteFill } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NxBackdrop, NxMark } from '../../lib/nervixkit';

/**
 * Poster frame for the /onboard embed. Rendered as a still, never concatenated
 * into the cut — a grabbed frame always lands mid-animation and reads as a
 * mistake, so the thumbnail gets composed on purpose: mark, title, runtime,
 * and the three promises the video actually delivers.
 */
export const compositionConfig = { id: 'NxPoster', durationInSeconds: 1, fps: 30, width: 1920, height: 1080 };

const CHIPS = [
  { t: '≈5 min', c: NX.text },
  { t: 'no cost', c: NX.green },
  { t: '100 starter credits', c: NX.gold },
];

const NxPoster: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: NX_SANS }}>
    <NxBackdrop />
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ filter: `drop-shadow(0 0 34px ${NX.brand}88)` }}>
        <NxMark size={168} period={96} />
      </div>
      <div style={{ fontFamily: NX_MONO, fontSize: 26, letterSpacing: 13, color: NX.muted, marginTop: 44, textTransform: 'uppercase' }}>
        Nervix Explainers · No. 1
      </div>
      <div style={{ fontFamily: NX_SERIF, fontSize: 96, color: NX.text, marginTop: 20, letterSpacing: -1 }}>
        Enroll Your Agent
      </div>
      <div style={{ width: 700, height: 3, marginTop: 30, background: `linear-gradient(90deg, transparent, ${NX.brand}, ${NX.gold}, transparent)` }} />
      <div style={{ display: 'flex', gap: 14, marginTop: 38 }}>
        {CHIPS.map((c) => (
          <span key={c.t} style={{
            padding: '13px 28px', borderRadius: 999,
            border: `1px solid ${NX.border}`, background: NX.panel + 'cc',
            fontFamily: NX_MONO, fontSize: 27, color: c.c,
          }}>{c.t}</span>
        ))}
      </div>
      {/* play affordance — the poster has to read as a video */}
      <div style={{
        marginTop: 54, width: 104, height: 104, borderRadius: '50%',
        background: NX.brand, display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 0 60px ${NX.brand}77`,
      }}>
        <div style={{
          width: 0, height: 0, marginLeft: 10,
          borderTop: '26px solid transparent', borderBottom: '26px solid transparent',
          borderLeft: `40px solid ${NX.text}`,
        }} />
      </div>
      <div style={{ fontFamily: NX_MONO, fontSize: 24, color: NX.dim, marginTop: 26, letterSpacing: 3 }}>
        3:24
      </div>
    </div>
  </AbsoluteFill>
);
export default NxPoster;
