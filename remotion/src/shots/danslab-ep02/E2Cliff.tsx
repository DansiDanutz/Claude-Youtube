import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Clipboard } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// =============================================================================
// Ep02 the cliffhanger. VO 0.8s (13.4s): "But a race needs a referee. Someone
// has to run the scoring. Keep it fair. Keep it honest. Keep it alive, every
// day. Who does that? Not Dan — Dan is asleep. The answer has a name. And it
// is coming... next." Questions stack; a redacted name reveals as PAPERCLIP.
// =============================================================================
export const compositionConfig = { id: 'E2Cliff', durationInSeconds: 15, fps: 30, width: 1920, height: 1080 };

const QS = [
  { t: 'run the scoring', at: 96 },
  { t: 'keep it fair', at: 140 },
  { t: 'keep it honest, every day', at: 184 },
];
const NOTDAN = 260;
const REVEAL = 360;

const E2Cliff: React.FC = () => {
  const frame = useCurrentFrame();
  const notOp = interpolate(frame, [NOTDAN, NOTDAN + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const revealOp = interpolate(frame, [REVEAL, REVEAL + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const revealScale = interpolate(frame, [REVEAL, REVEAL + 18], [1.3, 1], { ...DCLAMP, easing: DL_EASE.out });
  const glow = 0.5 + 0.5 * Math.abs(Math.sin((frame - REVEAL) / 14));
  const cursorOn = Math.floor(frame / 15) % 2 === 0;

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="—" label="THE CLIFFHANGER // WHO REFEREES?" />

      <div style={{ position: 'absolute', top: 210, left: 0, right: 0, textAlign: 'center' }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 62, color: DL.text }}>A race needs <span style={{ fontStyle: 'italic', color: DL.red }}>a referee.</span></span>
      </div>

      {/* stacked questions */}
      <div style={{ position: 'absolute', top: 340, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        {QS.map((q) => {
          const op = interpolate(frame, [q.at, q.at + 12], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          return <span key={q.t} style={{ opacity: op, fontFamily: DL_MONO, fontSize: 30, color: DL.dim }}>▸ someone has to {q.t}</span>;
        })}
      </div>

      {/* not Dan */}
      <div style={{ position: 'absolute', top: 560, left: 0, right: 0, textAlign: 'center', opacity: notOp }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.muted }}>Who? Not Dan. Dan is asleep. 🌙</span>
      </div>

      {/* the reveal */}
      <div style={{ position: 'absolute', top: 680, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: revealOp, transform: `scale(${revealScale})` }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 18, border: `2px solid ${DL.red}`, borderRadius: 16, padding: '20px 44px', boxShadow: `0 0 ${50 * glow}px ${DL.red}44` }}>
          <Clipboard size={40} color={DL.red} />
          <span style={{ fontFamily: DL_SERIF, fontWeight: 700, fontSize: 72, color: DL.text }}>Paperclip<span style={{ opacity: cursorOn ? 1 : 0, color: DL.red }}>▌</span></span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default E2Cliff;
