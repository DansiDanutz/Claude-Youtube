import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 33 — the thesis. VO 0.8s (22.0s).
export const compositionConfig = { id: 'PThesis', durationInSeconds: 28, fps: 30, width: 1920, height: 1080 };

const PThesis: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="09" label="THE PLAYER // THE BET BEHIND THE BETS" />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 200px', textAlign: 'center' }}>
        <div>
          <Headline at={16} size={62}>By 2027, the interesting companies will not be measured <span style={{ color: DL.sky }}>by headcount.</span></Headline>
          <div style={{ marginTop: 30, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm, lineHeight: 1.45, opacity: interpolate(frame, [86, 110], [0, 1], DCLAMP) }}>They will be measured by how much one operator, plus a named fleet, can coordinate.</div>
        </div>
      </AbsoluteFill>
      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [420, 446], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.gold }}>DansLab is the working prototype — and the playbook is written in public.</span>
      </div>
    </AbsoluteFill>
  );
};
export default PThesis;
