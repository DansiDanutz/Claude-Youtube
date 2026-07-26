import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NCLAMP, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// Step 2 — identity + roles + webhook. VO nx05. Roles are the live ten.
export const compositionConfig = { id: 'NxStep2', durationInSeconds: 13, fps: 30, width: 1920, height: 1080 };

const ROLES = ['devops', 'coder', 'qa', 'security', 'data', 'deploy', 'monitor', 'research', 'docs', 'orchestrator'];

const NxStep2: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.violet} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(6)} color={NX.violet}>Step 2 · Agent info</NxEyebrow>
        <div style={{ ...rise(30), fontFamily: NX_SERIF, fontSize: 60, color: NX.text, marginTop: 22 }}>Who your agent is.</div>

        <div style={{ ...rise(90), marginTop: 52, width: 1300, padding: '26px 32px', borderRadius: 16, border: `1px solid ${NX.border}`, background: NX.panel, display: 'flex', alignItems: 'center', gap: 22 }}>
          <span style={{ fontFamily: NX_MONO, fontSize: 24, color: NX.muted, letterSpacing: 2, width: 130 }}>NAME</span>
          <span style={{ fontFamily: NX_SANS, fontSize: 34, color: NX.text }}>my-first-agent</span>
        </div>

        <div style={{ ...rise(150), marginTop: 20, width: 1300, padding: '26px 32px', borderRadius: 16, border: `1px solid ${NX.border}`, background: NX.panel }}>
          <div style={{ fontFamily: NX_MONO, fontSize: 24, color: NX.muted, letterSpacing: 2 }}>ROLES · pick what it can do</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16 }}>
            {ROLES.map((r, i) => {
              const at = 180 + i * 9;
              const on = i < 3; // this agent claims the first three
              return (
                <span key={r} style={{
                  opacity: interpolate(f, [at, at + 10], [0, 1], NCLAMP),
                  padding: '10px 20px', borderRadius: 999,
                  border: `1px solid ${on ? NX.violet : NX.border}`,
                  background: on ? NX.violet + '1f' : 'transparent',
                  fontFamily: NX_MONO, fontSize: 24, color: on ? NX.violet : NX.muted,
                }}>{r}</span>
              );
            })}
          </div>
        </div>

        <div style={{ ...rise(300), marginTop: 20, width: 1300, padding: '26px 32px', borderRadius: 16, border: `1px solid ${NX.brand}55`, background: NX.brand + '10', display: 'flex', alignItems: 'center', gap: 22 }}>
          <span style={{ fontFamily: NX_MONO, fontSize: 24, color: NX.brandBright, letterSpacing: 2, width: 130 }}>WEBHOOK</span>
          <span style={{ fontFamily: NX_MONO, fontSize: 30, color: NX.text }}>https://my-agent.example/hook</span>
        </div>
        <div style={{ ...rise(360), fontFamily: NX_SANS, fontSize: 30, color: NX.dim, marginTop: 26 }}>
          The address where tasks get delivered.
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default NxStep2;
