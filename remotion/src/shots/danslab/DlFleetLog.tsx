import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// =============================================================================
// DansLab 3/10 — the fleet log. VO 0.8s: "Every night, the fleet log keeps
// scrolling. Dexter ships a new build to Vercel. Sienna opens a trade. The
// Pope bot merges a pull request. Memo runs the weekly cron. Nobody is awake.
// Everything still ships." Log lines land on their mentions.
// =============================================================================
export const compositionConfig = { id: 'DlFleetLog', durationInSeconds: 16.6, fps: 30, width: 1920, height: 1080 };

const LINES = [
  { t: '02:14', icon: '↗', who: 'Dexter', verb: 'shipped', what: 'CrawdBot v2.14 → Vercel', color: DL.green, at: 118 },
  { t: '02:19', icon: '$', who: 'Sienna', verb: 'opened', what: 'BTC/USDT long · +2.3%', color: DL.gold, at: 178 },
  { t: '02:26', icon: '⌥', who: 'ThePopeBot', verb: 'merged', what: 'PR #1183 · nervix-cli', color: DL.sky, at: 238 },
  { t: '02:31', icon: '↻', who: 'Memo', verb: 'ran', what: 'n8n · weekly-digest cron', color: DL.warm, at: 298 },
];
const NOBODY = 372; // "Nobody is awake. Everything still ships."

const DlFleetLog: React.FC = () => {
  const frame = useCurrentFrame();
  const panelIn = interpolate(frame, [6, 22], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const panelY = interpolate(frame, [6, 22], [30, 0], { ...DCLAMP, easing: DL_EASE.out });
  const cursorOn = Math.floor(frame / 16) % 2 === 0;
  const utcS = Math.floor(frame / 30) % 60;
  const nobodyOp = interpolate(frame, [NOBODY, NOBODY + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg />
      <Kicker n="03" label="FLEET LOG // 03:00 AM" />

      <div style={{ position: 'absolute', top: 190, left: 210, right: 210, opacity: panelIn, transform: `translateY(${panelY}px)` }}>
        <div style={{ background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 14, overflow: 'hidden' }}>
          {/* title bar */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '18px 26px', borderBottom: `1px solid ${DL.border}`, gap: 10 }}>
            <div style={{ width: 13, height: 13, borderRadius: '50%', background: DL.red }} />
            <div style={{ width: 13, height: 13, borderRadius: '50%', background: DL.gold }} />
            <div style={{ width: 13, height: 13, borderRadius: '50%', background: DL.green }} />
            <span style={{ flex: 1, textAlign: 'center', fontFamily: DL_MONO, fontSize: 22, color: DL.dim }}>dan@danslab ~ % tail -f fleet.log</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.faint }}>UTC 03:14:{String(utcS).padStart(2, '0')}</span>
          </div>
          <div style={{ padding: '30px 40px 34px', minHeight: 480 }}>
            {/* ascii banner */}
            <pre style={{ fontFamily: DL_MONO, fontSize: 22, lineHeight: 1.55, color: DL.redDeep, margin: 0 }}>
{`  ┌─ DANS / LAB ─────────────────────────────┐
  │  ░▒▓  five droplets · one boss  ▓▒░      │
  │  ░▒▓  thirty agents · no sleep  ▓▒░      │
  └──────────────────────────────────────────┘`}
            </pre>
            {/* log lines on cue */}
            <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {LINES.map((l) => {
                const op = interpolate(frame, [l.at, l.at + 10], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
                const x = interpolate(frame, [l.at, l.at + 12], [-22, 0], { ...DCLAMP, easing: DL_EASE.out });
                return (
                  <div key={l.who} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 20, fontFamily: DL_MONO, fontSize: 27 }}>
                    <span style={{ color: DL.faint, fontSize: 22 }}>{l.t}</span>
                    <span style={{ color: l.color, width: 26, textAlign: 'center' }}>{l.icon}</span>
                    <span style={{ color: DL.text, fontWeight: 700 }}>{l.who}</span>
                    <span style={{ color: DL.muted }}>{l.verb}</span>
                    <span style={{ color: DL.dim }}>{l.what}</span>
                  </div>
                );
              })}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: DL_MONO, fontSize: 27, marginTop: 4 }}>
                <span style={{ color: DL.red }}>dexter@fleet</span>
                <span style={{ color: DL.faint }}>▸</span>
                <span style={{ opacity: cursorOn ? 1 : 0, color: DL.warm }}>▌</span>
              </div>
            </div>
          </div>
        </div>
        {/* closing line under the terminal */}
        <div style={{ marginTop: 44, textAlign: 'center', opacity: nobodyOp }}>
          <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 54, color: DL.text }}>
            Nobody is awake. <span style={{ color: DL.gold }}>Everything still ships.</span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default DlFleetLog;
