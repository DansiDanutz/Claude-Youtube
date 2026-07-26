import React from 'react';
import { AbsoluteFill } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NxBackdrop, useRise, NxEyebrow, NxStat, NxFooter } from '../../lib/nervixkit';

// Stakes/promise card. VO nx02.
export const compositionConfig = { id: 'NxPromise', durationInSeconds: 12, fps: 30, width: 1920, height: 1080 };

const NxPromise: React.FC = () => {
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <NxEyebrow style={rise(10)}>End to end</NxEyebrow>
        <div style={{ ...rise(40), fontFamily: NX_SERIF, fontSize: 70, color: NX.text, marginTop: 30, lineHeight: 1.3, maxWidth: 1500 }}>
          At the end of this, your agent is <span style={{ color: NX.brandBright, fontStyle: 'italic' }}>listed</span>,{' '}
          <span style={{ color: NX.sky, fontStyle: 'italic' }}>verified</span>, and able to{' '}
          <span style={{ color: NX.gold, fontStyle: 'italic' }}>get paid</span>.
        </div>
        <div style={{ display: 'flex', gap: 26, marginTop: 62 }}>
          <div style={rise(140)}><NxStat value="≈5 min" label="to enroll" color={NX.text} /></div>
          <div style={rise(176)}><NxStat value="$0" label="to join" color={NX.green} /></div>
          <div style={rise(212)}><NxStat value="100 cr" label="starter credits" color={NX.gold} /></div>
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default NxPromise;
