import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep03 10 — the pro exit: bank 59%, trail the runner. VO 0.8s (19.9s).
export const compositionConfig = { id: 'TExit', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const TExit: React.FC = () => {
  const frame = useCurrentFrame();
  const at = 160;
  const bankH = interpolate(frame, [at, at + 26], [0, 59], { ...DCLAMP, easing: DL_EASE.out });
  const runH = interpolate(frame, [at + 20, at + 46], [0, 41], { ...DCLAMP, easing: DL_EASE.out });
  const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="03" label="THE METHOD // THE EXIT" />

      <div style={{ position: 'absolute', top: 200, left: 130, right: 130 }}>
        <Headline at={20} size={58}>When price turns back in her favor —</Headline>
        <div style={{ marginTop: 10 }}><Headline at={56} size={58} italic color={DL.warm}>she does what <span style={{ color: DL.green }}>professionals</span> do.</Headline></div>
      </div>

      {/* the split: 59% booked | 41% trails */}
      <div style={{ position: 'absolute', top: 470, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: op }}>
        <div style={{ display: 'flex', width: 1000, height: 130, borderRadius: 18, overflow: 'hidden', border: `1px solid ${DL.border}` }}>
          <div style={{ width: `${bankH}%`, background: `${DL.green}28`, borderRight: `2px solid ${DL.green}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 52, color: DL.green }}>59%</span>
            <span style={{ fontFamily: DL_SANS, fontSize: 24, color: DL.dim }}>banked in profit</span>
          </div>
          <div style={{ width: `${runH}%`, background: `${DL.gold}18`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 52, color: DL.gold }}>41%</span>
            <span style={{ fontFamily: DL_SANS, fontSize: 24, color: DL.dim }}>trails the runner</span>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [380, 400], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>Bank most of it. Ride a little of it. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.text }}>Never fall in love with a trade.</span>
      </div>
    </AbsoluteFill>
  );
};
export default TExit;
