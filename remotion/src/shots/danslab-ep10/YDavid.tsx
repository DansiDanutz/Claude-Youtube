import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { WorkerRow } from '../../lib/ep10kit';

// Ch4 · David. VO pay11 33.2. The manager. "Close or escalate" lands ~17s,
// 24h rule ~24s, row ~28s.
export const compositionConfig = { id: 'YDavid', durationInSeconds: 36, fps: 30, width: 1920, height: 1080 };

const YDavid: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // PAYROLL 7 OF 8" />
      <div style={{ position: 'absolute', top: 150, left: 120, right: 120 }}>
        <Headline at={8} size={48}><span style={{ color: DL.gold }}>David.</span> If this company has a manager, it's him.</Headline>
        <div style={{ ...rise(180), fontFamily: DL_SANS, fontSize: 28, color: DL.dim, marginTop: 22, lineHeight: 1.5, maxWidth: 1340 }}>
          Assigns work. Verifies finished work has actual <span style={{ color: DL.text, fontWeight: 600 }}>evidence</span> attached.
          Closes it — or bounces it back.
        </div>
        <div style={{ ...rise(490), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 50, color: DL.warm, marginTop: 48 }}>
          “Close or escalate — <span style={{ color: DL.red }}>no silent in-progress.</span>”
        </div>
        <div style={{ ...rise(700), fontFamily: DL_MONO, fontSize: 26, color: DL.dim, marginTop: 34, letterSpacing: 1 }}>
          every issue touched inside 24 hours · eng manager $145k/yr
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 120, left: 120, right: 120 }}>
        <WorkerRow name="David" role="Orchestrator / Eng Manager" rate="$0.29/h" human="$98.18/h" mult="339×" at={840} hot />
      </div>
    </AbsoluteFill>
  );
};
export default YDavid;
