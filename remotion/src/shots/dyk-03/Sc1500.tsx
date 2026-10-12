import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import { EpisodeHud, WakePlace, win, SunCliffhanger, SchoolChip, SchoolLadder, Kid, Book, SchoolHouse, Scroll, Label, Source, StampText, INK } from '../../lib/dykkit-school';
import vo from './vo.json';

// =============================================================================
// DYK 03 · 5/14 — ERA 1: 1500, London (RESEARCH F4–F8). Header + "London" on its word; stars on "dark",
// a lit window next door on "Next", the hammer swings from "hammer's"; straw on "straw", smoke on "smoke".
// DYK (F4, Cressy): clauses on their words, source on "historians". "So what is school to you?" = a far,
// closed school house + "?". FOR THE FEW chip (slot 0) on "people." (holds 3.3 s, docks); a priest on
// "priests", a rich boy on "boys", working children on "working". Three day panels: APPRENTICE (F7: ~7 years,
// master's house), GRAMMAR SCHOOL (F6: often from 6 a.m., Latin), PRINCE (F5: Henry, 9, tutor John Skelton);
// "One teacher. One child." = 1 : 1 · "Remember that." = REMEMBER THIS stamp (the debt for 2100).
// Luther 1524 (F8): letter on "writes", schools on "Build", a boy and a girl on "boys"/"girls", the Bible on
// "Bible". Cliffhanger band (farmer's daughter + a ship crossing the ocean). VO sc04 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Sc1500', durationInSeconds: 70.4333, fps: 30, width: 1920, height: 1080 };
const DUR = 2113;

const C = makeCue(vo, 'sc04-1500', 0.8);
const LONDON = C.at('London');
const DOCK = LONDON + 46;
const DARK = C.at('dark');
const NEXT = C.at('Next');
const HAMMER = C.at("hammer's");
const STREET = C.at('street');
const STRAW = C.at('straw');
const SMOKE = C.at('smoke');
const DID = C.at('Did');
const HISTORIANS = C.at('historians');
const ONE_WOMAN = C.at('one', 1);
const HUNDRED1 = C.at('hundred', 2); // 'one woman in a hundred' (1 = 'fifteen hundred,')
const ENGLAND = C.at('England');
const WRITE = C.at('write', 1);
const NAME = C.at('name');
const SO = C.at('So', 1);
const YOU_Q = C.at('you', 3); // 'school to you?' (1 = 'You wake', 2 = 'Did you know')
const PEOPLE = C.at('people');
const CHIP_DOCK = PEOPLE + 100;
const PRIESTS = C.at('priests');
const BOYS = C.at('boys', 1);
const MOST = C.at('Most');
const WORKING = C.at('working');
const CRAFTSMAN = C.at("craftsman's");
const APPRENTICED = C.at('apprenticed');
const SEVEN = C.at('seven');
const MASTERS = C.at("master's");
const LEARNING = C.at('learning');
const LUCKY = C.at('lucky');
const GRAMMAR = C.at('grammar');
const SIX = C.at('six');
const LATIN = C.at('Latin');
const PRINCE_Q = C.at('prince', 1); // 'a prince?' (2 = 'Prince Henry')
const NINE = C.at('Nine');
const HENRY1 = C.at('Henry', 1);
const EIGHTH = C.at('Eighth');
const TEACHER1 = C.at('teacher', 1);
const POET = C.at('poet');
const SKELTON = C.at('Skelton');
const ONE_T = C.at('One', 2); // 'One teacher.' (1 = 'one woman')
const ONE_C = C.at('One', 3); // 'One child.'
const REMEMBER = C.at('Remember');
const IN1524 = C.at('twenty');
const LUTHER = C.at('Luther');
const WRITES = C.at('writes');
const CITIES = C.at('cities');
const BUILD = C.at('Build');
const FOR_BOYS = C.at('boys', 2);
const GIRLS = C.at('girls');
const PARTLY = C.at('Partly');
const BIBLE = C.at('Bible');
const WHY = C.at('Why');
const FARMERS = C.at("farmer's");
const READ_Q = C.at('read', 2); // 'can read?' (1 = 'read the Bible')
const SOON = C.at('Soon');
const COLONY = C.at('colony');
const OCEAN = C.at('ocean');
const WRITE2 = C.at('write', 2);
const LAW = C.at('law');

const PANEL_TOP = 495; // below the docked ladder (its bottom rung ends at y ≈ 484)

// a small 24 h ring with one highlighted arc (illustration)
const MiniRing: React.FC<{ from: number; to: number; color: string; at: number; label: string }> = ({ from, to, color, at, label }) => {
  const f = useCurrentFrame();
  const c = 95, r = 74;
  const p = (h: number) => [c + Math.sin((h / 24) * Math.PI * 2) * r, c - Math.cos((h / 24) * Math.PI * 2) * r];
  const g = ease(f, at, at + 16);
  const end = from + (to - from) * g;
  const [x0, y0] = p(from), [x1, y1] = p(end);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: ease(f, at - 4, at + 6) }}>
      <svg width={190} height={190} viewBox="0 0 190 190">
        <circle cx={c} cy={c} r={r} fill="none" stroke={DL.panel2} strokeWidth={22} />
        {g > 0.01 && <path d={`M${x0} ${y0} A${r} ${r} 0 ${end - from > 12 ? 1 : 0} 1 ${x1} ${y1}`} fill="none" stroke={color} strokeWidth={22} />}
        {[0, 6, 12, 18].map((h) => { const [x, y] = [c + Math.sin((h / 24) * Math.PI * 2) * 42, c - Math.cos((h / 24) * Math.PI * 2) * 42 + 8]; return <text key={h} x={x} y={y} textAnchor="middle" fontFamily={DL_MONO} fontSize={22} fill={DL.muted}>{h}</text>; })}
      </svg>
      <span style={{ fontFamily: DL_MONO, fontSize: 26, color, maxWidth: 190, lineHeight: 1.25 }}>{label}</span>
    </div>
  );
};

const DayPanel: React.FC<{ x: number; at: number; title: string; accent: string; children: React.ReactNode }> = ({ x, at, title, accent, children }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', left: x, top: PANEL_TOP, width: 500, height: 455, boxSizing: 'border-box', padding: '22px 26px', borderRadius: 18, background: '#0e0b0af0', border: `2px solid ${accent}`, opacity: ease(f, at - 4, at + 8), transform: `translateY(${ease(f, at - 4, at + 12, 30, 0)}px)` }}>
      <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: accent }}>{title}</div>
      {children}
    </div>
  );
};

const NightStreet: React.FC<{ f: number }> = ({ f }) => {
  const swing = f >= HAMMER ? Math.sin((f - HAMMER) / 3.2) : 0;
  return (
    <svg width={1600} height={430} viewBox="0 0 1600 430">
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = 40 + i * 260;
        return (
          <g key={i}>
            <rect x={x} y={120} width={200} height={240} fill="#15100b" stroke="#3a2a1c" strokeWidth={3} />
            <path d={`M${x - 14} 124 L${x + 100} 40 L${x + 214} 124 Z`} fill="#120c08" stroke="#3a2a1c" strokeWidth={3} />
            <line x1={x} y1={200} x2={x + 200} y2={200} stroke="#3a2a1c" strokeWidth={4} />
            <rect x={x + 72} y={250} width={56} height={110} fill="#24180f" />
          </g>
        );
      })}
      {/* next door: a lit workshop window, a hammer swinging inside */}
      <rect x={300 + 24} y={140} width={150} height={52} fill="#ffb347" opacity={ease(f, NEXT - 2, NEXT + 10) * (0.8 + 0.1 * Math.sin(f / 3))} />
      <g opacity={ease(f, HAMMER - 2, HAMMER + 6)} transform={`rotate(${-35 + 35 * swing} 400 186)`}><rect x={396} y={146} width={8} height={40} fill="#3a2008" /><rect x={384} y={140} width={32} height={12} fill="#3a2008" /></g>
      <rect x={0} y={360} width={1600} height={70} fill="#0d0907" />
      <rect x={0} y={360} width={1600} height={70} fill="#3a2c1c" opacity={0.6 * ease(f, STREET - 2, STREET + 10)} />
      {/* wet straw on the street */}
      {Array.from({ length: 40 }, (_, i) => <line key={i} x1={20 + i * 40} y1={378 + (i % 3) * 12} x2={44 + i * 40} y2={372 + (i % 4) * 10} stroke="#b89a52" strokeWidth={4} opacity={0.7 * ease(f, STRAW + i * 0.4, STRAW + i * 0.4 + 8)} />)}
    </svg>
  );
};

const Sc1500: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const street = win(f, DOCK, DID - 2, 10, 8);
  const smoke = ease(f, SMOKE - 4, SMOKE + 16) * street;
  const askQ = win(f, SO - 2, PEOPLE + 2, 6, 6);
  const few = win(f, PEOPLE - 2, CRAFTSMAN, 4, 10);
  const panels = win(f, CRAFTSMAN - 4, ONE_T, 4, 8) ;
  const ratio = win(f, ONE_T - 2, IN1524 - 2, 4, 10);
  const luther = win(f, IN1524 - 2, WHY + 2, 6, 10);
  const cliff = ease(f, WHY - 2, WHY + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, WHY - 2, WHY + 8));
  const ship = ease(f, COLONY - 4, LAW, 0, 1, DL_EASE.inOut);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#2a1206" />
      <Vignette />
      <EraExit dur={DUR}>
        {/* stars come out on "dark" */}
        <AbsoluteFill style={{ opacity: ease(f, DARK - 4, DARK + 12) * (1 - ease(f, DID - 6, DID)) }}>
          {[[300, 230], [520, 180], [880, 210], [1180, 170], [1480, 240], [1700, 200], [700, 300], [1350, 320]].map(([x, y], i) => <div key={i} style={{ position: 'absolute', left: x, top: y, width: 5, height: 5, borderRadius: '50%', background: '#e9e1cf', opacity: 0.4 + 0.4 * Math.sin(f / 7 + i) }} />)}
        </AbsoluteFill>
        <EraHeader year="1500" idx={1} label="LONDON" dockAt={DOCK} />
        <WakePlace place="London" at={LONDON} dockAt={DOCK} yearAt={C.at('fifteen', 1)} />
        <div style={{ position: 'absolute', left: 160, top: 470, opacity: street }}><NightStreet f={f} /></div>
        <AbsoluteFill style={{ opacity: smoke }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ position: 'absolute', left: ((f * (1.2 + i * 0.4) + i * 600) % 2300) - 500, top: 540 + i * 90, width: 760, height: 110, borderRadius: '50%', background: 'radial-gradient(ellipse, #b9b1a433, transparent 70%)' }} />)}
        </AbsoluteFill>
        <div style={{ position: 'absolute', left: 160, top: 220, display: 'flex', gap: 18, opacity: street }}>
          <Label at={NEXT} color={DL.warm} size={28}>NEXT DOOR · A HAMMER</Label>
          <Label at={STRAW} color="#d9b866" size={28}>· WET STRAW</Label>
          <Label at={SMOKE} color={DL.dim} size={28}>· WOOD SMOKE</Label>
        </div>

        {/* "So what is school to you?" — a far, closed school house */}
        <AbsoluteFill style={{ opacity: askQ, alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
            <div style={{ opacity: 1 - 0.5 * ease(f, C.at('Something') - 2, C.at('Something') + 10) }}><SchoolHouse size={300} lit={0} /></div>
            <span style={{ fontFamily: DL_SERIF, fontSize: 300, color: DL.gold, opacity: 0.8, display: 'inline-block', transform: `scale(${1 + 0.12 * ease(f, YOU_Q, YOU_Q + 5) * (1 - ease(f, YOU_Q + 8, YOU_Q + 24))})` }}>?</span>
          </div>
        </AbsoluteFill>
        {/* for other people: priests, rich boys — most children learn by working */}
        <AbsoluteFill style={{ opacity: few }}>
          <div style={{ position: 'absolute', left: 160, top: 220, display: 'flex', alignItems: 'flex-end', gap: 50 }}>
            <div style={{ opacity: ease(f, PRIESTS - 2, PRIESTS + 8), textAlign: 'center' }}><Kid size={120} adult color="#4a4458" /><Label at={PRIESTS} color={DL.text}>PRIESTS</Label></div>
            <div style={{ opacity: ease(f, BOYS - 2, BOYS + 8), textAlign: 'center' }}><Kid size={110} tool="cap" color={DL.gold} /><Label at={BOYS} color={DL.gold}>RICH BOYS</Label></div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 560, display: 'flex', gap: 28, alignItems: 'flex-end', opacity: ease(f, MOST - 2, MOST + 8) }}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => <div key={i} style={{ opacity: ease(f, MOST + i * 4, MOST + i * 4 + 6) }}><Kid size={90} tool="hammer" color={DL.warm} girl={i % 3 === 1} /></div>)}
          </div>
          <div style={{ position: 'absolute', left: 160, top: 820 }}><Label at={WORKING} color={DL.warm} size={30}>MOST CHILDREN · LEARN BY WORKING</Label></div>
        </AbsoluteFill>
        <SchoolChip text="FOR THE FEW" at={PEOPLE} dockAt={CHIP_DOCK} slot={0} left={1000} top={560} />

        {/* three ways to learn in 1500 */}
        <AbsoluteFill style={{ opacity: panels }}>
          <div style={{ position: 'absolute', left: 160, top: 240, width: 1100 }}><Label at={CRAFTSMAN} color={DL.dim} size={30}>A DAY OF LEARNING · ILLUSTRATION, BASED ON HISTORICAL ACCOUNTS</Label></div>
          <DayPanel x={160} at={CRAFTSMAN} title="APPRENTICE" accent={DL.warm}>
            <div style={{ display: 'flex', gap: 18, marginTop: 16, alignItems: 'flex-end' }}>
              <Kid size={70} tool="hammer" />
              <MiniRing from={6} to={19} color={DL.warm} at={APPRENTICED} label="AT THE BENCH, DAWN TO DUSK" />
            </div>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Label at={SEVEN} color={DL.gold} size={28}>USUALLY ~7 YEARS</Label>
              <Label at={MASTERS} color={DL.text} size={26}>LIVING IN YOUR MASTER'S HOUSE</Label>
              <Label at={LEARNING} color={DL.dim} size={26}>LEARN BY DOING</Label>
            </div>
          </DayPanel>
          <DayPanel x={700} at={LUCKY} title="GRAMMAR SCHOOL" accent={DL.sky}>
            <div style={{ display: 'flex', gap: 18, marginTop: 16, alignItems: 'flex-end' }}>
              <Kid size={70} tool="book" />
              <MiniRing from={6} to={17} color={DL.sky} at={SIX} label="LESSONS OFTEN FROM 6 A.M." />
            </div>
            <div style={{ marginTop: 18 }}><StampText text="IN LATIN" at={LATIN} color={DL.sky} size={36} tilt={-3} /></div>
            <Source at={LATIN} style={{ marginTop: 16 }}>hours varied by school · Orme · Mary Rose Trust</Source>
          </DayPanel>
          <DayPanel x={1240} at={PRINCE_Q} title="A PRINCE" accent={DL.gold}>
            <div style={{ display: 'flex', gap: 24, marginTop: 14, alignItems: 'flex-end' }}>
              <div style={{ opacity: ease(f, NINE - 2, NINE + 8) }}><Kid size={80} tool="crown" color={DL.gold} /></div>
              <div style={{ opacity: ease(f, TEACHER1 - 2, TEACHER1 + 8) }}><Kid size={90} adult color="#8a7ab0" /></div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Label at={HENRY1} color={DL.gold} size={28}>PRINCE HENRY · AGE 9</Label>
              <Label at={EIGHTH} color={DL.dim} size={24}>THE FUTURE HENRY VIII</Label>
              <Label at={TEACHER1} color={DL.text} size={26}>A TEACHER ALL TO HIMSELF</Label>
              <Label at={POET} color="#b9a8e8" size={26}>THE POET<span style={{ opacity: ease(f, SKELTON - 2, SKELTON + 6) }}> JOHN SKELTON</span></Label>
            </div>
          </DayPanel>
        </AbsoluteFill>
        {/* One teacher. One child. Remember that. */}
        <AbsoluteFill style={{ opacity: ratio, alignItems: 'center', justifyContent: 'center', paddingRight: 520 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 70 }}>
            <div style={{ textAlign: 'center', opacity: ease(f, ONE_T - 2, ONE_T + 6) }}><Kid size={170} adult color="#8a7ab0" /><div style={{ fontFamily: DL_MONO, fontSize: 32, letterSpacing: 4, color: DL.text }}>ONE TEACHER</div></div>
            <div style={{ fontFamily: DL_SERIF, fontSize: 200, color: DL.gold, opacity: ease(f, ONE_C - 2, ONE_C + 6) }}>1 : 1</div>
            <div style={{ textAlign: 'center', opacity: ease(f, ONE_C - 2, ONE_C + 6) }}><Kid size={140} tool="crown" color={DL.gold} /><div style={{ fontFamily: DL_MONO, fontSize: 32, letterSpacing: 4, color: DL.gold }}>ONE CHILD</div></div>
          </div>
          <div style={{ marginTop: 50 }}><StampText text="REMEMBER THIS" at={REMEMBER} color={DL.red} size={44} /></div>
        </AbsoluteFill>

        {/* Luther, 1524 */}
        <AbsoluteFill style={{ opacity: luther }}>
          <div style={{ position: 'absolute', left: 160, top: 220, display: 'flex', alignItems: 'center', gap: 34 }}>
            <div style={{ opacity: ease(f, WRITES - 2, WRITES + 8), transform: `rotate(${-4 * ease(f, WRITES, WRITES + 12)}deg)` }}><Scroll size={260} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ ...rise(f, IN1524 - 2), fontFamily: DL_SERIF, fontSize: 90, color: DL.gold, lineHeight: 1 }}>1524</div>
              <Label at={C.at('rebel')} color={DL.dim} size={26}>A REBEL PREACHER</Label>
              <div style={{ ...rise(f, LUTHER - 2), fontFamily: DL_SERIF, fontSize: 64, color: DL.text }}>Martin Luther</div>
              <Label at={CITIES} color={DL.warm} size={26}>WRITES TO THE LEADERS OF GERMAN CITIES</Label>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 560, display: 'flex', alignItems: 'flex-end', gap: 30 }}>
            {[0, 1, 2].map((i) => <div key={i} style={{ opacity: ease(f, BUILD + i * 5, BUILD + i * 5 + 8), transform: `translateY(${ease(f, BUILD + i * 5, BUILD + i * 5 + 10, 20, 0)}px)` }}><SchoolHouse size={170} /></div>)}
            <div style={{ marginLeft: 30, display: 'flex', gap: 24, alignItems: 'flex-end' }}>
              <div style={{ textAlign: 'center', opacity: ease(f, FOR_BOYS - 2, FOR_BOYS + 8) }}><Kid size={100} /><Label at={FOR_BOYS} color={DL.text}>BOYS</Label></div>
              <div style={{ textAlign: 'center', opacity: ease(f, GIRLS - 2, GIRLS + 8) }}><Kid size={100} girl color={DL.gold} /><Label at={GIRLS} color={DL.gold}>& GIRLS</Label></div>
            </div>
            <div style={{ marginLeft: 30, textAlign: 'center', opacity: ease(f, PARTLY - 2, PARTLY + 8) }}><Book size={190} open={ease(f, BIBLE - 8, BIBLE + 4, 0.3, 1)} /><Label at={BIBLE} color={DL.gold} size={26}>PARTLY: TO READ THE BIBLE</Label></div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 900 }}><Source at={BUILD}>Luther, To the Councilmen of All Cities in Germany… (1524)</Source></div>
        </AbsoluteFill>

        {/* cliffhanger visual: a farmer's daughter with a book; a ship crossing the ocean */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 260, top: 300, display: 'flex', alignItems: 'flex-end', gap: 20, opacity: ease(f, FARMERS - 2, FARMERS + 8) }}>
            <Kid size={150} girl color={DL.warm} tool={f >= READ_Q ? 'book' : 'none'} />
            <span style={{ fontFamily: DL_SERIF, fontSize: 180, color: DL.gold, opacity: ease(f, READ_Q - 2, READ_Q + 6) }}>?</span>
          </div>
          <svg width={900} height={300} viewBox="0 0 900 300" style={{ position: 'absolute', left: 860, top: 330, opacity: ease(f, SOON - 4, SOON + 6) }}>
            {[0, 1, 2, 3].map((k) => <path key={k} d={`M0 ${200 + k * 22} q 56 -16 112 0 t 112 0 t 112 0 t 112 0 t 112 0 t 112 0 t 112 0 t 112 0`} stroke="#2f6f9f" strokeWidth={4} fill="none" opacity={0.6} transform={`translate(${-((f * 1.5 + k * 40) % 224)} 0)`} />)}
            <g transform={`translate(${60 + 640 * ship} ${150 + 6 * Math.sin(f / 9)})`} opacity={ease(f, COLONY - 4, COLONY + 6)}>
              <path d="M0 40 L120 40 L100 64 L18 64 Z" fill={INK.wood} />
              <line x1={60} y1={40} x2={60} y2={-40} stroke={INK.woodDark} strokeWidth={5} />
              <path d="M62 -36 L110 28 L62 28 Z" fill={INK.paper} /><path d="M58 -30 L18 28 L58 28 Z" fill={INK.paper} opacity={0.85} />
            </g>
            <text x={820} y={120} textAnchor="end" fontFamily={DL_MONO} fontSize={26} fill={DL.dim} opacity={ease(f, OCEAN - 2, OCEAN + 8)}>ACROSS THE OCEAN →</text>
          </svg>
        </AbsoluteFill>

        <SchoolLadder rungs={[{ year: '1500', label: 'FOR THE FEW', at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={SO}>
          <span style={{ opacity: ease(f, HISTORIANS - 4, HISTORIANS + 6) }}>historians estimate</span>{' '}
          <span style={{ opacity: ease(f, ONE_WOMAN - 4, ONE_WOMAN + 6), color: '#ff9a1f', fontStyle: 'italic' }}>only about one woman</span>
          <span style={{ opacity: ease(f, HUNDRED1 - 4, HUNDRED1 + 6), color: '#ff9a1f', fontStyle: 'italic' }}> in a hundred</span>
          <span style={{ opacity: ease(f, ENGLAND - 4, ENGLAND + 6) }}> in England</span>
          <span style={{ opacity: ease(f, WRITE - 4, WRITE + 6) }}> could even write</span>
          <span style={{ opacity: ease(f, NAME - 4, NAME + 6) }}> her own name.</span>
          <div style={{ marginTop: 22, fontFamily: DL_MONO, fontSize: 24, lineHeight: 1.3, color: '#c8cdf0', opacity: ease(f, HISTORIANS, HISTORIANS + 10) }}>Cressy, Literacy and the Social Order (1980) · signatures, so it measures writing, not reading</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1647" parts={[{ text: 'Why would a whole town care', at: WHY }, { text: "if a farmer's daughter can read?", at: FARMERS }, { text: 'Soon, a colony across the ocean', at: SOON }, { text: 'will write it into law.', at: WRITE2 }]} />
      <EpisodeHud year={1500} episode="03" />
    </AbsoluteFill>
  );
};
export default Sc1500;
