import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 26b — the leaderboard. VO 0.8s (19.2s).
export const compositionConfig = { id: 'PGame', durationInSeconds: 23, fps: 30, width: 1920, height: 1080 };

const PGame: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="09" label="THE METHOD // THE COMPANY IS A GAME" />

      <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>He taught the machines <span style={{ color: DL.gold }}>to want to win.</span></Headline>
        <div style={{ marginTop: 10, fontFamily: DL_SANS, fontSize: 28, color: DL.dim }}>every day, the droplets audit each other — and hand out scores</div>
      </div>

      <div style={{ position: 'absolute', top: 340, left: '50%', transform: 'translateX(-50%)', width: 1020 }}>
        {[['01', 'Dexter', 94, 'DL.sky', 100], ['02', 'Sienna', 91, 'DL.green', 140], ['03', 'Memo', 87, 'DL.gold', 180], ['04', 'Nano', 84, 'DL.red', 220]].map(([pos, name, score, c, at]) => (
          <div key={String(name)} style={{ opacity: interpolate(frame, [Number(at), Number(at) + 16], [0, 1], DCLAMP), display: 'flex', alignItems: 'center', gap: 26, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 14, padding: '18px 30px', marginBottom: 13 }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.faint }}>{pos}</span>
            <span style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 30, color: DL.text, width: 240 }}>{name}</span>
            <div style={{ flex: 1, height: 16, borderRadius: 999, background: '#ffffff0e', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${interpolate(frame, [Number(at) + 10, Number(at) + 46], [0, Number(score)], DCLAMP)}%`, background: c === 'DL.sky' ? DL.sky : c === 'DL.green' ? DL.green : c === 'DL.gold' ? DL.gold : DL.red, borderRadius: 999 }} />
            </div>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: DL.text, width: 70, textAlign: 'right' }}>{score}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 84, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [400, 430], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>He did not just build a fleet. He built </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.gold }}>a table.</span>
      </div>
    </AbsoluteFill>
  );
};
export default PGame;
