import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// Ch4 · the teacher thesis. VO flw16: traders subscribe to an edge and a teacher.
export const compositionConfig = { id: 'ZTeacher', durationInSeconds: 19, fps: 30, width: 1920, height: 1080 };

const ROLES: [string, number][] = [['THE TEACHER', 220], ['THE SUPPORT LINE', 280], ['THE PROOF', 340]];

const ZTeacher: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="11" label="THE FLYWHEEL // THE TEACHER" />
      <div style={{ position: 'absolute', top: 190, left: 120, width: 1460 }}>
        <div style={{ ...rise(20), fontFamily: DL_SERIF, fontSize: 54, color: DL.text, lineHeight: 1.35 }}>
          A trader doesn't subscribe to a dashboard. A trader subscribes to
          <span style={{ color: DL.gold, fontStyle: 'italic' }}> an edge</span> — and to someone who
          <span style={{ color: DL.gold, fontStyle: 'italic' }}> teaches it.</span>
        </div>
        <div style={{ marginTop: 64, display: 'flex', gap: 24 }}>
          {ROLES.map(([r, at]) => (
            <div key={r} style={{
              ...rise(at), background: DL.panel, border: `1px solid ${DL.border}`,
              borderTop: `4px solid ${DL.gold}`, borderRadius: 16, padding: '26px 38px',
            }}>
              <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 28, letterSpacing: 3, color: DL.text }}>{r}</span>
            </div>
          ))}
        </div>
        <div style={{ ...rise(440), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm, marginTop: 60 }}>
          When she convinces you — the subscription is just the receipt.
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default ZTeacher;
