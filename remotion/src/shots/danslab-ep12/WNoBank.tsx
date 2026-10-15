import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { Stage, Title, Chip, Note, useRise, DL, DL_MONO, DL_SANS, DCLAMP, DL_EASE } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH3 · what disappears. VO dol14: the card-payment chain loses its middle nodes one by one on the
// narrator's words, then collapses into one arrow: customer wallet → merchant wallet, in minutes.
export const compositionConfig = { id: 'WNoBank', durationInSeconds: 21.3, fps: 30, width: 1920, height: 1080 };

const NODES: [string, string | null][] = [['CUSTOMER', null], ['CARD NETWORK', 'card'], ['PROCESSOR', 'charge'], ['BANK', 'bank'], ['YOU', null]];

const WNoBank: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const COL = at('dol14', 'settles');
  const collapse = interpolate(f, [COL, COL + 22], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  return (
    <Stage label="WHY STABLECOINS">
      <div style={{ position: 'absolute', top: 150, left: 120 }}>
        <Title at={voAt('dol14')}>Look at what <span style={{ color: DL.red, fontStyle: 'italic' }}>disappears.</span></Title>
      </div>
      <div style={{ position: 'absolute', top: 330, left: 120, width: 1680, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {NODES.map(([n, cue], i) => {
          const end = i === 0 || i === NODES.length - 1;
          const gone = cue ? interpolate(f, [at('dol14', cue), at('dol14', cue) + 12], [0, 1], DCLAMP) : 0;
          const x = end ? (i === 0 ? 1 : -1) * collapse * 420 : 0;
          return (
            <React.Fragment key={n}>
              {i > 0 && <div style={{ flex: 1, height: 4, background: DL.border, margin: '0 14px', opacity: 1 - collapse }} />}
              <div style={{
                padding: '22px 26px', borderRadius: 14, background: DL.panel, transform: `translateX(${x}px)`,
                border: `2px solid ${end ? DL.gold : gone ? DL.red : DL.border}`, opacity: end ? 1 : (1 - 0.75 * gone) * (1 - collapse),
                fontFamily: DL_MONO, fontWeight: 700, fontSize: 26, color: end ? DL.gold : DL.text, textDecoration: gone > 0.5 ? 'line-through' : 'none',
              }}>{n === 'CUSTOMER' && collapse > 0.5 ? 'CUSTOMER WALLET' : n === 'YOU' && collapse > 0.5 ? 'YOUR WALLET' : n}</div>
            </React.Fragment>
          );
        })}
      </div>
      {/* the one arrow */}
      <div style={{ position: 'absolute', top: 404, left: 850, width: 290, height: 10, borderRadius: 5, background: DL.gold, opacity: collapse,
        boxShadow: `0 0 24px ${DL.gold}88` }} />
      <div style={{ position: 'absolute', top: 470, left: 0, right: 0, textAlign: 'center', fontFamily: DL_MONO, fontSize: 32, color: DL.gold, opacity: collapse }}>minutes</div>
      <div style={{ position: 'absolute', top: 580, left: 120, display: 'flex', gap: 18, flexWrap: 'wrap', width: 1680 }}>
        <Chip at={at('dol14', 'bank')} color={DL.text}>no bank in the middle</Chip>
        <Chip at={at('dol14', 'cut')} color={DL.text}>no card network cut</Chip>
        <Chip at={at('dol14', 'backs')} color={DL.text}>no chargebacks</Chip>
        <Chip at={at('dol14', 'tuesday')} color={DL.text}>no waiting till Tuesday</Chip>
        <Chip at={at('dol14', 'sunday')}>Sunday night</Chip>
        <Chip at={at('dol14', 'border')}>any border</Chip>
      </div>
      <div style={{ position: 'absolute', top: 770, left: 120, ...rise(at('dol14', 'future')), fontFamily: DL_SANS, fontSize: 36, color: DL.text }}>
        The future of money —
      </div>
      <Note at={at('dol14', 'simpler')}>not because it's new. <span style={{ color: DL.gold }}>Because it's simpler.</span></Note>
    </Stage>
  );
};
export default WNoBank;
