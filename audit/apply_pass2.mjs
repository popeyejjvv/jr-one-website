// apply_pass2.mjs -- fold the adversarial pass-2 verdicts + the QA sample flips into
// manifest-verdicts.json. A photo stays SAFE only if: pass 1 SAFE AND pass 2 keep=true
// AND not refuted by the QA sample. Everything else becomes UNSAFE-UNPROFESSIONAL
// (reason prefixed with its refuting stage). Fail-closed: SAFE tiles with no pass-2
// verdict are demoted, not shipped.
// Run from website root AFTER vision_review_pass2.mjs: node audit/apply_pass2.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url));

const mvPath = path.join(HERE, "manifest-verdicts.json");
const mv = JSON.parse(fs.readFileSync(mvPath, "utf8"));

// pass-2 verdicts by tile index
const pass2 = {};
const dir = path.join(HERE, "verdicts-pass2");
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const j = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  for (const v of j.verdicts || []) pass2[v.index] = v;
}

// QA sample flips by tile index
const qa = JSON.parse(fs.readFileSync(path.join(HERE, "qa-flips.json"), "utf8"));
const qaFlip = new Map(qa.flips.map((f) => [f.index, f.reason]));

let kept = 0, p2Rejected = 0, qaRejected = 0, noPass2 = 0;
for (const v of mv.verdicts) {
  if (v.class !== "SAFE") continue;
  const p2 = pass2[v.index];
  if (qaFlip.has(v.index)) {
    v.class = "UNSAFE-UNPROFESSIONAL";
    v.reason = `qa-refuted: ${qaFlip.get(v.index)}`.slice(0, 160);
    qaRejected++;
  } else if (!p2) {
    v.class = "UNSAFE-UNPROFESSIONAL";
    v.reason = "pass2-missing: demoted fail-closed";
    noPass2++;
  } else if (!p2.keep) {
    v.class = "UNSAFE-UNPROFESSIONAL";
    v.reason = `pass2-refuted: ${p2.reason}`.slice(0, 160);
    p2Rejected++;
  } else {
    kept++;
  }
}

const counts = {};
for (const v of mv.verdicts) counts[v.class] = (counts[v.class] || 0) + 1;
mv.counts = counts;
mv.pass2 = {
  appliedAt: new Date().toISOString(),
  rule: "SAFE = pass1 SAFE + pass2 keep + not QA-refuted",
  kept, p2Rejected, qaRejected, noPass2,
};
fs.writeFileSync(mvPath, JSON.stringify(mv, null, 1));
console.log(JSON.stringify({ kept, p2Rejected, qaRejected, noPass2, counts }, null, 2));
