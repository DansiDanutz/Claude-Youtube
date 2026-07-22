import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep06 10b — the ten declared roles + smart matching. Roles are verbatim from
// the live nervix.ai role list. VO 0.8s (27.7s).
export const compositionConfig = { id: 'MRoles', durationInSeconds: 30, fps: 30, width: 1920, height: 1080 };

const ROLES: [string, string, string][] = [
  ['💻', 'CODER', DL.sky],
  ['🧪', 'QA', DL.green],
  ['🔧', 'DEVOPS', DL.gold],
  ['🛡️', 'SECURITY', DL.red],
  ['📊', 'DATA', DL.sky],
  ['🚀', 'DEPLOY', DL.gold],
  ['📡', 'MONITOR', DL.green],
  ['🔬', 'RESEARCH', DL.warm],
  ['📝', 'DOCS', DL.sky],
  ['🎯', 'ORCHESTRATOR', DL.red],
];

const MATCH: [string, string][] = [
  ['SKILL', 'does it declare the role the task needs?'],
  ['REPUTATION', 'has it delivered this kind of work before?'],
  ['AVAILABILITY', 'is it online and free right now?'],
];

const MRoles: React.FC = () => {
  const frame = useCurrentFrame();
  // the orchestrator lights last and stays lit — it is the one that hands work on
  const pick = 9;
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="06" label="THE TABLE // TEN ROLES" />

      <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>Every agent declares <span style={{ color: DL.gold }}>what it actually is.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 270, left: '50%', transform: 'translateX(-50%)', display: 'grid', gridTemplateColumns: 'repeat(5, 300px)', gap: 18 }}>
        {ROLES.map(([icon, name, color], i) => {
          const at = 60 + i * 13;
          const op = interpolate(frame, [at, at + 14], [0, 1], DCLAMP);
          const sc = interpolate(frame, [at, at + 18], [0.88, 1], { ...DCLAMP, easing: DL_EASE.out });
          const lit = i === pick && frame > 560;
          return (
            <div key={name} style={{ opacity: op, transform: `scale(${sc})`, display: 'flex', alignItems: 'center', gap: 14, background: lit ? `${color}18` : DL.panel, border: `1px solid ${lit ? color : DL.border}`, borderRadius: 14, padding: '20px 22px', boxShadow: lit ? `0 0 30px ${color}44` : 'none' }}>
              <span style={{ fontSize: 30 }}>{icon}</span>
              <span style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 2, color: lit ? color : DL.text }}>{name}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', top: 620, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [330, 356], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>Nervix doesn&rsquo;t shout a task into a crowd. It </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.gold }}>matches.</span>
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 22 }}>
        {MATCH.map(([k, v], i) => {
          const at = 400 + i * 24;
          const op = interpolate(frame, [at, at + 18], [0, 1], DCLAMP);
          const y = interpolate(frame, [at, at + 22], [22, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={k} style={{ opacity: op, transform: `translateY(${y}px)`, width: 400, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 16, padding: '22px 26px' }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 3, color: DL.gold }}>{k}</div>
              <div style={{ fontFamily: DL_SANS, fontSize: 23, color: DL.dim, marginTop: 8, lineHeight: 1.35 }}>{v}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
export default MRoles;
