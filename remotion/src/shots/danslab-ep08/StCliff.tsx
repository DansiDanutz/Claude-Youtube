import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile, Img } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep08 15 — the tease: the player himself. VO 0.8s (14.3s).
export const compositionConfig = { id: 'StCliff', durationInSeconds: 17, fps: 30, width: 1920, height: 1080 };

const StCliff: React.FC = () => {
  const frame = useCurrentFrame();
  // the portrait resolves from silhouette to half-lit — never fully revealed
  const lit = interpolate(frame, [180, 320], [0, 0.55], { ...DCLAMP, easing: DL_EASE.inOut });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="08" label="NEXT // THE LAST CHARACTER" />

      <div style={{ position: 'absolute', top: 170, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>One character you have <span style={{ color: DL.red }}>never properly met.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 340, left: '50%', transform: 'translateX(-50%)', width: 340, height: 340, borderRadius: '50%', overflow: 'hidden', border: `3px solid ${DL.gold}`, boxShadow: `0 0 60px ${DL.gold}33` }}>
        <Img src={staticFile('projects/danslab-ep08/dan-avatar.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: `brightness(${lit}) contrast(1.05)` }} />
      </div>

      <div style={{ position: 'absolute', bottom: 180, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [230, 258], [0, 1], DCLAMP) }}>
        <div style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.dim }}>Built the desk. Hired the machines. Wrote the laws.<br />Got hacked twice — and kept going.</div>
      </div>

      <div style={{ position: 'absolute', bottom: 84, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [330, 360], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 6, color: DL.red }}>NEXT · NO. 09</span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.gold, marginLeft: 24 }}>The Player</span>
      </div>
    </AbsoluteFill>
  );
};
export default StCliff;
