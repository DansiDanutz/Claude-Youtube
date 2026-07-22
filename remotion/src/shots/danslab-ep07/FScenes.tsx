import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { StationLine, ImageCard } from '../../lib/ep07kit';

// Ep07 7 — station three: the scenes are CODE. Left: source. Right: the real
// frame that source produced. VO 0.8s (17.4s).
export const compositionConfig = { id: 'FScenes', durationInSeconds: 19, fps: 30, width: 1920, height: 1080 };

const STATIONS = ['SCRIPT', 'VOICE', 'SCENES', 'RENDER', 'ASSEMBLE', 'DELIVER'];
const CODE: [string, string][] = [
  ['const', ' frame = useCurrentFrame();'],
  ['const', ' op = interpolate(frame, [0, 18], [0, 1]);'],
  ['return', ' <AbsoluteFill style={{ opacity: op }}>'],
  ['', '  <LadderStep lev={20} usd={100} at={40} />'],
  ['', '  <LadderStep lev={10} usd={200} at={70} />'],
  ['', '</AbsoluteFill>'],
];

const FScenes: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="07" label="THE LINE // STATION 03 · SCENES" />

      <div style={{ position: 'absolute', top: 150, left: '50%', transform: 'translateX(-50%)' }}>
        <StationLine stations={STATIONS} at={0} w={1500} active={2} />
      </div>

      <div style={{ position: 'absolute', top: 370, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={46}>The scenes aren&rsquo;t filmed. They aren&rsquo;t drawn. <span style={{ color: DL.red }}>They are code.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 500, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 54 }}>
        <div style={{ width: 780, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 16, padding: '24px 30px', opacity: interpolate(frame, [70, 92], [0, 1], DCLAMP) }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 18, letterSpacing: 2, color: DL.faint, marginBottom: 14 }}>src/shots/danslab-ep03/SLadder.tsx</div>
          {CODE.map(([kw, rest], i) => {
            const a = 96 + i * 14;
            return (
              <div key={i} style={{ opacity: interpolate(frame, [a, a + 12], [0, 1], DCLAMP), fontFamily: DL_MONO, fontSize: 22, lineHeight: 1.75, whiteSpace: 'pre', color: DL.dim }}>
                <span style={{ color: DL.sky }}>{kw}</span>{rest}
              </div>
            );
          })}
        </div>

        <div style={{ fontFamily: DL_MONO, fontSize: 46, color: DL.gold, opacity: interpolate(frame, [180, 200], [0, 1], DCLAMP) }}>→</div>

        <ImageCard src={staticFile('projects/danslab-ep07/ep03a.png')} at={200} w={520} label="30 FRAMES / SECOND" />
      </div>

      <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [370, 396], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 38, color: DL.warm }}>Every frame of this series — redrawn thirty times a second.</span>
      </div>
    </AbsoluteFill>
  );
};
export default FScenes;
