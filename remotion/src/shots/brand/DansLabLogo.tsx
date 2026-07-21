import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DlLogo } from '../../lib/danslab';

// =============================================================================
// Utility shot (like BrandProof, not a video beat): the DansLab logo lockup at
// 1760x512 — render a still of this for the official PNG. Mark-only version:
// crop the left 512px, or use DlLogo in any shot.
// =============================================================================
export const compositionConfig = { id: 'DansLabLogo', durationInSeconds: 1, fps: 30, width: 1760, height: 512 };

const DansLabLogo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: DL.bg, flexDirection: 'row', alignItems: 'center', padding: '0 48px', gap: 64 }}>
    <DlLogo size={360} />
    <div>
      <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 200, lineHeight: 1, color: DL.text }}>
        Dans<span style={{ color: DL.red }}>Lab</span>
      </div>
      <div style={{ marginTop: 26, height: 8, width: 560, borderRadius: 4, background: `linear-gradient(90deg, ${DL.red}, ${DL.gold})` }} />
      <div style={{ marginTop: 24, fontFamily: DL_MONO, fontSize: 40, letterSpacing: 8, color: DL.muted }}>
        A HUMAN-LED AUTONOMOUS AI LAB
      </div>
    </div>
  </AbsoluteFill>
);
export default DansLabLogo;
