import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { WebShot } from '../../lib/ep05kit';

// Ep06 2 — who Dan is. REAL DansLab site + profile. Before the agents: a poker
// player. VO 0.8s (19.9s).
export const compositionConfig = { id: 'MDan', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const MDan: React.FC = () => {
  const frame = useCurrentFrame();
  const shot2 = interpolate(frame, [300, 320], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="06" label="THE PLAYER // MEET DAN SEMENESCU" />

      {/* first: DansLab site */}
      <div style={{ position: 'absolute', top: 190, left: 120, transform: 'scale(0.62)', transformOrigin: 'top left', opacity: interpolate(frame, [40, 66], [0, 1], DCLAMP) }}>
        <WebShot src={staticFile('projects/danslab-ep06/danslab-hero.png')} url="danslab.vercel.app" at={40}
          path={[{ t: 0, x: 680, y: 400 }, { t: 60, x: 700, y: 300 }, { t: 120, x: 400, y: 620 }]} clicks={[{ t: 120, x: 400, y: 620 }]} />
      </div>

      {/* second: Dan profile, slides in over */}
      <div style={{ position: 'absolute', top: 320, right: 120, transform: 'scale(0.6)', transformOrigin: 'top right', opacity: shot2 }}>
        <WebShot src={staticFile('projects/danslab-ep06/dan-profile.png')} url="dansemenescu.vercel.app" at={300}
          path={[{ t: 0, x: 680, y: 350 }, { t: 70, x: 500, y: 260 }]} />
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [440, 462], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.dim }}>On paper, a builder of AI fleets. But long before the agents — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.gold }}>Dan was a poker player.</span>
      </div>
    </AbsoluteFill>
  );
};
export default MDan;
