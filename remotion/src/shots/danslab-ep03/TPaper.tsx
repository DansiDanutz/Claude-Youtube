import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, StatCard, Chip } from '../../lib/ep03kit';

// Ep03 2 — she started on paper. VO 0.8s (23.2s): "Sienna did not start as a
// genius. Ten thousand dollars of virtual money... every day she takes trades,
// every night she studies what happened."
export const compositionConfig = { id: 'TPaper', durationInSeconds: 26, fps: 30, width: 1920, height: 1080 };

const TPaper: React.FC = () => {
  const frame = useCurrentFrame();
  const stampOp = interpolate(frame, [150, 165], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const stampRot = interpolate(frame, [150, 175], [-14, -8], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="03" label="THE HABIT // PAPER TRADING" />

      <div style={{ position: 'absolute', top: 200, left: 130, right: 130 }}>
        <Headline at={20} size={62}>She did not start as a genius.</Headline>
        <div style={{ marginTop: 14 }}><Headline at={64} size={62} italic color={DL.warm}>She started with a <span style={{ color: DL.gold }}>habit.</span></Headline></div>
      </div>

      {/* paper account card */}
      <div style={{ position: 'absolute', top: 470, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 34 }}>
        <StatCard label="Paper capital" big="$10,000" sub="virtual — not one real cent" color={DL.gold} at={150} w={420} />
        <StatCard label="Real risk" big="$0" sub="pure practice" color={DL.green} at={185} w={340} />
        <StatCard label="Cadence" big="Daily" sub="take trades, study results" color={DL.sky} at={220} w={380} />
      </div>

      {/* PAPER stamp */}
      <div style={{ position: 'absolute', top: 300, right: 200, opacity: stampOp, transform: `rotate(${stampRot}deg)`, border: `4px solid ${DL.red}`, borderRadius: 14, padding: '10px 26px' }}>
        <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 42, letterSpacing: 8, color: DL.red }}>PAPER</span>
      </div>

      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 18 }}>
        <Chip at={430} color={DL.gold}>real market prices</Chip>
        <Chip at={455} color={DL.green}>zero real risk</Chip>
        <Chip at={480} color={DL.sky}>a machine teaching herself</Chip>
      </div>
    </AbsoluteFill>
  );
};
export default TPaper;
