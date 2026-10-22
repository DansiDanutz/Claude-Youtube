// DYK No. 06 render/stills runner — one Remotion bundle per run, and that bundle (only that one) is removed afterwards.
// The disk is tight and Remotion's bundle() copies media/ into $TMPDIR on every call; render-all.mjs and stills-at.mjs
// leave those directories behind. This runner records each bundle path in work/audit/bundles.log and deletes exactly
// the directory its own bundle() call returned — never anything matched by name (another session may be rendering).
//   node videos/dyk-06-medicine/work/remotion_run.mjs stills <outDir> <Shot>:<f1,f2,...> [...]   (scale 0.5, PNG)
//   node videos/dyk-06-medicine/work/remotion_run.mjs render <Shot> [<Shot> ...]                (scale 1, h264 crf 18 → remotion/out)
//   node videos/dyk-06-medicine/work/remotion_run.mjs thumb <Shot> <out.png>                    (frame 0 at scale 0.5)
import { createRequire } from 'module';
import { execFileSync } from 'child_process';
import { appendFileSync, mkdirSync, rmSync, existsSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '..', '..', '..');
const rroot = path.join(repo, 'remotion');
const req = createRequire(path.join(rroot, 'package.json'));
const { bundle } = await import(pathToFileURL(req.resolve('@remotion/bundler')).href);
const { selectComposition, renderStill, renderMedia } = await import(pathToFileURL(req.resolve('@remotion/renderer')).href);

const [mode, ...args] = process.argv.slice(2);
if (!['stills', 'render', 'thumb'].includes(mode)) {
  console.log('usage: remotion_run.mjs stills <outDir> <Shot>:<frames> ... | render <Shot> ... | thumb <Shot> <out.png>');
  process.exit(1);
}
execFileSync(process.execPath, [path.join(rroot, 'scripts', 'gen-registry.mjs')], { stdio: 'inherit' });
const log = path.join(here, 'audit', 'bundles.log');
mkdirSync(path.dirname(log), { recursive: true });
const serveUrl = await bundle({ entryPoint: path.join(rroot, 'src', 'index.ts'), publicDir: path.join(repo, 'media') });
appendFileSync(log, `${new Date().toISOString()} ${mode} bundle ${serveUrl}\n`);
console.log('bundle:', serveUrl);
let failed = null;
try {
  if (mode === 'stills') {
    const [outDir, ...specs] = args;
    mkdirSync(outDir, { recursive: true });
    for (const spec of specs) {
      const [id, frames] = spec.split(':');
      const composition = await selectComposition({ serveUrl, id });
      for (const fr of frames.split(',').map(Number)) {
        const frame = Math.max(0, Math.min(fr, composition.durationInFrames - 1));
        await renderStill({ composition, serveUrl, output: path.join(outDir, `${id}-${String(frame).padStart(5, '0')}.png`), frame, scale: 0.5 });
      }
      console.log('  stills', id, frames);
    }
  } else if (mode === 'thumb') {
    const [id, out] = args;
    const composition = await selectComposition({ serveUrl, id });
    await renderStill({ composition, serveUrl, output: out, frame: 0, scale: 0.5 });
    console.log('  thumb ->', out);
  } else {
    const outDir = path.join(rroot, 'out');
    mkdirSync(outDir, { recursive: true });
    for (const id of args) {
      const composition = await selectComposition({ serveUrl, id });
      const out = path.join(outDir, `${id}.mp4`);
      await renderMedia({ serveUrl, composition, outputLocation: out, scale: 1, overwrite: true, codec: 'h264', pixelFormat: 'yuv420p', imageFormat: 'jpeg', crf: 18,
        onProgress: ({ progress }) => process.stdout.write(`\r  ${id}: ${Math.round(progress * 100)}%   `) });
      process.stdout.write('\n');
      console.log('  ->', out);
    }
  }
} catch (e) {
  failed = e;
} finally {
  const dir = serveUrl.startsWith('file:') ? fileURLToPath(serveUrl) : serveUrl;
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
  appendFileSync(log, `${new Date().toISOString()} removed ${dir}\n`);
}
if (failed) { console.error(failed); process.exit(1); }
