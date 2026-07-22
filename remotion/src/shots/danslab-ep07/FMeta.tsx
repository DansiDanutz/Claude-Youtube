import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { StationLine } from '../../lib/ep07kit';

// Ep07 14 — the meta reveal: this episode came off the same line. Infinite
// mirror — the frame contains itself, four levels deep. VO 0.8s (17.4s).
export const compositionConfig = { id: 'FMeta', durationInSeconds: 20, fps: 30, width: 1920, height: 1080 };

const STATIONS = ['SCRIPT', 'VOICE', 'SCENES', 'RENDER', 'ASSEMBLE', 'DELIVER'];

// One nesting level: a 16:9 frame with a title bar; children go inside it.
const Mirror: React.FC<{ depth: number; at: number }> = ({ depth, at }) => {
  const frame = useCurrentFrame();
  if (depth === 0) {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: DL.gold, boxShadow: `0 0 22px ${DL.gold}` }} />
      </div>
    );
  }
  const op = interpolate(frame, [at, at + 20], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, background: DL.bg, border: `1px solid ${DL.border}`, borderRadius: 12, overflow: 'hidden', boxShadow: '0 22px 60px rgba(0,0,0,0.6)' }}>
      <div style={{ height: '10%', minHeight: 20, background: DL.panel2, borderBottom: `1px solid ${DL.border}`, display: 'flex', alignItems: 'center', paddingLeft: '2%', gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: DL.red }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: DL.gold }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: DL.green }} />
      </div>
      <div style={{ position: 'absolute', top: '10%', left: '8%', right: '8%', bottom: '8%' }}>
        <Mirror depth={depth - 1} at={at + 34} />
      </div>
    </div>
  );
};

const FMeta: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="07" label="THE OUTPUT // THE MIRROR" />

      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>And this video — the one you are watching <span style={{ color: DL.red }}>right now</span> —</Headline>
      </div>

      <div style={{ position: 'absolute', top: 280, left: '50%', transform: 'translateX(-50%)', width: 1120, height: 470 }}>
        {/* outermost frame is the episode itself */}
        <div style={{ position: 'absolute', inset: 0, background: DL.bg, border: `1px solid ${DL.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 34px 90px rgba(0,0,0,0.7)', opacity: interpolate(frame, [50, 74], [0, 1], DCLAMP) }}>
          <div style={{ height: 46, background: DL.panel2, borderBottom: `1px solid ${DL.border}`, display: 'flex', alignItems: 'center', paddingLeft: 18, gap: 8 }}>
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: DL.red }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: DL.gold }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: DL.green }} />
            <span style={{ marginLeft: 18, fontFamily: DL_MONO, fontSize: 19, color: DL.faint }}>danslab-ep07-factory-4k.mp4</span>
          </div>
          <div style={{ position: 'absolute', top: 78, left: 0, right: 0, textAlign: 'center' }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 16, letterSpacing: 7, color: DL.red }}>DANSLAB · NO. 07</div>
            <div style={{ fontFamily: DL_SERIF, fontSize: 52, color: DL.text, marginTop: 8 }}>The <span style={{ fontStyle: 'italic', color: DL.gold }}>Factory</span></div>
          </div>
          <div style={{ position: 'absolute', top: 198, left: '50%', transform: 'translateX(-50%) scale(0.6)', transformOrigin: 'top center' }}>
            <StationLine stations={STATIONS} at={80} w={1400} />
          </div>
        </div>

        {/* the mirror inside it — the episode, containing the episode */}
        <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', width: 260, height: 146 }}>
          <Mirror depth={3} at={210} />
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [420, 450], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 48, color: DL.warm }}>The factory simply&hellip; </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 48, color: DL.gold }}>filmed itself.</span>
      </div>
    </AbsoluteFill>
  );
};
export default FMeta;
