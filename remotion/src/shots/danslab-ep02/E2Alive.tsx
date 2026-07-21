import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { Heart } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Avatar } from '../../lib/danslab';

// =============================================================================
// Ep02 the survivor. VO 0.8s (14.7s): "Day three. Bracing for another death.
// But Dexter... was alive. Awake. Untouched. The first machine that refused to
// die. And that one survivor was about to change everything."
// =============================================================================
export const compositionConfig = { id: 'E2Alive', durationInSeconds: 16, fps: 30, width: 1920, height: 1080 };

const REVEAL = 150;
const WORDS = 250;
const CHANGE = 360;

const E2Alive: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const revealOp = interpolate(frame, [REVEAL, REVEAL + 20], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const revealScale = interpolate(frame, [REVEAL, REVEAL + 22], [0.8, 1], { ...DCLAMP, easing: DL_EASE.out });
  const pulse = 0.6 + 0.4 * Math.abs(Math.sin((frame - REVEAL) / 16));
  const beat = 1 + 0.06 * Math.abs(Math.sin((frame - REVEAL) / 10));
  const w = (i: number) => interpolate(frame, [WORDS + i * 26, WORDS + 12 + i * 26], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const changeOp = interpolate(frame, [CHANGE, CHANGE + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const words = ['Alive.', 'Awake.', 'Untouched.'];

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="02" label="DAY 3 // THE SURVIVOR" />

      {/* Dexter alive, center */}
      <div style={{ position: 'absolute', top: 250, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: revealOp, transform: `scale(${revealScale})` }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: -30, borderRadius: '50%', background: `radial-gradient(circle, ${DL.green}33, transparent 70%)`, opacity: pulse }} />
          <div style={{ transform: `scale(${beat})` }}>
            <Avatar src={staticFile('projects/danslab-ep02/dexter.jpg')} size={230} color={DL.green} />
          </div>
          <div style={{ position: 'absolute', bottom: 6, right: 6, display: 'flex', alignItems: 'center', gap: 8, background: DL.bg, border: `2px solid ${DL.green}`, borderRadius: 999, padding: '8px 18px' }}>
            <Heart size={22} color={DL.green} fill={DL.green} />
            <span style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.green }}>ALIVE</span>
          </div>
        </div>
      </div>

      {/* three words */}
      <div style={{ position: 'absolute', top: 640, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 44, fontFamily: DL_SERIF, fontSize: 60 }}>
        {words.map((word, i) => <span key={word} style={{ opacity: w(i), color: i === 2 ? DL.green : DL.text }}>{word}</span>)}
      </div>

      <div style={{ position: 'absolute', bottom: 96, left: 0, right: 0, textAlign: 'center', opacity: changeOp }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>
          One survivor — about to <span style={{ color: DL.text }}>change everything.</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
export default E2Alive;
