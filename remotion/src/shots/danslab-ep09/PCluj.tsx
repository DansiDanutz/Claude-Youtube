import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { MacStudioBox } from '../../lib/ep08kit';

// Ep09 3 — the workshop. VO 0.8s (21.6s).
export const compositionConfig = { id: 'PCluj', durationInSeconds: 25, fps: 30, width: 1920, height: 1080 };

const PCluj: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="09" label="THE TABLE // CLUJ-NAPOCA" />

      <div style={{ position: 'absolute', top: 170, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={50}>Above the old town, a workshop.</Headline>
        <div style={{ marginTop: 10, fontFamily: DL_MONO, fontSize: 23, letterSpacing: 4, color: DL.faint }}>CLUJ-NAPOCA · ROMANIA · A BUILDING THAT USED TO BE A BANK</div>
      </div>

      <div style={{ position: 'absolute', top: 350, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 22 }}>
        {[['bare walls', 90], ['two monitors', 116], ['one Mac Studio', 142], ['and a poker chip', 190]].map(([t, at], i) => (
          <div key={String(t)} style={{ opacity: interpolate(frame, [Number(at), Number(at) + 16], [0, 1], DCLAMP), background: DL.panel, border: `1px solid ${i === 3 ? DL.gold : DL.border}`, borderRadius: 999, padding: '16px 34px', fontFamily: DL_SERIF, fontSize: 34, color: i === 3 ? DL.gold : DL.text }}>{t}</div>
        ))}
      </div>

      <div style={{ position: 'absolute', top: 520, left: '50%', transform: 'translateX(-50%)' }}>
        <MacStudioBox at={230} w={480} label="" />
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [430, 458], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>One small object on the desk explains everything else in the room.</span>
      </div>
    </AbsoluteFill>
  );
};
export default PCluj;
