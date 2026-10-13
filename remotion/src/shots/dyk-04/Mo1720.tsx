import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit, DayClock } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, win, SunCliffhanger, MoneyChip, MoneyLadder, moneyRungs, Kid, Label, Source, StampText, AskMark, BigWord, QGRAD,
  Banknote, Sovereign, GOLD,
} from '../../lib/dykkit-money';
import vo from './vo.json';

// =============================================================================
// DYK 04 · 7/14 — ERA 3: 1720, Paris (RESEARCH F11–F15). Header + "Paris" on its word; horses on "horses", speech
// bubbles full of notes on "talking"/"paper". DYK (F11, Velde): clauses on their words, a gold/silver pile ✗ capped at
// 500 LIVRES on "five hundred"; TRUST PAPER on "trust", BY LAW stamp on "law". John Law (F12): JOHN LAW on "John", A
// SCOTTISH GAMBLER + dice on "gambler", SENTENCED TO DEATH (1694 DUEL) on "sentenced"/"duel", RUNS FRANCE'S MONEY on
// "runs". How people lived (F13–F14): RUE QUINCAMPOIX on "narrow", a Day Clock of trading DAY & NIGHT on "day"/"night"
// (illustration); a MISSISSIPPI COMPANY share on "Mississippi"; the price line climbs ~250 → 10,000, ×40 on "forty";
// THE STORY GOES… + a man writing on another's back on "hunchback"/"desk". "So what is money now?" = "?"; A BELIEF chip
// on "belief" (slot 2, docks); WORTH = WHAT EVERYONE BELIEVES on "believes", the note cracks on "don't". The crash
// (F15): the line falls on "crashed", the note fades on "value", Law runs off on "escapes". Cliffhanger: a gold coin
// with a bite mark on "bite", London on "London". VO mo06 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Mo1720', durationInSeconds: 66.5333, fps: 30, width: 1920, height: 1080 };
const DUR = 1996;

const C = makeCue(vo, 'mo06-1720', 0.8);
const SEVENTEEN = C.at('seventeen');
const PARIS = C.at('Paris');
const DOCK = PARIS + 40;
const HORSES = C.at('horses');
const TALKING = C.at('talking');
const PAPER1 = C.at('paper', 1);
const DID = C.at('Did');
const THIS = C.at('this');
const FRANCE1 = C.at('France', 1);
const ILLEGAL = C.at('illegal');
const OWN = C.at('own');
const FIVE = C.at('five');
const LIVRES = C.at('livres');
const GOLD_W = C.at('gold');
const SILVER = C.at('silver');
const GOVERNMENT = C.at('government');
const TRUST = C.at('trust');
const LAW1 = C.at('law', 1); // 'By law.'
const MAN1 = C.at('man', 1); // 'The man behind it'
const JOHN = C.at('John');
const SCOTTISH = C.at('Scottish');
const GAMBLER = C.at('gambler');
const LIKE = C.at('Like');
const SENTENCED = C.at('sentenced');
const DUEL = C.at('duel');
const RUNS = C.at('runs');
const NARROW = C.at('narrow');
const PACKED = C.at('packed');
const DAY = C.at('day');
const NIGHT = C.at('night');
const BUYING = C.at('buying');
const MISSISSIPPI = C.at('Mississippi');
const YEAR2 = C.at('year', 2); // 'a year and a half' (1 = 'this year,')
const PRICE = C.at('price');
const FORTY = C.at('forty');
const TIMES = C.at('times');
const STORY = C.at('story');
const HUNCHBACK = C.at('hunchback');
const DESK = C.at('desk');
const SO = C.at('So');
const BELIEF = C.at('belief');
const CHIP_DOCK = BELIEF + 80;
const WORTH1 = C.at('worth', 1);
const BELIEVES = C.at('believes');
const UNTIL = C.at('Until');
const DONT1 = C.at("don't", 1);
const DECEMBER = C.at('December');
const CRASHED = C.at('crashed');
const NOTES = C.at('notes');
const VALUE = C.at('value');
const ESCAPES = C.at('escapes');
const FOR_NEXT = C.at('For', 2); // 'For the next hundred years' (1 = 'for killing a man')
const WANT = C.at('want');
const BELIEVE_IN = C.at('believe');
const BITE = C.at('bite');
const SOMETHING2 = C.at('Something');
const LAW3 = C.at('Law', 3); // 'And Law escapes France.'
const LONDON = C.at('London');
const GET = C.at('get');

// the share price, 1718 → Jan 1720 (Velde: ~250 → 10,000 livres), then the crash by December
const ChartLine: React.FC<{ f: number }> = ({ f }) => {
  const W = 600, H = 340;
  const pts: [number, number][] = [[0, 250], [0.25, 500], [0.45, 1500], [0.62, 4000], [0.75, 7000], [0.82, 10000]];
  const crash: [number, number][] = [[0.88, 6000], [0.94, 2000], [1, 1000]];
  const up = ease(f, YEAR2 - 4, FORTY + 6, 0, 1, DL_EASE.inOut);
  const dn = ease(f, CRASHED - 6, CRASHED + 14, 0, 1, DL_EASE.in);
  const xy = ([t, v]: [number, number]) => `${t * W},${H - (v / 10000) * (H - 20)}`;
  const visible = pts.filter(([t]) => t <= up * 0.82 + 1e-6);
  const last = visible[visible.length - 1];
  const line = [...visible, ...(dn > 0 ? crash.filter((_, i) => i < Math.ceil(dn * 3)) : [])];
  return (
    <svg width={W + 120} height={H + 60} viewBox={`-60 0 ${W + 120} ${H + 60}`}>
      <line x1={0} y1={H} x2={W} y2={H} stroke={DL.border} strokeWidth={3} />
      <polyline points={line.map(xy).join(' ')} fill="none" stroke={dn > 0.3 ? DL.red : DL.gold} strokeWidth={8} strokeLinejoin="round" />
      {last && <circle cx={last[0] * W} cy={H - (last[1] / 10000) * (H - 20)} r={10} fill={DL.gold} />}
      <text x={0} y={H + 40} fontFamily={DL_MONO} fontSize={24} fill={DL.muted}>1718 · ~250</text>
      <text x={0.82 * W - 24} y={30} textAnchor="end" fontFamily={DL_MONO} fontSize={24} fill={DL.gold} opacity={ease(f, FORTY - 2, FORTY + 6)}>JAN 1720 · 10,000</text>
      <text x={W - 80} y={H + 40} fontFamily={DL_MONO} fontSize={24} fill={DL.red} opacity={ease(f, DECEMBER - 2, DECEMBER + 6)}>DEC 1720</text>
    </svg>
  );
};

const Mo1720: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const street = win(f, DOCK, DID - 2, 10, 8);
  const law = win(f, MAN1 - 4, NARROW, 6, 8);
  const market = win(f, NARROW - 2, SO + 2, 6, 8);
  const belief = win(f, BELIEF - 2, FOR_NEXT + 8, 4, 10);
  const cliff = ease(f, FOR_NEXT - 2, FOR_NEXT + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, FOR_NEXT - 2, FOR_NEXT + 8));
  const crack = ease(f, DONT1 - 2, DONT1 + 8);
  const fadeNote = 1 - 0.75 * ease(f, VALUE - 2, VALUE + 16);
  const run = ease(f, ESCAPES, ESCAPES + 60, 0, 1, DL_EASE.in);
  const dice = f >= GAMBLER ? Math.floor((f - GAMBLER) / 5) % 6 : 0;

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1a1008" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1720" idx={3} label="PARIS" dockAt={DOCK} />
        <WakePlace place="Paris" at={PARIS} dockAt={DOCK} yearAt={SEVENTEEN} />
        {/* the street: horses, and everyone talking about paper */}
        <AbsoluteFill style={{ opacity: street }}>
          <div style={{ position: 'absolute', left: 160, top: 220 }}><Label at={HORSES} color={DL.warm} size={28}>THE STREET SMELLS OF HORSES<span style={{ opacity: ease(f, TALKING - 2, TALKING + 6), color: DL.text }}> · EVERYONE'S TALKING ABOUT PAPER</span></Label></div>
          <svg width={1600} height={260} viewBox="0 0 1600 260" style={{ position: 'absolute', left: 160, top: 640, opacity: ease(f, HORSES - 4, HORSES + 8) }}>
            {[0, 1].map((k) => {
              const x = ((f - HORSES) * (2 + k) + k * 700) % 1900 - 200;
              return (
                <g key={k} transform={`translate(${x} ${60 + k * 30})`}>
                  <ellipse cx={100} cy={70} rx={70} ry={34} fill="#5a3a22" /><path d="M160 60 L200 10 L222 18 L190 76 Z" fill="#5a3a22" />
                  {[50, 75, 125, 150].map((lx, j) => <line key={lx} x1={lx} y1={96} x2={lx + 6 * Math.sin(f / 4 + j)} y2={150} stroke="#5a3a22" strokeWidth={10} />)}
                </g>
              );
            })}
            <rect x={0} y={220} width={1600} height={40} fill="#2a2018" />
          </svg>
          {[0, 1, 2, 3].map((k) => (
            <div key={k} style={{ position: 'absolute', left: 220 + k * 380, top: 330 + (k % 2) * 60, opacity: ease(f, TALKING + k * 4, TALKING + k * 4 + 8) }}>
              <Kid size={90} adult color={['#8a7ab0', DL.warm, '#6a8aaa', '#aa8a6a'][k]} />
              <div style={{ position: 'absolute', left: 70, top: -70, padding: '12px 16px', borderRadius: 16, background: '#f4efe0', opacity: ease(f, PAPER1 - 2 + k * 3, PAPER1 + 6 + k * 3) }}><Banknote w={110} /></div>
            </div>
          ))}
        </AbsoluteFill>

        {/* John Law */}
        <AbsoluteFill style={{ opacity: law }}>
          <div style={{ position: 'absolute', left: 160, top: 230, display: 'flex', alignItems: 'center', gap: 50 }}>
            <div style={{ opacity: ease(f, MAN1 - 2, MAN1 + 8) }}><Kid size={200} adult color="#b9a8e8" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Label at={MAN1} color={DL.dim} size={28}>THE MAN BEHIND IT</Label>
              <div style={{ ...rise(f, JOHN - 2), fontFamily: DL_SERIF, fontSize: 96, color: DL.text }}>John Law</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <Label at={SCOTTISH} color={DL.warm} size={30}>A SCOTTISH<span style={{ opacity: ease(f, GAMBLER - 2, GAMBLER + 6) }}> GAMBLER</span></Label>
                <svg width={60} height={60} viewBox="0 0 60 60" style={{ opacity: ease(f, GAMBLER - 2, GAMBLER + 6), transform: `rotate(${dice * 15}deg)` }}><rect x={4} y={4} width={52} height={52} rx={10} fill="#f4efe0" />{[[18, 18], [42, 42], [30, 30], [42, 18], [18, 42], [30, 18]].slice(0, dice + 1).map(([x, y], i) => <circle key={i} cx={x} cy={y} r={5} fill="#1a1a1a" />)}</svg>
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 560, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Label at={LIKE} color={DL.dim} size={28}>LIKE PALMSTRUCH…</Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
              <StampText text="SENTENCED TO DEATH" at={SENTENCED} color={DL.red} size={40} />
              <Label at={DUEL} color={DL.text} size={30}>A DUEL · LONDON, 1694</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: ease(f, RUNS - 2, RUNS + 8) }}>
              <span style={{ fontFamily: DL_SERIF, fontSize: 64, color: DL.gold }}>Now he runs France's money</span>
            </div>
            <Source at={RUNS}>Controller General of Finances, Jan 1720 · Britannica · NY Fed Liberty Street (2014)</Source>
          </div>
        </AbsoluteFill>

        {/* how people lived: one narrow street, trading day and night */}
        <AbsoluteFill style={{ opacity: market }}>
          <div style={{ position: 'absolute', left: 160, top: 200, display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ ...rise(f, NARROW - 2), padding: '10px 22px', borderRadius: 8, background: '#1a2a4a', border: '3px solid #e8e8f0', fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, letterSpacing: 3, color: '#e8e8f0' }}>RUE QUINCAMPOIX</div>
            <Label at={PACKED} color={DL.warm} size={28}>PACKED<span style={{ opacity: ease(f, DAY - 2, DAY + 6) }}> · DAY</span><span style={{ opacity: ease(f, NIGHT - 2, NIGHT + 6) }}> AND NIGHT</span></Label>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 300, transform: 'scale(0.82)', transformOrigin: 'top left', opacity: 1 - ease(f, BUYING - 6, BUYING + 6) }}>
            <DayClock year="1720" at={DAY - 6} step={8} hotSeq={[[1, DAY], [3, NIGHT]]} segs={[
              { from: 6, to: 12, label: 'TRADING', color: DL.gold },
              { from: 12, to: 18, label: 'TRADING', color: '#e0b030' },
              { from: 18, to: 24, label: 'TRADING', color: '#a07a20' },
              { from: 0, to: 6, label: 'STILL TRADING', color: '#6a5a30' },
            ]} />
          </div>
          <div style={{ position: 'absolute', left: 160, top: 330, display: 'flex', alignItems: 'center', gap: 40, opacity: ease(f, BUYING - 4, BUYING + 6) }}>
            <div style={{ position: 'relative' }}>
              <Banknote w={300} title="Compagnie" color="#f0e4c8" ink="#5a3a2a" glow={ease(f, MISSISSIPPI - 2, MISSISSIPPI + 8) * 0.6} />
              <div style={{ position: 'absolute', left: 30, top: 70, width: 210, fontFamily: DL_MONO, fontWeight: 700, fontSize: 18, color: '#5a3a2a', background: '#f0e4c8', opacity: ease(f, MISSISSIPPI - 2, MISSISSIPPI + 6) }}>MISSISSIPPI COMPANY · ONE SHARE</div>
            </div>
            <div style={{ opacity: ease(f, YEAR2 - 6, YEAR2 + 4) }}><ChartLine f={f} /></div>
          </div>
          <div style={{ position: 'absolute', left: 1250, top: 400, fontFamily: DL_SERIF, fontWeight: 600, fontSize: 130, color: DL.gold, opacity: ease(f, FORTY - 2, FORTY + 6), transform: `scale(${ease(f, FORTY - 2, FORTY + 10, 1.3, 1)})`, textShadow: `0 0 30px ${DL.gold}88` }}>×40</div>
          <div style={{ position: 'absolute', left: 1250, top: 570, width: 460 }}><Label at={TIMES} color={DL.gold} size={26}>ABOUT 40 TIMES<br />IN ~1.5 YEARS</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 760 }}><Source at={PRICE}>Velde, Chicago Fed WP 2003-31 · other accounts give different start and peak prices</Source></div>
          {/* the story goes: a hunchback rents out his back as a desk */}
          <div style={{ position: 'absolute', left: 160, top: 810, display: 'flex', alignItems: 'flex-end', gap: 26, opacity: ease(f, STORY - 2, STORY + 8) }}>
            <Label at={STORY} color={DL.dim} size={28}>THE STORY GOES…</Label>
            <svg width={220} height={130} viewBox="0 0 220 130" style={{ opacity: ease(f, HUNCHBACK - 2, HUNCHBACK + 8) }}>
              <circle cx={40} cy={70} r={16} fill={DL.warm} /><path d="M50 80 Q100 30 150 80 L150 120 L56 120 Z" fill={DL.warm} />
              <rect x={70} y={44} width={70} height={10} fill="#f4efe0" transform="rotate(-4 105 49)" opacity={ease(f, DESK - 2, DESK + 6)} />
              <circle cx={190} cy={30} r={14} fill="#8a7ab0" /><line x1={180} y1={44} x2={130} y2={52} stroke="#8a7ab0" strokeWidth={6} opacity={ease(f, DESK - 2, DESK + 6)} />
            </svg>
            <Label at={DESK} color={DL.text} size={28}>A BACK FOR HIRE, AS A WRITING DESK</Label>
          </div>
        </AbsoluteFill>

        {/* "So what is money now?" — a belief; until it isn't; the crash */}
        <AskMark at={SO} out={BELIEF + 2} left={760} top={250} pulseAt={C.at('now', 2)} />
        <AbsoluteFill style={{ opacity: belief }}>
          <div style={{ position: 'absolute', left: 200, top: 240, display: 'flex', alignItems: 'center', gap: 60 }}>
            <div style={{ position: 'relative', opacity: fadeNote, filter: `grayscale(${1 - fadeNote})` }}>
              <Banknote w={360} title="Banque Royale" color="#f0e4c8" ink="#5a3a2a" />
              <svg width={360} height={188} viewBox="0 0 360 188" style={{ position: 'absolute', left: 0, top: 0, opacity: crack }}><path d="M180 0 L170 60 L196 96 L160 140 L178 188" fill="none" stroke="#1a1a1a" strokeWidth={6} /></svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <BigWord at={BELIEF} size={120} gradient>A belief.</BigWord>
              <Label at={WORTH1} color={DL.text} size={30}>WORTH WHAT<span style={{ opacity: ease(f, BELIEVES - 2, BELIEVES + 6) }}> EVERYONE BELIEVES</span></Label>
              <Label at={UNTIL} color={DL.red} size={30}>UNTIL THEY<span style={{ opacity: ease(f, DONT1 - 2, DONT1 + 6) }}> DON'T.</span></Label>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 200, top: 600, display: 'flex', gap: 40, alignItems: 'center' }}>
            <Label at={DECEMBER} color={DL.red} size={32}>DECEMBER 1720:</Label>
            <Label at={CRASHED} color={DL.text} size={32}>SHARES CRASH</Label>
            <Label at={NOTES} color={DL.text} size={32}>· NOTES LOSE<span style={{ opacity: ease(f, VALUE - 2, VALUE + 6) }}> VALUE</span></Label>
          </div>
          <div style={{ position: 'absolute', left: 200 + 900 * run, top: 640, display: 'flex', alignItems: 'flex-end', gap: 20, opacity: ease(f, LAW3 - 4, LAW3 + 4) }}>
            <Kid size={110} adult color="#b9a8e8" />
            <Label at={ESCAPES} color="#b9a8e8" size={30}>LAW ESCAPES FRANCE →</Label>
          </div>
          <div style={{ position: 'absolute', left: 200, top: 920 }}><Source at={DECEMBER}>Velde 2003 · NY Fed Crisis Chronicles (2014)</Source></div>
        </AbsoluteFill>
        <MoneyChip text="A BELIEF" at={BELIEF} dockAt={CHIP_DOCK} slot={2} left={1000} top={760} />

        {/* cliffhanger: money you can bite — London */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 300, top: 240 }}><Label at={FOR_NEXT} color={DL.dim} size={30}>FOR THE NEXT HUNDRED YEARS…</Label></div>
          <div style={{ position: 'absolute', left: 300, top: 300, display: 'flex', alignItems: 'center', gap: 50, opacity: ease(f, FOR_NEXT, FOR_NEXT + 10) }}>
            <Banknote w={260} title="Paper" color="#e0e0e0" ink="#6a6a6a" />
            <span style={{ fontFamily: DL_SERIF, fontSize: 90, color: DL.dim, opacity: ease(f, BELIEVE_IN - 2, BELIEVE_IN + 6) }}>→</span>
            <div style={{ position: 'relative', opacity: ease(f, SOMETHING2 - 2, SOMETHING2 + 6) }}>
              <Sovereign size={220} glow={0.8} label="£" />
              <div style={{ position: 'absolute', right: -14, top: 30, width: 70, height: 70, borderRadius: '50%', background: DL.bg, opacity: ease(f, BITE, BITE + 4) }} />
            </div>
          </div>
          <svg width={600} height={200} viewBox="0 0 600 200" style={{ position: 'absolute', left: 1100, top: 340, opacity: ease(f, LONDON - 2, LONDON + 8) }}>
            <rect x={0} y={150} width={600} height={50} fill="#1a1612" />
            <path d="M40 150 L40 90 L80 90 L80 150 M120 150 L120 60 Q160 20 200 60 L200 150 M260 150 L260 40 L280 10 L300 40 L300 150 M360 150 L360 100 L460 100 L460 150 M500 150 L500 70 L560 70 L560 150" fill="#2a2420" stroke="#4a4038" strokeWidth={3} />
            <text x={300} y={190} textAnchor="middle" fontFamily={DL_MONO} fontSize={26} fill={GOLD.light} opacity={ease(f, GET - 2, GET + 6)}>LONDON</text>
          </svg>
        </AbsoluteFill>

        <MoneyLadder rungs={[...moneyRungs(2), { year: '1720', label: 'A BELIEF', at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={MAN1}>
          <span style={{ opacity: ease(f, THIS - 4, THIS + 6) }}>this year,</span>
          <span style={{ opacity: ease(f, FRANCE1 - 4, FRANCE1 + 6) }}> France made it</span>
          <span style={{ opacity: ease(f, ILLEGAL - 4, ILLEGAL + 6), color: '#ff9a1f', fontStyle: 'italic' }}> illegal</span>
          <span style={{ opacity: ease(f, OWN - 4, OWN + 6) }}> to own more than</span>
          <span style={{ opacity: ease(f, FIVE - 4, FIVE + 6), color: '#ff9a1f', fontStyle: 'italic' }}> 500 livres</span>
          <span style={{ opacity: ease(f, GOLD_W - 4, GOLD_W + 6) }}> in gold</span>
          <span style={{ opacity: ease(f, SILVER - 4, SILVER + 6) }}> or silver.</span>
          <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 30 }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 52, color: '#ffffff', opacity: ease(f, GOVERNMENT - 4, GOVERNMENT + 6) }}>The government wanted you to</span>
            <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 52, color: '#ffd23f', opacity: ease(f, TRUST - 4, TRUST + 6) }}>trust paper.</span>
            <StampText text="BY LAW" at={LAW1} color="#ff3db4" size={40} />
          </div>
          <div style={{ marginTop: 20, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, FIVE, FIVE + 10) }}>27 Feb 1720 · Velde, Government Equity and Money (Chicago Fed WP 2003-31)</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1821" parts={[{ text: 'People want money', at: WANT }, { text: "they don't just have to believe in.", at: BELIEVE_IN }, { text: 'Something they can bite.', at: BITE }, { text: 'In London, they get it.', at: GET }]} />
      <EpisodeHud year={1720} episode="04" />
    </AbsoluteFill>
  );
};
export default Mo1720;
