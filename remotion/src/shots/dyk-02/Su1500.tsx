import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DayClock, DidYouKnowThat, Cliffhanger, EraExit } from '../../lib/dykkit';
import { EpisodeHud, SunChip, QuoteCard, WakePlace, win, SUN, CardSource, OnWord } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 5/14 — ERA 1: 1500, London, Midsummer Eve (RESEARCH F16, Stow verbatim).
// Street at night; bonfires flare on "fire". DYK card: geocentric belief (F2), Ptolemy line
// on "Ptolemy". Day Clock on "Your day" (sun up / sun down on "rises" / "sets"); NOBODY SLEEPS
// on "nobody". Doors: birch / wort / lamps / bread on their words. Stow's quote builds on
// "great" and "purge". Orbit diagram: Earth-centred on "Far", Copernicus card on his name,
// 1543 on "forty", the Sun swaps to the centre landing on "centre". Telescope on "instrument".
// VO su04 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Su1500', durationInSeconds: 50.9, fps: 30, width: 1920, height: 1080 };
const DUR = 1527;

const C = makeCue(vo, 'su04-1500', 0.8);
const LONDON = C.at('London');
const MIDSUMMER = C.at('Midsummer');
const DOCK = MIDSUMMER + 14; // place line stays >= 1.5 s after "London"
const SHORTEST = C.at('shortest');
const FIRE = C.at('firelight');
const DID = C.at('Did');
const PTOLEMY = C.at('Ptolemy');
const AROUND = C.at('around');
const FOURTEEN = C.at('fourteen');
const SKY = C.at('sky');
const YOUR = C.at('Your');
const RISES = C.at('rises');
const SETS = C.at('sets');
const NOBODY = C.at('nobody');
const EVERY = C.at('Every');
const BIRCH = C.at('birch');
const WORT = C.at('flowers'); // narration: "yellow flowers" — the chip names them: St John's wort (Stow)
const LAMPS = C.at('lamps');
const BREAD = C.at('bread');
const STREETS = C.at('streets');
const BONFIRES = C.at('bonfires');
const STOW = C.at('Stow');
const GREAT = C.at('great');
const PURGE = C.at('purge');
const FAR = C.at('Far');
const COPERNICUS = C.at('Copernicus');
const FORTY = C.at('forty');
const PUTS = C.at('puts');
const DIES = C.at('dies');
const CENTRE = C.at('centre');
const WITHIN = C.at('within');
const INSTRUMENT = C.at('instrument');
const PERFECT = C.at('perfect');
const STEP = 12;

const DAY1500 = [
  { from: 21, to: 4, label: 'Sleep — after dark', color: '#38bdf8' },
  { from: 4, to: 5, label: 'Up with the light', color: '#ffc94a' },
  { from: 5, to: 12, label: 'Work, by daylight', color: '#71717a' },
  { from: 12, to: 13, label: 'Dinner', color: '#e74c3c' },
  { from: 13, to: 19, label: 'Work, by daylight', color: '#71717a' },
  { from: 19, to: 21, label: 'Supper as the light goes', color: '#b9b1a4' },
];

// a row of timber houses at night; bonfires in the street; doors decorated piece by piece
const Street: React.FC<{ f: number }> = ({ f }) => {
  const houses = [0, 1, 2, 3, 4, 5];
  const fire = ease(f, FIRE - 4, FIRE + 10);
  const big = ease(f, BONFIRES - 2, BONFIRES + 12);
  const flick = (i: number) => 1 + 0.12 * Math.sin(f / 3 + i * 2) + 0.08 * Math.sin(f / 1.7 + i);
  return (
    <svg width={1600} height={430} viewBox="0 0 1600 430">
      <circle cx={1480} cy={60} r={28} fill="#e9e1cf" opacity={0.5} />
      {houses.map((i) => {
        const x = 40 + i * 260;
        return (
          <g key={i}>
            <rect x={x} y={120} width={200} height={240} fill="#15100b" stroke="#3a2a1c" strokeWidth={3} />
            <path d={`M${x - 14} 124 L${x + 100} 40 L${x + 214} 124 Z`} fill="#120c08" stroke="#3a2a1c" strokeWidth={3} />
            <line x1={x} y1={200} x2={x + 200} y2={200} stroke="#3a2a1c" strokeWidth={4} />
            <line x1={x + 100} y1={120} x2={x + 100} y2={200} stroke="#3a2a1c" strokeWidth={4} />
            <rect x={x + 72} y={250} width={56} height={110} fill="#24180f" />
            <rect x={x + 24} y={140} width={40} height={40} fill={SUN.mid} opacity={0.75 * ease(f, STREETS + i * 2, STREETS + i * 2 + 8)} />
            <rect x={x + 136} y={140} width={40} height={40} fill={SUN.mid} opacity={0.75 * ease(f, STREETS + i * 2 + 1, STREETS + i * 2 + 9)} />
            {/* green birch over the door */}
            <g opacity={ease(f, BIRCH + i * 3, BIRCH + i * 3 + 8)}>
              {[-1, 1].map((s) => <path key={s} d={`M${x + 100} 246 q ${s * 40} -26 ${s * 64} 10`} stroke="#4caf50" strokeWidth={8} fill="none" strokeLinecap="round" />)}
            </g>
            {/* St John's wort: yellow flowers */}
            <g opacity={ease(f, WORT + i * 3, WORT + i * 3 + 8)}>
              {[-30, -12, 12, 30].map((d) => <circle key={d} cx={x + 100 + d} cy={238} r={7} fill="#ffd23f" />)}
            </g>
            {/* glass lamps burning all night */}
            <g opacity={ease(f, LAMPS + i * 3, LAMPS + i * 3 + 8)}>
              <circle cx={x + 40} cy={250} r={12} fill={SUN.mid} style={{ filter: `drop-shadow(0 0 14px ${SUN.mid})` }} />
              <circle cx={x + 160} cy={250} r={12} fill={SUN.mid} style={{ filter: `drop-shadow(0 0 14px ${SUN.mid})` }} />
            </g>
          </g>
        );
      })}
      <rect x={0} y={360} width={1600} height={70} fill="#0d0907" />
      {/* tables with bread and drink */}
      {[300, 820, 1340].map((x, i) => (
        <g key={x} opacity={ease(f, BREAD + i * 4, BREAD + i * 4 + 8)}>
          <rect x={x - 60} y={376} width={120} height={10} fill="#5a3b22" />
          <ellipse cx={x - 20} cy={370} rx={22} ry={10} fill="#d9a35b" />
          <rect x={x + 18} y={352} width={14} height={24} fill="#b9b1a4" />
        </g>
      ))}
      {[170, 690, 1210].map((x, i) => {
        const h = (60 + 70 * big) * flick(i) * fire;
        return (
          <g key={x}>
            <ellipse cx={x} cy={404} rx={60 + 30 * big} ry={12} fill="#2a1a10" />
            <path d={`M${x - 46} 404 Q${x - 30} ${404 - h * 0.6} ${x} ${404 - h} Q${x + 30} ${404 - h * 0.6} ${x + 46} 404 Z`} fill="#ff7a1a" opacity={0.9 * fire} />
            <path d={`M${x - 24} 404 Q${x - 12} ${404 - h * 0.4} ${x} ${404 - h * 0.7} Q${x + 12} ${404 - h * 0.4} ${x + 24} 404 Z`} fill="#ffd23f" opacity={fire} />
            <circle cx={x} cy={380} r={140 + 60 * big} fill="#ff7a1a" opacity={0.08 * fire} />
          </g>
        );
      })}
    </svg>
  );
};

// Earth-centred → Sun-centred. swap 0..1 moves the Sun into the centre and sends the Earth into orbit.
const Orbits: React.FC<{ f: number }> = ({ f }) => {
  const swap = ease(f, PUTS, CENTRE + 6, 0, 1, DL_EASE.inOut);
  const cx = 360, cy = 300, R = 220;
  const a = f / 40;
  const centre = { x: cx, y: cy };
  const orbiting = { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R * 0.42 };
  const sunPos = { x: orbiting.x + (centre.x - orbiting.x) * swap, y: orbiting.y + (centre.y - orbiting.y) * swap };
  const earthPos = { x: centre.x + (orbiting.x - centre.x) * swap, y: centre.y + (orbiting.y - centre.y) * swap };
  return (
    <svg width={720} height={600} viewBox="0 0 720 600">
      {[[60, 80], [640, 60], [120, 470], [610, 450], [360, 40], [40, 300], [680, 260], [250, 520]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4 + (i % 3)} fill="#e9e1cf" opacity={ease(f, SKY + i * 2, SKY + i * 2 + 8) * (0.5 + 0.5 * Math.sin(f / 6 + i))} />
      ))}
      <ellipse cx={cx} cy={cy} rx={R} ry={R * 0.42} fill="none" stroke={DL.border} strokeWidth={3} strokeDasharray="8 10" />
      <circle cx={sunPos.x} cy={sunPos.y} r={50} fill={SUN.mid} style={{ filter: `drop-shadow(0 0 22px ${SUN.rim})` }} />
      <circle cx={earthPos.x} cy={earthPos.y} r={24} fill="#2f7fd6" />
      <text x={cx} y={560} textAnchor="middle" fill={swap > 0.5 ? SUN.mid : DL.dim} fontFamily={DL_MONO} fontSize={26} letterSpacing={4}>{swap > 0.5 ? 'COPERNICUS · SUN AT THE CENTRE' : 'PTOLEMY · EARTH AT THE CENTRE'}</text>
    </svg>
  );
};

const Su1500: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const street = win(f, DOCK + 6, DID - 2) + win(f, EVERY + 16, FAR + 2, 4);
  const dayClock = win(f, YOUR + 8, EVERY + 14, 6);
  const chipsC = win(f, BIRCH - 2, STOW);
  const quote = win(f, STOW - 2, FAR + 2);
  const orbit = ease(f, FAR - 4, FAR + 8);
  const scope = ease(f, INSTRUMENT, INSTRUMENT + 10);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#2a1206" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1500" idx={1} label="LONDON" dockAt={DOCK} />
        <WakePlace place="London" at={LONDON} dockAt={DOCK} yearAt={C.at('fifteen', 1)} />
        <div style={{ position: 'absolute', left: 160, top: 400, opacity: street }}><Street f={f} /></div>
        <div style={{ position: 'absolute', left: 160, top: 220, display: 'flex', gap: 22, opacity: win(f, DOCK + 6, DID - 2) }}>
          <SunChip text="MIDSUMMER EVE" at={DOCK + 6} color={SUN.mid} />
          <SunChip text="THE SHORTEST NIGHT" at={SHORTEST} color={DL.dim} />
        </div>


        <div style={{ position: 'absolute', left: 0, right: 0, top: 230, display: 'flex', justifyContent: 'center', opacity: dayClock }}>
          <DayClock year="1500" segs={DAY1500} at={YOUR + 8} step={STEP} hotSeq={[[1, RISES], [5, SETS], [0, NOBODY]]} />
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', opacity: win(f, NOBODY - 2, EVERY + 14) }}>
          <SunChip text="TONIGHT · NOBODY SLEEPS" at={NOBODY} color={DL.red} size={34} />
        </div>

        <div style={{ position: 'absolute', left: 160, top: 220, display: 'flex', gap: 18, flexWrap: 'wrap', width: 1600, opacity: chipsC }}>
          <SunChip text="GREEN BIRCH" at={BIRCH} color="#4caf50" />
          <SunChip text="ST JOHN'S WORT" at={WORT} color="#ffd23f" />
          <SunChip text="GLASS LAMPS · ALL NIGHT" at={LAMPS} color={SUN.mid} />
          <SunChip text="BREAD & DRINK" at={BREAD} color={DL.warm} />
        </div>
        <div style={{ position: 'absolute', left: 160, top: 190, opacity: quote }}>
          <QuoteCard who="JOHN STOW · A SURVEY OF LONDON (1598)" at={STOW} w={1100} parts={[{ text: '“…the virtue that a great fire hath', at: GREAT }, { text: 'to purge the infection of the air.”', at: PURGE }]} />
        </div>

        {/* what changed: the model of the heavens */}
        <div style={{ position: 'absolute', left: 160, top: 200, opacity: orbit }}><Orbits f={f} /></div>
        <div style={{ position: 'absolute', left: 980, top: 260, width: 780, display: 'flex', flexDirection: 'column', gap: 26, opacity: orbit }}>
          <div style={{ ...rise(f, COPERNICUS - 2), padding: '24px 30px', background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${DL.gold}`, borderRadius: 14 }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.muted }}>A YOUNG POLISH ASTRONOMER</div>
            <div style={{ fontFamily: DL_SERIF, fontSize: 64, color: DL.gold, marginTop: 8 }}>Nicolaus Copernicus</div>
          </div>
          <div style={{ ...rise(f, FORTY - 2), padding: '24px 30px', background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${SUN.mid}`, borderRadius: 14 }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.muted }}>1543 · NUREMBERG<span style={{ opacity: ease(f, DIES - 2, DIES + 6) }}> · THE YEAR HE DIES</span></div>
            <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 52, color: DL.text, marginTop: 8 }}>De revolutionibus</div>
          </div>
        </div>
        {/* the new instrument: a telescope silhouette on "instrument" */}
        <svg width={260} height={120} viewBox="0 0 260 120" style={{ position: 'absolute', left: 1440, top: 640, opacity: scope, transform: `rotate(${-18 * scope}deg)` }}>
          <rect x={20} y={46} width={200} height={26} rx={6} fill={DL.panel2} stroke={DL.gold} strokeWidth={3} />
          <rect x={214} y={40} width={30} height={38} rx={4} fill={DL.panel2} stroke={DL.gold} strokeWidth={3} />
          <line x1={110} y1={72} x2={80} y2={118} stroke={DL.gold} strokeWidth={4} />
          <line x1={110} y1={72} x2={140} y2={118} stroke={DL.gold} strokeWidth={4} />
        </svg>
        <DidYouKnowThat at={DID} out={YOUR}>
          <OnWord at={C.at('almost')}>almost everyone you will ever meet</OnWord><span style={{ opacity: ease(f, C.at('believes') - 4, C.at('believes') + 6) }}> believes</span> <span style={{ color: '#ff9a1f', fontStyle: 'italic', opacity: ease(f, AROUND - 6, AROUND + 4) }}>the Sun goes around the Earth.</span>
          <div style={{ marginTop: 18, fontFamily: DL_MONO, fontSize: 28, letterSpacing: 3, color: '#b8bce0', opacity: ease(f, PTOLEMY - 2, PTOLEMY + 8) }}>TAUGHT BY PTOLEMY<span style={{ opacity: ease(f, FOURTEEN - 2, FOURTEEN + 6) }}> · ~1,400 YEARS EARLIER</span></div>
          <CardSource at={PTOLEMY}>Ptolemy, Almagest (c. AD 150) — the standard model for about 1,400 years</CardSource>
        </DidYouKnowThat>
        <Cliffhanger next="1610" parts={[{ text: 'Within seventy years,', at: WITHIN }, { text: 'a new instrument', at: INSTRUMENT }, { text: 'will show the Sun is not perfect.', at: PERFECT }]} />
      </EraExit>
      <EpisodeHud year={1500} episode="02" />
    </AbsoluteFill>
  );
};
export default Su1500;
