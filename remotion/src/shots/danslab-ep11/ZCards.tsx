import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, SiteFrame } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ch3 · the trick. VO flw12: worldcup26.world — free cards, unlock by watching,
// leaderboard. Real screenshot + the mechanic as 3D-flipping cards.
export const compositionConfig = { id: 'ZCards', durationInSeconds: 19, fps: 30, width: 1920, height: 1080 };

const STEPS = ['WATCH', 'UNLOCK', 'CLIMB'];

const ZCards: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const op = interpolate(f, [60, 85], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="11" label="THE FLYWHEEL // THE TRICK" />
      <div style={{ position: 'absolute', top: 130, left: 120 }}>
        <Headline at={8} size={44}>The trick that did it: <span style={{ color: DL.gold }}>worldcup26.world</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 250, left: 120, opacity: op }}>
        <SiteFrame src={staticFile('projects/danslab-ep11/site-worldcup.png')} url="worldcup26.world" w={1060} h={620} />
      </div>
      {/* the mechanic: three cards flip in, one per word */}
      <div style={{ position: 'absolute', top: 300, right: 120, display: 'flex', flexDirection: 'column', gap: 24, perspective: 1200 }}>
        {STEPS.map((s, i) => {
          const at = 260 + i * 60;
          const sp = spring({ frame: f - at, fps, config: { damping: 15, mass: 0.7 } });
          return (
            <div key={s} style={{
              opacity: f >= at ? 1 : 0,
              transform: `rotateY(${(1 - sp) * 90}deg)`,
              width: 380, background: DL.panel, border: `2px solid ${i === 2 ? DL.gold : DL.border}`,
              borderRadius: 18, padding: '26px 34px', textAlign: 'center',
            }}>
              <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 40, letterSpacing: 6, color: i === 2 ? DL.gold : DL.text }}>{s}</div>
              <div style={{ fontFamily: DL_SANS, fontSize: 22, color: DL.muted, marginTop: 8 }}>
                {i === 0 ? "the day's video" : i === 1 ? "the day's free card" : 'the leaderboard'}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{
        position: 'absolute', bottom: 90, left: 120, fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.dim,
        opacity: interpolate(f, [470, 492], [0, 1], DCLAMP),
      }}>
        119 cards · free entry · watch daily to unlock
      </div>
    </AbsoluteFill>
  );
};
export default ZCards;
