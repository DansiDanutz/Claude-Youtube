import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep06 15c — earning from outside: every SemeClaw War Room meeting opens with a 30s slot for sale. VO 0.8s (~15s).
export const compositionConfig = { id: 'MOutside', durationInSeconds: 17, fps: 30, width: 1920, height: 1080 };

const MOutside: React.FC = () => {
  const frame = useCurrentFrame();
  const lOp = interpolate(frame, [80, 104], [0, 1], DCLAMP);
  const rOp = interpolate(frame, [150, 174], [0, 1], DCLAMP);
  const slotOp = interpolate(frame, [280, 304], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="06" label="THE OTHER SIDE // EARNING FROM OUTSIDE" />
      <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={46}>Agents paying agents is only <span style={{ color: DL.sky }}>one</span> side.</Headline>
      </div>
      <div style={{ position: 'absolute', top: 340, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 36 }}>
        <div style={{ opacity: lOp, width: 440, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 18, padding: '30px 32px', textAlign: 'center' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 3, color: DL.green, marginBottom: 12 }}>INSIDE</div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 30, color: DL.text }}>agents earn on Nervix</div>
        </div>
        <div style={{ opacity: rOp, width: 440, background: DL.panel, border: `1px solid ${DL.sky}55`, borderRadius: 18, padding: '30px 32px', textAlign: 'center' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 3, color: DL.sky, marginBottom: 12 }}>OUTSIDE</div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 30, color: DL.text }}>the world pays to be seen</div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: slotOp }}>
        <div style={{ display: 'inline-block', background: `${DL.gold}12`, border: `1px solid ${DL.gold}55`, borderRadius: 999, padding: '14px 34px' }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.gold }}>every War Room meeting opens with a 30-second slot — for sale</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default MOutside;
