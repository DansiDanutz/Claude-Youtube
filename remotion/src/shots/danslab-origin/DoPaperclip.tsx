import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, SiteFrame } from '../../lib/danslab';

// =============================================================================
// Origin 6/14 — Paperclip. VO 0.8s (25.6s): "And this... is Paperclip. The
// company's operating system..." Dashboard screenshot + role chips on their
// mentions; the "board is Dan" stamp closes (~f700).
// =============================================================================
export const compositionConfig = { id: 'DoPaperclip', durationInSeconds: 27.2, fps: 30, width: 1920, height: 1080 };

const CHIPS = [
  { label: 'AI CEO · reviews work', at: 220 },
  { label: 'FOUNDING ENGINEER · writes code', at: 268 },
  { label: 'RESEARCH PRODUCER · preps content', at: 316 },
];
const BOARD = 690;

const DoPaperclip: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const boardOp = interpolate(frame, [BOARD, BOARD + 12], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const boardScale = interpolate(frame, [BOARD, BOARD + 14], [1.4, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="05" label="THE OS // PAPERCLIP" />

      <div style={{ position: 'absolute', top: 184, left: 120, ...rise(10, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 72, color: DL.text }}>
          This is <span style={{ fontStyle: 'italic', color: DL.sky }}>Paperclip.</span>
          <span style={{ fontSize: 40, color: DL.muted, marginLeft: 28 }}>The company&rsquo;s operating system.</span>
        </span>
      </div>

      <div style={{ position: 'absolute', top: 320, left: 150, ...rise(56, 40) }}>
        <SiteFrame src={staticFile('projects/danslab-origin/paperclip.png')} url="paperclip · youtube-studio · dashboard" w={1250} h={650} />
      </div>

      {/* role chips, right rail */}
      <div style={{ position: 'absolute', top: 400, right: 90, display: 'flex', flexDirection: 'column', gap: 22, width: 420 }}>
        {CHIPS.map((c) => {
          const op = interpolate(frame, [c.at, c.at + 13], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const x = interpolate(frame, [c.at, c.at + 13], [26, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={c.label} style={{ opacity: op, transform: `translateX(${x}px)`, background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `3px solid ${DL.sky}`, borderRadius: 12, padding: '20px 26px' }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 21, color: DL.dim }}>{c.label}</span>
            </div>
          );
        })}
        {/* board stamp */}
        <div style={{ opacity: boardOp, transform: `scale(${boardScale}) rotate(-5deg)`, alignSelf: 'center', marginTop: 30 }}>
          <div style={{ border: `3px solid ${DL.red}`, borderRadius: 12, padding: '16px 30px', background: `${DL.bg}cc` }}>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 27, letterSpacing: 2, color: DL.red }}>THE BOARD<br />IS DAN</span>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 62, left: 120, right: 120, textAlign: 'center', opacity: interpolate(frame, [560, 578], [0, 1], { ...DCLAMP, easing: DL_EASE.out }) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>
          When something needs judgment, it stops — <span style={{ color: DL.text }}>and waits for the board.</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
export default DoPaperclip;
