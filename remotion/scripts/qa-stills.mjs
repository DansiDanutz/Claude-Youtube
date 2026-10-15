// QA stills at chosen frames (bundles once):  node scripts/qa-stills.mjs WAudit:950 WHudTop:9882 [--scale=1]
// Writes out/qa/<id>-f<frame>.png. Complements render-all --still (which only renders the 60% frame).
import { bundle } from '@remotion/bundler';
import { selectComposition, renderStill } from '@remotion/renderer';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const scale = Number((args.find((a) => a.startsWith('--scale=')) || '--scale=1').split('=')[1]);
const jobs = args.filter((a) => !a.startsWith('--')).map((a) => { const [id, fr] = a.split(':'); return { id, frame: Number(fr) }; });
if (!jobs.length || jobs.some((j) => !j.id || Number.isNaN(j.frame))) {
  console.log('Usage: node scripts/qa-stills.mjs <shotId>:<frame> ... [--scale=1]');
  process.exit(1);
}
const outDir = path.join(root, 'out', 'qa');
mkdirSync(outDir, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.join(root, 'src', 'index.ts'), publicDir: path.join(root, '..', 'media') });
for (const { id, frame } of jobs) {
  const composition = await selectComposition({ serveUrl, id });
  const f = Math.min(frame, composition.durationInFrames - 1);
  const output = path.join(outDir, `${id}-f${f}.png`);
  await renderStill({ serveUrl, composition, output, frame: f, scale, overwrite: true, imageFormat: 'png' });
  console.log('  qa ->', path.relative(root, output));
}
