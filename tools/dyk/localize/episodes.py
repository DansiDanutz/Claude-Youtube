"""Episode registry and the English-source loader for the DYK localisation pipeline.

English artifacts live in the main checkout (scripts, vo.json, timeline.json) — and, for an episode whose files
are on origin/main but not in the checked-out branch (No. 04), they are read with `git show origin/main:<path>`.
Gitignored media (narration mp3, cue sounds) is only ever read from this checkout, never from git.
"""
import ast, json, os, subprocess

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))

# number -> videos dir, site slug, remotion shots dir, YouTube id of the English episode.
# from_whisper: the tracked script/timeline do not match the published video, so en_from_whisper.py builds its sentence map.
EPISODES = {
    '01': dict(dir='dyk-01-time-compressed', slug='time-compressed', shots='dyk-01', youtube='Sw1xP57TNTk', from_whisper=True),
    '02': dict(dir='dyk-02-the-sun', slug='the-sun', shots='dyk-02', youtube='WlClbKXSdSo'),
    '03': dict(dir='dyk-03-school', slug='school', shots='dyk-03', youtube='rchexCb48LM'),
    '04': dict(dir='dyk-04-money', slug='money', shots='dyk-04', youtube='GkEBiDLa1WY'),
    '05': dict(dir='dyk-05-food', slug='food', shots='dyk-05', youtube='a4qHdjL8bok'),
}
LANGUAGES = ('ro', 'fr', 'es', 'zh')


def episode(num):
    if num not in EPISODES:
        raise SystemExit(f'unknown episode {num!r}; choose from {", ".join(EPISODES)}')
    return {**EPISODES[num], 'num': num}


def read_text(rel):
    """A repo file from the working tree, else from origin/main (so No. 04 works from the No. 05 branch)."""
    path = os.path.join(ROOT, rel)
    if os.path.exists(path):
        return open(path, encoding='utf-8').read()
    out = subprocess.run(['git', '-C', ROOT, 'show', f'origin/main:{rel}'], capture_output=True, text=True)
    if out.returncode != 0:
        raise SystemExit(f'{rel}: not in the working tree and not on origin/main')
    return out.stdout


def read_json(rel):
    return json.loads(read_text(rel))


def shot_order(ep):
    """SHOT_ORDER from the episode's build_final.py (the order the master concatenates its shots), else timeline order."""
    timeline = read_json(f"videos/{ep['dir']}/work/timeline.json")
    try:
        tree = ast.parse(read_text(f"videos/{ep['dir']}/work/build_final.py"))
        for node in ast.walk(tree):
            if isinstance(node, ast.Assign) and any(getattr(t, 'id', '') == 'SHOT_ORDER' for t in node.targets):
                order = ast.literal_eval(node.value)
                if set(order) == set(timeline):
                    return order, timeline
    except (SystemExit, SyntaxError, ValueError):
        pass
    return list(timeline), timeline


def loc_dir(ep):
    return os.path.join(ROOT, 'videos', ep['dir'], 'loc')
