import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP, SiteBg, DlLogo, DlWordmark } from '../../lib/danslab';
import { PresenterFrom } from '../../lib/presenter';

// Ep08 16 — outro. Carries a PresenterFrom slot: the moment dan-wave-out.mp4
// exists in the cast library, Dan waves goodbye in person; until then the
// scene is complete without him. VO 0.8s (20.1s).
export const compositionConfig = { id: 'StOutro', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const StOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const markOp = interpolate(frame, [20, 44], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const nameOp = interpolate(frame, [60, 84], [0, 1], DCLAMP);
  const lineOp = interpolate(frame, [200, 224], [0, 1], DCLAMP);
  const subOp = interpolate(frame, [340, 364], [0, 1], DCLAMP);
  const motoOp = interpolate(frame, [470, 496], [0, 1], DCLAMP);
  const motoScale = interpolate(frame, [470, 510], [0.9, 1], { ...DCLAMP, easing: DL_EASE.out });
  const fade = interpolate(frame, [620, 650], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1a1206" />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ opacity: markOp }}><DlLogo size={118} /></div>
        <div style={{ opacity: nameOp, fontFamily: DL_MONO, fontSize: 24, letterSpacing: 8, color: DL.red, marginTop: 26 }}>DANSLAB · NO. 08</div>
        <div style={{ opacity: nameOp, fontFamily: DL_SERIF, fontWeight: 500, fontSize: 84, color: DL.text, marginTop: 8 }}>The <span style={{ fontStyle: 'italic', color: DL.gold }}>Studio</span></div>

        <div style={{ opacity: lineOp, marginTop: 42, textAlign: 'center' }}>
          <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>Machines in the cloud. One desk. One right hand. One human.</div>
        </div>

        <div style={{ opacity: subOp, marginTop: 38, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 34, color: DL.text, background: DL.red, borderRadius: 12, padding: '12px 30px' }}>▶ Subscribe</span>
          <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim }}>be here when we finally meet him</span>
        </div>

        <div style={{ opacity: motoOp, transform: `scale(${motoScale})`, marginTop: 54, display: 'flex', alignItems: 'center', gap: 22 }}>
          <DlWordmark size={40} />
          <span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 3, color: DL.gold }}>Build. Ship. Repeat.</span>
        </div>
      </AbsoluteFill>

      {/* Dan waves out in person once the cast clip exists; skips cleanly until then */}
      <PresenterFrom id="dan-wave-out" at={320} side="right" h={560} inset={70} shadow={false} />
    </AbsoluteFill>
  );
};
export default StOutro;
