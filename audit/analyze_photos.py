#!/usr/bin/env python3
"""
analyze_photos.py -- download every displayed CompanyCam photo and extract
deterministic safety signals (dimensions, EXIF camera data, aspect ratio).

Reads audit/displayed-photos.json, downloads each `web` URL into audit/photos/,
and writes audit/photo-analysis.json with per-photo signal flags.

Signals:
  has_camera_exif : True if EXIF carries a camera Make/Model (real phone/camera photo)
  software        : EXIF Software tag (e.g. "CompanyCam Android", screenshot tools)
  has_gps         : True if GPS data present (real on-site capture)
  width,height    : pixel dimensions of the (web) asset
  aspect          : width/height
  flag_no_exif    : no camera EXIF at all -> screenshot/upload/document candidate
  flag_doc_aspect : tall portrait ratio typical of a photographed document/work order
  flag_screenshot_dims : dimensions match common phone screen resolutions
Plain ASCII only.
"""
import json, os, sys, io, concurrent.futures, urllib.request
from PIL import Image, ExifTags

HERE = os.path.dirname(os.path.abspath(__file__))
PHOTOS_DIR = os.path.join(HERE, "photos")
os.makedirs(PHOTOS_DIR, exist_ok=True)

EXIF_TAGS = {v: k for k, v in ExifTags.TAGS.items()}
MAKE = EXIF_TAGS.get("Make")
MODEL = EXIF_TAGS.get("Model")
SOFTWARE = EXIF_TAGS.get("Software")
GPSINFO = EXIF_TAGS.get("GPSInfo")
ORIENTATION = EXIF_TAGS.get("Orientation")

# Common phone screen resolutions (portrait + landscape) that indicate a screenshot.
SCREEN_DIMS = {
    (1170, 2532), (2532, 1170), (1284, 2778), (2778, 1284), (1080, 2340), (2340, 1080),
    (1080, 2400), (2400, 1080), (1125, 2436), (2436, 1125), (828, 1792), (1792, 828),
    (1080, 1920), (1920, 1080), (1440, 3200), (3200, 1440), (1080, 2280), (2280, 1080),
    (750, 1334), (1334, 750), (1242, 2688), (2688, 1242),
}

def fetch(rec):
    pid = str(rec["id"]).replace("/", "_")
    dest = os.path.join(PHOTOS_DIR, pid + ".jpg")
    url = rec.get("web") or rec.get("original")
    out = {"id": rec["id"], "projectId": rec.get("projectId"),
           "projectName": rec.get("projectName", ""), "source": rec.get("source"),
           "tags": rec.get("tags"), "pages": rec.get("pages"), "file": pid + ".jpg",
           "url": url, "ok": False}
    try:
        if not os.path.exists(dest) or os.path.getsize(dest) == 0:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            data = urllib.request.urlopen(req, timeout=30).read()
            with open(dest, "wb") as f:
                f.write(data)
        else:
            data = open(dest, "rb").read()
        im = Image.open(io.BytesIO(data))
        w, h = im.size
        out["width"], out["height"] = w, h
        out["aspect"] = round(w / h, 3) if h else None
        exif = None
        try:
            exif = im._getexif()
        except Exception:
            exif = None
        make = model = sw = None
        has_gps = False
        if exif:
            make = exif.get(MAKE)
            model = exif.get(MODEL)
            sw = exif.get(SOFTWARE)
            gps = exif.get(GPSINFO)
            has_gps = bool(gps)
        out["make"] = str(make).strip() if make else None
        out["model"] = str(model).strip() if model else None
        out["software"] = str(sw).strip() if sw else None
        out["has_gps"] = has_gps
        out["has_camera_exif"] = bool(make or model)
        out["flag_no_exif"] = not bool(make or model)
        out["flag_doc_aspect"] = bool(out["aspect"] and out["aspect"] < 0.62)  # tall doc/screenshot
        out["flag_screenshot_dims"] = (w, h) in SCREEN_DIMS
        # EXIF Orientation: 1 = normal. 3 = rotated 180 (upside down), 6/8 = sideways.
        # CompanyCam's web asset does not always bake the rotation in, so a non-1 value
        # is a strong "renders wrong on the site" signal (2026-07-16 upside-down incident).
        orientation = exif.get(ORIENTATION) if exif else None
        out["exif_orientation"] = orientation
        out["flag_bad_orientation"] = orientation in (3, 4, 5, 6, 7, 8)
        out["ok"] = True
    except Exception as e:
        out["error"] = str(e)
    return out

def main():
    src = json.load(open(os.path.join(HERE, "displayed-photos.json")))
    photos = src["photos"]
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=16) as ex:
        for i, r in enumerate(ex.map(fetch, photos)):
            results.append(r)
            if (i + 1) % 50 == 0:
                print(f"  ...{i+1}/{len(photos)}", file=sys.stderr)
    ok = [r for r in results if r["ok"]]
    bad = [r for r in results if not r["ok"]]
    summary = {
        "total": len(results), "downloaded_ok": len(ok), "failed": len(bad),
        "no_camera_exif": sum(1 for r in ok if r.get("flag_no_exif")),
        "doc_aspect": sum(1 for r in ok if r.get("flag_doc_aspect")),
        "screenshot_dims": sum(1 for r in ok if r.get("flag_screenshot_dims")),
        "has_gps": sum(1 for r in ok if r.get("has_gps")),
    }
    json.dump({"summary": summary, "photos": results},
              open(os.path.join(HERE, "photo-analysis.json"), "w"), indent=1)
    print(json.dumps(summary, indent=2))

if __name__ == "__main__":
    main()
