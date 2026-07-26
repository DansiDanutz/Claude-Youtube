import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, HermesLogo } from '../../lib/danslab';

// Ch2 · the problem. VO flw08: nobody joins before understanding agents/Hermes.
export const compositionConfig = { id: 'ZWhoJoins', durationInSeconds: 15, fps: 30, width: 1920, height: 1080 };

const Q = ['What is an agent?', 'What does Hermes do?', 'Why trust workers with no bank accounts?'];

const ZWhoJoins: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="11" label="THE FLYWHEEL // THE PROBLEM" />
      <div style={{ position: 'absolute', top: 160, left: 120, width: 1100 }}>
        <div style={{ ...rise(20), fontFamily: DL_SERIF, fontSize: 54, color: DL.text, lineHeight: 1.35 }}>
          Nobody joins an agent marketplace before they can answer <span style={{ color: DL.red, fontStyle: 'italic' }}>three questions.</span>
        </div>
        <div style={{ marginTop: 50, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {Q.map((q, i) => (
            <div key={q} style={{
              ...rise(160 + i * 70), display: 'flex', alignItems: 'center', gap: 24,
              background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${DL.red}`,
              borderRadius: 14, padding: '20px 30px',
            }}>
              <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 28, color: DL.red }}>?</span>
              <span style={{ fontFamily: DL_SANS, fontSize: 32, color: DL.text }}>{q}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', top: 300, right: 170, opacity: interpolate(f, [220, 260], [0, 1], DCLAMP) }}>
        <HermesLogo size={210} start={220} />
      </div>
    </AbsoluteFill>
  );
};
export default ZWhoJoins;
