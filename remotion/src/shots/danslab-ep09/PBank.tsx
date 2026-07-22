import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 3b — the bank irony. VO 0.8s (18.1s).
export const compositionConfig = { id: 'PBank', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const PBank: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="09" label="THE TABLE // THE ADDRESS" />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 200px', textAlign: 'center' }}>
        <div>
          <Headline at={20} size={62}>The building used to be <span style={{ color: DL.gold }}>a bank.</span></Headline>
          <div style={{ marginTop: 30, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm, lineHeight: 1.45, opacity: interpolate(frame, [90, 114], [0, 1], DCLAMP) }}>A century guarding money. Now the vault is a workshop — and the thing compounding upstairs is knowledge.</div>
        </div>
      </AbsoluteFill>
      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [380, 406], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.gold }}>The neighbourhood never noticed the upgrade.</span>
      </div>
    </AbsoluteFill>
  );
};
export default PBank;
