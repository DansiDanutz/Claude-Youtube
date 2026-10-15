import React from 'react';
import { Stage, useRise, DL, DL_SERIF, DL_MONO, DL_SANS } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// Human beat. VO dol24: the fleet wrote, tested, audited, fixed — but deciding never to rent the cash
// register from somebody else was a human choice. The poker player. The ten percent, again (ep10/ep11 echo).
export const compositionConfig = { id: 'WHuman', durationInSeconds: 23.5, fps: 30, width: 1920, height: 1080 };

const WHuman: React.FC = () => {
  const rise = useRise();
  return (
    <Stage label="THE HUMAN PART">
      <div style={{ position: 'absolute', top: 170, left: 120, width: 1640 }}>
        <div style={{ display: 'flex', gap: 34, fontFamily: DL_MONO, fontSize: 32, color: DL.dim }}>
          <span style={rise(voAt('dol24'))}>WROTE IT.</span>
          <span style={rise(at('dol24', 'tested'))}>TESTED IT.</span>
          <span style={rise(at('dol24', 'audited'))}>AUDITED IT.</span>
          <span style={rise(at('dol24', 'fixed'))}>FIXED IT.</span>
        </div>
        <div style={{ ...rise(at('dol24', "couldn't")), fontFamily: DL_SANS, fontSize: 40, color: DL.text, marginTop: 50, lineHeight: 1.45 }}>
          But the fleet couldn't decide that this company would <span style={{ color: DL.gold, fontWeight: 600 }}>never rent its cash register</span> from somebody else.
        </div>
        <div style={{ ...rise(at('dol24', 'human')), fontFamily: DL_SERIF, fontSize: 64, color: DL.red, marginTop: 40 }}>That was a human choice.</div>
        <div style={{ ...rise(at('dol24', 'poker')), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm, marginTop: 26 }}>
          A poker player refusing a table where the house can change the rules mid-hand.
        </div>
        <div style={{ ...rise(at('dol24', '10')), fontFamily: DL_MONO, fontWeight: 700, fontSize: 46, letterSpacing: 4, color: DL.gold, marginTop: 40 }}>
          THE 10%. AGAIN.
        </div>
      </div>
    </Stage>
  );
};
export default WHuman;
