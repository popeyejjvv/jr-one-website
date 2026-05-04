"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../lib/LanguageContext";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import MobileCTA from "./MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.goldPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.gold},${C.goldLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

// ══════════════════════════════════════════════════════════
// CITY DATA — Unique content for each city
// ══════════════════════════════════════════════════════════
const CITIES = {
  tampa: {
    name: "Tampa", county: "Hillsborough County", slug: "tampa",
    heroH1: "Tampa's Trusted", heroH1Gold: "Gutter & Aluminum Specialists",
    localP: "Tampa homeowners face a unique combination of challenges — intense summer thunderstorms, hurricane season, year-round humidity, and aging housing stock across neighborhoods from South Tampa to New Tampa. Your gutters, soffit, and fascia take the worst of it. JR One is family-owned and family-operated, with over 30 years of family experience in the Tampa Bay gutter industry — our founder Javier has been installing gutters in Tampa personally since 1990, and many of the homes we service today are homes he originally worked on decades ago.",
    weatherNote: "Tampa averages 51 inches of rain per year — significantly above the national average. That volume of water needs to go somewhere, and if your gutter system isn't handling it properly, your foundation, fascia, and landscaping pay the price.",
    neighborhoods: ["South Tampa","Westchase","Carrollwood","New Tampa","Seminole Heights","Hyde Park","Davis Islands","Palma Ceia","Channelside","Ybor City","Town 'N Country","Northdale"],
    nearbyText: "We also serve Clearwater, St. Petersburg, Brandon, Temple Terrace, and surrounding communities.",
  },
  clearwater: {
    name: "Clearwater", county: "Pinellas County", slug: "clearwater",
    heroH1: "Clearwater's Premier", heroH1Gold: "Gutter & Soffit Experts",
    localP: "Clearwater's coastal location means your home's exterior takes a beating from salt air, tropical storms, and intense UV exposure year-round. Aluminum gutters, soffit, and fascia are ideal for Clearwater's conditions because they resist corrosion from salt air that deteriorates lesser materials. JR One serves Clearwater and all of Pinellas County with the same precision and thoroughness we bring to every Tampa Bay community.",
    weatherNote: "Clearwater's coastal proximity adds salt air corrosion to the standard Florida challenges of heavy rain, UV, and humidity. Aluminum is the material of choice here because it handles all of these without degrading.",
    neighborhoods: ["Clearwater Beach","Countryside","East Clearwater","Clearwater Mall Area","Skycrest","Harbor Oaks","Old Clearwater Bay"],
    nearbyText: "We also serve Palm Harbor, Dunedin, Safety Harbor, Largo, and all of Pinellas County.",
  },
  "st-petersburg": {
    name: "St. Petersburg", county: "Pinellas County", slug: "st-petersburg",
    heroH1: "St. Petersburg's Trusted", heroH1Gold: "Aluminum Specialists",
    localP: "St. Petersburg's mix of historic homes, mid-century neighborhoods, and newer construction means every gutter and soffit job is different. Many older St. Pete homes still have original wood soffit and fascia that's been deteriorating for decades in Florida's humidity. JR One specializes in replacing these aging systems with durable aluminum that protects your home and enhances its curb appeal.",
    weatherNote: "St. Pete holds the Guinness record for consecutive days of sunshine — 768 days. That UV exposure degrades wood soffit and fascia faster than most homeowners realize.",
    neighborhoods: ["Downtown St. Pete","Old Northeast","Snell Isle","Shore Acres","Kenwood","Jungle Terrace","Pasadena","Pinellas Point","Tyrone"],
    nearbyText: "We also serve Gulfport, Pinellas Park, Seminole, Largo, and all of Pinellas County.",
  },
  sarasota: {
    name: "Sarasota", county: "Sarasota County", slug: "sarasota",
    heroH1: "Sarasota's Choice for", heroH1Gold: "Premium Gutter Systems",
    localP: "Sarasota homeowners invest in their properties — and expect contractors who match that standard. JR One serves Sarasota with the same meticulous attention to detail that the community demands. From waterfront homes on the keys to established neighborhoods like Palmer Ranch and Lakewood Ranch, we install precision aluminum systems that perform and look the part.",
    weatherNote: "Sarasota's coastal storms drive rain sideways, testing gutters and soffit in ways inland homes rarely experience. Proper installation pitch and fastening aren't optional here — they're essential.",
    neighborhoods: ["Siesta Key","Lido Key","Palmer Ranch","Lakewood Ranch","Gulf Gate","Bee Ridge","Southgate","Indian Beach","Sapphire Shores"],
    nearbyText: "We also serve Bradenton, Venice, Osprey, North Port, and surrounding communities.",
  },
  bradenton: {
    name: "Bradenton", county: "Manatee County", slug: "bradenton",
    heroH1: "Bradenton's Reliable", heroH1Gold: "Gutter & Fascia Team",
    localP: "Bradenton sits at the intersection of coastal weather and suburban growth, with neighborhoods ranging from historic downtown to newer developments in Lakewood Ranch and Parrish. Whether you're maintaining an older home or outfitting new construction, JR One provides the same Gold Standard service across all of Manatee County.",
    weatherNote: "Bradenton's position on the Manatee River and Tampa Bay means homes here face both coastal storm surges and inland flooding. Properly functioning gutters aren't just aesthetic — they're structural protection.",
    neighborhoods: ["Downtown Bradenton","Palma Sola","West Bradenton","Bayshore Gardens","Trailer Estates","Parrish","Ellenton","Palmetto"],
    nearbyText: "We also serve Sarasota, Lakewood Ranch, Anna Maria Island, and surrounding areas.",
  },
  lakeland: {
    name: "Lakeland", county: "Polk County", slug: "lakeland",
    heroH1: "Lakeland's Trusted", heroH1Gold: "Gutter Installation Experts",
    localP: "Lakeland's inland location means you get all of Central Florida's intense afternoon thunderstorms without the coastal breeze to dry things out. Heavy rain and persistent humidity make quality gutter systems essential for protecting your home's foundation and exterior. JR One brings Tampa Bay-caliber craftsmanship to every Lakeland project.",
    weatherNote: "Lakeland sits in Florida's 'Lightning Alley' — one of the most storm-active regions in the country. Those afternoon thunderstorms dump massive amounts of water in short periods, and your gutters need to handle it.",
    neighborhoods: ["South Lakeland","North Lakeland","Dixieland","Lake Hollingsworth","Lake Morton","Crystal Lake","Grasslands"],
    nearbyText: "We also serve Plant City, Brandon, Winter Haven, and surrounding Polk County communities.",
  },
  brandon: {
    name: "Brandon", county: "Hillsborough County", slug: "brandon",
    heroH1: "Brandon's Go-To", heroH1Gold: "Gutter & Soffit Company",
    localP: "Brandon's rapid growth over the past two decades means a mix of housing ages — from established 1980s developments to brand-new construction. Both need reliable gutter and soffit systems, but for different reasons. Older homes often have failing wood soffit and outdated gutter systems, while new builds need quality installation from day one. JR One handles both across the Brandon community.",
    weatherNote: "Brandon gets the same intense thunderstorm activity as Tampa but with more suburban tree coverage — meaning more leaves, pine needles, and debris in your gutters.",
    neighborhoods: ["Bloomingdale","Riverglen","Providence","FishHawk","Valrico","Lithia","Durant"],
    nearbyText: "We also serve Riverview, Tampa, Plant City, and surrounding Hillsborough County.",
  },
  "wesley-chapel": { name:"Wesley Chapel", county:"Pasco County", slug:"wesley-chapel", heroH1:"Wesley Chapel's Preferred", heroH1Gold:"Aluminum Contractor", localP:"Wesley Chapel is one of Tampa Bay's fastest-growing communities, with new construction and established neighborhoods side by side. JR One serves Wesley Chapel homeowners who want their gutter, soffit, and fascia work done right — not by the lowest bidder the builder could find, but by a family-owned specialist team with over 30 years in the Tampa Bay gutter industry.", weatherNote:"Pasco County's flat terrain means drainage is critical. Without properly pitched gutters, water pools around your foundation instead of being directed away.", neighborhoods:["Meadow Pointe","Seven Oaks","Wiregrass","Cypress Creek","Chapel Pines","Watergrass"], nearbyText:"We also serve Land O' Lakes, Lutz, New Tampa, and surrounding Pasco County." },
  "palm-harbor": { name:"Palm Harbor", county:"Pinellas County", slug:"palm-harbor", heroH1:"Palm Harbor's Trusted", heroH1Gold:"Gutter Specialists", localP:"Palm Harbor's established neighborhoods and tree-lined streets are part of what makes it beautiful — and part of why gutter maintenance matters here. Oak and pine canopies drop debris year-round, and Palm Harbor's proximity to the Gulf means salt air is always a factor. JR One provides aluminum solutions built for exactly these conditions.", weatherNote:"Palm Harbor's mature tree canopy means more gutter debris than most Pinellas County communities. Guards and regular maintenance are especially important here.", neighborhoods:["Ozona","Crystal Beach","East Lake","Lansbrook","Palm Harbor Proper"], nearbyText:"We also serve Tarpon Springs, Dunedin, Clearwater, and surrounding areas." },
  riverview: { name:"Riverview", county:"Hillsborough County", slug:"riverview", heroH1:"Riverview's Reliable", heroH1Gold:"Gutter & Fascia Contractor", localP:"Riverview's explosive growth has brought thousands of new homes — many built quickly by volume builders. If your gutters were installed as part of a fast-paced new construction process, they may not have received the attention to pitch, hanger spacing, and material quality that a specialist provides. JR One fixes what builders cut corners on and installs new systems built to last.", weatherNote:"Riverview's position along the Alafia River means proper drainage is critical for preventing foundation issues and yard erosion.", neighborhoods:["FishHawk","Riverview Hills","Boyette","Summerfield","Pavilion"], nearbyText:"We also serve Brandon, Sun City Center, Ruskin, and surrounding Hillsborough County." },
  "new-port-richey": { name:"New Port Richey", county:"Pasco County", slug:"new-port-richey", heroH1:"New Port Richey's", heroH1Gold:"Aluminum Experts", localP:"New Port Richey's mix of waterfront properties and established inland neighborhoods requires gutter and soffit systems that can handle everything from coastal storms to tree debris. JR One serves New Port Richey and western Pasco County with the same Gold Standard approach we bring to every community across Tampa Bay.", weatherNote:"Gulf-facing properties in New Port Richey take direct impact from tropical systems. Hurricane-rated fastening and proper gutter sizing aren't optional here.", neighborhoods:["Gulf Harbors","Beacon Square","Seven Springs","Elfers","Port Richey"], nearbyText:"We also serve Spring Hill, Trinity, Tarpon Springs, and surrounding areas." },
  largo: { name:"Largo", county:"Pinellas County", slug:"largo", heroH1:"Largo's Trusted", heroH1Gold:"Gutter & Soffit Company", localP:"Largo sits in the heart of Pinellas County — close enough to the Gulf for salt air exposure, dense enough with tree canopy for constant gutter debris, and established enough that many homes have soffit and fascia systems that are well past their lifespan. JR One brings specialist-level aluminum work to Largo homeowners who want the job done right.", weatherNote:"Largo's central Pinellas location means you get both coastal weather and suburban tree coverage — a combination that accelerates gutter and soffit wear.", neighborhoods:["Largo Central","Belcher","Seminole","Ridgecrest","Oakhurst"], nearbyText:"We also serve Clearwater, Pinellas Park, Seminole, St. Petersburg, and surrounding areas." },
  "spring-hill": { name:"Spring Hill", county:"Hernando County", slug:"spring-hill", heroH1:"Spring Hill's Choice for", heroH1Gold:"Quality Gutter Work", localP:"Spring Hill's affordable housing and growing community make it an area where quality contractor work is in high demand but not always easy to find. JR One extends our Tampa Bay service area to Spring Hill because homeowners here deserve the same Gold Standard craftsmanship as any other community we serve.", weatherNote:"Spring Hill's inland position means intense thunderstorms and heavy seasonal rain without coastal wind relief. Gutters here work hard year-round.", neighborhoods:["Spring Hill Proper","Timber Pines","Weeki Wachee","Brooksville"], nearbyText:"We also serve New Port Richey, Land O' Lakes, and surrounding Hernando County." },
  "tarpon-springs": { name:"Tarpon Springs", county:"Pinellas County", slug:"tarpon-springs", heroH1:"Tarpon Springs' Trusted", heroH1Gold:"Gutter & Aluminum Specialists", localP:"Tarpon Springs is famous for its Greek heritage and historic Sponge Docks, with homes ranging from charming waterfront cottages to newer inland developments. Salt air from the Gulf and heavy summer storms put constant stress on gutters, soffit, and fascia — making quality aluminum work essential for preserving both the beauty and structure of Tarpon Springs homes.", weatherNote:"Tarpon Springs' direct Gulf exposure means salt-laden winds and driving rain during tropical systems. Corrosion-resistant aluminum and proper fastening are non-negotiable here.", neighborhoods:["Downtown Tarpon Springs","Sunset Hills","Anclote","Whitcomb Bayou"], nearbyText:"We also serve Palm Harbor, Dunedin, and New Port Richey." },
  "land-o-lakes": { name:"Land O' Lakes", county:"Pasco County", slug:"land-o-lakes", heroH1:"Land O' Lakes' Preferred", heroH1Gold:"Gutter & Soffit Experts", localP:"Land O' Lakes is one of Pasco County's fastest-growing areas, with newer construction communities popping up alongside established neighborhoods. Many of these homes were built quickly by volume builders, and the gutter and soffit installations often reflect that pace. JR One brings specialist-level precision to Land O' Lakes homeowners who want their aluminum work done right the first time.", weatherNote:"Pasco County's flat terrain and Land O' Lakes' numerous lakes and wetlands mean drainage is everything. Without properly pitched and sized gutters, water pools around foundations instead of being directed away.", neighborhoods:["Connerton","Lakeshore Ranch","Wilderness Lake","Dupree Lakes","Lake Padgett"], nearbyText:"We also serve Lutz, Wesley Chapel, and New Tampa." },
  dunedin: { name:"Dunedin", county:"Pinellas County", slug:"dunedin", heroH1:"Dunedin's Premier", heroH1Gold:"Aluminum & Gutter Team", localP:"Dunedin's historic downtown, coastal charm, and tree-lined streets make it one of Pinellas County's most desirable communities. Many homes here have character and age — which also means aging soffit, fascia, and gutter systems that need professional replacement. JR One serves Dunedin with the care these homes deserve, upgrading wood systems to durable aluminum that handles Gulf Coast weather.", weatherNote:"Dunedin's position between the Gulf and St. Joseph Sound means constant salt air exposure and direct impact from coastal storms. Quality materials and hurricane-rated fastening protect your investment.", neighborhoods:["Downtown Dunedin","Skinner Boulevard","Curlew Creek","Caladesi"], nearbyText:"We also serve Clearwater, Palm Harbor, and Tarpon Springs." },
  ruskin: { name:"Ruskin", county:"Hillsborough County", slug:"ruskin", heroH1:"Ruskin's Reliable", heroH1Gold:"Gutter & Fascia Contractor", localP:"Ruskin sits in southern Hillsborough County where agricultural roots meet rapid residential growth. From waterfront properties along Tampa Bay to newer inland developments, homes here need gutter and soffit systems built for Florida's toughest conditions. JR One brings the same Gold Standard craftsmanship to Ruskin that we deliver across all of Tampa Bay.", weatherNote:"Ruskin's low-lying terrain along Tampa Bay makes proper water management critical. Heavy seasonal rains combined with high water tables mean your gutters are the first line of defense against foundation and landscape damage.", neighborhoods:["Bahia Beach","Ruskin Colony","Sun City Center area","Apollo Beach"], nearbyText:"We also serve Sun City Center, Riverview, and Brandon." },
  "sun-city-center": { name:"Sun City Center", county:"Hillsborough County", slug:"sun-city-center", heroH1:"Sun City Center's Trusted", heroH1Gold:"Gutter Installation Experts", localP:"Sun City Center is one of Florida's premier active retirement communities, where homeowners take pride in well-maintained properties. Aging gutter systems, deteriorating soffit, and worn fascia don't just look bad — they compromise your home's protection. JR One understands the standards Sun City Center residents expect, and we deliver precise aluminum work that keeps homes protected and looking sharp.", weatherNote:"Sun City Center's southern Hillsborough location gets the full force of summer thunderstorms and tropical systems. Reliable gutters aren't optional — they're essential for protecting the home you've invested in.", neighborhoods:["Kings Point","Freedom Plaza","Sun City Center proper"], nearbyText:"We also serve Ruskin, Riverview, and Brandon." },
  "temple-terrace": { name:"Temple Terrace", county:"Hillsborough County", slug:"temple-terrace", heroH1:"Temple Terrace's Go-To", heroH1Gold:"Gutter & Soffit Specialists", localP:"Temple Terrace is one of Tampa's most established communities, with mature tree canopy and neighborhoods that have been here for decades. That age means many homes are running on original wood soffit and outdated gutter systems that Florida's weather has been punishing for years. JR One replaces failing systems with durable aluminum built to handle what Temple Terrace's climate throws at it.", weatherNote:"Temple Terrace's dense tree coverage means constant gutter debris from oaks and pines, while the Hillsborough River corridor adds humidity and drainage challenges that demand properly functioning gutter systems.", neighborhoods:["Temple Crest","Terrace Walk","Temple Terrace Golf","Riverhills"], nearbyText:"We also serve Tampa, Brandon, and Lutz." },
  "plant-city": { name:"Plant City", county:"Hillsborough County", slug:"plant-city", heroH1:"Plant City's Choice for", heroH1Gold:"Quality Gutter Systems", localP:"Plant City — the Strawberry Capital of the World — sits in eastern Hillsborough County where suburban living meets agricultural heritage. Homes here face the same intense Florida weather as the rest of Tampa Bay, and quality gutter and soffit work is essential for protecting your property. JR One extends our Gold Standard service to Plant City because every homeowner deserves specialist-level aluminum work.", weatherNote:"Plant City's inland position puts it squarely in Florida's thunderstorm corridor. Intense afternoon downpours dump massive amounts of water in short bursts, and your gutter system needs to handle the volume without overflow or backup.", neighborhoods:["Walden Lake","Plantation Oaks","Downtown Plant City"], nearbyText:"We also serve Brandon, Lakeland, and Tampa." },
  lutz: { name:"Lutz", county:"Hillsborough/Pasco County", slug:"lutz", heroH1:"Lutz's Trusted", heroH1Gold:"Aluminum & Gutter Specialists", localP:"Lutz straddles the Hillsborough-Pasco county line, offering a suburban feel with heavy tree canopy and established neighborhoods alongside newer developments. That tree coverage is beautiful but means constant gutter debris, and many older Lutz homes are overdue for soffit and fascia upgrades. JR One serves Lutz with the same precision and thoroughness we bring to every Tampa Bay community.", weatherNote:"Lutz's signature oak and pine canopy drops debris year-round, making gutter maintenance and guards especially important. Combined with Florida's heavy seasonal rains, clogged gutters here lead to fascia rot and foundation issues fast.", neighborhoods:["Heritage Isles","Calusa Trace","Cheval","Lake Park"], nearbyText:"We also serve Land O' Lakes, Wesley Chapel, and Tampa." },
};


const SERVICES = [
  {title:"Seamless Gutter Installation",desc:"Custom-fabricated on-site for a perfect, leak-free fit.",link:"/seamless-aluminum-gutters"},
  {title:"Gutter Guards",desc:"Keep debris out and make maintenance easier.",link:"/gutter-guards"},
  {title:"Soffit & Fascia",desc:"Aluminum and vinyl protection for your roof edge.",link:"/soffit-and-fascia"},
  {title:"Gutter Repair",desc:"Fix leaks, sagging, and overflow — done right the first time.",link:"/gutter-repair"},
  {title:"Siding",desc:"Vinyl and aluminum siding built for Florida weather.",link:"/siding"},
  {title:"Peak 301 Roof Rejuvenation",desc:"Extend your roof's life 6-10 years with this soy-based sealant.",link:"/peak-301"},
];

// ══════════════════════════════════════════════════════════
// SPANISH CITY DATA — unique per-city content
// ══════════════════════════════════════════════════════════
const CITIES_ES = {
  tampa: {
    heroH1: "Especialistas de Confianza en", heroH1Gold: "Canaletas y Aluminio en Tampa",
    localP: "Los propietarios de Tampa enfrentan una combinacion unica de desafios — tormentas intensas en verano, temporada de huracanes, humedad todo el ano y viviendas envejecidas en barrios desde South Tampa hasta New Tampa. Sus canaletas, sofitos y fascias reciben lo peor. JR One es una empresa familiar, operada por la familia, con mas de 30 anos de experiencia familiar en la industria de canaletas en Tampa Bay — nuestro fundador Javier ha estado instalando canaletas en Tampa personalmente desde 1990, y muchas de las casas que atendemos hoy son las mismas que el trabajo hace decadas.",
    weatherNote: "Tampa recibe un promedio de 51 pulgadas de lluvia al ano — muy por encima del promedio nacional. Ese volumen de agua necesita ir a algun lugar, y si su sistema de canaletas no lo maneja correctamente, sus cimientos, fascias y jardin pagan el precio.",
    nearbyText: "Tambien servimos a Clearwater, St. Petersburg, Brandon, Temple Terrace y comunidades cercanas.",
  },
  clearwater: {
    heroH1: "Expertos de Primera en", heroH1Gold: "Canaletas y Sofitos en Clearwater",
    localP: "La ubicacion costera de Clearwater significa que el exterior de su hogar recibe castigo constante del aire salado, tormentas tropicales y exposicion intensa a rayos UV todo el ano. Las canaletas, sofitos y fascias de aluminio son ideales para las condiciones de Clearwater porque resisten la corrosion del aire salado que deteriora materiales inferiores. JR One sirve a Clearwater y todo Pinellas County con la misma precision y dedicacion que llevamos a cada comunidad de Tampa Bay.",
    weatherNote: "La proximidad costera de Clearwater agrega corrosion por aire salado a los desafios estandar de Florida: lluvia intensa, rayos UV y humedad. El aluminio es el material ideal aqui porque maneja todo esto sin degradarse.",
    nearbyText: "Tambien servimos a Palm Harbor, Dunedin, Safety Harbor, Largo y todo Pinellas County.",
  },
  "st-petersburg": {
    heroH1: "Especialistas de Confianza en", heroH1Gold: "Aluminio en St. Petersburg",
    localP: "La mezcla de casas historicas, barrios de mediados de siglo y construccion nueva en St. Petersburg significa que cada trabajo de canaletas y sofitos es diferente. Muchas casas antiguas de St. Pete todavia tienen sofitos y fascias originales de madera que se han deteriorado durante decadas con la humedad de Florida. JR One se especializa en reemplazar estos sistemas envejecidos con aluminio duradero que protege su hogar y mejora su apariencia.",
    weatherNote: "St. Pete tiene el record Guinness de dias consecutivos de sol — 768 dias. Esa exposicion UV degrada los sofitos y fascias de madera mas rapido de lo que la mayoria de propietarios se imaginan.",
    nearbyText: "Tambien servimos a Gulfport, Pinellas Park, Seminole, Largo y todo Pinellas County.",
  },
  sarasota: {
    heroH1: "La Eleccion de Sarasota para", heroH1Gold: "Sistemas de Canaletas Premium",
    localP: "Los propietarios de Sarasota invierten en sus propiedades — y esperan contratistas que esten a la altura. JR One sirve a Sarasota con la misma atencion meticulosa al detalle que la comunidad exige. Desde casas frente al agua en los cayos hasta barrios establecidos como Palmer Ranch y Lakewood Ranch, instalamos sistemas de aluminio de precision que funcionan y lucen impecables.",
    weatherNote: "Las tormentas costeras de Sarasota lanzan lluvia de lado, poniendo a prueba canaletas y sofitos de maneras que las casas tierra adentro rara vez experimentan. La inclinacion adecuada de instalacion y la fijacion correcta no son opcionales aqui — son esenciales.",
    nearbyText: "Tambien servimos a Bradenton, Venice, Osprey, North Port y comunidades cercanas.",
  },
  bradenton: {
    heroH1: "El Equipo Confiable de", heroH1Gold: "Canaletas y Fascias en Bradenton",
    localP: "Bradenton se encuentra en la interseccion del clima costero y el crecimiento suburbano, con barrios que van desde el centro historico hasta desarrollos nuevos en Lakewood Ranch y Parrish. Ya sea que mantenga una casa antigua o equipe una construccion nueva, JR One proporciona el mismo servicio Gold Standard en todo Manatee County.",
    weatherNote: "La posicion de Bradenton sobre el Manatee River y Tampa Bay significa que las casas aqui enfrentan tanto marejadas costeras como inundaciones tierra adentro. Canaletas funcionando correctamente no son solo esteticas — son proteccion estructural.",
    nearbyText: "Tambien servimos a Sarasota, Lakewood Ranch, Anna Maria Island y areas cercanas.",
  },
  lakeland: {
    heroH1: "Expertos de Confianza en", heroH1Gold: "Instalacion de Canaletas en Lakeland",
    localP: "La ubicacion interior de Lakeland significa que recibe todas las tormentas intensas de la tarde del centro de Florida sin la brisa costera para secar las cosas. La lluvia intensa y la humedad persistente hacen que los sistemas de canaletas de calidad sean esenciales para proteger los cimientos y el exterior de su hogar. JR One lleva artesania de calibre Tampa Bay a cada proyecto en Lakeland.",
    weatherNote: "Lakeland esta en el 'Pasillo de Relampagos' de Florida — una de las regiones con mas actividad de tormentas en el pais. Esas tormentas de la tarde descargan cantidades masivas de agua en periodos cortos, y sus canaletas necesitan manejarlo.",
    nearbyText: "Tambien servimos a Plant City, Brandon, Winter Haven y comunidades cercanas de Polk County.",
  },
  brandon: {
    heroH1: "La Compania Preferida de", heroH1Gold: "Canaletas y Sofitos en Brandon",
    localP: "El rapido crecimiento de Brandon en las ultimas dos decadas significa una mezcla de edades de vivienda — desde desarrollos establecidos de los anos 80 hasta construccion nueva. Ambos necesitan sistemas confiables de canaletas y sofitos, pero por diferentes razones. Las casas mas antiguas a menudo tienen sofitos de madera fallando y sistemas de canaletas obsoletos, mientras que las construcciones nuevas necesitan instalacion de calidad desde el primer dia. JR One maneja ambos en la comunidad de Brandon.",
    weatherNote: "Brandon recibe la misma actividad intensa de tormentas que Tampa pero con mas cobertura de arboles suburbanos — lo que significa mas hojas, agujas de pino y escombros en sus canaletas.",
    nearbyText: "Tambien servimos a Riverview, Tampa, Plant City y todo Hillsborough County.",
  },
  "wesley-chapel": {
    heroH1: "El Contratista Preferido de Aluminio en", heroH1Gold: "Wesley Chapel",
    localP: "Wesley Chapel es una de las comunidades de mas rapido crecimiento en Tampa Bay, con construccion nueva y barrios establecidos lado a lado. JR One sirve a propietarios de Wesley Chapel que quieren su trabajo de canaletas, sofitos y fascias hecho bien — no por el postor mas barato que el constructor pudo encontrar, sino por un equipo especialista familiar con mas de 30 anos en la industria de canaletas en Tampa Bay.",
    weatherNote: "El terreno plano de Pasco County significa que el drenaje es critico. Sin canaletas con la inclinacion adecuada, el agua se acumula alrededor de sus cimientos en lugar de ser dirigida lejos.",
    nearbyText: "Tambien servimos a Land O' Lakes, Lutz, New Tampa y todo Pasco County.",
  },
  "palm-harbor": {
    heroH1: "Especialistas de Confianza en", heroH1Gold: "Canaletas en Palm Harbor",
    localP: "Los barrios establecidos y las calles arboladas de Palm Harbor son parte de lo que lo hace hermoso — y parte de por que el mantenimiento de canaletas importa aqui. Los robles y pinos dejan escombros todo el ano, y la proximidad de Palm Harbor al Golfo significa que el aire salado siempre es un factor. JR One proporciona soluciones de aluminio construidas exactamente para estas condiciones.",
    weatherNote: "El dosel maduro de arboles de Palm Harbor significa mas escombros en las canaletas que la mayoria de las comunidades de Pinellas County. Los protectores y el mantenimiento regular son especialmente importantes aqui.",
    nearbyText: "Tambien servimos a Tarpon Springs, Dunedin, Clearwater y areas cercanas.",
  },
  riverview: {
    heroH1: "El Contratista Confiable de", heroH1Gold: "Canaletas y Fascias en Riverview",
    localP: "El crecimiento explosivo de Riverview ha traido miles de casas nuevas — muchas construidas rapidamente por constructores de volumen. Si sus canaletas fueron instaladas como parte de un proceso de construccion rapida, puede que no hayan recibido la atencion a la inclinacion, espaciado de ganchos y calidad de material que un especialista proporciona. JR One arregla lo que los constructores hicieron a la ligera e instala sistemas nuevos construidos para durar.",
    weatherNote: "La posicion de Riverview a lo largo del Alafia River significa que el drenaje adecuado es critico para prevenir problemas de cimientos y erosion del jardin.",
    nearbyText: "Tambien servimos a Brandon, Sun City Center, Ruskin y todo Hillsborough County.",
  },
  "new-port-richey": {
    heroH1: "Expertos en Aluminio en", heroH1Gold: "New Port Richey",
    localP: "La mezcla de propiedades frente al agua y barrios interiores establecidos de New Port Richey requiere sistemas de canaletas y sofitos que puedan manejar todo, desde tormentas costeras hasta escombros de arboles. JR One sirve a New Port Richey y el oeste de Pasco County con el mismo enfoque Gold Standard que llevamos a cada comunidad en Tampa Bay.",
    weatherNote: "Las propiedades frente al Golfo en New Port Richey reciben impacto directo de sistemas tropicales. La fijacion con clasificacion de huracan y el dimensionamiento adecuado de canaletas no son opcionales aqui.",
    nearbyText: "Tambien servimos a Spring Hill, Trinity, Tarpon Springs y areas cercanas.",
  },
  largo: {
    heroH1: "La Compania de Confianza de", heroH1Gold: "Canaletas y Sofitos en Largo",
    localP: "Largo se encuentra en el corazon de Pinellas County — lo suficientemente cerca del Golfo para la exposicion al aire salado, lo suficientemente denso en copa de arboles para escombros constantes en canaletas, y lo suficientemente establecido para que muchas casas tengan sistemas de sofitos y fascias que ya pasaron su vida util. JR One lleva trabajo de aluminio a nivel de especialista a propietarios de Largo que quieren el trabajo bien hecho.",
    weatherNote: "La ubicacion central de Largo en Pinellas significa que recibe tanto clima costero como cobertura de arboles suburbanos — una combinacion que acelera el desgaste de canaletas y sofitos.",
    nearbyText: "Tambien servimos a Clearwater, Pinellas Park, Seminole, St. Petersburg y areas cercanas.",
  },
  "spring-hill": {
    heroH1: "La Eleccion de Spring Hill para", heroH1Gold: "Trabajo de Canaletas de Calidad",
    localP: "Las viviendas accesibles y la comunidad en crecimiento de Spring Hill hacen de esta un area donde el trabajo de contratistas de calidad tiene alta demanda pero no siempre es facil de encontrar. JR One extiende nuestra area de servicio de Tampa Bay a Spring Hill porque los propietarios aqui merecen la misma artesania Gold Standard que cualquier otra comunidad que servimos.",
    weatherNote: "La posicion interior de Spring Hill significa tormentas intensas y lluvias estacionales fuertes sin alivio del viento costero. Las canaletas aqui trabajan duro todo el ano.",
    nearbyText: "Tambien servimos a New Port Richey, Land O' Lakes y todo Hernando County.",
  },
  "tarpon-springs": {
    heroH1: "Especialistas de Confianza en", heroH1Gold: "Canaletas y Aluminio en Tarpon Springs",
    localP: "Tarpon Springs es famosa por su herencia griega y el historico Sponge Docks, con casas que van desde encantadoras cabanas frente al agua hasta desarrollos interiores mas nuevos. El aire salado del Golfo y las fuertes tormentas de verano ejercen estres constante sobre canaletas, sofitos y fascias — haciendo que el trabajo de aluminio de calidad sea esencial para preservar tanto la belleza como la estructura de las casas de Tarpon Springs.",
    weatherNote: "La exposicion directa al Golfo de Tarpon Springs significa vientos cargados de sal y lluvia intensa durante sistemas tropicales. El aluminio resistente a la corrosion y la fijacion adecuada son innegociables aqui.",
    nearbyText: "Tambien servimos a Palm Harbor, Dunedin y New Port Richey.",
  },
  "land-o-lakes": {
    heroH1: "Los Expertos Preferidos en", heroH1Gold: "Canaletas y Sofitos en Land O' Lakes",
    localP: "Land O' Lakes es una de las areas de mas rapido crecimiento de Pasco County, con comunidades de construccion nueva apareciendo junto a barrios establecidos. Muchas de estas casas fueron construidas rapidamente por constructores de volumen, y las instalaciones de canaletas y sofitos a menudo reflejan ese ritmo. JR One lleva precision a nivel de especialista a propietarios de Land O' Lakes que quieren su trabajo de aluminio bien hecho desde la primera vez.",
    weatherNote: "El terreno plano de Pasco County y los numerosos lagos y humedales de Land O' Lakes significan que el drenaje lo es todo. Sin canaletas con la inclinacion y tamano adecuados, el agua se acumula alrededor de los cimientos en lugar de ser dirigida lejos.",
    nearbyText: "Tambien servimos a Lutz, Wesley Chapel y New Tampa.",
  },
  dunedin: {
    heroH1: "El Equipo Premier de", heroH1Gold: "Aluminio y Canaletas en Dunedin",
    localP: "El centro historico de Dunedin, su encanto costero y sus calles arboladas lo convierten en una de las comunidades mas deseables de Pinellas County. Muchas casas aqui tienen caracter y anos — lo que tambien significa sistemas envejecidos de sofitos, fascias y canaletas que necesitan reemplazo profesional. JR One sirve a Dunedin con el cuidado que estas casas merecen, actualizando sistemas de madera a aluminio duradero que resiste el clima de la Costa del Golfo.",
    weatherNote: "La posicion de Dunedin entre el Golfo y St. Joseph Sound significa exposicion constante al aire salado e impacto directo de tormentas costeras. Materiales de calidad y fijacion con clasificacion de huracan protegen su inversion.",
    nearbyText: "Tambien servimos a Clearwater, Palm Harbor y Tarpon Springs.",
  },
  ruskin: {
    heroH1: "El Contratista Confiable de", heroH1Gold: "Canaletas y Fascias en Ruskin",
    localP: "Ruskin se encuentra en el sur de Hillsborough County donde las raices agricolas se encuentran con el rapido crecimiento residencial. Desde propiedades frente al agua a lo largo de Tampa Bay hasta desarrollos interiores mas nuevos, las casas aqui necesitan sistemas de canaletas y sofitos construidos para las condiciones mas duras de Florida. JR One lleva la misma artesania Gold Standard a Ruskin que entregamos en todo Tampa Bay.",
    weatherNote: "El terreno bajo de Ruskin a lo largo de Tampa Bay hace que el manejo adecuado del agua sea critico. Las lluvias estacionales fuertes combinadas con niveles freaticos altos significan que sus canaletas son la primera linea de defensa contra danos a cimientos y jardin.",
    nearbyText: "Tambien servimos a Sun City Center, Riverview y Brandon.",
  },
  "sun-city-center": {
    heroH1: "Expertos de Confianza en", heroH1Gold: "Instalacion de Canaletas en Sun City Center",
    localP: "Sun City Center es una de las principales comunidades de retiro activo de Florida, donde los propietarios se enorgullecen de propiedades bien mantenidas. Sistemas de canaletas envejecidos, sofitos deteriorados y fascias desgastadas no solo lucen mal — comprometen la proteccion de su hogar. JR One entiende los estandares que los residentes de Sun City Center esperan, y entregamos trabajo de aluminio preciso que mantiene las casas protegidas y con buena apariencia.",
    weatherNote: "La ubicacion en el sur de Hillsborough de Sun City Center recibe toda la fuerza de las tormentas de verano y sistemas tropicales. Canaletas confiables no son opcionales — son esenciales para proteger el hogar en el que ha invertido.",
    nearbyText: "Tambien servimos a Ruskin, Riverview y Brandon.",
  },
  "temple-terrace": {
    heroH1: "Los Especialistas Preferidos de", heroH1Gold: "Canaletas y Sofitos en Temple Terrace",
    localP: "Temple Terrace es una de las comunidades mas establecidas de Tampa, con copa de arboles madura y barrios que han estado aqui por decadas. Esa edad significa que muchas casas funcionan con sofitos originales de madera y sistemas de canaletas obsoletos que el clima de Florida ha castigado por anos. JR One reemplaza sistemas fallando con aluminio duradero construido para manejar lo que el clima de Temple Terrace le lance.",
    weatherNote: "La densa cobertura de arboles de Temple Terrace significa escombros constantes en canaletas de robles y pinos, mientras que el corredor del Hillsborough River agrega humedad y desafios de drenaje que exigen sistemas de canaletas funcionando correctamente.",
    nearbyText: "Tambien servimos a Tampa, Brandon y Lutz.",
  },
  "plant-city": {
    heroH1: "La Eleccion de Plant City para", heroH1Gold: "Sistemas de Canaletas de Calidad",
    localP: "Plant City — la Capital Mundial de la Fresa — se encuentra en el este de Hillsborough County donde la vida suburbana se encuentra con la herencia agricola. Las casas aqui enfrentan el mismo clima intenso de Florida que el resto de Tampa Bay, y el trabajo de calidad en canaletas y sofitos es esencial para proteger su propiedad. JR One extiende nuestro servicio Gold Standard a Plant City porque cada propietario merece trabajo de aluminio a nivel de especialista.",
    weatherNote: "La posicion interior de Plant City la coloca directamente en el corredor de tormentas de Florida. Los aguaceros intensos de la tarde descargan cantidades masivas de agua en rafagas cortas, y su sistema de canaletas necesita manejar el volumen sin desbordarse.",
    nearbyText: "Tambien servimos a Brandon, Lakeland y Tampa.",
  },
  lutz: {
    heroH1: "Especialistas de Confianza en", heroH1Gold: "Aluminio y Canaletas en Lutz",
    localP: "Lutz se extiende a ambos lados de la linea del condado Hillsborough-Pasco, ofreciendo un ambiente suburbano con gran cobertura de arboles y barrios establecidos junto a desarrollos mas nuevos. Esa cobertura de arboles es hermosa pero significa escombros constantes en canaletas, y muchas casas antiguas de Lutz necesitan actualizaciones de sofitos y fascias. JR One sirve a Lutz con la misma precision y dedicacion que llevamos a cada comunidad de Tampa Bay.",
    weatherNote: "La caracteristica copa de robles y pinos de Lutz deja escombros todo el ano, haciendo que el mantenimiento de canaletas y los protectores sean especialmente importantes. Combinado con las fuertes lluvias estacionales de Florida, canaletas tapadas aqui llevan a pudricion de fascias y problemas de cimientos rapidamente.",
    nearbyText: "Tambien servimos a Land O' Lakes, Wesley Chapel y Tampa.",
  },
};

const SERVICES_ES = [
  {title:"Instalacion de Canaletas Sin Costura",desc:"Fabricadas a medida en el sitio para un ajuste perfecto sin fugas.",link:"/seamless-aluminum-gutters"},
  {title:"Protectores de Canaletas",desc:"Mantienen los escombros afuera y facilitan el mantenimiento.",link:"/gutter-guards"},
  {title:"Sofitos y Fascias",desc:"Proteccion de aluminio y vinilo para el borde de su techo.",link:"/soffit-and-fascia"},
  {title:"Reparacion de Canaletas",desc:"Arreglamos fugas, hundimientos y desbordamientos — bien hecho a la primera.",link:"/gutter-repair"},
  {title:"Revestimiento",desc:"Revestimiento de vinilo y aluminio construido para el clima de Florida.",link:"/siding"},
  {title:"Peak 301 Rejuvenecimiento de Techo",desc:"Extienda la vida de su techo 6-10 anos con este sellador a base de soya.",link:"/peak-301"},
];

// ══════════════════════════════════════════════════════════
// UI TRANSLATIONS
// ══════════════════════════════════════════════════════════
const T = {
  en: {
    promoBannerPre: "Serving ",
    promoBannerPost: " — Call (844) 444-3114 for Your Free Quote",
    breadHome: "Home",
    breadAreas: "Service Areas",
    badge30: "Family-Owned",
    badgeGoogle: "4.9★ Google",
    badgeCrews: "In-House Crews",
    badgeInsured: "Fully Insured",
    getQuote: "GET YOUR FREE QUOTE",
    freeQuoteFor: "Free Quote for ",
    freeQuoteSuffix: " Homeowners",
    received: "Request Received!",
    receivedSub: "We'll be in touch within hours.",
    placeName: "Full Name",
    placePhone: "Phone Number",
    placeEmail: "Email Address",
    placeService: "What do you need?",
    serviceOpts: ["What do you need?","Gutter Installation","Gutter Repair","Gutter Guards","Soffit & Fascia","Siding","Peak 301 Roof Rejuvenation","Other"],
    requestQuote: "REQUEST MY FREE QUOTE",
    noSpam: "No spam. No pressure.",
    whyGutters: "Why Gutters Matter in ",
    servicesIn: "SERVICES IN ",
    whatWeDo: "WHAT WE DO IN ",
    learnMore: "LEARN MORE →",
    goldStandard: "THE GOLD STANDARD",
    howWeWork: "HOW WE WORK IN ",
    goldMotto: "Every home. Every time. No exceptions.",
    step1t: "Assess", step1d: "Free on-site inspection",
    step2t: "Design", step2d: "Transparent custom estimate",
    step3t: "Install", step3d: "Our in-house crew, precision work",
    step4t: "Protect", step4d: "Warranty and follow-up",
    neighborhoodsSuffix: " Neighborhoods We Serve",
    reviews: "REVIEWS",
    trustedAcross: "TRUSTED ACROSS TAMPA BAY",
    ctaSuffix: " HOMEOWNER? LET'S TALK.",
    ctaDesc: "Get your free, no-pressure quote from Tampa Bay's trusted aluminum specialists. We respond within hours.",
    callCta: "CALL (844) 444-3114",
    scrollForm: "SCROLL TO FORM",
    notFound: "City page not found. Available: ",
  },
  es: {
    promoBannerPre: "Sirviendo a ",
    promoBannerPost: " — Llame al (844) 444-3114 para su Cotizacion Gratis",
    breadHome: "Inicio",
    breadAreas: "Areas de Servicio",
    badge30: "Empresa Familiar",
    badgeGoogle: "4.9★ Google",
    badgeCrews: "Equipos Propios",
    badgeInsured: "Totalmente Asegurados",
    getQuote: "OBTENGA SU COTIZACION GRATIS",
    freeQuoteFor: "Cotizacion Gratis para Propietarios en ",
    freeQuoteSuffix: "",
    received: "Solicitud Recibida!",
    receivedSub: "Nos comunicaremos con usted en pocas horas.",
    placeName: "Nombre Completo",
    placePhone: "Numero de Telefono",
    placeEmail: "Correo Electronico",
    placeService: "Que necesita?",
    serviceOpts: ["Que necesita?","Instalacion de Canaletas","Reparacion de Canaletas","Protectores de Canaletas","Sofitos y Fascias","Revestimiento","Peak 301 Rejuvenecimiento de Techo","Otro"],
    requestQuote: "SOLICITAR MI COTIZACION GRATIS",
    noSpam: "Sin correo basura. Sin presion.",
    whyGutters: "Por Que Importan las Canaletas en ",
    servicesIn: "SERVICIOS EN ",
    whatWeDo: "LO QUE HACEMOS EN ",
    learnMore: "MAS INFORMACION →",
    goldStandard: "EL ESTANDAR DE ORO",
    howWeWork: "COMO TRABAJAMOS EN ",
    goldMotto: "Cada hogar. Cada vez. Sin excepciones.",
    step1t: "Evaluar", step1d: "Inspeccion gratuita en el sitio",
    step2t: "Disenar", step2d: "Presupuesto personalizado y transparente",
    step3t: "Instalar", step3d: "Nuestro equipo propio, trabajo de precision",
    step4t: "Proteger", step4d: "Garantia y seguimiento",
    neighborhoodsSuffix: " — Vecindarios que Servimos",
    reviews: "RESENAS",
    trustedAcross: "DE CONFIANZA EN TODO TAMPA BAY",
    ctaSuffix: " — PROPIETARIO? HABLEMOS.",
    ctaDesc: "Obtenga su cotizacion gratis y sin presion de los especialistas en aluminio de confianza de Tampa Bay. Respondemos en pocas horas.",
    callCta: "LLAMAR AL (844) 444-3114",
    scrollForm: "IR AL FORMULARIO",
    notFound: "Pagina de ciudad no encontrada. Disponibles: ",
  },
};

// ══ CITY PAGE COMPONENT ══════════════════════════════════
// Pass citySlug as prop — defaults to "tampa" for preview
export default function CityLandingPage({ citySlug = "tampa" }) {
  const { lang } = useLanguage();
  const t = T[lang];
  const city = CITIES[citySlug];
  const cityEs = CITIES_ES[citySlug] || {};
  const servicesData = lang === "es" ? SERVICES_ES : SERVICES;
  const [formData, setFormData] = useState({name:"",phone:"",email:"",zip:"",service:""});
  const [submitted, setSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  useEffect(() => { injectFonts(); }, []);

  const handleCityForm = async () => {
    if (!formData.name || !formData.phone) return;
    setFormLoading(true);
    try {
      const params = new URLSearchParams(window.location.search);
      await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name, phone: formData.phone, email: formData.email,
          service: formData.service, zip: formData.zip,
          page: window.location.pathname, city: city.name, state: "FL",
          gclid: params.get("gclid") || "",
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
          utm_term: params.get("utm_term") || "",
        }),
      });
    } catch {}
    setSubmitted(true);
    setFormLoading(false);
  };
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  if (!city) return <div style={{padding:"100px 24px",textAlign:"center",fontFamily:f.h,color:C.white,background:C.bg}}>{t.notFound}{Object.keys(CITIES).join(", ")}</div>;

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav promoBanner={"🏠 " + t.promoBannerPre + city.name + t.promoBannerPost} />
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}><a href="/" style={{color:C.muted,textDecoration:"none"}}>{t.breadHome}</a><span style={{margin:"0 8px",opacity:0.5}}>/</span><span>{t.breadAreas}</span><span style={{margin:"0 8px",opacity:0.5}}>/</span><span style={{color:C.gold}}>{city.name}</span></div></div>

      {/* HERO */}
      <section className="hero-stars" style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:"1 1 520px",minWidth:"300px"}}>
          <Tag>{city.name.toUpperCase()}, FL</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{lang === "es" ? cityEs.heroH1 : city.heroH1}<br/><span style={{color:C.gold}}>{lang === "es" ? cityEs.heroH1Gold : city.heroH1Gold}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"24px",maxWidth:"560px"}}>{lang === "es" ? cityEs.localP : city.localP}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:"12px",marginBottom:"24px"}}>
            {[
              { label: t.badge30, icon: "⏱", color: "#60A5FA", bg: "rgba(59,130,246,0.15)", border: "rgba(59,130,246,0.25)" },
              { label: t.badgeGoogle, icon: "⭐", color: "#D4A843", bg: "rgba(212,168,67,0.15)", border: "rgba(212,168,67,0.25)" },
              { label: t.badgeCrews, icon: "👷", color: "#F97316", bg: "rgba(249,115,22,0.15)", border: "rgba(249,115,22,0.25)" },
              { label: t.badgeInsured, icon: "✓", color: "#4ADE80", bg: "rgba(45,139,78,0.15)", border: "rgba(45,139,78,0.25)" },
            ].map((badge, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", background: badge.bg, border: `1px solid ${badge.border}`, borderRadius: "6px", fontFamily: f.h, fontSize: "12px", fontWeight: 600, color: badge.color }}><span>{badge.icon}</span>{badge.label}</span>
            ))}
          </div>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <button onClick={()=>document.getElementById("city-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 32px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(200,149,46,0.3)"}}>{t.getQuote}</button>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 32px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.gold,border:`2px solid ${C.gold}`,borderRadius:"8px",textDecoration:"none"}}>📞 (844) 444-3114</a>
          </div>
        </div>
        <div style={{flex:"1 1 380px",minWidth:"300px",maxWidth:"440px"}}>
          <div style={{background:C.white,borderRadius:"16px",padding:"28px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)"}}>
            <h2 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>{t.freeQuoteFor}{city.name}{t.freeQuoteSuffix}</h2>
            <div style={{width:"40px",height:"3px",background:C.gold,borderRadius:"2px",margin:"10px auto 20px"}} />
            {submitted ? <div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:"40px",marginBottom:"8px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy}}>{t.received}</h3><p style={{fontFamily:f.b,fontSize:"14px",color:"#6B7280",marginTop:"6px"}}>{t.receivedSub}</p></div> : <>
              <input aria-label={t.placeName} style={inputStyle} placeholder={t.placeName} value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
              <input aria-label={t.placePhone} style={inputStyle} placeholder={t.placePhone} type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
              <input aria-label={t.placeEmail} style={inputStyle} placeholder={t.placeEmail} type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
              <select aria-label="Service" style={{...inputStyle,cursor:"pointer"}} value={formData.service} onChange={e=>setFormData({...formData,service:e.target.value})}>
                {t.serviceOpts.map((o,i)=><option key={i} value={i===0?"":o}>{o}</option>)}
              </select>
              <button onClick={handleCityForm} disabled={formLoading} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"13px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,border:"none",borderRadius:"8px",cursor:"pointer",opacity:formLoading?0.6:1}}>{formLoading ? "..." : t.requestQuote}</button>
              <p style={{fontFamily:f.b,fontSize:"11px",color:"#9CA3AF",textAlign:"center",marginTop:"10px"}}>{t.noSpam}</p>
            </>}
          </div>
        </div>
      </section>

      {/* WEATHER NOTE */}
      <section style={{background:C.navy,padding:"48px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",display:"flex",gap:"20px",alignItems:"flex-start"}}>
          <div style={{fontSize:"28px",flexShrink:0,marginTop:"4px"}}>🌧️</div>
          <div>
            <h3 style={{fontFamily:f.h,fontSize:"16px",fontWeight:700,color:C.gold,marginBottom:"8px"}}>{t.whyGutters}{city.name}</h3>
            <p style={{fontFamily:f.b,fontSize:"16px",color:C.offWhite,lineHeight:1.65}}>{lang === "es" ? cityEs.weatherNote : city.weatherNote}</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",textAlign:"center"}}>
          <Tag>{t.servicesIn}{city.name.toUpperCase()}</Tag>
          <h2 style={{...secTitle,color:C.white}}>{t.whatWeDo}{city.name.toUpperCase()}</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px",marginTop:"48px",textAlign:"left"}}>
            {servicesData.map((svc,i) => (
              <a key={i} href={svc.link} style={{textDecoration:"none",background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px",cursor:"pointer",transition:"border-color 0.3s",display:"block"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.gold} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}>
                <h3 style={{fontFamily:f.h,fontSize:"16px",fontWeight:700,color:C.white,marginBottom:"6px"}}>{svc.title}</h3>
                <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginBottom:"12px"}}>{svc.desc}</p>
                <span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"1px"}}>{t.learnMore}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* GOLD STANDARD */}
      <section style={{background:C.cream,padding:"80px 24px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Tag>{t.goldStandard}</Tag>
          <h2 style={{...secTitle,color:C.navy}}>{t.howWeWork}{city.name.toUpperCase()}</h2>
          <GoldBar />
          <p style={{fontFamily:f.b,fontSize:"17px",color:"#4B5563",fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>{t.goldMotto}</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"20px"}}>
            {[{n:"01",t:t.step1t,d:t.step1d},{n:"02",t:t.step2t,d:t.step2d},{n:"03",t:t.step3t,d:t.step3d},{n:"04",t:t.step4t,d:t.step4d}].map((s,i) => (
              <div key={i} style={{background:C.white,borderRadius:"12px",padding:"24px",textAlign:"center",borderTop:`3px solid ${C.gold}`}}>
                <div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.gold}}>{s.n}</div>
                <h3 style={{fontFamily:f.h,fontSize:"16px",fontWeight:700,color:C.navy,margin:"8px 0 4px"}}>{s.t}</h3>
                <p style={{fontFamily:f.b,fontSize:"14px",color:"#6B7280"}}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEIGHBORHOODS */}
      <section style={{background:C.bg,padding:"60px 24px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.white,marginBottom:"20px"}}>{city.name}{t.neighborhoodsSuffix}</h3>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px"}}>
            {city.neighborhoods.map((n,i) => (
              <span key={i} style={{padding:"8px 16px",background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"6px",fontFamily:f.b,fontSize:"14px",color:C.offWhite}}>{n}</span>
            ))}
          </div>
          <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginTop:"20px"}}>{lang === "es" ? cityEs.nearbyText : city.nearbyText}</p>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Tag>{t.reviews}</Tag>
          <h2 style={{...secTitle,color:C.white}}>{t.trustedAcross}</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"20px",marginTop:"48px",textAlign:"left"}}>
            {[
              {text:"From the very beginning, they worked to ensure I received a fair quote. No high pressure selling. The workmanship was outstanding.",name:"Lois G.",loc:"Tampa"},
              {text:"After Milton I called a dozen companies — only JR One called back. The team showed up and did a perfect job.",name:"Matt D.",loc:"Tampa Bay"},
              {text:"Six guys on site with a crew manager. Replaced all soffit and fascia with aluminum, fixed all termite damage — done in days.",name:"Tampa Homeowner",loc:city.county},
            ].map((rev,i) => (
              <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px"}}>
                <Stars />
                <p style={{fontFamily:f.b,fontSize:"14px",color:C.offWhite,lineHeight:1.6,margin:"12px 0",fontStyle:"italic"}}>"{rev.text}"</p>
                <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontFamily:f.h,fontSize:"13px",fontWeight:600,color:C.white}}>{rev.name}</span><span style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>{rev.loc}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FORM */}
      <section id="city-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,36px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{city.name}{t.ctaSuffix}</h2>
        <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"32px"}}>{t.ctaDesc}</p>
        <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
          <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"16px 32px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.navy,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:"8px",textDecoration:"none"}}>📞 {t.callCta}</a>
          <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{padding:"16px 32px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.gold,background:"transparent",border:`2px solid ${C.gold}`,borderRadius:"8px",cursor:"pointer"}}>{t.scrollForm}</button>
        </div>
      </div></section>

      <SiteFooter />
      <MobileCTA scrollTarget="city-form" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus,select:focus{border-color:${C.gold}!important}`}</style>
    </div>
  );
}
