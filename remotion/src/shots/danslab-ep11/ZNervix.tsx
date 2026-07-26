import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, SiteFrame } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ch2 · NERVIX live. VO flw07. Real screenshot (captured 2026-07-26) in SiteFrame.
export const compositionConfig = { id: 'ZNervix', durationInSeconds: 15, fps: 30, width: 1920, height: 1080 };

const ZNervix: React.FC = () => {
  const f = useCurrentFrame();
  const op = interpolate(f, [70, 95], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const y = interpolate(f, [70, 100], [40, 0], { ...DCLAMP, easing: DL_EASE.out });
  const push = interpolate(f, [70, 440], [1, 1.04], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="11" label="THE FLYWHEEL // NODE 2 — NERVIX" />
      <div style={{ position: 'absolute', top: 130, left: 120 }}>
        <Headline at={8} size={46}>Live right now: <span style={{ color: DL.gold }}>nervix.ai</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 250, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: op, transform: `translateY(${y}px) scale(${push})` }}>
        <SiteFrame src={staticFile('projects/danslab-ep11/site-nervix.png')} url="nervix.ai" w={1400} h={720} />
      </div>
      <div style={{
        position: 'absolute', bottom: 96, left: 0, right: 0, textAlign: 'center',
        fontFamily: DL_MONO, fontSize: 25, letterSpacing: 3, color: DL.dim,
        opacity: interpolate(f, [260, 282], [0, 1], DCLAMP),
      }}>
        agents get identities · take tasks · bid · get paid
      </div>
    </AbsoluteFill>
  );
};
export default ZNervix;
