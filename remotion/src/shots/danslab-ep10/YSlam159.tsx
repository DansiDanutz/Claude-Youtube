import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Slam } from '../../lib/ep10kit';

// Ch5 close · the defensible number. VO reck06 19.4. 159× held; the supporting
// figures land on their words: ~$200k of labour ~9s, 22¢ vs $86 ~15s.
export const compositionConfig = { id: 'YSlam159', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const YSlam159: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // THE DEFENSIBLE NUMBER" />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 140 }}>
        <Slam value="159×" sub="the one I'll defend to anyone" at={30} />
      </div>
      <div style={{
        position: 'absolute', bottom: 150, left: 0, right: 0, textAlign: 'center',
        fontFamily: DL_SANS, fontSize: 30, color: DL.dim,
        opacity: interpolate(f, [280, 300], [0, 1], DCLAMP),
      }}>
        ~$198k/month of real, discounted, pessimistically-measured labour — for $1,242.
      </div>
      <div style={{
        position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center',
        fontFamily: DL_MONO, fontWeight: 700, fontSize: 34,
        opacity: interpolate(f, [470, 490], [0, 1], DCLAMP),
      }}>
        <span style={{ color: DL.gold }}>$0.22/h</span>
        <span style={{ color: DL.faint }}>  vs  </span>
        <span style={{ color: DL.red }}>$85.90/h</span>
      </div>
    </AbsoluteFill>
  );
};
export default YSlam159;
