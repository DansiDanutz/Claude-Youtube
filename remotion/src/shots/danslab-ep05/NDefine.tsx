import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Database, Gavel } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep05 2 — a brain is not storage, it's judgment. VO 0.8s (19.3s).
export const compositionConfig = { id: 'NDefine', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const NDefine: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="05" label="WHAT A BRAIN DOES // JUDGMENT" />

      <div style={{ position: 'absolute', top: 200, left: 130, right: 130 }}>
        <Headline at={20} size={58}>So what is a brain, really?</Headline>
      </div>

      <div style={{ position: 'absolute', top: 420, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60 }}>
        <div style={{ ...(() => { const op = interpolate(frame, [150, 168], [0, 1], DCLAMP); return { opacity: op }; })(), width: 420, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 18, padding: '32px 40px', textAlign: 'center', filter: 'grayscale(0.6)' }}>
          <Database size={44} color={DL.faint} />
          <div style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.faint, marginTop: 14, letterSpacing: 2 }}>NOT STORAGE</div>
          <div style={{ fontFamily: DL_SANS, fontSize: 24, color: DL.muted, marginTop: 10 }}>not a list of tasks</div>
        </div>
        <div style={{ fontFamily: DL_MONO, fontSize: 40, color: DL.faint, opacity: interpolate(frame, [200, 220], [0, 1], DCLAMP) }}>→</div>
        <div style={{ opacity: interpolate(frame, [230, 250], [0, 1], DCLAMP), transform: `scale(${interpolate(frame, [230, 256], [0.9, 1], { ...DCLAMP, easing: DL_EASE.out })})`, width: 460, background: DL.panel, border: `1px solid ${DL.sky}55`, borderRadius: 18, padding: '32px 40px', textAlign: 'center', boxShadow: `0 0 60px ${DL.sky}18` }}>
          <Gavel size={44} color={DL.sky} />
          <div style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.sky, marginTop: 14, letterSpacing: 2 }}>JUDGMENT</div>
          <div style={{ fontFamily: DL_SANS, fontSize: 24, color: DL.text, marginTop: 10 }}>deciding what matters</div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [330, 352], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>The difference between a company that is merely busy — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.sky }}>and one that wins.</span>
      </div>
    </AbsoluteFill>
  );
};
export default NDefine;
