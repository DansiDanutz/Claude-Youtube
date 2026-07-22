import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { ImageGrid } from '../../lib/ep07kit';

// Ep08 3 — the desk holds the truth: everything you watched lives here.
// Real artifacts. VO 0.8s (17.1s).
export const compositionConfig = { id: 'StHome', durationInSeconds: 20, fps: 30, width: 1920, height: 1080 };

const SHOTS = [
  'projects/danslab-ep08/repo.png',
  'projects/danslab-ep08/paperclip.png',
  'projects/danslab-ep08/danslab-hero.png',
  'projects/danslab-ep07/ep03a.png',
  'projects/danslab-ep07/ep06a.png',
  'projects/danslab-ep07/ep05a.png',
].map(staticFile);

const StHome: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="08" label="THE DESK // WHAT LIVES HERE" />

      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>The cloud does the work. <span style={{ color: DL.sky }}>The desk holds the truth.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 260, left: 0, right: 0 }}>
        <ImageGrid items={SHOTS} at={60} cols={3} w={500} />
      </div>

      <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [340, 368], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>Memory. Skills. Playbooks. The film factory itself — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.gold }}>inches from the coffee cup.</span>
      </div>
    </AbsoluteFill>
  );
};
export default StHome;
