# Statistics on jronegutters.com that only Popeye can confirm

Written 2026-08-08. Every number below is published to customers right now and stays published.
Nothing here was changed or removed, because none of it is known to be wrong. It is here because
there is no source for it anywhere on disk, in the canonical values doc
(`EAPOPEYE/projects/jrone-seo-followup/compliance-sweep-closed-2026-08.md`), or in any public
record I could reach.

**How to use this:** each item has one question. Answer it in one line. You do not need to open a
file to answer any of them.

Answer format that is easiest to apply: `1. yes` / `1. it is 2,600` / `1. drop it`.

---

## A. Promises about how fast JR One responds

These are commitments to a customer. If the real number is slower, the site is writing a cheque
the crew has to cash.

### 1. "48h typical response to water-intrusion calls"
- **Where:** `app/rental-property-maintenance/page.jsx:67,79,155`
- **Why it cannot be verified:** it is an internal service standard. No BuilderPrime export, SLA
  document, or contract on disk states a response time.
- **Question:** When a rental-property manager calls about water coming in, do you really get
  someone there within 48 hours?

### 2. "48h typical HOA walkthrough turnaround"
- **Where:** `app/hoa-contracts/page.jsx:63,75,104,151`
- **Why it cannot be verified:** same as above. Nothing on disk records HOA turnaround.
- **Question:** After an HOA asks for a walkthrough, do you really get out there within 48 hours?

### 3. "24-48 hr post-storm damage assessment"
- **Where:** `app/storm-damage-gutters-tampa/page.jsx:36`, `app/gutter-repair/page.jsx:55`
- **Why it cannot be verified:** post-storm capacity is not recorded anywhere.
- **Question:** After a named storm, when every phone in Tampa is ringing, can you still get out
  to look at damage in one to two days?

---

## B. Counts of work JR One has done

The canonical doc confirms only three of these numbers: 1,000+ guard installations, 2,100+ projects,
and 3,000+ lifetime gutter installations. Every count below is published beside them and is NOT in
that doc.

### 4. "2,000+ gutter systems maintained"
- **Where:** `app/service-plans/page.jsx:40` (English), `:144` (Spanish)
- **Why it cannot be verified:** no maintenance-contract count exists on disk. The CompanyCam
  export counts projects, not systems under maintenance.
- **Question:** Roughly how many gutter systems do you actually maintain on a service plan?

### 5. "2,000+ soffit and fascia installations"
- **Where:** `app/soffit-and-fascia/PageClient.jsx:44` (English), `:122` (Spanish)
- **Why it cannot be verified:** not in the canonical doc, which settled the gutter and guard
  counts on 2026-08-07 but never covered soffit.
- **Question:** Is 2,000+ soffit and fascia installations about right?

### 6. "500+ siding installations completed"
- **Where:** `app/siding/PageClient.jsx:43` (English), `:122` (Spanish)
- **Why it cannot be verified:** no siding count on disk.
- **Question:** Is 500+ siding jobs about right?

### 7. "500+ rental and investment properties maintained"
- **Where:** `app/rental-property-maintenance/page.jsx:65` (English), `:153` (Spanish)
- **Why it cannot be verified:** no property-count record on disk.
- **Question:** Is 500+ rental properties about right?

### 8. "500+ LED installations completed"
- **Where:** `app/govee-lights/PageClient.jsx:41` (English), `:118` (Spanish)
- **Why it cannot be verified:** Govee is a newer line and no install count exists on disk.
- **Question:** Have you really done 500+ Govee light installs?

### 9. "500+ repairs completed annually"
- **Where:** `app/gutter-repair/page.jsx:56` (English), `:131` (Spanish)
- **Why it cannot be verified:** this one says ANNUALLY, so it is a yearly run rate, not a lifetime
  total. Nothing on disk tracks repairs per year.
- **Question:** Do you do 500+ repair jobs in a typical year?

### 10. "25+ HOA and managed communities served"
- **Where:** `app/hoa-contracts/page.jsx:61` (English), `:149` (Spanish)
- **Why it cannot be verified:** no HOA client list on disk.
- **Question:** How many HOAs and managed communities are you actually working with?

---

## C. Facts about the company itself

### 11. "15-20" employees, published in the site's structured data
- **Where:** `app/layout.js:105` (`numberOfEmployees: "15-20"`). This sits in the root layout, so
  it is attached to EVERY page on the site and is read by Google.
- **Why it cannot be verified:** headcount is not on disk, and the crew-on-1099 arrangement makes
  "employee" ambiguous anyway.
- **Question:** How many people work for JR One right now, counting the 1099 crew?

### 12. "3 in-house installation crews"
- **Where:** `app/about/page.jsx:68` and the Spanish twin
- **Why it cannot be verified:** crew count is not recorded anywhere on disk.
- **Question:** Are you still running three crews?

### 13. "2 generations in the trade"
- **Where:** `app/about/page.jsx:66` and the Spanish twin
- **Why it cannot be verified:** family history is not a documented fact anywhere in the repo.
- **Question:** Is "two generations" the right way to say it, or is it three counting your dad?

### 14. "0 subcontractors used, ever"
- **Where:** `app/about/page.jsx:70` and the Spanish twin
- **Why it cannot be verified:** "ever" is an absolute about the whole history of the company, and
  no record on disk can prove a negative.
- **Question:** Has JR One truly never used a subcontractor, or should this say "we do not sub out
  our installs"?

---

## D. Outside statistics quoted as fact

These are about Florida or the insurance market, not about JR One. I could not find an authoritative
public source that states them in the form the site uses. They may well be true and are quoted from
somewhere; I just cannot find where.

### 15. "280% increase in FL policy non-renewals since 2018"
- **Where:** 18 occurrences. Stat tiles on `app/insurance-resource-center/page.jsx` and
  `app/peak-301/page.jsx`; the insurance banner headline on `app/drainage-assessment/page.jsx`,
  `app/sagiper/page.jsx`, `app/siding/PageClient.jsx`, `app/service-plans/page.jsx`,
  `app/govee-lights/PageClient.jsx`, `app/soffit-and-fascia/PageClient.jsx`; and FAQ answers in
  both languages at `app/faq/page.jsx:95` and `:201`.
- **Why it cannot be verified:** no citation on disk. Florida OIR and the NAIC publish non-renewal
  data, but none of them publishes a headline "280% since 2018" figure I could match, and inventing
  a source for a number that is already published would be worse than asking.
- **Question:** Where did the 280% non-renewal number come from, or should it come down?

### 16. "Florida average homeowner insurance: $3,748/yr, 24-80% above the national average"
- **Where:** `public/roi-calculator.html:384`. Also drives the calculator's default insurance
  slider position (`rf:{ ins:3748 }`), so it feeds the ROI math, not just the copy.
- **Why it cannot be verified:** published industry averages for Florida vary widely by source and
  by year, and the site does not say which source or which year it used. The 24-80% range in
  particular has no stated basis.
- **Question:** Do you want to keep the $3,748 Florida insurance average, or should I re-source it
  and update the calculator?

### 17. "$3,285 to $5,100 average Tampa Bay annual premium"
- **Where:** `app/insurance-resource-center/page.jsx`
- **Why it cannot be verified:** no source on disk. Note this is a DIFFERENT figure from item 16
  above, on a different page, and a customer who reads both sees $3,748 in one place and a
  $3,285-$5,100 band in another.
- **Question:** Which insurance number do you want the site to use, the single $3,748 or the
  $3,285-$5,100 range?

### 18. "90,000 policies dropped in Tampa Bay, Citizens alone"
- **Where:** `app/insurance-resource-center/page.jsx`
- **Why it cannot be verified:** Citizens publishes depopulation figures, but nothing on disk says
  where this specific 90,000 came from or what period it covers.
- **Question:** Where did the 90,000 dropped-policies number come from?

### 19. "74% average humidity" and "mornings peak at 88% year-round"
- **Where:** `public/roi-calculator.html:296` and `:383`
- **Why it cannot be verified:** I tried and failed to reach an authoritative NOAA figure on
  2026-08-08. The NWS Tampa Bay climate pages do not publish humidity in text, and the NCEI
  Comparative Climatic Data humidity table returned 404. The thing that decides whether 74% is
  right is whether it means the annual average, the morning high, or the afternoon low, and those
  are very different numbers.
- **Question:** Leave the 74% humidity figure alone for now, or do you want me to go find a proper
  source for it in a later pass?

### 20. "Attics without ventilation regularly exceed 150F in Florida summers"
- **Where:** `public/roi-calculator.html:297`
- **Why it cannot be verified:** no source on disk. Figures like this circulate widely in the trade
  but I could not tie it to a named authority.
- **Question:** Is the 150-degree attic number something you have measured or read somewhere solid?

### 21. "Rat removal and exclusion in Tampa averages $1,078 per incident"
- **Where:** `public/roi-calculator.html:298`
- **Why it cannot be verified:** oddly precise for a figure with no citation anywhere on disk.
- **Question:** Where did the $1,078 rat-removal average come from?

### 22. "Hurricane deductible on a $390K home: $7,800 to $19,500"
- **Where:** `public/roi-calculator.html:385`
- **Why it cannot be verified:** the arithmetic is consistent with a 2% to 5% hurricane deductible
  on $390K, which is the standard Florida band, but the $390K home value itself has no source and
  the deductible percentages are not stated on the page.
- **Question:** Is $390K the right example home value for a Tampa customer, or should it be higher?

---

## What I did NOT put on this list, and why

So you are not asked about things that are already settled:

- **Anything the canonical doc already decided** is not here. Guard lifespan 15 to 20+, seamless
  aluminum 20 to 30, copper 50+, 80% less cleaning, 1,000+ guard installs, 2,100+ projects,
  3,000+ gutter installs, 3-year workmanship warranty, 40% capacity gain on seven versus six,
  Peak 301 at 6 to 10 years, SAGIPER 50-year limited: all confirmed there, all still correct on
  the site.
- **The Google rating and review count** (4.9 and 59) already have a recorded source and date in
  `lib/review-stats.js`.
- **"29 cities across 7 Tampa Bay counties"** checks out against the code: the city list really is
  29 entries and they really do span 7 counties (Hernando, Hillsborough, Manatee, Pasco, Pinellas,
  Polk, Sarasota).
- **The per-city project counts** on the city pages come from the CompanyCam export already in the
  repo, so they have a source.
- **Rainfall and hurricane season** were fixed in this run against NOAA and no longer need you.
  Details in `lib/climate-stats.js`.
