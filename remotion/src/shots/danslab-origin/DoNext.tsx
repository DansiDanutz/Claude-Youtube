import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { MonitorPlay, Server, Clipboard, BrainCircuit, TrendingUp } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// =============================================================================
// Origin 14.5/15 — the tease. VO 0.8s (28.0s): "And this story... is just
// beginning. In the coming episodes: how we build this YouTube channel, in
// public. How the whole system was configured, machine by machine. How
// Paperclip runs a company of agents. Why Dan chose Hermes. And why we built
// an AI for crypto. Because every agent in this lab is set to one purpose.
// Executing... profitable... business. Episode two is already in production.
// Don't miss it." Episode cards land on mentions; the purpose line takes over;
// EP02 pill + blinking cursor close.
// =============================================================================
export const compositionConfig = { id: 'DoNext', durationInSeconds: 30, fps: 30, width: 1920, height: 1080 };

const EPISODES = [
  { ep: 'NO. 02', name: 'The Survivors', Icon: Server, title: 'how the fleet was born', at: 152 },
  { ep: 'NO. 03', name: 'The Overseer', Icon: Clipboard, title: 'Paperclip runs the company', at: 245 },
  { ep: 'NO. 04', name: 'The Brain', Icon: BrainCircuit, title: 'why Hermes', at: 335 },
  { ep: 'NO. 05', name: 'The Marketplace', Icon: TrendingUp, title: 'Nervix', at: 425 },
  { ep: 'NO. 06', name: 'The Factory', Icon: MonitorPlay, title: 'the video pipeline', at: 490 },
];
const PURPOSE = 585; // "one purpose"
const W1 = 650, W2 = 685, W3 = 720; // executing / profitable / business
const EP2 = 775, MISS = 830;

const DoNext: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [30, 48], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  // episode list dims when the purpose statement takes over
  const listDim = interpolate(frame, [PURPOSE - 10, PURPOSE + 10], [1, 0.18], { ...DCLAMP, easing: DL_EASE.inOut });
  const purposeOp = interpolate(frame, [PURPOSE, PURPOSE + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const w = (at: number) => interpolate(frame, [at, at + 12], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const ep2Op = interpolate(frame, [EP2, EP2 + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const ep2Glow = 0.5 + 0.5 * Math.abs(Math.sin((frame - EP2) / 15));
  const missOp = interpolate(frame, [MISS, MISS + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const cursorOn = Math.floor(frame / 15) % 2 === 0;

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="12" label="NEXT ON DANSLAB // THE SERIES" />

      <div style={{ position: 'absolute', top: 184, left: 120, opacity: titleOp }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 74, color: DL.text }}>
          This story is <span style={{ fontStyle: 'italic', color: DL.gold }}>just beginning.</span>
        </span>
      </div>

      {/* episode list */}
      <div style={{ position: 'absolute', top: 340, left: 120, right: 120, display: 'flex', flexDirection: 'column', gap: 18, opacity: listDim }}>
        {EPISODES.map((e) => {
          const op = interpolate(frame, [e.at, e.at + 13], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const x = interpolate(frame, [e.at, e.at + 13], [-26, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={e.ep} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 24, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 12, padding: '18px 30px' }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 2, color: DL.red, width: 100 }}>{e.ep}</span>
              <e.Icon size={28} color={DL.warm} strokeWidth={1.9} />
              <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 34, color: DL.text, width: 340 }}>{e.name}</span>
              <span style={{ fontSize: 26, color: DL.muted }}>{e.title}</span>
              <span style={{ marginLeft: 'auto', fontFamily: DL_MONO, fontSize: 22, color: DL.faint }}>▸ ▓▓▓▓▓▓</span>
            </div>
          );
        })}
      </div>

      {/* the purpose takeover */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: purposeOp }}>
        <div style={{ background: `${DL.bg}d8`, borderRadius: 24, padding: '70px 90px', textAlign: 'center', border: `1px solid ${DL.border}` }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 25, letterSpacing: 5, color: DL.muted }}>EVERY AGENT · ONE PURPOSE</div>
          <div style={{ display: 'flex', gap: 34, marginTop: 40, alignItems: 'baseline', justifyContent: 'center' }}>
            <span style={{ opacity: w(W1), fontFamily: DL_SERIF, fontWeight: 600, fontSize: 86, color: DL.text }}>Executing</span>
            <span style={{ opacity: w(W2), fontFamily: DL_SERIF, fontStyle: 'italic', fontWeight: 600, fontSize: 86, color: DL.gold }}>profitable</span>
            <span style={{ opacity: w(W3), fontFamily: DL_SERIF, fontWeight: 600, fontSize: 86, color: DL.red }}>business.</span>
          </div>
          <div style={{ opacity: ep2Op, marginTop: 54, display: 'inline-flex', alignItems: 'center', gap: 16, border: `2px solid ${DL.red}`, borderRadius: 999, padding: '16px 38px', boxShadow: `0 0 ${44 * ep2Glow}px ${DL.red}44` }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: DL.red, opacity: ep2Glow }} />
            <span style={{ fontFamily: DL_MONO, fontSize: 27, letterSpacing: 3, color: DL.text }}>NO. 02 · THE SURVIVORS · IN PRODUCTION</span>
          </div>
          <div style={{ opacity: missOp, fontFamily: DL_MONO, fontSize: 27, color: DL.warm, marginTop: 34 }}>
            don&rsquo;t miss it <span style={{ opacity: cursorOn ? 1 : 0, color: DL.red }}>▌</span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default DoNext;
