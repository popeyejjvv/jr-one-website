// =============================================================================
// JR One — server-side lead spam assessment
// =============================================================================
// Added 2026-07-29 after the gibberish-name bot campaign (Xmhwd lubgdbbvg /
// Hghwut Mfhmffk / Bmieoqku Exjyltrk, 12 fake BuilderPrime opportunities,
// nurture touch-1 emails sent to scraped third-party inboxes → bounces +
// reputation damage on jronegutters.com). Hardened 2026-07-30 after a 3-lens
// adversarial review (false-positive / bypass / correctness).
//
// Scoring model, tuned to fail OPEN for humans (JR One leads are cashflow —
// a missed real lead costs more than one junk CRM row):
//   - STRONG signal → block on its own
//   - MEDIUM signal → block only when two or more stack
// Blocked submissions still produce an info@ notification email with a
// [SPAM BLOCKED] subject on BOTH routes so a false positive is visible and
// rescuable; they never reach BuilderPrime, so the Vapi callback and the
// nurture drip (lead_nurture.py reads BP) never fire on them.
//
// KNOWN LIMIT (accepted 2026-07-30): a bot that switches to dictionary names
// + unique scraped emails via direct POST defeats the name/duplicate signals.
// If the campaign evolves that way, the next layer is edge-level bot filtering
// (Vercel WAF / Turnstile), not more heuristics here.
//
// ── 2026-08-08 additions ────────────────────────────────────────────────────
// Added: undialable phone numbers (STRONG - impossible NANP area code, N11
// service code, or impossible exchange), identical name reused across 3+
// distinct phone numbers in 24h (STRONG), and ZIP-to-state resolution so a
// non-Florida ZIP reports which state it actually belongs to.
//
// DELIBERATELY NOT ADDED: "blank city with a populated state". It was requested
// and it is NOT SAFE ON THIS SITE. `city` is not a field on the contact form
// (app/contact/page.jsx:148) or the homepage form (app/page.jsx:227) - only
// components/CityLeadForm.jsx sends one, and it hardcodes the page's own city.
// `state` is never user-editable and is always "FL"
// (CityLeadForm.jsx:52, estimator.html:442, send-lead/route.js `state || "FL"`).
// So "blank city + populated state" is the shape of an ordinary, legitimate
// contact-form lead, and the rule would block nearly every real customer while
// catching no bot the other signals miss. Shipping it would have been the exact
// failure this gate exists to prevent.
// =============================================================================

// Florida ZIPs are 32xxx–34xxx. Out-of-state is only a MEDIUM signal:
// commercial/portfolio owners can legitimately submit from elsewhere.
const FL_ZIP_RE = /^3[2-4]\d{2}(?:\d)?/;

// Florida area codes as of 2026. Out-of-FL is MEDIUM (transplants, snowbirds).
const FL_AREA_CODES = new Set([
  "239", "305", "321", "324", "352", "386", "407", "448", "561", "645", "656",
  "689", "727", "728", "754", "772", "786", "813", "850", "863", "904", "941", "954",
]);

// ── ZIP prefix -> state (added 2026-08-08) ───────────────────────────────────
// The bot records carried out-of-state ZIPs (Texas, Missouri) while the state
// field read FL. Note the state field is NOT user-editable anywhere on this
// site: it is hardcoded "FL" at components/CityLeadForm.jsx:52 and
// public/estimator.html:442, and app/api/send-lead/route.js defaults it with
// `state: state || "FL"`. So "ZIP inconsistent with the stated state" reduces
// EXACTLY to "non-Florida ZIP", which FL_ZIP_RE above already detects.
//
// This map therefore does NOT change what blocks. It resolves the ZIP to a
// state NAME so the block reason reads "non-Florida ZIP 75001 (Texas)" instead
// of a bare number, which is what makes a false positive spottable in the
// operator digest. Ranges are first-3-digits, inclusive.
const ZIP3_STATE_RANGES = [
  [[5, 5], "New York"], [[6, 9], "Puerto Rico / Virgin Islands"],
  [[10, 27], "Massachusetts"], [[28, 29], "Rhode Island"],
  [[30, 38], "New Hampshire"], [[39, 49], "Maine"], [[50, 59], "Vermont"],
  [[60, 69], "Connecticut"], [[70, 89], "New Jersey"],
  [[100, 149], "New York"], [[150, 196], "Pennsylvania"], [[197, 199], "Delaware"],
  [[200, 205], "District of Columbia"], [[206, 219], "Maryland"],
  [[220, 246], "Virginia"], [[247, 268], "West Virginia"],
  [[270, 289], "North Carolina"], [[290, 299], "South Carolina"],
  [[300, 319], "Georgia"], [[320, 349], "Florida"],
  [[350, 369], "Alabama"], [[370, 385], "Tennessee"], [[386, 397], "Mississippi"],
  [[398, 399], "Georgia"], [[400, 427], "Kentucky"], [[430, 459], "Ohio"],
  [[460, 479], "Indiana"], [[480, 499], "Michigan"], [[500, 528], "Iowa"],
  [[530, 549], "Wisconsin"], [[550, 567], "Minnesota"], [[569, 569], "District of Columbia"],
  [[570, 577], "South Dakota"], [[580, 588], "North Dakota"], [[590, 599], "Montana"],
  [[600, 629], "Illinois"], [[630, 658], "Missouri"], [[660, 679], "Kansas"],
  [[680, 693], "Nebraska"], [[700, 714], "Louisiana"], [[716, 729], "Arkansas"],
  [[730, 749], "Oklahoma"], [[750, 799], "Texas"], [[800, 816], "Colorado"],
  [[820, 831], "Wyoming"], [[832, 838], "Idaho"], [[840, 847], "Utah"],
  [[850, 865], "Arizona"], [[870, 884], "New Mexico"], [[885, 885], "Texas"],
  [[889, 898], "Nevada"], [[900, 961], "California"], [[967, 968], "Hawaii"],
  [[969, 969], "Guam"], [[970, 979], "Oregon"], [[980, 994], "Washington"],
  [[995, 999], "Alaska"],
];

function stateForZip(zip) {
  const z = String(zip || "").trim();
  if (!/^\d{5}$/.test(z)) return null;
  const p = parseInt(z.slice(0, 3), 10);
  for (const [[lo, hi], name] of ZIP3_STATE_RANGES) {
    if (p >= lo && p <= hi) return name;
  }
  return null;
}

// ── Undialable phone numbers (added 2026-08-08) ──────────────────────────────
// The scorer previously judged only whether an area code was Florida. It never
// asked whether the number could exist at all. Under NANP an area code cannot
// begin with 0 or 1, cannot be an N11 service code (411, 911, ...), and the
// exchange (digits 4-6) also cannot begin with 0 or 1.
//
// STRONG, unlike the geography signals, because this is not a judgment about
// where someone lives: the number cannot be dialed, so it cannot be a reachable
// customer. A homeowner who fat-fingers their area code is still recoverable -
// the blocked payload is written to the operator digest and to the Vercel logs
// with their name and email intact.
function undialablePhoneReason(phone) {
  let digits = String(phone || "").replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  if (digits.length !== 10) return null; // wrong length is handled elsewhere
  const ac = digits.slice(0, 3);
  const exch = digits.slice(3, 6);
  if (ac[0] === "0" || ac[0] === "1") return `impossible area code ${ac} (starts with ${ac[0]})`;
  if (ac[1] === "1" && ac[2] === "1") return `area code ${ac} is a reserved N11 service code`;
  if (exch[0] === "0" || exch[0] === "1") return `impossible exchange ${exch} in ${digits}`;
  return null;
}

// ── Repeated identical name across submissions (added 2026-08-08) ────────────
// The campaign reused the same fabricated names across separate submissions.
// Keyed on the EXACT normalized name -> the set of distinct phone numbers seen
// under it inside the window.
//
// The threshold is 3 DISTINCT phone numbers, deliberately not 2. A real person
// who submits, notices a typo in their phone, and resubmits produces exactly
// two distinct numbers under one name - that is a correction, not a bot, and it
// must pass. Three different phone numbers under one identical full name inside
// 24h is not a correction pattern. Same name + same phone never counts at all.
const nameToPhones = new Map();

function normName(name) {
  return String(name || "").toLowerCase().replace(/[^a-z]+/g, " ").trim();
}

function repeatedIdenticalNameCount(name, phone) {
  const key = normName(name);
  if (!key || key.length < 3) return 0;
  const rec = nameToPhones.get(key);
  if (!rec || Date.now() - rec.ts > RECENT_WINDOW_MS) return 0;
  const digits = String(phone || "").replace(/\D/g, "");
  const seen = new Set(rec.phones);
  if (digits) seen.add(digits);
  return seen.size;
}

function recordNameSighting(name, phone) {
  const key = normName(name);
  if (!key || key.length < 3) return;
  const now = Date.now();
  if (nameToPhones.size > 500) {
    for (const [k, v] of nameToPhones.entries()) {
      if (now - v.ts > RECENT_WINDOW_MS) nameToPhones.delete(k);
    }
  }
  const digits = String(phone || "").replace(/\D/g, "");
  const rec = nameToPhones.get(key);
  if (!rec || now - rec.ts > RECENT_WINDOW_MS) {
    nameToPhones.set(key, { phones: digits ? [digits] : [], ts: now });
    return;
  }
  if (digits && !rec.phones.includes(digits)) rec.phones.push(digits);
  rec.ts = now;
}

// Common first names (US + Hispanic + the international set Tampa actually
// sees). A name containing ANY of these is treated as human — the whole name
// signal is discounted. This kills the "Kim Armstrong" / "Neil Armstrong" /
// "Jan Ernst" false-positive class where a short first name left a
// consonant-cluster surname as the only scored word.
const COMMON_FIRST_NAMES = new Set(("james john robert michael william david richard joseph thomas charles " +
  "christopher daniel matthew anthony mark donald steven paul andrew joshua kenneth kevin brian george edward " +
  "ronald timothy jason jeffrey ryan jacob gary nicholas eric jonathan stephen larry justin scott brandon " +
  "benjamin samuel gregory frank alexander raymond patrick jack dennis jerry tyler aaron jose adam henry " +
  "nathan douglas zachary peter kyle walter ethan jeremy harold keith christian roger noah gerald carl terry " +
  "sean austin arthur lawrence jesse dylan bryan joe jordan billy bruce albert willie gabriel logan alan juan " +
  "wayne roy ralph randy eugene vincent russell elijah louis bobby philip johnny mary patricia jennifer linda " +
  "elizabeth barbara susan jessica sarah karen lisa nancy betty margaret sandra ashley kimberly emily donna " +
  "michelle carol amanda dorothy melissa deborah stephanie rebecca sharon laura cynthia kathleen amy angela " +
  "shirley anna brenda pamela emma nicole helen samantha katherine christine debra rachel carolyn janet " +
  "catherine maria heather diane ruth julie olivia joyce virginia victoria kelly lauren christina joan evelyn " +
  "judith megan andrea cheryl hannah jacqueline martha gloria teresa ann sara madison frances kathryn janice " +
  "jean abigail alice julia judy sophia grace denise amber doris marilyn danielle beverly isabella theresa " +
  "diana natalie brittany charlotte marie kayla alexis lori carlos luis miguel angel jesus jorge pedro " +
  "fernando manuel ricardo eduardo javier rafael marco antonio alejandro francisco hector cesar ramon julio " +
  "raul armando alberto enrique ernesto rodolfo salvador rodrigo guadalupe rosa carmen ana sofia valentina " +
  "camila lucia elena marta gabriela adriana veronica claudia leticia alejandra guillermo mario sergio pablo " +
  "diego andres felipe emilio ivan oscar omar hugo rene ruben israel santiago mateo sebastian nicolas " +
  "kim jan bob tom ted ned tim jim joe sam max leo eli ian amy ann eva mia zoe sue kay fay joy meg peg deb " +
  "lee ray roy guy jay sky rex ali ben dan don ron lou stu art earl neil dale glen hans lars sven ingrid " +
  "erik bjorn nils marek piotr pawel andrzej krzysztof tomasz stanislaw henryk jerzy tadeusz wojciech " +
  "olga irina dmitri sergei vladimir boris ivana milan dragan goran zoran nguyen minh anh linh huong thanh " +
  "wei ming jun hiro kenji yuki akira raj amit sanjay vijay priya deepa mohammed ahmed ali hassan omar fatima")
  .split(/\s+/));

// Business-entity abbreviations — the commercial form's "Full Name / Company"
// field legitimately carries these vowel-less tokens ("Bay Mgmt Group").
const ORG_TOKENS = new Set([
  "llc", "inc", "corp", "ltd", "co", "mgmt", "mgt", "svcs", "svc", "grp",
  "hldgs", "assn", "assoc", "dept", "apts", "hoa", "cdd", "pllc", "llp", "dba",
]);

// True digraphs stripped before consonant-run measurement so Schmidt /
// Szczepanski-style names don't trip on their cluster alone. r/l blends
// (tr, gr, str) stay — bot junk is full of them.
const NAME_CLUSTER_RE = /sch|sh|ch|th|ph|ck|sz|cz/g;

// 0 = looks like a name, 1 = soft trip (low vowel ratio — Schmidt-class real
// surnames land here), 2 = hard trip (no vowels, near-zero ratio, or a 4+
// consonant run after digraph stripping).
function gibberishWordLevel(word) {
  const w = word.toLowerCase();
  if (w.length < 4) return 0;
  if (ORG_TOKENS.has(w)) return 0;
  const vowels = (w.match(/[aeiouy]/g) || []).length;
  if (vowels === 0) return 2;
  const ratio = vowels / w.length;
  const declustered = w.replace(NAME_CLUSTER_RE, "x");
  const maxRun = Math.max(
    0,
    ...(declustered.match(/[^aeiouy]+/g) || []).map((r) => r.length)
  );
  if (ratio < 0.1 || maxRun >= 4) return 2;
  if (ratio < 0.2) return 1;
  return 0;
}

// "strong" = 2+ scoreable words, ALL trip, at least one hard.
// "medium" = at least one hard trip among the scoreable words.
// Discounted to null entirely when any token is a recognized first name —
// real surnames (Armstrong, Goldsmith, Karlsson, Strzelecki) trip the
// mechanical tests, but bots in this campaign never pair junk with a real
// first name. Soft-only trips (Schmidt, Krzysztof) never signal.
function gibberishNameSignal(name) {
  const tokens = (String(name || "").match(/[A-Za-z]+/g) || []).map((t) => t.toLowerCase());
  if (tokens.length === 0) return null;
  if (tokens.some((t) => COMMON_FIRST_NAMES.has(t))) return null;
  const words = tokens.filter((w) => w.length >= 4);
  if (words.length === 0) {
    // All-short-token names ("Xmh Lbg"): vowel-free across the board is still bot junk.
    const joined = tokens.join("");
    if (joined.length >= 4 && !/[aeiouy]/.test(joined)) return "medium";
    return null;
  }
  const levels = words.map(gibberishWordLevel);
  const hits = levels.filter((l) => l > 0).length;
  const hardHits = levels.filter((l) => l === 2).length;
  if (hardHits === 0) return null;
  if (hits === words.length && words.length >= 2) return "strong";
  return "medium";
}

// Recent-submission memory (per serverless instance, best effort — same
// pattern as the in-memory rate limiter). The bot campaign reused one email
// across different fake names within seconds. Read-only peek here; the caller
// records ONLY non-blocked submissions so bot traffic can't poison a scraped
// real address against its genuine owner.
const RECENT_WINDOW_MS = 24 * 60 * 60 * 1000;
const recentByEmail = new Map();

function normEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function nameTokens(name) {
  return new Set((String(name || "").toLowerCase().match(/[a-z]+/g) || []));
}

// True only when the same email re-appears within 24h under a name sharing
// ZERO tokens with the earlier one. "Mike Johnson" → "Michael Johnson" and
// "John" → "John Smith" share a token and never signal; spouses sharing an
// email usually share a surname and also pass.
function duplicateEmailDifferentName(email, name) {
  const em = normEmail(email);
  if (!em) return false;
  const prev = recentByEmail.get(em);
  if (!prev || Date.now() - prev.ts > RECENT_WINDOW_MS) return false;
  const a = nameTokens(name);
  for (const t of prev.tokens) if (a.has(t)) return false;
  return true;
}

function recordLeadSighting(email, name) {
  const em = normEmail(email);
  if (!em) return;
  const now = Date.now();
  if (recentByEmail.size > 500) {
    for (const [k, v] of recentByEmail.entries()) {
      if (now - v.ts > RECENT_WINDOW_MS) recentByEmail.delete(k);
    }
  }
  recentByEmail.set(em, { tokens: nameTokens(name), ts: now });
}

function areaCode(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1, 4);
  if (digits.length === 10) return digits.slice(0, 3);
  return null;
}

/**
 * Clear the in-memory duplicate-email and repeated-name traps.
 *
 * FOR TESTS ONLY. Both maps are per-serverless-instance module state, so a
 * test that arms a trap would otherwise leak into the next test and make the
 * suite order-dependent. Production never calls this: the maps self-expire on
 * the 24h window and self-prune at 500 entries.
 */
export function __resetSpamMemoryForTests() {
  recentByEmail.clear();
  nameToPhones.clear();
}

/**
 * Assess one lead submission. All fields optional — absent fields are neutral.
 * @param {object} lead
 * @param {string} [lead.name]
 * @param {string} [lead.email]
 * @param {string} [lead.phone]
 * @param {string} [lead.zip]
 * @param {string} [lead.message]
 * @param {string} [lead.company]  honeypot field — hidden on real forms, any value = bot
 * @param {number} [lead.form_ms]  ms between form render and submit (client-reported)
 * @returns {{block: boolean, reasons: string[]}}
 */
export function assessLeadSpam(lead) {
  const strong = [];
  const medium = [];

  // Honeypot: the visible form hides this field; only bots fill it.
  if (lead.company && String(lead.company).trim() !== "") {
    strong.push("honeypot field filled");
  }

  // Fill-time (only judged when the client reports it; absence is neutral so
  // cached pages and direct POSTs aren't penalized). Sub-1s is not human even
  // with autofill; 1–2.5s could be one-tap autofill, so it only stacks.
  const formMs = Number(lead.form_ms);
  if (Number.isFinite(formMs) && formMs > 0 && formMs < 2500) {
    if (formMs < 1000) strong.push(`form filled in ${formMs}ms`);
    else medium.push(`form filled in ${formMs}ms`);
  }

  const nameSignal = gibberishNameSignal(lead.name);
  if (nameSignal === "strong") strong.push(`gibberish name "${lead.name}"`);
  if (nameSignal === "medium") medium.push(`partly gibberish name "${lead.name}"`);

  // Same email, disjoint name, within 24h — medium: households share emails,
  // and per-instance memory makes this probabilistic anyway.
  if (duplicateEmailDifferentName(lead.email, lead.name)) {
    medium.push(`email ${lead.email} reused with an unrelated name within 24h`);
  }

  // A number that cannot be dialed is not a customer. STRONG, and it
  // short-circuits the geography check below so one bad phone is never counted
  // twice (once as undialable, once as "non-Florida area code").
  const undialable = undialablePhoneReason(lead.phone);
  if (undialable) strong.push(undialable);

  // Identical name resubmitted under 3+ DIFFERENT phone numbers inside 24h.
  // Two distinct numbers is a human fixing a typo and never signals.
  const nameRepeat = repeatedIdenticalNameCount(lead.name, lead.phone);
  if (nameRepeat >= 3) {
    strong.push(`name "${lead.name}" reused across ${nameRepeat} different phone numbers within 24h`);
  }

  // Geography signals are correlated (a genuine out-of-state investor who owns
  // Tampa property trips both), so ZIP + area code together count as ONE medium.
  // This is the snowbird guarantee: an out-of-state phone on a Florida property
  // is one medium, and one medium never blocks.
  const geo = [];
  const zip = String(lead.zip || "").trim();
  if (/^\d{5}$/.test(zip) && !FL_ZIP_RE.test(zip)) {
    // Resolve the ZIP to its real state so a reviewer can see at a glance
    // whether this was a Texas bot or a genuine out-of-state owner. Every form
    // on this site hardcodes state "FL", so a non-FL ZIP IS the ZIP/state
    // inconsistency - naming the state is what makes the reason legible.
    const zipState = stateForZip(zip);
    geo.push(zipState
      ? `ZIP ${zip} is ${zipState}, not the submitted state FL`
      : `non-Florida ZIP ${zip}`);
  }
  const ac = areaCode(lead.phone);
  if (!undialable && ac && !FL_AREA_CODES.has(ac)) {
    geo.push(`non-Florida area code ${ac}`);
  }
  if (geo.length > 0) medium.push(geo.join(" + "));

  // Bot filler: message that is just a digit string — unless it restates the
  // submitted phone number (humans paste their own callback number).
  const msg = String(lead.message || "").trim();
  if (msg && /^[\d\s\-().+]{7,}$/.test(msg)) {
    const msgDigits = msg.replace(/\D/g, "");
    const phoneDigits = String(lead.phone || "").replace(/\D/g, "");
    if (!phoneDigits || (!msgDigits.includes(phoneDigits) && !phoneDigits.includes(msgDigits))) {
      medium.push("message is only digits/phone characters");
    }
  }

  // Gmail dot-trick throwaways (w.u.d.ab.ugog.i0.7@gmail.com pattern).
  const em = normEmail(lead.email);
  const emMatch = em.match(/^([^@]+)@(gmail|googlemail)\.com$/);
  if (emMatch && (emMatch[1].match(/\./g) || []).length >= 4) {
    medium.push("gmail dot-trick address");
  }

  // Absurd field lengths are bot payloads, never Tampa homeowners.
  if (String(lead.name || "").length > 120 || msg.length > 4000) {
    medium.push("field length out of range");
  }

  const block = strong.length > 0 || medium.length >= 2;
  // Only clean submissions arm the duplicate-email trap — a bot POSTing a
  // scraped real address must not poison it against its genuine owner. The
  // name/phone trap is armed on the same terms and for the same reason.
  if (!block) {
    recordLeadSighting(lead.email, lead.name);
    recordNameSighting(lead.name, lead.phone);
  }
  return { block, reasons: [...strong, ...medium] };
}
