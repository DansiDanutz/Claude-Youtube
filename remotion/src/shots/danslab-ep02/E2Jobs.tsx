import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { MonitorPlay, Code2, Network } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Avatar } from '../../lib/danslab';

// =============================================================================
// Ep02 the assignments. VO 0.8s (27.0s): "While Sienna trained, Dan gave the
// others real work. Dexter, build the YouTube pipeline. Memo, build a framework
// on GSD + autonomous coding — a platform where coders share and sell their
// work. Nano, build Nervix — where anyone plugs in their agents and gets paid."
// Three job cards land on their mentions.
// =============================================================================
export const compositionConfig = { id: 'E2Jobs', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const JOBS = [
  { avatar: 'dexter.jpg', name: 'Dexter', Icon: MonitorPlay, platform: 'The YouTube pipeline', desc: 'a factory that turns a topic into a finished video — research, script, voice, render.', color: DL.red, at: 120 },
  { avatar: 'memo.jpg', name: 'Memo', Icon: Code2, platform: 'The framework', desc: 'built on GSD + OpenForge autonomous coding — where coders share their work, and sell it. Improved daily.', color: DL.gold, at: 250 },
  { avatar: 'nano.png', name: 'Nano', Icon: Network, platform: 'Nervix', desc: 'plug in your own agents, complete real tasks, and get paid. A marketplace for machine labor.', color: DL.sky, at: 380 },
];

const E2Jobs: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="04" label="THE ASSIGNMENTS // REAL WORK" />

      <div style={{ position: 'absolute', top: 176, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 64, color: DL.text }}>
          Everyone got <span style={{ fontStyle: 'italic', color: DL.gold }}>a real job.</span>
        </span>
      </div>

      <div style={{ position: 'absolute', top: 320, left: 120, right: 120, display: 'flex', gap: 30 }}>
        {JOBS.map((j) => {
          const op = interpolate(frame, [j.at, j.at + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const y = interpolate(frame, [j.at, j.at + 16], [34, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={j.name} style={{ opacity: op, transform: `translateY(${y}px)`, flex: 1, background: DL.panel, border: `1px solid ${DL.border}`, borderTop: `3px solid ${j.color}`, borderRadius: 16, padding: '34px 32px', minHeight: 440 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <Avatar src={staticFile(`projects/danslab-ep02/${j.avatar}`)} size={72} color={j.color} />
                <div>
                  <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 38, color: DL.text }}>{j.name}</div>
                  <div style={{ fontFamily: DL_MONO, fontSize: 18, color: DL.faint }}>assigned</div>
                </div>
              </div>
              <div style={{ marginTop: 30, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 54, height: 54, borderRadius: 12, background: `${j.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><j.Icon size={28} color={j.color} strokeWidth={2} /></div>
                <span style={{ fontSize: 30, fontWeight: 600, color: DL.text }}>{j.platform}</span>
              </div>
              <div style={{ fontSize: 25, color: DL.dim, marginTop: 20, lineHeight: 1.5 }}>{j.desc}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
export default E2Jobs;
