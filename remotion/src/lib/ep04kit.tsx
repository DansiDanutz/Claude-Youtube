import React from 'react';
import { useCurrentFrame, interpolate, staticFile, Img } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP } from './danslab';
import { rise } from './ep03kit';

// ── Ep04 "The Overseer" — Paperclip mission-control widgets.

const AGENTS = [
  { name: 'Dexter', role: 'Chief of Droplets', img: 'dexter.jpg', task: 'YouTube pipeline', color: DL.green },
  { name: 'Memo', role: 'Framework', img: 'memo.jpg', task: 'OpenForge build', color: DL.sky },
  { name: 'Nano', role: 'Nervix', img: 'nano.png', task: 'agent marketplace', color: DL.gold },
  { name: 'Sienna', role: 'Trader', img: 'sienna.jpg', task: 'paper trading', color: DL.red },
];

// A live agent row inside the control plane.
const Row: React.FC<{ a: typeof AGENTS[0]; at: number; status?: string; healthy?: boolean }> = ({ a, at, status = 'WORKING', healthy = true }) => {
  const frame = useCurrentFrame();
  const pulse = 0.4 + 0.6 * Math.abs(Math.sin((frame - at) / 12));
  const dot = healthy ? DL.green : DL.red;
  return (
    <div style={{ ...rise(frame, at, 14, 12), display: 'flex', alignItems: 'center', gap: 20, padding: '14px 18px', borderBottom: `1px solid ${DL.border}` }}>
      <Img src={staticFile(`projects/danslab-ep04/${a.img}`)} style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover', border: `1px solid ${a.color}66` }} />
      <div style={{ width: 210 }}>
        <div style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 26, color: DL.text }}>{a.name}</div>
        <div style={{ fontFamily: DL_MONO, fontSize: 18, color: DL.faint }}>{a.role}</div>
      </div>
      <div style={{ flex: 1, fontFamily: DL_MONO, fontSize: 20, color: DL.dim }}>{a.task}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: 170 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: dot, opacity: pulse, boxShadow: `0 0 10px ${dot}` }} />
        <span style={{ fontFamily: DL_MONO, fontSize: 18, color: dot }}>{status}</span>
      </div>
    </div>
  );
};

// The Paperclip mission-control panel.
export const MissionControl: React.FC<{ at?: number; rowsAt?: number; broken?: boolean }> = ({ at = 0, rowsAt = 20, broken = false }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [at, at + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const sc = interpolate(frame, [at, at + 22], [0.96, 1], { ...DCLAMP, easing: DL_EASE.out });
  const beat = Math.abs(Math.sin(frame / 20));
  return (
    <div style={{ opacity: op, transform: `scale(${sc})`, width: 1180, background: DL.panel, border: `1px solid ${broken ? DL.red : DL.border}`, borderRadius: 20, overflow: 'hidden', boxShadow: `0 40px 100px rgba(0,0,0,0.55)` }}>
      {/* titlebar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px', background: DL.panel2, borderBottom: `1px solid ${DL.border}` }}>
        <div style={{ display: 'flex', gap: 8 }}>{['#e74c3c', '#d4a017', '#22c55e'].map((c) => <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />)}</div>
        <span style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 3, color: DL.dim }}>PAPERCLIP · MISSION CONTROL</span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, fontFamily: DL_MONO, fontSize: 18, color: DL.green }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: DL.green, opacity: 0.4 + 0.6 * beat }} /> LIVE
        </span>
      </div>
      {/* rows */}
      <div style={{ padding: '8px 18px 4px' }}>
        {AGENTS.map((a, i) => <Row key={a.name} a={a} at={rowsAt + i * 16} />)}
      </div>
      {/* heartbeat footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', background: DL.panel2 }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 18, color: DL.faint }}>HEARTBEAT</span>
        <svg width={520} height={26} viewBox="0 0 520 26">
          <polyline points={Array.from({ length: 52 }, (_, i) => { const x = i * 10; const spike = i % 13 === 0; const y = spike ? 4 : 13 + Math.sin((frame + i * 8) / 6) * 2; return `${x},${y}`; }).join(' ')} fill="none" stroke={DL.green} strokeWidth={2} />
        </svg>
        <span style={{ marginLeft: 'auto', fontFamily: DL_MONO, fontSize: 18, color: DL.dim }}>4 agents · all healthy</span>
      </div>
    </div>
  );
};

// Orchestration spine — Paperclip node at center, spokes to the four agents.
export const OrchestrationSpine: React.FC<{ at?: number; hub?: string; hubColor?: string }> = ({ at = 0, hub = 'PAPERCLIP', hubColor = DL.gold }) => {
  const frame = useCurrentFrame();
  const cx = 600, cy = 320, R = 250;
  const pos = AGENTS.map((_, i) => { const ang = -Math.PI / 2 + (i / AGENTS.length) * Math.PI * 2; return { x: cx + Math.cos(ang) * R, y: cy + Math.sin(ang) * R }; });
  return (
    <svg viewBox="0 0 1200 640" width={1200} height={640} style={{ overflow: 'visible' }}>
      {pos.map((p, i) => {
        const grow = interpolate(frame, [at + i * 10, at + 24 + i * 10], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
        const ex = cx + (p.x - cx) * grow, ey = cy + (p.y - cy) * grow;
        const flow = (frame * 3 + i * 40) % 100 / 100;
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={ex} y2={ey} stroke={`${AGENTS[i].color}66`} strokeWidth={3} />
            <circle cx={cx + (p.x - cx) * flow} cy={cy + (p.y - cy) * flow} r={5} fill={AGENTS[i].color} opacity={grow} />
          </g>
        );
      })}
      {pos.map((p, i) => {
        const op = interpolate(frame, [at + 20 + i * 10, at + 36 + i * 10], [0, 1], DCLAMP);
        return (
          <g key={'n' + i} style={{ opacity: op }}>
            <circle cx={p.x} cy={p.y} r={54} fill={DL.panel} stroke={AGENTS[i].color} strokeWidth={2} />
            <image href={staticFile(`projects/danslab-ep04/${AGENTS[i].img}`)} x={p.x - 48} y={p.y - 48} width={96} height={96} clipPath="inset(0 round 50%)" preserveAspectRatio="xMidYMid slice" />
            <text x={p.x} y={p.y + 78} fill={DL.dim} fontSize={22} fontFamily={DL_MONO} textAnchor="middle">{AGENTS[i].name}</text>
          </g>
        );
      })}
      {/* hub */}
      <circle cx={cx} cy={cy} r={70} fill={DL.panel} stroke={hubColor} strokeWidth={2.5} />
      <circle cx={cx} cy={cy} r={70 + Math.abs(Math.sin(frame / 22)) * 14} fill="none" stroke={`${hubColor}44`} strokeWidth={2} />
      <text x={cx} y={cy + 8} fill={hubColor} fontSize={24} fontFamily={DL_MONO} fontWeight={700} textAnchor="middle" letterSpacing={2}>{hub}</text>
    </svg>
  );
};

// Agent profile chip — Hermes reading one agent's nature.
export const ProfileCard: React.FC<{ img: string; name: string; trait: string; color: string; at: number }> = ({ img, name, trait, color, at }) => {
  const frame = useCurrentFrame();
  const scan = interpolate(frame, [at, at + 24], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ ...rise(frame, at, 22, 16), width: 300, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 18, padding: '26px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: `${scan * 100}%`, height: 2, background: `${color}88`, boxShadow: `0 0 14px ${color}`, opacity: scan < 1 ? 1 : 0 }} />
      <Img src={staticFile(`projects/danslab-ep04/${img}`)} style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${color}`, margin: '0 auto', display: 'block' }} />
      <div style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 30, color: DL.text, marginTop: 16 }}>{name}</div>
      <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 24, color, marginTop: 8 }}>{trait}</div>
    </div>
  );
};

export { AGENTS };
