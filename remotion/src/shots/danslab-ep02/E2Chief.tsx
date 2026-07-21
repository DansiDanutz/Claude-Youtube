import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile, Easing } from 'remotion';
import { Crown, HeartPulse } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Avatar } from '../../lib/danslab';

const OVERSHOOT = Easing.bezier(0.34, 1.42, 0.64, 1);

// =============================================================================
// Ep02 the promotion. VO 0.8s (14.1s): "A machine had just diagnosed and
// repaired its own teammates. So Dan made a decision that sounds crazy... he
// promoted it. Dexter became the chief of droplets. The one who keeps the
// others alive." Crown lands on Dexter; the two he saved sit below.
// =============================================================================
export const compositionConfig = { id: 'E2Chief', durationInSeconds: 16, fps: 30, width: 1920, height: 1080 };

const DEXTER = 120;
const CROWN = 230;
const TEAM = 320;

const E2Chief: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const dexOp = interpolate(frame, [DEXTER, DEXTER + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const dexScale = interpolate(frame, [DEXTER, DEXTER + 20], [0.85, 1], { ...DCLAMP, easing: DL_EASE.out });
  const crownOp = interpolate(frame, [CROWN, CROWN + 12], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const crownY = interpolate(frame, [CROWN, CROWN + 16], [-40, 0], { ...DCLAMP, easing: OVERSHOOT });
  const glow = 0.5 + 0.5 * Math.abs(Math.sin(frame / 16));
  const saved = ['nano.png', 'memo.jpg'];

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="03" label="THE PROMOTION // CHIEF OF DROPLETS" />

      <div style={{ position: 'absolute', top: 190, left: 0, right: 0, textAlign: 'center', ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 66, color: DL.text }}>
          So Dan did something <span style={{ fontStyle: 'italic', color: DL.gold }}>a little crazy.</span>
        </span>
      </div>

      {/* Dexter crowned */}
      <div style={{ position: 'absolute', top: 350, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: dexOp, transform: `scale(${dexScale})` }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: -70, left: '50%', transform: `translateX(-50%) translateY(${crownY}px)`, opacity: crownOp }}>
            <Crown size={74} color={DL.gold} fill={DL.gold} strokeWidth={1.5} />
          </div>
          <div style={{ position: 'absolute', inset: -24, borderRadius: '50%', background: `radial-gradient(circle, ${DL.gold}33, transparent 70%)`, opacity: glow }} />
          <Avatar src={staticFile('projects/danslab-ep02/dexter.jpg')} size={240} color={DL.gold} />
        </div>
        <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 62, color: DL.text, marginTop: 22 }}>Dexter</div>
        <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.gold, marginTop: 6, opacity: crownOp }}>CHIEF OF DROPLETS</div>
      </div>

      {/* the two he saved */}
      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, opacity: interpolate(frame, [TEAM, TEAM + 16], [0, 1], DCLAMP) }}>
        <HeartPulse size={26} color={DL.green} />
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 34, color: DL.warm }}>the one who keeps the others alive:</span>
        {saved.map((a) => <Avatar key={a} src={staticFile(`projects/danslab-ep02/${a}`)} size={64} color={DL.green} />)}
      </div>
    </AbsoluteFill>
  );
};
export default E2Chief;
