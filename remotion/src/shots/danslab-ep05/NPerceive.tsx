import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { WebShot } from '../../lib/ep05kit';

// Ep05 6 — Hermes reads the whole board through Paperclip. REAL screenshot +
// animated cursor scanning the dashboard. VO 0.8s (18.5s).
export const compositionConfig = { id: 'NPerceive', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const NPerceive: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="05" label="HOW IT THINKS // IT READS THE WHOLE BOARD" />

      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={46}>Every few minutes, it pulls the entire company — <span style={{ color: DL.sky }}>live.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 250, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <WebShot
          src={staticFile('projects/danslab-ep05/paperclip.png')}
          url="paperclip · mission control"
          at={80}
          path={[
            { t: 0, x: 680, y: 410 }, { t: 46, x: 300, y: 180 }, { t: 78, x: 300, y: 180 },
            { t: 120, x: 700, y: 430 }, { t: 168, x: 1060, y: 640 }, { t: 200, x: 1060, y: 640 },
            { t: 250, x: 420, y: 720 }, { t: 300, x: 690, y: 420 },
          ]}
          clicks={[{ t: 78, x: 300, y: 180 }, { t: 200, x: 1060, y: 640 }]}
        />
      </div>

      <div style={{ position: 'absolute', bottom: 46, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [420, 442], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.faint }}>every agent · every task · what shipped, what stalled — held in mind at once</span>
      </div>
    </AbsoluteFill>
  );
};
export default NPerceive;
