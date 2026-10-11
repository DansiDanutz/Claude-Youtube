import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, WeekStrip, DidYouKnowThat, Cliffhanger, EraExit } from '../../lib/dykkit';
import { EpisodeHud, SunChip, Spectrum, WakePlace, win, SUN, CardSource, OnWord } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 7/14 — ERA 3: 1752, London (RESEARCH F4, F4b, F5). Two oval portraits on "Irish
// sisters", THE GUNNING SISTERS on "Gunnings". DYK card: white-lead face paint, "white lead"
// on "white". Maria's card: married on "married", 27 on "twenty", blamed (hedged, V&A) on
// "blamed", ceruse pot on "powder". Rich: a lady, parasol opens on "parasol". Poor: a week
// outdoors (Week Strip) from "poor", TAN glows on "tan". Newton's Opticks on "Newton"; the
// prism on "Pass"; the fan opens on "opens"; RED / VIOLET labels on their words; the dashed
// band beyond red on "beyond". VO su06 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Su1700', durationInSeconds: 50.8333, fps: 30, width: 1920, height: 1080 };
const DUR = 1525;

const C = makeCue(vo, 'su06-1700', 0.8);
const LONDON = C.at('London');
const SISTERS = C.at('sisters');
const DOCK = SISTERS - 4;
const FASHIONABLE = C.at('fashionable');
const LEAST = C.at('least');
const GUNNINGS = C.at('Gunnings');
const TALKED = C.at('talked');
const DID = C.at('Did');
const WHITE1 = C.at('white', 1);
const MARIA = C.at('Maria');
const MARRIED = C.at('married');
const TWENTY = C.at('twenty');
const BLAMED = C.at('blamed');
const POWDER = C.at('powder');
const RICH = C.at('rich');
const PARASOL = C.at('parasol');
const POOR = C.at('poor');
const TAN = C.at('tan');
const HALF = C.at('Half');
const NEWTON = C.at('Newton');
const WHITE2 = C.at('white', 2);
const OPENS = C.at('opens');
const RED1 = C.at('Red', 1);
const VIOLET = C.at('Violet');
const BEYOND = C.at('beyond');
const LIGHT = C.at('light');
const SEE = C.at('detect');
const STEP = 12;

const WEEK = [
  { d: 'MON', work: 0.85, color: '#ffc94a' }, { d: 'TUE', work: 0.85, color: '#ffc94a' }, { d: 'WED', work: 0.85, color: '#ffc94a' },
  { d: 'THU', work: 0.85, color: '#ffc94a' }, { d: 'FRI', work: 0.85, color: '#ffc94a' }, { d: 'SAT', work: 0.85, color: '#ffc94a', tag: 'IN THE SUN' },
  { d: 'SUN', work: 0.2, color: '#b9b1a4' },
];

const Portrait: React.FC<{ x: number; at: number }> = ({ x, at }) => {
  const f = useCurrentFrame();
  return (
    <svg width={260} height={330} viewBox="0 0 260 330" style={{ position: 'absolute', left: x, top: 280, opacity: ease(f, at - 2, at + 10), transform: `translateY(${ease(f, at - 2, at + 12, 20, 0)}px)` }}>
      <ellipse cx={130} cy={165} rx={120} ry={155} fill="#1a1410" stroke={DL.gold} strokeWidth={8} />
      <ellipse cx={130} cy={130} rx={46} ry={58} fill="#f4ede4" />
      <path d="M80 110 Q130 40 180 110 Q190 70 130 60 Q70 70 80 110 Z" fill="#c9b79c" />
      <path d="M50 300 C60 220 95 200 130 200 C165 200 200 220 210 300 Z" fill="#6b3d52" />
    </svg>
  );
};

const Su1700: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const sceneA = win(f, SISTERS - 4, DID - 2);
  const maria = win(f, MARIA + 22, RICH, 4);
  const life = win(f, RICH - 4, HALF);
  const spec = ease(f, HALF - 4, HALF + 8);
  const parasol = ease(f, PARASOL - 2, PARASOL + 14, 0, 1, DL_EASE.out);
  const fan = ease(f, OPENS - 2, OPENS + 30, 0, 1, DL_EASE.inOut);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#22100e" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1752" idx={3} label="LONDON" dockAt={DOCK} />
        <WakePlace place="London" at={LONDON} dockAt={DOCK} yearAt={C.at('seventeen')} />
        <AbsoluteFill style={{ opacity: sceneA }}>
          <Portrait x={620} at={SISTERS} />
          <Portrait x={1040} at={SISTERS + 8} />
          <div style={{ ...rise(f, GUNNINGS - 2), position: 'absolute', left: 0, right: 0, top: 650, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 64, color: DL.text }}>The Gunning sisters</div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 750, display: 'flex', justifyContent: 'center' }}><SunChip text="THE MOST TALKED-ABOUT FACES IN TOWN" at={TALKED} color={DL.gold} size={26} /></div>
        </AbsoluteFill>


        {/* Maria Gunning */}
        <AbsoluteFill style={{ opacity: maria }}>
          <Portrait x={240} at={MARIA - 4} />
          <div style={{ position: 'absolute', left: 620, top: 260, width: 1120, display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div style={{ fontFamily: DL_SERIF, fontSize: 72, color: DL.text }}>Maria Gunning <span style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.muted }}>1733–1760</span></div>
            <div style={{ display: 'flex', gap: 14 }}>
              <SunChip text="1752 · MARRIES" at={MARRIED} color={DL.dim} size={26} />
              <SunChip text="THE EARL OF COVENTRY" at={C.at('Coventry')} color={DL.gold} size={26} />
            </div>
            <SunChip text="DIES AT 27" at={TWENTY} color={DL.red} size={34} />
            <div style={{ ...rise(f, BLAMED - 2), fontFamily: DL_SERIF, fontSize: 44, lineHeight: 1.25, color: DL.text }}>
              Her death was blamed,<span style={{ opacity: ease(f, LEAST - 4, LEAST + 6) }}> at least in part, on the</span> <span style={{ color: DL.gold, fontStyle: 'italic', opacity: ease(f, POWDER - 4, POWDER + 6) }}>lead in her face powder.</span>
            </div>
            <div style={{ ...rise(f, BLAMED + 12), fontFamily: DL_MONO, fontSize: 24, color: DL.muted }}>V&amp;A: “white lead (possibly also arsenic)” · tuberculosis also played a part</div>
          </div>
        </AbsoluteFill>

        {/* rich vs poor */}
        <AbsoluteFill style={{ opacity: life }}>
          <div style={{ position: 'absolute', left: 160, top: 220, width: 620, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <SunChip text="IF YOU ARE RICH" at={RICH} color={DL.gold} size={26} />
            <svg width={420} height={460} viewBox="0 0 420 460">
              {/* parasol opens on its word */}
              <g transform="translate(210 120)" opacity={ease(f, PARASOL - 4, PARASOL + 4)}>
                <path d={`M${-170 * parasol} 0 Q0 ${-110 * parasol - 10} ${170 * parasol} 0 Z`} fill="#c06c84" stroke={DL.gold} strokeWidth={4} />
                <line x1={0} y1={-10} x2={0} y2={170} stroke={DL.gold} strokeWidth={5} />
              </g>
              <g opacity={ease(f, C.at('stay') - 2, C.at('stay') + 6) * (1 - 0.7 * parasol)}>
                <circle cx={380} cy={30} r={22} fill={SUN.mid} />
                {[0, 1, 2].map((k) => <line key={k} x1={360 - k * 14} y1={50 + k * 6} x2={290 - k * 30} y2={140 + k * 10} stroke={SUN.mid} strokeWidth={4} strokeDasharray="8 8" />)}
              </g>
              <circle cx={210} cy={200} r={30} fill="#f4ede4" />
              <path d="M120 440 C130 300 165 250 210 250 C255 250 290 300 300 440 Z" fill="#6b3d52" />
            </svg>
            <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.dim, opacity: ease(f, PARASOL - 2, PARASOL + 8) }}>SHADE · A PARASOL · PALE SKIN</div>
          </div>
          <div style={{ position: 'absolute', left: 860, top: 230, opacity: ease(f, POOR - 4, POOR + 6) }}>
            <div style={{ marginBottom: 10 }}><SunChip text="IF YOU ARE POOR" at={POOR} color={SUN.rim} size={26} /></div>
            <WeekStrip year="1752 · OUTDOORS" days={WEEK} at={POOR + 6} step={STEP} hot={5} hotAt={TAN} />
          </div>
        </AbsoluteFill>

        {/* what changed: Newton splits sunlight */}
        <AbsoluteFill style={{ opacity: spec }}>
          <div style={{ position: 'absolute', left: 160, top: 196 }}><SunChip text="HALF A CENTURY EARLIER" at={HALF} color={DL.dim} size={24} /></div>
          <div style={{ position: 'absolute', left: 160, top: 266, display: 'flex', gap: 30, alignItems: 'baseline' }}>
            <span style={{ ...rise(f, NEWTON - 2), fontFamily: DL_SERIF, fontSize: 60, color: DL.text }}>Isaac Newton</span>
            <span style={{ ...rise(f, NEWTON + 6), fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.muted }}>OPTICKS · 1704</span>
            <span style={{ ...rise(f, WHITE2 - 2), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 52, color: SUN.mid }}>sunlight is not white</span>
          </div>
          {/* the prism glints as he says "Pass it through a prism" */}
          <div style={{ position: 'absolute', left: 300 + 360 - 90, top: 350 + 290 - 110, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, #ffffffaa, transparent 65%)', opacity: ease(f, C.at('prism') - 2, C.at('prism') + 4) * (1 - ease(f, C.at('prism') + 8, C.at('prism') + 28)) }} />
          <div style={{ position: 'absolute', left: 300, top: 350, opacity: ease(f, HALF + 4, HALF + 14) }}>
            <Spectrum fan={fan} beyond={ease(f, BEYOND, BEYOND + 14)} redOp={ease(f, RED1 - 2, RED1 + 6)} violetOp={ease(f, VIOLET - 2, VIOLET + 6)} />
          </div>
        </AbsoluteFill>
        <DidYouKnowThat at={DID} out={MARIA + 20}>
          <OnWord at={C.at('pale')}>a pale face was so prized</OnWord><span style={{ opacity: ease(f, FASHIONABLE - 6, FASHIONABLE + 4) }}> that fashionable women painted theirs with</span> <span style={{ color: '#ff9a1f', fontStyle: 'italic', opacity: ease(f, WHITE1 - 2, WHITE1 + 8) }}>white lead.</span>
          <CardSource at={WHITE1}>V&A collections (Gunning plaque) · Fashion, Costume, and Culture, “Parasols”</CardSource>
        </DidYouKnowThat>
        <Cliffhanger next="1800" parts={[{ text: 'And beyond the red,', at: BEYOND }, { text: 'there is a light', at: LIGHT }, { text: 'our eyes cannot detect.', at: SEE }]} />
      </EraExit>
      <EpisodeHud year={1752} episode="02" />
    </AbsoluteFill>
  );
};
export default Su1700;
