import React from 'react';
import { staticFile } from 'remotion';
import { SiteFrame } from '../../lib/danslab';
import { Stage, Title, useRise, DL, DL_MONO, DL_SANS } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH4 · the merchant side. VO dol17. Real capture: nervixpay.live "From order to on-chain confirmation in
// four steps". The top-right RAIL panel (WHudTop) is introduced on "that panel" — kicker stops short of it.
export const compositionConfig = { id: 'WSetup', durationInSeconds: 20.3, fps: 30, width: 1920, height: 1080 };

const STEPS: [string, string][] = [
  ['Sign in', 'signs'], ['Connect the wallet you already use', 'connects'], ['Sign once — no money moves', 'sign'],
  ['Create a product', 'create'], ['Get a link', 'get'],
];

const WSetup: React.FC = () => {
  const rise = useRise();
  return (
    <Stage label="HOW IT WORKS" kickerRight={960}>
      <div style={{ position: 'absolute', top: 140, left: 120 }}>
        <Title at={voAt('dol17')} size={48}>The rail, <span style={{ color: DL.gold, fontStyle: 'italic' }}>end to end.</span></Title>
      </div>
      <div style={{ position: 'absolute', top: 250, left: 120, ...rise(voAt('dol17') + 10, 40, 22) }}>
        <SiteFrame src={staticFile('projects/danslab-ep12/landing-how-it-works.png')} url="nervixpay.live · how it works" w={1000} h={600} />
      </div>
      <div style={{ position: 'absolute', top: 280, left: 1200, width: 620, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ ...rise(at('dol17', 'merchant')), fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DL.muted }}>THE MERCHANT</div>
        {STEPS.map(([t, cue], i) => (
          <div key={t} style={{ ...rise(at('dol17', cue)), display: 'flex', alignItems: 'baseline', gap: 20 }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.red }}>0{i + 1}</span>
            <span style={{ fontFamily: DL_SANS, fontSize: 30, color: i === 4 ? DL.gold : DL.text, lineHeight: 1.25 }}>{t}</span>
          </div>
        ))}
      </div>
    </Stage>
  );
};
export default WSetup;
