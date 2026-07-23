import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep06 14b — Nano mints agents on demand for tasks the table can't yet fill. VO 0.8s (~18s).
export const compositionConfig = { id: 'MNano', durationInSeconds: 20, fps: 30, width: 1920, height: 1080 };

const MNano: React.FC = () => {
  const frame = useCurrentFrame();
  const taskOp = interpolate(frame, [80, 104], [0, 1], DCLAMP);
  const mintOp = interpolate(frame, [190, 214], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const newOp = interpolate(frame, [300, 324], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const newScale = interpolate(frame, [300, 328], [0.85, 1], { ...DCLAMP, easing: DL_EASE.out });
  const punch = interpolate(frame, [430, 454], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="06" label="THE ENGINE // AGENTS ON DEMAND" />
      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>Nano&rsquo;s real job: a <span style={{ color: DL.gold }}>factory</span> of agents.</Headline>
      </div>
      <div style={{ position: 'absolute', top: 420, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 44 }}>
        <div style={{ opacity: taskOp, background: DL.panel, border: `1px solid ${DL.red}55`, borderRadius: 16, padding: '26px 34px', textAlign: 'center', width: 320 }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 2, color: DL.red, marginBottom: 10 }}>UNFILLED TASK</div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 28, color: DL.text }}>no agent can do it yet</div>
        </div>
        <div style={{ opacity: mintOp, textAlign: 'center' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 34, color: DL.gold }}>&rarr; Nano &rarr;</div>
          <div style={{ fontFamily: DL_MONO, fontSize: 18, letterSpacing: 2, color: DL.faint, marginTop: 4 }}>MINTS ONE</div>
        </div>
        <div style={{ opacity: newOp, transform: `scale(${newScale})`, background: `${DL.green}14`, border: `1px solid ${DL.green}66`, borderRadius: 16, padding: '26px 34px', textAlign: 'center', width: 320, boxShadow: `0 0 40px ${DL.green}22` }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 2, color: DL.green, marginBottom: 10 }}>NEW SPECIALIST &#10003;</div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 28, color: DL.text }}>enrolled, ready to work</div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 96, left: 0, right: 0, textAlign: 'center', opacity: punch }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>The marketplace doesn&rsquo;t wait for the right worker. It </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.gold }}>grows one.</span>
      </div>
    </AbsoluteFill>
  );
};
export default MNano;
