import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Stage, Row, Note, useRise, DL, DL_SERIF, DL_MONO } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH6 · not yet (dol23b — CONDITIONAL: only used if no outside payment arrived). The counter holds at $0.00;
// the outside-customer box flashes red. Fallback cue seconds until dol23b is voiced.
export const compositionConfig = { id: 'WFails', durationInSeconds: 14, fps: 30, width: 1920, height: 1080 };

const WFails: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const BOX = at('dol23b', 'paid', 1, 2.5);
  const blink = f >= BOX && Math.floor((f - BOX) / 9) % 2 === 0;
  return (
    <Stage label="NOT YET" glow={DL.red}>
      <div style={{ position: 'absolute', top: 150, left: 120, ...rise(voAt('dol23b')), fontFamily: DL_SERIF, fontSize: 70, color: DL.red }}>
        And — not yet.
      </div>
      <div style={{ position: 'absolute', top: 300, left: 120, ...rise(voAt('dol23b') + 10), fontFamily: DL_MONO, fontWeight: 700, fontSize: 120, color: DL.text }}>
        $0.00
      </div>
      <div style={{ position: 'absolute', top: 480, left: 120, width: 1000, opacity: blink ? 1 : 0.55 }}>
        <Row at={BOX} mark="no">A customer from outside</Row>
      </div>
      <div style={{ position: 'absolute', top: 640, left: 120, ...rise(at('dol23b', 'code', 1, 6.0)), fontFamily: DL_SERIF, fontSize: 44, color: DL.text }}>
        What's missing isn't code. <span style={{ color: DL.gold }}>It's a customer.</span>
      </div>
      <Note at={at('dol23b', 'honest', 1, 9.0)}>The honest result — and the job of the next episode.</Note>
    </Stage>
  );
};
export default WFails;
