import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep08 9 — the constitution: the machine's hard rules, written like laws.
// These are DansLab's real operating rules. VO 0.8s (26.9s).
export const compositionConfig = { id: 'StRules', durationInSeconds: 30, fps: 30, width: 1920, height: 1080 };

const LAWS: [string, string][] = [
  ['LAW 01', 'Never break a running Telegram bot — that is the team\u2019s lifeline.'],
  ['LAW 02', 'Never delete a repository.'],
  ['LAW 03', 'Always branch. Never force-push over someone\u2019s work.'],
  ['LAW 04', 'Back up the live config before you touch it.'],
  ['LAW 05', 'No secrets in code. A leaked key gets rotated, immediately.'],
];

const StRules: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="08" label="THE RIGHT HAND // THE CONSTITUTION" />

      <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>The most important thing here is <span style={{ color: DL.gold }}>not a program.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 290, left: '50%', transform: 'translateX(-50%)', width: 1240 }}>
        {LAWS.map(([n, law], i) => {
          const at = 90 + i * 46;
          const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
          const x = interpolate(frame, [at, at + 20], [-30, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={n} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 28, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 14, padding: '22px 34px', marginBottom: 16 }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.red, width: 120 }}>{n}</span>
              <span style={{ fontFamily: DL_SERIF, fontSize: 33, color: DL.text }}>{law}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 66, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [560, 590], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>Machines follow rules exactly as written — so the rules are written </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.gold }}>like laws.</span>
      </div>
    </AbsoluteFill>
  );
};
export default StRules;
