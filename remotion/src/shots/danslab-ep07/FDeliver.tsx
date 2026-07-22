import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { Check } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { StationLine, ImageCard } from '../../lib/ep07kit';

// Ep07 11 — station six: a 4K master lands on Dan's desktop. VO 0.8s (15.6s).
export const compositionConfig = { id: 'FDeliver', durationInSeconds: 18, fps: 30, width: 1920, height: 1080 };

const STATIONS = ['SCRIPT', 'VOICE', 'SCENES', 'RENDER', 'ASSEMBLE', 'DELIVER'];
const FILES = ['danslab-ep06-marketplace-4k.mp4', 'thumb-a.png', 'thumb-b.png', 'description.txt'];

const FDeliver: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="07" label="THE LINE // STATION 06 · DELIVER" />

      <div style={{ position: 'absolute', top: 130, left: '50%', transform: 'translateX(-50%)' }}>
        <StationLine stations={STATIONS} at={0} w={1500} active={5} />
      </div>

      <div style={{ position: 'absolute', top: 330, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={46}>A 4K master lands in a folder on Dan&rsquo;s desktop. <span style={{ color: DL.green }}>Ready to publish.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 470, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60 }}>
        <ImageCard src={staticFile('projects/danslab-ep07/ep06b.png')} at={70} w={620} label="~/Desktop/claudeYouTube/" />

        <div style={{ width: 640, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 16, padding: '26px 30px', opacity: interpolate(frame, [120, 144], [0, 1], DCLAMP) }}>
          {FILES.map((f, i) => {
            const a = 150 + i * 20;
            return (
              <div key={f} style={{ opacity: interpolate(frame, [a, a + 14], [0, 1], DCLAMP), display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < FILES.length - 1 ? `1px solid ${DL.border}` : 'none' }}>
                <Check size={22} color={DL.green} />
                <span style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.dim }}>{f}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [340, 368], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>No camera. No studio. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.gold }}>No editor.</span>
      </div>
    </AbsoluteFill>
  );
};
export default FDeliver;
