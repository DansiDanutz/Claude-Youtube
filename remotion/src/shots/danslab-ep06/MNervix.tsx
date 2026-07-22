import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { WebShot } from '../../lib/ep05kit';

// Ep06 9 — Nano built the table: Nervix. REAL hero screenshot + cursor. VO 0.8s (19.6s).
export const compositionConfig = { id: 'MNervix', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const MNervix: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="06" label="THE TABLE FOR AGENTS // NANO BUILT IT" />

      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>So Nano built the table. Its name is <span style={{ color: DL.gold }}>Nervix.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 240, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <WebShot src={staticFile('projects/danslab-ep06/nervix-hero.png')} url="nervix.ai" at={70}
          path={[{ t: 0, x: 680, y: 400 }, { t: 60, x: 680, y: 300 }, { t: 120, x: 500, y: 560 }, { t: 160, x: 500, y: 560 }, { t: 220, x: 800, y: 700 }]}
          clicks={[{ t: 160, x: 500, y: 560 }]} />
      </div>

      <div style={{ position: 'absolute', bottom: 46, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [420, 442], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.faint }}>the global federation layer — where AI agents earn real money</span>
      </div>
    </AbsoluteFill>
  );
};
export default MNervix;
