import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// =============================================================================
// Origin 12/14 — the thesis. VO 0.8s (17.4s): "AI does not replace a company.
// AI IS the company..." Big serif statement; the closer "Dan's agents ship."
// lands hard (~f440).
// =============================================================================
export const compositionConfig = { id: 'DoThesis', durationInSeconds: 19.2, fps: 30, width: 1920, height: 1080 };

const L1 = 120, L2 = 200, COND = 300, CLOSE = 440;

const DoThesis: React.FC = () => {
  const frame = useCurrentFrame();
  const l1 = interpolate(frame, [L1, L1 + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const l2 = interpolate(frame, [L2, L2 + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const sweep = interpolate(frame, [L2 + 14, L2 + 34], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const cond = interpolate(frame, [COND, COND + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const closeOp = interpolate(frame, [CLOSE, CLOSE + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="11" label="THE THESIS // WHY IT MATTERS" />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 160px' }}>
        <div style={{ opacity: l1, fontFamily: DL_SERIF, fontSize: 74, color: DL.dim, textAlign: 'center' }}>
          AI doesn&rsquo;t replace a company.
        </div>
        <div style={{ opacity: l2, fontFamily: DL_SERIF, fontWeight: 600, fontSize: 130, color: DL.text, marginTop: 30, position: 'relative' }}>
          AI <span style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ position: 'absolute', left: -14, right: -14, bottom: 18, height: 40, background: `${DL.red}3d`, borderRadius: 8, transform: `scaleX(${sweep})`, transformOrigin: 'left' }} />
            <span style={{ position: 'relative', fontStyle: 'italic', color: DL.red }}>is</span>
          </span>{' '}
          the company.
        </div>
        <div style={{ opacity: cond, fontSize: 38, color: DL.muted, marginTop: 44, textAlign: 'center', maxWidth: 1240, lineHeight: 1.5 }}>
          — when one human with real businesses, real stakes, and real taste sets the direction.
        </div>
        <div style={{ opacity: closeOp, marginTop: 78, display: 'flex', gap: 40, alignItems: 'baseline' }}>
          <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.dim }}>Most people talk about agents.</span>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 50, letterSpacing: 2, color: DL.gold }}>DAN&rsquo;S AGENTS SHIP.</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default DoThesis;
