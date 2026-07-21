import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// =============================================================================
// Origin — the vision. VO 0.8s (17.5s): "Where does it go? More products. More
// agents. Agents that hire other agents, and pay each other for work. The goal
// was never thirty agents. The goal is a company that compounds while its
// founder stays human. That is the experiment. And it is working."
// =============================================================================
export const compositionConfig = { id: 'DoVision', durationInSeconds: 19.2, fps: 30, width: 1920, height: 1080 };

const BEATS = [
  { text: 'More products.', at: 96 },
  { text: 'More agents.', at: 150 },
  { text: 'Agents that hire agents — and pay each other.', at: 210 },
];
const GOAL = 348; // "a company that compounds"
const WORKS = 486;

const DoVision: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [20, 40], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const goalOp = interpolate(frame, [GOAL, GOAL + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const sweep = interpolate(frame, [GOAL + 14, GOAL + 36], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const worksOp = interpolate(frame, [WORKS, WORKS + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const pulse = 0.6 + 0.4 * Math.abs(Math.sin((frame - WORKS) / 16));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="11" label="THE HORIZON // WHERE IT GOES" />

      <div style={{ position: 'absolute', top: 196, left: 120, opacity: titleOp }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 72, color: DL.text }}>
          Where does it <span style={{ fontStyle: 'italic', color: DL.gold }}>go from here?</span>
        </span>
      </div>

      <div style={{ position: 'absolute', top: 360, left: 120, display: 'flex', flexDirection: 'column', gap: 22 }}>
        {BEATS.map((bt) => {
          const op = interpolate(frame, [bt.at, bt.at + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const x = interpolate(frame, [bt.at, bt.at + 14], [-24, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={bt.text} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 20 }}>
              <span style={{ color: DL.red, fontSize: 34 }}>▸</span>
              <span style={{ fontFamily: DL_SERIF, fontSize: 48, color: DL.text }}>{bt.text}</span>
            </div>
          );
        })}
      </div>

      {/* the goal */}
      <div style={{ position: 'absolute', top: 660, left: 120, right: 120, opacity: goalOp }}>
        <span style={{ fontFamily: DL_SERIF, fontSize: 54, color: DL.dim }}>
          The goal was never thirty agents. It&rsquo;s a company that{' '}
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ position: 'absolute', left: -8, right: -8, bottom: 6, height: 22, background: `${DL.gold}44`, transform: `scaleX(${sweep})`, transformOrigin: 'left' }} />
            <span style={{ position: 'relative', color: DL.text, fontStyle: 'italic' }}>compounds</span>
          </span>{' '}— while its founder stays human.
        </span>
      </div>

      <div style={{ position: 'absolute', bottom: 92, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 30, alignItems: 'center', opacity: worksOp }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>That&rsquo;s the experiment.</span>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, border: `1px solid ${DL.green}66`, borderRadius: 999, padding: '12px 28px' }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: DL.green, opacity: pulse }} />
          <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 2, color: DL.green }}>AND IT&rsquo;S WORKING</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default DoVision;
