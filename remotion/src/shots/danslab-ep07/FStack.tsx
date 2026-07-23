import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep07 11b — every station runs on a named tool. VO 0.8s (~18s).
export const compositionConfig = { id: 'FStack', durationInSeconds: 28, fps: 30, width: 1920, height: 1080 };

const TOOLS: [string, string, string][] = [
  ['SCRIPT', 'the model council', DL.sky],
  ['VOICE', 'ElevenLabs', DL.gold],
  ['FRAMES', 'Remotion · React', DL.green],
  ['RESEARCH', 'crawled live', DL.red],
  ['THUMBNAILS', 'Gemini', DL.warm],
];

const FStack: React.FC = () => {
  const frame = useCurrentFrame();
  const punch = interpolate(frame, [420, 444], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="07" label="THE LINE // NAMED TOOLS, NOT MAGIC" />
      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>Every station runs on a <span style={{ color: DL.green }}>named tool.</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 20 }}>
        {TOOLS.map(([st, tool, color], i) => {
          const a = 100 + i * 26;
          const op = interpolate(frame, [a, a + 18], [0, 1], DCLAMP);
          const y = interpolate(frame, [a, a + 22], [24, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={st} style={{ opacity: op, transform: `translateY(${y}px)`, width: 300, background: DL.panel, border: `1px solid ${color}55`, borderRadius: 16, padding: '26px 20px', textAlign: 'center' }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 18, letterSpacing: 3, color: DL.faint, marginBottom: 12 }}>{st}</div>
              <div style={{ fontFamily: DL_SERIF, fontSize: 30, color, lineHeight: 1.3 }}>{tool}</div>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', bottom: 96, left: 0, right: 0, textAlign: 'center', opacity: punch }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>Off-the-shelf parts, wired into one line that </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.green }}>never stops.</span>
      </div>
    </AbsoluteFill>
  );
};
export default FStack;
