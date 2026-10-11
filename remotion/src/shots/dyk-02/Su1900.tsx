import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, WeekStrip, DidYouKnowThat, Cliffhanger, EraExit } from '../../lib/dykkit';
import { EpisodeHud, SunChip, SunDisc, WakePlace, win, SUN, CardSource, OnWord } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 9/14 — ERA 5: 1928, an American beach (RESEARCH F8, F9). Sunbathers appear on
// "Everyone", ON PURPOSE on "purpose"; ONCE → fields / NOW → a day off. DYK card: the Chanel
// story, "probably a myth" on "myth". The 1971 magazine on "magazine", REAL REASON on "work";
// Week Strip of an office week from "jobs", BEACH glows on "leisure". Bell Labs 1954 on
// "fifty", three scientists on "three", the cell on "silicon", ≈ 6 % on "six". Vanguard 1 on
// "Vanguard", radio waves on "radio", STILL IN ORBIT on "still". A probe heads for the Sun on
// "fly". VO su08 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Su1900', durationInSeconds: 48.1, fps: 30, width: 1920, height: 1080 };
const DUR = 1443;

const C = makeCue(vo, 'su08-1900', 0.8);
const CROWDED = C.at('crowded');
const EVERYONE = C.at('Everyone');
const DOCK = EVERYONE;
const PEOPLE = DOCK + 12; // sunbathers arrive as the header docks
const CHANEL = C.at('Chanel');
const SEVENTY = C.at('seventy');
const PURPOSE = C.at('purpose');
const ONCE = C.at('Once');
const FIELDS = C.at('fields');
const AFFORD = C.at('afford');
const DID = C.at('Did');
const MYTH = C.at('myth');
const HISTORIAN = C.at('historian');
const MAGAZINE = C.at('magazine');
const WORK = C.at('work');
const JOBS = C.at('jobs');
const LEISURE = C.at('leisure');
const THEN = C.at('Then');
const FIFTY = C.at('fifty');
const THREE = C.at('three');
const SILICON = C.at('silicon');
const SIX = C.at('six');
const ELECTRICITY = C.at('electricity');
const FOUR = C.at('Four', 2); // 'Four years later' (1 = 'fifty four')
const VANGUARD = C.at('Vanguard');
const RADIO = C.at('radio');
const STILL = C.at('still');
const LEARNED = C.at('learned');
const FLY = C.at('fly');
const STRAIGHT = C.at('straight');
const STEP = 12;

const WEEK1928 = [
  { d: 'MON', work: 0.4, color: '#71717a' }, { d: 'TUE', work: 0.4, color: '#71717a' }, { d: 'WED', work: 0.4, color: '#71717a' },
  { d: 'THU', work: 0.4, color: '#71717a' }, { d: 'FRI', work: 0.4, color: '#71717a' }, { d: 'SAT', work: 0.2, color: '#71717a' },
  { d: 'SUN', work: 0.02, color: '#ffc94a', tag: 'THE BEACH' },
];

const Beach: React.FC<{ f: number }> = ({ f }) => {
  const people = [[180, 0], [420, 1], [700, 2], [980, 3], [1240, 4]];
  return (
    <svg width={1600} height={480} viewBox="0 0 1600 480">
      <rect x={0} y={0} width={1600} height={200} fill="#1d4f73" opacity={0.5} />
      {[0, 1, 2].map((i) => <path key={i} d={`M0 ${190 + i * 6} Q400 ${180 + i * 6 + Math.sin(f / 15 + i) * 6} 800 ${190 + i * 6} T1600 ${190 + i * 6}`} stroke="#bfe8ff" strokeWidth={2} fill="none" opacity={0.4} />)}
      <rect x={0} y={200} width={1600} height={280} fill="#c9a66b" opacity={0.55} />
      {people.map(([x, i]) => (
        <g key={i} opacity={ease(f, PEOPLE + i * 6, PEOPLE + i * 6 + 8)}>
          <rect x={x - 70} y={330} width={160} height={40} rx={6} fill={['#e74c3c', '#38bdf8', '#ffd23f', '#34d058', '#ff3db4'][i]} opacity={0.8} />
          <circle cx={x - 46} cy={340} r={16} fill="#c98a5a" />
          <rect x={x - 30} y={332} width={110} height={18} rx={9} fill="#c98a5a" />
        </g>
      ))}
      {[300, 860, 1400].map((x, i) => (
        <g key={x} opacity={ease(f, PEOPLE + 4 + i * 6, PEOPLE + 12 + i * 6)}>
          <line x1={x} y1={200} x2={x} y2={330} stroke="#f4ede4" strokeWidth={5} />
          <path d={`M${x - 90} 220 Q${x} 140 ${x + 90} 220 Z`} fill={i === 1 ? '#e74c3c' : '#f4ede4'} />
        </g>
      ))}
    </svg>
  );
};

const Su1900: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const beach = win(f, DOCK + 6, DID - 2);
  const myth = win(f, HISTORIAN + 22, JOBS, 4);
  const week = win(f, JOBS - 2, THEN);
  const bell = win(f, THEN - 2, FOUR + 20);
  const vang = win(f, FOUR + 22, FLY + 4, 4);
  const pct = Math.round(interpolate(f, [SIX - 2, SIX + 14], [0, 6], { ...DCLAMP, easing: DL_EASE.out }));
  const orbitA = (f - FOUR) / 30;
  const probe = interpolate(f, [FLY, DUR], [0, 1], DCLAMP);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#22160a" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1928" idx={5} label="THE BEACH" dockAt={DOCK} />
        <WakePlace place="A crowded American beach" at={CROWDED} dockAt={DOCK} yearAt={C.at('nineteen', 1)} />
        <AbsoluteFill style={{ opacity: beach }}>
          <div style={{ position: 'absolute', left: 1500, top: 170 }}><SunDisc size={130} id="beachSun" /></div>
          <div style={{ position: 'absolute', left: 160, top: 380 }}><Beach f={f} /></div>
          <div style={{ position: 'absolute', left: 160, top: 220, display: 'flex', gap: 22 }}>
            <SunChip text="ON PURPOSE" at={PURPOSE} color={SUN.mid} />
          </div>
          <div style={{ position: 'absolute', left: 160, top: 300, display: 'flex', gap: 22 }}>
            <div style={{ ...rise(f, ONCE - 2), padding: '14px 24px', borderRadius: 10, background: DL.panel, border: `1px solid ${DL.border}`, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.dim }}>ONCE: A TAN = <span style={{ color: DL.text, opacity: ease(f, FIELDS - 2, FIELDS + 6) }}>FIELD WORK</span></div>
            <div style={{ ...rise(f, C.at('Now', 1) - 2), padding: '14px 24px', borderRadius: 10, background: DL.panel, border: `1px solid ${SUN.mid}`, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: SUN.mid }}>NOW: A TAN = <span style={{ opacity: ease(f, AFFORD - 2, AFFORD + 6) }}>A DAY OFF</span></div>
          </div>
        </AbsoluteFill>


        <AbsoluteFill style={{ opacity: myth }}>
          <div style={{ position: 'absolute', left: 160, top: 230, display: 'flex', gap: 60, alignItems: 'center' }}>
            <div style={{ ...rise(f, HISTORIAN + 22), position: 'relative', width: 420, height: 520, borderRadius: 8, background: '#e9e1cf', padding: 30, boxSizing: 'border-box', transform: `rotate(${-4 + 2 * ease(f, MAGAZINE, MAGAZINE + 20)}deg)`, opacity: ease(f, HISTORIAN + 18, HISTORIAN + 24) }}>
              <div style={{ fontFamily: DL_SERIF, fontSize: 46, color: '#3a2a1c', fontStyle: 'italic' }}>Magazine</div>
              <div style={{ fontFamily: DL_MONO, fontSize: 20, color: '#5a4a3a', marginTop: 6 }}>MAY</div>
              <div style={{ position: 'absolute', right: 26, top: 24, padding: '6px 14px', border: `3px solid ${DL.red}`, borderRadius: 8, fontFamily: DL_MONO, fontWeight: 700, fontSize: 40, color: DL.red, transform: `rotate(8deg) scale(${ease(f, SEVENTY, SEVENTY + 8, 1.4, 1)})`, opacity: ease(f, SEVENTY - 1, SEVENTY + 5) }}>1971</div>
              {Array.from({ length: 12 }, (_, i) => <div key={i} style={{ height: 10, marginTop: 18, width: `${70 + ((i * 37) % 30)}%`, background: '#a99a86' }} />)}
              <div style={{ marginTop: 22, fontFamily: DL_MONO, fontSize: 20, color: DL.red }}>NO BYLINE</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: 900 }}>
              <div style={{ ...rise(f, HISTORIAN - 2), fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.muted }}>A HISTORIAN TRACED THE STORY TO</div>
              <SunChip text="AN UNSIGNED MAGAZINE ARTICLE" at={MAGAZINE} color={DL.dim} size={28} />
              <div style={{ ...rise(f, WORK - 2), fontFamily: DL_SERIF, fontSize: 72, color: DL.text }}>The real reason: <span style={{ color: SUN.mid, fontStyle: 'italic' }}>work.</span></div>
            </div>
          </div>
        </AbsoluteFill>

        <AbsoluteFill style={{ opacity: week }}>
          <div style={{ position: 'absolute', left: 160, top: 220 }}>
            <WeekStrip year="1928 · AN OFFICE WEEK" days={WEEK1928} at={JOBS} step={STEP} hot={6} hotAt={LEISURE} />
          </div>
          <div style={{ position: 'absolute', left: 1180, top: 330, width: 600, display: 'flex', flexDirection: 'column', gap: 22 }}>
            <SunChip text="INDOORS: FACTORIES · OFFICES" at={JOBS + 20} color={DL.dim} size={24} />
            <div style={{ ...rise(f, LEISURE - 4), fontFamily: DL_SERIF, fontSize: 64, lineHeight: 1.1, color: DL.text }}>A tan = the badge of <span style={{ color: SUN.mid, fontStyle: 'italic' }}>leisure</span></div>
          </div>
        </AbsoluteFill>

        {/* Bell Labs 1954 */}
        <AbsoluteFill style={{ opacity: bell }}>
          <div style={{ position: 'absolute', left: 160, top: 230, display: 'flex', flexDirection: 'column', gap: 20, width: 760 }}>
            <div style={{ display: 'flex', gap: 14 }}>
              <SunChip text="25 APRIL 1954" at={C.at('nineteen', 3)} color={DL.dim} />
              <SunChip text="BELL LABS" at={C.at('Bell')} color={DL.gold} />
            </div>
            <svg width={300} height={110} viewBox="0 0 300 110" style={{ opacity: ease(f, THREE - 2, THREE + 6) }}>
              {[0, 1, 2].map((i) => <g key={i} opacity={ease(f, THREE + i * 4, THREE + i * 4 + 6)} transform={`translate(${30 + i * 100} 0)`}><circle cx={30} cy={24} r={18} fill={DL.warm} /><path d="M0 110 C0 64 12 48 30 48 C48 48 60 64 60 110 Z" fill={DL.warm} /></g>)}
            </svg>
            <div style={{ ...rise(f, THREE + 4), fontFamily: DL_MONO, fontSize: 22, letterSpacing: 2, color: DL.muted }}>CHAPIN · FULLER · PEARSON</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, opacity: ease(f, SIX - 2, SIX + 6) }}>
              <span style={{ fontFamily: DL_SERIF, fontSize: 150, color: SUN.mid, lineHeight: 1 }}>≈ {pct} %</span>
              <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.dim }}>OF SUNLIGHT</span>
            </div>
            <div style={{ ...rise(f, ELECTRICITY - 2), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 52, color: DL.text }}>→ into electricity</div>
          </div>
          <svg width={600} height={600} viewBox="0 0 600 600" style={{ position: 'absolute', left: 1100, top: 220, opacity: 0.25 * ease(f, THEN, THEN + 10) + 0.75 * ease(f, SILICON - 2, SILICON + 10) }}>
            <rect x={60} y={60} width={480} height={480} rx={20} fill="#0f2a4a" stroke="#5aa0e0" strokeWidth={6} />
            {Array.from({ length: 5 }, (_, i) => <line key={'h' + i} x1={60} y1={140 + i * 80} x2={540} y2={140 + i * 80} stroke="#5aa0e0" strokeWidth={2} opacity={0.6} />)}
            {Array.from({ length: 5 }, (_, i) => <line key={'v' + i} x1={140 + i * 80} y1={60} x2={140 + i * 80} y2={540} stroke="#5aa0e0" strokeWidth={2} opacity={0.6} />)}
            <rect x={60} y={60} width={480} height={480} rx={20} fill="#ffc94a" opacity={0.25 * ease(f, ELECTRICITY - 2, ELECTRICITY + 10) * (0.7 + 0.3 * Math.sin(f / 5))} />
          </svg>
        </AbsoluteFill>

        {/* Vanguard 1 */}
        <AbsoluteFill style={{ opacity: vang }}>
          <svg width={900} height={640} viewBox="0 0 900 640" style={{ position: 'absolute', left: 160, top: 200 }}>
            <circle cx={450} cy={320} r={170} fill="#1f5fa8" />
            <path d="M380 220 q60 -30 100 10 q-20 40 -70 30 z M470 360 q50 -10 70 30 q-40 40 -90 10 z" fill="#2f9e5a" opacity={0.8} />
            <ellipse cx={450} cy={320} rx={330} ry={120} fill="none" stroke={DL.border} strokeWidth={3} strokeDasharray="8 10" />
            {(() => {
              const x = 450 + Math.cos(orbitA) * 330, y = 320 + Math.sin(orbitA) * 120;
              return (
                <g opacity={ease(f, FOUR + 26, FOUR + 34)}>
                  {[0, 1, 2, 3, 4, 5].map((k) => <line key={k} x1={x} y1={y} x2={x + Math.cos(k) * 46} y2={y + Math.sin(k) * 46} stroke="#cfd8dc" strokeWidth={3} />)}
                  <circle cx={x} cy={y} r={18} fill="#cfd8dc" />
                  {f > RADIO && [0, 1, 2].map((k) => { const p = ((f - RADIO + k * 10) % 30) / 30; return <circle key={k} cx={x} cy={y} r={30 + p * 80} fill="none" stroke={SUN.mid} strokeWidth={3} opacity={1 - p} />; })}
                </g>
              );
            })()}
          </svg>
          <div style={{ position: 'absolute', left: 1120, top: 270, width: 640, display: 'flex', flexDirection: 'column', gap: 22 }}>
            <SunChip text="1958 · VANGUARD 1" at={VANGUARD} color={DL.dim} />
            <SunChip text="RADIO ON SUNLIGHT" at={RADIO} color={SUN.mid} />
            <SunChip text="STILL IN ORBIT TODAY" at={STILL} color={DL.green} />
          </div>
        </AbsoluteFill>
        {/* a probe sets off toward the Sun on "fly" */}
        <svg width={1600} height={200} viewBox="0 0 1600 200" style={{ position: 'absolute', left: 160, top: 620, opacity: ease(f, FLY - 2, FLY + 6) }}>
          <circle cx={1500} cy={60} r={44} fill={SUN.mid} style={{ filter: `drop-shadow(0 0 20px ${SUN.rim})` }} />
          <path d={`M100 160 Q800 ${160 - 120} 1500 60`} stroke={DL.border} strokeWidth={3} strokeDasharray="8 10" fill="none" />
          <rect x={100 + 1300 * probe - 14} y={160 - 100 * probe - 10} width={28} height={20} fill="#cfd8dc" />
        </svg>
        <DidYouKnowThat at={DID} out={HISTORIAN + 20}>
          <OnWord at={C.at('famous')}>the famous story</OnWord><span style={{ opacity: ease(f, CHANEL - 6, CHANEL + 4) }}> — that Coco Chanel</span><span style={{ opacity: ease(f, C.at('craze') - 6, C.at('craze') + 4) }}> started the suntan craze —</span><OnWord at={C.at('probably')}> is </OnWord><span style={{ color: '#ff9a1f', fontStyle: 'italic', opacity: ease(f, MYTH - 6, MYTH + 4) }}>probably a myth.</span>
          <CardSource at={MYTH}>Kerry Segrave, Suntanning in 20th Century America (McFarland, 2005)</CardSource>
        </DidYouKnowThat>
        <Cliffhanger next="TODAY" parts={[{ text: 'We had learned to live on sunlight.', at: LEARNED }, { text: 'Now,', at: C.at('Now', 2) }, { text: 'we would fly', at: FLY }, { text: 'straight into it.', at: STRAIGHT }]} />
      </EraExit>
      <EpisodeHud year={1928} episode="02" />
    </AbsoluteFill>
  );
};
export default Su1900;
