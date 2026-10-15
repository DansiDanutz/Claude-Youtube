import React from 'react';
import { Stage, Title, Row, Note, useRise, DL, DL_SERIF } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH3 · full honesty. VO dol16: what we still depend on. Fee facts: docs/payments-and-fees.md + fees.md
// (Starter $10 / 30 days; never a % of the sale). USDC issuer = Circle, USDT issuer = Tether.
export const compositionConfig = { id: 'WHonestDeps', durationInSeconds: 24.7, fps: 30, width: 1920, height: 1080 };

const WHonestDeps: React.FC = () => {
  const rise = useRise();
  return (
    <Stage label="FULL HONESTY">
      <div style={{ position: 'absolute', top: 150, left: 120, width: 1600 }}>
        <Title at={voAt('dol16')}>"No third party" <span style={{ color: DL.red, fontStyle: 'italic' }}>isn't perfectly true.</span></Title>
      </div>
      <div style={{ position: 'absolute', top: 300, left: 120, width: 1300, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Row at={at('dol16', 'blockchain')} mark="warn">The blockchain has to keep running</Row>
        <Row at={at('dol16', 'companies')} mark="warn">The companies that issue the coins — Circle (USDC) · Tether (USDT)</Row>
        <Row at={at('dol16', 'customers')} mark="warn">Customers pay a small network fee</Row>
        <Row at={at('dol16', 'flat')} mark="warn">Merchants pay a flat plan — $10 a month to start</Row>
      </div>
      <div style={{ position: 'absolute', top: 690, left: 120, ...rise(at('dol16', 'never')), fontFamily: DL_SERIF, fontSize: 56, color: DL.gold }}>
        Never a percentage of your sale.
      </div>
      <Note at={at('dol16', 'nobody')}>Nobody stands between the customer and the money.</Note>
    </Stage>
  );
};
export default WHonestDeps;
