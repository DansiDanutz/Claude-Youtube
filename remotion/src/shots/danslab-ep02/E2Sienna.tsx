import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { Settings, ArrowUpRight, Plus, Coins } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Avatar } from '../../lib/danslab';

// =============================================================================
// Ep02 building the team. VO 0.8s (17.4s): "Now Dan had a team. With ChatGPT
// and Claude Code he configured Nano and Memo, upgraded Dexter, and built a
// brand new agent from scratch. A trader. Her name is Sienna. Her job: connect
// OpenClaw to Dan's own crypto app... Zmarty." The three get configured; then
// Sienna is born (spark), wired to Zmarty.
// =============================================================================
export const compositionConfig = { id: 'E2Sienna', durationInSeconds: 18.8, fps: 30, width: 1920, height: 1080 };

const TEAM = [
  { name: 'Nano', avatar: 'nano.png', tag: 'configured', at: 110 },
  { name: 'Memo', avatar: 'memo.jpg', tag: 'configured', at: 150 },
  { name: 'Dexter', avatar: 'dexter.jpg', tag: 'upgraded', at: 190 },
];
const BIRTH = 300;   // Sienna born
const WIRE = 430;    // wired to Zmarty

const E2Sienna: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const birthOp = interpolate(frame, [BIRTH, BIRTH + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const birthScale = interpolate(frame, [BIRTH, BIRTH + 20], [0.5, 1], { ...DCLAMP, easing: DL_EASE.out });
  const spark = interpolate(frame, [BIRTH - 6, BIRTH + 6, BIRTH + 30], [0, 1, 0], DCLAMP);
  const wireW = interpolate(frame, [WIRE, WIRE + 26], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const zmartyOp = interpolate(frame, [WIRE + 16, WIRE + 34], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="04" label="THE TEAM // + ONE NEW AGENT" />

      <div style={{ position: 'absolute', top: 176, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 66, color: DL.text }}>
          Now Dan had <span style={{ fontStyle: 'italic', color: DL.gold }}>a team.</span>
        </span>
      </div>

      {/* configured trio, left column */}
      <div style={{ position: 'absolute', top: 330, left: 130, display: 'flex', flexDirection: 'column', gap: 16, width: 470 }}>
        {TEAM.map((t) => {
          const op = interpolate(frame, [t.at, t.at + 13], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const x = interpolate(frame, [t.at, t.at + 13], [-22, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={t.name} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 18, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 12, padding: '14px 24px' }}>
              <Avatar src={staticFile(`projects/danslab-ep02/${t.avatar}`)} size={58} color={DL.sky} />
              <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.text, flex: 1 }}>{t.name}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: DL_MONO, fontSize: 20, color: DL.green }}><Settings size={18} /> {t.tag}</span>
            </div>
          );
        })}
      </div>

      {/* Sienna born, center-right */}
      <div style={{ position: 'absolute', top: 300, left: 720, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: birthOp, transform: `scale(${birthScale})` }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: -40, borderRadius: '50%', background: `radial-gradient(circle, ${DL.gold}${Math.round(spark * 90).toString(16).padStart(2, '0')}, transparent 70%)` }} />
          <Avatar src={staticFile('projects/danslab-ep02/sienna.jpg')} size={210} color={DL.gold} />
          <div style={{ position: 'absolute', top: -6, right: -6, width: 52, height: 52, borderRadius: '50%', background: DL.bg, border: `2px solid ${DL.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={26} color={DL.gold} /></div>
        </div>
        <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 54, color: DL.text, marginTop: 18 }}>Sienna</div>
        <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.gold }}>THE TRADER · BORN</div>
      </div>

      {/* wire to Zmarty */}
      <div style={{ position: 'absolute', top: 400, left: 950, width: 260, height: 4, background: `linear-gradient(90deg, ${DL.gold}, ${DL.green})`, transform: `scaleX(${wireW})`, transformOrigin: 'left' }} />
      <div style={{ position: 'absolute', top: 340, right: 150, opacity: zmartyOp }}>
        <div style={{ background: DL.panel2, border: `1px solid ${DL.green}55`, borderRadius: 18, padding: '30px 40px', textAlign: 'center' }}>
          <Coins size={40} color={DL.green} style={{ marginBottom: 10 }} />
          <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 46, color: DL.text }}>zmarty<span style={{ color: DL.red }}>.me</span></div>
          <div style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.dim, marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>Dan&rsquo;s own crypto app <ArrowUpRight size={18} /></div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default E2Sienna;
