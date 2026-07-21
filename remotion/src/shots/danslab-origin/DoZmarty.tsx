import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, SiteFrame } from '../../lib/danslab';

// =============================================================================
// Origin 9/14 — Zmarty. VO 0.8s (11.3s). Screenshot + Sienna credit line.
// =============================================================================
export const compositionConfig = { id: 'DoZmarty', durationInSeconds: 13, fps: 30, width: 1920, height: 1080 };

const DoZmarty: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const lineOp = interpolate(frame, [230, 246], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="08" label="SHIPPING // ZMARTY.ME" />
      <div style={{ position: 'absolute', top: 182, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 70, color: DL.text }}>
          zmarty<span style={{ color: DL.red }}>.me</span>
          <span style={{ fontSize: 38, color: DL.muted, marginLeft: 26 }}>AI market intelligence for traders</span>
        </span>
      </div>
      <div style={{ position: 'absolute', top: 316, left: 220, ...rise(46, 40) }}>
        <SiteFrame src={staticFile('projects/danslab-origin/zmarty.png')} url="zmarty.me" w={1480} h={620} />
      </div>
      <div style={{ position: 'absolute', bottom: 66, left: 0, right: 0, textAlign: 'center', opacity: lineOp }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 38, color: DL.warm }}>
          Sienna watches these markets <span style={{ color: DL.text }}>around the clock.</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
export default DoZmarty;
