import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { MacStudioBox } from '../../lib/ep08kit';

// Ep08 10 — the chain of command: the desk talks to the pocket. VO 0.8s (16.9s).
export const compositionConfig = { id: 'StLifeline', durationInSeconds: 20, fps: 30, width: 1920, height: 1080 };

const PINGS: [string, string][] = [
  ['Sienna wants to add margin', DL.green],
  ['Deploy touches real billing', DL.red],
  ['Nervix task needs approval', DL.gold],
];

const StLifeline: React.FC = () => {
  const frame = useCurrentFrame();
  const beam = interpolate(frame, [110, 170], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="08" label="THE RIGHT HAND // THE LIFELINE" />

      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>The desk talks to <span style={{ color: DL.sky }}>the pocket.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 460, left: 240 }}>
        <MacStudioBox at={50} w={430} label="THE DESK" />
      </div>

      {/* beam */}
      <div style={{ position: 'absolute', top: 520, left: 720, width: 620, height: 4, background: '#ffffff10', borderRadius: 999 }}>
        <div style={{ height: '100%', width: `${beam * 100}%`, background: `linear-gradient(90deg, ${DL.sky}, ${DL.gold})`, borderRadius: 999, boxShadow: `0 0 18px ${DL.sky}66` }} />
      </div>
      {PINGS.map(([msg, color], i) => {
        const at = 180 + i * 46;
        const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
        return (
          <div key={msg} style={{ position: 'absolute', top: 360 + i * 66, left: 760, opacity: op, fontFamily: DL_MONO, fontSize: 22, color, background: DL.panel, border: `1px solid ${color}44`, borderRadius: 999, padding: '10px 22px' }}>{msg} → 📱</div>
        );
      })}

      {/* the pocket: a small phone silhouette */}
      <div style={{ position: 'absolute', top: 420, right: 250, width: 150, height: 300, borderRadius: 26, background: 'linear-gradient(160deg, #23201d, #141210)', border: '1.5px solid #48423d', opacity: interpolate(frame, [90, 116], [0, 1], DCLAMP), boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}>
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 46, height: 10, borderRadius: 999, background: '#000' }} />
        <div style={{ position: 'absolute', bottom: -46, left: 0, right: 0, textAlign: 'center', fontFamily: DL_MONO, fontSize: 20, letterSpacing: 3, color: DL.faint }}>THE POCKET</div>
      </div>

      <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [370, 398], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>That is the entire chain of command.</span>
      </div>
    </AbsoluteFill>
  );
};
export default StLifeline;
