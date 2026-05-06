"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM: CITY LANDING TEMPLATE
   Brand-brain compliant. Tokens via app/tokens.css.
   Renders for every city + every city/service combo.
   City DATA is preserved; prose strings have em-dashes
   converted to keyboard punctuation and puffery stripped
   from hero headlines per brand-brain.
   ═══════════════════════════════════════════════════════════ */

import { useState } from "react";
import { useLanguage } from "../lib/LanguageContext";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import MobileCTA from "./MobileCTA";
import Container from "./ui/Container";
import Button from "./ui/Button";
import SectionHeading from "./ui/SectionHeading";
import ServiceCard from "./ui/ServiceCard";
import ReviewCard from "./ui/ReviewCard";
import ProcessStep from "./ui/ProcessStep";
import TrustLine from "./ui/TrustLine";
import { CheckCircleIcon, MapPinIcon, PhoneIcon } from "./../lib/icons";

// ══════════════════════════════════════════════════════════
// CITY DATA: Unique per city
// All prose strings: em-dashes scrubbed to keyboard punctuation
// All heroH1Gold values: puffery stripped per brand-brain
// City name + service-keyword preserved for SEO value
// ══════════════════════════════════════════════════════════
const CITIES = {
  tampa: {
    name: "Tampa", county: "Hillsborough County", slug: "tampa",
    heroH1: "Tampa's Family-Owned",
    heroH1Gold: "Gutter, Soffit & Aluminum Trade",
    localP: "Tampa homeowners face a unique combination of challenges: intense summer thunderstorms, hurricane season, year-round humidity, and aging housing stock across neighborhoods from South Tampa to New Tampa. Your gutters, soffit, and fascia take the worst of it. JR One is family-owned and family-operated, with over 30 years of family experience in the Tampa Bay gutter trade. Our founder Javier has been installing gutters in Tampa personally since 1990, and many of the homes we service today are homes he originally worked on decades ago.",
    weatherNote: "Tampa averages 51 inches of rain per year, significantly above the national average. That volume of water needs to go somewhere, and if your gutter system isn't handling it properly, your foundation, fascia, and landscaping pay the price.",
    neighborhoods: ["South Tampa", "Westchase", "Carrollwood", "New Tampa", "Seminole Heights", "Hyde Park", "Davis Islands", "Palma Ceia", "Channelside", "Ybor City", "Town 'N Country", "Northdale"],
    nearbyText: "We also serve Clearwater, St. Petersburg, Brandon, Temple Terrace, and surrounding communities.",
  },
  clearwater: {
    name: "Clearwater", county: "Pinellas County", slug: "clearwater",
    heroH1: "Clearwater's Family-Owned",
    heroH1Gold: "Gutter & Soffit Trade",
    localP: "Clearwater's coastal location means your home's exterior takes a beating from salt air, tropical storms, and intense UV exposure year-round. Aluminum gutters, soffit, and fascia are ideal for Clearwater's conditions because they resist corrosion from salt air that deteriorates lesser materials. JR One serves Clearwater and all of Pinellas County with the same care and thoroughness we bring to every Tampa Bay community.",
    weatherNote: "Clearwater's coastal proximity adds salt air corrosion to the standard Florida challenges of heavy rain, UV, and humidity. Aluminum is the material of choice here because it handles all of these without degrading.",
    neighborhoods: ["Clearwater Beach", "Countryside", "East Clearwater", "Clearwater Mall Area", "Skycrest", "Harbor Oaks", "Old Clearwater Bay"],
    nearbyText: "We also serve Palm Harbor, Dunedin, Safety Harbor, Largo, and all of Pinellas County.",
  },
  "st-petersburg": {
    name: "St. Petersburg", county: "Pinellas County", slug: "st-petersburg",
    heroH1: "St. Petersburg's Family-Owned",
    heroH1Gold: "Aluminum Trade",
    localP: "St. Petersburg's mix of historic homes, mid-century neighborhoods, and newer construction means every gutter and soffit job is different. Many older St. Pete homes still have original wood soffit and fascia that's been deteriorating for decades in Florida's humidity. JR One focuses on replacing these aging systems with durable aluminum that protects your home and enhances its curb appeal.",
    weatherNote: "St. Pete holds the Guinness record for consecutive days of sunshine: 768 days. That UV exposure degrades wood soffit and fascia faster than most homeowners realize.",
    neighborhoods: ["Downtown St. Pete", "Old Northeast", "Snell Isle", "Shore Acres", "Kenwood", "Jungle Terrace", "Pasadena", "Pinellas Point", "Tyrone"],
    nearbyText: "We also serve Gulfport, Pinellas Park, Seminole, Largo, and all of Pinellas County.",
  },
  sarasota: {
    name: "Sarasota", county: "Sarasota County", slug: "sarasota",
    heroH1: "Sarasota's Family-Owned",
    heroH1Gold: "Gutter & Aluminum Trade",
    localP: "Sarasota homeowners invest in their properties, and expect contractors who match that standard. JR One serves Sarasota with the same meticulous attention to detail that the community demands. From waterfront homes on the keys to established neighborhoods like Palmer Ranch and Lakewood Ranch, we install aluminum systems that perform and look the part.",
    weatherNote: "Sarasota's coastal storms drive rain sideways, testing gutters and soffit in ways inland homes rarely experience. Proper installation pitch and fastening aren't optional here, they're essential.",
    neighborhoods: ["Siesta Key", "Lido Key", "Palmer Ranch", "Lakewood Ranch", "Gulf Gate", "Bee Ridge", "Southgate", "Indian Beach", "Sapphire Shores"],
    nearbyText: "We also serve Bradenton, Venice, Osprey, North Port, and surrounding communities.",
  },
  bradenton: {
    name: "Bradenton", county: "Manatee County", slug: "bradenton",
    heroH1: "Bradenton's Family-Owned",
    heroH1Gold: "Gutter & Fascia Trade",
    localP: "Bradenton sits at the intersection of coastal weather and suburban growth, with neighborhoods ranging from historic downtown to newer developments in Lakewood Ranch and Parrish. Whether you're maintaining an older home or outfitting new construction, JR One provides the same Gold Standard service across all of Manatee County.",
    weatherNote: "Bradenton's position on the Manatee River and Tampa Bay means homes here face both coastal storm surges and inland flooding. Properly functioning gutters aren't just aesthetic, they're structural protection.",
    neighborhoods: ["Downtown Bradenton", "Palma Sola", "West Bradenton", "Bayshore Gardens", "Trailer Estates", "Parrish", "Ellenton", "Palmetto"],
    nearbyText: "We also serve Sarasota, Lakewood Ranch, Anna Maria Island, and surrounding areas.",
  },
  lakeland: {
    name: "Lakeland", county: "Polk County", slug: "lakeland",
    heroH1: "Lakeland's Family-Owned",
    heroH1Gold: "Gutter Installation Trade",
    localP: "Lakeland's inland location means you get all of Central Florida's intense afternoon thunderstorms without the coastal breeze to dry things out. Heavy rain and persistent humidity make quality gutter systems essential for protecting your home's foundation and exterior. JR One brings Tampa Bay-caliber craftsmanship to every Lakeland project.",
    weatherNote: "Lakeland sits in Florida's 'Lightning Alley', one of the most storm-active regions in the country. Those afternoon thunderstorms dump massive amounts of water in short periods, and your gutters need to handle it.",
    neighborhoods: ["South Lakeland", "North Lakeland", "Dixieland", "Lake Hollingsworth", "Lake Morton", "Crystal Lake", "Grasslands"],
    nearbyText: "We also serve Plant City, Brandon, Winter Haven, and surrounding Polk County communities.",
  },
  brandon: {
    name: "Brandon", county: "Hillsborough County", slug: "brandon",
    heroH1: "Brandon's Family-Owned",
    heroH1Gold: "Gutter & Soffit Trade",
    localP: "Brandon's rapid growth over the past two decades means a mix of housing ages, from established 1980s developments to brand-new construction. Both need reliable gutter and soffit systems, but for different reasons. Older homes often have failing wood soffit and outdated gutter systems, while new builds need quality installation from day one. JR One handles both across the Brandon community.",
    weatherNote: "Brandon gets the same intense thunderstorm activity as Tampa but with more suburban tree coverage, meaning more leaves, pine needles, and debris in your gutters.",
    neighborhoods: ["Bloomingdale", "Riverglen", "Providence", "FishHawk", "Valrico", "Lithia", "Durant"],
    nearbyText: "We also serve Riverview, Tampa, Plant City, and surrounding Hillsborough County.",
  },
  "wesley-chapel": {
    name: "Wesley Chapel", county: "Pasco County", slug: "wesley-chapel",
    heroH1: "Wesley Chapel's Family-Owned",
    heroH1Gold: "Aluminum Trade",
    localP: "Wesley Chapel is one of Tampa Bay's fastest-growing communities, with new construction and established neighborhoods side by side. JR One serves Wesley Chapel homeowners who want their gutter, soffit, and fascia work done right, not by the lowest bidder the builder could find, but by a family-owned team with over 30 years in the Tampa Bay gutter trade.",
    weatherNote: "Pasco County's flat terrain means drainage is critical. Without properly pitched gutters, water pools around your foundation instead of being directed away.",
    neighborhoods: ["Meadow Pointe", "Seven Oaks", "Wiregrass", "Cypress Creek", "Chapel Pines", "Watergrass"],
    nearbyText: "We also serve Land O' Lakes, Lutz, New Tampa, and surrounding Pasco County.",
  },
  "palm-harbor": {
    name: "Palm Harbor", county: "Pinellas County", slug: "palm-harbor",
    heroH1: "Palm Harbor's Family-Owned",
    heroH1Gold: "Gutter Trade",
    localP: "Palm Harbor's established neighborhoods and tree-lined streets are part of what makes it beautiful, and part of why gutter maintenance matters here. Oak and pine canopies drop debris year-round, and Palm Harbor's proximity to the Gulf means salt air is always a factor. JR One provides aluminum solutions built for exactly these conditions.",
    weatherNote: "Palm Harbor's mature tree canopy means more gutter debris than most Pinellas County communities. Guards and regular maintenance are especially important here.",
    neighborhoods: ["Ozona", "Crystal Beach", "East Lake", "Lansbrook", "Palm Harbor Proper"],
    nearbyText: "We also serve Tarpon Springs, Dunedin, Clearwater, and surrounding areas.",
  },
  riverview: {
    name: "Riverview", county: "Hillsborough County", slug: "riverview",
    heroH1: "Riverview's Family-Owned",
    heroH1Gold: "Gutter & Fascia Trade",
    localP: "Riverview's explosive growth has brought thousands of new homes, many built quickly by volume builders. If your gutters were installed as part of a fast-paced new construction process, they may not have received the attention to pitch, hanger spacing, and material quality that a specialty trade provides. JR One fixes what builders cut corners on and installs new systems built to last.",
    weatherNote: "Riverview's position along the Alafia River means proper drainage is critical for preventing foundation issues and yard erosion.",
    neighborhoods: ["FishHawk", "Riverview Hills", "Boyette", "Summerfield", "Pavilion"],
    nearbyText: "We also serve Brandon, Sun City Center, Ruskin, and surrounding Hillsborough County.",
  },
  "new-port-richey": {
    name: "New Port Richey", county: "Pasco County", slug: "new-port-richey",
    heroH1: "New Port Richey's",
    heroH1Gold: "Aluminum Trade",
    localP: "New Port Richey's mix of waterfront properties and established inland neighborhoods requires gutter and soffit systems that can handle everything from coastal storms to tree debris. JR One serves New Port Richey and western Pasco County with the same Gold Standard approach we bring to every community across Tampa Bay.",
    weatherNote: "Gulf-facing properties in New Port Richey take direct impact from tropical systems. Hurricane-rated fastening and proper gutter sizing aren't optional here.",
    neighborhoods: ["Gulf Harbors", "Beacon Square", "Seven Springs", "Elfers", "Port Richey"],
    nearbyText: "We also serve Spring Hill, Trinity, Tarpon Springs, and surrounding areas.",
  },
  largo: {
    name: "Largo", county: "Pinellas County", slug: "largo",
    heroH1: "Largo's Family-Owned",
    heroH1Gold: "Gutter & Soffit Trade",
    localP: "Largo sits in the heart of Pinellas County: close enough to the Gulf for salt air exposure, dense enough with tree canopy for constant gutter debris, and established enough that many homes have soffit and fascia systems that are well past their lifespan. JR One brings specialty-trade aluminum work to Largo homeowners who want the job done right.",
    weatherNote: "Largo's central Pinellas location means you get both coastal weather and suburban tree coverage, a combination that accelerates gutter and soffit wear.",
    neighborhoods: ["Largo Central", "Belcher", "Seminole", "Ridgecrest", "Oakhurst"],
    nearbyText: "We also serve Clearwater, Pinellas Park, Seminole, St. Petersburg, and surrounding areas.",
  },
  "spring-hill": {
    name: "Spring Hill", county: "Hernando County", slug: "spring-hill",
    heroH1: "Spring Hill's Family-Owned",
    heroH1Gold: "Gutter Trade",
    localP: "Spring Hill's affordable housing and growing community make it an area where quality contractor work is in high demand but not always easy to find. JR One extends our Tampa Bay service area to Spring Hill because homeowners here deserve the same Gold Standard craftsmanship as any other community we serve.",
    weatherNote: "Spring Hill's inland position means intense thunderstorms and heavy seasonal rain without coastal wind relief. Gutters here work hard year-round.",
    neighborhoods: ["Spring Hill Proper", "Timber Pines", "Weeki Wachee", "Brooksville"],
    nearbyText: "We also serve New Port Richey, Land O' Lakes, and surrounding Hernando County.",
  },
  "tarpon-springs": {
    name: "Tarpon Springs", county: "Pinellas County", slug: "tarpon-springs",
    heroH1: "Tarpon Springs' Family-Owned",
    heroH1Gold: "Gutter & Aluminum Trade",
    localP: "Tarpon Springs is famous for its Greek heritage and historic Sponge Docks, with homes ranging from charming waterfront cottages to newer inland developments. Salt air from the Gulf and heavy summer storms put constant stress on gutters, soffit, and fascia, making quality aluminum work essential for preserving both the beauty and structure of Tarpon Springs homes.",
    weatherNote: "Tarpon Springs' direct Gulf exposure means salt-laden winds and driving rain during tropical systems. Corrosion-resistant aluminum and proper fastening are non-negotiable here.",
    neighborhoods: ["Downtown Tarpon Springs", "Sunset Hills", "Anclote", "Whitcomb Bayou"],
    nearbyText: "We also serve Palm Harbor, Dunedin, and New Port Richey.",
  },
  "land-o-lakes": {
    name: "Land O' Lakes", county: "Pasco County", slug: "land-o-lakes",
    heroH1: "Land O' Lakes' Family-Owned",
    heroH1Gold: "Gutter & Soffit Trade",
    localP: "Land O' Lakes is one of Pasco County's fastest-growing areas, with newer construction communities popping up alongside established neighborhoods. Many of these homes were built quickly by volume builders, and the gutter and soffit installations often reflect that pace. JR One brings specialty-trade precision to Land O' Lakes homeowners who want their aluminum work done right the first time.",
    weatherNote: "Pasco County's flat terrain and Land O' Lakes' numerous lakes and wetlands mean drainage is everything. Without properly pitched and sized gutters, water pools around foundations instead of being directed away.",
    neighborhoods: ["Connerton", "Lakeshore Ranch", "Wilderness Lake", "Dupree Lakes", "Lake Padgett"],
    nearbyText: "We also serve Lutz, Wesley Chapel, and New Tampa.",
  },
  dunedin: {
    name: "Dunedin", county: "Pinellas County", slug: "dunedin",
    heroH1: "Dunedin's Family-Owned",
    heroH1Gold: "Aluminum & Gutter Trade",
    localP: "Dunedin's historic downtown, coastal charm, and tree-lined streets make it one of Pinellas County's most desirable communities. Many homes here have character and age, which also means aging soffit, fascia, and gutter systems that need professional replacement. JR One serves Dunedin with the care these homes deserve, upgrading wood systems to durable aluminum that handles Gulf Coast weather.",
    weatherNote: "Dunedin's position between the Gulf and St. Joseph Sound means constant salt air exposure and direct impact from coastal storms. Quality materials and hurricane-rated fastening protect your investment.",
    neighborhoods: ["Downtown Dunedin", "Skinner Boulevard", "Curlew Creek", "Caladesi"],
    nearbyText: "We also serve Clearwater, Palm Harbor, and Tarpon Springs.",
  },
  ruskin: {
    name: "Ruskin", county: "Hillsborough County", slug: "ruskin",
    heroH1: "Ruskin's Family-Owned",
    heroH1Gold: "Gutter & Fascia Trade",
    localP: "Ruskin sits in southern Hillsborough County where agricultural roots meet rapid residential growth. From waterfront properties along Tampa Bay to newer inland developments, homes here need gutter and soffit systems built for Florida's toughest conditions. JR One brings the same Gold Standard craftsmanship to Ruskin that we deliver across all of Tampa Bay.",
    weatherNote: "Ruskin's low-lying terrain along Tampa Bay makes proper water management critical. Heavy seasonal rains combined with high water tables mean your gutters are the first line of defense against foundation and landscape damage.",
    neighborhoods: ["Bahia Beach", "Ruskin Colony", "Sun City Center area", "Apollo Beach"],
    nearbyText: "We also serve Sun City Center, Riverview, and Brandon.",
  },
  "sun-city-center": {
    name: "Sun City Center", county: "Hillsborough County", slug: "sun-city-center",
    heroH1: "Sun City Center's Family-Owned",
    heroH1Gold: "Gutter Installation Trade",
    localP: "Sun City Center is one of Florida's premier active retirement communities, where homeowners take pride in well-maintained properties. Aging gutter systems, deteriorating soffit, and worn fascia don't just look bad, they compromise your home's protection. JR One understands the standards Sun City Center residents expect, and we deliver precise aluminum work that keeps homes protected and looking sharp.",
    weatherNote: "Sun City Center's southern Hillsborough location gets the full force of summer thunderstorms and tropical systems. Reliable gutters aren't optional, they're essential for protecting the home you've invested in.",
    neighborhoods: ["Kings Point", "Freedom Plaza", "Sun City Center proper"],
    nearbyText: "We also serve Ruskin, Riverview, and Brandon.",
  },
  "temple-terrace": {
    name: "Temple Terrace", county: "Hillsborough County", slug: "temple-terrace",
    heroH1: "Temple Terrace's Family-Owned",
    heroH1Gold: "Gutter & Soffit Trade",
    localP: "Temple Terrace is one of Tampa's most established communities, with mature tree canopy and neighborhoods that have been here for decades. That age means many homes are running on original wood soffit and outdated gutter systems that Florida's weather has been punishing for years. JR One replaces failing systems with durable aluminum built to handle what Temple Terrace's climate throws at it.",
    weatherNote: "Temple Terrace's dense tree coverage means constant gutter debris from oaks and pines, while the Hillsborough River corridor adds humidity and drainage challenges that demand properly functioning gutter systems.",
    neighborhoods: ["Temple Crest", "Terrace Walk", "Temple Terrace Golf", "Riverhills"],
    nearbyText: "We also serve Tampa, Brandon, and Lutz.",
  },
  "plant-city": {
    name: "Plant City", county: "Hillsborough County", slug: "plant-city",
    heroH1: "Plant City's Family-Owned",
    heroH1Gold: "Gutter Trade",
    localP: "Plant City, the Strawberry Capital of the World, sits in eastern Hillsborough County where suburban living meets agricultural heritage. Homes here face the same intense Florida weather as the rest of Tampa Bay, and quality gutter and soffit work is essential for protecting your property. JR One extends our Gold Standard service to Plant City because every homeowner deserves specialty-trade aluminum work.",
    weatherNote: "Plant City's inland position puts it squarely in Florida's thunderstorm corridor. Intense afternoon downpours dump massive amounts of water in short bursts, and your gutter system needs to handle the volume without overflow or backup.",
    neighborhoods: ["Walden Lake", "Plantation Oaks", "Downtown Plant City"],
    nearbyText: "We also serve Brandon, Lakeland, and Tampa.",
  },
  lutz: {
    name: "Lutz", county: "Hillsborough/Pasco County", slug: "lutz",
    heroH1: "Lutz's Family-Owned",
    heroH1Gold: "Aluminum & Gutter Trade",
    localP: "Lutz straddles the Hillsborough-Pasco county line, offering a suburban feel with heavy tree canopy and established neighborhoods alongside newer developments. That tree coverage is beautiful but means constant gutter debris, and many older Lutz homes are overdue for soffit and fascia upgrades. JR One serves Lutz with the same precision and thoroughness we bring to every Tampa Bay community.",
    weatherNote: "Lutz's signature oak and pine canopy drops debris year-round, making gutter maintenance and guards especially important. Combined with Florida's heavy seasonal rains, clogged gutters here lead to fascia rot and foundation issues fast.",
    neighborhoods: ["Heritage Isles", "Calusa Trace", "Cheval", "Lake Park"],
    nearbyText: "We also serve Land O' Lakes, Wesley Chapel, and Tampa.",
  },
  "south-tampa": {
    name: "South Tampa", county: "Hillsborough County", slug: "south-tampa",
    heroH1: "South Tampa's Family-Owned",
    heroH1Gold: "Gutter, Soffit & Copper Trade",
    localP: "South Tampa runs from Bayshore Boulevard to Davis Islands, Hyde Park to Beach Park and Palma Ceia: a mix of historic homes with original copper gutters, premium new construction along the water, and HOA-governed neighborhoods that don't accept rushed work. JR One handles all of it: copper restoration on bungalows in Hyde Park, hurricane-rated seamless aluminum on new builds in Beach Park, and architectural-board-compliant soffit work where the review committee scrutinizes every detail.",
    weatherNote: "Bayshore-facing properties take constant salt air plus direct exposure to tropical-system storm surge. Hurricane Idalia and Helene both pushed water into ground floors south of Gandy. Inland South Tampa neighborhoods see the same intense afternoon thunderstorms as the rest of the city. Both demand corrosion-resistant aluminum and proper hurricane-rated fastening, and both reward quality work with much longer system life.",
    neighborhoods: ["Bayshore Boulevard", "Hyde Park", "Davis Islands", "Palma Ceia", "Beach Park", "SoHo", "Bayshore Beautiful", "Sunset Park", "Virginia Park", "Westshore"],
    nearbyText: "We also serve Tampa, Clearwater, St. Petersburg, and surrounding Hillsborough County.",
  },
};

const SERVICES = [
  { icon: "water", title: "Seamless Gutter Installation", desc: "Custom-fabricated on-site for a perfect, leak-free fit.", link: "/seamless-aluminum-gutters" },
  { icon: "shield", title: "Gutter Guards", desc: "Keep debris out and make maintenance easier.", link: "/gutter-guards" },
  { icon: "edge", title: "Soffit & Fascia", desc: "Aluminum and vinyl protection for your roof edge.", link: "/soffit-and-fascia" },
  { icon: "wrench", title: "Gutter Repair", desc: "Fix leaks, sagging, and overflow. Done right the first time.", link: "/gutter-repair" },
  { icon: "ruler", title: "Siding", desc: "Vinyl and aluminum siding built for Florida weather.", link: "/siding" },
  { icon: "broom", title: "Peak 301 Roof Rejuvenation", desc: "Extend your roof's life 6 to 10 years with this soy-based sealant.", link: "/peak-301" },
];

// ══════════════════════════════════════════════════════════
// SPANISH CITY DATA: em-dashes scrubbed; puffery stripped
// ══════════════════════════════════════════════════════════
const CITIES_ES = {
  tampa: {
    heroH1: "Empresa Familiar de Tampa en",
    heroH1Gold: "Canaletas, Sofito y Aluminio",
    localP: "Los propietarios de Tampa enfrentan una combinacion unica de desafios: tormentas intensas en verano, temporada de huracanes, humedad todo el ano y viviendas envejecidas en barrios desde South Tampa hasta New Tampa. Sus canaletas, sofitos y fascias reciben lo peor. JR One es una empresa familiar, operada por la familia, con mas de 30 anos de experiencia familiar en la industria de canaletas en Tampa Bay. Nuestro fundador Javier ha estado instalando canaletas en Tampa personalmente desde 1990, y muchas de las casas que atendemos hoy son las mismas que el trabajo hace decadas.",
    weatherNote: "Tampa recibe un promedio de 51 pulgadas de lluvia al ano, muy por encima del promedio nacional. Ese volumen de agua necesita ir a algun lugar, y si su sistema de canaletas no lo maneja correctamente, sus cimientos, fascias y jardin pagan el precio.",
    nearbyText: "Tambien servimos a Clearwater, St. Petersburg, Brandon, Temple Terrace y comunidades cercanas.",
  },
  clearwater: {
    heroH1: "Empresa Familiar de Clearwater en",
    heroH1Gold: "Canaletas y Sofitos",
    localP: "La ubicacion costera de Clearwater significa que el exterior de su hogar recibe castigo constante del aire salado, tormentas tropicales y exposicion intensa a rayos UV todo el ano. Las canaletas, sofitos y fascias de aluminio son ideales para las condiciones de Clearwater porque resisten la corrosion del aire salado que deteriora materiales inferiores. JR One sirve a Clearwater y todo Pinellas County con la misma precision y dedicacion que llevamos a cada comunidad de Tampa Bay.",
    weatherNote: "La proximidad costera de Clearwater agrega corrosion por aire salado a los desafios estandar de Florida: lluvia intensa, rayos UV y humedad. El aluminio es el material ideal aqui porque maneja todo esto sin degradarse.",
    nearbyText: "Tambien servimos a Palm Harbor, Dunedin, Safety Harbor, Largo y todo Pinellas County.",
  },
  "st-petersburg": {
    heroH1: "Empresa Familiar de St. Petersburg en",
    heroH1Gold: "Aluminio",
    localP: "La mezcla de casas historicas, barrios de mediados de siglo y construccion nueva en St. Petersburg significa que cada trabajo de canaletas y sofitos es diferente. Muchas casas antiguas de St. Pete todavia tienen sofitos y fascias originales de madera que se han deteriorado durante decadas con la humedad de Florida. JR One se enfoca en reemplazar estos sistemas envejecidos con aluminio duradero que protege su hogar y mejora su apariencia.",
    weatherNote: "St. Pete tiene el record Guinness de dias consecutivos de sol: 768 dias. Esa exposicion UV degrada los sofitos y fascias de madera mas rapido de lo que la mayoria de propietarios se imaginan.",
    nearbyText: "Tambien servimos a Gulfport, Pinellas Park, Seminole, Largo y todo Pinellas County.",
  },
  sarasota: {
    heroH1: "Empresa Familiar de Sarasota en",
    heroH1Gold: "Canaletas y Aluminio",
    localP: "Los propietarios de Sarasota invierten en sus propiedades, y esperan contratistas que esten a la altura. JR One sirve a Sarasota con la misma atencion meticulosa al detalle que la comunidad exige. Desde casas frente al agua en los cayos hasta barrios establecidos como Palmer Ranch y Lakewood Ranch, instalamos sistemas de aluminio que funcionan y lucen impecables.",
    weatherNote: "Las tormentas costeras de Sarasota lanzan lluvia de lado, poniendo a prueba canaletas y sofitos de maneras que las casas tierra adentro rara vez experimentan. La inclinacion adecuada de instalacion y la fijacion correcta no son opcionales aqui, son esenciales.",
    nearbyText: "Tambien servimos a Bradenton, Venice, Osprey, North Port y comunidades cercanas.",
  },
  bradenton: {
    heroH1: "Empresa Familiar de Bradenton en",
    heroH1Gold: "Canaletas y Fascias",
    localP: "Bradenton se encuentra en la interseccion del clima costero y el crecimiento suburbano, con barrios que van desde el centro historico hasta desarrollos nuevos en Lakewood Ranch y Parrish. Ya sea que mantenga una casa antigua o equipe una construccion nueva, JR One proporciona el mismo servicio Gold Standard en todo Manatee County.",
    weatherNote: "La posicion de Bradenton sobre el Manatee River y Tampa Bay significa que las casas aqui enfrentan tanto marejadas costeras como inundaciones tierra adentro. Canaletas funcionando correctamente no son solo esteticas, son proteccion estructural.",
    nearbyText: "Tambien servimos a Sarasota, Lakewood Ranch, Anna Maria Island y areas cercanas.",
  },
  lakeland: {
    heroH1: "Empresa Familiar de Lakeland en",
    heroH1Gold: "Instalacion de Canaletas",
    localP: "La ubicacion interior de Lakeland significa que recibe todas las tormentas intensas de la tarde del centro de Florida sin la brisa costera para secar las cosas. La lluvia intensa y la humedad persistente hacen que los sistemas de canaletas de calidad sean esenciales para proteger los cimientos y el exterior de su hogar. JR One lleva artesania de calibre Tampa Bay a cada proyecto en Lakeland.",
    weatherNote: "Lakeland esta en el 'Pasillo de Relampagos' de Florida, una de las regiones con mas actividad de tormentas en el pais. Esas tormentas de la tarde descargan cantidades masivas de agua en periodos cortos, y sus canaletas necesitan manejarlo.",
    nearbyText: "Tambien servimos a Plant City, Brandon, Winter Haven y comunidades cercanas de Polk County.",
  },
  brandon: {
    heroH1: "Empresa Familiar de Brandon en",
    heroH1Gold: "Canaletas y Sofitos",
    localP: "El rapido crecimiento de Brandon en las ultimas dos decadas significa una mezcla de edades de vivienda, desde desarrollos establecidos de los anos 80 hasta construccion nueva. Ambos necesitan sistemas confiables de canaletas y sofitos, pero por diferentes razones. Las casas mas antiguas a menudo tienen sofitos de madera fallando y sistemas de canaletas obsoletos, mientras que las construcciones nuevas necesitan instalacion de calidad desde el primer dia. JR One maneja ambos en la comunidad de Brandon.",
    weatherNote: "Brandon recibe la misma actividad intensa de tormentas que Tampa pero con mas cobertura de arboles suburbanos, lo que significa mas hojas, agujas de pino y escombros en sus canaletas.",
    nearbyText: "Tambien servimos a Riverview, Tampa, Plant City y todo Hillsborough County.",
  },
  "wesley-chapel": {
    heroH1: "Empresa Familiar de Wesley Chapel en",
    heroH1Gold: "Aluminio",
    localP: "Wesley Chapel es una de las comunidades de mas rapido crecimiento en Tampa Bay, con construccion nueva y barrios establecidos lado a lado. JR One sirve a propietarios de Wesley Chapel que quieren su trabajo de canaletas, sofitos y fascias hecho bien, no por el postor mas barato que el constructor pudo encontrar, sino por un equipo familiar con mas de 30 anos en la industria de canaletas en Tampa Bay.",
    weatherNote: "El terreno plano de Pasco County significa que el drenaje es critico. Sin canaletas con la inclinacion adecuada, el agua se acumula alrededor de sus cimientos en lugar de ser dirigida lejos.",
    nearbyText: "Tambien servimos a Land O' Lakes, Lutz, New Tampa y todo Pasco County.",
  },
  "palm-harbor": {
    heroH1: "Empresa Familiar de Palm Harbor en",
    heroH1Gold: "Canaletas",
    localP: "Los barrios establecidos y las calles arboladas de Palm Harbor son parte de lo que lo hace hermoso, y parte de por que el mantenimiento de canaletas importa aqui. Los robles y pinos dejan escombros todo el ano, y la proximidad de Palm Harbor al Golfo significa que el aire salado siempre es un factor. JR One proporciona soluciones de aluminio construidas exactamente para estas condiciones.",
    weatherNote: "El dosel maduro de arboles de Palm Harbor significa mas escombros en las canaletas que la mayoria de las comunidades de Pinellas County. Los protectores y el mantenimiento regular son especialmente importantes aqui.",
    nearbyText: "Tambien servimos a Tarpon Springs, Dunedin, Clearwater y areas cercanas.",
  },
  riverview: {
    heroH1: "Empresa Familiar de Riverview en",
    heroH1Gold: "Canaletas y Fascias",
    localP: "El crecimiento explosivo de Riverview ha traido miles de casas nuevas, muchas construidas rapidamente por constructores de volumen. Si sus canaletas fueron instaladas como parte de un proceso de construccion rapida, puede que no hayan recibido la atencion a la inclinacion, espaciado de ganchos y calidad de material que un oficio especializado proporciona. JR One arregla lo que los constructores hicieron a la ligera e instala sistemas nuevos construidos para durar.",
    weatherNote: "La posicion de Riverview a lo largo del Alafia River significa que el drenaje adecuado es critico para prevenir problemas de cimientos y erosion del jardin.",
    nearbyText: "Tambien servimos a Brandon, Sun City Center, Ruskin y todo Hillsborough County.",
  },
  "new-port-richey": {
    heroH1: "Empresa Familiar en",
    heroH1Gold: "Aluminio en New Port Richey",
    localP: "La mezcla de propiedades frente al agua y barrios interiores establecidos de New Port Richey requiere sistemas de canaletas y sofitos que puedan manejar todo, desde tormentas costeras hasta escombros de arboles. JR One sirve a New Port Richey y el oeste de Pasco County con el mismo enfoque Gold Standard que llevamos a cada comunidad en Tampa Bay.",
    weatherNote: "Las propiedades frente al Golfo en New Port Richey reciben impacto directo de sistemas tropicales. La fijacion con clasificacion de huracan y el dimensionamiento adecuado de canaletas no son opcionales aqui.",
    nearbyText: "Tambien servimos a Spring Hill, Trinity, Tarpon Springs y areas cercanas.",
  },
  largo: {
    heroH1: "Empresa Familiar de Largo en",
    heroH1Gold: "Canaletas y Sofitos",
    localP: "Largo se encuentra en el corazon de Pinellas County: lo suficientemente cerca del Golfo para la exposicion al aire salado, lo suficientemente denso en copa de arboles para escombros constantes en canaletas, y lo suficientemente establecido para que muchas casas tengan sistemas de sofitos y fascias que ya pasaron su vida util. JR One lleva trabajo de aluminio de oficio especializado a propietarios de Largo que quieren el trabajo bien hecho.",
    weatherNote: "La ubicacion central de Largo en Pinellas significa que recibe tanto clima costero como cobertura de arboles suburbanos, una combinacion que acelera el desgaste de canaletas y sofitos.",
    nearbyText: "Tambien servimos a Clearwater, Pinellas Park, Seminole, St. Petersburg y areas cercanas.",
  },
  "spring-hill": {
    heroH1: "Empresa Familiar de Spring Hill en",
    heroH1Gold: "Canaletas",
    localP: "Las viviendas accesibles y la comunidad en crecimiento de Spring Hill hacen de esta un area donde el trabajo de contratistas de calidad tiene alta demanda pero no siempre es facil de encontrar. JR One extiende nuestra area de servicio de Tampa Bay a Spring Hill porque los propietarios aqui merecen la misma artesania Gold Standard que cualquier otra comunidad que servimos.",
    weatherNote: "La posicion interior de Spring Hill significa tormentas intensas y lluvias estacionales fuertes sin alivio del viento costero. Las canaletas aqui trabajan duro todo el ano.",
    nearbyText: "Tambien servimos a New Port Richey, Land O' Lakes y todo Hernando County.",
  },
  "tarpon-springs": {
    heroH1: "Empresa Familiar de Tarpon Springs en",
    heroH1Gold: "Canaletas y Aluminio",
    localP: "Tarpon Springs es famosa por su herencia griega y el historico Sponge Docks, con casas que van desde encantadoras cabanas frente al agua hasta desarrollos interiores mas nuevos. El aire salado del Golfo y las fuertes tormentas de verano ejercen estres constante sobre canaletas, sofitos y fascias, haciendo que el trabajo de aluminio de calidad sea esencial para preservar tanto la belleza como la estructura de las casas de Tarpon Springs.",
    weatherNote: "La exposicion directa al Golfo de Tarpon Springs significa vientos cargados de sal y lluvia intensa durante sistemas tropicales. El aluminio resistente a la corrosion y la fijacion adecuada son innegociables aqui.",
    nearbyText: "Tambien servimos a Palm Harbor, Dunedin y New Port Richey.",
  },
  "land-o-lakes": {
    heroH1: "Empresa Familiar de Land O' Lakes en",
    heroH1Gold: "Canaletas y Sofitos",
    localP: "Land O' Lakes es una de las areas de mas rapido crecimiento de Pasco County, con comunidades de construccion nueva apareciendo junto a barrios establecidos. Muchas de estas casas fueron construidas rapidamente por constructores de volumen, y las instalaciones de canaletas y sofitos a menudo reflejan ese ritmo. JR One lleva precision de oficio especializado a propietarios de Land O' Lakes que quieren su trabajo de aluminio bien hecho desde la primera vez.",
    weatherNote: "El terreno plano de Pasco County y los numerosos lagos y humedales de Land O' Lakes significan que el drenaje lo es todo. Sin canaletas con la inclinacion y tamano adecuados, el agua se acumula alrededor de los cimientos en lugar de ser dirigida lejos.",
    nearbyText: "Tambien servimos a Lutz, Wesley Chapel y New Tampa.",
  },
  dunedin: {
    heroH1: "Empresa Familiar de Dunedin en",
    heroH1Gold: "Aluminio y Canaletas",
    localP: "El centro historico de Dunedin, su encanto costero y sus calles arboladas lo convierten en una de las comunidades mas deseables de Pinellas County. Muchas casas aqui tienen caracter y anos, lo que tambien significa sistemas envejecidos de sofitos, fascias y canaletas que necesitan reemplazo profesional. JR One sirve a Dunedin con el cuidado que estas casas merecen, actualizando sistemas de madera a aluminio duradero que resiste el clima de la Costa del Golfo.",
    weatherNote: "La posicion de Dunedin entre el Golfo y St. Joseph Sound significa exposicion constante al aire salado e impacto directo de tormentas costeras. Materiales de calidad y fijacion con clasificacion de huracan protegen su inversion.",
    nearbyText: "Tambien servimos a Clearwater, Palm Harbor y Tarpon Springs.",
  },
  ruskin: {
    heroH1: "Empresa Familiar de Ruskin en",
    heroH1Gold: "Canaletas y Fascias",
    localP: "Ruskin se encuentra en el sur de Hillsborough County donde las raices agricolas se encuentran con el rapido crecimiento residencial. Desde propiedades frente al agua a lo largo de Tampa Bay hasta desarrollos interiores mas nuevos, las casas aqui necesitan sistemas de canaletas y sofitos construidos para las condiciones mas duras de Florida. JR One lleva la misma artesania Gold Standard a Ruskin que entregamos en todo Tampa Bay.",
    weatherNote: "El terreno bajo de Ruskin a lo largo de Tampa Bay hace que el manejo adecuado del agua sea critico. Las lluvias estacionales fuertes combinadas con niveles freaticos altos significan que sus canaletas son la primera linea de defensa contra danos a cimientos y jardin.",
    nearbyText: "Tambien servimos a Sun City Center, Riverview y Brandon.",
  },
  "sun-city-center": {
    heroH1: "Empresa Familiar de Sun City Center en",
    heroH1Gold: "Instalacion de Canaletas",
    localP: "Sun City Center es una de las principales comunidades de retiro activo de Florida, donde los propietarios se enorgullecen de propiedades bien mantenidas. Sistemas de canaletas envejecidos, sofitos deteriorados y fascias desgastadas no solo lucen mal, comprometen la proteccion de su hogar. JR One entiende los estandares que los residentes de Sun City Center esperan, y entregamos trabajo de aluminio preciso que mantiene las casas protegidas y con buena apariencia.",
    weatherNote: "La ubicacion en el sur de Hillsborough de Sun City Center recibe toda la fuerza de las tormentas de verano y sistemas tropicales. Canaletas confiables no son opcionales, son esenciales para proteger el hogar en el que ha invertido.",
    nearbyText: "Tambien servimos a Ruskin, Riverview y Brandon.",
  },
  "temple-terrace": {
    heroH1: "Empresa Familiar de Temple Terrace en",
    heroH1Gold: "Canaletas y Sofitos",
    localP: "Temple Terrace es una de las comunidades mas establecidas de Tampa, con copa de arboles madura y barrios que han estado aqui por decadas. Esa edad significa que muchas casas funcionan con sofitos originales de madera y sistemas de canaletas obsoletos que el clima de Florida ha castigado por anos. JR One reemplaza sistemas fallando con aluminio duradero construido para manejar lo que el clima de Temple Terrace le lance.",
    weatherNote: "La densa cobertura de arboles de Temple Terrace significa escombros constantes en canaletas de robles y pinos, mientras que el corredor del Hillsborough River agrega humedad y desafios de drenaje que exigen sistemas de canaletas funcionando correctamente.",
    nearbyText: "Tambien servimos a Tampa, Brandon y Lutz.",
  },
  "plant-city": {
    heroH1: "Empresa Familiar de Plant City en",
    heroH1Gold: "Canaletas",
    localP: "Plant City, la Capital Mundial de la Fresa, se encuentra en el este de Hillsborough County donde la vida suburbana se encuentra con la herencia agricola. Las casas aqui enfrentan el mismo clima intenso de Florida que el resto de Tampa Bay, y el trabajo de calidad en canaletas y sofitos es esencial para proteger su propiedad. JR One extiende nuestro servicio Gold Standard a Plant City porque cada propietario merece trabajo de aluminio de oficio especializado.",
    weatherNote: "La posicion interior de Plant City la coloca directamente en el corredor de tormentas de Florida. Los aguaceros intensos de la tarde descargan cantidades masivas de agua en rafagas cortas, y su sistema de canaletas necesita manejar el volumen sin desbordarse.",
    nearbyText: "Tambien servimos a Brandon, Lakeland y Tampa.",
  },
  lutz: {
    heroH1: "Empresa Familiar de Lutz en",
    heroH1Gold: "Aluminio y Canaletas",
    localP: "Lutz se extiende a ambos lados de la linea del condado Hillsborough-Pasco, ofreciendo un ambiente suburbano con gran cobertura de arboles y barrios establecidos junto a desarrollos mas nuevos. Esa cobertura de arboles es hermosa pero significa escombros constantes en canaletas, y muchas casas antiguas de Lutz necesitan actualizaciones de sofitos y fascias. JR One sirve a Lutz con la misma precision y dedicacion que llevamos a cada comunidad de Tampa Bay.",
    weatherNote: "La caracteristica copa de robles y pinos de Lutz deja escombros todo el ano, haciendo que el mantenimiento de canaletas y los protectores sean especialmente importantes. Combinado con las fuertes lluvias estacionales de Florida, canaletas tapadas aqui llevan a pudricion de fascias y problemas de cimientos rapidamente.",
    nearbyText: "Tambien servimos a Land O' Lakes, Wesley Chapel y Tampa.",
  },
  "south-tampa": {
    heroH1: "Empresa Familiar de South Tampa en",
    heroH1Gold: "Canaletas, Sofitos y Cobre",
    localP: "South Tampa va desde Bayshore Boulevard hasta Davis Islands, de Hyde Park a Beach Park y Palma Ceia: una mezcla de casas historicas con canaletas originales de cobre, construccion nueva de alta gama frente al agua, y vecindarios con HOA que no aceptan trabajo apurado. JR One maneja todo: restauracion de cobre en bungalows de Hyde Park, instalacion de canaletas de aluminio sin costura con clasificacion para huracanes en construcciones nuevas de Beach Park, y trabajo de sofitos que cumple con los comites de revision arquitectonica que escudrinan cada detalle.",
    weatherNote: "Las propiedades frente a Bayshore reciben aire salado constante mas exposicion directa a marejadas de sistemas tropicales. Los huracanes Idalia y Helene metieron agua en plantas bajas al sur de Gandy. Los vecindarios interiores de South Tampa ven las mismas tormentas intensas de la tarde que el resto de la ciudad. Ambos exigen aluminio resistente a la corrosion y fijacion con clasificacion para huracanes, y ambos recompensan el trabajo de calidad con vida util mucho mas larga.",
    nearbyText: "Tambien servimos a Tampa, Clearwater, St. Petersburg y comunidades cercanas de Hillsborough County.",
  },
};

const SERVICES_ES = [
  { icon: "water", title: "Instalacion de Canaletas Sin Costura", desc: "Fabricadas a medida en el sitio para un ajuste perfecto sin fugas.", link: "/seamless-aluminum-gutters" },
  { icon: "shield", title: "Protectores de Canaletas", desc: "Mantienen los escombros afuera y facilitan el mantenimiento.", link: "/gutter-guards" },
  { icon: "edge", title: "Sofitos y Fascias", desc: "Proteccion de aluminio y vinilo para el borde de su techo.", link: "/soffit-and-fascia" },
  { icon: "wrench", title: "Reparacion de Canaletas", desc: "Arreglamos fugas, hundimientos y desbordamientos. Bien hecho a la primera.", link: "/gutter-repair" },
  { icon: "ruler", title: "Revestimiento", desc: "Revestimiento de vinilo y aluminio construido para el clima de Florida.", link: "/siding" },
  { icon: "broom", title: "Peak 301 Rejuvenecimiento de Techo", desc: "Extienda la vida de su techo 6 a 10 anos con este sellador a base de soya.", link: "/peak-301" },
];

// ══════════════════════════════════════════════════════════
// UI TRANSLATIONS
// ══════════════════════════════════════════════════════════
const T = {
  en: {
    promoBannerPre: "Serving ",
    promoBannerPost: ". Call (844) 444-3114 for Your Free Quote",
    breadHome: "Home",
    breadAreas: "Service Areas",
    trust: [
      { icon: "family", label: "Family-Owned" },
      { icon: "star", label: "4.9 on Google" },
      { icon: "crew", label: "In-House Crews" },
      { icon: "insured", label: "Fully Insured" },
    ],
    getQuote: "GET YOUR FREE QUOTE",
    callBtn: "CALL (844) 444-3114",
    freeQuoteFor: "Free Quote for ",
    freeQuoteSuffix: " Homeowners",
    received: "Request Received",
    receivedSub: "We'll be in touch within hours.",
    placeName: "Full Name",
    placePhone: "Phone Number",
    placeEmail: "Email Address",
    placeService: "What do you need?",
    placeZip: "ZIP Code",
    serviceOpts: ["What do you need?", "Gutter Installation", "Gutter Repair", "Gutter Guards", "Soffit & Fascia", "Siding", "Peak 301 Roof Rejuvenation", "Other"],
    requestQuote: "REQUEST MY FREE QUOTE",
    noSpam: "No spam. No pressure.",
    whyGutters: "Why Gutters Matter in ",
    servicesEyebrow: "SERVICES IN ",
    servicesTitle: "What We Do in ",
    servicesSub: "Gutters, soffit, fascia, drainage, and Peak 301. Built for Tampa Bay weather.",
    goldEyebrow: "THE GOLD STANDARD",
    goldTitle: "How We Work in ",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num: "01", title: "Assess", desc: "Free on-site inspection. We listen, document everything with photos, and give you an honest evaluation. No pressure." },
      { num: "02", title: "Design", desc: "A custom solution with a detailed, transparent estimate. You see exactly what you're getting." },
      { num: "03", title: "Install", desc: "Our in-house crew handles the installation with precision. We protect your property and clean up like we were never there." },
      { num: "04", title: "Protect", desc: "We walk through the finished work with you, back it with our craftsmanship warranty, and follow up." },
    ],
    neighborhoodsLabel: "Neighborhoods We Serve",
    reviewsEyebrow: "REVIEWS",
    reviewsTitle: "Trusted Across Tampa Bay",
    reviews: [
      { text: "From the very beginning, they worked to ensure I received a fair quote. No high pressure selling. The workmanship was outstanding.", name: "Lois G.", service: "Tampa", stars: 5 },
      { text: "After Milton I called a dozen companies. Only JR One called back. The team showed up and did a perfect job.", name: "Matt D.", service: "Tampa Bay", stars: 5 },
      { text: "Six guys on site with a crew manager. Replaced all soffit and fascia with aluminum, fixed all termite damage. Done in days.", name: "Tampa Homeowner", service: "", stars: 5 },
    ],
    ctaSuffix: " Homeowner? Let's Talk.",
    ctaDesc: "Get your free, no-pressure quote from a family-owned aluminum trade in Tampa Bay. We respond within hours.",
    scrollForm: "SCROLL TO FORM",
    notFound: "City page not found. Available: ",
  },
  es: {
    promoBannerPre: "Sirviendo a ",
    promoBannerPost: ". Llame al (844) 444-3114 para su Cotizacion Gratis",
    breadHome: "Inicio",
    breadAreas: "Areas de Servicio",
    trust: [
      { icon: "family", label: "Empresa Familiar" },
      { icon: "star", label: "4.9 en Google" },
      { icon: "crew", label: "Equipo Propio" },
      { icon: "insured", label: "Totalmente Asegurados" },
    ],
    getQuote: "OBTENGA SU COTIZACION GRATIS",
    callBtn: "LLAMAR AL (844) 444-3114",
    freeQuoteFor: "Cotizacion Gratis para Propietarios en ",
    freeQuoteSuffix: "",
    received: "Solicitud Recibida",
    receivedSub: "Nos comunicaremos con usted en pocas horas.",
    placeName: "Nombre Completo",
    placePhone: "Numero de Telefono",
    placeEmail: "Correo Electronico",
    placeService: "Que necesita?",
    placeZip: "Codigo Postal",
    serviceOpts: ["Que necesita?", "Instalacion de Canaletas", "Reparacion de Canaletas", "Protectores de Canaletas", "Sofitos y Fascias", "Revestimiento", "Peak 301 Rejuvenecimiento de Techo", "Otro"],
    requestQuote: "SOLICITAR MI COTIZACION GRATIS",
    noSpam: "Sin correo basura. Sin presion.",
    whyGutters: "Por Que Importan las Canaletas en ",
    servicesEyebrow: "SERVICIOS EN ",
    servicesTitle: "Lo Que Hacemos en ",
    servicesSub: "Canaletas, sofito, fascia, drenaje y Peak 301. Construido para el clima de Tampa Bay.",
    goldEyebrow: "EL ESTANDAR DE ORO",
    goldTitle: "Como Trabajamos en ",
    goldSub: "Cada hogar. Cada vez. Sin excepciones.",
    goldSteps: [
      { num: "01", title: "Evaluar", desc: "Inspeccion gratuita en su hogar. Escuchamos, documentamos todo con fotos y le damos una evaluacion honesta. Sin presion." },
      { num: "02", title: "Disenar", desc: "Una solucion personalizada con un presupuesto detallado y transparente. Usted ve exactamente lo que recibira." },
      { num: "03", title: "Instalar", desc: "Nuestro equipo capacitado realiza la instalacion con precision. Protegemos su propiedad y limpiamos como si nunca hubieramos estado ahi." },
      { num: "04", title: "Proteger", desc: "Revisamos el trabajo terminado con usted, lo respaldamos con nuestra garantia de calidad y hacemos seguimiento." },
    ],
    neighborhoodsLabel: "Vecindarios que Servimos",
    reviewsEyebrow: "RESENAS",
    reviewsTitle: "De Confianza en Todo Tampa Bay",
    reviews: [
      { text: "Desde el principio, trabajaron para asegurar que recibiera una cotizacion justa. Sin presion de venta. El trabajo fue excepcional.", name: "Lois G.", service: "Tampa", stars: 5 },
      { text: "Despues de Milton llame a una docena de empresas. Solo JR One devolvio la llamada. Hicieron un trabajo perfecto.", name: "Matt D.", service: "Tampa Bay", stars: 5 },
      { text: "Seis personas en el sitio con un gerente de equipo. Reemplazaron todo el sofito y fascia con aluminio, repararon todo el dano de termitas. Hecho en dias.", name: "Propietario de Tampa", service: "", stars: 5 },
    ],
    ctaSuffix: " Propietario? Hablemos.",
    ctaDesc: "Obtenga su cotizacion gratis y sin presion de una empresa familiar de aluminio en Tampa Bay. Respondemos en pocas horas.",
    scrollForm: "IR AL FORMULARIO",
    notFound: "Pagina de ciudad no encontrada. Disponibles: ",
  },
};

const inputStyle = {
  width: "100%",
  padding: "13px 16px",
  fontFamily: "var(--jr-font-body)",
  fontSize: 15,
  border: "1.5px solid #D1D5DB",
  borderRadius: "var(--jr-radius-md)",
  outline: "none",
  color: "var(--jr-ink)",
  background: "#FAFAFA",
  marginBottom: 12,
  transition: "border-color var(--jr-dur-fast) var(--jr-ease-out)",
  boxSizing: "border-box",
};

// ══════════════════════════════════════════════════════════
// CITY PAGE COMPONENT
// ══════════════════════════════════════════════════════════
export default function CityLandingPage({ citySlug = "tampa" }) {
  const { lang } = useLanguage();
  const t = T[lang];
  const city = CITIES[citySlug];
  const cityEs = CITIES_ES[citySlug] || {};
  const servicesData = lang === "es" ? SERVICES_ES : SERVICES;
  const reviews = t.reviews.map((r, i) => ({
    ...r,
    service: i === 2 ? (city ? city.county : r.service) : r.service,
  }));
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", zip: "", service: "" });
  const [submitted, setSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleCityForm = async (e) => {
    e?.preventDefault?.();
    if (!formData.name || !formData.phone) return;
    setFormLoading(true);
    try {
      const params = new URLSearchParams(window.location.search);
      await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          zip: formData.zip,
          page: window.location.pathname,
          city: city.name,
          state: "FL",
          gclid: params.get("gclid") || "",
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
          utm_term: params.get("utm_term") || "",
        }),
      });
    } catch {
      /* ignore network failure, still show received state */
    }
    setSubmitted(true);
    setFormLoading(false);
  };

  if (!city) {
    return (
      <div
        style={{
          padding: "100px 24px",
          textAlign: "center",
          fontFamily: "var(--jr-font-heading)",
          color: "var(--jr-paper)",
          background: "var(--jr-navy)",
        }}
      >
        {t.notFound}
        {Object.keys(CITIES).join(", ")}
      </div>
    );
  }

  return (
    <div style={{ background: "var(--jr-navy)", color: "var(--jr-paper)", minHeight: "100vh" }}>
      <a href="#main" className="jr-skip-link">Skip to content</a>
      <SiteNav promoBanner={t.promoBannerPre + city.name + t.promoBannerPost} />

      <main id="main">
        {/* BREADCRUMB */}
        <div style={{ padding: "var(--jr-space-4) 0 0" }}>
          <Container>
            <nav
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-sm)",
                color: "var(--jr-muted-on-dark)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                flexWrap: "wrap",
              }}
            >
              <a href="/" style={{ color: "var(--jr-muted-on-dark)", textDecoration: "none" }}>
                {t.breadHome}
              </a>
              <span style={{ opacity: 0.5 }}>/</span>
              <span>{t.breadAreas}</span>
              <span style={{ opacity: 0.5 }}>/</span>
              <span style={{ color: "var(--jr-gold)" }}>{city.name}</span>
            </nav>
          </Container>
        </div>

        {/* HERO */}
        <section
          id="city-hero"
          className="jr-noise-bg"
          style={{
            position: "relative",
            padding: "var(--jr-space-12) var(--jr-space-6) var(--jr-space-16)",
            background: "linear-gradient(165deg, var(--jr-navy-deep) 0%, var(--jr-navy) 55%, var(--jr-navy-2) 100%)",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(ellipse at 28% 22%, rgba(200,149,46,0.08) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <Container>
            <div
              className="jr-city-hero-grid"
              style={{
                position: "relative",
                zIndex: 1,
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.85fr)",
                gap: "var(--jr-space-12)",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 14px",
                    background: "var(--jr-gold-pale)",
                    border: "1px solid rgba(200, 149, 46, 0.28)",
                    borderRadius: "var(--jr-radius-sm)",
                    marginBottom: "var(--jr-space-4)",
                    color: "var(--jr-gold)",
                  }}
                >
                  <MapPinIcon size={14} />
                  <span
                    style={{
                      fontFamily: "var(--jr-font-heading)",
                      fontSize: "var(--jr-text-xs)",
                      fontWeight: 700,
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                    }}
                  >
                    {city.name}, FL
                  </span>
                </div>
                <h1
                  style={{
                    fontFamily: "var(--jr-font-heading)",
                    fontSize: "var(--jr-text-4xl)",
                    fontWeight: 800,
                    lineHeight: 1.05,
                    marginBottom: "var(--jr-space-5)",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {lang === "es" && cityEs.heroH1 ? cityEs.heroH1 : city.heroH1}
                  <br />
                  <span style={{ color: "var(--jr-gold)" }}>
                    {lang === "es" && cityEs.heroH1Gold ? cityEs.heroH1Gold : city.heroH1Gold}
                  </span>
                </h1>
                <p
                  style={{
                    fontFamily: "var(--jr-font-body)",
                    fontSize: "var(--jr-text-lg)",
                    color: "var(--jr-cream-2)",
                    lineHeight: 1.7,
                    marginBottom: "var(--jr-space-6)",
                    maxWidth: 600,
                  }}
                >
                  {lang === "es" && cityEs.localP ? cityEs.localP : city.localP}
                </p>
                <div style={{ marginBottom: "var(--jr-space-6)" }}>
                  <TrustLine items={t.trust} />
                </div>
                <div style={{ display: "flex", gap: "var(--jr-space-4)", flexWrap: "wrap" }}>
                  <Button href="#city-form" variant="primary" size="lg" iconRight>
                    {t.getQuote}
                  </Button>
                  <Button href="tel:8444443114" variant="outline" size="lg" iconLeft={<PhoneIcon size={18} />}>
                    {t.callBtn}
                  </Button>
                </div>
              </div>

              {/* QUOTE FORM */}
              <div id="city-form">
                <div
                  style={{
                    background: "var(--jr-paper)",
                    borderRadius: "var(--jr-radius-xl)",
                    padding: "var(--jr-space-8) var(--jr-space-6)",
                    boxShadow: "var(--jr-shadow-form)",
                  }}
                >
                  {submitted ? (
                    <div style={{ textAlign: "center", padding: "var(--jr-space-6) 0" }}>
                      <div style={{ display: "inline-flex", color: "var(--jr-success)", marginBottom: "var(--jr-space-3)" }}>
                        <CheckCircleIcon size={48} />
                      </div>
                      <h2
                        style={{
                          fontFamily: "var(--jr-font-heading)",
                          fontSize: "var(--jr-text-xl)",
                          fontWeight: 700,
                          color: "var(--jr-navy)",
                          marginBottom: "var(--jr-space-2)",
                        }}
                      >
                        {t.received}
                      </h2>
                      <p
                        style={{
                          fontFamily: "var(--jr-font-body)",
                          fontSize: "var(--jr-text-md)",
                          color: "var(--jr-muted-on-light)",
                        }}
                      >
                        {t.receivedSub}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleCityForm}>
                      <h2
                        style={{
                          fontFamily: "var(--jr-font-heading)",
                          fontSize: "var(--jr-text-lg)",
                          fontWeight: 700,
                          color: "var(--jr-navy)",
                          textAlign: "center",
                          marginBottom: "var(--jr-space-1)",
                        }}
                      >
                        {t.freeQuoteFor}
                        {city.name}
                        {t.freeQuoteSuffix}
                      </h2>
                      <div
                        aria-hidden
                        style={{
                          width: 40,
                          height: 3,
                          background: "var(--jr-gold)",
                          borderRadius: 2,
                          margin: "10px auto var(--jr-space-5)",
                        }}
                      />
                      <input
                        aria-label={t.placeName}
                        style={inputStyle}
                        placeholder={t.placeName}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <input
                        aria-label={t.placePhone}
                        style={inputStyle}
                        placeholder={t.placePhone}
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                      <input
                        aria-label={t.placeEmail}
                        style={inputStyle}
                        placeholder={t.placeEmail}
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <select
                        aria-label={t.placeService}
                        style={{ ...inputStyle, cursor: "pointer" }}
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      >
                        {t.serviceOpts.map((o, i) => (
                          <option key={i} value={i === 0 ? "" : o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      <input
                        aria-label={t.placeZip}
                        style={inputStyle}
                        placeholder={t.placeZip}
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        maxLength={5}
                      />
                      <Button type="submit" variant="primary" size="md" fullWidth iconRight disabled={formLoading}>
                        {formLoading ? "..." : t.requestQuote}
                      </Button>
                      <p
                        style={{
                          fontFamily: "var(--jr-font-body)",
                          fontSize: "var(--jr-text-xs)",
                          color: "var(--jr-muted-on-light)",
                          textAlign: "center",
                          marginTop: "var(--jr-space-3)",
                        }}
                      >
                        {t.noSpam}
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* WEATHER NOTE */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-12) 0" }}>
          <Container size="narrow">
            <div
              style={{
                background: "var(--jr-navy)",
                border: "1px solid var(--jr-navy-3)",
                borderRadius: "var(--jr-radius-lg)",
                padding: "var(--jr-space-6) var(--jr-space-7)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "var(--jr-text-md)",
                  fontWeight: 700,
                  color: "var(--jr-gold)",
                  marginBottom: "var(--jr-space-3)",
                  letterSpacing: "0.5px",
                }}
              >
                {t.whyGutters}
                {city.name}
              </h3>
              <p
                style={{
                  fontFamily: "var(--jr-font-body)",
                  fontSize: "var(--jr-text-md)",
                  color: "var(--jr-cream-2)",
                  lineHeight: 1.7,
                }}
              >
                {lang === "es" && cityEs.weatherNote ? cityEs.weatherNote : city.weatherNote}
              </p>
            </div>
          </Container>
        </section>

        {/* SERVICES */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading
              eyebrow={`${t.servicesEyebrow}${city.name.toUpperCase()}`}
              title={`${t.servicesTitle}${city.name}`}
              subtitle={t.servicesSub}
              theme="dark"
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "var(--jr-space-5)",
              }}
            >
              {servicesData.map((svc, i) => (
                <ServiceCard
                  key={i}
                  icon={svc.icon}
                  title={svc.title}
                  desc={svc.desc}
                  href={svc.link}
                  cta={lang === "en" ? "Learn more" : "Mas info"}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* GOLD STANDARD */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading
              eyebrow={t.goldEyebrow}
              title={`${t.goldTitle}${city.name}`}
              subtitle={t.goldSub}
              theme="dark"
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "var(--jr-space-5)",
              }}
            >
              {t.goldSteps.map((step) => (
                <ProcessStep key={step.num} num={step.num} title={step.title} desc={step.desc} />
              ))}
            </div>
          </Container>
        </section>

        {/* NEIGHBORHOODS */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-12) 0" }}>
          <Container size="narrow" style={{ textAlign: "center" }}>
            <h3
              style={{
                fontFamily: "var(--jr-font-heading)",
                fontSize: "var(--jr-text-lg)",
                fontWeight: 700,
                color: "var(--jr-paper)",
                marginBottom: "var(--jr-space-5)",
                letterSpacing: "0.5px",
              }}
            >
              {city.name} {t.neighborhoodsLabel}
            </h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "var(--jr-space-2)",
              }}
            >
              {city.neighborhoods.map((n, i) => (
                <span
                  key={i}
                  style={{
                    padding: "8px 16px",
                    background: "var(--jr-navy-deep)",
                    border: "1px solid var(--jr-navy-3)",
                    borderRadius: "var(--jr-radius-md)",
                    fontFamily: "var(--jr-font-body)",
                    fontSize: "var(--jr-text-sm)",
                    color: "var(--jr-cream-2)",
                  }}
                >
                  {n}
                </span>
              ))}
            </div>
            <p
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-sm)",
                color: "var(--jr-muted-on-dark)",
                marginTop: "var(--jr-space-5)",
              }}
            >
              {lang === "es" && cityEs.nearbyText ? cityEs.nearbyText : city.nearbyText}
            </p>
          </Container>
        </section>

        {/* REVIEWS */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.reviewsEyebrow} title={t.reviewsTitle} theme="dark" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "var(--jr-space-5)",
              }}
            >
              {reviews.map((rev, i) => (
                <ReviewCard key={i} {...rev} />
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section
          style={{
            background: "linear-gradient(180deg, var(--jr-navy) 0%, var(--jr-navy-deep) 100%)",
            padding: "var(--jr-space-20) 0",
            borderTop: "var(--jr-hair-darker)",
          }}
        >
          <Container size="narrow" style={{ textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "var(--jr-font-heading)",
                fontSize: "var(--jr-text-3xl)",
                fontWeight: 700,
                color: "var(--jr-paper)",
                letterSpacing: "0.5px",
                marginBottom: "var(--jr-space-3)",
                textTransform: "uppercase",
              }}
            >
              {city.name}
              {t.ctaSuffix}
            </h2>
            <p
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-lg)",
                lineHeight: 1.65,
                color: "var(--jr-muted-on-dark)",
                maxWidth: 560,
                margin: "0 auto var(--jr-space-8)",
              }}
            >
              {t.ctaDesc}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--jr-space-4)",
                justifyContent: "center",
              }}
            >
              <Button href="tel:8444443114" variant="primary" size="lg" iconLeft={<PhoneIcon size={18} />}>
                {t.callBtn}
              </Button>
              <Button href="#city-form" variant="outline" size="lg" iconRight>
                {t.scrollForm}
              </Button>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
      <MobileCTA scrollTarget="city-form" />

      <style>{`
        @media (max-width: 900px) {
          .jr-city-hero-grid {
            grid-template-columns: 1fr !important;
            gap: var(--jr-space-8) !important;
          }
        }
        ::placeholder { color: #9CA3AF }
        input:focus, select:focus { border-color: var(--jr-gold) !important }
      `}</style>
    </div>
  );
}
