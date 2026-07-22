import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep07 17 — one company, five verbs, one human. VO 0.8s (19.5s).
export const compositionConfig = { id: 'FClose', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const VERBS: [string, string][] = [
  ['trades', DL.green],
  ['governs itself', DL.sky],
  ['thinks for itself', DL.gold],
  ['sells', DL.red],
  ['tells its own story', DL.warm],
];

const FClose: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="07" label="THE OUTPUT // WHAT HE ACTUALLY BUILT" />

      <div style={{ position: 'absolute', top: 170, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={50}>Not six separate products. <span style={{ color: DL.gold }}>One company.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 330, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        {VERBS.map(([v, c], i) => {
          const at = 70 + i * 26;
          const op = interpolate(frame, [at, at + 18], [0, 1], DCLAMP);
          const x = interpolate(frame, [at, at + 22], [-30, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={v} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'baseline', gap: 18 }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.faint }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontFamily: DL_SERIF, fontSize: 62, color: c }}>{v}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 34, opacity: interpolate(frame, [330, 360], [0, 1], DCLAMP) }}>
        <Avatar src={staticFile('projects/danslab-ep07/dan-avatar.jpg')} size={130} color={DL.gold} />
        <div>
          <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>Run by machines. Directed by a single human.</div>
          <div style={{ marginTop: 8, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.gold }}>Mostly while he is asleep.</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default FClose;
