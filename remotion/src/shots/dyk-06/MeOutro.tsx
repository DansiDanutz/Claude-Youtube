import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { DYT, DYT_DISPLAY, DYT_GRADIENT, DYT_HANDLE, DytBg, DytLogoAnimated, DytWordmark } from '../../lib/dytbrand';
import { makeCue, ease, rise, Vignette } from '../../lib/dykkit';
import vo from './vo.json';

// =============================================================================
// DYK 06 · 14/14 — narrated outro: reveals land on his words. Comment prompt "Which century's doctor would you trust,
// and why?" (the seven eras as chips), Comment of the Week, Dexty.live, LIKE / SHARE / SUBSCRIBE on their words, ONE teaser
// for No. 07 (swappable: NEXT_EP + the me13b-next line; placeholder subject in NEXT_EP — Fouquet & Pearson 2006, No. 05 F44:
// UK lighting cost < 1/3,000 of 1800) + an open question, ASK. WONDER. REPEAT., then the 15 s end screen: LEFT = THIS
// WEEK'S QUESTION (no real No. 05 comment chosen yet — pinned-question fallback, STORY §4 item 5; never a fabricated one),
// RIGHT = WATCH NEXT · No. 07 (no date), subscribe ring centred (960, 767). VO me13 @0.6 s, me13b @35.8 s, me13c @45.8 s,
// me14 on the end screen (ES + 14 f = 51.533 s, timeline.json).
// =============================================================================
export const compositionConfig = { id: 'MeOutro', durationInSeconds: 66.66666666666667, fps: 30, width: 1920, height: 1080 };
const DUR = 2000;

// ── swappable next-episode slot (change here + re-voice me13b-next + the teaser lines below + the description line)
const NEXT_EP = { no: '07', subject: 'LIGHT' } as const;
const PINNED_Q = 'Which century’s doctor would you trust, and why?';

const C = makeCue(vo, 'me13-outro', 0.6);
const N = makeCue(vo, 'me13b-next', 35.8);
const S = makeCue(vo, 'me13c-signoff', 45.8);
const THIS = C.at('This', 1);
const DID = C.at('Did');
const SIX = C.at('six.');
const TITLE = C.at('Medicine.', 1); // 'episode six. Medicine.' (2 = 'your medicine cabinet')
const TURN = C.at('turn');
const CENTURY = C.at("century's");
const DOCTOR = C.at('doctor');
const TRUST = C.at('trust,');
const WHY = C.at('why?');
const COMMENTS = C.at('comments');
const AT_END = C.at('end');
const BEST = C.at('best');
const COMMENT1 = C.at('comment,', 1);
const RIGHT = C.at('right');
const SCREEN = C.at('screen.');
const SUBJECT = C.at('subject');
const MOST2 = C.at('most');
const FUTURE = C.at('future');
const WEBSITE = C.at('website,');
const DEXTY = C.at('Dex-tee');
const WATCH = C.at('watch');
const COLLECT = C.at('collect');
const PLAY = C.at('play');
const GAME = C.at('game.');
const CHANGED = C.at('changed');
const CABINET = C.at('medicine', 2); // 'your medicine cabinet'
const LIKE = C.at('like');
const SHARE = C.at('Share');
const FRIEND = C.at('friend');
const JUST = C.at('just');
const COLD = C.at('cold.');
const SUB = C.at('subscribe,');
const NEXT_M = C.at('next');
const MYSTERY = C.at('mystery');
const NEXT = N.at('Next');
const SUBJECT_N = N.at('light.', 1); // 'Next time: light.' (2 = 'light now costs')
const BRITAIN = N.at('Britain,');
const COSTS = N.at('costs');
const THOUSANDTH = N.at('three-thousandth');
const EIGHTEEN = N.at('eighteen');
const SO_N = N.at('So');
const SWITCHED = N.at('switched');
const OFF = N.at('off?');
const ASK = S.at('Ask...');
const WONDER = S.at('Wonder...');
const REPEAT = S.at('Repeat.');
const END = S.end;
// End screen: 15 s from ES (YouTube end-screen elements are placed over these slots in Studio).
const ES = END + 54; // round 5: REPEAT. needs 1.5 s before the end screen (was 24 f)
const E = makeCue(vo, 'me14-endscreen', (ES + 14) / 30) // = 51.533 s (timeline.json);
const PICK = E.at('Pick');
const SEE = E.at('see');
const YOUR_COMMENT = E.at('comment.');

const Action: React.FC<{ label: string; at: number; primary?: boolean; icon: React.ReactNode }> = ({ label, at, primary = false, icon }) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [at, at + 8], [1.3, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ opacity: ease(f, at - 2, at + 6), transform: `scale(${s})`, display: 'flex', alignItems: 'center', gap: 16, padding: '18px 34px', borderRadius: 999, background: primary ? DL.gold : DL.panel, border: `2px solid ${primary ? DL.gold : DL.border}` }}>
      {icon}
      <span style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 34, color: primary ? DL.bg : DL.text }}>{label}</span>
    </div>
  );
};

// a light bulb (the No. 07 teaser art, placeholder subject); `on` 0–1 lights it
const Bulb: React.FC<{ size?: number; on?: number }> = ({ size = 200, on = 1 }) => (
  <svg width={size * 0.75} height={size} viewBox="0 0 150 200" style={{ overflow: 'visible' }}>
    <circle cx={75} cy={70} r={90} fill="#ffe9b0" opacity={0.18 * on} />
    <path d="M75 8 C36 8 14 38 14 68 C14 96 34 110 44 132 L106 132 C116 110 136 96 136 68 C136 38 114 8 75 8 Z" fill={on > 0.5 ? '#ffe9b0' : '#3a3a40'} opacity={0.35 + 0.65 * on} stroke="#c8b070" strokeWidth={4} />
    <path d="M58 132 L62 92 Q75 80 88 92 L92 132" fill="none" stroke="#d8a030" strokeWidth={4} opacity={0.6 + 0.4 * on} />
    <rect x={44} y={134} width={62} height={16} rx={4} fill="#9aa0a8" /><rect x={48} y={152} width={54} height={14} rx={4} fill="#80868e" /><rect x={58} y={168} width={34} height={14} rx={6} fill="#6a7078" />
  </svg>
);

const MeOutro: React.FC = () => {
  const f = useCurrentFrame();
  const fadeIn = ease(f, -1, 2);
  const fadeOut = ease(f, DUR - 18, DUR - 1, 1, 0, DL_EASE.in);
  const p1 = 1 - ease(f, NEXT - 14, NEXT, 0, 1, DL_EASE.in);
  const p2 = ease(f, NEXT - 2, NEXT + 12) * (1 - ease(f, END + 40, END + 50, 0, 1, DL_EASE.in));
  const p3 = ease(f, ES - 4, ES + 14);
  const commentPulse = f > COMMENTS ? 0.5 + 0.5 * Math.sin((f - COMMENTS) / 5) : 0;
  const lockOut = ease(f, TURN - 16, TURN - 2, 0, 1, DL_EASE.inOut);
  const hereFlash = ease(f, RIGHT, RIGHT + 4) * (1 - ease(f, RIGHT + 8, RIGHT + 28));
  const scribble = ease(f, E.at('time...', 1, 'e') + 2, E.at('time...', 1, 'e') + 20); // write-on in the gap after "time..." (one cue, no stack)
  const pulse = (at: number) => ease(f, at - 1, at + 5) * (1 - ease(f, at + 10, at + 28));
  const sixPulse = pulse(SIX);
  const gamePulse = pulse(GAME);
  const friendPulse = pulse(COLD);
  const cardFlare = pulse(YOUR_COMMENT);
  const ringPulse = ease(f, SEE - 2, SEE + 6) * (1 - ease(f, SEE + 12, SEE + 30));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: Math.min(fadeIn, fadeOut) }}>
      <SiteBg glow="#0e1a10" />
      <Vignette />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - lockOut, transform: `translateY(${-lockOut * 220}px) scale(${1 - lockOut * 0.5})` }}>
        <div style={{ ...rise(f, THIS - 2), fontFamily: DL_MONO, fontSize: 34, letterSpacing: 12, color: DL.red }}>EPISODE <span style={{ display: 'inline-block', opacity: ease(f, SIX - 4, SIX + 2), transform: `scale(${1 + 0.35 * sixPulse})`, textShadow: `0 0 ${20 * sixPulse}px ${DL.red}` }}>06</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 30, height: 260 }}>
          <div style={{ opacity: ease(f, 0, 8) }}><DytLogoAnimated size={220} start={0} /></div>
          <DytWordmark at={DID} size={96} />
        </div>
        <div style={{ ...rise(f, TITLE - 2), marginTop: 40, fontFamily: DL_SERIF, fontSize: 110, color: DL.text }}><span style={{ fontStyle: 'italic', color: DL.gold }}>Medicine</span></div>
      </AbsoluteFill>

      {/* ── part 1: title, comment prompt, the ritual */}
      <AbsoluteFill style={{ opacity: p1, alignItems: 'center' }}>
        <div style={{ ...rise(f, TURN - 8), marginTop: 84, fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 28, letterSpacing: 8, color: DL.dim }}>DID YOU KNOW THAT? · NO. 06</div>
        <div style={{ ...rise(f, TURN - 8), fontFamily: DL_SERIF, fontSize: 70, color: DL.text, marginTop: 16 }}><span style={{ fontStyle: 'italic', color: DL.gold }}>Medicine</span></div>

        <div style={{ ...rise(f, TURN - 2), marginTop: 34, width: 1400, padding: '30px 44px', background: DL.panel, border: `1px solid ${hereFlash > 0.01 ? DYT.magenta : DL.border}`, boxShadow: `0 0 ${50 * hereFlash}px ${DYT.magenta}`, borderRadius: 18, boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 40, color: DL.text, whiteSpace: 'nowrap', opacity: ease(f, CENTURY - 2, CENTURY + 8) }}>Which century’s <span style={{ color: DL.gold, fontStyle: 'italic', opacity: ease(f, DOCTOR - 2, DOCTOR + 6) }}>doctor</span><span style={{ opacity: ease(f, TRUST - 6, TRUST + 4) }}> would you trust,</span><span style={{ opacity: ease(f, WHY - 2, WHY + 4) }}> and why?</span></span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: ease(f, COMMENTS - 4, COMMENTS + 6), transform: `scale(${1 + commentPulse * 0.05})` }}>
              <svg width={44} height={44} viewBox="0 0 44 44"><path d="M6 8 H38 V30 H18 L10 38 V30 H6 Z" fill="none" stroke={DL.red} strokeWidth={4} strokeLinejoin="round" /></svg>
              <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 4, color: DL.red }}>COMMENTS ↓</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
            {['1537', '1799', '1847', '1941', '1948', 'TODAY', '2100'].map((y, i) => {
              const at = CENTURY + 6 + i * 12;
              const s = interpolate(f, [at, at + 8], [0.7, 1], { ...DCLAMP, easing: DL_EASE.out });
              return <div key={y} style={{ opacity: ease(f, at, at + 6), transform: `scale(${s})`, padding: '14px 24px', borderRadius: 12, border: `2px ${i === 6 ? 'dashed' : 'solid'} ${i === 6 ? DL.red : DL.gold}`, fontFamily: DL_SERIF, fontSize: 44, color: i === 6 ? DL.red : DL.gold }}>{y}</div>;
            })}
          </div>
          <div style={{ marginTop: 22, display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ ...rise(f, AT_END - 1), fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DL.dim }}>end of every episode:</span>
            <span style={{ ...rise(f, BEST - 1), padding: '10px 20px', borderRadius: 999, background: DYT.magenta, fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 28, letterSpacing: 2, color: DYT.white }}>COMMENT OF THE WEEK</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DL.dim }}><span style={{ opacity: ease(f, COMMENT1 - 2, COMMENT1 + 6) }}>best comment</span><span style={{ opacity: ease(f, SCREEN - 2, SCREEN + 6) }}> read on screen</span></span>
            <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DL.dim }}><span style={{ opacity: ease(f, SUBJECT - 2, SUBJECT + 6) }}>· the subject</span><span style={{ opacity: ease(f, MOST2 - 2, MOST2 + 6) }}> you ask for most</span></span>
            <span style={{ opacity: ease(f, FUTURE - 1, FUTURE + 6), fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DYT.green }}>→ a future episode</span>
          </div>
        </div>

        <div style={{ ...rise(f, WEBSITE - 1), marginTop: 28, display: 'flex', alignItems: 'center', gap: 22, padding: '16px 34px', borderRadius: 999, border: '3px solid transparent', backgroundImage: `linear-gradient(#0b1030, #0b1030), ${DYT_GRADIENT}`, backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box', boxShadow: `0 0 40px ${DYT.magenta}55` }}>
          <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 28, letterSpacing: 3, color: DYT.dim, display: 'flex', gap: 14 }}>
            {([['WATCH', WATCH], ['· COLLECT', COLLECT], ['· PLAY', PLAY]] as const).map(([w, at]) => (
              <span key={w} style={{ opacity: ease(f, at - 2, at + 6), color: f >= at && f < at + 20 ? DYT.white : DYT.dim }}>{w}</span>
            ))}
          </span>
          <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 46, color: DYT.white, display: 'inline-block', opacity: ease(f, DEXTY - 4, DEXTY + 4), transform: `scale(${1 + 0.12 * gamePulse})`, textShadow: `0 0 ${20 + 30 * gamePulse}px ${DYT.magenta}aa` }}>Dexty.live</span>
        </div>
        <div style={{ display: 'flex', gap: 34, marginTop: 28 }}>
          <Action label="Like" at={LIKE} icon={<svg width={34} height={34} viewBox="0 0 34 34"><path d="M4 15 H10 V30 H4 Z M12 30 V15 L18 4 C21 4 22 6 21 10 L20 13 H29 C31 13 32 15 31 17 L28 28 C27.5 29.5 26.5 30 25 30 Z" fill={DL.text} /></svg>} />
          <Action label="Share" at={SHARE} icon={<svg width={34} height={34} viewBox="0 0 34 34"><path d="M20 6 L31 16 L20 26 V20 C12 20 7 23 3 29 C4 20 9 13 20 12 Z" fill={DL.text} /></svg>} />
          <Action label="Subscribe" at={SUB} primary icon={<svg width={34} height={34} viewBox="0 0 34 34"><rect x={2} y={7} width={30} height={20} rx={6} fill={DL.bg} /><path d="M14 12 L22 17 L14 22 Z" fill={DL.gold} /></svg>} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px 36px', width: 1600, marginTop: 22, fontFamily: DL_MONO, fontSize: 28, letterSpacing: 3, color: DL.dim }}>
          <span style={{ opacity: ease(f, CHANGED - 2, CHANGED + 8) }}>IF THIS CHANGED HOW YOU SEE<span style={{ opacity: ease(f, CABINET - 2, CABINET + 6), color: DL.gold }}> YOUR MEDICINE CABINET</span></span>
          <span style={{ opacity: ease(f, FRIEND - 2, FRIEND + 8), display: 'flex', alignItems: 'center', gap: 12, transform: `scale(${1 + 0.12 * friendPulse})`, color: friendPulse > 0.3 ? DYT.cyan : undefined }}><svg width={30} height={30} viewBox="0 0 30 30"><circle cx={15} cy={9} r={7} fill={DYT.cyan} /><path d="M2 30 C2 19 8 16 15 16 C22 16 28 19 28 30 Z" fill={DYT.cyan} /></svg>THE FRIEND WHO ALWAYS SAYS<span style={{ opacity: ease(f, JUST - 2, JUST + 6) }}>&nbsp;“IT'S JUST A COLD”</span></span>
          <span style={{ opacity: ease(f, NEXT_M - 2, NEXT_M + 4), display: 'flex', alignItems: 'center', gap: 12, color: DYT.magenta }}>? THE NEXT MYSTERY</span>
        </div>
      </AbsoluteFill>

      {/* ── part 2: the forward hook + motto */}
      <AbsoluteFill style={{ opacity: p2, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...rise(f, NEXT), fontFamily: DL_MONO, fontSize: 28, letterSpacing: 8, color: DL.red }}>NEXT · NO. {NEXT_EP.no}</div>
        <div style={{ ...rise(f, SUBJECT_N - 2), marginTop: 24, fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 120, color: DYT.white, textShadow: `0 0 30px ${DYT.orange}aa` }}>{NEXT_EP.subject}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 30 }}>
          <div style={rise(f, SUBJECT_N - 2)}><Bulb size={240} on={1 - ease(f, OFF - 2, OFF + 10)} /></div>
          <div style={{ width: 1000, fontFamily: DL_SERIF, fontSize: 52, lineHeight: 1.2, color: DL.text }}>
            <span style={{ opacity: ease(f, BRITAIN - 2, BRITAIN + 8), color: DL.dim }}>In Britain,</span>
            <span style={{ opacity: ease(f, COSTS - 2, COSTS + 8) }}> light now costs less than</span>
            <span style={{ opacity: ease(f, THOUSANDTH - 2, THOUSANDTH + 8), color: DL.gold }}> one three-thousandth</span>
            <span style={{ opacity: ease(f, EIGHTEEN - 2, EIGHTEEN + 8) }}> of what it did in 1800.</span>
            <div style={{ marginTop: 14, fontFamily: DL_MONO, fontSize: 24, color: DL.muted, opacity: ease(f, EIGHTEEN, EIGHTEEN + 10) }}>UK cost of lighting, 2000 vs 1800: under 1/3,000 (Fouquet &amp; Pearson 2006)</div>
            <div style={{ marginTop: 16, color: DL.gold, fontStyle: 'italic' }}><span style={{ opacity: ease(f, SO_N - 2, SO_N + 8) }}>So what happened</span><span style={{ opacity: ease(f, SWITCHED - 2, SWITCHED + 8) }}> when we switched the night</span><span style={{ opacity: ease(f, OFF - 2, OFF + 8), color: DL.red }}> off?</span></div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 46, marginTop: 60, fontFamily: DL_MONO, fontSize: 46, letterSpacing: 4 }}>
          <span style={{ opacity: ease(f, ASK, ASK + 10), color: DL.text }}>ASK.</span>
          <span style={{ opacity: ease(f, WONDER, WONDER + 10), color: DL.gold }}>WONDER.</span>
          <span style={{ opacity: ease(f, REPEAT, REPEAT + 10), color: DL.red }}>REPEAT.</span>
        </div>
      </AbsoluteFill>

      {/* ── part 3: END SCREEN (15 s). Two 16:9 video slots + a subscribe ring sized for YouTube's end-screen elements.
           Ring centre (960, 767): YouTube clamps its 296 px Subscribe circle to box top 619, so this is the only place it can
           cover the ring completely (No. 01–04 drew it at 850 and a crescent stayed visible). SUBSCRIBE / Comment-below text
           sit level with the ring. See dyk-episode/references/upload-playbook.md §2.4. */}
      <AbsoluteFill style={{ opacity: p3 }}>
        <DytBg />
        <div style={{ position: 'absolute', top: 70, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <div style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 64, letterSpacing: 2, color: DYT.white, textShadow: `0 0 26px ${DYT.magenta}aa` }}>YOUR NEXT MYSTERY</div>
        </div>
        {/* COMMENT OF THE WEEK slot — no real No. 05 comment chosen yet: the slot shows THIS WEEK'S QUESTION, No. 06's pinned
            question (STORY §4 item 5 fallback), never a quoted comment. */}
        <div style={{ position: 'absolute', left: 160, top: 230, width: 720, height: 405, opacity: ease(f, ES + 2, ES + 12), transform: `translateY(${ease(f, ES + 2, ES + 14, 30, 0)}px)` }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 22, border: `4px solid ${DYT.magenta}`, boxShadow: `0 0 ${40 + 60 * cardFlare}px ${DYT.magenta}${cardFlare > 0.3 ? 'aa' : '55'}, inset 0 0 50px ${DYT.magenta}1f`, background: '#0b1030d9', padding: '34px 40px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <svg width={40} height={40} viewBox="0 0 44 44"><path d="M6 8 H38 V30 H18 L10 38 V30 H6 Z" fill="none" stroke={DYT.magenta} strokeWidth={4} strokeLinejoin="round" /></svg>
              <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 32, letterSpacing: 2, color: DYT.white }}>THIS WEEK'S QUESTION</span>
            </div>
            <div style={{ marginTop: 22, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, lineHeight: 1.2, color: DYT.white, opacity: ease(f, ES + 12, ES + 24) }}>{PINNED_Q}</div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, opacity: ease(f, ES + 18, ES + 30) }}>
              <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 28, letterSpacing: 1, color: DYT.orange, whiteSpace: 'nowrap' }}>PINNED IN THE COMMENTS</span>
              <span style={{ padding: '8px 16px', borderRadius: 999, border: `2px solid ${DYT.green}`, fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 28, letterSpacing: 1, color: DYT.green, whiteSpace: 'nowrap' }}>BEST ANSWER · READ NEXT EPISODE</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: -60, textAlign: 'center', fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: DYT.magenta }}>
            <span style={{ display: 'inline-block', clipPath: `inset(0 ${100 - 100 * scribble}% 0 0)` }}>
              <span style={{ display: 'inline-block', transform: `rotate(${scribble > 0 && scribble < 1 ? Math.sin(f * 1.3) * 18 : 0}deg)` }}>✎</span>  READ ON THIS SCREEN
            </span>
          </div>
        </div>
        {/* WATCH NEXT — YouTube's video element sits on this slot; the art underneath carries the No. 07 teaser */}
        {(() => {
          const at = ES + 8;
          const shimmer = ((f - at) % 90) / 90;
          return (
            <div style={{ position: 'absolute', left: 1040, top: 230, width: 720, height: 405, opacity: ease(f, at, at + 12), transform: `translateY(${ease(f, at, at + 14, 30, 0)}px)` }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 22, border: `4px solid ${DYT.cyan}`, boxShadow: `0 0 40px ${DYT.cyan}55, inset 0 0 50px ${DYT.cyan}1f`, background: '#0b103080', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${shimmer * 140 - 30}%`, width: '22%', background: 'linear-gradient(100deg, transparent, #ffffff14, transparent)' }} />
                <div style={{ filter: `drop-shadow(0 0 20px ${DYT.orange})` }}><Bulb size={200} /></div>
                <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 28, letterSpacing: 4, color: DYT.dim }}>NO. {NEXT_EP.no}</span>
                <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 52, color: DYT.white }}>{NEXT_EP.subject}</span>
              </div>
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: -60, textAlign: 'center', fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: DYT.cyan }}>▶  WATCH NEXT</div>
            </div>
          );
        })()}
        <div style={{ position: 'absolute', left: 960 - 130, top: 637, width: 260, height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.14 * ringPulse})`, borderRadius: '50%', boxShadow: `0 0 ${50 * ringPulse}px ${DYT.magenta}aa` }}>
          <DytLogoAnimated size={190} start={ES + 6} />
        </div>
        <div style={{ position: 'absolute', left: 1130, top: 727, opacity: ease(f, ES + 18, ES + 30) }}>
          <div style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 40, color: DYT.white }}>SUBSCRIBE</div>
          <div style={{ fontFamily: DYT_DISPLAY, fontWeight: 700, fontSize: 28, letterSpacing: 2, color: DYT.dim, marginTop: 6 }}>{DYT_HANDLE}</div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 727, width: 620, opacity: ease(f, YOUR_COMMENT - 2, YOUR_COMMENT + 8) }}>
          <div style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 40, color: DYT.white }}>Comment below ↓</div>
          <div style={{ fontFamily: DYT_DISPLAY, fontWeight: 700, fontSize: 28, letterSpacing: 2, color: DYT.dim, marginTop: 6 }}>Best one is read next episode.</div>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 60, display: 'flex', justifyContent: 'center', opacity: ease(f, ES + 12, ES + 26) }}>
          <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: DYT.dim }}>Dexty.live  ·  every episode · the fact cards · the guessing game</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default MeOutro;
