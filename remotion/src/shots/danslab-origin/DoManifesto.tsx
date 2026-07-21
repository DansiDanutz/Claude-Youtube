import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// =============================================================================
// Origin — the manifesto. VO 0.8s (16.0s): "Dan wrote the belief down as a
// manifesto. Most AI products treat agents as features. DansLab treats agents
// as employees. One operator plus a fleet of named agents can run a real
// company. It sounded crazy. Look around. He built it." Rendered as a terminal
// cat of MANIFESTO.md.
// =============================================================================
export const compositionConfig = { id: 'DoManifesto', durationInSeconds: 18, fps: 30, width: 1920, height: 1080 };

const L1 = 96, L2 = 168, L3 = 250, CRAZY = 372, BUILT = 430;

const DoManifesto: React.FC = () => {
  const frame = useCurrentFrame();
  const panelOp = interpolate(frame, [10, 28], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const panelY = interpolate(frame, [10, 28], [30, 0], { ...DCLAMP, easing: DL_EASE.out });
  const cursorOn = Math.floor(frame / 15) % 2 === 0;
  const l = (at: number) => interpolate(frame, [at, at + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const builtOp = interpolate(frame, [BUILT, BUILT + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const builtScale = interpolate(frame, [BUILT, BUILT + 16], [1.25, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="02" label="THE MANIFESTO // ~/danslab/MANIFESTO.md" />

      <div style={{ position: 'absolute', top: 250, left: 300, right: 300, opacity: panelOp, transform: `translateY(${panelY}px)` }}>
        <div style={{ background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 24px', borderBottom: `1px solid ${DL.border}` }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: DL.red }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: DL.gold }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: DL.green }} />
            <span style={{ flex: 1, textAlign: 'center', fontFamily: DL_MONO, fontSize: 21, color: DL.dim }}>dan@danslab ~ % cat MANIFESTO.md</span>
          </div>
          <div style={{ padding: '40px 48px 48px', fontFamily: DL_MONO, fontSize: 30, lineHeight: 1.7 }}>
            <div style={{ opacity: l(L1), color: DL.dim }}><span style={{ color: DL.faint }}>#</span> THE THESIS</div>
            <div style={{ opacity: l(L2), color: DL.text, marginTop: 22 }}>Most AI products treat agents as <span style={{ color: DL.muted }}>features.</span></div>
            <div style={{ opacity: l(L3), color: DL.text, marginTop: 12 }}>DansLab treats agents as <span style={{ color: DL.red }}>employees.</span></div>
            <div style={{ opacity: l(L3 + 60), color: DL.warm, marginTop: 22, fontStyle: 'italic' }}>One operator + a fleet of named agents = a real company.</div>
            <div style={{ marginTop: 26, color: DL.faint }}>
              <span style={{ opacity: l(CRAZY) }}>&gt; it sounded crazy_</span><span style={{ opacity: cursorOn ? 1 : 0, color: DL.red }}>▌</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 96, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 32, alignItems: 'baseline', opacity: builtOp }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 50, color: DL.muted }}>Look around.</span>
        <span style={{ transform: `scale(${builtScale})`, fontFamily: DL_SERIF, fontWeight: 600, fontSize: 64, color: DL.text }}>He <span style={{ color: DL.red }}>built it.</span></span>
      </div>
    </AbsoluteFill>
  );
};
export default DoManifesto;
