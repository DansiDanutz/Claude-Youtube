from pathlib import Path
from urllib.parse import parse_qs, urlsplit


MAX_BODY_BYTES = 2 * 1024 * 1024


def resolve_project(root: Path, value: str) -> Path:
    videos = (root / "videos").resolve()
    candidate = (root / value).resolve()
    if candidate == videos or videos not in candidate.parents:
        raise ValueError("project must be inside videos/")
    if not candidate.is_dir():
        raise ValueError("project directory does not exist")
    return candidate


def request_token(path: str, header_token: str | None) -> str:
    if header_token:
        return header_token
    return parse_qs(urlsplit(path).query).get("token", [""])[0]


def clean_path(path: str) -> str:
    return urlsplit(path).path
