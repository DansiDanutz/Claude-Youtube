import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, SiteBg } from '../../lib/danslab';
import { DYT } from '../../lib/dytbrand';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette } from '../../lib/dykkit';
import { EpisodeHud, WakePlace, win, SchoolLadder, schoolRungs, Kid, Coin, Screen, SchoolHouse, Label, Source, StampText, QGRAD } from '../../lib/dykkit-school';
import vo from './vo.json';

// =============================================================================
// DYK 03 · 12/14 — ERA 7: 2100, PREDICTION (RESEARCH F21, F22, F24, F25). Opens on the answer's ladder (full, dim);
// the dashed "?" rung appears on "rung?"; YOU WAKE UP IN · 2100 slams on "hundred" and the ladder docks with it;
// PREDICTION · A SCENARIO, NOT A FACT from the slam. An unrisen dawn on "morning"; an evidence trail on "evidence".
// Evidence 1 (F21): the 1500 prince + tutor return on "Remember"; Bloom 1984 — a bell curve, the tutored marker at
// 98 % on "ninety"; "Later studies found the effect is smaller" slides it back (~0.3–0.8 SD), BUT IT'S REAL; COST;
// one tutor, many children. Evidence 2 (F22): Nigeria pin, AI tutor, twice a week, teachers guiding; 6 WEEKS ≈ NEARLY
// 2 YEARS (World Bank estimate, ~0.3 SD); ONE SMALL STUDY · SHORT · A START. Scenario (labelled): every child with a
// tutor; NOT A PRINCE'S POET; a patient machine awake at 03:00. The classroom: OECD's four scenarios (to 2040, not
// forecasts) — LEARNING HUBS lights on "hub", the last door fades on "fades"; UNESCO protects the school, its line
// quoted on "invent". Callback: a private teacher for a prince | for everyone? — the 2100 rung fills A TUTOR FOR ALL?
// on "everyone"; σχολή = FREE TIME? on "meant". VO sc11 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Sc2100', durationInSeconds: 79.9667, fps: 30, width: 1920, height: 1080 };
const DUR = 2399;

const C = makeCue(vo, 'sc11-2100', 0.8);
const RUNG = C.at('rung');
const TWENTY1 = C.at('twenty', 1);
const HUNDRED1 = C.at('hundred', 1);
const MORNING = C.at('morning');
const BUT1 = C.at('But', 1);
const EVIDENCE = C.at('evidence');
const REMEMBER = C.at('Remember');
const ONE_T = C.at('One', 2); // 'One teacher, one child.' (1 = 'Twenty one hundred')
const ONE_C = C.at('one', 3);
const EIGHTY = C.at('eighty');
const BLOOM = C.at('Bloom');
const TUTORED = C.at('tutored');
const NINETY = C.at('ninety');
const NORMAL = C.at('normal');
const LATER = C.at('Later');
const SMALLER = C.at('smaller');
const REAL = C.at('real');
const PROBLEM = C.at('problem');
const COST = C.at('cost');
const NOBODY = C.at('Nobody');
const CHILD2 = C.at('child', 2); // 'a tutor for every child.'
const THEN = C.at('Then');
const TWENTY2 = C.at('twenty', 2); // 'in twenty twenty four'
const PILOT = C.at('pilot');
const NIGERIA = C.at('Nigeria');
const AI = C.at('AI');
const TWICE = C.at('twice');
const TEACHERS = C.at('teachers');
const GUIDING = C.at('guiding');
const SIX = C.at('six');
const ESTIMATED = C.at('estimated');
const NEARLY = C.at('nearly');
const LEARNING1 = C.at('learning', 1);
const SMALL = C.at('small');
const SHORT = C.at('Short');
const START = C.at('start');
const SO2 = C.at('So', 2); // "So here's one scenario."
const SCENARIO = C.at('scenario');
const FACT = C.at('fact');
const EVERY2 = C.at('every', 2); // 'every child could have a tutor'
const TUTOR4 = C.at('tutor', 4);
const NOT2 = C.at('Not', 2); // "Not a prince's poet."
const POET = C.at('poet');
const PATIENT = C.at('patient');
const AWAKE = C.at('awake');
const HOUR = C.at('hour');
const CLASSROOM = C.at('classroom');
const OECD = C.at('O');
const IMAGINED = C.at('imagined');
const HUB = C.at('hub');
const FADES = C.at('fades');
const UNESCO = C.at('UNESCO');
const PROTECTED = C.at('protected');
const EXIST = C.at('exist');
const INVENT = C.at('invent');
const FIFTEEN = C.at('fifteen');
const PRIVATE = C.at('private');
const PRINCE = C.at('prince', 2); // 'for a prince.' (1 = 'Prince Henry's')
const TWENTY5 = C.at('twenty', 5); // 'In twenty one hundred, it might be for everyone.'
const EVERYONE = C.at('everyone');
const SCHOOL2 = C.at('school', 2); // 'And school might get a little closer'
const NAME = C.at('name');
const MEANT = C.at('meant');

const ORB = '#8fd3ff';
const Orb: React.FC<{ f: number; size?: number; phase?: number }> = ({ f, size = 50, phase = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" style={{ overflow: 'visible', filter: `drop-shadow(0 0 ${size / 4}px ${ORB})`, transform: `translateY(${4 * Math.sin(f / 10 + phase)}px)` }}><circle cx={25} cy={25} r={18} fill={`${ORB}44`} stroke={ORB} strokeWidth={3} /></svg>
);

// a normal distribution; the marker sits at `sd` standard deviations
const BellCurve: React.FC<{ f: number }> = ({ f }) => {
  const W = 900, H = 300, cx = W / 2, sx = 150;
  const pts = Array.from({ length: 121 }, (_, i) => { const z = -3 + i * 0.05; return `${cx + z * sx},${H - 20 - 240 * Math.exp(-z * z / 2)}`; }).join(' ');
  const sd = 2 * ease(f, TUTORED - 2, NINETY + 6, 0, 1, DL_EASE.inOut) - 1.6 * ease(f, LATER, SMALLER + 10, 0, 1, DL_EASE.inOut);
  const mx = cx + sd * sx;
  return (
    <svg width={W} height={H + 40} viewBox={`0 0 ${W} ${H + 40}`}>
      <polyline points={pts} fill="none" stroke={DL.dim} strokeWidth={4} />
      <line x1={cx} y1={H - 20} x2={cx} y2={30} stroke={DL.muted} strokeWidth={2} strokeDasharray="6 8" />
      <text x={cx} y={H + 20} textAnchor="middle" fontFamily={DL_MONO} fontSize={24} fill={DL.muted}>NORMAL CLASS · AVERAGE</text>
      <g opacity={ease(f, TUTORED - 2, TUTORED + 6)}>
        <line x1={mx} y1={H - 20} x2={mx} y2={40} stroke={DL.gold} strokeWidth={6} />
        <circle cx={mx} cy={40} r={12} fill={DL.gold} />
        <text x={mx + 18} y={60} fontFamily={DL_MONO} fontSize={26} fill={DL.gold}>TUTORED</text>
      </g>
    </svg>
  );
};

const PrinceTutor: React.FC<{ size?: number }> = ({ size = 1 }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20 * size }}>
    <Kid size={110 * size} adult color="#8a7ab0" /><Kid size={90 * size} tool="crown" color={DL.gold} />
  </div>
);

const Sc2100: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const fullLadder = 0.6 * (1 - ease(f, TWENTY1 - 4, HUNDRED1 - 2));
  const dockLadder = ease(f, BUT1 + 4, BUT1 + 14) * (1 - ease(f, REMEMBER - 6, REMEMBER + 2)) + ease(f, FIFTEEN - 4, FIFTEEN + 8);
  const opening = win(f, MORNING - 4, REMEMBER - 2, 8, 8);
  const ev1 = win(f, REMEMBER - 2, THEN, 6, 10);
  const ev2 = win(f, THEN - 2, SO2, 4, 10);
  const scen = win(f, SO2 - 2, CLASSROOM - 4, 4, 10);
  const room = win(f, CLASSROOM - 6, FIFTEEN - 2, 6, 10);
  const call = ease(f, FIFTEEN - 2, FIFTEEN + 10);
  const tagPulse = ease(f, SCENARIO, SCENARIO + 5) * (1 - ease(f, SCENARIO + 8, SCENARIO + 22));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0a1626" />
      <Vignette />
      {/* the answer's ladder, then the docked ladder with the dashed 2100 rung */}
      <SchoolLadder rungs={schoolRungs(6)} show={fullLadder} mode="full" litAt={[-1, -1, -1, -1, -1, -1]} />
      <div style={{ position: 'absolute', left: 160, top: 170 + 34, width: 900, height: 82, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px', borderRadius: 14, border: `3px dashed ${DL.red}`, background: '#0e0b0ae6', opacity: (fullLadder / 0.6) * ease(f, RUNG - 2, RUNG + 10), fontFamily: DL_MONO, fontWeight: 700, fontSize: 44, color: DL.red }}>? · ?</div>
      <SchoolLadder rungs={schoolRungs(6)} show={Math.min(1, dockLadder)} next={{ at: 0, fillAt: EVERYONE, fill: 'A TUTOR FOR ALL?' }} />
      <Sequence from={HUNDRED1} layout="none">
        <EraHeader year="2100" idx={7} label="PREDICTION" dockAt={BUT1 - HUNDRED1} />
        <WakePlace place="" at={0} dockAt={BUT1 - HUNDRED1} />
      </Sequence>
      <div style={{ ...rise(f, HUNDRED1 + 4), position: 'absolute', left: 160, top: 166, display: 'flex', alignItems: 'center', gap: 16, fontFamily: DL_MONO, fontSize: 30, letterSpacing: 4, color: DL.red, transformOrigin: 'left center', scale: `${1 + 0.12 * tagPulse}` }}>
        <div style={{ width: 14, height: 14, borderRadius: 3, border: `2px dashed ${DL.red}` }} />
        PREDICTION · A SCENARIO, NOT A FACT
      </div>

      {/* that morning hasn't happened yet — follow the evidence */}
      <AbsoluteFill style={{ opacity: opening }}>
        <div style={{ position: 'absolute', left: 160, right: 660, top: 640, height: 3, background: `linear-gradient(90deg, transparent, ${DL.red}aa, transparent)` }} />
        <svg width={240} height={130} viewBox="0 0 240 130" style={{ position: 'absolute', left: 500, top: 520 }}><path d="M10 120 A110 110 0 0 1 230 120" fill="none" stroke={DL.red} strokeWidth={4} strokeDasharray="12 10" /></svg>
        <div style={{ position: 'absolute', left: 420, top: 680 }}><Label at={MORNING} color={DL.dim} size={30}>THAT MORNING HASN'T HAPPENED YET</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 800, display: 'flex', gap: 30 }}>
          {Array.from({ length: 12 }, (_, i) => <div key={i} style={{ width: 22, height: 12, borderRadius: 6, background: DL.gold, opacity: ease(f, EVIDENCE - 6 + i * 2, EVIDENCE + i * 2 + 2) * 0.8, transform: `translateY(${i % 2 ? 10 : 0}px)` }} />)}
          <div style={{ marginLeft: 20 }}><Label at={EVIDENCE} color={DL.gold} size={30}>FOLLOW THE EVIDENCE →</Label></div>
        </div>
      </AbsoluteFill>

      {/* evidence 1: tutoring works — Bloom 1984, smaller later */}
      <AbsoluteFill style={{ opacity: ev1 }}>
        <div style={{ position: 'absolute', left: 160, top: 260, padding: '20px 26px', borderRadius: 16, background: '#0e0b0af0', border: `2px solid ${DL.gold}`, opacity: ease(f, REMEMBER - 2, REMEMBER + 8), boxShadow: `0 0 ${36 * ease(f, C.at('tutor', 1), C.at('tutor', 1) + 5) * (1 - ease(f, C.at('tutor', 1) + 8, C.at('tutor', 1) + 30))}px ${DL.gold}` }}>
          <PrinceTutor />
          <div style={{ marginTop: 10, fontFamily: DL_MONO, fontSize: 26, color: DL.gold }}>1500 · <span style={{ opacity: ease(f, ONE_T - 2, ONE_T + 6) }}>ONE TEACHER,</span><span style={{ opacity: ease(f, ONE_C - 2, ONE_C + 6) }}> ONE CHILD</span></div>
        </div>
        <div style={{ position: 'absolute', left: 620, top: 250, opacity: ease(f, EIGHTY - 4, EIGHTY + 8) }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.text }}>1984 · <span style={{ opacity: ease(f, C.at('researcher') - 2, C.at('researcher') + 6) }}>AN AMERICAN RESEARCHER · </span><span style={{ opacity: ease(f, BLOOM - 2, BLOOM + 6), color: DL.gold }}>BENJAMIN BLOOM</span></div>
          <BellCurve f={f} />
        </div>
        <div style={{ position: 'absolute', left: 620, top: 640, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Label at={NINETY} color={DL.gold} size={30}>TUTORED STUDENTS BEAT 98 % OF A <span style={{ opacity: ease(f, NORMAL - 2, NORMAL + 6) }}>NORMAL CLASS</span></Label>
          <Label at={LATER} color={DL.sky} size={30}>LATER STUDIES: <span style={{ opacity: ease(f, SMALLER - 2, SMALLER + 6) }}>A SMALLER EFFECT (~0.3–0.8 SD)</span></Label>
          <div style={{ display: 'flex', gap: 20 }}><StampText text="BUT IT'S REAL" at={REAL} color={DL.green} size={30} tilt={-2} /></div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 560, display: 'flex', flexDirection: 'column', gap: 14, opacity: ease(f, PROBLEM - 2, PROBLEM + 8) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Coin size={64} /><Label at={COST} color={DL.red} size={32}>THE PROBLEM: COST</Label></div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, opacity: ease(f, NOBODY - 2, NOBODY + 8) }}>
            <Kid size={70} adult color="#8a7ab0" />{Array.from({ length: 6 }, (_, i) => <Kid key={i} size={46} girl={i % 2 === 0} />)}
          </div>
          <div style={{ maxWidth: 430 }}><Label at={NOBODY} color={DL.dim} size={24}>NO ONE CAN PAY A TUTOR <span style={{ opacity: ease(f, CHILD2 - 2, CHILD2 + 6) }}>FOR EVERY CHILD</span></Label></div>
        </div>
        <div style={{ position: 'absolute', left: 620, top: 860 }}><Source at={LATER}>Bloom, “The 2 Sigma Problem” (1984) · meta-analyses: Nickow et al. 2020 (~0.37 SD), VanLehn 2011</Source></div>
      </AbsoluteFill>

      {/* evidence 2: an AI tutor pilot in Nigeria */}
      <AbsoluteFill style={{ opacity: ev2 }}>
        <div style={{ position: 'absolute', left: 160, top: 260, display: 'flex', alignItems: 'center', gap: 20, opacity: ease(f, TWENTY2 - 4, TWENTY2 + 6) }}>
          <svg width={60} height={80} viewBox="0 0 60 80" style={{ opacity: ease(f, NIGERIA - 4, NIGERIA + 6) }}><path d="M30 78 C10 50 4 38 4 28 A26 26 0 0 1 56 28 C56 38 50 50 30 78 Z" fill={DL.red} /><circle cx={30} cy={28} r={10} fill={DL.bg} /></svg>
          <div><div style={{ fontFamily: DL_SERIF, fontSize: 64, color: DL.text }}>2024<span style={{ opacity: ease(f, NIGERIA - 2, NIGERIA + 6) }}> · Nigeria</span></div><div style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.dim, opacity: ease(f, PILOT - 4, PILOT + 6) }}>A WORLD BANK PILOT<span style={{ opacity: ease(f, NIGERIA - 2, NIGERIA + 6) }}> · EDO STATE</span></div></div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 450, display: 'flex', alignItems: 'flex-end', gap: 26 }}>
          <div style={{ opacity: ease(f, AI - 2, AI + 8) }}><Screen size={220} on={1} /></div>
          <div style={{ opacity: ease(f, AI - 2, AI + 8) }}><Kid size={90} tool="book" /></div>
          <div style={{ opacity: ease(f, TEACHERS - 2, TEACHERS + 8) }}><Kid size={110} adult color="#7aa0e0" /></div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 690, display: 'flex', gap: 18 }}>
          <Label at={AI} color={ORB} size={28}>AN AI TUTOR</Label>
          <Label at={TWICE} color={DL.text} size={28}>· TWICE A WEEK</Label>
          <Label at={GUIDING} color="#7aa0e0" size={28}>· TEACHERS GUIDING</Label>
        </div>
        <div style={{ position: 'absolute', left: 900, top: 380, boxSizing: 'border-box', padding: '26px 32px', borderRadius: 16, background: '#0e0b0af0', border: `2px solid ${DL.green}`, opacity: ease(f, SIX - 4, SIX + 6), width: 860 }}>
          <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 46, color: DL.text, whiteSpace: 'nowrap' }}>6 WEEKS <span style={{ color: DL.green, opacity: ease(f, NEARLY - 2, NEARLY + 6) }}>≈ NEARLY 2 YEARS</span></div>
          <div style={{ marginTop: 8, fontFamily: DL_MONO, fontSize: 28, color: DL.dim, opacity: ease(f, LEARNING1 - 4, LEARNING1 + 6) }}>OF TYPICAL LEARNING</div>
          <div style={{ marginTop: 12, fontFamily: DL_MONO, fontSize: 26, color: DL.gold, opacity: ease(f, ESTIMATED - 2, ESTIMATED + 6) }}>THE WORLD BANK'S ESTIMATE · ~0.3 SD</div>
        </div>
        <div style={{ position: 'absolute', left: 1000, top: 620, display: 'flex', gap: 18, alignItems: 'center' }}>
          <StampText text="ONE SMALL STUDY" at={SMALL} size={30} tilt={-3} />
          <StampText text="SHORT" at={SHORT} size={30} tilt={2} />
          <StampText text="A START" at={START} color={DL.green} size={30} tilt={-2} />
        </div>
        <div style={{ position: 'absolute', left: 160, top: 860 }}><Source at={SIX}>World Bank, “From chalkboards to chatbots” (2025) · De Simone et al., WP 11125</Source></div>
      </AbsoluteFill>

      {/* the scenario (labelled) */}
      <AbsoluteFill style={{ opacity: scen }}>
        <div style={{ position: 'absolute', left: 160, top: 250 }}><StampText text="SCENARIO · NOT A FACT" at={SCENARIO} color={DL.red} size={36} tilt={0} /></div>
        <div style={{ position: 'absolute', left: 160, top: 400, display: 'flex', gap: 34, alignItems: 'flex-end' }}>
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 4, opacity: 0.25 + 0.75 * ease(f, EVERY2 + i * 3, EVERY2 + i * 3 + 8) }}>
              <Kid size={80} girl={i % 2 === 1} color={DL.warm} />
              <div style={{ opacity: ease(f, TUTOR4 - 2 + i * 2, TUTOR4 + 6 + i * 2) }}><Orb f={f} phase={i} /></div>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 160, top: 580 }}><Label at={C.at('hundred', 2)} color={ORB} size={32}>BY 2100, <span style={{ opacity: ease(f, TUTOR4 - 2, TUTOR4 + 6) }}>EVERY CHILD COULD HAVE A TUTOR</span></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 660, display: 'flex', alignItems: 'center', gap: 24, opacity: ease(f, NOT2 - 2, NOT2 + 8) }}>
          <div style={{ position: 'relative', opacity: 0.6 }}><PrinceTutor size={0.6} /><svg width={170} height={110} viewBox="0 0 170 110" style={{ position: 'absolute', left: 0, top: 0 }}><line x1={10} y1={10} x2={160} y2={100} stroke={DL.red} strokeWidth={6} opacity={ease(f, POET - 2, POET + 6)} /></svg></div>
          <Label at={NOT2} color={DL.dim} size={30}>NOT A PRINCE'S POET</Label>
        </div>
        <div style={{ position: 'absolute', left: 1100, top: 620, display: 'flex', alignItems: 'center', gap: 22, opacity: ease(f, PATIENT - 2, PATIENT + 8) }}>
          <Orb f={f} size={90} />
          <div>
            <Label at={PATIENT} color={ORB} size={30}>A PATIENT MACHINE</Label>
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 60, color: DL.text, opacity: ease(f, AWAKE - 2, AWAKE + 6) }}>03:00<span style={{ fontSize: 28, color: DL.dim, opacity: ease(f, HOUR - 2, HOUR + 6) }}> · AWAKE AT ANY HOUR</span></div>
          </div>
        </div>
      </AbsoluteFill>

      {/* will the classroom exist? OECD scenarios + UNESCO */}
      <AbsoluteFill style={{ opacity: room }}>
        <div style={{ position: 'absolute', left: 160, top: 290, display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ position: 'relative', opacity: ease(f, CLASSROOM - 4, CLASSROOM + 6) }}>
            <SchoolHouse size={220} />
            <svg width={300} height={300} viewBox="0 0 300 300" style={{ position: 'absolute', left: -40, top: -60, opacity: ease(f, PROTECTED - 2, PROTECTED + 10) }}><path d="M150 10 L280 60 L270 170 Q240 250 150 290 Q60 250 30 170 L20 60 Z" fill="none" stroke={DL.green} strokeWidth={8} style={{ filter: `drop-shadow(0 0 16px ${DL.green})` }} /></svg>
          </div>
          <Label at={CLASSROOM} color={DL.text} size={34}>AND THE CLASSROOM?</Label>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 590, display: 'flex', gap: 20 }}>
          {(['SCHOOLING EXTENDED', 'EDUCATION OUTSOURCED', 'SCHOOLS AS LEARNING HUBS', 'LEARN-AS-YOU-GO']).map((t, i) => {
            const hot = (i === 2 && f >= C.at('school', 1)) || (i === 3 && f >= FADES - 4);
            const gone = i === 3 ? ease(f, FADES, FADES + 20) : 0;
            return <div key={t} style={{ width: 340, height: 150, boxSizing: 'border-box', padding: 16, borderRadius: 12, border: `3px solid ${hot ? (i === 2 ? DL.gold : DL.muted) : DL.border}`, background: '#0e0b0ae6', opacity: ease(f, OECD + i * 6, OECD + i * 6 + 8) * (1 - 0.75 * gone), display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: DL_MONO, fontSize: 26, color: hot && i === 2 ? DL.gold : DL.text, boxShadow: hot && i === 2 ? `0 0 26px ${DL.gold}66` : undefined }}>{t}</div>;
          })}
        </div>
        <div style={{ position: 'absolute', left: 160, top: 530 }}><Label at={IMAGINED} color={DL.dim} size={26}>OECD · FOUR SCENARIOS FOR SCHOOLING (2020) · TO 2040 · NOT FORECASTS</Label></div>
        <div style={{ position: 'absolute', left: 880, top: 270, width: 880, padding: '24px 30px', borderRadius: 16, background: '#0e0b0af0', border: `1px solid ${DL.border}`, borderLeft: `5px solid ${DL.green}`, opacity: ease(f, UNESCO - 2, UNESCO + 8) }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.dim }}>UNESCO · REIMAGINING OUR FUTURES TOGETHER (2021)</div>
          <div style={{ marginTop: 10, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, lineHeight: 1.2, color: DL.text }}>
            <span style={{ opacity: ease(f, PROTECTED - 2, PROTECTED + 6) }}>“Schools should be protected…”</span>
            <span style={{ opacity: ease(f, EXIST - 2, EXIST + 6), color: DL.green }}> “If schools did not exist we would need to <span style={{ opacity: ease(f, INVENT - 2, INVENT + 6) }}>invent them.”</span></span>
          </div>
        </div>
      </AbsoluteFill>

      {/* callback: a private teacher for a prince → for everyone? */}
      <AbsoluteFill style={{ opacity: call }}>
        <div style={{ position: 'absolute', left: 160, top: 560, width: 520, height: 330, boxSizing: 'border-box', padding: 26, borderRadius: 18, background: '#0e0b0af0', border: `2px solid ${DL.gold}`, opacity: ease(f, FIFTEEN - 2, FIFTEEN + 8) }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.gold }}>1500</div>
          <div style={{ marginTop: 12 }}><PrinceTutor size={0.8} /></div>
          <div style={{ marginTop: 10 }}><Label at={PRIVATE} color={DL.text} size={26}>A PRIVATE TEACHER<span style={{ opacity: ease(f, PRINCE - 2, PRINCE + 6) }}> · FOR A PRINCE</span></Label></div>
        </div>
        <div style={{ position: 'absolute', left: 720, top: 560, width: 1040, height: 330, boxSizing: 'border-box', padding: 26, borderRadius: 18, background: '#0e0b0af0', border: `2px dashed ${DL.red}`, opacity: ease(f, TWENTY5 - 2, TWENTY5 + 8) }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.red }}>2100 · PREDICTION</div>
          <div style={{ marginTop: 12, display: 'flex', gap: 22, alignItems: 'flex-end' }}>
            {Array.from({ length: 7 }, (_, i) => <div key={i} style={{ display: 'flex', alignItems: 'flex-start', opacity: ease(f, TWENTY5 + i * 3, TWENTY5 + i * 3 + 8) }}><Kid size={64} girl={i % 2 === 0} /><Orb f={f} size={36} phase={i} /></div>)}
          </div>
          <div style={{ marginTop: 10 }}><Label at={EVERYONE} color={ORB} size={28}>FOR EVERYONE?</Label></div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 250, display: 'flex', alignItems: 'baseline', gap: 30, opacity: ease(f, FIFTEEN, FIFTEEN + 10) * (1 - ease(f, SCHOOL2 - 6, SCHOOL2 + 4)) }}>
          <span style={{ fontFamily: DL_SERIF, fontSize: 150, color: DL.gold }}>1 : 1</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 34, color: DL.text, opacity: ease(f, PRIVATE - 2, PRIVATE + 8) }}>FOR A PRINCE</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 34, color: ORB, opacity: ease(f, EVERYONE - 2, EVERYONE + 8) }}>→ FOR EVERY CHILD?</span>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 300, display: 'flex', alignItems: 'baseline', gap: 26, opacity: ease(f, SCHOOL2 - 2, SCHOOL2 + 10) }}>
          <span style={{ fontFamily: DL_SERIF, fontSize: 110, color: DL.text, opacity: ease(f, NAME - 4, NAME + 6) }}>σχολή</span>
          <span style={{ fontFamily: DL_SERIF, fontSize: 96, background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', filter: `drop-shadow(0 0 20px ${DYT.magenta}88)`, opacity: ease(f, MEANT - 2, MEANT + 6) }}>= FREE TIME?</span>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 450 }}><Label at={SCHOOL2} color={DL.dim} size={26}>SCHOOL, A LITTLE <span style={{ opacity: ease(f, C.at('closer') - 2, C.at('closer') + 6) }}>CLOSER TO ITS NAME?</span></Label></div>
      </AbsoluteFill>

      <EpisodeHud year={f >= HUNDRED1 ? 2100 : '—'} episode="03" prediction={f >= HUNDRED1} />
    </AbsoluteFill>
  );
};
export default Sc2100;
