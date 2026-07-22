import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 8 — not a Silicon Valley founder. VO 0.8s (18.4s).
export const compositionConfig = { id: 'PNotCoder', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const PNotCoder: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="09" label="THE SCHOOLS // WHAT HE IS NOT" />

      <div style={{ position: 'absolute', top: 300, left: 170 }}>
        <div style={{ opacity: interpolate(frame, [40, 66], [0, 1], DCLAMP), textAlign: 'center' }}>
          <Avatar src={staticFile('projects/danslab-ep09/dan-avatar.jpg')} size={300} color={DL.gold} />
          <div style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.text, marginTop: 16 }}>Dan Semenescu</div>
          <div style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.faint }}>mathematics &amp; informatics · not a developer</div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 240, right: 170, width: 780 }}>
        <Headline at={16} size={48}>His skills are <span style={{ color: DL.gold }}>older than software.</span></Headline>
        <div style={{ marginTop: 36 }}>
          {[['Imagination', 130], ['Planning', 170], ['Competition', 210], ['A genuine, physical need to win', 250]].map(([t, at], i) => (
            <div key={String(t)} style={{ opacity: interpolate(frame, [Number(at), Number(at) + 16], [0, 1], DCLAMP), display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 18 }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.faint }}>0{i + 1}</span>
              <span style={{ fontFamily: DL_SERIF, fontSize: 46, color: i === 3 ? DL.gold : DL.text }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default PNotCoder;
