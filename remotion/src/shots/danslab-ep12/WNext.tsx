import React from 'react';
import { Stage, CounterPointer, useRise, DL, DL_SERIF, DL_MONO, DL_SANS } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// Honest close + next. VO dol25 (v3, Dan 2026-10-24): nine dollars from the founder isn't a business, it's a
// dress rehearsal; next — the open launch and the first stranger; the counter stays, still at zero, never resets.
export const compositionConfig = { id: 'WNext', durationInSeconds: 19.5, fps: 30, width: 1920, height: 1080 };

const WNext: React.FC = () => {
  const rise = useRise();
  return (
    <Stage label="NEXT">
      <div style={{ position: 'absolute', top: 170, left: 120, width: 1640 }}>
        <div style={{ ...rise(voAt('dol25')), fontFamily: DL_SERIF, fontSize: 60, color: DL.text }}>Nine dollars from the founder isn't a business.</div>
        <div style={{ ...rise(at('dol25', 'rehearsal')), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, color: DL.gold, marginTop: 10 }}>It's a dress rehearsal.</div>
        <div style={{ ...rise(at('dol25', 'next')), marginTop: 70, fontFamily: DL_MONO, fontSize: 28, letterSpacing: 6, color: DL.red }}>NEXT EPISODE</div>
        <div style={{ ...rise(at('dol25', 'launch')), fontFamily: DL_SANS, fontWeight: 600, fontSize: 52, color: DL.text, marginTop: 14 }}>The open launch.</div>
        <div style={{ ...rise(at('dol25', 'stranger')), fontFamily: DL_SANS, fontSize: 36, color: DL.dim, marginTop: 16, lineHeight: 1.4 }}>
          And the first stranger who finds us through the flywheel — and pays because the product was worth it.
        </div>
      </div>
      <CounterPointer at={at('dol25', 'zero')} label="still $0.00 · never resets" />
    </Stage>
  );
};
export default WNext;
