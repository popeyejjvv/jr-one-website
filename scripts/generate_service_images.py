#!/usr/bin/env python3
"""
Generate JR One service-page images via Google Nano Banana Pro.

Forked from CCE's scripts/generate_frames.py (same API pattern + key).
Aspect ratio 16:9 landscape (vs CCE's 9:16 vertical). Saves to public/images/.

Usage:
    python3 scripts/generate_service_images.py

Requires GOOGLE_AI_API_KEY from ~/Desktop/CHLOE/.env (auto-loaded).
"""

import os
import sys
import time
from pathlib import Path

# --- media spend cap (added 2026-08-05) -------------------------------------------------------
# cost_governor.py defined $100/mo for this service but NOTHING recorded to its ledger, so the cap
# could never trip. This routes every generate_content call through it. Fails closed at 90%.
import sys as _sys
_sys.path.insert(0, "/Users/popeye/Desktop/EAPOPEYE/scripts/lib")
try:
    import media_spend as _media_spend
    _media_spend.install_genai_guard()
except Exception as _e:  # never let the meter break a production run silently
    print(f"[media_spend] WARNING: spend cap NOT installed ({_e})", file=_sys.stderr)
# ----------------------------------------------------------------------------------------------


# Load GOOGLE_AI_API_KEY from Chloe's .env (proven path used by CCE)
ENV_PATH = Path.home() / "Desktop" / "CHLOE" / ".env"
if ENV_PATH.exists():
    for line in ENV_PATH.read_text().splitlines():
        if line.startswith("GOOGLE_AI_API_KEY="):
            os.environ["GOOGLE_AI_API_KEY"] = line.split("=", 1)[1].strip().strip('"').strip("'")
            break

GOOGLE_AI_API_KEY = os.environ.get("GOOGLE_AI_API_KEY")
MODEL = "gemini-3-pro-image-preview"
MAX_RETRIES = 3
RETRY_DELAY = 30

REPO_ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = REPO_ROOT / "public" / "images"

IMAGES = [
    {
        "filename": "storm-damage-hero",
        "prompt": "Damaged residential gutters and fascia on a Florida home after a severe storm, bent white aluminum gutter hanging loose from the roof edge, exposed rotting wood fascia board with peeling paint, dark storm clouds clearing in the background with a dramatic break of light, palm trees bent from wind, wet driveway reflecting the sky, Tampa Bay suburban neighborhood. Wide shot from the front yard, eye level. Natural overcast lighting with dramatic cloud break. Ultra-photorealistic, documentary editorial style.",
    },
    {
        "filename": "seamless-gutter-install",
        "prompt": "Professional installer in a navy work shirt mounting a new 6-inch white seamless aluminum gutter on the eave of a Florida single-family stucco home, gutter machine visible in the driveway with a coil of aluminum, clean fresh fascia board, mature palm trees in the front yard, blue Florida sky. Medium shot from ground looking up at the roofline. Bright Florida morning sunlight, clean shadows. Ultra-photorealistic, editorial trade-magazine style.",
    },
    {
        "filename": "soffit-fascia-detail",
        "prompt": "Close-up detail shot of freshly installed white aluminum soffit panels and matching fascia wrap on a residential roof overhang, clean mitered inside corner visible, soffit vent perforations crisp and even, light shadow from the eave, deep blue Florida sky in the background. Tight architectural framing. Clean natural daylight, no harsh sun. Ultra-photorealistic, architectural photography style.",
    },
    {
        "filename": "gutter-guard-installed",
        "prompt": "Aluminum micro-mesh gutter guard installed on a white seamless aluminum gutter on a Florida home, several oak leaves and pine needles resting on top of the mesh unable to enter, the gutter underneath visibly clean, Spanish moss hanging from a nearby live oak tree. Medium close-up shot from ladder height. Bright afternoon Florida sun, slight backlight on the leaves. Ultra-photorealistic, product-photography sharpness.",
    },
    {
        "filename": "gutter-cleaning-before",
        "prompt": "Clogged residential rain gutter completely full of wet matted leaves, dark pine needles, twigs, and shingle granule debris, dirty brown water overflowing down the side of a Florida stucco house, black algae staining streaking the white fascia below. Close-up overhead shot looking straight down into the gutter, capturing the full clogged length. Overcast flat lighting, no shadows. Ultra-photorealistic, documentary maintenance style.",
    },
    {
        "filename": "7inch-gutter-comparison",
        "prompt": "Side-by-side product comparison of a standard 5-inch K-style gutter section next to an oversized 7-inch K-style gutter section, both white aluminum, both displayed on a neutral gray studio backdrop, clear size difference visible, a yellow tape measure laid across showing the width difference between the two openings. Clean studio shot, even soft lighting from above, slight shadow underneath each piece. Ultra-photorealistic, e-commerce product-photography style.",
    },
    {
        "filename": "spanish-hero-familia",
        "prompt": "Hispanic family of four standing in front of their well-maintained Florida single-family home with new white seamless aluminum gutters and crisp soffit visible along the roofline, father pointing up toward the clean roof edge, mother smiling, two children of elementary-school age also looking up, manicured tropical landscaping with palms and bird-of-paradise, Tampa Bay suburban setting. Wide shot, warm late-afternoon golden hour lighting. Ultra-photorealistic, editorial lifestyle photography.",
    },
    {
        "filename": "florida-rain-gutters",
        "prompt": "Heavy tropical rainstorm pouring sheets of water through a properly functioning white seamless aluminum gutter and downspout system on a Florida home, clear water flowing cleanly out of the downspout elbow onto a concrete splash block, dramatic visible rain streaks, lush green Florida vegetation soaked, dark stormy sky. Medium shot showing the full gutter-to-ground water flow path. Natural stormy daylight, slight backlight catching the falling rain. Ultra-photorealistic, weather-documentary style.",
    },
]


def generate_one(prompt: str, out_path: Path, attempt: int = 1):
    """Single image generation with 503 retry."""
    from google import genai
    from google.genai import types

    client = genai.Client(api_key=GOOGLE_AI_API_KEY)

    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=[prompt],
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"],
                image_config=types.ImageConfig(aspect_ratio="16:9"),
            ),
        )
    except Exception as e:
        err = str(e)
        if "503" in err and attempt < MAX_RETRIES:
            print(f"    [RETRY {attempt}/{MAX_RETRIES}] {out_path.name} — 503, waiting {RETRY_DELAY}s...")
            time.sleep(RETRY_DELAY)
            return generate_one(prompt, out_path, attempt + 1)
        return (False, f"API error (attempt {attempt}): {err[:200]}")

    out_path.parent.mkdir(parents=True, exist_ok=True)
    parts = response.parts if response.parts is not None else []

    for part in parts:
        if hasattr(part, "inline_data") and part.inline_data:
            with open(out_path, "wb") as f:
                f.write(part.inline_data.data)
            size_kb = len(part.inline_data.data) // 1024
            return (True, f"{size_kb}KB")

    return (False, "no inline_data in response")


def main():
    if not GOOGLE_AI_API_KEY:
        print("ERROR: GOOGLE_AI_API_KEY not found. Check ~/Desktop/CHLOE/.env")
        sys.exit(1)

    print(f"JR One service image generator")
    print(f"Model: {MODEL}")
    print(f"Output: {OUT_DIR}")
    print(f"Count: {len(IMAGES)}")
    print()

    results = []
    for i, img in enumerate(IMAGES, 1):
        out_path = OUT_DIR / f"{img['filename']}.png"
        if out_path.exists() and out_path.stat().st_size > 50_000:
            print(f"[{i}/{len(IMAGES)}] SKIP (exists): {out_path.name}")
            results.append((img["filename"], True, "cached"))
            continue
        print(f"[{i}/{len(IMAGES)}] Generating: {out_path.name}")
        ok, info = generate_one(img["prompt"], out_path)
        status = "OK" if ok else "FAIL"
        print(f"    {status}: {info}")
        results.append((img["filename"], ok, info))
        # Brief pause between calls to be polite
        if i < len(IMAGES):
            time.sleep(2)

    print()
    print("=== SUMMARY ===")
    for name, ok, info in results:
        flag = "OK  " if ok else "FAIL"
        print(f"  {flag}  {name}  ({info})")

    failed = [r for r in results if not r[1]]
    sys.exit(0 if not failed else 1)


if __name__ == "__main__":
    main()
