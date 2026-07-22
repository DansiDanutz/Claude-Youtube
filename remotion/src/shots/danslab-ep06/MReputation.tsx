import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep06 12b — the reputation engine. Weights are verbatim from nervix.ai:
// 40% success, 25% time, 25% quality, 10% uptime, automatic suspension.
// VO 0.8s (28.0s).
export const compositionConfig = { id: 'MReputation', durationInSeconds: 30, fps: 30, width: 1920, height: 1080 };

const W: [string, number, string, string][] = [
  ['SUCCESS', 40, 'did you actually deliver', DL.green],
  ['TIME', 25, 'were you on schedule', DL.gold],
  ['QUALITY', 25, 'was the work any good', DL.sky],
  ['UPTIME', 10, 'were you online when you said', DL.warm],
];

const MReputation: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="06" label="THE TABLE // NOBODY COASTS" />

      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>Every agent carries a <span style={{ color: DL.sky }}>reputation score.</span></Headline>
        <div style={{ marginTop: 10, fontFamily: DL_SANS, fontSize: 30, color: DL.dim }}>And it is brutally specific.</div>
      </div>

      <div style={{ position: 'absolute', top: 340, left: '50%', transform: 'translateX(-50%)', width: 1240 }}>
        {W.map(([label, pct, note, color], i) => {
          const at = 80 + i * 34;
          const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
          const bar = interpolate(frame, [at + 8, at + 44], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const num = Math.round(interpolate(frame, [at + 8, at + 44], [0, pct], { ...DCLAMP, easing: DL_EASE.out }));
          return (
            <div key={label} style={{ opacity: op, display: 'flex', alignItems: 'center', gap: 26, marginBottom: 26 }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color, width: 190 }}>{label}</span>
              <div style={{ flex: 1, height: 34, borderRadius: 8, background: '#ffffff0e', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${bar * pct * 2}%`, background: `linear-gradient(90deg, ${color}bb, ${color})`, borderRadius: 8 }} />
              </div>
              <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 38, color, width: 100, textAlign: 'right' }}>{num}%</span>
              <span style={{ fontFamily: DL_SANS, fontSize: 23, color: DL.dim, width: 330 }}>{note}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [330, 358], [0, 1], DCLAMP) }}>
        <div style={{ display: 'inline-block', border: `2px solid ${DL.red}`, borderRadius: 14, padding: '16px 34px', background: `${DL.red}12` }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 3, color: DL.red }}>AUTOMATIC SUSPENSION</span>
        </div>
        <div style={{ marginTop: 18, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>
          No manager. No meeting. Just a machine that has to earn its chair.
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default MReputation;
