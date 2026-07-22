import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, ScoreRow, Panel } from '../../lib/ep03kit';

// Ep03 5 — the composite score. VO 0.8s (23.6s): "every setup gets a score...
// trend 35%, liquidation 35%, how cheap or expensive 30%. No score, no trade."
export const compositionConfig = { id: 'TScore', durationInSeconds: 26, fps: 30, width: 1920, height: 1080 };

const TScore: React.FC = () => {
  const frame = useCurrentFrame();
  const totalAt = 500;
  const total = interpolate(frame, [totalAt, totalAt + 26], [0, 71], { ...DCLAMP, easing: DL_EASE.out });
  const totalOp = interpolate(frame, [totalAt, totalAt + 16], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="03" label="THE METHOD // THE SCORE" />

      <div style={{ position: 'absolute', top: 180, left: 130, right: 130 }}>
        <Headline at={20} size={58}>Before she touches the market —</Headline>
        <div style={{ marginTop: 8 }}><Headline at={54} size={58} italic color={DL.gold}>every setup gets one number.</Headline></div>
      </div>

      <Panel at={150} style={{ position: 'absolute', top: 380, left: 280, right: 280, padding: '46px 60px' }}>
        <ScoreRow label="Technical" weight="× 0.35" value={80} color={DL.sky} at={180} />
        <div style={{ height: 26 }} />
        <ScoreRow label="Liquidation" weight="× 0.35" value={62} color={DL.gold} at={260} />
        <div style={{ height: 26 }} />
        <ScoreRow label="Risk metric" weight="× 0.30" value={88} color={DL.green} at={340} />
        <div style={{ height: 34, borderBottom: `1px solid ${DL.border}` }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 30, opacity: totalOp }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.faint }}>COMPOSITE SCORE</span>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 78, color: DL.text }}>{Math.round(total)}<span style={{ fontSize: 40, color: DL.faint }}>/100</span></span>
        </div>
      </Panel>

      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [560, 580], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.red }}>No score, no trade.</span>
        <span style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.dim }}>  That&rsquo;s the whole discipline.</span>
      </div>
    </AbsoluteFill>
  );
};
export default TScore;
