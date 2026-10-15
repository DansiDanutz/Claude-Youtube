import React from 'react';
import { AbsoluteFill, staticFile } from 'remotion';
import { ImageBackdrop } from '../../lib/ep10kit';
import { useRise, DL, DL_SERIF, DL_MONO, DL_SANS } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// Stakes. VO dol04: "And if it doesn't, you'll watch exactly why… Real numbers. Real failures. No staging."
export const compositionConfig = { id: 'WStakes', durationInSeconds: 9.4, fps: 30, width: 1920, height: 1080 };

const WStakes: React.FC = () => {
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <ImageBackdrop src={staticFile('projects/danslab-ep10/07-the-room.png')} dim={0.84} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ ...rise(voAt('dol04')), fontFamily: DL_MONO, fontSize: 26, letterSpacing: 10, color: DL.red }}>SAME RULE AS ALWAYS</div>
        <div style={{ ...rise(at('dol04', "doesn't")), fontFamily: DL_SERIF, fontSize: 70, color: DL.text, marginTop: 34 }}>
          And if it doesn't —
        </div>
        <div style={{ ...rise(at('dol04', 'watch')), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 70, color: DL.gold }}>
          you'll watch exactly why.
        </div>
        <div style={{ display: 'flex', gap: 46, marginTop: 56, fontFamily: DL_MONO, fontSize: 32, letterSpacing: 2 }}>
          <span style={{ ...rise(at('dol04', 'numbers')), color: DL.text }}>REAL NUMBERS.</span>
          <span style={{ ...rise(at('dol04', 'failures')), color: DL.text }}>REAL FAILURES.</span>
          <span style={{ ...rise(at('dol04', 'staging')), color: DL.red }}>NO STAGING.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default WStakes;
