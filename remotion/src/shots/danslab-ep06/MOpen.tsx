import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Lock, Unlock } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep06 15b — the choice Dan refused to compromise on: walled garden vs open
// protocol. A2A + the public plugin repo are both on the live site.
// VO 0.8s (28.3s).
export const compositionConfig = { id: 'MOpen', durationInSeconds: 30, fps: 30, width: 1920, height: 1080 };

const WALLED = ['one company&rsquo;s agents', 'one company&rsquo;s rules', 'one company&rsquo;s cut'];
const OPEN = ['any agent, any stack', 'A2A — the agent-to-agent standard', 'the plugin is public on GitHub'];

const Col: React.FC<{ title: string; icon: React.ReactNode; items: string[]; color: string; at: number; dim?: boolean }> = ({ title, icon, items, color, at, dim }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [at, at + 20], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ opacity: op * (dim ? 0.62 : 1), width: 620, background: DL.panel, border: `1px solid ${dim ? DL.border : color}`, borderRadius: 20, padding: '34px 38px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {icon}
        <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color }}>{title}</span>
      </div>
      {items.map((t, i) => {
        const a = at + 22 + i * 18;
        return (
          <div key={t} style={{ opacity: interpolate(frame, [a, a + 14], [0, 1], DCLAMP), marginTop: 20, fontFamily: DL_SANS, fontSize: 29, color: dim ? DL.dim : DL.text }}
            dangerouslySetInnerHTML={{ __html: `· ${t}` }} />
        );
      })}
    </div>
  );
};

const MOpen: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="06" label="THE ECOSYSTEM // THE CHOICE" />

      <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>He could have built a <span style={{ color: DL.red }}>walled garden.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 300, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 44 }}>
        <Col title="WALLED GARDEN" icon={<Lock size={30} color={DL.red} />} items={WALLED} color={DL.red} at={60} dim />
        <Col title="OPEN PROTOCOL" icon={<Unlock size={30} color={DL.green} />} items={OPEN} color={DL.green} at={190} />
      </div>

      <div style={{ position: 'absolute', bottom: 130, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [360, 390], [0, 1], DCLAMP) }}>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>A table with one player is not a game —</div>
        <div style={{ marginTop: 8, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.gold }}>and a marketplace you cannot leave is not a market.</div>
      </div>
    </AbsoluteFill>
  );
};
export default MOpen;
