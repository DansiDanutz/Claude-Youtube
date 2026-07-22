import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { FilmStrip } from '../../lib/ep07kit';

// Ep08 1 — recap: the whole company lives in the cloud... every cloud has a
// ground floor. VO 0.8s (28.6s).
export const compositionConfig = { id: 'StRecap', durationInSeconds: 32, fps: 30, width: 1920, height: 1080 };

const A = ['ep02a', 'ep03a', 'ep04a', 'ep05a', 'ep06a', 'ep06b'].map((n) => staticFile(`projects/danslab-ep07/${n}.png`));
const B = ['ep05b', 'ep04b', 'ep03b', 'ep02b', 'ep01a', 'ep01b'].map((n) => staticFile(`projects/danslab-ep07/${n}.png`));

const StRecap: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="08" label="PREVIOUSLY // A COMPANY IN THE CLOUD" />

      <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center', zIndex: 3 }}>
        <Headline at={20} size={50}>Trader. Overseer. Brain. Marketplace. Factory.</Headline>
        <div style={{ marginTop: 8, fontFamily: DL_SANS, fontSize: 30, color: DL.dim }}>All of it — rented metal, far away, in somebody else&rsquo;s building.</div>
      </div>

      <div style={{ position: 'absolute', top: 340, left: 0, right: 0 }}>
        <FilmStrip items={A} at={60} h={220} speed={1.0} />
      </div>
      <div style={{ position: 'absolute', top: 590, left: 0, right: 0 }}>
        <FilmStrip items={B} at={90} h={220} speed={-0.8} />
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', zIndex: 3, opacity: interpolate(frame, [620, 650], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 48, color: DL.warm }}>Here is the thing about clouds. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 48, color: DL.gold }}>Every one has a ground floor.</span>
      </div>
    </AbsoluteFill>
  );
};
export default StRecap;
