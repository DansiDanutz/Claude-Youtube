import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 24 — point, approve, refuse. VO 0.8s (21.4s).
export const compositionConfig = { id: 'PApprove', durationInSeconds: 25, fps: 30, width: 1920, height: 1080 };

const PApprove: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="09" label="THE METHOD // THREE VERBS" />

      <div style={{ position: 'absolute', top: 170, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>His job fits in <span style={{ color: DL.gold }}>three verbs.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 330, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        {[['POINT', 'this is the build that matters today', 'DL.sky', 100], ['APPROVE', 'yes — ship it', 'DL.green', 170], ['REFUSE', 'no — this can wait', 'DL.red', 240]].map(([verb, sub, c, at]) => (
          <div key={String(verb)} style={{ opacity: interpolate(frame, [Number(at), Number(at) + 18], [0, 1], DCLAMP), display: 'flex', alignItems: 'baseline', gap: 34, width: 1000 }}>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 56, letterSpacing: 4, color: c === 'DL.sky' ? DL.sky : c === 'DL.green' ? DL.green : DL.red, width: 340 }}>{verb}</span>
            <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 38, color: DL.warm }}>{sub}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [460, 490], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>It sounds small. It is the hardest discipline </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.gold }}>in the building.</span>
      </div>
    </AbsoluteFill>
  );
};
export default PApprove;
