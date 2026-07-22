import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, Img, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { StationLine } from '../../lib/ep07kit';

// Ep07 10 — station five: assembly. A four-lane timeline: video / voice / SFX /
// music, with the music visibly ducking under the voice. VO 0.8s (20.0s).
export const compositionConfig = { id: 'FAssemble', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const STATIONS = ['SCRIPT', 'VOICE', 'SCENES', 'RENDER', 'ASSEMBLE', 'DELIVER'];
const W = 1420;
const LANE_AT = 120;

// voice blocks as [start, width] fractions of the lane
const VOICE = [[0.03, 0.16], [0.23, 0.14], [0.42, 0.2], [0.68, 0.12], [0.84, 0.13]];
const SFX = [0.04, 0.12, 0.2, 0.25, 0.33, 0.41, 0.47, 0.55, 0.62, 0.69, 0.75, 0.81, 0.88, 0.94];
const THUMBS = ['ep01a', 'ep01b', 'ep02a', 'ep02b', 'ep03a', 'ep03b', 'ep04a', 'ep04b', 'ep05a', 'ep05b', 'ep06a', 'ep06b'].map((n) => staticFile(`projects/danslab-ep07/${n}.png`));

const Lane: React.FC<{ label: string; color: string; y: number; idx: number; children: React.ReactNode }> = ({ label, color, y, idx, children }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [LANE_AT + idx * 16, LANE_AT + idx * 16 + 16], [0, 1], DCLAMP);
  return (
    <div style={{ position: 'absolute', top: y, left: '50%', transform: 'translateX(-50%)', width: W, opacity: op }}>
      <div style={{ fontFamily: DL_MONO, fontSize: 18, letterSpacing: 3, color, marginBottom: 8 }}>{label}</div>
      <div style={{ position: 'relative', height: 60, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 10, overflow: 'hidden' }}>{children}</div>
    </div>
  );
};

const FAssemble: React.FC = () => {
  const frame = useCurrentFrame();
  const play = interpolate(frame, [LANE_AT + 70, 600], [0, 1], DCLAMP);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="07" label="THE LINE // STATION 05 · ASSEMBLE" />

      <div style={{ position: 'absolute', top: 130, left: '50%', transform: 'translateX(-50%)' }}>
        <StationLine stations={STATIONS} at={0} w={1500} active={4} />
      </div>

      <div style={{ position: 'absolute', top: 330, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={44}>Voice on the timeline. Music in three movements. Ninety sound cues.</Headline>
      </div>

      <Lane label="VIDEO" color={DL.faint} y={440} idx={0}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 3 }}>
          {THUMBS.map((src, i) => (
            <div key={i} style={{ flex: 1, overflow: 'hidden' }}>
              <Img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
            </div>
          ))}
        </div>
      </Lane>

      <Lane label="VOICE" color={DL.green} y={560} idx={1}>
        {VOICE.map(([s, w], i) => (
          <div key={i} style={{ position: 'absolute', left: `${s * 100}%`, width: `${w * 100}%`, top: 8, bottom: 8, borderRadius: 6, background: `${DL.green}33`, border: `1px solid ${DL.green}` }} />
        ))}
      </Lane>

      <Lane label="SFX" color={DL.gold} y={680} idx={2}>
        {SFX.map((s, i) => (
          <div key={i} style={{ position: 'absolute', left: `${s * 100}%`, width: 5, top: 10, bottom: 10, borderRadius: 3, background: DL.gold }} />
        ))}
      </Lane>

      <Lane label="MUSIC · DUCKED UNDER VOICE" color={DL.sky} y={800} idx={3}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 4, padding: '0 8px' }}>
          {Array.from({ length: 120 }, (_, i) => {
            const x = i / 120;
            const near = VOICE.some(([s, w]) => x >= s - 0.01 && x <= s + w + 0.01);
            const h = (10 + 26 * Math.abs(Math.sin(i * 0.5 + frame * 0.06))) * (near ? 0.32 : 1);
            return <div key={i} style={{ flex: 1, height: h, borderRadius: 2, background: near ? `${DL.sky}55` : DL.sky }} />;
          })}
        </div>
      </Lane>

      {/* playhead */}
      <div style={{ position: 'absolute', top: 470, height: 400, left: `calc(50% - ${W / 2}px + ${play * W}px)`, width: 3, background: DL.red, opacity: interpolate(frame, [LANE_AT + 60, LANE_AT + 76], [0, 1], DCLAMP), boxShadow: `0 0 18px ${DL.red}` }} />

      <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [520, 548], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.warm }}>mastered to −14 LUFS · broadcast loudness</span>
      </div>
    </AbsoluteFill>
  );
};
export default FAssemble;
