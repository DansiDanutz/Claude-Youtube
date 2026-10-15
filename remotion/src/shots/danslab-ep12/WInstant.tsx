import React from 'react';
import { Stage, Title, Row, usePop, DL, DL_MONO } from '../../lib/ep12kit';
import { at } from '../../lib/ep12timing.gen';

// CH2 · sell the same day. VO dol11: no one to say yes; a link, sold that afternoon;
// "No application. No underwriting. No landlord." — each row lands on its word.
export const compositionConfig = { id: 'WInstant', durationInSeconds: 15.3, fps: 30, width: 1920, height: 1080 };

const WInstant: React.FC = () => {
  const pop = usePop();
  return (
    <Stage label="OUR OWN RAILS">
      <div style={{ position: 'absolute', top: 150, left: 120, width: 1600 }}>
        <Title at={at('dol11', 'build')} size={50}>When we build a product, we don't wait <span style={{ color: DL.gold }}>for anyone to say yes.</span></Title>
      </div>
      <div style={{ position: 'absolute', top: 360, left: 120, ...pop(at('dol11', 'link')) }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 34, color: DL.gold, border: `2px dashed ${DL.gold}`, borderRadius: 12, padding: '14px 26px' }}>
          a checkout link → on sale <span style={{ color: DL.text }}>that afternoon</span>
        </span>
      </div>
      <div style={{ position: 'absolute', top: 500, left: 120, width: 900, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Row at={at('dol11', 'application')} mark="no">No application</Row>
        <Row at={at('dol11', 'underwriting')} mark="no">No underwriting</Row>
        <Row at={at('dol11', 'landlord')} mark="no">No landlord</Row>
      </div>
    </Stage>
  );
};
export default WInstant;
