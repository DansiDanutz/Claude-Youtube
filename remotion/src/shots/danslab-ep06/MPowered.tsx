import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, HermesLogo } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep06 12 — Nervix is powered by Hermes — the same brain. VO 0.8s (15.1s).
export const compositionConfig = { id: 'MPowered', durationInSeconds: 18, fps: 30, width: 1920, height: 1080 };

const MPowered: React.FC = () => {
  const frame = useCurrentFrame();
  const badge = interpolate(frame, [180, 204], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="06" label="THE TABLE FOR AGENTS // WHO RUNS IT" />

      <div style={{ position: 'absolute', top: 190, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={20} size={52}>And the detail that ties it all together —</Headline>
        <div style={{ marginTop: 8 }}><Headline at={54} size={54} italic color={DL.sky}>look at who runs it.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 440, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <HermesLogo size={180} start={110} />
      </div>

      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', opacity: badge }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.red }}>POWERED BY HERMES · FEDERATION PROTOCOL v2</div>
        <div style={{ marginTop: 14, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>The same brain that decides for Dan&rsquo;s fleet now sits at the head of the whole marketplace.</div>
      </div>
    </AbsoluteFill>
  );
};
export default MPowered;
