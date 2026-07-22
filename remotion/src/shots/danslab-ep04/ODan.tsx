import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { GraduationCap, Target, Trophy } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep04 2 — who is Dan? Not a dev. Math + Informatics. A CEO. VO 0.8s (23.8s).
export const compositionConfig = { id: 'ODan', durationInSeconds: 26, fps: 30, width: 1920, height: 1080 };

const CREDS: [React.ReactNode, string, string][] = [
  [<GraduationCap size={34} color={DL.sky} />, 'Mathematics & Informatics', 'thinks in systems, not syntax'],
  [<Target size={34} color={DL.gold} />, 'A planner', 'sees the whole board at once'],
  [<Trophy size={34} color={DL.green} />, 'A competitor', 'a long history of winning'],
];

const ODan: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="04" label="THE FOUNDER // NOT A DEVELOPER" />

      {/* Dan portrait left */}
      <div style={{ position: 'absolute', top: 300, left: 220, opacity: interpolate(frame, [30, 54], [0, 1], DCLAMP), transform: `translateY(${interpolate(frame, [30, 54], [30, 0], { ...DCLAMP, easing: DL_EASE.out })}px)` }}>
        <Avatar src={staticFile('projects/danslab-ep04/dan-avatar.jpg')} size={300} color={DL.gold} />
        <div style={{ textAlign: 'center', marginTop: 22 }}>
          <div style={{ fontFamily: DL_SERIF, fontSize: 44, color: DL.text }}>Dan</div>
          <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.red, marginTop: 4 }}>CHIEF EXECUTIVE</div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 200, left: 640, right: 180 }}>
        <Headline at={20} size={54}>He is not a developer.</Headline>
        <div style={{ marginTop: 8 }}><Headline at={56} size={40} italic color={DL.warm}>His talent isn&rsquo;t writing code. It&rsquo;s <span style={{ color: DL.gold }}>seeing the whole board.</span></Headline></div>

        <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {CREDS.map(([icon, title, sub], i) => {
            const at = 150 + i * 40;
            const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
            const x = interpolate(frame, [at, at + 18], [26, 0], { ...DCLAMP, easing: DL_EASE.out });
            return (
              <div key={i} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 18, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 14, padding: '18px 24px' }}>
                {icon}
                <div>
                  <div style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 28, color: DL.text }}>{title}</div>
                  <div style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.dim }}>{sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default ODan;
