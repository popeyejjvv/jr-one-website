"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM / 7-INCH GUTTERS SERVICE PAGE
   Brand-brain compliant. Design-elevated.
   ═══════════════════════════════════════════════════════════ */

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { useLeadGuard } from "../../lib/lead-guard";
import { submitLeadForm, SUBMIT_ERROR_STYLE } from "../../lib/lead-submit";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import CTABand from "../../components/ui/CTABand";
import ProcessStep from "../../components/ui/ProcessStep";
import ReviewCard from "../../components/ui/ReviewCard";
import FAQAccordion from "../../components/ui/FAQAccordion";
import Peak301Alert from "../../components/ui/Peak301Alert";
import { CheckCircleIcon, PhoneIcon } from "../../lib/icons";

const T = {
  en: {
    breadcrumb: ["Home", "Services", "7-Inch Gutters"],
    heroTag: "OVERSIZED 7-INCH SEAMLESS GUTTERS",
    heroH1: "When 6 Inches Isn't Enough.",
    heroH1Gold: "Go Commercial-Grade on Your Home.",
    heroP: "7-inch seamless aluminum gutters deliver roughly 40% more water capacity than standard 6-inch systems. The right spec for South Tampa luxury homes, steep-pitch roofs, large roof areas, and any home where 6-inch gutters already overflow during Florida storms.",
    btnEstimate: "GET YOUR 7-INCH ESTIMATE",
    btnCall: "(844) 444-3114",
    problemTag: "WHY 6 INCHES OVERFLOWS",
    problemTitle: "When Standard Gutters Can't Keep Up",
    problems: [
      // "50+" corrected to "about 50" on 2026-08-08. The NOAA/NCEI 1991-2020
      // annual precipitation normal for Tampa Intl is 49.48 inches, which is
      // under fifty, so the plus sign was the defect. Value and source recorded
      // in lib/climate-stats.js.
      { title: "Florida rain is not average rain", desc: "Tampa averages about 50 inches of rain a year and drops a disproportionate share of it in violent afternoon bursts. A standard 6-inch K-style gutter is spec'd for normal rainfall, not summer storms that dump 2 inches in 30 minutes." },
      { title: "Steep roofs accelerate water", desc: "The steeper your roof pitch, the faster water hits the gutter, and the more capacity you need to keep it in the channel instead of pouring over the front edge. South Tampa's higher-pitch luxury roofs overrun 6-inch gutters regularly." },
      { title: "Large roof areas equal large water volume", desc: "A 4,000 sqft home sheds nearly double the water of a 2,000 sqft home during the same storm. Using the same gutter size on both is guaranteed overflow on the larger house." },
      { title: "Overflow damage is expensive", desc: "A gutter that can't keep up pours water exactly where you don't want it. At the foundation, against the fascia, into the soffit, through the landscape. Fixing water damage dwarfs the upcharge for the right-sized gutter." },
    ],
    solutionTag: "THE 7-INCH ADVANTAGE",
    solutionTitle: "What You Get with a 7-Inch Upgrade",
    solutionSub: "Commercial-grade water capacity on a residential installation. Same aesthetic, dramatically more performance.",
    solutions: [
      { emoji: "💧", title: "About 40% more water capacity", desc: "A 7-inch K-style gutter moves roughly 40% more water than a standard 6-inch. Not a small gain. That headroom is the difference between a gutter that flows during a storm and a gutter that pours water over the front edge." },
      { emoji: "🏠", title: "Fewer downspouts, cleaner look", desc: "Because each run handles more water, a 7-inch system often needs fewer downspouts than a 6-inch system on the same home. The front of the house looks cleaner with fewer downspouts breaking up the facade." },
      { emoji: "📐", title: "Matches larger downspout options", desc: "7-inch gutters pair with 4x5 rectangular or oversized round downspouts, moving far more water than the standard 3x4 downspout on a 6-inch system. End-to-end capacity, not just a bigger opening." },
      { emoji: "🏗️", title: "Still seamless, still on-site fabricated", desc: "We bring the gutter machine to your home and fabricate 7-inch runs on-site. Same seamless, no-splice construction as our 6-inch installations. No factory joints, no horizontal seams." },
      { emoji: "🔧", title: "Hidden hangers every 24 inches", desc: "A heavier gutter with more water volume needs stronger support. 7-inch installs get our standard hidden-hanger system every 24 inches. No exposed spikes on the face, better hold on the fascia." },
      { emoji: "🎨", title: "Wide color selection, no visual hit", desc: "Same aluminum coil color spectrum as 6-inch gutters, and the exact palette varies by product and by supplier. The 7-inch profile is slightly larger but still residential-appropriate. Most homeowners can't tell at a glance. The performance difference is what you notice." },
    ],
    stats: [
      { value: "~40%", label: "More capacity vs 6-inch" },
      { value: "20-30", label: "Year system lifespan" },
      { value: "Custom", label: "Color matched to your home" },
      { value: "24\"", label: "Hidden hanger spacing" },
    ],
    scopeEyebrow: "WHEN 7-INCH IS RIGHT",
    scopeTitle: "Homes That Actually Need Oversized Gutters",
    scopeSub: "7-inch isn't for every home. For these it's the right spec. We'll tell you honestly during the walkthrough.",
    scopeItems: [
      { emoji: "🏠", title: "South Tampa Luxury Homes", desc: "Large roof areas, steep pitches, and landscaping that can't tolerate overflow. The home's scale and the cost of water damage both argue for commercial-grade capacity." },
      { emoji: "📐", title: "Steep-Pitch Roofs", desc: "Steep pitches move water to the gutter fast. If your home has a high-pitch roof and you see overflow during summer storms, 7-inch is the fix. Not more downspouts on the same 6-inch system." },
      { emoji: "🏗️", title: "Large Roof Areas (3,500+ sqft)", desc: "Homes above roughly 3,500 sqft of roof area shed enough water in a Florida storm that 6-inch gutters are at or past their capacity limit. 7-inch gives real headroom." },
      { emoji: "💧", title: "Homes with Existing Overflow Issues", desc: "If your current 6-inch gutters overflow during storms even when clean, you don't need more cleaning. You need more capacity. 7-inch solves what no amount of maintenance can." },
      { emoji: "🎨", title: "Custom & Architectural Homes", desc: "Custom builds with complex rooflines, multi-plane roofs, or unusual geometry often concentrate water at specific gutter runs. 7-inch handles those concentration zones without overflow." },
      { emoji: "🔧", title: "Replacement Upgrades", desc: "Replacing aging builder-grade or 6-inch gutters is the perfect moment to upgrade to 7-inch. Installation cost is already in play, marginal upcharge is modest, and you get 20+ years of headroom capacity." },
    ],
    callToWalkTitle: "Most Tampa homes do fine with 6-inch. When they don't, it's obvious.",
    callToWalkDesc: "If your home is under 3,000 sqft of roof area with a moderate pitch and no current overflow, 6-inch is the right call. If you're above that, or you already see overflow, 7-inch pays for itself in avoided water damage. We'll tell you which you are during the free walkthrough.",
    callToWalkLabel: "7-INCH VS 6-INCH",
    callToWalkBtn: "Call (844) 444-3114",
    goldEyebrow: "THE GOLD STANDARD",
    goldTitle: "Our 7-Inch Installation Process",
    goldSub: "The right size. The right install. Every home, every time.",
    goldSteps: [
      { num: "01", title: "Assess", desc: "Free walkthrough. We measure roof area, check pitch, count downspouts, and evaluate any overflow evidence. We'll give you an honest 6 vs 7 recommendation. We don't upsell for its own sake." },
      { num: "02", title: "Design", desc: "Custom 7-inch plan: gutter runs, downspout placement and sizing (4x5 rectangular or oversized round), color selection, and transparent line-item estimate." },
      { num: "03", title: "Install", desc: "Crew brings the gutter machine to your home and fabricates 7-inch seamless runs on-site. Hidden hangers every 24 inches. Pitch calibrated for proper flow. Typically done in a single day." },
      { num: "04", title: "Test & Protect", desc: "Final walkthrough, water flow test to confirm capacity, cleanup of the install, and craftsmanship warranty. You see the capacity difference on the first real storm." },
    ],
    reviewEyebrow: "REVIEWS",
    reviewTitle: "What 7-Inch Customers Say",
    reviews: [
      { text: "Chris and his team replaced the gutters on my home with 7-inch gutters, changed downspouts to address standing water issues, then installed leaf guards. Very satisfied with the quality of work and the entire team was very easy to work with.", name: "David K.", service: "7-Inch Upgrade + Guards", stars: 5 },
      { text: "Our 6-inch gutters were overflowing during every summer storm. JR One recommended 7-inch after walking the roof. The upcharge was reasonable and we haven't had a single overflow since.", name: "South Tampa Owner", service: "6-to-7 Inch Upgrade", stars: 5 },
      { text: "Big home, steep roof, expensive landscape. The 7-inch system keeps water off my beds during the worst downpours. Money well spent.", name: "Homeowner", service: "Custom 4,500 sqft Home", stars: 5 },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "7-Inch Gutter Questions",
    faqs: [
      { q: "How much more do 7-inch gutters cost than 6-inch?", a: "The per-linear-foot upcharge is modest. Typically 20 to 35% more than 6-inch, depending on gauge, color, and downspout spec. On a typical home the total project upcharge is a few hundred dollars, not thousands. Exact numbers in the estimate." },
      { q: "Will 7-inch gutters look oversized on my house?", a: "On most homes, no. The profile is slightly taller than a 6-inch gutter but the difference is subtle from the ground. Most homeowners can't tell at a glance. On very small cottage-scale homes the proportion can look heavy. We'll flag that during the walkthrough if it applies to your home." },
      { q: "Do 7-inch gutters need special downspouts?", a: "They pair best with 4x5 rectangular downspouts or oversized round downspouts. Not the standard 3x4. Using a 3x4 downspout on a 7-inch gutter defeats the point of the upgrade. The full system matters, not just the channel size." },
      { q: "Can you upgrade my existing 6-inch gutters to 7-inch?", a: "Yes. The existing 6-inch gutters are removed and new 7-inch seamless runs are fabricated on-site. The fascia is inspected during removal. If anything needs repair we'll flag it before install. Typical upgrade is completed in a single day." },
      { q: "When is 7-inch the wrong call?", a: "For smaller single-story homes with moderate roof area, moderate pitch, and no current overflow, 6-inch is already the right spec. Upgrading to 7-inch is an unnecessary cost. We'll tell you honestly during the walkthrough if 6-inch is what you actually need." },
      { q: "Does 7-inch handle hurricane-level rain?", a: "Better than 6-inch. But no gutter fully handles a hurricane's worst rain bursts. 7-inch gives you significant headroom over 6-inch, meaning overflow happens less often and water damage risk is materially lower. No gutter is a substitute for proper drainage, guards on tree-covered homes, or post-storm cleaning." },
      { q: "What colors are available in 7-inch?", a: "The same wide selection as 6-inch. We run the same aluminum coil inventory. White, almond, clay, bronze, dark bronze, black, and custom matches for trim or fascia. The exact palette varies by product and by supplier, so we bring samples to the estimate." },
    ],
    ctaTitle: "READY TO UPGRADE TO 7-INCH?",
    ctaSub: "Get a free walkthrough. We'll measure your roof, check for overflow evidence, and give you an honest 6 vs 7 recommendation.",
    formTitle: "Get Your 7-Inch Estimate",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "Property ZIP Code",
    formBtn: "Request My 7-Inch Estimate",
    formDisclaimer: "No spam. No pressure. Honest 6 vs 7 assessment.",
    formSuccess: "Estimate Request Received",
    formSuccessSub: "We'll get back to you within hours.",
    preferTalk: "Prefer to talk?",
  },
  es: {
    breadcrumb: ["Inicio", "Servicios", "Canaletas de 7 Pulgadas"],
    heroTag: "CANALETAS SIN COSTURAS DE 7 PULGADAS",
    heroH1: "Cuando 6 Pulgadas No Es Suficiente.",
    heroH1Gold: "Vaya Grado Comercial en su Hogar.",
    heroP: "Las canaletas de aluminio sin costura de 7 pulgadas entregan aproximadamente 40% más capacidad de agua que los sistemas estándar de 6 pulgadas. La especificación correcta para casas de lujo de South Tampa, techos de pendiente fuerte, áreas de techo grandes y cualquier casa donde las canaletas de 6\" ya se desbordan.",
    btnEstimate: "OBTENGA SU ESTIMADO DE 7\"",
    btnCall: "(844) 444-3114",
    problemTag: "POR QUÉ 6 PULGADAS SE DESBORDA",
    problemTitle: "Cuando las Canaletas Estándar No Aguantan",
    problems: [
      // Igual que la versión en inglés, corregido el 2026-08-08: la normal de
      // precipitacion anual de NOAA/NCEI 1991-2020 para Tampa Intl es de 49.48
      // pulgadas, o sea menos de cincuenta. Fuente en lib/climate-stats.js.
      { title: "La lluvia de Florida no es lluvia promedio", desc: "Tampa promedia unas 50 pulgadas al año y deja una parte desproporcionada en ráfagas violentas de la tarde. Una canaleta estándar de 6\" K-style está especificada para lluvia normal, no tormentas que caen 2 pulgadas en 30 minutos." },
      { title: "Techos empinados aceleran el agua", desc: "Mientras más empinado el techo, más rápido llega el agua a la canaleta, y más capacidad necesita. Los techos de lujo de mayor pendiente en South Tampa sobrecargan canaletas de 6\" regularmente." },
      { title: "Áreas de techo grandes equivalen a gran volumen", desc: "Una casa de 4,000 sqft descarga casi el doble que una de 2,000 sqft en la misma tormenta. Usar el mismo tamaño de canaleta en ambas garantiza desbordamiento en la casa grande." },
      { title: "Daño por desbordamiento es caro", desc: "Una canaleta que no aguanta vierte agua exactamente donde no la quiere. En la fundación, contra la fascia, al sofito. Arreglar el daño empequeneeece el sobrecosto de la canaleta correcta." },
    ],
    solutionTag: "LA VENTAJA DE 7 PULGADAS",
    solutionTitle: "Lo Que Obtiene con un Upgrade a 7\"",
    solutionSub: "Capacidad grado comercial en instalación residencial. Misma estética, rendimiento dramáticamente superior.",
    solutions: [
      { emoji: "💧", title: "Cerca de 40% más capacidad de agua", desc: "Una canaleta K-style de 7\" mueve aproximadamente 40% más agua que una estándar de 6\". No una ganancia pequeña. Ese margen es la diferencia entre una canaleta que fluye durante una tormenta y una que vierte agua sobre el borde." },
      { emoji: "🏠", title: "Menos bajantes, apariencia más limpia", desc: "Porque cada tramo maneja más agua, un sistema de 7\" a menudo necesita menos bajantes que uno de 6\" en la misma casa. El frente de la casa se ve más limpio." },
      { emoji: "📐", title: "Combina con bajantes más grandes", desc: "Las canaletas de 7\" se emparejan con bajantes rectangulares de 4x5 o redondos de tamaño mayor, moviendo mucho más agua que el bajante 3x4 estándar. Capacidad de extremo a extremo." },
      { emoji: "🏗️", title: "Aún sin costuras, aún fabricadas en sitio", desc: "Llevamos la máquina de canaletas a su casa y fabricamos los tramos de 7\" en sitio. Misma construcción sin empalmes. Sin juntas de fábrica, sin costuras horizontales." },
      { emoji: "🔧", title: "Soportes ocultos cada 24 pulgadas", desc: "Una canaleta más pesada con más volumen necesita mayor soporte. Las instalaciones de 7\" usan nuestro sistema estándar de soportes ocultos cada 24\"." },
      { emoji: "🎨", title: "Amplia selección de colores, sin impacto visual", desc: "Mismo espectro de colores de aluminio que 6\", y la paleta exacta varía según el producto y el proveedor. El perfil de 7\" es ligeramente mayor pero aún residencial. La mayoría de dueños no lo nota a simple vista." },
    ],
    stats: [
      { value: "~40%", label: "Más capacidad vs 6\"" },
      { value: "20-30", label: "Años de vida útil" },
      { value: "A medida", label: "Color combinado con su casa" },
      { value: "24\"", label: "Espaciado de soportes" },
    ],
    scopeEyebrow: "CUANDO 7\" ES CORRECTO",
    scopeTitle: "Casas que Realmente Necesitan 7\"",
    scopeSub: "7\" no es para cada casa. Para estas es la especificación correcta. Le diremos honestamente durante el recorrido.",
    scopeItems: [
      { emoji: "🏠", title: "Casas de Lujo en South Tampa", desc: "Áreas de techo grandes, pendientes fuertes y paisajismo que no tolera desbordamiento. La escala de la casa y el costo del daño por agua ambos argumentan por capacidad grado comercial." },
      { emoji: "📐", title: "Techos de Pendiente Fuerte", desc: "Las pendientes fuertes mueven el agua rápido. Si su casa tiene techo empinado y ve desbordamiento en tormentas, 7\" es el arreglo. No más bajantes en el mismo sistema de 6\"." },
      { emoji: "🏗️", title: "Áreas Grandes (3,500+ sqft)", desc: "Casas sobre 3,500 sqft de techo descargan suficiente agua en una tormenta de Florida que 6\" está en o pasado su límite. 7\" da margen real." },
      { emoji: "💧", title: "Casas con Desbordamiento", desc: "Si sus canaletas actuales de 6\" se desbordan en tormentas aún limpias, no necesita más limpieza. Necesita más capacidad. 7\" resuelve lo que ninguna cantidad de mantenimiento puede." },
      { emoji: "🎨", title: "Casas Personalizadas", desc: "Construcciones personalizadas con líneas de techo complejas, techos multi-plano o geometría inusual concentran agua en tramos específicos. 7\" maneja esas zonas sin desbordamiento." },
      { emoji: "🔧", title: "Upgrades de Reemplazo", desc: "Reemplazar canaletas viejas de grado constructor o de 6\" es el momento perfecto para subir a 7\". El costo de instalación ya está en juego, el sobrecosto marginal es modesto." },
    ],
    callToWalkTitle: "La mayoría de casas de Tampa están bien con 6\". Cuando no, es obvio.",
    callToWalkDesc: "Si su casa es menos de 3,000 sqft de techo con pendiente moderada y sin desbordamiento actual, 6\" es la decisión correcta. Si está arriba de eso, o ya ve desbordamiento, 7\" se paga sola en daño evitado. Le diremos cuál es usted durante el recorrido gratis.",
    callToWalkLabel: "7\" VS 6\"",
    callToWalkBtn: "Llamar (844) 444-3114",
    goldEyebrow: "EL ESTÁNDAR DE ORO",
    goldTitle: "Nuestro Proceso de Instalación de 7\"",
    goldSub: "El tamaño correcto. La instalación correcta. Cada casa, cada vez.",
    goldSteps: [
      { num: "01", title: "Evaluar", desc: "Recorrido gratis. Medimos área de techo, chequeamos pendiente, contamos bajantes y evaluamos evidencia de desbordamiento. Le daremos una recomendación honesta 6 vs 7." },
      { num: "02", title: "Diseñar", desc: "Plan personalizado de 7\": tramos, ubicación y tamaño de bajantes (4x5 rectangular o redondo grande), selección de color y estimado transparente." },
      { num: "03", title: "Instalar", desc: "El equipo lleva la máquina a su casa y fabrica tramos sin costura de 7\" en sitio. Soportes ocultos cada 24\". Pendiente calibrada. Típicamente en un día." },
      { num: "04", title: "Probar y Proteger", desc: "Recorrido final, prueba de flujo de agua para confirmar capacidad, limpieza y garantía. Ve la diferencia de capacidad en la primera tormenta real." },
    ],
    reviewEyebrow: "RESEÑAS",
    reviewTitle: "Lo Que Dicen los Clientes de 7\"",
    reviews: [
      { text: "Chris y su equipo reemplazaron las canaletas de mi casa con 7\", cambiaron los bajantes para solucionar agua estancada, luego instalaron protectores. Muy satisfecho con la calidad.", name: "David K.", service: "Upgrade de 7\" + Protectores", stars: 5 },
      { text: "Nuestras canaletas de 6\" se desbordaban en cada tormenta. JR One recomendó 7\" después de caminar el techo. El sobrecosto fue razonable y no hemos tenido un desbordamiento desde entonces.", name: "Dueño de South Tampa", service: "Upgrade de 6\" a 7\"", stars: 5 },
      { text: "Casa grande, techo empinado, paisajismo caro. El sistema de 7\" mantiene el agua fuera de mis jardines en los peores aguaceros.", name: "Dueño de Casa", service: "Casa Personalizada 4,500 sqft", stars: 5 },
    ],
    faqEyebrow: "PREGUNTAS",
    faqTitle: "Preguntas Sobre Canaletas de 7\"",
    faqs: [
      { q: "Cuánto más cuestan las canaletas de 7\" que las de 6\"?", a: "El sobrecosto por pie lineal es modesto. Típicamente 20 a 35% más que 6\", dependiendo de calibre, color y especificación de bajante. En una casa típica el sobrecosto del proyecto total son unos cientos de dólares, no miles." },
      { q: "Las canaletas de 7\" se verán sobredimensionadas?", a: "En la mayoría de casas, no. El perfil es ligeramente más alto que 6\" pero la diferencia es sutil desde el suelo. En casas muy pequeñas tipo cabaña la proporción puede verse pesada. Lo marcaremos en el recorrido si aplica." },
      { q: "Las canaletas de 7\" necesitan bajantes especiales?", a: "Se emparejan mejor con bajantes rectangulares 4x5 o redondos grandes. No el estándar 3x4. Usar un 3x4 en una canaleta de 7\" derrota el propósito del upgrade." },
      { q: "Pueden convertir mis canaletas de 6\" a 7\"?", a: "Sí. Las canaletas existentes de 6\" se remueven y se fabrican tramos nuevos de 7\" sin costura en sitio. La fascia se inspecciona durante remoción. Si algo necesita reparación lo marcamos antes de instalar." },
      { q: "Cuándo 7\" es la decisión incorrecta?", a: "Para casas pequeñas de un piso con área moderada, pendiente moderada y sin desbordamiento actual, 6\" ya es la especificación correcta. Subir a 7\" es costo innecesario. Le diremos honestamente en el recorrido." },
      { q: "7\" maneja lluvia nivel huracán?", a: "Mejor que 6\". Pero ninguna canaleta maneja completamente las peores ráfagas de un huracán. 7\" le da margen significativo sobre 6\", lo que significa que el desbordamiento ocurre menos y el riesgo de daño es materialmente menor." },
      { q: "Qué colores hay en 7\"?", a: "La misma amplia selección que en 6\". Corremos el mismo inventario de aluminio. Blanco, almendra, arcilla, bronce, bronce oscuro, negro y combinaciones personalizadas. La paleta exacta varía según el producto y el proveedor, por eso llevamos muestras a la cita." },
    ],
    ctaTitle: "LISTO PARA SUBIR A 7 PULGADAS?",
    ctaSub: "Obtenga un recorrido gratis. Mediremos su techo, chequearemos evidencia de desbordamiento y daremos una recomendación honesta 6 vs 7.",
    formTitle: "Obtenga Su Estimado de 7\"",
    formName: "Nombre Completo",
    formPhone: "Número de Teléfono",
    formEmail: "Correo Electrónico",
    formZip: "Código Postal",
    formBtn: "Solicitar Mi Estimado de 7\"",
    formDisclaimer: "Sin spam. Sin presión. Evaluación honesta 6 vs 7.",
    formSuccess: "Solicitud Recibida",
    formSuccessSub: "Le responderemos en pocas horas.",
    preferTalk: "Prefiere hablar?",
  },
};

const inputStyle = {
  width: "100%", padding: "13px 16px", fontFamily: "var(--jr-font-body)", fontSize: "15px",
  border: "1.5px solid #D1D5DB", borderRadius: "var(--jr-radius-md)", outline: "none",
  color: "var(--jr-ink)", background: "#FAFAFA", marginBottom: "12px",
  transition: "border-color var(--jr-dur-fast) var(--jr-ease-out)",
};

const ACCENT = "#D4AF37";
const ACCENT_LIGHT = "#F2CD69";

export default function SevenInchGuttersPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", zip: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const { guardFields, honeypot } = useLeadGuard();

  const handleForm = async (e) => {
    e?.preventDefault?.();
    if (!formData.name || !formData.phone) return;
    setFormError("");
    setFormLoading(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const result = await submitLeadForm({
        formId: "7-inch-gutters",
        lang,
        body: {
          ...guardFields(),
          name: formData.name, phone: formData.phone, email: formData.email,
          service: "7-Inch Gutters", zip: formData.zip,
          page: window.location.pathname,
          gclid: params.get("gclid") || "",
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
          utm_term: params.get("utm_term") || "",
        },
      });
      if (result.ok) setFormSubmitted(true);
      else setFormError(result.message);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--jr-navy)", color: "var(--jr-paper)", minHeight: "100vh" }}>
      <a href="#main" className="jr-skip-link">Skip to content</a>
      <SiteNav />

      <main id="main">
        <Container>
          <nav aria-label="Breadcrumb" style={{ paddingTop: "var(--jr-space-4)", fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)" }}>
            {t.breadcrumb.map((item, i) => (
              <span key={i}>
                {i > 0 && <span style={{ margin: "0 8px", opacity: 0.5 }}>/</span>}
                <span style={{ color: i === t.breadcrumb.length - 1 ? "var(--jr-gold)" : "var(--jr-muted-on-dark)" }}>{item}</span>
              </span>
            ))}
          </nav>
        </Container>

        <section className="jr-noise-bg" style={{ position: "relative", padding: "var(--jr-space-16) var(--jr-space-6) var(--jr-space-20)", backgroundImage: "linear-gradient(165deg, rgba(11,22,51,0.84) 0%, rgba(17,32,67,0.88) 55%, rgba(22,42,80,0.92) 100%), url('/images/7inch-gutter-comparison.webp')", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 28% 22%, rgba(200,149,46,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
          <Container>
            <div style={{ position: "relative", zIndex: 1, maxWidth: "780px" }}>
              <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: "var(--jr-gold)", letterSpacing: "4px", marginBottom: "var(--jr-space-4)", textTransform: "uppercase" }}>{t.heroTag}</div>
              <h1 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-4xl)", fontWeight: 800, lineHeight: 1.05, marginBottom: "var(--jr-space-6)", letterSpacing: "-0.5px" }}>{t.heroH1}<br /><span style={{ color: "var(--jr-gold)" }}>{t.heroH1Gold}</span></h1>
              <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-lg)", color: "var(--jr-cream-2)", lineHeight: 1.65, marginBottom: "var(--jr-space-8)", maxWidth: "640px" }}>{t.heroP}</p>
              <div style={{ display: "flex", gap: "var(--jr-space-4)", flexWrap: "wrap", marginBottom: "var(--jr-space-10)" }}>
                <Button href="#quote-form" variant="primary" size="lg" iconRight accent={ACCENT} accentLight={ACCENT_LIGHT}>{t.btnEstimate}</Button>
                <Button href="tel:8444443114" variant="outline" size="lg" iconLeft={<PhoneIcon size={18} />} accent={ACCENT}>{t.btnCall}</Button>
              </div>
              <div style={{ display: "flex", gap: "var(--jr-space-8)", flexWrap: "wrap" }}>
                {t.stats.map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-2xl)", fontWeight: 800, color: "var(--jr-gold)" }}>{s.value}</div>
                    <div style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-xs)", color: "var(--jr-muted-on-dark)", maxWidth: "120px", marginTop: "4px" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.problemTag} title={t.problemTitle} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.problems.map((p, i) => (
                <article key={i} style={{ background: "var(--jr-navy)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "var(--jr-space-6)", borderLeft: "4px solid var(--jr-gold)" }}>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-2)" }}>{p.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>{p.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.solutionTag} title={t.solutionTitle} subtitle={t.solutionSub} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.solutions.map((s, i) => (
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy-deep)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "var(--jr-space-6)", borderTop: `3px solid ${ACCENT}` }}>
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, background: `${ACCENT}1F`, borderRadius: "var(--jr-radius-md)", marginBottom: "var(--jr-space-3)" }}>
                    <span aria-hidden style={{ fontSize: 26, lineHeight: 1 }}>{s.emoji}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)" }}>{s.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>{s.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.scopeEyebrow} title={t.scopeTitle} subtitle={t.scopeSub} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.scopeItems.map((g, i) => (
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "var(--jr-space-6)", borderTop: `4px solid ${ACCENT}` }}>
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, background: `${ACCENT}1F`, borderRadius: "var(--jr-radius-md)", marginBottom: "var(--jr-space-3)" }}>
                    <span aria-hidden style={{ fontSize: 26, lineHeight: 1 }}>{g.emoji}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)" }}>{g.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>{g.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section style={{ background: "linear-gradient(135deg, var(--jr-gold-pale), var(--jr-navy-deep))", padding: "var(--jr-space-8) var(--jr-space-6)", borderTop: "2px solid var(--jr-gold)", borderBottom: "2px solid var(--jr-gold)" }}>
          <Container>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--jr-space-5)" }}>
              <div style={{ flex: "1 1 500px" }}>
                <span style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: "var(--jr-gold)", letterSpacing: "2px" }}>{t.callToWalkLabel}</span>
                <p style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 800, color: "var(--jr-paper)", lineHeight: 1.3, marginTop: "var(--jr-space-2)", marginBottom: "var(--jr-space-2)" }}>{t.callToWalkTitle}</p>
                <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.5 }}>{t.callToWalkDesc}</p>
              </div>
              <Button href="tel:8444443114" variant="primary" size="md" iconLeft={<PhoneIcon size={16} />} accent={ACCENT} accentLight={ACCENT_LIGHT}>{t.callToWalkBtn}</Button>
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.goldEyebrow} title={t.goldTitle} subtitle={t.goldSub} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.goldSteps.map((step) => <ProcessStep key={step.num} num={step.num} title={step.title} desc={step.desc} accent={ACCENT} />)}
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.reviewEyebrow} title={t.reviewTitle} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.reviews.map((rev, i) => <ReviewCard key={i} {...rev} />)}
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container size="prose">
            <SectionHeading eyebrow={t.faqEyebrow} title={t.faqTitle} theme="dark" accent={ACCENT} />
            <FAQAccordion items={t.faqs} theme="dark" accent={ACCENT} />
          </Container>
        </section>

        <Peak301Alert />

        <section id="quote-form" style={{ background: "linear-gradient(165deg, var(--jr-navy), var(--jr-navy-2))", padding: "var(--jr-space-20) 0" }}>
          <Container size="narrow">
            <div style={{ textAlign: "center", marginBottom: "var(--jr-space-10)" }}>
              <h2 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-3xl)", fontWeight: 800, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)", letterSpacing: "1px" }}>{t.ctaTitle}</h2>
              <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-lg)", color: "var(--jr-cream-2)", lineHeight: 1.6 }}>{t.ctaSub}</p>
            </div>
            <div style={{ maxWidth: "560px", margin: "0 auto" }}>
              {formSubmitted ? (
                <div style={{ background: "var(--jr-success-soft)", border: "1px solid var(--jr-success)", borderRadius: "var(--jr-radius-xl)", padding: "var(--jr-space-8)", textAlign: "center" }}>
                  <div style={{ display: "inline-flex", color: "var(--jr-success)", marginBottom: "var(--jr-space-3)" }}><CheckCircleIcon size={48} /></div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-2)" }}>{t.formSuccess}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)" }}>{t.formSuccessSub}</p>
                </div>
              ) : (
                <form onSubmit={handleForm} style={{ background: "var(--jr-paper)", borderRadius: "var(--jr-radius-xl)", padding: "var(--jr-space-8) var(--jr-space-6)", boxShadow: "var(--jr-shadow-form)" }}>
                  {honeypot}
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 700, color: "var(--jr-navy)", textAlign: "center", marginBottom: "var(--jr-space-1)" }}>{t.formTitle}</h3>
                  <div aria-hidden style={{ width: 40, height: 3, background: "var(--jr-gold)", borderRadius: 2, margin: "10px auto var(--jr-space-5)" }} />
                  <input aria-label={t.formName} style={inputStyle} placeholder={t.formName} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  <input aria-label={t.formPhone} style={inputStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  <input aria-label={t.formEmail} style={inputStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  <input aria-label={t.formZip} style={inputStyle} placeholder={t.formZip} value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} maxLength={5} />
                  <Button type="submit" variant="primary" size="md" fullWidth iconRight disabled={formLoading} accent={ACCENT} accentLight={ACCENT_LIGHT}>{formLoading ? "Sending..." : t.formBtn}</Button>
                  {formError ? (
                    <p role="alert" style={SUBMIT_ERROR_STYLE}>{formError}</p>
                  ) : null}
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-xs)", color: "var(--jr-muted-on-light)", textAlign: "center", marginTop: "var(--jr-space-3)" }}>{t.formDisclaimer}</p>
                </form>
              )}
              <div style={{ marginTop: "var(--jr-space-8)", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", marginBottom: "var(--jr-space-2)" }}>{t.preferTalk}</p>
                <a href="tel:8444443114" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-gold)", textDecoration: "none" }}>
                  <PhoneIcon size={18} /> (844) 444-3114
                </a>
              </div>
            </div>
          </Container>
        </section>

        <CTABand
          title={lang === "en" ? "Free 6 vs 7 Walkthrough" : "Recorrido Gratis 6 vs 7"}
          sub={lang === "en" ? "Honest assessment, transparent estimate. Within 48 hours." : "Evaluación honesta, estimado transparente. Dentro de 48 horas."}
          primaryLabel={lang === "en" ? "Request a Quote" : "Solicitar Cotización"}
          primaryHref="#quote-form"
          accent={ACCENT}
          accentLight={ACCENT_LIGHT}
        />
      </main>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
    </div>
  );
}
