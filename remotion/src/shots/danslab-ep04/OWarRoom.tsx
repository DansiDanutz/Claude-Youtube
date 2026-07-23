import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep04 10d — the War Room: task -> agents argue -> interrupt x3 -> orchestrator signs, writes back. VO 0.8s (~27s).
export const compositionConfig = { id: 'OWarRoom', durationInSeconds: 30, fps: 30, width: 1920, height: 1080 };

const ROLES = ['Researcher', 'Writer', 'Scraper', 'Coder'];

const OWarRoom: React.FC = () => {
  const frame = useCurrentFrame();
  const taskOp = interpolate(frame, [70, 90], [0, 1], DCLAMP);
  const argOp = interpolate(frame, [280, 305], [0, 1], DCLAMP);
  const orchOp = interpolate(frame, [430, 455], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const orchScale = interpolate(frame, [430, 458], [0.85, 1], { ...DCLAMP, easing: DL_EASE.out });
  const decOp = interpolate(frame, [520, 545], [0, 1], DCLAMP);
  const punch = interpolate(frame, [640, 665], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="04" label="THE WAR ROOM // MACHINES ARGUE, THE HUMAN SIGNS" />
      <div style={{ position: 'absolute', top: 122, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={46}>So Dan built a room for exactly that.</Headline>
      </div>
      <div style={{ position: 'absolute', top: 256, left: 0, right: 0, textAlign: 'center', opacity: taskOp }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 2, color: DL.faint }}>ANY TASK →</span>
        <span style={{ fontFamily: DL_SERIF, fontSize: 30, color: DL.text, marginLeft: 14 }}>becomes a meeting</span>
      </div>
      <div style={{ position: 'absolute', top: 340, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 22 }}>
        {ROLES.map((r, i) => {
          const a = 120 + i * 30; const op = interpolate(frame, [a, a + 18], [0, 1], DCLAMP);
          const y = interpolate(frame, [a, a + 20], [24, 0], { ...DCLAMP, easing: DL_EASE.out });
          return <div key={r} style={{ opacity: op, transform: `translateY(${y}px)`, background: DL.panel, border: `1px solid ${DL.sky}44`, borderRadius: 14, padding: '20px 28px' }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.sky }}>{r}</span>
          </div>;
        })}
      </div>
      <div style={{ position: 'absolute', top: 452, left: 0, right: 0, textAlign: 'center', opacity: argOp }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 28, color: DL.warm }}>…arguing from different corners. You can interrupt — up to 3 times.</span>
      </div>
      <div style={{ position: 'absolute', top: 552, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: orchOp, transform: `scale(${orchScale})` }}>
        <div style={{ background: `${DL.gold}18`, border: `1px solid ${DL.gold}66`, borderRadius: 16, padding: '20px 40px', boxShadow: `0 0 40px ${DL.gold}33` }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.gold }}>ORCHESTRATOR SIGNS</span>
        </div>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 28, color: DL.muted, marginTop: 12, opacity: decOp }}>→ writes the decision back into the task</div>
      </div>
      <div style={{ position: 'absolute', bottom: 72, left: 0, right: 0, textAlign: 'center', opacity: punch }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 42, color: DL.text }}>Machines argue. </span>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 42, color: DL.gold }}>The human signs.</span>
      </div>
    </AbsoluteFill>
  );
};
export default OWarRoom;
