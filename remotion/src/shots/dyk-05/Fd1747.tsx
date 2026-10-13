import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, win, SunCliffhanger, FoodChip, FoodLadder, foodRungs, Label, Source, StampText, AskMark, OnWord, PeopleRow, Kid,
  Food, FoodTag, YearsStrip, YEARS_PAST, yearsUpTo, Ship, Waves,
} from '../../lib/dykkit-food';
import vo from './vo.json';

// =============================================================================
// DYK 05 · 6/14 — ERA 2: 1747, HMS Salisbury (RESEARCH F9–F13). Header + "HMS Salisbury" on its word; the warship on
// "warship", rocking on patrol. DYK (F11): THE CURE · FOUND THIS YEAR on "found", a bar from 1747 runs on "waited",
// ≈ 50 YEARS on "fifty" (1795 is NOT shown until it is said). THE PLATE (F9, official scale): EVERY DAY 1 lb biscuit
// on "biscuit", 1 gallon beer on "beer"; salt beef or pork, dried peas, oatmeal, cheese on their words; ALMOST NOTHING
// FRESH stamp on "fresh". THE BODY (F12): SCURVY on "scurvy", BLEEDING GUMS / OLD WOUNDS OPENING UP on their words.
// WHAT CHANGED (F10): THE SHIP'S SURGEON · JAMES LIND; twelve men on "twelve", six pairs on "pairs", CIDER and VINEGAR
// on their words, the citrus pair glows on "oranges"/"lemon"; ONE FIT FOR DUTY AFTER SIX DAYS (screen only) on "day.".
// "So what is food now?" = "?"; MEDICINE chip on "Medicine." (slot 1, docks). THE YEARS (F13): BRITAIN < 40 on "fewer",
// strip pill 1747 ≈ 36. The navy waits (F11): the bar completes to 1795 on "ninety", LEMON JUICE on "lemon". Cliffhanger:
// a rice bowl and greying sailors, NEXT ▸ 1884. VO fd05 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Fd1747', durationInSeconds: 61.6333, fps: 30, width: 1920, height: 1080 };
const DUR = 1849;

const C = makeCue(vo, 'fd05-1747', 0.8);
const SEVENTEEN = C.at('seventeen', 1);
const SALISBURY = C.at('Salisbury,');
const DOCK = SALISBURY + 46;
const WARSHIP = C.at('warship');
const PATROL = C.at('patrol.');
const DID = C.at('Did');
const CURE1 = C.at('cure', 1);
const WORST = C.at('worst');
const FOUND = C.at('found');
const WAITED = C.at('waited');
const FIFTY = C.at('fifty');
const PLATE = C.at('plate.');
const EVERY = C.at('Every');
const POUND = C.at('pound');
const BISCUIT = C.at('biscuit');
const GALLON = C.at('gallon');
const BEER = C.at('beer.');
const SALT = C.at('Salt');
const PORK = C.at('pork,');
const PEAS = C.at('peas,');
const OATMEAL = C.at('oatmeal,');
const CHEESE = C.at('cheese.');
const FRESH = C.at('fresh.');
const AFTER = C.at('After');
const SCURVY1 = C.at('scurvy.', 1);
const GUMS = C.at('gums.');
const WOUNDS = C.at('wounds');
const SURGEON = C.at('surgeon,');
const JAMES = C.at('James');
const TWELVE = C.at('twelve');
const PAIRS = C.at('pairs,');
const DIFFERENT = C.at('different.');
const CIDER = C.at('Cider.');
const VINEGAR = C.at('Vinegar.');
const ORANGES = C.at('oranges');
const LEMON1 = C.at('lemon', 1);
const DAY_END = C.at('day.', 2); // 'a lemon a day.' (1 = 'Every day,')
const SO = C.at('So');
const NOW = C.at('now?');
const MEDICINE = C.at('Medicine.');
const CHIP_DOCK = MEDICINE + 80;
const CURE2 = C.at('cure', 2);
const LAND = C.at('land');
const NEWBORN = C.at('newborn');
const FEWER = C.at('fewer');
const FORTY2 = C.at('forty', 2); // 'fewer than forty' (1 = 'seventeen forty seven')
const NAVY3 = C.at('navy', 2); // 'The navy finally' (1 = 'the navy waited')
const LEMON2 = C.at('lemon', 2);
const NINETY = C.at('ninety');
const CENTURY = C.at('century');
const LATER = C.at('later,');
const PIECE = C.at('piece');
const JAPAN = C.at('Japan,');
const MISSING = C.at('missing');
const SICK = C.at('sick.');

const PAIR_LABELS = ['CIDER', 'ELIXIR OF VITRIOL', 'VINEGAR', 'SEA WATER', '2 ORANGES + 1 LEMON', 'A PURGATIVE'];

// a 1747 → 1795 bar: the end year appears only when it is said
const WaitBar: React.FC<{ run: number; endAt: number; label?: string }> = ({ run, endAt, label }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: 'relative', width: 1000, height: 90 }}>
      <div style={{ position: 'absolute', left: 0, top: 40, width: 1000, height: 10, borderRadius: 5, background: '#2a2f5a' }} />
      <div style={{ position: 'absolute', left: 0, top: 40, width: 1000 * run, height: 10, borderRadius: 5, background: '#ffd23f' }} />
      <div style={{ position: 'absolute', left: -6, top: 0, fontFamily: DL_MONO, fontSize: 30, color: '#ffd23f' }}>1747</div>
      <div style={{ position: 'absolute', right: -6, top: 0, fontFamily: DL_MONO, fontSize: 30, color: '#5ad08a', opacity: ease(f, endAt - 2, endAt + 6) }}>1795</div>
      {label && <div style={{ position: 'absolute', left: 380, top: 56, fontFamily: DL_MONO, fontSize: 30, color: '#ffffff' }}>{label}</div>}
    </div>
  );
};

const Fd1747: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const ship = win(f, DOCK + 10, DID - 2, 10, 8);
  const plate = win(f, PLATE - 4, AFTER, 6, 8);
  const body = win(f, AFTER - 4, SURGEON, 6, 8);
  const trial = win(f, SURGEON - 4, SO + 2, 6, 8);
  const medicine = win(f, MEDICINE - 2, LAND, 4, 10);
  const years = win(f, LAND - 4, CENTURY, 6, 8);
  const cliff = ease(f, CENTURY - 2, CENTURY + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, CENTURY - 2, CENTURY + 8));
  const strip = (1 - ease(f, CENTURY - 6, CENTURY + 2)) * ease(f, DOCK, DOCK + 10);
  const grey = ease(f, SICK - 4, SICK + 20);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0a1420" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1747" idx={2} label="HMS SALISBURY" dockAt={DOCK} />
        <WakePlace place="aboard HMS Salisbury" at={SALISBURY} dockAt={DOCK} yearAt={SEVENTEEN} />

        {/* the warship on patrol */}
        <AbsoluteFill style={{ opacity: ship }}>
          <div style={{ position: 'absolute', left: 160, top: 660, width: 1600, height: 200, overflow: 'hidden' }}><Waves f={f} w={1600} y={20} /></div>
          <div style={{ position: 'absolute', left: 560, top: 260, opacity: ease(f, WARSHIP - 4, WARSHIP + 8), transform: `translateX(${(f - WARSHIP) * 0.5}px)` }}><Ship w={720} f={f} /></div>
          <div style={{ position: 'absolute', left: 160, top: 230 }}><Label at={WARSHIP} color={DL.sky} size={32}>A BRITISH WARSHIP<OnWord at={PATROL}> · ON PATROL</OnWord></Label></div>
        </AbsoluteFill>

        {/* THE PLATE: the official ration */}
        <AbsoluteFill style={{ opacity: plate }}>
          <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={PLATE} color={DL.gold} size={34}>THE PLATE · A SAILOR'S RATION</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 280, width: 760, padding: '26px 34px', boxSizing: 'border-box', borderRadius: 18, background: '#0e0b0af0', border: `2px solid ${DL.gold}`, opacity: ease(f, EVERY - 2, EVERY + 8) }}>
            <Label at={EVERY} color={DL.dim} size={30}>EVERY DAY</Label>
            <div style={{ display: 'flex', gap: 60, marginTop: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: ease(f, POUND - 2, POUND + 8) }}><Food kind="biscuit" size={150} /><span style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.text }}>1 lb<OnWord at={BISCUIT}> HARD BISCUIT</OnWord></span></div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: ease(f, GALLON - 2, GALLON + 8) }}><Food kind="beer" size={150} /><span style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.text }}>1 GALLON<OnWord at={BEER}> BEER</OnWord></span></div>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 980, top: 280, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
            <FoodTag kind="meat" at={SALT} size={100} name="SALT BEEF" />
            <FoodTag kind="pork" at={PORK} size={100} name="OR PORK" />
            <FoodTag kind="beans" at={PEAS} size={100} name="DRIED PEAS" />
            <FoodTag kind="oatmeal" at={OATMEAL} size={100} />
            <FoodTag kind="cheese" at={CHEESE} size={100} name="A LITTLE CHEESE" />
          </div>
          <div style={{ position: 'absolute', left: 980, top: 700 }}><StampText text="ALMOST NOTHING FRESH" at={FRESH} color={DL.red} size={38} /></div>
          <div style={{ position: 'absolute', left: 160, top: 640, width: 760 }}><Source at={SALT}>Royal Navy victualling scale (1733 Regulations), per man per week: 7 lb biscuit · 7 gal beer · 4 lb beef · 2 lb pork · 2 pt pease · 3 pt oatmeal · 6 oz butter · 12 oz cheese</Source></div>
        </AbsoluteFill>

        {/* THE BODY: scurvy */}
        <AbsoluteFill style={{ opacity: body }}>
          <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={AFTER} color={DL.dim} size={32}>THE BODY · AFTER WEEKS AT SEA</Label></div>
          <div style={{ position: 'absolute', left: 260, top: 320, opacity: ease(f, AFTER - 2, AFTER + 10) }}><Kid size={220} adult color={`rgb(${185 - 70 * ease(f, SCURVY1, SCURVY1 + 30)},${177 - 60 * ease(f, SCURVY1, SCURVY1 + 30)},164)`} /></div>
          <div style={{ position: 'absolute', left: 700, top: 330, display: 'flex', flexDirection: 'column', gap: 30 }}>
            <StampText text="SCURVY" at={SCURVY1} color={DL.red} size={64} tilt={-4} />
            <Label at={GUMS} color={DL.text} size={38}>· BLEEDING GUMS</Label>
            <Label at={WOUNDS} color={DL.text} size={38}>· OLD WOUNDS OPENING UP</Label>
          </div>
          <div style={{ position: 'absolute', left: 700, top: 760 }}><Source at={GUMS}>Lind, A Treatise of the Scurvy (1753) · via the James Lind Library</Source></div>
        </AbsoluteFill>

        {/* WHAT CHANGED: Lind's trial */}
        <AbsoluteFill style={{ opacity: trial }}>
          <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={SURGEON} color={DL.gold} size={34}>THE SHIP'S SURGEON<OnWord at={JAMES}> · JAMES LIND</OnWord><OnWord at={TWELVE}> · 20 MAY 1747 · 12 MEN, 6 PAIRS</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 160, top: 290, display: 'grid', gridTemplateColumns: 'repeat(3, 520px)', gap: 20 }}>
            {PAIR_LABELS.map((lab, i) => {
              const citrus = i === 4;
              const named = i === 0 ? CIDER : i === 2 ? VINEGAR : citrus ? ORANGES : DIFFERENT;
              const glow = citrus ? ease(f, LEMON1 - 2, LEMON1 + 10) : 0;
              return (
                <div key={i} style={{ height: 230, boxSizing: 'border-box', padding: '18px 22px', borderRadius: 16, border: `2px solid ${citrus && glow > 0.3 ? '#ffd23f' : DL.border}`, background: citrus && glow > 0.3 ? '#2a2006f0' : '#0e0b0af0', boxShadow: citrus ? `0 0 ${50 * glow}px #ffd23f88` : undefined, opacity: ease(f, PAIRS - 2 + i * 12, PAIRS + 8 + i * 12) }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <PeopleRow n={2} lit={() => (f >= TWELVE ? 1 : 0)} size={48} gap={8} color={citrus && glow > 0.3 ? '#ffd23f' : DL.warm} />
                    <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.muted }}>PAIR {i + 1}</span>
                  </div>
                  <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 14, opacity: ease(f, named - 2, named + 8) }}>
                    {i === 0 && <Food kind="cider" size={70} />}
                    {i === 2 && <Food kind="vinegar" size={70} />}
                    {citrus && <><Food kind="orange" size={70} /><Food kind="orange" size={70} /><div style={{ opacity: ease(f, LEMON1 - 2, LEMON1 + 6) }}><Food kind="lemon" size={70} /></div></>}
                    <span style={{ fontFamily: DL_MONO, fontSize: citrus || i % 2 === 0 ? 28 : 24, color: citrus ? '#ffd23f' : i % 2 === 0 ? DL.text : DL.dim }}>{lab}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ position: 'absolute', left: 160, top: 790, display: 'flex', gap: 30, alignItems: 'center' }}>
            <StampText text="ONE FIT FOR DUTY AFTER SIX DAYS" at={DAY_END} color={DL.green} size={34} tilt={-2} />
            <Source at={DAY_END}>Lind 1753 · James Lind Library · the fruit ran out after six days</Source>
          </div>
        </AbsoluteFill>

        {/* "So what is food now?" — Medicine. The right food can cure you. */}
        <AskMark at={SO} out={MEDICINE + 2} left={760} top={250} pulseAt={NOW} />
        <AbsoluteFill style={{ opacity: medicine }}>
          <div style={{ position: 'absolute', left: 260, top: 300, display: 'flex', alignItems: 'center', gap: 30 }}>
            <Food kind="orange" size={170} glow={0.6} /><Food kind="lemon" size={150} glow={0.6} />
            <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 64, color: DL.gold, opacity: ease(f, CURE2 - 2, CURE2 + 8), marginLeft: 30 }}>the right food can cure you</div>
          </div>
        </AbsoluteFill>
        <FoodChip text="MEDICINE" at={MEDICINE} dockAt={CHIP_DOCK} slot={1} left={260} top={720} />

        {/* THE YEARS on land + the navy waits */}
        <AbsoluteFill style={{ opacity: years }}>
          <div style={{ position: 'absolute', left: 160, top: 220 }}><Label at={LAND} color={DL.gold} size={34}>THE YEARS · ON LAND IN BRITAIN<OnWord at={NEWBORN}> · A NEWBORN</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 160, top: 290, display: 'flex', flexDirection: 'column', gap: 10, opacity: ease(f, FEWER - 2, FEWER + 8) }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 140, lineHeight: 1, color: DL.gold }}>&lt; 40<span style={{ opacity: ease(f, FORTY2 - 2, FORTY2 + 6) }}> years</span></span>
            <span style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.dim }}>England 1748 ≈ 36 · at birth · average</span>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 520, display: 'flex', alignItems: 'center', gap: 40, opacity: ease(f, NAVY3 - 2, NAVY3 + 8) }}>
            <WaitBar run={ease(f, NAVY3, NINETY + 6)} endAt={NINETY} />
            <div style={{ opacity: ease(f, LEMON2 - 2, LEMON2 + 8), display: 'flex', alignItems: 'center', gap: 14 }}><Food kind="cider" size={90} /><Label at={LEMON2} color="#ffd23f" size={30}>LEMON JUICE<br />FOR EVERY SAILOR</Label></div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 660 }}><Source at={NINETY}>Admiralty order, 1795: ¾ oz of lemon juice a day · 48 years after Lind's trial · OWID (England 1748: 36.5)</Source></div>
        </AbsoluteFill>

        {/* cliffhanger: a century later, in Japan */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 300, top: 280, opacity: ease(f, JAPAN - 4, JAPAN + 8) }}><Food kind="rice" size={240} /></div>
          <div style={{ position: 'absolute', left: 700, top: 360, opacity: ease(f, MISSING - 2, MISSING + 8), fontFamily: DL_SERIF, fontSize: 200, color: DL.red }}>?</div>
          <div style={{ position: 'absolute', left: 940, top: 380, opacity: ease(f, JAPAN - 2, JAPAN + 8) }}><PeopleRow n={5} lit={() => 1 - 0.7 * grey} size={70} color={DL.warm} /></div>
        </AbsoluteFill>

        <YearsStrip items={[...yearsUpTo(1), { ...YEARS_PAST[1], at: FORTY2 }]} show={strip} />
        <FoodLadder rungs={[...foodRungs(1), { year: '1747', label: 'MEDICINE', at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={PLATE - 6}>
          <OnWord at={CURE1}>the cure for </OnWord><OnWord at={WORST}>sailors' worst disease </OnWord><span style={{ opacity: ease(f, FOUND - 4, FOUND + 6), color: '#ffd23f' }}>was found this year</span>
          <OnWord at={WAITED}>, and the navy <span style={{ color: '#ff9a1f', fontStyle: 'italic' }}>waited</span></OnWord><span style={{ opacity: ease(f, FIFTY - 4, FIFTY + 6), color: '#ff9a1f', fontStyle: 'italic' }}> almost fifty years to use it?</span>
          <div style={{ marginTop: 30, opacity: ease(f, WAITED - 4, WAITED + 6) }}><WaitBar run={ease(f, WAITED, FIFTY + 20) * 0.98} endAt={1e9} label={f >= FIFTY ? '≈ 50 YEARS' : undefined} /></div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1884" parts={[{ text: 'A century later,', at: LATER }, { text: 'in Japan,', at: JAPAN }, { text: 'another missing piece', at: PIECE }, { text: 'is making sailors sick.', at: SICK }]} />
      <EpisodeHud year={1747} episode="05" />
    </AbsoluteFill>
  );
};
export default Fd1747;
