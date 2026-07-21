import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// =============================================================================
// DansLab 7/10 — products II. VO 0.8s: "MyWork-AI, a build and ship platform
// with seventy-two command-line tools. Zmarty, crypto trading signals with a
// ninety-six percent win rate. And SemeClaw, the war room, where every big
// decision gets signed." MyWork ~f40, Zmarty ~f172, SemeClaw ~f300.
// =============================================================================
export const compositionConfig = { id: 'DlProducts2', durationInSeconds: 15, fps: 30, width: 1920, height: 1080 };

const CARDS = [
  { p: 'P/03', at: 40, name: 'MyWork', tld: '-AI', badge: 'TOOLKIT · 72 · v2.4.1', badgeColor: DL.warm, desc: 'Build & ship platform', lead: 'Memo', stat: '72 CLI commands · PyPI' },
  { p: 'P/04', at: 172, name: 'zmarty', tld: '.me', badge: '◢ BTC/USDT · 96.2% WIN RATE', badgeColor: DL.green, desc: 'Crypto trading signals', lead: 'Sienna', stat: '+$4,218 ▲ this month' },
  { p: 'P/05', at: 300, name: 'SemeClaw', tld: '', badge: 'WAR ROOM', badgeColor: DL.red, desc: 'Where decisions get signed', lead: 'Dan', stat: 'Always lobsters' },
];

const DlProducts2: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="03" label="SHIPPING // CONTINUED" />

      <div style={{ position: 'absolute', top: 300, left: 120, right: 120, display: 'flex', gap: 30 }}>
        {CARDS.map((c) => {
          const op = interpolate(frame, [c.at, c.at + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const y = interpolate(frame, [c.at, c.at + 16], [34, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={c.p} style={{ opacity: op, transform: `translateY(${y}px)`, flex: 1, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 16, padding: '38px 40px', position: 'relative', minHeight: 420 }}>
              <span style={{ position: 'absolute', top: 28, right: 34, fontFamily: DL_MONO, fontSize: 22, color: DL.faint }}>{c.p}</span>
              <div style={{ display: 'inline-flex', border: `1px solid ${c.badgeColor}55`, background: `${c.badgeColor}12`, borderRadius: 999, padding: '10px 22px' }}>
                <span style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 2, color: c.badgeColor }}>{c.badge}</span>
              </div>
              <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 64, color: DL.text, marginTop: 34 }}>
                {c.name}<span style={{ color: DL.red }}>{c.tld}</span>
              </div>
              <div style={{ fontSize: 29, color: DL.dim, marginTop: 14, lineHeight: 1.4 }}>{c.desc}</div>
              <div style={{ position: 'absolute', bottom: 36, left: 40, right: 40, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.faint }}>LEAD</span>
                <span style={{ fontSize: 25, fontWeight: 600, color: DL.warm }}>{c.lead}</span>
                <span style={{ marginLeft: 'auto', fontFamily: DL_MONO, fontSize: 20, color: DL.muted }}>{c.stat}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 96, left: 120, right: 120, textAlign: 'center', opacity: interpolate(frame, [386, 402], [0, 1], { ...DCLAMP, easing: DL_EASE.out }) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>
          They ship without asking — <span style={{ color: DL.text }}>Dan signs off on direction.</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
export default DlProducts2;
