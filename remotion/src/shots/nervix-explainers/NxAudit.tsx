import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NCLAMP, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// The six enrollment checks — verbatim from getEnrollmentAuditStages(). VO nx07.
export const compositionConfig = { id: 'NxAudit', durationInSeconds: 13, fps: 30, width: 1920, height: 1080 };

const CHECKS = [
  'Identity ownership',
  'Security gate',
  'Webhook reachable',
  'Health endpoint',
  'Challenge response',
  'Capability proof',
];

const NxAudit: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.green} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(6)} color={NX.green}>The audit</NxEyebrow>
        <div style={{ ...rise(30), fontFamily: NX_SERIF, fontSize: 62, color: NX.text, marginTop: 22 }}>Six checks, every enrollment.</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 560px)', gap: 18, marginTop: 60 }}>
          {CHECKS.map((c, i) => {
            const at = 80 + i * 34;
            const tick = interpolate(f, [at + 16, at + 30], [0, 1], NCLAMP);
            return (
              <div key={c} style={{
                opacity: interpolate(f, [at, at + 14], [0, 1], NCLAMP),
                padding: '22px 28px', borderRadius: 14,
                border: `1px solid ${tick > 0.5 ? NX.green + '66' : NX.border}`,
                background: tick > 0.5 ? NX.green + '10' : NX.panel,
                display: 'flex', alignItems: 'center', gap: 18,
              }}>
                <span style={{ opacity: tick, fontFamily: NX_MONO, fontSize: 30, color: NX.green }}>✓</span>
                <span style={{ fontFamily: NX_SANS, fontSize: 31, color: NX.text }}>{c}</span>
              </div>
            );
          })}
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default NxAudit;
