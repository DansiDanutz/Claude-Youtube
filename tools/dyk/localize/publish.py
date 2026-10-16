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
import contextlib, fcntl, hashlib, json, os, re, shutil, subprocess, sys, tempfile, urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from episodes import LANGUAGES, episode, loc_dir  # noqa: E402

BLOB_API = 'https://vercel.com/api/blob/'
VERSION = 'v1'
CACHE_SECONDS = 31536000


@contextlib.contextmanager
def catalog_lock(ep_file):
    """Publishing reads episodes.json, changes one episode and writes it back: two publishers for different episodes must not
    overlap, or the second write would drop the first one's entry."""
    path = os.path.join(tempfile.gettempdir(), 'dexty-catalog-' + hashlib.sha1(os.path.abspath(ep_file).encode()).hexdigest()[:12] + '.lock')
    handle = open(path, 'w')
    try:
        fcntl.flock(handle, fcntl.LOCK_EX)
        yield
    finally:
        handle.close()


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


def select_languages(requested, available):
    """The languages to publish: `requested` is the --langs text (comma separated, spaces allowed, empty = all). A code that is not a
    known language, or has no subtitle file yet, is an error: a typo must not silently publish less than asked for."""
    wanted = [x.strip() for x in requested.split(',') if x.strip()] or list(LANGUAGES)
    unknown = [x for x in wanted if x not in LANGUAGES]
    if unknown:
        raise SystemExit(f'unknown language(s) {unknown}; choose from {", ".join(LANGUAGES)}')
    missing = [x for x in wanted if x not in available]
    if missing:
        raise SystemExit(f'no subtitle file yet for {missing}; run build_vtt.py first')
    return [x for x in LANGUAGES if x in wanted]


def blob_path(version, slug, lang):
    return f'dub/{version}/{slug}/{lang}.m4a'


def main(argv):
    import argparse
    import urllib.parse  # noqa: F401  (used by put_blob)
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('episode')
    ap.add_argument('--site', default='~/Projects/Did-You-Know-That')
    ap.add_argument('--no-audio', action='store_true')
    ap.add_argument('--langs', default='', help='only these languages, comma separated (default: all that exist)')
    ap.add_argument('--version', default=VERSION, help='Blob folder version: re-voiced audio needs a new one, the files are cached for a year')
    ap.add_argument('--dry-run', action='store_true')
    opts = ap.parse_args(argv)
    site = os.path.expanduser(opts.site)
    args = [opts.episode]
    ep = episode(args[0])
    dry, no_audio = opts.dry_run, opts.no_audio
    available = [l for l in LANGUAGES if os.path.exists(os.path.join(loc_dir(ep), 'vtt', f'{l}.vtt'))]
    langs = select_languages(opts.langs, available) if opts.langs.strip() else available
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
            pathname = blob_path(opts.version, ep['slug'], l)
            url = put_blob(token, pathname, body)
            size = remote_size(url)
            print(f'  {l}: {len(body) / 1e6:.1f} MB uploaded -> {url.split("/dub/")[0].split("//")[1].split(".")[0][:6]}…/{pathname} (remote size {size})')
            if size != len(body):
                sys.exit(f'{l}: remote size {size} differs from local {len(body)}')
            urls[l] = url
        token = None
    ep_file = os.path.join(site, 'website', 'data', 'episodes.json')
    with catalog_lock(ep_file):
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
        tmp = ep_file + '.tmp'
        with open(tmp, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write('\n')
        os.replace(tmp, ep_file)           # atomic: a reader or a crash never sees a half-written catalog
    print(f"episodes.json: {ep['slug']} localizations = {sorted(item['localizations'])}")
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
