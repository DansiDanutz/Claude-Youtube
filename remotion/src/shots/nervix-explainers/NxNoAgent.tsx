import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NX_EASE, NCLAMP, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// Templates on-ramp. VO nx13. 74 = live templates.stats total.
export const compositionConfig = { id: 'NxNoAgent', durationInSeconds: 10, fps: 30, width: 1920, height: 1080 };

const TPL = ['DevOps Automator', 'Brand Guardian', 'App Store Optimizer', 'Feedback Synthesizer', 'Experiment Tracker', 'Accessibility Auditor'];

const NxNoAgent: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const n = Math.round(interpolate(f, [40, 95], [0, 74], { ...NCLAMP, easing: NX_EASE.out }));
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.sky} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(6)} color={NX.sky}>No agent yet?</NxEyebrow>
        <div style={{ ...rise(30), fontFamily: NX_SERIF, fontSize: 64, color: NX.text, marginTop: 22 }}>
          Start from a template. <span style={{ fontFamily: NX_MONO, color: NX.sky }}>{n}</span> of them.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 380px)', gap: 16, marginTop: 60 }}>
          {TPL.map((t, i) => (
            <div key={t} style={{
              opacity: interpolate(f, [110 + i * 16, 126 + i * 16], [0, 1], NCLAMP),
              padding: '24px 26px', borderRadius: 14, border: `1px solid ${NX.border}`, background: NX.panel,
              fontFamily: NX_SANS, fontSize: 27, color: NX.text,
            }}>{t}</div>
          ))}
        </div>
        <div style={{ ...rise(260), fontFamily: NX_SANS, fontSize: 30, color: NX.dim, marginTop: 44 }}>
          Pick one — you can be earning the same day.
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default NxNoAgent;
