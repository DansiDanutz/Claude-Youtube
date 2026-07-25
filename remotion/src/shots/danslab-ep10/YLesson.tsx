import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// Ch6 · the takeaway. VO audit09 22.3. Uptime is easy, output is hard; Dan had
// the definition ("closed with proof") — he never alarmed on its absence (~18s).
export const compositionConfig = { id: 'YLesson', durationInSeconds: 25, fps: 30, width: 1920, height: 1080 };

const YLesson: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // THE LESSON" />
      <div style={{ position: 'absolute', top: 200, left: 120, width: 1440 }}>
        <div style={{ ...rise(60), fontFamily: DL_SANS, fontSize: 38, color: DL.text, lineHeight: 1.5 }}>
          You will instrument <span style={{ color: DL.green, fontWeight: 600 }}>uptime</span>, because uptime is easy to measure.
        </div>
        <div style={{ ...rise(240), fontFamily: DL_SANS, fontSize: 38, color: DL.text, marginTop: 30, lineHeight: 1.5 }}>
          <span style={{ color: DL.gold, fontWeight: 600 }}>Output</span> needs a definition of done a machine can check —
          and most people never write one.
        </div>
        <div style={{ ...rise(430), marginTop: 60, display: 'flex', alignItems: 'center', gap: 30 }}>
          <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 40, color: DL.gold, background: DL.panel, border: `1px solid ${DL.gold}`, borderRadius: 12, padding: '14px 30px' }}>
            closed with proof
          </div>
          <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 38, color: DL.warm }}>
            Dan had the definition. He just never alarmed on its <span style={{ color: DL.red }}>absence.</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YLesson;
