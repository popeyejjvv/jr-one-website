// vision_review_pass2.mjs -- adversarial second pass over every tile pass 1 marked SAFE.
// Rationale: a stratified QA sample (audit/qa-flips.json) refuted 46/94 sampled SAFE
// verdicts (49%), so pass 1 alone is too lenient to publish from. This pass re-judges
// ONLY the SAFE tiles with an explicit refute-first framing; a photo ships only if it
// survives BOTH passes. Same checkpoint-per-sheet + backoff design as pass 1.
//
// Run from website root: node audit/vision_review_pass2.mjs   (rerun to resume)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SHEETS = path.join(HERE, "sheets");
const OUT = path.join(HERE, "verdicts-pass2");
const LOG = path.join(HERE, "vision-review-pass2.log");
fs.mkdirSync(OUT, { recursive: true });

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

const mv = JSON.parse(fs.readFileSync(path.join(HERE, "manifest-verdicts.json"), "utf8"));
const safeBySheet = new Map();
for (const v of mv.verdicts) {
  if (v.class !== "SAFE") continue;
  const s = Math.floor(v.index / TILES_PER_SHEET);
  if (!safeBySheet.has(s)) safeBySheet.set(s, []);
  safeBySheet.get(s).push(v.index);
}

const log = (msg) => {
  const line = `${new Date().toISOString()} ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG, line + "\n");
};

const SYSTEM = `You are the FINAL quality gate for the public website gallery of JR One Aluminum, a Tampa gutter / soffit / fascia / siding company. You receive a contact sheet of photo tiles; each tile has a dark header with a gold "#N" index. A first-pass reviewer provisionally approved SOME of these tiles. Your job is to try to REFUTE each listed approval.

A tile KEEPS its approval ONLY if it is a photo the company should be proud to publish: finished, clean professional exterior work (seamless gutters, leaf guards, soffit, fascia, siding, copper, drainage) on a tidy home, deliberately framed, in focus, level, work as the unmistakable subject.

REJECT (keep=false) on ANY of these:
- work in progress: ladder anywhere in frame, worker, tools, tarps, material stock or offcuts, debris, open/unfinished details, dangling wires
- roof-top POV (shot standing on the roof), roof as subject (roofing is out of scope)
- burned-in timestamp/date/GPS overlays or any measurement/sketch overlay
- any readable face, person, license plate, document, screen
- sky-dominant, backlit-silhouette, blurry, badly tilted, or "pointed the phone up" snapshots where the work is a sliver
- clutter-dominant: trash bins, water heaters, AC units, overgrown yards, stored junk, vehicles intruding
- condition/before shots: grime, mildew streaks, damage, missing pieces
- generic house snapshots where no finished JR One work is clearly the subject
When genuinely unsure, keep=false. The gallery fails closed.

Respond ONLY with valid JSON, no markdown fences:
{"verdicts":[{"index":<number>,"keep":<true|false>,"reason":"<max 10 words>","confidence":<0.0-1.0>}]}
Include every requested index exactly once.`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callAPI(body, attempt = 0) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 240000);
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: ctl.signal,
    });
    if (r.status === 429 || r.status >= 500) {
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
    if (typeof v.index !== "number" || typeof v.keep !== "boolean") throw new Error(`bad verdict: ${JSON.stringify(v)}`);
    seen.set(v.index, v);
  }
  const missing = expected.filter((g) => !seen.has(g));
  if (missing.length) throw new Error(`missing indexes: ${missing.join(",")}`);
  return expected.map((g) => seen.get(g));
}

async function reviewSheet(s, indexes) {
  const file = path.join(OUT, `pass2-sheet-${String(s).padStart(3, "0")}.json`);
  if (fs.existsSync(file)) {
    try {
      const j = JSON.parse(fs.readFileSync(file, "utf8"));
      if ((j.verdicts || []).length === indexes.length) return "skip";
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
        { type: "text", text: `Contact sheet ${s}. Provisionally approved tile indexes to re-judge: ${indexes.join(", ")}. Try to refute each.` },
      ],
    }],
  };
  let text = "";
  for (let contentTry = 0; contentTry < 3; contentTry++) {
    const resp = await callAPI(body);
    text = (resp.content || []).filter((c) => c.type === "text").map((c) => c.text).join("");
    try {
      const verdicts = parseVerdicts(text, indexes);
      fs.writeFileSync(file, JSON.stringify({ sheet: s, model: MODEL, pass: 2, verdicts }, null, 1));
      return "done";
    } catch (e) {
      log(`  sheet ${s} parse fail (${e.message}), content retry ${contentTry + 1}`);
      fs.writeFileSync(path.join(HERE, `debug-pass2-${s}-try${contentTry}.txt`), text);
    }
  }
  throw new Error(`sheet ${s}: unparseable after 3 tries`);
}

const work = [...safeBySheet.entries()].sort((a, b) => a[0] - b[0]);
const totalTiles = work.reduce((a, [, idxs]) => a + idxs.length, 0);
log(`START pass2: ${totalTiles} SAFE tiles across ${work.length} sheets, model ${MODEL}, concurrency ${CONCURRENCY}`);

const queue = [...work];
let done = 0, skipped = 0, failed = [];
async function worker(wid) {
  while (queue.length) {
    const [s, indexes] = queue.shift();
    try {
      const res = await reviewSheet(s, indexes);
      if (res === "skip") skipped++;
      else { done++; log(`sheet ${s} done (${indexes.length} tiles) [w${wid}] (${done + skipped}/${work.length})`); }
    } catch (e) {
      failed.push(s);
      log(`sheet ${s} FAILED: ${e.message}`);
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i)));
log(`FINISHED pass2: ${done} reviewed, ${skipped} already done, ${failed.length} failed${failed.length ? " -> " + failed.join(",") : ""}`);
log(failed.length ? "RERUN the same command to retry failed sheets." : "PASS 2 COMPLETE.");
