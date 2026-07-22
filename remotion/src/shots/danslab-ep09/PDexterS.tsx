import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 14 — Dexter, the third door. VO 0.8s (18.8s).
export const compositionConfig = { id: 'PDexterS', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const PDexterS: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="09" label="THE SCHOOLS // THE THIRD DOOR" />

      <div style={{ position: 'absolute', top: 300, left: 200, textAlign: 'center', opacity: interpolate(frame, [50, 76], [0, 1], DCLAMP) }}>
        <Avatar src={staticFile('projects/danslab-ep09/dexter.jpg')} size={250} color={DL.green} />
        <div style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.text, marginTop: 14 }}>Dexter</div>
        <div style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.green }}>survived the night</div>
      </div>

      <div style={{ position: 'absolute', top: 250, right: 170, width: 820 }}>
        <Headline at={16} size={48}>Security first. <span style={{ color: DL.green }}>The boring thing, done before the exciting thing.</span></Headline>
        <div style={{ marginTop: 30, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 38, color: DL.warm, lineHeight: 1.45, opacity: interpolate(frame, [200, 228], [0, 1], DCLAMP) }}>
          Dexter survived, then healed the other two.<br />A company born out of a lesson that was bought, not taught.
        </div>
        <div style={{ marginTop: 30, fontFamily: DL_SANS, fontSize: 28, color: DL.dim, opacity: interpolate(frame, [420, 450], [0, 1], DCLAMP) }}>
          Every empire in this series stands on two hacked servers — and Dan would be the first to tell you.
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default PDexterS;
