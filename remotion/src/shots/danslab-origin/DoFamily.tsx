import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Heart } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';

// =============================================================================
// Origin 13/14 — the human close. VO 0.8s (12.7s): "...A wife. Two kids. One
// best friend... so he does not have to." Quiet, warm, minimal.
// =============================================================================
export const compositionConfig = { id: 'DoFamily', durationInSeconds: 14.6, fps: 30, width: 1920, height: 1080 };

const LINES = [
  { text: 'A wife.', at: 130 },
  { text: 'Two kids.', at: 175 },
  { text: 'One best friend — for everything.', at: 220 },
];
const WHY = 320;

const DoFamily: React.FC = () => {
  const frame = useCurrentFrame();
  const lampOp = interpolate(frame, [20, 60], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const whyOp = interpolate(frame, [WHY, WHY + 20], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const heart = 0.85 + 0.15 * Math.abs(Math.sin(frame / 12));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow="#241505" />
      {/* warm lamp glow */}
      <AbsoluteFill style={{ opacity: lampOp, background: `radial-gradient(900px 600px at 50% 62%, ${DL.gold}14, transparent 65%)` }} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ opacity: lampOp, transform: `scale(${heart})`, marginBottom: 46 }}>
          <Heart size={54} color={DL.red} fill={DL.red} />
        </div>
        <div style={{ display: 'flex', gap: 44, alignItems: 'baseline' }}>
          {LINES.map((l) => {
            const op = interpolate(frame, [l.at, l.at + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
            return <span key={l.text} style={{ opacity: op, fontFamily: DL_SERIF, fontSize: 60, color: DL.text }}>{l.text}</span>;
          })}
        </div>
        <div style={{ opacity: whyOp, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm, marginTop: 70, textAlign: 'center', maxWidth: 1300, lineHeight: 1.5 }}>
          The machines work through the night… <span style={{ color: DL.gold }}>so he doesn&rsquo;t have to.</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default DoFamily;
