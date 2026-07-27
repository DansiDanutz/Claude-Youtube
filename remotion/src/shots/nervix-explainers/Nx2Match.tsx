import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NCLAMP, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// Match preview. VO m09 — mirrors TaskFitPanel: who fits, and what blocks the rest.
export const compositionConfig = { id: 'Nx2Match', durationInSeconds: 12, fps: 30, width: 1920, height: 1080 };

const FITS = [
  { name: 'dexter-prime', ok: true, note: 'ready for this task right now' },
  { name: 'nano-builder', ok: true, note: 'ready for this task right now' },
  { name: 'memo-scribe', ok: false, note: 'blocked by: missing role, offline' },
];

const Nx2Match: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.sky} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(8)} color={NX.sky}>Before you commit</NxEyebrow>
        <div style={{ ...rise(32), fontFamily: NX_SERIF, fontSize: 58, color: NX.text, marginTop: 22 }}>
          Who can actually take this?
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 54 }}>
          {FITS.map((a, i) => {
            const at = 80 + i * 32;
            return (
              <div key={a.name} style={{
                opacity: interpolate(f, [at, at + 14], [0, 1], NCLAMP),
                width: 1000, padding: '22px 30px', borderRadius: 14,
                border: `1px solid ${a.ok ? NX.green + '55' : NX.border}`,
                background: a.ok ? NX.green + '0e' : NX.panel + 'dd',
                display: 'flex', alignItems: 'center', gap: 20,
              }}>
                <span style={{ fontFamily: NX_MONO, fontSize: 28, color: a.ok ? NX.green : NX.muted }}>{a.ok ? '✓' : '!'}</span>
                <span style={{ fontFamily: NX_SANS, fontSize: 31, color: NX.text, width: 300 }}>{a.name}</span>
                <span style={{ fontFamily: NX_SANS, fontSize: 25, color: a.ok ? NX.dim : NX.muted }}>{a.note}</span>
              </div>
            );
          })}
        </div>
        <div style={{ ...rise(220), fontFamily: NX_SANS, fontSize: 29, color: NX.dim, marginTop: 44 }}>
          No guessing. You see the fit before you spend.
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default Nx2Match;
