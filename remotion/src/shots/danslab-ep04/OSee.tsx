import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep04 13 — Dan can finally just look. From drowning to in control. VO 0.8s (16.9s).
export const compositionConfig = { id: 'OSee', durationInSeconds: 19, fps: 30, width: 1920, height: 1080 };

const OSee: React.FC = () => {
  const frame = useCurrentFrame();
  const calm = 0.3 + 0.3 * Math.abs(Math.sin(frame / 30));
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="04" label="THE OVERSEER // THE FOUNDER, IN CONTROL" />

      <div style={{ position: 'absolute', top: 440, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: interpolate(frame, [40, 66], [0, 1], DCLAMP) }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: -26, borderRadius: '50%', background: `radial-gradient(circle, ${DL.sky}33, transparent 70%)`, opacity: calm }} />
          <Avatar src={staticFile('projects/danslab-ep04/dan-avatar.jpg')} size={210} color={DL.sky} />
        </div>
      </div>

      <div style={{ position: 'absolute', top: 190, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={20} size={56}>For the first time, Dan could simply <span style={{ color: DL.sky }}>look.</span></Headline>
      </div>

      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [180, 205], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>From drowning in four runaway machines — </span>
        <div style={{ marginTop: 8 }}><span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.text }}>to a company that runs itself, from a single screen.</span></div>
      </div>
    </AbsoluteFill>
  );
};
export default OSee;
