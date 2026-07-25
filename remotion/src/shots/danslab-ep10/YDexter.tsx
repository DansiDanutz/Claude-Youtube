import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { WorkerRow } from '../../lib/ep10kit';

// Ch4 · Dexter. VO pay02 19.1 + pay03 6.5. Row lands on his name ~1.5s; the
// 749× beat lands on "seven hundred and forty-nine times" ~21.5s.
export const compositionConfig = { id: 'YDexter', durationInSeconds: 28, fps: 30, width: 1920, height: 1080 };

const YDexter: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // PAYROLL 1 OF 8" />
      <div style={{ position: 'absolute', top: 150, left: 120, right: 120 }}>
        <Headline at={8} size={48}>Tied at the bottom: <span style={{ color: DL.gold }}>Dexter.</span></Headline>
        <div style={{ ...rise(140), fontFamily: DL_SANS, fontSize: 28, color: DL.dim, marginTop: 20, lineHeight: 1.5, maxWidth: 1300 }}>
          Senior backend + DevOps — the marketplace backend from episode six, CrawdBot, deployment.
          Hire that person: <span style={{ color: DL.red, fontFamily: DL_MONO }}>$135k/yr</span>, loaded.
        </div>
      </div>
      <div style={{ position: 'absolute', top: 400, left: 120, right: 120 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '460px 300px 300px 260px', gap: 30, padding: '0 28px', marginBottom: 12,
          fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.faint,
          opacity: interpolate(f, [420, 436], [0, 1], DCLAMP) }}>
          <div>WORKER</div><div style={{ textAlign: 'right' }}>DAN PAYS</div>
          <div style={{ textAlign: 'right' }}>HUMAN</div><div style={{ textAlign: 'right' }}>CHEAPER</div>
        </div>
        <WorkerRow name="Dexter" role="Senior Backend + DevOps" rate="$0.12/h" human="$91.41/h" mult="749×" at={450} hot />
      </div>
      <div style={{ position: 'absolute', bottom: 130, left: 120, ...rise(660) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 64, color: DL.gold }}>749× cheaper</span>
        <span style={{ fontFamily: DL_SANS, fontSize: 32, color: DL.dim, marginLeft: 26 }}>than the human he stands in for.</span>
      </div>
    </AbsoluteFill>
  );
};
export default YDexter;
