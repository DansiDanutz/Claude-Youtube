import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { StationLine, BigShot } from '../../lib/ep07kit';

// Ep07 9 — station four: the 4K render. VO 0.8s (11.0s).
export const compositionConfig = { id: 'FRender', durationInSeconds: 13, fps: 30, width: 1920, height: 1080 };

const STATIONS = ['SCRIPT', 'VOICE', 'SCENES', 'RENDER', 'ASSEMBLE', 'DELIVER'];

const FRender: React.FC = () => {
  const frame = useCurrentFrame();
  const prog = interpolate(frame, [110, 330], [0, 1], DCLAMP);
  const framesDone = Math.round(prog * 8460);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="07" label="THE LINE // STATION 04 · RENDER" />

      <div style={{ position: 'absolute', top: 140, left: '50%', transform: 'translateX(-50%)' }}>
        <StationLine stations={STATIONS} at={0} w={1500} active={3} />
      </div>

      <div style={{ position: 'absolute', top: 350, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={46}>Every frame drawn at <span style={{ color: DL.gold }}>4K</span> — over eight million pixels each.</Headline>
      </div>

      <div style={{ position: 'absolute', top: 470, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 44 }}>
        <BigShot src={staticFile('projects/danslab-ep07/ep05a.png')} at={70} w={760} />
        <div style={{ opacity: interpolate(frame, [100, 122], [0, 1], DCLAMP) }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.faint }}>RENDERING</div>
          <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 76, color: DL.gold, lineHeight: 1.1 }}>3840×2160</div>
          <div style={{ marginTop: 20, width: 420, height: 10, borderRadius: 999, background: '#ffffff14', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${prog * 100}%`, background: `linear-gradient(90deg, ${DL.red}, ${DL.gold})` }} />
          </div>
          <div style={{ marginTop: 14, fontFamily: DL_MONO, fontSize: 26, color: DL.dim }}>{framesDone.toLocaleString()} frames</div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [250, 278], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 38, color: DL.warm }}>One scene at a time — so a ten-minute film never runs out of memory.</span>
      </div>
    </AbsoluteFill>
  );
};
export default FRender;
