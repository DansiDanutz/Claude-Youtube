import React from 'react';
import { staticFile, useCurrentFrame, interpolate } from 'remotion';
import { SiteFrame } from '../../lib/danslab';
import { Stage, Title, Chip, Note, useRise, DL, DCLAMP } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH2 · our own rails. VO dol10. Real capture of nervixpay.live (promo capture, hero) in SiteFrame.
// Claims on the chips are the site's own: non-custodial, can't freeze/move funds, on-chain verification.
export const compositionConfig = { id: 'WOwnRail', durationInSeconds: 20.5, fps: 30, width: 1920, height: 1080 };

const WOwnRail: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const IN = at('dol10', 'nervix');
  const push = interpolate(f, [IN, IN + 500], [1, 1.035], DCLAMP);
  return (
    <Stage label="OUR OWN RAILS">
      <div style={{ position: 'absolute', top: 140, left: 120 }}>
        <Title at={voAt('dol10')} size={48}>So the fleet <span style={{ color: DL.gold, fontStyle: 'italic' }}>built its own.</span></Title>
      </div>
      <div style={{ position: 'absolute', top: 250, left: 120, ...rise(IN, 40, 22), transform: `scale(${push})`, transformOrigin: 'left top' }}>
        <SiteFrame src={staticFile('projects/danslab-ep12/landing-hero.png')} url="nervixpay.live" w={1060} h={560} />
      </div>
      <div style={{ position: 'absolute', top: 290, left: 1260, display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
        <Chip at={at('dol10', 'wallet', 1)} size={24}>direct to the merchant's wallet</Chip>
        <Chip at={at('dol10', 'never')} color={DL.text} size={24}>never holds the money</Chip>
        <Chip at={at('dol10', 'freeze')} color={DL.text} size={24}>can't freeze it</Chip>
        <Chip at={at('dol10', 'move')} color={DL.text} size={24}>can't move it</Chip>
      </div>
      <Note at={at('dol10', 'prove')}>One job: <span style={{ color: DL.gold }}>prove it on the blockchain itself.</span></Note>
    </Stage>
  );
};
export default WOwnRail;
