import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { StationLine } from '../../lib/ep07kit';

// Ep07 5 — station one: the script (JSON narration). VO 0.8s (12.1s).
export const compositionConfig = { id: 'FScript', durationInSeconds: 14, fps: 30, width: 1920, height: 1080 };

const STATIONS = ['SCRIPT', 'VOICE', 'SCENES', 'RENDER', 'ASSEMBLE', 'DELIVER'];
const LINES: [string, string][] = [
  ['"id"', '"s04_idea"'],
  ['"text"', '"So Dexter didn\'t build an editor..."'],
  ['"id"', '"s05_script"'],
  ['"text"', '"Station one: the script..."'],
];

const FScript: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="07" label="THE LINE // STATION 01 · SCRIPT" />

      <div style={{ position: 'absolute', top: 150, left: '50%', transform: 'translateX(-50%)' }}>
        <StationLine stations={STATIONS} at={0} w={1500} active={0} />
      </div>

      <div style={{ position: 'absolute', top: 380, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>The story is written as <span style={{ color: DL.sky }}>narration</span> — scene by scene.</Headline>
      </div>

      <div style={{ position: 'absolute', top: 500, left: '50%', transform: 'translateX(-50%)', width: 1080, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 16, padding: '26px 34px', opacity: interpolate(frame, [70, 92], [0, 1], DCLAMP) }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 19, letterSpacing: 2, color: DL.faint, marginBottom: 16 }}>narration/script.json</div>
        {LINES.map(([k, v], i) => {
          const a = 96 + i * 16;
          const op = interpolate(frame, [a, a + 12], [0, 1], DCLAMP);
          return (
            <div key={i} style={{ opacity: op, fontFamily: DL_MONO, fontSize: 25, lineHeight: 1.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <span style={{ color: DL.gold }}>{k}</span>
              <span style={{ color: DL.faint }}>: </span>
              <span style={{ color: DL.green }}>{v}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [230, 254], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 38, color: DL.warm }}>Tuned so a machine can read it out loud without stumbling.</span>
      </div>
    </AbsoluteFill>
  );
};
export default FScript;
