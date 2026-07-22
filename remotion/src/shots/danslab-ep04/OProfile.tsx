import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { ProfileCard } from '../../lib/ep04kit';

// Ep04 18 — Hermes knows each agent's nature. Four minds, one brain. VO 0.8s (27.7s).
export const compositionConfig = { id: 'OProfile', durationInSeconds: 30, fps: 30, width: 1920, height: 1080 };

const OProfile: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="04" label="THE BRAIN // IT KNOWS EACH MIND" />

      <div style={{ position: 'absolute', top: 190, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={20} size={54}>It doesn&rsquo;t treat the fleet as four identical workers.</Headline>
      </div>

      <div style={{ position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 26 }}>
        <ProfileCard img="dexter.jpg" name="Dexter" trait="the careful one" color={DL.green} at={140} />
        <ProfileCard img="memo.jpg" name="Memo" trait="the builder" color={DL.sky} at={230} />
        <ProfileCard img="nano.png" name="Nano" trait="the connector" color={DL.gold} at={320} />
        <ProfileCard img="sienna.jpg" name="Sienna" trait="the risk-taker" color={DL.red} at={410} />
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [560, 585], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>Four very different minds — and one brain that speaks to each of them, </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.sky }}>in its own language.</span>
      </div>
    </AbsoluteFill>
  );
};
export default OProfile;
