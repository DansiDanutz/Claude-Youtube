import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP, SiteBg, DlLogo, DlWordmark } from '../../lib/danslab';

// Ep05 20 — outro: No.05 The Brain → tease Nervix/Marketplace → subscribe →
// Build. Ship. Repeat. VO 1.0s (18.7s).
export const compositionConfig = { id: 'NOutro', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const NOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const markOp = interpolate(frame, [20, 44], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const nameOp = interpolate(frame, [60, 84], [0, 1], DCLAMP);
  const nextOp = interpolate(frame, [210, 234], [0, 1], DCLAMP);
  const subOp = interpolate(frame, [340, 364], [0, 1], DCLAMP);
  const motoOp = interpolate(frame, [440, 466], [0, 1], DCLAMP);
  const motoScale = interpolate(frame, [440, 480], [0.9, 1], { ...DCLAMP, easing: DL_EASE.out });
  const fade = interpolate(frame, [590, 620], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0a1520" />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ opacity: markOp }}><DlLogo size={120} /></div>
        <div style={{ opacity: nameOp, fontFamily: DL_MONO, fontSize: 24, letterSpacing: 8, color: DL.red, marginTop: 28 }}>DANSLAB · NO. 05</div>
        <div style={{ opacity: nameOp, fontFamily: DL_SERIF, fontWeight: 500, fontSize: 92, color: DL.text, marginTop: 8 }}>The <span style={{ fontStyle: 'italic', color: DL.sky }}>Brain</span></div>

        <div style={{ opacity: nextOp, marginTop: 44, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>
          Next: <span style={{ color: DL.text }}>The Marketplace</span> — where the whole world plugs in and gets paid. Its name is <span style={{ color: DL.gold }}>Nervix.</span>
        </div>

        <div style={{ opacity: subOp, marginTop: 36, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 34, color: DL.text, background: DL.red, borderRadius: 12, padding: '12px 30px' }}>▶ Subscribe</span>
          <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim }}>watch a company become a platform</span>
        </div>

        <div style={{ opacity: motoOp, transform: `scale(${motoScale})`, marginTop: 60, display: 'flex', alignItems: 'center', gap: 22 }}>
          <DlWordmark size={40} />
          <span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 3, color: DL.gold }}>Build. Ship. Repeat.</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default NOutro;
