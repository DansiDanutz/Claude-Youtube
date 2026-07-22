import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep04 1 — recap: four machines racing, but who runs the race? VO 0.8s (19.4s).
export const compositionConfig = { id: 'ORecap', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const FLEET = ['dexter.jpg', 'memo.jpg', 'nano.png', 'sienna.jpg'];

const ORecap: React.FC = () => {
  const frame = useCurrentFrame();
  const qOp = interpolate(frame, [330, 356], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="04" label="PREVIOUSLY // FOUR MACHINES, RACING" />

      <div style={{ position: 'absolute', top: 200, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={26} size={58}>Four machines. Four platforms.</Headline>
        <div style={{ marginTop: 12 }}><Headline at={64} size={58} italic color={DL.warm}>Every day, racing each other for <span style={{ color: DL.gold }}>profit.</span></Headline></div>
      </div>

      {/* fleet, jittering (chaotic energy) */}
      <div style={{ position: 'absolute', top: 470, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 54 }}>
        {FLEET.map((f, i) => {
          const a = 150 + i * 14;
          const op = interpolate(frame, [a, a + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const jit = Math.sin((frame + i * 30) / 7) * 6;
          return (
            <div key={f} style={{ opacity: op, transform: `translateY(${jit}px)`, textAlign: 'center' }}>
              <Avatar src={staticFile(`projects/danslab-ep04/${f}`)} size={124} color={[DL.green, DL.sky, DL.gold, DL.red][i]} />
              <div style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.muted, marginTop: 12 }}>{['Dexter', 'Memo', 'Nano', 'Sienna'][i]}</div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: qOp }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 50, color: DL.warm }}>A company that races itself needs one thing — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 50, color: DL.text }}>someone to run the race.</span>
      </div>
    </AbsoluteFill>
  );
};
export default ORecap;
