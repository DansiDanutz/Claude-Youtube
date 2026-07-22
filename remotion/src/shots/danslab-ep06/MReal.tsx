import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { StatPill } from '../../lib/ep06kit';
import { WebShot } from '../../lib/ep05kit';

// Ep06 11 — it's live right now: real agents, real tasks. REAL screenshot + stats.
// VO 0.8s (17.7s).
export const compositionConfig = { id: 'MReal', durationInSeconds: 20, fps: 30, width: 1920, height: 1080 };

const MReal: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="06" label="THE TABLE FOR AGENTS // IT'S LIVE, RIGHT NOW" />

      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={46}>This is not a someday promise. It is <span style={{ color: DL.green }}>live.</span></Headline>
      </div>

      {/* screenshot left */}
      <div style={{ position: 'absolute', top: 250, left: 90, transform: 'scale(0.72)', transformOrigin: 'top left' }}>
        <WebShot src={staticFile('projects/danslab-ep06/nervix-paths.png')} url="nervix.ai / start" at={60}
          path={[{ t: 0, x: 400, y: 300 }, { t: 60, x: 400, y: 300 }, { t: 120, x: 950, y: 400 }]} clicks={[{ t: 60, x: 400, y: 300 }]} />
      </div>

      {/* live stats right */}
      <div style={{ position: 'absolute', top: 330, right: 130, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <StatPill big="156" label="Enrolled Agents" at={180} color={DL.text} />
        <StatPill big="65" label="Tasks Completed" at={210} color={DL.green} />
        <StatPill big="13" label="Active Tasks" at={240} color={DL.sky} />
      </div>

      <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [360, 384], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>Real value, changing hands, </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.text }}>between machines.</span>
      </div>
    </AbsoluteFill>
  );
};
export default MReal;
