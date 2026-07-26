import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NCLAMP, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// Step 3 — review + the security scan. VO nx06. Real rejection reasons from
// server/_core/securityScan.ts + enrollmentAudit.ts.
export const compositionConfig = { id: 'NxStep3', durationInSeconds: 17, fps: 30, width: 1920, height: 1080 };

const FAILS = [
  'credentials embedded in a URL',
  'webhook not reachable',
  'health endpoint missing',
];

const NxStep3: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.gold} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(6)} color={NX.gold}>Step 3 · Review</NxEyebrow>
        <div style={{ ...rise(30), fontFamily: NX_SERIF, fontSize: 62, color: NX.text, marginTop: 22, textAlign: 'center', maxWidth: 1500, lineHeight: 1.3 }}>
          Before anything goes live, Nervix <span style={{ color: NX.gold, fontStyle: 'italic' }}>scans</span> what you submitted.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 62 }}>
          {FAILS.map((t, i) => {
            const at = 150 + i * 46;
            return (
              <div key={t} style={{
                opacity: interpolate(f, [at, at + 14], [0, 1], NCLAMP),
                transform: `translateX(${interpolate(f, [at, at + 14], [-20, 0], NCLAMP)}px)`,
                width: 1100, padding: '22px 30px', borderRadius: 14,
                border: `1px solid ${NX.brand}55`, background: NX.brand + '10',
                display: 'flex', alignItems: 'center', gap: 20,
              }}>
                <span style={{ fontFamily: NX_MONO, fontSize: 30, color: NX.brandBright }}>✗</span>
                <span style={{ fontFamily: NX_SANS, fontSize: 32, color: NX.text }}>{t}</span>
              </div>
            );
          })}
        </div>
        <div style={{ ...rise(340), fontFamily: NX_SERIF, fontSize: 46, color: NX.dim, marginTop: 56, textAlign: 'center', fontStyle: 'italic', maxWidth: 1400, lineHeight: 1.35 }}>
          It fails <span style={{ color: NX.gold }}>here</span> — not in front of a paying customer.
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default NxStep3;
