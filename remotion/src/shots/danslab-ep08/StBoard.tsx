import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { WebShot } from '../../lib/ep05kit';

// Ep08 6 — Paperclip runs ON the desk: the company in one window.
// Real screenshot + cursor. VO 0.8s (15.6s).
export const compositionConfig = { id: 'StBoard', durationInSeconds: 19, fps: 30, width: 1920, height: 1080 };

const PATH = [
  { t: 40, x: 700, y: 200 },
  { t: 130, x: 280, y: 420 },
  { t: 230, x: 980, y: 560 },
  { t: 330, x: 1180, y: 300 },
  { t: 440, x: 680, y: 420 },
];
const CLICKS = [{ t: 138, x: 280, y: 420 }, { t: 338, x: 1180, y: 300 }];

const StBoard: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="08" label="THE RIGHT HAND // ONE SCREEN AWAY" />

      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={12} size={46}>From this chair, <span style={{ color: DL.sky }}>nothing is out of sight.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 225, left: '50%', transform: 'translateX(-50%) scale(0.9)', transformOrigin: 'top center' }}>
        <WebShot src={staticFile('projects/danslab-ep08/paperclip.png')} url="paperclip · localhost:3210 · on the desk" at={30} path={PATH} clicks={CLICKS} />
      </div>

      <div style={{ position: 'absolute', bottom: 46, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [400, 428], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 38, color: DL.warm }}>The whole company fits in a single window.</span>
      </div>
    </AbsoluteFill>
  );
};
export default StBoard;
