import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS } from '../../lib/danslab';

// Series-wide persistent link bar (episode-neutral): DansLab wordmark + site URL
// in the reserved bottom 70px band. No counters, no per-episode state — rendered
// ONCE as a still (media/library/logos/danslab-linkbar.png) and composited into
// every episode's mux with alpha fades (in after the cold open, out before the
// outro). Same band styling as Ep10's YHud so the series reads consistent.
export const compositionConfig = {
  id: 'DlLinkBar', durationInSeconds: 1, fps: 30, width: 1920, height: 70, transparent: true,
};

const DlLinkBar: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: DL_SANS }}>
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, height: 70, display: 'flex',
      alignItems: 'center', background: 'rgba(9,7,6,0.88)', borderTop: `1px solid ${DL.border}`,
      padding: '0 48px', gap: 40,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 30 }}>
          <span style={{ color: DL.text }}>Dans</span><span style={{ color: DL.red }}>Lab</span>
        </span>
        <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.gold }}>danslab.vercel.app</span>
      </div>
      <div style={{ flex: 1 }} />
      <span style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 4, color: DL.faint }}>ONE OPERATOR · ONE FLEET</span>
    </div>
  </AbsoluteFill>
);
export default DlLinkBar;
