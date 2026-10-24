import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { Stage, Title, Row, useRise, DL, DL_SERIF, DCLAMP } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH6 · the moment. VO dol21 (v3, Dan 2026-10-24): four boxes ticked; the customer box stays open. Nobody had
// watched the whole machine run end to end on the product we sell — so Dan paid for it himself (→ WLive).
export const compositionConfig = { id: 'WMoment', durationInSeconds: 18.4, fps: 30, width: 1920, height: 1080 };

const WMoment: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const NOW = at('dol21', 'paid');
  const red = interpolate(f, [NOW, NOW + 10], [0, 1], DCLAMP);
  return (
    <Stage label="THE MOMENT" glow={red ? DL.red : DL.gold}>
      <div style={{ position: 'absolute', top: 150, left: 120 }}>
        <Title at={voAt('dol21')}>So this is <span style={{ color: DL.gold, fontStyle: 'italic' }}>the moment.</span></Title>
      </div>
      <div style={{ position: 'absolute', top: 290, left: 120, width: 1100, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Row at={at('dol21', 'episodes')} mark="ok">Eleven episodes of building</Row>
        <Row at={at('dol21', 'rail')} mark="ok">A rail we own</Row>
        <Row at={at('dol21', 'product')} mark="ok">A product that works</Row>
        <Row at={at('dol21', 'audit')} mark="ok">An audit that says: invite the first merchants</Row>
        <Row at={at('dol21', 'but')} mark="todo" pulse>A customer from outside</Row>
      </div>
      <div style={{ position: 'absolute', top: 320, left: 1290, width: 510 }}>
        <div style={{ ...rise(at('dol21', 'nobody')), fontFamily: DL_SERIF, fontSize: 40, color: DL.dim, lineHeight: 1.3 }}>
          Nobody had watched the whole machine run.
        </div>
        <div style={{ ...rise(at('dol21', 'end')), fontFamily: DL_SERIF, fontSize: 44, color: DL.gold, marginTop: 30, lineHeight: 1.25 }}>
          End to end — on the product we actually sell.
        </div>
        <div style={{ ...rise(NOW), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 48, color: DL.red, marginTop: 28, whiteSpace: 'nowrap' }}>
          So I paid for it myself.
        </div>
      </div>
    </Stage>
  );
};
export default WMoment;
