import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { Stage, Title, useRise, DL, DL_SERIF, DCLAMP } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH0 payoff. VO dol07: the rebuild is why the payment rail got finished — "not another product,
// the way every product gets paid."
export const compositionConfig = { id: 'WWhy', durationInSeconds: 12.8, fps: 30, width: 1920, height: 1080 };

const WWhy: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const strike = interpolate(f, [at('dol07', 'way'), at('dol07', 'way') + 12], [0, 1], DCLAMP);
  return (
    <Stage label="WHAT CHANGED">
      <div style={{ position: 'absolute', top: 200, left: 120, width: 1600 }}>
        <Title at={voAt('dol07')} size={50}>That rebuild is how the next thing got finished <span style={{ color: DL.gold }}>so fast.</span></Title>
        <div style={{ ...rise(at('dol07', "isn't")), marginTop: 90, position: 'relative', display: 'inline-block' }}>
          <span style={{ fontFamily: DL_SERIF, fontSize: 76, color: DL.muted }}>Not another product.</span>
          <div style={{ position: 'absolute', left: 0, top: '54%', height: 5, width: `${strike * 100}%`, background: DL.red }} />
        </div>
        <div style={{ ...rise(at('dol07', 'way')), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 92, color: DL.gold, marginTop: 20 }}>
          The way every product gets paid.
        </div>
      </div>
    </Stage>
  );
};
export default WWhy;
