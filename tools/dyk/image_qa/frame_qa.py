#!/usr/bin/env python3
"""PROTOTYPE: image QA of rendered frames with TypeSafe (Jev 1.14, images are "danger zone"). Dry run by default.

  python3 tools/dyk/image_qa/frame_qa.py                       # show the requests, the headers and the token/cost estimate
  python3 tools/dyk/image_qa/frame_qa.py --frames a.png b.png  # other frames
  python3 tools/dyk/image_qa/frame_qa.py --send --i-approve-spend   # needs TYPESAFE_API_KEY in the environment; NOT used yet

Per frame, one request with the image once in `state` and the questions asked in parallel over it:
  text_cut_off         noul  any text clipped by the frame edge or the box that holds it
  caption_hud_overlap  noul  caption/label text colliding with the HUD (bottom bar, top-left year)
End-screen frames (name contains "Outro") also get ring_present (noul) and ring_box (box, Jev 1.14 only): where the logo ring is,
compared with where YouTube's Subscribe circle will sit (centre 960,767 of 1920x1080, i.e. x 0.500, y 0.710).

Contract (docs.typesafe.ai/images, /primitives/box, /api): POST https://api.typesafe.ai/v1/systemone, Bearer key, header
TypeSafe-Danger-Zone-Images: true, multipart/form-data with a `request` JSON part and one file part per image. Images are PNG or JPEG,
280-1568 px per side, 78,400-2,458,624 pixels in total, never resized by the service. Output tokens are free, input $0.042 per Mtok.
Measured on the first run (4 Episode 5 stills, 960x540): 1,792 to 1,864 input tokens per request, 7,241 in all, about $0.0003.
Nothing here calls the API unless --send AND --i-approve-spend are both given and a key is present.
With --send each yes/no answer is compared with its threshold (THRESHOLDS); the exit status is 2 when any frame was flagged.
"""
import argparse, io, json, math, os, sys, urllib.request, uuid

AUDIT = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'videos', 'dyk-05-food', 'work', 'audit', 'stills')
DEFAULT_FRAMES = ['Fd1500-540.png', 'Fd1884-1330.png', 'FdReveal-1470.png', 'FdOutro-2000.png']
ENDPOINT = 'https://api.typesafe.ai/v1/systemone'
MODEL = 'jev-1.14.0'                 # Box needs 1.14; `jev-preview` is the alias
IMAGES_HEADER = ('TypeSafe-Danger-Zone-Images', 'true')
MIN_SIDE, MAX_SIDE, MIN_PIXELS, MAX_PIXELS = 280, 1568, 78_400, 2_458_624
PRICE_PER_MTOK = 0.042
PIXELS_PER_IMAGE_TOKEN = 318         # MEASURED 2026-10-17 (jev-1.14.0): a 960x540 still cost about 1,630 image tokens; the docs give no formula, so this assumes tokens scale with pixels
CHARS_PER_TOKEN = 4
# A yes/no answer counts as a FLAG at or above its threshold. Measured on 2026-10-17 with clean frames and frames with known defects
# (make_defects.py): clean stills score 0.12 / 0.27, so 0.5 would miss subtle cases; these catch what the questions can see.
# Known miss: a caption dropped onto the HUD scores only 0.30 on caption_hud_overlap (the strip variant scores 0.64).
THRESHOLDS = {'text_cut_off': 0.30, 'caption_hud_overlap': 0.45}
RING_TARGET = (0.500, 0.710)         # centre of YouTube's Subscribe circle as a fraction of the frame
RING_TOLERANCE = 0.02

HUD = ("the heads-up display: the thin bar along the bottom edge with the show name, the episode number, the website and the year, "
       "and the year with its place label in the top-left and top-right corners")
QUESTIONS = {
    'text_cut_off': {'type': 'noul', 'instructions': (
        "Is any text in `frame` cut off, meaning a letter or word is clipped by the edge of the frame, or by the edge of the box or "
        "panel that is supposed to hold it?")},
    'caption_hud_overlap': {'type': 'noul', 'instructions': (
        f"In `frame`, does any caption, label or small line of text overlap or touch {HUD}?")},
}
RING_QUESTIONS = {
    'ring_present': {'type': 'noul', 'instructions': (
        "Is there a round logo medallion with a glowing rainbow-coloured ring in the lower middle of `frame`, next to the word SUBSCRIBE?")},
    'ring_box': {'type': 'box', 'instructions': (
        "the round logo medallion with the glowing rainbow-coloured ring, to the left of the word SUBSCRIBE, in `frame`")},
}


def image_size(path):
    from PIL import Image
    with Image.open(path) as im:
        return im.size


def validate_size(w, h):
    """Problems that make the service reject an image (it never resizes): empty list = acceptable."""
    problems = []
    if min(w, h) < MIN_SIDE or max(w, h) > MAX_SIDE:
        problems.append(f'{w}x{h}: each side must be {MIN_SIDE}-{MAX_SIDE} px')
    if not MIN_PIXELS <= w * h <= MAX_PIXELS:
        problems.append(f'{w}x{h}: total pixels {w * h} outside {MIN_PIXELS}-{MAX_PIXELS}')
    return problems


def estimate_image_tokens(w, h):
    """Estimate from one measurement (960x540 = about 1,630 tokens): proportional to the pixel count. Not a documented formula."""
    return round(w * h / PIXELS_PER_IMAGE_TOKEN)


def questions_for(name):
    return {**QUESTIONS, **(RING_QUESTIONS if 'Outro' in name else {})}


def build_request(name, asset_key, part_name, questions=None):
    """The JSON `request` part for one frame. The image is referenced once, in state, and by name in the instructions."""
    return {'model': MODEL, 'state': {'frame': asset_key},
            'assets': {asset_key: {'type': 'image', 'part': part_name}},
            'questions': questions if questions is not None else questions_for(name)}


def estimate_request(request, size):
    text_tokens = math.ceil(len(json.dumps(request['questions'], ensure_ascii=False)) / CHARS_PER_TOKEN) + 20
    image_tokens = estimate_image_tokens(*size)
    total = text_tokens + image_tokens
    return {'text_tokens': text_tokens, 'image_tokens': image_tokens, 'input_tokens': total, 'usd': total * PRICE_PER_MTOK / 1e6}


def multipart_body(request, part_name, filename, data, content_type='image/png'):
    boundary = uuid.uuid4().hex
    out = io.BytesIO()
    out.write(f'--{boundary}\r\nContent-Disposition: form-data; name="request"\r\nContent-Type: application/json\r\n\r\n'.encode())
    out.write(json.dumps(request, ensure_ascii=False).encode('utf-8'))
    out.write(f'\r\n--{boundary}\r\nContent-Disposition: form-data; name="{part_name}"; filename="{filename}"\r\nContent-Type: {content_type}\r\n\r\n'.encode())
    out.write(data)
    out.write(f'\r\n--{boundary}--\r\n'.encode())
    return out.getvalue(), f'multipart/form-data; boundary={boundary}'


# ---- reading answers ------------------------------------------------------------------------------------------------

def iou(a, b):
    """Intersection over union of two boxes given as {left, right, top, bottom} fractions."""
    w = max(0.0, min(a['right'], b['right']) - max(a['left'], b['left']))
    h = max(0.0, min(a['bottom'], b['bottom']) - max(a['top'], b['top']))
    inter = w * h
    union = (a['right'] - a['left']) * (a['bottom'] - a['top']) + (b['right'] - b['left']) * (b['bottom'] - b['top']) - inter
    return inter / union if union else 0.0


def ring_verdict(box, present_probability, tolerance=RING_TOLERANCE):
    """OK / MOVED / ABSENT for the ring, from the Box answer and the paired presence question (a Box always returns something)."""
    if present_probability < 0.5:
        return 'ABSENT'
    cx, cy = (box['left'] + box['right']) / 2, (box['top'] + box['bottom']) / 2
    return 'OK' if abs(cx - RING_TARGET[0]) <= tolerance and abs(cy - RING_TARGET[1]) <= tolerance else 'MOVED'


def flags(answers, thresholds=None):
    """{question: {value, threshold, flag}} for the yes/no questions that have a threshold (a missing answer is skipped)."""
    out = {}
    for name, limit in (thresholds or THRESHOLDS).items():
        answer = (answers or {}).get(name)
        if answer is None or 'noul' not in answer:
            continue
        out[name] = {'value': answer['noul'], 'threshold': limit, 'flag': answer['noul'] >= limit}
    return out


def send(request, part_name, filename, data, key):
    body, ctype = multipart_body(request, part_name, filename, data)
    req = urllib.request.Request(ENDPOINT, data=body, method='POST', headers={
        'Authorization': f'Bearer {key}', 'Content-Type': ctype, IMAGES_HEADER[0]: IMAGES_HEADER[1]})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--frames', nargs='*', default=DEFAULT_FRAMES)
    ap.add_argument('--send', action='store_true')
    ap.add_argument('--i-approve-spend', action='store_true')
    opts = ap.parse_args(argv)
    if opts.send and not opts.i_approve_spend:
        sys.exit('refusing to send: --send needs --i-approve-spend as well (the owner approves each paid run)')
    key = os.environ.get('TYPESAFE_API_KEY', '')
    if opts.send and not key:
        sys.exit('refusing to send: TYPESAFE_API_KEY is not set')
    total = {'input_tokens': 0, 'usd': 0.0}
    flagged = 0
    for name in opts.frames:
        path = name if os.path.isabs(name) or os.path.exists(name) else os.path.join(AUDIT, name)
        if not os.path.exists(path):
            sys.exit(f'frame not found: {path} (the default Episode 5 stills are on the video/dyk-05-food branch; pass --frames)')
        w, h = image_size(path)
        problems = validate_size(w, h)
        request = build_request(os.path.basename(path), f'{os.path.splitext(os.path.basename(path))[0]}-asset', 'frame-png')
        est = estimate_request(request, (w, h))
        total['input_tokens'] += est['input_tokens']
        total['usd'] += est['usd']
        print(f'== {os.path.basename(path)} {w}x{h}  ~{est["image_tokens"]} image + ~{est["text_tokens"]} text = ~{est["input_tokens"]} tokens  (~${est["usd"]:.6f})'
              + ('  PROBLEMS: ' + '; '.join(problems) if problems else ''))
        if not opts.send:
            print(json.dumps(request, indent=1, ensure_ascii=False))
            continue
        if problems:
            sys.exit('not sending: ' + '; '.join(problems))
        with open(path, 'rb') as f:
            answers = send(request, 'frame-png', os.path.basename(path), f.read(), key)
        print(json.dumps(answers, indent=1, ensure_ascii=False))
        for name, f in flags(answers.get('answers')).items():
            flagged += f['flag']
            print(f"  {'FLAG' if f['flag'] else 'ok  '} {name}: {f['value']:.2f} (threshold {f['threshold']:.2f})")
    print(f'\ntotal ~{total["input_tokens"]} input tokens, ~${total["usd"]:.5f} (output tokens are free); image tokens estimated from one measurement, see the docstring')
    return 2 if flagged else 0


if __name__ == '__main__':
    sys.exit(main())
