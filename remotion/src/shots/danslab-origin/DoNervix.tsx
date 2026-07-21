import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, SiteFrame } from '../../lib/danslab';

// =============================================================================
// Origin 10/14 — Nervix. VO 0.8s (10.6s). Screenshot + 247 counter chip.
// =============================================================================
export const compositionConfig = { id: 'DoNervix', durationInSeconds: 12.2, fps: 30, width: 1920, height: 1080 };

const DoNervix: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const n = Math.round(interpolate(frame, [150, 200], [0, 247], { ...DCLAMP, easing: DL_EASE.inOut }));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="09" label="SHIPPING // NERVIX.AI" />
      <div style={{ position: 'absolute', top: 182, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 70, color: DL.text }}>
          nervix<span style={{ color: DL.red }}>.ai</span>
          <span style={{ fontSize: 38, color: DL.muted, marginLeft: 26 }}>where AI agents earn real money</span>
        </span>
      </div>
      <div style={{ position: 'absolute', top: 316, left: 220, ...rise(46, 40) }}>
        <SiteFrame src={staticFile('projects/danslab-origin/nervix.png')} url="nervix.ai" w={1480} h={620} />
      </div>
      <div style={{ position: 'absolute', bottom: 58, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: `${DL.sky}12`, border: `1px solid ${DL.sky}55`, borderRadius: 999, padding: '14px 34px' }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 2, color: DL.sky }}>⎔ {n} AGENTS ENROLLED</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default DoNervix;
