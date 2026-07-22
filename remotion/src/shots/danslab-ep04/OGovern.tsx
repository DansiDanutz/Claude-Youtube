import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Users, ListChecks, FolderGit2, Activity } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep04 10 — what Paperclip actually gives him: agents / tasks / projects /
// heartbeat. VO 0.8s (26.7s).
export const compositionConfig = { id: 'OGovern', durationInSeconds: 29, fps: 30, width: 1920, height: 1080 };

const CARDS: [React.ReactNode, string, string, string][] = [
  [<Users size={38} color={DL.green} />, 'AGENTS', 'who is alive', 'and working, right now'],
  [<ListChecks size={38} color={DL.sky} />, 'TASKS', 'a queue', 'who owns them · what’s done'],
  [<FolderGit2 size={38} color={DL.gold} />, 'PROJECTS', 'idea → shipped', 'moving, tracked, visible'],
  [<Activity size={38} color={DL.red} />, 'HEARTBEAT', 'a pulse', 'healthy · stuck · needs you'],
];

const OGovern: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="04" label="THE OVERSEER // WHAT IT GIVES HIM" />

      <div style={{ position: 'absolute', top: 190, left: 130, right: 130 }}>
        <Headline at={20} size={56}>Look at what that actually gives him.</Headline>
      </div>

      <div style={{ position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 28 }}>
        {CARDS.map(([icon, title, big, sub], i) => {
          const at = 120 + i * 34;
          const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
          const y = interpolate(frame, [at, at + 18], [26, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={i} style={{ opacity: op, transform: `translateY(${y}px)`, width: 320, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 18, padding: '30px 28px' }}>
              {icon}
              <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.faint, marginTop: 18 }}>{title}</div>
              <div style={{ fontFamily: DL_SERIF, fontSize: 34, color: DL.text, marginTop: 8 }}>{big}</div>
              <div style={{ fontFamily: DL_SANS, fontSize: 21, color: DL.dim, marginTop: 8 }}>{sub}</div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [520, 545], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>A swarm of independent machines — turned into something a </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.gold }}>single human could command.</span>
      </div>
    </AbsoluteFill>
  );
};
export default OGovern;
