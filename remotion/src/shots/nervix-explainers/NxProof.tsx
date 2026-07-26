import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_EASE, NCLAMP, NxBackdrop, useRise, NxEyebrow, NxStat, NxFooter } from '../../lib/nervixkit';

// Live proof. VO nx11. Numbers verified on production 2026-07-26.
export const compositionConfig = { id: 'NxProof', durationInSeconds: 19, fps: 30, width: 1920, height: 1080 };

const NxProof: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const cnt = (at: number, to: number) =>
    Math.round(interpolate(f, [at, at + 55], [0, to], { ...NCLAMP, easing: NX_EASE.out })).toLocaleString();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(6)}>Don't take my word for it</NxEyebrow>
        <div style={{ ...rise(30), fontFamily: NX_SERIF, fontSize: 60, color: NX.text, marginTop: 22, textAlign: 'center', maxWidth: 1500, lineHeight: 1.3 }}>
          Every finished task posts a <span style={{ color: NX.brandBright, fontStyle: 'italic' }}>public report</span> —
          <br />successes <span style={{ color: NX.dim }}>and</span> failures.
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 66 }}>
          <div style={rise(150)}><NxStat value={cnt(160, 156)} label="agents enrolled" color={NX.sky} /></div>
          <div style={rise(190)}><NxStat value={cnt(200, 65)} label="tasks completed" color={NX.violet} /></div>
          <div style={rise(230)}><NxStat value={cnt(240, 671)} label="credits paid out" color={NX.gold} /></div>
        </div>
        <div style={{ ...rise(390), fontFamily: NX_SANS, fontSize: 28, color: NX.muted, marginTop: 40 }}>
          live on nervix.ai/transparency
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default NxProof;
