import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DidYouKnowThat } from '../../lib/dykkit';
import { EpisodeHud, SunChip, SunDisc, QuoteCard, WakePlace, win, SUN, CardSource, OnWord, HowWeSawIt, ArcLadder, pastRungs, SunCliffhanger } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 10/14 — ERA 6: today (RESEARCH A1, F10, F11). v2 re-key.
// Phone battery fills on "charged", room lights on "lights", pull out through the window on "somewhere",
// panel rows draw 12 f apart from "field", glint on "sunrise". DYK card (A1, ×11) clause by clause, Ember
// footnote on "earlier". Bars 2015 ≈ 250 TWh → 2025 ≈ 2,770 TWh (×11), ring to 8.7 % on "nine" (riser ends
// there). IEA WEO 2020 quote + solar farm. HOW WE SAW IT: POWER on "Power.", light sweep on "harvest", rows
// morph into furrows on "crop" (1.5 s). Parker Solar Probe, Dec 2024 (~4 s beat, FASTEST on "faster").
// A dark room: screen on "screens", window with the Sun on "windows". Cliffhanger band, riser into "today?".
// No EraExit (the answer follows). VO su09 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Su2000', durationInSeconds: 55.0667, fps: 30, width: 1920, height: 1080 };
const DUR = 1652;

const C = makeCue(vo, 'su09-2000', 0.8);
const TODAY1 = C.at('today', 1);
const DOCK = C.at("phone's") - 4; // header docks just before the phone
const YOUR = C.at('Your', 1); // 'Your phone's' (2 = 'your day')
const CHARGED = C.at('charged');
const LIGHTS = C.at('lights');
const SOMEWHERE = C.at('somewhere');
const FIELD = C.at('field');
const SUNRISE = C.at('sunrise');
const DID = C.at('Did', 1);
const FIVE = C.at('five');
const SOLAR2 = C.at('solar', 2); // 'solar power made' (1 = 'a field of solar panels')
const ALMOST1 = C.at('almost', 1); // 'almost eleven' (2 = 'almost nine')
const ELEVEN = C.at('eleven');
const MORE = C.at('more');
const THAN = C.at('than', 1); // 'than it did' (2 = 'faster than')
const TEN = C.at('ten');
const EARLIER = C.at('earlier');
const THATS = C.at("That's");
const NINE = C.at('nine');
const PERCENT = C.at('percent');
const WORLDS = C.at("world's");
const IEA = C.at('International');
const PROJECTS = C.at('projects');
const CHEAPEST = C.at('cheapest');
const SEEN1 = C.at('seen', 1); // 'ever seen.' (2 = 'never seen it')
const SO1 = C.at('So', 1); // 'So what's the Sun' (2 = 'So why')
const NOW = C.at('now');
const POWER = C.at('Power', 2); // 'Power.' (1 = 'solar power made')
const HARVEST = C.at('harvest');
const CROP = C.at('crop');
const TWENTY3 = C.at('twenty', 3); // 'December twenty twenty four' (1–2 = 'twenty twenty five')
const FOUR = C.at('four');
const NASAS = C.at("NASA's");
const PARKER = C.at('Parker');
const FLEW = C.at('flew');
const ATMOS = C.at('atmosphere');
const FASTER = C.at('faster');
const HUMANS = C.at('humans');
const AND3 = C.at('And', 3); // 'And yet' (1 = 'And somewhere', 2 = 'And in December')
const INDOORS = C.at('indoors');
const SCREENS = C.at('screens');
const WINDOWS = C.at('windows');
const TOUCHED = C.at('touched');
const PLUG = C.at('plug');
const SO2 = C.at('So', 2);
const WHY = C.at('why');
const NEVER = C.at('never');
const TODAY2 = C.at('today', 2);
const STEP = 12;

const TWH_2015 = 250; // RESEARCH A1 (coordinator-verified, rounded)
const TWH_2025 = 2770;
const SHARE_2025 = 8.7;

// ── the room at dawn: phone on a nightstand, a lamp, a window (all clear of the ladder box x ≥ 1420, y ≤ 490)
const Room: React.FC<{ f: number }> = ({ f }) => {
  const batt = ease(f, CHARGED - 2, CHARGED + 14);
  const lit = ease(f, LIGHTS - 2, LIGHTS + 8);
  return (
    <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', left: 0, top: 0 }}>
      <rect x={160} y={180} width={1240} height={700} rx={16} fill="#17120f" />
      <rect x={160} y={180} width={1240} height={700} rx={16} fill="#ffdca0" opacity={0.16 * lit} />
      <rect x={160} y={820} width={1240} height={60} fill="#221a15" />
      {/* lamp */}
      <g transform={`rotate(${lit * 3 * Math.sin((f - LIGHTS) / 9) * Math.exp(-(Math.max(0, f - LIGHTS)) / 60)} 820 180)`}>
        <line x1={820} y1={180} x2={820} y2={300} stroke="#3a302a" strokeWidth={4} />
        <path d="M760 360 L790 300 H850 L880 360 Z" fill={lit > 0.5 ? SUN.core : '#3a302a'} />
        <path d="M760 360 L600 820 H1040 L880 360 Z" fill={SUN.core} opacity={0.12 * lit} />
      </g>
      {/* window, pre-dawn outside */}
      <rect x={1020} y={360} width={320} height={340} rx={6} fill="#14233a" stroke="#4a3d33" strokeWidth={10} />
      <line x1={1180} y1={360} x2={1180} y2={700} stroke="#4a3d33" strokeWidth={8} />
      <line x1={1020} y1={530} x2={1340} y2={530} stroke="#4a3d33" strokeWidth={8} />
      {/* nightstand + phone */}
      <rect x={300} y={700} width={320} height={120} rx={6} fill="#3a2a1c" />
      <rect x={410} y={540} width={100} height={160} rx={14} fill="#0b0b0f" stroke="#55555e" strokeWidth={4} />
      <rect x={436} y={590} width={48} height={24} rx={4} fill="none" stroke={DL.text} strokeWidth={3} />
      <rect x={484} y={597} width={5} height={10} fill={DL.text} />
      <rect x={440} y={594} width={40 * batt} height={16} rx={2} fill={DL.green} />
      <text x={460} y={652} textAnchor="middle" fill={DL.green} fontFamily={DL_MONO} fontSize={28} opacity={ease(f, CHARGED + 8, CHARGED + 14)}>100%</text>
    </svg>
  );
};

// ── a hillside solar farm: rows draw 12 f apart from "field", the Sun clears the hill and the panels glint on "sunrise"
const Hillside: React.FC<{ f: number }> = ({ f }) => {
  const sunY = interpolate(f, [SOMEWHERE, SUNRISE + 10], [430, 190], { ...DCLAMP, easing: DL_EASE.out });
  const glint = ease(f, SUNRISE - 2, SUNRISE + 8) * (1 - 0.6 * ease(f, SUNRISE + 14, SUNRISE + 40));
  return (
    <svg width={1240} height={700} viewBox="0 0 1240 700">
      <rect width={1240} height={700} fill="#1b2a44" />
      <rect width={1240} height={700} fill={SUN.glow} opacity={0.25 * ease(f, SUNRISE - 20, SUNRISE + 10)} />
      <circle cx={900} cy={sunY} r={70} fill={SUN.mid} style={{ filter: `drop-shadow(0 0 30px ${SUN.rim})` }} />
      <path d="M0 400 Q 400 300 1240 380 V700 H0 Z" fill="#203a26" />
      {[0, 1, 2, 3].map((r) => (
        <g key={r} opacity={ease(f, FIELD + r * STEP, FIELD + r * STEP + 8)}>
          {Array.from({ length: 8 }, (_, i) => {
            const x = 60 + i * 140 + r * 20, y = 430 + r * 62;
            return (
              <g key={i}>
                <polygon points={`${x},${y} ${x + 110},${y} ${x + 100},${y + 40} ${x - 10},${y + 40}`} fill="#0f2a4a" stroke="#5aa0e0" strokeWidth={2} />
                <polygon points={`${x + 6},${y + 2} ${x + 40},${y + 2} ${x + 22},${y + 38} ${x - 6},${y + 38}`} fill={SUN.core} style={{ mixBlendMode: 'screen' }} opacity={0.8 * glint} />
                <polygon points={`${x},${y} ${x + 110},${y} ${x + 100},${y + 40} ${x - 10},${y + 40}`} fill="none" stroke={SUN.mid} strokeWidth={2} opacity={glint} />
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
};

// ── the IEA farm: rows build from "International", light on "cheapest", a sweep on "harvest", furrows on "crop"
const Farm: React.FC<{ f: number }> = ({ f }) => {
  const furrow = ease(f, CROP - 2, CROP + 12, 0, 1, DL_EASE.inOut);
  const sweep = interpolate(f, [HARVEST - 2, HARVEST + 18], [-200, 1500], DCLAMP);
  return (
    <svg width={1300} height={250} viewBox="0 0 1300 250">
      {[0, 1, 2].map((r) => Array.from({ length: 9 }, (_, i) => {
        const x = 40 + i * 135 + r * 30, y = 40 + r * 70;
        return (
          <g key={`${r}-${i}`} opacity={ease(f, IEA + r * STEP, IEA + r * STEP + 8)}>
            <g opacity={1 - furrow}>
              <polygon points={`${x},${y} ${x + 110},${y} ${x + 100},${y + 50} ${x - 10},${y + 50}`} fill="#0f2a4a" stroke="#5aa0e0" strokeWidth={2} />
              <polygon points={`${x + 6},${y + 2} ${x + 44},${y + 2} ${x + 26},${y + 48} ${x - 6},${y + 48}`} fill={SUN.core} style={{ mixBlendMode: 'screen' }} opacity={0.7 * ease(f, CHEAPEST - 2, CHEAPEST + 10)} />
              <polygon points={`${x},${y} ${x + 110},${y} ${x + 100},${y + 50} ${x - 10},${y + 50}`} fill="none" stroke={SUN.mid} strokeWidth={2} opacity={ease(f, CHEAPEST - 2, CHEAPEST + 10)} />
            </g>
            {/* "like a crop": the same rows as ploughed furrows with sprouts */}
            <g opacity={furrow}>
              <path d={`M${x - 10} ${y + 40} Q${x + 50} ${y + 20} ${x + 110} ${y + 40}`} stroke="#8a5a2b" strokeWidth={10} fill="none" />
              {[20, 55, 90].map((dx) => <path key={dx} d={`M${x + dx} ${y + 30} q -8 -14 -2 -26 M${x + dx} ${y + 30} q 8 -12 14 -18`} stroke="#34c759" strokeWidth={4} fill="none" />)}
            </g>
          </g>
        );
      }))}
      <rect x={sweep} y={0} width={160} height={250} fill={SUN.core} opacity={0.22 * (f > HARVEST - 2 && f < HARVEST + 20 ? 1 : 0)} transform="skewX(-15)" />
    </svg>
  );
};

const Su2000: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const pull = ease(f, SOMEWHERE - 2, SOMEWHERE + 14, 0, 1, DL_EASE.inOut);
  const room = (1 - pull) * ease(f, YOUR - 4, YOUR + 6); // the phone arrives on "Your"
  const hill = pull * (1 - ease(f, DID - 10, DID - 2));
  const chart = win(f, THATS, IEA + 8, 6, 10); // 8.7 % holds until "International"
  const g2015 = ease(f, THATS - 2, THATS + 10);
  const g2025 = ease(f, THATS + 2, THATS + 14, 0, 1, DL_EASE.inOut); // ×11 lands at THATS+8, before "nine"
  const share = interpolate(f, [NINE - 6, NINE + 4], [0, SHARE_2025], { ...DCLAMP, easing: DL_EASE.out });
  const farm = win(f, IEA + 6, TWENTY3 + 4, 10, 12);
  const sunQ = ease(f, SO1 - 2, SO1 + 18);
  const parker = win(f, TWENTY3 + 4, AND3, 8, 10);
  const ang = interpolate(f, [TWENTY3, ATMOS, AND3], [0, Math.PI, Math.PI * 1.6], { ...DCLAMP });
  const px = 760 + Math.cos(ang) * 460, py = 560 - Math.sin(ang) * 240;
  const den = ease(f, AND3 - 4, AND3 + 10);
  const sunPulse = ease(f, TOUCHED - 2, TOUCHED + 8) * (1 - ease(f, TOUCHED + 24, TOUCHED + 50));
  const plug = ease(f, PLUG - 2, PLUG + 10);
  const push = 0.35 * ease(f, AND3, WHY, 0, 1, DL_EASE.inOut) + 0.65 * ease(f, WHY, DUR, 0, 1, DL_EASE.inOut); // slow from "And yet", more from "why"
  const screen = ease(f, SCREENS - 2, SCREENS + 8);
  const door = ease(f, INDOORS - 2, INDOORS + 10, 0, 1, DL_EASE.inOut);
  // ladder windows: (a) past rungs from the header dock until the DYK card · (b) from the POWER dock until the band
  const ladA = win(f, DOCK + 14, DID - 2, 12, 10);
  const ladB = win(f, NASAS + 10, TOUCHED + 8, 10, 10);
  const R = 170, CIRC = 2 * Math.PI * R;
  const barH = (twh: number) => (twh / TWH_2025) * 420;

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1a1006" />
      <Vignette />
      <EraHeader year="Today" idx={6} label="NOW" dockAt={DOCK} />
      <WakePlace place="" at={0} dockAt={DOCK} yearAt={TODAY1} />

      {/* wake up: the phone, the lights, then out through the window to a solar farm at sunrise */}
      {/* both layers are clipped to the stage box x 160–1400, y 180–880 so the zoom never enters the ladder box */}
      <AbsoluteFill style={{ opacity: room, clipPath: 'inset(180px 520px 200px 160px round 16px)' }}>
        <AbsoluteFill style={{ transform: `scale(${1 + 0.04 * ease(f, LIGHTS, SOMEWHERE, 0, 1, DL_EASE.inOut) + 0.5 * pull})`, transformOrigin: '1180px 530px' }}><Room f={f} /></AbsoluteFill>
      </AbsoluteFill>
      <div style={{ position: 'absolute', left: 160, top: 180, width: 1240, height: 700, borderRadius: 16, overflow: 'hidden', opacity: hill }}>
        <div style={{ transform: `scale(${1.15 - 0.15 * pull})`, transformOrigin: '1020px 350px' }}><Hillside f={f} /></div>
      </div>

      {/* ×11 in ten years, and the share of the world's electricity */}
      <AbsoluteFill style={{ opacity: chart }}>
        <div style={{ position: 'absolute', left: 160, top: 230, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.muted }}>SOLAR ELECTRICITY · WHOLE WORLD</div>
        <svg width={1000} height={620} viewBox="0 0 1000 620" style={{ position: 'absolute', left: 160, top: 260 }}>
          <line x1={20} y1={560} x2={860} y2={560} stroke={DL.border} strokeWidth={3} />
          <rect x={90} y={560 - barH(TWH_2015) * g2015} width={140} height={barH(TWH_2015) * g2015} rx={6} fill={DL.dim} />
          <rect x={530} y={560 - barH(TWH_2025) * g2025} width={140} height={barH(TWH_2025) * g2025} rx={6} fill={SUN.mid} />
          <text x={160} y={600} textAnchor="middle" fill={DL.dim} fontFamily={DL_MONO} fontSize={28} opacity={g2015}>2015</text>
          <text x={600} y={600} textAnchor="middle" fill={SUN.mid} fontFamily={DL_MONO} fontSize={28} opacity={ease(f, THATS + 2, THATS + 8)}>2025</text>
          <text x={160} y={560 - barH(TWH_2015) - 20} textAnchor="middle" fill={DL.text} fontFamily={DL_MONO} fontSize={26} opacity={g2015}>≈ 250 TWh</text>
          <text x={600} y={560 - barH(TWH_2025) * g2025 - 20} textAnchor="middle" fill={DL.text} fontFamily={DL_MONO} fontSize={26} opacity={ease(f, THATS + 8, THATS + 14)}>≈ 2,770 TWh</text>
          <text x={380} y={330} textAnchor="middle" fill={SUN.mid} fontFamily={DL_SERIF} fontStyle="italic" fontSize={72} opacity={ease(f, THATS + 8, THATS + 14)}>≈ ×11</text>
        </svg>
        <svg width={440} height={440} viewBox="0 0 440 440" style={{ position: 'absolute', left: 1100, top: 300, transform: 'rotate(-90deg)' }}>
          <circle cx={220} cy={220} r={R} fill="none" stroke={DL.panel2} strokeWidth={34} />
          <circle cx={220} cy={220} r={R} fill="none" stroke={SUN.mid} strokeWidth={34} strokeDasharray={`${(CIRC * share) / 100} ${CIRC}`} />
        </svg>
        <div style={{ position: 'absolute', left: 1100, top: 300, width: 440, height: 440, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DL_SERIF, fontSize: 96, color: SUN.mid, fontVariantNumeric: 'tabular-nums', opacity: ease(f, NINE, NINE + 4), transform: `scale(${ease(f, NINE, NINE + 10, 1.25, 1)})` }}>8.7 %</div>
        <div style={{ ...rise(f, WORLDS - 2), position: 'absolute', left: 970, top: 760, width: 700, textAlign: 'center', fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.dim }}>OF ALL THE WORLD'S ELECTRICITY · 2025</div>
        <div style={{ position: 'absolute', left: 160, top: 880, fontFamily: DL_MONO, fontSize: 24, color: '#9aa0cc' }}>Ember · Global Electricity Review 2026</div>
      </AbsoluteFill>

      {/* the IEA quote and the farm; the Sun rises over it on "So what's the Sun to you now?" */}
      <AbsoluteFill style={{ opacity: farm }}>
        <div style={{ position: 'absolute', left: 160, top: 220, opacity: 1 - ease(f, SO1 - 6, SO1 + 4) }}>
          <QuoteCard who="QUOTE · INTERNATIONAL ENERGY AGENCY · WORLD ENERGY OUTLOOK 2020" at={IEA} w={1600} parts={[{ text: '“solar projects now offer', at: PROJECTS }, { text: 'some of the lowest cost electricity', at: CHEAPEST }, { text: 'ever seen”', at: SEEN1 }]} />
        </div>
        <div style={{ position: 'absolute', left: 900 - 126, top: 330 - 126 - 120 * sunQ + 120, opacity: sunQ }}><SunDisc size={140} id="todaySun" /></div>
        <div style={{ position: 'absolute', left: 1080, top: 170, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 130, color: DL.text, opacity: ease(f, NOW - 2, NOW + 6) * (1 - ease(f, POWER - 4, POWER + 4)), transform: `scale(${ease(f, NOW - 2, NOW + 8, 1.4, 1)})` }}>?</div>
        <div style={{ position: 'absolute', left: 160, top: 470 }}><Farm f={f} /></div>
      </AbsoluteFill>
      <HowWeSawIt text="POWER" at={POWER} dockAt={NASAS} slot={5} left={160} top={760} />

      {/* Parker Solar Probe, December 2024: through the corona */}
      <AbsoluteFill style={{ opacity: parker }}>
        <div style={{ position: 'absolute', left: 560 - 324, top: 560 - 324 }}>
          <SunDisc size={360} id="parkSun" glow={1.3 + 0.7 * ease(f, FLEW - 2, FLEW + 14) * (1 - ease(f, FASTER, FASTER + 30))} />
        </div>
        <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', left: 0, top: 0 }}>
          <ellipse cx={760} cy={560} rx={460} ry={240} fill="none" stroke={DL.border} strokeWidth={3} strokeDasharray="8 10" />
          <g transform={`translate(${px} ${py})`} opacity={ease(f, PARKER - 2, PARKER + 6)}>
            <rect x={-26} y={-6} width={52} height={12} fill="#f4ede4" />
            <rect x={-6} y={6} width={12} height={34} fill="#cfd8dc" />
            <line x1={-24} y1={24} x2={24} y2={24} stroke="#5aa0e0" strokeWidth={6} />
          </g>
        </svg>
        <div style={{ position: 'absolute', left: 160, top: 200 }}><SunChip text="THROUGH THE SUN'S OUTER ATMOSPHERE" at={ATMOS} color={DL.red} size={26} /></div>
        <div style={{ position: 'absolute', left: 1260, top: 500, width: 500, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <SunChip text="DEC 2024" at={FOUR} color={DL.dim} />
          <div style={{ ...rise(f, PARKER - 2), fontFamily: DL_SERIF, fontSize: 52, color: DL.text, whiteSpace: 'nowrap' }}>Parker Solar Probe</div>
          <SunChip text="FASTEST" at={FASTER} color={SUN.mid} size={44} />
          <div style={{ ...rise(f, HUMANS - 2), fontFamily: DL_MONO, fontSize: 30, letterSpacing: 3, color: DL.text }}>HUMAN-MADE OBJECT EVER</div>
        </div>
      </AbsoluteFill>

      {/* and yet: a dark room, a lit screen, the Sun outside the window */}
      {/* scaled 0.9 from the stage corner so it ends at y ≈ 790, clear of the two-line cliffhanger band; a slow push-in
          toward the window from "why" (clipped to the stage box) */}
      <AbsoluteFill style={{ opacity: den, clipPath: 'inset(180px 644px 284px 160px round 14px)' }}>
      <AbsoluteFill style={{ transform: `scale(${1 + 0.08 * push})`, transformOrigin: '1069px 432px' }}>
      <AbsoluteFill style={{ transform: 'scale(0.9)', transformOrigin: '160px 180px' }}>
        <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', left: 0, top: 0 }}>
          <rect x={160} y={180} width={1240} height={680} rx={16} fill="#1c1714" stroke={DL.border} strokeWidth={2} />
          {/* window: the Sun outside */}
          <g opacity={ease(f, WINDOWS - 2, WINDOWS + 8)}>
            <rect x={1020} y={300} width={300} height={320} rx={6} fill="#5aa0e0" opacity={0.55} />
            <circle cx={1200} cy={390} r={46 * (1 + 0.22 * sunPulse)} fill={SUN.mid} style={{ filter: `drop-shadow(0 0 ${22 + 30 * sunPulse}px ${SUN.rim})` }} />
            <rect x={1020} y={300} width={300} height={320} rx={6} fill="none" stroke="#4a3d33" strokeWidth={10} />
            <line x1={1170} y1={300} x2={1170} y2={620} stroke="#4a3d33" strokeWidth={8} />
          </g>
          {/* door: shuts on "indoors" */}
          <rect x={220} y={330} width={180} height={530} fill="#ffdca0" opacity={0.5 * (1 - door)} />
          <rect x={220} y={330} width={180} height={530} fill="none" stroke="#4a3d33" strokeWidth={6} />
          <rect x={220} y={330} width={180 * (0.15 + 0.85 * door)} height={530} fill="#4a3626" stroke="#2a2220" strokeWidth={3} />
          <circle cx={220 + 180 * (0.15 + 0.85 * door) - 22} cy={600} r={7} fill={SUN.mid} opacity={door} />
          {/* desk, screen, seated person */}
          <rect x={520} y={680} width={420} height={18} fill="#2a201a" />
          <rect x={600} y={520} width={260} height={160} rx={8} fill="#14141a" stroke="#55555e" strokeWidth={4} />
          <rect x={604} y={524} width={252} height={152} rx={6} fill="#8fd0ff" opacity={screen * (0.92 + 0.08 * Math.sin(f / 3))} style={{ filter: `drop-shadow(0 0 ${30 * screen}px #8fd0ff)` }} />
          <path d="M600 520 L 470 880 H 990 L 860 520 Z" fill="#8fd0ff" opacity={0.14 * screen} />
          <circle cx={730} cy={760} r={34} fill="#2a231f" />
          <path d="M660 860 C660 810 690 796 730 796 C770 796 800 810 800 860 Z" fill="#2a231f" />
          {/* "We plug into it.": the cable to the wall socket glows */}
          <rect x={1000} y={770} width={44} height={56} rx={6} fill="#2a201a" stroke={plug > 0.05 ? SUN.mid : '#55555e'} strokeWidth={3} />
          <circle cx={1015} cy={792} r={4} fill="#0c0a09" /><circle cx={1029} cy={792} r={4} fill="#0c0a09" />
          <path d="M860 640 Q 900 700 940 740 T 1010 800" stroke="#3a302a" strokeWidth={7} fill="none" />
          <path d="M860 640 Q 900 700 940 740 T 1010 800" stroke={SUN.mid} strokeWidth={7} fill="none" strokeDasharray="14 18" strokeDashoffset={f * 2} opacity={plug} style={{ filter: `drop-shadow(0 0 8px ${SUN.mid})` }} />
        </svg>
      </AbsoluteFill>
      </AbsoluteFill>
      </AbsoluteFill>

      {/* the relationship ladder (docked top-right) */}
      <ArcLadder rungs={[...pastRungs(5), { year: 'TODAY', label: 'POWER', at: NASAS + 10 }]} show={Math.max(ladA, ladB)} />

      <DidYouKnowThat at={DID} out={THATS + 6}>
        <span style={{ opacity: ease(f, FIVE, FIVE + 6) }}>in 2025,</span><span style={{ opacity: ease(f, SOLAR2, SOLAR2 + 6) }}> solar</span><span style={{ opacity: ease(f, C.at('power', 1), C.at('power', 1) + 6) }}> power</span><span style={{ opacity: ease(f, C.at('made', 1), C.at('made', 1) + 6) }}> made</span><span style={{ color: '#ff9a1f', fontStyle: 'italic' }}><span style={{ opacity: ease(f, ALMOST1, ALMOST1 + 6) }}> almost</span><span style={{ opacity: ease(f, ELEVEN - 2, ELEVEN + 6) }}> 11 times</span></span><span style={{ opacity: ease(f, MORE, MORE + 6) }}> more</span><span style={{ opacity: ease(f, C.at('electricity', 1), C.at('electricity', 1) + 6) }}> electricity</span><span style={{ opacity: ease(f, THAN, THAN + 6) }}> than it did</span><span style={{ opacity: ease(f, TEN, TEN + 6) }}> ten years</span><span style={{ opacity: ease(f, C.at('earlier', 1), C.at('earlier', 1) + 6) }}> earlier?</span>
        <CardSource at={C.at('power', 1)}>Ember · Global Electricity Review 2026</CardSource>
      </DidYouKnowThat>
      <SunCliffhanger next="THE ANSWER" parts={[{ text: "We've touched the Sun.", at: TOUCHED }, { text: 'We plug into it.', at: PLUG }, { text: 'So why have you still', at: SO2 }, { text: 'never seen it', at: NEVER }, { text: 'as it is today?', at: TODAY2 }]} />
      <EpisodeHud year={2026} episode="02" />
    </AbsoluteFill>
  );
};
export default Su2000;
