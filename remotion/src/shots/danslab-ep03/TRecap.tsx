import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep03 1 — recap → meet Sienna. VO 0.8s (18.2s): "Last time, three machines
// fought back... So Dan built one whose only job was exactly that. To trade.
// Her name is Sienna."
export const compositionConfig = { id: 'TRecap', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const TRecap: React.FC = () => {
  const frame = useCurrentFrame();
  const fleet = ['dexter.jpg', 'memo.jpg', 'nano.png'];
  const siennaAt = 300;
  const sOp = interpolate(frame, [siennaAt, siennaAt + 20], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const sScale = interpolate(frame, [siennaAt, siennaAt + 24], [0.8, 1], { ...DCLAMP, easing: DL_EASE.out });
  const dim = interpolate(frame, [siennaAt, siennaAt + 20], [1, 0.32], { ...DCLAMP, easing: DL_EASE.out });
  const nameOp = interpolate(frame, [siennaAt + 22, siennaAt + 40], [0, 1], DCLAMP);
  const pulse = 0.5 + 0.5 * Math.abs(Math.sin((frame - siennaAt) / 18));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="03" label="PREVIOUSLY // THE FLEET" />

      <div style={{ position: 'absolute', top: 210, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={30} size={58}>The fleet fought back. It survived.</Headline>
        <div style={{ marginTop: 14 }}><Headline at={70} size={58} italic color={DL.warm}>But a company doesn&rsquo;t run on machines that stay alive —</Headline></div>
        <div style={{ marginTop: 10 }}><Headline at={110} size={58} italic color={DL.warm}>it runs on machines that <span style={{ color: DL.gold }}>make money.</span></Headline></div>
      </div>

      {/* three survivors, dim once Sienna arrives */}
      <div style={{ position: 'absolute', top: 560, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 56, opacity: dim }}>
        {fleet.map((f, i) => {
          const a = 160 + i * 16;
          const op = interpolate(frame, [a, a + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={f} style={{ opacity: op, textAlign: 'center' }}>
              <Avatar src={staticFile(`projects/danslab-ep03/${f}`)} size={130} color={DL.dim} />
              <div style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.muted, marginTop: 12 }}>{['Dexter', 'Memo', 'Nano'][i]}</div>
            </div>
          );
        })}
      </div>

      {/* Sienna reveal */}
      <div style={{ position: 'absolute', top: 520, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: sOp, transform: `scale(${sScale})` }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: -24, borderRadius: '50%', background: `radial-gradient(circle, ${DL.gold}44, transparent 70%)`, opacity: pulse }} />
          <Avatar src={staticFile('projects/danslab-ep03/sienna.jpg')} size={220} color={DL.gold} />
        </div>
        <div style={{ opacity: nameOp, marginTop: 22, fontFamily: DL_SERIF, fontSize: 62, color: DL.text }}>
          Her name is <span style={{ fontStyle: 'italic', color: DL.gold }}>Sienna.</span>
        </div>
        <div style={{ opacity: nameOp, fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DL.red, marginTop: 8 }}>THE TRADER</div>
      </div>
    </AbsoluteFill>
  );
};
export default TRecap;
