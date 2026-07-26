import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// Ch5 · SemeClaw. VO flw17: watch models talk to each other. Two typing panels
// exchange messages with deterministic typewriter reveals.
export const compositionConfig = { id: 'ZSemeClaw', durationInSeconds: 14, fps: 30, width: 1920, height: 1080 };

const CHAT: [string, string, number][] = [
  ['claude', 'The deploy failed twice — I suspect the port is already bound.', 90],
  ['gpt', 'Agreed. Checking… yes: an orphan process from run 41. Kill and retry?', 190],
  ['claude', 'Kill it. Retrying now — watch the health endpoint.', 300],
];

const ZSemeClaw: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="11" label="THE FLYWHEEL // NODE 4 — SEMECLAW" />
      <div style={{ position: 'absolute', top: 150, left: 120 }}>
        <div style={{
          fontFamily: DL_SERIF, fontSize: 50, color: DL.text,
          opacity: interpolate(f, [8, 26], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
        }}>
          Install it — and <span style={{ color: DL.gold, fontStyle: 'italic' }}>watch the models talk.</span>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 310, left: 160, right: 160, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {CHAT.map(([who, text, at], i) => {
          const chars = Math.floor(interpolate(f, [at, at + 70], [0, text.length], DCLAMP));
          const op = interpolate(f, [at, at + 8], [0, 1], DCLAMP);
          const left = who === 'claude';
          return (
            <div key={i} style={{
              opacity: op, alignSelf: left ? 'flex-start' : 'flex-end', maxWidth: 900,
              background: DL.panel, border: `1px solid ${left ? DL.gold : DL.sky}`,
              borderRadius: 16, padding: '18px 26px',
            }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 19, letterSpacing: 3, color: left ? DL.gold : DL.sky, marginBottom: 8, textTransform: 'uppercase' }}>{who}</div>
              <div style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.text, lineHeight: 1.5 }}>
                {text.slice(0, chars)}<span style={{ opacity: f % 18 < 9 ? 1 : 0, color: DL.gold }}>▌</span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{
        position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center',
        fontFamily: DL_SANS, fontSize: 27, color: DL.dim,
        opacity: interpolate(f, [370, 392], [0, 1], DCLAMP),
      }}>
        How they argue. How they think. A window into the machine room.
      </div>
    </AbsoluteFill>
  );
};
export default ZSemeClaw;
