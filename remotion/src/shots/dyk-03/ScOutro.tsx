import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { DYT, DYT_DISPLAY, DYT_GRADIENT, DYT_HANDLE, DytBg, DytLogoAnimated, DytWordmark } from '../../lib/dytbrand';
import { makeCue, ease, rise, Vignette } from '../../lib/dykkit';
import vo from './vo.json';

// =============================================================================
// DYK 03 · 14/14 — narrated outro: reveals land on his words. Comment prompt (the seven classrooms as chips),
// Comment of the Week, Dexty.live, LIKE / SHARE / SUBSCRIBE, ONE teaser for No. 04 · Money (F20: ~9 % per extra
// year of school, on average — Psacharopoulos & Patrinos 2018) + an open question, ASK. WONDER. REPEAT., then the
// 15 s end screen: LEFT = this week's pinned question (no real comment exists yet — never a fabricated one), RIGHT =
// WATCH NEXT · No. 04 · MONEY (no date), subscribe ring. VO sc13 @0.6 s, sc14 on the end screen.
// =============================================================================
export const compositionConfig = { id: 'ScOutro', durationInSeconds: 67.4, fps: 30, width: 1920, height: 1080 };
const DUR = 2022;

const C = makeCue(vo, 'sc13-outro', 0.6);
const THIS = C.at('This', 1);
const DID = C.at('Did', 1);
const THREE = C.at('three');
const TITLE = C.at('School', 1); // 'School.'
const TURN = C.at('turn');
const CENTURY = C.at("century's");
const SURVIVE = C.at('survive');
const COMMENTS = C.at('comments');
const AT_END = C.at('end');
const BEST = C.at('best');
const COMMENT1 = C.at('comment', 1);
const RIGHT = C.at('right');
const SCREEN = C.at('screen');
const SUBJECT = C.at('subject');
const MOST = C.at('most');
const FUTURE = C.at('future');
const WEBSITE = C.at('website');
const DEXTY = C.at('Dex-tee');
const WATCH = C.at('watch', 1);
const COLLECT = C.at('collect');
const PLAY = C.at('play');
const GAME = C.at('game');
const CHANGED = C.at('changed');
const SCHOOL_DAY = C.at('day');
const LIKE = C.at('like');
const SHARE = C.at('Share');
const FRIEND = C.at('friend');
const HOMEWORK = C.at('homework');
const SUB = C.at('subscribe');
const MYSTERY = C.at('mystery');
const NEXT = C.at('Next', 2); // 'Next time: money.' (1 = 'the next mystery')
const MONEY1 = C.at('money', 1);
const EXTRA = C.at('extra');
const YEAR = C.at('year');
const AVERAGE = C.at('average');
const NINE = C.at('nine');
const EARN = C.at('earn');
const BUT = C.at('But');
const TEACH = C.at('teach');
const MONEY2 = C.at('money', 2);
const IS_Q = C.at('is');
const ASK = C.at('Ask', 2); // 'Ask...' (1 = 'you ask for most')
const WONDER = C.at('Wonder');
const REPEAT = C.at('Repeat');
const END = C.end;
// End screen: 15 s from ES (YouTube end-screen elements are placed over these slots in Studio).
const ES = END + 24;
const E = makeCue(vo, 'sc14-endscreen', (ES + 14) / 30);
const PICK = E.at('Pick');
const SEE = E.at('see');
const YOUR_COMMENT = E.at('comment');

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

const ScOutro: React.FC = () => {
  const f = useCurrentFrame();
  const fadeIn = ease(f, -1, 2);
  const fadeOut = ease(f, DUR - 18, DUR - 1, 1, 0, DL_EASE.in);
  const p1 = 1 - ease(f, NEXT - 14, NEXT, 0, 1, DL_EASE.in);
  const p2 = ease(f, NEXT - 2, NEXT + 12) * (1 - ease(f, END + 10, END + 26, 0, 1, DL_EASE.in));
  const p3 = ease(f, ES - 4, ES + 14);
  const commentPulse = f > COMMENTS ? 0.5 + 0.5 * Math.sin((f - COMMENTS) / 5) : 0;
  // opening lockup: EPISODE 03 on "This was episode three", logo + wordmark on "Did You Know That",
  // the title on "Time, Compressed" — then it shrinks away as the small header takes over on "turn"
  const lockOut = ease(f, TURN - 16, TURN - 2, 0, 1, DL_EASE.inOut);
  const hereFlash = ease(f, RIGHT, RIGHT + 4) * (1 - ease(f, RIGHT + 8, RIGHT + 28));
  const scribble = ease(f, ES + 12, ES + 30);
  // "see you there": the subscribe ring pulses once
  const pulse = (at: number) => ease(f, at - 1, at + 5) * (1 - ease(f, at + 10, at + 28));
  const twoPulse = pulse(THREE);
  const gamePulse = pulse(GAME);
  const friendPulse = pulse(HOMEWORK);
  const cardFlare = pulse(YOUR_COMMENT);
  const ringPulse = ease(f, SEE - 2, SEE + 6) * (1 - ease(f, SEE + 12, SEE + 30));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: Math.min(fadeIn, fadeOut) }}>
      <SiteBg glow="#120d07" />
      <Vignette />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - lockOut, transform: `translateY(${-lockOut * 220}px) scale(${1 - lockOut * 0.5})` }}>
        <div style={{ ...rise(f, THIS - 2), fontFamily: DL_MONO, fontSize: 34, letterSpacing: 12, color: DL.red }}>EPISODE <span style={{ display: 'inline-block', transform: `scale(${1 + 0.35 * twoPulse})`, textShadow: `0 0 ${20 * twoPulse}px ${DL.red}` }}>03</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 30, height: 260 }}>
          <div style={{ opacity: ease(f, DID - 6, DID) }}><DytLogoAnimated size={220} start={DID - 6} /></div>
          <DytWordmark at={DID} size={96} />
        </div>
        <div style={{ ...rise(f, TITLE - 2), marginTop: 40, fontFamily: DL_SERIF, fontSize: 110, color: DL.text }}>
          <span style={{ fontStyle: 'italic', color: DL.gold }}>School</span>
        </div>
      </AbsoluteFill>

      {/* ── part 1: title, comment prompt, the ritual */}
      <AbsoluteFill style={{ opacity: p1, alignItems: 'center' }}>
        <div style={{ ...rise(f, TURN - 8), marginTop: 84, fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 28, letterSpacing: 8, color: DL.dim }}>DID YOU KNOW THAT? · NO. 03</div>
        <div style={{ ...rise(f, TURN - 8), fontFamily: DL_SERIF, fontSize: 70, color: DL.text, marginTop: 16 }}>
          <span style={{ fontStyle: 'italic', color: DL.gold }}>School</span>
        </div>

        <div style={{ ...rise(f, TURN - 2), marginTop: 50, width: 1400, padding: '34px 44px', background: DL.panel, border: `1px solid ${hereFlash > 0.01 ? DYT.magenta : DL.border}`, boxShadow: `0 0 ${50 * hereFlash}px ${DYT.magenta}`, borderRadius: 18, boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 40, color: DL.text, whiteSpace: 'nowrap', opacity: ease(f, CENTURY - 2, CENTURY + 8) }}>Which century’s classroom would you <span style={{ color: DL.gold, fontStyle: 'italic', opacity: ease(f, SURVIVE - 2, SURVIVE + 6) }}>survive</span>?</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: ease(f, COMMENTS - 4, COMMENTS + 6), transform: `scale(${1 + commentPulse * 0.05})` }}>
              <svg width={44} height={44} viewBox="0 0 44 44"><path d="M6 8 H38 V30 H18 L10 38 V30 H6 Z" fill="none" stroke={DL.red} strokeWidth={4} strokeLinejoin="round" /></svg>
              <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 4, color: DL.red }}>COMMENTS ↓</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
            {['1500', '1647', '1763', '1810', '1948', 'TODAY', '2100'].map((y, i) => {
              const at = CENTURY + 6 + i * 12; // one chip (and one click) per 12 frames
              const s = interpolate(f, [at, at + 8], [0.7, 1], { ...DCLAMP, easing: DL_EASE.out });
              return (
                <div key={y} style={{ opacity: ease(f, at, at + 6), transform: `scale(${s})`, padding: '14px 24px', borderRadius: 12, border: `2px ${i === 6 ? 'dashed' : 'solid'} ${i === 6 ? DL.red : DL.gold}`, fontFamily: DL_SERIF, fontSize: 44, color: i === 6 ? DL.red : DL.gold }}>{y}</div>
              );
            })}
          </div>
          {/* the deal, piece by piece on his words: the chip on "deal", the promise on "comment",
              the subject → a future episode on "subject" / "episode" */}
          <div style={{ marginTop: 22, display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ ...rise(f, AT_END - 1), fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DL.dim }}>end of every episode:</span>
            <span style={{ ...rise(f, BEST - 1), padding: '10px 20px', borderRadius: 999, background: DYT.magenta, fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 28, letterSpacing: 2, color: DYT.white }}>COMMENT OF THE WEEK</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DL.dim }}><span style={{ opacity: ease(f, COMMENT1 - 2, COMMENT1 + 6) }}>best comment</span><span style={{ opacity: ease(f, SCREEN - 2, SCREEN + 6) }}> read on screen</span></span>
            <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DL.dim }}><span style={{ opacity: ease(f, SUBJECT - 2, SUBJECT + 6) }}>· the subject</span><span style={{ opacity: ease(f, MOST - 2, MOST + 6) }}> you ask for most</span></span>
            <span style={{ opacity: ease(f, FUTURE - 1, FUTURE + 6), fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DYT.green }}>→ a future episode</span>
          </div>
        </div>

        {/* the website: every episode, the fact cards, the guessing game */}
        <div style={{ ...rise(f, WEBSITE - 1), marginTop: 40, display: 'flex', alignItems: 'center', gap: 22, padding: '16px 34px', borderRadius: 999, border: '3px solid transparent', backgroundImage: `linear-gradient(#0b1030, #0b1030), ${DYT_GRADIENT}`, backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box', boxShadow: `0 0 40px ${DYT.magenta}55` }}>
          <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 28, letterSpacing: 3, color: DYT.dim, display: 'flex', gap: 14 }}>
            {[['WATCH', WATCH], ['· COLLECT', COLLECT], ['· PLAY', PLAY]].map(([w, at]) => (
              <span key={String(w)} style={{ opacity: ease(f, Number(at) - 2, Number(at) + 6), color: f >= Number(at) && f < Number(at) + 20 ? DYT.white : DYT.dim }}>{w}</span>
            ))}
          </span>
          <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 46, color: DYT.white, display: 'inline-block', opacity: ease(f, DEXTY - 4, DEXTY + 4), transform: `scale(${1 + 0.12 * gamePulse})`, textShadow: `0 0 ${20 + 30 * gamePulse}px ${DYT.magenta}aa` }}>Dexty.live</span>
        </div>
        <div style={{ display: 'flex', gap: 34, marginTop: 40 }}>
          <Action label="Like" at={LIKE} icon={<svg width={34} height={34} viewBox="0 0 34 34"><path d="M4 15 H10 V30 H4 Z M12 30 V15 L18 4 C21 4 22 6 21 10 L20 13 H29 C31 13 32 15 31 17 L28 28 C27.5 29.5 26.5 30 25 30 Z" fill={DL.text} /></svg>} />
          <Action label="Share" at={SHARE} icon={<svg width={34} height={34} viewBox="0 0 34 34"><path d="M20 6 L31 16 L20 26 V20 C12 20 7 23 3 29 C4 20 9 13 20 12 Z" fill={DL.text} /></svg>} />
          <Action label="Subscribe" at={SUB} primary icon={<svg width={34} height={34} viewBox="0 0 34 34"><rect x={2} y={7} width={30} height={20} rx={6} fill={DL.bg} /><path d="M14 12 L22 17 L14 22 Z" fill={DL.gold} /></svg>} />
        </div>
        {/* his words, one beat each: a sunrise · the friend · the next mystery */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px 36px', width: 1600, marginTop: 22, fontFamily: DL_MONO, fontSize: 28, letterSpacing: 3, color: DL.dim }}>
          <span style={{ opacity: ease(f, CHANGED - 2, CHANGED + 8) }}>IF THIS CHANGED HOW YOU SEE</span>
          <span style={{ opacity: ease(f, SCHOOL_DAY - 2, SCHOOL_DAY + 8), display: 'flex', alignItems: 'center', gap: 12 }}><svg width={40} height={30} viewBox="0 0 120 96"><path d="M10 30 L110 30 L104 40 L16 40 Z" fill={DL.gold} /><rect x={20} y={40} width={10} height={52} fill={DL.gold} /><rect x={90} y={40} width={10} height={52} fill={DL.gold} /></svg>A SCHOOL DAY</span>
          <span style={{ opacity: ease(f, FRIEND - 2, FRIEND + 8), display: 'flex', alignItems: 'center', gap: 12, transform: `scale(${1 + 0.12 * friendPulse})`, color: friendPulse > 0.3 ? DYT.cyan : undefined }}><svg width={30} height={30} viewBox="0 0 30 30"><circle cx={15} cy={9} r={7} fill={DYT.cyan} /><path d="M2 30 C2 19 8 16 15 16 C22 16 28 19 28 30 Z" fill={DYT.cyan} /></svg>THE FRIEND WHO ALWAYS DID THE HOMEWORK</span>
          <span style={{ opacity: ease(f, MYSTERY - 2, MYSTERY + 8), display: 'flex', alignItems: 'center', gap: 12, color: DYT.magenta }}>? THE NEXT MYSTERY</span>
        </div>
      </AbsoluteFill>

      {/* ── part 2: the forward hook + motto */}
      <AbsoluteFill style={{ opacity: p2, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...rise(f, NEXT), fontFamily: DL_MONO, fontSize: 28, letterSpacing: 8, color: DL.red }}>NEXT · NO. 04</div>
        <div style={{ ...rise(f, MONEY1 - 2), marginTop: 24, fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 120, color: DYT.white, textShadow: `0 0 30px ${DYT.green}aa` }}>MONEY</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 30 }}>
          {/* a coin → a banknote → a phone payment */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, ...rise(f, MONEY1 - 2) }}>
            <svg width={90} height={90} viewBox="0 0 70 70"><circle cx={35} cy={35} r={30} fill={DL.gold} stroke="#8a6a10" strokeWidth={4} /></svg>
            <svg width={140} height={80} viewBox="0 0 140 80"><rect x={4} y={4} width={132} height={72} rx={8} fill="#3a7a4a" stroke="#9bd06a" strokeWidth={4} /><circle cx={70} cy={40} r={18} fill="none" stroke="#9bd06a" strokeWidth={4} /></svg>
            <svg width={60} height={100} viewBox="0 0 60 100"><rect x={4} y={4} width={52} height={92} rx={10} fill="#111" stroke="#888" strokeWidth={4} /><circle cx={30} cy={50} r={12} fill={DYT.cyan} /></svg>
          </div>
          <div style={{ width: 1000, fontFamily: DL_SERIF, fontSize: 52, lineHeight: 1.2, color: DL.text }}>
            <span style={{ opacity: ease(f, EXTRA - 2, EXTRA + 8) }}>Each extra year of school adds,</span>
            <span style={{ opacity: ease(f, AVERAGE - 2, AVERAGE + 8), color: DL.dim }}> on average,</span>
            <span style={{ opacity: ease(f, NINE - 2, NINE + 8), color: DL.gold }}> about 9 %</span>
            <span style={{ opacity: ease(f, EARN - 2, EARN + 8) }}> to what people earn.</span>
            <div style={{ marginTop: 14, fontFamily: DL_MONO, fontSize: 24, color: DL.muted, opacity: ease(f, NINE, NINE + 10) }}>Psacharopoulos & Patrinos, World Bank WP 8402 (2018) · 139 countries</div>
            <div style={{ marginTop: 16, color: DL.gold, fontStyle: 'italic' }}><span style={{ opacity: ease(f, BUT - 2, BUT + 8) }}>But did school ever teach you</span><span style={{ opacity: ease(f, MONEY2 - 2, MONEY2 + 8), color: DL.red }}> what money actually is?</span></div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 46, marginTop: 60, fontFamily: DL_MONO, fontSize: 46, letterSpacing: 4 }}>
          <span style={{ opacity: ease(f, ASK, ASK + 10), color: DL.text }}>ASK.</span>
          <span style={{ opacity: ease(f, WONDER, WONDER + 10), color: DL.gold }}>WONDER.</span>
          <span style={{ opacity: ease(f, REPEAT, REPEAT + 10), color: DL.red }}>REPEAT.</span>
        </div>
      </AbsoluteFill>

      {/* ── part 3: END SCREEN (15 s). Two 16:9 video slots + a subscribe ring sized for YouTube's
           end-screen elements; the art underneath stays good-looking even before they are placed. */}
      <AbsoluteFill style={{ opacity: p3 }}>
        <DytBg />
        <div style={{ position: 'absolute', top: 70, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <div style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 64, letterSpacing: 2, color: DYT.white, textShadow: `0 0 26px ${DYT.magenta}aa` }}>YOUR NEXT MYSTERY</div>
        </div>
        {/* COMMENT OF THE WEEK slot — No real No. 02 comment existed at build time (David's decision 2026-10-13,
            STORY §13.5): the slot shows THIS WEEK'S QUESTION, the pinned question A, never a quoted comment. */}
        <div style={{ position: 'absolute', left: 160, top: 230, width: 720, height: 405, opacity: ease(f, ES + 2, ES + 12), transform: `translateY(${ease(f, ES + 2, ES + 14, 30, 0)}px)` }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 22, border: `4px solid ${DYT.magenta}`, boxShadow: `0 0 ${40 + 60 * cardFlare}px ${DYT.magenta}${cardFlare > 0.3 ? 'aa' : '55'}, inset 0 0 50px ${DYT.magenta}1f`, background: '#0b1030d9', padding: '34px 40px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <svg width={40} height={40} viewBox="0 0 44 44"><path d="M6 8 H38 V30 H18 L10 38 V30 H6 Z" fill="none" stroke={DYT.magenta} strokeWidth={4} strokeLinejoin="round" /></svg>
              <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 32, letterSpacing: 2, color: DYT.white }}>THIS WEEK'S QUESTION</span>
            </div>
            <div style={{ marginTop: 22, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, lineHeight: 1.2, color: DYT.white, opacity: ease(f, ES + 12, ES + 24) }}>
              Which century’s classroom would you survive — and why?
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, opacity: ease(f, ES + 18, ES + 30) }}>
              <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 28, letterSpacing: 1, color: DYT.orange, whiteSpace: 'nowrap' }}>PINNED IN THE COMMENTS</span>
              <span style={{ padding: '8px 16px', borderRadius: 999, border: `2px solid ${DYT.green}`, fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 28, letterSpacing: 1, color: DYT.green, whiteSpace: 'nowrap' }}>BEST ANSWER · READ NEXT EPISODE</span>
            </div>
          </div>
          {/* the line writes itself on, the pencil wiggling (pencil-scribble cue) */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: -60, textAlign: 'center', fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: DYT.magenta }}>
            <span style={{ display: 'inline-block', clipPath: `inset(0 ${100 - 100 * scribble}% 0 0)` }}>
              <span style={{ display: 'inline-block', transform: `rotate(${scribble > 0 && scribble < 1 ? Math.sin(f * 1.3) * 18 : 0}deg)` }}>✎</span>  READ ON THIS SCREEN
            </span>
          </div>
        </div>
        {/* WATCH NEXT — YouTube's video element sits on this slot; the art underneath carries the No. 04 teaser */}
        {(() => {
          const at = ES + 8;
          const shimmer = ((f - at) % 90) / 90;
          return (
            <div style={{ position: 'absolute', left: 1040, top: 230, width: 720, height: 405, opacity: ease(f, at, at + 12), transform: `translateY(${ease(f, at, at + 14, 30, 0)}px)` }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 22, border: `4px solid ${DYT.cyan}`, boxShadow: `0 0 40px ${DYT.cyan}55, inset 0 0 50px ${DYT.cyan}1f`, background: '#0b103080', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${shimmer * 140 - 30}%`, width: '22%', background: 'linear-gradient(100deg, transparent, #ffffff14, transparent)' }} />
                <svg width={240} height={110} viewBox="0 0 240 110" style={{ filter: `drop-shadow(0 0 20px ${DYT.cyan})` }}><circle cx={45} cy={55} r={36} fill={DYT.orange} /><rect x={96} y={24} width={90} height={62} rx={8} fill={DYT.green} /><rect x={198} y={14} width={36} height={82} rx={8} fill={DYT.cyan} /></svg>
                <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 28, letterSpacing: 4, color: DYT.dim }}>NO. 04</span>
                <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 52, color: DYT.white }}>MONEY</span>
              </div>
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: -60, textAlign: 'center', fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: DYT.cyan }}>▶  WATCH NEXT</div>
            </div>
          );
        })()}
        {/* subscribe ring (YouTube's subscribe element = the channel avatar) */}
        <div style={{ position: 'absolute', left: 960 - 130, top: 720, width: 260, height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.14 * ringPulse})`, borderRadius: '50%', boxShadow: `0 0 ${50 * ringPulse}px ${DYT.magenta}aa` }}>
          <DytLogoAnimated size={190} start={ES + 6} />
        </div>
        <div style={{ position: 'absolute', left: 1130, top: 790, opacity: ease(f, ES + 18, ES + 30) }}>
          <div style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 40, color: DYT.white }}>SUBSCRIBE</div>
          <div style={{ fontFamily: DYT_DISPLAY, fontWeight: 700, fontSize: 28, letterSpacing: 2, color: DYT.dim, marginTop: 6 }}>{DYT_HANDLE}</div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 800, width: 620, opacity: ease(f, PICK - 6, PICK + 8) }}>
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
export default ScOutro;
