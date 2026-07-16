// vision_review_manifest.mjs -- checkpointed vision review of audit/sheets/*.jpg
// for the full-catalog gallery manifest (2026-07-16).
//
// Why this exists: the interactive-session review kept dying on 529 Overloaded.
// This script calls the Anthropic API directly, one sheet per request, with
// exponential backoff on 429/5xx/529 and a checkpoint file per sheet
// (audit/verdicts/manifest-sheet-SSS.json). Kill it / crash it / rerun it --
// completed sheets are skipped, so progress only ever moves forward.
//
// Run from website root:  node audit/vision_review_manifest.mjs
// Resume after any failure: same command.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SHEETS = path.join(HERE, "sheets");
const OUT = path.join(HERE, "verdicts");
const LOG = path.join(HERE, "vision-review.log");
fs.mkdirSync(OUT, { recursive: true });

// API key from the Jarvis fork env (same key photo_gate.py uses). Never printed.
const ENV_PATH = "/Users/popeye/Desktop/EAPOPEYE/projects/popeye-jarvis/fork/.env";
let API_KEY = process.env.ANTHROPIC_API_KEY || "";
if (!API_KEY) {
  for (const line of fs.readFileSync(ENV_PATH, "utf8").split("\n")) {
    const m = line.match(/^\s*ANTHROPIC_API_KEY\s*=\s*(.+)\s*$/);
    if (m) API_KEY = m[1].replace(/^["']|["']$/g, "");
  }
}
if (!API_KEY) { console.error("no ANTHROPIC_API_KEY found"); process.exit(1); }

const MODEL = "claude-sonnet-5";
const CONCURRENCY = 3;
const TILES_PER_SHEET = 16;

const idx = JSON.parse(fs.readFileSync(path.join(HERE, "sheet-index.json"), "utf8"));
const total = Object.keys(idx).length;
const sheetCount = Math.ceil(total / TILES_PER_SHEET);

const log = (msg) => {
  const line = `${new Date().toISOString()} ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG, line + "\n");
};

const CLASSES = ["SAFE", "UNSAFE-UNPROFESSIONAL", "UNSAFE-PII", "UNSAFE-INTERNAL", "UNSAFE-ORIENTATION"];

const SYSTEM = `You review contractor job-site photos for the public website gallery of JR One Aluminum, a Tampa gutter / soffit / fascia / siding company. You receive a contact sheet of up to 16 photo tiles. Each tile has a dark header bar with a gold "#N" global index number. Classify EVERY tile by its # index.

Classes:
- SAFE: a finished, professional exterior-work photo a homeowner should see in a contractor's public gallery. Clean seamless gutters, leaf guards, soffit, fascia, siding, copper work, or drainage on a tidy home. Deliberate framing, in focus, reasonably level, work is the clear subject.
- UNSAFE-UNPROFESSIONAL: work in progress (ladders, workers, tools, tarps, open fascia, exposed framing, debris, material piles), roof-top POV shots, junk/clutter-dominant scenes (trash bins, water heaters, cluttered yards), blurry / badly exposed / sky-dominant / crooked snapshots, vehicles as subject, random corners with no visible finished work.
- UNSAFE-PII: any readable face, person, license plate, document, phone/computer screen, or clearly readable house number as the subject.
- UNSAFE-INTERNAL: paperwork, sketches, measurements, screenshots, burned-in timestamp/GPS overlays, supplier invoices -- internal-use images.
- UNSAFE-ORIENTATION: image is rotated sideways or upside down.

Judgment bar: this gallery sells the company. A photo must look like it was taken ON PURPOSE to show off finished work. When in doubt, classify UNSAFE-UNPROFESSIONAL -- the gallery fails closed.

Respond with ONLY valid JSON, no markdown fences, in exactly this shape:
{"verdicts":[{"index":<number>,"class":"<one of ${CLASSES.join("|")}>","reason":"<max 10 words>","confidence":<0.0-1.0>}]}
Include every index visible on the sheet exactly once.`;

function expectedIndexes(s) {
  const out = [];
  for (let g = s * TILES_PER_SHEET; g < Math.min((s + 1) * TILES_PER_SHEET, total); g++) {
    if (idx[String(g)]) out.push(g);
  }
  return out;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callAPI(body, attempt = 0) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 240000);
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
      signal: ctl.signal,
    });
    if (r.status === 429 || r.status >= 500) {
      // includes 529 Overloaded -- the exact error class that killed the live session
      const wait = Math.min(5000 * 2 ** attempt, 120000);
      log(`  API ${r.status}, backing off ${Math.round(wait / 1000)}s (attempt ${attempt + 1})`);
      if (attempt >= 9) throw new Error(`giving up after ${attempt + 1} attempts (${r.status})`);
      await sleep(wait);
      return callAPI(body, attempt + 1);
    }
    if (!r.ok) throw new Error(`API ${r.status}: ${(await r.text()).slice(0, 200)}`);
    return r.json();
  } catch (e) {
    if (e.name === "AbortError" || e.message?.includes("fetch failed")) {
      const wait = Math.min(5000 * 2 ** attempt, 120000);
      log(`  network/timeout, backing off ${Math.round(wait / 1000)}s (attempt ${attempt + 1})`);
      if (attempt >= 9) throw e;
      await sleep(wait);
      return callAPI(body, attempt + 1);
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

function parseVerdicts(text, expected) {
  const raw = text.replace(/```json|```/g, "").trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end < 0) throw new Error("no JSON object in response");
  const j = JSON.parse(raw.slice(start, end + 1));
  if (!Array.isArray(j.verdicts)) throw new Error("no verdicts array");
  const seen = new Map();
  for (const v of j.verdicts) {
    if (typeof v.index !== "number" || !CLASSES.includes(v.class)) throw new Error(`bad verdict: ${JSON.stringify(v)}`);
    seen.set(v.index, v);
  }
  const missing = expected.filter((g) => !seen.has(g));
  if (missing.length) throw new Error(`missing indexes: ${missing.join(",")}`);
  return expected.map((g) => seen.get(g));
}

async function reviewSheet(s) {
  const file = path.join(OUT, `manifest-sheet-${String(s).padStart(3, "0")}.json`);
  const expected = expectedIndexes(s);
  if (!expected.length) return "empty";
  if (fs.existsSync(file)) {
    try {
      const j = JSON.parse(fs.readFileSync(file, "utf8"));
      if ((j.verdicts || []).length === expected.length) return "skip";
    } catch { /* rewrite */ }
  }
  const img = fs.readFileSync(path.join(SHEETS, `sheet_${String(s).padStart(2, "0")}.jpg`)).toString("base64");
  const body = {
    model: MODEL,
    max_tokens: 3000,
    system: SYSTEM,
    messages: [{
      role: "user",
      content: [
        { type: "image", source: { type: "base64", media_type: "image/jpeg", data: img } },
        { type: "text", text: `Contact sheet ${s}. Expected tile indexes: ${expected.join(", ")}. Classify each.` },
      ],
    }],
  };
  for (let contentTry = 0; contentTry < 3; contentTry++) {
    const resp = await callAPI(body);
    const text = (resp.content || []).filter((c) => c.type === "text").map((c) => c.text).join("");
    try {
      const verdicts = parseVerdicts(text, expected);
      fs.writeFileSync(file, JSON.stringify({ sheet: s, model: MODEL, verdicts }, null, 1));
      return "done";
    } catch (e) {
      log(`  sheet ${s} parse fail (${e.message}), content retry ${contentTry + 1}`);
      fs.writeFileSync(path.join(HERE, `debug-sheet-${s}-try${contentTry}.txt`), text);
    }
  }
  throw new Error(`sheet ${s}: unparseable after 3 tries`);
}

// Sheet filenames are zero-padded to 2 (sheet_00 .. sheet_234 -> width varies); detect actual names.
const sheetFiles = fs.readdirSync(SHEETS).filter((f) => f.startsWith("sheet_") && f.endsWith(".jpg"));
const sheetNums = sheetFiles.map((f) => parseInt(f.match(/sheet_(\d+)\.jpg/)[1], 10)).sort((a, b) => a - b);

log(`START review: ${total} tiles across ${sheetNums.length} sheets (expected ${sheetCount}), model ${MODEL}, concurrency ${CONCURRENCY}`);

const queue = [...sheetNums];
let done = 0, skipped = 0, failed = [];
async function worker(wid) {
  while (queue.length) {
    const s = queue.shift();
    try {
      const res = await reviewSheet(s);
      if (res === "skip") skipped++;
      else { done++; log(`sheet ${s} ${res} [w${wid}] (${done + skipped}/${sheetNums.length})`); }
    } catch (e) {
      failed.push(s);
      log(`sheet ${s} FAILED: ${e.message}`);
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i)));
log(`FINISHED: ${done} reviewed, ${skipped} already done, ${failed.length} failed${failed.length ? " -> " + failed.join(",") : ""}`);
log(failed.length ? "RERUN the same command to retry failed sheets." : "ALL SHEETS COMPLETE.");
