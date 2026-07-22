import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep05 4 — infinite possible work, finite attention. VO 0.8s (17.3s).
export const compositionConfig = { id: 'NProblem', durationInSeconds: 20, fps: 30, width: 1920, height: 1080 };

const OPTIONS = ['Fix a bug', 'Ship a feature', 'Chase a trade', 'Answer a user', 'Refactor', 'Write docs', 'Run a scan', 'Rebalance'];

const NProblem: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="05" label="THE PROBLEM // TOO MUCH TO DO" />

      <div style={{ position: 'absolute', top: 180, left: 130, right: 130 }}>
        <Headline at={20} size={54}>At any moment, the fleet could do <span style={{ color: DL.gold }}>almost anything.</span></Headline>
      </div>

      {/* a swarm of competing options */}
      <div style={{ position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 18, maxWidth: 1300, margin: '0 auto' }}>
        {OPTIONS.map((o, i) => {
          const at = 120 + i * 12;
          const op = interpolate(frame, [at, at + 14], [0, 1], DCLAMP);
          const jit = Math.sin((frame + i * 33) / 8) * 5;
          return <span key={o} style={{ opacity: op, transform: `translateY(${jit}px)`, fontFamily: DL_MONO, fontSize: 30, color: DL.dim, border: `1px solid ${DL.border}`, borderRadius: 12, padding: '16px 26px', background: DL.panel }}>{o}</span>;
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [300, 322], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>Without a brain, everything feels urgent — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.red }}>and nothing gets finished.</span>
      </div>
    </AbsoluteFill>
  );
};
export default NProblem;
