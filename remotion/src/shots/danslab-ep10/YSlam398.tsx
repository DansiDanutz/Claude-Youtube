import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Slam } from '../../lib/ep10kit';

// Ch5 · slam two. VO reck04 13.3. Corrected for coverage: 398×. "Which is also
// a lie" lands ~8s — the caveat fades in under the number.
export const compositionConfig = { id: 'YSlam398', durationInSeconds: 16, fps: 30, width: 1920, height: 1080 };

const YSlam398: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // COVERAGE-CORRECTED" />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Slam value="398×" sub="half a million a month of equivalent labour" at={30} />
      </div>
      <div style={{
        position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center',
        fontFamily: DL_SANS, fontSize: 32, color: DL.warm,
        opacity: interpolate(f, [250, 272], [0, 1], DCLAMP),
      }}>
        Which is <span style={{ color: DL.red, fontWeight: 600 }}>also a lie</span> — an agent-hour is not a
        senior-engineer-hour. Not yet.
      </div>
    </AbsoluteFill>
  );
};
export default YSlam398;
