import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, win, SunCliffhanger, MoneyChip, MoneyLadder, moneyRungs, Kid, Label, Source, StampText, AskMark, BigWord,
  Banknote, Sovereign, Anchor, TvSet, GOLD,
} from '../../lib/dykkit-money';
import vo from './vo.json';

// =============================================================================
// DYK 04 · 8/14 — ERA 4: 1821, London (RESEARCH F16–F19). Header + "London" on its word; coal smoke on "Coal", cobbles on
// "cobbles", the Bank of England with a queue on "queue"/"Bank". DYK (F16): the note's printed promise builds on "I" /
// "promise" / "bearer" / "demand"; THEN = GOLD on "gold"; £5 note = five sovereigns on "five" (2nd) / "coins", SOVEREIGNS
// on "Sovereigns". How it worked (F17–F18): a 1797 → 1821 bar, 24 YEARS on "twenty" (2nd), THE WARS WITH FRANCE (to 1815)
// on "wars"; NO GOLD PAID OUT on "stopped"; PAPER TOOK OVER on "Paper"; a fake note ✗ on "counterfeiters", MANY WERE
// HANGED on "hanged" (no gallows imagery); 1821 · GOLD AGAIN on "again"; note → coin on "turn"/"metal". "So what is money
// now?" = "?"; AS GOOD AS GOLD chip on "gold" (5th; slot 3, docks); note ⇄ coin on "swap". F19: country chips go gold on
// "world"/"gold" (6th); an anchor on "anchor"; SAFE on "safe". Cliffhanger: a TV on "television", the anchor's rope
// snaps on "rope". VO mo07 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Mo1821', durationInSeconds: 54.3333, fps: 30, width: 1920, height: 1080 };
const DUR = 1630;

const C = makeCue(vo, 'mo07-1821', 0.8);
const EIGHTEEN = C.at('eighteen');
const LONDON = C.at('London');
const DOCK = LONDON + 40;
const COAL = C.at('Coal');
const COBBLES = C.at('cobbles');
const QUEUE = C.at('queue');
const BANK1 = C.at('Bank', 1);
const DID = C.at('Did', 1);
const BANK2 = C.at('Bank', 2);
const NOTES = C.at('notes');
const STILL = C.at('still');
const I_ = C.at('I');
const PROMISE1 = C.at('promise', 1);
const BEARER = C.at('bearer');
const DEMAND = C.at('demand');
const BACK = C.at('Back');
const GOLD1 = C.at('gold', 1);
const FIVE1 = C.at('five', 1);
const NOTE = C.at('note');
const FIVE2 = C.at('five', 2);
const COINS = C.at('coins');
const SOVEREIGNS = C.at('Sovereigns');
const FOR = C.at('For', 2); // 'For twenty four years' (1 = 'swapped for five')
const TWENTY2 = C.at('twenty', 2);
const WARS = C.at('wars');
const STOPPED = C.at('stopped');
const PAPER1 = C.at('Paper', 1);
const COUNTERFEITERS = C.at('counterfeiters');
const HANGED = C.at('hanged');
const NOW1 = C.at('Now', 1);
const AGAIN = C.at('again');
const TURN = C.at('turn');
const METAL1 = C.at('metal', 1);
const SO2 = C.at('So', 2); // 'So what is money now?' (1 = 'So did counterfeiters')
const AS1 = C.at('As', 1);
const GOLD5 = C.at('gold', 5); // 'As good as gold.'
const CHIP_DOCK = GOLD5 + 80;
const SWAP = C.at('swap');
const OVER = C.at('Over', 2); // 'Over the next century' (1 = 'took over.')
const WORLD = C.at('world');
const BRITAIN = C.at('Britain');
const GOLD6 = C.at('gold', 6); // 'onto gold.'
const ANCHOR = C.at('anchor');
const SAFE = C.at('safe');
const BUT = C.at('But');
const NINETEEN = C.at('nineteen');
const TELEVISION = C.at('television');
const CUTS = C.at('cuts');
const ROPE = C.at('rope');

const COUNTRIES = ['BRITAIN', 'GERMANY', 'FRANCE', 'USA', 'JAPAN', 'MOST OTHERS'];

const Mo1821: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const street = win(f, DOCK, DID - 2, 10, 8);
  const restrict = win(f, FOR - 4, SO2 + 2, 6, 8);
  const gold = win(f, GOLD5 - 2, BUT, 4, 10);
  const cliff = ease(f, BUT - 2, BUT + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, BUT - 2, BUT + 8));
  const bar = ease(f, TWENTY2 - 4, TWENTY2 + 16, 0, 1, DL_EASE.inOut);
  const morph = ease(f, TURN - 2, METAL1 + 6, 0, 1, DL_EASE.inOut);
  const snap = ease(f, ROPE - 1, ROPE + 8, 0, 1, DL_EASE.out);
  const sway = Math.sin(f / 18) * 3;

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#18120a" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1821" idx={4} label="LONDON" dockAt={DOCK} />
        <WakePlace place="London" at={LONDON} dockAt={DOCK} yearAt={EIGHTEEN} />
        {/* coal smoke, wet cobbles, a queue outside the Bank of England */}
        <AbsoluteFill style={{ opacity: street }}>
          <div style={{ position: 'absolute', left: 160, top: 220, display: 'flex', gap: 18 }}>
            <Label at={COAL} color={DL.dim} size={28}>COAL SMOKE</Label>
            <Label at={COBBLES} color={DL.warm} size={28}>· WET COBBLES</Label>
            <Label at={QUEUE} color={DL.text} size={28}>· A QUEUE<span style={{ opacity: ease(f, BANK1 - 2, BANK1 + 6) }}> OUTSIDE THE BANK OF ENGLAND</span></Label>
          </div>
          <svg width={1600} height={600} viewBox="0 0 1600 600" style={{ position: 'absolute', left: 160, top: 300 }}>
            {/* the Bank: a long colonnade */}
            <g opacity={ease(f, BANK1 - 6, BANK1 + 8)}>
              <rect x={700} y={120} width={860} height={300} fill="#3a3630" />
              <path d="M680 120 L1130 40 L1580 120 Z" fill="#4a4640" />
              {Array.from({ length: 10 }, (_, i) => <rect key={i} x={730 + i * 82} y={140} width={26} height={280} fill="#8a857a" />)}
              <text x={1130} y={100} textAnchor="middle" fontFamily={DL_MONO} fontSize={22} fill="#d8d0c0">BANK OF ENGLAND</text>
            </g>
            {/* the queue */}
            {Array.from({ length: 8 }, (_, i) => (
              <g key={i} opacity={ease(f, QUEUE + i * 3, QUEUE + i * 3 + 6)} transform={`translate(${640 - i * 70} 330)`}>
                <circle cx={20} cy={14} r={13} fill={DL.warm} /><path d="M2 90 C2 44 8 30 20 30 C32 30 38 44 38 90 Z" fill={['#4a4458', '#5a4a3a', '#3a4a5a'][i % 3]} />
                <rect x={4} y={-12} width={32} height={10} fill="#1a1a1a" opacity={i % 2} />
              </g>
            ))}
            {/* wet cobbles */}
            <g opacity={ease(f, COBBLES - 4, COBBLES + 10)}>
              {Array.from({ length: 64 }, (_, i) => <ellipse key={i} cx={(i % 16) * 100 + ((Math.floor(i / 16) % 2) * 50)} cy={440 + Math.floor(i / 16) * 36} rx={44} ry={14} fill="#2a2824" stroke="#5a5a64" strokeWidth={2} />)}
            </g>
            {/* coal smoke */}
            <g opacity={ease(f, COAL - 4, COAL + 14)}>
              {[0, 1, 2, 3].map((k) => <ellipse key={k} cx={(160 + k * 380 + f * (0.8 + k * 0.2)) % 1700} cy={60 + k * 20} rx={220} ry={50} fill="#9a968e" opacity={0.16} style={{ filter: 'blur(14px)' }} />)}
            </g>
          </svg>
        </AbsoluteFill>

        {/* 24 years of paper, then gold again */}
        <AbsoluteFill style={{ opacity: restrict }}>
          <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={FOR} color={DL.dim} size={30}>HOW IT WORKED · THE BANK RESTRICTION</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 280, width: 1100 }}>
            <div style={{ position: 'relative', height: 90 }}>
              <div style={{ position: 'absolute', left: 0, top: 30, width: 1100 * bar, height: 30, borderRadius: 8, background: `linear-gradient(90deg, ${DL.warm}, ${DL.gold})` }} />
              <div style={{ position: 'absolute', left: 0, top: 30, width: (18 / 24) * 1100 * ease(f, WARS - 2, WARS + 14), height: 30, borderRadius: 8, border: `3px solid ${DL.red}`, boxSizing: 'border-box' }} />
              <span style={{ position: 'absolute', left: 0, top: 70, fontFamily: DL_MONO, fontSize: 24, color: DL.muted, opacity: bar }}>1797</span>
              <span style={{ position: 'absolute', right: 0, top: 70, fontFamily: DL_MONO, fontSize: 24, color: DL.gold, opacity: bar }}>1821</span>
              <span style={{ position: 'absolute', left: (18 / 24) * 1100 - 40, top: 70, fontFamily: DL_MONO, fontSize: 24, color: DL.red, opacity: ease(f, WARS, WARS + 8) }}>1815</span>
              <span style={{ position: 'absolute', left: 380, top: -14, fontFamily: DL_MONO, fontWeight: 700, fontSize: 32, color: DL.text, opacity: ease(f, TWENTY2 - 2, TWENTY2 + 6) }}>24 YEARS</span>
              <span style={{ position: 'absolute', left: 20, top: -14, fontFamily: DL_MONO, fontSize: 24, color: DL.red, opacity: ease(f, WARS - 2, WARS + 6) }}>WARS WITH FRANCE</span>
            </div>
            <div style={{ marginTop: 40 }}><Label at={STOPPED} color={DL.text} size={30}>THE BANK STOPS PAYING OUT GOLD</Label></div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 500, display: 'flex', alignItems: 'flex-end', gap: 50 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: ease(f, PAPER1 - 2, PAPER1 + 8) }}>
              <div style={{ position: 'relative', width: 280, height: 200 }}>{[0, 1, 2, 3].map((k) => <div key={k} style={{ position: 'absolute', left: k * 14, bottom: k * 22 }}><Banknote w={240} title="Bank of England" /></div>)}</div>
              <Label at={PAPER1} color={DL.text} size={26}>PAPER TOOK OVER</Label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: ease(f, COUNTERFEITERS - 2, COUNTERFEITERS + 8) }}>
              <div style={{ position: 'relative' }}>
                <Banknote w={240} title="Bank of Englund" color="#e0d8c0" ink="#7a6a5a" tilt={4} />
                <div style={{ position: 'absolute', right: -10, top: -10, fontFamily: DL_MONO, fontWeight: 700, fontSize: 60, color: DL.red }}>✗</div>
              </div>
              <Label at={COUNTERFEITERS} color={DL.red} size={26}>COUNTERFEITERS</Label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10, marginBottom: 40 }}>
              <StampText text="MANY WERE HANGED" at={HANGED} color={DL.red} size={36} />
              <Source at={HANGED} style={{ marginTop: 18 }}>British Museum: Cruikshank's "Bank Restriction Note" (1819)</Source>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 790, display: 'flex', alignItems: 'center', gap: 34, opacity: ease(f, NOW1 - 2, NOW1 + 8) }}>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 34, color: DL.gold }}>1821<span style={{ opacity: ease(f, AGAIN - 2, AGAIN + 6) }}> · GOLD AGAIN</span></span>
            <div style={{ position: 'relative', width: 260, height: 140, opacity: ease(f, TURN - 4, TURN + 4) }}>
              <div style={{ position: 'absolute', left: 0, top: 0, opacity: 1 - morph }}><Banknote w={240} title="Bank of England" /></div>
              <div style={{ position: 'absolute', left: 70, top: 0, opacity: morph, transform: `scale(${0.6 + 0.4 * morph})` }}><Sovereign size={130} glow={morph} /></div>
            </div>
            <Label at={TURN} color={DL.text} size={28}>PAPER → <span style={{ color: GOLD.light, opacity: ease(f, METAL1 - 2, METAL1 + 6) }}>METAL</span>, ANY DAY</Label>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 920 }}><Source at={TWENTY2}>Bank Restriction Act 1797 → cash payments resumed 1821</Source></div>
        </AbsoluteFill>

        {/* "So what is money now?" — as good as gold; the world follows; the anchor */}
        <AskMark at={SO2} out={GOLD5 + 2} left={760} top={250} pulseAt={C.at('now', 2)} />
        <AbsoluteFill style={{ opacity: gold }}>
          <div style={{ position: 'absolute', left: 200, top: 230, display: 'flex', alignItems: 'center', gap: 40 }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 110, color: DL.text, opacity: ease(f, AS1 - 2, AS1 + 6) }}>As good as</span>
            <BigWord at={GOLD5} size={110} gradient>gold.</BigWord>
          </div>
          <div style={{ position: 'absolute', left: 200, top: 390, display: 'flex', alignItems: 'center', gap: 26, opacity: ease(f, SWAP - 4, SWAP + 6) }}>
            <Banknote w={200} title="£" />
            <span style={{ fontFamily: DL_SERIF, fontSize: 70, color: DL.gold }}>⇄</span>
            <Sovereign size={110} glow={0.6} />
            <Label at={SWAP} color={DL.text} size={26}>A PROMISE YOU CAN SWAP FOR METAL</Label>
          </div>
          <div style={{ position: 'absolute', left: 200, top: 580 }}><Label at={OVER} color={DL.dim} size={28}>OVER THE NEXT CENTURY<span style={{ opacity: ease(f, BRITAIN - 2, BRITAIN + 6) }}> · THE WORLD FOLLOWS BRITAIN</span></Label></div>
          <div style={{ position: 'absolute', left: 200, top: 640, display: 'flex', gap: 16 }}>
            {COUNTRIES.map((c, i) => {
              const at = (i === 0 ? WORLD : GOLD6) + (i === 0 ? 0 : (i - 1) * 6);
              const lit = f >= at;
              return <div key={c} style={{ padding: '12px 18px', borderRadius: 10, border: `2px solid ${lit ? GOLD.mid : DL.border}`, background: lit ? '#2a2006' : DL.panel, fontFamily: DL_MONO, fontSize: 24, color: lit ? GOLD.light : DL.muted, opacity: ease(f, WORLD - 2 + i * 2, WORLD + 6 + i * 2), boxShadow: lit ? `0 0 16px ${GOLD.mid}66` : undefined }}>{c}</div>;
            })}
          </div>
          <div style={{ position: 'absolute', left: 200, top: 730 }}><Source at={GOLD6}>Bordo, "Gold Standard" (Econlib): major countries joined in the 1870s; most by 1880–1914</Source></div>
          <div style={{ position: 'absolute', left: 200, top: 790, display: 'flex', alignItems: 'center', gap: 30, opacity: ease(f, ANCHOR - 4, ANCHOR + 6) }}>
            <Anchor size={110} color={GOLD.mid} />
            <Label at={ANCHOR} color={GOLD.light} size={32}>GOLD = THE ANCHOR</Label>
            <Label at={SAFE} color={DL.green} size={32}>· FEELS SAFE</Label>
          </div>
        </AbsoluteFill>
        <MoneyChip text="AS GOOD AS GOLD" at={GOLD5} dockAt={CHIP_DOCK} slot={3} left={1150} top={470} />

        {/* cliffhanger: one television speech cuts the rope */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 300, top: 240, opacity: ease(f, BUT - 2, BUT + 8) }}>
            <svg width={300} height={560} viewBox="0 0 300 560" style={{ overflow: 'visible' }}>
              <line x1={150} y1={0} x2={150} y2={320 - 20 * snap} stroke="#c8b088" strokeWidth={8} strokeDasharray={snap > 0.05 ? '0' : '0'} />
              <g transform={`translate(${70} ${320 + 140 * snap}) rotate(${sway + 30 * snap} 80 80)`} opacity={1 - 0.6 * snap}><Anchor size={160} color={GOLD.mid} /></g>
              {snap > 0.02 && <text x={170} y={300} fontFamily={DL_MONO} fontWeight={700} fontSize={40} fill={DL.red}>✂</text>}
            </svg>
          </div>
          <div style={{ position: 'absolute', left: 820, top: 260, opacity: ease(f, TELEVISION - 4, TELEVISION + 6) }}>
            <TvSet size={460} on={ease(f, TELEVISION, TELEVISION + 12)}><Kid size={70} adult color="#2a2a2a" /></TvSet>
            <Label at={NINETEEN} color={DL.red} size={30} style={{ marginTop: 16 }}>1971 · ONE SPEECH</Label>
          </div>
        </AbsoluteFill>

        <MoneyLadder rungs={[...moneyRungs(3), { year: '1821', label: 'AS GOOD AS GOLD', at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={FOR}>
          <span style={{ opacity: ease(f, BANK2 - 4, BANK2 + 6) }}>Bank of England</span>
          <span style={{ opacity: ease(f, NOTES - 4, NOTES + 6) }}> notes</span>
          <span style={{ opacity: ease(f, STILL - 4, STILL + 6) }}> still say:</span>
          <div style={{ marginTop: 14, padding: '14px 22px', borderRadius: 10, background: '#e9e2c8', fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 50, color: '#3a5a48', opacity: ease(f, I_ - 4, I_ + 4) }}>
            "I <span style={{ opacity: ease(f, PROMISE1 - 3, PROMISE1 + 4) }}>promise to pay</span><span style={{ opacity: ease(f, BEARER - 3, BEARER + 4) }}> the bearer</span><span style={{ opacity: ease(f, DEMAND - 3, DEMAND + 4) }}> on demand"</span>
          </div>
          <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 22 }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 46, color: '#ffffff', opacity: ease(f, BACK - 4, BACK + 6) }}>Back then:</span>
            <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: '#ffd23f', opacity: ease(f, GOLD1 - 4, GOLD1 + 6) }}>gold.</span>
            <div style={{ opacity: ease(f, FIVE1 - 4, FIVE1 + 6) }}><Banknote w={170} big="£5" /></div>
            <span style={{ fontFamily: DL_SERIF, fontSize: 46, color: '#ffffff', opacity: ease(f, FIVE2 - 4, FIVE2 + 4) }}>=</span>
            <div style={{ display: 'flex', gap: 4 }}>{[0, 1, 2, 3, 4].map((k) => <div key={k} style={{ opacity: ease(f, FIVE2 + k * 3 - 2, FIVE2 + k * 3 + 4) }}><Sovereign size={58} /></div>)}</div>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: '#ffd23f', opacity: ease(f, SOVEREIGNS - 3, SOVEREIGNS + 5) }}>SOVEREIGNS</span>
          </div>
          <div style={{ marginTop: 16, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, NOTE, NOTE + 10) }}>Bank of England, Banknote FAQs · today the promise only means another note</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1971" parts={[{ text: 'But in 1971,', at: NINETEEN }, { text: 'one television speech', at: TELEVISION }, { text: 'cuts the rope.', at: ROPE }]} />
      <EpisodeHud year={1821} episode="04" />
    </AbsoluteFill>
  );
};
export default Mo1821;
