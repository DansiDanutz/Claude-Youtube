import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, win, SunCliffhanger, FoodChip, FoodLadder, foodRungs, Label, Source, StampText, AskMark, OnWord, PeopleRow, Kid,
  Food, FoodTag, PlateWeek, YearsStrip, YEARS_PAST, yearsUpTo, Baby, CountUp, hold, type FoodKind, pane,
} from '../../lib/dykkit-food';
import vo from './vo.json';

// =============================================================================
// DYK 05 · 8/14 — ERA 4: 1915, Rankin prison farm, Mississippi (RESEARCH F20–F24). Header + "Mississippi" on its word;
// eleven men line up on "Eleven". DYK (F20): HEALTHY MEN → SICK on "sick", ON PURPOSE on "purpose", A POOR SOUTHERN
// FAMILY'S ORDINARY DIET on its words; a pardon on "pardon". THE PLATE (F20): a week of the same four foods on "plate",
// each tagged on its word (cornbread, grits, fatty salt pork, molasses); milk, fresh meat and greens crossed out on their
// words. THE BODY (F20–F22): ≈ 5 MONTHS on "months", about half the men turn red on "half", PELLAGRA stamp, RASHES ·
// STOMACH TROUBLE · CONFUSION · EVEN DEATH on their words; ≈ 100,000 deaths on "thousand" (one widely quoted estimate).
// WHAT CHANGED (F23): JOSEPH GOLDBERGER on "Joseph", a germ crossed out on "germ", SOMETHING MISSING on "missing";
// NIACIN · A B VITAMIN on its words; 1940s flour + NIACIN on "flour", WAGES and VARIED FOOD on their words, PELLAGRA fades
// on "fades". "So what is food now?" = "?"; SOMETHING WE FIX chip on "fix." (slot 3, docks). THE YEARS (F24): USA ≈ 55
// on "fifty" + strip pill. Cliffhanger: an empty bowl, NEXT ▸ 1966. Ethics: neutral, no imagery of suffering; the
// volunteers were white prisoners, pellagra hit poor Black and white Southerners (no implication either way). VO fd07 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Fd1915', durationInSeconds: 73.2, fps: 30, width: 1920, height: 1080 };
const DUR = 2196;

const C = makeCue(vo, 'fd07-1915', 0.8);
const NINETEEN = C.at('nineteen', 1);
const PRISON = C.at('prison');
const MISSISSIPPI = C.at('Mississippi.');
const DOCK = MISSISSIPPI + 46;
const ELEVEN = C.at('Eleven');
const BREAKFAST = C.at('breakfast.');
const DID = C.at('Did');
const HEALTHY = C.at('healthy');
const SICK = C.at('sick');
const PURPOSE = C.at('purpose,');
const POOR = C.at('poor');
const ORDINARY = C.at('ordinary');
const DIET1 = C.at('diet?', 1);
const VOLUNTEERS = C.at('volunteers');
const PARDON = C.at('pardon.');
const PLATE = C.at('plate.');
const CORNBREAD = C.at('Cornbread');
const GRITS = C.at('grits.');
const SALT = C.at('salt');
const MOLASSES = C.at('Molasses.');
const HARDLY = C.at('Hardly');
const MILK = C.at('milk,');
const MEAT = C.at('meat');
const GREENS = C.at('greens.');
const AFTER = C.at('After');
const MONTHS = C.at('months,');
const HALF = C.at('half');
const PELLAGRA1 = C.at('pellagra.', 1);
const RASHES = C.at('Rashes,');
const STOMACH = C.at('stomach');
const CONFUSION = C.at('confusion,');
const DEATH = C.at('death.');
const WIDELY = C.at('widely');
const HUNDRED = C.at('hundred');
const THOUSAND = C.at('thousand');
const SOUTH = C.at('South.');
const DOCTOR = C.at('doctor,');
const JOSEPH = C.at('Joseph');
const ISNT = C.at("isn't", 1);
const GERM = C.at('germ.');
const MISSING1 = C.at('missing', 1);
const LATER = C.at('Later,');
const NIACIN = C.at('Niacin,');
const VITAMIN = C.at('vitamin.');
const FORTIES = C.at('forties,');
const FLOUR = C.at('flour');
const MUCH = C.at('much');
const WAGES = C.at('wages');
const VARIED = C.at('varied');
const FADES = C.at('fades.');
const SO = C.at('So');
const NOW = C.at('now?');
const FIX = C.at('fix.');
const CHIP_DOCK = FIX + 80;
const ADD = C.at('Add');
const DISAPPEARS = C.at('disappears.');
const AMERICA2 = C.at('America', 2);
const FIFTY = C.at('fifty');
const BUT = C.at('But');
const FIXING = C.at('fixing');
const ENOUGH = C.at('enough');
const HELPS = C.at('helps');
const IT_END = C.at('it.', 3); // 'enough of it.' (1 = 'it killed', 2 = 'It comes')
const INDIA = C.at('India,');
const ISNT2 = C.at("isn't.", 2);
const DOCTORS = C.at('doctors');
const KILLED = C.at('killed');
const SHOWS = C.at('shows');
const NAMED = C.at('named.');
const SOMETHING2 = C.at('Something', 2); // 'Something we fix' (1 = 'something missing')
const NEWBORN = C.at('newborn');
const ABOUT2 = C.at('about', 2); // 'expect about fifty five' (1 = 'about five months')
const FIVE2 = C.at('five', 2);
const FOOD3 = C.at('food', 3); // 'But fixing food' (1 = 'varied food', 2 = 'is food now')
// audit round 1: each panel holds ≥ 1.5 s after its last reveal
const EVEN = C.at('even');
const BODY_END = hold(EVEN, WIDELY);
const GOLD_END = hold(MISSING1, LATER);
const NIAC_END = hold(FADES, SO);
const YEARS_END = hold(FIVE2, BUT);
const PROMISED = C.at('promised');
const CARD_END = hold(PROMISED, PLATE) + 6; // DYK card's 10 f exit; PROMISED A PARDON lands on 'promised' (round 6)
const OR_G = C.at('or');
const PLATE_END = hold(OR_G, AFTER);
const TOLL_END = hold(SOUTH, DOCTOR);
const FIXED_END = hold(DISAPPEARS, AMERICA2);

const DIET: FoodKind[] = ['cornbread', 'grits', 'pork', 'molasses'];

const Fd1915: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const farm = Math.max(0.35 * ease(f, 0, 12), ease(f, ELEVEN - 4, ELEVEN + 4)) * (1 - ease(f, DID - 10, DID - 2));
  const plate = pane(f, CARD_END, PLATE_END);
  const body = pane(f, PLATE_END, BODY_END);
  const toll = pane(f, BODY_END, TOLL_END);
  const gold = pane(f, TOLL_END, GOLD_END);
  const niacin = pane(f, GOLD_END, NIAC_END);
  const fixed = pane(f, FIX - 2, FIXED_END);
  const years = pane(f, FIXED_END, YEARS_END);
  const cliff = ease(f, YEARS_END - 2, YEARS_END + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, BUT - 2, BUT + 4));
  const strip = (1 - ease(f, BUT - 6, BUT + 2)) * ease(f, DOCK - 2, DOCK + 4);
  const sick = (i: number) => (i % 2 === 0 && i < 11 ? ease(f, HALF, HALF + 14) : 0);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1a1408" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1915" idx={4} label="RANKIN PRISON FARM · MISSISSIPPI" dockAt={DOCK} />
        <WakePlace place="a prison farm in Mississippi" at={PRISON} dockAt={DOCK} yearAt={NINETEEN} />

        {/* eleven men line up for breakfast */}
        <AbsoluteFill style={{ opacity: farm }}>
          <div style={{ position: 'absolute', left: 260, top: 740, display: 'flex', gap: 22 }}>
            {Array.from({ length: 11 }, (_, i) => <div key={i} style={{ opacity: Math.max(0.35 * ease(f, 0, 12), ease(f, ELEVEN - 2 + i * 2, ELEVEN + 6 + i * 2)) }}><Kid size={90} adult color={DL.warm} /></div>)}
          </div>
          <div style={{ position: 'absolute', left: 1500, top: 760, opacity: ease(f, BREAKFAST - 2, BREAKFAST + 4) }}><Food kind="cornbread" size={110} /></div>
          <div style={{ position: 'absolute', left: 260, top: 240 }}><Label at={Math.max(ELEVEN, DOCK + 18)} color={DL.warm} size={32}>ELEVEN MEN<OnWord at={BREAKFAST}> · LINING UP FOR BREAKFAST</OnWord></Label></div>
        </AbsoluteFill>

        {/* THE PLATE: the same food, every day */}
        <AbsoluteFill style={{ opacity: plate }}>
          <div style={{ position: 'absolute', left: 160, top: 200 }}>
            <PlateWeek title={<>THE PLATE · <span style={{ color: DL.gold }}>EVERY DAY THE SAME</span></>} at={PLATE} icon={60} reveal={{ cornbread: CORNBREAD, grits: GRITS, pork: SALT, molasses: MOLASSES }}
              foot="illustration · the test diet: corn meal, grits, salt pork, molasses (Public Health Reports, 1915)"
              days={['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => ({ d, foods: DIET }))} />
          </div>
          <div style={{ position: 'absolute', left: 1240, top: 240, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
            <FoodTag kind="cornbread" at={CORNBREAD} size={90} />
            <FoodTag kind="grits" at={GRITS} size={90} />
            <FoodTag kind="pork" at={SALT} size={90} name="FATTY SALT PORK" />
            <FoodTag kind="molasses" at={MOLASSES} size={90} />
          </div>
          <div style={{ position: 'absolute', left: 1240, top: 560, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Label at={HARDLY} color={DL.red} size={30}>HARDLY ANY</Label>
            <div style={{ display: 'flex', gap: 18 }}>
              {([['milk', MILK], ['meat', MEAT], ['veg', OR_G]] as [FoodKind, number][]).map(([k, at]) => (
                <div key={k} style={{ position: 'relative', opacity: ease(f, at - 2, at + 4) }}><Food kind={k} size={80} dim={0.7} /><span style={{ position: 'absolute', left: 14, top: -14, fontFamily: DL_SERIF, fontSize: 90, color: DL.red }}>✗</span></div>
              ))}
            </div>
          </div>
        </AbsoluteFill>

        {/* THE BODY: pellagra */}
        <AbsoluteFill style={{ opacity: body }}>
          <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={AFTER} color={DL.dim} size={32}>THE BODY · AFTER<OnWord at={MONTHS}> ≈ 5 MONTHS</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 160, top: 300, display: 'flex', gap: 16 }}>
            {Array.from({ length: 11 }, (_, i) => <Kid key={i} size={84} adult color={`rgb(${185 + 46 * sick(i)},${177 - 100 * sick(i)},${164 - 100 * sick(i)})`} />)}
          </div>
          <div style={{ position: 'absolute', left: 160, top: 470 }}><Label at={HALF} color={DL.text} size={30}>AROUND HALF OF THE MEN HAVE…</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 540 }}><StampText text="PELLAGRA" at={PELLAGRA1} color={DL.red} size={64} tilt={-3} /></div>
          <div style={{ position: 'absolute', left: 760, top: 540, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Label at={RASHES} color={DL.text} size={34}>· RASHES</Label>
            <Label at={STOMACH} color={DL.text} size={34}>· STOMACH TROUBLE</Label>
            <Label at={CONFUSION} color={DL.text} size={34}>· CONFUSION</Label>
            <Label at={EVEN} color={DL.red} size={34}>· EVEN DEATH</Label>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 840 }}><Source at={HALF}>6 of 11 (Public Health Reports, 1915) · 5 in Goldberger's letter · illustration</Source></div>
        </AbsoluteFill>
        <AbsoluteFill style={{ opacity: toll }}>
          <div style={{ position: 'absolute', left: 160, top: 260 }}><Label at={WIDELY} color={DL.dim} size={34}>BY ONE WIDELY QUOTED ESTIMATE</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 340, fontFamily: DL_SERIF, fontSize: 170, color: DL.red, opacity: ease(f, KILLED - 2, KILLED + 4) }}><CountUp to={100000} a={KILLED} b={THOUSAND + 6} prefix="≈ " /></div>
          <div style={{ position: 'absolute', left: 160, top: 540 }}><Label at={SOUTH} color={DL.text} size={34}>DEATHS ACROSS THE SOUTH · 1906–1940</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 620 }}><Source at={THOUSAND}>Rajakumar, Pediatrics 2000 (citing Bollet 1992) · reporting was unreliable</Source></div>
        </AbsoluteFill>

        {/* WHAT CHANGED: Goldberger, then niacin */}
        <AbsoluteFill style={{ opacity: gold }}>
          <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={DOCTOR} color={DL.gold} size={34}>THE DOCTOR<OnWord at={JOSEPH}> · JOSEPH GOLDBERGER</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 220, top: 300, opacity: ease(f, JOSEPH - 2, JOSEPH + 4) }}><Kid size={170} adult color={DL.warm} tool="book" /></div>
          <div style={{ position: 'absolute', left: 560, top: 320, display: 'flex', alignItems: 'center', gap: 30, opacity: ease(f, SHOWS - 2, SHOWS + 4) }}>
            <svg width={140} height={140} viewBox="0 0 140 140"><circle cx={70} cy={70} r={34} fill="#6aa04a" />{Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; return <line key={i} x1={70 + Math.cos(a) * 34} y1={70 + Math.sin(a) * 34} x2={70 + Math.cos(a) * 54} y2={70 + Math.sin(a) * 54} stroke="#6aa04a" strokeWidth={6} />; })}<line x1={10} y1={130} x2={130} y2={10} stroke={DL.red} strokeWidth={12} opacity={ease(f, GERM - 2, GERM + 4)} /></svg>
            <Label at={SHOWS} color={DL.text} size={34}>PELLAGRA<OnWord at={ISNT}> ISN'T CAUGHT</OnWord><OnWord at={GERM}> LIKE A GERM</OnWord></Label>
          </div>
          <div style={{ position: 'absolute', left: 560, top: 520 }}><StampText text="SOMETHING MISSING IN THE DIET" at={MISSING1} color={DL.gold} size={40} tilt={-2} /></div>
        </AbsoluteFill>
        <AbsoluteFill style={{ opacity: niacin }}>
          <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={LATER} color={DL.dim} size={34}>LATER, IT'S NAMED</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 280, fontFamily: DL_SERIF, fontSize: 110, color: DL.gold, opacity: ease(f, NAMED - 2, NAMED + 4) * (1 - ease(f, NIACIN - 6, NIACIN)) }}>?</div>
          <div style={{ position: 'absolute', left: 160, top: 280, fontFamily: DL_SERIF, fontSize: 110, color: DL.gold, opacity: ease(f, NIACIN - 2, NIACIN + 4) }}>Niacin<span style={{ fontSize: 50, color: DL.text, opacity: ease(f, VITAMIN - 2, VITAMIN + 4) }}> · a B vitamin (1937)</span></div>
          <div style={{ position: 'absolute', left: 160, top: 460, display: 'flex', alignItems: 'center', gap: 34, opacity: ease(f, FORTIES - 2, FORTIES + 4) }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 40, color: DL.gold }}>1940s</span>
            <div style={{ opacity: ease(f, FLOUR - 2, FLOUR + 4), position: 'relative' }}>
              <svg width={150} height={170} viewBox="0 0 150 170"><path d="M20 30 Q75 0 130 30 L140 160 L10 160 Z" fill="#efe2c4" stroke="#a89878" strokeWidth={5} /><text x={75} y={110} textAnchor="middle" fontFamily={DL_MONO} fontWeight={700} fontSize={26} fill="#6a5a3a">FLOUR</text></svg>
            </div>
            <div style={{ opacity: ease(f, C.at('bread') - 2, C.at('bread') + 8) }}><Food kind="bread" size={120} /></div>
            <Label at={FLOUR} color={DL.green} size={34}>+ NIACIN ADDED<OnWord at={MUCH}> · ACROSS MUCH OF AMERICA</OnWord></Label>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 680, display: 'flex', gap: 30 }}>
            <Label at={WAGES} color={DL.text} size={32}>+ BETTER WAGES</Label>
            <Label at={VARIED} color={DL.text} size={32}>+ MORE VARIED FOOD</Label>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 40, letterSpacing: 4, color: DL.red, opacity: ease(f, VARIED + 6, VARIED + 14) * (1 - 0.85 * ease(f, FADES - 2, FADES + 24)) }}>PELLAGRA</span>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 790 }}><Source at={FORTIES}>niacin identified 1937 · US enrichment standards 1941 · Clay, Schmick & Troesken 2019</Source></div>
        </AbsoluteFill>

        {/* "So what is food now?" — something we fix */}
        <AskMark at={NIAC_END} out={FIX + 2} left={760} top={250} pulseAt={NOW} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 690, textAlign: 'center', fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 56, color: DL.dim, opacity: ease(f, SOMETHING2 - 2, SOMETHING2 + 4) * (1 - ease(f, FIX - 4, FIX + 2)) }}>something…</div>
        <AbsoluteFill style={{ opacity: fixed }}>
          <div style={{ position: 'absolute', left: 260, top: 330, display: 'flex', alignItems: 'center', gap: 30 }}>
            <Food kind="bread" size={150} glow={0.6} />
            <div style={{ width: 760, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, color: DL.gold }}>
              <OnWord at={ADD}>add what's missing</OnWord><span style={{ opacity: ease(f, DISAPPEARS - 2, DISAPPEARS + 4) }}> → a disease disappears</span>
            </div>
          </div>
        </AbsoluteFill>
        <FoodChip text="SOMETHING WE FIX" at={FIX} dockAt={CHIP_DOCK} slot={3} left={260} top={720} />

        {/* THE YEARS */}
        <AbsoluteFill style={{ opacity: years }}>
          <div style={{ position: 'absolute', left: 160, top: 240 }}><Label at={AMERICA2} color={DL.gold} size={34}>THE YEARS · AMERICA, 1915 · A NEWBORN</Label></div>
          <div style={{ position: 'absolute', left: 900, top: 300, opacity: ease(f, NEWBORN - 2, NEWBORN + 4), transform: `scale(${ease(f, NEWBORN - 2, NEWBORN + 10, 1.25, 1)})` }}><Baby size={140} /></div>
          <div style={{ position: 'absolute', left: 160, top: 310, display: 'flex', flexDirection: 'column', gap: 8, opacity: ease(f, ABOUT2 - 2, ABOUT2 + 4) }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 150, lineHeight: 1, color: DL.gold }}><CountUp to={55} a={ABOUT2} b={FIVE2 + 4} prefix="≈ " /> years</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.dim }}>USA · at birth · average · OWID (55.1)</span>
          </div>
        </AbsoluteFill>

        {/* cliffhanger: only if there's enough of it */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 300, top: 300, display: 'flex', alignItems: 'flex-end', gap: 60 }}>
            <div style={{ opacity: ease(f, FIXING - 2, FIXING + 4) }}><Food kind="bread" size={150} /></div>
            <div style={{ opacity: ease(f, ENOUGH - 2, ENOUGH + 4), fontFamily: DL_SERIF, fontSize: 90, color: DL.text }}>× enough?</div>
            <div style={{ opacity: ease(f, INDIA - 2, INDIA + 4) }}><Food kind="flatbread" size={150} dim={ease(f, ISNT2 - 2, ISNT2 + 14)} /></div>
          </div>
        </AbsoluteFill>

        <YearsStrip items={[...yearsUpTo(3), { ...YEARS_PAST[3], at: FIFTY }]} show={strip} />
        <FoodLadder rungs={[...foodRungs(3), { year: '1915', label: 'WE FIX IT', at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={CARD_END}>
          <span style={{ opacity: ease(f, DOCTORS - 2, DOCTORS + 4) }}>doctors made </span><span style={{ opacity: ease(f, HEALTHY - 2, HEALTHY + 4), color: '#5ad08a' }}>healthy men</span>
          <span style={{ opacity: ease(f, SICK - 2, SICK + 4), color: '#ff4d4d' }}> sick </span><OnWord at={PURPOSE}>here, <span style={{ color: '#ff9a1f', fontStyle: 'italic' }}>on purpose</span>, </OnWord>
          <OnWord at={POOR}>by feeding them a poor Southern family's </OnWord><span style={{ opacity: ease(f, ORDINARY - 2, ORDINARY + 4), color: '#ffd23f' }}>ordinary diet?</span>
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 26, opacity: ease(f, VOLUNTEERS - 2, VOLUNTEERS + 4) }}>
            <PeopleRow n={11} lit={() => 1} size={34} gap={6} color="#5ab0ff" />
            <span style={{ fontFamily: DL_MONO, fontSize: 32, color: '#ffffff' }}>VOLUNTEERS<span style={{ opacity: ease(f, PROMISED - 2, PROMISED + 4), color: '#ffd23f' }}> · PROMISED A PARDON</span></span>
          </div>
          <div style={{ marginTop: 16, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, DIET1 - 2, DIET1 + 4) }}>Goldberger & Wheeler, Rankin Farm, 1915 · Public Health Reports · Governor Brewer's pardon</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1966" parts={[{ text: 'But fixing food', at: BUT }, { text: 'only helps', at: C.at('only') }, { text: "if there's enough of it.", at: C.at('if') }, { text: "And in India, there isn't.", at: C.at('And', 5) }]} />
      <EpisodeHud year={1915} episode="05" />
    </AbsoluteFill>
  );
};
export default Fd1915;
