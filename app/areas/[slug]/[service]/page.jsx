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
  navyFade: "linear-gradient(180deg, #1B2A4A 0%, #0B1628 100%)",
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
    blurb: "Custom-fabricated on-site from a single continuous coil, so there are no seams along the run to split or leak, and the fit is matched to your roofline.",
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
    blurb: "Standard aluminum and micromesh guard systems that keep leaves, pine needles, shingle grit, and debris out while letting water flow through freely.",
    who: "Essential for homes with oak, pine, or palm canopy, and for any homeowner tired of climbing a ladder every season.",
    props: [
      ["Micromesh filtering","Blocks even pine needles and shingle grit."],
      ["Aluminum mesh","Won't rust, warp, or collapse under debris load."],
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
      ["Full wood-to-aluminum conversion","Aluminum does not rot, so the cycle stops."],
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
      ["Soldered seams","A continuous metal bond at the joints instead of sealant that dries out and lets go."],
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
  "new-tampa": { name: "New Tampa", localP: "New Tampa's planned communities (Cory Lake Isles, Tampa Palms, Hunter's Green, West Meadows, K-Bar Ranch) sit at the inland edge of Hillsborough with 2,800 to 4,500 sq ft roof footprints that overwhelm 5-inch gutters. JR One installs 6-inch and 7-inch only. We do not install 5-inch in Florida.", weatherNote: "Inland thunderstorms unload heavy rain in short windows with no Gulf-coast breeze to dry roofs. Mature oak and pine canopy drops debris year-round.", nearby: ["wesley-chapel","tampa","lutz","temple-terrace"] },
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
      { q: "How much does gutter cleaning cost in Lakeland?", a: "JR One Aluminum charges roughly $150 to $275 for a full gutter cleaning on a standard ranch or split-level home in Lakeland, FL, including downspout flushing and flow testing. Two-story homes, steep pitches, and homes under mature oak canopy that has gone uncleaned for more than a year run higher because we remove more material and inspect more length. Price is driven by linear footage of gutter, roof height and ladder access, one-story versus two-story, debris load, and number of downspouts. We quote a flat price up front after a quick walk of the property, so there are no per-foot surprises at the end. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
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
      { q: "How much is gutter cleaning in Wesley Chapel?", a: "Gutter cleaning from JR One Aluminum runs $175 to $325 on a typical single-story or two-story home in Wesley Chapel, FL, in subdivisions like Seven Oaks, Meadow Pointe, or Lexington Oaks. Larger custom homes in Estancia at Wiregrass or Lake Bernadette are quoted on a walk basis. Price is driven by linear footage of gutter, roof height and ladder access, one-story versus two-story, how much material is in the gutter at the time of the clean, and number of downspouts. Flat price up front, no per-foot surprises. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
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
      { q: "How much does gutter cleaning cost in Palm Harbor?", a: "JR One Aluminum charges roughly $175 to $275 for a full gutter cleaning on a single-story home in Palm Harbor, FL, in neighborhoods like Highland Lakes, Spring Lake, or Crystal Beach, including downspout flushing and flow testing. Two-story homes and homes under heavy oak or pine canopy run $250 to $425 because we remove more material, test more runs, and spend more time on the property. Price is driven by linear footage of gutter, roof height and ladder access, one-story versus two-story, debris load, and number of downspouts. Free flat-price estimate by phone or text. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "How often should Palm Harbor gutters be cleaned?", a: "Twice a year for homes with moderate tree coverage, three times a year for homes under mature laurel oak, live oak, or pine canopy. The fall clean is non-negotiable, that is when oak and pine drop hardest. The spring clean clears the winter accumulation before the July through September heavy-rain season starts. Skipping either one is how fascia rot starts." },
      { q: "What does pine debris do to my gutters that I should worry about?", a: "Pine needles are the worst gutter clog material in Florida. They knit together into a dense mat that water cannot push through, and they hold moisture against the aluminum and against the fascia for weeks at a time. The result is fascia rot from the back side that you cannot see from the ground, plus accelerated oxidation of the gutter itself. By the time you can see the problem, the fascia is already soft and the gutter pulls loose during the next thunderstorm." },
      { q: "Does coastal Palm Harbor location affect gutter cleaning frequency?", a: "Yes, two ways. Gulf-facing properties get salt-air corrosion on top of the standard debris load, so cleaning visits double as inspection windows for aluminum failure at hanger fasteners and at downspout elbows. And tropical-system wind drives an entire season's worth of debris into your gutters in a single storm event. After Idalia in 2023, we logged storm-call cleanings throughout Palm Harbor where gutters were full to the lip in 24 hours." },
      { q: "Will gutter cleaning fix my overflow problem?", a: "Sometimes yes, sometimes no. If the gutter is clogged with debris and overflows in rain, cleaning fixes it. If the downspout is undersized for the roof load, or the pitch was wrong from the original install, or the run has separated at a seam, cleaning will not fix it. Our flow test catches all three. If we find the problem is not the debris, we document it and quote the repair separately. We do not bill you for a cleaning that will not solve the actual problem." },
      { q: "Do you offer gutter guards in Palm Harbor?", a: "Yes. For homes under heavy oak or pine canopy in Palm Harbor, guards pay for themselves in two to four years compared with three cleanings per year. We install micromesh guards that handle pine needles, which is the test most gutter guards on the market fail. Free comparison estimate, guards versus cleaning schedule, during the same visit." },
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
      { q: "How much is gutter cleaning in Clearwater?", a: "Gutter cleaning from JR One Aluminum runs $175 to $300 on a standard single-story home in Clearwater, FL, in neighborhoods like Countryside, Sunset Point, or Clearwater Beach. Two-story homes and homes with mature trees run higher. Price is driven by linear footage of gutter, roof height and ladder access, one-story versus two-story, debris load, and number of downspouts. Coastal-facing homes sometimes warrant an inspection-and-clean combo where we are looking specifically for salt-corrosion damage in addition to debris removal, which adds time but not a separate fee in most cases. Free flat-price estimate. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
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
      { q: "How much does gutter cleaning cost in Sarasota?", a: "JR One Aluminum charges $175 to $300 for a full gutter cleaning on a standard single-story home in Sarasota, FL, in Palmer Ranch, Sarasota Springs, or Gulf Gate, with downspout flushing and flow testing included. Homes on Siesta Key, Lido Key, or Bird Key with custom rooflines or two-story footprints run higher because we are working with longer ladders and more linear feet. Estate properties in Oyster Bay or West of Trail get walked and quoted on a per-property basis. Price is driven by linear footage, roof height and access, one-story versus two-story, debris load, and number of downspouts. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
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
      { q: "How much is gutter cleaning in Bradenton?", a: "JR One Aluminum charges $150 to $275 for a full gutter cleaning on a single-story home in Bradenton, FL, in established neighborhoods like Cortez, Palma Sola, or West Bradenton, with downspout flushing and flow testing included. Two-story homes and properties along the Manatee River or in Lakewood Ranch run $225 to $375. Waterfront homes on Anna Maria Island and Longboat Key get walked and quoted on a per-property basis because corrosion inspection is part of the work. Price is driven by linear footage, roof height and access, one-story versus two-story, debris load, and number of downspouts. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
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
      { q: "How much does gutter repair cost in Brandon?", a: "Gutter repair from JR One Aluminum in Brandon, FL runs $175 to $425 for spot repairs, meaning one seam, one downspout, or a few hanger replacements. Full re-pitch and re-hang of a single run runs $300 to $600 depending on length and access. Section replacement on a damaged run is $8 to $14 per linear foot installed including matching the existing profile. Price is driven by the length of the run, roof height and ladder access, one-story versus two-story, the number of downspouts and hangers involved, and gutter size, 6-inch or 7-inch. Free flat-price estimate at the property, no per-trip charge for the visit. To size the job on your own home, start with the JR One estimator at jronegutters.com/estimator to get your gutter footage measured, or call (844) 444-3114 for an on-site look." },
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
      { q: "How much does seamless aluminum gutter installation cost in Wesley Chapel?", a: "Seamless aluminum gutter installation from JR One Aluminum runs $1,800 to $3,400 on a single-story home in Wesley Chapel, FL, in Seven Oaks, Meadow Pointe, or Lexington Oaks, including downspouts and hidden hangers. Larger custom homes in Estancia at Wiregrass or Saddlebrook run $3,500 to $6,500. Two-story homes add roughly 30 percent. Price is driven by linear footage, roofline complexity and number of corners, one-story versus two-story access, gutter size, 6-inch or 7-inch, number of downspouts, and color match. Free flat-price estimate after a property walk, no per-foot surprises. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
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
      ["Micromesh guard","Blocks pine needles, the test most consumer guards fail. Brandon has too many pines for anything less."],
      ["Works with existing 6-inch and 7-inch gutters","Retrofit onto your current system, no full replacement needed if the existing gutter is sound."],
      ["Cuts cleaning frequency","Three cleanings a year drops to one inspection visit. Math works in 2 to 4 years."],
      ["Micromesh that stops pine needles","The finer mesh is the only difference from our standard aluminum guard, and it is what keeps needles out of the channel. Written warranty terms come in your install package."],
    ],
    faqs: [
      { q: "How much do gutter guards cost in Brandon?", a: "Micromesh gutter guard installation from JR One Aluminum runs $8 to $14 per linear foot installed in Brandon, FL. A standard single-story home with 150 to 200 linear feet of gutter runs $1,200 to $2,800 total. Larger two-story homes and homes with complex rooflines run higher. Price is driven by linear footage, roof height and ladder access, one-story versus two-story, gutter size, 6-inch or 7-inch, and number of downspouts. Free flat-price estimate at the property, no per-trip charge for the visit. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Are gutter guards worth it in Brandon?", a: "On a Brandon, FL property with mature oak or pine canopy, yes. A typical Brandon home with heavy tree coverage needs three cleanings per year at roughly $200 to $300 each, so $600 to $900 annually, while a JR One guard install at $1,500 to $2,500 pays back in two to four years and lasts 20 plus. On a property with minimal tree coverage, guards are still nice but the math is closer to break-even, and we will tell you that straight during the estimate. What moves the payback math is tree canopy, linear footage, roof height and access, and how many cleanings a year the property actually needs. Guards reduce cleaning frequency, they do not eliminate it. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Will gutter guards stop pine needles?", a: "Micromesh guards do, if the mesh is fine enough. Most consumer-grade guards on the market (the perforated metal screen at hardware stores) fail the pine-needle test, needles slide right through the holes and clog the gutter underneath where you cannot reach them. JR One installs micro-mesh that handles pine needles, which matters in Brandon because pine canopy is everywhere from Lakemont to Sterling Ranch." },
      { q: "Do gutter guards work with existing 6-inch gutters?", a: "Yes. We retrofit guards onto sound existing 6-inch and 7-inch K-style gutters. If the existing gutter has separated seams, sagging runs, or pulled-loose hangers, we address those issues first or quote a full replacement, installing guards on a failing gutter is throwing money away. We walk the property and tell you straight which path makes sense." },
      { q: "How long do gutter guards last in Brandon?", a: "The micromesh itself does not rust, warp, or collapse under debris load, it lasts the life of the gutter system. The gutter underneath is the wearing part, and a properly maintained gutter with guards installed lasts 25 to 35 years in Florida." },
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
      { q: "How much does gutter cleaning cost in St. Petersburg?", a: "JR One Aluminum charges $175 to $300 for a full gutter cleaning on a standard single-story home in St. Petersburg, FL, in neighborhoods like Disston Heights, Crescent Lake, or Lakewood Estates, including downspout flushing and flow testing. Two-story homes in Old Northeast or Snell Isle and homes with mature oak canopy run $275 to $425. Direct Gulf-facing properties take longer because the cleaning visit doubles as a corrosion inspection. Price is driven by linear footage, roof height and ladder access, one-story versus two-story, debris load, and number of downspouts. Free flat-price estimate by phone or text, no per-foot surprises. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
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
      { q: "How much does seamless gutter installation cost in Bradenton?", a: "Seamless aluminum gutter installation from JR One Aluminum runs $1,750 to $3,400 on a single-story home in Bradenton, FL, in West Bradenton, Palma Sola, or Bayshore Gardens, including downspouts and hidden hangers. Two-story homes and larger custom homes in Lakewood Ranch run $3,400 to $6,500. Waterfront homes on Anna Maria Island and Longboat Key get walked and quoted on a per-property basis. Price is driven by linear footage, roofline complexity and number of corners, one-story versus two-story access, gutter size, 6-inch or 7-inch, number of downspouts, and color match. Free flat-price estimate, no per-foot surprises. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
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
      { q: "How much does seamless gutter installation cost in Spring Hill?", a: "Seamless aluminum gutter installation from JR One Aluminum runs $1,650 to $3,100 on a standard single-story home in Spring Hill, FL, in Pristine Place, Royal Highlands, or Spring Hill Estates, including downspouts and hidden hangers. Larger custom homes in Glen Lakes or Timber Pines run $2,800 to $5,000. Price is driven by linear footage, roofline complexity and number of corners, one-story versus two-story access, gutter size, 6-inch or 7-inch, number of downspouts, and color match. Free flat-price estimate at the property, no per-foot surprises at the end. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
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
      { q: "How much does gutter cleaning cost in Spring Hill?", a: "JR One Aluminum charges $150 to $275 for a full gutter cleaning on a standard single-story home in Spring Hill, FL, in Pristine Place, Royal Highlands, or Spring Hill Estates, including downspout flushing and flow testing. Two-story homes and homes under mature pine canopy run $225 to $375 because we are removing more material. Estate properties in Glen Lakes or Timber Pines are walked and quoted on a per-property basis. Price is driven by linear footage, roof height and ladder access, one-story versus two-story, debris load, and number of downspouts. Free flat-price estimate, no per-foot surprises. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
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
      { q: "How much does gutter repair cost in Spring Hill?", a: "Gutter repair from JR One Aluminum in Spring Hill, FL runs $175 to $425 for spot repairs, meaning one seam, one downspout, or a hanger replacement. Full re-pitch and re-hang of a single run is $300 to $625 depending on length and access. Section replacement on a damaged run is $8 to $14 per linear foot installed including matching the existing profile. Price is driven by the length of the run, roof height and ladder access, one-story versus two-story, the number of downspouts and hangers involved, and gutter size, 6-inch or 7-inch. Free flat-price estimate at the property, no per-trip charge for the visit. To size the job on your own home, start with the JR One estimator at jronegutters.com/estimator to get your gutter footage measured, or call (844) 444-3114 for an on-site look." },
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
      ["Micromesh guard","Blocks pine needles, the test most consumer guards fail. Spring Hill has too much pine canopy for anything less."],
      ["Works with existing 6-inch and 7-inch gutters","Retrofit onto your current system if the existing gutter is sound. No full replacement needed."],
      ["Cuts cleaning frequency","Three cleanings a year drops to one inspection visit. Math works in two to four years for canopy-heavy homes."],
      ["Micromesh that stops pine needles","The finer mesh is the only difference from our standard aluminum guard, and it is what keeps needles out of the channel. Written warranty terms come in your install package."],
    ],
    faqs: [
      { q: "How much do gutter guards cost in Spring Hill?", a: "Micromesh gutter guard installation from JR One Aluminum runs $8 to $14 per linear foot installed in Spring Hill, FL. A standard single-story home with 150 to 200 linear feet of gutter runs $1,200 to $2,800 total. Larger Glen Lakes or Timber Pines homes and homes with complex rooflines run higher. Price is driven by linear footage, roof height and ladder access, one-story versus two-story, gutter size, 6-inch or 7-inch, and number of downspouts. Free flat-price estimate at the property. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Are gutter guards worth it in Spring Hill?", a: "On a Spring Hill, FL property with mature pine, oak, or laurel canopy, yes. A typical Spring Hill home with heavy tree coverage needs three cleanings per year at roughly $200 to $275 each, so $600 to $825 annually, while a JR One guard install at $1,500 to $2,500 pays back in two to four years and lasts 20 plus. On a property with minimal landscaping, such as newer Sterling Hill or smaller lots, the math is closer to break-even and we will tell you that straight during the estimate. What moves the payback math is tree canopy, linear footage, roof height and access, and how many cleanings a year the property actually needs. Guards reduce cleaning frequency, they do not eliminate it. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Will gutter guards stop pine needles?", a: "Micromesh guards do, if the mesh is fine enough. Most consumer-grade guards on the market (the perforated metal screen at hardware stores) fail the pine-needle test, needles slide through the holes and clog the gutter underneath. JR One installs micro-mesh that handles pine needles, which matters in Spring Hill because pine canopy is everywhere from Royal Highlands to Pristine Place." },
      { q: "Do gutter guards work with existing 6-inch gutters?", a: "Yes. We retrofit guards onto sound existing 6-inch and 7-inch K-style gutters. If the existing gutter has separated seams, sagging runs, or pulled-loose hangers, we address those issues first or quote a full replacement, installing guards on a failing gutter is throwing money away. We walk the property and tell you straight which path makes sense." },
      { q: "How long do gutter guards last in Spring Hill?", a: "The micromesh itself does not rust, warp, or collapse under debris load. The gutter underneath is the wearing part, and a properly maintained gutter with guards installed lasts 25 to 35 years in Florida." },
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
      { q: "How much does seamless gutter installation cost in Sarasota?", a: "Seamless aluminum gutter installation from JR One Aluminum runs $1,850 to $3,500 on a standard single-story home in Sarasota, FL, in Palmer Ranch, Sarasota Springs, or Gulf Gate, including downspouts and hidden hangers. Two-story homes and larger Lakewood Ranch builds run $3,400 to $6,500. Estate properties west of Trail or on the keys, meaning Siesta, Lido, and Bird, are walked and quoted on a per-property basis. Price is driven by linear footage, roofline complexity and number of corners, one-story versus two-story access, gutter size, 6-inch or 7-inch, number of downspouts, and color match. Free flat-price estimate. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
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
      { q: "How much does gutter cleaning cost in New Port Richey?", a: "JR One Aluminum charges $175 to $300 for a full gutter cleaning on a standard single-story home in New Port Richey, FL, in Gulf Harbors, Magnolia Valley, or Jasmine Lakes, including downspout flushing and flow testing. Two-story homes and homes under mature oak canopy run $250 to $400 because we are removing more material. Waterfront homes on the Pithlachascotee River or near the Gulf get walked and quoted per-property because the visit doubles as a corrosion inspection. Price is driven by linear footage, roof height and ladder access, one-story versus two-story, debris load, and number of downspouts. Free flat-price estimate. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
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
      { q: "How much does seamless gutter installation cost in Clearwater?", a: "Seamless aluminum gutter installation from JR One Aluminum runs $1,800 to $3,400 on a standard single-story home in Clearwater, FL, in Countryside, Sunset Point, or Skycrest, including downspouts and hidden hangers. Two-story homes and homes on Sand Key or Clearwater Beach run $3,500 to $6,500. Direct Gulf-facing properties take longer because installation also includes corrosion-resistant fastener inspection. Price is driven by linear footage, roofline complexity and number of corners, one-story versus two-story access, gutter size, 6-inch or 7-inch, number of downspouts, and color match. Free flat-price estimate. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
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
      { q: "How much does gutter repair cost in Bradenton?", a: "Gutter repair from JR One Aluminum in Bradenton, FL runs $200 to $475 for spot repairs, meaning one seam, one downspout, or a hanger replacement. Full re-pitch and re-hang of a single run is $325 to $700 depending on length and access. Section replacement on a damaged run is $9 to $15 per linear foot installed including matching the existing profile. Waterfront homes on Anna Maria Island and Longboat Key are walked and quoted on a per-property basis. Price is driven by the length of the run, roof height and ladder access, one-story versus two-story, the number of downspouts and hangers involved, and gutter size, 6-inch or 7-inch. Free flat-price estimate, no per-trip charge. To size the job on your own home, start with the JR One estimator at jronegutters.com/estimator to get your gutter footage measured, or call (844) 444-3114 for an on-site look." },
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
      { q: "How much does gutter repair cost in Sarasota?", a: "Gutter repair from JR One Aluminum in Sarasota, FL runs $200 to $475 for spot repairs, meaning one seam, one downspout, or a hanger replacement. Full re-pitch and re-hang of a single run is $325 to $700 depending on length and access. Section replacement on a damaged run is $9 to $15 per linear foot installed including matching the existing profile. Estate properties west of Trail or on the keys are walked and quoted on a per-property basis. Price is driven by the length of the run, roof height and ladder access, one-story versus two-story, the number of downspouts and hangers involved, and gutter size, 6-inch or 7-inch. Free flat-price estimate, no per-trip charge. To size the job on your own home, start with the JR One estimator at jronegutters.com/estimator to get your gutter footage measured, or call (844) 444-3114 for an on-site look." },
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

  // ── Phase 3 batch 3 (added 2026-06-01) ──

  "brandon/gutter-cleaning": {
    introOverride: "Brandon gets 80 thunderstorm days a year and 51.2 inches of average annual rainfall per NOAA, with four named storms in the last ten years (Idalia, Ian, Eta, Elsa). Hillsborough County records show median home year-built 1990 and 45 percent post-2000, which sounds newer than most of Tampa Bay but matters less than the canopy, mature oak and pine across Bloomingdale, FishHawk Ranch, and Brandon Hills drop debris into gutters faster than a twice-a-year schedule catches. Add 15 percent pre-1980 stock with original gutter pitch and the cleaning call is straightforward, debris plus storm wind plus Florida rain volume equals overflow at the foundation if nobody is up there clearing the runs.",
    propsOverride: [
      ["Full hand-clean","Oak leaves, pine needles, shingle grit, and storm-blown debris pulled by hand and bagged off site. Beds left as we found them."],
      ["Downspout flush + flow test","Live water through every run to confirm exit at grade. Volume-builder downspouts from the 1990s often exit at the elbow."],
      ["Damage report","Loose hangers, separating seams, fascia rot, and undersized downspouts flagged in writing while we are up there."],
      ["HOA-friendly cleanup","Most Brandon subdivisions have architectural-review boards. We follow posted hours and leave the property cleaner than we found it."],
    ],
    faqs: [
      { q: "How much does gutter cleaning cost in Brandon?", a: "JR One Aluminum charges $175 to $300 for a full gutter cleaning on a standard single-story home in Brandon, FL, in Bloomingdale, Providence Lakes, or Sterling Ranch, including downspout flushing and flow testing. Two-story homes and homes with mature oak canopy in FishHawk Ranch or Brandon Hills run $250 to $400 because we are removing more material and inspecting more length. Price is driven by linear footage, roof height and ladder access, one-story versus two-story, debris load, and number of downspouts. Flat price up front after a quick property walk, no per-foot surprises. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "How often should Brandon gutters be cleaned?", a: "Twice a year is the floor. Once in May before the July through September peak-rainfall window per NOAA, and once in late fall after Florida's leaf-drop season. Homes under heavy oak or pine canopy in Bloomingdale or FishHawk Ranch often need a third clean mid-summer because thunderstorm wind pulls debris off the canopy faster than a twice-a-year schedule catches. Newer subdivisions with smaller landscaping can sometimes stretch to once a year if guards are installed." },
      { q: "What happens if I never clean my Brandon gutters?", a: "Three things compound. Water overflows the front of the gutter during heavy rain and pools at the foundation. On Hillsborough flat terrain that means slab cracking and eventual foundation work that runs five figures. Water backs up under the shingles at the roof edge and rots the fascia. The weight of wet debris pulls the gutter away from the fascia, separating seams and eventually pulling the whole run off. All three are preventable with two cleanings a year." },
      { q: "Do you work in HOA neighborhoods in Brandon?", a: "Yes. Bloomingdale, Providence Lakes, Sterling Ranch, FishHawk Ranch, Brandon Pointe, and Lake Brandon all have architectural-review boards. We follow posted hours, clean up debris completely, and provide written documentation if your HOA requires contractor proof of insurance. We have 60 logged Brandon projects in the CompanyCam record since February 2023." },
      { q: "Should I get gutter guards instead of cleaning twice a year?", a: "Depends on canopy. If your home is under heavy oak or pine in Bloomingdale, FishHawk Ranch, or Brandon Hills, guards pay for themselves in two to four years compared with three cleanings per year. If your home is in a newer Brandon Pointe or Sterling Ranch subdivision with smaller landscaping, cleaning twice a year may be the better economic answer. We tell you straight which way the math works for your specific property during the free estimate, not push the more expensive option." },
      { q: "Will you spot gutter damage while cleaning?", a: "Yes. That is half the value of having a specialist aluminum contractor clean versus a handyman. We are up there for an hour or two looking directly at the fascia, the hangers, the spikes, the seams, and the downspout connections. Anything failing or about to fail is photographed, written into the damage report, and quoted separately if you want it done. The cleaning price does not change either way." },
      { q: "Are you insured to clean gutters in Brandon?", a: "Yes. JR One Aluminum LLC carries general liability and workers compensation. Certificate of insurance available on request before any work begins. Hiring an uninsured contractor on a Brandon gutter cleaning is a foundation, fascia, and homeowner-liability risk that is not worth saving fifty bucks on." },
    ],
    neighborhoodsOfNote: ["Brandon Pointe","Bloomingdale","Providence Lakes","Sterling Ranch","Brandon Hills","Lakemont","Lake Brandon","FishHawk Ranch"],
    trustNumbers: ["60 Brandon projects in the JR One CompanyCam record since February 2023, across cleanings, guard installs, repairs, and seamless-gutter replacements"],
  },

  "largo/seamless-aluminum-gutters": {
    introOverride: "Largo sits in central Pinellas County with 51.8 inches of average annual rainfall and 82 thunderstorm days per year per NOAA, plus four named storms in the last ten years (Idalia, Ian, Eta, Elsa). Pinellas County records show median home year-built 1985 and 38 percent of housing built before 1980, which means a significant share of original-install gutter systems are at the 40 plus year point where volume-builder aluminum cracks at fastener points and original 5-inch profiles cannot handle current Florida rain volume even when perfectly clean. JR One installs 6-inch and 7-inch K-style on Largo homes. We do not install 5-inch in Florida.",
    propsOverride: [
      ["On-site fabrication","Cut to your exact roofline from a single continuous coil, no warehouse-stocked sections, no seams that fail under hurricane wind load."],
      ["6-inch and 7-inch K-style","Largo rainfall volume needs 6-inch minimum. 7-inch upgrade for steeper rooflines or larger 2,800 plus sq ft footprints common in Harbor Bluffs and Bay Vista Estates."],
      ["25 plus colors","Matched to existing fascia, trim, and body. Color match documentation for Belleair Bluffs and Harbor Bluffs HOAs."],
      ["Hidden hangers, screw-in","Pinellas County wind code requires it. We install it that way every time regardless of inspection."],
    ],
    faqs: [
      { q: "How much does seamless gutter installation cost in Largo?", a: "Seamless aluminum gutter installation from JR One Aluminum runs $1,750 to $3,400 on a standard single-story home in Largo, FL, in Largo Central, Anona, or Pinebrook Estates, including downspouts and hidden hangers. Two-story homes and larger custom homes in Harbor Bluffs or Bay Vista Estates run $3,400 to $6,500. Price is driven by linear footage, roofline complexity and number of corners, one-story versus two-story access, gutter size, 6-inch or 7-inch, number of downspouts, and color match. Free flat-price estimate at the property, no per-foot surprises. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Why 6-inch instead of 5-inch in Largo?", a: "Volume. Florida thunderstorms drop more rain in a 15-minute window than most U.S. markets see in an hour. A 5-inch K-style gutter overflows under Largo's 51.8 inches of average annual rainfall even when perfectly clean, and a clogged 5-inch overflows on the first thunderstorm of the season. JR One installs 6-inch as the minimum on every Florida home and 7-inch on steeper rooflines or larger footprints. We do not install 5-inch in Florida, it does not match the climate." },
      { q: "How long does seamless gutter installation take in Largo?", a: "Most single-story homes complete in a single day. Fabrication on site in the morning, install in the afternoon. Two-story homes and larger Harbor Bluffs or Bay Vista Estates custom builds run one to two days depending on complexity. Coastal-facing installs near Indian Rocks Beach add corrosion-resistant fastener inspection time." },
      { q: "Do Largo HOAs require approval before gutter replacement?", a: "Belleair Bluffs, Harbor Bluffs, Imperial Point, and several Largo Central neighborhoods have architectural-review boards that require color match documentation and contractor insurance before approval. We provide the color sample, spec sheet, and certificate of insurance as part of the estimate. We do not start work until HOA approval is in writing." },
      { q: "Are seamless gutters more resistant to hurricane wind?", a: "Yes. Sectional gutters fail at the seams under wind-pressure differential, that is where wind lifts the gutter and pries it off the fascia. A continuous seamless run with hidden hangers screwed into solid fascia handles hurricane wind better because there are no failure points along the run, only at the corners and downspout connections, both of which we spec for Florida hurricane code. Coastal Pinellas is where this matters most." },
      { q: "Can you match copper or specialty trim on a Largo waterfront home?", a: "Yes. Standard aluminum installs in 25 plus color options. For Harbor Bluffs or Indian Rocks Beach area estate homes we also fabricate copper gutters on site. Copper costs roughly three times standard aluminum but lasts 75 plus years and is the right answer when matching original trim on a high-end coastal property. Free copper-vs-aluminum comparison during the estimate." },
      { q: "What is the warranty on JR One seamless gutters in Largo?", a: "Workmanship warranty on the install, written, full terms in the estimate package. Manufacturer warranty on the aluminum coil and the hidden hangers. We are family-owned with over 30 years in Tampa Bay and 72 logged Largo projects in the CompanyCam record since December 2022. We are still here for warranty service three years from now." },
    ],
    neighborhoodsOfNote: ["Belleair Bluffs","Largo Central","Anona","Harbor Bluffs","Imperial Point","Bay Vista Estates","Pinebrook Estates","Indian Rocks Beach area"],
    trustNumbers: ["72 Largo projects in the JR One CompanyCam record since December 2022, across cleanings, repairs, and seamless-gutter replacements"],
  },

  "clearwater/gutter-repair": {
    introOverride: "Clearwater is a coastal Pinellas County market with 82 thunderstorm days per year and 51.8 inches of average annual rainfall per NOAA. Four named storms have come within 50 miles of Clearwater in the last ten years (Idalia, Ian, Eta, Elsa), and Idalia in 2023 produced severe storm surge on Treasure Island and Sunset Beach. Pinellas County records show median home year-built 1982 with 42 percent of stock pre-1980, which means a lot of original-install gutter systems are at the 40 plus year point where hangers loosen, seams separate, and aluminum cracks at fastener points. Salt-laden Gulf air accelerates oxidation at every fastener on coastal Clearwater homes. Repair is a specialist call, not a handyman caulk job.",
    propsOverride: [
      ["Re-pitch and re-hang","Most Clearwater sag is fixed with proper hangers at proper spacing, not new gutters. Coastal corrosion and 40 plus years of UV soften original fastener points."],
      ["Seam sealing done right","Commercial-grade gutter sealant, not silicone caulk that fails by next summer."],
      ["Downspout resize and replacement","Original 1980s downspouts are undersized for current Florida rain volume. We upsize to handle peak storm flow."],
      ["Storm-claim documentation","Insurance-ready scope and photos if the claim is still open after Idalia, Ian, or any future storm."],
    ],
    faqs: [
      { q: "How much does gutter repair cost in Clearwater?", a: "Gutter repair from JR One Aluminum in Clearwater, FL runs $200 to $475 for spot repairs, meaning one seam, one downspout, or a hanger replacement. Full re-pitch and re-hang of a single run is $325 to $700 depending on length and access. Section replacement on a damaged run is $9 to $15 per linear foot installed including matching the existing profile. Sand Key, Clearwater Beach, and Island Estates properties are walked and quoted on a per-property basis because corrosion inspection is part of the work. Price is driven by the length of the run, roof height and ladder access, one-story versus two-story, the number of downspouts and hangers involved, and gutter size, 6-inch or 7-inch. Free flat-price estimate, no per-trip charge. To size the job on your own home, start with the JR One estimator at jronegutters.com/estimator to get your gutter footage measured, or call (844) 444-3114 for an on-site look." },
      { q: "Should I repair or replace my Clearwater gutters?", a: "Depends on three things. If the aluminum is sound and the problem is hangers, seams, or pitch, repair is the right call and runs roughly one-third to one-half the cost of replacement. If the aluminum is cracked at multiple points from 40 plus years of UV and salt-air exposure, the original 5-inch profile is too small for current rain volume, or you are replacing more than 40 percent of linear footage anyway, replacement makes more sense. We walk the property and tell you straight which way the math works. We do not push replacement when repair is the right answer." },
      { q: "What causes Clearwater gutters to fail?", a: "Three common causes on coastal Pinellas. First, salt-laden Gulf air drives aluminum oxidation at every fastener point, invisible from the ground but obvious from a ladder. Second, four named storms in 10 years have torqued hangers loose from fascia and separated seams under wind-pressure differential. Third, accumulated debris weight pulling the gutter forward over decades of missed cleanings. Our repair scope addresses all three, not just the visible cosmetic issue." },
      { q: "Do you handle storm-damage gutter repair in Clearwater?", a: "Yes, and we prioritize storm calls. After Idalia in 2023 we logged dozens of Clearwater repair visits, most of them sections pulled loose from fascia, downspouts torn off at the elbow, and runs separated at seams from wind-pressure differential. We document everything for insurance with photos and itemized scope. We work directly with adjusters. If your gutter is loose or hanging after a storm, do not wait for the next rain event." },
      { q: "Can you repair gutters that have pulled away from the fascia?", a: "Usually yes, depending on the fascia condition underneath. If the fascia is sound, we re-hang at proper spacing with new fasteners and re-pitch the run. If the fascia behind the gutter is soft or rotted (common on 40 plus year old coastal Clearwater homes with clogged-gutter history), we quote the fascia replacement as a separate line item before re-hanging. We do not screw new gutters into rotted fascia and pretend it is fixed." },
      { q: "How long do Clearwater gutter repairs last?", a: "A proper re-pitch and re-hang with hidden hangers at correct spacing typically lasts 10 to 15 years before that hardware needs attention again, assuming the gutter itself is sound and the homeowner cleans twice a year. A commercial-grade seam reseal lasts 10 plus years. A silicone-caulk handyman repair typically fails the next summer. The difference is spec and hardware, not effort. Coastal-facing properties on Sand Key or Clearwater Beach take more weather, so we use corrosion-resistant fasteners every time." },
      { q: "Do you provide warranties on Clearwater gutter repairs?", a: "Yes. Workmanship warranty on all repair work, written, with itemized scope. Manufacturer warranty on any replacement aluminum or hardware. We are family-owned with over 30 years in Tampa Bay and 102 logged Clearwater projects in the CompanyCam record since November 2022, the second-highest density in Pinellas County for us. We are not going anywhere if you need warranty service two years from now." },
    ],
    neighborhoodsOfNote: ["Countryside","Sunset Point","Clearwater Beach","Island Estates","Sand Key","Belleair","Morningside","Skycrest"],
    trustNumbers: ["102 Clearwater projects in the JR One CompanyCam record since November 2022, the second-highest density in Pinellas County for us"],
  },

  "st-petersburg/seamless-aluminum-gutters": {
    introOverride: "St. Petersburg housing is the oldest concentration in our service area, median home year-built 1980 with roughly 45 percent of stock built before 1980 per Pinellas County records. Combined with 51.8 inches of average annual rainfall and 82 thunderstorm days per year per NOAA, plus four named storms in the last ten years (Idalia, Ian, Eta, Elsa), the demand for proper Florida-spec seamless gutter on St. Pete homes is straightforward, original 1970s and 1980s 5-inch gutters were never sized for current rain volume even when perfectly clean. St. Petersburg Fire Rescue pulled 75 plus residents out of flooded homes during Idalia. JR One installs 6-inch and 7-inch K-style on St. Petersburg homes. We do not install 5-inch in Florida.",
    propsOverride: [
      ["On-site fabrication","Cut to your exact roofline from a single continuous coil, no warehouse sections, no seams that fail under hurricane wind load."],
      ["6-inch and 7-inch K-style","St. Pete rainfall volume needs 6-inch minimum. 7-inch upgrade for steeper rooflines or larger footprints common in Snell Isle, Bayway Isles, and Lakewood Estates."],
      ["25 plus colors","Matched to existing fascia, trim, and body. Color match documentation for Old Northeast historic district and Snell Isle HOAs."],
      ["Hidden hangers, screw-in","Pinellas County wind code requires it. We install it that way every time regardless of inspection, especially on coastal St. Pete properties."],
    ],
    faqs: [
      { q: "How much does seamless gutter installation cost in St. Petersburg?", a: "Seamless aluminum gutter installation from JR One Aluminum runs $1,800 to $3,400 on a standard single-story home in St. Petersburg, FL, in Disston Heights, Crescent Lake, or Lakewood Estates, including downspouts and hidden hangers. Two-story homes in Old Northeast or Snell Isle and larger custom homes on Bayway Isles run $3,500 to $6,500. Price is driven by linear footage, roofline complexity and number of corners, one-story versus two-story access, gutter size, 6-inch or 7-inch, number of downspouts, and color match. Free flat-price estimate, no per-foot surprises. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Why 6-inch instead of 5-inch in St. Petersburg?", a: "Volume plus storm exposure. Florida thunderstorms drop more rain in a 15-minute window than most U.S. markets see in an hour, and St. Pete has taken four named storms in 10 years. A 5-inch K-style gutter overflows at St. Petersburg rain volume even when perfectly clean. JR One installs 6-inch as the minimum on every Florida home and 7-inch on steeper rooflines or larger footprints. We do not install 5-inch in Florida, it does not match the climate." },
      { q: "How long does seamless gutter installation take in St. Petersburg?", a: "Most single-story homes complete in a single day. Fabrication on site in the morning, install in the afternoon. Two-story homes in Old Northeast and larger Snell Isle or Bayway Isles builds run one to two days. Historic district homes in Old Northeast and Roser Park add architectural-review coordination time." },
      { q: "Do St. Petersburg HOAs require approval before gutter replacement?", a: "Most do. Snell Isle, Bayway Isles, Coquina Key, and Old Northeast historic district all have architectural-review requirements on exterior changes. We provide the color sample, spec sheet, and certificate of insurance as part of the estimate. We do not start work until HOA approval is in writing." },
      { q: "Are seamless gutters more resistant to hurricane wind?", a: "Yes. Sectional gutters fail at the seams under wind-pressure differential, that is where wind lifts the gutter and pries it off the fascia. A continuous seamless run with hidden hangers screwed into solid fascia handles hurricane wind better because there are no failure points along the run, only at the corners and downspout connections, both of which we spec for Florida hurricane code. Coastal St. Pete is where this matters most." },
      { q: "Can you match copper or specialty trim on a high-end St. Pete home?", a: "Yes. Standard aluminum installs in 25 plus color options. For Old Northeast historic homes, Snell Isle estates, or Bayway Isles waterfront homes we also fabricate copper gutters on site. Copper costs roughly three times standard aluminum but lasts 75 plus years and is the right answer when matching original trim on a 1920s to 1940s historic home or a high-end waterfront property. Free copper-vs-aluminum comparison during the estimate." },
      { q: "What is the warranty on JR One seamless gutters in St. Petersburg?", a: "Workmanship warranty on the install, written, full terms in the estimate package. Manufacturer warranty on the aluminum coil and the hidden hangers. We are family-owned with over 30 years in Tampa Bay and 292 logged St. Petersburg projects in the CompanyCam record since November 2022, the highest density in Pinellas County for us. We are still here for warranty service three years from now." },
    ],
    neighborhoodsOfNote: ["Downtown St. Pete","Old Northeast","Snell Isle","Coquina Key","Lakewood Estates","Disston Heights","Crescent Lake","Roser Park","Bayway Isles"],
    trustNumbers: ["292 St. Petersburg projects in the JR One CompanyCam record since November 2022, the highest density in Pinellas County for us"],
  },

  "lakeland/seamless-aluminum-gutters": {
    introOverride: "Lakeland is an inland Polk County market with 50.2 inches of average annual rainfall and 75 thunderstorm days per year per NOAA, plus three named storms in the last ten years (Idalia, Ian, Eta). Inland location means lower storm surge risk than coastal Pinellas, but heavy rain and wind exposure are the same Florida problem. Polk County records show median home year-built 1980 with 43 percent of housing built before 1980, which means a lot of original-install gutter systems are at the 45-year point where volume-builder aluminum has been showing its age for a decade. JR One installs 6-inch and 7-inch K-style on Lakeland homes. We do not install 5-inch in Florida.",
    propsOverride: [
      ["On-site fabrication","Cut to your exact roofline from a single continuous coil, no warehouse sections, no seams that fail under thunderstorm wind."],
      ["6-inch and 7-inch K-style","Lakeland rainfall volume needs 6-inch minimum. 7-inch upgrade for steeper rooflines or larger 2,800 plus sq ft footprints common in Lakeland Highlands and Christina."],
      ["25 plus colors","Matched to existing fascia, trim, and body. Color match documentation for South Lake Morton Historic District and Lakeland Highlands HOAs."],
      ["Hidden hangers, screw-in","Polk County wind code requires it. We install it that way every time regardless of inspection."],
    ],
    faqs: [
      { q: "How much does seamless gutter installation cost in Lakeland?", a: "Seamless aluminum gutter installation from JR One Aluminum runs $1,650 to $3,200 on a standard single-story home in Lakeland, FL, in Cleveland Heights, Christina, or Beacon Hill, including downspouts and hidden hangers. Two-story homes and larger custom homes in Lakeland Highlands or around Lake Hollingsworth run $3,200 to $6,000. Price is driven by linear footage, roofline complexity and number of corners, one-story versus two-story access, gutter size, 6-inch or 7-inch, number of downspouts, and color match. Free flat-price estimate at the property, no per-foot surprises. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Why 6-inch instead of 5-inch in Lakeland?", a: "Volume. Florida thunderstorms drop more rain in a 15-minute window than most U.S. markets see in an hour. A 5-inch K-style gutter overflows under Lakeland's 50.2 inches of average annual rainfall even when perfectly clean, and a clogged 5-inch overflows on the first thunderstorm of the season. JR One installs 6-inch as the minimum on every Florida home and 7-inch on steeper rooflines or larger footprints. We do not install 5-inch in Florida, it does not match the climate." },
      { q: "How long does seamless gutter installation take in Lakeland?", a: "Most single-story Lakeland homes complete in a single day. Fabrication on site in the morning, install in the afternoon. Two-story homes and larger Lakeland Highlands or Christina builds run one to two days depending on complexity. South Lake Morton Historic District homes add architectural-review coordination time." },
      { q: "Do Lakeland HOAs require approval before gutter replacement?", a: "Lakeland Highlands, Christina, and South Lake Morton Historic District all have architectural-review boards or historic district requirements on exterior changes including gutters. We provide the color sample, spec sheet, and certificate of insurance as part of the estimate. We do not start work until approval is in writing." },
      { q: "Are seamless gutters more resistant to thunderstorm wind?", a: "Yes. Sectional gutters fail at the seams under wind-pressure differential, that is where wind lifts the gutter and pries it off the fascia. A continuous seamless run with hidden hangers screwed into solid fascia handles 75 thunderstorm days a year better because there are no failure points along the run, only at the corners and downspout connections, both of which we spec for Florida code." },
      { q: "Can you work with Polk County contractors and builders?", a: "Yes. We sub for Polk County GCs on new-construction and reroof scopes. We also work directly with homeowners. Pricing is the same either way. We quote flat-price up front so there are no surprises mid-job, and we provide certificate of insurance and color-match documentation to whichever party needs it." },
      { q: "What is the warranty on JR One seamless gutters in Lakeland?", a: "Workmanship warranty on the install, written, full terms in the estimate package. Manufacturer warranty on the aluminum coil and the hidden hangers. We are family-owned with over 30 years in Tampa Bay and 25 logged Lakeland projects in the CompanyCam record since February 2023, with steady growth in Polk County year over year." },
    ],
    neighborhoodsOfNote: ["Lakeland Highlands","Cleveland Heights","Christina","Lake Hollingsworth","Beacon Hill","South Lake Morton Historic District"],
    trustNumbers: ["25 Lakeland projects in the JR One CompanyCam record since February 2023, across cleanings, repairs, and seamless-gutter replacements"],
  },

  "lakeland/gutter-repair": {
    introOverride: "Lakeland gets 75 thunderstorm days a year and 50.2 inches of average annual rainfall per NOAA, with three named storms in the last ten years (Idalia, Ian, Eta). Polk County records show median home year-built 1980 with 43 percent of housing built before 1980, which means a lot of original gutter systems are at the 45-year point where hangers loosen, seams separate, and aluminum cracks at fastener points. Inland location means lower storm surge risk than coastal Pinellas, but the heavy July through September rain volume hitting a 45-year-old original-pitch gutter run is what drives the repair call. Lakeland gutter repair is a specialist job, not a handyman caulk patch.",
    propsOverride: [
      ["Re-pitch and re-hang","Most Lakeland sag is fixed with proper hangers at proper spacing, not new gutters. 45-year-old hangers loosen, fascia softens, water pools instead of flowing."],
      ["Seam sealing done right","Commercial-grade gutter sealant, not silicone caulk that fails by next summer."],
      ["Downspout resize and replacement","Original 1980s downspouts are undersized for current Florida rain volume. We upsize to handle peak storm flow."],
      ["Storm-claim documentation","Insurance-ready scope and photos if the claim is still open after Idalia, Ian, or any future storm."],
    ],
    faqs: [
      { q: "How much does gutter repair cost in Lakeland?", a: "Gutter repair from JR One Aluminum in Lakeland, FL runs $175 to $425 for spot repairs, meaning one seam, one downspout, or a hanger replacement. Full re-pitch and re-hang of a single run is $300 to $625 depending on length and access. Section replacement on a damaged run is $8 to $14 per linear foot installed including matching the existing profile. Price is driven by the length of the run, roof height and ladder access, one-story versus two-story, the number of downspouts and hangers involved, and gutter size, 6-inch or 7-inch. Free flat-price estimate at the property, no per-trip charge for the visit. To size the job on your own home, start with the JR One estimator at jronegutters.com/estimator to get your gutter footage measured, or call (844) 444-3114 for an on-site look." },
      { q: "Should I repair or replace my Lakeland gutters?", a: "Depends on three things. If the aluminum is sound and the problem is hangers, seams, or pitch, repair is the right call and runs roughly one-third to one-half the cost of replacement. If the aluminum is cracked at multiple points from 45 plus years of UV exposure, the original 5-inch profile is too small for current rain volume, or you are replacing more than 40 percent of linear footage anyway, replacement makes more sense. We walk the property and tell you straight." },
      { q: "What causes Lakeland gutters to fail?", a: "Three common causes. First, original 1970s and 1980s hanger spacing too wide for Florida rain volume. Second, hanger nails or screws that have pulled loose from 45-year-old fascia softened by moisture. Third, accumulated debris weight from missed cleanings pulling the gutter forward over decades. Thunderstorm wind compounds all three, and the post-storm pattern is the same every year, the homes with original-install gutters take the hit first." },
      { q: "Do you handle storm-damage gutter repair in Lakeland?", a: "Yes, and we prioritize storm calls. After Idalia in 2023 and Ian in 2022 we logged Lakeland repair visits where sections pulled loose from fascia, downspouts tore off at the elbow, and runs separated at seams from wind-pressure differential. We document everything for insurance with photos and itemized scope. We work directly with adjusters. If your gutter is loose or hanging after a storm, do not wait for the next rain event." },
      { q: "Can you repair gutters that have pulled away from the fascia?", a: "Usually yes, depending on the fascia condition underneath. If the fascia is sound, we re-hang at proper spacing with new fasteners and re-pitch the run. If the fascia behind the gutter is soft or rotted (common on 45 plus year old Lakeland homes with clogged-gutter history), we quote the fascia replacement as a separate line item before re-hanging. We do not screw new gutters into rotted fascia and pretend it is fixed." },
      { q: "How long do Lakeland gutter repairs last?", a: "A proper re-pitch and re-hang with hidden hangers at correct spacing typically lasts 10 to 15 years before that hardware needs attention again, assuming the gutter itself is sound and the homeowner cleans twice a year. A commercial-grade seam reseal lasts 10 plus years. A silicone-caulk handyman repair typically fails the next summer. The difference is spec and hardware, not effort." },
      { q: "Do you provide warranties on Lakeland gutter repairs?", a: "Yes. Workmanship warranty on all repair work, written, with itemized scope. Manufacturer warranty on any replacement aluminum or hardware. We are family-owned with over 30 years in Tampa Bay and 25 logged Lakeland projects in the CompanyCam record since February 2023. We are not going anywhere if you need warranty service two years from now." },
    ],
    neighborhoodsOfNote: ["Lakeland Highlands","Cleveland Heights","Christina","Lake Hollingsworth","Beacon Hill","South Lake Morton Historic District"],
    trustNumbers: ["25 Lakeland projects in the JR One CompanyCam record since February 2023, across cleanings, repairs, and seamless-gutter replacements"],
  },

  "new-port-richey/gutter-repair": {
    introOverride: "New Port Richey is a coastal Pasco County market with 50.8 inches of average annual rainfall and 78 thunderstorm days per year per NOAA, plus three named storms in the last ten years (Idalia, Eta, Elsa). Pasco County records show median home year-built 1975 and 48 percent of homes pre-1980, the most mature coastal-Pasco housing stock in our service area. Original 1970s gutter systems on 50-year-old fascia behind 50-year-old roofs are not failing because of one cause, they are failing because hangers loosened, fascia softened, downspouts undersized, and seams separated, all at once. Idalia in 2023 produced significant flooding in New Port Richey and surfaced what was already underway. Repair is a specialist call, not a handyman caulk job.",
    propsOverride: [
      ["Re-pitch and re-hang","Original-pitch 1970s gutters rarely drain right after 50 years. Proper hangers, proper spacing, salt-resistant fasteners on coastal homes."],
      ["Seam sealing done right","Commercial-grade gutter sealant, not silicone caulk. 10 to 15 year fix instead of next-summer fix."],
      ["Downspout resize","Original 1970s downspouts are undersized for current Florida rain volume. We upsize."],
      ["Storm-claim documentation","Photos, scope, replacement-cost itemization, insurance-ready, after Idalia or any future storm."],
    ],
    faqs: [
      { q: "How much does gutter repair cost in New Port Richey?", a: "Gutter repair from JR One Aluminum in New Port Richey, FL runs $200 to $450 for spot repairs, meaning one seam, one downspout, or a hanger replacement. Full re-pitch and re-hang of a single run is $325 to $675 depending on length and access. Section replacement on a damaged run is $8 to $14 per linear foot installed including matching the existing profile. Waterfront homes in Gulf Harbors or along Riverside Drive are walked and quoted on a per-property basis because corrosion inspection is part of the work. Price is driven by the length of the run, roof height and ladder access, one-story versus two-story, the number of downspouts and hangers involved, and gutter size, 6-inch or 7-inch. Free flat-price estimate. To size the job on your own home, start with the JR One estimator at jronegutters.com/estimator to get your gutter footage measured, or call (844) 444-3114 for an on-site look." },
      { q: "Should I repair or replace my 1970s New Port Richey gutters?", a: "Honest answer, sometimes the better economics is replacement, and we will tell you that even though the repair quote is smaller. If the aluminum is cracked at multiple points from 50 plus years of UV and salt-air exposure, if the original 5-inch profile is too small for current rain volume (most 1970s coastal Pasco installs are), and if you are replacing more than 40 percent of linear footage in spot work anyway, full replacement saves money long term. If the aluminum is still sound and the issue is hangers, seams, or pitch, repair is right. We walk the property and tell you straight." },
      { q: "What is special about repairing coastal New Port Richey homes?", a: "Two things. Salt-laden Gulf air drives aluminum oxidation at every fastener point, invisible from the ground but obvious from a ladder. We use corrosion-resistant fasteners on every coastal repair. Second, fascia behind 50-year-old gutters on a 50-year-old roof is often soft from decades of moisture exposure. We document fascia condition and quote any rebuild separately before doing the gutter work. Cannot screw new hardware into rotted wood and call it fixed." },
      { q: "Do you handle gutter repair on waterfront New Port Richey homes?", a: "Yes. We work Gulf Harbors, all Riverside Drive waterfront access to the Pithlachascotee, and the bridge-accessed islands. Island properties get the same service standard as inland Pasco. We carry the insurance and bridge-access experience for gated waterfront communities. Salt-air corrosion is more aggressive on the coast, so repair calls double as corrosion inspections on every fastener and downspout elbow." },
      { q: "Can you repair storm damage after a hurricane?", a: "Yes. After Idalia in 2023 we logged dozens of New Port Richey storm-damage repair calls. Sections pulled loose from fascia, downspouts torn off at the elbow, runs separated at seams from wind-pressure differential. We document everything for insurance with photos and itemized scope. We work directly with adjusters. If your gutter is loose, hanging, or detached after a storm, do not wait for the next rain event to call." },
      { q: "How long do New Port Richey gutter repairs last?", a: "A proper re-pitch and re-hang with hidden hangers at correct spacing typically lasts 10 to 15 years before that hardware needs attention again, assuming the gutter itself is sound and the homeowner cleans twice a year. A commercial-grade seam reseal lasts 10 plus years. A silicone-caulk handyman repair typically fails the next summer. Coastal homes take more weather, so we use corrosion-resistant fasteners every time on Gulf Harbors and Riverside Drive properties." },
      { q: "Do you provide warranties on New Port Richey gutter repairs?", a: "Yes. Workmanship warranty on all repair work, written, with itemized scope. Manufacturer warranty on any replacement aluminum or hardware. Full terms provided in the estimate package. We are family-owned with over 30 years in Tampa Bay and 51 logged New Port Richey projects in the CompanyCam record since November 2022. We will be here if you need warranty service two years from now." },
    ],
    neighborhoodsOfNote: ["Gulf Harbors","Magnolia Valley","Jasmine Lakes","River Ridge","Trinity","Seven Springs","Holiday","Riverside Drive"],
    trustNumbers: ["51 New Port Richey projects in the JR One CompanyCam record since November 2022, the established specialist aluminum contractor in coastal Pasco"],
  },

  "dunedin/gutter-cleaning": {
    introOverride: "Dunedin is a coastal Pinellas County market with 82 thunderstorm days per year and 51.8 inches of average annual rainfall per NOAA, plus four named storms in the last ten years (Idalia, Ian, Eta, Elsa). Pinellas County records show median home year-built 1980 with 45 percent of stock pre-1980, which means a lot of original-install gutter systems are at the 45-year point. Dunedin's mature canopy across Hawthorn Hills, Cobb's Landing, and around the Dunedin Country Club drops debris year-round, and salt-laden Gulf air from Honeymoon Island access accelerates aluminum oxidation at every fastener. Twice-a-year cleaning is the floor on housing stock that old in a coastal storm market.",
    propsOverride: [
      ["Full hand-clean","Leaves, pine needles, shingle grit, sand from coastal Pinellas wind, all removed and bagged off site."],
      ["Salt-corrosion inspection","Gulf air drives oxidation at fastener points. Dunedin cleanings double as corrosion checks on hidden hangers and downspout elbows."],
      ["Downspout flush + flow test","Live water through every run. 45-year-old downspouts often exit at the elbow instead of grade, our flow test catches that in two minutes."],
      ["Storm-readiness report","With four named storms in 10 years we know what fails first on coastal Pinellas systems. Documented in writing before the next event tests it."],
    ],
    faqs: [
      { q: "How much does gutter cleaning cost in Dunedin?", a: "JR One Aluminum charges $175 to $300 for a full gutter cleaning on a standard single-story home in Dunedin, FL, in Downtown Dunedin, Hawthorn Hills, or Spanish Trails, including downspout flushing and flow testing. Two-story homes and homes under mature oak or pine canopy near the Dunedin Country Club run $250 to $400. Direct Gulf-facing properties take longer because the cleaning visit doubles as a corrosion inspection. Price is driven by linear footage, roof height and ladder access, one-story versus two-story, debris load, and number of downspouts. Free flat-price estimate by phone or text. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "How often should Dunedin gutters be cleaned?", a: "Twice a year is the floor. Once in May before the July through September peak-rainfall window per NOAA, and once in late fall after Florida's leaf-drop season. Homes under heavy live oak or laurel oak canopy in Cobb's Landing or near the Dunedin Country Club often need a third clean mid-summer because thunderstorm wind pulls debris off the canopy faster than a twice-a-year schedule catches. Skipping a cycle on a 45-year-old gutter run is how the next overflow becomes a fascia rebuild." },
      { q: "What is special about cleaning gutters on coastal Dunedin homes?", a: "Two things. Salt-laden Gulf air drives oxidation at every fastener point on an aluminum gutter system, invisible from the ground but obvious from a ladder. Coastal Dunedin cleanings double as corrosion inspections. Second, the pitch on a 45-year-old gutter run is rarely what it was in 1980, original hangers loosen, fascia warps, water starts pooling instead of flowing. A flow test with live water tells you in two minutes what a visual inspection cannot." },
      { q: "Do you work on Honeymoon Island access and waterfront Dunedin homes?", a: "Yes. We work all of Dunedin including the Honeymoon Island access corridor and waterfront properties along the Gulf. Direct Gulf-facing properties take the most weather and corrode aluminum the fastest, so the cleaning visit is also the time we flag any aluminum component that will not survive another storm season. We carry the insurance and bridge-access experience for gated communities." },
      { q: "Will you spot gutter damage while cleaning?", a: "Yes. That is half the value of having a specialist aluminum contractor clean versus a handyman. We are up there for an hour or two looking directly at the fascia, the hangers, the spikes, the seams, and the downspout connections. Anything failing or about to fail is photographed, written into the damage report, and quoted separately if you want it done. The cleaning price does not change either way. Most older Dunedin cleaning visits surface at least one item worth knowing about." },
      { q: "Do you handle insurance-claim documentation after storms?", a: "Yes. After Idalia in 2023 and Ian in 2022 we wrote insurance-ready reports for Dunedin homeowners. Photos, scope of damage, replacement-cost itemization. If your gutter system was damaged by a named storm and you have an open claim, the cleaning visit is the right time to document what needs replacement or repair. We work directly with adjusters." },
      { q: "Are you insured to clean gutters in Dunedin?", a: "Yes. JR One Aluminum LLC carries general liability and workers compensation. Certificate of insurance available on request before any work begins. Hiring an uninsured contractor on a Dunedin gutter cleaning is a foundation, fascia, and homeowner-liability risk that is not worth saving fifty bucks on, especially on coastal Pinellas housing stock that old." },
    ],
    neighborhoodsOfNote: ["Downtown Dunedin","Honeymoon Island access","Caladesi Pointe","Hawthorn Hills","Cobb's Landing","Spanish Trails","Dunedin Country Club"],
    trustNumbers: ["18 Dunedin projects in the JR One CompanyCam record since November 2022, established coastal Pinellas specialist for cleanings, repairs, and seamless replacements"],
  },

  "new-port-richey/seamless-aluminum-gutters": {
    introOverride: "New Port Richey is a coastal Pasco County market with 50.8 inches of average annual rainfall and 78 thunderstorm days per year per NOAA, plus three named storms in the last ten years (Idalia, Eta, Elsa). Pasco County records show median home year-built 1975 and 48 percent of homes pre-1980, the most mature coastal-Pasco housing stock in our service area. That means a lot of original-install 5-inch gutter systems are at the 50-year point on roofs that have seen three named storms. Original 1970s aluminum was never sized for current Florida rain volume even when perfectly clean, and salt-laden Gulf air accelerates oxidation at every fastener on coastal-facing homes. JR One installs 6-inch and 7-inch K-style on New Port Richey homes. We do not install 5-inch in Florida.",
    propsOverride: [
      ["On-site fabrication","Cut to your exact roofline from a single continuous coil, no warehouse sections, no seams that fail under hurricane wind load."],
      ["6-inch and 7-inch K-style","New Port Richey rainfall volume needs 6-inch minimum. 7-inch upgrade for steeper rooflines or larger custom homes common in Trinity, Seven Springs, and River Ridge."],
      ["25 plus colors","Matched to existing fascia, trim, and body. Color match documentation for Gulf Harbors, Trinity, and Riverside Drive HOAs."],
      ["Hidden hangers, screw-in","Pasco County wind code requires it. We install it that way every time regardless of inspection, especially on coastal-facing properties."],
    ],
    faqs: [
      { q: "How much does seamless gutter installation cost in New Port Richey?", a: "Seamless aluminum gutter installation from JR One Aluminum runs $1,750 to $3,300 on a standard single-story home in New Port Richey, FL, in Magnolia Valley, Jasmine Lakes, or Holiday, including downspouts and hidden hangers. Two-story homes and larger custom homes in Trinity, Seven Springs, or River Ridge run $3,400 to $6,500. Waterfront homes in Gulf Harbors or along Riverside Drive are walked and quoted on a per-property basis. Price is driven by linear footage, roofline complexity and number of corners, one-story versus two-story access, gutter size, 6-inch or 7-inch, number of downspouts, and color match. Free flat-price estimate. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Why 6-inch instead of 5-inch in New Port Richey?", a: "Volume plus storm exposure. Florida thunderstorms drop more rain in a 15-minute window than most U.S. markets see in an hour, and New Port Richey has taken three named storms in 10 years. A 5-inch K-style gutter overflows at New Port Richey rain volume even when perfectly clean. JR One installs 6-inch as the minimum on every Florida home and 7-inch on steeper rooflines or larger footprints. We do not install 5-inch in Florida, it does not match the climate." },
      { q: "How long does seamless gutter installation take in New Port Richey?", a: "Most single-story homes complete in a single day. Fabrication on site in the morning, install in the afternoon. Two-story homes and larger Trinity, Seven Springs, or River Ridge custom builds run one to two days depending on complexity. Coastal-facing installs in Gulf Harbors add corrosion-resistant fastener inspection time." },
      { q: "Do New Port Richey HOAs require approval before gutter replacement?", a: "Gulf Harbors, Trinity, Seven Springs, and Riverside Drive communities have architectural-review boards that require color match documentation and contractor insurance before approval. We provide the color sample, spec sheet, and certificate of insurance as part of the estimate. We do not start work until HOA approval is in writing." },
      { q: "Are seamless gutters more resistant to hurricane wind?", a: "Yes. Sectional gutters fail at the seams under wind-pressure differential, that is where wind lifts the gutter and pries it off the fascia. A continuous seamless run with hidden hangers screwed into solid fascia handles hurricane wind better because there are no failure points along the run, only at the corners and downspout connections, both of which we spec for Florida hurricane code. Coastal Pasco is where this matters most." },
      { q: "Can you match copper or specialty trim on a waterfront New Port Richey home?", a: "Yes. Standard aluminum installs in 25 plus color options. For Gulf Harbors waterfront homes or higher-end Riverside Drive properties we also fabricate copper gutters on site. Copper costs roughly three times standard aluminum but lasts 75 plus years and is the right answer when matching original trim or shooting for the next 50 years of low maintenance on a coastal property. Free copper-vs-aluminum comparison during the estimate." },
      { q: "What is the warranty on JR One seamless gutters in New Port Richey?", a: "Workmanship warranty on the install, written, full terms in the estimate package. Manufacturer warranty on the aluminum coil and the hidden hangers. We are family-owned with over 30 years in Tampa Bay and 51 logged New Port Richey projects in the CompanyCam record since November 2022, the established coastal-Pasco specialist. We are still here for warranty service three years from now." },
    ],
    neighborhoodsOfNote: ["Gulf Harbors","Magnolia Valley","Jasmine Lakes","River Ridge","Trinity","Seven Springs","Holiday","Riverside Drive"],
    trustNumbers: ["51 New Port Richey projects in the JR One CompanyCam record since November 2022, the established specialist aluminum contractor in coastal Pasco"],
  },

  "new-port-richey/gutter-guards": {
    introOverride: "New Port Richey housing skews coastal and mature, median year-built 1975 per Pasco County records with 48 percent of stock pre-1980. Combine 78 thunderstorm days per year and 50.8 inches of average annual rainfall per NOAA with mature live oak, pine, and palm canopy across Magnolia Valley, Jasmine Lakes, and Trinity, plus three named storms in the last ten years (Idalia, Eta, Elsa), and the twice-or-three-times-a-year cleaning schedule becomes the wrong economic answer for canopy-heavy homes. Guards turn a three-cleanings-a-year property into a once-a-year inspection property, and they pay for themselves in two to four years on a typical New Port Richey home with tree coverage.",
    propsOverride: [
      ["Micromesh guard","Blocks pine needles, the test most consumer guards fail. New Port Richey has too much pine and palm canopy for anything less."],
      ["Works with existing 6-inch and 7-inch gutters","Retrofit onto your current system if the existing gutter is sound. No full replacement needed."],
      ["Cuts cleaning frequency","Three cleanings a year drops to one inspection visit. Math works in two to four years for canopy-heavy homes."],
      ["Micromesh that stops pine needles","The finer mesh is the only difference from our standard aluminum guard, and it is what keeps needles out of the channel. Written warranty terms come in your install package."],
    ],
    faqs: [
      { q: "How much do gutter guards cost in New Port Richey?", a: "Micromesh gutter guard installation from JR One Aluminum runs $8 to $14 per linear foot installed in New Port Richey, FL. A standard single-story home with 150 to 200 linear feet of gutter runs $1,200 to $2,800 total. Larger Trinity, Seven Springs, or River Ridge homes and homes with complex rooflines run higher. Price is driven by linear footage, roof height and ladder access, one-story versus two-story, gutter size, 6-inch or 7-inch, and number of downspouts. Free flat-price estimate at the property, no per-trip charge for the visit. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Are gutter guards worth it in New Port Richey?", a: "On a New Port Richey, FL property with mature pine, oak, palm, or laurel canopy, yes. A typical New Port Richey home with heavy tree coverage needs three cleanings per year at roughly $200 to $300 each, so $600 to $900 annually, while a JR One guard install at $1,500 to $2,500 pays back in two to four years and lasts 20 plus. On a property with minimal landscaping, the math is closer to break-even and we tell you that straight during the estimate. What moves the payback math is tree canopy, linear footage, roof height and access, and how many cleanings a year the property actually needs. Guards reduce cleaning frequency, they do not eliminate it. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Will gutter guards stop pine needles and palm debris?", a: "Micromesh guards do, if the mesh is fine enough. Most consumer-grade guards on the market (the perforated metal screen at hardware stores) fail the pine-needle test, needles slide right through and clog the gutter underneath. JR One installs micro-mesh that handles pine needles and palm fiber, which matters in coastal Pasco because both canopies are everywhere from Magnolia Valley to Holiday." },
      { q: "Do gutter guards work with existing 6-inch gutters?", a: "Yes. We retrofit guards onto sound existing 6-inch and 7-inch K-style gutters. If the existing gutter has separated seams, sagging runs, or pulled-loose hangers (common on 50-year-old original-install systems), we address those issues first or quote a full replacement, installing guards on a failing gutter is throwing money away. We walk the property and tell you straight which path makes sense." },
      { q: "How long do gutter guards last in coastal New Port Richey?", a: "The micromesh itself does not rust, warp, or collapse under debris load, it lasts the life of the gutter system. Salt-laden Gulf air drives faster oxidation on standard fasteners, so we use corrosion-resistant hardware on every Gulf Harbors and Riverside Drive install. The gutter underneath is the wearing part, and a properly maintained gutter with guards installed lasts 25 to 35 years in Florida." },
      { q: "Will I still need any gutter maintenance with guards installed?", a: "Yes, but it shrinks from active cleaning to once-a-year inspection. Some fine debris and pollen accumulates on top of the mesh and gets washed off by the next rain. If pine needles or palm fronds pile up enough to block the mesh from above, they need brushing off. We offer an annual inspection visit for guarded homes that handles this in 30 minutes." },
      { q: "Do you offer storm-damage warranty on New Port Richey gutter guards?", a: "Yes. Workmanship warranty on the install, written, full terms in the package. Manufacturer warranty on the mesh and frame. After named storms we provide insurance-ready damage documentation if any component fails outside warranty. We are family-owned with over 30 years in Tampa Bay and 51 logged New Port Richey projects in the CompanyCam record since November 2022, the established coastal-Pasco specialist." },
    ],
    neighborhoodsOfNote: ["Gulf Harbors","Magnolia Valley","Jasmine Lakes","River Ridge","Trinity","Seven Springs","Holiday","Riverside Drive"],
    trustNumbers: ["51 New Port Richey projects in the JR One CompanyCam record since November 2022, the established specialist aluminum contractor in coastal Pasco"],
  },

  // ── Phase 3 Batch 4 (2026-06-02) — next 10 ROI combos ─────────────


  // 1. largo/gutter-cleaning (NEW, 72 projects, Pinellas)
  "largo/gutter-cleaning": {
    introOverride: "Largo sits in mid-Pinellas with median home year-built 1985 and 38 percent of housing built before 1980 per county records. Combined with 51.8 inches of average annual rainfall and 82 thunderstorm days per year per NOAA, the per-foot rain volume hitting a 40-year-old original-install gutter run is what drives the cleaning call. Four named storms have come within range in the last decade (Idalia, Ian, Eta, Elsa), and the post-storm pattern is clear, the Largo homes that came through driest were the ones with gutters actually moving water away from the foundation, not just bolted to the fascia.",
    propsOverride: [
      ["Full hand-clean","Leaves, pine needles, palm fronds, shingle grit, all removed and bagged off site. Beds left as we found them."],
      ["Coastal-corrosion check","Mid-Pinellas wind carries enough Gulf salt to drive aluminum oxidation at fastener points. Cleanings double as corrosion inspections on hidden hangers and downspout elbows."],
      ["Downspout flush + flow test","Live water through every run. 40-year-old downspouts often exit at the elbow instead of at grade, our flow test catches that in two minutes."],
      ["Storm-readiness report","With four named storms in 10 years we know what fails first on Largo systems. Documented in writing before the next event tests it."],
    ],
    faqs: [
      { q: "How much does gutter cleaning cost in Largo?", a: "JR One Aluminum charges $175 to $300 for a full gutter cleaning on a standard single-story home in Largo, FL, in Largo Central, Anona, or Harbor Bluffs, including downspout flushing and flow testing. Two-story homes and homes under mature oak canopy in Bay Vista Estates or Pinebrook Estates run $250 to $400 because we are removing more material. Direct beach-side access properties near Indian Rocks Beach get walked and quoted per-property. Price is driven by linear footage, roof height and ladder access, one-story versus two-story, debris load, and number of downspouts. Free flat-price estimate by phone or text, no per-foot surprises. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "How often should Largo gutters be cleaned?", a: "Twice a year is the floor. Once in May before the July through September peak-rainfall window per NOAA, and once in late fall after Florida's oak and pine leaf-drop window. Homes under heavy live oak canopy in Imperial Point or Belleair Bluffs often need a third clean mid-summer because thunderstorm wind pulls debris off the canopy faster than a twice-a-year schedule catches. Skipping a cycle on a 40-year-old original-install run is how the next overflow becomes a fascia rebuild." },
      { q: "What is special about cleaning gutters on older Largo homes?", a: "Two things. First, the pitch on a 40-year-old gutter run is rarely what it was in 1985, original hangers loosen, fascia warps, water starts pooling instead of flowing. A flow test with live water tells you in two minutes what a visual inspection cannot. Second, fascia behind 40-year-old gutters on a 40-year-old roof is often soft from decades of moisture exposure. We document fascia condition and quote any rebuild separately before doing repair work." },
      { q: "Do you clean gutters on beach-side Largo properties?", a: "Yes. Anona, Harbor Bluffs, Indian Rocks Beach access, and the bridge-accessed properties out to the Gulf. Salt-laden coastal air drives aluminum oxidation faster than inland Pinellas, so cleaning visits double as corrosion inspections on every fastener point and downspout elbow. We carry the insurance for gated waterfront communities." },
      { q: "Will you flag damage during the cleaning visit?", a: "Yes. That is half the value of having a specialist aluminum contractor clean versus a handyman. We are up there for an hour or two looking directly at the fascia, the hangers, the spikes, the seams, and the downspout connections. Anything failing or about to fail is photographed, written into a damage report, and quoted separately if you want it done. The cleaning price does not change either way." },
      { q: "Do you handle insurance-claim documentation after storms?", a: "Yes. After Idalia in 2023 and Ian in 2022 we wrote insurance-ready reports for Largo homeowners. Photos, scope of damage, replacement-cost itemization. If your gutter system was damaged by a named storm and you have an open claim, the cleaning visit is the right time to document what needs replacement or repair. We work directly with adjusters." },
      { q: "Are you insured to clean gutters in Largo?", a: "Yes. JR One Aluminum LLC carries general liability and workers compensation. Certificate of insurance available on request before work begins. Hiring an uninsured contractor on a Largo gutter cleaning is a foundation, fascia, and homeowner-liability risk that is not worth saving fifty bucks on, especially on 40-year-old housing stock." },
    ],
    neighborhoodsOfNote: ["Largo Central","Anona","Harbor Bluffs","Imperial Point","Bay Vista Estates","Pinebrook Estates","Belleair Bluffs","Indian Rocks Beach access"],
    trustNumbers: ["72 Largo projects in the JR One CompanyCam record since December 2022, the established specialist aluminum contractor for mid-Pinellas cleanings, repairs, and replacements"],
  },

  // 2. clearwater/gutter-guards (REFRESH, 102 projects, Pinellas)
  "clearwater/gutter-guards": {
    introOverride: "Clearwater sits on the Pinellas coast with 51.8 inches of average annual rainfall, 82 thunderstorm days per year, and four named storms in the last ten years (Idalia, Ian, Eta, Elsa) per NOAA. Pinellas County records show 42 percent of Clearwater housing is pre-1980, which means heavy live oak and laurel oak canopy on long-tenure properties driving debris into original gutter runs at a rate the twice-a-year schedule cannot keep up with. Guards turn a three-cleanings-a-year property into a once-a-year inspection property, and on coastal Clearwater they also reduce salt-corrosion exposure at the gutter floor by keeping the run clear of moisture-holding debris.",
    propsOverride: [
      ["Micromesh guard","Blocks pine needles and oak debris, the test most consumer guards fail. Clearwater has too much mature canopy in Countryside, Morningside, and Skycrest for anything less."],
      ["Works with existing 6-inch and 7-inch gutters","Retrofit onto your current system if the existing gutter is sound. No full replacement needed."],
      ["Cuts cleaning frequency","Three cleanings a year drops to one inspection visit. Math works in two to four years for canopy-heavy homes."],
      ["Coastal-grade hardware","Upgraded corrosion-resistant fastener spec for Clearwater Beach, Sand Key, and Island Estates properties. We confirm material choice on site during the walk."],
    ],
    faqs: [
      { q: "How much do gutter guards cost in Clearwater?", a: "Micromesh gutter guard installation from JR One Aluminum runs $8 to $14 per linear foot installed in Clearwater, FL. A standard single-story home with 150 to 200 linear feet of gutter runs $1,200 to $2,800 total. Two-story homes in Countryside or Belleair and coastal homes on Sand Key or Clearwater Beach run higher. Price is driven by linear footage, roof height and ladder access, one-story versus two-story, gutter size, 6-inch or 7-inch, and number of downspouts. Free flat-price estimate at the property. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Are gutter guards worth it in Clearwater?", a: "On a Clearwater, FL property with mature oak, laurel, or pine canopy, yes. A typical Clearwater home with heavy tree coverage needs three cleanings per year at $200 to $300 each, so $600 to $900 annually, while a JR One guard install at $1,500 to $2,500 pays back in two to four years and lasts 20 plus. On a newer property in Skycrest or a coastal lot with no canopy, the math is closer to break-even and we will tell you that during the estimate. What moves the payback math is tree canopy, linear footage, roof height and access, and how many cleanings a year the property actually needs. Guards reduce cleaning frequency, they do not eliminate it. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Will gutter guards stop pine needles and oak debris?", a: "Micromesh guards do, if the mesh is fine enough. Most consumer-grade guards on the market (the perforated metal screen sold at hardware stores) fail the pine-needle test, needles slide through the holes and clog the gutter underneath. JR One installs micro-mesh that handles pine needles and oak catkins, which matters in Countryside, Morningside, and Belleair where mature canopy is everywhere." },
      { q: "Do gutter guards work on Clearwater Beach and Sand Key homes?", a: "Yes. Coastal exposure changes the calculation, salt-laden Gulf air drives faster oxidation at fastener points and any moisture-holding debris on the gutter floor accelerates that. Guards keep the floor clear of standing debris between cleanings, which extends the underlying gutter life on coastal properties. We confirm the corrosion-resistant hardware spec on site during the walk." },
      { q: "Will guards hold up to hurricane wind in Clearwater?", a: "Properly screwed-in micro-mesh guards hold up far better in Florida storm wind than draped or clipped guards, because they are mechanically fastened to the front of the gutter run rather than resting in place. No exterior component is immune to a strong enough storm and we will not tell you otherwise. The failure mode for guards in a storm is debris pile-up from above blocking flow, not the guard itself coming off. We design for it. After Idalia in 2023 the typical post-storm visit on guarded Clearwater installs was an inspection and clear-out, not a replacement." },
      { q: "Do gutter guards work with existing 6-inch gutters?", a: "Yes. We retrofit guards onto sound existing 6-inch and 7-inch K-style gutters. If the existing gutter has separated seams, sagging runs, or pulled-loose hangers, we address those issues first or quote a full replacement, installing guards on a failing gutter is throwing money away. We walk the property and tell you straight which path makes sense." },
      { q: "Do you offer storm-damage warranty on Clearwater gutter guards?", a: "Yes. Workmanship warranty on the install, written, full terms in the package. Manufacturer warranty on the mesh and frame. After named storms we provide insurance-ready damage documentation if any component fails outside warranty. We are family-owned with over 30 years in Tampa Bay and 102 logged Clearwater projects in the CompanyCam record since November 2022, the second-highest density in Pinellas County for us." },
    ],
    neighborhoodsOfNote: ["Countryside","Sunset Point","Clearwater Beach","Island Estates","Sand Key","Belleair","Morningside","Skycrest"],
    trustNumbers: ["102 Clearwater projects in the JR One CompanyCam record since November 2022, the second-highest density in Pinellas County for us"],
  },

  // 3. lakeland/copper-gutters (NEW, 25 projects, Polk -- HISTORIC HOMES)
  "lakeland/copper-gutters": {
    introOverride: "Lakeland is the only inland Polk County market in our service area with a meaningful concentration of pre-1940 historic homes, with Lake Hollingsworth, South Lake Morton Historic District, and Beacon Hill anchoring the citys estate-class architectural inventory. Polk County records show median home year-built 1980 with 43 percent of housing pre-1980, and the historic-district subset is where copper gutters are the right answer. Copper matches original architectural detail on 1920s and 1930s homes where painted aluminum reads wrong, lasts 75 plus years versus aluminums 25 to 35, and develops the patina that historic-district architectural review boards expect. With 50.2 inches of average annual rainfall per NOAA and three named storms in the last ten years, the inland-Polk climate is gentle enough that copper investment pays back in lifespan and curb appeal both.",
    propsOverride: [
      ["On-site fabrication","Cut to your exact roofline from a single copper coil. No warehouse sections, no seam failures, original-trim accuracy on historic homes."],
      ["75 plus year lifespan","Copper outlasts the next two aluminum replacements. Estate-class homes amortize the cost over decades, not years."],
      ["Patina match for historic district","Verdigris develops naturally over 5 to 15 years. We can also apply accelerated patina on request for immediate aged-copper appearance to match adjacent original-trim work."],
      ["Half-round and K-style copper","Half-round profile is the historically accurate choice for pre-1940 Lake Hollingsworth and South Lake Morton homes. K-style copper available for Beacon Hill and post-war estate properties."],
    ],
    faqs: [
      { q: "How much do copper gutters cost in Lakeland?", a: "Copper gutters from JR One Aluminum in Lakeland, FL run about three times the cost of comparable aluminum. A single-story historic-district home in Lake Hollingsworth or South Lake Morton with 150 to 200 linear feet typically runs $7,500 to $14,000 in copper versus $2,500 to $4,500 in aluminum. Two-story estate homes in Beacon Hill or Cleveland Heights run $12,000 to $24,000. Price is driven by linear footage, roofline complexity and number of corners, one-story versus two-story access, half-round versus K-style profile, and the amount of hand fabrication at the corners and downspouts. Free flat-price estimate at the property, no per-foot surprises after fabrication starts. To size the run on your own home, start with the JR One estimator at jronegutters.com/estimator to get your gutter footage measured, then call (844) 444-3114 for a copper quote." },
      { q: "Why copper gutters instead of painted aluminum on a Lakeland historic home?", a: "Three reasons. First, architectural accuracy, copper was the gutter material on most pre-1940 Lake Hollingsworth and South Lake Morton homes when they were built, painted aluminum reads as a 1970s replacement to a trained eye. Second, lifespan, copper lasts 75 plus years versus 25 to 35 for aluminum, so the investment amortizes over the next two aluminum-replacement cycles. Third, the South Lake Morton Historic District and other historic-district review boards in Lakeland may prefer period-appropriate materials on visible exterior elements, and copper restoration is the path of least friction through the review process. We coordinate the review submission as part of the estimate package." },
      { q: "Do you fabricate copper gutters on site in Lakeland?", a: "Yes. Same on-site fabrication setup as our aluminum work, cut from a single continuous copper coil to your exact roofline. No warehouse-stocked sections, no seam failures, true seamless copper. Half-round profile is the historically accurate choice for pre-1940 Lake Hollingsworth and South Lake Morton homes, K-style copper is available for newer estate properties in Beacon Hill or Cleveland Heights." },
      { q: "How long does copper take to develop patina?", a: "Natural patina (verdigris green) develops in 5 to 15 years depending on the local climate and the homes orientation. Lakeland inland air drives it slower than coastal Pinellas would. If the home is in a historic district with adjacent original copper trim that has already patinated, we can apply accelerated chemical patina at install for immediate aged-copper appearance to match. We discuss the option during the estimate." },
      { q: "Will copper gutters work on a 1920s or 1930s Lake Hollingsworth home?", a: "Yes, and that is the typical use case. Most pre-1940 Lake Hollingsworth and South Lake Morton homes have original or replacement aluminum gutters now, and the architectural-review boards prefer copper restoration when the homeowner is replacing anyway. We coordinate with the historic-district review process, provide profile sample, fabrication spec, and contractor insurance certificate as part of the estimate package." },
      { q: "What is the warranty on JR One copper gutters?", a: "Workmanship warranty on the install, written, full terms in the estimate package. Manufacturer warranty on the copper coil itself, which on copper is effectively material lifespan. We are family-owned with over 30 years in Tampa Bay and 25 logged Lakeland projects in the CompanyCam record since February 2023. Copper is a specialty product but it is in our regular fabrication rotation, not a one-off." },
      { q: "Do you handle historic-district approval paperwork?", a: "We provide the documentation, the homeowner or their architect submits it. South Lake Morton Historic District in particular has an architectural-review committee that wants profile sample, material spec, fabrication method, and contractor insurance certificate before approval. We package all of that as part of the estimate. We do not start work until approval is in writing." },
    ],
    neighborhoodsOfNote: ["Lake Hollingsworth","South Lake Morton Historic District","Beacon Hill","Cleveland Heights","Christina","Lakeland Highlands"],
    trustNumbers: ["25 Lakeland projects in the JR One CompanyCam record since February 2023, with copper fabrication as a regular part of our Polk County estate-class work"],
  },

  // 4. riverview/gutter-repair (NEW, 84 projects, Hillsborough)
  "riverview/gutter-repair": {
    introOverride: "Riverview is one of the newer-stock markets in our service area with median home year-built 1990 and 50 percent of housing built after 2000 per Hillsborough County records. That cuts against the older-fascia repair pattern of Bradenton or Sarasota, the typical Riverview repair call is not a 45-year-old hanger failure but rather a 15 to 25 year volume-builder install where original 5-inch profiles never matched current Florida rain volume to begin with. Add 51.2 inches of average annual rainfall and 80 thunderstorm days per year per NOAA, plus four named storms in the last ten years (Idalia, Ian, Eta, Elsa), and the repair math on Riverview gutters is mostly about pitch correction, downspout resizing, and seam reseal on builder-grade systems.",
    propsOverride: [
      ["Re-pitch and re-hang","Most Riverview sag is fixed with proper hangers at proper spacing. Volume-builder 1990s and 2000s installs often used spread-out hanger spacing that loosens under Florida rain volume."],
      ["Seam sealing done right","Commercial-grade gutter sealant, not silicone caulk that fails by next summer. Sectional builder-grade gutter seams are the typical Riverview leak point."],
      ["Downspout resize","Original builder-grade 2x3 downspouts are undersized for current Florida rain volume. We upsize to 3x4 or larger."],
      ["Storm-claim documentation","Insurance-ready scope and photos if the claim is still open after Idalia, Ian, or any future storm."],
    ],
    faqs: [
      { q: "How much does gutter repair cost in Riverview?", a: "Gutter repair from JR One Aluminum in Riverview, FL runs $175 to $425 for spot repairs, meaning one seam, one downspout, or a hanger replacement, on standard single-story homes in Panther Trace, Boyette Springs, or Summerfield. Full re-pitch and re-hang of a single run is $300 to $625 depending on length and access. Section replacement on a damaged run is $8 to $14 per linear foot installed including matching the existing profile. Larger Riverview Estates and Triple Creek custom homes are walked and quoted per-property. Price is driven by the length of the run, roof height and ladder access, one-story versus two-story, the number of downspouts and hangers involved, and gutter size, 6-inch or 7-inch. To size the job on your own home, start with the JR One estimator at jronegutters.com/estimator to get your gutter footage measured, or call (844) 444-3114 for an on-site look." },
      { q: "Should I repair or replace builder-grade Riverview gutters?", a: "Depends on three things. If the aluminum is sound and the problem is hangers, seams, or pitch, repair is the right call and runs roughly one-third the cost of replacement. If the original install was 5-inch sectional from a 2000s production builder (most Panther Trace and Summerfield homes were), the underlying profile is too small for current Florida rain volume regardless of repair work, and replacement to 6-inch seamless is the better long-term spend. We walk the property and tell you straight which way the math works." },
      { q: "What causes Riverview gutters to fail?", a: "Three common causes. First, builder-grade hanger spacing too wide for Florida rain volume, the same shortcut almost every Hillsborough production builder took in the 1990s and 2000s. Second, sectional 5-inch profiles that overflow under peak storm load. Third, 2x3 downspouts undersized for the roof area they are draining. Idalia 2023 and Ian 2022 stressed all three failure modes across Riverview at the same time." },
      { q: "Do you handle storm-damage gutter repair in Riverview?", a: "Yes, and we prioritize storm calls. After Idalia in 2023 and Ian in 2022 we logged Riverview repair visits where sections pulled loose from fascia, downspouts torn off at the elbow, and runs separated at seams from wind-pressure differential. We document everything for insurance with photos and itemized scope. If your gutter is loose or hanging after a storm, do not wait for the next rain event." },
      { q: "Can you repair gutters that have already pulled away from the fascia?", a: "Usually yes, depending on the fascia condition underneath. If the fascia is sound, we re-hang at proper spacing with new fasteners and re-pitch the run. If the fascia behind the gutter is soft or rotted (less common on Riverviews newer stock but it happens on 25-year-old Boyette Springs and Rivercrest homes), we quote the fascia replacement as a separate line item before re-hanging. We do not screw new gutters into rotted fascia and pretend it is fixed." },
      { q: "How long do Riverview gutter repairs last?", a: "A proper re-pitch and re-hang with hidden hangers at correct spacing typically lasts 10 to 15 years before that hardware needs attention again, assuming the gutter itself is sound and the homeowner cleans twice a year. A commercial-grade seam reseal lasts 10 plus years. A silicone-caulk handyman repair typically fails the next summer. The difference is spec and hardware, not effort." },
      { q: "Do you provide warranties on Riverview gutter repairs?", a: "Yes. Workmanship warranty on all repair work, written, with itemized scope. Manufacturer warranty on any replacement aluminum or hardware. We are family-owned with over 30 years in Tampa Bay and 84 logged Riverview projects in the CompanyCam record since November 2022. We are still here for warranty service two years from now." },
    ],
    neighborhoodsOfNote: ["Panther Trace","Boyette Springs","Summerfield","Riverview Estates","South Pointe","Triple Creek","Rivercrest","Bloomingdale"],
    trustNumbers: ["84 Riverview projects in the JR One CompanyCam record since November 2022, the established specialist aluminum contractor for south Hillsborough new-stock repairs and replacements"],
  },

  // 5. clearwater/soffit-and-fascia (NEW, 102 projects, Pinellas)
  "clearwater/soffit-and-fascia": {
    introOverride: "Clearwater housing stock skews old, 42 percent pre-1980 per Pinellas County records with median home year-built 1982, which means a lot of original wood soffit and fascia is at the 40 to 45 year point where decades of Florida humidity and four named storms in the last ten years (Idalia, Ian, Eta, Elsa) have softened the wood from the back side. 51.8 inches of average annual rainfall and 82 thunderstorm days per year per NOAA accelerate the rot pattern, the wood looks fine from the ground until it does not. Aluminum conversion is the right answer on Clearwater coastal exposure, ventilated aluminum soffit also improves attic AC efficiency in a market where the summer cooling load runs five months a year.",
    propsOverride: [
      ["Wood-to-aluminum conversion","Original 1980s wood soffit and fascia replaced with factory-finished aluminum that will not rot, peel, or need repainting the way wood does. Color-matched to existing trim and gutter color."],
      ["Ventilated soffit panels","Vented aluminum soffit improves attic airflow and reduces AC load, which matters on Clearwater coastal homes running cooling five months a year."],
      ["Pest-sealed installation","Florida humidity drives wood-destroying insect activity into any soft fascia. Aluminum eliminates the food source and we seal all penetration points at install."],
      ["Color match to gutter and trim","25 plus aluminum colors matched to existing fascia, gutter, and body. HOA-ready documentation for Sand Key, Island Estates, and Belleair architectural review."],
    ],
    faqs: [
      { q: "How much does soffit and fascia replacement cost in Clearwater?", a: "Soffit and fascia replacement from JR One Aluminum runs $9 to $16 per linear foot installed in Clearwater, FL, which puts a single-story home in Countryside, Sunset Point, or Skycrest at $2,800 to $6,500 for a full perimeter conversion. Two-story homes in Belleair, Sand Key, or Clearwater Beach run $5,500 to $12,000. Coastal estate properties are walked and quoted per-property because installation also includes corrosion-resistant fastener inspection. Price is driven by linear footage of perimeter, roof height and ladder access, one-story versus two-story, ventilation specification, and how much rotted wood has to be replaced behind the aluminum. Free flat-price estimate. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Should I repair or replace my Clearwater wood soffit and fascia?", a: "Depends on how much of the run is soft. If the rot is isolated to one or two sections, spot repair plus aluminum conversion on the failed sections only is the right call. If the wood is soft across more than 30 percent of the perimeter (common on 40 plus year old Belleair, Morningside, and pre-1980 Countryside homes), full aluminum conversion is the better long-term spend because aluminum does not rot, so the failure mode is gone. We walk the property and tell you straight which way the math works." },
      { q: "What causes Clearwater wood fascia to fail?", a: "Two combined causes. First, decades of moisture exposure from above (rain runoff backing up behind clogged gutters) and from below (attic humidity migrating out through wood soffit), which softens the wood from the back side where you cannot see it. Second, wood-destroying insect activity that follows the moisture, Florida humidity makes every soft fascia board a buffet. By the time the failure is visible from the ground, the back side has been gone for years." },
      { q: "Why ventilated soffit instead of solid?", a: "Attic airflow. Vented aluminum soffit lets hot attic air escape, which reduces summer AC load and extends shingle life on the roof above. Clearwater homes run cooling five months a year, and a well-ventilated attic shaves enough off the cooling bill to matter over a decade. We discuss the ventilation calc during the estimate based on attic area and existing ridge or gable venting." },
      { q: "Do Clearwater HOAs require approval before soffit and fascia replacement?", a: "Most do. Sand Key, Island Estates, Belleair, and the gated Countryside communities have architectural-review boards that require color match documentation and contractor insurance before approval. We provide the color sample, spec sheet, and certificate of insurance as part of the estimate. We do not start work until HOA approval is in writing." },
      { q: "Will the aluminum match my existing gutter color?", a: "Yes. We match soffit and fascia color to the existing gutter and body trim out of 25 plus standard Florida-stock colors. If the home has copper or specialty trim, we discuss the match approach during the estimate. Many Clearwater customers do the soffit, fascia, and gutter replacement on one project to lock the color match across all three components." },
      { q: "What is the warranty on JR One Clearwater soffit and fascia?", a: "Workmanship warranty on the install, written, full terms in the estimate package. Manufacturer warranty on the aluminum coil and fasteners. We are family-owned with over 30 years in Tampa Bay and 102 logged Clearwater projects in the CompanyCam record since November 2022, the second-highest density in Pinellas County for us. We are still here for warranty service three years from now." },
    ],
    neighborhoodsOfNote: ["Countryside","Sunset Point","Clearwater Beach","Island Estates","Sand Key","Belleair","Morningside","Skycrest"],
    trustNumbers: ["102 Clearwater projects in the JR One CompanyCam record since November 2022, the second-highest density in Pinellas County for us"],
  },

  // 6. st-petersburg/soffit-and-fascia (NEW, 292 projects, Pinellas -- OLDEST STOCK)
  "st-petersburg/soffit-and-fascia": {
    introOverride: "St. Petersburg housing is the oldest concentration in our service area, median home year-built 1980 with roughly 45 percent of stock built before 1980 per Pinellas County records. That means a lot of original 1950s through 1970s wood soffit and fascia is at the 50 to 70 year point where Florida humidity, salt air off the bay, and four named storms in the last ten years have done what they do. 51.8 inches of average annual rainfall and 82 thunderstorm days per year per NOAA finish the job. St. Petersburg Fire Rescue pulled 75 plus residents out of flooded homes during Idalia in 2023, and the post-storm pattern showed the same thing every year, the homes that came through driest were the ones where the gutter system and the soffit and fascia were both still doing their jobs.",
    propsOverride: [
      ["Wood-to-aluminum conversion","Original 1950s through 1970s wood soffit and fascia replaced with factory-finished aluminum that will not rot, peel, need repainting, or give insects the soft wood they look for. Color-matched to existing trim and gutter."],
      ["Ventilated soffit panels","Vented aluminum soffit improves attic airflow and reduces AC load on St. Pete homes running cooling five plus months a year. Critical on pre-1980 stock with marginal original ventilation."],
      ["Pest-sealed installation","Salt-air St. Pete humidity drives termite and carpenter ant activity into any soft fascia. Aluminum eliminates the food source and we seal all penetration points at install."],
      ["Bay-air corrosion-resistant fasteners","Upgraded hardware spec on direct-bay-exposure St. Pete installs. Standard hardware corrodes too fast in Old Northeast, Snell Isle, and Coquina Key bay air. We confirm material choice during the walk."],
    ],
    faqs: [
      { q: "How much does soffit and fascia replacement cost in St. Petersburg?", a: "Soffit and fascia replacement from JR One Aluminum runs $9 to $16 per linear foot installed in St. Petersburg, FL, which puts a single-story home in Disston Heights, Crescent Lake, or Lakewood Estates at $2,800 to $6,500 for a full perimeter conversion. Two-story bayfront homes in Old Northeast, Snell Isle, or Bayway Isles run $5,500 to $14,000. Coquina Key and direct bay-access estate properties are walked and quoted per-property because installation also includes corrosion-resistant fastener inspection. Price is driven by linear footage of perimeter, roof height and ladder access, one-story versus two-story, ventilation specification, and how much rotted wood has to be replaced behind the aluminum. Free flat-price estimate, no per-foot surprises. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Should I repair or replace my old St. Pete wood soffit and fascia?", a: "Depends on how much of the run is soft. If the rot is isolated to one or two sections, spot repair plus aluminum conversion on the failed sections only is the right call. On 50 to 70 year old pre-1980 stock in Disston Heights, Old Northeast, or Roser Park, the wood is usually soft across more than 30 percent of the perimeter and full aluminum conversion is the better long-term spend because aluminum does not rot, so the failure mode is gone. We walk the property and tell you straight." },
      { q: "What causes old St. Pete wood fascia to fail?", a: "Three combined causes on bayfront and inland stock alike. First, decades of moisture exposure from above (rain runoff backing up behind clogged or undersized 1960s gutters) and from below (attic humidity migrating out through wood soffit). Second, wood-destroying insect activity, salt-air humidity makes every soft fascia board a buffet for termites and carpenter ants. Third, salt-laden bay air on Old Northeast and Snell Isle that drives fastener corrosion and accelerates wood failure at every nail point. By the time it shows from the ground, the back side has been gone for years." },
      { q: "Do bayfront St. Pete homes need different soffit and fascia spec?", a: "Yes. Direct bay exposure in Old Northeast, Snell Isle, Coquina Key, and Bayway Isles drives salt-air corrosion faster than inland St. Pete, so the fastener spec gets upgraded from standard galvanized to a corrosion-resistant material. The aluminum coil is the same Florida-stock material, the hardware is the variable. We confirm the spec during the on-site estimate." },
      { q: "Why ventilated soffit instead of solid?", a: "Attic airflow. Vented aluminum soffit lets hot attic air escape, which reduces summer AC load and extends shingle life on the roof above. St. Pete homes run cooling five plus months a year, and a well-ventilated attic shaves enough off the cooling bill to matter over a decade. Critical on pre-1980 stock with marginal original ventilation, which describes most of Disston Heights, Old Northeast, and Lakewood Estates." },
      { q: "Will the aluminum match my existing gutter color?", a: "Yes. We match soffit and fascia color to the existing gutter and body trim out of 25 plus standard Florida-stock colors. If the home has historic-district or copper trim (parts of Old Northeast), we discuss the match approach during the estimate. Many St. Pete customers do the soffit, fascia, and gutter replacement on one project to lock the color match across all three components and avoid two separate mobilization fees." },
      { q: "What is the warranty on JR One St. Petersburg soffit and fascia?", a: "Workmanship warranty on the install, written, full terms in the estimate package. Manufacturer warranty on the aluminum coil and fasteners. We are family-owned with over 30 years in Tampa Bay and 292 logged St. Petersburg projects in the CompanyCam record since November 2022, the highest density in Pinellas County for us. We are still here for warranty service three years from now." },
    ],
    neighborhoodsOfNote: ["Downtown St. Pete","Old Northeast","Snell Isle","Coquina Key","Lakewood Estates","Disston Heights","Crescent Lake","Roser Park","Bayway Isles"],
    trustNumbers: ["292 St. Petersburg projects in the JR One CompanyCam record since November 2022, the highest density in Pinellas County for us"],
  },

  // 7. palm-harbor/seamless-aluminum-gutters (NEW, 65 projects, Pinellas)
  "palm-harbor/seamless-aluminum-gutters": {
    introOverride: "Palm Harbor sits in north Pinellas with median home year-built 1985 and 36 percent of housing pre-1980 per county records, a mix of established subdivisions and newer custom-home developments. Combined with 51.8 inches of average annual rainfall, 82 thunderstorm days per year, and four named storms in the last ten years (Idalia, Ian, Eta, Elsa) per NOAA, the demand for proper Florida-spec seamless gutter on Palm Harbor homes is steady, original 5-inch builder-grade installs from the 1980s and 1990s were never sized for current Florida rain volume even when perfectly clean. Highland Lakes and Innisbrook resort-area properties carry HOA architectural-review requirements that push the install spec higher. JR One installs 6-inch and 7-inch K-style on Palm Harbor homes. We do not install 5-inch in Florida.",
    propsOverride: [
      ["On-site fabrication","Cut to your exact roofline from a single continuous coil. No warehouse sections, no seam failures, no per-section weakness under hurricane wind."],
      ["6-inch and 7-inch K-style","Palm Harbor rainfall volume needs 6-inch minimum. 7-inch upgrade for steeper rooflines or larger 2,800 plus sq ft footprints common in Lansbrook, Boot Ranch, and Innisbrook."],
      ["25 plus colors","Matched to existing fascia, trim, and body. HOA color-match documentation for Highland Lakes, Innisbrook, and Lansbrook architectural review."],
      ["Hidden hangers, screw-in","Pinellas County wind code requires it. We install it that way every time regardless of inspection."],
    ],
    faqs: [
      { q: "How much does seamless gutter installation cost in Palm Harbor?", a: "Seamless aluminum gutter installation from JR One Aluminum runs $1,750 to $3,400 on a standard single-story home in Palm Harbor, FL, in Highland Lakes, Spring Lake, or Tarpon Woods, including downspouts and hidden hangers. Two-story homes and larger Lansbrook, Boot Ranch, or Innisbrook custom builds run $3,400 to $6,500. Crystal Beach coastal properties are walked and quoted per-property. Price is driven by linear footage, roofline complexity and number of corners, one-story versus two-story access, gutter size, 6-inch or 7-inch, number of downspouts, and color match. Free flat-price estimate, no per-foot surprises. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Why 6-inch instead of 5-inch in Palm Harbor?", a: "Volume. Florida thunderstorms drop more rain in a 15-minute window than most U.S. markets see in an hour, and Palm Harbor takes 51.8 inches of average annual rainfall per NOAA. A 5-inch K-style gutter overflows under that volume even when perfectly clean, and a clogged 5-inch gutter overflows on the first thunderstorm of the season. JR One installs 6-inch as the minimum on every Florida home and 7-inch on steeper rooflines or larger footprints. We do not install 5-inch in Florida, it does not match the climate." },
      { q: "How long does seamless gutter installation take in Palm Harbor?", a: "Most single-story homes complete in a single day, fabrication on site in the morning, install in the afternoon. Two-story Lansbrook and Boot Ranch homes and larger Innisbrook resort-area builds run one to two days depending on complexity. Crystal Beach coastal installs add HOA-coordination and corrosion-resistant fastener time. We confirm install date after HOA architectural approval is in writing." },
      { q: "Do Palm Harbor HOAs require approval before gutter replacement?", a: "Most do. Highland Lakes, Lansbrook, Boot Ranch, and Innisbrook have active architectural-review boards that require color match documentation and contractor insurance before approval. Tarpon Woods and Spring Lake vary by section. We provide the color sample, spec sheet, and certificate of insurance as part of the estimate. We do not start work until HOA approval is in writing." },
      { q: "Are seamless gutters more resistant to hurricane wind?", a: "Yes. Sectional gutters fail at the seams under wind-pressure differential, that is where wind lifts the gutter and pries it off the fascia. A continuous seamless run with hidden hangers screwed into solid fascia handles hurricane wind better because there are no failure points along the run, only at the corners and downspout connections, both of which we spec for Florida hurricane code. After Idalia in 2023 the typical Palm Harbor seamless-install post-storm visit was an inspection, not a replacement." },
      { q: "What is the warranty on JR One seamless gutters in Palm Harbor?", a: "Workmanship warranty on the install, written, full terms in the estimate package. Manufacturer warranty on the aluminum coil and hidden hangers. We are family-owned with over 30 years in Tampa Bay and 65 logged Palm Harbor projects in the CompanyCam record since November 2022. We are still here for warranty service three years from now." },
      { q: "Can you match copper or specialty trim on a Palm Harbor home?", a: "Yes. Standard aluminum installs in 25 plus color options. For Innisbrook resort homes, Crystal Beach estates, or any Palm Harbor property with original copper trim we also fabricate copper gutters on site. Copper costs roughly three times standard aluminum but lasts 75 plus years. Free copper-vs-aluminum comparison during the estimate." },
    ],
    neighborhoodsOfNote: ["Highland Lakes","Spring Lake","Crystal Beach","Lansbrook","Tarpon Woods","Boot Ranch","Innisbrook"],
    trustNumbers: ["65 Palm Harbor projects in the JR One CompanyCam record since November 2022, the established specialist aluminum contractor for north Pinellas seamless replacements"],
  },

  // 8. riverview/seamless-aluminum-gutters (NEW, 84 projects, Hillsborough)
  "riverview/seamless-aluminum-gutters": {
    introOverride: "Riverview is one of the newer-stock markets in our service area with median home year-built 1990 and 50 percent of housing built after 2000 per Hillsborough County records, the opposite housing-age skew of Bradenton or Sarasota. Combined with 51.2 inches of average annual rainfall, 80 thunderstorm days per year, and four named storms in the last ten years (Idalia, Ian, Eta, Elsa) per NOAA, the typical Riverview seamless gutter call is a 15 to 25 year volume-builder replacement where the original 5-inch sectional install never matched current Florida rain volume. JR One installs 6-inch and 7-inch K-style on Riverview homes. We do not install 5-inch in Florida.",
    propsOverride: [
      ["On-site fabrication","Cut to your exact roofline from a single coil, no warehouse-stocked sections, no seam failures, the upgrade from sectional builder-grade to true seamless."],
      ["6-inch and 7-inch K-style","Riverview rainfall volume needs 6-inch minimum. 7-inch upgrade for steeper rooflines or larger 2,800 plus sq ft footprints common in Triple Creek and Riverview Estates."],
      ["25 plus colors","Matched to existing fascia, trim, and body. HOA-ready color documentation for Panther Trace, Rivercrest, and Bloomingdale architectural review."],
      ["Hidden hangers, screw-in","Hillsborough County wind code requires it. We install it that way every time regardless of inspection."],
    ],
    faqs: [
      { q: "How much does seamless gutter installation cost in Riverview?", a: "Seamless aluminum gutter installation from JR One Aluminum runs $1,650 to $3,300 on a standard single-story home in Riverview, FL, in Panther Trace, Boyette Springs, or Summerfield, including downspouts and hidden hangers. Two-story homes and larger Triple Creek, Riverview Estates, or Rivercrest builds run $3,400 to $6,500. Price is driven by linear footage, roofline complexity and number of corners, one-story versus two-story access, gutter size, 6-inch or 7-inch, number of downspouts, and color match. Free flat-price estimate at the property, no per-foot surprises at the end. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Why 6-inch instead of 5-inch in Riverview?", a: "Volume. Florida thunderstorms drop more rain in a 15-minute window than most U.S. markets see in an hour. A 5-inch K-style gutter overflows under Riverview rain volume even when perfectly clean, and most 1990s and 2000s Hillsborough production-builder installs were 5-inch sectional, the cheapest spec at the time. JR One installs 6-inch as the minimum on every Florida home and 7-inch on steeper rooflines or larger footprints. We do not install 5-inch in Florida, it does not match the climate." },
      { q: "How long does seamless gutter installation take in Riverview?", a: "Most single-story homes complete in a single day, fabrication on site in the morning, install in the afternoon. Two-story Triple Creek and Riverview Estates homes and larger Rivercrest custom builds run one to two days depending on complexity. We confirm install date after HOA architectural approval is in writing." },
      { q: "Do Riverview HOAs require approval before gutter replacement?", a: "Most do. Panther Trace, Rivercrest, Bloomingdale, and Triple Creek have architectural-review boards that require color match documentation and contractor insurance before approval. We provide the color sample, spec sheet, and certificate of insurance as part of the estimate. We do not start work until approval is in writing." },
      { q: "Why upgrade from sectional to seamless?", a: "Sectional builder-grade gutters fail at the seams under Florida rain volume and wind-pressure differential. Every joint is a potential leak point and a potential wind failure point. Seamless runs eliminate every seam along the straight runs, only the corners and downspout connections remain, both of which we spec for Florida hurricane code. On a 20-year-old Panther Trace or Summerfield home with original sectional gutters, seamless is the structural upgrade, not a cosmetic one." },
      { q: "What is the warranty on JR One seamless gutters in Riverview?", a: "Workmanship warranty on the install, written, full terms in the estimate package. Manufacturer warranty on the aluminum coil and hidden hangers. We are family-owned with over 30 years in Tampa Bay and 84 logged Riverview projects in the CompanyCam record since November 2022. We are still here for warranty service three years from now." },
      { q: "Will you remove and dispose of my old gutters?", a: "Yes. Old gutter aluminum, hangers, and downspouts removed and hauled off site as part of the install. We sweep the property, check beds and walkways, and leave nothing behind. No scrap aluminum piles at the curb for the homeowner to deal with." },
    ],
    neighborhoodsOfNote: ["Panther Trace","Boyette Springs","Summerfield","Riverview Estates","South Pointe","Triple Creek","Rivercrest","Bloomingdale"],
    trustNumbers: ["84 Riverview projects in the JR One CompanyCam record since November 2022, the established specialist aluminum contractor for south Hillsborough seamless replacements"],
  },

  // 9. riverview/gutter-guards (NEW, 84 projects, Hillsborough)
  "riverview/gutter-guards": {
    introOverride: "Riverview backs up to wooded preserves and conservation tracts in many subdivisions, and Hillsborough County records show median home year-built 1990 with 50 percent of housing built after 2000. Combine 80 thunderstorm days per year and 51.2 inches of average annual rainfall per NOAA with the mature pine and oak canopy that has filled in around Panther Trace, Boyette Springs, and Summerfield over the last 25 years, and the twice-a-year cleaning schedule becomes the wrong economic answer on canopy-heavy lots. Guards turn a three-cleanings-a-year property into a once-a-year inspection property, and they pay for themselves in two to four years on a typical Riverview home with tree coverage.",
    propsOverride: [
      ["Micromesh guard","Blocks pine needles and oak debris, the test most consumer guards fail. Riverview canopy-heavy subdivisions have too much pine and oak for anything less."],
      ["Works with existing 6-inch and 7-inch gutters","Retrofit onto your current system if the existing gutter is sound. No full replacement needed."],
      ["Cuts cleaning frequency","Three cleanings a year drops to one inspection visit. Math works in two to four years for canopy-heavy Panther Trace and Bloomingdale homes."],
      ["Micromesh that stops pine needles","The finer mesh is the only difference from our standard aluminum guard, and it is what keeps needles out of the channel. Written warranty terms come in your install package."],
    ],
    faqs: [
      { q: "How much do gutter guards cost in Riverview?", a: "Micromesh gutter guard installation from JR One Aluminum runs $8 to $14 per linear foot installed in Riverview, FL. A standard single-story home with 150 to 200 linear feet of gutter runs $1,200 to $2,800 total. Larger Triple Creek and Riverview Estates homes and homes with complex rooflines run higher. Price is driven by linear footage, roof height and ladder access, one-story versus two-story, gutter size, 6-inch or 7-inch, and number of downspouts. Free flat-price estimate at the property. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Are gutter guards worth it in Riverview?", a: "On a Riverview, FL property with mature pine, oak, or laurel canopy, yes. A typical canopy-heavy Riverview home needs three cleanings per year at roughly $200 to $275 each, so $600 to $825 annually, while a JR One guard install at $1,500 to $2,500 pays back in two to four years and lasts 20 plus. On a newer property in Triple Creek with minimal landscaping the math is closer to break-even and we will tell you that during the estimate. What moves the payback math is tree canopy, linear footage, roof height and access, and how many cleanings a year the property actually needs. Guards reduce cleaning frequency, they do not eliminate it. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Will gutter guards stop pine needles in Riverview?", a: "Micromesh guards do, if the mesh is fine enough. Most consumer-grade guards on the market (the perforated metal screen sold at hardware stores) fail the pine-needle test, needles slide through the holes and clog the gutter underneath. JR One installs micro-mesh that handles pine needles, which matters in Panther Trace, Bloomingdale, and any conservation-adjacent Riverview lot where pine canopy is everywhere." },
      { q: "Do gutter guards work with existing 6-inch gutters?", a: "Yes. We retrofit guards onto sound existing 6-inch and 7-inch K-style gutters. If the existing gutter has separated seams, sagging runs, or pulled-loose hangers (common on 20-year-old volume-builder installs), we address those issues first or quote a full replacement, installing guards on a failing gutter is throwing money away. We walk the property and tell you straight." },
      { q: "How long do gutter guards last in Riverview?", a: "The micromesh itself does not rust, warp, or collapse under debris load. The gutter underneath is the wearing part, and a properly maintained gutter with guards installed lasts 25 to 35 years in Florida." },
      { q: "Will I still need any gutter maintenance with guards installed?", a: "Yes, but it shrinks from active cleaning to once-a-year inspection. Some fine debris and pollen accumulates on top of the mesh and gets washed off by the next rain. If pine needles or oak leaves pile up enough to block the mesh from above, they need brushing off. We offer an annual inspection visit for guarded homes that handles this in 30 minutes." },
      { q: "Do you offer storm-damage warranty on Riverview gutter guards?", a: "Yes. Workmanship warranty on the install, written, full terms in the package. Manufacturer warranty on the mesh and frame. After named storms we provide insurance-ready damage documentation if any component fails outside warranty. We are family-owned with over 30 years in Tampa Bay and 84 logged Riverview projects in the CompanyCam record since November 2022." },
    ],
    neighborhoodsOfNote: ["Panther Trace","Boyette Springs","Summerfield","Riverview Estates","South Pointe","Triple Creek","Rivercrest","Bloomingdale"],
    trustNumbers: ["84 Riverview projects in the JR One CompanyCam record since November 2022, the established specialist aluminum contractor for south Hillsborough cleanings, replacements, and guard retrofits"],
  },

  // 10. dunedin/soffit-and-fascia (NEW, 18 projects, Pinellas)
  "dunedin/soffit-and-fascia": {
    introOverride: "Dunedin housing stock skews old, 45 percent pre-1980 per Pinellas County records with median home year-built 1980, which means a lot of original 1950s through 1970s wood soffit and fascia is at the 50 to 70 year point where decades of Florida humidity, salt air off St. Joseph Sound, and four named storms in the last ten years (Idalia, Ian, Eta, Elsa) have softened the wood from the back side. 51.8 inches of average annual rainfall and 82 thunderstorm days per year per NOAA finish the job. Aluminum conversion is the right answer on Dunedin coastal exposure, ventilated aluminum soffit also improves attic AC efficiency in a market where summer cooling load runs five plus months a year. Downtown Dunedin and Honeymoon Island access homes carry the highest salt-corrosion exposure in our north-Pinellas service area.",
    propsOverride: [
      ["Wood-to-aluminum conversion","Original 1950s through 1970s wood soffit and fascia replaced with factory-finished aluminum that will not rot, peel, need repainting, or give insects the soft wood they look for. Color-matched to existing trim and gutter."],
      ["Ventilated soffit panels","Vented aluminum soffit improves attic airflow and reduces AC load on Dunedin homes running cooling five plus months a year. Critical on pre-1980 stock with marginal original ventilation."],
      ["Pest-sealed installation","St. Joseph Sound humidity drives termite and carpenter ant activity into any soft fascia. Aluminum eliminates the food source and we seal all penetration points at install."],
      ["Coastal-grade fasteners","Upgraded corrosion-resistant fastener spec on Downtown Dunedin and Honeymoon Island access installs. Standard hardware corrodes too fast in direct sound exposure. We confirm material during the walk."],
    ],
    faqs: [
      { q: "How much does soffit and fascia replacement cost in Dunedin?", a: "Soffit and fascia replacement from JR One Aluminum runs $9 to $16 per linear foot installed in Dunedin, FL, which puts a single-story home in Hawthorn Hills, Spanish Trails, or Cobbs Landing at $2,800 to $6,500 for a full perimeter conversion. Two-story homes near Downtown Dunedin, Caladesi Pointe, or Dunedin Country Club run $5,500 to $12,000. Direct sound-access estate properties are walked and quoted per-property because installation also includes corrosion-resistant fastener inspection. Price is driven by linear footage of perimeter, roof height and ladder access, one-story versus two-story, ventilation specification, and how much rotted wood has to be replaced behind the aluminum. Free flat-price estimate. Use the JR One estimator at jronegutters.com/estimator for a number on your own home, or call (844) 444-3114." },
      { q: "Should I repair or replace my Dunedin wood soffit and fascia?", a: "Depends on how much of the run is soft. If the rot is isolated to one or two sections, spot repair plus aluminum conversion on the failed sections only is the right call. On 50 to 70 year old pre-1980 stock near Downtown Dunedin or Hawthorn Hills, the wood is usually soft across more than 30 percent of the perimeter and full aluminum conversion is the better long-term spend because aluminum does not rot, so the failure mode is gone. We walk the property and tell you straight." },
      { q: "What causes Dunedin wood fascia to fail?", a: "Three combined causes. First, decades of moisture exposure from above (rain runoff backing up behind clogged or undersized 1960s gutters) and from below (attic humidity migrating out through wood soffit). Second, wood-destroying insect activity, sound-air humidity makes every soft fascia board a buffet for termites and carpenter ants. Third, salt-laden air off St. Joseph Sound on Downtown Dunedin and Honeymoon Island access properties that drives fastener corrosion and accelerates wood failure at every nail point." },
      { q: "Do coastal Dunedin homes need different soffit and fascia spec?", a: "Yes. Direct St. Joseph Sound exposure on Downtown Dunedin, Caladesi Pointe, and Honeymoon Island access properties drives salt-air corrosion faster than inland Pinellas, so the fastener spec gets upgraded from standard galvanized to a corrosion-resistant material. The aluminum coil is the same Florida-stock material, the hardware is the variable. We confirm the spec during the on-site estimate." },
      { q: "Why ventilated soffit instead of solid?", a: "Attic airflow. Vented aluminum soffit lets hot attic air escape, which reduces summer AC load and extends shingle life on the roof above. Dunedin homes run cooling five plus months a year, and a well-ventilated attic shaves enough off the cooling bill to matter over a decade. Critical on pre-1980 stock with marginal original ventilation, which describes most of Hawthorn Hills, Spanish Trails, and the older Downtown Dunedin housing inventory." },
      { q: "Will the aluminum match my existing gutter color?", a: "Yes. We match soffit and fascia color to the existing gutter and body trim out of 25 plus standard Florida-stock colors. Many Dunedin customers do the soffit, fascia, and gutter replacement on one project to lock the color match across all three components and avoid two separate mobilization fees. We discuss the combined-project pricing during the estimate." },
      { q: "What is the warranty on JR One Dunedin soffit and fascia?", a: "Workmanship warranty on the install, written, full terms in the estimate package. Manufacturer warranty on the aluminum coil and fasteners. We are family-owned with over 30 years in Tampa Bay and 18 logged Dunedin projects in the CompanyCam record since November 2022, with steady growth in north Pinellas year over year. We are still here for warranty service three years from now." },
    ],
    neighborhoodsOfNote: ["Downtown Dunedin","Caladesi Pointe","Hawthorn Hills","Cobbs Landing","Spanish Trails","Dunedin Country Club","Honeymoon Island access"],
    trustNumbers: ["18 Dunedin projects in the JR One CompanyCam record since November 2022, the established specialist aluminum contractor for north Pinellas coastal conversions"],
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
  const url = `https://www.jronegutters.com/areas/${slug}/${service}`;
  // ES counterpart at /es/areas/[slug]/[service] not yet built — declare x-default only
  // so the hreflang check passes the explicitly-allowed single-language fallback path.
  // When the ES combo route ships, add "es-US": `https://www.jronegutters.com/es/areas/${slug}/${service}`.
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "x-default": url,
      },
    },
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
  const url = `https://www.jronegutters.com/areas/${slug}/${service}`;

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
      url: "https://www.jronegutters.com",
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
    offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://www.jronegutters.com/areas" },
      { "@type": "ListItem", position: 3, name: city.name, item: `https://www.jronegutters.com/areas/${slug}` },
      { "@type": "ListItem", position: 4, name: svc.name, item: url },
    ],
  };

  // FAQPage JSON-LD only emitted when enrichment provides FAQs.
  //
  // RESOLVED 2026-08-02: the prior "TODO 2026-07-15: strip before Google's
  // August 2026 removal" was based on a misreading of the deprecation notice.
  // Verified against Google Search Central before acting. What the August 2026
  // date actually covers is the Search CONSOLE API reporting endpoint for the
  // FAQ rich result, not the markup on the page. Nothing is removed from, or
  // penalized on, this site. Timeline:
  //   2026-05-07  FAQ rich result stops rendering in Google Search results.
  //   2026-06     Search Console FAQ report, search-appearance filter, and
  //               Rich Results Test support removed.
  //   2026-08     Search Console API stops returning FAQ rich-result data.
  //               Affects dashboards querying that API. Not page markup.
  // Google's position: FAQPage is still a valid schema.org type, unused
  // structured data does not cause problems for Search, and site owners may
  // keep or remove it with no effect on search visibility. No warning, no
  // error, no invalid-markup signal, no penalty.
  // Source: developers.google.com/search/docs/appearance/structured-data/faqpage
  // (deprecation notice) + Search Engine Journal 2026-05-07 coverage
  // searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/
  //
  // DECISION: KEEP the markup on combo pages. It is free, harmless, and still
  // read by Bing, Perplexity, and the AI/RAG crawlers, which is exactly the
  // AEO-first surface this site optimizes for. Do NOT open a new removal task
  // on the strength of the 2026-05 headline alone.
  //
  // Not a contradiction of the Tier 1 ban: /faq (app/faq/layout.js) and blog
  // posts (app/blog/[slug]/BlogPost.jsx) omit FAQPage for a different reason,
  // which is that those were standalone FAQ surfaces whose only purpose was
  // winning the rich result. Combo pages carry per-city cost answers that hold
  // independent AEO value, so the markup keeps earning its place here.
  // Superseded policy note dated 2026-06-02 in decisions/log.md.
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
                {city.name.toUpperCase()}, FL / SPECIALIST ALUMINUM CONTRACTOR
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
              {enrichment.trustNumbers.join(" / ")}.
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
            <span style={{ fontFamily: f.h, fontWeight: 700, color: C.white, fontSize: "15px" }}>4.9 / 5.0 from 55 reviews</span>
            <span style={{ color: C.muted, fontSize: "14px" }}>Fully insured / Bilingual EN/ES</span>
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
            info@jronegutters.com / 3420 W Cherry St, Tampa, FL 33607
          </p>
        </section>

        <SiteFooter />
        <MobileCTA />
      </div>
    </>
  );
}
