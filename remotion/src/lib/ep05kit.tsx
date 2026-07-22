import React from 'react';
import { useCurrentFrame, interpolate, spring, staticFile, Img } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP } from './danslab';
import { rise } from './ep03kit';

const seed = (n: number) => { const x = Math.sin(n * 7919.7) * 43758.5; return x - Math.floor(x); };

// ── Ep05 "The Brain" — the animated thinking brain + decision widgets. ──

// A neural network that THINKS: layered nodes, faint synapses, an activation
// wave sweeping left→right, and pulse-dots traveling the edges. color = accent.
export const NeuralBrain: React.FC<{ at?: number; w?: number; h?: number; color?: string; intense?: number }> = ({ at = 0, w = 1200, h = 560, color = DL.sky, intense = 1 }) => {
  const frame = useCurrentFrame();
  const t = frame - at;
  const appear = interpolate(t, [0, 30], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const LAYERS = [4, 7, 7, 5];
  const padX = 90, padY = 60;
  const cols = LAYERS.length;
  const nodes: { x: number; y: number; c: number; i: number }[][] = LAYERS.map((count, c) => {
    const x = padX + (c / (cols - 1)) * (w - padX * 2);
    return Array.from({ length: count }, (_, i) => ({ x, y: padY + ((i + 0.5) / count) * (h - padY * 2), c, i }));
  });
  // activation wavefront sweeps across x, looping
  const wave = ((t * 5) % (w + 300)) - 150;
  const glowOf = (x: number) => Math.max(0, 1 - Math.abs(x - wave) / 170);
  // edges (adjacent layers, all pairs)
  const edges: { a: { x: number; y: number }; b: { x: number; y: number }; k: number }[] = [];
  for (let c = 0; c < cols - 1; c++) for (const a of nodes[c]) for (const b of nodes[c + 1]) edges.push({ a, b, k: edges.length });
  // a subset of edges carry traveling pulses
  const pulses = edges.filter((_, i) => i % 3 === 0);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ overflow: 'visible', opacity: appear }}>
      <defs>
        <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={color} stopOpacity="0.16" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={w / 2} cy={h / 2} rx={w * 0.5} ry={h * 0.55} fill="url(#brainGlow)" />
      {/* synapses */}
      {edges.map((e) => (
        <line key={e.k} x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y} stroke={color} strokeWidth={0.7} opacity={0.10 + 0.12 * glowOf((e.a.x + e.b.x) / 2)} />
      ))}
      {/* traveling pulses */}
      {pulses.map((e, i) => {
        const p = ((t * (2.2 + seed(i) * 2) + seed(i * 3) * 100)) % 100 / 100;
        const x = e.a.x + (e.b.x - e.a.x) * p, y = e.a.y + (e.b.y - e.a.y) * p;
        return <circle key={'p' + i} cx={x} cy={y} r={2.2} fill={color} opacity={0.5 * intense} />;
      })}
      {/* nodes */}
      {nodes.flat().map((n, i) => {
        const g = glowOf(n.x);
        const r = 6 + g * 5 * intense;
        return (
          <g key={'n' + i}>
            {g > 0.25 && <circle cx={n.x} cy={n.y} r={r + 8} fill={color} opacity={g * 0.18 * intense} />}
            <circle cx={n.x} cy={n.y} r={r} fill={g > 0.4 ? color : DL.panel} stroke={color} strokeWidth={1.6} opacity={0.5 + g * 0.5} />
          </g>
        );
      })}
    </svg>
  );
};

// A decision being scored: factors fill, a big number counts up, gauge arc sweeps.
export const DecisionScore: React.FC<{ at: number; task: string; factors: [string, number][]; score: number }> = ({ at, task, factors, score }) => {
  const frame = useCurrentFrame();
  const val = interpolate(frame, [at + 40, at + 70], [0, score], { ...DCLAMP, easing: DL_EASE.out });
  const arc = (v: number) => { const a = -220 + (v / 100) * 260; const r = 90; return { x: 120 + r * Math.cos((a * Math.PI) / 180), y: 120 + r * Math.sin((a * Math.PI) / 180) }; };
  const end = arc(val);
  const large = val > 50 ? 1 : 0;
  return (
    <div style={{ ...rise(frame, at, 20), display: 'flex', alignItems: 'center', gap: 50, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 22, padding: '36px 50px' }}>
      <svg width={240} height={240} viewBox="0 0 240 240">
        <path d={`M ${arc(0).x} ${arc(0).y} A 90 90 0 1 1 ${arc(100).x} ${arc(100).y}`} fill="none" stroke={DL.panel2} strokeWidth={14} strokeLinecap="round" />
        <path d={`M ${arc(0).x} ${arc(0).y} A 90 90 0 ${large} 1 ${end.x} ${end.y}`} fill="none" stroke={DL.sky} strokeWidth={14} strokeLinecap="round" />
        <text x={120} y={128} fill={DL.text} fontSize={62} fontFamily={DL_MONO} fontWeight={700} textAnchor="middle">{Math.round(val)}</text>
        <text x={120} y={162} fill={DL.faint} fontSize={20} fontFamily={DL_MONO} textAnchor="middle">PRIORITY</text>
      </svg>
      <div style={{ width: 460 }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.faint, letterSpacing: 2 }}>INCOMING TASK</div>
        <div style={{ fontFamily: DL_SERIF, fontSize: 34, color: DL.text, margin: '8px 0 22px' }}>{task}</div>
        {factors.map(([label, v], i) => {
          const fw = interpolate(frame, [at + 20 + i * 12, at + 44 + i * 12], [0, v], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
              <span style={{ width: 150, fontFamily: DL_SANS, fontSize: 22, color: DL.dim }}>{label}</span>
              <div style={{ flex: 1, height: 12, background: DL.panel2, borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ width: `${fw}%`, height: '100%', background: DL.sky, opacity: 0.8 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Hermes hub routing a task chip to the matched agent along a beam.
export const RouteBeam: React.FC<{ at: number; agents: { img: string; name: string; color: string }[]; target: number; label: string }> = ({ at, agents, target, label }) => {
  const frame = useCurrentFrame();
  const cx = 600, cy = 120, R = 300;
  const pos = agents.map((_, i) => ({ x: 120 + (i / (agents.length - 1)) * 960, y: 430 }));
  const travel = interpolate(frame, [at + 20, at + 60], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const tp = pos[target];
  const chipX = cx + (tp.x - cx) * travel, chipY = cy + (tp.y - cy) * travel;
  const arrived = travel > 0.98;
  return (
    <svg viewBox="0 0 1200 560" width={1200} height={560} style={{ overflow: 'visible' }}>
      {/* hub */}
      <circle cx={cx} cy={cy} r={58} fill={DL.panel} stroke={DL.sky} strokeWidth={2.5} />
      <circle cx={cx} cy={cy} r={58 + Math.abs(Math.sin(frame / 20)) * 12} fill="none" stroke={`${DL.sky}44`} strokeWidth={2} />
      <text x={cx} y={cy + 7} fill={DL.sky} fontSize={22} fontFamily={DL_MONO} fontWeight={700} textAnchor="middle">HERMES</text>
      {/* beam to target */}
      <line x1={cx} y1={cy} x2={tp.x} y2={tp.y} stroke={`${agents[target].color}66`} strokeWidth={2} strokeDasharray="4 8" opacity={travel} />
      {/* agents */}
      {agents.map((a, i) => {
        const hot = i === target && arrived;
        return (
          <g key={a.name}>
            <circle cx={pos[i].x} cy={pos[i].y} r={hot ? 56 : 48} fill={DL.panel} stroke={a.color} strokeWidth={hot ? 3 : 1.6} opacity={i === target ? 1 : 0.5} />
            <image href={staticFile(`projects/danslab-ep05/${a.img}`)} x={pos[i].x - 44} y={pos[i].y - 44} width={88} height={88} clipPath="inset(0 round 50%)" preserveAspectRatio="xMidYMid slice" opacity={i === target ? 1 : 0.5} />
            <text x={pos[i].x} y={pos[i].y + 74} fill={i === target ? DL.text : DL.faint} fontSize={22} fontFamily={DL_MONO} textAnchor="middle">{a.name}</text>
          </g>
        );
      })}
      {/* task chip traveling */}
      <g opacity={arrived ? 0 : 1}>
        <rect x={chipX - 90} y={chipY - 22} width={180} height={44} rx={10} fill={DL.gold} />
        <text x={chipX} y={chipY + 7} fill={DL.bg} fontSize={20} fontFamily={DL_MONO} fontWeight={700} textAnchor="middle">{label}</text>
      </g>
    </svg>
  );
};

// A priority queue whose rows re-order over time (Hermes re-planning the day).
export const PriorityQueue: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const rows = [
    { t: 'User can’t log in', a: DL.red, s1: 3, s2: 0 },
    { t: 'BTC trade signal', a: DL.gold, s1: 0, s2: 2 },
    { t: 'Ship pipeline fix', a: DL.green, s1: 1, s2: 1 },
    { t: 'Refactor (blocked)', a: DL.faint, s1: 2, s2: 3 },
  ];
  const swap = interpolate(frame, [at + 60, at + 90], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const rowH = 92;
  return (
    <div style={{ position: 'relative', width: 720, height: rowH * 4 }}>
      {rows.map((r, i) => {
        const y = (r.s1 + (r.s2 - r.s1) * swap) * rowH;
        const rank = Math.round(r.s1 + (r.s2 - r.s1) * swap);
        return (
          <div key={r.t} style={{ position: 'absolute', top: y, left: 0, right: 0, height: rowH - 14, display: 'flex', alignItems: 'center', gap: 20, background: DL.panel, border: `1px solid ${rank === 0 ? r.a : DL.border}`, borderRadius: 14, padding: '0 26px', ...rise(frame, at + i * 8, 16) }}>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: r.a, width: 40 }}>{rank + 1}</span>
            <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.text }}>{r.t}</span>
            <span style={{ marginLeft: 'auto', width: 12, height: 12, borderRadius: '50%', background: r.a }} />
          </div>
        );
      })}
    </div>
  );
};

// A screenshot in a browser chrome with an animated cursor + click ripples.
export const WebShot: React.FC<{ src: string; url: string; at?: number; clicks?: { t: number; x: number; y: number }[]; path?: { t: number; x: number; y: number }[] }> = ({ src, url, at = 0, clicks = [], path = [] }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [at, at + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const sc = interpolate(frame, [at, at + 22], [0.97, 1], { ...DCLAMP, easing: DL_EASE.out });
  const W = 1360, H = 810;
  // cursor position along keyframed path (t in frames relative to `at`)
  const lt = frame - at;
  let cx = W * 0.5, cy = H * 0.5;
  if (path.length) {
    let a = path[0], b = path[path.length - 1];
    for (let i = 0; i < path.length - 1; i++) { if (lt >= path[i].t && lt <= path[i + 1].t) { a = path[i]; b = path[i + 1]; break; } if (lt > path[i + 1].t) { a = path[i + 1]; b = path[i + 1]; } }
    const span = Math.max(1, b.t - a.t); const k = Math.max(0, Math.min(1, (lt - a.t) / span));
    cx = a.x + (b.x - a.x) * k; cy = a.y + (b.y - a.y) * k;
  }
  return (
    <div style={{ opacity: op, transform: `scale(${sc})`, width: W, borderRadius: 16, overflow: 'hidden', border: `1px solid ${DL.border}`, boxShadow: '0 40px 100px rgba(0,0,0,0.6)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 46, padding: '0 18px', background: DL.panel2, borderBottom: `1px solid ${DL.border}` }}>
        <div style={{ display: 'flex', gap: 8 }}>{['#e74c3c', '#d4a017', '#22c55e'].map((c) => <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />)}</div>
        <div style={{ flex: 1, textAlign: 'center', fontFamily: DL_MONO, fontSize: 18, color: DL.dim, background: DL.panel, borderRadius: 8, padding: '6px 0', margin: '0 40px' }}>{url}</div>
      </div>
      <div style={{ position: 'relative', width: W, height: H, background: DL.bg }}>
        <Img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
        {/* click ripples */}
        {clicks.map((c, i) => {
          const d = lt - c.t;
          if (d < 0 || d > 22) return null;
          const rr = interpolate(d, [0, 22], [4, 46]);
          const ro = interpolate(d, [0, 22], [0.7, 0]);
          return <div key={i} style={{ position: 'absolute', left: c.x, top: c.y, width: rr * 2, height: rr * 2, marginLeft: -rr, marginTop: -rr, borderRadius: '50%', border: `2px solid ${DL.sky}`, opacity: ro }} />;
        })}
        {/* cursor */}
        <svg style={{ position: 'absolute', left: cx, top: cy, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))' }} width={30} height={34} viewBox="0 0 30 34">
          <path d="M2 2 L2 26 L9 19 L13 30 L18 28 L14 17 L24 17 Z" fill="#fff" stroke="#111" strokeWidth={1.4} />
        </svg>
      </div>
    </div>
  );
};
