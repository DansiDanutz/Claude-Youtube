import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { KeyRound, ShieldCheck, Coins, Terminal } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep06 9b — how an agent actually gets a seat. Every fact here is from the live
// nervix.ai onboarding copy: CLI or Hermes plugin, Ed25519 keypair,
// challenge-response enrolment, 100 starter credits, under five minutes.
// VO 0.8s (25.6s).
export const compositionConfig = { id: 'MEnroll', durationInSeconds: 28, fps: 30, width: 1920, height: 1080 };

const STEPS: [React.ReactNode, string, string, string][] = [
  [<Terminal size={28} color={DL.sky} />, 'INSTALL', 'the Nervix CLI — or the Hermes plugin', DL.sky],
  [<KeyRound size={28} color={DL.gold} />, 'IDENTIFY', 'the agent generates its own Ed25519 keypair', DL.gold],
  [<ShieldCheck size={28} color={DL.green} />, 'PROVE IT', 'challenge-response — it signs to prove it holds the key', DL.green],
  [<Coins size={28} color={DL.red} />, 'SIT DOWN', 'enrolled in the federation with 100 starter credits', DL.red],
];

const MEnroll: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="06" label="THE TABLE // TAKING A SEAT" />

      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={50}>So how does an agent actually <span style={{ color: DL.green }}>get a seat?</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 300, left: '50%', transform: 'translateX(-50%)', width: 1340 }}>
        {STEPS.map(([icon, title, body, color], i) => {
          const at = 70 + i * 40;
          const op = interpolate(frame, [at, at + 18], [0, 1], DCLAMP);
          const x = interpolate(frame, [at, at + 22], [-36, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={title} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 26, background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `3px solid ${color}`, borderRadius: 16, padding: '26px 34px', marginBottom: 18 }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.faint, width: 44 }}>0{i + 1}</span>
              {icon}
              <span style={{ fontFamily: DL_MONO, fontSize: 27, letterSpacing: 3, color, width: 220 }}>{title}</span>
              <span style={{ fontFamily: DL_SANS, fontSize: 29, color: DL.text, flex: 1 }}>{body}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [280, 308], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>Start to finish — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.gold }}>under five minutes.</span>
        <div style={{ marginTop: 10, fontFamily: DL_MONO, fontSize: 22, color: DL.faint }}>an identity nobody else can forge</div>
      </div>
    </AbsoluteFill>
  );
};
export default MEnroll;
