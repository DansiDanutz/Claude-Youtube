import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { DYT, DYT_DISPLAY, DYT_GRADIENT, DYT_HANDLE, DytBg, DytLogoAnimated, DytWordmark } from '../../lib/dytbrand';
import { makeCue, ease, rise, Vignette } from '../../lib/dykkit';
import { LightProp, NightSky, FLAME } from '../../lib/dykkit-light';
import vo from './vo.json';

// =============================================================================
// DYK 07 · 14/14 — narrated outro (adapted from MeOutro): reveals land on his words. Comment prompt "Streetlights or
// stars: if you had to give one up, which would it be, and why?" (two option tiles), Comment of the Week, Dexty.live,
// LIKE / SHARE / SUBSCRIBE on their words, ONE teaser for No. 08 (swappable: NEXT_EP + the lt13b-next line; Bruegel's
// Fat Kitchen 1563, L18; WHO "1 in 7" lives with obesity, L17) + ASK. WONDER. REPEAT., then the 15 s end screen:
// LEFT = COMMENT OF THE WEEK card labelled EXAMPLE (no real No. 06 comment chosen yet — never a fabricated handle),
// RIGHT = WATCH NEXT · No. 08 (no date), subscribe ring at (960 - 130, 637), 260 × 260.
// VO lt13 @0.6 s, lt13b @37.967 s, lt13c @50.0 s, lt14 on the end screen (ES + 14 f = 55.733 s, timeline.json).
// =============================================================================
export const compositionConfig = { id: 'LtOutro', durationInSeconds: 70.8667, fps: 30, width: 1920, height: 1080 };
const DUR = 2126;

// ── swappable next-episode slot (change here + re-voice lt13b-next + the teaser lines below + the description line)
const NEXT_EP = { no: '08', subject: 'WEIGHT' } as const;
const PINNED_Q = 'Streetlights or stars: if you had to give one up, which would it be, and why?';

const C = makeCue(vo, 'lt13-outro', 0.6);
const N = makeCue(vo, 'lt13b-next', 37.967);
const S = makeCue(vo, 'lt13c-signoff', 50);
const THIS = C.at('This', 1);
const DID = C.at('Did');
const SEVEN = C.at('seven.');
const TITLE = C.at('Light.', 1); // 'episode seven. Light.' (2 = 'your light switch', 3 = 'every light on')
const TURN = C.at('turn.');
const STREETLIGHTS = C.at('Streetlights');
const OR = C.at('or');
const STARS = C.at('stars.');
const GIVE = C.at('give');
const WHICH = C.at('which');
const WHY = C.at('why?');
const COMMENTS = C.at('comments.');
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
const SWITCH = C.at('switch,'); // 'your light switch,'
const LIKE = C.at('like');
const SHARE = C.at('Share');
const FRIEND = C.at('friend');
const LEAVES = C.at('leaves');
const EVERY3 = C.at('every', 3); // 'every light on' (1, 2 = 'every episode')
const LIGHT_ON = C.at('on.', 3); // 'every light on.' (1 = 'on this screen', 2 = 'On our website')
const SUB = C.at('subscribe,');
const NEXT_M = C.at('next');
const NEXT = N.at('Next');
const SUBJECT_N = N.at('weight.');
const FIFTEEN = N.at('fifteen');
const HEAVY = N.at('heavy');
const COULD = N.at('could');
const WEALTH = N.at('wealth.');
const TODAY = N.at('Today,');
const SEVEN_N = N.at('seven');
const PEOPLE = N.at('people');
const OBESITY = N.at('obesity.');
const SO_N = N.at('So');
const PLENTY = N.at('plenty');
const PROBLEM = N.at('problem?');
const ASK = S.at('Ask...');
const WONDER = S.at('Wonder...');
const REPEAT = S.at('Repeat.');
const END = S.end;
// End screen: 15 s from ES (YouTube end-screen elements are placed over these slots in Studio).
const ES = END + 54; // REPEAT. needs 1.5 s before the end screen
const E = makeCue(vo, 'lt14-endscreen', (ES + 14) / 30); // = 55.733 s (timeline.json)
const SEE = E.at('see');
const PICK = E.at('Pick');
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

// one of the two comment options: an icon window + its word
const OptionTile: React.FC<{ at: number; label: string; color: string; children: React.ReactNode }> = ({ at, label, color, children }) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [at, at + 8], [0.7, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ opacity: ease(f, at - 2, at + 6), transform: `scale(${s})`, display: 'flex', alignItems: 'center', gap: 18, padding: '8px 26px 8px 8px', borderRadius: 14, border: `2px solid ${color}` }}>
      <div style={{ position: 'relative', width: 120, height: 76, borderRadius: 10, overflow: 'hidden', background: '#04060f' }}>{children}</div>
      <span style={{ fontFamily: DL_SERIF, fontSize: 44, color }}>{label}</span>
    </div>
  );
};

// the No. 08 teaser art: a bathroom scale whose needle sways; `angle` deg (−60 … 60), `red` 0–1 lights the red zone
const Scale: React.FC<{ size?: number; angle: number; red?: number }> = ({ size = 240, angle, red = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ overflow: 'visible' }}>
    <rect x={14} y={30} width={172} height={160} rx={30} fill="#2a2e3a" stroke="#9aa0a8" strokeWidth={4} />
    <circle cx={100} cy={92} r={52} fill="#e8e4d8" stroke="#6a7078" strokeWidth={4} />
    <path d="M136 56 A52 52 0 0 1 150 112 L100 92 Z" fill={DL.red} opacity={0.25 + 0.6 * red} />
    {[-60, -30, 0, 30, 60].map((a) => <line key={a} x1={100} y1={46} x2={100} y2={56} stroke="#4a4e58" strokeWidth={3} transform={`rotate(${a} 100 92)`} />)}
    <line x1={100} y1={92} x2={100} y2={50} stroke={DL.red} strokeWidth={5} strokeLinecap="round" transform={`rotate(${angle} 100 92)`} />
    <circle cx={100} cy={92} r={7} fill="#4a4e58" />
    <rect x={44} y={160} width={112} height={12} rx={6} fill="#4a4e58" />
  </svg>
);

// a small stack of gold coins (the "sign of wealth")
const Coins: React.FC = () => (
  <svg width={110} height={100} viewBox="0 0 110 100">
    {[0, 1, 2, 3].map((k) => <ellipse key={k} cx={55} cy={82 - k * 16} rx={44} ry={13} fill={k === 3 ? '#ffd76a' : '#d8a030'} stroke="#8a6418" strokeWidth={3} />)}
  </svg>
);

const Person: React.FC<{ lit: number }> = ({ lit }) => (
  <svg width={40} height={52} viewBox="0 0 40 52">
    <circle cx={20} cy={11} r={9} fill={lit > 0.5 ? DYT.orange : DL.muted} />
    <path d="M3 52 C3 32 10 25 20 25 C30 25 37 32 37 52 Z" fill={lit > 0.5 ? DYT.orange : DL.muted} />
  </svg>
);

// part 1 · the lockup (EPISODE 07 · logo · Light), shrinking away on "turn."
const Lockup: React.FC<{ f: number; lockOut: number; sixPulse: number }> = ({ f, lockOut, sixPulse }) => (
  <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - lockOut, transform: `translateY(${-lockOut * 220}px) scale(${1 - lockOut * 0.5})` }}>
    <div style={{ ...rise(f, THIS - 2), fontFamily: DL_MONO, fontSize: 34, letterSpacing: 12, color: DL.red }}>EPISODE <span style={{ display: 'inline-block', opacity: ease(f, SEVEN - 4, SEVEN + 2), transform: `scale(${1 + 0.35 * sixPulse})`, textShadow: `0 0 ${20 * sixPulse}px ${DL.red}` }}>07</span></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 30, height: 260 }}>
      <div style={{ opacity: ease(f, 0, 8) }}><DytLogoAnimated size={220} start={0} /></div>
      <DytWordmark at={DID} size={96} />
    </div>
    <div style={{ ...rise(f, TITLE - 2), marginTop: 40, fontFamily: DL_SERIF, fontSize: 110, color: DL.text }}><span style={{ fontStyle: 'italic', color: DL.gold, textShadow: `0 0 ${24 + 10 * Math.sin(f / 7)}px ${FLAME}88` }}>Light</span></div>
  </AbsoluteFill>
);

// part 1 · the comment prompt card (two options, the question, the Comment of the Week ritual)
const PromptCard: React.FC<{ f: number; hereFlash: number; commentPulse: number }> = ({ f, hereFlash, commentPulse }) => (
  <div style={{ ...rise(f, TURN - 2), marginTop: 34, width: 1400, padding: '26px 44px', background: DL.panel, border: `1px solid ${hereFlash > 0.01 ? DYT.magenta : DL.border}`, boxShadow: `0 0 ${50 * hereFlash}px ${DYT.magenta}`, borderRadius: 18, boxSizing: 'border-box' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
        <OptionTile at={STREETLIGHTS} label="Streetlights" color={DL.gold}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 60% 100%, #ff8a2a66, transparent 75%)' }} />
          <div style={{ position: 'absolute', left: 22, top: 2 }}><LightProp kind="streetlight" size={72} f={f} /></div>
        </OptionTile>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.dim, opacity: ease(f, OR - 2, OR + 6) }}>or</span>
        <OptionTile at={STARS} label="stars" color={DYT.cyan}>
          <NightSky stars={1} milky={1} width={120} height={76} />
        </OptionTile>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: ease(f, COMMENTS - 4, COMMENTS + 6), transform: `scale(${1 + commentPulse * 0.05})` }}>
        <svg width={44} height={44} viewBox="0 0 44 44"><path d="M6 8 H38 V30 H18 L10 38 V30 H6 Z" fill="none" stroke={DL.red} strokeWidth={4} strokeLinejoin="round" /></svg>
        <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 4, color: DL.red }}>COMMENTS ↓</span>
      </div>
    </div>
    <div style={{ marginTop: 22, fontFamily: DL_SERIF, fontSize: 40, color: DL.text, whiteSpace: 'nowrap' }}>
      <span style={{ opacity: ease(f, GIVE - 6, GIVE + 4) }}>If you had to give one up,</span>
      <span style={{ opacity: ease(f, WHICH - 2, WHICH + 6), color: DL.gold, fontStyle: 'italic' }}> which would it be,</span>
      <span style={{ opacity: ease(f, WHY - 2, WHY + 4) }}> and why?</span>
    </div>
    <div style={{ marginTop: 22, display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{ ...rise(f, AT_END - 1), fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DL.dim }}>end of every episode:</span>
      <span style={{ ...rise(f, BEST - 1), padding: '10px 20px', borderRadius: 999, background: DYT.magenta, fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 28, letterSpacing: 2, color: DYT.white }}>COMMENT OF THE WEEK</span>
      <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DL.dim }}><span style={{ opacity: ease(f, COMMENT1 - 2, COMMENT1 + 6) }}>best comment</span><span style={{ opacity: ease(f, SCREEN - 2, SCREEN + 6) }}> read on screen</span></span>
      <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DL.dim }}><span style={{ opacity: ease(f, SUBJECT - 2, SUBJECT + 6) }}>· the subject</span><span style={{ opacity: ease(f, MOST2 - 2, MOST2 + 6) }}> you ask for most</span></span>
      <span style={{ opacity: ease(f, FUTURE - 1, FUTURE + 6), fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DYT.green }}>→ a future episode</span>
    </div>
  </div>
);

// part 1 · Dexty.live pill, like / share / subscribe, the closing chips
const Ritual: React.FC<{ f: number; gamePulse: number; friendPulse: number }> = ({ f, gamePulse, friendPulse }) => (
  <>
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
      <span style={{ opacity: ease(f, CHANGED - 2, CHANGED + 8), display: 'flex', alignItems: 'center' }}>IF THIS CHANGED HOW YOU SEE<span style={{ opacity: ease(f, SWITCH - 4, SWITCH + 6), color: DL.gold, display: 'flex', alignItems: 'center', gap: 8 }}>&nbsp;YOUR LIGHT SWITCH<LightProp kind="switch" size={36} lit={1} /></span></span>
      <span style={{ opacity: ease(f, FRIEND - 2, FRIEND + 8), display: 'flex', alignItems: 'center', gap: 12, transform: `scale(${1 + 0.12 * friendPulse})`, color: friendPulse > 0.3 ? DYT.cyan : undefined }}><svg width={30} height={30} viewBox="0 0 30 30"><circle cx={15} cy={9} r={7} fill={DYT.cyan} /><path d="M2 30 C2 19 8 16 15 16 C22 16 28 19 28 30 Z" fill={DYT.cyan} /></svg>THE FRIEND<span style={{ opacity: ease(f, LEAVES - 2, LEAVES + 6) }}>&nbsp;WHO LEAVES</span><span style={{ opacity: ease(f, EVERY3 - 2, EVERY3 + 6) }}>&nbsp;EVERY LIGHT ON</span><span style={{ opacity: ease(f, LIGHT_ON - 2, LIGHT_ON + 4) }}><LightProp kind="bulb" size={36} lit={0.75 + 0.25 * Math.sin(f / 5)} /></span></span>
      <span style={{ opacity: ease(f, NEXT_M - 2, NEXT_M + 4), display: 'flex', alignItems: 'center', gap: 12, color: DYT.magenta }}>? THE NEXT MYSTERY</span>
    </div>
  </>
);

// part 2 · the forward hook (No. 08) + the motto
const Teaser: React.FC<{ f: number; opacity: number }> = ({ f, opacity }) => {
  const sway = 6 * Math.sin(f / 9);
  const needle = -40 + 60 * ease(f, HEAVY - 2, HEAVY + 14) + 14 * ease(f, PROBLEM - 2, PROBLEM + 12) + sway;
  const red = ease(f, PROBLEM - 2, PROBLEM + 10) * (0.8 + 0.2 * Math.sin(f / 4));
  const litOne = ease(f, OBESITY - 2, OBESITY + 6);
  return (
    <AbsoluteFill style={{ opacity, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ ...rise(f, NEXT), fontFamily: DL_MONO, fontSize: 28, letterSpacing: 8, color: DL.red }}>NEXT · NO. {NEXT_EP.no}</div>
      <div style={{ ...rise(f, SUBJECT_N - 2), marginTop: 20, fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 120, color: DYT.white, textShadow: `0 0 30px ${DYT.orange}aa` }}>{NEXT_EP.subject}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 24 }}>
        <div style={{ position: 'relative', ...rise(f, SUBJECT_N - 2) }}>
          <Scale size={240} angle={needle} red={red} />
          <div style={{ position: 'absolute', left: -70, bottom: -10, opacity: ease(f, WEALTH - 2, WEALTH + 8), transform: `translateY(${ease(f, WEALTH - 2, WEALTH + 10, 20, 0)}px)` }}><Coins /></div>
        </div>
        <div style={{ width: 1000, fontFamily: DL_SERIF, fontSize: 50, lineHeight: 1.2, color: DL.text }}>
          <span style={{ opacity: ease(f, FIFTEEN - 2, FIFTEEN + 8), color: DL.dim }}>In 1500,</span>
          <span style={{ opacity: ease(f, HEAVY - 2, HEAVY + 8) }}> a heavy body</span>
          <span style={{ opacity: ease(f, COULD - 2, COULD + 8) }}> could be</span>
          <span style={{ opacity: ease(f, WEALTH - 2, WEALTH + 8), color: DL.gold }}> a sign of wealth.</span>
          <div style={{ marginTop: 6, fontFamily: DL_MONO, fontSize: 24, color: DL.muted, opacity: ease(f, WEALTH, WEALTH + 10) }}>Bruegel, “The Fat Kitchen”, print, Antwerp 1563</div>
          <div style={{ marginTop: 14 }}>
            <span style={{ opacity: ease(f, TODAY - 2, TODAY + 8), color: DL.dim }}>Today,</span>
            <span style={{ opacity: ease(f, SEVEN_N - 4, SEVEN_N + 6) }}> one in seven</span>
            <span style={{ opacity: ease(f, PEOPLE - 2, PEOPLE + 8) }}> people on Earth</span>
            <span style={{ opacity: ease(f, OBESITY - 2, OBESITY + 8), color: DYT.orange }}> lives with obesity.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 10, opacity: ease(f, SEVEN_N - 2, SEVEN_N + 8) }}>
            <div style={{ display: 'flex', gap: 10 }}>{[0, 1, 2, 3, 4, 5, 6].map((i) => <Person key={i} lit={i === 3 ? litOne : 0} />)}</div>
            <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.muted, opacity: ease(f, OBESITY, OBESITY + 10) }}>WHO: 1 in 7 people (1.1 billion), 2024</span>
          </div>
          <div style={{ marginTop: 16, color: DL.gold, fontStyle: 'italic' }}><span style={{ opacity: ease(f, SO_N - 2, SO_N + 8) }}>So how did</span><span style={{ opacity: ease(f, PLENTY - 2, PLENTY + 8) }}> plenty</span><span style={{ opacity: ease(f, PROBLEM - 6, PROBLEM + 4), color: DL.red }}> turn into a problem?</span></div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 46, marginTop: 50, fontFamily: DL_MONO, fontSize: 46, letterSpacing: 4 }}>
        <span style={{ opacity: ease(f, ASK, ASK + 10), color: DL.text }}>ASK.</span>
        <span style={{ opacity: ease(f, WONDER, WONDER + 10), color: DL.gold }}>WONDER.</span>
        <span style={{ opacity: ease(f, REPEAT, REPEAT + 10), color: DL.red }}>REPEAT.</span>
      </div>
    </AbsoluteFill>
  );
};

// part 3 · left slot: COMMENT OF THE WEEK, labelled EXAMPLE (no real comment chosen yet; no handle is ever invented)
const CommentCard: React.FC<{ f: number; cardFlare: number; scribble: number }> = ({ f, cardFlare, scribble }) => (
  <div style={{ position: 'absolute', left: 160, top: 230, width: 720, height: 405, opacity: ease(f, ES + 2, ES + 12), transform: `translateY(${ease(f, ES + 2, ES + 14, 30, 0)}px)` }}>
    <div style={{ position: 'absolute', inset: 0, borderRadius: 22, border: `4px solid ${DYT.magenta}`, boxShadow: `0 0 ${40 + 60 * cardFlare}px ${DYT.magenta}${cardFlare > 0.3 ? 'aa' : '55'}, inset 0 0 50px ${DYT.magenta}1f`, background: '#0b1030d9', padding: '30px 40px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <svg width={40} height={40} viewBox="0 0 44 44"><path d="M6 8 H38 V30 H18 L10 38 V30 H6 Z" fill="none" stroke={DYT.magenta} strokeWidth={4} strokeLinejoin="round" /></svg>
        <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 30, letterSpacing: 1, color: DYT.white, whiteSpace: 'nowrap' }}>COMMENT OF THE WEEK</span>
        <span style={{ marginLeft: 'auto', padding: '4px 14px', borderRadius: 8, border: `2px dashed ${DYT.orange}`, fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: DYT.orange }}>EXAMPLE</span>
      </div>
      <div style={{ marginTop: 18, fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: DYT.dim, opacity: ease(f, ES + 10, ES + 22) }}>THIS WEEK'S QUESTION</div>
      <div style={{ marginTop: 8, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 36, lineHeight: 1.2, color: DYT.white, opacity: ease(f, ES + 12, ES + 24) }}>{PINNED_Q}</div>
      <div style={{ flex: 1 }} />
      <div style={{ opacity: ease(f, ES + 18, ES + 30) }}>
        <span style={{ padding: '8px 16px', borderRadius: 999, border: `2px solid ${DYT.green}`, fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 28, letterSpacing: 1, color: DYT.green, whiteSpace: 'nowrap' }}>BEST ANSWER · READ NEXT EPISODE</span>
      </div>
    </div>
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: -60, textAlign: 'center', fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: DYT.magenta }}>
      <span style={{ display: 'inline-block', clipPath: `inset(0 ${100 - 100 * scribble}% 0 0)` }}>
        <span style={{ display: 'inline-block', transform: `rotate(${scribble > 0 && scribble < 1 ? Math.sin(f * 1.3) * 18 : 0}deg)` }}>✎</span>  READ ON THIS SCREEN
      </span>
    </div>
  </div>
);

// part 3 · right slot: WATCH NEXT (YouTube's video element sits on it; the art underneath carries the No. 08 teaser)
const WatchNext: React.FC<{ f: number; pick: number }> = ({ f, pick }) => {
  const at = ES + 8;
  const shimmer = ((f - at) % 90) / 90;
  return (
    <div style={{ position: 'absolute', left: 1040, top: 230, width: 720, height: 405, opacity: ease(f, at, at + 12), transform: `translateY(${ease(f, at, at + 14, 30, 0)}px)` }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 22, border: `4px solid ${DYT.cyan}`, boxShadow: `0 0 ${40 + 50 * pick}px ${DYT.cyan}${pick > 0.3 ? 'aa' : '55'}, inset 0 0 50px ${DYT.cyan}1f`, background: '#0b103080', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${shimmer * 140 - 30}%`, width: '22%', background: 'linear-gradient(100deg, transparent, #ffffff14, transparent)' }} />
        <div style={{ filter: `drop-shadow(0 0 20px ${DYT.orange})` }}><Scale size={190} angle={10 + 8 * Math.sin(f / 9)} red={0.3} /></div>
        <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 28, letterSpacing: 4, color: DYT.dim }}>NO. {NEXT_EP.no}</span>
        <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 52, color: DYT.white }}>{NEXT_EP.subject}</span>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: -60, textAlign: 'center', fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: DYT.cyan, transform: `scale(${1 + 0.08 * pick})` }}>▶  WATCH NEXT</div>
    </div>
  );
};

const LtOutro: React.FC = () => {
  const f = useCurrentFrame();
  const fadeIn = ease(f, -1, 2);
  const fadeOut = ease(f, DUR - 18, DUR - 1, 1, 0, DL_EASE.in);
  const p1 = 1 - ease(f, NEXT - 14, NEXT, 0, 1, DL_EASE.in);
  const p2 = ease(f, NEXT - 2, NEXT + 12) * (1 - ease(f, END + 40, END + 50, 0, 1, DL_EASE.in));
  const p3 = ease(f, ES - 4, ES + 14);
  const commentPulse = f > COMMENTS ? 0.5 + 0.5 * Math.sin((f - COMMENTS) / 5) : 0;
  const lockOut = ease(f, TURN - 16, TURN - 2, 0, 1, DL_EASE.inOut);
  const hereFlash = ease(f, RIGHT, RIGHT + 4) * (1 - ease(f, RIGHT + 8, RIGHT + 28));
  const scribble = ease(f, E.at('time...', 1, 'e') + 2, E.at('time...', 1, 'e') + 20); // write-on in the gap after "time..."
  const pulse = (at: number) => ease(f, at - 1, at + 5) * (1 - ease(f, at + 10, at + 28));
  const ringPulse = ease(f, SEE - 2, SEE + 6) * (1 - ease(f, SEE + 12, SEE + 30));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: Math.min(fadeIn, fadeOut) }}>
      <SiteBg glow="#1a140a" />
      <Vignette />

      <Lockup f={f} lockOut={lockOut} sixPulse={pulse(SEVEN)} />

      {/* ── part 1: title, comment prompt, the ritual */}
      <AbsoluteFill style={{ opacity: p1, alignItems: 'center' }}>
        <div style={{ ...rise(f, TURN - 8), marginTop: 84, fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 28, letterSpacing: 8, color: DL.dim }}>DID YOU KNOW THAT? · NO. 07</div>
        <div style={{ ...rise(f, TURN - 8), fontFamily: DL_SERIF, fontSize: 70, color: DL.text, marginTop: 16 }}><span style={{ fontStyle: 'italic', color: DL.gold }}>Light</span></div>
        <PromptCard f={f} hereFlash={hereFlash} commentPulse={commentPulse} />
        <Ritual f={f} gamePulse={pulse(GAME)} friendPulse={pulse(LIGHT_ON)} />
      </AbsoluteFill>

      {/* ── part 2: the forward hook + motto */}
      <Teaser f={f} opacity={p2} />

      {/* ── part 3: END SCREEN (15 s). Two 16:9 video slots + a subscribe ring sized for YouTube's end-screen elements.
           Ring box (960 - 130, 637), 260 × 260: the only place YouTube's 296 px Subscribe circle covers it completely
           (see dyk-episode/references/upload-playbook.md §2.4). */}
      <AbsoluteFill style={{ opacity: p3 }}>
        <DytBg />
        <div style={{ position: 'absolute', top: 70, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <div style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 64, letterSpacing: 2, color: DYT.white, textShadow: `0 0 26px ${DYT.magenta}aa` }}>YOUR NEXT MYSTERY</div>
        </div>
        <CommentCard f={f} cardFlare={pulse(YOUR_COMMENT)} scribble={scribble} />
        <WatchNext f={f} pick={pulse(PICK)} />
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
export default LtOutro;
