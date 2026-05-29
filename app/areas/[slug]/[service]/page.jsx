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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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

        {/* Intro */}
        <section style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
          <h2 style={{ fontFamily: f.h, fontSize: "28px", fontWeight: 700, color: C.gold, marginBottom: "18px" }}>
            Why {svc.short} matters in {city.name}
          </h2>
          <p style={{ fontSize: "17px", lineHeight: 1.7, color: C.offWhite, marginBottom: "18px" }}>
            {city.localP}
          </p>
          <p style={{ fontSize: "17px", lineHeight: 1.7, color: C.offWhite, marginBottom: "18px" }}>
            {city.weatherNote}
          </p>
          <p style={{ fontSize: "17px", lineHeight: 1.7, color: C.offWhite }}>
            {svc.who} JR One has over 30 years of Tampa Bay aluminum specialist experience, and we bring the same Gold Standard service to every {city.name} project, fully insured, bilingual English/Spanish, family-owned and family-operated.
          </p>
        </section>

        {/* Value props */}
        <section style={{ background: C.navyFade, padding: "50px 20px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: f.h, fontSize: "26px", fontWeight: 700, color: C.white, textAlign: "center", marginBottom: "36px" }}>
              What {city.name} homeowners get with JR One
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "22px" }}>
              {svc.props.map(([title, body]) => (
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
