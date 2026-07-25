import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, HermesLogo } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { WorkerRow } from '../../lib/ep10kit';

// Ch4 · Hermes. VO pay13 9.2 + pay14 26.2. Most expensive worker; the "why"
// answer (decides what the work is) lands ~11s; 06:30 scoping ~16s; row ~30s.
export const compositionConfig = { id: 'YHermes', durationInSeconds: 38, fps: 30, width: 1920, height: 1080 };

const YHermes: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // PAYROLL 8 OF 8" />
      <div style={{ position: 'absolute', top: 140, left: 120, width: 1120 }}>
        <Headline at={8} size={48}><span style={{ color: DL.gold }}>Hermes.</span> The most expensive worker — and it isn't close.</Headline>
        <div style={{ ...rise(300), fontFamily: DL_SANS, fontSize: 32, color: DL.warm, marginTop: 28, lineHeight: 1.5 }}>
          Hermes doesn't do the work. Hermes decides <span style={{ color: DL.gold, fontWeight: 600 }}>what the work is.</span>
        </div>
        <div style={{ ...rise(480), fontFamily: DL_MONO, fontSize: 26, color: DL.dim, marginTop: 34, lineHeight: 1.7 }}>
          06:30 — twelve completable tickets per droplet, each under 2h<br />
          Sunday — closed vs mattered · next week's focus · the kill-list
        </div>
        <div style={{ ...rise(760), fontFamily: DL_SANS, fontSize: 28, color: DL.dim, marginTop: 30 }}>
          The only worker whose output Dan is <span style={{ color: DL.text, fontWeight: 600 }}>required to read</span>.
          A chief of staff: <span style={{ color: DL.red }}>$160k/yr</span>.
        </div>
      </div>
      <div style={{ position: 'absolute', top: 250, right: 150, opacity: interpolate(f, [40, 70], [0, 1], DCLAMP) }}>
        <HermesLogo size={220} start={40} />
      </div>
      <div style={{ position: 'absolute', bottom: 120, left: 120, right: 120 }}>
        <WorkerRow name="Hermes" role="Strategy Brain / Chief of Staff" rate="$0.41/h" human="$108.33/h" mult="264×" at={900} hot />
      </div>
    </AbsoluteFill>
  );
};
export default YHermes;
