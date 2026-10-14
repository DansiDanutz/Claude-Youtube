import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, SiteBg } from '../../lib/danslab';
import { DYT } from '../../lib/dytbrand';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette } from '../../lib/dykkit';
import {
  EpisodeHud, win, MoneyLadder, moneyRungs, NEXT_RUNG, Label, Source, StampText, QGRAD,
  Banknote, Anchor, DotGrid, Digits, CacaoPod, GOLD,
} from '../../lib/dykkit-money';
import vo from './vo.json';

// =============================================================================
// DYK 04 · 12/14 — 2100: evidence → scenario (RESEARCH F24–F27), PREDICTION · A SCENARIO, NOT A FACT on screen throughout.
// Opens on the docked ladder; the dashed 2100 rung "?" appears on "rung"; the 2100 header slams on "Twenty" (1st).
// THE EVIDENCE → on "evidence". 1 (F24/F25): a cash bar shrinks on "shrinking"; 93 dots, 85 light from "nine" (1st) —
// 85 OF 93 CENTRAL BANKS · EXPLORING ≠ ISSUING (BIS Papers 159, 2025). 2 (F26): a digital € coin on "euro", a calendar
// 2029? on "nine" (2nd), IF EU LAWMAKERS AGREE on "agree" (law still in negotiation, Oct 2026). 3 (F27): BIS on
// "Settlements"; a stablecoin token on "stablecoins"; three test boxes go red on "fail"/"tests"; an anchor labelled THE
// CENTRAL BANK'S PROMISE on "anchor". Scenario: SCENARIO · NOT A FACT stamp on "scenario"/"fact"; a note in a museum
// case on "museum"; digits on "code" (1st); PROMISE on "promise" (2nd). Callback: a cacao pod (1500) on "trees" and a code
// block (2100) on "code" (2nd); the 2100 rung fills A PROMISE IN CODE? on "code" (2nd). VO mo11 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Mo2100', durationInSeconds: 61.1667, fps: 30, width: 1920, height: 1080 };
const DUR = 1835;

const C = makeCue(vo, 'mo11-2100', 0.8);
const RUNG = C.at('rung');
const TWENTY1 = C.at('Twenty', 1);
const HUNDRED1 = C.at('hundred', 1);
const MORNING = C.at('morning');
const EVIDENCE = C.at('evidence');
const CASH = C.at('Cash');
const SHRINKING = C.at('shrinking');
const NOTICED = C.at('noticed');
const SURVEY = C.at('survey');
const FIVE = C.at('five');
const NINE1 = C.at('nine', 1);
const EXPLORING = C.at('exploring');
const DIGITAL1 = C.at('digital', 1);
const EUROPE = C.at('Europe');
const READY = C.at('ready');
const EURO = C.at('euro');
const FIRST = C.at('first');
const NINE2 = C.at('nine', 2);
const AGREE = C.at('agree');
const SETTLEMENTS = C.at('Settlements');
const BANK2 = C.at('Bank', 2); // 'the Bank for International Settlements' (1 = 'the central bank is getting ready')
const OWN_BANK = C.at('own', 2); // "the central banks' own bank" (1 = 'a digital currency of their own')
const STABLECOINS = C.at('stablecoins');
const PEGGED = C.at('pegged');
const FAIL = C.at('fail');
const TESTS = C.at('tests');
const PROMISE1 = C.at('promise', 1);
const ANCHOR = C.at('anchor');
const SO2 = C.at('So', 2);
const SCENARIO = C.at('scenario');
const FACT = C.at('fact');
const BY = C.at('By');
const WALLET = C.at('wallet');
const NOTE_W = C.at('note');
const MUSEUM = C.at('museum');
const CODE1 = C.at('code', 1);
const BUT2 = C.at('But', 2);
const PROMISE2 = C.at('promise', 2);
const FIFTEEN = C.at('fifteen');
const TREES = C.at('trees');
const WRITTEN = C.at('written');
const CODE2 = C.at('code', 2);

const TESTS3 = ['SINGLENESS', 'ELASTICITY', 'INTEGRITY'];

const Mo2100: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const ev1 = win(f, CASH - 4, EUROPE - 2, 6, 8);
  const ev2 = win(f, EUROPE - 4, BANK2 - 8, 6, 8);
  const ev3 = win(f, BANK2 - 6, SO2, 6, 8);
  const scen = win(f, SO2 - 2, FIFTEEN - 2, 6, 8);
  const callback = ease(f, FIFTEEN - 4, FIFTEEN + 8);
  const cashBar = 1 - 0.5 * ease(f, SHRINKING - 2, SHRINKING + 20, 0, 1, DL_EASE.inOut);
  const red = (i: number) => ease(f, FAIL + i * 6, FAIL + i * 6 + 6);
  const promiseGlow = ease(f, PROMISE2 - 2, PROMISE2 + 6) * (1 - 0.4 * ease(f, PROMISE2 + 10, PROMISE2 + 40));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0a1a1e" />
      <Vignette />
      <Sequence from={TWENTY1} layout="none"><EraHeader year="2100" idx={7} label="PREDICTION" dockAt={MORNING - TWENTY1 + 10} /></Sequence>
      <div style={{ position: 'absolute', left: 160, top: 170, display: 'flex', alignItems: 'center', gap: 16, opacity: ease(f, MORNING, MORNING + 10) }}>
        <span style={{ padding: '6px 16px', borderRadius: 8, border: `2px solid ${DL.red}`, fontFamily: DL_MONO, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: DL.red }}>PREDICTION</span>
        <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 2, color: DL.dim }}>A SCENARIO, NOT A FACT</span>
      </div>
      <div style={{ position: 'absolute', left: 160, top: 230 }}><Label at={EVIDENCE} color={DL.gold} size={28}>THE EVIDENCE →</Label></div>

      {/* evidence 1: cash is shrinking; 85 of 93 central banks exploring a digital currency */}
      <AbsoluteFill style={{ opacity: ev1 }}>
        <div style={{ position: 'absolute', left: 160, top: 300, display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.text, width: 120 }}>CASH</span>
          <div style={{ width: 600 * cashBar, height: 40, borderRadius: 10, background: DL.gold, opacity: ease(f, CASH - 2, CASH + 8) }} />
          <Label at={SHRINKING} color={DL.dim} size={24}>SHRINKING · 79 % → 52 % (EURO AREA)</Label>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 380 }}><Label at={NOTICED} color={DL.text} size={30}>CENTRAL BANKS HAVE NOTICED</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 450, display: 'flex', alignItems: 'flex-start', gap: 50, opacity: ease(f, SURVEY - 4, SURVEY + 6) }}>
          <DotGrid n={93} lit={85} at={NINE1} step={0.35} size={26} cols={16} color={DYT.cyan} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 10 }}>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 60, color: DYT.cyan, opacity: ease(f, NINE1 - 2, NINE1 + 8) }}>85 of 93</span>
            <Label at={NINE1} color={DL.text} size={28}>CENTRAL BANKS ASKED (91 %)</Label>
            <Label at={EXPLORING} color={DYT.cyan} size={28}>EXPLORING A DIGITAL CURRENCY</Label>
            <Label at={DIGITAL1} color={DL.dim} size={24}>EXPLORING ≠ ISSUING</Label>
            <Source at={FIVE}>BIS Papers no. 159 (Aug 2025) · 2024 survey</Source>
          </div>
        </div>
      </AbsoluteFill>

      {/* evidence 2: a possible digital euro, 2029 at the earliest — if lawmakers agree */}
      <AbsoluteFill style={{ opacity: ev2 }}>
        <div style={{ position: 'absolute', left: 160, top: 300, display: 'flex', alignItems: 'center', gap: 60 }}>
          <div style={{ width: 260, height: 260, borderRadius: '50%', border: `8px solid ${DYT.blue}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DL_SERIF, fontSize: 160, color: DYT.blue, boxShadow: `0 0 40px ${DYT.blue}88`, opacity: ease(f, EURO - 6, EURO + 4), position: 'relative', overflow: 'hidden' }}>
            €<Digits w={260} h={260} op={0.35} speed={3} cols={6} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Label at={EUROPE} color={DL.text} size={30}>EUROPE'S CENTRAL BANK<span style={{ opacity: ease(f, READY - 2, READY + 6) }}> · GETTING READY</span></Label>
            <Label at={EURO} color={DYT.blue} size={34}>A POSSIBLE DIGITAL EURO</Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: ease(f, FIRST - 2, FIRST + 8) }}>
              <div style={{ width: 170, padding: '10px 0', borderRadius: 12, background: '#f4efe0', textAlign: 'center' }}>
                <div style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.red }}>AS EARLY AS</div>
                <div style={{ fontFamily: DL_SERIF, fontSize: 64, color: '#1a1a1a', lineHeight: 1, opacity: ease(f, NINE2 - 2, NINE2 + 6) }}>2029?</div>
              </div>
              <StampText text="IF LAWMAKERS AGREE" at={AGREE} color={DL.gold} size={34} tilt={-2} />
            </div>
            <Source at={NINE2}>ECB, 30 Oct 2025 · EU law still in negotiation (Parliament mandate July 2026)</Source>
          </div>
        </div>
      </AbsoluteFill>

      {/* evidence 3: the BIS warns stablecoins fail key tests; the central bank's promise stays the anchor */}
      <AbsoluteFill style={{ opacity: ev3 }}>
        <div style={{ position: 'absolute', left: 160, top: 290 }}><Label at={BANK2} color={DL.text} size={30}>THE BANK FOR INTERNATIONAL SETTLEMENTS</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 335 }}><Label at={OWN_BANK} color={DL.dim} size={26}>THE CENTRAL BANKS' OWN BANK</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 390, display: 'flex', alignItems: 'center', gap: 40 }}>
          <div style={{ width: 180, height: 180, borderRadius: '50%', background: '#2a1a40', border: `6px solid ${DYT.purple}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DL_MONO, fontWeight: 700, fontSize: 36, color: DYT.purple, opacity: ease(f, STABLECOINS - 4, STABLECOINS + 6) }}>STABLE<br />COIN</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Label at={STABLECOINS} color={DYT.purple} size={28}>STABLECOINS</Label>
            <Label at={PEGGED} color={DL.dim} size={24}>CRYPTO TOKENS PEGGED TO A CURRENCY</Label>
          </div>
          <div style={{ position: 'absolute', left: 0, top: 210, display: 'flex', gap: 16 }}>
            {TESTS3.map((t, i) => (
              <div key={t} style={{ width: 200, padding: '16px 0', borderRadius: 12, textAlign: 'center', border: `3px solid ${red(i) > 0.5 ? DL.red : DL.border}`, background: red(i) > 0.5 ? '#2a0e0a' : DL.panel, opacity: ease(f, FAIL - 4, FAIL + 4) }}>
                <div style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.text }}>{t}</div>
                <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 44, color: DL.red, opacity: red(i) }}>✗</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', left: 840, top: 640 }}><Label at={TESTS} color={DL.red} size={26}>FAIL KEY TESTS OF GOOD MONEY</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 720, display: 'flex', alignItems: 'center', gap: 30, opacity: ease(f, PROMISE1 - 4, PROMISE1 + 6) }}>
          <Anchor size={140} color={GOLD.mid} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 56, color: DL.text }}>the central bank's <span style={{ color: DL.gold }}>promise</span></span>
            <Label at={ANCHOR} color={GOLD.light} size={30}>= STAYS THE ANCHOR</Label>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 1000, top: 860, width: 700 }}><Source at={FAIL}>BIS Annual Economic Report 2025, ch. III<br />tests: singleness, elasticity, integrity</Source></div>
      </AbsoluteFill>

      {/* the scenario */}
      <AbsoluteFill style={{ opacity: scen }}>
        <div style={{ position: 'absolute', left: 160, top: 300, display: 'flex', alignItems: 'center', gap: 30 }}>
          <StampText text="ONE SCENARIO" at={SCENARIO} color={DYT.magenta} size={40} tilt={-3} />
          <StampText text="NOT A FACT" at={FACT} color={DL.red} size={40} tilt={3} />
          <span style={{ marginLeft: 30, fontFamily: DL_MONO, fontWeight: 700, fontSize: 40, letterSpacing: 4, color: DL.gold, opacity: ease(f, BY - 2, BY + 6), transform: `scale(${ease(f, BY - 2, BY + 10, 1.3, 1)})`, display: 'inline-block' }}>BY 2100 …</span>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 420, display: 'flex', alignItems: 'flex-end', gap: 60 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: ease(f, NOTE_W - 2, NOTE_W + 8) }}>
            <div style={{ position: 'relative', padding: '40px 30px 20px', border: `4px solid ${ease(f, MUSEUM - 2, MUSEUM + 6) > 0.5 ? '#c8d8e8' : 'transparent'}`, borderRadius: 8, background: ease(f, MUSEUM - 2, MUSEUM + 6) > 0.5 ? '#c8d8e814' : 'transparent' }}>
              <Banknote w={300} big="£20" />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: -44, textAlign: 'center', fontFamily: DL_MONO, fontSize: 22, color: '#c8d8e8', opacity: ease(f, MUSEUM - 2, MUSEUM + 6) }}>IN A MUSEUM</div>
            </div>
            <Label at={MUSEUM} color={DL.text} size={26} style={{ marginTop: 40 }}>COULD BE A MUSEUM PIECE</Label>
          </div>
          <div style={{ position: 'relative', width: 320, height: 300, borderRadius: 16, border: `3px solid ${DYT.cyan}`, overflow: 'hidden', opacity: ease(f, CODE1 - 4, CODE1 + 6) }}>
            <Digits w={320} h={300} op={1} speed={4} cols={8} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 14, textAlign: 'center', fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: DYT.cyan, background: '#06081899' }}>MONEY COULD BE CODE</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 60 }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 52, color: DL.text, opacity: ease(f, BUT2 - 2, BUT2 + 6) }}>but still a</span>
            <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 110, display: 'inline-block', background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: ease(f, PROMISE2 - 2, PROMISE2 + 6), transform: `scale(${1 + 0.1 * promiseGlow})`, transformOrigin: 'left center', filter: `drop-shadow(0 0 ${26 * promiseGlow}px ${DYT.magenta})` }}>promise</span>
          </div>
        </div>
      </AbsoluteFill>

      {/* callback: 1500 money grew on trees · 2100 it might be written in code */}
      <AbsoluteFill style={{ opacity: callback }}>
        <div style={{ position: 'absolute', left: 160, top: 320, display: 'flex', alignItems: 'center', gap: 80 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, opacity: ease(f, FIFTEEN, FIFTEEN + 8) }}>
            <CacaoPod size={160} glow={0.6} />
            <span style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.gold }}>1500 · GREW ON TREES</span>
          </div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 110, color: DL.dim, opacity: ease(f, WRITTEN - 4, WRITTEN + 6) }}>→</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, opacity: ease(f, WRITTEN - 12, WRITTEN - 2) }}>
            <div style={{ position: 'relative', width: 260, height: 240, borderRadius: 16, border: `3px dashed ${DYT.cyan}`, overflow: 'hidden', boxShadow: `0 0 40px ${DYT.cyan}66` }}><Digits w={260} h={240} op={1} speed={3} cols={6} /></div>
            <span style={{ fontFamily: DL_MONO, fontSize: 30, color: DYT.cyan }}>2100 · WRITTEN IN CODE?</span>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 760, fontFamily: DL_MONO, fontSize: 26, color: DL.dim, opacity: ease(f, CODE2, CODE2 + 10) }}>A REFLECTION, NOT A FORECAST · NO PUBLISHED SOURCE PUTS A NUMBER ON 2100</div>
      </AbsoluteFill>

      <MoneyLadder rungs={moneyRungs(6)} show={(1 - ease(f, TWENTY1 - 6, TWENTY1) * (1 - ease(f, MORNING + 4, MORNING + 20))) * (1 - 0.55 * ease(f, EVIDENCE, EVIDENCE + 12) * (1 - ease(f, SO2 - 6, SO2 + 8)))} next={{ at: RUNG, fillAt: CODE2, fill: NEXT_RUNG }} />
      <EpisodeHud year={f >= HUNDRED1 ? 2100 : 'TODAY'} episode="04" prediction={f >= HUNDRED1} />
    </AbsoluteFill>
  );
};
export default Mo2100;
