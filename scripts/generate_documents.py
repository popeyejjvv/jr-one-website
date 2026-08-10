#!/usr/bin/env python3
"""Build the JR One branded PDFs served from /public/documents.

The warranty and care-guide PDFs used to exist only as binaries with no source,
so correcting a single line of text meant hand-editing a PDF. This script is the
fix: the words live in scripts/documents/*.md and the PDF is a build artifact.

Run from /Users/popeye/Desktop/JRONE/jr-one-website:
    npm run build:documents
    # or
    python3 scripts/generate_documents.py

Add --check (npm run check:documents) to build into a temp dir and diff against
what is committed in public/documents instead of overwriting it.

Layout note: this started as a position-for-position reproduction of the original
2026-04-08 ReportLab output, quirks included (see GAP tables), so that a rebuild
was a provable no-op. Do not "tidy" those numbers. Two deliberate departures now
exist, both of them defect fixes rather than taste, and both gated in code:
assert_header_fits() for the header bar and fit_page() for the footer.
"""

import argparse
import re
import sys
import tempfile
from pathlib import Path

from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import getAscent, getDescent, stringWidth

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts" / "documents"
OUT = ROOT / "public" / "documents"

PAGE_W, PAGE_H = 612, 792

# Brand colours, sampled from the 2026-04-08 originals. The gold used for rules
# (#C8952E) is deliberately not the same as the gold used for header text
# (#D4A843); both are kept as-is.
NAVY = "#1B2A4A"
GOLD_RULE = "#C8952E"
GOLD_TEXT = "#D4A843"
SLATE = "#7A8FA8"
BODY = "#2D2D2D"
CREAM = "#FAF7F1"
HAIRLINE = "#D8D8D8"
WHITE = "#FFFFFF"

LEFT = 54.0
RIGHT = 558.0
BODY_W = 504.0          # LEFT -> RIGHT
ITEM_X = 78.0
ITEM_W = 480.0          # ITEM_X -> RIGHT
CALLOUT_X = 74.0
CALLOUT_W = 470.0

STAR = "★"         # ReportLab maps this to ZapfDingbats 0x48, the black star

# Shared chrome, per language. A Spanish document is Spanish all the way through,
# including the parts that are not in the markdown. What deliberately does NOT
# translate: the company name, the street address, the phone, the email and the
# domain are facts, and the FL document number is a state identifier.
#
# No founding year is published anywhere in here: the header carries the
# sanctioned tenure line and the footer carries family-owned only.
# See .claude/rules/ jrone brand notes + decisions-log.md 2026-08-07.
TENURE = {
    "en": "Over 30 years in the Tampa Bay gutter industry",
    "es": "Más de 30 años en la industria de canaletas de Tampa Bay",
}
TAGLINE = {
    "en": "The Superior Soffit & Gutter Experts  ",
    "es": "Expertos Superiores en Sofito y Canaletas  ",
}
FOOTER_LEGAL = {
    "en": "FL Document Number L10000115561  •  Family-owned and operated",
    "es": "Número de documento de Florida L10000115561  •  Empresa familiar",
}
PAGE_WORD = {"en": "Page", "es": "Página"}
FOOTER_ADDR = "3420 W Cherry St, Tampa, FL 33607  •  (844) 444-3114  •  info@jronegutters.com"
HEADER_RIGHT_PHONE = "(844) 444-3114"
HEADER_RIGHT_DOMAIN = "jronegutters.com"
HEADER_MIN_CLEARANCE = 10.0   # points the tagline must keep clear of the right block

# Header baselines. The eyebrow used to sit at 733, seven points under the
# tagline, which was only survivable because the English tagline is short enough
# to end well left of it. The Spanish tagline is longer and ran straight into it,
# so the eyebrow gets its own line and the two can no longer touch whatever the
# copy does. Both are inside the navy bar, which spans y 714 to 792.
TAGLINE_Y = 740.0
EYEBROW_Y = 722.0
# These are templates sent to every customer, not executed instruments, so the
# block under the rule carries a title rather than a person's signature.
SIGN_TITLE = {
    "en": "Owner, JR One Aluminum LLC",
    "es": "Propietario, JR One Aluminum LLC",
}
# One published phone number, (844) 444-3114. The old direct mobile line was
# removed 2026-08-10 so a customer-facing PDF cannot route around it.
SIGN_CONTACT = {
    "en": "Office: (844) 444-3114   •   info@jronegutters.com",
    "es": "Oficina: (844) 444-3114   •   info@jronegutters.com",
}

# Vertical gaps, in points, between the baseline of the last line of the
# previous block and the baseline of the first line of the next one.
GAPS = {
    "warranty": {
        ("lead", "section"): 34,
        ("section", "item"): 28,
        ("item", "item"): 27,
        ("item", "section"): 33,
        ("section", "body"): 28,
        ("body", "callout"): 31,
        ("callout", "note"): 16,
        ("note", "signature"): 28,
    },
    "guide": {
        ("lead", "section"): 34,
        ("section", "body"): 28,
        ("body", "subhead"): 27,
        ("subhead", "body"): 14,
        ("subhead", "item"): 16,
        ("item", "item"): 23,
        ("item", "callout"): 27,
        ("callout", "callout"): 20,
    },
}

# The original emitted 29 rather than 27 for the first body -> subhead step on a
# continuation page, in both the English and Spanish guide. Kept so a rebuild
# does not move the rest of page 2 by two points.
GUIDE_CONTINUATION_BODY_SUBHEAD = 29

LEAD_START_Y = {"warranty": 602.0, "guide": 606.0}
CONTINUATION_START_Y = 672.0     # section head y at the top of a later page

# Footer clearance. The footer hairline sits at y=56 and its first text baseline
# at y=42, so anything a page draws below FOOTER_FLOOR lands on the footer. Each
# page is measured before it is drawn; a page that would cross the floor is first
# started higher (CONTINUATION_TIGHT_Y, still clear of the gold rule at y=711)
# and then, if that is not enough, has its inter-block gaps scaled down until it
# fits. A page that already fits is drawn exactly as before, scale 1.0.
FOOTER_FLOOR = 68.0
CONTINUATION_TIGHT_Y = 694.0
MIN_GAP_SCALE = 0.75             # below this the copy is too long, fail the build

LEADING = {"lead": 16.0, "body": 15.0, "item": 15.0, "callout": 14.0}
CALLOUT_PARA_GAP = 18.0
CALLOUT_TOP_PAD = 18.0


def hexcolor(c, h):
    c.setFillColorRGB(int(h[1:3], 16) / 255, int(h[3:5], 16) / 255, int(h[5:7], 16) / 255)


def wrap(text, font, size, width):
    """Greedy wrap, same algorithm and metrics the original used."""
    words, lines, cur = text.split(" "), [], ""
    for w in words:
        trial = w if not cur else cur + " " + w
        if stringWidth(trial, font, size) <= width or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def parse(path):
    raw = path.read_text(encoding="utf-8")
    head, _, rest = raw.partition("\n---\n")
    meta = {}
    for line in head.strip().splitlines():
        k, _, v = line.partition(":")
        meta[k.strip()] = v.strip()

    blocks, cur = [], None
    for line in rest.splitlines():
        m = re.match(r"^::(\w+)(?:\s+(.*))?$", line)
        if m:
            kind, arg = m.group(1), (m.group(2) or "").strip()
            cur = {"kind": kind, "arg": arg, "paras": [""]}
            blocks.append(cur)
            continue
        if cur is None:
            continue
        if line.strip() == "--":
            cur["paras"].append("")
        elif line.strip():
            cur["paras"][-1] = (cur["paras"][-1] + " " + line.strip()).strip()
    for b in blocks:
        b["paras"] = [p for p in b["paras"] if p]
    return meta, blocks


def assert_header_fits(lang, eyebrow):
    """Build-time gate on the header bar.

    The tagline runs left to right under the company name while the phone, the
    domain and the eyebrow are right-aligned in the same bar. Translating the
    tagline makes it longer, so this fails the build rather than letting somebody
    find the overlap in a customer's PDF.
    """
    end = LEFT + (
        stringWidth(TAGLINE[lang], "Helvetica-Oblique", 9)
        + stringWidth(STAR, "ZapfDingbats", 9)
        + stringWidth("  " + TENURE[lang], "Helvetica-Oblique", 9)
    )
    right_block = RIGHT - max(
        stringWidth(HEADER_RIGHT_PHONE, "Helvetica", 9),
        stringWidth(HEADER_RIGHT_DOMAIN, "Helvetica", 9),
    )
    clear = right_block - end
    if clear < HEADER_MIN_CLEARANCE:
        raise SystemExit(
            f"header tagline for lang={lang} ends at x={end:.1f}, only {clear:.1f}pt "
            f"clear of the phone and domain block at x={right_block:.1f} "
            f"(minimum {HEADER_MIN_CLEARANCE}pt). Shorten TAGLINE or TENURE."
        )

    # The eyebrow is only safe because it sits on its own baseline. If anybody
    # moves it back up next to the tagline, say so here instead of shipping it.
    tagline_bottom = TAGLINE_Y + getDescent("Helvetica-Oblique", 9)   # descent is negative
    eyebrow_top = EYEBROW_Y + getAscent("Helvetica", 8)
    if eyebrow_top >= tagline_bottom:
        eb_start = RIGHT - stringWidth(eyebrow, "Helvetica", 8)
        if eb_start - end < HEADER_MIN_CLEARANCE:
            raise SystemExit(
                f'header eyebrow "{eyebrow}" starts at x={eb_start:.1f} and shares a '
                f"line with a tagline ending at x={end:.1f}. Separate the baselines "
                f"or shorten one of them."
            )


def draw_header(c, eyebrow, lang):
    hexcolor(c, NAVY)
    c.rect(0, 714, 612, 78, stroke=0, fill=1)
    hexcolor(c, GOLD_RULE)
    c.rect(0, 711, 612, 3, stroke=0, fill=1)

    hexcolor(c, WHITE)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(LEFT, 754, "JR ONE ALUMINUM LLC")

    hexcolor(c, GOLD_TEXT)
    t = c.beginText(LEFT, TAGLINE_Y)
    t.setFont("Helvetica-Oblique", 9)
    t.textOut(TAGLINE[lang])
    t.setFont("ZapfDingbats", 9)
    t.textOut(STAR)
    t.setFont("Helvetica-Oblique", 9)
    t.textOut("  " + TENURE[lang])
    c.drawText(t)

    hexcolor(c, WHITE)
    c.setFont("Helvetica", 9)
    c.drawRightString(RIGHT, 757, HEADER_RIGHT_PHONE)
    hexcolor(c, GOLD_TEXT)
    c.drawRightString(RIGHT, 745, HEADER_RIGHT_DOMAIN)
    hexcolor(c, SLATE)
    c.setFont("Helvetica", 8)
    c.drawRightString(RIGHT, EYEBROW_Y, eyebrow)


def draw_footer(c, page_no, lang):
    hexcolor(c, HAIRLINE)
    c.rect(LEFT, 56, BODY_W, 0.7, stroke=0, fill=1)
    hexcolor(c, NAVY)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(LEFT, 42, "JR One Aluminum LLC")
    hexcolor(c, SLATE)
    c.setFont("Helvetica", 8.5)
    c.drawString(LEFT, 30, FOOTER_ADDR)
    c.drawString(LEFT, 18, FOOTER_LEGAL[lang])
    c.setFont("Helvetica-Oblique", 8)
    c.drawRightString(RIGHT, 42, HEADER_RIGHT_DOMAIN)
    c.setFont("Helvetica", 8)
    c.drawRightString(RIGHT, 30, f"{PAGE_WORD[lang]} {page_no}")


def draw_title(c, title, subtitle):
    hexcolor(c, NAVY)
    c.setFont("Helvetica-Bold", 26)
    c.drawCentredString(306, 672, title)
    hexcolor(c, GOLD_RULE)
    c.rect(276, 654, 60, 2.5, stroke=0, fill=1)
    hexcolor(c, SLATE)
    c.setFont("Helvetica-Oblique", 11)
    c.drawCentredString(306, 636, subtitle)


def split_pages(blocks):
    pages = [[]]
    for b in blocks:
        if b["kind"] == "pagebreak":
            pages.append([])
        else:
            pages[-1].append(b)
    return pages


class _Measure:
    """Stand-in canvas for the measure pass. Every draw call is a no-op, so the
    measurement runs through the identical placement code the drawing does and
    cannot drift from it."""

    def __getattr__(self, _):
        return lambda *a, **k: None


def run_page(c, blocks, meta, tmpl, gaps, lang, start_y, is_continuation, gap_scale):
    """Lay one page out on canvas c, return the lowest y any ink reached."""
    y = start_y
    lowest = y
    prev = None
    quirk_due = is_continuation and tmpl == "guide"

    for b in blocks:
        kind = b["kind"]

        if prev is not None:
            gap = gaps[(prev, kind)]
            if quirk_due and prev == "body" and kind == "subhead":
                gap = GUIDE_CONTINUATION_BODY_SUBHEAD
                quirk_due = False
            y -= gap * gap_scale

        if kind == "section":
            hexcolor(c, NAVY)
            c.setFont("Helvetica-Bold", 13)
            c.drawString(LEFT, y, b["arg"])
            hexcolor(c, GOLD_RULE)
            c.rect(LEFT, y - 6, 48, 2, stroke=0, fill=1)

        elif kind == "subhead":
            hexcolor(c, NAVY)
            c.setFont("Helvetica-Bold", 10.5)
            c.drawString(LEFT, y, b["arg"])

        elif kind in ("lead", "body"):
            size = 11 if kind == "lead" else 10.5
            hexcolor(c, BODY)
            c.setFont("Helvetica", size)
            for i, line in enumerate(wrap(b["paras"][0], "Helvetica", size, BODY_W)):
                if i:
                    y -= LEADING[kind]
                c.drawString(LEFT, y, line)

        elif kind == "item":
            hexcolor(c, NAVY)
            c.setFont("Helvetica-Bold", 11)
            c.drawString(LEFT, y, b["arg"] + ".")
            hexcolor(c, BODY)
            c.setFont("Helvetica", 10.5)
            for i, line in enumerate(wrap(b["paras"][0], "Helvetica", 10.5, ITEM_W)):
                if i:
                    y -= LEADING["item"]
                c.drawString(ITEM_X, y, line)

        elif kind == "callout":
            top = y
            wrapped = [wrap(p, "Helvetica", 10.5, CALLOUT_W) for p in b["paras"]]
            ly = top - CALLOUT_TOP_PAD
            baselines = []
            for pi, plines in enumerate(wrapped):
                if pi:
                    ly -= CALLOUT_PARA_GAP
                for li, _ in enumerate(plines):
                    if li:
                        ly -= LEADING["callout"]
                    baselines.append(ly)
            bottom = ly - (29 + 2 * (len(wrapped) - 1))
            hexcolor(c, CREAM)
            c.rect(LEFT, bottom, BODY_W, top - bottom, stroke=0, fill=1)
            hexcolor(c, GOLD_RULE)
            c.rect(LEFT, bottom, 4, top - bottom, stroke=0, fill=1)
            hexcolor(c, BODY)
            c.setFont("Helvetica", 10.5)
            flat = [l for p in wrapped for l in p]
            for by, line in zip(baselines, flat):
                c.drawString(CALLOUT_X, by, line)
            y = bottom

        elif kind == "note":
            hexcolor(c, SLATE)
            c.setFont("Helvetica-Oblique", 9)
            c.drawString(LEFT, y, b["paras"][0])

        elif kind == "signature":
            hexcolor(c, HAIRLINE)
            c.rect(LEFT, y, BODY_W, 0.6, stroke=0, fill=1)
            hexcolor(c, NAVY)
            c.setFont("Helvetica-Bold", 10)
            c.drawString(LEFT, y - 22, SIGN_TITLE[lang])
            hexcolor(c, SLATE)
            c.setFont("Helvetica", 9)
            c.drawString(LEFT, y - 36, SIGN_CONTACT[lang])
            y -= 36

        else:
            raise SystemExit(f"unknown block ::{kind} in {meta['output']}")

        lowest = min(lowest, y)
        prev = kind

    return lowest


def fit_page(blocks, meta, tmpl, gaps, lang, is_continuation):
    """Pick a start y and a gap scale that keep this page clear of the footer.

    A page that already fits comes back (nominal start, 1.0) and is drawn exactly
    as it always was. Everything below the first return is only reached by a page
    that would otherwise collide with the footer.
    """
    def low(start, scale):
        return run_page(_Measure(), blocks, meta, tmpl, gaps, lang,
                        start, is_continuation, scale)

    start = CONTINUATION_START_Y if is_continuation else LEAD_START_Y[tmpl]
    if low(start, 1.0) >= FOOTER_FLOOR:
        return start, 1.0

    if is_continuation:
        start = CONTINUATION_TIGHT_Y
        if low(start, 1.0) >= FOOTER_FLOOR:
            return start, 1.0

    # lowest(scale) is linear in scale: no gap depends on y, and no wrap depends
    # on a gap. Two probes give the intercept and the slope, so solve it directly.
    at_zero, at_one = low(start, 0.0), low(start, 1.0)
    gap_total = at_zero - at_one
    if gap_total <= 0:
        raise SystemExit(f"{meta['output']}: a page is too tall to fit even with no gaps")
    scale = (at_zero - FOOTER_FLOOR) / gap_total
    if scale < MIN_GAP_SCALE:
        raise SystemExit(
            f"{meta['output']}: a page needs its gaps at {scale:.2f} to clear the "
            f"footer, below the {MIN_GAP_SCALE} floor. Shorten the copy or split the page."
        )
    return start, scale


def render(meta, blocks, dest):
    tmpl = meta["template"]
    lang = meta.get("lang", "en")
    gaps = GAPS[tmpl]
    assert_header_fits(lang, meta["eyebrow"])

    c = canvas.Canvas(str(dest), pagesize=(PAGE_W, PAGE_H))
    for page_no, page in enumerate(split_pages(blocks), start=1):
        is_continuation = page_no > 1
        if is_continuation:
            c.showPage()
        draw_header(c, meta["eyebrow"], lang)
        if not is_continuation:
            draw_title(c, meta["title"], meta["subtitle"])
        start, scale = fit_page(page, meta, tmpl, gaps, lang, is_continuation)
        run_page(c, page, meta, tmpl, gaps, lang, start, is_continuation, scale)
        draw_footer(c, page_no, lang)
    c.save()


def sources():
    return [p for p in sorted(SRC.glob("*.md")) if p.name != "README.md"]


def build(dest_dir):
    dest_dir.mkdir(parents=True, exist_ok=True)
    made = []
    for src in sources():
        meta, blocks = parse(src)
        if "output" not in meta:
            raise SystemExit(f"{src.name}: front matter is missing 'output:'")
        out = dest_dir / meta["output"]
        render(meta, blocks, out)
        made.append(out)
        print(f"  built {out.name}")
    return made


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true",
                    help="build to a temp dir and diff page text against public/documents")
    args = ap.parse_args()

    if not args.check:
        print(f"Building {len(sources())} documents into {OUT}")
        build(OUT)
        return 0

    import fitz
    with tempfile.TemporaryDirectory() as td:
        made = build(Path(td))
        bad = 0
        for f in made:
            live = OUT / f.name
            if not live.exists():
                print(f"  MISSING in public/documents: {f.name}")
                bad += 1
                continue
            a = "\n".join(p.get_text() for p in fitz.open(str(f)))
            b = "\n".join(p.get_text() for p in fitz.open(str(live)))
            if a != b:
                print(f"  DRIFT: {f.name} differs from the committed PDF")
                bad += 1
        print("check: OK" if not bad else f"check: {bad} problem(s)")
        return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
