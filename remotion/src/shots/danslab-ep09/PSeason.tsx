import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { SeasonWall } from '../../lib/ep09kit';

// Ep09 36 — the season wall. VO 0.8s (20.0s), long hold.
export const compositionConfig = { id: 'PSeason', durationInSeconds: 36, fps: 30, width: 1920, height: 1080 };

const PSeason: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="09" label="FINALE // NINE STORIES" />

      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={12} size={46}>Nine stories. <span style={{ color: DL.gold }}>One company.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 240, left: 0, right: 0 }}>
        <SeasonWall at={50} cols={3} w={420} items={[
          { img: 'projects/danslab-ep07/ep01a.png', no: 'NO. 01', name: 'The Origin' },
          { img: 'projects/danslab-ep07/ep02a.png', no: 'NO. 02', name: 'The Survivors' },
          { img: 'projects/danslab-ep07/ep03a.png', no: 'NO. 03', name: 'The Trader' },
          { img: 'projects/danslab-ep07/ep04a.png', no: 'NO. 04', name: 'The Overseer' },
          { img: 'projects/danslab-ep07/ep05a.png', no: 'NO. 05', name: 'The Brain' },
          { img: 'projects/danslab-ep07/ep06a.png', no: 'NO. 06', name: 'The Marketplace' },
          { img: 'projects/danslab-ep09/ep07a.png', no: 'NO. 07', name: 'The Factory' },
          { img: 'projects/danslab-ep09/ep08a.png', no: 'NO. 08', name: 'The Studio' },
          { img: '', no: 'NO. 09', name: 'The Player' },
        ]} />
      </div>
    </AbsoluteFill>
  );
};
export default PSeason;
