import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import { AskMark, EpisodeHud, WakePlace, win, SunCliffhanger, SchoolChip, SchoolLadder, schoolRungs, Kid, Scroll, SchoolHouse, Label, Source, StampText, INK } from '../../lib/dykkit-school';
import vo from './vo.json';

// =============================================================================
// DYK 03 · 9/14 — ERA 5: 1948, a small American town (RESEARCH F15, F16). Place on "small"; JUNE · GRADUATION DAY
// with a mortarboard on "Graduation"; an iron (steam) on "ironing", a radio (waves) on "radio's". DYK (F15, Goldin &
// Katz): bars 1910 18 % on "ten" and 1940 71 % on "ten." (said "fewer than one in five" / "about seven in ten").
// Grandad leaves young to work; you stay — a diploma, a door opens on "doors". A LADDER chip (slot 4) on "ladder.";
// a literal ladder: you climb on "climb", A BETTER JOB on "job". UDHR (F16): Paris, 10 Dec 1948, the United Nations;
// Article 26 quoted on its spoken words. The rung becomes RIGHT · LADDER on "right" (2nd). Cliffhanger: a right ·
// a ladder · a building every morning; band into today; school windows go dark on "close". VO sc08 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Sc1948', durationInSeconds: 53.0667, fps: 30, width: 1920, height: 1080 };
const DUR = 1592;

const C = makeCue(vo, 'sc08-1948', 0.8);
const SMALL = C.at('small');
const TOWN = C.at('town');
const DOCK = TOWN + 46;
const JUNE = C.at('June');
const GRADUATION = C.at('Graduation');
const IRONING = C.at('ironing');
const GOWN = C.at('gown');
const RADIOS = C.at("radio's");
const DID = C.at('Did');
const TEN1 = C.at('ten', 1); // 'in nineteen ten,'
const FEWER = C.at('fewer');
const FIVE = C.at('five');
const TEENAGERS = C.at('teenagers');
const HIGH = C.at('high');
const FORTY2 = C.at('forty', 2); // 'By nineteen forty' (1 = 'nineteen forty eight')
const SEVEN = C.at('seven');
const TEN2 = C.at('ten', 2); // 'seven in ten.'
const GRANDAD = C.at('grandad');
const LEFT = C.at('left');
const WORK = C.at('work');
const STAYING = C.at('staying');
const DIPLOMA = C.at('diploma');
const DOORS = C.at('doors');
const SO1 = C.at('So', 1);
const LADDER1 = C.at('ladder', 1);
const CHIP_DOCK = LADDER1 + 95;
const CLIMB = C.at('climb');
const CLOSER = C.at('closer');
const JOB = C.at('job');
const DECEMBER = C.at('December');
const PARIS = C.at('Paris');
const UNITED = C.at('United');
const WORLD = C.at('world');
const EVERYONE = C.at('Everyone');
const RIGHT1 = C.at('right', 1);
const EDUCATION = C.at('education');
const FREE = C.at('Free');
const YEARS1 = C.at('years', 1); // 'the early years.'
const SO2 = C.at('So', 2); // 'So now school is a right.'
const RIGHT2 = C.at('right', 2);
const LADDER2 = C.at('ladder', 2);
const BUILDING = C.at('building');
const MORNING = C.at('morning');
const BUT = C.at('But');
const SEVENTY = C.at('seventy');
const MOST = C.at('most');
const CLOSE = C.at('close');
const ALMOST = C.at('Almost');

const LADDER_RUNGS = ['GRADE 1', 'GRADE 4', 'GRADE 8', 'HIGH SCHOOL', 'DIPLOMA'];

const Mortarboard: React.FC<{ f: number }> = ({ f }) => (
  <svg width={260} height={200} viewBox="0 0 260 200" style={{ transform: `translateY(${-30 * Math.abs(Math.sin((f - GRADUATION) / 10)) * ease(f, GRADUATION, GRADUATION + 6)}px)` }}>
    <path d="M10 60 L130 10 L250 60 L130 110 Z" fill="#1b1b2a" stroke={DL.gold} strokeWidth={4} />
    <path d="M60 82 L60 140 Q130 175 200 140 L200 82 L130 112 Z" fill="#14141f" />
    <line x1={230} y1={62} x2={236} y2={150} stroke={DL.gold} strokeWidth={6} /><circle cx={236} cy={156} r={10} fill={DL.gold} />
  </svg>
);

const BigLadder: React.FC<{ f: number }> = ({ f }) => {
  const climb = ease(f, CLIMB - 4, JOB, 0, 1);
  const H = 520, top = 0;
  return (
    <div style={{ position: 'relative', width: 700, height: H + 80 }}>
      <svg width={300} height={H} viewBox={`0 0 300 ${H}`} style={{ position: 'absolute', left: 0, top }}>
        <line x1={60} y1={0} x2={60} y2={H} stroke={INK.wood} strokeWidth={12} /><line x1={240} y1={0} x2={240} y2={H} stroke={INK.wood} strokeWidth={12} />
        {LADDER_RUNGS.map((_, i) => <line key={i} x1={60} y1={H - 60 - i * 100} x2={240} y2={H - 60 - i * 100} stroke={INK.wood} strokeWidth={10} />)}
      </svg>
      {LADDER_RUNGS.map((r, i) => <div key={r} style={{ position: 'absolute', left: 280, top: H - 78 - i * 100, fontFamily: DL_MONO, fontSize: 26, color: climb * 4 >= i - 0.2 ? DL.gold : DL.muted, opacity: ease(f, LADDER1 + i * 4, LADDER1 + i * 4 + 8) }}>{r}</div>)}
      <div style={{ position: 'absolute', left: 100, top: H - 180 - climb * 400 }}><Kid size={80} tool="cap" color={DL.text} /></div>
      <div style={{ position: 'absolute', left: 280, top: -70, opacity: ease(f, JOB - 2, JOB + 8), transform: `scale(${ease(f, JOB - 2, JOB + 10, 1.3, 1)})`, transformOrigin: 'left center', fontFamily: DL_MONO, fontWeight: 700, fontSize: 36, color: DL.green }}>↑ A BETTER JOB</div>
    </div>
  );
};

const Sc1948: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const morning = win(f, DOCK - 4, DID - 2, 8, 8);
  const grand = win(f, GRANDAD - 2, SO1, 4, 10);
  const ladderScene = win(f, SO1 - 2, DECEMBER + 8, 4, 10);
  const udhr = win(f, DECEMBER - 6, SO2, 6, 10);
  const recap = win(f, SO2 - 2, DUR + 10, 4, 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, BUT - 2, BUT + 8));
  const rungs = [...schoolRungs(4), { year: '1948', label: f >= RIGHT2 ? 'RIGHT · LADDER' : 'A LADDER', at: CHIP_DOCK + 10 }];
  const bar = (at: number, pct: number) => 640 * pct * ease(f, at - 2, at + 16);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0a1a2a" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1948" idx={5} label="AMERICA" dockAt={DOCK} />
        <WakePlace place="a small American town" at={SMALL} dockAt={DOCK} yearAt={C.at('nineteen', 1)} />
        <AbsoluteFill style={{ opacity: morning }}>
          <div style={{ position: 'absolute', left: 200, top: 300, opacity: ease(f, GRADUATION - 4, GRADUATION + 6) }}><Mortarboard f={f} /></div>
          <div style={{ position: 'absolute', left: 200, top: 240, display: 'flex', gap: 16 }}>
            <Label at={JUNE} color={DL.text} size={32}>JUNE</Label>
            <Label at={GRADUATION} color={DL.gold} size={32}>· GRADUATION DAY</Label>
          </div>
          <svg width={240} height={200} viewBox="0 0 240 200" style={{ position: 'absolute', left: 700, top: 380, opacity: ease(f, IRONING - 2, IRONING + 8) }}>
            <path d="M20 150 Q30 80 120 70 L200 70 Q220 70 220 100 L220 150 Z" fill="#9aa0b0" /><path d="M80 70 Q90 30 150 30 L170 30 L170 70" fill="none" stroke="#5a5f6a" strokeWidth={10} />
            {[0, 1, 2].map((k) => <path key={k} d={`M${70 + k * 40} 60 q 10 -20 0 -40`} stroke="#e8e8e8" strokeWidth={4} fill="none" opacity={0.5 * (0.5 + 0.5 * Math.sin(f / 6 + k))} transform={`translate(0 ${-((f * 0.8 + k * 10) % 20)})`} />)}
          </svg>
          <div style={{ position: 'absolute', left: 700, top: 600 }}><Label at={GOWN} color={DL.warm} size={28}>MUM IRONS YOUR GOWN</Label></div>
          <svg width={300} height={220} viewBox="0 0 300 220" style={{ position: 'absolute', left: 1150, top: 360, opacity: ease(f, RADIOS - 2, RADIOS + 8) }}>
            <rect x={30} y={60} width={220} height={140} rx={24} fill={INK.wood} /><circle cx={100} cy={130} r={40} fill="#3a2a1c" /><rect x={160} y={100} width={70} height={14} fill={DL.gold} /><rect x={160} y={130} width={70} height={14} fill={DL.gold} />
            {[0, 1, 2].map((k) => <path key={k} d={`M${262 + k * 12} ${100 - k * 10} q 16 30 0 60`} stroke={DL.gold} strokeWidth={4} fill="none" opacity={(0.4 + 0.6 * Math.sin(f / 5 - k)) * ease(f, RADIOS, RADIOS + 10)} />)}
          </svg>
          <div style={{ position: 'absolute', left: 1150, top: 600 }}><Label at={RADIOS} color={DL.gold} size={28}>THE RADIO'S ON</Label></div>
        </AbsoluteFill>

        {/* grandad left young; you stay for the diploma */}
        <AbsoluteFill style={{ opacity: grand }}>
          <div style={{ position: 'absolute', left: 200, top: 300, transform: `translateX(${-ease(f, LEFT, WORK + 20, 0, 60)}px)` }}><Kid size={140} adult color="#7a7268" tool="hammer" /></div>
          <div style={{ position: 'absolute', left: 400, top: 360, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Label at={GRANDAD} color={DL.warm} size={32}>YOUR GRANDAD</Label>
            <Label at={LEFT} color={DL.text} size={30}>PROBABLY LEFT SCHOOL YOUNG</Label>
            <Label at={WORK} color={DL.dim} size={28}>TO WORK</Label>
          </div>
          <div style={{ position: 'absolute', left: 1000, top: 300, opacity: ease(f, STAYING - 2, STAYING + 8) }}><Kid size={130} tool="cap" color={DL.gold} /></div>
          <div style={{ position: 'absolute', left: 1180, top: 320, opacity: ease(f, DIPLOMA - 2, DIPLOMA + 8) }}><Scroll size={240} seal /></div>
          <svg width={200} height={260} viewBox="0 0 200 260" style={{ position: 'absolute', left: 1480, top: 300, opacity: ease(f, DOORS - 6, DOORS + 4) }}>
            <rect x={20} y={10} width={160} height={240} fill="#f5e6b0" style={{ filter: `drop-shadow(0 0 30px ${DL.gold})` }} opacity={ease(f, DOORS, DOORS + 12)} />
            <path d={`M20 10 L${20 + 160 * (1 - 0.7 * ease(f, DOORS, DOORS + 14))} ${10 + 20 * ease(f, DOORS, DOORS + 14)} L${20 + 160 * (1 - 0.7 * ease(f, DOORS, DOORS + 14))} ${250 - 20 * ease(f, DOORS, DOORS + 14)} L20 250 Z`} fill={INK.wood} />
          </svg>
          <div style={{ position: 'absolute', left: 1000, top: 640, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Label at={STAYING} color={DL.text} size={30}>YOU STAY TO THE END</Label>
            <Label at={DOORS} color={DL.gold} size={30}>A DIPLOMA OPENS DOORS</Label>
          </div>
        </AbsoluteFill>

        {/* school as a ladder */}
        <AskMark at={SO1} out={LADDER1 + 2} left={260} top={260} size={400} pulseAt={C.at('now', 1)} />
        <div style={{ position: 'absolute', left: 260, top: 330, opacity: ladderScene * ease(f, LADDER1 - 2, LADDER1 + 8) }}><BigLadder f={f} /></div>
        <div style={{ position: 'absolute', left: 1000, top: 520, opacity: ladderScene }}><Label at={CLOSER} color={DL.dim} size={28}>EVERY YEAR YOU CLIMB → CLOSER</Label></div>
        <SchoolChip text="A LADDER" at={LADDER1} dockAt={CHIP_DOCK} slot={4} left={1000} top={330} />

        {/* the Universal Declaration of Human Rights */}
        <AbsoluteFill style={{ opacity: udhr }}>
          <svg width={240} height={240} viewBox="0 0 240 240" style={{ position: 'absolute', left: 200, top: 260, opacity: ease(f, DECEMBER - 2, DECEMBER + 8) }}>
            <circle cx={120} cy={120} r={100} fill="none" stroke={DL.sky} strokeWidth={6} />
            <ellipse cx={120} cy={120} rx={44} ry={100} fill="none" stroke={DL.sky} strokeWidth={4} /><line x1={20} y1={120} x2={220} y2={120} stroke={DL.sky} strokeWidth={4} />
            <path d="M40 70 Q120 90 200 70 M40 170 Q120 150 200 170" fill="none" stroke={DL.sky} strokeWidth={4} />
          </svg>
          <div style={{ position: 'absolute', left: 480, top: 270, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Label at={DECEMBER} color={DL.gold} size={34}>10 DECEMBER 1948<span style={{ opacity: ease(f, PARIS - 2, PARIS + 6) }}> · PARIS</span></Label>
            <Label at={UNITED} color={DL.sky} size={34}>THE UNITED NATIONS</Label>
            <Label at={WORLD} color={DL.text} size={30}>FOR THE WHOLE WORLD</Label>
          </div>
          <div style={{ position: 'absolute', left: 200, top: 540, width: 1300, padding: '28px 36px', borderRadius: 16, background: '#0e0b0af0', border: `1px solid ${DL.border}`, borderLeft: `5px solid ${DL.sky}`, opacity: ease(f, EVERYONE - 4, EVERYONE + 6) }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.dim }}>UNIVERSAL DECLARATION OF HUMAN RIGHTS · ARTICLE 26</div>
            <div style={{ marginTop: 12, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 50, lineHeight: 1.2, color: DL.text }}>
              <span>“Everyone has </span><span style={{ opacity: ease(f, RIGHT1 - 2, RIGHT1 + 6), color: DL.gold }}>the right to education.</span>
              <span style={{ opacity: ease(f, FREE - 2, FREE + 6) }}> Education shall be free,</span><span style={{ opacity: ease(f, YEARS1 - 8, YEARS1 + 4) }}> at least in the elementary and fundamental stages.”</span>
            </div>
          </div>
        </AbsoluteFill>

        {/* recap + cliffhanger: the schools close */}
        <AbsoluteFill style={{ opacity: recap }}>
          <div style={{ position: 'absolute', left: 260, top: 260, display: 'flex', gap: 60, alignItems: 'flex-end' }}>
            <div style={{ textAlign: 'center', opacity: 0.25 + 0.75 * ease(f, RIGHT2 - 2, RIGHT2 + 8) }}><Scroll size={200} /><Label at={RIGHT2} color={DL.sky} size={30}>A RIGHT</Label></div>
            <div style={{ textAlign: 'center', opacity: 0.25 + 0.75 * ease(f, LADDER2 - 2, LADDER2 + 8) }}>
              <svg width={120} height={140} viewBox="0 0 120 140"><line x1={24} y1={0} x2={24} y2={140} stroke={INK.wood} strokeWidth={8} /><line x1={96} y1={0} x2={96} y2={140} stroke={INK.wood} strokeWidth={8} />{[20, 55, 90, 125].map((y) => <line key={y} x1={24} y1={y} x2={96} y2={y} stroke={INK.wood} strokeWidth={7} />)}</svg>
              <Label at={LADDER2} color={DL.gold} size={30}>A LADDER</Label>
            </div>
            <div style={{ textAlign: 'center', opacity: 0.25 + 0.75 * ease(f, BUILDING - 2, BUILDING + 8) }}>
              <SchoolHouse size={200} lit={1 - ease(f, CLOSE - 2, CLOSE + 10)} />
              <Label at={BUILDING} color={DL.text} size={30}>A BUILDING</Label>
              <Label at={MORNING} color={DL.dim} size={26}>EVERY MORNING</Label>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 1180, top: 300, display: 'grid', gridTemplateColumns: 'repeat(4, 110px)', gap: 16, opacity: ease(f, MOST - 2, MOST + 8) }}>
            {Array.from({ length: 12 }, (_, i) => <SchoolHouse key={i} size={110} bell={false} lit={1 - ease(f, CLOSE + i * 2, CLOSE + i * 2 + 6)} />)}
          </div>
          <div style={{ position: 'absolute', left: 1180, top: 660 }}><StampText text="CLOSED" at={ALMOST} size={44} tilt={-6} /></div>
        </AbsoluteFill>

        <SchoolLadder rungs={rungs} show={ladder} />
        <DidYouKnowThat at={DID} out={GRANDAD}>
          <span style={{ opacity: ease(f, TEN1 - 4, TEN1 + 6) }}>in 1910,</span>
          <span style={{ opacity: ease(f, FEWER - 4, FEWER + 6), color: '#ff9a1f', fontStyle: 'italic' }}> fewer than one in five</span>
          <span style={{ opacity: ease(f, TEENAGERS - 4, TEENAGERS + 6) }}> American teenagers</span>
          <span style={{ opacity: ease(f, HIGH - 4, HIGH + 6) }}> went to high school.</span>
          <span style={{ opacity: ease(f, FORTY2 - 4, FORTY2 + 6) }}> By 1940:</span>
          <span style={{ opacity: ease(f, SEVEN - 4, SEVEN + 6), color: '#ff9a1f', fontStyle: 'italic' }}> about seven in ten.</span>
          <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12, fontFamily: DL_MONO, fontSize: 26, color: '#e8e4ff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: ease(f, FIVE - 2, FIVE + 6) }}><span style={{ width: 90 }}>1910</span><div style={{ height: 30, width: bar(FIVE, 0.18), background: '#ff9a1f', borderRadius: 6 }} /><span>18 %</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: ease(f, SEVEN - 2, SEVEN + 6) }}><span style={{ width: 90 }}>1940</span><div style={{ height: 30, width: bar(TEN2, 0.71), background: '#34d058', borderRadius: 6 }} /><span style={{ opacity: ease(f, TEN2 - 2, TEN2 + 6) }}>71 %</span></div>
          </div>
          <div style={{ marginTop: 14, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, FIVE, FIVE + 10) }}>US secondary-school enrolment · Goldin & Katz, NBER WP 10075 (2003)</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="TODAY" parts={[{ text: 'But about seventy years later,', at: BUT }, { text: "most of the world's schools would close.", at: MOST }, { text: 'Almost at once.', at: ALMOST }]} />
      <EpisodeHud year={1948} episode="03" />
    </AbsoluteFill>
  );
};
export default Sc1948;
