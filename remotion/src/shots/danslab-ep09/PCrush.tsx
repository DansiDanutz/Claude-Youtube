import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile, Img } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 12 — the crush + the lobster. VO 0.8s (19.6s).
export const compositionConfig = { id: 'PCrush', durationInSeconds: 23, fps: 30, width: 1920, height: 1080 };

const PCrush: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="09" label="THE SCHOOLS // THE CRUSH" />

      <div style={{ position: 'absolute', top: 240, left: 190, width: 860 }}>
        <Headline at={16} size={50}>Dan fell for AI the way people fall for poker.</Headline>
        <div style={{ marginTop: 24, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm, opacity: interpolate(frame, [110, 136], [0, 1], DCLAMP) }}>
          Completely — and slightly against his better judgment.
        </div>
        <div style={{ marginTop: 40, fontFamily: DL_SANS, fontSize: 30, color: DL.dim, opacity: interpolate(frame, [220, 246], [0, 1], DCLAMP) }}>
          Late nights with ChatGPT. A little crypto app, just for fun.<br />And then, one evening —
        </div>
      </div>

      <div style={{ position: 'absolute', top: 260, right: 180, textAlign: 'center', opacity: interpolate(frame, [360, 400], [0, 1], { ...DCLAMP, easing: DL_EASE.out }) }}>
        <Img src={staticFile('projects/danslab-ep09/openclaw-mascot.png')} style={{ width: 380, filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))' }} />
        <div style={{ marginTop: 18, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.red }}>OPENCLAW</div>
        <div style={{ fontFamily: DL_SANS, fontSize: 24, color: DL.dim }}>a red lobster crawled onto the screen</div>
      </div>
    </AbsoluteFill>
  );
};
export default PCrush;
