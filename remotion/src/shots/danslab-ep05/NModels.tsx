import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep05 07c — model switching: cheap for volume, strongest for deep, council for too-close. VO 0.8s (~30s).
export const compositionConfig = { id: 'NModels', durationInSeconds: 36, fps: 30, width: 1920, height: 1080 };

const TIERS: { tag: string; desc: string; color: string }[] = [
  { tag: 'VOLUME', desc: 'fast, cheap models', color: DL.green },
  { tag: 'DEEP CALLS', desc: 'the strongest one', color: DL.gold },
  { tag: 'TOO CLOSE TO CALL', desc: 'convene several — let them argue', color: DL.sky },
];

const NModels: React.FC = () => {
  const frame = useCurrentFrame();
  const punch = interpolate(frame, [780, 805], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="05" label="HOW IT THINKS // WHICH MODEL" />
      <div style={{ position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>The routing goes one level <span style={{ color: DL.sky }}>deeper.</span></Headline>
        <div style={{ marginTop: 6 }}><Headline at={48} size={38} italic color={DL.warm}>Every task also gets a model — never the priciest brain by default.</Headline></div>
      </div>
      <div style={{ position: 'absolute', top: 384, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 28 }}>
        {TIERS.map((t, i) => {
          const a = 120 + i * 80;
          const op = interpolate(frame, [a, a + 20], [0, 1], DCLAMP);
          const y = interpolate(frame, [a, a + 24], [28, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={t.tag} style={{ opacity: op, transform: `translateY(${y}px)`, width: 380, background: DL.panel, border: `1px solid ${t.color}55`, borderRadius: 18, padding: '32px 28px', textAlign: 'center' }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: t.color, marginBottom: 14 }}>{t.tag}</div>
              <div style={{ fontFamily: DL_SERIF, fontSize: 32, color: DL.text, lineHeight: 1.35 }}>{t.desc}</div>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', opacity: punch }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>Exactly the intelligence each task deserves — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.gold }}>not a cent more.</span>
      </div>
    </AbsoluteFill>
  );
};
export default NModels;
