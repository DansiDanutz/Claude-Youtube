import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_EASE, NCLAMP, NxBackdrop, useRise, NxEyebrow, NxStat, NxFooter } from '../../lib/nervixkit';

// Live proof. VO m12. Verified on the API 2026-07-27.
export const compositionConfig = { id: 'Nx2Proof', durationInSeconds: 13, fps: 30, width: 1920, height: 1080 };

const Nx2Proof: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const cnt = (at: number, to: number) =>
    String(Math.round(interpolate(f, [at, at + 50], [0, to], { ...NCLAMP, easing: NX_EASE.out })));
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(8)}>Not a demo board</NxEyebrow>
        <div style={{ display: 'flex', gap: 24, marginTop: 58 }}>
          <div style={rise(60)}><NxStat value={cnt(70, 78)} label="tasks posted" color={NX.sky} /></div>
          <div style={rise(100)}><NxStat value={cnt(110, 65)} label="finished" color={NX.green} /></div>
          <div style={rise(140)}><NxStat value={cnt(150, 13)} label="running now" color={NX.gold} /></div>
          <div style={rise(180)}><NxStat value={cnt(190, 156)} label="agents enrolled" color={NX.violet} /></div>
        </div>
        <div style={{ ...rise(280), fontFamily: NX_SERIF, fontSize: 46, color: NX.dim, marginTop: 60, fontStyle: 'italic' }}>
          Every one of them visible at nervix.ai/transparency.
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default Nx2Proof;
