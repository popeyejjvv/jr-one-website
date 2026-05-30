import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import MobileCTA from "@/components/MobileCTA";
import CityPortfolio from "@/components/CityPortfolio";

// ── Constants ─────────────────────────────────────────────────────────────
const C = {
  bg: "#0B1628",
  navy: "#1B2A4A",
  navyMid: "#243556",
  navyLight: "#2C3E5A",
  gold: "#D4AF37",
  goldLight: "#F2CD69",
  goldPale: "rgba(200,149,46,0.12)",
  cream: "#F5F3EF",
  white: "#FFFFFF",
  offWhite: "#E8E4DC",
  muted: "#7A8FA8",
  charcoal: "#2D2D2D",
};
const f = { h: "'Montserrat', sans-serif", b: "'Source Sans 3', sans-serif" };

const CITY_SLUGS = [
  "tampa","clearwater","st-petersburg","sarasota","bradenton",
  "lakeland","brandon","wesley-chapel","palm-harbor","riverview",
  "new-port-richey","largo","spring-hill","tarpon-springs",
  "land-o-lakes","dunedin","ruskin","sun-city-center",
  "temple-terrace","plant-city","lutz","south-tampa",
  // ── 7 mission cities added 2026-05-23 (Play 4) ──
  "new-tampa","valrico","lithia","oldsmar","safety-harbor",
  "seminole","pinellas-park",
];

const SERVICES = {
  "seamless-aluminum-gutters": {
    name: "Seamless Aluminum Gutters",
    short: "seamless aluminum gutters",
    link: "/seamless-aluminum-gutters",
    blurb: "Custom-fabricated on-site from a single continuous coil so there are no seams, no leaks, and a perfect fit for your roofline.",
    who: "The right choice for any home upgrading from sectional gutters, replacing a failing system, or outfitting new construction.",
    props: [
      ["On-site fabrication","Gutters cut to your exact roofline, not ordered from a warehouse."],
      ["25+ colors","Matched to fascia, trim, and body to enhance curb appeal."],
      ["6\" and 7\" K-style","Tampa Bay rain volume needs 6\" minimum; 7\" upgrade for large or steep roofs. We do not install 5\" in Florida."],
      ["Hidden hangers, screw-in","Hurricane-rated fastening, no nails that pull out."],
    ],
  },
  "gutter-guards": {
    name: "Gutter Guards",
    short: "gutter guards",
    link: "/gutter-guards",
    blurb: "Micro-mesh and stainless screen systems that keep leaves, pine needles, shingle grit, and debris out while letting water flow through freely.",
    who: "Essential for homes with oak, pine, or palm canopy, and for any homeowner tired of climbing a ladder every season.",
    props: [
      ["Micro-mesh filtering","Blocks even pine needles and shingle grit."],
      ["Stainless steel mesh","Won't rust, warp, or collapse under debris load."],
      ["Works with existing gutters","Retrofit onto your current system, no full replacement needed."],
      ["Reduces maintenance","Cuts cleaning frequency from quarterly to annual in most cases."],
    ],
  },
  "gutter-cleaning": {
    name: "Gutter Cleaning",
    short: "gutter cleaning",
    link: "/gutter-cleaning",
    blurb: "Professional debris removal, downspout flushing, and flow testing to keep water moving off your roof and away from your foundation.",
    who: "For any homeowner who doesn't have guards installed, or any property where mature trees drop steady debris year-round.",
    props: [
      ["Full debris removal","Leaves, pine needles, shingle grit, bagged and hauled away."],
      ["Downspout flushing","Confirms water actually exits at grade, not just the gutter."],
      ["Flow test","We run water through every run before we leave."],
      ["Damage inspection","We flag loose hangers, separating seams, or fascia rot while we're up there."],
    ],
  },
  "gutter-repair": {
    name: "Gutter Repair",
    short: "gutter repair",
    link: "/gutter-repair",
    blurb: "Sagging runs, leaking seams, pulled-away sections, and overflow issues, fixed properly instead of patched with caulk that fails by next season.",
    who: "For homeowners whose gutters were installed wrong, installed long ago, or damaged in a storm.",
    props: [
      ["Re-pitch and re-hang","Most sagging is fixed with proper hangers, not new gutters."],
      ["Seam sealing (done right)","Commercial-grade gutter sealant, not silicone caulk."],
      ["Downspout replacement","Correct sizing so volume isn't the bottleneck."],
      ["Storm damage repair","Insurance-ready documentation if the claim is open."],
    ],
  },
  "soffit-and-fascia": {
    name: "Soffit and Fascia",
    short: "soffit and fascia",
    link: "/soffit-and-fascia",
    blurb: "Aluminum and vinyl soffit + fascia replacement, sealing the roof edge against Florida humidity, pests, and wind-driven rain.",
    who: "Critical for any home with aging wood soffit, visible fascia rot, or pest entry at the roofline.",
    props: [
      ["Full wood-to-aluminum conversion","Kills the rot cycle permanently."],
      ["Ventilated soffit","Proper attic ventilation keeps AC bills down."],
      ["Color-matched to gutters","Everything at the roof edge looks like one finished system."],
      ["Pest-sealed","Closes the gaps that let rodents, wasps, and bats into attics."],
    ],
  },
  "siding": {
    name: "Siding",
    short: "siding",
    link: "/siding",
    blurb: "Vinyl and aluminum siding built for Florida weather, UV-stable, wind-rated, and installed with the same precision we bring to gutter work.",
    who: "For homes with failing stucco, rotting wood siding, or older vinyl that's faded, cracked, or warped.",
    props: [
      ["UV-stable color","Won't chalk or fade the way builder-grade siding does in Florida sun."],
      ["Wind-rated install","Fastening that holds through tropical storm wind loads."],
      ["Insulated options","Adds R-value and cuts sound transmission."],
      ["Trim detail","Corners, J-channel, and window wraps done right, not rushed."],
    ],
  },
  "copper-gutters": {
    name: "Copper Gutters",
    short: "copper gutters",
    link: "/copper-gutters",
    blurb: "Half-round and K-style copper gutter systems, the lifetime choice for homeowners who want a system that outlives the roof.",
    who: "For historic homes, high-end new construction, and owners who view gutters as an architectural feature, not just a utility.",
    props: [
      ["Lifetime material","Copper outlasts the house in most cases."],
      ["Develops a patina","Turns from bright copper to deep bronze over years, a feature, not a flaw."],
      ["Soldered seams","Joints that never leak, for the life of the system."],
      ["Custom fabrication","Half-round, K-style, European, built to match the architecture."],
    ],
  },
  "drainage-assessment": {
    name: "Drainage Assessment",
    short: "drainage assessment",
    link: "/drainage-assessment",
    blurb: "A full evaluation of how water actually moves across your property, from the roof to the gutter, through the downspout, and away from your foundation.",
    who: "For homes with pooling, foundation staining, mulch washout, fascia rot, or any sign that water isn't leaving the property cleanly.",
    props: [
      ["Roof-to-grade analysis","We trace every drop from shingle to splash block."],
      ["Downspout sizing check","Undersized downspouts are the #1 cause of overflow."],
      ["Grade and extension review","Often the fix is at the bottom, not the top."],
      ["Written report","Specific, prioritized fixes, not a sales pitch."],
    ],
  },
};

const CITY_META = {
  tampa: { name: "Tampa", localP: "Tampa homeowners face intense summer thunderstorms, hurricane season, year-round humidity, and a mix of aging housing stock and new construction from South Tampa to New Tampa.", weatherNote: "Tampa averages 51 inches of rain per year, well above the national average. Your gutter system has to move serious water volume or your foundation pays the price.", nearby: ["clearwater","brandon","temple-terrace","riverview"] },
  clearwater: { name: "Clearwater", localP: "Clearwater's coastal location means salt air, tropical storms, and intense UV exposure year-round, conditions that corrode anything less than proper aluminum.", weatherNote: "Coastal proximity adds salt air corrosion on top of Florida's standard heavy rain, UV, and humidity. Aluminum is the material of choice because it handles all of it.", nearby: ["palm-harbor","dunedin","largo","tarpon-springs"] },
  "st-petersburg": { name: "St. Petersburg", localP: "St. Pete's mix of historic homes, mid-century neighborhoods, and new construction means every job is different, and many older homes still have original wood soffit that's been rotting for decades.", weatherNote: "St. Pete holds the Guinness record for consecutive sunny days, 768. That UV exposure degrades wood soffit and fascia faster than most homeowners realize.", nearby: ["largo","clearwater","tampa","dunedin"] },
  sarasota: { name: "Sarasota", localP: "Sarasota homeowners expect contractors who match the standard of their properties, from waterfront homes on the keys to established neighborhoods like Palmer Ranch and Lakewood Ranch.", weatherNote: "Coastal storms here drive rain sideways, testing gutters and soffit in ways inland homes rarely experience. Proper install pitch and fastening aren't optional.", nearby: ["bradenton"] },
  bradenton: { name: "Bradenton", localP: "Bradenton sits where coastal weather meets suburban growth, from historic downtown to newer developments in Lakewood Ranch and Parrish.", weatherNote: "Bradenton's position on the Manatee River and Tampa Bay means both coastal storm surges and inland flooding. Functioning gutters are structural protection, not cosmetic.", nearby: ["sarasota"] },
  lakeland: { name: "Lakeland", localP: "Lakeland's inland position gets Central Florida's intense afternoon thunderstorms without the coastal breeze to dry things out.", weatherNote: "Lakeland sits in Florida's 'Lightning Alley', one of the most storm-active regions in the country. Afternoon storms dump massive water in short periods.", nearby: ["plant-city","brandon"] },
  brandon: { name: "Brandon", localP: "Brandon's rapid growth means a mix of housing ages, 1980s established developments alongside brand-new construction, each with different gutter needs.", weatherNote: "Brandon gets Tampa-level thunderstorm activity with more suburban tree coverage, meaning heavier leaf and pine-needle load in gutters.", nearby: ["riverview","tampa","plant-city"] },
  "wesley-chapel": { name: "Wesley Chapel", localP: "Wesley Chapel is one of Tampa Bay's fastest-growing communities, with new construction and established neighborhoods side by side.", weatherNote: "Pasco County's flat terrain makes drainage critical. Without properly pitched gutters, water pools at the foundation instead of being directed away.", nearby: ["land-o-lakes","lutz","tampa"] },
  "palm-harbor": { name: "Palm Harbor", localP: "Palm Harbor's tree-lined streets and Gulf proximity make gutter maintenance and corrosion resistance both critical year-round.", weatherNote: "Palm Harbor's mature tree canopy means more gutter debris than most Pinellas communities. Guards and regular maintenance are especially important here.", nearby: ["tarpon-springs","dunedin","clearwater"] },
  riverview: { name: "Riverview", localP: "Riverview's explosive new-construction growth brought thousands of homes built fast by volume builders, often with gutter work that cut corners on pitch and hanger spacing.", weatherNote: "Riverview's position along the Alafia River makes proper drainage critical for preventing foundation issues and yard erosion.", nearby: ["brandon","sun-city-center","ruskin"] },
  "new-port-richey": { name: "New Port Richey", localP: "New Port Richey's mix of waterfront properties and established inland neighborhoods requires gutter and soffit systems that handle coastal storms and tree debris both.", weatherNote: "Gulf-facing properties here take direct impact from tropical systems. Hurricane-rated fastening and proper gutter sizing aren't optional.", nearby: ["spring-hill","tarpon-springs"] },
  largo: { name: "Largo", localP: "Largo sits in the heart of Pinellas County, coastal salt air, heavy tree canopy, and established housing with soffit and fascia well past their lifespan.", weatherNote: "Central Pinellas location means both coastal weather and suburban tree coverage, a combination that accelerates gutter and soffit wear.", nearby: ["clearwater","st-petersburg"] },
  "spring-hill": { name: "Spring Hill", localP: "Spring Hill's affordable housing and growing community make quality contractor work in high demand but not always easy to find.", weatherNote: "Spring Hill's inland position means intense thunderstorms and heavy seasonal rain without coastal wind relief. Gutters here work hard year-round.", nearby: ["new-port-richey","land-o-lakes"] },
  "tarpon-springs": { name: "Tarpon Springs", localP: "Tarpon Springs' Greek heritage and historic Sponge Docks sit alongside waterfront cottages and newer inland developments, all taking constant stress from Gulf storms.", weatherNote: "Direct Gulf exposure means salt-laden winds and driving rain during tropical systems. Corrosion-resistant aluminum and proper fastening are non-negotiable.", nearby: ["palm-harbor","dunedin","new-port-richey"] },
  "land-o-lakes": { name: "Land O' Lakes", localP: "Land O' Lakes is one of Pasco's fastest-growing areas, with volume-builder homes that often got fast, imprecise gutter installs from day one.", weatherNote: "Flat terrain and numerous lakes/wetlands mean drainage is everything. Without properly pitched gutters, water pools at foundations instead of draining away.", nearby: ["lutz","wesley-chapel"] },
  dunedin: { name: "Dunedin", localP: "Dunedin's historic downtown and tree-lined streets are full of character-rich homes, which also means aging wood soffit, fascia, and gutter systems due for replacement.", weatherNote: "Dunedin's position between the Gulf and St. Joseph Sound means constant salt air and direct impact from coastal storms.", nearby: ["clearwater","palm-harbor","tarpon-springs"] },
  ruskin: { name: "Ruskin", localP: "Ruskin sits in southern Hillsborough where agricultural roots meet rapid residential growth, waterfront and inland alike.", weatherNote: "Low-lying terrain along Tampa Bay makes water management critical. Heavy seasonal rains plus high water tables put your gutters on the front line.", nearby: ["sun-city-center","riverview","brandon"] },
  "sun-city-center": { name: "Sun City Center", localP: "Sun City Center is one of Florida's premier active retirement communities, where homeowners take pride in well-maintained properties and don't accept cut-rate work.", weatherNote: "Southern Hillsborough gets the full force of summer thunderstorms and tropical systems. Reliable gutters are essential protection, not optional.", nearby: ["ruskin","riverview","brandon"] },
  "temple-terrace": { name: "Temple Terrace", localP: "Temple Terrace is one of Tampa's most established communities, with decades-old neighborhoods where many homes are still running original wood soffit.", weatherNote: "Dense tree coverage means constant gutter debris from oaks and pines. The Hillsborough River corridor adds humidity and drainage challenges.", nearby: ["tampa","brandon","lutz"] },
  "plant-city": { name: "Plant City", localP: "Plant City, the Strawberry Capital of the World, sits in eastern Hillsborough where suburban living meets agricultural heritage and intense inland weather.", weatherNote: "Inland position puts Plant City squarely in Florida's thunderstorm corridor. Intense afternoon downpours dump huge water volume in short bursts.", nearby: ["brandon","lakeland","tampa"] },
  lutz: { name: "Lutz", localP: "Lutz straddles the Hillsborough-Pasco county line, heavy tree canopy, established neighborhoods, and newer developments side by side.", weatherNote: "Oak and pine canopy drops debris year-round. Combined with heavy seasonal rains, clogged gutters here lead to fascia rot and foundation issues fast.", nearby: ["land-o-lakes","wesley-chapel","tampa"] },
  "south-tampa": { name: "South Tampa", localP: "South Tampa runs from Bayshore Boulevard to Davis Islands, Hyde Park to Beach Park, historic homes with original copper, premium new construction, and HOA architectural review boards that don't accept rushed work.", weatherNote: "Bayshore-facing properties get constant salt air plus direct exposure to tropical-system storm surge. Inland South Tampa sees the same intense afternoon thunderstorms as the rest of the city. Both demand corrosion-resistant aluminum and proper hurricane-rated fastening.", nearby: ["tampa","clearwater","st-petersburg"] },
  // ── 7 mission cities added 2026-05-23 (Play 4) ──
  "new-tampa": { name: "New Tampa", localP: "New Tampa's planned communities (Cory Lake Isles, Tampa Palms, Hunter's Green, West Meadows, K-Bar Ranch) sit at the inland edge of Hillsborough with 2,800 to 4,500 sq ft roof footprints that overwhelm 5-inch gutters.", weatherNote: "Inland thunderstorms unload heavy rain in short windows with no Gulf-coast breeze to dry roofs. Mature oak and pine canopy drops debris year-round.", nearby: ["wesley-chapel","tampa","lutz","temple-terrace"] },
  valrico: { name: "Valrico", localP: "Valrico sits in East Hillsborough where Bloomingdale and FishHawk-adjacent neighborhoods mix mature oak canopy with suburban family homes. Oaks drop debris year-round, slow-draining soil makes underground PVC drainage essential.", weatherNote: "Heavier afternoon thunderstorms than coastal cities see, plus mature oak canopy that clogs undersized gutters fast.", nearby: ["brandon","riverview","lithia","plant-city"] },
  lithia: { name: "Lithia", localP: "Lithia centers on FishHawk Ranch, where larger homes, steeper rooflines, and HOA architectural-review boards demand real gutter capacity, real guard systems, and real fascia detail.", weatherNote: "East Hillsborough gets the heaviest afternoon thunderstorms with very little Gulf-coast breeze. Year-round humidity plus mature oak coverage accelerates fascia rot.", nearby: ["valrico","riverview","brandon"] },
  oldsmar: { name: "Oldsmar", localP: "Oldsmar sits at the head of Old Tampa Bay where salt air corrodes anything but aluminum, and older neighborhoods have wood soffit and fascia softened by thirty years of humidity.", weatherNote: "Bay-head position means tropical storm surge pushes inland from Old Tampa Bay. Salt-laden winds reach further than most Pinellas towns realize.", nearby: ["safety-harbor","tampa","clearwater","palm-harbor"] },
  "safety-harbor": { name: "Safety Harbor", localP: "Safety Harbor's historic downtown along Bayshore Boulevard, Philippe Park's centuries-old oaks, and waterfront homes from the 1950s-1980s era mean most properties need full wood-to-aluminum soffit and fascia conversion.", weatherNote: "Old Tampa Bay tropical-system path plus centuries-old oak canopy at Philippe Park drops debris into every gutter along the bayshore.", nearby: ["dunedin","clearwater","oldsmar","palm-harbor"] },
  seminole: { name: "Seminole", localP: "Seminole sits in mid-county Pinellas with 1970s-1990s housing stock dominant. Original wood soffit and fascia have been baking for 40+ years, plus undersized gutters that never matched the roof load.", weatherNote: "Central Pinellas gets coastal weather without coastal address premiums. Established residential density means tree debris and aging downspouts are constant maintenance items.", nearby: ["largo","pinellas-park","st-petersburg","clearwater"] },
  "pinellas-park": { name: "Pinellas Park", localP: "Pinellas Park is dense mid-county Pinellas with established single-family neighborhoods, small commercial properties, and multi-family apartments that all need gutter, soffit, and fascia work built for Florida weather.", weatherNote: "Mid-county position gets storm activity without the salt-air breeze that dries neighboring coastal towns. Older suburban housing stock means aluminum soffit and fascia are overdue replacements.", nearby: ["largo","seminole","st-petersburg","clearwater"] },
};

// ── Phase 3 Batch 1 — top-10 ROI combo enrichment (2026-05-29) ─────────────
// Keyed by `${slug}/${service}`. When present, fields override the generic
// city + service template content. Absent fields fall through to defaults so
// the other 158 combos still render exactly as they did in PR #1.
//
// All numbers, neighborhoods, weather data, and housing-stock facts are
// sourced from /Users/popeye/Desktop/EAPOPEYE/research-output/jrone-seo-build-2026-05-28/audit/:
//   - companycam-per-city-density.md (project counts since 2022-01-01)
//   - census-by-city.json (ACS demographics)
//   - noaa-by-city.json (thunderstorm days, hurricanes, rainfall)
//   - housing-stock-by-city.json (median year built, pre-1980 share)
const ENRICHMENT = {
  "lakeland/gutter-cleaning": {
    introOverride: "Lakeland gets 75 thunderstorm days a year and 50.2 inches of rain on average, more than the U.S. national average and concentrated in heavy July through September downpours per NOAA. That volume goes straight through any gutter clogged with oak leaves, shingle grit, or wind-blown debris. With 43 percent of Lakeland homes built before 1980 per Polk County records, a lot of those gutters are the original runs at the original pitch, and they are not cleaning themselves.",
    propsOverride: [
      ["Full debris removal","Oak leaves, pine needles, and shingle grit hand-cleared and bagged, not blown into your beds."],
      ["Downspout flush","We run water through every downspout to confirm it actually exits at grade, not at the elbow."],
      ["Flow test","Every run gets tested with live water before we leave. If it ponds, we fix the pitch."],
      ["Damage report","Loose hangers, separating seams, fascia rot, and undersized downspouts flagged in writing while we are up there."],
    ],
    faqs: [
      { q: "How much does gutter cleaning cost in Lakeland?", a: "Standard ranch and split-level homes in Lakeland run roughly $150 to $275 for a full clean including downspout flushing and flow testing. Two-story homes, steep pitches, or homes with mature oak canopy that has gone uncleaned for more than a year run higher because we are removing more material and inspecting more length. We quote a flat price up front after a quick walk of the property, so there are no per-foot surprises at the end. Free estimate by phone or text." },
      { q: "When is the best time of year to clean gutters in Lakeland?", a: "Twice a year is the floor: once in late spring before peak rainfall season (July through September per NOAA) and once after Florida's leaf-drop window in late fall through early winter, when laurel oaks and live oaks shed heavy. Homes with heavy oak or pine canopy often need a third clean mid-summer because thunderstorm wind pulls debris off the canopy faster than a twice-a-year schedule catches it. The worst time to wait is mid-July with a forecast full of afternoon storms." },
      { q: "What is included in a JR One gutter cleaning in Lakeland?", a: "Full hand-removal of leaves, pine needles, shingle grit, twigs, and tennis balls. Every downspout flushed with water and confirmed to exit at grade. A flow test on every run with live water to verify pitch. A written damage report on anything we see up there, separating seams, loose hangers, fascia rot, undersized downspouts, missing splash blocks, gutter spike pull-out. Debris bagged and hauled off site. No blowing it into your beds and walking off." },
      { q: "Do you clean gutters on two-story Lakeland homes?", a: "Yes. We carry the ladders, the fall protection, and the insurance to do two-story work safely. Roofs steeper than an 8/12 pitch get extra harnessing. We do not pressure homeowners to climb onto a roof or accept a cheaper price for a riskier job. If a roof is too steep or storm-damaged to walk safely, we say so and quote ground-and-ladder access only." },
      { q: "Will you spot gutter damage while you are cleaning?", a: "That is half the value of having a specialist contractor clean versus a handyman. We are up there for an hour or two looking directly at the fascia, the hangers, the spikes, the seams, and the downspout connections. Anything failing or about to fail gets photographed, written into the damage report, and quoted as a separate repair if you want it done. The cleaning price does not change either way. Most Lakeland cleaning visits surface at least one item worth knowing about." },
      { q: "Are you insured to clean gutters in Lakeland?", a: "Yes. JR One Aluminum LLC carries general liability and workers compensation. We will provide a current certificate of insurance on request before any work begins. Hiring an uninsured contractor on a Lakeland gutter cleaning is a foundation, fascia, and homeowner-liability risk that is not worth saving fifty bucks on." },
    ],
    neighborhoodsOfNote: ["Lakeland Highlands","Cleveland Heights","Christina","Lake Hollingsworth","Beacon Hill","South Lake Morton Historic District"],
    trustNumbers: ["25 Lakeland projects in the JR One CompanyCam record since 2023, across cleanings, guard installs, and seamless-gutter replacements"],
  },

  "wesley-chapel/gutter-cleaning": {
    introOverride: "Wesley Chapel is one of the newest housing markets in Tampa Bay, with a median home built around 2000 per Pasco County records and roughly 70 percent of homes built after the year 2000. New construction does not mean problem-free gutters. Pasco's flat terrain holds water at the foundation when downspouts are clogged, and Wesley Chapel sits in the same 78-thunderstorm-day-per-year band as the rest of north-central Florida per NOAA. Idalia in 2023 triggered Pasco County evacuation orders that included Wesley Chapel, and the homes that came through with the least damage were the ones with gutters actually moving water.",
    propsOverride: [
      ["Full debris removal","Pine needles, oak leaves, and roof grit pulled out by hand and bagged off site."],
      ["Downspout flush + grade check","Pasco's flat terrain means a clean downspout is only half the answer. We confirm water exits past the foundation."],
      ["Flow test","Live water through every run before we leave. No assumptions about pitch."],
      ["HOA-friendly cleanup","Most Wesley Chapel neighborhoods have architectural-review boards. We leave the property cleaner than we found it."],
    ],
    faqs: [
      { q: "How often should Wesley Chapel gutters be cleaned?", a: "Twice a year is the baseline. Once in late spring before the heavy July through September storm window per NOAA, and once in late fall after leaf drop. Homes backed up to wooded preserves or with mature oak in the yard often need a third clean in mid-summer. Homes in newer Wesley Chapel subdivisions with smaller trees can sometimes stretch to once a year if guards are installed." },
      { q: "How much is gutter cleaning in Wesley Chapel?", a: "Typical single-story and two-story homes in subdivisions like Seven Oaks, Meadow Pointe, or Lexington Oaks run $175 to $325 depending on linear footage, number of downspouts, and how much material is in the gutter at the time of the clean. Larger custom homes in Estancia at Wiregrass or Lake Bernadette are quoted on a walk basis. Flat price up front, no per-foot surprises." },
      { q: "What happens if I never clean my Wesley Chapel gutters?", a: "Three things compound. First, water overflows over the front of the gutter during heavy rain and pools at the foundation. On Pasco's flat terrain that means slab cracking, settling, and eventual foundation work that runs five figures. Second, water backs up under the shingles at the roof edge and rots the fascia and sometimes the roof deck. Third, the weight of wet debris pulls the gutter away from the fascia, separating seams and eventually pulling the whole run off. All three are preventable with two cleanings a year." },
      { q: "Do you work in HOA neighborhoods in Wesley Chapel?", a: "Yes. Most Wesley Chapel subdivisions, Seven Oaks, Meadow Pointe, Lexington Oaks, Saddlebrook, Lake Bernadette, Estancia at Wiregrass, are HOA neighborhoods with architectural review boards. We follow posted hours, clean up debris completely, and provide written documentation if your HOA requires contractor proof of insurance. We have been working in Pasco County since 2023 with 77 logged projects in Wesley Chapel alone." },
      { q: "Should I get gutter guards installed instead of cleaning twice a year?", a: "If your home is under heavy oak, pine, or laurel canopy, guards pay for themselves in three to five years versus the cost of recurring cleanings. If your home is in a newer Wesley Chapel subdivision with smaller landscaping, cleaning twice a year may be the more economical path. We will tell you straight which way the math works for your specific property during the free estimate, not push the more expensive option." },
      { q: "Do you provide service calls for storm damage to Wesley Chapel gutters?", a: "Yes. After named storms, especially anything in the Idalia or Ian category that pushed wind through Pasco County, sections of gutter pull loose from fascia, downspouts get torn off, and debris loads quadruple. We prioritize storm calls and provide insurance-ready documentation if a homeowner has an open claim. If you can see daylight between your gutter and fascia after a storm, do not wait for the next rain event to call." },
    ],
    neighborhoodsOfNote: ["Seven Oaks","Meadow Pointe","Lexington Oaks","Saddlebrook","Lake Bernadette","Estancia at Wiregrass","Country Walk"],
    trustNumbers: ["77 Wesley Chapel projects in the JR One CompanyCam record, the highest density of any Pasco County market we serve"],
  },

  "palm-harbor/gutter-cleaning": {
    introOverride: "Palm Harbor's mature tree canopy is the defining gutter challenge here. Laurel oak, live oak, slash pine, and sand pine drop debris into gutters year-round, and the homes built in the 1970s and 1980s, roughly 42 percent of the stock per Pinellas County records, have gutters that were not sized for that volume of organic load. Add Pinellas's 82 thunderstorm days per year per NOAA and four named storms in the last ten years (Idalia, Ian, Eta, Elsa), and Palm Harbor gutter cleaning is not a once-a-year homeowner task, it is a twice or three times per year specialist call.",
    propsOverride: [
      ["Full debris removal","Pine needles, oak leaves, sweetgum balls, and shingle grit pulled by hand, bagged, hauled off."],
      ["Downspout flush + flow test","Every downspout cleared and tested with live water from the gutter to grade."],
      ["Coastal corrosion check","Salt air from the Gulf accelerates aluminum oxidation at fastener points. We flag what is failing."],
      ["Fascia inspection","Mature Palm Harbor homes often have soft fascia behind the gutter. We document it before the next storm tears the gutter off."],
    ],
    faqs: [
      { q: "How much does gutter cleaning cost in Palm Harbor?", a: "Single-story homes in neighborhoods like Highland Lakes, Spring Lake, or Crystal Beach run roughly $175 to $275 for a full clean including downspout flushing and flow testing. Two-story homes and homes under heavy oak or pine canopy run $250 to $425 because we are removing more material, testing more runs, and spending more time on the property. Free flat-price estimate by phone or text." },
      { q: "How often should Palm Harbor gutters be cleaned?", a: "Twice a year for homes with moderate tree coverage, three times a year for homes under mature laurel oak, live oak, or pine canopy. The fall clean is non-negotiable, that is when oak and pine drop hardest. The spring clean clears the winter accumulation before the July through September heavy-rain season starts. Skipping either one is how fascia rot starts." },
      { q: "What does pine debris do to my gutters that I should worry about?", a: "Pine needles are the worst gutter clog material in Florida. They knit together into a dense mat that water cannot push through, and they hold moisture against the aluminum and against the fascia for weeks at a time. The result is fascia rot from the back side that you cannot see from the ground, plus accelerated oxidation of the gutter itself. By the time you can see the problem, the fascia is already soft and the gutter pulls loose during the next thunderstorm." },
      { q: "Does coastal Palm Harbor location affect gutter cleaning frequency?", a: "Yes, two ways. Gulf-facing properties get salt-air corrosion on top of the standard debris load, so cleaning visits double as inspection windows for aluminum failure at hanger fasteners and at downspout elbows. And tropical-system wind drives an entire season's worth of debris into your gutters in a single storm event. After Idalia in 2023, we logged storm-call cleanings throughout Palm Harbor where gutters were full to the lip in 24 hours." },
      { q: "Will gutter cleaning fix my overflow problem?", a: "Sometimes yes, sometimes no. If the gutter is clogged with debris and overflows in rain, cleaning fixes it. If the downspout is undersized for the roof load, or the pitch was wrong from the original install, or the run has separated at a seam, cleaning will not fix it. Our flow test catches all three. If we find the problem is not the debris, we document it and quote the repair separately. We do not bill you for a cleaning that will not solve the actual problem." },
      { q: "Do you offer gutter guards in Palm Harbor?", a: "Yes. For homes under heavy oak or pine canopy in Palm Harbor, guards pay for themselves in two to four years compared with three cleanings per year. We install micro-mesh stainless guards that handle pine needles, which is the test most gutter guards on the market fail. Free comparison estimate, guards versus cleaning schedule, during the same visit." },
    ],
    neighborhoodsOfNote: ["Highland Lakes","Spring Lake","Crystal Beach","Lansbrook","Tarpon Woods","Boot Ranch","Innisbrook"],
    trustNumbers: ["65 Palm Harbor projects in the JR One CompanyCam record since November 2022, across cleanings, guards, and seamless-gutter replacements"],
  },

  "clearwater/gutter-cleaning": {
    introOverride: "Clearwater is a coastal Pinellas County market with 82 thunderstorm days per year and 51.8 inches of average annual rainfall per NOAA. Idalia in 2023 produced severe storm surge that hit Treasure Island and Sunset Beach hardest, and four named storms have come within 50 miles of Clearwater in the last ten years (Idalia, Ian, Eta, Elsa). Combined with a 42-percent pre-1980 housing stock per Pinellas County records, much of which still runs the original gutter system at the original pitch, Clearwater homes need cleaning on a real schedule, not a maybe-this-year schedule.",
    propsOverride: [
      ["Full hand-clean","Leaves, pine needles, shingle grit, sand from coastal wind, all removed and bagged."],
      ["Salt-corrosion check","Every fastener and downspout elbow inspected for the early oxidation pattern that coastal salt air drives."],
      ["Downspout flush + flow test","Live water through every run. Coastal properties cannot afford a downspout that exits at the elbow instead of at grade."],
      ["Storm-prep documentation","If hurricane season is approaching, we document what is loose or undersized so it does not become an insurance claim later."],
    ],
    faqs: [
      { q: "How much is gutter cleaning in Clearwater?", a: "Standard single-story homes in neighborhoods like Countryside, Sunset Point, or Clearwater Beach run $175 to $300 depending on linear footage and debris load. Two-story homes and homes with mature trees run higher. Coastal-facing homes sometimes warrant an inspection-and-clean combo where we are looking specifically for salt-corrosion damage in addition to debris removal, which adds time but not a separate fee in most cases. Free flat-price estimate." },
      { q: "When should I schedule pre-hurricane-season gutter cleaning in Clearwater?", a: "May or early June. NOAA's hurricane season runs June through November and peak rainfall hits July through September. A clean gutter in late May means storm debris has somewhere to go when the first system arrives. A clogged gutter in May becomes an emergency call after the first thunderstorm of the season. We see the same pattern every year and it is always worse in coastal Pinellas than inland Hillsborough." },
      { q: "What is special about cleaning coastal Clearwater gutters?", a: "Salt-laden Gulf air drives oxidation at every fastener point on an aluminum gutter system. That oxidation is invisible from the ground but obvious once you are up on a ladder looking at the back of the gutter where the hidden hanger meets the fascia. Coastal Clearwater cleanings double as corrosion inspections, and that is one reason hiring a specialist aluminum contractor matters here, generic handyman cleanings miss what we look for." },
      { q: "Do you clean gutters on coastal-facing Clearwater homes?", a: "Yes. We work all of Clearwater including Clearwater Beach, Island Estates, Sand Key, and the bridge-accessed islands. Direct Gulf-facing properties take the most weather and corrode aluminum the fastest, so the cleaning visit is also the time we flag any aluminum component that will not survive another storm season." },
      { q: "What happens to Clearwater gutters during a hurricane?", a: "Three failure modes. First, debris-clogged gutters fill up in the first hour of a hurricane and pull away from the fascia under the weight of standing water. Second, undersized downspouts overflow at the foundation, eroding landscape grade and pushing water under the slab. Third, wind pressure lifts loose gutter sections and tears them off the fascia, which then becomes flying debris. Pre-season cleaning catches the debris problem. A separate inspection catches the other two." },
      { q: "Are you insured to work on Clearwater homes?", a: "Yes. JR One Aluminum LLC carries general liability and workers compensation. We provide a current certificate of insurance on request before any work starts. Coastal Clearwater homes, especially anything HOA-controlled in Sand Key or Island Estates, often require contractor insurance documentation as a condition of access, and we have it on file." },
    ],
    neighborhoodsOfNote: ["Countryside","Sunset Point","Clearwater Beach","Island Estates","Sand Key","Belleair","Morningside","Skycrest"],
    trustNumbers: ["102 Clearwater projects in the JR One CompanyCam record since November 2022, the second-highest density in Pinellas County for us"],
  },

  "sarasota/gutter-cleaning": {
    introOverride: "Sarasota homes lean older than the Tampa Bay average. Sarasota County records show a median home year-built around 1975 and roughly 52 percent of the stock built before 1980, which is the oldest housing concentration in our service area. That matters for gutter cleaning because original-install gutters at the original pitch on a 50-year-old fascia board are not what builders are installing today, and they fail differently than newer systems. Add 53.1 inches of average annual rainfall per NOAA, the highest in our service area, plus three named storms in the last ten years (Idalia, Ian, Eta), and Sarasota gutter cleaning is foundation protection more than it is curb appeal.",
    propsOverride: [
      ["Hand debris removal","Oak leaves, pine needles, sand, and roof grit cleared and bagged. Beds left as we found them."],
      ["Original-pitch verification","Older Sarasota homes were installed at pitch standards that have since improved. We test what is actually there."],
      ["Downspout flush + extension check","Many Sarasota downspouts exit at a splash block that washed out years ago. We document and quote the fix."],
      ["Fascia condition report","50-year-old fascia behind a clogged gutter is often soft. We flag what is failing in writing."],
    ],
    faqs: [
      { q: "How much does gutter cleaning cost in Sarasota?", a: "Standard single-story homes in Palmer Ranch, Sarasota Springs, or Gulf Gate run $175 to $300 for a full clean with downspout flushing and flow testing. Homes on Siesta Key, Lido Key, or Bird Key with custom rooflines or two-story footprints run higher because we are working with longer ladders and more linear feet. Estate properties in Oyster Bay or West of Trail get walked and quoted on a per-property basis. Flat price up front, no per-foot surprises." },
      { q: "How often should Sarasota gutters be cleaned?", a: "Twice a year minimum. Once in May or early June before the July through September heavy-rain window per NOAA, and once in late fall after Florida's leaf-drop season. Homes with mature oak canopy or homes on the keys with salt-tolerant landscaping (palms, sea grape) drop debris differently and may benefit from a third visit. Skipping a cycle on a 50-year-old gutter system is how the next overflow event becomes a fascia-rot project." },
      { q: "What is different about cleaning gutters on older Sarasota homes?", a: "Two things. First, the pitch on a 50-year-old gutter run is rarely what it was on day one, original hangers loosen, fascia warps, and water starts pooling instead of flowing. A flow test with live water tells you in two minutes what a visual inspection cannot. Second, the fascia behind the gutter on a 1975 home is often soft from decades of moisture exposure. We document it and quote the fix instead of pretending it does not exist." },
      { q: "Do you work on Siesta Key, Lido Key, and Bird Key?", a: "Yes. Island properties get the same service standard as inland Sarasota. We do work around bridge access, gated communities, and HOA architectural-review requirements. Salt-air corrosion is more aggressive on the keys, so the cleaning visit doubles as a corrosion inspection on every fastener and downspout elbow." },
      { q: "Will you clean gutters that have not been cleaned in years?", a: "Yes, and that is a common Sarasota call. Five-year-clog cleanings take longer, sometimes require us to remove and reinstall sections to clear what is wedged in there, and usually surface fascia or seam damage that needs separate repair. We quote the cleaning flat and quote the repair separately. We do not refuse the job because it is overdue, but we are honest about what we find." },
      { q: "Do you handle insurance-claim documentation after storms?", a: "Yes. After Idalia, Ian, and Eta we wrote dozens of insurance-ready damage reports for Sarasota homeowners. Photos, scope description, replacement-cost itemization. If your gutter system was damaged by a named storm and you have an open claim, the cleaning visit is the right time to also document what needs to be replaced or repaired. We work directly with adjusters." },
    ],
    neighborhoodsOfNote: ["Palmer Ranch","Lakewood Ranch","Siesta Key","Lido Key","Bird Key","Gulf Gate","Sarasota Springs","West of Trail","Oyster Bay"],
    trustNumbers: ["85 Sarasota projects in the JR One CompanyCam record since November 2022, across cleanings, repairs, and seamless-gutter replacements"],
  },

  "bradenton/gutter-cleaning": {
    introOverride: "Bradenton sits on the Manatee River at the mouth of Tampa Bay, with 52.4 inches of average annual rainfall and three named storms in the last ten years (Idalia, Ian, Eta) per NOAA. Idalia in 2023 triggered Manatee County evacuation orders, and Ian in 2022 produced a northeast wind flow that caused negative storm surge in the Tampa Bay area, exposing bay-floor sediment and then pushing it back as water returned. Manatee County records show median home year-built around 1980 with 44 percent of homes pre-1980, meaning a lot of original gutter systems are still in service. Twice-a-year cleaning is the minimum protection on housing stock that age.",
    propsOverride: [
      ["Hand debris removal","Oak leaves, pine needles, palm fronds, roof grit, all cleared and bagged off site."],
      ["Downspout flush + flow test","Live water through every run. Bradenton's mix of waterfront and inland topography means drainage cannot be assumed."],
      ["Original-system pitch check","44 percent of Bradenton homes are pre-1980. Original gutter pitch is rarely what it should be after 45 years."],
      ["Storm-readiness report","With three named storms in 10 years we know what fails first. We document it before the next one tests it."],
    ],
    faqs: [
      { q: "How much is gutter cleaning in Bradenton?", a: "Single-story homes in established neighborhoods like Cortez, Palma Sola, or West Bradenton run $150 to $275 for a full clean with downspout flushing and flow testing. Two-story homes and properties along the Manatee River or in Lakewood Ranch run $225 to $375. Waterfront homes on Anna Maria Island and Longboat Key get walked and quoted on a per-property basis because corrosion inspection is part of the work. Free flat-price estimate by phone or text." },
      { q: "Why does Bradenton gutter cleaning need to happen before hurricane season?", a: "NOAA's hurricane season opens June 1 and peak rainfall hits July through September. A gutter clogged with last winter's debris will overflow in the first heavy thunderstorm of June and pull water into the fascia for the next four months. After Idalia in 2023 we logged cleanings throughout Bradenton where gutters were full to the lip within 12 hours of the storm hitting. Pre-season cleaning, ideally May, is the structural fix." },
      { q: "What happens to old Bradenton gutters in a hurricane?", a: "Three failure modes. Original hangers spaced too wide pull loose under the weight of water plus debris. Aluminum that has been oxidizing for 30 plus years cracks at the fastener points. Downspouts disconnect at the elbow and water dumps directly against the foundation. Pre-season inspection catches all three. The cleaning visit is the right time to do it." },
      { q: "Do you clean gutters in Lakewood Ranch?", a: "Yes. Lakewood Ranch spans the Sarasota and Manatee county line and we work both sides. Lakewood Ranch HOAs have strict contractor-insurance and cleanup requirements. We provide a current certificate of insurance, follow posted hours, and leave the property cleaner than we found it. Most Lakewood Ranch homes are post-2000 construction, so the cleaning is more debris-management than original-system rehab." },
      { q: "How long does a gutter cleaning take in Bradenton?", a: "Single-story homes typically take 60 to 90 minutes start to finish, including the bagged debris haul-off. Two-story homes and homes with mature canopy run two to three hours. Estate properties and homes with heavy multi-year clog can run a half day. We block the time when we book the visit so we are not rushed off site before the flow test is done." },
      { q: "Do you provide damage reports for insurance claims?", a: "Yes. After named storms we write insurance-ready reports with photos, scope of damage, and replacement-cost itemization, formatted to support a claim. If your Bradenton gutter system was damaged by Idalia, Ian, or any other named storm and you have an open claim, the cleaning visit is the right time to also document what needs to be replaced. We work directly with adjusters when needed." },
    ],
    neighborhoodsOfNote: ["Cortez","Palma Sola","West Bradenton","Lakewood Ranch","Bayshore Gardens","Anna Maria Island","Longboat Key","Palmetto","Parrish"],
    trustNumbers: ["170 Bradenton projects in the JR One CompanyCam record since November 2022, the highest density of any market we serve outside Tampa and St. Petersburg"],
  },

  "brandon/gutter-repair": {
    introOverride: "Brandon's housing stock skews newer than coastal Pinellas, median year-built 1990 with 45 percent of homes built after 2000 per Hillsborough County records. But newer does not mean trouble-free. Brandon gets 80 thunderstorm days per year and four named storms in the last ten years (Idalia, Ian, Eta, Elsa) per NOAA, and a 1990s or 2000s suburban subdivision install often used volume-builder shortcuts on gutter pitch, hanger spacing, and downspout sizing. Twenty-plus years later those shortcuts surface as sagging runs, separated seams, and overflow at every heavy rain.",
    propsOverride: [
      ["Re-pitch and re-hang","Most Brandon sag is fixed with proper hangers at proper spacing, not with brand-new gutters."],
      ["Seam sealing done right","Commercial-grade gutter sealant, not silicone caulk that fails by next summer."],
      ["Downspout resize and replacement","Volume builders undersized downspouts in 1990s Brandon. We upsize to handle real Florida rain volume."],
      ["Storm damage documentation","Insurance-ready scope and photos if the claim is open after Idalia or any future storm."],
    ],
    faqs: [
      { q: "How much does gutter repair cost in Brandon?", a: "Spot repairs (one seam, one downspout, a few hanger replacements) typically run $175 to $425. Full re-pitch and re-hang of a single run runs $300 to $600 depending on length and access. Section replacement on a damaged run is $8 to $14 per linear foot installed including matching the existing profile. Free flat-price estimate at the property, no per-trip charge for the visit." },
      { q: "Should I repair my Brandon gutters or replace them?", a: "Depends on three things. If the aluminum itself is sound and the problem is hangers, seams, or pitch, repair is the right call and runs roughly one-third to one-half the cost of replacement. If the aluminum is cracked at multiple points, the original profile is too small for the roof load (most 1990s Brandon installs are), or you are replacing more than 40 percent of the linear footage in spot work, replacement makes more sense. We walk the property and tell you straight which way the math works. We do not push replacement when repair is the right answer." },
      { q: "What causes Brandon gutters to sag?", a: "Three common causes. First, original hanger spacing too wide for Florida rain volume, common in 1990s and 2000s volume-builder installs. Second, hanger nails or screws that have pulled loose from fascia that has softened from moisture. Third, accumulated debris weight pulling the gutter forward over years of missed cleanings. The fix is rarely the gutter itself, it is the hangers, the fascia, and the maintenance schedule. Re-pitch and re-hang at proper spacing fixes most sag without replacement." },
      { q: "Do you do storm-damage gutter repair in Brandon?", a: "Yes, and we prioritize storm calls. After Idalia in 2023 and Ian in 2022 we logged hundreds of Brandon repair visits, most of them sections pulled loose from fascia, downspouts torn off at the elbow, and runs separated at seams from wind-pressure differential. We document everything for insurance with photos and itemized scope. If your gutter is loose or hanging after a storm, do not wait for the next rain event." },
      { q: "Can you repair gutters that have already pulled away from the fascia?", a: "Usually yes, depending on the condition of the fascia underneath. If the fascia is sound, we re-hang at proper spacing with new fasteners and re-pitch the run. If the fascia behind the gutter is soft or rotted (common on 1990s Brandon homes that have had clogged gutters), we quote the fascia replacement as a separate line item before re-hanging. We do not screw new gutters into rotted fascia and pretend it is fixed." },
      { q: "How long do gutter repairs in Brandon last?", a: "A proper re-pitch and re-hang with new hidden hangers at correct spacing typically lasts 10 to 15 years before any of that hardware needs attention again, assuming the gutter itself is sound and the homeowner keeps up with twice-a-year cleaning. A silicone-caulk seam repair done by a handyman typically fails the next summer. The difference is the spec and the hardware. We use commercial-grade gutter sealant and hidden hangers screwed into solid fascia." },
      { q: "Do you provide warranties on Brandon gutter repairs?", a: "Yes. Workmanship warranty on all repair work, written, with the scope itemized so there is no ambiguity about what is covered. Manufacturer warranty on any replacement aluminum or hardware we install. Full terms provided in writing before work begins. We are family-owned with over 30 years in Tampa Bay, we are not going anywhere if you need warranty service two years from now." },
    ],
    neighborhoodsOfNote: ["Brandon Pointe","Bloomingdale","Providence Lakes","Sterling Ranch","Brandon Hills","Lakemont","Lake Brandon"],
    trustNumbers: ["60 Brandon projects in the JR One CompanyCam record since February 2023, with current top-10 organic ranking for gutter repair in Brandon"],
  },

  "wesley-chapel/seamless-aluminum-gutters": {
    introOverride: "Wesley Chapel is a newer-construction market, median home year-built 2000 per Pasco County records and roughly 70 percent of homes built after 2000. That means a lot of original-install gutter systems are now reaching the 20 to 25 year point where volume-builder aluminum is showing its age, sagging, cracking at fastener points, and overflowing because the original 5-inch profile cannot handle current rainfall volume. Pasco's flat terrain plus 50.8 inches of average annual rainfall per NOAA make proper downspout sizing critical, water that does not exit cleanly pools at the slab. We install 6-inch and 7-inch K-style on Wesley Chapel homes. We do not install 5-inch in Florida.",
    propsOverride: [
      ["On-site fabrication","Cut to your exact roofline from a single coil, no warehouse-stocked sections."],
      ["6-inch and 7-inch K-style","Wesley Chapel rain volume needs 6-inch minimum. 7-inch for steeper rooflines or larger 2,800 plus sq ft footprints common in Estancia at Wiregrass and Saddlebrook."],
      ["25 plus colors","Matched to existing fascia, trim, and body. HOA architectural-review compatible."],
      ["Hidden hangers, screw-in","Pasco County wind code requires it. We install it that way regardless of whether it gets inspected."],
    ],
    faqs: [
      { q: "How much does seamless aluminum gutter installation cost in Wesley Chapel?", a: "Single-story homes in Seven Oaks, Meadow Pointe, or Lexington Oaks typically run $1,800 to $3,400 for a full gutter replacement including downspouts and hidden hangers. Larger custom homes in Estancia at Wiregrass or Saddlebrook run $3,500 to $6,500 depending on linear footage, roofline complexity, and color. Two-story homes add roughly 30 percent. Free flat-price estimate after a property walk, no per-foot surprises." },
      { q: "Why 6-inch instead of 5-inch gutters in Wesley Chapel?", a: "Volume. Florida thunderstorms drop more rain in a 15-minute window than most U.S. markets see in an hour. A 5-inch K-style gutter overflows under Wesley Chapel rain volume even when perfectly clean. JR One installs 6-inch as the minimum on every Florida home and 7-inch on steeper rooflines or larger footprints. We do not install 5-inch in Florida. It does not match the climate." },
      { q: "How long does seamless gutter installation take in Wesley Chapel?", a: "Most single-story homes complete in a single day, fabrication on site in the morning, install in the afternoon. Two-story homes and larger custom homes run one to two days depending on complexity. We coordinate the install date with HOA architectural-review approval where required, most Wesley Chapel subdivisions need it." },
      { q: "Do Wesley Chapel HOAs require approval before gutter replacement?", a: "Most do. Seven Oaks, Meadow Pointe, Lexington Oaks, Saddlebrook, Lake Bernadette, and Estancia at Wiregrass all have architectural-review boards that require color match documentation and contractor insurance before approval. We provide the color sample, the spec sheet, and the certificate of insurance as a standard part of the estimate. We do not start work until the HOA approval is in writing." },
      { q: "Can you match my existing fascia and trim colors?", a: "Yes. We carry 25 plus aluminum colors and can color-match to existing fascia, trim, and body within the standard palette. If your HOA spec requires a specific named color (common in master-planned Wesley Chapel communities), we will confirm the match before fabrication. The goal is for the new gutter to look like part of the original architecture, not an aftermarket addition." },
      { q: "What is the warranty on JR One seamless gutters in Wesley Chapel?", a: "Workmanship warranty on the install, written, full terms in the estimate package. Manufacturer warranty on the aluminum coil and the hidden hangers. We are family-owned with over 30 years in Tampa Bay, and we have been working Pasco County since 2023 with 77 logged Wesley Chapel projects. If you need warranty service three years from now, we are still here." },
      { q: "Will you remove and dispose of my old gutters?", a: "Yes. Old gutter, old hangers, old downspouts, all removed and hauled off site as part of the install. We sweep the property and check beds and walkways before we leave. No piles of scrap aluminum left at the curb for the homeowner to deal with." },
    ],
    neighborhoodsOfNote: ["Seven Oaks","Meadow Pointe","Lexington Oaks","Saddlebrook","Lake Bernadette","Estancia at Wiregrass","Country Walk","Watergrass"],
    trustNumbers: ["77 Wesley Chapel projects in the JR One CompanyCam record since February 2023, the highest density of any Pasco County market we serve"],
  },

  "brandon/gutter-guards": {
    introOverride: "Brandon's tree coverage is the gutter-guard case in one fact: mature oak and pine drop debris into gutters faster than a twice-a-year cleaning schedule can keep up with. Hillsborough County records show median home year-built 1990 with 45 percent post-2000, and many of those subdivisions backed up to wooded preserves or were built around existing oak canopy. Brandon also gets 80 thunderstorm days a year per NOAA, which drives wind-blown debris into gutters in single-storm bursts. Guards turn a three-cleanings-a-year property into a once-a-year inspection property, and they pay for themselves in two to four years on a typical Brandon home.",
    propsOverride: [
      ["Micro-mesh stainless guard","Blocks pine needles, the test most consumer guards fail. Brandon has too many pines for anything less."],
      ["Works with existing 6-inch and 7-inch gutters","Retrofit onto your current system, no full replacement needed if the existing gutter is sound."],
      ["Cuts cleaning frequency","Three cleanings a year drops to one inspection visit. Math works in 2 to 4 years."],
      ["Lifetime mesh warranty","The mesh itself does not rust, warp, or collapse under debris load. Written warranty in the install package."],
    ],
    faqs: [
      { q: "How much do gutter guards cost in Brandon?", a: "Micro-mesh stainless guard installation typically runs $8 to $14 per linear foot installed in Brandon. A standard single-story home with 150 to 200 linear feet of gutter runs $1,200 to $2,800 total. Larger two-story homes and homes with complex rooflines run higher. Free flat-price estimate at the property, no per-trip charge for the visit." },
      { q: "Are gutter guards worth it in Brandon?", a: "On a property with mature oak or pine canopy, yes. A typical Brandon home with heavy tree coverage needs three cleanings per year at roughly $200 to $300 each, so $600 to $900 annually. A guard install at $1,500 to $2,500 pays back in two to four years and lasts 20 plus. On a property with minimal tree coverage, guards are still nice but the math is closer to break-even, and we will tell you that straight during the estimate." },
      { q: "Will gutter guards stop pine needles?", a: "Micro-mesh stainless guards do, if the mesh is fine enough. Most consumer-grade guards on the market (the perforated metal screen at hardware stores) fail the pine-needle test, needles slide right through the holes and clog the gutter underneath where you cannot reach them. JR One installs micro-mesh that handles pine needles, which matters in Brandon because pine canopy is everywhere from Lakemont to Sterling Ranch." },
      { q: "Do gutter guards work with existing 6-inch gutters?", a: "Yes. We retrofit guards onto sound existing 6-inch and 7-inch K-style gutters. If the existing gutter has separated seams, sagging runs, or pulled-loose hangers, we address those issues first or quote a full replacement, installing guards on a failing gutter is throwing money away. We walk the property and tell you straight which path makes sense." },
      { q: "How long do gutter guards last in Brandon?", a: "Stainless steel micro-mesh itself does not rust, warp, or collapse under debris load, it lasts the life of the gutter system. The frame and fasteners typically warrant for 20 plus years. The gutter underneath is the wearing part, and a properly maintained gutter with guards installed lasts 25 to 35 years in Florida." },
      { q: "Will I still need any gutter maintenance with guards installed?", a: "Yes, but it shrinks from active cleaning to once-a-year inspection. Some fine debris and pollen accumulates on top of the mesh and gets washed off by the next rain, but if pine needles or oak leaves pile up enough to block the mesh from above, they need to be brushed off. We offer an annual inspection visit for guarded homes that handles this in 30 minutes. Most homeowners do it themselves with a leaf blower from a ladder twice a year." },
      { q: "Do you offer storm-damage warranty on Brandon gutter guards?", a: "Yes. Workmanship warranty on the install, written, full terms in the package. Manufacturer warranty on the mesh and frame. After named storms we provide insurance-ready damage documentation if any component fails outside warranty. We are family-owned with over 30 years in Tampa Bay and currently rank in the top 10 organically for gutter guards in Brandon, which means we are not going anywhere if you need service two years from now." },
    ],
    neighborhoodsOfNote: ["Bloomingdale","Brandon Pointe","Providence Lakes","Sterling Ranch","Brandon Hills","Lakemont","Lake Brandon","FishHawk Ranch"],
    trustNumbers: ["60 Brandon projects in the JR One CompanyCam record since February 2023, with current top-10 organic ranking for gutter guards in Brandon"],
  },

  // ── Phase 3 batch 2 (added 2026-05-30) ──

  "st-petersburg/gutter-cleaning": {
    introOverride: "St. Petersburg housing is the oldest concentration in our service area, median home year-built 1980 with roughly 45 percent of stock built before 1980 per Pinellas County records. Combined with 51.8 inches of average annual rainfall and 82 thunderstorm days per year per NOAA, the per-foot rain volume hitting a 45-year-old original-pitch gutter run is what drives the call. St. Petersburg Fire Rescue pulled 75 plus residents out of flooded homes during Idalia in 2023, and the post-storm pattern showed the same thing every year, the homes that came through driest were the ones with gutters actually moving water away from the foundation.",
    propsOverride: [
      ["Full hand-clean","Leaves, pine needles, shingle grit, sand from coastal Pinellas wind, all removed and bagged off site."],
      ["Salt-corrosion inspection","Gulf air drives oxidation at fastener points. Coastal St. Pete cleanings double as corrosion checks on hidden hangers and downspout elbows."],
      ["Downspout flush + flow test","Live water through every run. 45-year-old downspouts often exit at the elbow instead of grade, our flow test catches that in two minutes."],
      ["Storm-readiness report","With four named storms in 10 years (Idalia, Ian, Eta, Elsa) we know what fails first on old St. Pete systems. Documented in writing before the next event tests it."],
    ],
    faqs: [
      { q: "How much does gutter cleaning cost in St. Petersburg?", a: "Standard single-story homes in neighborhoods like Disston Heights, Crescent Lake, or Lakewood Estates run $175 to $300 for a full clean including downspout flushing and flow testing. Two-story homes in Old Northeast or Snell Isle and homes with mature oak canopy run $275 to $425. Direct Gulf-facing properties take longer because the cleaning visit doubles as a corrosion inspection. Free flat-price estimate by phone or text, no per-foot surprises." },
      { q: "How often should St. Petersburg gutters be cleaned?", a: "Twice a year is the floor. Once in May before the July through September peak-rainfall window per NOAA, and once in late fall after Florida's leaf-drop season. Homes under heavy live oak or laurel oak canopy in Old Northeast, Roser Park, or Lakewood Estates often need a third clean mid-summer because thunderstorm wind pulls debris off the canopy faster than a twice-a-year schedule catches. Skipping a cycle on a 45-year-old original-pitch gutter run is how the next overflow becomes a fascia-rebuild project." },
      { q: "What is special about cleaning gutters on older St. Pete homes?", a: "Two things. First, the pitch on a 45-year-old gutter run is rarely what it was in 1980, original hangers loosen, fascia warps, water starts pooling instead of flowing. A flow test with live water tells you in two minutes what a visual inspection cannot. Second, fascia behind 45-year-old gutters on a 45-year-old roof is often soft from decades of moisture exposure. We document fascia condition and quote any rebuild separately before doing repair work." },
      { q: "Do you work on bayfront St. Pete properties?", a: "Yes. Downtown St. Pete, Old Northeast, Snell Isle, Coquina Key, and all bayfront access including Bayway Isles. Salt-laden bay air drives aluminum oxidation faster than inland Pinellas, so cleaning visits double as corrosion inspections on every fastener point and downspout elbow. We carry the insurance and bridge-access experience for gated waterfront communities." },
      { q: "Will you clean gutters that have not been cleaned in years?", a: "Yes. Multi-year-clog cleanings take longer, sometimes require us to remove and reinstall sections to clear what is wedged in there, and usually surface fascia or seam damage that needs separate repair. We quote the cleaning flat and quote the repair separately. We do not refuse the job because it is overdue, but we are honest about what we find. Most older St. Pete homes that have skipped a few cycles need at least one repair line item." },
      { q: "Do you handle insurance-claim documentation after storms?", a: "Yes. After Idalia in 2023 and Ian in 2022 we wrote insurance-ready reports for dozens of St. Petersburg homeowners. Photos, scope of damage, replacement-cost itemization. If your gutter system was damaged by a named storm and you have an open claim, the cleaning visit is the right time to document what needs replacement or repair. We work directly with adjusters." },
      { q: "Are you insured to clean gutters in St. Petersburg?", a: "Yes. JR One Aluminum LLC carries general liability and workers compensation. We provide a current certificate of insurance on request before any work begins. Hiring an uninsured contractor on a St. Pete gutter cleaning is a foundation, fascia, and homeowner-liability risk that is not worth saving fifty bucks on, especially on the oldest housing stock in Tampa Bay." },
    ],
    neighborhoodsOfNote: ["Downtown St. Pete","Old Northeast","Snell Isle","Coquina Key","Lakewood Estates","Disston Heights","Crescent Lake","Roser Park","Bayway Isles"],
    trustNumbers: ["292 St. Petersburg projects in the JR One CompanyCam record since November 2022, the highest density in Pinellas County for us"],
  },

  "bradenton/seamless-aluminum-gutters": {
    introOverride: "Bradenton sits on the Manatee River at the mouth of Tampa Bay with 52.4 inches of average annual rainfall and three named storms in the last ten years (Idalia, Ian, Eta) per NOAA. Manatee County records show median home year-built 1980 with 44 percent of homes pre-1980, which means a lot of original-install gutter systems are at the 45-year point where volume-builder aluminum has been showing its age for a decade. Idalia in 2023 triggered Manatee County evacuation orders, and post-storm replacement demand surfaced the cities oldest-stock pattern, undersized profiles installed in the 1970s and 1980s cannot handle current Florida rain volume even when perfectly clean. JR One installs 6-inch and 7-inch K-style on Bradenton homes. We do not install 5-inch in Florida.",
    propsOverride: [
      ["On-site fabrication","Cut to your exact roofline from a single coil, no warehouse-stocked sections, no seams that fail under wind load."],
      ["6-inch and 7-inch K-style","Bradenton rainfall volume needs 6-inch minimum. 7-inch upgrade for steeper rooflines or larger 2,800 plus sq ft footprints common in Lakewood Ranch and along the Manatee River."],
      ["25 plus colors","Matched to existing fascia, trim, and body. Color match documentation for Lakewood Ranch and Anna Maria Island HOAs."],
      ["Hidden hangers, screw-in","Manatee County wind code requires it. We install it that way every time regardless of inspection."],
    ],
    faqs: [
      { q: "How much does seamless gutter installation cost in Bradenton?", a: "Single-story homes in West Bradenton, Palma Sola, or Bayshore Gardens run $1,750 to $3,400 for a full seamless replacement including downspouts and hidden hangers. Two-story homes and larger custom homes in Lakewood Ranch run $3,400 to $6,500 depending on linear footage, roofline complexity, and color match. Waterfront homes on Anna Maria Island and Longboat Key get walked and quoted on a per-property basis. Free flat-price estimate, no per-foot surprises." },
      { q: "Why 6-inch instead of 5-inch in Bradenton?", a: "Volume. Florida thunderstorms drop more rain in a 15-minute window than most U.S. markets see in an hour. A 5-inch K-style gutter overflows under Bradenton rain volume even when perfectly clean, and Manatee County's 52.4 inches of average annual rainfall plus tropical-storm dumps from Idalia, Ian, and Eta have proven it. JR One installs 6-inch as the minimum on every Florida home and 7-inch on steeper rooflines or larger footprints. We do not install 5-inch in Florida, it does not match the climate." },
      { q: "How long does seamless gutter installation take in Bradenton?", a: "Most single-story homes complete in a single day, fabrication on site in the morning, install in the afternoon. Two-story Lakewood Ranch homes and larger custom builds run one to two days depending on complexity. Waterfront installs on Anna Maria Island and Longboat Key add bridge-access and HOA-coordination time. We confirm install date after HOA architectural approval is in writing." },
      { q: "Do Bradenton HOAs require approval before gutter replacement?", a: "Lakewood Ranch, Anna Maria Island, Longboat Key, and many West Bradenton communities have architectural-review boards that require color match documentation and contractor insurance before approval. We provide the color sample, the spec sheet, and the certificate of insurance as a standard part of the estimate. We do not start work until HOA approval is in writing." },
      { q: "What is the warranty on JR One seamless gutters in Bradenton?", a: "Workmanship warranty on the install, written, full terms in the estimate package. Manufacturer warranty on the aluminum coil and the hidden hangers. We are family-owned with over 30 years in Tampa Bay and we have 170 logged Bradenton projects in the CompanyCam record since November 2022. We are still here for warranty service three years from now." },
      { q: "Will you remove and dispose of my old gutters?", a: "Yes. Old gutter aluminum, old hangers, old downspouts, all removed and hauled off site as part of the install. We sweep the property, check beds and walkways, and leave nothing behind for the homeowner to deal with." },
      { q: "Can you match copper or specialty trim on a Bradenton home?", a: "Yes. Standard aluminum installs in 25 plus color options. For high-end waterfront homes on Anna Maria Island or Longboat Key we also fabricate copper gutters on site. Copper costs roughly three times standard aluminum but lasts 75 plus years and is the right answer when matching original trim on a 1980s or older estate-class home. Free copper-vs-aluminum comparison during the estimate." },
    ],
    neighborhoodsOfNote: ["Cortez","Palma Sola","West Bradenton","Lakewood Ranch","Bayshore Gardens","Anna Maria Island","Longboat Key","Palmetto","Parrish","Holmes Beach"],
    trustNumbers: ["170 Bradenton projects in the JR One CompanyCam record since November 2022, the highest density of any market we serve outside Tampa and St. Petersburg"],
  },

  "spring-hill/seamless-aluminum-gutters": {
    introOverride: "Spring Hill is a Hernando County retirement community with median home year-built 1985 per county records and 50.5 inches of average annual rainfall per NOAA. Idalia in 2023 extended Hernando County evacuation orders into Spring Hill, surfacing what local longtime residents already knew, the cities original 1980s gutter systems were not sized for current Florida rainfall volume. Most retirement community homes here are owner-occupied long-term, which means the original gutters are still in service 35 to 40 years after the install. JR One installs 6-inch and 7-inch K-style on Spring Hill homes. We do not install 5-inch in Florida.",
    propsOverride: [
      ["On-site fabrication","Cut to your exact roofline from a single coil. No warehouse sections, no seam failures."],
      ["6-inch and 7-inch K-style","Spring Hill rain volume needs 6-inch minimum. 7-inch upgrade for steeper or larger rooflines."],
      ["25 plus colors","Matched to existing fascia and trim. Standard Florida-stock palette covers most Spring Hill subdivisions."],
      ["Hidden hangers, screw-in","Hernando County wind code requires it. We install it that way every time."],
    ],
    faqs: [
      { q: "How much does seamless gutter installation cost in Spring Hill?", a: "Standard single-story homes in Pristine Place, Royal Highlands, or Spring Hill Estates run $1,650 to $3,100 for a full seamless replacement including downspouts and hidden hangers. Larger custom homes in Glen Lakes or Timber Pines run $2,800 to $5,000 depending on linear footage and roofline complexity. Free flat-price estimate at the property, no per-foot surprises at the end." },
      { q: "Why 6-inch instead of 5-inch in Spring Hill?", a: "Florida thunderstorms drop more rain in a 15-minute window than most U.S. markets see in an hour. A 5-inch K-style gutter overflows under Spring Hill's 50.5 inches of average annual rainfall even when perfectly clean. JR One installs 6-inch as the minimum on every Florida home. We do not install 5-inch in Florida, it does not match the climate." },
      { q: "How long does seamless gutter installation take in Spring Hill?", a: "Most single-story Spring Hill homes complete in a single day. Fabrication on site in the morning, install in the afternoon. Two-story homes and larger Glen Lakes or Timber Pines custom builds run one to two days depending on complexity. We coordinate with HOA architectural review where required." },
      { q: "Do Spring Hill retirement communities require HOA approval?", a: "Glen Lakes, Timber Pines, and Sterling Hill all have active HOAs with architectural-review requirements on exterior changes including gutters. We provide the color sample, spec sheet, and certificate of insurance as part of the estimate. We do not start work until approval is in writing." },
      { q: "Can you work with fixed-income retirement budgets?", a: "Yes. We quote flat-price up front so there are no surprises mid-job. Financing through third-party partner is available. We never recommend more gutter than the roof actually needs, if 6-inch handles your house and 7-inch is an upsell, we will tell you 6-inch is enough." },
      { q: "What is the warranty on JR One Spring Hill seamless gutters?", a: "Workmanship warranty on the install, written, with full terms in the estimate package. Manufacturer warranty on the aluminum coil and hidden hangers. We are family-owned with over 30 years in Tampa Bay and 19 logged Spring Hill projects in the CompanyCam record since August 2023, with steady growth in Hernando County year over year." },
      { q: "Will you handle the old gutter removal?", a: "Yes. Old gutter aluminum, hangers, and downspouts removed and hauled off site as part of the install. We sweep the property, walk the perimeter, and leave nothing behind. No scrap aluminum piles at the curb." },
    ],
    neighborhoodsOfNote: ["Pristine Place","Royal Highlands","Spring Hill Estates","Forest Oaks","Wellington Place","Glen Lakes","Timber Pines","Sterling Hill"],
    trustNumbers: ["19 Spring Hill projects in the JR One CompanyCam record since August 2023, the only specialist aluminum contractor active in Hernando County at this density"],
  },

  "spring-hill/gutter-cleaning": {
    introOverride: "Spring Hill's housing stock is mostly 1980s and 1990s retirement community construction, with median home year-built 1985 per Hernando County records and 35 percent of stock built before 1980. Combined with 50.5 inches of average annual rainfall and 76 thunderstorm days per year per NOAA, plus Idalia in 2023 extending Hernando County evacuation orders into Spring Hill, the cleaning math is straightforward. Original 1980s downspouts on long-tenure owner-occupied homes have rarely been touched in 40 years, and Florida pine canopy plus laurel oak debris fills them fast.",
    propsOverride: [
      ["Full hand-clean","Pine needles, oak leaves, palm fronds, roof grit, all cleared and bagged. Beds left as we found them."],
      ["Downspout flush + flow test","Live water through every run before we leave. Original 1980s downspouts often exit at the elbow instead of grade."],
      ["Fascia inspection","40-year-old fascia behind a clogged gutter is often soft. We flag what is failing in writing while we are up there."],
      ["Storm-readiness report","Idalia 2023 surfaced what was already brittle. We document what will not survive the next named storm."],
    ],
    faqs: [
      { q: "How much does gutter cleaning cost in Spring Hill?", a: "Standard single-story Spring Hill homes in Pristine Place, Royal Highlands, or Spring Hill Estates run $150 to $275 for a full clean including downspout flushing and flow testing. Two-story homes and homes under mature pine canopy run $225 to $375 because we are removing more material. Estate properties in Glen Lakes or Timber Pines walked on per-property basis. Free flat-price estimate, no per-foot surprises." },
      { q: "How often should Spring Hill gutters be cleaned?", a: "Twice a year is the floor for most Spring Hill homes. Once in May before the July through September peak-rainfall window per NOAA, and once in late fall after Florida's pine and oak leaf drop. Homes backed up to wooded preserves or with heavy pine canopy often need a third clean mid-summer. Skipping a cycle on a 40-year-old original-install gutter run is how the next overflow becomes a fascia-rebuild." },
      { q: "What does pine debris do to Spring Hill gutters?", a: "Pine needles are the worst gutter clog material in Florida. They knit into a dense mat that water cannot push through, and they hold moisture against the aluminum and the fascia for weeks at a time. The result is fascia rot from the back side that you cannot see from the ground, plus accelerated oxidation. By the time the problem is visible, the fascia is already soft and the gutter pulls loose during the next thunderstorm." },
      { q: "Do you clean gutters in Spring Hill retirement communities?", a: "Yes. Glen Lakes, Timber Pines, Sterling Hill, and all retirement-community subdivisions in Spring Hill. We provide a current certificate of insurance, follow posted hours, and leave the property cleaner than we found it. Many fixed-income homeowners ask whether the cleaning fee is worth it. We answer the same way every time, the cleaning fee is one tenth of the fascia-rebuild fee, and the cleaning catches the conditions that drive a fascia rebuild." },
      { q: "Will you flag damage during the cleaning visit?", a: "Yes. That is half the value of having a specialist aluminum contractor clean versus a handyman. We are up there for an hour or two looking directly at the fascia, the hangers, the spikes, the seams, and the downspout connections. Anything failing or about to fail is photographed, written into a damage report, and quoted separately if you want it done. The cleaning price does not change either way." },
      { q: "How does Idalia 2023 affect what we look for now?", a: "Idalia stressed the entire Hernando County coast and inland system. Two years later, the damage pattern is clear, original 1980s hangers that loosened under wind load but have not yet pulled loose are the silent failure mode. We look for it on every Spring Hill cleaning, flag it, and quote re-hang as a separate line item. Catching that one issue before the next storm is what makes a $200 cleaning worth a $5,000 fascia avoid." },
      { q: "Are you insured to clean gutters in Spring Hill?", a: "Yes. JR One Aluminum LLC carries general liability and workers compensation. Certificate of insurance available on request before work begins. We have been working Hernando County since 2023 with 19 logged Spring Hill projects in the CompanyCam record." },
    ],
    neighborhoodsOfNote: ["Pristine Place","Royal Highlands","Spring Hill Estates","Forest Oaks","Wellington Place","Glen Lakes","Timber Pines","Sterling Hill"],
    trustNumbers: ["19 Spring Hill projects in the JR One CompanyCam record since August 2023, the active specialist aluminum contractor in Hernando County at this density"],
  },

  "spring-hill/gutter-repair": {
    introOverride: "Spring Hill original-install gutters from the 1980s and 1990s are reaching the 35 to 40 year point where volume-builder aluminum starts cracking at fastener points and seams separate from decades of UV and thermal cycling. Hernando County records show median home year-built 1985 and 35 percent of homes pre-1980. Combined with Idalia in 2023 which extended Hernando County evacuation orders, the result is a backlog of homes that need re-pitch, re-hang, and seam repair before the next storm tests what is already loose. Spring Hill gutter repair is a specialist call, not a handyman caulk job.",
    propsOverride: [
      ["Re-pitch and re-hang","Most Spring Hill sag is fixed with proper hangers at proper spacing, not new gutters. 40-year-old hangers loosen, fascia softens, water starts pooling instead of flowing."],
      ["Seam sealing done right","Commercial-grade gutter sealant, not silicone caulk that fails by next summer."],
      ["Downspout resize and replacement","Original 1980s downspouts are undersized for current Florida rain volume. We upsize."],
      ["Storm-claim documentation","Insurance-ready scope and photos if the claim is still open after Idalia or any future storm."],
    ],
    faqs: [
      { q: "How much does gutter repair cost in Spring Hill?", a: "Spot repairs (one seam, one downspout, hanger replacement) typically run $175 to $425. Full re-pitch and re-hang of a single run is $300 to $625 depending on length and access. Section replacement on a damaged run is $8 to $14 per linear foot installed including matching the existing profile. Free flat-price estimate at the property, no per-trip charge for the visit." },
      { q: "Should I repair or replace my 1980s Spring Hill gutters?", a: "Depends on three things. If the aluminum is sound and the problem is hangers, seams, or pitch, repair is the right call and runs roughly one-third to one-half the cost of replacement. If the aluminum is cracked at multiple points from 35 plus years of UV exposure, the original profile is too small for current rain volume (most 1980s installs are), or you are replacing more than 40 percent of linear footage anyway, replacement makes more sense. We walk the property and tell you straight which way the math works." },
      { q: "What causes Spring Hill gutters to fail?", a: "Three common causes. First, original 1980s hanger spacing too wide for Florida rain volume, the same shortcut every Florida volume-builder took. Second, hanger nails or screws that have pulled loose from 35-year-old fascia softened by moisture. Third, accumulated debris weight from missed cleanings pulling the gutter forward over decades. The fix is rarely the gutter itself, it is the hangers, the fascia, and the maintenance schedule going forward." },
      { q: "Do you handle storm-damage gutter repair in Spring Hill?", a: "Yes, and we prioritize storm calls. After Idalia in 2023 we logged Spring Hill repair visits where sections were pulled loose from fascia, downspouts torn off at the elbow, and runs separated at seams from wind-pressure differential. We document everything for insurance with photos and itemized scope. If your gutter is loose or hanging after a storm, do not wait for the next rain event to call." },
      { q: "Can you repair gutters that have already pulled away from the fascia?", a: "Usually yes, depending on the fascia condition underneath. If the fascia is sound, we re-hang at proper spacing with new fasteners and re-pitch the run. If the fascia behind the gutter is soft or rotted (common on 35 plus year old homes that have had clogged gutters), we quote the fascia replacement as a separate line item before re-hanging. We do not screw new gutters into rotted fascia and pretend it is fixed." },
      { q: "How long do Spring Hill gutter repairs last?", a: "A proper re-pitch and re-hang with hidden hangers at correct spacing typically lasts 10 to 15 years before that hardware needs attention again, assuming the gutter itself is sound and the homeowner keeps up with twice-a-year cleaning. A commercial-grade seam reseal lasts 10 plus years. A silicone-caulk handyman repair typically fails the next summer. The difference is spec and hardware, not effort." },
      { q: "Do you provide warranties on Spring Hill gutter repairs?", a: "Yes. Workmanship warranty on all repair work, written, with itemized scope. Manufacturer warranty on any replacement aluminum or hardware. We are family-owned with over 30 years in Tampa Bay and 19 logged Spring Hill projects in the CompanyCam record. We are still here for warranty service two years from now." },
    ],
    neighborhoodsOfNote: ["Pristine Place","Royal Highlands","Spring Hill Estates","Forest Oaks","Wellington Place","Glen Lakes","Timber Pines","Sterling Hill"],
    trustNumbers: ["19 Spring Hill projects in the JR One CompanyCam record since August 2023, active specialist aluminum contractor in Hernando County"],
  },

  "spring-hill/gutter-guards": {
    introOverride: "Spring Hill backs up to Withlacoochee State Forest pine and live oak in many subdivisions, and Hernando County records show 35 percent of homes are pre-1980 with original gutters still on the fascia. Combine 76 thunderstorm days per year and 50.5 inches of average annual rainfall per NOAA with mature pine and oak canopy, and the twice-a-year cleaning schedule becomes the wrong economic answer. Guards turn a three-cleanings-a-year property into a once-a-year inspection property, and they pay for themselves in two to four years on a typical Spring Hill home with tree coverage.",
    propsOverride: [
      ["Micro-mesh stainless guard","Blocks pine needles, the test most consumer guards fail. Spring Hill has too much pine canopy for anything less."],
      ["Works with existing 6-inch and 7-inch gutters","Retrofit onto your current system if the existing gutter is sound. No full replacement needed."],
      ["Cuts cleaning frequency","Three cleanings a year drops to one inspection visit. Math works in two to four years for canopy-heavy homes."],
      ["Lifetime mesh warranty","Stainless steel mesh does not rust, warp, or collapse under debris load. Written warranty in the install package."],
    ],
    faqs: [
      { q: "How much do gutter guards cost in Spring Hill?", a: "Micro-mesh stainless guard installation typically runs $8 to $14 per linear foot installed in Spring Hill. A standard single-story home with 150 to 200 linear feet of gutter runs $1,200 to $2,800 total. Larger Glen Lakes or Timber Pines homes and homes with complex rooflines run higher. Free flat-price estimate at the property." },
      { q: "Are gutter guards worth it in Spring Hill?", a: "On a property with mature pine, oak, or laurel canopy, yes. A typical Spring Hill home with heavy tree coverage needs three cleanings per year at roughly $200 to $275 each, so $600 to $825 annually. A guard install at $1,500 to $2,500 pays back in two to four years and lasts 20 plus. On a property with minimal landscaping (newer Sterling Hill, smaller lots), the math is closer to break-even and we will tell you that straight during the estimate." },
      { q: "Will gutter guards stop pine needles?", a: "Micro-mesh stainless guards do, if the mesh is fine enough. Most consumer-grade guards on the market (the perforated metal screen at hardware stores) fail the pine-needle test, needles slide through the holes and clog the gutter underneath. JR One installs micro-mesh that handles pine needles, which matters in Spring Hill because pine canopy is everywhere from Royal Highlands to Pristine Place." },
      { q: "Do gutter guards work with existing 6-inch gutters?", a: "Yes. We retrofit guards onto sound existing 6-inch and 7-inch K-style gutters. If the existing gutter has separated seams, sagging runs, or pulled-loose hangers, we address those issues first or quote a full replacement, installing guards on a failing gutter is throwing money away. We walk the property and tell you straight which path makes sense." },
      { q: "How long do gutter guards last in Spring Hill?", a: "Stainless steel micro-mesh itself does not rust, warp, or collapse under debris load. The frame and fasteners typically warrant for 20 plus years. The gutter underneath is the wearing part, and a properly maintained gutter with guards installed lasts 25 to 35 years in Florida." },
      { q: "Will I still need any gutter maintenance with guards installed?", a: "Yes, but it shrinks from active cleaning to once-a-year inspection. Some fine debris and pollen accumulates on top of the mesh and gets washed off by the next rain. If pine needles or oak leaves pile up enough to block the mesh from above, they need brushing off. We offer an annual inspection visit for guarded homes that handles this in 30 minutes." },
      { q: "Do you offer storm-damage warranty on Spring Hill gutter guards?", a: "Yes. Workmanship warranty on the install, written, full terms in the package. Manufacturer warranty on the mesh and frame. After named storms we provide insurance-ready damage documentation if any component fails outside warranty. We are family-owned with over 30 years in Tampa Bay and 19 logged Spring Hill projects in the CompanyCam record." },
    ],
    neighborhoodsOfNote: ["Pristine Place","Royal Highlands","Spring Hill Estates","Forest Oaks","Wellington Place","Glen Lakes","Timber Pines","Sterling Hill"],
    trustNumbers: ["19 Spring Hill projects in the JR One CompanyCam record since August 2023, active specialist aluminum contractor in Hernando County"],
  },

  "sarasota/seamless-aluminum-gutters": {
    introOverride: "Sarasota housing skews the oldest in our service area, median home year-built 1975 with 52 percent of stock built before 1980 per Sarasota County records. Combined with 53.1 inches of average annual rainfall per NOAA, the highest in our service area, plus three named storms in the last ten years (Idalia, Ian, Eta), the demand for proper Florida-spec seamless gutter on Sarasota homes is straightforward, original 1970s 5-inch gutters were never sized for current rain volume even when perfectly clean. JR One installs 6-inch and 7-inch K-style on Sarasota homes. We do not install 5-inch in Florida.",
    propsOverride: [
      ["On-site fabrication","Cut to your exact roofline from a single continuous coil. No sections, no seams, no leaks at the joints."],
      ["6-inch and 7-inch K-style","Sarasota rainfall volume needs 6-inch minimum. 7-inch upgrade for steeper rooflines or larger 2,800 plus sq ft footprints common in West of Trail, Oyster Bay, and Lakewood Ranch."],
      ["25 plus colors","Matched to existing fascia, trim, and body. Custom-color matching for high-end Siesta Key, Lido Key, and Bird Key estate homes."],
      ["Hidden hangers, screw-in","Sarasota County wind code requires it. We install it that way every time regardless of inspection."],
    ],
    faqs: [
      { q: "How much does seamless gutter installation cost in Sarasota?", a: "Standard single-story homes in Palmer Ranch, Sarasota Springs, or Gulf Gate run $1,850 to $3,500 for a full seamless replacement including downspouts and hidden hangers. Two-story homes and larger Lakewood Ranch builds run $3,400 to $6,500 depending on linear footage and roofline complexity. Estate properties west of Trail or on the keys (Siesta, Lido, Bird) are walked and quoted on a per-property basis. Free flat-price estimate." },
      { q: "Why 6-inch instead of 5-inch in Sarasota?", a: "Volume. Sarasota gets 53.1 inches of average annual rainfall per NOAA, the highest in our service area. A 5-inch K-style gutter overflows at peak rain volume even when perfectly clean, and a clogged 5-inch gutter overflows on the first thunderstorm of the season. JR One installs 6-inch as the minimum on every Florida home and 7-inch on steeper rooflines or larger footprints. We do not install 5-inch in Florida, it does not match the climate." },
      { q: "How long does seamless gutter installation take in Sarasota?", a: "Most single-story homes complete in a single day. Fabrication on site in the morning, install in the afternoon. Two-story homes, larger Lakewood Ranch builds, and estate-class properties west of Trail run one to two days. Island installs on Siesta Key, Lido Key, and Bird Key add bridge-access and HOA-coordination time." },
      { q: "Do Sarasota HOAs require approval before gutter replacement?", a: "Most do. Lakewood Ranch, Palmer Ranch, Oyster Bay, and most Siesta Key, Lido Key, and Bird Key communities have architectural-review boards that require color match documentation and contractor insurance before approval. We provide the color sample, spec sheet, and certificate of insurance as part of the estimate. We do not start work until HOA approval is in writing." },
      { q: "Can you match copper or specialty trim on a high-end Sarasota home?", a: "Yes. Standard aluminum installs in 25 plus color options. For high-end West of Trail, Oyster Bay, or island estate homes we also fabricate copper gutters on site. Copper costs roughly three times standard aluminum but lasts 75 plus years and is the right answer when matching original trim on a 1970s estate-class home. Free copper-vs-aluminum comparison during the estimate." },
      { q: "What is the warranty on JR One seamless gutters in Sarasota?", a: "Workmanship warranty on the install, written, full terms in the estimate package. Manufacturer warranty on the aluminum coil and the hidden hangers. We are family-owned with over 30 years in Tampa Bay and 85 logged Sarasota projects in the CompanyCam record since November 2022. We are still here for warranty service three years from now." },
      { q: "Will you remove and dispose of my old gutters?", a: "Yes. Old gutter aluminum, hangers, and downspouts removed and hauled off site as part of the install. We sweep the property, check beds and walkways, and leave nothing behind. No scrap aluminum piles at the curb for the homeowner to deal with." },
    ],
    neighborhoodsOfNote: ["Palmer Ranch","Lakewood Ranch","Siesta Key","Lido Key","Bird Key","Gulf Gate","Sarasota Springs","West of Trail","Oyster Bay","Arlington Park"],
    trustNumbers: ["85 Sarasota projects in the JR One CompanyCam record since November 2022, the established specialist aluminum contractor in Sarasota County for cleanings, repairs, and seamless replacements"],
  },

  "new-port-richey/gutter-cleaning": {
    introOverride: "New Port Richey is a coastal Pasco County market with 50.8 inches of average annual rainfall and 78 thunderstorm days per year per NOAA. Pasco County records show median home year-built 1975 and 48 percent of homes pre-1980, which means a lot of original-install gutter systems are at the 45-year point. Idalia in 2023 produced significant flooding in New Port Richey, and post-storm replacement demand surfaced the cities oldest-stock pattern, original 1970s downspouts were undersized for current Florida rain volume even when perfectly clean. Twice-a-year cleaning is the floor on housing stock that old in a coastal storm market.",
    propsOverride: [
      ["Full hand-clean","Pine needles, oak leaves, palm fronds, and roof grit removed and bagged off site. Beds left as we found them."],
      ["Coastal-corrosion check","Gulf air drives aluminum oxidation at fastener points. New Port Richey cleanings double as corrosion inspections on hidden hangers and downspout elbows."],
      ["Downspout flush + flow test","Live water through every run. Original 1970s downspouts often exit at the elbow instead of grade, our flow test catches that in two minutes."],
      ["Storm-readiness report","With three named storms in 10 years (Idalia, Eta, Elsa) we know what fails first on coastal Pasco systems. Documented in writing before the next event tests it."],
    ],
    faqs: [
      { q: "How much does gutter cleaning cost in New Port Richey?", a: "Standard single-story homes in Gulf Harbors, Magnolia Valley, or Jasmine Lakes run $175 to $300 for a full clean including downspout flushing and flow testing. Two-story homes and homes under mature oak canopy run $250 to $400 because we are removing more material. Waterfront homes on the Pithlachascotee River or near the Gulf get walked and quoted per-property because the visit doubles as a corrosion inspection. Free flat-price estimate." },
      { q: "How often should New Port Richey gutters be cleaned?", a: "Twice a year is the floor. Once in May before the July through September peak-rainfall window per NOAA, and once in late fall after Florida's oak and pine leaf-drop window. Homes under heavy canopy or near waterfront often need a third clean mid-summer because thunderstorm wind drives debris into the gutter faster than a twice-a-year schedule catches. Skipping a cycle on a 45-year-old original-install gutter run is how the next overflow becomes a fascia rebuild." },
      { q: "What is special about cleaning gutters on older New Port Richey homes?", a: "Two things. First, the pitch on a 45-year-old gutter run is rarely what it was in 1975, original hangers loosen, fascia warps, water starts pooling instead of flowing. A flow test with live water tells you in two minutes what a visual inspection cannot. Second, fascia behind 45-year-old gutters on a 45-year-old roof is often soft from decades of moisture exposure. We document fascia condition and quote any rebuild separately before doing repair work." },
      { q: "Do you clean gutters on coastal New Port Richey homes?", a: "Yes. We work Gulf Harbors, Riverside Drive, all waterfront access to the Pithlachascotee, and the bridge-accessed islands. Salt air drives aluminum oxidation faster than inland Pasco, so the cleaning visit is also the time we flag any aluminum component that will not survive another storm season. We carry the insurance and bridge-access experience for gated waterfront communities." },
      { q: "Will you spot gutter damage while cleaning?", a: "Yes. That is half the value of having a specialist aluminum contractor clean versus a handyman. We are up there for an hour or two looking directly at the fascia, the hangers, the spikes, the seams, and the downspout connections. Anything failing or about to fail is photographed, written into a damage report, and quoted separately if you want it done. The cleaning price does not change either way." },
      { q: "Do you handle insurance-claim documentation after storms?", a: "Yes. After Idalia in 2023 we wrote insurance-ready reports for New Port Richey homeowners. Photos, scope of damage, replacement-cost itemization. If your gutter system was damaged by a named storm and you have an open claim, the cleaning visit is the right time to document what needs replacement or repair. We work directly with adjusters." },
      { q: "Are you insured to clean gutters in New Port Richey?", a: "Yes. JR One Aluminum LLC carries general liability and workers compensation. Certificate of insurance available on request before work begins. Hiring an uninsured contractor on a New Port Richey gutter cleaning is a foundation, fascia, and homeowner-liability risk that is not worth saving fifty bucks on." },
    ],
    neighborhoodsOfNote: ["Gulf Harbors","Magnolia Valley","Jasmine Lakes","River Ridge","Trinity","Seven Springs","Holiday","Riverside Drive"],
    trustNumbers: ["51 New Port Richey projects in the JR One CompanyCam record since November 2022, the established specialist aluminum contractor in coastal Pasco for cleanings, repairs, and replacements"],
  },

  "clearwater/seamless-aluminum-gutters": {
    introOverride: "Clearwater is a coastal Pinellas County market with 82 thunderstorm days per year and 51.8 inches of average annual rainfall per NOAA. Idalia in 2023 produced severe storm surge on Treasure Island and Sunset Beach, and four named storms have come within 50 miles of Clearwater in the last ten years (Idalia, Ian, Eta, Elsa). Pinellas County records show 42 percent of Clearwater housing is pre-1980, which means a lot of original 5-inch gutter systems are still in service on roofs that have seen four hurricane seasons in a decade. JR One installs 6-inch and 7-inch K-style on Clearwater homes. We do not install 5-inch in Florida.",
    propsOverride: [
      ["On-site fabrication","Cut to your exact roofline from a single coil, no warehouse sections, no seam failures under hurricane wind load."],
      ["6-inch and 7-inch K-style","Clearwater rainfall volume needs 6-inch minimum. 7-inch upgrade for steeper rooflines or coastal-facing Clearwater Beach and Sand Key properties."],
      ["25 plus colors","Matched to existing fascia, trim, and body. Color match documentation for Sand Key, Island Estates, and Belleair HOAs."],
      ["Hidden hangers, screw-in","Pinellas County wind code requires it. We install it that way every time regardless of inspection, especially on coastal Clearwater properties."],
    ],
    faqs: [
      { q: "How much does seamless gutter installation cost in Clearwater?", a: "Standard single-story homes in Countryside, Sunset Point, or Skycrest run $1,800 to $3,400 for a full seamless replacement including downspouts and hidden hangers. Two-story homes and homes on Sand Key or Clearwater Beach run $3,500 to $6,500 depending on linear footage, roofline complexity, and color match. Direct Gulf-facing properties take longer because installation also includes corrosion-resistant fastener inspection. Free flat-price estimate." },
      { q: "Why 6-inch instead of 5-inch in Clearwater?", a: "Volume plus storm exposure. Florida thunderstorms drop more rain in a 15-minute window than most U.S. markets see in an hour, and Clearwater has taken four named storms in 10 years. A 5-inch K-style gutter overflows at Clearwater rain volume even when perfectly clean. JR One installs 6-inch as the minimum on every Florida home and 7-inch on steeper rooflines or larger footprints. We do not install 5-inch in Florida, it does not match the climate." },
      { q: "How long does seamless gutter installation take in Clearwater?", a: "Most single-story homes complete in a single day. Fabrication on site in the morning, install in the afternoon. Two-story homes, larger Belleair builds, and island installs (Clearwater Beach, Sand Key, Island Estates) run one to two days depending on complexity and bridge access. HOA-approved color match must be in writing before fabrication." },
      { q: "Do Clearwater HOAs require approval before gutter replacement?", a: "Most do. Sand Key, Island Estates, Belleair, and the gated communities in Countryside have architectural-review boards that require color match documentation and contractor insurance before approval. We provide the color sample, spec sheet, and certificate of insurance as part of the estimate. We do not start work until HOA approval is in writing." },
      { q: "Are seamless gutters more resistant to hurricane wind?", a: "Yes. Sectional gutters fail at the seams under wind-pressure differential, that is where wind lifts the gutter and pries it off the fascia. A continuous seamless run with hidden hangers screwed into solid fascia handles hurricane wind better because there are no failure points along the run, only at the corners and downspout connections, both of which we spec for Florida hurricane code. Coastal Clearwater is where this matters most." },
      { q: "What is the warranty on JR One seamless gutters in Clearwater?", a: "Workmanship warranty on the install, written, full terms in the estimate package. Manufacturer warranty on the aluminum coil and the hidden hangers. We are family-owned with over 30 years in Tampa Bay and 102 logged Clearwater projects in the CompanyCam record since November 2022. We are still here for warranty service three years from now." },
      { q: "Can you match copper trim on a Clearwater Beach estate home?", a: "Yes. Standard aluminum installs in 25 plus color options. For Sand Key, Clearwater Beach, or Belleair estate homes we also fabricate copper gutters on site. Copper costs roughly three times standard aluminum but lasts 75 plus years and is the right answer when matching original trim or shooting for the next 50 years of low maintenance on a coastal property. Free copper-vs-aluminum comparison during the estimate." },
    ],
    neighborhoodsOfNote: ["Countryside","Sunset Point","Clearwater Beach","Island Estates","Sand Key","Belleair","Morningside","Skycrest"],
    trustNumbers: ["102 Clearwater projects in the JR One CompanyCam record since November 2022, the second-highest density in Pinellas County for us"],
  },

  "bradenton/gutter-repair": {
    introOverride: "Bradenton sits on the Manatee River at the mouth of Tampa Bay with 52.4 inches of average annual rainfall and three named storms in the last ten years (Idalia, Ian, Eta) per NOAA. Manatee County records show median home year-built 1980 with 44 percent of homes pre-1980, which means a lot of original gutter systems are at the 45-year point where hangers loosen, seams separate, and aluminum cracks at fastener points. Idalia in 2023 triggered Manatee County evacuation orders, and the post-storm repair pattern is the same every year, the homes with original-install gutters take the hit first and hardest. Bradenton gutter repair is a specialist call, not a handyman caulk job.",
    propsOverride: [
      ["Re-pitch and re-hang","Most Bradenton sag is fixed with proper hangers at proper spacing, not new gutters. 45-year-old hangers loosen, fascia softens, water pools instead of flowing."],
      ["Seam sealing done right","Commercial-grade gutter sealant, not silicone caulk that fails by next summer."],
      ["Downspout resize and replacement","Original 1980s downspouts are undersized for current Florida rain volume. We upsize to handle peak storm flow."],
      ["Storm-claim documentation","Insurance-ready scope and photos if the claim is still open after Idalia, Ian, or any future storm."],
    ],
    faqs: [
      { q: "How much does gutter repair cost in Bradenton?", a: "Spot repairs (one seam, one downspout, hanger replacement) typically run $200 to $475. Full re-pitch and re-hang of a single run is $325 to $700 depending on length and access. Section replacement on a damaged run is $9 to $15 per linear foot installed including matching the existing profile. Waterfront homes on Anna Maria Island and Longboat Key are walked and quoted on a per-property basis. Free flat-price estimate, no per-trip charge." },
      { q: "Should I repair or replace my 1980s Bradenton gutters?", a: "Depends on three things. If the aluminum is sound and the problem is hangers, seams, or pitch, repair is the right call and runs roughly one-third to one-half the cost of replacement. If the aluminum is cracked at multiple points from 45 plus years of UV and salt-air exposure, the original profile is too small for current rain volume (most 1980s installs are), or you are replacing more than 40 percent of linear footage anyway, replacement makes more sense. We walk the property and tell you straight." },
      { q: "What causes Bradenton gutters to fail?", a: "Three common causes. First, original 1980s hanger spacing too wide for Florida rain volume plus Manatee County wind exposure. Second, hanger nails or screws that have pulled loose from 45-year-old fascia softened by moisture. Third, accumulated debris weight from missed cleanings pulling the gutter forward over decades. Storms compound all three, Idalia 2023 surfaced loosened hangers across Bradenton that had been silently failing since Ian in 2022." },
      { q: "Do you handle storm-damage gutter repair in Bradenton?", a: "Yes, and we prioritize storm calls. After Idalia in 2023 and Ian in 2022 we logged dozens of Bradenton repair visits, most of them sections pulled loose from fascia, downspouts torn off at the elbow, and runs separated at seams from wind-pressure differential. We document everything for insurance with photos and itemized scope. We work directly with adjusters. If your gutter is loose or hanging after a storm, do not wait for the next rain event." },
      { q: "Can you repair gutters that have pulled away from the fascia?", a: "Usually yes, depending on the fascia condition underneath. If the fascia is sound, we re-hang at proper spacing with new fasteners and re-pitch the run. If the fascia behind the gutter is soft or rotted (common on 45 plus year old homes that have had clogged gutters), we quote the fascia replacement as a separate line item before re-hanging. We do not screw new gutters into rotted fascia and pretend it is fixed." },
      { q: "How long do Bradenton gutter repairs last?", a: "A proper re-pitch and re-hang with hidden hangers at correct spacing typically lasts 10 to 15 years before that hardware needs attention again, assuming the gutter itself is sound and the homeowner cleans twice a year. A commercial-grade seam reseal lasts 10 plus years. A silicone-caulk handyman repair typically fails the next summer. The difference is spec and hardware, not effort." },
      { q: "Do you provide warranties on Bradenton gutter repairs?", a: "Yes. Workmanship warranty on all repair work, written, with itemized scope. Manufacturer warranty on any replacement aluminum or hardware. We are family-owned with over 30 years in Tampa Bay and 170 logged Bradenton projects in the CompanyCam record since November 2022. We are not going anywhere if you need warranty service two years from now." },
    ],
    neighborhoodsOfNote: ["Cortez","Palma Sola","West Bradenton","Lakewood Ranch","Bayshore Gardens","Anna Maria Island","Longboat Key","Palmetto","Parrish","Holmes Beach"],
    trustNumbers: ["170 Bradenton projects in the JR One CompanyCam record since November 2022, the highest density of any market we serve outside Tampa and St. Petersburg"],
  },

  "sarasota/gutter-repair": {
    introOverride: "Sarasota housing skews the oldest in our service area, median year-built around 1975 with roughly 52 percent of homes built before 1980 per Sarasota County records. Original gutter systems on 50-year-old fascia behind 50-year-old roofs are not failing because of one cause, they are failing because hangers loosened, fascia softened, downspouts undersized, and seams separated, all at once. Add 53.1 inches of average annual rainfall per NOAA and three named storms in the last ten years (Idalia, Ian, Eta), and Sarasota gutter repair is a specialist call, not a handyman caulk job.",
    propsOverride: [
      ["Re-pitch and re-hang","Original-pitch 1970s gutters rarely drain right after 50 years. Proper hangers, proper spacing fix it."],
      ["Seam sealing done right","Commercial-grade gutter sealant, not silicone caulk. 10 to 15 year fix instead of next-summer fix."],
      ["Downspout resize","Original 1970s downspouts are undersized for current Florida rain volume. We upsize."],
      ["Storm-claim documentation","Photos, scope, replacement-cost itemization, insurance-ready, after Idalia, Ian, or any future storm."],
    ],
    faqs: [
      { q: "How much does gutter repair cost in Sarasota?", a: "Spot repairs (one seam, one downspout, hanger replacement) typically run $200 to $475. Full re-pitch and re-hang of a single run is $325 to $700 depending on length and access. Section replacement on a damaged run is $9 to $15 per linear foot installed including matching the existing profile. Estate properties west of Trail or on the keys are walked and quoted on a per-property basis. Free flat-price estimate, no per-trip charge." },
      { q: "Should I repair or replace my 1970s Sarasota gutters?", a: "Honest answer, sometimes the better economics is replacement, and we will tell you that even though the repair quote is smaller. If the aluminum is cracked at multiple points from 50 years of UV and salt-air exposure, if the original profile is too small for current rain volume (most 1970s installs are), and if you are replacing more than 40 percent of linear footage in spot work anyway, full replacement saves money in the long run. If the aluminum is still sound and the issue is hangers, seams, or pitch, repair is the right call. We walk the property and tell you straight." },
      { q: "What is special about repairing older Sarasota homes?", a: "Two things. First, fascia behind 50-year-old gutters is often soft from decades of moisture exposure, and you cannot screw new hardware into rotted wood and call it fixed. We document fascia condition and quote any rebuild separately before doing the gutter work. Second, original-install pitch was rarely Florida-rain-volume correct even in 1975. A flow test with live water tells you in two minutes what is actually happening up there, and most older Sarasota homes need a re-pitch in addition to whatever else got us called out." },
      { q: "Do you handle gutter repair on Siesta Key, Lido Key, and Bird Key?", a: "Yes. Island properties get the same service standard as inland Sarasota. We work around bridge access, gated communities, and HOA architectural-review requirements. Salt-air corrosion is more aggressive on the keys, so even repair calls double as corrosion inspections on every fastener, downspout elbow, and aluminum-to-aluminum joint." },
      { q: "Can you repair storm damage after a hurricane?", a: "Yes. After Idalia in 2023 and Ian in 2022 we logged dozens of Sarasota storm-damage repair calls. Sections pulled loose from fascia, downspouts torn off at the elbow, runs separated at seams from wind-pressure differential. We document everything for insurance with photos and itemized scope. We work directly with adjusters. If your gutter is loose, hanging, or detached after a storm, do not wait for the next rain event to call." },
      { q: "Do you provide warranties on Sarasota gutter repairs?", a: "Yes. Workmanship warranty on all repair work, written, with itemized scope. Manufacturer warranty on any replacement aluminum or hardware. Full terms provided in the estimate package. We are family-owned with over 30 years in Tampa Bay and have 85 logged Sarasota projects in the CompanyCam record since 2022. We are not a fly-by-night, we will be here if you need warranty service two years from now." },
      { q: "How long do JR One Sarasota gutter repairs last?", a: "A proper re-pitch and re-hang with hidden hangers at correct spacing typically lasts 10 to 15 years before that hardware needs attention again, assuming the gutter itself is sound and the homeowner cleans twice a year. A commercial-grade seam reseal lasts 10 plus years. A silicone-caulk handyman repair typically fails the next summer. The difference is spec and hardware, not effort." },
    ],
    neighborhoodsOfNote: ["Palmer Ranch","Lakewood Ranch","Siesta Key","Lido Key","Bird Key","Gulf Gate","Sarasota Springs","West of Trail","Oyster Bay","Arlington Park"],
    trustNumbers: ["85 Sarasota projects in the JR One CompanyCam record since November 2022, across cleanings, repairs, and seamless-gutter replacements"],
  },
};

// ── Next.js config ────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const params = [];
  for (const slug of CITY_SLUGS) {
    for (const service of Object.keys(SERVICES)) {
      params.push({ slug, service });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug, service } = await params;
  if (!CITY_SLUGS.includes(slug) || !SERVICES[service]) {
    return { title: "Not Found" };
  }
  const city = CITY_META[slug];
  const svc = SERVICES[service];
  const title = `${svc.name} in ${city.name}, FL`;
  const description = `${svc.name} in ${city.name}, Florida. Family-owned specialist with over 30 years in Tampa Bay. Bilingual English/Spanish. Free estimate (844) 444-3114.`;
  const url = `https://jronegutters.com/areas/${slug}/${service}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    keywords: [
      `${svc.short} ${city.name} FL`,
      `${svc.short} ${city.name}`,
      `${svc.short} near ${city.name}`,
      `${svc.name} ${city.name}`,
      `aluminum contractor ${city.name}`,
      `${svc.short} installation ${city.name} FL`,
    ],
    openGraph: {
      title: `${svc.name}, ${city.name}, FL`,
      description: `${svc.name} in ${city.name}, FL. Specialist aluminum contractor, over 30 years experience. (844) 444-3114.`,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${svc.name} in ${city.name}, FL`,
      description: `Specialist ${svc.short} in ${city.name}. Free estimate, (844) 444-3114.`,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────
export default async function CityServicePage({ params }) {
  const { slug, service } = await params;
  if (!CITY_SLUGS.includes(slug) || !SERVICES[service]) notFound();

  const city = CITY_META[slug];
  const svc = SERVICES[service];
  const url = `https://jronegutters.com/areas/${slug}/${service}`;

  // Phase 3 Batch 1 — top-10 ROI combo enrichment lookup. Falls through to
  // generic template when no enrichment is defined for this combo.
  const enrichment = ENRICHMENT[`${slug}/${service}`] || null;
  const propsToRender = enrichment?.propsOverride || svc.props;

  const otherServices = Object.entries(SERVICES).filter(([k]) => k !== service);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${svc.name} in ${city.name}, FL`,
    serviceType: svc.name,
    description: `${svc.blurb} Serving ${city.name}, Florida homeowners with over 30 years of Tampa Bay aluminum specialist experience. Bilingual English/Spanish.`,
    areaServed: {
      "@type": "City",
      name: city.name,
      address: { "@type": "PostalAddress", addressRegion: "FL", addressCountry: "US" },
    },
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "JR One Aluminum LLC",
      url: "https://jronegutters.com",
      telephone: "(844) 444-3114",
      email: "info@jronegutters.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3420 W Cherry St",
        addressLocality: "Tampa",
        addressRegion: "FL",
        postalCode: "33607",
        addressCountry: "US",
      },
      // aggregateRating removed 2026-05-26 per audit Tier 1.7 (self-serving rule).
    },
    offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://jronegutters.com/areas" },
      { "@type": "ListItem", position: 3, name: city.name, item: `https://jronegutters.com/areas/${slug}` },
      { "@type": "ListItem", position: 4, name: svc.name, item: url },
    ],
  };

  // FAQPage JSON-LD only emitted when enrichment provides FAQs.
  const faqSchema = enrichment?.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: enrichment.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <div style={{ background: C.bg, minHeight: "100vh", fontFamily: f.b, color: C.white }}>
        <SiteNav />

        {/* Hero */}
        <section style={{ background: `linear-gradient(180deg, ${C.navy} 0%, ${C.bg} 100%)`, padding: "120px 20px 60px", textAlign: "center" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ display: "inline-block", padding: "6px 16px", background: C.goldPale, borderRadius: "4px", marginBottom: "16px" }}>
              <span style={{ fontFamily: f.h, fontSize: "12px", fontWeight: 700, color: C.gold, letterSpacing: "3px" }}>
                {city.name.toUpperCase()}, FL · SPECIALIST ALUMINUM CONTRACTOR
              </span>
            </div>
            <h1 style={{ fontFamily: f.h, fontSize: "clamp(32px,5vw,54px)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 18px", color: C.white }}>
              {svc.name} in <span style={{ color: C.gold }}>{city.name}, FL</span>
            </h1>
            <p style={{ fontSize: "18px", color: C.offWhite, maxWidth: "720px", margin: "0 auto 28px", lineHeight: 1.6 }}>
              {svc.blurb}
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="tel:+18444443114" style={{ background: C.gold, color: C.navy, padding: "14px 28px", borderRadius: "8px", fontFamily: f.h, fontWeight: 700, textDecoration: "none", fontSize: "15px" }}>
                Call (844) 444-3114
              </a>
              <Link href="/estimator" style={{ background: "transparent", color: C.white, border: `2px solid ${C.gold}`, padding: "12px 28px", borderRadius: "8px", fontFamily: f.h, fontWeight: 700, textDecoration: "none", fontSize: "15px" }}>
                Free Estimate
              </Link>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <nav style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px", fontSize: "13px", color: C.muted }}>
          <Link href="/" style={{ color: C.muted, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/areas" style={{ color: C.muted, textDecoration: "none" }}>Service Areas</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href={`/areas/${slug}`} style={{ color: C.muted, textDecoration: "none" }}>{city.name}</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: C.gold }}>{svc.name}</span>
        </nav>

        {/* Intro — enriched combos replace city.localP + city.weatherNote with
            a service-specific opening paragraph; svc.who line stays for service
            relevance. */}
        <section style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
          <h2 style={{ fontFamily: f.h, fontSize: "28px", fontWeight: 700, color: C.gold, marginBottom: "18px" }}>
            Why {svc.short} matters in {city.name}
          </h2>
          {enrichment?.introOverride ? (
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: C.offWhite, marginBottom: "18px" }}>
              {enrichment.introOverride}
            </p>
          ) : (
            <>
              <p style={{ fontSize: "17px", lineHeight: 1.7, color: C.offWhite, marginBottom: "18px" }}>
                {city.localP}
              </p>
              <p style={{ fontSize: "17px", lineHeight: 1.7, color: C.offWhite, marginBottom: "18px" }}>
                {city.weatherNote}
              </p>
            </>
          )}
          <p style={{ fontSize: "17px", lineHeight: 1.7, color: C.offWhite }}>
            {svc.who} JR One has over 30 years of Tampa Bay aluminum specialist experience, and we bring the same Gold Standard service to every {city.name} project, fully insured, bilingual English/Spanish, family-owned and family-operated.
          </p>
          {enrichment?.trustNumbers?.length > 0 && (
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: C.gold, marginTop: "18px", fontStyle: "italic" }}>
              {enrichment.trustNumbers.join(" · ")}.
            </p>
          )}
        </section>

        {/* Value props */}
        <section style={{ background: C.navyFade, padding: "50px 20px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: f.h, fontSize: "26px", fontWeight: 700, color: C.white, textAlign: "center", marginBottom: "36px" }}>
              What {city.name} homeowners get with JR One
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "22px" }}>
              {propsToRender.map(([title, body]) => (
                <div key={title} style={{ background: C.navyMid, padding: "22px", borderRadius: "10px", border: `1px solid ${C.navyLight}` }}>
                  <h3 style={{ fontFamily: f.h, fontSize: "16px", fontWeight: 700, color: C.gold, marginBottom: "8px" }}>{title}</h3>
                  <p style={{ fontSize: "14.5px", color: C.offWhite, lineHeight: 1.55, margin: 0 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section style={{ padding: "40px 20px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "14px", padding: "14px 26px", background: C.navyMid, borderRadius: "10px", border: `1px solid ${C.gold}` }}>
            <span style={{ color: C.gold, fontSize: "18px", letterSpacing: "2px" }}>★★★★★</span>
            <span style={{ fontFamily: f.h, fontWeight: 700, color: C.white, fontSize: "15px" }}>4.9 / 5.0 · 55 reviews</span>
            <span style={{ color: C.muted, fontSize: "14px" }}>· Fully insured · Bilingual EN/ES</span>
          </div>
        </section>

        {/* CompanyCam evidence — real per-city per-service portfolio */}
        <section
          className="city-portfolio-section"
          style={{
            background: C.cream,
            color: C.charcoal,
            padding: "60px 20px",
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <CityPortfolio citySlug={slug} cityName={city.name} serviceFilter={service} limit={9} />
          </div>
        </section>

        {/* FAQ section — enriched combos only. FAQPage JSON-LD emitted in head. */}
        {enrichment?.faqs?.length > 0 && (
          <section style={{ maxWidth: "900px", margin: "0 auto", padding: "50px 20px" }}>
            <h2 style={{ fontFamily: f.h, fontSize: "28px", fontWeight: 700, color: C.gold, marginBottom: "28px", textAlign: "center" }}>
              Frequently asked, {svc.short} in {city.name}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              {enrichment.faqs.map((f, i) => (
                <div key={i} style={{ background: C.navyMid, padding: "22px 24px", borderRadius: "10px", border: `1px solid ${C.navyLight}` }}>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "17px", fontWeight: 700, color: C.white, margin: "0 0 12px" }}>
                    {f.q}
                  </h3>
                  <p style={{ fontSize: "15.5px", color: C.offWhite, lineHeight: 1.65, margin: 0 }}>
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Neighborhood callouts — enriched combos only. */}
        {enrichment?.neighborhoodsOfNote?.length > 0 && (
          <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 20px 40px" }}>
            <div style={{ background: C.navyMid, padding: "28px", borderRadius: "10px", border: `1px solid ${C.gold}` }}>
              <h3 style={{ fontFamily: f.h, fontSize: "18px", fontWeight: 700, color: C.gold, marginBottom: "14px" }}>
                {svc.name} across {city.name} neighborhoods
              </h3>
              <p style={{ fontSize: "15px", color: C.offWhite, lineHeight: 1.65, margin: "0 0 14px" }}>
                We work {svc.short} jobs across {city.name} including:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {enrichment.neighborhoodsOfNote.map((n) => (
                  <span key={n} style={{ background: C.navyLight, color: C.white, padding: "8px 14px", borderRadius: "20px", fontSize: "14px", fontFamily: f.h, fontWeight: 600 }}>
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Cross-links */}
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 20px 50px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
            <div style={{ background: C.navyMid, padding: "24px", borderRadius: "10px" }}>
              <h3 style={{ fontFamily: f.h, fontSize: "17px", fontWeight: 700, color: C.gold, marginBottom: "14px" }}>
                Also in {city.name}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {otherServices.map(([key, s]) => (
                  <li key={key} style={{ marginBottom: "8px" }}>
                    <Link href={`/areas/${slug}/${key}`} style={{ color: C.offWhite, textDecoration: "none", fontSize: "14.5px" }}>
                      › {s.name} in {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: C.navyMid, padding: "24px", borderRadius: "10px" }}>
              <h3 style={{ fontFamily: f.h, fontSize: "17px", fontWeight: 700, color: C.gold, marginBottom: "14px" }}>
                Nearby cities for {svc.short}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {city.nearby.map((nslug) => {
                  const nearbyCity = CITY_META[nslug];
                  if (!nearbyCity) return null;
                  return (
                    <li key={nslug} style={{ marginBottom: "8px" }}>
                      <Link href={`/areas/${nslug}/${service}`} style={{ color: C.offWhite, textDecoration: "none", fontSize: "14.5px" }}>
                        › {svc.name} in {nearbyCity.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 100%)`, padding: "60px 20px", textAlign: "center" }}>
          <h2 style={{ fontFamily: f.h, fontSize: "28px", fontWeight: 800, color: C.white, marginBottom: "14px" }}>
            Ready for {svc.short} in {city.name}?
          </h2>
          <p style={{ fontSize: "16px", color: C.offWhite, maxWidth: "560px", margin: "0 auto 26px", lineHeight: 1.6 }}>
            Free estimate, no pressure. Bilingual English/Spanish. Fully insured specialist aluminum contractor serving {city.name} and all of Tampa Bay.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:+18444443114" style={{ background: C.gold, color: C.navy, padding: "15px 32px", borderRadius: "8px", fontFamily: f.h, fontWeight: 800, textDecoration: "none", fontSize: "16px" }}>
              Call (844) 444-3114
            </a>
            <Link href={svc.link} style={{ background: "transparent", color: C.white, border: `2px solid ${C.gold}`, padding: "13px 32px", borderRadius: "8px", fontFamily: f.h, fontWeight: 700, textDecoration: "none", fontSize: "16px" }}>
              Learn more about {svc.name}
            </Link>
          </div>
          <p style={{ marginTop: "18px", fontSize: "13px", color: C.muted }}>
            info@jronegutters.com · 3420 W Cherry St, Tampa, FL 33607
          </p>
        </section>

        <SiteFooter />
        <MobileCTA />
      </div>
    </>
  );
}
