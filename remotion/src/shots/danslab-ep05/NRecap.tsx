import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, HermesLogo } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep05 1 — recap: Paperclip could see, but seeing ≠ deciding. Enter Hermes.
// VO 0.8s (18.8s).
export const compositionConfig = { id: 'NRecap', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const NRecap: React.FC = () => {
  const frame = useCurrentFrame();
  const revealAt = 330;
  const hOp = interpolate(frame, [revealAt, revealAt + 24], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="05" label="PREVIOUSLY // PAPERCLIP COULD SEE" />

      <div style={{ position: 'absolute', top: 230, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={26} size={56}>It could see everything. Assign everything.</Headline>
        <div style={{ marginTop: 12 }}><Headline at={70} size={56} italic color={DL.warm}>But seeing is not <span style={{ color: DL.sky }}>understanding.</span></Headline></div>
        <div style={{ marginTop: 24 }}><Headline at={150} size={40} color={DL.dim}>A dashboard doesn&rsquo;t have opinions. It doesn&rsquo;t decide what matters.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 560, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: hOp }}>
        <HermesLogo size={170} start={revealAt} />
        <div style={{ marginTop: 20, fontFamily: DL_SERIF, fontSize: 56, color: DL.text }}>For that, a company needs a <span style={{ fontStyle: 'italic', color: DL.sky }}>mind.</span></div>
        <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 5, color: DL.red, marginTop: 8 }}>ITS NAME IS HERMES</div>
      </div>
    </AbsoluteFill>
  );
};
export default NRecap;
