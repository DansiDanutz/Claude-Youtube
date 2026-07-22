import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP, SiteBg, DlLogo, DlWordmark } from '../../lib/danslab';
import { FilmStrip } from '../../lib/ep07kit';

// Ep07 18 — outro: No.07 The Factory, seven stories, one company. VO 0.8s (20.0s).
export const compositionConfig = { id: 'FOutro', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const STRIP = ['ep01a', 'ep02a', 'ep03a', 'ep04a', 'ep05a', 'ep06a', 'ep06b', 'ep05b'].map((n) => staticFile(`projects/danslab-ep07/${n}.png`));

const FOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const markOp = interpolate(frame, [20, 44], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const nameOp = interpolate(frame, [60, 84], [0, 1], DCLAMP);
  const lineOp = interpolate(frame, [190, 214], [0, 1], DCLAMP);
  const subOp = interpolate(frame, [330, 354], [0, 1], DCLAMP);
  const motoOp = interpolate(frame, [440, 466], [0, 1], DCLAMP);
  const motoScale = interpolate(frame, [440, 480], [0.9, 1], { ...DCLAMP, easing: DL_EASE.out });
  const fade = interpolate(frame, [590, 620], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1a1206" />

      {/* the whole catalogue drifts behind the sign-off */}
      <div style={{ position: 'absolute', top: 60, left: 0, right: 0, opacity: 0.3 }}>
        <FilmStrip items={STRIP} at={0} h={150} speed={0.55} />
      </div>
      <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, opacity: 0.3 }}>
        <FilmStrip items={STRIP} at={0} h={150} speed={-0.45} />
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ opacity: markOp }}><DlLogo size={116} /></div>
        <div style={{ opacity: nameOp, fontFamily: DL_MONO, fontSize: 24, letterSpacing: 8, color: DL.red, marginTop: 26 }}>DANSLAB · NO. 07</div>
        <div style={{ opacity: nameOp, fontFamily: DL_SERIF, fontWeight: 500, fontSize: 84, color: DL.text, marginTop: 8 }}>The <span style={{ fontStyle: 'italic', color: DL.gold }}>Factory</span></div>

        <div style={{ opacity: lineOp, marginTop: 40, textAlign: 'center' }}>
          <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>Seven stories. One company. Built entirely in the open.</div>
          <div style={{ marginTop: 10, fontFamily: DL_SANS, fontSize: 30, color: DL.dim }}>From a hacked server — to an economy.</div>
        </div>

        <div style={{ opacity: subOp, marginTop: 38, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 34, color: DL.text, background: DL.red, borderRadius: 12, padding: '12px 30px' }}>▶ Subscribe</span>
          <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim }}>now go and build your own</span>
        </div>

        <div style={{ opacity: motoOp, transform: `scale(${motoScale})`, marginTop: 54, display: 'flex', alignItems: 'center', gap: 22 }}>
          <DlWordmark size={40} />
          <span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 3, color: DL.gold }}>Build. Ship. Repeat.</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default FOutro;
