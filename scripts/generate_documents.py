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

Layout note: this reproduces the original 2026-04-08 ReportLab output
position-for-position, including two quirks the original had (see GAP tables).
Do not "tidy" those numbers, they are there so a rebuild is a no-op diff.
"""

import argparse
import re
import sys
import tempfile
from pathlib import Path

from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth

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

# Shared chrome. No founding year is published anywhere in here: the header
# carries the sanctioned tenure line and the footer carries family-owned only.
# See .claude/rules/ jrone brand notes + decisions-log.md 2026-08-07.
TENURE = "Over 30 years in the Tampa Bay gutter industry"
TAGLINE = "The Superior Soffit & Gutter Experts  "
FOOTER_LEGAL = "FL Document Number L10000115561  •  Family-owned and operated"
FOOTER_ADDR = "3420 W Cherry St, Tampa, FL 33607  •  (844) 444-3114  •  info@jronegutters.com"
SIGN_NAME = "Christopher  •  CEO / Owner  •  JR One Aluminum LLC"
SIGN_CONTACT = {
    "en": "Direct: 813-507-3672   •   Office: (844) 444-3114   •   info@jronegutters.com",
    "es": "Directo: 813-507-3672   •   Oficina: (844) 444-3114   •   info@jronegutters.com",
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


def draw_header(c, eyebrow):
    hexcolor(c, NAVY)
    c.rect(0, 714, 612, 78, stroke=0, fill=1)
    hexcolor(c, GOLD_RULE)
    c.rect(0, 711, 612, 3, stroke=0, fill=1)

    hexcolor(c, WHITE)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(LEFT, 754, "JR ONE ALUMINUM LLC")

    hexcolor(c, GOLD_TEXT)
    t = c.beginText(LEFT, 740)
    t.setFont("Helvetica-Oblique", 9)
    t.textOut(TAGLINE)
    t.setFont("ZapfDingbats", 9)
    t.textOut(STAR)
    t.setFont("Helvetica-Oblique", 9)
    t.textOut("  " + TENURE)
    c.drawText(t)

    hexcolor(c, WHITE)
    c.setFont("Helvetica", 9)
    c.drawRightString(RIGHT, 757, "(844) 444-3114")
    hexcolor(c, GOLD_TEXT)
    c.drawRightString(RIGHT, 745, "jronegutters.com")
    hexcolor(c, SLATE)
    c.setFont("Helvetica", 8)
    c.drawRightString(RIGHT, 733, eyebrow)


def draw_footer(c, page_no):
    hexcolor(c, HAIRLINE)
    c.rect(LEFT, 56, BODY_W, 0.7, stroke=0, fill=1)
    hexcolor(c, NAVY)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(LEFT, 42, "JR One Aluminum LLC")
    hexcolor(c, SLATE)
    c.setFont("Helvetica", 8.5)
    c.drawString(LEFT, 30, FOOTER_ADDR)
    c.drawString(LEFT, 18, FOOTER_LEGAL)
    c.setFont("Helvetica-Oblique", 8)
    c.drawRightString(RIGHT, 42, "jronegutters.com")
    c.setFont("Helvetica", 8)
    c.drawRightString(RIGHT, 30, f"Page {page_no}")


def draw_title(c, title, subtitle):
    hexcolor(c, NAVY)
    c.setFont("Helvetica-Bold", 26)
    c.drawCentredString(306, 672, title)
    hexcolor(c, GOLD_RULE)
    c.rect(276, 654, 60, 2.5, stroke=0, fill=1)
    hexcolor(c, SLATE)
    c.setFont("Helvetica-Oblique", 11)
    c.drawCentredString(306, 636, subtitle)


def render(meta, blocks, dest):
    tmpl = meta["template"]
    lang = meta.get("lang", "en")
    gaps = GAPS[tmpl]

    c = canvas.Canvas(str(dest), pagesize=(PAGE_W, PAGE_H))
    page_no = 1
    draw_header(c, meta["eyebrow"])
    draw_title(c, meta["title"], meta["subtitle"])
    y = LEAD_START_Y[tmpl]
    prev = None
    quirk_due = False   # first body -> subhead step on a continuation page

    for b in blocks:
        kind = b["kind"]

        if kind == "pagebreak":
            draw_footer(c, page_no)
            c.showPage()
            page_no += 1
            draw_header(c, meta["eyebrow"])
            y = CONTINUATION_START_Y
            prev = None
            quirk_due = tmpl == "guide"
            continue

        if prev is not None:
            gap = gaps[(prev, kind)]
            if quirk_due and prev == "body" and kind == "subhead":
                gap = GUIDE_CONTINUATION_BODY_SUBHEAD
                quirk_due = False
            y -= gap

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
            c.drawString(LEFT, y - 22, SIGN_NAME)
            hexcolor(c, SLATE)
            c.setFont("Helvetica", 9)
            c.drawString(LEFT, y - 36, SIGN_CONTACT[lang])
            y -= 36

        else:
            raise SystemExit(f"unknown block ::{kind} in {meta['output']}")

        prev = kind

    draw_footer(c, page_no)
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
