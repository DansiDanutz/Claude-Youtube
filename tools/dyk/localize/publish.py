#!/usr/bin/env python3
"""Publish an episode's localizations into the Dexty.live checkout: subtitles in git, voice-over audio in the Blob store.

  python3 tools/dyk/localize/publish.py 05 [--site ~/Projects/Did-You-Know-That] [--no-audio] [--dry-run]

For every language that has loc/vtt/<lang>.vtt:
  - copies it to <site>/website/assets/captions/<slug>/<lang>.vtt                       (committed)
  - if loc/<lang>/dub.m4a exists: uploads it to the public Blob store as dub/v1/<slug>/<lang>.m4a   (not committed)
and rewrites the episode's `localizations` in <site>/website/data/episodes.json (only that field changes).

The Blob token is read with `vercel env pull` into a temporary file OUTSIDE the repo (the repo's documented way), kept in memory,
and the file is deleted straight away. The token is never printed. Audio is versioned in the path (dub/v1/...): re-voiced audio
needs a new version, because the files are cached for a year.
"""
import json, os, re, shutil, subprocess, sys, tempfile, urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from episodes import LANGUAGES, episode, loc_dir  # noqa: E402

BLOB_API = 'https://vercel.com/api/blob/'
VERSION = 'v1'
CACHE_SECONDS = 31536000


def pull_token(site):
    fd, path = tempfile.mkstemp(prefix='dexty-env-', suffix='.env')
    os.close(fd)
    try:
        subprocess.run(['vercel', 'env', 'pull', path, '--environment', 'development', '--yes'], cwd=os.path.join(site, 'website'),
                       check=True, capture_output=True, text=True)
        for line in open(path, encoding='utf-8'):
            if line.startswith('BLOB_READ_WRITE_TOKEN='):
                return line.split('=', 1)[1].strip().strip('"').strip("'")
    finally:
        os.remove(path)
    raise SystemExit('BLOB_READ_WRITE_TOKEN not found in the development environment of the linked Vercel project')


def put_blob(token, pathname, body, content_type='audio/mp4'):
    """Upload under a stable name (overwrite allowed); returns the public URL the store reports."""
    req = urllib.request.Request(f'{BLOB_API}?pathname={urllib.parse.quote(pathname, safe="")}', data=body, method='PUT', headers={
        'authorization': f'Bearer {token}', 'x-api-version': '11', 'x-vercel-blob-access': 'public', 'x-add-random-suffix': '0',
        'x-allow-overwrite': '1', 'x-cache-control-max-age': str(CACHE_SECONDS), 'x-content-type': content_type,
        'x-content-length': str(len(body)),
    })
    with urllib.request.urlopen(req, timeout=300) as r:
        return json.load(r)['url']


def remote_size(url):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, method='HEAD'), timeout=60) as r:
            return int(r.headers.get('content-length', -1))
    except Exception:
        return None


def main(argv):
    import argparse
    import urllib.parse  # noqa: F401  (used by put_blob)
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('episode')
    ap.add_argument('--site', default='~/Projects/Did-You-Know-That')
    ap.add_argument('--no-audio', action='store_true')
    ap.add_argument('--dry-run', action='store_true')
    opts = ap.parse_args(argv)
    site = os.path.expanduser(opts.site)
    args = [opts.episode]
    ep = episode(args[0])
    dry, no_audio = opts.dry_run, opts.no_audio
    langs = [l for l in LANGUAGES if os.path.exists(os.path.join(loc_dir(ep), 'vtt', f'{l}.vtt'))]
    audio = [l for l in langs if os.path.exists(os.path.join(loc_dir(ep), l, 'dub.m4a'))] if not no_audio else []
    print(f"No. {ep['num']} {ep['slug']}: subtitles {langs}, voice-over {audio}")
    if dry:
        return 0
    cap_dir = os.path.join(site, 'website', 'assets', 'captions', ep['slug'])
    os.makedirs(cap_dir, exist_ok=True)
    for l in langs:
        shutil.copyfile(os.path.join(loc_dir(ep), 'vtt', f'{l}.vtt'), os.path.join(cap_dir, f'{l}.vtt'))
    urls = {}
    if audio:
        token = pull_token(site)
        for l in audio:
            body = open(os.path.join(loc_dir(ep), l, 'dub.m4a'), 'rb').read()
            pathname = f"dub/{VERSION}/{ep['slug']}/{l}.m4a"
            url = put_blob(token, pathname, body)
            size = remote_size(url)
            print(f'  {l}: {len(body) / 1e6:.1f} MB uploaded -> {url.split("/dub/")[0].split("//")[1].split(".")[0][:6]}…/{pathname} (remote size {size})')
            if size != len(body):
                sys.exit(f'{l}: remote size {size} differs from local {len(body)}')
            urls[l] = url
        token = None
    ep_file = os.path.join(site, 'website', 'data', 'episodes.json')
    data = json.load(open(ep_file, encoding='utf-8'))
    items = data if isinstance(data, list) else data['episodes']
    item = next(e for e in items if e['slug'] == ep['slug'])
    loc = dict(item.get('localizations') or {})
    for l in langs:
        entry = {'subtitles': f"/assets/captions/{ep['slug']}/{l}.vtt"}
        if l in urls:
            entry['audio'] = urls[l]
        elif l in loc and 'audio' in loc[l]:
            entry['audio'] = loc[l]['audio']
        loc[l] = entry
    item['localizations'] = {l: loc[l] for l in LANGUAGES if l in loc}
    with open(ep_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')
    print(f"episodes.json: {ep['slug']} localizations = {sorted(item['localizations'])}")
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
