#!/usr/bin/env python3
"""JR One service-page hero photo generator.

Mirrors the Gordo Worldwide pipeline (Google Gemini API direct, model
gemini-3-pro-image-preview aka Nano Banana Pro). Generates 16:9 hero photos
for the 11 service pages currently missing one, saves to public/images/.

Run from /Users/popeye/Desktop/JRONE/jr-one-website:
    python3 scripts/generate_service_heroes.py            # all 11
    python3 scripts/generate_service_heroes.py --page peak-301   # just one
    python3 scripts/generate_service_heroes.py --force    # overwrite existing

Cost: ~$0.04/image x 11 = ~$0.44 total on Nano Banana Pro.
Outputs PNG then converts to WebP at 1376x768 to match existing hero file size.
"""

import argparse
import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
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


_CHLOE_ENV = Path.home() / "Desktop" / "CHLOE" / ".env"
if _CHLOE_ENV.exists():
    for line in _CHLOE_ENV.read_text().splitlines():
        if line.startswith("GOOGLE_AI_API_KEY="):
            os.environ["GOOGLE_AI_API_KEY"] = line.split("=", 1)[1].strip().strip('"').strip("'")
            break

GOOGLE_AI_API_KEY = os.environ.get("GOOGLE_AI_API_KEY")
MODEL = "gemini-3-pro-image-preview"
MAX_RETRIES = 3
RETRY_DELAY = 5

JR_ROOT = Path("/Users/popeye/Desktop/JRONE/jr-one-website")
IMAGES_DIR = JR_ROOT / "public" / "images"

BRAND_SPEC = (
    " Cinematic editorial photography. Warm clear Tampa Bay daylight. "
    "No faces directly at camera. Professional documentary tone. Navy and "
    "gold tonal palette inside the scene. 16:9 wide hero composition with the "
    "subject occupying the main visual mass of the frame across its full width, "
    "balanced left-to-right with no empty halves. Real grounded scene, not "
    "obviously AI-generated. No graphic elements, no logos, no text in the "
    "image. Photoreal."
)

PROMPTS = {
    "commercial-gutters": (
        "Wide low-angle exterior of a two-story Tampa Bay commercial office "
        "building or strip-center facade. New seamless aluminum gutters and "
        "downspouts cleanly installed along the entire roofline. A professional "
        "contractor in a navy work shirt examines the gutter line from a "
        "fiberglass ladder. Mid-morning clear sky. Manicured commercial "
        "landscaping in the foreground."
    ),
    "copper-gutters": (
        "Wide architectural side view of a high-end Tampa Bay coastal residence "
        "with the entire eave line and one full downspout run shown end-to-end "
        "in polished and lightly patinated copper half-round gutters. Copper "
        "fills the horizontal length of the frame. Warm late-afternoon "
        "golden-hour light catches the copper across its full length. Premium "
        "craftsmanship visible at the joints. House facade and palm landscaping "
        "evenly behind the copper line, no large empty sky regions."
    ),
    "govee-lights": (
        "Twilight exterior of a modern single-story Florida home with Govee "
        "Permanent Outdoor Lights installed along the entire roofline. The "
        "lights are individual small dome-shaped LED pucks spaced about every "
        "six inches along a low-profile black aluminum track that is mounted "
        "under the eave, with each puck emitting a soft warm-white downlight "
        "onto the soffit and exterior wall. The pucks read as a clean row of "
        "discrete bulbs, NOT a continuous strip or rope light. Deep blue-hour "
        "sky behind the roof. No holiday decor. Architectural permanent "
        "installation, the row of lights spans the full horizontal width of "
        "the frame."
    ),
    "gutter-repair": (
        "Documentary-style photo of an actual JR One Tampa Bay residential "
        "gutter repair job in progress. Wide angle showing a real worn "
        "single-story Florida home. A contractor in worn work clothes is on an "
        "extension ladder near the corner of the house, hands on a sagging "
        "aluminum gutter section that is being re-secured to the fascia. "
        "Visible hangers, fresh fasteners, an open tool bag on the ladder "
        "shelf, water staining and slight rust on the old gutter section "
        "before the fix. Real candid contractor lighting at midday, palm shade "
        "across part of the wall. Looks like a documentary photo on a real "
        "jobsite, NOT a staged or rendered scene."
    ),
    "peak-301": (
        "Asphalt-shingle roof of a Tampa Bay single-family home being treated "
        "with a soy-based rejuvenation spray coating. Contractor in safety "
        "harness and white Tyvek suit applying the coating with a low-pressure "
        "wand. Clear visible contrast between treated and untreated shingle "
        "slope. Bright midday clarity. No overspray drift."
    ),
    "sagiper": (
        "Wide architectural exterior of a modern Tampa Bay home with full SAGIPER "
        "SAGIWALL exterior cladding installed: dark walnut wood-grain PVC planks "
        "in a tongue-and-groove V-groove profile, six-inch plank width, "
        "installed in long horizontal runs across an entire wall plane next to "
        "a contemporary entryway. Crisp shadow lines between planks reveal the "
        "V-groove. Premium architect-grade exterior look, not generic vinyl "
        "siding. The wall of SAGIPER cladding fills the full horizontal width "
        "of the frame. Aluminum soffit and gold trim accent visible at the "
        "roof edge. Warm late-afternoon side-lighting reveals the wood grain "
        "texture and the deep walnut tone. No people in frame."
    ),
    "service-plans": (
        "Wide residential exterior of a neat Tampa Bay single-family home. A "
        "JR One contractor in navy uniform stands at the base of a fiberglass "
        "extension ladder leaning against the eave doing a scheduled "
        "maintenance inspection of the gutters. A second crew member on the "
        "ground holds a clipboard tablet. The full front facade of the house "
        "is visible across the frame from one corner to the other, manicured "
        "front yard with low palms, late-morning soft daylight. Calm "
        "professional recurring-service energy. The scene fills the full "
        "horizontal width of the frame, balanced left-to-right."
    ),
    "siding": (
        "Wide exterior of a modern Tampa Bay coastal home with horizontal lap "
        "fiber-cement or PVC siding being installed. Contractor visible at "
        "scaffold height fastening a panel. Clean exposure lines. Blue sky "
        "with light cloud. Warm side-light on the siding revealing the texture."
    ),
    "specialty-gutters": (
        "Wide architectural exterior of a custom Tampa Bay residence with "
        "oversized 7-inch K-style or half-round aluminum gutters running the "
        "full length of the eave from one corner to the other, with a matching "
        "oversized round downspout descending the wall at one end. The "
        "specialty gutters fill the full horizontal width of the frame. "
        "Premium architectural home, warm late-afternoon golden-hour side-light "
        "raking across the gutter line revealing the depth and the seamless "
        "extrusion, palms and manicured landscaping below, no people in frame, "
        "the metalwork itself is the hero of the shot."
    ),
    "hoa-contracts": (
        "Elevated wide angle of a manicured Tampa Bay HOA community of "
        "townhomes or villas. All units show matching clean aluminum gutter "
        "lines along the rooflines. Palm-lined community streets. "
        "Late-afternoon golden hour. Premium community feel. No people."
    ),
    "rental-property-maintenance": (
        "Elevated wide angle of a manicured Tampa Bay rental community: rows "
        "of identical two-story townhomes or duplex rental units lined up "
        "along a palm-lined street, all units showing matching clean aluminum "
        "gutter lines along the rooflines, uniform exterior finishes, neat "
        "landscaping in front of each unit. Late-afternoon golden hour. "
        "Premium well-maintained rental-portfolio feel, no people in frame. "
        "The community spans the full horizontal width of the frame, "
        "balanced left-to-right."
    ),
}


def _generate_one(slug: str, prompt: str, output_png: Path, attempt: int = 1):
    """Generate one hero image. Auto-retries on 503."""
    from google import genai
    from google.genai import types

    client = genai.Client(api_key=GOOGLE_AI_API_KEY)
    full_prompt = prompt + BRAND_SPEC

    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=[full_prompt],
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"],
                image_config=types.ImageConfig(aspect_ratio="16:9"),
            ),
        )
    except Exception as e:
        err_str = str(e)
        if "503" in err_str and attempt < MAX_RETRIES:
            print(f"    [RETRY {attempt}/{MAX_RETRIES}] {slug} - 503, waiting {RETRY_DELAY}s...")
            time.sleep(RETRY_DELAY)
            return _generate_one(slug, prompt, output_png, attempt + 1)
        return (slug, False, f"API error: {err_str[:200]}")

    output_png.parent.mkdir(parents=True, exist_ok=True)
    parts = response.parts if response.parts is not None else []

    for part in parts:
        if hasattr(part, "inline_data") and part.inline_data:
            with open(output_png, "wb") as f:
                f.write(part.inline_data.data)
            size_kb = len(part.inline_data.data) // 1024
            return (slug, True, f"{size_kb}KB png")

    for part in parts:
        if hasattr(part, "text") and part.text:
            return (slug, False, f"Text response (likely safety block): {part.text[:150]}")

    return (slug, False, "No image returned")


def _png_to_webp(png_path: Path, webp_path: Path, target_w: int = 1376):
    """Resize to target width (preserving 16:9), save as webp q82."""
    from PIL import Image as PILImage
    img = PILImage.open(png_path)
    if img.width != target_w:
        target_h = int(round(target_w * img.height / img.width))
        img = img.resize((target_w, target_h), PILImage.LANCZOS)
    img.save(webp_path, "WEBP", quality=82, method=6)
    return webp_path.stat().st_size // 1024


def main():
    if not GOOGLE_AI_API_KEY:
        print("ERROR: GOOGLE_AI_API_KEY not found in ~/Desktop/CHLOE/.env", file=sys.stderr)
        sys.exit(1)

    parser = argparse.ArgumentParser()
    parser.add_argument("--page", default=None, help="Generate just one page slug")
    parser.add_argument("--force", action="store_true", help="Overwrite existing .webp")
    parser.add_argument("--max-parallel", type=int, default=3)
    args = parser.parse_args()

    slugs = [args.page] if args.page else list(PROMPTS.keys())
    invalid = [s for s in slugs if s not in PROMPTS]
    if invalid:
        print(f"ERROR: unknown page slug(s): {invalid}", file=sys.stderr)
        print(f"Valid slugs: {list(PROMPTS.keys())}", file=sys.stderr)
        sys.exit(1)

    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    jobs = []
    for slug in slugs:
        webp_path = IMAGES_DIR / f"{slug}-hero.webp"
        if webp_path.exists() and not args.force:
            print(f"  SKIP {slug} (exists, use --force to regenerate)")
            continue
        png_path = IMAGES_DIR / f"{slug}-hero.png"
        jobs.append((slug, PROMPTS[slug], png_path, webp_path))

    if not jobs:
        print("Nothing to do.")
        return

    print(f"Generating {len(jobs)} hero photo(s) at 16:9 via {MODEL}...")
    results = []
    with ThreadPoolExecutor(max_workers=args.max_parallel) as pool:
        futures = {
            pool.submit(_generate_one, slug, prompt, png_path): (slug, png_path, webp_path)
            for slug, prompt, png_path, webp_path in jobs
        }
        for fut in as_completed(futures):
            slug, png_path, webp_path = futures[fut]
            try:
                slug2, ok, info = fut.result()
                results.append((slug2, ok, info))
                if ok:
                    kb = _png_to_webp(png_path, webp_path)
                    png_path.unlink(missing_ok=True)
                    print(f"  OK   {slug2}  ({info}) -> {webp_path.name} {kb}KB")
                else:
                    print(f"  FAIL {slug2}  {info}", file=sys.stderr)
            except Exception as e:
                print(f"  CRASH {slug}: {e}", file=sys.stderr)
                results.append((slug, False, f"crash: {e}"))

    failures = [r for r in results if not r[1]]
    print(f"\nDone. {len(results) - len(failures)}/{len(results)} succeeded.")
    if failures:
        sys.exit(1)


if __name__ == "__main__":
    main()
