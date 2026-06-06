#!/usr/bin/env python3
"""
build_sheets.py -- tile downloaded photos into labeled contact sheets for vision review.
Each tile shows a burned-in global INDEX, the source (inv/live), and truncated project name,
so a vision pass can classify each photo by index. Output: audit/sheets/sheet_NN.jpg +
audit/sheet-index.json (global_index -> {id, file, projectName, source, pages}).
Plain ASCII only.
"""
import json, os, math
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
PHOTOS = os.path.join(HERE, "photos")
SHEETS = os.path.join(HERE, "sheets")
os.makedirs(SHEETS, exist_ok=True)

TILE = 380          # image area per tile
HEADER = 34         # label bar height
COLS = 4
ROWS = 4            # 16 tiles per sheet
PAD = 6
CELL_W = TILE + PAD
CELL_H = TILE + HEADER + PAD

def font(sz):
    for p in ["/System/Library/Fonts/Supplemental/Arial Bold.ttf",
              "/System/Library/Fonts/Helvetica.ttc",
              "/Library/Fonts/Arial.ttf"]:
        if os.path.exists(p):
            try: return ImageFont.truetype(p, sz)
            except Exception: pass
    return ImageFont.load_default()

F_IDX = font(20)
F_LBL = font(13)

def main():
    analysis = json.load(open(os.path.join(HERE, "photo-analysis.json")))
    photos = [p for p in analysis["photos"] if p.get("ok")]
    index_map = {}
    sheet_count = math.ceil(len(photos) / (COLS * ROWS))
    for s in range(sheet_count):
        chunk = photos[s * COLS * ROWS:(s + 1) * COLS * ROWS]
        sheet = Image.new("RGB", (COLS * CELL_W + PAD, ROWS * CELL_H + PAD), (24, 24, 28))
        draw = ImageDraw.Draw(sheet)
        for i, p in enumerate(chunk):
            gidx = s * COLS * ROWS + i
            index_map[gidx] = {"id": p["id"], "file": p["file"], "projectName": p.get("projectName", ""),
                               "source": p.get("source"), "pages": p.get("pages"),
                               "has_gps": p.get("has_gps"), "flag_no_exif": p.get("flag_no_exif"),
                               "aspect": p.get("aspect")}
            col, row = i % COLS, i // COLS
            x0 = PAD + col * CELL_W
            y0 = PAD + row * CELL_H
            # header bar
            src = (p.get("source") or "?")[:3]
            nm = (p.get("projectName") or "")[:34]
            draw.rectangle([x0, y0, x0 + TILE, y0 + HEADER], fill=(11, 22, 42))
            draw.text((x0 + 6, y0 + 2), f"#{gidx}", font=F_IDX, fill=(200, 149, 46))
            draw.text((x0 + 64, y0 + 9), f"[{src}] {nm}", font=F_LBL, fill=(230, 230, 230))
            # image
            try:
                im = Image.open(os.path.join(PHOTOS, p["file"])).convert("RGB")
                im.thumbnail((TILE, TILE))
                ox = x0 + (TILE - im.width) // 2
                oy = y0 + HEADER + (TILE - im.height) // 2
                sheet.paste(im, (ox, oy))
            except Exception as e:
                draw.text((x0 + 10, y0 + HEADER + 10), f"ERR {e}", font=F_LBL, fill=(255, 80, 80))
        out = os.path.join(SHEETS, f"sheet_{s:02d}.jpg")
        sheet.save(out, quality=88)
    json.dump(index_map, open(os.path.join(HERE, "sheet-index.json"), "w"), indent=1)
    print(f"wrote {sheet_count} sheets ({len(photos)} photos) to audit/sheets/")
    print(f"index map: audit/sheet-index.json")

if __name__ == "__main__":
    main()
