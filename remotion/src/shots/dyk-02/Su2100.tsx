import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette } from '../../lib/dykkit';
import { EpisodeHud, SunChip, SunDisc, WakePlace, ArcLadder, ARC_LABELS, pastRungs, LADDER_DOCK, win, SUN } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 12/14 — ERA 7: 2100, PREDICTION. v2 re-key to the new voice (RESEARCH A2, F13, F15).
// Opens on SuReveal's ladder: it slides to centre, an empty dashed rung draws on "ladder?", then
// it docks top-right while YOU WAKE UP IN · 2100 slams on "hundred" (never before). Unrisen dawn on
// "morning"; PREDICTION tag from the slam, header docks on "But", a dotted path to the "?" rung on
// "evidence". Data centres (IEA Energy and AI 2025): phone on "video", ? on "question", AI reply on
// "AI", light lines into a rack on "centre"; world-electricity bar on "twenty", · 2024 on "four",
// 1.5 % slice on "half", ≈ 415 TWh row on "electricity", footnote on "International", ghost bar on
// "expects", grows on "double", 2030 · ≈ 945 TWh on "thirty", guide on "slightly", Japan on "Japan".
// MAPLE (F13) re-keyed; "Tiny." = magnifier inset on the array; "worked" = receiver lights.
// Scenario: tag pulses on "scenario", tint + NOT A FACT on "Not", internet / AI / cities light on
// their words, sun lines thicken on "more", `maybe` on "maybe", orbit ring on "orbit". Callback:
// the ladder returns (1500 rung glows) with the 1500 sleeper (sleeps on "sleep") and the 2100 AI chip
// (powers on, "wakes"), the dashed rung fills on "up". The Sun won't notice; NASA ≈ 5 billion (F15).
// VO su11 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Su2100', durationInSeconds: 65.0667, fps: 30, width: 1920, height: 1080 };
const DUR = 1952;

const C = makeCue(vo, 'su11-2100', 0.8);
const SO = C.at('So', 1);
const NEXT = C.at('next');
const LADDER = C.at('ladder');
const TWENTY1 = C.at('twenty', 1); // 'Twenty one hundred.'
const HUNDRED1 = C.at('hundred', 1); // the header slams here (2 = 'fifteen hundred', 3 = 'twenty one hundred, it might')
const MORNING = C.at('morning');
const HAPPENED = C.at('happened');
const BUT = C.at('But', 1); // 'But we can follow the evidence.' (2 = 'But it worked.')
const EVIDENCE = C.at('evidence');
const EVERY = C.at('Every', 1);
const VIDEO = C.at('video');
const WATCH = C.at('watch');
const QUESTION = C.at('question', 1);
const AI1 = C.at('AI', 1); // (2 = 'The internet, AI,' · 3 = 'your AI wakes')
const CENTRE = C.at('centre');
const TWENTY2 = C.at('twenty', 2); // 'In twenty twenty four'
const FOUR = C.at('four');
const ONE_HALF = C.at('one', 2); // 'one and a half' — the 1.5 % fill starts here (1 = 'Twenty one hundred')
const RUNS = C.at('runs');
const ELECTRICITY = C.at('electricity');
const INTERNATIONAL = C.at('International');
const EXPECTS = C.at('expects');
const DOUBLE = C.at('double');
const THIRTY = C.at('thirty');
const SLIGHTLY = C.at('slightly');
const JAPAN = C.at('Japan');
const MEANWHILE = C.at('Meanwhile');
const TWENTY5 = C.at('twenty', 5); // 'in twenty twenty three' — 2023 chip
const SATELLITE = C.at('satellite');
const CALTECH = C.at('Caltech');
const MAPLE = C.at('Maple');
const WIRELESS = C.at('wirelessly');
const AIMED = C.at('aimed');
const ROOFTOP = C.at('rooftop');
const TINY = C.at('Tiny');
const WORKED = C.at('worked');
const SO2 = C.at('So', 2); // 'So here's one scenario.'
const SCEN = C.at('scenario') + 6; // MAPLE + IT WORKED hold through "So here's one" (>= 1.5 s, voice audit 2026-10-12)
const SCENARIO = C.at('scenario');
const NOT = C.at('Not');
const INTERNET = C.at('internet');
const AI2 = C.at('AI', 2);
const CITIES = C.at('cities');
const MORE = C.at('more', 3); // 'more and more' (1 more than double · 2 more than all of Japan)
const SUNLIGHT = C.at('sunlight');
const MAYBE = C.at('maybe');
const ORBIT = C.at('orbit');
const NEVER = C.at('never');
const FIFTEEN = C.at('fifteen');
const DECIDED = C.at('decided');
const SLEEP = C.at('sleep');
const TWENTY7 = C.at('twenty', 7); // 'In twenty one hundred, it might decide'
const MIGHT = C.at('might');
const AI3 = C.at('AI', 3); // 'whether your AI wakes up'
const WAKES = C.at('wakes');
const UP = C.at('up');
const SUN3 = C.at('Sun', 3); // 'The Sun won't notice.' (1 never sets · 2 decided)
const NASA = C.at('NASA');
const FIVE = C.at('five');
const YEARS = C.at('years');
const QUESTION2 = C.at('question', 2);
const WHAT = C.at('what');
const LEARNED = C.at('learned');

// SuReveal's last frame: full ladder at (160, 170), dimmed to 0.6. It slides to centre, then docks.
const FULL = { left: 160, top: 170, width: 900, centreShift: 350, dim: 0.6 } as const;
const DOCK_SCALE = LADDER_DOCK.width / FULL.width;
const FILL_LINES = ['THE ENERGY BEHIND', 'WHAT WE RUN?'];
const JAPAN_BLUE = '#5aa0e0';
const TWH_PX = 1; // chart scale for the TWh rows: 1 px per TWh
const BAR_X = 160;

// ── opening: the ladder from SuReveal slides to centre, the dashed rung draws, then it docks top-right
const OpeningLadder: React.FC<{ f: number }> = ({ f }) => {
  const slide = ease(f, 2, SO + 6, 0, 1, DL_EASE.inOut);
  const dock = ease(f, TWENTY1, HUNDRED1 - 2, 0, 1, DL_EASE.inOut);
  const s = 1 - (1 - DOCK_SCALE) * dock;
  const tx = FULL.centreShift * slide * (1 - dock) + (LADDER_DOCK.left - FULL.left) * dock;
  const ty = (LADDER_DOCK.top - FULL.top) * dock;
  const show = (FULL.dim + (1 - FULL.dim) * slide) * (1 - ease(f, HUNDRED1 - 10, HUNDRED1 - 2));
  const docked = ease(f, HUNDRED1 - 10, HUNDRED1 - 2) * (1 - ease(f, MEANWHILE - 6, MEANWHILE + 4));
  return (
    <>
      <AbsoluteFill style={{ transformOrigin: `${FULL.left}px ${FULL.top}px`, transform: `translate(${tx}px, ${ty}px) scale(${s})` }}>
        <ArcLadder rungs={pastRungs(6)} show={show} mode="full" litAt={[-1, -1, -1, -1, -1, -1]} left={FULL.left} top={FULL.top} />
        {/* the empty next step: "? · ?" (the year is only written in on "hundred", in the docked ladder) */}
        <div style={{ position: 'absolute', left: FULL.left, top: FULL.top + 34, width: FULL.width, height: 82, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px', borderRadius: 14, border: `3px dashed ${DL.red}`, background: '#0e0b0ae6', opacity: show * ease(f, LADDER, LADDER + 12), transform: `translateX(${(1 - ease(f, LADDER, LADDER + 12)) * 24}px)`, boxShadow: `0 0 18px ${DL.red}44`, fontFamily: DL_MONO, fontWeight: 700, fontSize: 46, color: DL.red }}>
          <span>?</span><span style={{ fontSize: 37, fontWeight: 400 }}>·</span><span>?</span>
        </div>
        {/* "next": the current top rung (TODAY · POWER) pulses — the step above it is still empty */}
        <div style={{ position: 'absolute', left: FULL.left - 6, top: FULL.top + 34 + 94 - 6, width: FULL.width + 12, height: 94, borderRadius: 18, border: `3px solid ${DL.gold}`, boxShadow: `0 0 30px ${DL.gold}`, opacity: show * ease(f, NEXT - 2, NEXT + 4) * (1 - ease(f, LADDER, LADDER + 14)) }} />
      </AbsoluteFill>
      <ArcLadder rungs={pastRungs(6)} show={docked} next={{ at: HUNDRED1 }} />
    </>
  );
};

// ── "That morning hasn't happened yet." + the dotted path to the "?" rung on "evidence"
const PATH_DOTS = 26;
const UnrisenDawn: React.FC<{ f: number }> = ({ f }) => {
  const draw = ease(f, EVIDENCE - 2, EVIDENCE + 22);
  const p0 = [960, 770], p1 = [1360, 700], p2 = [1428, 188];
  return (
    <AbsoluteFill style={{ opacity: win(f, MORNING, WATCH, 6, 10) }}>
      <svg width={900} height={220} viewBox="0 0 900 220" style={{ position: 'absolute', left: 510, top: 590 }}>
        <circle cx={450} cy={200} r={110} fill="none" stroke={SUN.mid} strokeWidth={4} strokeDasharray="12 12" opacity={0.7} transform={`translate(0 ${ease(f, MORNING, MORNING + 20, 30, 0)})`} />
        <rect x={0} y={200} width={900} height={20} fill={DL.bg} />
        <line x1={0} y1={200} x2={900} y2={200} stroke={SUN.rim} strokeWidth={3} />
      </svg>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 812, display: 'flex', justifyContent: 'center', opacity: ease(f, HAPPENED - 2, HAPPENED + 6) }}>
        <SunChip text="THAT MORNING HASN'T HAPPENED YET" at={HAPPENED} color={DL.dim} size={28} />
      </div>
      <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
        {Array.from({ length: PATH_DOTS }, (_, i) => {
          const t = i / (PATH_DOTS - 1);
          const x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0];
          const y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1];
          return <circle key={i} cx={x} cy={y} r={5} fill={DL.red} opacity={draw * PATH_DOTS > i ? 0.85 : 0} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

// ── data centres: devices → rack
const Devices: React.FC<{ f: number }> = ({ f }) => {
  const play = interpolate(f, [WATCH, MEANWHILE], [0, 1], DCLAMP);
  const lines = ease(f, RUNS - 2, CENTRE + 2); // lines start on "runs", reach the rack on "centre"
  const rack = ease(f, CENTRE - 2, CENTRE + 8);
  return (
    <>
      <div style={{ position: 'absolute', left: 200, top: 240, width: 130, height: 230, borderRadius: 20, border: `3px solid ${DL.dim}`, background: DL.panel, opacity: ease(f, VIDEO - 6, VIDEO + 2), transform: `scale(${ease(f, VIDEO - 6, VIDEO + 6, 1.15, 1)})` }}>
        <svg width={124} height={224} viewBox="0 0 124 224">
          <rect x={10} y={40} width={104} height={110} rx={8} fill="#0b1630" />
          <path d="M50 74 L50 116 L84 95 Z" fill={SUN.mid} />
          <rect x={14} y={166} width={96} height={6} rx={3} fill={DL.border} />
          <rect x={14} y={166} width={96 * play} height={6} rx={3} fill={DL.red} />
        </svg>
      </div>
      <div style={{ position: 'absolute', left: 380, top: 250, width: 120, height: 64, borderRadius: 16, border: `2px solid ${DL.dim}`, background: DL.panel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DL_SERIF, fontSize: 40, color: DL.text, opacity: ease(f, QUESTION - 2, QUESTION + 6), transform: `translateY(${ease(f, QUESTION - 2, QUESTION + 10, 14, 0)}px)` }}>?</div>
      <div style={{ position: 'absolute', left: 380, top: 340, width: 300, height: 84, borderRadius: 16, border: `2px solid ${SUN.mid}`, background: '#1a1406f2', display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', boxSizing: 'border-box', opacity: ease(f, AI1 - 2, AI1 + 6), transform: `scale(${ease(f, AI1 - 2, AI1 + 8, 1.15, 1)})` }}>
        <AiChip size={52} on={1} />
        <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: SUN.mid }}>AI</span>
        <span style={{ display: 'flex', gap: 8 }}>{[0, 1, 2].map((i) => <span key={i} style={{ width: 10, height: 10, borderRadius: 5, background: SUN.mid, opacity: 0.35 + 0.65 * (0.5 + 0.5 * Math.sin((f - AI1) / 4 - i)) }} />)}</span>
      </div>
      <svg width={1920} height={600} style={{ position: 'absolute', left: 0, top: 0, opacity: lines }}>
        {[[330, 460, 410], [680, 382, 330]].map(([x, y, y2], i) => (
          <line key={i} x1={x} y1={y} x2={x + (1120 - x) * lines} y2={y + (y2 - y) * lines} stroke={SUN.mid} strokeWidth={4} strokeDasharray="14 10" strokeDashoffset={-f * 2} />
        ))}
      </svg>
      <div style={{ position: 'absolute', left: 1120, top: 230, width: 180, opacity: rack, transform: `scale(${ease(f, CENTRE - 2, CENTRE + 10, 1.1, 1)})` }}>
        <svg width={180} height={200} viewBox="0 0 180 200">
          <rect x={2} y={2} width={176} height={196} rx={10} fill={DL.panel} stroke={DL.dim} strokeWidth={3} />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x={16} y={16 + i * 36} width={148} height={26} rx={4} fill="#141c2e" stroke={DL.border} strokeWidth={2} />
              <circle cx={146} cy={29 + i * 36} r={5} fill={(Math.floor(f / 6) + i * 3) % 4 === 0 ? DL.green : SUN.mid} />
            </g>
          ))}
        </svg>
        <div style={{ marginTop: 14, textAlign: 'center', fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.dim }}>DATA CENTRE</div>
      </div>
    </>
  );
};

// a small AI chip: square, pins, "AI"; `on` 0..1 lights it gold
const AiChip: React.FC<{ size: number; on: number }> = ({ size, on }) => {
  const col = on > 0.5 ? SUN.mid : DL.faint;
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ overflow: 'visible', filter: on > 0.05 ? `drop-shadow(0 0 ${14 * on}px ${SUN.mid})` : undefined }}>
      {[14, 24, 34, 44].map((p) => (
        <g key={p} stroke={col} strokeWidth={3}>
          <line x1={p + 1} y1={2} x2={p + 1} y2={10} /><line x1={p + 1} y1={50} x2={p + 1} y2={58} />
          <line x1={2} y1={p + 1} x2={10} y2={p + 1} /><line x1={50} y1={p + 1} x2={58} y2={p + 1} />
        </g>
      ))}
      <rect x={10} y={10} width={40} height={40} rx={6} fill={on > 0.5 ? '#1a1406' : DL.panel} stroke={col} strokeWidth={3} />
      <text x={30} y={37} textAnchor="middle" fontFamily={DL_MONO} fontWeight={700} fontSize={18} fill={col}>AI</text>
    </svg>
  );
};

// ── the IEA chart: world electricity (1.5 % slice), then TWh rows 2024 → 2030 → Japan
const BarRow: React.FC<{ top: number; width: number; grow: number; color: string; dashed?: boolean; label: React.ReactNode; labelAt: number; labelLeft?: number; f: number }> = ({ top, width, grow, color, dashed = false, label, labelAt, labelLeft, f }) => (
  <>
    <div style={{ position: 'absolute', left: BAR_X, top, height: 36, width: width * grow, borderRadius: 6, background: dashed ? `${color}33` : color, border: dashed ? `3px dashed ${color}` : undefined, boxSizing: 'border-box' }} />
    <div style={{ position: 'absolute', left: labelLeft ?? BAR_X + width + 20, top: top + 2, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 2, color: DL.text, whiteSpace: 'nowrap', opacity: ease(f, labelAt - 2, labelAt + 6) }}>{label}</div>
  </>
);

const IeaChart: React.FC<{ f: number }> = ({ f }) => {
  const world = ease(f, TWENTY2 - 2, TWENTY2 + 12);
  const slice = ease(f, ONE_HALF - 4, ONE_HALF + 4);
  const zoom = ease(f, ELECTRICITY - 2, ELECTRICITY + 10);
  const ghost = ease(f, EXPECTS - 2, EXPECTS + 8);
  const grow = interpolate(f, [DOUBLE - 2, THIRTY], [415, 945], { ...DCLAMP, easing: DL_EASE.inOut });
  const japan = ease(f, JAPAN - 2, JAPAN + 12);
  const guide = ease(f, SLIGHTLY - 2, SLIGHTLY + 10);
  return (
    <>
      <div style={{ position: 'absolute', left: BAR_X, top: 502, fontFamily: DL_MONO, fontSize: 30, letterSpacing: 3, color: DL.dim, opacity: world }}>WORLD ELECTRICITY<span style={{ color: DL.text, opacity: ease(f, FOUR - 2, FOUR + 6) }}> · 2024</span></div>
      <div style={{ position: 'absolute', left: BAR_X, top: 548, height: 36, width: 1400 * world, borderRadius: 6, background: DL.panel2, border: `2px solid ${DL.border}`, boxSizing: 'border-box' }} />
      <div style={{ position: 'absolute', left: BAR_X, top: 548, height: 36, width: 21, borderRadius: 4, background: SUN.mid, opacity: slice, boxShadow: `0 0 ${18 * slice}px ${SUN.mid}` }} />
      <div style={{ ...rise(f, ONE_HALF - 4, 10), position: 'absolute', left: BAR_X + 36, top: 594, fontFamily: DL_MONO, fontWeight: 700, fontSize: 28, letterSpacing: 2, color: SUN.mid }}>1.5 % · DATA CENTRES</div>
      {/* zoom wedge: the 1.5 % slice opened up into its own TWh row */}
      <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0, opacity: 0.35 * zoom }}>
        <polygon points={`${BAR_X},584 ${BAR_X + 21},584 ${BAR_X + 21 + (415 * TWH_PX - 21) * zoom},652 ${BAR_X},652`} fill={SUN.mid} />
      </svg>
      <div style={{ opacity: zoom }}>
        <BarRow f={f} top={652} width={415 * TWH_PX} grow={zoom} color={SUN.mid} label="2024 · ≈ 415 TWh" labelAt={ELECTRICITY} />
      </div>
      <div style={{ opacity: ghost }}>
        <BarRow f={f} top={712} width={grow * TWH_PX} grow={1} color={SUN.rim} dashed label="2030 · ≈ 945 TWh · IEA projection" labelAt={THIRTY} labelLeft={BAR_X + 945 * TWH_PX + 20} />
      </div>
      <div style={{ position: 'absolute', left: BAR_X + 945 * TWH_PX - 1, top: 700, width: 0, height: 112 * guide, borderLeft: `2px dashed ${DL.dim}` }} />
      <div style={{ opacity: japan }}>
        <BarRow f={f} top={772} width={905 * TWH_PX} grow={japan} color={JAPAN_BLUE} label="JAPAN · ALL OF IT, TODAY" labelAt={JAPAN} labelLeft={BAR_X + 945 * TWH_PX + 20} />
      </div>
      <div style={{ ...rise(f, INTERNATIONAL - 2, 10), position: 'absolute', left: BAR_X, top: 836, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 2, color: DL.dim }}>IEA · Energy and AI (2025) · projection</div>
    </>
  );
};

// ── MAPLE (F13), v1 scene re-keyed; "Tiny." = a magnifier inset on the array
const Satellite: React.FC<{ f: number; beam: number }> = ({ f, beam }) => (
  <>
    <rect x={-130} y={-24} width={90} height={48} fill="#0f2a4a" stroke={JAPAN_BLUE} strokeWidth={3} />
    <rect x={40} y={-24} width={90} height={48} fill="#0f2a4a" stroke={JAPAN_BLUE} strokeWidth={3} />
    <rect x={-36} y={-30} width={72} height={60} rx={6} fill="#cfd8dc" />
    <line x1={-40} y1={-40} x2={-130} y2={-60} stroke={SUN.mid} strokeWidth={6} strokeDasharray="10 8" strokeDashoffset={-f} opacity={beam} />
    <circle cx={-130} cy={-60} r={10} fill="#ffd23f" opacity={beam} style={{ filter: 'drop-shadow(0 0 10px #ffd23f)' }} />
  </>
);

const MapleScene: React.FC<{ f: number }> = ({ f }) => {
  const beam = ease(f, WIRELESS - 2, WIRELESS + 12);
  const down = ease(f, AIMED - 2, ROOFTOP + 2);
  const roof = ease(f, ROOFTOP - 4, ROOFTOP + 4);
  const lit = ease(f, WORKED - 2, WORKED + 8);
  const inset = ease(f, TINY - 4, TINY + 8);
  return (
    <AbsoluteFill style={{ opacity: win(f, MEANWHILE, SCEN, 6, 10) }}>
      <svg width={1000} height={640} viewBox="0 0 1000 640" style={{ position: 'absolute', left: 160, top: 240, overflow: 'visible' }}>
        <defs><clipPath id="mapleInset"><circle cx={720} cy={150} r={104} /></clipPath></defs>
        <path d="M0 640 Q500 470 1000 640 Z" fill="#1f5fa8" />
        <rect x={560} y={566} width={110} height={34} fill="#cfd8dc" opacity={roof} />
        <rect x={590} y={548} width={50} height={18} fill={lit > 0.5 ? DL.green : JAPAN_BLUE} opacity={roof} style={{ filter: lit > 0.05 ? `drop-shadow(0 0 ${16 * lit}px ${DL.green})` : undefined }} />
        <line x1={215} y1={96} x2={618} y2={140} stroke={DL.dim} strokeWidth={2} strokeDasharray="4 6" opacity={inset} />
        <g transform={`translate(300 120) scale(${ease(f, SATELLITE - 2, SATELLITE + 12, 0.7, 1)})`} opacity={ease(f, SATELLITE - 2, SATELLITE + 8)}><Satellite f={f} beam={beam} /></g>
        <path d={`M300 160 L${300 + (615 - 300) * down} ${160 + (548 - 160) * down}`} stroke="#ff3db4" strokeWidth={5} strokeDasharray="12 10" strokeDashoffset={-f * 1.5} opacity={ease(f, AIMED - 2, AIMED + 6)} />
        <g opacity={inset}>
          <circle cx={720} cy={150} r={104} fill="#0b1630" />
          <g clipPath="url(#mapleInset)"><g transform={`translate(720 150) scale(${1 + 0.6 * inset}) translate(85 30)`}><Satellite f={f} beam={beam} /></g></g>
          <circle cx={720} cy={150} r={104} fill="none" stroke={DL.dim} strokeWidth={3} />
        </g>
      </svg>
      <div style={{ position: 'absolute', left: 1200, top: 260, width: 560, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', gap: 14 }}>
          <SunChip text="2023" at={TWENTY5} color={DL.dim} size={26} />
          <SunChip text="CALTECH" at={CALTECH - 4} color={DL.dim} size={26} />
        </div>
        <div style={{ ...rise(f, MAPLE - 2), fontFamily: DL_SERIF, fontSize: 64, color: DL.text }}>MAPLE</div>
        <SunChip text="POWER BEAMED · IN SPACE" at={WIRELESS} color={SUN.mid} size={26} />
        <SunChip text="SIGNAL · PASADENA ROOFTOP" at={ROOFTOP - 4} color="#ff3db4" size={26} />
        <div style={{ display: 'flex', gap: 16 }}>
          <SunChip text="TINY" at={TINY - 4} color={DL.dim} size={26} />
          <SunChip text="IT WORKED" at={WORKED} color={DL.green} size={26} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── the scenario: sunlight → internet / AI / cities; some of it maybe collected in orbit
const ICON_ROWS = [{ label: 'INTERNET', at: INTERNET, y: 380 }, { label: 'AI', at: AI2, y: 560 }, { label: 'CITIES', at: CITIES, y: 740 }];
const ScenarioIcon: React.FC<{ kind: number; on: number }> = ({ kind, on }) => {
  const col = on > 0.5 ? SUN.mid : DL.faint;
  if (kind === 1) return <AiChip size={96} on={on} />;
  return (
    <svg width={110} height={110} viewBox="0 0 110 110" style={{ filter: on > 0.05 ? `drop-shadow(0 0 ${14 * on}px ${SUN.mid})` : undefined }}>
      {kind === 0 ? (
        <g fill="none" stroke={col} strokeWidth={4}>
          <circle cx={55} cy={55} r={42} /><ellipse cx={55} cy={55} rx={18} ry={42} /><line x1={13} y1={55} x2={97} y2={55} />
          <path d="M20 34 Q55 44 90 34 M20 76 Q55 66 90 76" />
        </g>
      ) : (
        <g fill={on > 0.5 ? '#1a1406' : DL.panel} stroke={col} strokeWidth={3}>
          <rect x={8} y={50} width={24} height={52} /><rect x={36} y={22} width={28} height={80} /><rect x={68} y={40} width={34} height={62} />
        </g>
      )}
    </svg>
  );
};

const ScenarioScene: React.FC<{ f: number }> = ({ f }) => {
  const thick = ease(f, MORE - 2, MORE + 16);
  const tint = ease(f, NOT - 2, NOT + 10);
  const ring = ease(f, ORBIT - 4, ORBIT + 16, 0, 1, DL_EASE.inOut);
  const a = f / 40;
  return (
    <AbsoluteFill style={{ opacity: win(f, SCEN, FIFTEEN, 6, 10) }}>
      <AbsoluteFill style={{ background: '#e74c3c', opacity: 0.07 * tint }} />
      <div style={{ position: 'absolute', left: 160, top: 222, right: 160, bottom: 190, border: `2px dashed ${DL.red}`, borderRadius: 18, opacity: 0.5 * tint }} />
      <div style={{ position: 'absolute', left: 190, top: 250, display: 'flex', fontFamily: DL_MONO, fontSize: 30, letterSpacing: 4, color: DL.red }}>
        <span style={rise(f, SCENARIO - 2, 12)}>ONE SCENARIO</span>
        <span style={rise(f, NOT - 2, 12)}>&nbsp;· NOT A FACT</span>
      </div>
      <div style={{ position: 'absolute', left: 360 - 153, top: 560 - 153, opacity: ease(f, SCEN - 2, SCEN + 8), transform: `scale(${1 + 0.16 * ease(f, SUNLIGHT - 2, SUNLIGHT + 8) * (1 - 0.5 * ease(f, SUNLIGHT + 14, SUNLIGHT + 40))})` }}><SunDisc size={170} glow={1 + ease(f, SUNLIGHT - 2, SUNLIGHT + 8)} id="scenSun" /></div>
      <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0, opacity: ease(f, SCEN, SCEN + 10) }}>
        {ICON_ROWS.map(({ y, at }, i) => <line key={i} x1={450} y1={560} x2={930} y2={y} stroke={SUN.mid} strokeWidth={2 + 8 * thick} strokeDasharray={thick > 0.5 ? undefined : '8 10'} opacity={(0.45 + 0.45 * thick) * ease(f, at - 2, at + 8)} />)}
      </svg>
      {ICON_ROWS.map(({ label, at, y }, i) => {
        const on = ease(f, at - 2, at + 6);
        return (
          <div key={label} style={{ position: 'absolute', left: 940, top: y - 55, display: 'flex', alignItems: 'center', gap: 26, opacity: on }}>
            <div style={{ width: 110, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ScenarioIcon kind={i} on={on} /></div>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: on > 0.5 ? DL.text : DL.faint }}>{label}</span>
          </div>
        );
      })}
      <div style={{ ...rise(f, MAYBE - 2, 12), position: 'absolute', left: 1460, top: 420, width: 200, textAlign: 'center', fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.dim }}>maybe</div>
      <svg width={420} height={220} viewBox="-210 -110 420 220" style={{ position: 'absolute', left: 1350, top: 450, opacity: ring }}>
        <ellipse rx={170 * ring} ry={64 * ring} fill="none" stroke={SUN.mid} strokeWidth={3} strokeDasharray="6 8" />
        <circle r={34} fill="#1f5fa8" />
        <g transform={`translate(${Math.cos(a) * 170 * ring} ${Math.sin(a) * 64 * ring})`}>
          <rect x={-26} y={-9} width={52} height={18} fill="#0f2a4a" stroke={JAPAN_BLUE} strokeWidth={2} style={{ filter: `drop-shadow(0 0 8px ${SUN.mid})` }} />
        </g>
      </svg>
      <div style={{ position: 'absolute', left: 1160, top: 790 }}><SunChip text="WHERE THE SUN NEVER SETS" at={NEVER} color={DL.dim} size={26} /></div>
    </AbsoluteFill>
  );
};

// ── the callback ladder (local layout so the long 2100 label fits): rungs bottom → top, same styling as ArcLadder
const FL = { left: 160, top: 230, width: 700, rungH: 54, gap: 8, topH: 100, font: 28 } as const;
const FinalLadder: React.FC<{ f: number }> = ({ f }) => {
  const show = ease(f, FIFTEEN - 4, FIFTEEN + 8);
  const hot0 = ease(f, FIFTEEN, FIFTEEN + 8) * (1 - ease(f, TWENTY7 - 4, TWENTY7 + 6));
  const filled = f >= UP;
  const stamp = ease(f, UP, UP + 8, 1.12, 1);
  const pulse = ease(f, TWENTY7, TWENTY7 + 6) * (1 - ease(f, TWENTY7 + 10, TWENTY7 + 24));
  const rungTop = (i: number) => FL.top + 36 + FL.topH + FL.gap + (5 - i) * (FL.rungH + FL.gap);
  return (
    <div style={{ opacity: show }}>
      <div style={{ position: 'absolute', left: FL.left, top: FL.top, fontFamily: DL_MONO, fontSize: 24, letterSpacing: 6, color: DL.dim }}>HOW WE SAW IT</div>
      {ARC_LABELS.slice(0, 6).map(([year, label], i) => {
        const hot = i === 0 ? hot0 : 0;
        return (
          <div key={year} style={{ position: 'absolute', left: FL.left, top: rungTop(i), width: FL.width, height: FL.rungH, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px', borderRadius: 10, border: `2px solid ${DL.gold}`, background: '#1a1406f2', boxShadow: `0 0 ${18 + 30 * hot}px ${DL.gold}${hot > 0.05 ? '88' : '33'}` }}>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: FL.font, color: DL.gold }}>{year}</span>
            <span style={{ fontFamily: DL_MONO, fontSize: FL.font * 0.8, color: DL.gold }}>·</span>
            <span style={{ fontFamily: DL_MONO, fontSize: FL.font, letterSpacing: 2, color: DL.text }}>{label}</span>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: FL.left, top: FL.top + 36, width: FL.width, height: FL.topH, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', borderRadius: 10, border: `3px dashed ${DL.red}`, background: filled ? '#1a0a08f2' : '#0e0b0ae6', boxShadow: `0 0 ${18 + 30 * pulse}px ${DL.red}${filled || pulse > 0.05 ? '77' : '33'}`, transform: `scale(${filled ? stamp : 1})`, transformOrigin: 'left center' }}>
        <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 32, color: DL.red }}>2100</span>
        <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.red }}>·</span>
        {!filled && <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 40, color: DL.red }}>?</span>}
        {filled && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', fontFamily: DL_MONO, fontSize: FL.font, lineHeight: 1.2, letterSpacing: 2, color: DL.text }}>
              {FILL_LINES.map((l) => <span key={l} style={{ whiteSpace: 'nowrap' }}>{l}</span>)}
            </div>
            <div style={{ flex: 1 }} />
            <span style={{ padding: '6px 10px', border: `2px dashed ${DL.red}`, borderRadius: 8, fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.red, whiteSpace: 'nowrap' }}>PREDICTION</span>
          </>
        )}
      </div>
    </div>
  );
};

// a 1500 sleeper (same drawing as SuHook): stands, lies down on "sleep"
const Sleeper: React.FC<{ down: number }> = ({ down }) => (
  <svg width={160} height={160} viewBox="0 0 160 160" style={{ overflow: 'visible' }}>
    <g transform={`translate(80 150) rotate(${-90 * down}) translate(-80 -150)`}>
      <circle cx={80} cy={34} r={18} fill={DL.warm} />
      <path d="M58 150 C58 92 66 60 80 60 C94 60 102 92 102 150 Z" fill={DL.warm} />
    </g>
  </svg>
);

const PANEL = { top: 260, width: 420, height: 400 } as const;
const CallbackPanels: React.FC<{ f: number }> = ({ f }) => {
  const out = 1 - ease(f, SUN3 - 6, SUN3 + 4);
  const sunY = interpolate(f, [DECIDED - 2, SLEEP + 16], [70, 300], { ...DCLAMP, easing: DL_EASE.inOut });
  const down = ease(f, SLEEP, SLEEP + 16, 0, 1, DL_EASE.inOut);
  const on = ease(f, WAKES - 2, WAKES + 8);
  const panel = (left: number, at: number, border: string): React.CSSProperties => ({ position: 'absolute', left, top: PANEL.top, width: PANEL.width, height: PANEL.height, borderRadius: 20, background: DL.panel, border: `2px solid ${border}`, overflow: 'hidden', opacity: ease(f, at - 2, at + 8) * out, transform: `translateY(${ease(f, at - 2, at + 12, 24, 0)}px)` });
  return (
    <>
      <div style={panel(880, FIFTEEN, SUN.rim)}>
        <div style={{ position: 'absolute', left: 30, top: 22, fontFamily: DL_SERIF, fontSize: 54, color: DL.gold }}>1500</div>
        <div style={{ position: 'absolute', left: 230, top: sunY }}><SunDisc size={70} id="cbSun" /></div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 300, height: 3, background: `linear-gradient(90deg, transparent, ${SUN.rim}, transparent)` }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 303, bottom: 0, background: DL.panel }} />
        <div style={{ position: 'absolute', left: 60, top: 142 }}><Sleeper down={down} /></div>
        <div style={{ ...rise(f, SLEEP - 2, 12), position: 'absolute', left: 30, bottom: 30, fontFamily: DL_MONO, fontSize: 28, letterSpacing: 4, color: DL.dim }}>SLEEP</div>
      </div>
      <div style={panel(1340, TWENTY7, on > 0.5 ? SUN.mid : DL.border)}>
        <div style={{ position: 'absolute', left: 30, top: 22, fontFamily: DL_SERIF, fontSize: 54, color: DL.red }}>2100</div>
        {/* "might": only a question mark in the empty slot; the chip itself appears on "AI" */}
        <div style={{ position: 'absolute', left: 150, top: 120, width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DL_SERIF, fontSize: 90, color: DL.dim, opacity: ease(f, MIGHT - 2, MIGHT + 6) * (1 - ease(f, AI3 - 4, AI3 + 2)) }}>?</div>
        <div style={{ position: 'absolute', left: 150, top: 120, opacity: ease(f, AI3 - 2, AI3 + 6), transform: `scale(${ease(f, WAKES - 2, WAKES + 8, 1, 1.08)})` }}><AiChip size={120} on={on} /></div>
        <div style={{ ...rise(f, WAKES - 2, 12), position: 'absolute', left: 30, bottom: 30, fontFamily: DL_MONO, fontSize: 28, letterSpacing: 4, color: SUN.mid }}>YOUR AI · WAKES UP</div>
      </div>
    </>
  );
};

// ── the Sun won't notice (F15), right of the ladder
const FinalSun: React.FC<{ f: number }> = ({ f }) => {
  const billion = interpolate(f, [FIVE - 2, FIVE + 14], [0, 5], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ position: 'absolute', left: 880, top: 220, width: 880, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', opacity: ease(f, SUN3 - 4, SUN3 + 8) }}>
      <SunDisc size={150} id="s2100" />
      <div style={{ marginTop: -16, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 50, color: DL.text, opacity: 1 - 0.4 * ease(f, FIVE, FIVE + 10) }}>The Sun won&apos;t notice.</div>
      <div style={{ ...rise(f, NASA - 2, 12), marginTop: 10, fontFamily: DL_SERIF, fontSize: 84, lineHeight: 1.05, color: SUN.mid }}><span style={{ opacity: ease(f, FIVE - 4, FIVE + 4) }}>≈ {billion.toFixed(0)} billion years</span></div>
      <div style={{ ...rise(f, NASA - 2, 12), fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.dim }}>NASA ESTIMATE<span style={{ opacity: ease(f, YEARS - 2, YEARS + 6) }}> · YEARS LEFT, OR SO</span></div>
      {/* one centred line per phrase, so the paragraph is centred from its first word */}
      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: DL_SERIF, fontSize: 50, lineHeight: 1.2, color: DL.dim }}>
        <span style={{ opacity: ease(f, QUESTION2 - 2, QUESTION2 + 6) }}>The question is</span>
        <span style={{ color: DL.text, opacity: ease(f, WHAT - 2, WHAT + 6) }}>what we&apos;ll have</span>
        <span style={{ fontStyle: 'italic', color: SUN.mid, opacity: ease(f, LEARNED - 2, LEARNED + 8) }}>learned to do with it.</span>
      </div>
    </div>
  );
};

const Su2100: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const tagPulse = ease(f, SCENARIO, SCENARIO + 5) * (1 - ease(f, SCENARIO + 8, SCENARIO + 22));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0a1626" />
      <Vignette />
      <OpeningLadder f={f} />
      {/* YOU WAKE UP IN · 2100 slams on "hundred" (the Sequence starts the kit header there), docks on "But" */}
      <Sequence from={HUNDRED1} layout="none">
        <EraHeader year="2100" idx={7} label="PREDICTION" dockAt={BUT - HUNDRED1} />
        <WakePlace place="" at={0} dockAt={BUT - HUNDRED1} />
      </Sequence>
      <div style={{ ...rise(f, HUNDRED1 + 4), position: 'absolute', left: 160, top: 166, display: 'flex', alignItems: 'center', gap: 16, fontFamily: DL_MONO, fontSize: 30, letterSpacing: 4, color: DL.red, transformOrigin: 'left center', scale: `${1 + 0.12 * tagPulse}` }}>
        <div style={{ width: 14, height: 14, borderRadius: 3, border: `2px dashed ${DL.red}` }} />
        PREDICTION · A SCENARIO, NOT A FACT
      </div>
      <UnrisenDawn f={f} />
      <AbsoluteFill style={{ opacity: win(f, VIDEO - 6, MEANWHILE, 2, 10) }}>
        <Devices f={f} />
        <IeaChart f={f} />
      </AbsoluteFill>
      <MapleScene f={f} />
      <ScenarioScene f={f} />
      <FinalLadder f={f} />
      <CallbackPanels f={f} />
      <FinalSun f={f} />
      {/* the year is never shown before Brian says it ("hundred") */}
      <EpisodeHud year={f >= HUNDRED1 ? 2100 : "—"} episode="02" prediction={f >= HUNDRED1} />
    </AbsoluteFill>
  );
};
export default Su2100;
