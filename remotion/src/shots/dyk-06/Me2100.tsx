import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { DYT } from '../../lib/dytbrand';
import { makeCue, ease, useShotFade, EraHeader, Vignette } from '../../lib/dykkit';
import {
  EpisodeHud, MedLadder, medRungs, NEXT_RUNG, Label, Source, StampText, OnWord, QGRAD, YearsStrip, PredictionTag,
  Baby, MedProp, hold, pane,
} from '../../lib/dykkit-medicine';
import vo from './vo.json';

// =============================================================================
// DYK 06 · 12/14 — 2100: evidence → scenario (RESEARCH M9, M10). PredictionTag (PREDICTION · a scenario, not a fact) from
// the header slam to the last frame. Opens on the docked ladder with the dashed 2100 "?" rung; the 2100 header slams on
// "twenty" (1st), a dawn on "morning". THE EVIDENCE → on "evidence". 1 (M9): THE UNITED NATIONS EXPECTS on its words,
// ≈ 82 · WORLD · BY 2100 on "eighty", the YEARS strip extends dashed to ≈ 82 (projection). 2 (M10, 2021): three vials dim on
// "wearing out"; ≈ 1.1 million on "one point one million", DIRECTLY CAUSED BY BACTERIA THAT RESIST ANTIBIOTICS on its words
// (germs on "bacteria"); + ≈ 4.7 million more · RESISTANCE PLAYED A PART on its words. 3 (M10 forecast): A STUDY IN THE
// LANCET FORECASTS · WITHOUT MORE ACTION; a dashed line 2021 → 2050 draws from "resistant" to ≈ 1.9 million DEATHS A YEAR
// BY 2050 (source: forecast, not a fact). The scenario: ONE SCENARIO · NOT A FACT; IF WE KEEP TESTING · AND KEEP OUR
// DRUGS WORKING → a baby on "baby", could live past 80 on "eighty" (2nd); IF RESISTANCE KEEPS RISING → germs multiply on
// "rising" and the 2100 rung fills AN ARMS RACE? on the same word; SOME CURES FROM 1941 (penicillin vial) MIGHT FAIL on
// "fail" while the vial dims. Callback: 1799 · DOCTORS TRUSTED AUTHORITY / 2100 · WHAT WILL YOU TRUST? (gradient) on
// "trust?". No 2100 number except the UN's; the 2050 figures are the Lancet's. VO me11 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Me2100', durationInSeconds: 58.1, fps: 30, width: 1920, height: 1080 };
const DUR = 1743;

const C = makeCue(vo, 'me11-2100', 0.8);
const SO1 = C.at('So', 1);
const MEDICINE = C.at('medicine');
const LOOK = C.at('look');
const TWENTY1 = C.at('twenty', 1);
const MORNING = C.at('morning');
const YET = C.at('yet.');
const EVIDENCE = C.at('evidence.');
const NATIONS = C.at('Nations');
const EXPECTS = C.at('expects');
const LIFE = C.at('life');
const WORLDWIDE = C.at('worldwide');
const EIGHTY1 = C.at('eighty', 1);
const BUT2 = C.at('But', 2); // 'But some of our best drugs' (1 = 'But we can follow')
const BEST = C.at('best');
const DRUGS1 = C.at('drugs', 1);
const WEARING = C.at('wearing');
const OUT = C.at('out.');
const TWENTY3 = C.at('twenty', 3); // 'In twenty twenty one'
const ONE4 = C.at('one', 4); // 'one point one million'
const MILLION1 = C.at('million', 1);
const DIRECTLY1 = C.at('directly', 1);
const BACTERIA = C.at('bacteria');
const RESIST = C.at('resist');
const RESISTANCE1 = C.at('resistance', 1);
const PART = C.at('part');
const FOUR = C.at('four');
const MILLION2 = C.at('million', 2);
const STUDY = C.at('study');
const FORECASTS = C.at('forecasts');
const WITHOUT = C.at('without');
const RESISTANT = C.at('resistant');
const ONE6 = C.at('one', 6); // 'about one point nine million'
const MILLION3 = C.at('million', 3);
const YEAR = C.at('year');
const TWENTY5 = C.at('twenty', 5); // 'by twenty fifty'
const FIFTY = C.at('fifty.');
const SO2 = C.at('So', 2); // 'So here's one scenario' (1 = 'So what could medicine')
const SCENARIO = C.at('scenario.');
const FACT = C.at('fact.');
const TESTING = C.at('testing,');
const WORKING = C.at('working,');
const BABY = C.at('baby');
const BORN = C.at('born');
const TWENTY6 = C.at('twenty', 6); // 'a baby born in twenty one hundred'
const LIVE = C.at('live');
const EIGHTY2 = C.at('eighty.', 2);
const RESISTANCE2 = C.at('resistance', 2);
const RISING = C.at('rising,');
const CURES = C.at('cures');
const NINETEEN = C.at('nineteen');
const MIGHT = C.at('might');
const FAIL = C.at('fail.');
const SEVENTEEN = C.at('seventeen');
const DOCTORS = C.at('doctors');
const TRUSTED = C.at('trusted');
const AUTHORITY = C.at('authority.');
const TWENTY7 = C.at('twenty', 7); // 'In twenty one hundred, what will you trust?'
const WHAT2 = C.at('what', 2);
const TRUST = C.at('trust?');
// panel boundaries: each panel holds its last reveal ≥ HOLD_F (kit `hold`); the cue table's H() uses the same numbers
const EV1_END = hold(EIGHTY1, BUT2);
const EV2_END = hold(MILLION2, STUDY);
const EV3_END = hold(FIFTY, SO2);
const SCEN_END = hold(FAIL, SEVENTEEN);

// the 2050 forecast line (illustration of two published points: 2021 1.14 m → 2050 1.91 m)
const Forecast: React.FC<{ draw: number; end: number }> = ({ draw, end }) => {
  const x2 = 60 + 640 * draw;
  const y2 = 230 - 120 * draw;
  return (
    <svg width={780} height={300} viewBox="0 0 780 300">
      <line x1={40} y1={270} x2={740} y2={270} stroke={DL.border} strokeWidth={3} />
      <line x1={40} y1={30} x2={40} y2={270} stroke={DL.border} strokeWidth={3} />
      <circle cx={60} cy={230} r={12} fill={DL.red} />
      <text x={60} y={296} textAnchor="middle" fontFamily={DL_MONO} fontSize={24} fill={DL.dim}>2021 · 1.14 m</text>
      <line x1={60} y1={230} x2={x2} y2={y2} stroke={DL.red} strokeWidth={7} strokeDasharray="18 12" />
      <circle cx={700} cy={110} r={14} fill="none" stroke={DL.red} strokeWidth={5} opacity={end} />
      <text x={700} y={296} textAnchor="middle" fontFamily={DL_MONO} fontSize={24} fill={DL.red} opacity={end}>2050</text>
    </svg>
  );
};

const Me2100: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const ev1 = pane(f, NATIONS - 4, EV1_END);
  const ev2 = pane(f, EV1_END, EV2_END);
  const ev3 = pane(f, EV2_END, EV3_END);
  const scen = pane(f, EV3_END + 2, SCEN_END);
  const call = ease(f, SCEN_END + 4, SCEN_END + 16);
  // the docked ladder: full until the header slams, dimmed under the evidence, back for the scenario, out for the callback
  const ladder = (1 - ease(f, TWENTY1 - 6, TWENTY1) * (1 - ease(f, MORNING + 28, MORNING + 40))) * (1 - 0.55 * ease(f, EVIDENCE, EVIDENCE + 12) * (1 - ease(f, EV3_END - 6, EV3_END + 8))) * (1 - ease(f, SCEN_END - 6, SCEN_END + 4));
  const wear = ease(f, WEARING - 2, OUT + 10);
  const draw = ease(f, RESISTANT, MILLION3);
  const germs = Math.round(6 * ease(f, RISING - 2, RISING + 40)); // 1 → 7 germs over 1.4 s
  const vialFail = ease(f, MIGHT, FAIL + 12);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0a1a1e" />
      <Vignette />
      {/* the question, word by word, until the header slams */}
      <div style={{ position: 'absolute', left: 160, top: 300, width: 1100, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 76, color: DL.text, opacity: 1 - ease(f, TWENTY1 - 6, TWENTY1) }}>
        <span style={{ opacity: ease(f, SO1 - 2, SO1 + 4) }}>So what could</span>
        <span style={{ color: DL.gold, opacity: ease(f, MEDICINE - 2, MEDICINE + 4) }}> medicine</span>
        <span style={{ opacity: ease(f, LOOK - 2, LOOK + 4) }}> look like…</span>
      </div>
      <Sequence from={TWENTY1} layout="none"><EraHeader year="2100" idx={7} label="" dockAt={MORNING - TWENTY1 + 10} /></Sequence>
      <PredictionTag at={TWENTY1} />
      <div style={{ position: 'absolute', left: 160, top: 180, opacity: ease(f, EVIDENCE - 2, EVIDENCE + 4) * (1 - ease(f, EV3_END - 4, EV3_END)) }}>
        <Label at={EVIDENCE} color={DL.gold} size={28}>THE EVIDENCE →</Label>
      </div>

      {/* "That morning hasn't happened yet": a dawn rises on "morning" until the evidence */}
      <AbsoluteFill style={{ opacity: ease(f, MORNING - 4, MORNING + 10) * (1 - ease(f, NATIONS - 8, NATIONS)) }}>
        <div style={{ position: 'absolute', left: 160, right: 160, top: 560, height: 360, background: `radial-gradient(ellipse at 50% 100%, ${DL.gold}44, transparent 70%)` }} />
        <div style={{ position: 'absolute', left: 960 - 90, top: 860 - 260 * ease(f, MORNING, NATIONS), width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, #ffe9b0, ${DL.gold}aa 55%, transparent 72%)` }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center', fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, color: DL.dim, opacity: ease(f, YET - 2, YET + 4) }}>hasn't happened yet</div>
      </AbsoluteFill>

      {/* evidence 1: the UN projection (M9) */}
      <AbsoluteFill style={{ opacity: ev1 }}>
        <div style={{ position: 'absolute', left: 160, top: 260 }}><Label at={NATIONS} color={DL.sky} size={32}>THE UNITED NATIONS<OnWord at={EXPECTS}> EXPECTS</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 310 }}><Label at={LIFE} color={DL.dim} size={28}>LIFE EXPECTANCY<OnWord at={WORLDWIDE}> · WORLDWIDE</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 370, display: 'flex', alignItems: 'baseline', gap: 26, opacity: ease(f, EIGHTY1 - 2, EIGHTY1 + 4) }}>
          <span style={{ fontFamily: DL_SERIF, fontSize: 160, lineHeight: 1, color: DL.sky }}>≈ 82</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.dim }}>BY 2100 · A PROJECTION</span>
        </div>
        <svg width={1000} height={110} viewBox="0 0 1000 110" style={{ position: 'absolute', left: 160, top: 620, opacity: ease(f, LIFE - 2, LIFE + 4) }}>
          <text x={0} y={30} fontFamily={DL_MONO} fontSize={26} fill={DL.dim}>2024 · ≈73</text>
          <line x1={10} y1={70} x2={10 + 960 * ease(f, LIFE, EIGHTY1)} y2={70} stroke={DL.sky} strokeWidth={6} strokeDasharray="16 12" />
          <circle cx={10} cy={70} r={10} fill={DL.gold} />
          <text x={990} y={30} textAnchor="end" fontFamily={DL_MONO} fontSize={26} fill={DL.sky} opacity={ease(f, EIGHTY1 - 2, EIGHTY1 + 4)}>2100 · ≈82</text>
        </svg>
        <div style={{ position: 'absolute', left: 160, top: 560 }}><Source at={EIGHTY1}>UN World Population Prospects 2024, medium variant: 81.7 years (world, 2100)</Source></div>
        <YearsStrip items={[{ year: '2024', value: '≈73', place: 'WORLD', at: -1 }, { year: '2100', value: '≈82', place: 'WORLD · UN PROJECTION', at: EIGHTY1, projection: true }]} show={1} />
      </AbsoluteFill>

      {/* evidence 2: our best drugs are wearing out (M10, 2021) */}
      <AbsoluteFill style={{ opacity: ev2 }}>
        <div style={{ position: 'absolute', left: 160, top: 260 }}><Label at={EV1_END} color={DL.red} size={32}>BUT SOME OF OUR<OnWord at={BEST}> BEST DRUGS</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 320, display: 'flex', alignItems: 'center', gap: 20, opacity: ease(f, DRUGS1 - 2, DRUGS1 + 4) }}>
          {[0, 1, 2].map((i) => <MedProp key={i} kind="vial" size={110} level={1 - 0.7 * wear} dim={0.8 * wear} />)}
          <div style={{ marginLeft: 20 }}><Label at={WEARING} color={DL.dim} size={32}>ARE WEARING<OnWord at={OUT}> OUT</OnWord></Label></div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 500, width: 780 }}>
          <Label at={TWENTY3} color={DL.dim} size={28}>IN 2021</Label>
          <div style={{ marginTop: 6, fontFamily: DL_SERIF, fontSize: 110, lineHeight: 1, color: DL.red }}><span style={{ opacity: ease(f, ONE4 - 2, ONE4 + 4) }}>≈ 1.1</span><span style={{ opacity: ease(f, MILLION1 - 2, MILLION1 + 4) }}> million</span></div>
          <div style={{ marginTop: 14, fontFamily: DL_MONO, fontSize: 28, lineHeight: 1.35, letterSpacing: 2, color: DL.text }}>
            <span style={{ opacity: ease(f, DIRECTLY1 - 2, DIRECTLY1 + 4) }}>DEATHS DIRECTLY CAUSED</span>
            <span style={{ opacity: ease(f, BACTERIA - 2, BACTERIA + 4) }}> BY BACTERIA</span>
            <span style={{ opacity: ease(f, RESIST - 2, RESIST + 4) }}> THAT RESIST ANTIBIOTICS</span>
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 14, opacity: ease(f, BACTERIA - 2, BACTERIA + 6) }}>{[0, 1, 2, 3].map((i) => <MedProp key={i} kind="germ" size={70} f={f + i * 40} />)}</div>
        </div>
        <div style={{ position: 'absolute', left: 1000, top: 580, width: 760 }}>
          <Label at={RESISTANCE1} color={DL.dim} size={28}>RESISTANCE<OnWord at={PART}> PLAYED A PART IN</OnWord></Label>
          <div style={{ marginTop: 6, fontFamily: DL_SERIF, fontSize: 96, lineHeight: 1, color: DL.gold }}><span style={{ opacity: ease(f, FOUR - 2, FOUR + 4) }}>+ ≈ 4.7</span><span style={{ opacity: ease(f, MILLION2 - 2, MILLION2 + 4) }}> million more</span></div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 860, width: 1600 }}><Source at={DIRECTLY1}>Lancet GRAM 2024 · 2021: 1.14 million deaths attributable to resistant bacteria<OnWord at={MILLION2}> · 4.71 million associated</OnWord></Source></div>
      </AbsoluteFill>

      {/* evidence 3: the Lancet forecast to 2050 (M10) */}
      <AbsoluteFill style={{ opacity: ev3 }}>
        <div style={{ position: 'absolute', left: 160, top: 260 }}><Label at={EV2_END} color={DL.gold} size={32}>A STUDY IN THE LANCET<OnWord at={FORECASTS}> FORECASTS</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 320 }}><Source at={FORECASTS}>Lancet GRAM 2024 · forecast, not a fact</Source></div>
        <div style={{ position: 'absolute', left: 160, top: 380 }}><StampText text="WITHOUT MORE ACTION" at={WITHOUT} color={DL.red} size={34} tilt={-2} /></div>
        <div style={{ position: 'absolute', left: 160, top: 500, opacity: ease(f, RESISTANT - 2, RESISTANT + 4) }}><Forecast draw={draw} end={ease(f, TWENTY5 - 2, TWENTY5 + 4)} /></div>
        <div style={{ position: 'absolute', left: 1000, top: 580, width: 760 }}>
          <Label at={RESISTANT} color={DL.dim} size={28}>RESISTANT INFECTIONS COULD CAUSE</Label>
          <div style={{ marginTop: 6, fontFamily: DL_SERIF, fontSize: 110, lineHeight: 1, color: DL.red }}><span style={{ opacity: ease(f, ONE6 - 2, ONE6 + 4) }}>≈ 1.9</span><span style={{ opacity: ease(f, MILLION3 - 2, MILLION3 + 4) }}> million</span></div>
          <div style={{ marginTop: 12 }}><Label at={YEAR} color={DL.text} size={30}>DEATHS A YEAR<OnWord at={TWENTY5}> · BY 2050</OnWord></Label></div>
        </div>
      </AbsoluteFill>

      {/* the scenario */}
      <AbsoluteFill style={{ opacity: scen }}>
        <div style={{ position: 'absolute', left: 160, top: 250 }}><StampText text={f >= FACT ? 'ONE SCENARIO · NOT A FACT' : 'ONE SCENARIO'} at={Math.max(SCENARIO, EV3_END)} color={DL.red} size={38} tilt={-2} /></div>
        <div style={{ position: 'absolute', left: 160, top: 560, width: 760, height: 330, boxSizing: 'border-box', padding: '24px 30px', borderRadius: 18, border: `2px solid ${DL.green}`, background: '#0e0b0af0', opacity: ease(f, TESTING - 2, TESTING + 4) }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DL.green }}>IF WE KEEP TESTING<OnWord at={WORKING}> · AND KEEP OUR DRUGS WORKING</OnWord></div>
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 26 }}>
            <div style={{ opacity: ease(f, BABY - 2, BABY + 4), transform: `scale(${ease(f, BABY - 2, BABY + 10, 1.25, 1)})` }}><Baby size={150} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Label at={BORN} color={DL.dim} size={28}>A BABY BORN<OnWord at={TWENTY6}> IN 2100</OnWord></Label>
              <div style={{ fontFamily: DL_SERIF, fontSize: 56, lineHeight: 1.1, color: DL.text, opacity: ease(f, LIVE - 2, LIVE + 4) }}>could live<span style={{ color: DL.gold, opacity: ease(f, EIGHTY2 - 2, EIGHTY2 + 4), whiteSpace: 'nowrap' }}> past 80</span></div>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 1000, top: 560, width: 760, height: 330, boxSizing: 'border-box', padding: '24px 30px', borderRadius: 18, border: `2px dashed ${DL.red}`, background: '#0e0b0af0', opacity: ease(f, RESISTANCE2 - 2, RESISTANCE2 + 4) }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DL.red }}>IF RESISTANCE<OnWord at={RISING}> KEEPS RISING</OnWord></div>
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 30 }}>
            <div style={{ position: 'relative', width: 260, height: 200 }}>
              {Array.from({ length: 7 }, (_, i) => {
                const pos = [[90, 60], [10, 10], [170, 0], [0, 110], [180, 110], [90, 140], [100, -20]][i];
                return <div key={i} style={{ position: 'absolute', left: pos[0], top: pos[1], opacity: i <= germs ? ease(f, (i === 0 ? RESISTANCE2 : RISING + i * 6) - 2, (i === 0 ? RESISTANCE2 : RISING + i * 6) + 4) : 0 }}><MedProp kind="germ" size={70} f={f + i * 30} /></div>;
              })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: ease(f, CURES - 2, CURES + 4) }}>
              <MedProp kind="vial" size={120} level={1 - 0.8 * vialFail} dim={vialFail} />
              <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.dim, whiteSpace: 'nowrap' }}>SOME CURES<OnWord at={NINETEEN}> FROM 1941</OnWord></span>
            </div>
          </div>
          <div style={{ position: 'absolute', right: 26, bottom: 22 }}><StampText text="MIGHT FAIL" at={FAIL} color={DL.red} size={34} tilt={-5} /></div>
        </div>
      </AbsoluteFill>

      {/* callback: 1799 trusted authority; 2100 asks the viewer */}
      <AbsoluteFill style={{ opacity: call }}>
        <div style={{ position: 'absolute', left: 160, top: 260, width: 760, height: 360, padding: '26px 30px', boxSizing: 'border-box', borderRadius: 18, border: `2px solid ${DL.sky}`, background: '#0e0b0af0' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.sky }}>1799<OnWord at={DOCTORS}> · DOCTORS</OnWord><OnWord at={TRUSTED}> TRUSTED</OnWord></div>
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 30 }}>
            <MedProp kind="lancet" size={110} />
            <MedProp kind="bowl" size={110} />
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 52, letterSpacing: 4, color: DL.gold, opacity: ease(f, AUTHORITY - 2, AUTHORITY + 4), transform: `scale(${ease(f, AUTHORITY - 2, AUTHORITY + 10, 1.3, 1)})`, display: 'inline-block' }}>AUTHORITY</span>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 1000, top: 260, width: 760, height: 360, padding: '26px 30px', boxSizing: 'border-box', borderRadius: 18, border: `2px dashed ${DL.red}`, background: '#0e0b0af0', opacity: ease(f, TWENTY7 - 2, TWENTY7 + 4) }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.red }}>2100<OnWord at={WHAT2}> · WHAT WILL YOU</OnWord></div>
          <div style={{ marginTop: 30, fontFamily: DL_SERIF, fontWeight: 600, fontSize: 130, lineHeight: 1, display: 'inline-block', background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: ease(f, TRUST - 2, TRUST + 4), transform: `scale(${ease(f, TRUST - 2, TRUST + 12, 1.3, 1)})`, transformOrigin: 'left center', filter: `drop-shadow(0 0 22px ${DYT.magenta}88)` }}>trust?</div>
        </div>
      </AbsoluteFill>

      <MedLadder rungs={medRungs(6)} show={ladder} top={180} next={{ at: 0, fillAt: RISING, fill: NEXT_RUNG }} />
      <EpisodeHud year={f >= TWENTY1 ? 2100 : 'TODAY'} episode="06" prediction={f >= TWENTY1} />
    </AbsoluteFill>
  );
};
export default Me2100;
