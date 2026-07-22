import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 12b — employees vs agents. VO 0.8s (21.8s).
export const compositionConfig = { id: 'PWhy', durationInSeconds: 27, fps: 30, width: 1920, height: 1080 };

const PWhy: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="09" label="THE SCHOOLS // WHAT HE WAS REACHING FOR" />

      <div style={{ position: 'absolute', top: 170, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={50}>Not a toy. <span style={{ color: DL.gold }}>Headcount.</span></Headline>
        <div style={{ marginTop: 12, fontFamily: DL_SANS, fontSize: 30, color: DL.dim, opacity: interpolate(frame, [90, 116], [0, 1], DCLAMP) }}>A one-man company has one man&rsquo;s hours — and his were maxed out years ago.</div>
      </div>

      <div style={{ position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 44 }}>
        <div style={{ opacity: interpolate(frame, [160, 186], [0, 1], DCLAMP) * 0.62, width: 560, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 20, padding: '34px 38px' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.faint }}>DOOR ONE · EMPLOYEES</div>
          <div style={{ marginTop: 20, fontFamily: DL_SERIF, fontSize: 36, color: DL.dim, lineHeight: 1.4 }}>the obvious answer —<br />and payroll math makes<br />obvious answers expensive</div>
        </div>
        <div style={{ opacity: interpolate(frame, [280, 306], [0, 1], DCLAMP), width: 560, background: DL.panel, border: `1px solid ${DL.gold}`, borderRadius: 20, padding: '34px 38px' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.gold }}>DOOR TWO · AGENTS</div>
          <div style={{ marginTop: 20, fontFamily: DL_SERIF, fontSize: 36, color: DL.text, lineHeight: 1.4 }}>nobody respectable<br />had walked through it yet.<br /><span style={{ fontStyle: 'italic', color: DL.gold }}>Perfect.</span></div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default PWhy;
