import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { ChevronLeft, Phone as PhoneIcon, MoreVertical, CheckCheck, Paperclip, Mic } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Phone } from '../../lib/danslab';

// =============================================================================
// Origin — the escalation. VO 0.8s (20.8s): "...Three twelve A M. Sienna wants
// to double a position. Policy says: ask the human. One message lands on Dan's
// phone. He reads it over coffee. One tap. Approved. The fleet moves on.
// Judgment stays human. Everything else stays automatic." Telegram chat plays
// out inside an animated phone; Dan's thumb taps APPROVE.
// =============================================================================
export const compositionConfig = { id: 'DoTelegram', durationInSeconds: 22.8, fps: 30, width: 1920, height: 1080 };

const PHONE = 60;   // phone rises in
const MSG1 = 150;   // sienna's message lands
const TYPING = 250; // dan composing
const TAP = 320;    // thumb tap
const MSG2 = 336;   // approved bubble
const DONE = 402;   // system line
const CLOSE = 486;  // judgment/automatic

// Telegram chat screen (portrait, dark theme)
const TelegramScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const TG = { bg: '#0e1621', head: '#17212b', inBub: '#182533', outBub: '#2b5278', tick: '#5ec07a', text: '#ffffff', dim: '#7d8e9e', accent: '#64b5ef' };
  const bub = (at: number) => ({
    opacity: interpolate(frame, [at, at + 12], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(frame, [at, at + 12], [16, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  const typingOp = interpolate(frame, [TYPING, TYPING + 10, MSG2 - 6, MSG2], [0, 1, 1, 0], DCLAMP);
  const dot = (i: number) => 0.3 + 0.7 * Math.abs(Math.sin((frame - TYPING) / 7 - i * 0.9));

  return (
    <div style={{ width: '100%', height: '100%', background: TG.bg, fontFamily: DL_SANS, position: 'relative' }}>
      {/* header */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, paddingTop: 44, height: 118, background: TG.head, display: 'flex', alignItems: 'center', gap: 12, padding: '52px 18px 0' }}>
        <ChevronLeft size={26} color={TG.accent} />
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${DL.red}, ${DL.gold})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DL_SERIF, fontWeight: 600, fontSize: 22, color: '#fff' }}>D</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 21, fontWeight: 600, color: TG.text }}>DansLab Fleet</div>
          <div style={{ fontSize: 15, color: TG.tick }}>bot · online</div>
        </div>
        <PhoneIcon size={22} color={TG.accent} />
        <MoreVertical size={22} color={TG.dim} />
      </div>

      {/* chat body */}
      <div style={{ position: 'absolute', top: 118, bottom: 78, left: 0, right: 0, padding: '18px 14px', display: 'flex', flexDirection: 'column', gap: 10, backgroundImage: `radial-gradient(${TG.head}66 1px, transparent 1px)`, backgroundSize: '22px 22px' }}>
        {/* date pill */}
        <div style={{ alignSelf: 'center', background: '#1e2c3a', borderRadius: 999, padding: '5px 14px', fontSize: 14, color: TG.dim, marginBottom: 4 }}>March 12</div>

        {/* incoming — Sienna */}
        <div style={{ ...bub(MSG1), alignSelf: 'flex-start', maxWidth: '82%', background: TG.inBub, borderRadius: '4px 14px 14px 14px', padding: '12px 15px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: DL.gold, marginBottom: 5 }}>Sienna · crypto</div>
          <div style={{ fontSize: 18, color: TG.text, lineHeight: 1.4 }}>Signal confirmed on BTC. Requesting approval to <b>double the position</b>.</div>
          <div style={{ fontSize: 14, color: TG.dim, marginTop: 6 }}>Policy: human sign-off required.</div>
          <div style={{ fontSize: 13, color: TG.dim, textAlign: 'right', marginTop: 2 }}>3:12</div>
        </div>

        {/* typing indicator */}
        <div style={{ opacity: typingOp, alignSelf: 'flex-end', background: TG.outBub, borderRadius: 14, padding: '14px 18px', display: 'flex', gap: 6 }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#cfe0f0', opacity: dot(i) }} />)}
        </div>

        {/* outgoing — Dan's approval */}
        <div style={{ ...bub(MSG2), alignSelf: 'flex-end', maxWidth: '78%', background: TG.outBub, borderRadius: '14px 4px 14px 14px', padding: '12px 16px' }}>
          <div style={{ fontSize: 20, fontWeight: 600, color: TG.text, display: 'flex', alignItems: 'center', gap: 8 }}>Approved ✅</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginTop: 2 }}>
            <span style={{ fontSize: 13, color: '#b9d4ec' }}>3:12</span>
            <CheckCheck size={15} color={TG.tick} />
          </div>
        </div>

        {/* system line */}
        <div style={{ ...bub(DONE), alignSelf: 'center', background: '#1e2c3a', borderRadius: 999, padding: '6px 14px', fontFamily: DL_MONO, fontSize: 13, color: TG.dim }}>
          fleet resumed · position updated · logged
        </div>
      </div>

      {/* input bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 78, background: TG.head, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px' }}>
        <Paperclip size={22} color={TG.dim} />
        <div style={{ flex: 1, fontSize: 17, color: TG.dim }}>Message</div>
        <Mic size={22} color={TG.dim} />
      </div>
    </div>
  );
};

const DoTelegram: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const c1 = interpolate(frame, [CLOSE, CLOSE + 12], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const c2 = interpolate(frame, [CLOSE + 40, CLOSE + 54], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  // thumb tap on APPROVE
  const thumbIn = interpolate(frame, [TAP - 24, TAP - 6], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const press = interpolate(frame, [TAP - 5, TAP, TAP + 8], [0, 1, 0], DCLAMP);
  const thumbOut = interpolate(frame, [TAP + 40, TAP + 60], [1, 0], DCLAMP);
  const thumbOp = thumbIn * thumbOut;
  const ripple = interpolate(frame, [TAP, TAP + 22], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const rippleOp = interpolate(frame, [TAP, TAP + 4, TAP + 22], [0, 0.5, 0], DCLAMP);
  // annotation chips
  const chip = (at: number) => interpolate(frame, [at, at + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="05" label="ESCALATION // 03:12 AM" />

      <div style={{ position: 'absolute', top: 210, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 72, color: DL.text }}>
          The system <span style={{ fontStyle: 'italic', color: DL.sky }}>doesn&rsquo;t guess.</span>
        </span>
      </div>

      {/* annotation chips, left */}
      <div style={{ position: 'absolute', top: 420, left: 130, display: 'flex', flexDirection: 'column', gap: 22, width: 620 }}>
        <div style={{ opacity: chip(MSG1 + 20), display: 'flex', alignItems: 'center', gap: 16, background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `3px solid ${DL.gold}`, borderRadius: 12, padding: '20px 26px' }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.gold }}>03:12</span>
          <span style={{ fontSize: 26, color: DL.dim }}>Sienna requests — <span style={{ color: DL.text }}>policy needs a human.</span></span>
        </div>
        <div style={{ opacity: chip(MSG2 + 8), display: 'flex', alignItems: 'center', gap: 16, background: DL.panel, border: `1px solid ${DL.sky}55`, borderLeft: `3px solid ${DL.sky}`, borderRadius: 12, padding: '20px 26px' }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.sky }}>ONE TAP</span>
          <span style={{ fontSize: 26, color: DL.text }}>Dan approves over coffee.</span>
        </div>
        <div style={{ opacity: chip(DONE + 8), display: 'flex', alignItems: 'center', gap: 16, background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `3px solid ${DL.green}`, borderRadius: 12, padding: '20px 26px' }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.green }}>▸ RESUMED</span>
          <span style={{ fontSize: 26, color: DL.dim }}>the fleet moves on.</span>
        </div>
      </div>

      {/* glow behind phone */}
      <div style={{ position: 'absolute', top: 240, right: 300, width: 560, height: 560, borderRadius: '50%', background: `radial-gradient(circle, ${DL.sky}1e, transparent 65%)` }} />

      {/* the phone */}
      <div style={{ position: 'absolute', top: 120, right: 340 }}>
        <Phone h={820} start={PHONE} statusTime="3:12" tilt={-5}>
          <TelegramScreen />
        </Phone>
        {/* tap ripple + thumb — landing on the Approved bubble (~y560 of screen) */}
        <div style={{ position: 'absolute', top: 560, right: 60, width: 96, height: 96, borderRadius: '50%', border: `3px solid ${DL.sky}`, transform: `translate(50%,-50%) scale(${0.4 + ripple * 1.6})`, opacity: rippleOp }} />
        <div style={{ position: 'absolute', top: 590, right: 30, fontSize: 128, opacity: thumbOp, transform: `rotate(-14deg) scale(${1 - press * 0.14})`, filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))' }}>👆</div>
      </div>

      <div style={{ position: 'absolute', bottom: 74, left: 130, right: 700, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span style={{ opacity: c1, fontFamily: DL_SERIF, fontSize: 46, color: DL.text }}>Judgment stays <span style={{ color: DL.sky }}>human.</span></span>
        <span style={{ opacity: c2, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>Everything else stays automatic.</span>
      </div>
    </AbsoluteFill>
  );
};
export default DoTelegram;
