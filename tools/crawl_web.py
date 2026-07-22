#!/usr/bin/env python3
"""
crawl_web.py — pull real web pages into a video project as clean Markdown.

Research feeder for the writing steps: give it URLs (docs, a repo README, a
launch post, a competitor's page) and it saves LLM-ready Markdown under
<project>/work/research/, so the script and the beats are written against real
sourced text instead of recalled facts.

This is the READING counterpart to tools/capture_web.py — capture_web takes
SCREENSHOTS of pages to replay as fake-screencast beats; crawl_web takes their
TEXT. They pair well: crawl a page to learn what it says, capture it to show it.

Backed by Crawl4AI (https://github.com/unclecode/crawl4ai) via its `crwl` CLI —
a real headless Chromium, so JS-rendered pages work. Not a pip dep of this repo;
install once, globally:

    pipx install "crawl4ai[all]" && crawl4ai-setup

Usage (from the repo root):
    python tools/crawl_web.py videos/video-1 https://example.com/docs [more urls...]
    python tools/crawl_web.py videos/video-1 --urls urls.txt      # one URL per line
    python tools/crawl_web.py videos/video-1 <url> --out-dir work/research/pricing

Writes, per URL, <project>/work/research/<slug>.md and appends an entry
{url, file, title, chars, fetched_at} to <project>/work/research/manifest.json.
"""
import json
import os
import re
import shutil
import subprocess
import sys
import time
import urllib.parse

TIMEOUT_S = 90

# Most of the pages worth crawling for these videos are our own SPAs (nervix.ai,
# danslab.vercel.app, the Sienna page). Without a settle delay `crwl` returns the
# pre-hydration shell — literally "Loading..." — so always give the JS time to
# paint before reading the DOM.
SETTLE = "wait_for=css:body,delay_before_return_html=4,page_timeout=45000"
RETRY_SETTLE = "wait_for=css:body,delay_before_return_html=9,page_timeout=60000"
THIN_MD = 400  # chars — below this we assume we caught the shell, not the page


def find_crwl():
    """Locate the Crawl4AI CLI (PATH, or the usual pipx bin dir)."""
    crwl = shutil.which("crwl")
    if crwl:
        return crwl
    fallback = os.path.expanduser("~/.local/bin/crwl")
    return fallback if os.path.exists(fallback) else None


def slugify(url):
    """Stable, readable filename from a URL: host + path, no extension."""
    p = urllib.parse.urlparse(url)
    raw = (p.netloc + p.path).strip("/")
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", raw).strip("-").lower()
    return (slug or "page")[:80]


def first_heading(md, url):
    """Title for the manifest — the first Markdown heading, else the host."""
    for line in md.splitlines():
        if line.startswith("#"):
            return line.lstrip("#").strip()[:200]
    return urllib.parse.urlparse(url).netloc


def crawl(crwl, url):
    """Return the page as Markdown, or raise with a readable reason.

    A thin result means we almost certainly read the app shell before hydration,
    so retry once with a longer settle before giving up on it.
    """
    md = _run(crwl, url, SETTLE)
    if len(md) < THIN_MD:
        slow = _run(crwl, url, RETRY_SETTLE)
        if len(slow) > len(md):
            md = slow
    if not md:
        raise RuntimeError("empty result")
    return md


def _run(crwl, url, crawler_opts):
    proc = subprocess.run(
        [crwl, "crawl", url, "-o", "markdown", "-c", crawler_opts],
        capture_output=True, text=True, timeout=TIMEOUT_S,
    )
    md = (proc.stdout or "").strip()
    if not md and proc.returncode != 0:
        raise RuntimeError((proc.stderr or "empty result").strip()[:300])
    return md


def load_manifest(path):
    if not os.path.exists(path):
        return []
    try:
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        return data if isinstance(data, list) else []
    except Exception:
        return []


def main():
    args = sys.argv[1:]
    if len(args) < 2:
        print(__doc__.strip())
        return 2

    project = args[0]
    out_dir = os.path.join(project, "work", "research")
    urls = []
    i = 1
    while i < len(args):
        a = args[i]
        if a == "--urls":
            i += 1
            with open(args[i], encoding="utf-8") as f:
                urls += [ln.strip() for ln in f if ln.strip() and not ln.startswith("#")]
        elif a == "--out-dir":
            i += 1
            out_dir = os.path.join(project, args[i])
        else:
            urls.append(a)
        i += 1

    if not os.path.isdir(project):
        print(f"! no such project dir: {project} (run from the repo root)")
        return 2
    if not urls:
        print("! no URLs given")
        return 2

    crwl = find_crwl()
    if not crwl:
        print('! crawl4ai not found — install it once:\n'
              '    pipx install "crawl4ai[all]" && crawl4ai-setup')
        return 2

    os.makedirs(out_dir, exist_ok=True)
    manifest_path = os.path.join(out_dir, "manifest.json")
    manifest = load_manifest(manifest_path)
    by_url = {e.get("url"): e for e in manifest}
    failures = 0

    for url in urls:
        print(f"→ {url}")
        try:
            md = crawl(crwl, url)
        except subprocess.TimeoutExpired:
            print(f"  ! timeout after {TIMEOUT_S}s")
            failures += 1
            continue
        except Exception as e:
            print(f"  ! {e}")
            failures += 1
            continue

        name = slugify(url) + ".md"
        path = os.path.join(out_dir, name)
        with open(path, "w", encoding="utf-8") as f:
            f.write(f"<!-- source: {url} -->\n\n{md}\n")

        entry = {
            "url": url,
            "file": os.path.relpath(path, project).replace(os.sep, "/"),
            "title": first_heading(md, url),
            "chars": len(md),
            "fetched_at": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        }
        by_url[url] = entry
        print(f"  ✓ {entry['file']} ({len(md):,} chars) — {entry['title']}")

    ordered = list(by_url.values())
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(ordered, f, indent=2, ensure_ascii=False)
    print(f"\n{len(ordered)} page(s) in {manifest_path}"
          + (f" · {failures} failed" if failures else ""))
    return 1 if failures and failures == len(urls) else 0


if __name__ == "__main__":
    sys.exit(main())
