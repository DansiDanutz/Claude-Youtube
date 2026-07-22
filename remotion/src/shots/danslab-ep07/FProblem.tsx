import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { FileText, Palette, Mic, Film, Music, Scissors } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep07 3 — the brutal math of video: a week of human work, every week. VO 0.8s (21.3s).
export const compositionConfig = { id: 'FProblem', durationInSeconds: 24, fps: 30, width: 1920, height: 1080 };

const JOBS: [React.ReactNode, string][] = [
  [<FileText size={30} color={DL.sky} />, 'a script'],
  [<Palette size={30} color={DL.gold} />, 'a design system'],
  [<Mic size={30} color={DL.green} />, 'a voice'],
  [<Film size={30} color={DL.red} />, 'motion, every frame'],
  [<Music size={30} color={DL.sky} />, 'sound design'],
  [<Scissors size={30} color={DL.gold} />, 'an edit'],
];

const FProblem: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="07" label="THE MACHINE // THE BRUTAL MATH" />

      <div style={{ position: 'absolute', top: 170, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={20} size={50}>One good ten-minute film is <span style={{ color: DL.red }}>a week of human work.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 18, maxWidth: 1300, margin: '0 auto' }}>
        {JOBS.map(([icon, label], i) => {
          const at = 110 + i * 18;
          const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
          const y = interpolate(frame, [at, at + 18], [20, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={label} style={{ opacity: op, transform: `translateY(${y}px)`, display: 'flex', alignItems: 'center', gap: 14, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 14, padding: '20px 30px' }}>
              {icon}<span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.text }}>{label}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 130, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [330, 356], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>Dan needed one of these </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.gold }}>every week.</span>
        <div style={{ marginTop: 10, fontFamily: DL_SANS, fontSize: 32, color: DL.dim }}>Alone, that is simply impossible.</div>
      </div>
    </AbsoluteFill>
  );
};
export default FProblem;
