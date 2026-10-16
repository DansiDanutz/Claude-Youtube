"""ElevenLabs access for the DYK localisation pipeline: Brian, eleven_multilingual_v2, the pilot's voice settings.

The API key is read from ~/.openclaw/fleet.env (or the environment) and is never printed. Every paid call is appended
to ~/.cache/video-editor/loc-spend.jsonl (characters, language, purpose) so the spend can be audited, and `quota()`
reads the live plan so a batch can stop BEFORE it would pass the plan (Creator tier: no overage, no extension).
"""
import json, os, time, urllib.error, urllib.request

VOICE = 'nPczCjzI2devNBz1zQrb'        # Brian
MODEL = 'eleven_multilingual_v2'
VOICE_SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.45, 'use_speaker_boost': True}
SPEED_MIN, SPEED_MAX = 0.90, 1.08     # the skill's band: below 0.9 sounds sleepy, above ~1.1 rushed
LEDGER = os.path.expanduser('~/.cache/video-editor/loc-spend.jsonl')
LANGUAGE_CODES = {'ro': 'ro', 'fr': 'fr', 'es': 'es', 'zh': 'zh'}


def api_key():
    path = os.path.expanduser('~/.openclaw/fleet.env')
    if os.path.exists(path):
        for line in open(path, encoding='utf-8'):
            if line.startswith('ELEVENLABS_API_KEY='):
                return line.split('=', 1)[1].strip().strip('"').strip("'")
    key = os.environ.get('ELEVENLABS_API_KEY', '')
    if not key:
        raise SystemExit('ELEVENLABS_API_KEY not found (fleet.env or environment)')
    return key


def quota(key=None):
    """{'used', 'limit', 'remaining', 'resets'} for the live plan. Retries a few times: the endpoint answers 429/5xx now and then."""
    req = urllib.request.Request('https://api.elevenlabs.io/v1/user/subscription', headers={'xi-api-key': key or api_key()})
    last = None
    for attempt in range(6):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                d = json.load(r)
            return {'used': d['character_count'], 'limit': d['character_limit'], 'remaining': d['character_limit'] - d['character_count'],
                    'resets': d['next_character_count_reset_unix'], 'tier': d.get('tier')}
        except (urllib.error.URLError, TimeoutError) as e:
            last = e
            time.sleep(min(30, 3 * 2 ** attempt))
    raise RuntimeError(f'quota lookup failed: {last}')


def log_spend(chars, lang, purpose):
    os.makedirs(os.path.dirname(LEDGER), exist_ok=True)
    with open(LEDGER, 'a', encoding='utf-8') as f:
        f.write(json.dumps({'t': int(time.time()), 'chars': chars, 'lang': lang, 'purpose': purpose}, ensure_ascii=False) + '\n')


def tts_with_timestamps(text, lang, speed=1.0, key=None, purpose='dub'):
    """One paid call. Returns the API JSON: audio_base64 + character alignment. Retries only on 429/5xx, twice."""
    body = json.dumps({
        'text': text, 'model_id': MODEL, 'language_code': LANGUAGE_CODES[lang],
        'voice_settings': {**VOICE_SETTINGS, 'speed': round(speed, 3)},
    }).encode()
    url = f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE}/with-timestamps?output_format=mp3_44100_128'
    req = urllib.request.Request(url, data=body, method='POST', headers={'xi-api-key': key or api_key(), 'Content-Type': 'application/json'})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=240) as r:
                out = json.load(r)
            log_spend(len(text), lang, purpose)
            return out
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503) and attempt < 2:
                time.sleep(5 * (attempt + 1))
                continue
            raise SystemExit(f'ElevenLabs HTTP {e.code}: {e.read()[:200]!r}')
    raise SystemExit('ElevenLabs: gave up')
