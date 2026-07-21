import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Avatar } from '../../lib/danslab';

// =============================================================================
// Origin — the crew wall. VO 0.8s (18.7s): "Behind the five leads, a whole
// support crew... Twenty-seven names on the wall. Each one owns a job that
// used to eat Dan's time." Names populate the wall fast; counter ticks.
// =============================================================================
export const compositionConfig = { id: 'DoCrewWall', durationInSeconds: 20.8, fps: 30, width: 1920, height: 1080 };

const NAMES = [
  'Dexter','David','Nano','Memo','Sienna','Hermes','OpenClaw-01','OpenClaw-02','OpenClaw-03',
  'OpenClaw-04','ManusClaw','KiloClaw','KimiClaw','Monitor','Vercel','Github','ThePopeBot',
  'AutoForge','GSD','Vector','Update','Model','Doctor','Learning','Stripe','SSH','Supabase',
];
const AVATARS: Record<string, string> = {
  Dexter: 'dexter.jpg', David: 'david.jpg', Nano: 'nano.png', Memo: 'memo.jpg', Sienna: 'sienna.jpg',
};
const START = 120, GAP = 9;
const LINE = 430; // "each one owns a job..."

const DoCrewWall: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const shown = Math.max(0, Math.min(NAMES.length, Math.floor((frame - START) / GAP) + 1));
  const lineOp = interpolate(frame, [LINE, LINE + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg />
      <Kicker n="09" label="THE CREW // FULL WALL" />

      <div style={{ position: 'absolute', top: 190, left: 120, right: 120, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ ...rise(8, 20), fontFamily: DL_SERIF, fontWeight: 500, fontSize: 70, color: DL.text }}>
          The <span style={{ fontStyle: 'italic', color: DL.red }}>support crew.</span>
        </span>
        <span style={{ fontFamily: DL_MONO, fontSize: 44, color: DL.gold, fontVariantNumeric: 'tabular-nums' }}>
          {String(shown).padStart(2, '0')}<span style={{ fontSize: 26, color: DL.muted }}> / 27 NAMES</span>
        </span>
      </div>

      {/* the wall */}
      <div style={{ position: 'absolute', top: 340, left: 120, right: 120, display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {NAMES.map((n, i) => {
          const at = START + i * GAP;
          const op = interpolate(frame, [at, at + 8], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const lead = i < 6;
          const av = AVATARS[n];
          return (
            <div key={n} style={{ opacity: op, display: 'flex', alignItems: 'center', gap: 12, background: lead ? DL.panel2 : DL.panel, border: `1px solid ${lead ? DL.red + '55' : DL.border}`, borderRadius: 10, padding: av ? '10px 22px 10px 12px' : '14px 24px' }}>
              {av && <Avatar src={staticFile(`projects/danslab-origin/${av}`)} size={46} color={DL.red} />}
              <span style={{ fontFamily: DL_MONO, fontSize: 25, color: lead ? DL.text : DL.dim }}>{n}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 96, left: 0, right: 0, textAlign: 'center', opacity: lineOp }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>
          Each one owns a job that used to eat <span style={{ color: DL.text }}>Dan&rsquo;s time.</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
export default DoCrewWall;
