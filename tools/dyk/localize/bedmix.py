"""ffmpeg side of the dub: the episode's sound bed (SFX + music, no voice) and the final mix with a dub voice.

The bed follows the English picture, so it is built once per episode from the English cue sheet and reused for every language.
The mix copies work/build_final.py: SFX ducked 5:1 and music 12:1 under the voice, then one flat gain to -14 LUFS and a
limiter at -2.6 dB (sample) so the true peak stays under -1 dBTP, measured again on the result (up to three passes).
Intermediates are large WAVs: they live in ~/.cache/video-editor/loc/<episode>/ and are deleted as soon as they are consumed.
"""
import contextlib, fcntl, json, os, re, subprocess, sys, tempfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from episodes import ROOT, read_json, read_text  # noqa: E402

SFX_DIR = os.path.join(ROOT, 'media', 'library', 'sfx', 'clips')
MUSIC_DIR = os.path.join(ROOT, 'media', 'library', 'music', 'clips')
CACHE = os.path.expanduser('~/.cache/video-editor/loc')
TARGET_LUFS, LIMIT_DBTP = -14.0, -2.6
SFX_GROUP, XFADE_S = 35, 4.0
SR = 48000


def run(args):
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-nostdin'] + args, check=True)


def probe_duration(path):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path],
                                capture_output=True, text=True, check=True).stdout.strip())


def loudness(path):
    err = subprocess.run(['ffmpeg', '-nostdin', '-i', path, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
    summary = err[err.rfind('Summary:'):]
    return float(re.search(r'I:\s+(-?[\d.]+) LUFS', summary).group(1)), float(re.search(r'Peak:\s+(-?[\d.]+) dBFS', summary).group(1))


def delayed_mix(items, out, total_s):
    """items [(path, seconds, gain)] -> one stereo wav of total_s seconds, each placed by adelay, no normalisation."""
    inputs, filt = [], []
    for i, (path, at, gain) in enumerate(items):
        inputs += ['-i', path]
        ms = max(0, int(round(at * 1000)))
        filt.append(f'[{i}:a]aformat=sample_rates={SR}:channel_layouts=stereo,volume={gain},adelay={ms}|{ms}[a{i}]')
    labels = ''.join(f'[a{i}]' for i in range(len(items)))
    filt.append(f'{labels}amix=inputs={len(items)}:normalize=0:duration=longest,apad=whole_dur={total_s:.3f},atrim=0:{total_s:.3f}[out]')
    run(inputs + ['-filter_complex', ';'.join(filt), '-map', '[out]', '-ar', str(SR), '-ac', '2', out])


def episode_constants(ep):
    """(music clip file name, music level) from the episode's own build_final.py, with the series defaults as fallback."""
    src = read_text(f"videos/{ep['dir']}/work/build_final.py")
    clip = re.search(r"'clips',\s*'([\w.-]+\.mp3)'", src)
    level = re.search(r'^MUSIC_LEVEL\s*=\s*([\d.]+)', src, re.M)
    return (clip.group(1) if clip else 'cinematic-min.mp3'), float(level.group(1)) if level else 0.32


def cue_list(ep):
    """[{t, clip, gain}] from the English cuesheet.json, or [] when the episode has none (No. 01)."""
    try:
        return read_json(f"videos/{ep['dir']}/work/cuesheet.json")
    except SystemExit:
        return []


def bed_spec_path(ep):
    return os.path.join(ROOT, 'videos', ep['dir'], 'loc', 'bed.json')


def write_bed_spec(ep):
    """Freeze what the sound bed needs (music clip, level, SFX cue list) into loc/bed.json, so building a dub never needs the
    English work files again (a fresh checkout, or an episode whose branch is not merged, can still build)."""
    clip, level = episode_constants(ep)
    spec = {'music': clip, 'music_level': level, 'cues': cue_list(ep)}
    with open(bed_spec_path(ep), 'w', encoding='utf-8') as f:
        json.dump(spec, f, ensure_ascii=False, indent=0)
    return spec


def load_bed_spec(ep):
    path = bed_spec_path(ep)
    if not os.path.exists(path):
        raise SystemExit(f'{path}: missing — run en_map.py (or en_from_whisper.py) for this episode once, where its English files exist')
    return json.load(open(path, encoding='utf-8'))


@contextlib.contextmanager
def episode_lock(ep):
    """One build per episode at a time: the bed files are shared, and a finished build may delete them."""
    os.makedirs(CACHE, exist_ok=True)
    handle = open(os.path.join(CACHE, f"build-{ep['num']}.lock"), 'w')
    try:
        fcntl.flock(handle, fcntl.LOCK_EX)    # waits for a running build of the same episode
        yield
    finally:
        handle.close()


def bed_dir(ep):
    return os.path.join(CACHE, ep['num'])


def ensure_bed(ep, total_s):
    """(sfx_raw.wav or None, music_raw.wav) in the cache; built once, reused for every language."""
    d = bed_dir(ep)
    os.makedirs(d, exist_ok=True)
    sfx_path, music_path = os.path.join(d, 'sfx_raw.wav'), os.path.join(d, 'music_raw.wav')
    spec = load_bed_spec(ep)
    cues = spec['cues']
    if cues and not os.path.exists(sfx_path):
        groups = []
        for g in range(0, len(cues), SFX_GROUP):
            part = os.path.join(d, f'sfx_{g // SFX_GROUP}.wav')
            delayed_mix([(os.path.join(SFX_DIR, f"{c['clip']}.mp3"), c['t'], c['gain']) for c in cues[g:g + SFX_GROUP]], part, total_s)
            groups.append((part, 0.0, 1.0))
        delayed_mix(groups, sfx_path, total_s)
        for p, _, _ in groups:
            os.remove(p)
    if not os.path.exists(music_path):
        clip, level = os.path.join(MUSIC_DIR, spec['music']), spec['music_level']
        clip_d = probe_duration(clip)
        copies = int(total_s // (clip_d - XFADE_S)) + 2
        inputs, chain, label = [], [], '[0:a]'
        for _ in range(copies):
            inputs += ['-i', clip]
        for i in range(1, copies):
            chain.append(f'{label}[{i}:a]acrossfade=d={XFADE_S}:c1=tri:c2=tri[x{i}]')
            label = f'[x{i}]'
        chain.append(f'{label}atrim=0:{total_s:.3f},aformat=sample_rates={SR}:channel_layouts=stereo,volume={level},'
                     f'afade=t=in:d=2,afade=t=out:st={total_s - 5:.3f}:d=5[out]')
        run(inputs + ['-filter_complex', ';'.join(chain), '-map', '[out]', '-ar', str(SR), '-ac', '2', music_path])
    return (sfx_path if cues else None), music_path


def mix_master(voice_wav, sfx_raw, music_raw, out_m4a, workdir):
    """Duck the bed under the dub voice, level to -14 LUFS with the limiter, encode AAC. Returns (lufs, peak)."""
    tag = os.path.splitext(os.path.basename(out_m4a))[0] + '-' + os.path.basename(os.path.dirname(out_m4a))   # unique per language
    pre, master = os.path.join(workdir, f'master_pre_{tag}.wav'), os.path.join(workdir, f'master_{tag}.wav')
    inputs, chain = ['-i', voice_wav], []
    if sfx_raw:
        inputs += ['-i', sfx_raw]
    inputs += ['-i', music_raw]
    split = 3 if sfx_raw else 2
    chain.append(f'[0:a]asplit={split}' + ''.join(f'[v{i}]' for i in range(split)))
    mixin = '[v0]'
    if sfx_raw:
        chain.append('[1:a][v1]sidechaincompress=threshold=0.03:ratio=5:attack=5:release=220:makeup=1[sfx]')
        mixin += '[sfx]'
        chain.append('[2:a][v2]sidechaincompress=threshold=0.03:ratio=12:attack=20:release=450[mus]')
    else:
        chain.append('[1:a][v1]sidechaincompress=threshold=0.03:ratio=12:attack=20:release=450[mus]')
    mixin += '[mus]'
    chain.append(f'{mixin}amix=inputs={split}:normalize=0[out]')
    run(inputs + ['-filter_complex', ';'.join(chain), '-map', '[out]', '-ar', str(SR), '-ac', '2', pre])
    lufs, _ = loudness(pre)
    limit = 10 ** (LIMIT_DBTP / 20)
    gain_db = TARGET_LUFS - lufs
    for _ in range(3):
        run(['-i', pre, '-af', f'volume={gain_db:.2f}dB,aresample=192000,alimiter=limit={limit:.4f}:level=disabled,aresample={SR}',
             '-ar', str(SR), '-ac', '2', master])
        lufs_m, peak_m = loudness(master)
        if abs(lufs_m - TARGET_LUFS) <= 0.3:
            break
        gain_db += TARGET_LUFS - lufs_m
    run(['-i', master, '-c:a', 'aac', '-b:a', '64k', '-ar', '44100', '-ac', '2', '-movflags', '+faststart', out_m4a])
    for p in (pre, master):
        os.remove(p)
    return lufs_m, peak_m
