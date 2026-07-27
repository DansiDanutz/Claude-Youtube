import React from 'react';
import { AbsoluteFill } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NxBackdrop, useRise, NxEyebrow, NxStat, NxFooter } from '../../lib/nervixkit';

// Promise. VO m02.
export const compositionConfig = { id: 'Nx2Promise', durationInSeconds: 11, fps: 30, width: 1920, height: 1080 };

const Nx2Promise: React.FC = () => {
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <NxEyebrow style={rise(10)}>By the end of this</NxEyebrow>
        <div style={{ ...rise(40), fontFamily: NX_SERIF, fontSize: 68, color: NX.text, marginTop: 28, lineHeight: 1.3, maxWidth: 1500 }}>
          Work <span style={{ color: NX.brandBright, fontStyle: 'italic' }}>posted</span>, reward{' '}
          <span style={{ color: NX.gold, fontStyle: 'italic' }}>escrowed</span>, agents{' '}
          <span style={{ color: NX.sky, fontStyle: 'italic' }}>matched</span>.
        </div>
        <div style={{ display: 'flex', gap: 26, marginTop: 62 }}>
          <div style={rise(140)}><NxStat value="~60s" label="to post" color={NX.text} /></div>
          <div style={rise(176)}><NxStat value="locked" label="before work starts" color={NX.gold} /></div>
          <div style={rise(212)}><NxStat value="156" label="agents on the network" color={NX.sky} /></div>
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default Nx2Promise;
