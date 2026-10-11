import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, EraHud, ClockFace, Vignette, WeekStrip, DidYouKnowThat, Cliffhanger, EraExit } from '../../lib/dykkit';
import vo from './vo.json';

// =============================================================================
// DYK 01 · 7/13 — ERA 4: the 1800s, and the midpoint reversal.
// 1858 cable (F7): 10 days → 16 hours. 1883 Day of Two Noons (F8). 1881 Beard,
// American Nervousness (F9): three suspects stamped; on "familiar" a phone
// joins the line-up — direct address. VO tc07 @1.0s.
// =============================================================================
export const compositionConfig = { id: 'Tc1800', durationInSeconds: 63.4667, fps: 30, width: 1920, height: 1080 };
const DUR = 1904;

const C = makeCue(vo, 'tc07-1800', 0.8);
const TOWN = C.at('town');
const NOON = C.at('twelve');
const TWICE = C.at('noon', 1);
const RAIL = C.at('railroads');
const CONT = C.at('continent');
const DID = C.at('Did');
const FIFTY = C.at('fifty', 1);
const TWO = C.at('two');
const CABLE = C.at('cable');
const TEN = C.at('ten');
const SIXTEEN = C.at('sixteen');
const MAN = C.at('man');
const MIDDAY = C.at('midday');
const TWICE_WORD = C.at('twice');
const MEN = C.at('men');
const LAW2 = C.at('law', 2);
const SHIP = C.at('ship');
const PEOPLE = C.at('People');
const WORK = C.at('work');
const MINUTES = C.at('minutes');
const WEEK1850 = [
  { d: 'MON', work: 0.62, color: '#71717a' },
  { d: 'TUE', work: 0.62, color: '#71717a' },
  { d: 'WED', work: 0.62, color: '#71717a' },
  { d: 'THU', work: 0.62, color: '#71717a' },
  { d: 'FRI', work: 0.62, color: '#71717a' },
  { d: 'SAT', work: 0.3, color: '#d4a017', tag: 'FREE FROM 2 PM' },
  { d: 'SUN', work: 0, color: '#b9b1a4', tag: 'REST' },
];
const BEARD = C.at('George');
const EPID = C.at('epidemic');
const STEAM = C.at('Steam');
const TELE = C.at('telegraph');
const PRESS = C.at('press');
const FAMILIAR = C.at('familiar');

const Suspect: React.FC<{ label: string; at: number }> = ({ label, at }) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [at, at + 7], [1.5, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ opacity: ease(f, at, at + 5), transform: `scale(${s}) rotate(-3deg)`, display: 'flex', alignItems: 'center', gap: 18, padding: '16px 26px', border: `3px solid ${DL.red}`, borderRadius: 8 }}>
      <span style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.red }}>SUSPECT</span>
      <span style={{ fontFamily: DL_SERIF, fontSize: 48, color: DL.text }}>{label}</span>
    </div>
  );
};

const Tc1800: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  // the noon clock rises on "midday"; "twelve" (chime) flashes its rim, "twice" pulses both clocks
  const p2 = ease(f, MIDDAY - 8, MIDDAY + 6) * (1 - ease(f, DID - 10, DID, 0, 1, DL_EASE.in));
  const strike12 = ease(f, NOON, NOON + 4) * (1 - ease(f, NOON + 6, NOON + 26));
  const twicePulse = ease(f, TWICE_WORD, TWICE_WORD + 4) * (1 - ease(f, TWICE_WORD + 6, TWICE_WORD + 22));
  const lawS = interpolate(f, [LAW2, LAW2 + 7], [1.5, 1], { ...DCLAMP, easing: DL_EASE.out });
  const pw = ease(f, FIFTY - 6, FIFTY + 8) * (1 - ease(f, CABLE - 12, CABLE, 0, 1, DL_EASE.in));
  const p1 = ease(f, CABLE - 4, CABLE + 10) * (1 - ease(f, BEARD - 14, BEARD, 0, 1, DL_EASE.in));
  const p3 = ease(f, BEARD - 2, BEARD + 12) * (1 - 0.75 * ease(f, MAN - 6, MAN + 8));
  const cableDraw = ease(f, CABLE, CABLE + 40, 0, 1, DL_EASE.inOut);
  const shipBar = ease(f, TEN - 4, TEN + 24, 0, 1, DL_EASE.inOut);
  const cableBar = ease(f, SIXTEEN - 4, SIXTEEN + 14, 0, 1, DL_EASE.out);
  const zones = [0, 1, 2, 3].map((i) => ease(f, RAIL - 6 + i * 6, RAIL + 8 + i * 6));
  const phoneIn = ease(f, FAMILIAR - 6, FAMILIAR + 12, 0, 1, DL_EASE.out);
  const buzz = f > FAMILIAR + 12 ? Math.sin(f * 1.7) * 3 * (Math.floor((f - FAMILIAR) / 20) % 2 === 0 ? 1 : 0) : 0;

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1e1309" />
      <Vignette />
      <EraExit dur={DUR}>
      <EraHeader year="1883" idx={4} label="NOON TWICE · THE WEEKEND · THE WIRE" place="A small American town · 18 November" dockAt={TOWN + 8} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 220, display: 'flex', justifyContent: 'center', opacity: pw }}>
        <WeekStrip year="1850 · BRITISH MILLS" days={WEEK1850} at={FIFTY} hot={5} hotAt={TWO} step={12} />
      </div>
      {/* "Soon, the men got the same. Even free time had to be written into law." */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 730, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40, opacity: pw }}>
        <div style={{ ...rise(f, MEN - 2), padding: '14px 28px', border: `2px solid ${DL.gold}`, borderRadius: 10, fontFamily: DL_MONO, fontSize: 28, letterSpacing: 4, color: DL.gold }}>SOON: MEN TOO</div>
        <div style={{ opacity: ease(f, LAW2, LAW2 + 5), transform: `scale(${lawS}) rotate(-4deg)`, padding: '14px 28px', border: `4px solid ${DL.red}`, borderRadius: 8, fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, letterSpacing: 5, color: DL.red }}>WRITTEN INTO LAW</div>
      </div>

      {/* ── part 1: the cable */}
      <AbsoluteFill style={{ opacity: p1 }}>
        <div style={{ position: 'absolute', left: 110, top: 250 }}>
          <svg width={900} height={500} viewBox="0 0 900 500">
            <rect x={140} y={60} width={620} height={380} rx={60} fill="#38bdf80a" stroke="#38bdf826" strokeWidth={2} />
            <text x={450} y={420} textAnchor="middle" fill={DL.faint} fontFamily={DL_MONO} fontSize={22} letterSpacing={8}>ATLANTIC FLOOR</text>
            <path d="M780 170 C600 330 300 330 120 200" fill="none" stroke={DL.border} strokeWidth={3} />
            <path d="M780 170 C600 330 300 330 120 200" fill="none" stroke={DL.gold} strokeWidth={6} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - cableDraw} />
            <circle cx={780} cy={170} r={11} fill={DL.text} />
            <circle cx={120} cy={200} r={11} fill={DL.text} />
            <text x={790} y={135} textAnchor="end" fill={DL.dim} fontFamily={DL_MONO} fontSize={22} letterSpacing={3}>IRELAND</text>
            <text x={110} y={165} fill={DL.dim} fontFamily={DL_MONO} fontSize={22} letterSpacing={3}>NEWFOUNDLAND</text>
          </svg>
          <div style={{ ...rise(f, CABLE + 10), fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.muted }}>AUG 1858 · QUEEN VICTORIA → PRESIDENT BUCHANAN</div>
        </div>
        <div style={{ position: 'absolute', left: 1080, top: 300, width: 720, display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ opacity: ease(f, TEN - 6, TEN + 6) }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3 }}><span style={{ color: DL.muted }}>BY SHIP</span><span style={{ color: DL.text }}>≈ 10 DAYS</span></div>
            <div style={{ height: 26, marginTop: 12, background: DL.panel2, borderRadius: 6 }}><div style={{ height: '100%', width: `${shipBar * 100}%`, background: DL.muted, borderRadius: 6 }} /></div>
          </div>
          <div style={{ opacity: ease(f, SIXTEEN - 6, SIXTEEN + 6) }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3 }}><span style={{ color: DL.gold }}>BY CABLE</span><span style={{ color: DL.gold }}>≈ 16 HOURS</span></div>
            <div style={{ height: 26, marginTop: 12, background: DL.panel2, borderRadius: 6 }}><div style={{ height: '100%', width: `${cableBar * 6.7}%`, background: DL.gold, borderRadius: 6, boxShadow: `0 0 18px ${DL.gold}88` }} /></div>
          </div>
          <div style={{ ...rise(f, SHIP + 6), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 52, color: DL.text }}>Fifteen times faster.</div>
        </div>
      </AbsoluteFill>

      {/* ── part 2: the day of two noons */}
      <AbsoluteFill style={{ opacity: p2 }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 230, display: 'flex', justifyContent: 'center', gap: 22 }}>
          {['EASTERN', 'CENTRAL', 'MOUNTAIN', 'PACIFIC'].map((z, i) => (
            <div key={z} style={{ width: 300, padding: '14px 0', textAlign: 'center', borderTop: `4px solid ${i % 2 ? DL.gold : DL.red}`, opacity: zones[i], fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DL.dim }}>{z}</div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 360, display: 'flex', justifyContent: 'center', gap: 160 }}>
          {/* centred alone until "noon again", then it slides left for the second clock */}
          <div style={{ opacity: rise(f, MIDDAY - 4).opacity, transform: `translate(${230 * (1 - ease(f, TWICE - 8, TWICE + 4, 0, 1, DL_EASE.inOut))}px, ${ease(f, MIDDAY - 4, MIDDAY + 11, 26, 0)}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <div style={{ borderRadius: '50%', transform: `scale(${1 + 0.06 * (strike12 + twicePulse)})`, boxShadow: `0 0 ${60 * (strike12 + twicePulse)}px ${DL.gold}` }}><ClockFace size={300} hourDeg={0} minDeg={0} /></div>
            <span style={{ opacity: ease(f, NOON - 2, NOON + 6), fontFamily: DL_MONO, fontSize: 30, letterSpacing: 6, color: DL.text }}>NOON</span>
          </div>
          <div style={{ ...rise(f, TWICE - 4), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <div style={{ borderRadius: '50%', transform: `scale(${1 + 0.06 * twicePulse})`, boxShadow: `0 0 ${60 * twicePulse}px ${DL.red}` }}><ClockFace size={300} hourDeg={0} minDeg={0} ring={DL.red} /></div>
            <span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 6, color: DL.red }}>NOON — AGAIN</span>
          </div>
        </div>
        <div style={{ ...rise(f, RAIL + 6), position: 'absolute', left: 0, right: 0, top: 820, textAlign: 'center', fontFamily: DL_MONO, fontSize: 26, letterSpacing: 5, color: DL.muted }}>
          18 NOV 1883 · THE RAILROADS RESET A CONTINENT
        </div>
      </AbsoluteFill>

      {/* ── part 3: Beard's epidemic */}
      <AbsoluteFill style={{ opacity: p3 }}>
        <div style={{ position: 'absolute', left: 120, top: 230, width: 520, height: 700, padding: '50px 46px', boxSizing: 'border-box', background: '#e9e1cf', borderRadius: 6, boxShadow: '0 30px 60px #000000aa', transform: `rotate(-2deg) translateY(${(1 - p3) * 30}px)` }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 4, color: '#5a4a3a' }}>NEW YORK · 1881</div>
          <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 70, lineHeight: 1.0, color: '#1a1410', marginTop: 26 }}>American Nervousness</div>
          <div style={{ height: 3, background: '#1a1410', margin: '30px 0' }} />
          <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 36, color: '#3a2e24' }}>George M. Beard, M.D.</div>
          <div style={{ ...rise(f, EPID), fontFamily: DL_SANS, fontSize: 30, lineHeight: 1.4, color: '#3a2e24', marginTop: 34 }}>A new epidemic of nervous exhaustion, caused by modern life.</div>
        </div>
        <div style={{ position: 'absolute', left: 760, top: 270, display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'flex-start' }}>
          <Suspect label="Steam power" at={STEAM} />
          <Suspect label="The telegraph" at={TELE} />
          <Suspect label="The daily press" at={PRESS} />
        </div>
        {/* the twist: today's suspect */}
        <div style={{ position: 'absolute', left: 1420, top: 240, opacity: phoneIn, transform: `translateX(${(1 - phoneIn) * 80 + buzz}px)` }}>
          <div style={{ width: 250, height: 500, borderRadius: 40, background: DL.panel, border: `3px solid ${DL.border}`, padding: 18, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ height: 62, borderRadius: 14, background: DL.panel2, border: `1px solid ${DL.border}`, opacity: ease(f, FAMILIAR + 6 + i * 5, FAMILIAR + 14 + i * 5), display: 'flex', alignItems: 'center', padding: '0 14px', gap: 12 }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: i % 2 ? DL.red : DL.gold }} />
                <div style={{ flex: 1, height: 9, borderRadius: 4, background: '#ffffff1f' }} />
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', top: -18, right: -18, width: 56, height: 56, borderRadius: '50%', background: DL.red, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DL_SANS, fontWeight: 600, fontSize: 26, color: DL.text }}>99+</div>
        </div>
        <div style={{ ...rise(f, FAMILIAR - 2), position: 'absolute', left: 760, top: 700, fontFamily: DL_SERIF, fontSize: 84, color: DL.gold, fontStyle: 'italic' }}>Sound familiar?</div>
        <div style={{ ...rise(f, PEOPLE - 2), position: 'absolute', left: 760, top: 820, fontFamily: DL_SANS, fontSize: 36, color: DL.warm }}>Complaining about speed — a century before your phone.</div>
      </AbsoluteFill>

      <DidYouKnowThat at={DID} out={FIFTY} source="Factory Act 1850 — mill work for women and children ended at 2 pm on Saturdays">
        the weekend began with <span style={{ color: '#ff9a1f', fontStyle: 'italic' }}>half a Saturday</span>.
      </DidYouKnowThat>
      <Cliffhanger next="1914" parts={[{ text: 'Next: one man', at: MAN }, { text: 'turns half a day of work', at: WORK }, { text: 'into 93 minutes.', at: MINUTES }]} />
      </EraExit>
      <EraHud year={1883} />
    </AbsoluteFill>
  );
};
export default Tc1800;
