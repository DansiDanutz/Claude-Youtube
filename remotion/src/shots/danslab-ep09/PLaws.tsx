import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 25 — the constitution recap. VO 0.8s (20.8s).
export const compositionConfig = { id: 'PLaws', durationInSeconds: 26, fps: 30, width: 1920, height: 1080 };

const PLaws: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="09" label="THE METHOD // WRITTEN LIKE A MAN WHO WAS BURNED" />

      <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>Under the verbs — <span style={{ color: DL.gold }}>the laws.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 300, left: '50%', transform: 'translateX(-50%)', width: 1180 }}>
        {[['never break the lifeline', 90], ['never delete a repository', 145], ['always branch — never force-push over someone\u2019s work', 200], ['back up before you touch', 255]].map(([law, at], i) => (
          <div key={String(law)} style={{ opacity: interpolate(frame, [Number(at), Number(at) + 16], [0, 1], DCLAMP), display: 'flex', alignItems: 'center', gap: 26, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 14, padding: '20px 32px', marginBottom: 14 }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 3, color: DL.red }}>LAW 0{i + 1}</span>
            <span style={{ fontFamily: DL_SERIF, fontSize: 34, color: DL.text }}>{law}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [440, 470], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>Machines follow rules exactly as written. He learned that </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.red }}>twice, expensively.</span>
      </div>
    </AbsoluteFill>
  );
};
export default PLaws;
