import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, Panel, SLabel } from '../../lib/ep03kit';

// Ep03 15 — the 12-hour briefing + 72h history. VO 0.8s (20.7s).
export const compositionConfig = { id: 'TBrief', durationInSeconds: 23, fps: 30, width: 1920, height: 1080 };

const HIST = ['LATEST', '−12h', '−24h', '−36h', '−48h', '−60h'];
const REG = [DL.green, DL.gold, DL.faint, DL.red, DL.gold, DL.green];

const TBrief: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="03" label="THE PROOF // MARKET BRIEFING" />

      <div style={{ position: 'absolute', top: 190, left: 130, right: 130 }}>
        <Headline at={20} size={56}>Twice a day, she writes the market a briefing.</Headline>
        <div style={{ marginTop: 8 }}><Headline at={56} size={42} italic color={DL.warm}>Regime. Her bias. What changed. And <span style={{ color: DL.sky }}>72 hours</span> you can scroll back.</Headline></div>
      </div>

      {/* history pills */}
      <div style={{ position: 'absolute', top: 430, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 16 }}>
        {HIST.map((hh, i) => {
          const at = 150 + i * 12;
          const op = interpolate(frame, [at, at + 12], [0, 1], DCLAMP);
          return <span key={hh} style={{ opacity: op, fontFamily: DL_MONO, fontSize: 24, color: i === 0 ? DL.text : DL.dim, border: `1px solid ${i === 0 ? REG[i] : DL.border}`, borderRadius: 999, padding: '10px 22px' }}>{hh}</span>;
        })}
      </div>

      <Panel at={260} glow={DL.sky} style={{ position: 'absolute', top: 520, left: 420, right: 420, padding: '34px 46px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 26, color: DL.green, border: `1px solid ${DL.green}`, borderRadius: 999, padding: '6px 18px' }}>RISK-ON</span>
          <span style={{ fontFamily: DL_SERIF, fontSize: 40, color: DL.text }}>BTC $66,318</span>
          <span style={{ marginLeft: 'auto', fontFamily: DL_MONO, fontSize: 24, color: DL.faint }}>conviction 73%</span>
        </div>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 30, color: DL.warm, marginTop: 22, lineHeight: 1.4 }}>
          &ldquo;Trend and momentum agree for the first time in three sessions. Room to open at 20× and scale into pullbacks.&rdquo;
        </div>
      </Panel>

      <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [470, 490], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.sky }}>A trader who shows her homework. Every twelve hours.</span>
      </div>
    </AbsoluteFill>
  );
};
export default TBrief;
