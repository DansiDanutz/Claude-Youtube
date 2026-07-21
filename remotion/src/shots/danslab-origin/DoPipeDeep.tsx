import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Search, PenLine, Palette, Clapperboard, Mic, Captions, Film, ShieldCheck, Eye, Rocket } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise } from '../../lib/danslab';

// =============================================================================
// Origin — pipeline deep dive. VO 0.8s (25.5s): each step gets a beat as
// Brian names it; "no editor ever opens" + "this episode went through the
// exact same machine" close.
// =============================================================================
export const compositionConfig = { id: 'DoPipeDeep', durationInSeconds: 27.6, fps: 30, width: 1920, height: 1080 };

const STEPS = [
  { n: '01', Icon: Search, name: 'Research', desc: 'digs for the story', at: 96 },
  { n: '02', Icon: PenLine, name: 'Script', desc: 'three acts', at: 152 },
  { n: '03', Icon: Palette, name: 'Design', desc: 'per-video system', at: 208 },
  { n: '04', Icon: Clapperboard, name: 'Scenes', desc: 'built as code', at: 268 },
  { n: '05', Icon: Mic, name: 'Voice', desc: 'Brian records', at: 320 },
  { n: '06', Icon: Captions, name: 'Subtitles', desc: 'synced to the word', at: 372 },
  { n: '07', Icon: Film, name: 'Render', desc: '4K master', at: 428 },
  { n: '08', Icon: ShieldCheck, name: 'QA gates', desc: 'rubric scored', at: 452 },
  { n: '09', Icon: Eye, name: 'Review', desc: 'final look', at: 478 },
  { n: '10', Icon: Rocket, name: 'Ship', desc: 'private draft up', at: 504 },
];
const NOEDIT = 560;
const META = 660;

const DoPipeDeep: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const noOp = interpolate(frame, [NOEDIT, NOEDIT + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const metaOp = interpolate(frame, [META, META + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const glow = 0.5 + 0.5 * Math.abs(Math.sin(frame / 14));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="07" label="THE MACHINE ROOM // 10 STEPS, CLOSER" />

      <div style={{ position: 'absolute', top: 186, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 70, color: DL.text }}>
          Look closer at <span style={{ fontStyle: 'italic', color: DL.gold }}>those ten steps.</span>
        </span>
      </div>

      {/* 2 x 5 grid */}
      <div style={{ position: 'absolute', top: 330, left: 120, right: 120, display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {STEPS.map((s) => {
          const op = interpolate(frame, [s.at, s.at + 12], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const y = interpolate(frame, [s.at, s.at + 12], [20, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={s.n} style={{ opacity: op, transform: `translateY(${y}px)`, width: 316, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 12, padding: '22px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontFamily: DL_MONO, fontSize: 19, color: DL.faint }}>{s.n}</span>
                <s.Icon size={24} color={DL.warm} strokeWidth={1.9} />
                <span style={{ fontSize: 28, fontWeight: 600, color: DL.text }}>{s.name}</span>
              </div>
              <div style={{ fontFamily: DL_MONO, fontSize: 19, color: DL.muted, marginTop: 10 }}>{s.desc}</div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
        <span style={{ opacity: noOp, fontFamily: DL_SERIF, fontSize: 46, color: DL.text }}>
          No editor <span style={{ fontStyle: 'italic', color: DL.red }}>ever opens.</span>
        </span>
        <div style={{ opacity: metaOp, display: 'inline-flex', alignItems: 'center', gap: 16, border: `1px solid ${DL.gold}66`, background: `${DL.gold}10`, borderRadius: 999, padding: '14px 34px', boxShadow: `0 0 ${36 * glow}px ${DL.gold}2a` }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.gold }}>THIS EPISODE WENT THROUGH THE EXACT SAME MACHINE</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default DoPipeDeep;
