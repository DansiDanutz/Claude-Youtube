import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 24b — the war room. VO 0.8s (21.3s).
export const compositionConfig = { id: 'PWarRoom', durationInSeconds: 25, fps: 30, width: 1920, height: 1080 };

const PWarRoom: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="09" label="THE METHOD // THE WAR ROOM" />

      <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>Too close to call? <span style={{ color: DL.red }}>Convene the war room.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 320, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 26 }}>
        {[['THE OPTIMIST', 'ship it now', 'DL.green', 90], ['THE SKEPTIC', 'it will break billing', 'DL.red', 140], ['THE ACCOUNTANT', 'what does it cost us', 'DL.gold', 190]].map(([who, say, c, at]) => (
          <div key={String(who)} style={{ opacity: interpolate(frame, [Number(at), Number(at) + 18], [0, 1], DCLAMP), width: 400, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 18, padding: '28px 30px', textAlign: 'center' }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 3, color: c === 'DL.green' ? DL.green : c === 'DL.red' ? DL.red : DL.gold }}>{who}</div>
            <div style={{ marginTop: 14, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 32, color: DL.text }}>&ldquo;{say}&rdquo;</div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 130, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm, opacity: interpolate(frame, [300, 328], [0, 1], DCLAMP) }}>Dan reads the fight, not the transcript. Then he signs.</div>
        <div style={{ marginTop: 14, fontFamily: DL_MONO, fontSize: 28, letterSpacing: 3, color: DL.gold, opacity: interpolate(frame, [480, 508], [0, 1], DCLAMP) }}>MACHINES ADVISE · THE PLAYER DECIDES</div>
      </div>
    </AbsoluteFill>
  );
};
export default PWarRoom;
