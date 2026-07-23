import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise } from '../../lib/danslab';

// Origin 10b — SemeClaw: the War Room, open-sourced. VO 0.8s (~18s).
export const compositionConfig = { id: 'DoSemeClaw', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const FLOW = ['any task', 'agents meet', 'you steer ×3', 'orchestrator signs'];

const DoSemeClaw: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="10" label="SHIPPING // SEMECLAW" />
      <div style={{ position: 'absolute', top: 200, left: 0, right: 0, textAlign: 'center', ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 96, color: DL.text }}>Seme<span style={{ color: DL.red }}>Claw</span></span>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 36, color: DL.muted, marginTop: 8 }}>the company&rsquo;s War Room — open-sourced</div>
      </div>
      <div style={{ position: 'absolute', top: 470, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
        {FLOW.map((f, i) => {
          const a = 90 + i * 34;
          const op = interpolate(frame, [a, a + 18], [0, 1], DCLAMP);
          const y = interpolate(frame, [a, a + 22], [22, 0], { ...DCLAMP, easing: DL_EASE.out });
          return <React.Fragment key={f}>
            <div style={{ opacity: op, transform: `translateY(${y}px)`, background: DL.panel, border: `1px solid ${DL.sky}44`, borderRadius: 12, padding: '16px 24px' }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 1, color: DL.sky }}>{f}</span>
            </div>
            {i < FLOW.length - 1 && <span style={{ opacity: op, fontFamily: DL_SANS, fontSize: 30, color: DL.faint }}>&rarr;</span>}
          </React.Fragment>;
        })}
      </div>
      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [420, 446], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>The way DansLab makes its hardest calls — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.gold }}>handed to anyone.</span>
      </div>
    </AbsoluteFill>
  );
};
export default DoSemeClaw;
