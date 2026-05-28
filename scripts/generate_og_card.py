#!/usr/bin/env python3
"""Generate the JR One Open Graph card as a static PNG.

Composed offline with PIL so we don't have to fight Satori's CSS subset
inside next/og. Output goes to public/og/og-card.png and is referenced
from app/layout.js openGraph.images.

Run from /Users/popeye/Desktop/JRONE/jr-one-website:
    python3 scripts/generate_og_card.py
"""

import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path("/Users/popeye/Desktop/JRONE/jr-one-website")
HERO = ROOT / "public" / "images" / "seamless-gutter-install.webp"
OUT = ROOT / "public" / "og" / "og-card.png"

FONT_BLACK = ROOT / "scripts" / "Montserrat-Black.ttf"
FONT_BOLD = ROOT / "scripts" / "Montserrat-ExtraBold.ttf"
FONT_SEMI = ROOT / "scripts" / "Montserrat-SemiBold.ttf"

W, H = 1200, 630

NAVY = (27, 42, 74)
NAVY_DEEP = (11, 22, 40)
GOLD = (212, 175, 55)
GOLD_LIGHT = (242, 205, 105)
CREAM = (245, 243, 239)
WHITE = (255, 255, 255)


def crop_to_aspect(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
    sw, sh = img.size
    target_ar = target_w / target_h
    src_ar = sw / sh
    if src_ar > target_ar:
        new_w = int(sh * target_ar)
        left = (sw - new_w) // 2
        img = img.crop((left, 0, left + new_w, sh))
    else:
        new_h = int(sw / target_ar)
        top = (sh - new_h) // 2
        img = img.crop((0, top, sw, top + new_h))
    return img.resize((target_w, target_h), Image.LANCZOS)


def star_polygon(cx: float, cy: float, outer_r: float, inner_r: float,
                 rotation_deg: float = -90.0, points: int = 5) -> list:
    coords = []
    rot = math.radians(rotation_deg)
    for i in range(points * 2):
        r = outer_r if i % 2 == 0 else inner_r
        angle = rot + i * math.pi / points
        coords.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
    return coords


def draw_gradient_band(img: Image.Image, top_y: int, height: int,
                       colors: list) -> None:
    """Horizontal gradient band of stacked thin rectangles between colors[]."""
    draw = ImageDraw.Draw(img)
    n = len(colors) - 1
    for x in range(W):
        t = x / W
        seg = min(int(t * n), n - 1)
        local_t = (t * n) - seg
        c0 = colors[seg]
        c1 = colors[seg + 1]
        col = tuple(int(c0[i] + (c1[i] - c0[i]) * local_t) for i in range(3))
        draw.rectangle([x, top_y, x + 1, top_y + height], fill=col)


def main() -> int:
    # 1) Start with the hero photo as full-bleed background, cropped to OG aspect.
    hero = Image.open(HERO).convert("RGB")
    bg = crop_to_aspect(hero, W, H)

    # 2) Darken the entire photo slightly so the text reads on it.
    base = Image.new("RGB", (W, H), NAVY_DEEP)
    blended = Image.blend(base, bg, 0.55)

    canvas = blended.copy()

    # 3) Left-side dark overlay (text panel). Diagonal cut around 60% of width.
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    cut_x_top = int(W * 0.62)
    cut_x_bot = int(W * 0.55)
    od.polygon(
        [(0, 0), (cut_x_top, 0), (cut_x_bot, H), (0, H)],
        fill=(*NAVY_DEEP, 230),
    )
    canvas = Image.alpha_composite(canvas.convert("RGBA"), overlay).convert("RGB")

    # 4) Top + bottom gold gradient bars.
    draw_gradient_band(canvas, 0, 6, [GOLD, GOLD_LIGHT, GOLD])
    draw_gradient_band(canvas, H - 6, 6, [GOLD, GOLD_LIGHT, GOLD])

    # 5) Decorative gold accent on the diagonal cut edge.
    od2 = ImageDraw.Draw(canvas)
    od2.line(
        [(cut_x_top, 6), (cut_x_bot, H - 6)],
        fill=GOLD,
        width=3,
    )

    # 6) Gold star + small all-caps eyebrow tag near the top-left.
    draw = ImageDraw.Draw(canvas)
    draw.polygon(
        star_polygon(86, 86, 32, 14, rotation_deg=-90.0),
        fill=GOLD,
    )
    eyebrow_font = ImageFont.truetype(str(FONT_SEMI), 18)
    draw.text((130, 80), "TAMPA BAY  ·  FL", font=eyebrow_font, fill=GOLD)

    # 7) Big "JR ONE" wordmark — Montserrat Black, two colors.
    jr_font = ImageFont.truetype(str(FONT_BLACK), 128)
    jr_x = 60
    jr_y = 170
    # JR (white) — measure first so we can place ONE after it
    jr_text = "JR"
    jr_bbox = draw.textbbox((jr_x, jr_y), jr_text, font=jr_font)
    draw.text((jr_x, jr_y), jr_text, font=jr_font, fill=WHITE)
    one_x = jr_bbox[2] + 22
    draw.text((one_x, jr_y), "ONE", font=jr_font, fill=GOLD)

    # 8) "ALUMINUM LLC" subtitle in tracked-out gold.
    sub_font = ImageFont.truetype(str(FONT_BOLD), 22)
    # Manual letter-spacing for that wide-tracked feel
    sub_letters = "A L U M I N U M   L L C"
    draw.text((jr_x + 6, jr_y + 145), sub_letters, font=sub_font, fill=GOLD)

    # 9) Gold divider.
    draw.rectangle(
        [jr_x + 6, jr_y + 200, jr_x + 80, jr_y + 203],
        fill=GOLD,
    )

    # 10) Tagline + service line.
    tag_font = ImageFont.truetype(str(FONT_BOLD), 30)
    svc_font = ImageFont.truetype(str(FONT_SEMI), 22)
    draw.text((jr_x + 6, jr_y + 225), "Tampa Bay's Family-Owned", font=tag_font, fill=WHITE)
    draw.text((jr_x + 6, jr_y + 265), "Aluminum Specialty Trade", font=tag_font, fill=WHITE)
    draw.text(
        (jr_x + 6, jr_y + 310),
        "Seamless gutters · Soffit · Fascia · Drainage · Peak 301",
        font=svc_font,
        fill=CREAM,
    )

    # 11) Bottom band: phone + URL on left, "30+ YEARS" badge on right.
    phone_font = ImageFont.truetype(str(FONT_BLACK), 26)
    draw.text((60, H - 70), "(844) 444-3114", font=phone_font, fill=GOLD)
    url_font = ImageFont.truetype(str(FONT_SEMI), 20)
    draw.text((60, H - 38), "jronegutters.com", font=url_font, fill=CREAM)

    # 12) Proof badge on the photo side (right) — gold pill.
    badge_x_center = int(W * 0.81)
    badge_y_center = int(H * 0.5)
    badge_w, badge_h = 220, 120
    bx0 = badge_x_center - badge_w // 2
    by0 = badge_y_center - badge_h // 2
    bx1 = bx0 + badge_w
    by1 = by0 + badge_h
    # Gold outline on dark navy fill
    draw.rounded_rectangle(
        [bx0, by0, bx1, by1],
        radius=14,
        fill=(*NAVY_DEEP, 255),
        outline=GOLD,
        width=3,
    )
    big_font = ImageFont.truetype(str(FONT_BLACK), 56)
    small_font = ImageFont.truetype(str(FONT_SEMI), 14)
    # "30+" big
    big_text = "30+"
    big_bbox = draw.textbbox((0, 0), big_text, font=big_font)
    big_w = big_bbox[2] - big_bbox[0]
    draw.text(
        (badge_x_center - big_w // 2, by0 + 20),
        big_text,
        font=big_font,
        fill=GOLD,
    )
    # "YEARS IN THE TRADE" small
    small_text = "YEARS IN THE TRADE"
    small_bbox = draw.textbbox((0, 0), small_text, font=small_font)
    small_w = small_bbox[2] - small_bbox[0]
    draw.text(
        (badge_x_center - small_w // 2, by0 + 84),
        small_text,
        font=small_font,
        fill=CREAM,
    )

    # 13) Save.
    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT, "PNG", optimize=True)
    size_kb = OUT.stat().st_size // 1024
    print(f"OK  {OUT}  ({size_kb} KB)")
    return 0


if __name__ == "__main__":
    import sys
    sys.exit(main())
