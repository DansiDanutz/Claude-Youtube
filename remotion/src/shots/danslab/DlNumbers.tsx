import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise } from '../../lib/danslab';

// =============================================================================
// DansLab 4/10 — the numbers. VO 0.8s: "The numbers tell the story. Over
// thirty active agents across five droplets. Five products live. Thirty-eight
// cron jobs, every single day. And ninety-nine point nine four percent uptime
// over the last thirty days." Cards land on their mentions; values count up.
// =============================================================================
export const compositionConfig = { id: 'DlNumbers', durationInSeconds: 15.8, fps: 30, width: 1920, height: 1080 };

const STATS = [
  { n: '01', target: 30, suffix: '+', label: 'Active agents', sub: 'across 5 droplets', color: DL.red, at: 96 },
  { n: '02', target: 5, suffix: '', label: 'Products live', sub: 'deployed on Vercel', color: DL.gold, at: 176 },
  { n: '03', target: 38, suffix: '/day', label: 'Cron jobs', sub: '14 Dexter · 24 Memo', color: DL.sky, at: 236 },
  { n: '04', target: 99.94, suffix: '%', label: 'Uptime', sub: 'last 30 days', color: DL.green, at: 322, decimals: 2 },
];

const DlNumbers: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="04" label="THE NUMBERS // 30 DAYS" />

      <div style={{ position: 'absolute', top: 210, left: 120, ...rise(10, 22) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 84, color: DL.text }}>
          The numbers tell <span style={{ fontStyle: 'italic', color: DL.gold }}>the story.</span>
        </span>
      </div>

      <div style={{ position: 'absolute', top: 430, left: 120, right: 120, display: 'flex', gap: 30 }}>
        {STATS.map((s) => {
          const op = interpolate(frame, [s.at, s.at + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const y = interpolate(frame, [s.at, s.at + 14], [30, 0], { ...DCLAMP, easing: DL_EASE.out });
          const v = interpolate(frame, [s.at + 4, s.at + 34], [0, s.target], { ...DCLAMP, easing: DL_EASE.inOut });
          const shown = s.decimals ? v.toFixed(s.decimals) : String(Math.round(v));
          return (
            <div key={s.n} style={{ opacity: op, transform: `translateY(${y}px)`, flex: 1, background: DL.panel, border: `1px solid ${DL.border}`, borderTop: `3px solid ${s.color}`, borderRadius: 14, padding: '44px 40px 38px', position: 'relative' }}>
              <span style={{ position: 'absolute', top: 26, right: 30, fontFamily: DL_MONO, fontSize: 22, color: DL.faint }}>{s.n}</span>
              <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 108, lineHeight: 1, color: s.color }}>
                {shown}<span style={{ fontSize: 52, color: DL.dim }}>{s.suffix}</span>
              </div>
              <div style={{ fontSize: 33, fontWeight: 600, color: DL.text, marginTop: 22 }}>{s.label}</div>
              <div style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.muted, marginTop: 10 }}>{s.sub}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
export default DlNumbers;
