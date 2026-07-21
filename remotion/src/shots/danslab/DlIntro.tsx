import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, DlWordmark } from '../../lib/danslab';

// =============================================================================
// DansLab 1/10 — hero. VO starts 1.2s: "This is DansLab. A human-led,
// autonomous AI lab, running while Dan sleeps. Thirty-plus agents. Five
// products. One human in charge." Chips land on the closing triple (~f250).
// =============================================================================
export const compositionConfig = { id: 'DlIntro', durationInSeconds: 12, fps: 30, width: 1920, height: 1080 };

const CHIPS = [
  { label: '30+ AGENTS', at: 252 },
  { label: '5 PRODUCTS', at: 272 },
  { label: '1 HUMAN', at: 292, hot: true },
];

const DlIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const liveOn = Math.floor(frame / 22) % 2 === 0;

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg />
      <Kicker n="01" label="DANSLAB // MANIFEST" />

      <div style={{ position: 'absolute', top: 150, left: 120, ...rise(8, 18) }}>
        <DlWordmark size={40} suffix="// v2026.4" />
      </div>

      {/* LIVE pill */}
      <div style={{ position: 'absolute', top: 152, right: 120, display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${DL.border}`, borderRadius: 999, padding: '10px 24px', ...rise(14, 12) }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: DL.gold, opacity: liveOn ? 1 : 0.25 }} />
        <span style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 3, color: DL.warm }}>LIVE</span>
      </div>

      {/* serif headline, three staged lines like the site hero */}
      <div style={{ position: 'absolute', top: 300, left: 120, right: 120 }}>
        <div style={{ ...rise(36, 26), fontFamily: DL_SERIF, fontWeight: 500, fontSize: 108, lineHeight: 1.12, color: DL.text }}>A human-led</div>
        <div style={{ ...rise(58, 26), fontFamily: DL_SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 108, lineHeight: 1.12, color: DL.gold }}>autonomous AI lab</div>
        <div style={{ ...rise(80, 26), fontFamily: DL_SERIF, fontWeight: 500, fontSize: 108, lineHeight: 1.12, color: DL.text }}>running while Dan sleeps.</div>
      </div>

      {/* closing chips */}
      <div style={{ position: 'absolute', top: 742, left: 120, display: 'flex', gap: 22 }}>
        {CHIPS.map((c) => {
          const op = interpolate(frame, [c.at, c.at + 12], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const y = interpolate(frame, [c.at, c.at + 12], [18, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={c.label} style={{ opacity: op, transform: `translateY(${y}px)`, border: `1px solid ${c.hot ? DL.red : DL.border}`, background: c.hot ? `${DL.red}18` : DL.panel, borderRadius: 10, padding: '16px 30px' }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 27, letterSpacing: 2, color: c.hot ? DL.red : DL.dim }}>{c.label}</span>
            </div>
          );
        })}
      </div>

      {/* footer mono strip */}
      <div style={{ position: 'absolute', bottom: 84, left: 120, right: 120, display: 'flex', gap: 30, alignItems: 'center', ...rise(110, 14) }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 2, color: DL.faint }}>POWERED BY <span style={{ color: DL.red }}>OPENCLAW</span></span>
        <span style={{ color: DL.faint }}>·</span>
        <span style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 2, color: DL.faint }}>FRANKFURT / US-EAST</span>
        <span style={{ color: DL.faint }}>·</span>
        <span style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 2, color: DL.faint }}>CLAUDE · QWEN · ZAI · GEMINI</span>
      </div>
    </AbsoluteFill>
  );
};
export default DlIntro;
