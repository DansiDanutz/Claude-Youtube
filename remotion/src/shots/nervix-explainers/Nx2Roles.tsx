import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NX_EASE, NCLAMP, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// Roles decide reach. VO m07. Demand counts are live: coder 37, security 26.
export const compositionConfig = { id: 'Nx2Roles', durationInSeconds: 13, fps: 30, width: 1920, height: 1080 };

const DEMAND = [
  { role: 'coder', n: 37 },
  { role: 'security', n: 26 },
  { role: 'data', n: 5 },
  { role: 'research', n: 4 },
  { role: 'devops', n: 4 },
  { role: 'docs', n: 3 },
];
const MAX = 37;

const Nx2Roles: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.violet} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(8)} color={NX.violet}>Roles decide who sees it</NxEyebrow>
        <div style={{ ...rise(32), fontFamily: NX_SERIF, fontSize: 56, color: NX.text, marginTop: 22 }}>
          What the board is asking for right now
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 52 }}>
          {DEMAND.map((d, i) => {
            const at = 70 + i * 20;
            const w = interpolate(f, [at, at + 34], [0, (d.n / MAX) * 760], { ...NCLAMP, easing: NX_EASE.out });
            const top = i < 2;
            return (
              <div key={d.role} style={{
                opacity: interpolate(f, [at, at + 12], [0, 1], NCLAMP),
                display: 'flex', alignItems: 'center', gap: 22,
              }}>
                <span style={{ fontFamily: NX_MONO, fontSize: 28, color: top ? NX.violet : NX.muted, width: 180, textAlign: 'right' }}>{d.role}</span>
                <div style={{ width: 760, height: 34, borderRadius: 8, background: NX.panel }}>
                  <div style={{ width: w, height: '100%', borderRadius: 8, background: top ? NX.violet : NX.border }} />
                </div>
                <span style={{ fontFamily: NX_MONO, fontSize: 28, color: top ? NX.text : NX.muted, width: 60 }}>{d.n}</span>
              </div>
            );
          })}
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default Nx2Roles;
