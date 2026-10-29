import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { DYT, DYT_DISPLAY, DytBg, DytLogoAnimated, DytWordmark } from '../../lib/dytbrand';
import { makeCue, ease, useShotFade, Vignette } from '../../lib/dykkit';
import { LightProp, LightFigure, FLAME, Label, Source, OnWord, TenPeople, hold, pane } from '../../lib/dykkit-light';
import vo from './vo.json';

// =============================================================================
// DYK 07 · 1/11 — the cold open, recut 2026-10-29 to the VidNinjas pre-roll rule (≤ ~90 words / 35 s: premise, the
// guess, straight into 1500). ONE scene `lt01-cold` spliced from the existing takes (splice_coldopen.py).
// Frame 0: ONE candle flame in the dark; it slides left on "What". THE QUESTION card builds on "What", "switched",
// "night". Britain (L11): BRITAIN, LIGHT NOW COSTS, LESS THAN, < 1/3,000 on "three-thousandth", OF WHAT IT COST IN
// 1800 on "eighteen", Fouquet & Pearson on "hundred."; "pocket the savings." + a coin stack. "We didn't." gets its own
// beat, then docks up while a dark house builds ("tonight", "house"), "something is slowly" and "disappearing." (keeps
// fading). No sky or stars anywhere (the stars come in Today). The guess (L13, answered in LtReveal), from the hold
// after "disappearing.": a pulsing "?" from "Here's", THINK OF TEN PEOPLE on "Think", ten figures on "ten" (NONE lit),
// the question on "How", "live", "night", "brightened?"; Two? / Five? / More than eight? each on its word in the same
// neutral style (the answer is NEVER highlighted); the steps GUESS / STAY / CHECK + the tick on the last "guess.".
// Then the 1.8 s brand flash (logo + wordmark + NO. 07 · LIGHT) that stands in for the sting. VO lt01-cold @0.6 s.
// =============================================================================
export const compositionConfig = { id: 'LtHook', durationInSeconds: 34.5667, fps: 30, width: 1920, height: 1080 };
const DUR = 1037;

const A = makeCue(vo, 'lt01-cold', 0.6);
const WHAT = A.at('What', 1); // 'What happened' (2 = 'what we know', 3 = 'of what it did')
const SWITCHED = A.at('switched');
const NIGHT = A.at('night', 1); // 'the night off?' (2 = 'a night sky')
const HERES = A.at("Here's", 1); // "Here's what we know" (2 = "Here's your guess.")
const IN = A.at('In', 1); // 'In Britain' (2 = 'in eighteen hundred', 3 = 'in the comments')
const BRITAIN = A.at('Britain,');
const LIGHT = A.at('light');
const LESS = A.at('less');
const THOUSANDTH = A.at('three-thousandth');
const EIGHTEEN = A.at('eighteen');
const HUNDRED = A.at('hundred.');
const YOUD = A.at("You'd");
const POCKET = A.at('pocket');
const WE = A.at('We', 3); // "We didn't." (1 = 'when we switched', 2 = 'what we know')
const DIDNT = A.at("didn't.");
const AND = A.at('And', 1); // 'And tonight' (2 = 'and check your guess')
const TONIGHT = A.at('tonight,');
const HOUSE = A.at('house,');
const SOMETHING = A.at('something');
const DISAPPEARING = A.at('disappearing.');
const HERES2 = A.at("Here's", 2);
const THINK = A.at('Think', 2); // 'Think of ten people' (1 = "You'd think")
const TEN = A.at('ten');
const ANYWHERE = A.at('anywhere');
const HOW = A.at('How');
const LIVE = A.at('live');
const NIGHT2 = A.at('night', 2);
const BRIGHTENED = A.at('brightened?');
const TWO = A.at('Two?');
const FIVE = A.at('Five?');
const MORE = A.at('More');
const GUESS = A.at('Guess', 2); // 'Guess in the comments' (1 = "Here's your guess.")
const COMMENTS = A.at('comments,');
const STAY = A.at('stay');
const CHECK = A.at('check');
const TICK = A.at('guess.', 3); // 'check your guess.'

// panels hold ≥ 1.5 s after their last reveal (kit `hold`)
const QUOTE_END = hold(HERES, IN); // HERE'S WHAT WE KNOW is the card's last reveal
const BRITAIN_END = hold(POCKET, WE);
// "We didn't." alone for 1 s, then it docks up (still legible) so TONIGHT can land on its word
const BEAT_END = AND - 4;
const GUESS_IN = hold(DISAPPEARING, HERES2); // "disappearing." fully legible 1.5 s before the guess takes over
const FLASH_F = 54; // the brand flash: 1.8 s at the end of the shot (make_timeline COLD_TAIL)
const FLASH = DUR - FLASH_F;
const NO_ONE_LIT: number[] = []; // the guess never lights a figure (the answer is LtReveal's)

// the one candle flame; `glow` 0–1 scales the warm pool around it
const Candle: React.FC<{ f: number; glow: number }> = ({ f, glow }) => {
  const flick = 0.85 + 0.15 * Math.sin(f / 5) + 0.05 * Math.sin(f / 2.3);
  return (
    <div style={{ position: 'relative', width: 360, height: 360 }}>
      <div style={{ position: 'absolute', left: -220, top: -260, width: 800, height: 800, borderRadius: '50%', background: `radial-gradient(circle at 50% 50%, ${FLAME}${Math.round(52 * flick * glow).toString(16).padStart(2, '0')}, transparent 62%)` }} />
      <div style={{ position: 'absolute', left: 0, top: 0 }}><LightProp kind="tallow" size={360} f={f} lit={0.9 + 0.1 * flick} /></div>
    </div>
  );
};

// "pocket the savings": a small coin stack
const Coins: React.FC = () => (
  <svg width={110} height={90} viewBox="0 0 110 90">
    {[0, 1, 2, 3].map((k) => <ellipse key={k} cx={40} cy={78 - k * 14} rx={30} ry={9} fill={DL.gold} stroke="#8a6a20" strokeWidth={3} />)}
    <ellipse cx={84} cy={78} rx={22} ry={8} fill={DL.gold} stroke="#8a6a20" strokeWidth={3} />
  </svg>
);

// a dark house; its one window is lit by the candle's colour
const House: React.FC<{ f: number }> = ({ f }) => (
  <svg width={420} height={300} viewBox="0 0 420 300">
    <path d="M40 140 L210 30 L380 140 Z" fill="#141826" stroke="#2c3248" strokeWidth={4} />
    <rect x={70} y={140} width={280} height={150} fill="#10131e" stroke="#2c3248" strokeWidth={4} />
    <rect x={120} y={180} width={56} height={56} fill={FLAME} opacity={0.7 + 0.2 * Math.sin(f / 5)} />
    <rect x={186} y={210} width={52} height={80} fill="#0a0c14" stroke="#2c3248" strokeWidth={3} />
    <rect x={250} y={180} width={56} height={56} fill="#0a0c14" stroke="#2c3248" strokeWidth={3} />
    <rect x={290} y={60} width={30} height={60} fill="#141826" stroke="#2c3248" strokeWidth={4} />
  </svg>
);

const Step: React.FC<{ n: string; text: string; at: number; tickAt?: number }> = ({ n, text, at, tickAt }) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [at - 2, at + 8], [1.25, 1], { ...DCLAMP, easing: DL_EASE.out });
  const ticked = tickAt !== undefined && f >= tickAt;
  const stamp = tickAt === undefined ? 1 : ease(f, tickAt, tickAt + 8, 1.5, 1);
  return (
    <div style={{ opacity: ease(f, at - 2, at + 6), transform: `scale(${s})`, display: 'flex', alignItems: 'center', gap: 18, padding: '18px 30px', borderRadius: 999, background: DYT.panel, border: `2px solid ${ticked ? DYT.green : DYT.border}` }}>
      <span style={{ width: 46, height: 46, borderRadius: '50%', background: ticked ? DYT.green : DYT.magenta, transform: `scale(${stamp})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 26, color: DYT.white }}>
        {ticked ? <svg width={26} height={26} viewBox="0 0 26 26"><path d="M4 14 L10 20 L22 6" fill="none" stroke={DYT.white} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" /></svg> : n}
      </span>
      <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 30, color: DYT.white }}>{text}</span>
    </div>
  );
};

// one guess option: every option uses the same neutral style (no answer highlighted)
const Option: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const f = useCurrentFrame();
  return (
    <span style={{ opacity: ease(f, at - 2, at + 4), transform: `scale(${ease(f, at - 2, at + 10, 1.25, 1)})`, padding: '10px 34px', borderRadius: 999, border: `3px solid ${DYT.border}`, background: DYT.panel, fontFamily: DL_SERIF, fontSize: 50, color: DYT.white, whiteSpace: 'nowrap' }}>{children}</span>
  );
};

const LtHook: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const slide = ease(f, WHAT - 4, WHAT + 16);
  const candleGlow = 1 - 0.35 * ease(f, AND - 2, AND + 12); // the flame sinks low on "And tonight"
  const quote = pane(f, WHAT, QUOTE_END);
  const britain = pane(f, QUOTE_END, BRITAIN_END);
  const beatIn = ease(f, BRITAIN_END - 2, BRITAIN_END + 4);
  const dock = ease(f, BEAT_END - 2, BEAT_END + 10);
  const house = ease(f, TONIGHT - 2, TONIGHT + 6);
  const vanish = ease(f, DISAPPEARING + 6, GUESS_IN, 1, 0.3) * (0.9 + 0.1 * Math.sin(f / 4));
  const hookOut = 1 - ease(f, GUESS_IN - 4, GUESS_IN + 8); // the dark street gives way to the guess
  const guessIn = ease(f, GUESS_IN - 2, GUESS_IN + 10);
  const guessOut = 1 - ease(f, FLASH - 4, FLASH + 6);
  const ask = ease(f, BRIGHTENED - 2, BRIGHTENED + 8) * (1 - ease(f, BRIGHTENED + 20, BRIGHTENED + 44, 0, 1, DL_EASE.inOut));
  const flash = ease(f, FLASH - 4, FLASH + 4);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#120a04" />
      <AbsoluteFill style={{ opacity: guessIn }}><DytBg intensity={0.8} /></AbsoluteFill>
      <Vignette />

      <AbsoluteFill style={{ opacity: hookOut }}>
        <div style={{ position: 'absolute', left: 780 - 520 * slide, top: 520 - 40 * slide }}><Candle f={f} glow={candleGlow} /></div>

        {/* the question */}
        <AbsoluteFill style={{ opacity: quote }}>
          <div style={{ position: 'absolute', left: 660, right: 160, top: 220, padding: '30px 44px', borderRadius: 18, background: '#0e0b0af0', borderLeft: `6px solid ${DL.gold}`, border: `1px solid ${DL.border}` }}>
            <Label at={WHAT} color={DL.dim} size={28}>THE QUESTION</Label>
            <div style={{ marginTop: 16, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 62, lineHeight: 1.15, color: DL.text }}>
              <OnWord at={WHAT}>What happened when </OnWord><OnWord at={SWITCHED}>we switched </OnWord>
              <span style={{ opacity: ease(f, NIGHT - 2, NIGHT + 4), color: DL.gold }}>the night off?</span>
            </div>
            <Label at={HERES} color={DL.gold} size={28} style={{ marginTop: 18 }}>HERE&apos;S WHAT WE KNOW ▸</Label>
          </div>
        </AbsoluteFill>

        {/* Britain: light now costs less than 1/3,000 of what it did in 1800 (L11) */}
        <AbsoluteFill style={{ opacity: britain }}>
          <div style={{ position: 'absolute', left: 700, right: 160, top: 170, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Label at={BRITAIN} color={DL.gold} size={40}>BRITAIN</Label>
            <div style={{ display: 'flex', gap: 18 }}>
              <Label at={LIGHT} color={DL.dim} size={32}>LIGHT NOW COSTS</Label>
              <Label at={LESS} color={DL.dim} size={32}>LESS THAN</Label>
            </div>
            <LightFigure at={THOUSANDTH} size={190} value={<>&lt; 1/3,000</>} label={<OnWord at={EIGHTEEN}>OF WHAT IT COST IN 1800</OnWord>} />
            <Source at={HUNDRED} style={{ width: 900 }}>Fouquet &amp; Pearson 2006 · lighting services, Britain, 1800 → 2000</Source>
            <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 26, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 56, color: DL.warm }}>
              <span><OnWord at={YOUD}>You&apos;d think we&apos;d </OnWord><OnWord at={POCKET}>pocket the savings.</OnWord></span>
              <div style={{ opacity: ease(f, POCKET - 2, POCKET + 4), transform: `translateY(${ease(f, POCKET - 2, POCKET + 10, -30, 0)}px)` }}><Coins /></div>
            </div>
          </div>
        </AbsoluteFill>

        {/* "We didn't." — its own beat, then it docks up while the house builds */}
        <div style={{ position: 'absolute', left: 660, right: 160, top: 360 - 230 * dock, textAlign: 'center', opacity: beatIn, transform: `scale(${1 - 0.5 * dock})`, fontFamily: DL_SERIF, fontWeight: 500, fontSize: 150, color: DL.text }}>
          <OnWord at={WE}>We </OnWord><span style={{ opacity: ease(f, DIDNT - 2, DIDNT + 4), color: DL.red }}>didn&apos;t.</span>
        </div>

        {/* tonight, above your house, something is slowly disappearing (no sky) */}
        <AbsoluteFill style={{ opacity: house }}>
          <div style={{ position: 'absolute', left: 660, right: 160, top: 300, textAlign: 'center' }}>
            <Label at={TONIGHT} color={DL.dim} size={32}>TONIGHT<OnWord at={HOUSE}> · ABOVE YOUR HOUSE</OnWord></Label>
          </div>
          <div style={{ position: 'absolute', left: 1210 - 210, top: 400, opacity: ease(f, HOUSE - 2, HOUSE + 6), transform: `translateY(${ease(f, HOUSE - 2, HOUSE + 12, 24, 0)}px)` }}><House f={f} /></div>
          <div style={{ position: 'absolute', left: 660, right: 160, top: 740, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 64, color: DL.text }}>
            <OnWord at={SOMETHING}>something is slowly </OnWord>
            <span style={{ opacity: ease(f, DISAPPEARING - 2, DISAPPEARING + 4) * vanish, fontStyle: 'italic', color: '#c8cdf0' }}>disappearing.</span>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      {/* the guess: ten people anywhere on Earth — how many live under a sky our lights have brightened? */}
      <AbsoluteFill style={{ opacity: guessIn * guessOut }}>
        <div style={{ position: 'absolute', left: 220, right: 220, top: 170, padding: '26px 40px', borderRadius: 20, background: '#0b1030e6', border: `2px solid ${DYT.magenta}`, boxShadow: `0 0 ${40 * ask}px ${DYT.magenta}88`, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DYT.dim }}>YOUR GUESS<OnWord at={THINK}> · THINK OF TEN PEOPLE</OnWord><OnWord at={ANYWHERE}> · ANYWHERE ON EARTH</OnWord></div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', minHeight: 92 }}>
            {/* a pulsing "?" holds the slot from "Here's" until "ten" (no bare heading for 2 s) */}
            <span style={{ position: 'absolute', left: 0, top: -14, fontFamily: DL_SERIF, fontSize: 110, color: DYT.magenta, opacity: ease(f, GUESS_IN - 2, GUESS_IN + 6) * (1 - ease(f, TEN - 4, TEN)), transform: `scale(${1 + 0.06 * Math.sin((f - GUESS_IN) / 6)})` }}>?</span>
            <div style={{ transform: `translateY(${2 * Math.sin(f / 14)}px)` }}><TenPeople at={TEN} litAt={NO_ONE_LIT} size={70} /></div>
          </div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 50, lineHeight: 1.2, color: DYT.white }}>
            <OnWord at={HOW}>How many of them </OnWord><OnWord at={LIVE}>live under a </OnWord><OnWord at={NIGHT2}>night sky that our lights have </OnWord>
            <span style={{ display: 'inline-block', color: DYT.orange, opacity: ease(f, BRIGHTENED - 2, BRIGHTENED + 6), transform: `scale(${1 + 0.1 * ask})`, textShadow: `0 0 ${30 * ask}px ${DYT.magenta}` }}>brightened?</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, minHeight: 80, alignItems: 'center' }}>
            <Option at={TWO}>Two?</Option>
            <Option at={FIVE}>Five?</Option>
            <Option at={MORE}>More than eight?</Option>
          </div>
          <Source at={BRIGHTENED}>Falchi et al. · Science Advances, 2016 · the answer comes at the end</Source>
        </div>

        <div style={{ position: 'absolute', left: 0, right: 0, top: 790, display: 'flex', justifyContent: 'center', gap: 26 }}>
          <div style={{ position: 'relative' }}>
            <Step n="1" text="GUESS IN THE COMMENTS" at={GUESS} />
            <div style={{ position: 'absolute', left: 60, top: -92, opacity: ease(f, COMMENTS - 1, COMMENTS + 5), transform: `scale(${ease(f, COMMENTS - 1, COMMENTS + 9, 0.6, 1)})`, transformOrigin: '30px 80px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 22px', borderRadius: 18, background: DYT.white }}>
                <span style={{ width: 30, height: 30, borderRadius: '50%', background: DYT.blue }} />
                <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 26, color: DYT.navy }}>My guess: …</span>
              </div>
              <svg width={30} height={18} viewBox="0 0 30 18" style={{ position: 'absolute', left: 26, top: '100%', marginTop: -1 }}><path d="M0 0 L30 0 L6 18 Z" fill={DYT.white} /></svg>
            </div>
          </div>
          <Step n="2" text="STAY TO THE END" at={STAY} />
          <Step n="3" text="CHECK YOUR GUESS" at={CHECK} tickAt={TICK} />
        </div>
      </AbsoluteFill>

      {/* the brand flash (stands in for the 7.5 s sting): bulb on, wordmark, this episode */}
      {f >= FLASH - 4 && (
        <AbsoluteFill style={{ opacity: flash, alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
            <DytLogoAnimated size={230} start={FLASH - 4} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <DytWordmark at={FLASH + 2} size={96} />
              <span style={{ opacity: ease(f, FLASH + 28, FLASH + 34), transform: `scale(${ease(f, FLASH + 28, FLASH + 38, 1.2, 1)})`, alignSelf: 'flex-start', padding: '8px 22px', borderRadius: 999, border: `3px solid ${DYT.orange}`, fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 34, letterSpacing: 4, color: DYT.orange }}>NO. 07 · LIGHT</span>
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
export default LtHook;
