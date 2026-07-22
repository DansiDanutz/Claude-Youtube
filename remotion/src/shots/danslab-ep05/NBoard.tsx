import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { WebShot } from '../../lib/ep05kit';

// Ep05 4b — the board is not an abstraction: it is the real Paperclip control
// plane, walked like a shift manager walks the floor. Cursor sweeps agents ->
// projects -> runs. VO 0.8s (27.5s).
export const compositionConfig = { id: 'NBoard', durationInSeconds: 30, fps: 30, width: 1920, height: 1080 };

const PATH = [
  { t: 40, x: 1180, y: 120 },
  { t: 110, x: 300, y: 260 },
  { t: 200, x: 300, y: 470 },
  { t: 300, x: 900, y: 620 },
  { t: 400, x: 1150, y: 400 },
  { t: 520, x: 640, y: 300 },
];
const CLICKS = [{ t: 118, x: 300, y: 260 }, { t: 306, x: 900, y: 620 }];

const SWEEP: [string, string][] = [
  ['WHO IS MOVING', 'every agent, with a live status'],
  ['WHAT IS STUCK', 'every project, with a state'],
  ['WHAT BROKE', 'every run, with its result attached'],
];

const NBoard: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="05" label="PERCEPTION // THE REAL BOARD" />

      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={12} size={46}>The board it reads is <span style={{ color: DL.sky }}>not an abstraction.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 215, left: 60, transform: 'scale(0.855)', transformOrigin: 'top left' }}>
        <WebShot src={staticFile('projects/danslab-ep05/paperclip.png')} url="paperclip · localhost:3210" at={30} path={PATH} clicks={CLICKS} />
      </div>

      <div style={{ position: 'absolute', top: 300, right: 60, width: 420, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {SWEEP.map(([k, v], i) => {
          const at = 150 + i * 40;
          const op = interpolate(frame, [at, at + 18], [0, 1], DCLAMP);
          const x = interpolate(frame, [at, at + 22], [26, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={k} style={{ opacity: op, transform: `translateX(${x}px)`, background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `3px solid ${DL.sky}`, borderRadius: 14, padding: '22px 26px' }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 3, color: DL.sky }}>{k}</div>
              <div style={{ fontFamily: DL_SANS, fontSize: 24, color: DL.text, marginTop: 8, lineHeight: 1.35 }}>{v}</div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [560, 590], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>Around the clock — and it never once gets </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.gold }}>bored of looking.</span>
      </div>
    </AbsoluteFill>
  );
};
export default NBoard;
