import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, SiteBg } from '../../lib/danslab';
import { DYT } from '../../lib/dytbrand';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, win, SunCliffhanger, MoneyChip, MoneyLadder, moneyRungs, Kid, Label, Source, StampText, AskMark, BigWord, PeopleRow,
  Banknote, Sovereign, GoldBar, TvSet, Phone, TextBubble, GOLD,
} from '../../lib/dykkit-money';
import vo from './vo.json';

// =============================================================================
// DYK 04 · 9/14 — ERA 5: 1971, a suburb of Pittsburgh (RESEARCH F20–F21; the household is fictional). Header + "Pittsburgh"
// on its word; SUN · AUG 15 calendar on "Sunday"/"August"; a living room with a family and a TV on "family's"/"TV". DYK
// (F20): clauses on their words, coins + a bar with ✗ on "gold"/"bars", SINCE 1933 on "thirty" (1st). How it worked
// (F21): GOVERNMENTS ONLY on "governments"; 1944 · $35 = 1 OZ on "forty"/"ounce"; the chain GOLD ← $ ← other currencies
// on "tied" ×2; that evening the TV shows the President on "Nixon" (15 AUG 1971); the $ → gold link breaks ✗ on "can't";
// the currencies drift loose on "gone" (BY 1973). "So what is money now?" = "?"; "A promise backed by" + JUST TRUST chip
// on "trust" (1st; slot 4, docks); people light on "people". Cliffhanger: a phone with a text-message payment on "text";
// KENYA on "Kenya". VO mo08 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Mo1971', durationInSeconds: 54.1667, fps: 30, width: 1920, height: 1080 };
const DUR = 1625;

const C = makeCue(vo, 'mo08-1971', 0.8);
const NINETEEN1 = C.at('nineteen', 1);
const PITTSBURGH = C.at('Pittsburgh');
const DOCK = PITTSBURGH + 40;
const SUBURB = C.at('suburb');
const SUNDAY = C.at('Sunday');
const AUGUST = C.at('August');
const FAMILY = C.at("family's");
const TV = C.at('TV');
const DID = C.at('Did');
const NINETEEN2 = C.at('nineteen', 2);
const ILLEGAL = C.at('illegal');
const MOST1 = C.at('most', 1);
const OWN = C.at('own');
const GOLD1 = C.at('gold', 1);
const BARS = C.at('bars');
const SINCE1 = C.at('since', 1);
const THIRTY1 = C.at('thirty', 1);
const GOLD2 = C.at('Gold', 2); // 'Gold was for governments.'
const GOVTS1 = C.at('governments', 1);
const SINCE2 = C.at('Since', 2);
const FORTY = C.at('forty');
const SWAP1 = C.at('swap', 1);
const THIRTY2 = C.at('thirty', 2);
const OUNCE = C.at('ounce');
const TIED1 = C.at('tied', 1);
const TIED2 = C.at('tied', 2);
const THAT_EVENING = C.at('That', 2); // 'That evening' (1 = 'Did you know that')
const PRESIDENT = C.at('President');
const NIXON = C.at('Nixon');
const FOREIGN = C.at('foreign');
const CANT = C.at("can't");
const WITHIN = C.at('Within');
const GONE = C.at('gone');
const WHOLE = C.at('whole', 2); // 'the whole system's gone' (1 = 'the whole family's')
const SO = C.at('So');
const PROMISE = C.at('promise');
const TRUST1 = C.at('trust', 1);
const CHIP_DOCK = TRUST1 + 30; // docks quickly: the cliffhanger follows 3.8 s later
const TRUST2 = C.at('Trust', 2);
const PEOPLE = C.at('people');
const GENERATION = C.at('generation');
const SHAPE = C.at('shape');
const ALL = C.at('all');
const KENYA = C.at('Kenya');
const TEXT = C.at('text');
const MESSAGE = C.at('message');

const OTHERS = ['£', 'DM', '¥', '₣', 'LIRA'];

const Mo1971: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const room = win(f, DOCK, DID - 2, 10, 8);
  const system = win(f, GOLD2 - 4, SO + 14, 6, 8);
  const trust = win(f, PROMISE - 6, GENERATION, 4, 10);
  const cliff = ease(f, GENERATION - 2, GENERATION + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, GENERATION - 2, GENERATION + 8));
  const broken = ease(f, CANT - 1, CANT + 8);
  const drift = ease(f, GONE - 6, GONE + 30, 0, 1, DL_EASE.in);
  const tvOn = ease(f, THAT_EVENING - 4, THAT_EVENING + 10);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#14100a" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1971" idx={5} label="PITTSBURGH" dockAt={DOCK} />
        <WakePlace place="a suburb of Pittsburgh" at={SUBURB} dockAt={DOCK} yearAt={NINETEEN1} />
        {/* Sunday evening in August: the family in front of the TV */}
        <AbsoluteFill style={{ opacity: room }}>
          <div style={{ position: 'absolute', left: 160, top: 220, display: 'flex', gap: 18 }}>
            <Label at={SUNDAY} color={DL.warm} size={28}>A SUNDAY EVENING<span style={{ opacity: ease(f, AUGUST - 2, AUGUST + 6) }}> IN AUGUST</span></Label>
            <Label at={FAMILY} color={DL.text} size={28}>· THE WHOLE FAMILY<span style={{ opacity: ease(f, TV - 2, TV + 6) }}> · IN FRONT OF THE TV</span></Label>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 300, width: 180, padding: '14px 0', borderRadius: 12, background: '#f4efe0', textAlign: 'center', opacity: ease(f, SUNDAY - 2, SUNDAY + 8) }}>
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 26, color: DL.red }}>SUNDAY</div>
            <div style={{ fontFamily: DL_SERIF, fontSize: 70, color: '#1a1a1a', lineHeight: 1 }}>15</div>
            <div style={{ fontFamily: DL_MONO, fontSize: 24, color: '#1a1a1a', opacity: ease(f, AUGUST - 2, AUGUST + 6) }}>AUG 1971</div>
          </div>
          <div style={{ position: 'absolute', left: 560, top: 330, opacity: ease(f, TV - 6, TV + 6) }}><TvSet size={420} on={0.6} /></div>
          <div style={{ position: 'absolute', left: 1060, top: 500, display: 'flex', gap: 14, alignItems: 'flex-end' }}>
            {[0, 1, 2, 3].map((k) => <div key={k} style={{ opacity: ease(f, FAMILY + k * 4 - 2, FAMILY + k * 4 + 6) }}><Kid size={k < 2 ? 110 : 80} adult={k < 2} girl={k % 2 === 1} color={['#b9a088', '#a08878', '#c8b098', '#a89888'][k]} /></div>)}
          </div>
          <div style={{ position: 'absolute', left: 1000, top: 700, width: 520, height: 70, borderRadius: 20, background: '#6a3a2a', opacity: ease(f, FAMILY - 2, FAMILY + 8) }} />
        </AbsoluteFill>

        {/* how it worked: gold for governments, $35 an ounce, the chain, and the night it broke */}
        <AbsoluteFill style={{ opacity: system }}>
          <div style={{ position: 'absolute', left: 160, top: 210, display: 'flex', alignItems: 'center', gap: 24 }}>
            <GoldBar w={140} glow={0.4} />
            <Label at={GOLD2} color={GOLD.light} size={32}>GOLD WAS FOR<span style={{ opacity: ease(f, GOVTS1 - 2, GOVTS1 + 6) }}> GOVERNMENTS</span></Label>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 310, display: 'flex', alignItems: 'center', gap: 20, opacity: ease(f, SINCE2 - 2, SINCE2 + 8) }}>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 34, color: DL.text }}>SINCE <span style={{ opacity: ease(f, FORTY - 2, FORTY + 6) }}>1944</span></span>
            <span style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.dim, opacity: ease(f, SWAP1 - 2, SWAP1 + 6) }}>· SWAP DOLLARS FOR GOLD ·</span>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 40, color: GOLD.light, opacity: ease(f, THIRTY2 - 2, THIRTY2 + 6) }}>$35<span style={{ opacity: ease(f, OUNCE - 2, OUNCE + 6) }}> = 1 OZ</span></span>
          </div>
          {/* the chain: other currencies → dollar → gold */}
          <div style={{ position: 'absolute', left: 160, top: 420, display: 'flex', alignItems: 'center', gap: 30 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: ease(f, TIED1 - 6, TIED1 + 4) }}><GoldBar w={170} glow={0.6} /><span style={{ fontFamily: DL_MONO, fontSize: 26, color: GOLD.light }}>GOLD</span></div>
            <div style={{ position: 'relative', width: 120, height: 10, background: broken > 0.5 ? 'transparent' : DL.gold, opacity: ease(f, TIED1 - 2, TIED1 + 6) }}>
              {broken > 0.01 && <span style={{ position: 'absolute', left: 30, top: -46, fontFamily: DL_MONO, fontWeight: 700, fontSize: 70, color: DL.red, opacity: broken }}>✗</span>}
              {broken > 0.01 && <><div style={{ position: 'absolute', left: 0, top: 0, width: 40, height: 10, background: DL.gold, transform: `rotate(${-20 * broken}deg)` }} /><div style={{ position: 'absolute', right: 0, top: 0, width: 40, height: 10, background: DL.gold, transform: `rotate(${20 * broken}deg)` }} /></>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: ease(f, TIED1 - 6, TIED1 + 4) }}><Banknote w={190} big="$" color="#dfe8d8" ink="#2a4a3a" /><span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.green }}>THE DOLLAR</span></div>
            <div style={{ width: 100, height: 10, background: DL.gold, opacity: ease(f, TIED2 - 2, TIED2 + 6) * (1 - drift) }} />
            <div style={{ display: 'flex', gap: 12 }}>
              {OTHERS.map((c, i) => (
                <div key={c} style={{ padding: '14px 16px', borderRadius: 10, border: `2px solid ${DL.border}`, background: DL.panel, fontFamily: DL_MONO, fontWeight: 700, fontSize: 28, color: DL.text, opacity: ease(f, TIED2 + i * 3 - 2, TIED2 + i * 3 + 6), transform: `translate(${drift * (40 + i * 30)}px, ${drift * (i % 2 ? -1 : 1) * (60 + i * 20)}px) rotate(${drift * (i % 2 ? -12 : 12)}deg)` }}>{c}</div>
              ))}
            </div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 560 }}><Label at={TIED2} color={DL.dim} size={26}>MOST OTHER MONEY → TIED TO THE DOLLAR</Label></div>
          {/* that evening: the President on TV */}
          <div style={{ position: 'absolute', left: 160, top: 620, display: 'flex', alignItems: 'center', gap: 40 }}>
            <div style={{ opacity: tvOn }}><TvSet size={300} on={tvOn}><div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: ease(f, PRESIDENT - 2, PRESIDENT + 6) }}><Kid size={60} adult color="#2a2a2a" /><div style={{ width: 120, height: 26, background: '#4a3a2a', marginTop: -8 }} /></div></TvSet></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Label at={PRESIDENT} color={DL.text} size={32}>PRESIDENT<span style={{ opacity: ease(f, NIXON - 2, NIXON + 6) }}> NIXON · 15 AUG 1971</span></Label>
              <Label at={FOREIGN} color={DL.red} size={30}>FOREIGN GOVERNMENTS<span style={{ opacity: ease(f, CANT - 2, CANT + 6) }}> CAN'T SWAP DOLLARS FOR GOLD</span></Label>
              <Label at={WITHIN} color={DL.dim} size={28}>WITHIN A FEW YEARS<span style={{ opacity: ease(f, WHOLE - 2, WHOLE + 6) }}> · THE SYSTEM'S GONE (CURRENCIES FLOAT BY 1973)</span></Label>
              <Source at={NIXON}>Federal Reserve History, "Nixon Ends Convertibility" · Bretton Woods, 1944</Source>
            </div>
          </div>
        </AbsoluteFill>

        {/* "So what is money now?" — a promise backed by trust */}
        <AskMark at={SO} out={PROMISE} left={760} top={250} pulseAt={C.at('now', 2)} />
        <AbsoluteFill style={{ opacity: trust }}>
          <div style={{ position: 'absolute', left: 200, top: 250, display: 'flex', alignItems: 'baseline', gap: 26 }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 76, color: DL.text, opacity: ease(f, PROMISE - 4, PROMISE + 6) }}>A promise backed by</span>
            <BigWord at={TRUST1} size={92} gradient>trust.</BigWord>
          </div>
          <div style={{ position: 'absolute', left: 200, top: 440, display: 'flex', alignItems: 'center', gap: 40, opacity: ease(f, TRUST2 - 4, TRUST2 + 6) }}>
            <Banknote w={300} big="$" color="#dfe8d8" ink="#2a4a3a" />
            <span style={{ fontFamily: DL_SERIF, fontSize: 70, color: DL.dim }}>←</span>
            <PeopleRow n={6} size={70} lit={(i) => ease(f, PEOPLE + i * 3, PEOPLE + i * 3 + 6)} />
          </div>
          <div style={{ position: 'absolute', left: 200, top: 640 }}><Label at={TRUST2} color={DL.text} size={32}>TRUST IN<span style={{ opacity: ease(f, PEOPLE - 2, PEOPLE + 6) }}> THE PEOPLE WHO RUN IT</span></Label></div>
        </AbsoluteFill>
        <MoneyChip text="JUST TRUST" at={TRUST1} dockAt={CHIP_DOCK} slot={4} left={1000} top={760} />

        {/* cliffhanger: a generation later, money moves into a text message */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 300, top: 260, display: 'flex', alignItems: 'center', gap: 60 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 44, letterSpacing: 4, color: DL.gold, opacity: ease(f, GENERATION - 2, GENERATION + 6) }}>1971 → …</span>
              <div style={{ opacity: ease(f, GENERATION + 4, GENERATION + 14), position: 'relative', transform: `scale(${1 - 0.25 * ease(f, SHAPE - 2, SHAPE + 14)}) rotate(${-90 * ease(f, SHAPE - 2, SHAPE + 14)}deg)` }}>
                <Banknote w={260} big="$" color="#dfe8d8" ink="#2a4a3a" />
                <div style={{ position: 'absolute', right: -16, top: -20, fontFamily: DL_MONO, fontWeight: 700, fontSize: 64, color: DL.red, opacity: ease(f, ALL - 2, ALL + 6) }}>✗</div>
              </div>
            </div>
            <div style={{ opacity: ease(f, KENYA - 4, KENYA + 6) }}>
              <Phone size={380} glow={ease(f, TEXT - 2, TEXT + 8)}>
                <TextBubble at={TEXT} color={DYT.green} size={22}>You've received money ✓</TextBubble>
                <TextBubble at={MESSAGE} color="#d8e8ff" right size={22}>Thanks!</TextBubble>
              </Phone>
            </div>
            <Label at={KENYA} color={DYT.green} size={34}>KENYA</Label>
          </div>
          <div style={{ position: 'absolute', left: 300, top: 220 }}><Label at={GENERATION} color={DL.dim} size={28}>A GENERATION LATER<span style={{ opacity: ease(f, SHAPE - 2, SHAPE + 6) }}> · A NEW SHAPE</span></Label></div>
        </AbsoluteFill>

        <MoneyLadder rungs={[...moneyRungs(4), { year: '1971', label: 'JUST TRUST', at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={GOLD2}>
          <span style={{ opacity: ease(f, NINETEEN2 - 4, NINETEEN2 + 6) }}>in 1971,</span>
          <span style={{ opacity: ease(f, ILLEGAL - 4, ILLEGAL + 6), color: '#ff9a1f', fontStyle: 'italic' }}> it was illegal</span>
          <span style={{ opacity: ease(f, MOST1 - 4, MOST1 + 6) }}> for most Americans</span>
          <span style={{ opacity: ease(f, OWN - 4, OWN + 6) }}> to own</span>
          <span style={{ opacity: ease(f, GOLD1 - 4, GOLD1 + 6), color: '#ffd23f' }}> gold coins</span>
          <span style={{ opacity: ease(f, BARS - 4, BARS + 6), color: '#ffd23f' }}> or bars.</span>
          <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 26 }}>
            <div style={{ display: 'flex', gap: 8, opacity: ease(f, GOLD1 - 4, GOLD1 + 6) }}><Sovereign size={70} label="$" /><Sovereign size={70} label="$" /></div>
            <div style={{ opacity: ease(f, BARS - 4, BARS + 6) }}><GoldBar w={130} /></div>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 40, color: '#ff3db4', opacity: ease(f, SINCE1 - 2, SINCE1 + 6) }}>SINCE<span style={{ opacity: ease(f, THIRTY1 - 2, THIRTY1 + 6) }}> 1933</span></span>
          </div>
          <div style={{ marginTop: 18, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, THIRTY1, THIRTY1 + 10) }}>Executive Order 6102 (1933), with exceptions · ended 31 Dec 1974</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="TODAY" parts={[{ text: 'A generation later,', at: GENERATION }, { text: 'trust takes a new shape.', at: SHAPE }, { text: "No paper at all.", at: ALL }, { text: 'In Kenya, it moves into a text message.', at: MESSAGE }]} />
      <EpisodeHud year={1971} episode="04" />
    </AbsoluteFill>
  );
};
export default Mo1971;
