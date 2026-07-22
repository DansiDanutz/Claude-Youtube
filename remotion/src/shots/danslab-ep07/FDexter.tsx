import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep07 2 — Dexter's assignment: build the YouTube pipeline. VO 0.8s (11.8s).
export const compositionConfig = { id: 'FDexter', durationInSeconds: 14, fps: 30, width: 1920, height: 1080 };

const FDexter: React.FC = () => {
  const frame = useCurrentFrame();
  const cardOp = interpolate(frame, [120, 146], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const stamp = interpolate(frame, [200, 218], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="07" label="THE MACHINE // DEXTER'S ASSIGNMENT" />

      <div style={{ position: 'absolute', top: 190, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={20} size={48}>When Dan handed out the jobs, Dexter got one.</Headline>
      </div>

      <div style={{ position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60 }}>
        <div style={{ textAlign: 'center', opacity: interpolate(frame, [60, 84], [0, 1], DCLAMP) }}>
          <Avatar src={staticFile('projects/danslab-ep07/dexter.jpg')} size={210} color={DL.green} />
          <div style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.faint, marginTop: 14 }}>Dexter</div>
          <div style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.green }}>chief of droplets</div>
        </div>

        <div style={{ opacity: cardOp, position: 'relative', background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 18, padding: '36px 48px', minWidth: 620 }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 3, color: DL.faint }}>ASSIGNMENT</div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 46, color: DL.text, marginTop: 12 }}>Build the YouTube pipeline.</div>
          <div style={{ fontFamily: DL_SANS, fontSize: 24, color: DL.dim, marginTop: 10 }}>A machine that makes the videos.</div>
          <div style={{ position: 'absolute', bottom: -18, right: -14, opacity: stamp, transform: `rotate(-9deg)`, border: `3px solid ${DL.green}`, borderRadius: 10, padding: '6px 18px', background: DL.bg }}>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: DL.green }}>ACCEPTED</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default FDexter;
