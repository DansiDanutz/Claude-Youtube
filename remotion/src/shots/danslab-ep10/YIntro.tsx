import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP, DlLogoAnimated } from '../../lib/danslab';
import { ImageBackdrop } from '../../lib/ep10kit';

// Ep10 0 — mystery cold open. A confidential payroll record that doesn't add up,
// typed line by line over the dark office. Then the logo stamp and the title.
// No VO — clock-tick + riser land in the mix (assemble.py).
export const compositionConfig = { id: 'YIntro', durationInSeconds: 13, fps: 30, width: 1920, height: 1080 };

const LINES: [string, string, number, string][] = [
  // label, value, at-frame, value color
  ['PAYROLL RECORD', 'CONFIDENTIAL', 18, DL.red],
  ['EMPLOYEES', '8', 60, DL.text],
  ['NAMES', '[REDACTED]', 96, DL.warm],
  ['BANK ACCOUNTS', 'NONE FOUND', 134, DL.warm],
  ['COST PER HOUR', '$0.22', 172, DL.gold],
];

const TITLE = 235;

// mono line with a caret that types in
const Row: React.FC<{ label: string; value: string; at: number; color: string }> = ({ label, value, at, color }) => {
  const f = useCurrentFrame();
  const chars = Math.floor(interpolate(f, [at, at + 22], [0, value.length], DCLAMP));
  const op = interpolate(f, [at, at + 6], [0, 1], DCLAMP);
  return (
    <div style={{ display: 'flex', gap: 30, opacity: op, alignItems: 'baseline' }}>
      <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 5, color: DL.faint, width: 400 }}>{label}</span>
      <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 40, letterSpacing: 2, color }}>
        {value.slice(0, chars)}
        <span style={{ opacity: f % 20 < 10 ? 1 : 0, color: DL.gold }}>▌</span>
      </span>
    </div>
  );
};

const YIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const recordOut = interpolate(frame, [TITLE - 18, TITLE - 2], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  const logoIn = interpolate(frame, [TITLE, TITLE + 12], [0, 1], DCLAMP);
  const nameOp = interpolate(frame, [TITLE + 40, TITLE + 58], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const nameScale = interpolate(frame, [TITLE + 40, TITLE + 62], [1.08, 1], { ...DCLAMP, easing: DL_EASE.out });
  const urlOp = interpolate(frame, [TITLE + 70, TITLE + 88], [0, 1], DCLAMP);
  const fadeOut = interpolate(frame, [362, 388], [1, 0], { ...DCLAMP, easing: DL_EASE.in });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fadeOut, background: DL.bg }}>
      <ImageBackdrop src={staticFile('projects/danslab-ep10/01-head-office.png')} dim={0.88} />
      {/* the record */}
      <AbsoluteFill style={{ justifyContent: 'center', paddingLeft: 240, opacity: recordOut }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          {LINES.map(([label, value, at, color]) => (
            <Row key={label} label={label} value={value} at={at} color={color} />
          ))}
        </div>
      </AbsoluteFill>
      {/* the stamp */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ opacity: logoIn * (1 - nameOp) }}>
          <DlLogoAnimated size={210} start={TITLE} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: nameOp, transform: `scale(${nameScale})` }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 10, color: DL.red }}>DANSLAB · NO. 10</div>
        <div style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 150, color: DL.text, marginTop: 18 }}>
          The <span style={{ fontStyle: 'italic', color: DL.gold }}>Payroll</span>
        </div>
        <div style={{ opacity: urlOp, fontFamily: DL_MONO, fontSize: 25, letterSpacing: 4, color: DL.gold, marginTop: 30 }}>
          danslab.vercel.app
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default YIntro;
