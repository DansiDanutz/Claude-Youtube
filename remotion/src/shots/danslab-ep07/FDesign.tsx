import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { ImageGrid } from '../../lib/ep07kit';

// Ep07 8 — one design system: six real frames from six episodes, side by side.
// VO 0.8s (21.4s).
export const compositionConfig = { id: 'FDesign', durationInSeconds: 24, fps: 30, width: 1920, height: 1080 };

const SHOTS = ['ep01a', 'ep02a', 'ep03b', 'ep04b', 'ep05a', 'ep06a'].map((n) => staticFile(`projects/danslab-ep07/${n}.png`));
const SWATCH: [string, string][] = [
  [DL.bg, '#050404'],
  [DL.red, '#e74c3c'],
  [DL.gold, '#d4a017'],
  [DL.warm, '#b9b1a4'],
  [DL.text, '#fafafa'],
];

const FDesign: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="07" label="THE LINE // ONE DESIGN SYSTEM" />

      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>And every scene obeys <span style={{ color: DL.gold }}>one design system.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 240, left: 0, right: 0 }}>
        <ImageGrid items={SHOTS} at={70} cols={3} w={500} />
      </div>

      {/* palette proof */}
      <div style={{ position: 'absolute', bottom: 150, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 18 }}>
        {SWATCH.map(([c, hex], i) => {
          const a = 300 + i * 12;
          const op = interpolate(frame, [a, a + 14], [0, 1], DCLAMP);
          return (
            <div key={hex} style={{ opacity: op, textAlign: 'center' }}>
              <div style={{ width: 96, height: 42, borderRadius: 8, background: c, border: `1px solid ${DL.border}` }} />
              <div style={{ marginTop: 8, fontFamily: DL_MONO, fontSize: 17, color: DL.faint }}>{hex}</div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [420, 448], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 38, color: DL.warm }}>Six episodes that look like one series — not six different videos.</span>
      </div>
    </AbsoluteFill>
  );
};
export default FDesign;
