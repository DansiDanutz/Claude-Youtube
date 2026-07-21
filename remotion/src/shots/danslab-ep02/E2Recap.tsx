import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// =============================================================================
// Ep02 recap-hook. VO 0.8s (17.7s): "Last time: one human, thirty agents...
// nobody is born a fleet... a man, a chatbot, and three machines that kept
// dying." Recap stats fade, then the promise line with a dying-machine motif.
// =============================================================================
export const compositionConfig = { id: 'E2Recap', durationInSeconds: 19, fps: 30, width: 1920, height: 1080 };

const STATS = [{ v: '1', l: 'HUMAN' }, { v: '30+', l: 'AGENTS' }, { v: '5', l: 'PRODUCTS' }];
const TURN = 300; // "but nobody is born a fleet"
const HOOK = 380; // "three machines that kept dying"

const E2Recap: React.FC = () => {
  const frame = useCurrentFrame();
  const recapOp = interpolate(frame, [10, 26, TURN - 20, TURN], [0, 1, 1, 0.15], DCLAMP);
  const turnOp = interpolate(frame, [TURN, TURN + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const hookOp = interpolate(frame, [HOOK, HOOK + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const skull = (i: number) => interpolate(frame, [HOOK + 20 + i * 18, HOOK + 34 + i * 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg />
      <Kicker n="—" label="PREVIOUSLY // NO. 01 · THE ORIGIN" />

      {/* recap stats */}
      <div style={{ position: 'absolute', top: 300, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 90, opacity: recapOp }}>
        {STATS.map((s) => (
          <div key={s.l} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 120, color: DL.text }}>{s.v}</div>
            <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DL.muted, marginTop: 6 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* the turn */}
      <div style={{ position: 'absolute', top: 470, left: 0, right: 0, textAlign: 'center', opacity: turnOp }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, color: DL.warm }}>
          But nobody is <span style={{ color: DL.text }}>born a fleet.</span>
        </span>
      </div>

      {/* the hook */}
      <div style={{ position: 'absolute', bottom: 200, left: 0, right: 0, textAlign: 'center', opacity: hookOp }}>
        <div style={{ fontFamily: DL_SERIF, fontSize: 46, color: DL.dim }}>It began with a man, a chatbot,</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22, marginTop: 20 }}>
          <span style={{ fontFamily: DL_SERIF, fontSize: 46, color: DL.text }}>and three machines that kept</span>
          <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 52, color: DL.red }}>dying.</span>
          <span style={{ display: 'flex', gap: 8, fontSize: 44 }}>
            {[0, 1, 2].map((i) => <span key={i} style={{ opacity: skull(i) }}>💀</span>)}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default E2Recap;
