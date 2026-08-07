"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM | FAQ
   Brand-brain compliant. Migrated to design tokens + UI components.
   ═══════════════════════════════════════════════════════════ */

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import FAQAccordion from "../../components/ui/FAQAccordion";
import { HouseIcon, WaterDropIcon, ShieldIcon, RoofEdgeIcon, RulerIcon, BroomIcon, CardIcon, LightBulbIcon, PhoneIcon, MailIcon } from "../../lib/icons";

const ICON_KEYS = {
  general: HouseIcon,
  gutters: WaterDropIcon,
  guards: ShieldIcon,
  soffit: RoofEdgeIcon,
  peak: LightBulbIcon,
  siding: RulerIcon,
  warranty: CardIcon,
  maintenance: BroomIcon,
};

const T = {
  en: {
    heroTag: "FAQ",
    heroH1a: "Frequently Asked",
    heroH1b: "Questions",
    heroP: "Everything homeowners ask us, answered honestly. Can't find your question? Call (844) 444-3114 and we'll answer it directly.",
    stillTitle: "Still Have Questions?",
    stillP: "We'd rather answer your question directly than have you guess. Call or text us, we respond fast.",
    callBtn: "(844) 444-3114",
    emailBtn: "Email Us",
    categories: [
      {
        key: "general", name: "General", faqs: [
          { q: "What services does JR One offer?", a: "We do seamless aluminum gutters (6\" and 7\"), copper gutters, gutter guards (standard aluminum and micromesh), soffit and fascia installation, siding, SAGIPER architectural cladding, gutter repair, Peak 301 roof rejuvenation, Govee smart light installation, drainage installation (underground PVC, catch basins, surface grates, pop-up emitters), and maintenance plans. We're an aluminum-exterior specialty trade. That's all we do, and we do it right." },
          { q: "What areas do you serve?", a: "We serve 21 cities across Tampa Bay and Florida's west coast: Bradenton, Brandon, Clearwater, Dunedin, Lakeland, Land O' Lakes, Largo, Lutz, New Port Richey, Palm Harbor, Plant City, Riverview, Ruskin, Sarasota, Spring Hill, St. Petersburg, Sun City Center, Tampa, Tarpon Springs, Temple Terrace, and Wesley Chapel. If you're within an hour of Tampa, call us. We probably cover your area." },
          { q: "Do you use subcontractors?", a: "Never. Every person on your property is a trained, full-time JR One crew member. We run three in-house crews. This is how we maintain quality control and accountability on every job. Many of the complaints homeowners have about other contractors come from subcontracted work. We eliminated that problem entirely." },
          { q: "How long has JR One been in business?", a: "JR One Aluminum LLC is owned and run by Christopher Rivera. Over 30 years in the Tampa Bay gutter industry, family-owned, across two generations. Christopher's father Javier Rivera began installing gutters in Tampa after immigrating from Honduras, and Christopher grew up in the trade behind him. Many of the gutter and soffit companies operating in the Tampa market today trace their knowledge back to Javier. People who worked for him, worked with him, or learned alongside him." },
          { q: "Do you speak Spanish?", a: "Yes. JR One is a fully bilingual company, English and Spanish. We communicate in whichever language you're most comfortable with, from the first call through final walkthrough. All our insurance documents and resources are available in both languages." },
          { q: "Do you offer free estimates?", a: "Yes. We provide free on-site assessments for all services. We'll inspect your home, discuss your needs, and provide a detailed, transparent estimate with no obligation and no pressure. You can also use our online Aerial Estimator tool to measure your roof from satellite imagery and get an instant price range before we even visit." },
          { q: "What makes JR One different from other contractors?", a: "Three things: (1) We only do aluminum exteriors, gutters, soffit, fascia, siding, guards, drainage. No roofing, no painting, no general contracting. We're a specialty trade, not generalists. (2) All in-house crews, no subcontractors, ever. (3) Family-owned and family-operated, with over 30 years of experience in the Tampa Bay gutter industry across two generations. We've installed on some of the same homes twice." },
          { q: "What is the Gold Standard process?", a: "Every JR One project follows four steps: Assess (inspect your home and identify the real problem), Design (custom solution with transparent pricing), Install (our trained crew does the work, no shortcuts), and Protect (final walkthrough, documentation, and warranty). This process applies to every service, every home, no exceptions." },
          { q: "Are you licensed and insured?", a: "Yes. JR One Aluminum LLC is fully insured in the state of Florida. We carry general liability insurance and workers' compensation coverage. We're a specialty trade contractor, no CBC or CGC needed because we're not pulling structural permits. We're happy to provide proof of insurance to any homeowner or property manager who requests it." },
        ],
      },
      {
        key: "gutters", name: "Gutters", faqs: [
          { q: "What gutter sizes do you install?", a: "We install 6\" and 7\" seamless aluminum gutters. 6\" handles most residential applications with excellent water capacity. 7\" is our high-capacity option for larger roof areas, steeper pitches, and commercial buildings. We assess your roof and recommend the right size. We don't default to undersized gutters to save a few dollars." },
          { q: "How much do new gutters cost in Tampa?", a: "Seamless aluminum gutter installation from JR One Aluminum in Tampa, FL is quoted per job rather than at a flat rate. Price is driven by gutter size (6\" or 7\"), linear footage, roof height and ladder access, one-story versus two-story, roofline complexity and number of corners, and downspout configuration. We provide detailed, line-item estimates so you see exactly what you're paying for. Use our Aerial Estimator at jronegutters.com/estimator for an instant ballpark range on your own Tampa home, or call (844) 444-3114." },
          { q: "What are seamless gutters and why do they matter?", a: "Seamless gutters are custom-formed on-site from a single continuous piece of aluminum. No seams, no joints, no splice points along the run. Traditional sectional gutters have joints every 10 feet that eventually leak. Seamless gutters eliminate those failure points, which means fewer leaks, less maintenance, and a cleaner look on your home." },
          { q: "How long do seamless gutters last?", a: "With proper maintenance, quality seamless aluminum gutters last 20 to 30 years in Florida's climate. The aluminum itself doesn't rust or rot. What shortens gutter life is neglect: clogged downspouts, standing water, and debris buildup that causes corrosion. That's why we recommend maintenance plans and gutter guards." },
          { q: "How long does gutter installation take?", a: "Most residential gutter installations are completed in a single day. Homes with complex rooflines, multiple stories, or combined projects (gutters plus soffit, fascia, and guards) may take 2 to 3 days. We give you a timeline before we start and stick to it." },
          { q: "What downspout options do you offer?", a: "We install standard rectangular, smooth rectangular, round (two sizes), 4 by 5 commercial, box commercial downspouts, and decorative rain chains. Downspout size and placement are calculated based on your gutter size and roof square footage to ensure proper water handling, not just aesthetics." },
          { q: "Do you offer copper gutters?", a: "Yes. We install premium copper half-round and K-style gutter systems with matching copper downspouts, leader heads, and rain chains. Copper lasts 50+ years and does not need painting or sealing, because the patina is its own protective layer. That patina is not optional: copper goes from bright metal to brown to green over the first 10 to 20 years, and that color change is part of the product. Copper still needs the same periodic cleaning any gutter does. It's the longest-lasting system we install, for homeowners who want the best." },
          { q: "Why hire a gutter specialty trade instead of my roofer?", a: "Roofing companies typically subcontract gutter work to the lowest bidder. The result is often incorrect pitch, thin-gauge material, and poor corner work that leads to leaks within a few years. We focus on aluminum systems. Every installation is performed by our trained in-house crew using commercial-grade materials." },
          { q: "My gutters are overflowing during heavy rain. What's wrong?", a: "Three common causes: (1) Gutters are clogged with debris, needs cleaning. (2) Gutters are undersized for your roof area, common when builders install undersized gutters on homes that need 6\" or 7\". (3) Gutters are improperly pitched, water pools instead of flowing to the downspouts. We diagnose the exact cause during a free inspection." },
          { q: "Do you handle gutter repair or only full replacement?", a: "Both. We repair sagging sections, fix leaking seams and corners, replace damaged downspouts, re-pitch gutters for proper drainage, and re-secure hangers. If repair makes sense, we'll tell you. If your system is beyond repair, we'll be honest about that too." },
        ],
      },
      {
        key: "guards", name: "Gutter Guards", faqs: [
          { q: "Do gutter guards really work?", a: "Yes. Guards are highly effective at keeping debris out of your gutters and preventing clogs in downspouts and drainage. They don't eliminate all maintenance, but they dramatically reduce cleaning frequency from 2 to 4 times per year down to once per year or less. The real value is preventing the damage that clogged gutters cause: foundation erosion, fascia rot, landscape damage, and pest problems." },
          { q: "What types of gutter guards do you install?", a: "Two: a standard aluminum gutter guard, and a micromesh gutter guard. The micromesh costs more because its finer mesh stops even pine needles, and that mesh fineness is the only difference between the two. We recommend the right tier based on your tree coverage and debris type." },
          { q: "Do I still need to clean my gutters after guards are installed?", a: "Yes, but much less often. Guards keep debris from getting inside your gutters. That's where the real damage happens. Surface buildup on top of guards still needs occasional clearing, typically once a year. Compare that to cleaning unprotected gutters 2 to 4 times per year. We offer maintenance programs to handle this for you." },
          { q: "What's the best gutter guard for pine needles?", a: "The micromesh guard. The standard aluminum guard has openings large enough for needles to pass through and accumulate inside. The finer micromesh stops them while still allowing full water flow. If you have pine trees, oak trees, or palm fronds, micromesh is what we recommend." },
          { q: "Can guards be installed on my existing gutters?", a: "Yes. We retrofit guards onto existing gutter systems. You don't need new gutters to get guard protection. We inspect your existing gutters first to make sure they're in good condition, properly pitched, and securely attached. If repairs are needed, we handle those before installing guards." },
          { q: "What's the difference between your guards and LeafFilter or other national brands?", a: "National companies like LeafFilter use high-pressure sales, charge premium prices (often 2 to 3 times local rates), and subcontract installation to whoever's available. We're the local team. You deal directly with us, get honest pricing without franchise markup, and our own crew does both consultation and installation. No salespeople in your living room for two hours." },
          { q: "Will gutter guards void my gutter warranty?", a: "No. Our guard installations are designed to work with your existing gutter system without modifying or damaging the gutters themselves. If we installed your gutters, the workmanship warranty remains fully intact." },
          { q: "How long do gutter guards last?", a: "Both the aluminum and the micromesh guard last 15 to 20+ years. They're exposed to the same weather as your gutters but don't carry water weight or debris buildup, so they typically outlast the gutters themselves. We use commercial-grade materials, not the thin stuff you find at home improvement stores." },
        ],
      },
      {
        key: "soffit", name: "Soffit & Fascia", faqs: [
          { q: "What's the difference between soffit and fascia?", a: "Soffit is the horizontal panel underneath your roof overhang. It seals the gap between the roofline and the exterior wall. Fascia is the vertical board along the edge of your roofline where gutters attach. Together they protect the edges of your roof structure from water, pests, and weather. When either fails, moisture gets into your attic and roof framing." },
          { q: "Should I choose aluminum or vinyl soffit?", a: "For Florida, we strongly recommend aluminum. It's more durable in extreme heat (vinyl can warp above 120F, common in direct Florida sun), handles impact better during storms, doesn't fade as quickly, and lasts significantly longer. Vinyl is a budget option that works for some situations, but aluminum is the better long-term investment in our climate." },
          { q: "Do you repair the wood underneath before installing new soffit?", a: "Yes. And this is the most critical step most contractors skip. We pull back the existing soffit and inspect every inch of wood substrate. Rotted, water-damaged, or termite-compromised wood gets replaced before any new material goes on. Wrapping new aluminum over rotten wood is like putting a bandaid on a broken bone. It looks fine but the problem gets worse underneath." },
          { q: "How do I know if my soffit or fascia needs replacing?", a: "Warning signs: paint peeling or bubbling, visible water staining, sagging or warped panels, holes or cracks, soft spots when you push on the material, pest activity near your roofline (wasps, squirrels, birds getting in), detached pieces after storms, or visible daylight from inside your attic. If your home is 15+ years old with original wood soffit, it's worth a free inspection." },
          { q: "How long does soffit and fascia installation take?", a: "Most residential soffit and fascia jobs take 1 to 3 days depending on the size of your home, the extent of wood repair needed, and accessibility. We give you a timeline before we start. If we discover hidden damage during installation, we'll communicate immediately and adjust. No surprises on the invoice." },
          { q: "What colors and styles are available?", a: "We offer a full range of aluminum soffit colors and styles including solid, vented, and beaded profiles. Fascia wrap is custom-bent on-site to match your exact trim dimensions. Color options include white, almond, brown, black, and custom-matched colors. We bring samples to your consultation so you can see options against your home." },
          { q: "Can you replace just the fascia without replacing the soffit?", a: "Yes. We can replace fascia independently if your soffit is in good condition. However, we always inspect both during our assessment because they work as a system. Replacing fascia while ignoring damaged soffit just moves the failure point. We'll give you an honest recommendation on what actually needs attention." },
          { q: "Does new soffit improve my home's ventilation?", a: "Yes. Vented soffit panels allow air to flow into your attic space, which is critical in Florida. Proper attic ventilation reduces heat buildup (which shortens shingle life), prevents moisture condensation (which causes mold and wood rot), and lowers your cooling costs. If your existing soffit is solid with no vents, upgrading to vented panels is one of the best investments you can make." },
        ],
      },
      {
        key: "peak", name: "Peak 301 & Insurance", faqs: [
          { q: "What is Peak 301?", a: "Peak 301 is an all-natural, soy-based roof rejuvenation sealant manufactured by Colorbiotics (a Sika company). It penetrates into your shingle material and restores the oils that UV exposure and heat have depleted over time. It is not a coating, paint, or spray. It works from the inside of the shingle out, restoring flexibility, water resistance, and structural integrity at the molecular level." },
          { q: "How much does Peak 301 cost compared to roof replacement?", a: "For most Tampa Bay homes, Peak 301 shingle rejuvenation from JR One Aluminum runs around 60 to 75% less than a full roof replacement, which runs $15,000 to $25,000 or more in this market. Price is driven by roof size in squares, shingle type, shingle condition, roof pitch, and access. We give you exact pricing only after inspecting your specific roof. The treatment is a one-day application by our crew, warranty documentation, and coordination with an inspector for your Remaining Useful Life (RUL) certification. For a number on your own Tampa Bay home, book a free roof assessment at jronegutters.com/peak-301 or call (844) 444-3114." },
          { q: "Will Peak 301 help with my homeowner's insurance?", a: "It can help. Florida insurers have increased policy non-renewals by 280% since 2018, primarily targeting roofs over 15 years old. Peak 301 comes with warranty documentation that, combined with a Remaining Useful Life (RUL) certification from an authorized inspector, gives you documentation of your roof's condition that Florida law directs carriers to consider for roofs over 15 years. Coverage decisions rest with your insurer; confirm your situation with your agent." },
          { q: "Is my roof a good candidate for Peak 301?", a: "Most asphalt shingle roofs between 8 and 20 years old are good candidates. Your roof should be structurally sound with no active leaks, no major missing sections, and no severe curling or warping. We inspect every roof honestly before recommending treatment. Not every roof qualifies, and we'd rather tell you the truth than sell a treatment that won't deliver." },
          { q: "Is Peak 301 the same as a roof coating?", a: "No, and this distinction matters. Peak 301 is a penetrating sealant that soaks into your shingles and restores depleted oils from the inside out. Roof coatings create a surface film on top of shingles, which ARMA (the Asphalt Roofing Manufacturers Association) warns against for asphalt shingle roofs. Rejuvenation and coating are two entirely different products." },
          { q: "How long does the treatment last?", a: "Peak 301 adds 6 to 10 years of life to your existing roof, backed by a written product warranty (current terms confirmed at your free assessment). The exact duration depends on your roof's current condition, age, and shingle type, which we assess before recommending treatment." },
          { q: "What is a Remaining Useful Life (RUL) certification?", a: "An RUL certification is a professional inspection report from a licensed authorized inspector stating that your roof has at least 5 years of remaining useful life. Florida law limits roof-age-only non-renewal in some cases when you provide a valid RUL certification; confirm your situation with your agent or an attorney. Peak 301 treatment supports this certification by restoring your shingles to a condition that demonstrates viable remaining life." },
          { q: "What Florida laws protect my roof insurance rights?", a: "Several key laws: Senate Bill 2D (2022) prevents insurers from dropping you solely due to roof age if you have a valid RUL certification. House Bill 1611 (2024) expanded the pool of authorized inspectors to include licensed roofing contractors. Senate Bill 808 and House Bill 815 (both effective July 2026) further expand protections to all property insurance policies and require insurers to base decisions on roof condition, not age. Visit our Insurance Resource Center for the full breakdown." },
          { q: "What should I do if I get a non-renewal notice from my insurer?", a: "Don't panic. Step 1: Request the reason for non-renewal in writing. Step 2: If it's roof age, exercise your right to an inspection under Florida law. Step 3: Get a certified RUL inspection from an authorized inspector. Step 4: Submit the RUL certification with your renewal request. Step 5: If they still refuse, file a complaint with the Florida Office of Insurance Regulation (FLOIR). We walk you through this entire process and provide free document templates at jronegutters.com/insurance-resource-center." },
          { q: "Is Peak 301 safe for my home and landscaping?", a: "The formula is soy-based, non-toxic, and biodegradable, with no harsh chemicals and no toxic fumes. We still take normal precautions on every job: we walk your landscaping before we start, cover what needs covering, and ask that pets and kids stay inside while the crew is applying. If you have anything sensitive close to the wall, tell us at the estimate and we plan around it." },
        ],
      },
      {
        key: "siding", name: "Siding & SAGIPER", faqs: [
          { q: "What types of siding do you install?", a: "We install vinyl siding, aluminum siding, and SAGIPER architectural cladding. Each has different applications. Vinyl and aluminum for standard residential siding, SAGIPER for architectural design where aesthetics, durability, and heat performance are critical." },
          { q: "What is SAGIPER and why is it different?", a: "SAGIPER is a PVC architectural cladding system from Europe built with Solar Shield Technology, a heat-reflective layer engineered specifically for dark colors in high-UV climates. Standard vinyl siding is generally limited to light colors in Florida because dark vinyl absorbs more heat and can distort. SAGIPER is built to hold dark colors in that same sun, and it comes in modern, design-forward profiles you can't get with standard siding." },
          { q: "Can I use dark-colored siding in Florida?", a: "With standard vinyl siding, we don't recommend it. Dark colors absorb more heat and can warp, buckle, or distort in Florida's sun. SAGIPER's Solar Shield Technology is engineered specifically for dark colors in high-heat climates, which is why it's the system we specify when a homeowner or architect wants a dark exterior here." },
          { q: "How long does siding installation take?", a: "Timeline depends on home size and scope. A standard single-story home typically takes 3 to 5 days. Larger homes, multi-story work, or projects involving substrate repair may take longer. We provide a specific timeline during your consultation." },
          { q: "Do you repair or replace the wall sheathing underneath?", a: "Yes. Like our soffit work, we inspect the substrate before covering it. If there's moisture damage, rot, or compromised sheathing, we repair it first. Covering bad substrate with new siding creates hidden problems that get worse over time." },
        ],
      },
      {
        key: "warranty", name: "Warranty & Financing", faqs: [
          { q: "What warranty do you offer?", a: "We provide a 3-year workmanship warranty from the date of substantial completion. This covers defects in our labor that materially affect system performance under normal residential use. If our work fails because of how we installed it, we come back and fix it at no cost. Product warranties from manufacturers (for gutters, guards, siding, Peak 301, etc.) are separate and vary by product." },
          { q: "Do you offer financing?", a: "Yes. We partner with third-party financing providers so you can protect your home now and pay over time. Quick approval process, flexible terms, and your project pricing stays the same whether you finance or pay in full. Apply through our website or ask about financing during your consultation." },
          { q: "Do I need good credit to qualify for financing?", a: "Our financing partners work with a range of credit profiles. The initial check is typically a soft pull that doesn't affect your credit score. Approval amounts and terms depend on your specific situation. We encourage everyone to apply. You might be surprised." },
          { q: "How do I make a warranty claim?", a: "Call (844) 444-3114 or email info@jronegutters.com. Describe the issue, and we'll schedule an inspection. We don't make warranty claims difficult. We'd rather fix a problem fast than argue about paperwork. If it's our workmanship, we fix it. Period." },
          { q: "Does your warranty cover storm damage?", a: "Our workmanship warranty covers defects in how we installed your system. Storm damage (hurricane, tornado, hail) is covered by your homeowner's insurance, not our warranty. However, if our installation failed in a way that contributed to the damage, for example, hangers that came loose because they were improperly secured, that's on us and we'll make it right." },
          { q: "What's the referral program?", a: "We pay $80 gift cards for qualifying referrals. The referred customer gets 10% off their next service. The qualifying project minimum is $880. All services qualify, and the program is open to everyone. Homeowners, insurance agents, roofers, real estate agents, property managers, anyone. No limit on referrals." },
        ],
      },
      {
        key: "maintenance", name: "Maintenance", faqs: [
          { q: "How often should I have my gutters cleaned?", a: "In Tampa Bay, at least twice per year. Once before hurricane season (May or June) and once after fall leaf drop (November or December). Homes near oak trees, pine trees, or palm trees may need quarterly cleaning. Neglected gutters cause fascia rot, foundation erosion, landscape damage, and pest infestations. Regular cleaning is the cheapest way to prevent expensive repairs." },
          { q: "What's included in your maintenance plans?", a: "We offer three tiers: Basic (blow out gutters, downspouts, and roof line), Premium (everything in Basic plus water wash, flush, full downspout clearing, and miter sealing), and Deluxe (everything in Premium plus full realignment, re-securing of hangers, re-pitching for drainage, and new leaf guard installation). Plans are annual with scheduled visits so you never have to remember to call." },
          { q: "Do you service gutters you didn't install?", a: "Yes. Our maintenance services are available for any gutter system regardless of who installed it. We'll assess the condition of your system during service and let you know if anything needs attention. There's never pressure to replace or upgrade." },
          { q: "What happens if you find damage during a maintenance visit?", a: "We document everything with photos and communicate immediately. Minor issues (loose hangers, small seal failures) we can often fix on the spot during the service visit. Larger issues (rotted fascia, structural problems, failed sections) we'll provide a separate estimate. You're never obligated. We just want you to know what's going on with your home." },
          { q: "Can I combine gutter cleaning with other services?", a: "Yes. Many homeowners combine gutter cleaning with soffit inspection, guard maintenance, downspout extension checks, and drainage system flushing. Bundling services into one visit saves you time and often costs less than scheduling separately." },
          { q: "Do you offer drainage maintenance?", a: "Yes. If you have underground PVC, catch basins, surface grates, or pop-up emitters, we can inspect and flush those systems during maintenance visits. Drainage systems accumulate sediment over time and need periodic clearing to maintain flow. A clogged drain is worse than no drain at all because it traps water against your foundation." },
        ],
      },
    ],
  },
  es: {
    heroTag: "PREGUNTAS FRECUENTES",
    heroH1a: "Preguntas",
    heroH1b: "Frecuentes",
    heroP: "Todo lo que los propietarios nos preguntan, respondido honestamente. No encuentras tu pregunta? Llama al (844) 444-3114 y te la respondemos directamente.",
    stillTitle: "Todavía Tienes Preguntas?",
    stillP: "Preferimos responder tu pregunta directamente a que adivines. Llámanos o escríbenos. Respondemos rápido.",
    callBtn: "(844) 444-3114",
    emailBtn: "Envíanos un Correo",
    categories: [
      {
        key: "general", name: "General", faqs: [
          { q: "Qué servicios ofrece JR One?", a: "Hacemos canaletas de aluminio sin costura (6\" y 7\"), canaletas de cobre, protectores de canaletas (aluminio estándar y micromalla), instalación de sofito y fascia, revestimiento, revestimiento arquitectónico SAGIPER, reparación de canaletas, rejuvenecimiento de techo Peak 301, instalación de luces inteligentes Govee, instalación de drenaje (PVC subterráneo, cajas de captación, rejillas de superficie, emisores emergentes) y planes de mantenimiento. Somos un oficio especializado de exteriores de aluminio. Es todo lo que hacemos, y lo hacemos bien." },
          { q: "Qué áreas atienden?", a: "Servimos a 21 ciudades en Tampa Bay y la costa oeste de Florida: Bradenton, Brandon, Clearwater, Dunedin, Lakeland, Land O' Lakes, Largo, Lutz, New Port Richey, Palm Harbor, Plant City, Riverview, Ruskin, Sarasota, Spring Hill, St. Petersburg, Sun City Center, Tampa, Tarpon Springs, Temple Terrace y Wesley Chapel. Si estás a una hora de Tampa, llámanos. Probablemente cubrimos tu área." },
          { q: "Usan subcontratistas?", a: "Jamás. Cada persona en tu propiedad es un miembro capacitado y de tiempo completo de la cuadrilla de JR One. Operamos tres cuadrillas internas. Así mantenemos el control de calidad y la responsabilidad en cada trabajo. Muchas de las quejas que los propietarios tienen sobre otros contratistas vienen del trabajo subcontratado. Nosotros eliminamos ese problema por completo." },
          { q: "Cuánto tiempo lleva JR One en el negocio?", a: "JR One Aluminum LLC es propiedad de Christopher Rivera y él la dirige. Más de 30 años en la industria de canaletas de Tampa Bay, empresa familiar, a través de dos generaciones. El padre de Christopher, Javier Rivera, comenzó a instalar canaletas en Tampa después de inmigrar de Honduras, y Christopher creció en el oficio detrás de él. Muchas de las empresas de canaletas y sofitos que operan hoy en el mercado de Tampa pueden rastrear su conocimiento hasta Javier. Personas que trabajaron para él, con él, o aprendieron a su lado." },
          { q: "Hablan español?", a: "Sí. JR One es una empresa completamente bilingüe, inglés y español. Nos comunicamos en el idioma que te resulte más cómodo desde la primera llamada hasta la inspección final. Todos nuestros documentos de seguros y recursos están disponibles en ambos idiomas." },
          { q: "Ofrecen estimados gratis?", a: "Sí. Proporcionamos evaluaciones gratuitas en sitio para todos los servicios. Inspeccionaremos tu hogar, discutiremos tus necesidades y proporcionaremos un estimado detallado y transparente sin obligación y sin presión. También puedes usar nuestra herramienta de Estimador Aéreo en línea para medir tu techo desde imágenes satelitales y obtener un rango de precios instantáneo antes de que visitemos." },
          { q: "Qué hace diferente a JR One de otros contratistas?", a: "Tres cosas: (1) Solo hacemos exteriores de aluminio: canaletas, sofito, fascia, revestimiento, protectores, drenaje. Sin techado, sin pintura, sin contratación general. Somos un oficio especializado, no generalistas. (2) Todas las cuadrillas son internas, sin subcontratistas, jamás. (3) Empresa familiar, operada por la familia, con más de 30 años de experiencia en la industria de canaletas de Tampa Bay a través de dos generaciones. Hemos instalado en algunas de las mismas casas dos veces." },
          { q: "Qué es el proceso del Estándar de Oro?", a: "Cada proyecto de JR One sigue cuatro pasos: Evaluar (inspeccionar tu hogar e identificar el problema real), Diseñar (solución personalizada con precios transparentes), Instalar (nuestra cuadrilla capacitada hace el trabajo, sin atajos) y Proteger (inspección final, documentación y garantía). Este proceso aplica a cada servicio, cada hogar, sin excepciones." },
          { q: "Están licenciados y asegurados?", a: "Sí. JR One Aluminum LLC está completamente asegurada en el estado de Florida. Tenemos seguro de responsabilidad general y cobertura de compensación para trabajadores. Somos un oficio especializado, sin necesidad de CBC o CGC porque no sacamos permisos estructurales. Con gusto proporcionamos prueba de seguro a cualquier propietario o administrador de propiedades que lo solicite." },
        ],
      },
      {
        key: "gutters", name: "Canaletas", faqs: [
          { q: "Qué tamaños de canaletas instalan?", a: "Instalamos canaletas de aluminio sin costura de 6\" y 7\". Las de 6\" manejan la mayoría de las aplicaciones residenciales con excelente capacidad de agua. Las de 7\" son nuestra opción de alta capacidad para áreas de techo más grandes, pendientes más pronunciadas y edificios comerciales. Evaluamos tu techo y recomendamos el tamaño correcto. No usamos canaletas más pequeñas para ahorrar unos dólares." },
          { q: "Cuánto cuestan las canaletas nuevas en Tampa?", a: "La instalación de canaletas de aluminio sin costura de JR One Aluminum en Tampa, FL se cotiza por trabajo, no a tarifa fija. El precio depende del tamaño de la canaleta (6\" o 7\"), pies lineales, altura del techo y acceso con escalera, si la casa es de uno o dos pisos, la complejidad de la línea de techo y número de esquinas, y la configuración de bajantes. Proporcionamos estimados detallados con cada item desglosado para que veas exactamente lo que estás pagando. Usa nuestro Estimador Aéreo en jronegutters.com/estimator para un rango de precios de tu propia casa en Tampa, o llama al (844) 444-3114." },
          { q: "Qué son las canaletas sin costura y por qué importan?", a: "Las canaletas sin costura se fabrican en sitio a partir de una sola pieza continua de aluminio. Sin costuras, sin juntas, sin puntos de empalme a lo largo del recorrido. Las canaletas seccionales tradicionales tienen juntas cada 10 pies que eventualmente gotean. Las canaletas sin costura eliminan esos puntos de falla, lo que significa menos fugas, menos mantenimiento y una apariencia más limpia en tu hogar." },
          { q: "Cuánto duran las canaletas sin costura?", a: "Con mantenimiento adecuado, las canaletas de aluminio sin costura de calidad duran 20 a 30 años en el clima de Florida. El aluminio en sí no se oxida ni se pudre. Lo que acorta la vida de las canaletas es el descuido: bajantes tapados, agua estancada y acumulación de escombros que causa corrosión. Por eso recomendamos planes de mantenimiento y protectores de canaletas." },
          { q: "Cuánto tiempo toma la instalación de canaletas?", a: "La mayoría de las instalaciones residenciales de canaletas se completan en un solo día. Hogares con líneas de techo complejas, múltiples pisos o proyectos combinados (canaletas más sofito, fascia y protectores) pueden tomar 2 a 3 días. Te damos un cronograma antes de empezar y lo cumplimos." },
          { q: "Qué opciones de bajantes ofrecen?", a: "Instalamos bajantes rectangulares estándar, rectangulares lisos, redondos (dos tamaños), comerciales 4 por 5, comerciales tipo caja y cadenas de lluvia decorativas. El tamaño y ubicación de los bajantes se calculan según el tamaño de tu canaleta y los pies cuadrados de tu techo para asegurar el manejo adecuado del agua, no solo la estética." },
          { q: "Ofrecen canaletas de cobre?", a: "Sí. Instalamos sistemas de canaletas de cobre de media caña y estilo K con bajantes de cobre, cabezales y cadenas de lluvia a juego. El cobre dura más de 50 años y no necesita pintura ni sellado, porque la pátina es su propia capa protectora. Esa pátina no es opcional: el cobre pasa de metal brillante a café y luego a verde durante los primeros 10 a 20 años, y ese cambio de color es parte del producto. El cobre sí necesita la misma limpieza periódica que cualquier canaleta. Es el sistema de mayor duración que instalamos, para propietarios que quieren lo mejor." },
          { q: "Por qué contratar un oficio especializado en canaletas en vez de mi techador?", a: "Las empresas de techado típicamente subcontratan el trabajo de canaletas al postor más bajo. El resultado a menudo es una inclinación incorrecta, material de calibre delgado y trabajo de esquinas deficiente que lleva a fugas en pocos años. Nos enfocamos en sistemas de aluminio. Cada instalación es realizada por nuestra cuadrilla interna capacitada usando materiales de grado comercial." },
          { q: "Mis canaletas se desbordan durante lluvias fuertes. Qué está mal?", a: "Tres causas comunes: (1) Las canaletas están tapadas con escombros, necesitan limpieza. (2) Las canaletas son muy pequeñas para el área de tu techo, común cuando los constructores instalan canaletas subdimensionadas en hogares que necesitan 6\" o 7\". (3) Las canaletas tienen inclinación incorrecta, el agua se acumula en vez de fluir hacia los bajantes. Diagnosticamos la causa exacta durante una inspección gratuita." },
          { q: "Hacen reparación de canaletas o solo reemplazo completo?", a: "Ambos. Reparamos secciones que se hunden, arreglamos costuras y esquinas con fugas, reemplazamos bajantes dañados, re-inclinamos canaletas para drenaje adecuado y re-aseguramos ganchos. Si la reparación tiene sentido, te lo diremos. Si tu sistema está más allá de la reparación, seremos honestos al respecto." },
        ],
      },
      {
        key: "guards", name: "Protectores de Canaletas", faqs: [
          { q: "Realmente funcionan los protectores de canaletas?", a: "Sí. Los protectores son altamente efectivos para mantener los escombros fuera de tus canaletas y prevenir obstrucciones en bajantes y drenaje. No eliminan todo el mantenimiento, pero reducen dramáticamente la frecuencia de limpieza de 2 a 4 veces al año a una vez al año o menos. El valor real es prevenir el daño que causan las canaletas tapadas: erosión de cimientos, pudrición de fascia, daño al paisajismo y problemas de plagas." },
          { q: "Qué tipos de protectores de canaletas instalan?", a: "Dos: un protector estándar de aluminio y un protector de micromalla. La micromalla cuesta más porque su malla más fina detiene hasta las agujas de pino, y esa finura de la malla es lo único que las diferencia. Recomendamos el nivel correcto según tu cobertura de árboles y tipo de escombros." },
          { q: "Todavía necesito limpiar mis canaletas después de instalar protectores?", a: "Sí, pero mucho menos seguido. Los protectores evitan que los escombros entren dentro de tus canaletas. Ahí es donde ocurre el daño real. La acumulación superficial encima de los protectores aún necesita limpieza ocasional, típicamente una vez al año. Compara eso con limpiar canaletas sin protección 2 a 4 veces al año. Ofrecemos programas de mantenimiento para encargarnos de esto por ti." },
          { q: "Cuál es el mejor protector de canaletas para agujas de pino?", a: "El protector de micromalla. El protector estándar de aluminio tiene aberturas lo bastante grandes para que las agujas pasen y se acumulen adentro. La micromalla, al ser más fina, las detiene y deja pasar el agua sin problema. Si tienes pinos, robles o palmeras, la micromalla es lo que recomendamos." },
          { q: "Se pueden instalar protectores en mis canaletas existentes?", a: "Sí. Instalamos protectores en sistemas de canaletas existentes. No necesitas canaletas nuevas para obtener protección. Inspeccionamos tus canaletas existentes primero para asegurarnos de que estén en buena condición, correctamente inclinadas y bien aseguradas. Si se necesitan reparaciones, las manejamos antes de instalar los protectores." },
          { q: "Cuál es la diferencia entre sus protectores y LeafFilter u otras marcas nacionales?", a: "Las empresas nacionales como LeafFilter usan ventas de alta presión, cobran precios altos (a menudo 2 a 3 veces las tarifas locales) y subcontratan la instalación a quien esté disponible. Nosotros somos el equipo local. Tratas directamente con nosotros, obtienes precios honestos sin margen de franquicia, y nuestra propia cuadrilla hace tanto la consulta como la instalación. Sin vendedores en tu sala por dos horas." },
          { q: "Los protectores de canaletas anulan la garantía de mis canaletas?", a: "No. Nuestras instalaciones de protectores están diseñadas para funcionar con tu sistema de canaletas existente sin modificar ni dañar las canaletas. Si nosotros instalamos tus canaletas, la garantía de mano de obra permanece completamente intacta." },
          { q: "Cuánto duran los protectores de canaletas?", a: "Tanto el protector de aluminio como el de micromalla duran 15 a 20+ años. Están expuestos al mismo clima que tus canaletas pero no cargan peso de agua ni acumulación de escombros, así que típicamente duran más que las canaletas mismas. Usamos materiales de grado comercial, no las cosas delgadas que encuentras en las tiendas de mejoras para el hogar." },
        ],
      },
      {
        key: "soffit", name: "Sofito y Fascia", faqs: [
          { q: "Cuál es la diferencia entre sofito y fascia?", a: "El sofito es el panel horizontal debajo del voladizo de tu techo. Sella el espacio entre la línea del techo y la pared exterior. La fascia es la tabla vertical a lo largo del borde de tu línea de techo donde se fijan las canaletas. Juntos protegen los bordes de la estructura de tu techo contra agua, plagas y clima. Cuando cualquiera falla, la humedad entra en tu ático y la estructura del techo." },
          { q: "Debería elegir sofito de aluminio o vinilo?", a: "Para Florida, recomendamos firmemente el aluminio. Es más duradero en calor extremo (el vinilo puede deformarse por encima de 120F, común bajo el sol directo de Florida), resiste mejor los impactos durante tormentas, no se descolora tan rápido y dura significativamente más. El vinilo es una opción económica que funciona para algunas situaciones, pero el aluminio es la mejor inversión a largo plazo en nuestro clima." },
          { q: "Reparan la madera debajo antes de instalar sofito nuevo?", a: "Sí. Y este es el paso más crítico que la mayoría de los contratistas se saltan. Retiramos el sofito existente e inspeccionamos cada centímetro del sustrato de madera. La madera podrida, dañada por agua o comprometida por termitas se reemplaza antes de que se ponga cualquier material nuevo. Cubrir madera podrida con aluminio nuevo es como poner una curita en un hueso roto. Se ve bien pero el problema empeora por debajo." },
          { q: "Cómo sé si mi sofito o fascia necesita reemplazo?", a: "Señales de alerta: pintura descascarándose o burbujeándose, manchas de agua visibles, paneles hundidos o deformados, agujeros o grietas, puntos blandos cuando presionas el material, actividad de plagas cerca de la línea del techo (avispas, ardillas, pájaros entran), piezas desprendidas después de tormentas, o luz del día visible desde dentro del ático. Si tu hogar tiene 15+ años con sofito original de madera, vale la pena una inspección gratuita." },
          { q: "Cuánto tiempo toma la instalación de sofito y fascia?", a: "La mayoría de los trabajos residenciales de sofito y fascia toman 1 a 3 días dependiendo del tamaño de tu hogar, la extensión de la reparación de madera necesaria y la accesibilidad. Te damos un cronograma antes de empezar. Si descubrimos daños ocultos durante la instalación, nos comunicamos inmediatamente y ajustamos. Sin sorpresas en la factura." },
          { q: "Qué colores y estilos están disponibles?", a: "Ofrecemos una gama completa de colores y estilos de sofito de aluminio incluyendo perfiles sólidos, ventilados y con moldura. La envoltura de fascia se dobla a medida en sitio para coincidir con las dimensiones exactas de tu moldura. Las opciones de color incluyen blanco, almendra, marrón, negro y colores personalizados. Llevamos muestras a tu consulta para que puedas ver las opciones contra tu hogar." },
          { q: "Pueden reemplazar solo la fascia sin reemplazar el sofito?", a: "Sí. Podemos reemplazar la fascia independientemente si tu sofito está en buena condición. Sin embargo, siempre inspeccionamos ambos durante nuestra evaluación porque funcionan como un sistema. Reemplazar la fascia mientras se ignora el sofito dañado solo mueve el punto de falla. Te daremos una recomendación honesta sobre lo que realmente necesita atención." },
          { q: "El sofito nuevo mejora la ventilación de mi hogar?", a: "Sí. Los paneles de sofito ventilado permiten que el aire fluya hacia el espacio del ático, lo cual es crítico en Florida. La ventilación adecuada del ático reduce la acumulación de calor (que acorta la vida de las tejas), previene la condensación de humedad (que causa moho y pudrición de madera) y reduce tus costos de enfriamiento. Si tu sofito existente es sólido sin ventilaciones, actualizar a paneles ventilados es una de las mejores inversiones que puedes hacer." },
        ],
      },
      {
        key: "peak", name: "Peak 301 y Seguros", faqs: [
          { q: "Qué es Peak 301?", a: "Peak 301 es un sellador de rejuvenecimiento de techo totalmente natural a base de soya fabricado por Colorbiotics (una empresa de Sika). Penetra en el material de tus tejas y restaura los aceites que la exposición UV y el calor han agotado con el tiempo. No es un recubrimiento, pintura ni spray. Trabaja desde el interior de la teja hacia afuera, restaurando flexibilidad, resistencia al agua e integridad estructural a nivel molecular." },
          { q: "Cuánto cuesta Peak 301 comparado con el reemplazo del techo?", a: "Para la mayoría de los hogares de Tampa Bay, el rejuvenecimiento de tejas Peak 301 de JR One Aluminum cuesta alrededor de 60 a 75% menos que un reemplazo completo de techo, que en este mercado cuesta de $15,000 a $25,000 o más. El precio depende del tamaño del techo en cuadros, tipo de teja, condición de la teja, pendiente del techo y acceso. Le damos precios exactos solo después de inspeccionar su techo específico. El tratamiento es una aplicación de un solo día por nuestra cuadrilla, documentación de garantía y coordinación con un inspector para tu certificación de Vida Útil Remanente (RUL). Para un número de su propia casa en Tampa Bay, solicite una evaluación gratuita del techo en jronegutters.com/peak-301 o llame al (844) 444-3114." },
          { q: "Peak 301 me ayudará con mi seguro de hogar?", a: "Puede ayudar. Las aseguradoras de Florida han aumentado las no-renovaciones de pólizas en un 280% desde 2018, apuntando principalmente a techos de más de 15 años. Peak 301 viene con documentación de garantía que, combinada con una certificación de Vida Útil Remanente (RUL) de un inspector autorizado, le da documentación de la condición de su techo que la ley de Florida orienta a las aseguradoras a considerar para techos de más de 15 años. Las decisiones de cobertura recaen en su aseguradora; confirme su situación con su agente." },
          { q: "Mi techo es buen candidato para Peak 301?", a: "La mayoría de los techos de tejas asfálticas entre 8 y 20 años son buenos candidatos. Tu techo debe estar estructuralmente sólido sin fugas activas, sin secciones faltantes importantes y sin enrollamiento o deformación severa. Inspeccionamos cada techo honestamente antes de recomendar el tratamiento. No todos los techos califican, y preferimos decirte la verdad que vender un tratamiento que no dará resultados." },
          { q: "Peak 301 es lo mismo que un recubrimiento de techo?", a: "No, y esta distinción importa. Peak 301 es un sellador penetrante que se absorbe en tus tejas y restaura los aceites agotados desde adentro hacia afuera. Los recubrimientos de techo crean una película superficial encima de las tejas, contra lo cual ARMA (la Asociación de Fabricantes de Techos Asfálticos) advierte para techos de tejas asfálticas. Rejuvenecimiento y recubrimiento son dos productos completamente diferentes." },
          { q: "Cuánto dura el tratamiento?", a: "Peak 301 agrega 6 a 10 años de vida a tu techo existente, respaldado por una garantía de producto por escrito (términos vigentes confirmados en su evaluación gratuita). La duración exacta depende de la condición actual de tu techo, su edad y tipo de teja, lo cual evaluamos antes de recomendar el tratamiento." },
          { q: "Qué es una certificación de Vida Útil Remanente (RUL)?", a: "Una certificación RUL es un informe de inspección profesional de un inspector autorizado licenciado que declara que tu techo tiene al menos 5 años de vida útil remanente. La ley de Florida limita la no-renovación basada únicamente en la edad del techo en algunos casos cuando proporcionas una certificación RUL válida; confirma tu situación con tu agente o un abogado. El tratamiento Peak 301 respalda esta certificación al restaurar tus tejas a una condición que demuestra vida útil viable." },
          { q: "Qué leyes de Florida protegen mis derechos de seguro de techo?", a: "Varias leyes clave: El Proyecto de Ley del Senado 2D (2022) previene que las aseguradoras te cancelen únicamente por la edad del techo si tienes una certificación RUL válida. El Proyecto de Ley de la Cámara 1611 (2024) amplió el grupo de inspectores autorizados para incluir contratistas de techado licenciados. El Proyecto de Ley del Senado 808 y el Proyecto de Ley de la Cámara 815 (ambos efectivos en julio 2026) amplían aún más las protecciones a todas las pólizas de seguro de propiedad y requieren que las aseguradoras basen sus decisiones en la condición del techo, no en su edad. Visita nuestro Centro de Recursos de Seguros para el desglose completo." },
          { q: "Qué debo hacer si recibo un aviso de no-renovación de mi aseguradora?", a: "No entres en pánico. Paso 1: Solicita la razón de la no-renovación por escrito. Paso 2: Si es por la edad del techo, ejerce tu derecho a una inspección bajo la ley de Florida. Paso 3: Obtene una inspección RUL certificada de un inspector autorizado. Paso 4: Presenta la certificación RUL con tu solicitud de renovación. Paso 5: Si aún se niegan, presenta una queja ante la Oficina de Regulación de Seguros de Florida (FLOIR). Te guiamos por todo este proceso y proporcionamos plantillas de documentos gratuitas en jronegutters.com/insurance-resource-center." },
          { q: "Peak 301 es seguro para mi hogar y jardines?", a: "La fórmula es a base de soya, no tóxica y biodegradable, sin químicos agresivos ni humos tóxicos. Aun así tomamos las precauciones normales en cada trabajo: revisamos su jardín antes de empezar, cubrimos lo que haya que cubrir y pedimos que las mascotas y los niños se queden adentro mientras la cuadrilla aplica el producto. Si tiene algo delicado pegado a la pared, avísenos en el estimado y lo planeamos alrededor." },
        ],
      },
      {
        key: "siding", name: "Revestimiento y SAGIPER", faqs: [
          { q: "Qué tipos de revestimiento instalan?", a: "Instalamos revestimiento de vinilo, revestimiento de aluminio y revestimiento arquitectónico SAGIPER. Cada uno tiene diferentes aplicaciones. Vinilo y aluminio para revestimiento residencial estándar, SAGIPER para diseño arquitectónico donde la estética, durabilidad y rendimiento térmico son críticos." },
          { q: "Qué es SAGIPER y por que es diferente?", a: "SAGIPER es un sistema de revestimiento arquitectónico de PVC de Europa con tecnología Solar Shield, una capa reflectante de calor formulada específicamente para colores oscuros en climas de alta exposición solar. El revestimiento de vinilo estándar por lo general se limita a colores claros en Florida porque el vinilo oscuro absorbe más calor y se puede distorsionar. SAGIPER está hecho para sostener colores oscuros bajo ese mismo sol, y viene en perfiles modernos y de diseño avanzado que no consigue con revestimiento estándar." },
          { q: "Puedo usar revestimiento de color oscuro en Florida?", a: "Con revestimiento de vinilo estándar, no se lo recomendamos. Los colores oscuros absorben más calor y se pueden deformar, pandear o distorsionar bajo el sol de Florida. La tecnología Solar Shield de SAGIPER está diseñada específicamente para colores oscuros en climas de mucho calor, y por eso es el sistema que especificamos cuando un propietario o un arquitecto quiere un exterior oscuro aquí." },
          { q: "Cuánto tiempo toma la instalación de revestimiento?", a: "El cronograma depende del tamaño de la casa y el alcance. Una casa estándar de un piso típicamente toma 3 a 5 días. Casas más grandes, trabajo de varios pisos o proyectos que involucran reparación de sustrato pueden tomar más tiempo. Proporcionamos un cronograma específico durante tu consulta." },
          { q: "Reparan o reemplazan el revestimiento de pared debajo?", a: "Sí. Al igual que nuestro trabajo de sofito, inspeccionamos el sustrato antes de cubrirlo. Si hay daño por humedad, pudrición o revestimiento comprometido, lo reparamos primero. Cubrir un mal sustrato con revestimiento nuevo crea problemas ocultos que empeoran con el tiempo." },
        ],
      },
      {
        key: "warranty", name: "Garantía y Financiamiento", faqs: [
          { q: "Qué garantía ofrecen?", a: "Proporcionamos una garantía de mano de obra de 3 años desde la fecha de finalización sustancial. Esto cubre defectos en nuestra mano de obra que afectan materialmente el rendimiento del sistema bajo uso residencial normal. Si nuestro trabajo falla por cómo lo instalamos, regresamos y lo arreglamos sin costo. Las garantías de productos de los fabricantes (para canaletas, protectores, revestimiento, Peak 301, etc.) son separadas y varían según el producto." },
          { q: "Ofrecen financiamiento?", a: "Sí. Nos asociamos con proveedores de financiamiento terceros para que puedas proteger tu hogar ahora y pagar con el tiempo. Proceso de aprobación rápido, términos flexibles, y el precio de tu proyecto se mantiene igual ya sea que financies o pagues por completo. Aplica a través de nuestro sitio web o pregunta sobre el financiamiento durante tu consulta." },
          { q: "Necesito buen crédito para calificar para financiamiento?", a: "Nuestros socios de financiamiento trabajan con una variedad de perfiles crediticios. La verificación inicial es típicamente una consulta suave que no afecta tu puntaje de crédito. Los montos de aprobación y términos dependen de tu situación específica. Animamos a todos a aplicar. Podrías sorprenderte." },
          { q: "Cómo hago un reclamo de garantía?", a: "Llama al (844) 444-3114 o envía un correo a info@jronegutters.com. Describe el problema y programaremos una inspección. No hacemos difíciles los reclamos de garantía. Preferimos arreglar un problema rápido que discutir sobre papeles. Si es nuestra mano de obra, lo arreglamos. Punto." },
          { q: "Su garantía cubre daños por tormentas?", a: "Nuestra garantía de mano de obra cubre defectos en cómo instalamos tu sistema. Los daños por tormentas (huracán, tornado, granizo) están cubiertos por tu seguro de hogar, no nuestra garantía. Sin embargo, si nuestra instalación falló de una manera que contribuyó al daño, por ejemplo, ganchos que se soltaron porque estaban mal asegurados, eso es nuestra responsabilidad y lo resolveremos." },
          { q: "Cuál es el programa de referidos?", a: "Pagamos tarjetas de regalo de $80 por referidos que califiquen. El cliente referido obtiene 10% de descuento en su próximo servicio. El mínimo de proyecto para calificar es $880. Todos los servicios califican, y el programa está abierto para todos. Propietarios, agentes de seguros, techadores, agentes de bienes raíces, administradores de propiedades, cualquiera. Sin límite de referidos." },
        ],
      },
      {
        key: "maintenance", name: "Mantenimiento", faqs: [
          { q: "Con qué frecuencia debo limpiar mis canaletas?", a: "En Tampa Bay, al menos dos veces al año. Una antes de la temporada de huracanes (mayo o junio) y una después de la caída de hojas de otoño (noviembre o diciembre). Hogares cerca de robles, pinos o palmeras pueden necesitar limpieza trimestral. Las canaletas descuidadas causan pudrición de fascia, erosión de cimientos, daño al paisajismo e infestaciones de plagas. La limpieza regular es la forma más barata de prevenir reparaciones costosas." },
          { q: "Qué incluyen sus planes de mantenimiento?", a: "Ofrecemos tres niveles: Básico (soplado de canaletas, bajantes y línea de techo), Premium (todo en Básico más lavado con agua, enjuague, limpieza completa de bajantes y sellado de juntas) y Deluxe (todo en Premium más realineación completa, re-aseguramiento de ganchos, re-inclinación para drenaje e instalación de protectores nuevos). Los planes son anuales con visitas programadas para que nunca tengas que acordarte de llamar." },
          { q: "Dan servicio a canaletas que no instalaron?", a: "Sí. Nuestros servicios de mantenimiento están disponibles para cualquier sistema de canaletas sin importar quién lo instaló. Evaluaremos la condición de tu sistema durante el servicio y te haremos saber si algo necesita atención. Nunca hay presión para reemplazar o mejorar." },
          { q: "Qué pasa si encuentran daños durante una visita de mantenimiento?", a: "Documentamos todo con fotos y nos comunicamos inmediatamente. Problemas menores (ganchos sueltos, pequeñas fallas de sellado) a menudo podemos arreglarlos en el momento durante la visita de servicio. Problemas mayores (fascia podrida, problemas estructurales, secciones fallidas) proporcionaremos un estimado separado. Nunca estás obligado. Solo queremos que sepas lo que está pasando con tu hogar." },
          { q: "Puedo combinar limpieza de canaletas con otros servicios?", a: "Sí. Muchos propietarios combinan la limpieza de canaletas con inspección de sofito, mantenimiento de protectores, verificación de extensiones de bajantes y lavado de sistemas de drenaje. Combinar servicios en una visita te ahorra tiempo y a menudo cuesta menos que programar por separado." },
          { q: "Ofrecen mantenimiento de drenaje?", a: "Sí. Si tienes PVC subterráneo, cajas de captación, rejillas de superficie o emisores emergentes, podemos inspeccionar y lavar esos sistemas durante las visitas de mantenimiento. Los sistemas de drenaje acumulan sedimento con el tiempo y necesitan limpieza periódica para mantener el flujo. Un drenaje tapado es peor que no tener drenaje porque atrapa el agua contra tus cimientos." },
        ],
      },
    ],
  },
};

export default function FAQPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [activeCategory, setActiveCategory] = useState(0);
  const activeCat = t.categories[activeCategory];
  const ActiveIcon = ICON_KEYS[activeCat.key] || HouseIcon;

  return (
    <div style={{ background: "var(--jr-navy)", color: "var(--jr-paper)", minHeight: "100vh" }}>
      <a href="#main" className="jr-skip-link">Skip to content</a>
      <SiteNav />
      <main id="main">
        {/* HERO */}
        <section style={{ padding: "var(--jr-space-16) var(--jr-space-6) var(--jr-space-8)" }}>
          <Container size="prose" style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                padding: "6px 14px",
                background: "var(--jr-gold-pale)",
                border: "1px solid rgba(212, 175, 55, 0.28)",
                borderRadius: "var(--jr-radius-sm)",
                marginBottom: "var(--jr-space-3)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "var(--jr-text-xs)",
                  fontWeight: 700,
                  color: "var(--jr-gold)",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                }}
              >
                {t.heroTag}
              </span>
            </div>
            <h1
              style={{
                fontFamily: "var(--jr-font-heading)",
                fontSize: "var(--jr-text-4xl)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: "var(--jr-space-4)",
              }}
            >
              {t.heroH1a}<br />
              <span style={{ color: "var(--jr-gold)" }}>{t.heroH1b}</span>
            </h1>
            <p
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-lg)",
                color: "var(--jr-muted-on-dark)",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.65,
              }}
            >
              {t.heroP}
            </p>
          </Container>
        </section>

        {/* CATEGORY TABS */}
        <section style={{ padding: "var(--jr-space-5) var(--jr-space-6) 0" }}>
          <Container size="narrow">
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "var(--jr-space-2)" }}>
              {t.categories.map((cat, i) => {
                const Icon = ICON_KEYS[cat.key] || HouseIcon;
                const active = activeCategory === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveCategory(i)}
                    aria-pressed={active}
                    className="jr-press"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "var(--jr-space-2)",
                      padding: "10px 18px",
                      fontFamily: "var(--jr-font-heading)",
                      fontSize: "var(--jr-text-sm)",
                      fontWeight: 600,
                      background: active ? "var(--jr-gold)" : "var(--jr-navy-deep)",
                      color: active ? "var(--jr-navy)" : "var(--jr-muted-on-dark)",
                      border: `1px solid ${active ? "var(--jr-gold)" : "var(--jr-navy-3)"}`,
                      borderRadius: "var(--jr-radius-md)",
                      cursor: "pointer",
                      transition: "background-color var(--jr-dur-fast) var(--jr-ease-out), color var(--jr-dur-fast) var(--jr-ease-out), border-color var(--jr-dur-fast) var(--jr-ease-out)",
                    }}
                  >
                    <Icon size={16} />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </Container>
        </section>

        {/* FAQ LIST */}
        <section style={{ padding: "var(--jr-space-10) var(--jr-space-6) var(--jr-space-20)" }}>
          <Container size="prose">
            <h2
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--jr-space-2)",
                fontFamily: "var(--jr-font-heading)",
                fontSize: "var(--jr-text-xl)",
                fontWeight: 700,
                color: "var(--jr-gold)",
                marginBottom: "var(--jr-space-6)",
              }}
            >
              <ActiveIcon size={22} />
              <span>{activeCat.name}</span>
            </h2>
            <FAQAccordion items={activeCat.faqs} theme="dark" />
          </Container>
        </section>

        {/* STILL HAVE QUESTIONS */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-16) 0" }}>
          <Container size="narrow" style={{ textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "var(--jr-font-heading)",
                fontSize: "var(--jr-text-2xl)",
                fontWeight: 800,
                color: "var(--jr-paper)",
                marginBottom: "var(--jr-space-3)",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {t.stillTitle}
            </h2>
            <p
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-md)",
                color: "var(--jr-cream-2)",
                marginBottom: "var(--jr-space-6)",
                maxWidth: "500px",
                margin: "0 auto var(--jr-space-6)",
                lineHeight: 1.65,
              }}
            >
              {t.stillP}
            </p>
            <div style={{ display: "flex", gap: "var(--jr-space-4)", justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                href="tel:8444443114"
                variant="primary"
                size="lg"
                iconLeft={<PhoneIcon size={18} />}
              >
                {t.callBtn}
              </Button>
              <Button
                href="mailto:info@jronegutters.com"
                variant="outline"
                size="lg"
                iconLeft={<MailIcon size={18} />}
              >
                {t.emailBtn}
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
      <MobileCTA />
    </div>
  );
}
