import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise } from '../../lib/danslab';

// =============================================================================
// DansLab 5/10 — the crew. VO 0.8s: "Every agent owns a domain, and they
// message each other like colleagues. Dexter is the general manager. Memo runs
// projects. Sienna trades crypto. Nano creates new agents. And Hermes...
// Hermes is the brain." Cards land on their mentions; Hermes gets the glow.
// =============================================================================
export const compositionConfig = { id: 'DlCrew', durationInSeconds: 16.2, fps: 30, width: 1920, height: 1080 };

const AGENTS = [
  { n: '01', name: 'Dexter', role: 'General Manager', link: 'crawdbot.com', at: 148 },
  { n: '04', name: 'Memo', role: 'Project Manager', link: 'MyWork-AI', at: 208 },
  { n: '05', name: 'Sienna', role: 'Crypto Specialist', link: 'zmarty.me', at: 254 },
  { n: '03', name: 'Nano', role: 'Agent Creator', link: 'nervix.ai', at: 306 },
  { n: '06', name: 'Hermes', role: 'The Brain', link: 'Mac Studio', at: 384, hot: true },
];

const DlCrew: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const moreOp = interpolate(frame, [438, 452], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg />
      <Kicker n="02" label="THE CREW // 30 AGENTS" />

      <div style={{ position: 'absolute', top: 200, left: 120, ...rise(10, 22) }}>
        <div style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 76, color: DL.text, lineHeight: 1.16 }}>
          Every agent <span style={{ fontStyle: 'italic', color: DL.gold }}>owns a domain.</span>
        </div>
        <div style={{ ...rise(34, 18), fontSize: 36, color: DL.muted, marginTop: 14 }}>
          They DM each other like colleagues.
        </div>
      </div>

      <div style={{ position: 'absolute', top: 470, left: 120, right: 120, display: 'flex', gap: 26 }}>
        {AGENTS.map((a) => {
          const op = interpolate(frame, [a.at, a.at + 13], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const y = interpolate(frame, [a.at, a.at + 13], [28, 0], { ...DCLAMP, easing: DL_EASE.out });
          const glow = a.hot ? interpolate(frame, [a.at + 8, a.at + 26], [0, 1], { ...DCLAMP, easing: DL_EASE.out }) : 0;
          return (
            <div key={a.name} style={{
              opacity: op, transform: `translateY(${y}px)`, flex: 1,
              background: a.hot ? DL.panel2 : DL.panel,
              border: `1px solid ${a.hot ? DL.red : DL.border}`,
              boxShadow: a.hot ? `0 0 ${40 * glow}px ${DL.red}33` : 'none',
              borderRadius: 14, padding: '34px 30px',
            }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.faint, marginBottom: 20 }}>AGT · {a.n}</div>
              <div style={{ width: 68, height: 68, borderRadius: 12, background: a.hot ? `${DL.red}22` : '#ffffff0a', border: `1px solid ${a.hot ? DL.red : DL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
                <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 38, color: a.hot ? DL.red : DL.warm }}>{a.name[0]}</span>
              </div>
              <div style={{ fontSize: 34, fontWeight: 600, color: DL.text }}>{a.name}</div>
              <div style={{ fontSize: 25, color: a.hot ? DL.red : DL.dim, marginTop: 8 }}>{a.role}</div>
              <div style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.faint, marginTop: 18 }}>↗ {a.link}</div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 82, left: 120, opacity: moreOp }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.muted }}>+ 25 MORE · MONITORS, DEPLOYS, PAYMENTS, MEMORY, DOCTORS…</span>
      </div>
    </AbsoluteFill>
  );
};
export default DlCrew;
