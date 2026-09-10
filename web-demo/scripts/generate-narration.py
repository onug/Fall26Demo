#!/usr/bin/env python3
"""
ElevenLabs narration generator — ONUG Fall 2026 keynote demo.

Reads narration/script.json (produced by `node scripts/export-script.mjs`) and
writes one MP3 per step to public/narration/<step-id>.mp3, which the demo plays
in preference to browser text-to-speech.

API key lookup order (never printed):
  1. ELEVENLABS_API_KEY environment variable
  2. macOS keychain item labelled "elevenlabs"
     (security find-generic-password -l elevenlabs -w)

Usage:
    python3 scripts/generate-narration.py              # generate missing files
    python3 scripts/generate-narration.py --force      # regenerate everything
    python3 scripts/generate-narration.py --only b1-pull b2-blocked
    python3 scripts/generate-narration.py --dry-run
    python3 scripts/generate-narration.py --list-voices
    python3 scripts/generate-narration.py --voice <voice_id>

No third-party packages required.
"""

import argparse
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCRIPT_PATH = ROOT / "narration" / "script.json"
OUT_DIR = ROOT / "public" / "narration"
API = "https://api.elevenlabs.io/v1"


def get_api_key() -> str:
    key = os.environ.get("ELEVENLABS_API_KEY", "").strip()
    if key:
        return key
    if sys.platform == "darwin":
        try:
            r = subprocess.run(
                ["security", "find-generic-password", "-l", "elevenlabs", "-w"],
                capture_output=True, text=True, timeout=10,
            )
            if r.returncode == 0 and r.stdout.strip():
                return r.stdout.strip()
        except Exception:
            pass
    print("No ElevenLabs API key found. Set ELEVENLABS_API_KEY or add a keychain item labelled 'elevenlabs'.")
    sys.exit(2)


def request(method: str, path: str, key: str, body: dict | None = None, accept: str = "application/json"):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(f"{API}{path}", data=data, method=method)
    req.add_header("xi-api-key", key)
    req.add_header("Accept", accept)
    if data is not None:
        req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return resp.read()
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")[:300]
        raise RuntimeError(f"HTTP {e.code} on {path}: {detail}") from None


def list_voices(key: str) -> None:
    voices = json.loads(request("GET", "/voices", key))["voices"]
    print(f"{'voice_id':<24} {'name':<20} category")
    for v in sorted(voices, key=lambda x: x["name"]):
        print(f"{v['voice_id']:<24} {v['name']:<20} {v.get('category', '')}")


DEFAULT_SPEED = 1.2  # ElevenLabs range 0.7–1.2; Nick asked for 1.2


def synthesize(key: str, voice_id: str, model_id: str, text: str, speed: float = DEFAULT_SPEED) -> bytes:
    body = {
        "text": text,
        "model_id": model_id,
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75,
            "style": 0.15,
            "use_speaker_boost": True,
            "speed": speed,
        },
    }
    return request(
        "POST",
        f"/text-to-speech/{voice_id}?output_format=mp3_44100_128",
        key, body, accept="audio/mpeg",
    )


def main() -> None:
    p = argparse.ArgumentParser(description="Generate ElevenLabs narration for the keynote demo")
    p.add_argument("--voice", help="ElevenLabs voice_id (default: from script.json metadata)")
    p.add_argument("--model", help="ElevenLabs model_id (default: from script.json metadata)")
    p.add_argument("--speed", type=float, default=None, help="Speaking speed 0.7–1.2 (default: script.json metadata, else 1.2)")
    p.add_argument("--only", nargs="*", help="Only these step ids")
    p.add_argument("--force", action="store_true", help="Regenerate files that already exist")
    p.add_argument("--dry-run", action="store_true", help="Print what would be generated")
    p.add_argument("--list-voices", action="store_true", help="List voices on the account and exit")
    args = p.parse_args()

    key = get_api_key()

    if args.list_voices:
        list_voices(key)
        return

    if not SCRIPT_PATH.exists():
        print(f"Missing {SCRIPT_PATH}. Run: node scripts/export-script.mjs")
        sys.exit(1)

    script = json.loads(SCRIPT_PATH.read_text())
    meta = script["metadata"]
    voice_id = args.voice or meta["voice_id"]
    model_id = args.model or meta.get("model_id", "eleven_multilingual_v2")
    speed = args.speed if args.speed is not None else float(meta.get("speed", DEFAULT_SPEED))
    if not 0.7 <= speed <= 1.2:
        print(f"speed {speed} out of ElevenLabs range 0.7–1.2")
        sys.exit(2)
    segments = script["segments"]
    if args.only:
        wanted = set(args.only)
        segments = [s for s in segments if s["id"] in wanted]

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Voice {voice_id} ({meta.get('voice_name', '?')}) · model {model_id} · speed {speed} · {len(segments)} segments → {OUT_DIR}")

    done = skipped = failed = 0
    total_chars = 0
    for i, seg in enumerate(segments, 1):
        out = OUT_DIR / f"{seg['id']}.mp3"
        label = f"[{i:2d}/{len(segments)}] {seg['id']:<16} ({seg['words']} words)"
        if out.exists() and not args.force:
            print(f"{label} exists, skipping")
            skipped += 1
            continue
        if args.dry_run:
            print(f"{label} would write {out.name}")
            continue
        print(f"{label} generating…", end=" ", flush=True)
        try:
            audio = synthesize(key, voice_id, model_id, seg["text"], speed)
            out.write_bytes(audio)
            total_chars += len(seg["text"])
            print(f"✓ {len(audio)//1024} KB")
            done += 1
            time.sleep(0.3)
        except Exception as e:  # noqa: BLE001
            print(f"✗ {e}")
            failed += 1

    print(f"\nDone: {done} generated · {skipped} skipped · {failed} failed · {total_chars:,} characters billed")
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    main()
