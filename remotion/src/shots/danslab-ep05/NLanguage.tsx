import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep05 11 — four minds need four voices. VO 0.8s (15.7s).
export const compositionConfig = { id: 'NLanguage', durationInSeconds: 18, fps: 30, width: 1920, height: 1080 };

const VOICES = [
  { img: 'sienna.jpg', name: 'Sienna', tone: '&ldquo;Tighten the risk.&rdquo;', color: DL.red },
  { img: 'memo.jpg', name: 'Memo', tone: '&ldquo;Take your time.&rdquo;', color: DL.sky },
  { img: 'nano.png', name: 'Nano', tone: '&ldquo;Be precise.&rdquo;', color: DL.gold },
];

const NLanguage: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="05" label="HOW IT THINKS // FOUR VOICES" />

      <div style={{ position: 'absolute', top: 190, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={20} size={54}>And it speaks to each of them <span style={{ color: DL.sky }}>differently.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 420, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 70 }}>
        {VOICES.map((v, i) => {
          const at = 140 + i * 26;
          const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
          const y = interpolate(frame, [at, at + 18], [24, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={v.name} style={{ opacity: op, transform: `translateY(${y}px)`, textAlign: 'center' }}>
              <Avatar src={staticFile(`projects/danslab-ep05/${v.img}`)} size={150} color={v.color} />
              <div style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.faint, marginTop: 14 }}>{v.name}</div>
              <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 30, color: v.color, marginTop: 6 }} dangerouslySetInnerHTML={{ __html: v.tone }} />
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [300, 322], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SANS, fontSize: 32, color: DL.dim }}>Four very different minds need four very different voices. So that&rsquo;s what it gives them.</span>
      </div>
    </AbsoluteFill>
  );
};
export default NLanguage;
