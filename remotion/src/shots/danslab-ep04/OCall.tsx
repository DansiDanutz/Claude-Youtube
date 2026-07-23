import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Check, X } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep04 10c — the gap: Paperclip tracks WHAT, not what they should DECIDE. VO 0.8s (~17s).
export const compositionConfig = { id: 'OCall', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const OCall: React.FC = () => {
  const frame = useCurrentFrame();
  const l = interpolate(frame, [90, 112], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const r = interpolate(frame, [170, 192], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const punch = interpolate(frame, [360, 384], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="04" label="THE OVERSEER // ONLY HALF THE QUESTION" />
      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={50}>A control plane answers <span style={{ color: DL.gold }}>half</span> the question.</Headline>
      </div>
      <div style={{ position: 'absolute', top: 360, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 40 }}>
        <div style={{ opacity: l, width: 560, background: DL.panel, border: `1px solid ${DL.green}44`, borderRadius: 20, padding: '38px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}><Check size={30} color={DL.green} /><span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.green }}>PAPERCLIP KNOWS</span></div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 36, color: DL.text, lineHeight: 1.4 }}>what every agent is doing.</div>
        </div>
        <div style={{ opacity: r, width: 560, background: DL.panel, border: `1px solid ${DL.red}55`, borderRadius: 20, padding: '38px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}><X size={30} color={DL.red} /><span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.red }}>IT CANNOT SAY</span></div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 36, color: DL.text, lineHeight: 1.4 }}>what they should decide.</div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 84, left: 0, right: 0, textAlign: 'center', opacity: punch }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>Four smart machines disagree — and someone has to be </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.gold }}>right.</span>
      </div>
    </AbsoluteFill>
  );
};
export default OCall;
