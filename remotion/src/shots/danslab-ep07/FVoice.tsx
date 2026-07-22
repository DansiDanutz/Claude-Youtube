import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { StationLine } from '../../lib/ep07kit';

// Ep07 6 — station two: the voice (TTS waveform). VO 0.8s (12.5s).
export const compositionConfig = { id: 'FVoice', durationInSeconds: 14, fps: 30, width: 1920, height: 1080 };

const STATIONS = ['SCRIPT', 'VOICE', 'SCENES', 'RENDER', 'ASSEMBLE', 'DELIVER'];
const BARS = 96;

const FVoice: React.FC = () => {
  const frame = useCurrentFrame();
  const waveIn = interpolate(frame, [70, 96], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="07" label="THE LINE // STATION 02 · VOICE" />

      <div style={{ position: 'absolute', top: 150, left: '50%', transform: 'translateX(-50%)' }}>
        <StationLine stations={STATIONS} at={0} w={1500} active={1} />
      </div>

      <div style={{ position: 'absolute', top: 380, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>Every scene goes out as text — and comes back as <span style={{ color: DL.green }}>audio.</span></Headline>
      </div>

      {/* waveform */}
      <div style={{ position: 'absolute', top: 520, left: '50%', transform: 'translateX(-50%)', width: 1240, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: waveIn }}>
        {Array.from({ length: BARS }, (_, i) => {
          const env = Math.sin((i / BARS) * Math.PI);
          const w1 = Math.sin(i * 0.62 + frame * 0.19);
          const w2 = Math.sin(i * 0.23 - frame * 0.11);
          const h = 12 + env * (52 + 46 * Math.abs(w1 * 0.6 + w2 * 0.4));
          const lit = i / BARS < ((frame - 70) / 200) % 1.2;
          return <div key={i} style={{ width: 7, height: h * 2, borderRadius: 4, background: lit ? DL.green : '#ffffff18' }} />;
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [250, 274], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>The narrator you are listening to right now. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.green }}>He has never seen a script.</span>
      </div>
    </AbsoluteFill>
  );
};
export default FVoice;
