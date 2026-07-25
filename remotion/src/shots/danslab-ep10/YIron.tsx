import React from 'react';
import { AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SANS, DL_MONO, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, StatCard } from '../../lib/ep03kit';
import { ImagePlate } from '../../lib/ep10kit';

// Ep10 — the head office. The photograph is a framed plate beside the claim,
// not a full-bleed slide: it supports the number, it isn't the scene.
export const compositionConfig = { id: 'YIron', durationInSeconds: 13, fps: 30, width: 1920, height: 1080 };

const YIron: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: DL_SANS }}>
    <SiteBg glow={DL.gold} />
    <Kicker n="10" label="THE PAYROLL // THE IRON" />

    <div style={{ position: 'absolute', top: 160, left: 120, width: 820 }}>
      <Headline at={10} size={52}>The head office is <span style={{ color: DL.gold }}>a desk.</span></Headline>
      <div style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.dim, marginTop: 26, lineHeight: 1.5 }}>
        Every decision this company makes passes through one box.
      </div>
      <div style={{ marginTop: 44, display: 'flex', gap: 20 }}>
        <StatCard label="Mac Studio" big="$5,500" sub="12 local models resident" color={DL.dim} at={70} w={330} />
        <StatCard label="Amortised" big="$153" sub="over 36 months" color={DL.gold} at={110} w={330} />
      </div>
    </div>

    <div style={{ position: 'absolute', top: 210, right: 110 }}>
      <ImagePlate src={staticFile('projects/danslab-ep10/01-head-office.png')} at={30} w={840} h={472}
                  caption="the head office · 03:00" />
    </div>
  </AbsoluteFill>
);
export default YIron;
