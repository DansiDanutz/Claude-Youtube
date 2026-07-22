import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, EquityCurve, Panel, SLabel } from '../../lib/ep03kit';

// Ep03 3 — nightly self-learning + equity curve. VO 0.8s (24.8s): "Every night
// she opens her own book and grades herself... she keeps an equity curve... she
// is chasing a slightly better version of herself, tomorrow."
export const compositionConfig = { id: 'TLearn', durationInSeconds: 28, fps: 30, width: 1920, height: 1080 };

// real-ish paper equity shape: dips + recovery, ends up (self-learning)
const PTS = [0.28, 0.24, 0.33, 0.30, 0.42, 0.38, 0.50, 0.46, 0.44, 0.55, 0.62, 0.58, 0.66, 0.72, 0.68, 0.78, 0.84, 0.80, 0.90];

const TLearn: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="03" label="THE LOOP // SELF-LEARNING" />

      <div style={{ position: 'absolute', top: 190, left: 130, right: 130 }}>
        <Headline at={20} size={58}>Every night, she grades herself.</Headline>
        <div style={{ marginTop: 10 }}><Headline at={64} size={44} italic color={DL.warm}>What worked. What didn&rsquo;t. Which rule to tighten.</Headline></div>
      </div>

      <Panel at={150} glow={DL.green} style={{ position: 'absolute', top: 400, left: 300, right: 300, padding: '34px 46px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <SLabel color={DL.green}>PAPER EQUITY · REAL, MARK-TO-MARKET</SLabel>
          <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.dim }}>day by day</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <EquityCurve pts={PTS} at={175} w={1160} h={330} color={DL.green} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: DL_MONO, fontSize: 22, color: DL.faint, marginTop: 8 }}>
          <span>day 0 — first paper trade</span>
          <span>she audits every trade, every night</span>
          <span>today</span>
        </div>
      </Panel>

      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [560, 580], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.dim }}>Not chasing a jackpot — chasing a </span>
        <span style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.green }}>slightly better version of herself, tomorrow.</span>
      </div>
    </AbsoluteFill>
  );
};
export default TLearn;
