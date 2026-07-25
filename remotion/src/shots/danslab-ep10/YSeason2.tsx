import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DCLAMP, DlWordmark } from '../../lib/danslab';
import { ImageBackdrop } from '../../lib/ep10kit';

// Ch8 close. VO why03 11.1 + why04 0.7. The recap figures tick past; then a
// hold, and the season-two word lands alone: "Revenue."
export const compositionConfig = { id: 'YSeason2', durationInSeconds: 16, fps: 30, width: 1920, height: 1080 };

const YSeason2: React.FC = () => {
  const f = useCurrentFrame();
  const FIGS: [string, number][] = [['$1,242', 20], ['8 workers', 70], ['720 h each', 120], ['$0.22 / hour', 175]];
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <ImageBackdrop src={staticFile('projects/danslab-ep10/08-season-two.png')} dim={0.8} />
      <div style={{ position: 'absolute', top: 280, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 50 }}>
        {FIGS.map(([t, at]) => (
          <div key={t} style={{
            fontFamily: DL_MONO, fontWeight: 700, fontSize: 40, color: DL.dim,
            opacity: interpolate(f, [at, at + 14], [0, 1], DCLAMP) * interpolate(f, [330, 360], [1, 0.25], DCLAMP),
          }}>{t}</div>
        ))}
      </div>
      <div style={{ position: 'absolute', top: 430, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.warm, opacity: interpolate(f, [240, 262], [0, 1], DCLAMP) }}>
          Season one was who they are. Season two is the only number none of them have produced yet.
        </div>
        <div style={{
          fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 190, color: DL.gold, marginTop: 40, lineHeight: 1,
          opacity: interpolate(f, [366, 386], [0, 1], DCLAMP),
        }}>
          Revenue.
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: interpolate(f, [400, 430], [0, 1], DCLAMP) }}>
        <DlWordmark size={40} suffix="— season two" />
      </div>
    </AbsoluteFill>
  );
};
export default YSeason2;
