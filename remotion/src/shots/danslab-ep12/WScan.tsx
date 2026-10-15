import React from 'react';
import { staticFile } from 'remotion';
import { SiteFrame } from '../../lib/danslab';
import { Stage, Title, useRise, DL, DL_MONO, DL_SANS } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH4 · the customer side. VO dol18. Real capture: the live NervixPay checkout from the 26 Sep 2026
// exchange test (3 USDC on Polygon) — labelled as a test. The RAIL segments light in WHudTop on these cues.
export const compositionConfig = { id: 'WScan', durationInSeconds: 22.3, fps: 30, width: 1920, height: 1080 };

const STEPS: [string, string][] = [
  ['Pick a coin + a network', 'picks'], ['Scan', 'scans'], ['Confirm in their own wallet', 'confirms'],
  ['NervixPay reads the chain itself', 'chain'], ['Exact amount found → paid', 'paid'], ['Already in the merchant\'s wallet', 'belongs'],
];

const WScan: React.FC = () => {
  const rise = useRise();
  return (
    <Stage label="HOW IT WORKS" kickerRight={960}>
      <div style={{ position: 'absolute', top: 140, left: 120 }}>
        <Title at={voAt('dol18')} size={48}>The customer <span style={{ color: DL.gold, fontStyle: 'italic' }}>pays.</span></Title>
      </div>
      <div style={{ position: 'absolute', top: 250, left: 120, ...rise(voAt('dol18'), 40, 22) }}>
        <div>
          <SiteFrame src={staticFile('projects/danslab-ep12/checkout-exchange-test-3usdc.png')} url="nervixpay.live · checkout" w={1000} h={600} />
        </div>
        <div style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.faint, marginTop: 12 }}>real checkout · 26 Sep 2026 test payment</div>
      </div>
      <div style={{ position: 'absolute', top: 280, left: 1200, width: 640, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {STEPS.map(([t, cue], i) => (
          <div key={t} style={{ ...rise(at('dol18', cue)), display: 'flex', alignItems: 'baseline', gap: 20 }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.red }}>0{i + 1}</span>
            <span style={{ fontFamily: DL_SANS, fontSize: 32, color: i >= 4 ? DL.gold : DL.text, lineHeight: 1.25 }}>{t}</span>
          </div>
        ))}
        <div style={{ ...rise(at('dol18', 'segments')), fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: DL.green, marginTop: 10 }}>FOUR SEGMENTS. LIT.</div>
      </div>
    </Stage>
  );
};
export default WScan;
