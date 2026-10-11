// QA stills at chosen frames — bundles once, renders many PNGs.
//   node scripts/stills-at.mjs <outDir> <ShotId>:<frame>[,<frame>...] [<ShotId>:<frames> ...]
// Complements render-all.mjs --still (which only renders the 60% frame): word-synced
// shots need a still at each cue, not one poster.
import { bundle } from '@remotion/bundler';
import { selectComposition, renderStill } from '@remotion/renderer';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [outDir, ...specs] = process.argv.slice(2);
if (!outDir || specs.length === 0) {
  console.log('Usage: node scripts/stills-at.mjs <outDir> <ShotId>:<f1,f2,...> [...]');
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.join(root, 'src', 'index.ts'), publicDir: path.join(root, '..', 'media') });
for (const spec of specs) {
  const [id, frames] = spec.split(':');
  const composition = await selectComposition({ serveUrl, id });
  for (const fr of frames.split(',').map(Number)) {
    const frame = Math.min(fr, composition.durationInFrames - 1);
    const output = path.join(outDir, `${id}-${frame}.png`);
    await renderStill({ composition, serveUrl, output, frame, scale: 0.5 });
    console.log('  ', path.basename(output));
  }
}
