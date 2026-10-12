import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, WeekStrip, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import { EpisodeHud, SunChip, SunDisc, WakePlace, win, SUN, CardSource, HowWeSawIt, ArcLadder, pastRungs, SunCliffhanger, SunWeekStrip } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 7/14 — ERA 3: 1779, England (RESEARCH F4, F4b, A3). VO su06 @0.8 s.
// Opening: sky floods bright on "bright", two ladies walk in on "ladies", turn away on "hiding",
// parasols snap open on "parasols"; the header docks on "morning" and the past rungs (2) show
// until the DYK card. Card (Gunning) clause by clause, source on "white". Maria Gunning: portrait
// on "beauty", name on "Maria", 1733–1760 on "Gunning", COUNTESS OF COVENTRY on "Coventry", DIED AT
// 27 on "seven", hedged blame line on "blamed" / "least" / "lead" / "powder". Rich (parasol, rays
// on "stay") vs poor (Week Strip, 12-frame steps, tan on "tan"). The Sun turns on "turning",
// "?" on "Something", chip TO EXPLAIN on "explain." (docks on "runs"). Ingenhousz (A3): name card
// on "Ingen-house", 500+ jars, the leaf sinks, bubbles on "bubble", shade stops them on "stop",
// green leaf vs stem on "green", back in the beam on "Sun". Cliffhanger builds on its words.
// =============================================================================
export const compositionConfig = { id: 'Su1700', durationInSeconds: 58.0333, fps: 30, width: 1920, height: 1080 };
const DUR = 1741;

const C = makeCue(vo, 'su06-1700', 0.8);
const SEVENTEEN = C.at('seventeen');
const ENGLAND = C.at('England');
const BRIGHT = C.at('bright');
const DOCK = C.at('morning') - 3;
const LADIES = C.at('ladies');
const HIDING = C.at('hiding');
const PARASOLS = C.at('parasols');
const DID = C.at('Did');
const PALE = C.at('pale');
const PRIZED = C.at('prized');
const FASHIONABLE2 = C.at('fashionable', 2);
const PAINTED = C.at('painted');
const WHITE = C.at('white');
const BEAUTY = C.at('beauty');
const MARIA = C.at('Maria');
const GUNNING = C.at('Gunning');
const COUNTESS = C.at('Countess');
const SEVEN = C.at('seven');
const BLAMED = C.at('blamed');
const LEAST = C.at('least');
const LEAD2 = C.at('lead', 2);
const POWDER = C.at('powder');
const RICH = C.at('rich');
const STAY = C.at('stay');
const POOR = C.at('poor');
const TAN = C.at('tan');
const BUT1 = C.at('But', 1);
const SUN2 = C.at('Sun', 2);
const TURNING = C.at('turning');
const NEW = C.at('new');
const SOMETHING2 = C.at('something', 2);
const EXPLAIN = C.at('explain');
const DUTCH = C.at('Dutch');
const INGEN = C.at('Ingen-house');
const RUNS = C.at('runs');
const CHIP_DOCK = C.at('plants', 1);
const FIVE = C.at('five');
const SINKS = C.at('sinks');
const WATER = C.at('water');
const SUNLIGHT = C.at('sunlight');
const BUBBLE = C.at('bubble');
const FRESH = C.at('fresh');
const SHADE = C.at('shade');
const STOP = C.at('stop');
const GREEN = C.at('green');
const PARTS = C.at('parts');
const SUN3 = C.at('Sun', 3);
const BUT2 = C.at('But', 2);
const LIGHT = C.at('light');
const USE = C.at('use');
const EYES = C.at('eyes');
const DETECT = C.at('detect');
const STEP = 12;

const WEEK = [
  { d: 'MON', work: 0.85, color: '#ffc94a' }, { d: 'TUE', work: 0.85, color: '#ffc94a' }, { d: 'WED', work: 0.85, color: '#ffc94a' },
  { d: 'THU', work: 0.85, color: '#ffc94a' }, { d: 'FRI', work: 0.85, color: '#ffc94a' }, { d: 'SAT', work: 0.85, color: '#ffc94a' },
  { d: 'SUN', work: 0.2, color: '#b9b1a4' },
];

// ── a lady in a 1770s gown. face: 1 = looks right, -1 = turned away (left); parasol 0 closed → 1 open.
const Lady: React.FC<{ x: number; y: number; h?: number; face: number; parasol: number; dress: string }> = ({ x, y, h = 380, face, parasol, dress }) => {
  const s = h / 400;
  const open = Math.max(0.06, parasol);
  return (
    <svg width={260 * s} height={420 * s} viewBox="-30 -20 260 420" style={{ position: 'absolute', left: x, top: y, overflow: 'visible' }}>
      <g transform={`translate(100 0) scale(${face} 1) translate(-100 0)`}>
        {/* parasol: handle in the near hand, canopy opens around the top */}
        <line x1={128} y1={210} x2={128} y2={40} stroke={DL.gold} strokeWidth={5} />
        <path d={`M${128 - 110 * open} 60 Q128 ${60 - 70 * open} ${128 + 110 * open} 60 Z`} fill="#c06c84" stroke={DL.gold} strokeWidth={4} />
        <path d="M30 400 C40 290 62 230 100 225 C138 230 160 290 170 400 Z" fill={dress} />
        <path d="M78 228 L86 150 Q100 138 114 150 L122 228 Z" fill={dress} />
        <path d="M114 160 Q130 180 128 210" fill="none" stroke="#f4ede4" strokeWidth={9} strokeLinecap="round" />
        <circle cx={104} cy={118} r={24} fill="#f4ede4" />
        <path d="M80 112 Q100 74 130 104 Q128 82 104 80 Q82 82 80 112 Z" fill="#c9b79c" />
        <circle cx={118} cy={116} r={3} fill="#1a1410" />
      </g>
    </svg>
  );
};

// a clause that fades in starting ON its word (no pre-roll)
const OnW: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const f = useCurrentFrame();
  return <span style={{ opacity: ease(f, at, at + 8) }}>{children}</span>;
};

const Portrait: React.FC<{ x: number; at: number }> = ({ x, at }) => {
  const f = useCurrentFrame();
  return (
    <svg width={260} height={330} viewBox="0 0 260 330" style={{ position: 'absolute', left: x, top: 250, opacity: ease(f, at - 2, at + 10), transform: `translateY(${ease(f, at - 2, at + 12, 20, 0)}px)` }}>
      <ellipse cx={130} cy={165} rx={120} ry={155} fill="#1a1410" stroke={DL.gold} strokeWidth={8} />
      <ellipse cx={130} cy={130} rx={46} ry={58} fill="#f4ede4" />
      <path d="M80 110 Q130 40 180 110 Q190 70 130 60 Q70 70 80 110 Z" fill="#c9b79c" />
      <path d="M50 300 C60 220 95 200 130 200 C165 200 200 220 210 300 Z" fill="#6b3d52" />
    </svg>
  );
};

// the ceruse (white-lead face powder) pot
const PowderPot: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  return (
    <svg width={150} height={120} viewBox="0 0 150 120" style={{ position: 'absolute', left: 295, top: 680, opacity: ease(f, at - 2, at + 8), transform: `scale(${ease(f, at - 2, at + 10, 1.25, 1)})` }}>
      <ellipse cx={75} cy={36} rx={58} ry={14} fill="#f4ede4" />
      <path d="M17 36 V96 Q75 116 133 96 V36 Q75 52 17 36 Z" fill="#2a2220" stroke={DL.gold} strokeWidth={3} />
      <text x={75} y={84} textAnchor="middle" fill={DL.gold} fontFamily={DL_MONO} fontSize={18} letterSpacing={2}>CERUSE</text>
    </svg>
  );
};

// deterministic bubble stream: one bubble every `period` frames per source while active(t)
const Bubbles: React.FC<{ srcs: { x: number; y: number }[]; active: (t: number) => boolean; top: number; period?: number; speed?: number; r?: number; vis?: (t: number) => number }> = ({ srcs, active, top, period = 6, speed = 3.4, r = 6, vis = () => 1 }) => {
  const f = useCurrentFrame();
  const out: React.ReactNode[] = [];
  srcs.forEach((s, i) => {
    const phase = (i * 3) % period;
    for (let t = f - ((f - phase) % period + period) % period; t > f - 120; t -= period) {
      if (!active(t)) continue;
      const y = s.y - (f - t) * speed;
      if (y < top) continue;
      const k = Math.round(t / period) + i;
      out.push(<circle key={`${i}-${t}`} cx={s.x + Math.sin(t * 0.7 + i) * 5} cy={y} r={r * (0.6 + (k % 3) * 0.25)} fill="none" stroke="#d6f0ff" strokeWidth={2.5} opacity={0.9 * vis(t)} />);
    }
  });
  return <>{out}</>;
};

// big glass jar, water, a sprig (green leaf + brown stem) that sinks; local 340 × 460
const JAR = { left: 600, top: 330, w: 340, h: 460, water: 120 } as const;
const BigJar: React.FC<{ leafY: number; active: (t: number) => boolean; vis: (t: number) => number; shade: number }> = ({ leafY, active, vis, shade }) => (
  <svg width={JAR.w} height={JAR.h} viewBox={`0 0 ${JAR.w} ${JAR.h}`} style={{ position: 'absolute', left: JAR.left, top: JAR.top, overflow: 'visible' }}>
    <rect x={30} y={JAR.water} width={280} height={JAR.h - JAR.water - 10} fill="#38bdf830" />
    <line x1={30} y1={JAR.water} x2={310} y2={JAR.water} stroke="#d6f0ff" strokeWidth={2} opacity={0.7} />
    <g transform={`translate(170 ${leafY})`}>
      <path d="M0 70 Q-4 30 0 -10" stroke="#8a5a2b" strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M0 0 Q-62 -14 -78 -60 Q-26 -58 0 0 Z" fill={DL.green} />
      <path d="M0 22 Q60 6 74 -40 Q24 -36 0 22 Z" fill={DL.green} opacity={0.9} />
    </g>
    <Bubbles srcs={[{ x: 120, y: leafY - 30 }, { x: 205, y: leafY - 12 }, { x: 160, y: leafY - 4 }]} active={active} vis={vis} top={JAR.water + 6} />
    <path d={`M20 20 H320 M30 20 V${JAR.h - 18} Q30 ${JAR.h} 50 ${JAR.h} H290 Q310 ${JAR.h} 310 ${JAR.h - 18} V20`} fill="none" stroke="#d6f0ff" strokeWidth={5} opacity={0.85} />
    <rect x={30} y={20} width={280} height={JAR.h - 30} fill="#050404" opacity={0.55 * shade} />
  </svg>
);

// one small test jar for the green-vs-stem split
const MiniJar: React.FC<{ x: number; kind: 'leaf' | 'stem'; at: number; bubbling: (t: number) => boolean }> = ({ x, kind, at, bubbling }) => {
  const f = useCurrentFrame();
  return (
    <svg width={160} height={230} viewBox="0 0 160 230" style={{ position: 'absolute', left: x, top: 506, opacity: ease(f, at - 2, at + 8), transform: `translateY(${ease(f, at - 2, at + 12, 18, 0)}px)` }}>
      <rect x={14} y={60} width={132} height={160} fill="#38bdf830" />
      {kind === 'leaf'
        ? <path d="M80 190 Q30 176 22 130 Q66 132 80 190 Z" fill={DL.green} />
        : <path d="M80 210 Q74 170 82 120" stroke="#8a5a2b" strokeWidth={8} fill="none" strokeLinecap="round" />}
      {kind === 'leaf' && <Bubbles srcs={[{ x: 52, y: 160 }, { x: 70, y: 176 }]} active={bubbling} top={66} period={7} speed={2.6} r={5} />}
      <path d="M8 12 H152 M14 12 V214 Q14 224 24 224 H136 Q146 224 146 214 V12" fill="none" stroke="#d6f0ff" strokeWidth={4} opacity={0.85} />
    </svg>
  );
};

// 3 rows × 16 tiny jars (each with a leaf), row r draws at at + r*STEP
const JarGrid: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const leaf = 1;
  return (
    <svg width={900} height={300} viewBox="0 0 900 300" style={{ position: 'absolute', left: 160, top: 360 }}>
      {Array.from({ length: 3 }, (_, r) => Array.from({ length: 16 }, (__, c) => {
        const op = ease(f, at + r * STEP, at + r * STEP + 8);
        const x = c * 56, y = r * 74;
        return (
          <g key={`${r}-${c}`} opacity={op} transform={`translate(${x} ${y + (1 - op) * 10})`}>
            <rect x={6} y={18} width={34} height={44} rx={5} fill="#38bdf822" stroke="#d6f0ff" strokeWidth={2} opacity={0.8} />
            <path d="M23 54 Q12 48 12 36 Q24 38 23 54 Z" fill={DL.green} opacity={leaf} />
          </g>
        );
      }))}
    </svg>
  );
};

const Su1700: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  // opening: the summer street
  const sceneA = 1 - ease(f, DID - 10, DID);
  const sky = ease(f, BRIGHT - 2, BRIGHT + 20);
  const walk = ease(f, LADIES - 4, LADIES + 22, 0, 1, DL_EASE.out);
  const turn = interpolate(f, [HIDING - 2, HIDING + 8], [1, -1], { ...DCLAMP, easing: DL_EASE.inOut });
  const snap = ease(f, PARASOLS - 1, PARASOLS + 5, 0, 1, DL_EASE.out);
  const ladderA = win(f, DOCK + 12, DID - 4, 10, 8);
  // Maria Gunning, then rich vs poor
  const maria = win(f, BEAUTY + 6, RICH + 16, 8, 10);
  const life = win(f, RICH + 12, BUT1 + 22, 8, 12);
  // the Sun turns into something to explain → becomes the beam source of the Ingenhousz jar
  const sunOp = ease(f, BUT1 + 10, BUT1 + 22);
  const toCorner = ease(f, DUTCH - 2, DUTCH + 22, 0, 1, DL_EASE.inOut);
  const sunCx = 960 + 220 * toCorner;
  const sunCy = interpolate(f, [BUT1, SUN2 + 10], [640, 430], { ...DCLAMP, easing: DL_EASE.out }) * (1 - toCorner) + 260 * toCorner;
  const sunScale = 1 - 0.55 * toCorner;
  const spin = ease(f, TURNING - 2, TURNING + 30, 0, 90, DL_EASE.inOut) + Math.max(0, f - TURNING) * 0.15;
  const flare = ease(f, NEW - 2, NEW + 6) * (1 - ease(f, NEW + 10, NEW + 34));
  const qMark = win(f, SOMETHING2, DUTCH + 4, 4, 10);
  // Ingenhousz
  const ingen = ease(f, DUTCH - 4, DUTCH + 6);
  const grid = win(f, RUNS, SINKS - 8, 4, 8);
  const jar = ease(f, SINKS - 10, SINKS - 2);
  const leafY = interpolate(f, [SINKS, WATER + 14], [40, 330], { ...DCLAMP, easing: DL_EASE.inOut });
  const beam = ease(f, SUNLIGHT - 2, SUNLIGHT + 10);
  const shade = ease(f, SHADE - 4, SHADE + 12, 0, 1, DL_EASE.inOut) * (1 - ease(f, SUN3 - 4, SUN3 + 12, 0, 1, DL_EASE.inOut));
  const mainActive = (t: number) => (t >= BUBBLE && t < STOP) || t >= SUN3;
  // on "stop" the bubbles already in the water vanish too (they stop, not drift on)
  const mainVis = (t: number) => (t < STOP ? 1 - ease(f, STOP, STOP + 6) : 1);
  const ladderB = ease(f, CHIP_DOCK + 6, CHIP_DOCK + 14) * (1 - ease(f, BUT2, BUT2 + 10));
  const beamPulse = 1 + 0.5 * ease(f, LIGHT - 2, LIGHT + 6) * (1 - ease(f, LIGHT + 10, LIGHT + 30));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#22100e" />
      <Vignette />
      <EraExit dur={DUR}>
        {/* the bright summer morning: sky floods on "bright", the Sun sits clear of the ladder box */}
        <AbsoluteFill style={{ opacity: sceneA }}>
          <AbsoluteFill style={{ opacity: sky, background: `radial-gradient(circle at 60% 24%, ${SUN.glow}55, transparent 55%)` }} />
          <div style={{ position: 'absolute', left: 1150 - 117, top: 250 - 117, opacity: sky, transform: 'scale(0.5)' }}><SunDisc size={130} id="summerSun" /></div>
          <div style={{ position: 'absolute', left: 400, right: 640, top: 820, height: 3, background: DL.border, opacity: sky }} />
          <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, opacity: walk, transform: `translateX(${(1 - walk) * -340}px)` }}>
            <Lady x={600} y={440} face={turn} parasol={snap} dress="#6b3d52" />
            <Lady x={860} y={452} h={364} face={turn} parasol={ease(f, PARASOLS + 3, PARASOLS + 9, 0, 1, DL_EASE.out)} dress="#5a3b22" />
          </div>
        </AbsoluteFill>
        <ArcLadder rungs={pastRungs(2)} show={ladderA} />
        <EraHeader year="1779" idx={3} label="ENGLAND" dockAt={DOCK} />
        <WakePlace place="England" at={ENGLAND} dockAt={DOCK} yearAt={SEVENTEEN} />

        {/* Maria Gunning (1733–1760), told from 1779 */}
        <AbsoluteFill style={{ opacity: maria }}>
          <Portrait x={240} at={BEAUTY + 4} />
          <div style={{ position: 'absolute', left: 240, width: 260, top: 600, textAlign: 'center', fontFamily: DL_MONO, fontSize: 26, color: DL.dim, opacity: ease(f, GUNNING, GUNNING + 8) }}>1733–1760</div>
          <PowderPot at={POWDER} />
          <div style={{ position: 'absolute', left: 620, top: 250, width: 1120, display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div style={{ ...rise(f, MARIA), fontFamily: DL_SERIF, fontSize: 72, color: DL.text }}>Maria Gunning</div>
            <SunChip text="COUNTESS OF COVENTRY" at={COUNTESS} color={DL.gold} size={26} />
            <SunChip text="DIED AT 27" at={SEVEN} color={DL.red} size={34} />
            <div style={{ ...rise(f, BLAMED - 2), fontFamily: DL_SERIF, fontSize: 44, lineHeight: 1.25, color: DL.text }}>
              Her death was blamed,<span style={{ opacity: ease(f, LEAST, LEAST + 8) }}> at least in part,</span><span style={{ opacity: ease(f, LEAD2, LEAD2 + 8) }}> on the</span> <span style={{ color: DL.gold, fontStyle: 'italic', opacity: ease(f, LEAD2, LEAD2 + 8) }}>lead</span><span style={{ color: DL.gold, fontStyle: 'italic', opacity: ease(f, POWDER, POWDER + 8) }}> in her face powder.</span>
            </div>
            <div style={{ ...rise(f, BLAMED + 12), fontFamily: DL_MONO, fontSize: 24, color: DL.muted }}>V&amp;A: “white lead (possibly also arsenic)” · tuberculosis also played a part</div>
          </div>
        </AbsoluteFill>

        {/* rich vs poor */}
        <AbsoluteFill style={{ opacity: life }}>
          <div style={{ position: 'absolute', left: 160, top: 220, width: 620, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <SunChip text="IF YOU'RE RICH" at={RICH + 10} color={DL.gold} size={26} />
            <div style={{ position: 'relative', width: 460, height: 440 }}>
              <svg width={460} height={440} viewBox="0 0 460 440" style={{ position: 'absolute', left: 0, top: 0, opacity: ease(f, STAY - 2, STAY + 8) }}>
                <circle cx={420} cy={40} r={26} fill={SUN.mid} />
                {[0, 1, 2].map((k) => <line key={k} x1={396 - k * 14} y1={60 + k * 6} x2={345 - k * 20} y2={100 - k * 8} stroke={SUN.mid} strokeWidth={4} strokeDasharray="8 8" />)}
              </svg>
              <Lady x={110} y={40} h={390} face={1} parasol={1} dress="#6b3d52" />
            </div>
            <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.dim, opacity: ease(f, STAY - 2, STAY + 8) }}>STAY IN THE SHADE · PALE SKIN</div>
          </div>
          <div style={{ position: 'absolute', left: 860, top: 220, opacity: ease(f, POOR - 4, POOR + 6) }}>
            <div style={{ marginBottom: 10, display: 'flex', gap: 16 }}>
              <SunChip text="IF YOU'RE POOR" at={POOR} color={SUN.rim} size={26} />
                          </div>
            <SunWeekStrip year="1779 · OUTDOORS" days={WEEK} at={POOR + 6} step={STEP} />
            {/* on "tan": the whole working week is bracketed — that's where the tan comes from */}
            <div style={{ position: 'absolute', left: 0, top: 552, width: 878 * ease(f, TAN, TAN + 12), height: 4, borderRadius: 2, background: SUN.rim, boxShadow: `0 0 14px ${SUN.rim}` }} />
            <div style={{ position: 'absolute', left: 0, top: 574 }}><SunChip text="ALL WEEK OUTDOORS = A TAN" at={TAN} color={SUN.rim} size={26} /></div>
          </div>
        </AbsoluteFill>

        {/* the Sun turns into something new → the beam source for the jar */}
        <div style={{ position: 'absolute', left: sunCx - 234, top: sunCy - 234, width: 468, height: 468, opacity: sunOp, transform: `scale(${sunScale})` }}>
          <svg width={468} height={468} viewBox="-234 -234 468 468" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', opacity: ease(f, TURNING - 4, TURNING + 6) * (1 - toCorner) }}>
            {Array.from({ length: 12 }, (_, i) => {
              const a = ((i * 30 + spin) * Math.PI) / 180;
              return <line key={i} x1={Math.cos(a) * 170} y1={Math.sin(a) * 170} x2={Math.cos(a) * (215 + 20 * flare)} y2={Math.sin(a) * (215 + 20 * flare)} stroke={SUN.mid} strokeWidth={6} strokeLinecap="round" />;
            })}
          </svg>
          <div style={{ position: 'absolute', left: 0, top: 0, filter: `brightness(${1 + 0.4 * flare})` }}><SunDisc size={260} id="turnSun" glow={1 + flare} /></div>
        </div>
        <div style={{ position: 'absolute', left: 1210, top: 250, opacity: qMark, transform: `scale(${ease(f, SOMETHING2, SOMETHING2 + 8, 1.4, 1)})`, fontFamily: DL_SERIF, fontSize: 150, color: DL.text }}>?</div>

        {/* Ingenhousz, 1779 */}
        <AbsoluteFill style={{ opacity: ingen }}>
          <div style={{ position: 'absolute', left: 160, top: 186, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ ...rise(f, DUTCH - 2), fontFamily: DL_MONO, fontSize: 26, letterSpacing: 5, color: DL.dim }}>A DUTCH DOCTOR</span>
            <SunChip text="JAN INGENHOUSZ · 1779" at={INGEN} color={DL.gold} size={34} />
          </div>
          <AbsoluteFill style={{ opacity: grid }}>
            <JarGrid at={RUNS} />
          </AbsoluteFill>
          <AbsoluteFill style={{ opacity: 1 - ease(f, GREEN - 14, GREEN - 4) }}>
            <div style={{ position: 'absolute', left: 1110, top: 380 + 180 * ease(f, SINKS - 12, SINKS + 4, 0, 1, DL_EASE.inOut), opacity: ease(f, FIVE, FIVE + 6), transform: `scale(${ease(f, FIVE, FIVE + 10, 1.3, 1)})`, transformOrigin: 'left center' }}>
              <div style={{ fontFamily: DL_SERIF, fontSize: 130, lineHeight: 1, color: DL.gold }}>500+</div>
              <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.dim, marginTop: 10 }}>EXPERIMENTS</div>
            </div>
          </AbsoluteFill>
          <AbsoluteFill style={{ opacity: jar }}>
            <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
              <defs>
                <linearGradient id="su17beam" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor={SUN.core} stopOpacity={0.7} />
                  <stop offset="1" stopColor={SUN.mid} stopOpacity={0.15} />
                </linearGradient>
              </defs>
              <polygon points="1165,250 1205,276 900,640 690,560" fill="url(#su17beam)" opacity={Math.min(1, 0.75 * beam * (1 - shade) * beamPulse)} />
            </svg>
            <BigJar leafY={leafY} active={mainActive} vis={mainVis} shade={shade} />
            {/* the shadow slides over the jar on "shade" */}
            <div style={{ position: 'absolute', left: 560 + 600 * (1 - ease(f, SHADE - 4, SHADE + 12, 0, 1, DL_EASE.inOut)) + 600 * ease(f, SUN3 - 4, SUN3 + 12, 0, 1, DL_EASE.inOut), top: 300, width: 420, height: 510, borderRadius: 30, background: 'linear-gradient(90deg, #050404cc, #05040488)', opacity: shade }} />
            <div style={{ position: 'absolute', left: 300, top: 430, width: 270, textAlign: 'right', opacity: ease(f, FRESH - 2, FRESH + 8) }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 4, color: DL.gold }}>FRESH AIR ↑</div>
              <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.muted, marginTop: 6 }}>(OXYGEN)</div>
            </div>
            <div style={{ position: 'absolute', left: 300, top: 560, width: 270, textAlign: 'right', fontFamily: DL_MONO, fontSize: 28, letterSpacing: 4, color: DL.dim, opacity: ease(f, STOP - 2, STOP + 6) * (1 - ease(f, SUN3 - 4, SUN3 + 6)) }}>IN SHADE:<br />NO BUBBLES</div>
            <MiniJar x={1010} kind="leaf" at={GREEN} bubbling={(t) => t >= GREEN} />
            <MiniJar x={1200} kind="stem" at={GREEN + 4} bubbling={() => false} />
            <div style={{ position: 'absolute', left: 1000, top: 744, width: 180, textAlign: 'center', fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.green, opacity: ease(f, PARTS - 2, PARTS + 6) }}>GREEN ✓</div>
            <div style={{ position: 'absolute', left: 1190, top: 744, width: 180, textAlign: 'center', fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.muted, opacity: ease(f, PARTS - 2, PARTS + 6) }}>STEM ✗</div>
          </AbsoluteFill>
        </AbsoluteFill>

        <HowWeSawIt text="1779 · TO EXPLAIN" at={EXPLAIN + 1} dockAt={CHIP_DOCK} slot={2} />
        <ArcLadder rungs={[...pastRungs(2), { year: '1779', label: 'TO EXPLAIN', at: CHIP_DOCK + 10 }]} show={ladderB} />

        <DidYouKnowThat at={DID} out={BEAUTY + 8}>
          <OnW at={PALE}>a pale face</OnW><OnW at={PRIZED}> was so prized</OnW><OnW at={FASHIONABLE2}> that fashionable women</OnW><OnW at={PAINTED}> painted theirs with</OnW> <span style={{ color: '#ff9a1f', fontStyle: 'italic', opacity: ease(f, WHITE, WHITE + 8) }}>white lead?</span>
          <CardSource at={WHITE}>V&amp;A O79601 (Brooks plaque) · Fashion, Costume, and Culture, “Parasols”</CardSource>
        </DidYouKnowThat>
      </EraExit>
      {/* outside EraExit: the exit pull-in must not drift the band past the side margin */}
      <SunCliffhanger next="1800" parts={[{ text: "But there's more", at: BUT2 }, { text: 'in that light', at: LIGHT }, { text: 'than leaves can use.', at: USE }, { text: 'Or your eyes', at: EYES }, { text: 'can detect.', at: DETECT }]} />
      <EpisodeHud year={1779} episode="02" />
    </AbsoluteFill>
  );
};
export default Su1700;
