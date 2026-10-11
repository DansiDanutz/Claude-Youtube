import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { DYT, DYT_DISPLAY, DYT_GRADIENT, DYT_HANDLE, DytBg, DytLogoAnimated, DytWordmark } from '../../lib/dytbrand';
import { makeCue, ease, rise, YEARS, Vignette } from '../../lib/dykkit';
import vo from './vo.json';

// =============================================================================
// DYK 01 · 13/13 — narrated outro, DansLab pattern (ep11 ZOutro): reveals land
// on his words. Comment prompt (7 century chips), LIKE / SHARE / SUBSCRIBE as a
// designed ritual, ONE forward hook (No. 02 teaser), motto ASK. WONDER. REPEAT.
// (echo of BUILD. SHIP. REPEAT.), then a ≥5s logo end card for YouTube's end
// screen. VO tc13 @0.6s.
// =============================================================================
export const compositionConfig = { id: 'TcOutro', durationInSeconds: 62.8000, fps: 30, width: 1920, height: 1080 };
const DUR = 1884;

const C = makeCue(vo, 'tc13-outro', 0.6);
const DID = C.at('Did');
const BEST = C.at('best');
const IF = C.at('If');
const DEAL = C.at('deal');
const FACTS = C.at('facts');
const GUESSING = C.at('guessing');
const CHANGED = C.at('changed');
const WHICH = C.at('which');
const WHY = C.at('why');
const AS = C.at('as');
const FRIEND = C.at('friend');
const MYSTERY = C.at('mystery');
const CHIP_STEP = 6;
const LOGO_SHIFT = 300; // half the wordmark width + gap: the logo's offset from the lockup's centre   // the highlight walks across the seven centuries while he asks
const COMMENT1 = C.at('comment', 1);
const RIGHT = C.at('right');
const SUBJECT = C.at('subject');
const EPISODE3 = C.at('episode', 3);
const WATCH = C.at('watch');
const COLLECT = C.at('collect');
const PLAY = C.at('play');
const TITLE = C.at('Time');
const TURN = C.at('turn');
const CENTURY = C.at('century');
const COMMENTS = C.at('comments');
const LIKE = C.at('like');
const SHARE = C.at('share');
const SUB = C.at('subscribe');
const NEXT = C.at('Next', 2);
const DEXTY = C.at('Dex-tee');
const SUN = C.at('Sun', 1);
const NOT = C.at('not');
const ASK = C.at('Ask', 2);
const WONDER = C.at('Wonder');
const REPEAT = C.at('Repeat');
const END = C.end;
// End screen: 15 s from ES (YouTube end-screen elements are placed over these slots in Studio).
const ES = END + 24;
const E = makeCue(vo, 'tc14-endscreen', (ES + 14) / 30);
const PICK = E.at('Pick');

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

const TcOutro: React.FC = () => {
  const f = useCurrentFrame();
  const fadeIn = 1;   // hard cut in: picture on frame 0, the whoosh carries the cut
  const fadeOut = ease(f, DUR - 12, DUR - 1, 1, 0, DL_EASE.in);
  const p1 = 1 - ease(f, NEXT - 14, NEXT, 0, 1, DL_EASE.in);
  const p2 = ease(f, NEXT - 2, NEXT + 12) * (1 - ease(f, END + 10, END + 26, 0, 1, DL_EASE.in));
  const p3 = ease(f, ES - 4, ES + 8);   // end screen at full opacity ES+8 → DUR−12 (≥ 15 s)
  const commentPulse = f > COMMENTS ? 0.5 + 0.5 * Math.sin((f - COMMENTS) / 5) : 0;
  // opening lockup: EPISODE 01 + logo from frame 0, the wordmark on "Did You Know That",
  // the title on "Time, Compressed" — then it shrinks away as the small header takes over on "turn"
  const lockOut = ease(f, TURN - 16, TURN - 2, 0, 1, DL_EASE.inOut);
  const hereFlash = ease(f, RIGHT, RIGHT + 4) * (1 - ease(f, RIGHT + 8, RIGHT + 28));
  const scribble = ease(f, ES + 12, ES + 30);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: Math.min(fadeIn, fadeOut) }}>
      <SiteBg glow="#120d07" />
      <Vignette />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - lockOut, transform: `translateY(${-lockOut * 220}px) scale(${1 - lockOut * 0.5})` }}>
        {/* picture on frame 0 (hard cut with the whoosh): EPISODE 01 and the logo are there from the first frame */}
        <div style={{ fontFamily: DL_MONO, fontSize: 34, letterSpacing: 12, color: DL.red }}>EPISODE 01</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 30, height: 260 }}>
          {/* the logo sits centred alone from "episode" and slides left as the wordmark lands on "Did" */}
          <div style={{ transform: `translateX(${LOGO_SHIFT * (1 - ease(f, DID - 8, DID + 2, 0, 1, DL_EASE.inOut))}px)` }}><DytLogoAnimated size={220} start={-20} /></div>
          <DytWordmark at={DID} size={96} />
        </div>
        <div style={{ ...rise(f, TITLE - 2), marginTop: 40, fontFamily: DL_SERIF, fontSize: 110, color: DL.text }}>
          Time, <span style={{ fontStyle: 'italic', color: DL.gold }}>Compressed</span>
        </div>
      </AbsoluteFill>

      {/* ── part 1: title, comment prompt, the ritual */}
      <AbsoluteFill style={{ opacity: p1, alignItems: 'center' }}>
        <div style={{ ...rise(f, TURN - 8), marginTop: 120, fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 26, letterSpacing: 8, color: DL.dim }}>DID YOU KNOW THAT? · NO. 01</div>
        <div style={{ ...rise(f, TURN - 8), fontFamily: DL_SERIF, fontSize: 70, color: DL.text, marginTop: 16 }}>
          Time, <span style={{ fontStyle: 'italic', color: DL.gold }}>Compressed</span>
        </div>

        <div style={{ ...rise(f, TURN - 2), marginTop: 50, width: 1400, padding: '34px 44px', background: DL.panel, border: `1px solid ${hereFlash > 0.01 ? DYT.magenta : DL.border}`, boxShadow: `0 0 ${50 * hereFlash}px ${DYT.magenta}`, borderRadius: 18, boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* "If you could wake up in any century…" sets it up; the question itself lands on "which" */}
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, top: 18, whiteSpace: 'nowrap', opacity: ease(f, IF - 2, IF + 8) * (1 - ease(f, WHICH - 6, WHICH)), fontFamily: DL_MONO, fontSize: 28, letterSpacing: 4, color: DL.dim }}>IF YOU COULD WAKE UP IN ANY CENTURY…</span>
              <span style={{ opacity: ease(f, WHICH - 2, WHICH + 8), fontFamily: DL_SERIF, fontSize: 48, color: DL.text }}>Which century would <span style={{ color: DL.gold, fontStyle: 'italic' }}>you</span> choose?<span style={{ opacity: ease(f, WHY - 2, WHY + 8), color: DL.gold, fontStyle: 'italic' }}> And why?</span></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: ease(f, COMMENTS - 4, COMMENTS + 6), transform: `scale(${1 + commentPulse * 0.05})` }}>
              <svg width={44} height={44} viewBox="0 0 44 44"><path d="M6 8 H38 V30 H18 L10 38 V30 H6 Z" fill="none" stroke={DL.red} strokeWidth={4} strokeLinejoin="round" /></svg>
              <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 4, color: DL.red }}>COMMENTS ↓</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
            {YEARS.map((y, i) => {
              const at = CENTURY + 6 + i * 6;
              const s = interpolate(f, [at, at + 8], [0.7, 1], { ...DCLAMP, easing: DL_EASE.out });
              const sweeping = f >= WHICH && f < BEST - 2;   // walks on through "Here is the deal"
              const hl = sweeping && Math.floor((f - WHICH) / CHIP_STEP) % YEARS.length === i ? 1 : 0;
              return (
                <div key={y} style={{ opacity: ease(f, at, at + 6), transform: `scale(${s * (1 + hl * 0.1)})`, background: hl ? (i === 6 ? `${DL.red}33` : `${DL.gold}33`) : 'transparent', padding: '14px 24px', borderRadius: 12, border: `2px ${i === 6 ? 'dashed' : 'solid'} ${i === 6 ? DL.red : DL.gold}`, fontFamily: DL_SERIF, fontSize: 44, color: i === 6 ? DL.red : DL.gold }}>{y}</div>
              );
            })}
          </div>
          {/* the deal, piece by piece on his words: the chip on "deal", the promise on "comment",
              the subject → a future episode on "subject" / "episode" */}
          <div style={{ marginTop: 22, display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ opacity: ease(f, DEAL - 2, DEAL + 6), fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DYT.magenta }}>THE DEAL:</span>
            <span style={{ ...rise(f, BEST - 2), padding: '10px 20px', borderRadius: 999, background: DYT.magenta, fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 24, letterSpacing: 2, color: DYT.white }}>COMMENT OF THE WEEK</span>
            <span style={{ opacity: ease(f, COMMENT1 - 2, COMMENT1 + 6), fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.dim }}>best comment read on screen</span>
            <span style={{ opacity: ease(f, SUBJECT - 2, SUBJECT + 6), fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.dim }}>· the subject you ask for most</span>
            <span style={{ opacity: ease(f, EPISODE3 - 2, EPISODE3 + 6), fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DYT.green }}>→ a future episode</span>
          </div>
        </div>

        {/* the website: every episode, the fact cards, the guessing game */}
        <div style={{ ...rise(f, DEXTY - 4), marginTop: 40, display: 'flex', alignItems: 'center', gap: 22, padding: '16px 34px', borderRadius: 999, border: '3px solid transparent', backgroundImage: `linear-gradient(#0b1030, #0b1030), ${DYT_GRADIENT}`, backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box', boxShadow: `0 0 40px ${DYT.magenta}55` }}>
          <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 26, letterSpacing: 3, color: DYT.dim, display: 'flex', gap: 14 }}>
            {[['WATCH', WATCH], ['· COLLECT', COLLECT], ['· PLAY', PLAY]].map(([w, at]) => (
              <span key={String(w)} style={{ opacity: ease(f, Number(at) - 2, Number(at) + 6), color: f >= Number(at) && f < Number(at) + 20 ? DYT.white : DYT.dim }}>{w}</span>
            ))}
          </span>
          <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 46, color: DYT.white, textShadow: `0 0 20px ${DYT.magenta}aa` }}>Dexty.live</span>
          {[['FACT CARDS', FACTS], ['GUESSING GAME', GUESSING]].map(([t, at]) => (
            <span key={String(t)} style={{ opacity: ease(f, Number(at) - 2, Number(at) + 6), transform: `scale(${interpolate(f, [Number(at), Number(at) + 8], [1.3, 1], { ...DCLAMP, easing: DL_EASE.out })})`, padding: '6px 14px', borderRadius: 999, border: `2px solid ${DYT.cyan}`, fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 20, letterSpacing: 2, color: DYT.cyan }}>{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 34, marginTop: 40 }}>
          <Action label="Like" at={LIKE} icon={<svg width={34} height={34} viewBox="0 0 34 34"><path d="M4 15 H10 V30 H4 Z M12 30 V15 L18 4 C21 4 22 6 21 10 L20 13 H29 C31 13 32 15 31 17 L28 28 C27.5 29.5 26.5 30 25 30 Z" fill={DL.text} /></svg>} />
          <Action label="Share" at={SHARE} icon={<svg width={34} height={34} viewBox="0 0 34 34"><path d="M20 6 L31 16 L20 26 V20 C12 20 7 23 3 29 C4 20 9 13 20 12 Z" fill={DL.text} /></svg>} />
          <Action label="Subscribe" at={SUB} primary icon={<svg width={34} height={34} viewBox="0 0 34 34"><rect x={2} y={7} width={30} height={20} rx={6} fill={DL.bg} /><path d="M14 12 L22 17 L14 22 Z" fill={DL.gold} /></svg>} />
        </div>
        {/* a beat on each phrase while the buttons hold */}
        <div style={{ display: 'flex', gap: 30, marginTop: 22, fontFamily: DL_SANS, fontSize: 26, color: DL.warm }}>
          <span style={{ opacity: ease(f, CHANGED - 2, CHANGED + 8), color: DL.dim }}>changed how you see an hour?</span>
          <span style={{ opacity: ease(f, FRIEND - 2, FRIEND + 8) }}>→ the friend who is always out of time</span>
          <span style={{ opacity: ease(f, MYSTERY - 2, MYSTERY + 8), color: DL.gold }}>so the next mystery finds you</span>
        </div>
      </AbsoluteFill>

      {/* ── part 2: the forward hook + motto */}
      <AbsoluteFill style={{ opacity: p2, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...rise(f, NEXT), fontFamily: DL_MONO, fontSize: 28, letterSpacing: 8, color: DL.red }}>NEXT · NO. 02</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 34 }}>
          <div style={{ ...rise(f, SUN - 4), width: 170, height: 170, borderRadius: '50%', background: `radial-gradient(circle at 40% 40%, #ffe08a, ${DL.gold} 55%, #b85c00)`, boxShadow: `0 0 ${60 + 20 * Math.sin(f / 10)}px ${DL.gold}88` }} />
          <div style={{ ...rise(f, SUN), width: 1100, fontFamily: DL_SERIF, fontSize: 76, lineHeight: 1.15, color: DL.text }}>
            The Sun you see in the sky is <span style={{ color: DL.gold, fontStyle: 'italic', opacity: ease(f, NOT - 2, NOT + 8) }}>not the Sun</span><span style={{ color: DL.gold, fontStyle: 'italic', opacity: ease(f, AS - 2, AS + 8) }}> as it is right now.</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 46, marginTop: 90, fontFamily: DL_MONO, fontSize: 46, letterSpacing: 4 }}>
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
        {/* COMMENT OF THE WEEK — from No. 02 on, the best comment of the previous episode is
            shown here (handle credited). No. 01 has no comments yet, so it shows a clearly
            labelled EXAMPLE, never a fake viewer comment. */}
        <div style={{ position: 'absolute', left: 150, top: 230, width: 720, height: 405, opacity: ease(f, ES + 2, ES + 12), transform: `translateY(${ease(f, ES + 2, ES + 14, 30, 0)}px)` }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 22, border: `4px solid ${DYT.magenta}`, boxShadow: `0 0 40px ${DYT.magenta}55, inset 0 0 50px ${DYT.magenta}1f`, background: '#0b1030d9', padding: '34px 40px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <svg width={40} height={40} viewBox="0 0 44 44"><path d="M6 8 H38 V30 H18 L10 38 V30 H6 Z" fill="none" stroke={DYT.magenta} strokeWidth={4} strokeLinejoin="round" /></svg>
              <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 32, letterSpacing: 2, color: DYT.white }}>COMMENT OF THE WEEK</span>
            </div>
            <div style={{ marginTop: 22, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, lineHeight: 1.2, color: DYT.white, opacity: ease(f, ES + 12, ES + 24) }}>
              “I’d wake up in 1500 — sleep under the stars, and stop scrolling all day.”
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: ease(f, ES + 18, ES + 30) }}>
              <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 23, letterSpacing: 1, color: DYT.orange, whiteSpace: 'nowrap' }}>EXAMPLE · COULD BE YOURS</span>
              <span style={{ padding: '8px 16px', borderRadius: 999, border: `2px solid ${DYT.green}`, fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 20, letterSpacing: 1, color: DYT.green, whiteSpace: 'nowrap' }}>IDEA: THE PHONE</span>
            </div>
          </div>
          {/* the line writes itself on, the pencil wiggling (pencil-scribble cue) */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: -60, textAlign: 'center', fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: DYT.magenta }}>
            <span style={{ display: 'inline-block', clipPath: `inset(0 ${100 - 100 * scribble}% 0 0)` }}>
              <span style={{ display: 'inline-block', transform: `rotate(${scribble > 0 && scribble < 1 ? Math.sin(f * 1.3) * 18 : 0}deg)` }}>✎</span>  BEST COMMENT · READ HERE
            </span>
          </div>
        </div>
        {/* WATCH NEXT — YouTube's video element sits on this slot; the art underneath carries the No. 02 teaser */}
        {(() => {
          const at = ES + 8;
          const shimmer = ((f - at) % 90) / 90;
          return (
            <div style={{ position: 'absolute', left: 1050, top: 230, width: 720, height: 405, opacity: ease(f, at, at + 12), transform: `translateY(${ease(f, at, at + 14, 30, 0)}px)` }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 22, border: `4px solid ${DYT.cyan}`, boxShadow: `0 0 40px ${DYT.cyan}55, inset 0 0 50px ${DYT.cyan}1f`, background: '#0b103080', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${shimmer * 140 - 30}%`, width: '22%', background: 'linear-gradient(100deg, transparent, #ffffff14, transparent)' }} />
                <div style={{ width: 110, height: 110, borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%, #ffe08a, #ff9a1f 55%, #b85c00)', boxShadow: '0 0 50px #ff9a1f88' }} />
                <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 24, letterSpacing: 4, color: DYT.dim }}>NO. 02 · COMING NEXT</span>
                <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 52, color: DYT.white }}>THE SUN</span>
              </div>
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: -60, textAlign: 'center', fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: DYT.cyan }}>▶  WATCH NEXT</div>
            </div>
          );
        })()}
        {/* subscribe ring (YouTube's subscribe element = the channel avatar) */}
        <div style={{ position: 'absolute', left: 960 - 130, top: 720, width: 260, height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DytLogoAnimated size={190} start={ES + 6} />
        </div>
        <div style={{ position: 'absolute', left: 1130, top: 790, opacity: ease(f, ES + 18, ES + 30) }}>
          <div style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 40, color: DYT.white }}>SUBSCRIBE</div>
          <div style={{ fontFamily: DYT_DISPLAY, fontWeight: 700, fontSize: 24, letterSpacing: 2, color: DYT.dim, marginTop: 6 }}>{DYT_HANDLE}</div>
        </div>
        <div style={{ position: 'absolute', left: 150, top: 800, width: 620, opacity: ease(f, PICK - 6, PICK + 8) }}>
          <div style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 40, color: DYT.white }}>Comment below ↓</div>
          <div style={{ fontFamily: DYT_DISPLAY, fontWeight: 700, fontSize: 24, letterSpacing: 2, color: DYT.dim, marginTop: 6 }}>Best one is read next episode.</div>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 60, display: 'flex', justifyContent: 'center', opacity: ease(f, ES + 12, ES + 26) }}>
          <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: DYT.muted }}>Dexty.live  ·  every episode · the fact cards · the guessing game</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default TcOutro;
