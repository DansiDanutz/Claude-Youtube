import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Avatar } from '../../lib/danslab';

// =============================================================================
// Ep02 the race. VO 0.8s (19.5s): "Now every agent has one obsession. Lead the
// board. If you don't work, if you're not profitable, if tasks come back wrong,
// you fall to the bottom — in front of everyone. A race. And a company that
// races itself is a company that keeps winning." Animated leaderboard, bars
// grow, ranks settle; a warning row sinks.
// =============================================================================
export const compositionConfig = { id: 'E2Race', durationInSeconds: 20.6, fps: 30, width: 1920, height: 1080 };

const ROWS = [
  { avatar: 'sienna.jpg', name: 'Sienna', pts: 940, note: 'profitable · on time', up: true },
  { avatar: 'dexter.jpg', name: 'Dexter', pts: 880, note: 'shipped 3 videos', up: true },
  { avatar: 'nano.png', name: 'Nano', pts: 720, note: 'Nervix live', up: true },
  { avatar: 'memo.jpg', name: 'Memo', pts: 410, note: 'task returned wrong · sinking', up: false },
];
const BARS = 130;
const WIN = 470;

const E2Race: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const maxPts = 1000;
  const winOp = interpolate(frame, [WIN, WIN + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="05" label="THE RACE // LEADERBOARD" />

      <div style={{ position: 'absolute', top: 172, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 64, color: DL.text }}>
          One obsession: <span style={{ fontStyle: 'italic', color: DL.gold }}>lead the board.</span>
        </span>
      </div>

      {/* leaderboard */}
      <div style={{ position: 'absolute', top: 320, left: 200, right: 200, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {ROWS.map((r, i) => {
          const at = BARS + i * 24;
          const op = interpolate(frame, [at, at + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const bar = interpolate(frame, [at + 6, at + 44], [0, r.pts / maxPts], { ...DCLAMP, easing: DL_EASE.out });
          const num = Math.round(interpolate(frame, [at + 6, at + 44], [0, r.pts], { ...DCLAMP, easing: DL_EASE.out }));
          const accent = r.up ? DL.green : DL.red;
          return (
            <div key={r.name} style={{ opacity: op, display: 'flex', alignItems: 'center', gap: 22 }}>
              <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 40, color: i === 0 ? DL.gold : DL.faint, width: 44 }}>{i + 1}</span>
              <Avatar src={staticFile(`projects/danslab-ep02/${r.avatar}`)} size={68} color={i === 0 ? DL.gold : accent} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.text }}>{r.name}</span>
                  {r.up ? <TrendingUp size={20} color={DL.green} /> : <TrendingDown size={20} color={DL.red} />}
                  {i === 0 && <Trophy size={22} color={DL.gold} />}
                  <span style={{ marginLeft: 'auto', fontFamily: DL_MONO, fontSize: 28, color: accent, fontVariantNumeric: 'tabular-nums' }}>{num} pts</span>
                </div>
                <div style={{ marginTop: 8, height: 12, borderRadius: 999, background: '#ffffff0c', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '100%', background: i === 0 ? `linear-gradient(90deg, ${DL.gold}, ${DL.red})` : accent, transform: `scaleX(${bar})`, transformOrigin: 'left' }} />
                </div>
                <div style={{ fontFamily: DL_MONO, fontSize: 18, color: r.up ? DL.muted : DL.red, marginTop: 6 }}>{r.note}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 78, left: 0, right: 0, textAlign: 'center', opacity: winOp }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>A company that races itself — <span style={{ color: DL.text }}>keeps winning.</span></span>
      </div>
    </AbsoluteFill>
  );
};
export default E2Race;
