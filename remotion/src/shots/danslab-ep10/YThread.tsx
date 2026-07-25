import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, StatCard } from '../../lib/ep03kit';

// Ch6 · the accumulation thread. VO audit06 4.3 + audit07 33.8. The physics of
// free additions: stats land ~6s; "each one individually justified" ~32s.
export const compositionConfig = { id: 'YThread', durationInSeconds: 41, fps: 30, width: 1920, height: 1080 };

const YThread: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="10" label="THE PAYROLL // THE THREAD" />
      <div style={{ position: 'absolute', top: 140, left: 120, right: 120 }}>
        <Headline at={10} size={46}>The fourth one ties the other three <span style={{ color: DL.red }}>together.</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 300, left: 120, display: 'flex', gap: 22 }}>
        <StatCard label="Scheduled jobs" big="77" sub="every one once correct" color={DL.gold} at={190} w={380} />
        <StatCard label="Executions / month" big="~4,500" sub="none ever deleted" color={DL.gold} at={260} w={380} />
        <StatCard label="Cost to add one more" big="$0" sub="a cron job is free" color={DL.red} at={480} w={380} />
      </div>
      <div style={{ position: 'absolute', top: 620, left: 120, width: 1440 }}>
        <div style={{ ...rise(560), fontFamily: DL_SANS, fontSize: 30, color: DL.warm, lineHeight: 1.55 }}>
          That's not laziness. That's the natural physics of a system where adding costs
          almost nothing. A new agent is free. A new watchdog is free. So they accumulate —
        </div>
        <div style={{ ...rise(1010), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.gold, marginTop: 30, lineHeight: 1.4 }}>
          and each one is individually justified, which is exactly why nobody removes any of them.
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YThread;
