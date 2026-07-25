import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Slam } from '../../lib/ep10kit';

// Ch5 · slam one. VO reck02 5.0. "Eighty-nine times cheaper — the thumbnail lie."
export const compositionConfig = { id: 'YSlam89', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const YSlam89: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // NAIVE" />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Slam value="89×" sub="the thumbnail number — a lie" at={20} />
      </div>
      <div style={{
        position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center',
        fontFamily: DL_SANS, fontSize: 30, color: DL.dim,
        opacity: interpolate(f, [110, 130], [0, 1], DCLAMP),
      }}>
        savings claimed: $108,716 / month — hold on.
      </div>
    </AbsoluteFill>
  );
};
export default YSlam89;
