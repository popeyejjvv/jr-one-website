"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import { useLanguage } from "../../lib/LanguageContext";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM — SEAMLESS GUTTERS SERVICE PAGE
   ═══════════════════════════════════════════════════════════ */

const injectFonts = () => {
  if (typeof document === "undefined" || document.querySelector("#jr-fonts")) return;
  const l = document.createElement("link");
  l.id = "jr-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap";
  document.head.appendChild(l);
};

const C = {
  bg: "#0B1628", navy: "#1B2A4A", navyMid: "#243556", navyLight: "#2C3E5A",
  navyFade: "#162033", gold: "#C8952E", goldLight: "#D4A843",
  goldPale: "rgba(200,149,46,0.12)", cream: "#F5F3EF", white: "#FFFFFF",
  offWhite: "#E8E4DC", muted: "#7A8FA8", charcoal: "#2D2D2D",
  success: "#2D8B4E", successDim: "rgba(45,139,78,0.15)",
  accent: "#4A90D9", accentLight: "#6BA3E3", accentPale: "rgba(74,144,217,0.12)",
};
const f = { h: "'Montserrat', sans-serif", b: "'Source Sans 3', sans-serif" };

// ── Reusable pieces ───────────────────────────────────────
const Tag = ({ children }) => (
  <div style={{ display: "inline-block", padding: "6px 16px", background: C.accentPale, borderRadius: "4px", marginBottom: "12px" }}>
    <span style={{ fontFamily: f.h, fontSize: "12px", fontWeight: 700, color: C.accent, letterSpacing: "3px" }}>{children}</span>
  </div>
);
const GoldBar = () => <div style={{ width: "60px", height: "3px", background: `linear-gradient(90deg,${C.accent},${C.accentLight})`, borderRadius: "2px", margin: "16px auto" }} />;
const Stars = ({ n = 5 }) => <span style={{ color: C.accent, fontSize: "14px", letterSpacing: "2px" }}>{"★".repeat(n)}</span>;

const BtnPrimary = ({ children, onClick }) => (
  <button onClick={onClick} style={{ padding: "16px 36px", fontFamily: f.h, fontSize: "14px", fontWeight: 700, letterSpacing: "1.5px", color: C.white, background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, border: "none", borderRadius: "8px", cursor: "pointer", boxShadow: "0 4px 16px rgba(74,144,217,0.3)", transition: "transform 0.15s" }}
    onMouseOver={e => e.target.style.transform = "translateY(-2px)"}
    onMouseOut={e => e.target.style.transform = "none"}>
    {children}
  </button>
);

const BtnOutline = ({ children, href }) => (
  <a href={href} style={{ display: "inline-flex", alignItems: "center", padding: "16px 36px", fontFamily: f.h, fontSize: "14px", fontWeight: 700, letterSpacing: "1.5px", color: C.accent, background: "transparent", border: `2px solid ${C.accent}`, borderRadius: "8px", textDecoration: "none", cursor: "pointer" }}>
    {children}
  </a>
);

const inputStyle = { width: "100%", padding: "13px 16px", fontFamily: f.b, fontSize: "15px", border: "1.5px solid #D1D5DB", borderRadius: "8px", outline: "none", color: C.charcoal, marginBottom: "12px", background: "#FAFAFA", boxSizing: "border-box" };

// ── Translations ─────────────────────────────────────────
const T = {
  en: {
    breadcrumb: ["Home", "Services", "Seamless Aluminum Gutters"],
    heroTag: "SEAMLESS GUTTER INSTALLATION",
    heroH1: "Tampa Bay's Premier",
    heroH1Gold: "Seamless Gutter Systems",
    heroP: "Custom-fabricated on-site for a watertight, perfect fit. Our in-house crews install 6\" and 7\" seamless aluminum gutters that protect your home from Florida's relentless rain — for decades, not seasons.",
    btnEstimate: "GET YOUR FREE ESTIMATE",
    btnCall: "CALL (844) 444-3114",
    problemTag: "THE PROBLEM",
    problemTitle: "WHY GUTTERS MATTER MORE THAN YOU THINK",
    problems: [
      { icon: "🌊", title: "Foundation damage", desc: "Without gutters, rainwater pools around your foundation causing cracks, settling, and costly structural repairs averaging $4,000–$12,000." },
      { icon: "🪵", title: "Fascia and soffit rot", desc: "Uncontrolled water flow saturates your fascia boards and soffit panels, creating rot that spreads behind your walls." },
      { icon: "🌿", title: "Landscape erosion", desc: "Florida's heavy downpours carve trenches through mulch beds, wash away soil, and damage plantings you've invested in." },
      { icon: "🦟", title: "Mosquito breeding", desc: "Standing water from failed or missing gutters creates the perfect breeding ground for mosquitoes — a year-round Florida problem." },
    ],
    solutionTag: "THE JR ONE DIFFERENCE",
    solutionTitle: "HOW JR ONE DOES GUTTERS DIFFERENTLY",
    solutionSub: "Six things we do that most gutter companies don't — or won't.",
    solutions: [
      { title: "Custom-fabricated on your property", desc: "We bring our gutter machine to your home and fabricate each run on-site to the exact measurements. No factory pre-cuts, no splices, no seams that leak. Every piece fits your roofline perfectly." },
      { title: "Two sizes for every situation", desc: "6\" high-capacity systems for homes with standard to large roof areas. 7\" commercial-grade gutters for maximum water handling during Florida storms. We recommend 6\" as the baseline for every Florida home — undersized gutters overflow during summer storms." },
      { title: "Multiple gauge options to fit your needs", desc: "We carry a range of aluminum gauges from standard .027 up to heavy-duty .032, and we help you choose the right one for your home, budget, and weather exposure. Thicker gauges resist denting and last longer — but we'll never upsell you on what you don't need." },
      { title: "Hidden hanger system", desc: "Internal hangers every 24 inches for maximum strength. No ugly spike-and-ferrule showing on the face of your gutters. Cleaner look, stronger hold, longer lifespan." },
      { title: "Precision-pitched for Florida rain", desc: "Every gutter run is pitched at the correct slope for optimal water flow. Incorrect pitch is the #1 cause of gutter overflow and standing water — and it's the mistake subcontracted gutter installers make most often." },
      { title: "40+ color options", desc: "Match your gutters to your trim, fascia, roof, or siding. We carry the full aluminum coil color spectrum so your gutters look intentional, not afterthought." },
    ],
    stats: [
      { value: "3,000+", label: "Gutter installations completed" },
      { value: "20+", label: "Year lifespan on our systems" },
      { value: "40+", label: "Color options available" },
      { value: "24\"", label: "Hidden hanger spacing" },
    ],
    downspoutTitle: "YOUR DOWNSPOUTS, YOUR STYLE",
    downspoutIntro: "Most homeowners don't realize they have options beyond the standard rectangular downspout. We install multiple downspout styles to match your home's look and drainage needs:",
    downspouts: [
      { name: "Standard Rectangular", desc: "The classic — reliable and cost-effective" },
      { name: "Smooth Rectangular", desc: "Sleek, modern look with a flat finish" },
      { name: "Round Downspouts", desc: "Available in 2 sizes — elegant and distinctive" },
      { name: "4×5 Rectangular", desc: "Oversized for maximum water volume" },
      { name: "Box Style Commercial", desc: "Heavy-duty for high-capacity systems" },
      { name: "Rain Chains", desc: "Decorative alternative — visible water flow as a design feature" },
    ],
    downspoutNote: "Ask us about downspout options during your free estimate — the right choice can transform your home's curb appeal.",
    specialtyTitle: "Looking for Something Beyond Standard?",
    specialtyDesc: "We also install half-round, D-style, box, super gutter, and commercial specialty systems. If your home's architecture or water volume demands more than standard seamless gutters, we've got you covered.",
    specialtyBtn: "VIEW SPECIALTY GUTTERS →",
    peakAlert: "FLORIDA INSURANCE ALERT",
    peakTitle: "280% Increase in Non-Renewals — Roof Over 15 Years Old?",
    peakDesc: "restores shingles from the inside out — adds 6–10 years at a fraction of replacement cost, with warranty docs your insurer must accept under FL law.",
    peakBtn: "PEAK 301 INFO →",
    peakRights: "YOUR RIGHTS →",
    goldTag: "THE GOLD STANDARD",
    goldTitle: "OUR GUTTER INSTALLATION PROCESS",
    goldMotto: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num: "01", title: "ASSESS", desc: "We inspect your roofline, measure every run, check your fascia condition, and evaluate your drainage needs." },
      { num: "02", title: "DESIGN", desc: "Custom gutter plan with sizes, downspout placement, color selection, and a transparent line-item estimate." },
      { num: "03", title: "INSTALL", desc: "Our crew fabricates and installs your gutters on-site — typically completed in a single day for most homes." },
      { num: "04", title: "PROTECT", desc: "Final walkthrough, water flow test, cleanup, and our craftsmanship warranty for lasting peace of mind." },
    ],
    reviewTag: "CUSTOMER REVIEWS",
    reviewTitle: "WHAT GUTTER CUSTOMERS SAY",
    reviews: [
      { text: "Chris and his team replaced the gutters on my home with 7\" gutters, changed downspouts to address standing water issues, then installed leaf guards. Very satisfied with the quality of work done and the entire team was very easy to work with.", name: "David K.", context: "7\" Gutter Upgrade + Guards" },
      { text: "Within just a couple of hours, the new gutters were in place. Their attention to detail was impressive. Chris also provided valuable tips on drainage and maintenance around the downspouts.", name: "Arif K.", context: "Full Gutter Installation" },
      { text: "From the very beginning, they worked to ensure I received a fair quote. There was no high pressure selling. They told me exactly what could be salvaged. The workmanship was outstanding.", name: "Lois G.", context: "Gutters & Soffits" },
    ],
    galleryTag: "OUR WORK",
    galleryTitle: "RECENT GUTTER PROJECTS",
    gallerySub: "Real projects. Real homes. Swipe to see our craftsmanship across Tampa Bay.",
    galleryItems: [
      { label: "7\" seamless aluminum — bronze finish, Tampa", tag: "FULL INSTALL" },
      { label: "Downspout reroute — corrected drainage, Clearwater", tag: "REPAIR" },
      { label: "160 LF white gutters + hidden hangers, Sarasota", tag: "FULL INSTALL" },
      { label: "Post-hurricane gutter replacement, Riverview", tag: "STORM DAMAGE" },
      { label: "6\" gutters + leaf guards, St. Petersburg", tag: "INSTALL + GUARDS" },
      { label: "Custom copper accent gutters, South Tampa", tag: "SPECIALTY" },
      { label: "Commercial gutter system, Bradenton", tag: "COMMERCIAL" },
      { label: "Gutter + soffit + fascia combo, Wesley Chapel", tag: "FULL PACKAGE" },
    ],
    galleryViewAll: "VIEW ALL PROJECTS →",
    faqTag: "FAQ",
    faqTitle: "SEAMLESS GUTTER QUESTIONS",
    faqs: [
      { q: "How much do seamless gutters cost in Tampa?", a: "Seamless aluminum gutter installation in Tampa typically ranges from $11–$20 per linear foot, depending on gutter size (6\" or 7\"), accessibility, number of corners, and downspout configuration. Our estimates are detailed and transparent — you see every line item before any work begins." },
      { q: "What's the difference between 6\" and 7\" gutters?", a: "The number refers to the width of the gutter opening. 6\" is our standard recommendation for Florida homes — it handles typical residential water flow plus the extra capacity needed for our heavy rain. 7\" is commercial-grade capacity for maximum water handling during intense storms, large roof areas, or steep pitches. We assess your home and recommend the right size." },
      { q: "How long does gutter installation take?", a: "Most residential gutter installations are completed in a single day. Homes with complex rooflines, multiple stories, or combined gutter and soffit/fascia projects may take 2–3 days. We give you a specific timeline before work begins." },
      { q: "Do seamless gutters really not leak?", a: "Seamless gutters eliminate the horizontal seams where sectional gutters typically fail. The only joints in a seamless system are at corners and downspout connections — and those are sealed with professional-grade sealant. The result is dramatically fewer leak points compared to pre-formed sectional gutters." },
      { q: "What colors are available for seamless gutters?", a: "We offer 40+ color options in our aluminum coil inventory. The most popular choices in Tampa Bay are white, almond, clay, bronze, dark bronze, and black — but we can match virtually any trim or fascia color on your home." },
      { q: "Why not just have my roofer install gutters?", a: "Roofing companies typically subcontract gutter work to the lowest bidder. The result is often incorrect pitch angles, thin-gauge aluminum, visible spike hangers, and poor corner work. We specialize exclusively in aluminum systems — gutters, soffit, fascia — and every installation is performed by our trained in-house crew." },
      { q: "Do you remove old gutters?", a: "Yes. Our installation includes removal of your existing gutter system, inspection of the fascia board underneath, and cleanup of all old materials. If we find damaged fascia during removal, we'll discuss repair options with you before proceeding." },
    ],
    ctaTitle: "READY FOR GUTTERS THAT ACTUALLY LAST?",
    ctaSub: "Get your free, no-pressure gutter assessment. We'll inspect your home, recommend the right system, and give you a transparent estimate — typically within 48 hours.",
    formTitle: "Get Your Free Gutter Estimate",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "REQUEST MY FREE GUTTER ESTIMATE",
    formDisclaimer: "No spam. No pressure. Just honest expert advice.",
    formSuccess: "Quote Request Received!",
    formSuccessSub: "We'll get back to you within hours.",
    preferTalk: "Prefer to talk?",
    stepLabel: "STEP",
  },
  es: {
    breadcrumb: ["Inicio", "Servicios", "Canaletas de Aluminio Sin Costuras"],
    heroTag: "INSTALACION DE CANALETAS SIN COSTURAS",
    heroH1: "El Servicio Premier de Tampa Bay",
    heroH1Gold: "Sistemas de Canaletas Sin Costuras",
    heroP: "Fabricadas a medida en su propiedad para un ajuste perfecto y sin filtraciones. Nuestros equipos propios instalan canaletas de aluminio sin costuras de 6\" y 7\" que protegen su hogar de las lluvias implacables de Florida — por decadas, no temporadas.",
    btnEstimate: "OBTENGA SU ESTIMADO GRATIS",
    btnCall: "LLAME AL (844) 444-3114",
    problemTag: "EL PROBLEMA",
    problemTitle: "POR QUE LAS CANALETAS IMPORTAN MAS DE LO QUE CREE",
    problems: [
      { icon: "🌊", title: "Dano a la fundacion", desc: "Sin canaletas, el agua de lluvia se acumula alrededor de su fundacion causando grietas, asentamiento y reparaciones estructurales costosas de $4,000–$12,000 en promedio." },
      { icon: "🪵", title: "Pudricion de fascia y sofito", desc: "El flujo de agua sin control satura las tablas de fascia y los paneles de sofito, creando pudricion que se extiende detras de sus paredes." },
      { icon: "🌿", title: "Erosion del jardin", desc: "Los aguaceros fuertes de Florida cavan zanjas en los lechos de mulch, arrastran el suelo y danan las plantas en las que ha invertido." },
      { icon: "🦟", title: "Criadero de mosquitos", desc: "El agua estancada por canaletas danadas o faltantes crea el caldo de cultivo perfecto para mosquitos — un problema en Florida todo el ano." },
    ],
    solutionTag: "LA DIFERENCIA JR ONE",
    solutionTitle: "COMO JR ONE HACE LAS CANALETAS DIFERENTE",
    solutionSub: "Seis cosas que hacemos que la mayoria de las empresas de canaletas no hacen — o no quieren hacer.",
    solutions: [
      { title: "Fabricadas a medida en su propiedad", desc: "Llevamos nuestra maquina de canaletas a su hogar y fabricamos cada tramo en el sitio con las medidas exactas. Sin cortes prefabricados, sin empalmes, sin costuras que filtren. Cada pieza se ajusta perfectamente a su linea de techo." },
      { title: "Dos tamanos para cada situacion", desc: "Sistemas de 6\" de alta capacidad para hogares con areas de techo estandar a grandes. Canaletas de 7\" de grado comercial para maximo manejo de agua durante tormentas de Florida. Recomendamos 6\" como minimo para cada hogar en Florida — las canaletas pequenas se desbordan durante las tormentas de verano." },
      { title: "Multiples opciones de calibre para sus necesidades", desc: "Manejamos una variedad de calibres de aluminio desde el estandar .027 hasta el de alta resistencia .032, y le ayudamos a elegir el adecuado para su hogar, presupuesto y exposicion al clima. Los calibres mas gruesos resisten abolladuras y duran mas — pero nunca le venderemos lo que no necesita." },
      { title: "Sistema de soportes ocultos", desc: "Soportes internos cada 24 pulgadas para maxima resistencia. Sin clavos ni ferrulas visibles en la cara de sus canaletas. Mejor apariencia, mayor agarre, mayor vida util." },
      { title: "Inclinacion de precision para la lluvia de Florida", desc: "Cada tramo de canaleta tiene la inclinacion correcta para un flujo de agua optimo. La inclinacion incorrecta es la causa #1 de desbordamiento y agua estancada — y es el error que los instaladores subcontratados cometen con mas frecuencia." },
      { title: "Mas de 40 opciones de color", desc: "Combine sus canaletas con su moldura, fascia, techo o revestimiento. Tenemos el espectro completo de colores de aluminio para que sus canaletas se vean intencionales, no improvisadas." },
    ],
    stats: [
      { value: "3,000+", label: "Instalaciones de canaletas completadas" },
      { value: "20+", label: "Anos de vida util en nuestros sistemas" },
      { value: "40+", label: "Opciones de color disponibles" },
      { value: "24\"", label: "Espaciado de soportes ocultos" },
    ],
    downspoutTitle: "SUS BAJANTES, SU ESTILO",
    downspoutIntro: "La mayoria de los propietarios no saben que tienen opciones mas alla del bajante rectangular estandar. Instalamos multiples estilos de bajantes para combinar con la apariencia y necesidades de drenaje de su hogar:",
    downspouts: [
      { name: "Rectangular Estandar", desc: "El clasico — confiable y economico" },
      { name: "Rectangular Liso", desc: "Aspecto elegante y moderno con acabado plano" },
      { name: "Bajantes Redondos", desc: "Disponibles en 2 tamanos — elegantes y distintivos" },
      { name: "Rectangular 4×5", desc: "Sobredimensionado para maximo volumen de agua" },
      { name: "Estilo Caja Comercial", desc: "Alta resistencia para sistemas de alta capacidad" },
      { name: "Cadenas de Lluvia", desc: "Alternativa decorativa — flujo de agua visible como elemento de diseno" },
    ],
    downspoutNote: "Preguntenos sobre opciones de bajantes durante su estimado gratis — la eleccion correcta puede transformar la apariencia de su hogar.",
    specialtyTitle: "Buscando algo mas alla de lo estandar?",
    specialtyDesc: "Tambien instalamos sistemas de canaletas especiales: media cana, estilo D, caja, super canaleta y sistemas comerciales. Si la arquitectura o el volumen de agua de su hogar exige mas que canaletas estandar, lo tenemos cubierto.",
    specialtyBtn: "VER CANALETAS ESPECIALES →",
    peakAlert: "ALERTA DE SEGUROS DE FLORIDA",
    peakTitle: "Aumento del 280% en No-Renovaciones — Techo de mas de 15 anos?",
    peakDesc: "restaura las tejas desde adentro — agrega 6–10 anos a una fraccion del costo de reemplazo, con documentos de garantia que su aseguradora debe aceptar bajo la ley de FL.",
    peakBtn: "INFO PEAK 301 →",
    peakRights: "SUS DERECHOS →",
    goldTag: "EL ESTANDAR DE ORO",
    goldTitle: "NUESTRO PROCESO DE INSTALACION DE CANALETAS",
    goldMotto: "Cada hogar. Cada vez. Sin excepciones.",
    goldSteps: [
      { num: "01", title: "EVALUAR", desc: "Inspeccionamos su linea de techo, medimos cada tramo, verificamos la condicion de su fascia y evaluamos sus necesidades de drenaje." },
      { num: "02", title: "DISENAR", desc: "Plan de canaletas personalizado con tamanos, ubicacion de bajantes, seleccion de color y un estimado detallado y transparente." },
      { num: "03", title: "INSTALAR", desc: "Nuestro equipo fabrica e instala sus canaletas en el sitio — generalmente completado en un solo dia para la mayoria de los hogares." },
      { num: "04", title: "PROTEGER", desc: "Recorrido final, prueba de flujo de agua, limpieza y nuestra garantia de mano de obra para su tranquilidad duradera." },
    ],
    reviewTag: "RESENAS DE CLIENTES",
    reviewTitle: "LO QUE DICEN NUESTROS CLIENTES DE CANALETAS",
    reviews: [
      { text: "Chris y su equipo reemplazaron las canaletas de mi casa con canaletas de 7\", cambiaron los bajantes para solucionar problemas de agua estancada y luego instalaron protectores de hojas. Muy satisfecho con la calidad del trabajo y todo el equipo fue muy facil de trabajar.", name: "David K.", context: "Mejora de Canaleta 7\" + Protectores" },
      { text: "En solo un par de horas, las nuevas canaletas estaban instaladas. Su atencion al detalle fue impresionante. Chris tambien me dio consejos valiosos sobre drenaje y mantenimiento alrededor de los bajantes.", name: "Arif K.", context: "Instalacion Completa de Canaletas" },
      { text: "Desde el principio, se esforzaron para asegurar que recibiera una cotizacion justa. No hubo presion de venta. Me dijeron exactamente que se podia salvar. La calidad del trabajo fue excepcional.", name: "Lois G.", context: "Canaletas y Sofitos" },
    ],
    galleryTag: "NUESTRO TRABAJO",
    galleryTitle: "PROYECTOS RECIENTES DE CANALETAS",
    gallerySub: "Proyectos reales. Hogares reales. Deslice para ver nuestra calidad en todo Tampa Bay.",
    galleryItems: [
      { label: "Aluminio sin costuras de 7\" — acabado bronce, Tampa", tag: "INSTALACION COMPLETA" },
      { label: "Redireccion de bajante — drenaje corregido, Clearwater", tag: "REPARACION" },
      { label: "160 pies lineales canaletas blancas + soportes ocultos, Sarasota", tag: "INSTALACION COMPLETA" },
      { label: "Reemplazo de canaletas post-huracan, Riverview", tag: "DANO POR TORMENTA" },
      { label: "Canaletas de 6\" + protectores de hojas, St. Petersburg", tag: "INSTALACION + PROTECTORES" },
      { label: "Canaletas de cobre personalizadas, South Tampa", tag: "ESPECIALIDAD" },
      { label: "Sistema de canaletas comercial, Bradenton", tag: "COMERCIAL" },
      { label: "Combo canaleta + sofito + fascia, Wesley Chapel", tag: "PAQUETE COMPLETO" },
    ],
    galleryViewAll: "VER TODOS LOS PROYECTOS →",
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "PREGUNTAS SOBRE CANALETAS SIN COSTURAS",
    faqs: [
      { q: "Cuanto cuestan las canaletas sin costuras en Tampa?", a: "La instalacion de canaletas de aluminio sin costuras en Tampa generalmente oscila entre $11–$20 por pie lineal, dependiendo del tamano de la canaleta (6\" o 7\"), accesibilidad, numero de esquinas y configuracion de bajantes. Nuestros estimados son detallados y transparentes — usted ve cada item antes de que comience cualquier trabajo." },
      { q: "Cual es la diferencia entre canaletas de 6\" y 7\"?", a: "El numero se refiere al ancho de la abertura de la canaleta. 6\" es nuestra recomendacion estandar para hogares en Florida — maneja el flujo de agua residencial tipico mas la capacidad extra necesaria para nuestras lluvias fuertes. 7\" es capacidad de grado comercial para maximo manejo de agua durante tormentas intensas, areas de techo grandes o pendientes pronunciadas. Evaluamos su hogar y recomendamos el tamano correcto." },
      { q: "Cuanto tiempo toma la instalacion de canaletas?", a: "La mayoria de las instalaciones residenciales de canaletas se completan en un solo dia. Hogares con lineas de techo complejas, multiples pisos o proyectos combinados de canaletas y sofito/fascia pueden tomar 2–3 dias. Le damos un plazo especifico antes de comenzar el trabajo." },
      { q: "Las canaletas sin costuras realmente no filtran?", a: "Las canaletas sin costuras eliminan las costuras horizontales donde las canaletas seccionales tipicamente fallan. Las unicas uniones en un sistema sin costuras estan en las esquinas y conexiones de bajantes — y esas se sellan con sellador de grado profesional. El resultado es dramaticamente menos puntos de filtracion comparado con canaletas seccionales prefabricadas." },
      { q: "Que colores estan disponibles para canaletas sin costuras?", a: "Ofrecemos mas de 40 opciones de color en nuestro inventario de bobinas de aluminio. Las opciones mas populares en Tampa Bay son blanco, almendra, arcilla, bronce, bronce oscuro y negro — pero podemos igualar virtualmente cualquier color de moldura o fascia en su hogar." },
      { q: "Por que no dejar que mi techador instale las canaletas?", a: "Las empresas de techado tipicamente subcontratan el trabajo de canaletas al mejor postor. El resultado a menudo es angulos de inclinacion incorrectos, aluminio de calibre delgado, clavos visibles y trabajo deficiente en las esquinas. Nos especializamos exclusivamente en sistemas de aluminio — canaletas, sofito, fascia — y cada instalacion la realiza nuestro equipo interno capacitado." },
      { q: "Remueven las canaletas viejas?", a: "Si. Nuestra instalacion incluye la remocion de su sistema de canaletas existente, inspeccion de la tabla de fascia debajo y limpieza de todos los materiales viejos. Si encontramos fascia danada durante la remocion, discutiremos opciones de reparacion con usted antes de continuar." },
    ],
    ctaTitle: "LISTO PARA CANALETAS QUE REALMENTE DUREN?",
    ctaSub: "Obtenga su evaluacion de canaletas gratis y sin presion. Inspeccionaremos su hogar, recomendaremos el sistema correcto y le daremos un estimado transparente — generalmente dentro de 48 horas.",
    formTitle: "Obtenga Su Estimado Gratis de Canaletas",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal",
    formBtn: "SOLICITAR MI ESTIMADO GRATIS DE CANALETAS",
    formDisclaimer: "Sin spam. Sin presion. Solo consejo honesto de expertos.",
    formSuccess: "Solicitud de Cotizacion Recibida!",
    formSuccessSub: "Nos comunicaremos con usted en pocas horas.",
    preferTalk: "Prefiere hablar?",
    stepLabel: "PASO",
  },
};

// ── Main Component ────────────────────────────────────────
export default function SeamlessGuttersPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", zip: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => { injectFonts(); }, []);

  const sec = { padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" };
  const secTitle = { fontFamily: f.h, fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, letterSpacing: "2px", textAlign: "center", marginBottom: "8px" };

  return (
    <div style={{ background: C.bg, color: C.white, fontFamily: f.b, lineHeight: 1.65, minHeight: "100vh" }}>

      <SiteNav />

      {/* ══ BREADCRUMB ══ */}
      <div style={{ padding: "16px 24px 0", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ fontFamily: f.b, fontSize: "13px", color: C.muted }}>
          {t.breadcrumb.map((item, i) => (
            <span key={i}>
              {i > 0 && <span style={{ margin: "0 8px", opacity: 0.5 }}>/</span>}
              <span style={{ color: i === t.breadcrumb.length - 1 ? C.accent : C.muted, cursor: i < t.breadcrumb.length - 1 ? "pointer" : "default" }}>{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ HERO ══ */}
      <section className="hero-stars" style={{ padding: "60px 24px 80px", maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "48px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 500px", minWidth: "300px" }}>
          <Tag>{t.heroTag}</Tag>
          <h1 style={{ fontFamily: f.h, fontSize: "clamp(32px,5vw,48px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "20px" }}>
            {t.heroH1}<br />
            <span style={{ color: C.accent }}>{t.heroH1Gold}</span>
          </h1>
          <p style={{ fontFamily: f.b, fontSize: "18px", color: C.offWhite, lineHeight: 1.7, marginBottom: "32px", maxWidth: "560px" }}>{t.heroP}</p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <BtnPrimary onClick={() => document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })}>
              {t.btnEstimate}
            </BtnPrimary>
            <BtnOutline href="tel:8444443114">📞 {t.btnCall}</BtnOutline>
          </div>
          <div style={{ display: "flex", gap: "24px", marginTop: "32px", flexWrap: "wrap" }}>
            {t.stats.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: f.h, fontSize: "28px", fontWeight: 800, color: C.accent }}>{s.value}</div>
                <div style={{ fontFamily: f.b, fontSize: "12px", color: C.muted, maxWidth: "100px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THE PROBLEM ══ */}
      <section style={{ background: C.navy, padding: "80px 24px" }}>
        <div style={{ ...sec, padding: 0 }}>
          <div style={{ textAlign: "center" }}>
            <Tag>{t.problemTag}</Tag>
            <h2 style={{ ...secTitle, color: C.white }}>{t.problemTitle}</h2>
            <GoldBar />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "24px", marginTop: "48px" }}>
            {t.problems.map((p, i) => (
              <div key={i} style={{ background: C.navyFade, border: `1px solid ${C.navyLight}`, borderRadius: "12px", padding: "28px", borderLeft: `4px solid ${C.accent}` }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{p.icon}</div>
                <h3 style={{ fontFamily: f.h, fontSize: "17px", fontWeight: 700, color: C.white, marginBottom: "8px" }}>{p.title}</h3>
                <p style={{ fontFamily: f.b, fontSize: "15px", color: C.muted, lineHeight: 1.55 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THE SOLUTION ══ */}
      <section style={{ background: C.bg, padding: "80px 24px" }}>
        <div style={sec}>
          <div style={{ textAlign: "center" }}>
            <Tag>{t.solutionTag}</Tag>
            <h2 style={{ ...secTitle, color: C.white }}>{t.solutionTitle}</h2>
            <GoldBar />
            <p style={{ fontFamily: f.b, fontSize: "17px", color: C.muted, maxWidth: "600px", margin: "0 auto 48px" }}>
              {t.solutionSub}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "20px" }}>
            {t.solutions.map((s, i) => (
              <div key={i} style={{ background: C.navyFade, border: `1px solid ${C.navyLight}`, borderRadius: "12px", padding: "28px", transition: "border-color 0.3s" }}
                onMouseOver={e => e.currentTarget.style.borderColor = C.accent}
                onMouseOut={e => e.currentTarget.style.borderColor = C.navyLight}>
                <div style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 700, color: C.accent, letterSpacing: "2px", marginBottom: "8px" }}>0{i + 1}</div>
                <h3 style={{ fontFamily: f.h, fontSize: "17px", fontWeight: 700, color: C.white, marginBottom: "10px" }}>{s.title}</h3>
                <p style={{ fontFamily: f.b, fontSize: "15px", color: C.muted, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          {/* Downspout Styles Callout */}
          <div style={{ marginTop: "40px", background: `linear-gradient(135deg, ${C.navyFade}, ${C.navy})`, border: `2px solid ${C.accent}`, borderRadius: "16px", padding: "32px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-20px", right: "-20px", fontSize: "120px", opacity: 0.04, transform: "rotate(-15deg)" }}>↓</div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "20px" }}>
              <span style={{ fontSize: "28px" }}>💡</span>
              <div>
                <h3 style={{ fontFamily: f.h, fontSize: "18px", fontWeight: 700, color: C.accent, marginBottom: "4px" }}>{t.downspoutTitle}</h3>
                <p style={{ fontFamily: f.b, fontSize: "15px", color: C.offWhite, lineHeight: 1.6 }}>{t.downspoutIntro}</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginLeft: "44px" }}>
              {t.downspouts.map((ds, i) => (
                <div key={i} style={{ background: "rgba(74,144,217,0.08)", borderRadius: "8px", padding: "12px 16px" }}>
                  <div style={{ fontFamily: f.h, fontSize: "13px", fontWeight: 700, color: C.accent, marginBottom: "4px" }}>{ds.name}</div>
                  <div style={{ fontFamily: f.b, fontSize: "13px", color: C.muted }}>{ds.desc}</div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: f.b, fontSize: "14px", color: C.muted, fontStyle: "italic", marginTop: "16px", marginLeft: "44px" }}>{t.downspoutNote}</p>
          </div>
        </div>
      </section>

      {/* ══ SPECIALTY GUTTERS CALLOUT ══ */}
      <section style={{ background: C.navyFade, padding: "48px 24px", borderTop: `1px solid ${C.navyLight}`, borderBottom: `1px solid ${C.navyLight}` }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div style={{ flex: "1 1 400px" }}>
            <h3 style={{ fontFamily: f.h, fontSize: "20px", fontWeight: 700, color: C.white, marginBottom: "8px" }}>{t.specialtyTitle}</h3>
            <p style={{ fontFamily: f.b, fontSize: "16px", color: C.muted, lineHeight: 1.6 }}>{t.specialtyDesc}</p>
          </div>
          <a href="/specialty-gutters" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", fontFamily: f.h, fontSize: "13px", fontWeight: 700, letterSpacing: "1px", color: C.accent, border: `2px solid ${C.accent}`, borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>{t.specialtyBtn}</a>
        </div>
      </section>

      {/* ══ PEAK 301 CALLOUT ══ */}
      <section style={{background:"linear-gradient(135deg, rgba(177,26,33,0.08), rgba(15,30,54,0.97))",padding:"28px 24px",borderTop:"2px solid #B11A21",borderBottom:"2px solid #B11A21"}}>
        <div style={{maxWidth:"1000px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"20px"}}>
          <div style={{flex:"1 1 500px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}><span style={{fontSize:"16px"}}>⚠️</span><span style={{fontFamily:"'Montserrat', sans-serif",fontSize:"11px",fontWeight:700,color:"#B11A21",letterSpacing:"2px"}}>{t.peakAlert}</span></div>
            <p style={{fontFamily:"'Montserrat', sans-serif",fontSize:"clamp(16px,2.5vw,20px)",fontWeight:800,color:"#FFFFFF",lineHeight:1.3,marginBottom:"6px"}}>{t.peakTitle}</p>
            <p style={{fontFamily:"'Source Sans 3', sans-serif",fontSize:"14px",color:"#7A8FA8",lineHeight:1.5}}><strong style={{color:"#E8E4DC"}}>Peak 301</strong> {t.peakDesc}</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"8px",flexShrink:0}}>
            <a href="/peak-301" style={{padding:"12px 24px",fontFamily:"'Montserrat', sans-serif",fontSize:"12px",fontWeight:700,letterSpacing:"1px",color:"#FFFFFF",background:"linear-gradient(135deg, #B11A21, #D42A2A)",borderRadius:"6px",textDecoration:"none",textAlign:"center",boxShadow:"0 4px 12px rgba(177,26,33,0.3)"}}>{t.peakBtn}</a>
            <a href="/insurance-resource-center" style={{padding:"12px 24px",fontFamily:"'Montserrat', sans-serif",fontSize:"12px",fontWeight:700,letterSpacing:"1px",color:"#B11A21",border:"1.5px solid #B11A21",borderRadius:"6px",textDecoration:"none",textAlign:"center"}}>{t.peakRights}</a>
          </div>
        </div>
      </section>

      {/* ══ THE GOLD STANDARD ══ */}
      <section style={{ background: C.navy, padding: "80px 24px" }}>
        <div style={sec}>
          <div style={{ textAlign: "center" }}>
            <Tag>{t.goldTag}</Tag>
            <h2 style={{ ...secTitle, color: C.white }}>{t.goldTitle}</h2>
            <GoldBar />
            <p style={{ fontFamily: f.b, fontSize: "17px", color: C.offWhite, fontStyle: "italic", maxWidth: "500px", margin: "0 auto 48px" }}>
              {t.goldMotto}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "24px" }}>
            {t.goldSteps.map((step, i) => (
              <div key={i} style={{ background: C.navyFade, border: `1px solid ${C.navyLight}`, borderRadius: "12px", padding: "28px", position: "relative" }}>
                <div style={{ fontFamily: f.h, fontSize: "36px", fontWeight: 800, color: "rgba(74,144,217,0.08)", position: "absolute", top: "16px", right: "20px" }}>{step.num}</div>
                <div style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 700, color: C.accent, letterSpacing: "3px", marginBottom: "8px" }}>{t.stepLabel} {step.num}</div>
                <h3 style={{ fontFamily: f.h, fontSize: "22px", fontWeight: 700, color: C.white, marginBottom: "12px" }}>{step.title}</h3>
                <p style={{ fontFamily: f.b, fontSize: "15px", color: C.muted, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ REVIEWS ══ */}
      <section style={{ background: C.bg, padding: "80px 24px" }}>
        <div style={sec}>
          <div style={{ textAlign: "center" }}>
            <Tag>{t.reviewTag}</Tag>
            <h2 style={{ ...secTitle, color: C.white }}>{t.reviewTitle}</h2>
            <GoldBar />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "20px", marginTop: "48px" }}>
            {t.reviews.map((rev, i) => (
              <div key={i} style={{ background: C.navyFade, border: `1px solid ${C.navyLight}`, borderRadius: "12px", padding: "28px" }}>
                <Stars />
                <p style={{ fontFamily: f.b, fontSize: "15px", color: C.offWhite, lineHeight: 1.65, margin: "16px 0", fontStyle: "italic" }}>"{rev.text}"</p>
                <div style={{ borderTop: `1px solid ${C.navyLight}`, paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: f.h, fontSize: "14px", fontWeight: 600, color: C.white }}>{rev.name}</span>
                  <span style={{ fontFamily: f.b, fontSize: "12px", color: C.muted }}>{rev.context}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECT GALLERY ══ */}
      <section style={{ background: C.navy, padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <Tag>{t.galleryTag}</Tag>
          <h2 style={{ ...secTitle, color: C.white }}>{t.galleryTitle}</h2>
          <GoldBar />
          <p style={{ fontFamily: f.b, fontSize: "17px", color: C.muted, maxWidth: "600px", margin: "0 auto 40px" }}>
            {t.gallerySub}
          </p>
        </div>
        <div style={{ maxWidth: "1200px", margin: "0 auto", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "thin" }}>
          <div style={{ display: "flex", gap: "16px", paddingBottom: "16px", minWidth: "max-content" }}>
            {t.galleryItems.map((photo, i) => (
              <div key={i} style={{ width: "280px", flexShrink: 0, borderRadius: "12px", overflow: "hidden", border: `1px solid ${C.navyLight}`, background: C.navyFade }}>
                <div style={{ width: "280px", height: "200px", background: `linear-gradient(135deg, ${i % 2 === 0 ? C.navyFade : C.navyLight}, ${i % 2 === 0 ? C.navyLight : C.navyMid})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span style={{ fontFamily: f.h, fontSize: "32px" }}>📸</span>
                  <div style={{ position: "absolute", top: "10px", left: "10px", padding: "4px 10px", background: C.navy, borderRadius: "4px" }}>
                    <span style={{ fontFamily: f.h, fontSize: "10px", fontWeight: 700, color: C.accent, letterSpacing: "1px" }}>{photo.tag}</span>
                  </div>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <p style={{ fontFamily: f.b, fontSize: "13px", color: C.muted, lineHeight: 1.4 }}>{photo.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <span style={{ fontFamily: f.h, fontSize: "13px", fontWeight: 600, color: C.accent, letterSpacing: "1px", cursor: "pointer" }}>{t.galleryViewAll}</span>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ background: C.bg, padding: "80px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <Tag>{t.faqTag}</Tag>
          <h2 style={{ ...secTitle, color: C.white }}>{t.faqTitle}</h2>
          <GoldBar />
          <div style={{ marginTop: "40px", textAlign: "left" }}>
            {t.faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.navyLight}` }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "20px 0", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontFamily: f.h, fontSize: "15px", fontWeight: 600, color: openFaq === i ? C.accent : C.white, textAlign: "left", transition: "color 0.2s" }}>{faq.q}</span>
                  <span style={{ fontFamily: f.h, fontSize: "20px", color: C.accent, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.3s", flexShrink: 0 }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 0 20px", fontFamily: f.b, fontSize: "15px", color: C.muted, lineHeight: 1.65 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ QUOTE FORM CTA ══ */}
      <section id="quote-form" style={{ background: `linear-gradient(165deg,${C.navy},${C.navyMid})`, padding: "80px 24px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: f.h, fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, color: C.white, marginBottom: "12px" }}>{t.ctaTitle}</h2>
          <p style={{ fontFamily: f.b, fontSize: "17px", color: C.offWhite, marginBottom: "40px" }}>{t.ctaSub}</p>

          {submitted ? (
            <div style={{ background: C.successDim, border: `1px solid ${C.success}`, borderRadius: "12px", padding: "32px" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>✓</div>
              <h3 style={{ fontFamily: f.h, fontSize: "20px", fontWeight: 700, color: "#4ADE80" }}>{t.formSuccess}</h3>
              <p style={{ fontFamily: f.b, fontSize: "15px", color: C.muted, marginTop: "8px" }}>{t.formSuccessSub}</p>
            </div>
          ) : (
            <div style={{ background: C.white, borderRadius: "16px", padding: "32px", boxShadow: "0 24px 80px rgba(0,0,0,0.4)", textAlign: "left" }}>
              <h3 style={{ fontFamily: f.h, fontSize: "18px", fontWeight: 700, color: C.navy, textAlign: "center", marginBottom: "4px" }}>{t.formTitle}</h3>
              <div style={{ width: "40px", height: "3px", background: C.accent, borderRadius: "2px", margin: "10px auto 20px" }} />
              <input style={inputStyle} placeholder={t.formName} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <input style={inputStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              <input style={inputStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <input style={inputStyle} placeholder={t.formZip} value={formData.zip} onChange={e => setFormData({ ...formData, zip: e.target.value })} maxLength={5} />
              <button onClick={() => setSubmitted(true)} style={{ width: "100%", padding: "16px", fontFamily: f.h, fontSize: "14px", fontWeight: 700, letterSpacing: "1.5px", color: C.white, background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, border: "none", borderRadius: "8px", cursor: "pointer", boxShadow: "0 4px 16px rgba(74,144,217,0.3)" }}>
                {t.formBtn}
              </button>
              <p style={{ fontFamily: f.b, fontSize: "12px", color: "#9CA3AF", textAlign: "center", marginTop: "12px" }}>{t.formDisclaimer}</p>
            </div>
          )}

          <div style={{ marginTop: "32px" }}>
            <p style={{ fontFamily: f.b, fontSize: "15px", color: C.muted, marginBottom: "8px" }}>{t.preferTalk}</p>
            <a href="tel:8444443114" style={{ fontFamily: f.h, fontSize: "18px", fontWeight: 700, color: "#C8952E", textDecoration: "none" }}>📞 (844) 444-3114</a>
          </div>
        </div>
      </section>

      <SiteFooter />

      <MobileCTA scrollTarget="quote-form" />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::placeholder { color: #9CA3AF; }
        input:focus { border-color: ${C.accent} !important; }
      `}</style>
    </div>
  );
}
