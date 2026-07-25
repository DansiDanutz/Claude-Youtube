import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { WorkerRow } from '../../lib/ep10kit';

// Ch4 · Memo. VO pay08 23.4. The honest beat — Memo's lane is frozen, he was
// reassigned — lands ~13s. "Yes. This company does reorgs." ~21s.
export const compositionConfig = { id: 'YMemo', durationInSeconds: 26, fps: 30, width: 1920, height: 1080 };

const YMemo: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // PAYROLL 5 OF 8" />
      <div style={{ position: 'absolute', top: 150, left: 120, right: 120 }}>
        <Headline at={8} size={48}><span style={{ color: DL.gold }}>Memo.</span> The sixteen-gigabyte box.</Headline>
        <div style={{ ...rise(140), fontFamily: DL_SANS, fontSize: 28, color: DL.dim, marginTop: 20, lineHeight: 1.5, maxWidth: 1300 }}>
          Runs the workflow engine — when something must happen automatically and forever,
          it lives with Memo.
        </div>
      </div>
      <div style={{ position: 'absolute', top: 400, left: 120, right: 120 }}>
        <WorkerRow name="Memo" role="Automation Eng / PM" rate="$0.19/h" human="$74.48/h" mult="395×" at={230} hot />
      </div>
      <div style={{ position: 'absolute', bottom: 150, left: 120, ...rise(420) }}>
        <div style={{ fontFamily: DL_SANS, fontSize: 32, color: DL.warm, lineHeight: 1.5, maxWidth: 1400 }}>
          Something honest: Memo's own lane is currently <span style={{ color: DL.red, fontWeight: 600 }}>frozen</span> —
          paused and reassigned to the priority product.
          <span style={{ color: DL.text, fontWeight: 600 }}> Yes. This company does reorgs.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YMemo;
