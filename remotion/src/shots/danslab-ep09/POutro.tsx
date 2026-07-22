import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP, SiteBg, DlLogo, DlWordmark } from '../../lib/danslab';
import { FilmStrip } from '../../lib/ep07kit';
import { PresenterFrom } from '../../lib/presenter';

// Ep09 38 — season finale outro. PresenterFrom slot: Dan waves out in person
// the moment dan-wave-out.mp4 exists in the cast library. VO 1.0s (20.7s).
export const compositionConfig = { id: 'POutro', durationInSeconds: 28, fps: 30, width: 1920, height: 1080 };

const STRIP = ['ep01a', 'ep02a', 'ep03a', 'ep04a', 'ep05a', 'ep06a'].map((n) => staticFile(`projects/danslab-ep07/${n}.png`))
  .concat(['ep07a', 'ep08a'].map((n) => staticFile(`projects/danslab-ep09/${n}.png`)));

const POutro: React.FC = () => {
  const frame = useCurrentFrame();
  const markOp = interpolate(frame, [20, 44], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const nameOp = interpolate(frame, [60, 84], [0, 1], DCLAMP);
  const lineOp = interpolate(frame, [210, 234], [0, 1], DCLAMP);
  const subOp = interpolate(frame, [390, 414], [0, 1], DCLAMP);
  const motoOp = interpolate(frame, [560, 586], [0, 1], DCLAMP);
  const motoScale = interpolate(frame, [560, 600], [0.9, 1], { ...DCLAMP, easing: DL_EASE.out });
  const fade = interpolate(frame, [800, 836], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1a1206" />

      <div style={{ position: 'absolute', top: 50, left: 0, right: 0, opacity: 0.28 }}>
        <FilmStrip items={STRIP} at={0} h={140} speed={0.5} />
      </div>
      <div style={{ position: 'absolute', bottom: 34, left: 0, right: 0, opacity: 0.28 }}>
        <FilmStrip items={STRIP} at={0} h={140} speed={-0.42} />
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ opacity: markOp }}><DlLogo size={116} /></div>
        <div style={{ opacity: nameOp, fontFamily: DL_MONO, fontSize: 24, letterSpacing: 8, color: DL.red, marginTop: 26 }}>DANSLAB · NO. 09 · SEASON FINALE</div>
        <div style={{ opacity: nameOp, fontFamily: DL_SERIF, fontWeight: 500, fontSize: 84, color: DL.text, marginTop: 8 }}>The <span style={{ fontStyle: 'italic', color: DL.gold }}>Player</span></div>

        <div style={{ opacity: lineOp, marginTop: 40, textAlign: 'center' }}>
          <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>The tools are public. The playbook is open. The game is barely in its first orbit.</div>
        </div>

        <div style={{ opacity: subOp, marginTop: 38, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 34, color: DL.text, background: DL.red, borderRadius: 12, padding: '12px 30px' }}>▶ Subscribe</span>
          <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim }}>take a seat — season two is being dealt</span>
        </div>

        <div style={{ opacity: motoOp, transform: `scale(${motoScale})`, marginTop: 54, display: 'flex', alignItems: 'center', gap: 22 }}>
          <DlWordmark size={40} />
          <span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 3, color: DL.gold }}>Build. Ship. Repeat.</span>
        </div>
      </AbsoluteFill>

      <PresenterFrom id="dan-wave-out" at={420} side="right" h={540} inset={60} shadow={false} />
    </AbsoluteFill>
  );
};
export default POutro;
