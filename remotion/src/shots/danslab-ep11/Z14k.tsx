import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { StatCard } from '../../lib/ep03kit';

// Ch3 · the receipt. VO flw11: 14,000 subscribers in one month. Odometer counts
// up with a hot glow finish; supporting stats land after.
export const compositionConfig = { id: 'Z14k', durationInSeconds: 17, fps: 30, width: 1920, height: 1080 };

const Z14k: React.FC = () => {
  const f = useCurrentFrame();
  const v = interpolate(f, [180, 330], [0, 14000], { ...DCLAMP, easing: DL_EASE.inOut });
  const done = f >= 330;
  const glow = done ? interpolate(f, [330, 380], [1, 0.35], DCLAMP) : 0;
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [20, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="11" label="THE FLYWHEEL // WORLDCUP26 CENTRAL" />
      <div style={{ position: 'absolute', top: 150, left: 120, ...rise(10) }}>
        <div style={{ fontFamily: DL_SERIF, fontSize: 50, color: DL.text }}>
          One month of the World Cup. One channel.
        </div>
      </div>
      <div style={{ position: 'absolute', top: 330, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 6, color: DL.faint, opacity: interpolate(f, [160, 180], [0, 1], DCLAMP) }}>
          SUBSCRIBERS
        </div>
        <div style={{
          fontFamily: DL_MONO, fontWeight: 700, fontSize: 230, letterSpacing: -6, color: DL.green,
          textShadow: `0 0 ${60 * glow}px rgba(34,197,94,${glow})`, marginTop: 6,
          transform: `scale(${1 + 0.06 * glow})`,
        }}>
          {Math.round(v).toLocaleString('en-US')}
        </div>
        <div style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.dim, opacity: interpolate(f, [340, 360], [0, 1], DCLAMP) }}>
          in one month · daily videos from the same pipeline rendering this episode
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 22 }}>
        <StatCard label="Cadence" big="daily" sub="one video, every day" color={DL.gold} at={400} w={340} />
        <StatCard label="Built by" big="Dexter" sub="the same fleet pipeline" color={DL.green} at={430} w={340} />
      </div>
    </AbsoluteFill>
  );
};
export default Z14k;
