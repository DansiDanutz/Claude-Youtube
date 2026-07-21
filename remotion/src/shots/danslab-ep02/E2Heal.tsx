import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { Send, Skull, Check } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Avatar, OpenClawLogo } from '../../lib/danslab';

// =============================================================================
// Ep02 the miracle. VO 0.8s (22.1s): "Dexter shared one Telegram group with the
// two dead machines... overnight OpenClaw reached through, connected over SSH...
// and healed them. Dan woke up to three living machines. He was amazed."
// The group shows Dexter (alive) + Nano/Memo (dead) + OpenClaw; SSH lines draw
// and heal them (red→green); the amazed line closes.
// =============================================================================
export const compositionConfig = { id: 'E2Heal', durationInSeconds: 24, fps: 30, width: 1920, height: 1080 };

const GROUP = 70;
const SSH = 300;    // ssh reaches out
const HEAL = 400;   // nano + memo flip alive
const AMAZED = 540;

const E2Heal: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const grpIn = interpolate(frame, [GROUP, GROUP + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const sshW = interpolate(frame, [SSH, SSH + 40], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const sshOp = interpolate(frame, [SSH, SSH + 10, HEAL + 20, HEAL + 40], [0, 1, 1, 0], DCLAMP);
  const healed = frame >= HEAL;
  const healOp = interpolate(frame, [HEAL, HEAL + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const amazedOp = interpolate(frame, [AMAZED, AMAZED + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const pulse = 0.5 + 0.5 * Math.abs(Math.sin(frame / 12));

  // three member rows (Dexter chief, Nano, Memo) + OpenClaw as the healer at top
  const MEMBERS = [
    { name: 'Dexter', avatar: 'dexter.jpg', dead: false, y: 120 },
    { name: 'Nano', avatar: 'nano.png', dead: true, y: 250 },
    { name: 'Memo', avatar: 'memo.jpg', dead: true, y: 380 },
  ];

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={healed ? DL.green : DL.red} />
      <Kicker n="03" label="THE MIRACLE // ONE TELEGRAM GROUP" />

      {/* group panel */}
      <div style={{ position: 'absolute', top: 250, left: 150, width: 760, opacity: grpIn }}>
        <div style={{ background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 20, padding: '26px 30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: DL.sky, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Send size={22} color="#04222e" /></div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, color: DL.text }}>DansLab · droplets</div>
              <div style={{ fontFamily: DL_MONO, fontSize: 18, color: DL.faint }}>4 members · 03:40</div>
            </div>
          </div>
          {MEMBERS.map((m) => {
            const alive = !m.dead || healed;
            const accent = alive ? DL.green : DL.red;
            return (
              <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '14px 0', borderTop: `1px solid ${DL.border}` }}>
                <Avatar src={staticFile(`projects/danslab-ep02/${m.avatar}`)} size={64} color={accent} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.text }}>{m.name}</div>
                  <div style={{ fontFamily: DL_MONO, fontSize: 19, color: accent, display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                    {alive ? <><Check size={18} /> alive{m.dead ? ' · healed by OpenClaw' : ' · chief'}</> : <><Skull size={18} /> offline · breached</>}
                  </div>
                </div>
                {m.dead && !healed && <span style={{ fontSize: 30 }}>💀</span>}
                {m.dead && healed && <span style={{ opacity: healOp, transform: `scale(${0.8 + healOp * 0.2})`, fontSize: 30 }}>✅</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* OpenClaw the healer, right — SSH reaches into the dead machines */}
      <div style={{ position: 'absolute', top: 340, right: 200 }}>
        <OpenClawLogo src={staticFile('projects/danslab-ep02/openclaw-mascot.png')} size={200} start={GROUP + 20} wordmark={false} />
        <div style={{ textAlign: 'center', marginTop: 10, fontFamily: DL_MONO, fontSize: 22, letterSpacing: 2, color: DL.red, opacity: sshOp }}>SSH → healing…</div>
      </div>
      {/* ssh beam */}
      <div style={{ position: 'absolute', top: 560, left: 910, width: 400, height: 4, background: `linear-gradient(90deg, ${DL.red}, ${healed ? DL.green : DL.red})`, transform: `scaleX(${sshW})`, transformOrigin: 'right', opacity: sshOp, boxShadow: `0 0 ${16 * pulse}px ${DL.red}` }} />

      {/* amazed */}
      <div style={{ position: 'absolute', bottom: 96, left: 0, right: 0, textAlign: 'center', opacity: amazedOp }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 48, color: DL.warm }}>
          He slept with one machine. He woke up to <span style={{ color: DL.green }}>three.</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
export default E2Heal;
