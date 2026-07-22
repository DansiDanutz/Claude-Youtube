import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep08 4 — meet David, the resident. VO 0.8s (12.3s).
export const compositionConfig = { id: 'StDavid', durationInSeconds: 15, fps: 30, width: 1920, height: 1080 };

const StDavid: React.FC = () => {
  const frame = useCurrentFrame();
  const cardOp = interpolate(frame, [110, 136], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="08" label="THE RIGHT HAND // THE RESIDENT" />

      <div style={{ position: 'absolute', top: 180, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>This machine is not empty.</Headline>
      </div>

      <div style={{ position: 'absolute', top: 390, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60 }}>
        <div style={{ textAlign: 'center', opacity: interpolate(frame, [56, 80], [0, 1], DCLAMP) }}>
          <Avatar src={staticFile('projects/danslab-ep08/david.jpg')} size={220} color={DL.green} />
          <div style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.text, marginTop: 14 }}>David</div>
          <div style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.green }}>resident · mac studio</div>
        </div>

        <div style={{ opacity: cardOp, background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `3px solid ${DL.green}`, borderRadius: 18, padding: '34px 44px', maxWidth: 640 }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 3, color: DL.faint }}>NOT A DROPLET · NOT RENTED</div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 44, color: DL.text, marginTop: 12, lineHeight: 1.25 }}>Lives on the Mac itself —<br />at arm&rsquo;s length from the founder.</div>
          <div style={{ marginTop: 14, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 32, color: DL.gold }}>The right hand.</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default StDavid;
