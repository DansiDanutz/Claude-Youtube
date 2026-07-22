import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, ClusterRow, Panel, SLabel } from '../../lib/ep03kit';

// Ep03 7 — liquidation clusters: where over-leveraged traders die → reversal
// zones. Live from real market data. VO 0.8s (22.2s).
export const compositionConfig = { id: 'TClusters', durationInSeconds: 25, fps: 30, width: 1920, height: 1080 };

const TClusters: React.FC = () => {
  const frame = useCurrentFrame();
  const markOp = interpolate(frame, [330, 348], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="03" label="THE METHOD // LIQUIDATION CLUSTERS" />

      <div style={{ position: 'absolute', top: 170, left: 130, right: 130 }}>
        <Headline at={20} size={54}>Where over-leveraged traders get wiped out —</Headline>
        <div style={{ marginTop: 8 }}><Headline at={54} size={54} italic color={DL.gold}>the levels price snaps back from.</Headline></div>
      </div>

      <Panel at={130} style={{ position: 'absolute', top: 380, left: 420, right: 420, padding: '30px 44px' }}>
        <SLabel color={DL.red}>SHORT LIQUIDATIONS ABOVE · she fades rips into these</SLabel>
        <div style={{ height: 14 }} />
        <ClusterRow price="72,346" dist="+9.1%" strength={78} side="short" at={160} />
        <ClusterRow price="68,970" dist="+4.0%" strength={92} side="short" at={185} />
        <ClusterRow price="66,981" dist="+1.0%" strength={60} side="short" at={210} />
        <div style={{ margin: '18px 0', padding: '12px 0', borderTop: `1px dashed ${DL.border}`, borderBottom: `1px dashed ${DL.border}`, opacity: markOp }}>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: DL.gold }}>MARK $66,318</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.faint }}>  ← she trades toward the clusters</span>
        </div>
        <SLabel color={DL.green}>LONG LIQUIDATIONS BELOW · she buys dips into these</SLabel>
        <div style={{ height: 14 }} />
        <ClusterRow price="65,654" dist="−1.0%" strength={64} side="long" at={250} />
        <ClusterRow price="63,665" dist="−4.0%" strength={88} side="long" at={275} />
        <ClusterRow price="62,173" dist="−6.3%" strength={72} side="long" at={300} />
      </Panel>

      <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [520, 540], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.faint }}>real Binance open interest + positioning · updated live</span>
      </div>
    </AbsoluteFill>
  );
};
export default TClusters;
