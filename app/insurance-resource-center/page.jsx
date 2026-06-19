"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM: INSURANCE RESOURCE CENTER
   Brand-brain compliant. Tokens via app/tokens.css.
   ═══════════════════════════════════════════════════════════ */

import { useState } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import FAQAccordion from "../../components/ui/FAQAccordion";
import { useLanguage } from "../../lib/LanguageContext";
import { localizeHref } from "../../lib/locale";
import { CheckIcon, XIcon, ShieldIcon, MapPinIcon, CardIcon, RoofEdgeIcon, PhoneIcon, ChevronDownIcon } from "../../lib/icons";

const T = {
  en: {
    breadcrumb: ["Home", "Peak 301", "Insurance Resource Center"],
    heroTag: "INSURANCE RESOURCE CENTER",
    heroH1: "Your Roof. Your Rights.",
    heroH1Gold: "Your Insurance Guide.",
    heroP: "Florida law protects homeowners from losing insurance solely because of roof age. This resource center gives you everything you need: the laws, the carrier types, the documentation templates, and the steps to protect your coverage. Whether you're facing a non-renewal notice or want to get ahead of one, start here.",
    promoBanner: "Florida Insurance Dropping Your Coverage? Peak 301 Can Help. Call (844) 444-3114",
    learnPeak301: "LEARN ABOUT PEAK 301",
    callCta: "CALL (844) 444-3114",
    stats: [
      { value: "280%", label: "Increase in FL policy non-renewals since 2018" },
      { value: "$3,285 to $5,100", label: "Average Tampa Bay annual premium" },
      { value: "90,000", label: "Policies dropped in Tampa Bay (Citizens alone)" },
      { value: "5 Years", label: "Remaining useful life threshold under FL law" },
    ],
    knowYourRights: "KNOW YOUR RIGHTS",
    lawTitle: "Florida Law Is on Your Side",
    lawIntro: "Florida has passed multiple laws protecting homeowners from losing insurance solely because of roof age. Here's exactly what each one does.",
    laws: [
      {
        tag: "SENATE BILL 2D (2022)",
        title: "The Foundation: Condition Over Age",
        points: [
          "Insurers cannot refuse to issue or renew a homeowner's policy solely because of roof age if the roof is under 15 years old.",
          "For roofs 15 years or older, insurers must allow you to get a roof inspection before requiring replacement as a condition of coverage.",
          "If that inspection shows your roof has at least 5 years of remaining useful life, the insurer cannot deny or non-renew your policy based on roof age alone.",
          "A roof's age is calculated from the last date 100% of the roof surface was built or replaced per building code at that time.",
        ],
      },
      {
        tag: "HOUSE BILL 1611 (2024)",
        title: "Expanded Inspector Access",
        points: [
          "Licensed roofing contractors are now included as authorized inspectors who can certify your roof's remaining useful life.",
          "This expands homeowner options beyond just engineers and home inspectors for getting the certification carriers must accept.",
        ],
      },
      {
        tag: "SENATE BILL 808 (EFFECTIVE JULY 2026)",
        title: "Even Broader Inspector Pool & Roof Type Distinctions",
        points: [
          "Further expands authorized inspectors to include home inspectors, building code inspectors, general/building/residential contractors, roofing contractors, professional engineers, and architects.",
          "Requires insurers to differentiate between low-slope roofs (2-inch pitch or less) and steep-slope roofs (more than 2-inch pitch) when evaluating coverage.",
          "For steep-slope roofs, carriers cannot deny coverage if an inspector certifies 5+ years of remaining useful life.",
        ],
      },
      {
        tag: "HOUSE BILL 815 (EFFECTIVE JULY 2026)",
        title: "Strengthened Protections",
        points: [
          "Prohibits insurers from refusing policy renewals based solely on roof age for property insurance policies, expanding protections beyond just homeowner policies.",
          "Reinforces the condition-based standard over arbitrary age cutoffs.",
        ],
      },
    ],
    bottomLine: "BOTTOM LINE",
    bottomLineText: "Florida law has shifted from age-based to condition-based roof evaluation. Your roof's actual condition, not its birthday, is what determines whether you keep your insurance. Peak 301 restores your roof to a condition that supports the certification these laws require.",
    carrierGuide: "CARRIER GUIDE",
    carrierTitle: "Understand Your Insurance Carrier",
    carrierIntro: "Not all insurance carriers handle roof age the same way. Knowing which type you're dealing with determines your best strategy.",
    whatThisMeans: "WHAT THIS MEANS FOR YOU",
    howToIdentify: "HOW TO IDENTIFY THIS CARRIER TYPE",
    carrierTypes: [
      {
        type: "Condition-Based Carriers",
        icon: "check",
        desc: "These carriers evaluate your roof based on its actual condition, not just its birthday. If a licensed inspector certifies your roof has 5+ years of remaining useful life, they will issue or renew your policy regardless of roof age.",
        whatItMeans: "This is where Peak 301 + a certified inspection is most powerful. You treat the roof, get the certification, and the carrier must accept it under Florida law.",
        lookFor: "Ask your insurance agent: 'Does your carrier accept a certified roof inspection showing remaining useful life for roofs over 15 years old?' If yes, you're working with a condition-based carrier.",
      },
      {
        type: "Age-Cutoff Carriers",
        icon: "x",
        desc: "These carriers set a hard age limit, typically 20 years for asphalt shingles, and will not write policies for roofs beyond that age, regardless of condition or inspection results.",
        whatItMeans: "If your roof is already past their hard cutoff, Peak 301 may not help with this specific carrier. However, it can help you stay insurable with condition-based carriers. If your roof is approaching their cutoff (say, 12-15 years old), Peak 301 can extend your roof's life to keep you under the limit longer.",
        lookFor: "Ask your agent: 'What is the maximum roof age your carrier will accept for a new or renewed policy?' If they give you a hard number with no inspection option, that's an age-cutoff carrier.",
      },
      {
        type: "Material-Based Carriers",
        icon: "edge",
        desc: "These carriers accept different roof ages depending on the material. Metal roofs may be accepted up to 40 years, tile up to 30-50 years, but asphalt shingles are restricted to 15-20 years. Within their asphalt limits, they may still accept inspections.",
        whatItMeans: "For asphalt shingle homeowners, these carriers function like a hybrid. They have a general age preference but may accept inspection certifications within their material-specific guidelines.",
        lookFor: "Ask your agent: 'Does your carrier have different age requirements for different roof materials, and do they accept certified inspections for asphalt shingles over 15 years?'",
      },
      {
        type: "Citizens Property Insurance",
        icon: "shield",
        desc: "Florida's state-backed insurer of last resort. Citizens considers asphalt shingle roofs 'old' at 25 years. They accept certified inspections but cap coverage extensions at 5 years maximum, regardless of how much remaining life the inspection shows.",
        whatItMeans: "Citizens is actively depopulating, moving policies to private carriers. If you're on Citizens, you may be transferred to a private carrier who has different (possibly stricter) roof age requirements. Peak 301 can help you qualify with private carriers when that transition happens.",
        lookFor: "If you're currently with Citizens, ask your agent about upcoming depopulation and what private carrier options are available for your property.",
      },
    ],
    actionPlan: "YOUR ACTION PLAN",
    stepsTitle: "7 Steps to Protect Your Coverage",
    stepsIntro: "Follow these steps in order. Each one builds on the last.",
    steps: [
      { num: "01", title: "Check Your Roof Age", desc: "Find out when your roof was last fully replaced. Check your closing documents, permit records (available through your county property appraiser), or previous inspection reports. This date determines where you stand with your carrier." },
      { num: "02", title: "Review Your Policy", desc: "Read your current homeowner's insurance policy. Look for language about roof age requirements, coverage type (Replacement Cost vs. Actual Cash Value), and any upcoming renewal dates. Know what you're working with before you act." },
      { num: "03", title: "Call Your Insurance Agent", desc: "Ask your agent the three key questions: What is the carrier's roof age threshold? Do they accept certified roof inspections? What documentation do they need to renew your policy? Write down the answers." },
      { num: "04", title: "Get a Roof Assessment", desc: "Contact JR One for a professional roof assessment. We'll inspect your roof's condition, determine if it's a candidate for Peak 301 rejuvenation, and give you a clear, honest recommendation, including telling you if your roof needs replacement instead." },
      { num: "05", title: "Peak 301 Treatment", desc: "If your roof qualifies, our crew applies Peak 301 in a single day. The soy-based sealant penetrates your shingles and begins restoring flexibility and waterproofing immediately. No demolition, no debris, no multi-day disruption." },
      { num: "06", title: "Get Your Certification", desc: "After treatment, a licensed authorized inspector evaluates your roof and issues a Remaining Useful Life (RUL) certification, the documentation Florida law requires carriers to accept. We coordinate this entire step for you." },
      { num: "07", title: "Submit to Your Insurer", desc: "Provide the RUL certification to your insurance agent or carrier. Under Florida law, they cannot refuse to issue or renew your policy solely because of roof age when this documentation shows 5+ years of remaining life." },
    ],
    downloadCenter: "DOWNLOAD CENTER",
    toolkitTitle: "Your Insurance Toolkit",
    toolkitIntro: "Free documents you can download, print, fill in, and use immediately. Available in English and Spanish.",
    englishPdf: "ENGLISH PDF",
    spanishPdf: "ESPAÑOL PDF",
    documents: [
      { title: "Letter to Your Insurance Company", desc: "A professional template you fill in with your name, policy number, and attach your RUL certification. Formatted to clearly cite Florida Statute 627.7011 and request continued coverage.", file: "JR_One_Insurance_Letter_Template.pdf" },
      { title: "Florida Homeowner Roof Insurance Rights", desc: "A one-page summary of your legal rights under SB 2D, HB 1611, SB 808, and HB 815. Written in plain language, not legal jargon. Includes the exact statute references so your agent can verify.", file: "JR_One_FL_Roof_Insurance_Rights.pdf" },
      { title: "What to Expect After Peak 301 Treatment", desc: "A clear, step-by-step guide covering what happens during application, what your roof will look like afterward, the timeline for full penetration, and the warranty documentation you'll receive.", file: "JR_One_Peak301_What_To_Expect.pdf" },
      { title: "Peak 301 Treatment Certificate", desc: "The official JR One treatment certificate documenting your roof has been professionally rejuvenated. Includes treatment date, product details, warranty terms, and your property information. Designed to be submitted alongside your RUL certification.", file: "JR_One_Peak301_Treatment_Certificate.pdf" },
    ],
    bePrepared: "BE PREPARED",
    questionsTitle: "Questions to Ask Your Insurance Agent",
    questionsIntro: "Print this list. Call your agent. Write down the answers. Knowledge is your best defense.",
    whyThisMatters: "WHY THIS MATTERS",
    questionsForAgent: [
      { q: "What is the maximum roof age your carrier will insure for asphalt shingles?", why: "This tells you whether you're dealing with a condition-based or age-cutoff carrier, and whether your roof is currently within their window." },
      { q: "Does your carrier accept a certified roof inspection showing 5+ years of remaining useful life for roofs over 15 years old?", why: "Florida law requires them to, but knowing whether they comply willingly or resist helps you plan." },
      { q: "What type of inspection report does your carrier require: a 4-Point Inspection, a standalone Roof Inspection, or both?", why: "Different carriers have different documentation requirements. Getting the right report the first time saves you time and money." },
      { q: "Who qualifies as an authorized inspector in your carrier's underwriting guidelines?", why: "Under SB 808 (effective July 2026), the authorized inspector pool is expanded. But some carriers may have additional requirements." },
      { q: "If my roof passes inspection, will my policy be Replacement Cost Value or Actual Cash Value?", why: "Some carriers accept older roofs but switch you to ACV coverage, which pays significantly less in a claim. Know this before you commit." },
      { q: "Are there any secondary requirements beyond roof age, such as secondary water resistance, wind mitigation features, or specific shingle types?", why: "Some carriers have added extra underwriting criteria beyond roof age. Knowing these upfront prevents surprises after you've already invested in treatment." },
    ],
    faqTag: "FAQ",
    faqTitle: "Insurance & Peak 301 Questions",
    faqs: [
      { q: "Does Peak 301 guarantee my insurance will be renewed?", a: "No, and anyone who tells you that is not being honest. What Peak 301 does is restore your roof to a condition that supports a licensed inspector certifying 5+ years of remaining useful life. That certification is what Florida law requires carriers to accept. The treatment makes the certification possible; the law makes the carrier comply." },
      { q: "What if my carrier still refuses to renew after I submit the certification?", a: "If your carrier refuses to renew solely because of roof age after you've provided a valid RUL certification from an authorized inspector, they may be in violation of Florida Statute 627.7011. Your first step is to request the reason for non-renewal in writing. Then contact the Florida Office of Insurance Regulation (FLOIR) to file a complaint. You can also work with your insurance agent to shop other carriers. Many condition-based carriers will accept the same certification." },
      { q: "Is roof rejuvenation the same as a roof coating?", a: "No. This distinction matters. Peak 301 is a penetrating soy-based sealant that soaks into your shingles and restores the depleted oils from the inside out. It does not create a surface film or coating. Roof coatings create a layer on top of the shingles, which ARMA (the Asphalt Roofing Manufacturers Association) warns against for asphalt shingles. Rejuvenation and coating are two entirely different products with different mechanisms." },
      { q: "Will Peak 301 void my shingle manufacturer warranty?", a: "On a roof that's 15+ years old, which is the primary audience for this treatment, most manufacturer warranties have already expired or offer only prorated material coverage with no labor coverage. For roofs with active manufacturer warranties, we recommend checking with your manufacturer before treatment. In practice, the warranty value on a 15+ year old roof is minimal compared to the value of maintaining insurance coverage." },
      { q: "How do I know if my roof is a good candidate?", a: "Most asphalt shingle roofs between 8 and 20 years old are candidates. Your roof should be structurally sound with no active leaks, no major missing sections, and no severe curling or warping. We inspect every roof before recommending treatment, and we will tell you honestly if your roof needs replacement instead of rejuvenation. Not every roof qualifies, and we'd rather earn your trust by being straight with you than sell a treatment that won't deliver." },
      { q: "What does the treatment actually cost?", a: "Every roof is different. Size, shingle type, and condition all affect the price. For most Tampa Bay homes, Peak 301 treatment runs around 60 to 75% less than a full replacement ($15,000 to $25,000+). We provide exact pricing only after inspecting your specific roof. The free assessment is the fastest way to get a real number for your home. The treatment includes application, warranty documentation, and coordination with the inspector for your RUL certification." },
      { q: "Can I do this in Spanish? / ¿Puedo hacer esto en español?", a: "Yes. JR One is a bilingual company. We provide consultations, documentation, and customer service in both English and Spanish. All downloadable documents on this page are available in both languages. / Sí. JR One es una empresa bilingüe. Ofrecemos consultas, documentación y servicio al cliente en inglés y español. Todos los documentos descargables en esta página están disponibles en ambos idiomas." },
    ],
    ctaTitle: "Protect Your Roof and Your Insurance",
    ctaSub: "Don't wait for a non-renewal letter. Call us today for a professional roof assessment and find out if Peak 301 can save your coverage, and save you thousands.",
    ctaButton: "GET YOUR FREE ROOF ASSESSMENT",
    bilingualNote: "Habla español? Llámenos, somos una empresa bilingüe.",
    disclaimerLabel: "Disclaimer:",
    disclaimerText: "The information on this page is provided for educational purposes and is not legal advice. While we cite Florida statutes accurately, insurance coverage decisions involve many factors beyond roof age. We recommend consulting with a licensed insurance agent and/or attorney for guidance specific to your policy and situation. JR One Aluminum LLC is a Peak 301 authorized applicator. We are not an insurance company, insurance agent, or legal firm. Statute references are current as of 2026 and may be subject to legislative changes.",
  },
  es: {
    breadcrumb: ["Inicio", "Peak 301", "Centro de Recursos de Seguros"],
    heroTag: "CENTRO DE RECURSOS DE SEGUROS",
    heroH1: "Su Techo. Sus Derechos.",
    heroH1Gold: "Su Guía de Seguros.",
    heroP: "La ley de Florida protege a los propietarios de perder su seguro únicamente por la edad del techo. Este centro de recursos le da todo lo que necesita: las leyes, los tipos de aseguradoras, las plantillas de documentación y los pasos para proteger su cobertura. Ya sea que esté enfrentando un aviso de no renovación o quiera adelantarse a uno, empiece aquí.",
    promoBanner: "¿Su Seguro de Florida Está Cancelando Su Cobertura? Peak 301 Puede Ayudar. Llame al (844) 444-3114",
    learnPeak301: "CONOZCA PEAK 301",
    callCta: "LLAME AL (844) 444-3114",
    stats: [
      { value: "280%", label: "Aumento en no renovaciones de pólizas en FL desde 2018" },
      { value: "$3,285 a $5,100", label: "Prima anual promedio en Tampa Bay" },
      { value: "90,000", label: "Pólizas canceladas en Tampa Bay (solo Citizens)" },
      { value: "5 Años", label: "Umbral de vida útil restante bajo la ley de FL" },
    ],
    knowYourRights: "CONOZCA SUS DERECHOS",
    lawTitle: "La Ley de Florida Está de Su Lado",
    lawIntro: "Florida ha aprobado múltiples leyes que protegen a los propietarios de perder su seguro únicamente por la edad del techo. Aquí le explicamos exactamente qué hace cada una.",
    laws: [
      {
        tag: "PROYECTO DE LEY SENATORIAL 2D (2022)",
        title: "La Base: Condición Sobre Edad",
        points: [
          "Las aseguradoras no pueden negarse a emitir o renovar una póliza de propietario únicamente por la edad del techo si este tiene menos de 15 años.",
          "Para techos de 15 años o más, las aseguradoras deben permitirle obtener una inspección del techo antes de exigir un reemplazo como condición de cobertura.",
          "Si esa inspección muestra que su techo tiene al menos 5 años de vida útil restante, la aseguradora no puede denegar o no renovar su póliza basándose únicamente en la edad del techo.",
          "La edad del techo se calcula desde la última fecha en que el 100% de la superficie del techo fue construida o reemplazada según el código de construcción vigente en ese momento.",
        ],
      },
      {
        tag: "PROYECTO DE LEY 1611 (2024)",
        title: "Acceso Ampliado a Inspectores",
        points: [
          "Los contratistas de techos con licencia ahora están incluidos como inspectores autorizados que pueden certificar la vida útil restante de su techo.",
          "Esto amplía las opciones del propietario más allá de solo ingenieros e inspectores de viviendas para obtener la certificación que las aseguradoras deben aceptar.",
        ],
      },
      {
        tag: "PROYECTO DE LEY SENATORIAL 808 (VIGENTE JULIO 2026)",
        title: "Grupo de Inspectores Aún Más Amplio y Distinciones por Tipo de Techo",
        points: [
          "Amplía aún más los inspectores autorizados para incluir inspectores de viviendas, inspectores de código de construcción, contratistas generales/de construcción/residenciales, contratistas de techos, ingenieros profesionales y arquitectos.",
          "Requiere que las aseguradoras diferencien entre techos de baja pendiente (2 pulgadas o menos) y techos de alta pendiente (más de 2 pulgadas) al evaluar la cobertura.",
          "Para techos de alta pendiente, las aseguradoras no pueden negar cobertura si un inspector certifica 5+ años de vida útil restante.",
        ],
      },
      {
        tag: "PROYECTO DE LEY 815 (VIGENTE JULIO 2026)",
        title: "Protecciones Reforzadas",
        points: [
          "Prohíbe a las aseguradoras rechazar la renovación de pólizas basándose únicamente en la edad del techo para pólizas de seguro de propiedad, ampliando las protecciones más allá de solo pólizas de propietario.",
          "Refuerza el estándar basado en condición sobre los límites arbitrarios de edad.",
        ],
      },
    ],
    bottomLine: "EN RESUMEN",
    bottomLineText: "La ley de Florida ha cambiado de una evaluación de techo basada en edad a una basada en condición. La condición real de su techo, no su antigüedad, es lo que determina si mantiene su seguro. Peak 301 restaura su techo a una condición que respalda la certificación que estas leyes requieren.",
    carrierGuide: "GUÍA DE ASEGURADORAS",
    carrierTitle: "Entienda Su Aseguradora",
    carrierIntro: "No todas las aseguradoras manejan la edad del techo de la misma manera. Saber con qué tipo está tratando determina su mejor estrategia.",
    whatThisMeans: "QUÉ SIGNIFICA ESTO PARA USTED",
    howToIdentify: "CÓMO IDENTIFICAR ESTE TIPO DE ASEGURADORA",
    carrierTypes: [
      {
        type: "Aseguradoras Basadas en Condición",
        icon: "check",
        desc: "Estas aseguradoras evalúan su techo según su condición real, no solo su antigüedad. Si un inspector con licencia certifica que su techo tiene 5+ años de vida útil restante, emitirán o renovarán su póliza sin importar la edad del techo.",
        whatItMeans: "Aquí es donde Peak 301 + una inspección certificada es más poderoso. Usted trata el techo, obtiene la certificación, y la aseguradora debe aceptarla bajo la ley de Florida.",
        lookFor: "Pregunte a su agente de seguros: '¿Su aseguradora acepta una inspección de techo certificada que muestre vida útil restante para techos de más de 15 años?' Si la respuesta es sí, está trabajando con una aseguradora basada en condición.",
      },
      {
        type: "Aseguradoras con Límite de Edad",
        icon: "x",
        desc: "Estas aseguradoras establecen un límite de edad firme, típicamente 20 años para tejas de asfalto, y no emitirán pólizas para techos que superen esa edad, sin importar la condición o los resultados de la inspección.",
        whatItMeans: "Si su techo ya pasó su límite firme, Peak 301 puede no ayudar con esta aseguradora específica. Sin embargo, puede ayudarle a mantenerse asegurable con aseguradoras basadas en condición. Si su techo se acerca a su límite (digamos, 12-15 años), Peak 301 puede extender la vida de su techo para mantenerlo bajo el límite más tiempo.",
        lookFor: "Pregunte a su agente: '¿Cuál es la edad máxima del techo que su aseguradora aceptará para una póliza nueva o renovada?' Si le dan un número firme sin opción de inspección, es una aseguradora con límite de edad.",
      },
      {
        type: "Aseguradoras Basadas en Material",
        icon: "edge",
        desc: "Estas aseguradoras aceptan diferentes edades de techo dependiendo del material. Los techos de metal pueden ser aceptados hasta 40 años, tejas hasta 30-50 años, pero las tejas de asfalto están restringidas a 15-20 años. Dentro de sus límites para asfalto, aún pueden aceptar inspecciones.",
        whatItMeans: "Para propietarios con tejas de asfalto, estas aseguradoras funcionan como un híbrido. Tienen una preferencia general de edad pero pueden aceptar certificaciones de inspección dentro de sus guías específicas por material.",
        lookFor: "Pregunte a su agente: '¿Su aseguradora tiene diferentes requisitos de edad para diferentes materiales de techo, y aceptan inspecciones certificadas para tejas de asfalto de más de 15 años?'",
      },
      {
        type: "Citizens Property Insurance",
        icon: "shield",
        desc: "La aseguradora respaldada por el estado de Florida como último recurso. Citizens considera los techos de tejas de asfalto como 'viejos' a los 25 años. Aceptan inspecciones certificadas pero limitan las extensiones de cobertura a un máximo de 5 años, sin importar cuánta vida restante muestre la inspección.",
        whatItMeans: "Citizens está activamente despoblándose, moviendo pólizas a aseguradoras privadas. Si está con Citizens, puede ser transferido a una aseguradora privada que tenga requisitos de edad de techo diferentes (posiblemente más estrictos). Peak 301 puede ayudarle a calificar con aseguradoras privadas cuando esa transición ocurra.",
        lookFor: "Si actualmente está con Citizens, pregunte a su agente sobre la próxima despoblación y qué opciones de aseguradoras privadas están disponibles para su propiedad.",
      },
    ],
    actionPlan: "SU PLAN DE ACCIÓN",
    stepsTitle: "7 Pasos para Proteger Su Cobertura",
    stepsIntro: "Siga estos pasos en orden. Cada uno se basa en el anterior.",
    steps: [
      { num: "01", title: "Verifique la Edad de Su Techo", desc: "Averigüe cuándo fue la última vez que su techo fue completamente reemplazado. Revise sus documentos de cierre, registros de permisos (disponibles a través del tasador de propiedades de su condado) o informes de inspección previos. Esta fecha determina dónde se encuentra con su aseguradora." },
      { num: "02", title: "Revise Su Póliza", desc: "Lea su póliza actual de seguro de propietario. Busque el lenguaje sobre requisitos de edad del techo, tipo de cobertura (Costo de Reemplazo vs. Valor Real en Efectivo) y fechas de renovación próximas. Sepa con qué está trabajando antes de actuar." },
      { num: "03", title: "Llame a Su Agente de Seguros", desc: "Hágale a su agente las tres preguntas clave: ¿Cuál es el umbral de edad del techo de la aseguradora? ¿Aceptan inspecciones de techo certificadas? ¿Qué documentación necesitan para renovar su póliza? Anote las respuestas." },
      { num: "04", title: "Obtenga una Evaluación del Techo", desc: "Contacte a JR One para una evaluación profesional del techo. Inspeccionaremos la condición de su techo, determinaremos si es candidato para el rejuvenecimiento Peak 301, y le daremos una recomendación clara y honesta, incluyendo decirle si su techo necesita reemplazo en su lugar." },
      { num: "05", title: "Tratamiento Peak 301", desc: "Si su techo califica, nuestro equipo aplica Peak 301 en un solo día. El sellador a base de soya penetra sus tejas y comienza a restaurar la flexibilidad e impermeabilización inmediatamente. Sin demolición, sin escombros, sin interrupciones de varios días." },
      { num: "06", title: "Obtenga Su Certificación", desc: "Después del tratamiento, un inspector autorizado con licencia evalúa su techo y emite una certificación de Vida Útil Restante (VUR), la documentación que la ley de Florida requiere que las aseguradoras acepten. Nosotros coordinamos todo este paso por usted." },
      { num: "07", title: "Envíe a Su Aseguradora", desc: "Proporcione la certificación VUR a su agente de seguros o aseguradora. Bajo la ley de Florida, no pueden negarse a emitir o renovar su póliza únicamente por la edad del techo cuando esta documentación muestra 5+ años de vida restante." },
    ],
    downloadCenter: "CENTRO DE DESCARGAS",
    toolkitTitle: "Su Kit de Herramientas de Seguros",
    toolkitIntro: "Documentos gratuitos que puede descargar, imprimir, completar y usar inmediatamente. Disponibles en inglés y español.",
    englishPdf: "PDF INGLÉS",
    spanishPdf: "PDF ESPAÑOL",
    documents: [
      { title: "Carta a Su Compañía de Seguros", desc: "Una plantilla profesional que completa con su nombre, número de póliza, y adjunta su certificación VUR. Formateada para citar claramente el Estatuto de Florida 627.7011 y solicitar la continuación de cobertura.", file: "JR_One_Insurance_Letter_Template.pdf" },
      { title: "Derechos de Seguro de Techo del Propietario de Florida", desc: "Un resumen de una página de sus derechos legales bajo SB 2D, HB 1611, SB 808 y HB 815. Escrito en lenguaje sencillo, no jerga legal. Incluye las referencias exactas de los estatutos para que su agente pueda verificar.", file: "JR_One_FL_Roof_Insurance_Rights.pdf" },
      { title: "Qué Esperar Después del Tratamiento Peak 301", desc: "Una guía clara paso a paso que cubre qué sucede durante la aplicación, cómo se verá su techo después, el cronograma para la penetración completa y la documentación de garantía que recibirá.", file: "JR_One_Peak301_What_To_Expect.pdf" },
      { title: "Certificado de Tratamiento Peak 301", desc: "El certificado oficial de tratamiento de JR One que documenta que su techo ha sido rejuvenecido profesionalmente. Incluye fecha de tratamiento, detalles del producto, términos de garantía e información de su propiedad. Diseñado para presentarse junto con su certificación VUR.", file: "JR_One_Peak301_Treatment_Certificate.pdf" },
    ],
    bePrepared: "ESTÉ PREPARADO",
    questionsTitle: "Preguntas para Hacerle a Su Agente de Seguros",
    questionsIntro: "Imprima esta lista. Llame a su agente. Anote las respuestas. El conocimiento es su mejor defensa.",
    whyThisMatters: "POR QUÉ ESTO IMPORTA",
    questionsForAgent: [
      { q: "¿Cuál es la edad máxima del techo que su aseguradora cubrirá para tejas de asfalto?", why: "Esto le dice si está tratando con una aseguradora basada en condición o con límite de edad, y si su techo actualmente está dentro de su ventana." },
      { q: "¿Su aseguradora acepta una inspección de techo certificada que muestre 5+ años de vida útil restante para techos de más de 15 años?", why: "La ley de Florida lo requiere, pero saber si cumplen de buena gana o se resisten le ayuda a planificar." },
      { q: "¿Qué tipo de informe de inspección requiere su aseguradora: una Inspección de 4 Puntos, una Inspección de Techo independiente, o ambas?", why: "Diferentes aseguradoras tienen diferentes requisitos de documentación. Obtener el informe correcto la primera vez le ahorra tiempo y dinero." },
      { q: "¿Quién califica como inspector autorizado en las pautas de suscripción de su aseguradora?", why: "Bajo SB 808 (vigente julio 2026), el grupo de inspectores autorizados se amplía. Pero algunas aseguradoras pueden tener requisitos adicionales." },
      { q: "Si mi techo pasa la inspección, ¿mi póliza será de Valor de Costo de Reemplazo o Valor Real en Efectivo?", why: "Algunas aseguradoras aceptan techos más viejos pero le cambian a cobertura de Valor Real en Efectivo, que paga significativamente menos en un reclamo. Sepa esto antes de comprometerse." },
      { q: "¿Hay requisitos secundarios más allá de la edad del techo, como resistencia secundaria al agua, características de mitigación de viento o tipos específicos de tejas?", why: "Algunas aseguradoras han añadido criterios de suscripción adicionales más allá de la edad del techo. Conocer estos por adelantado previene sorpresas después de que ya haya invertido en el tratamiento." },
    ],
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "Preguntas sobre Seguros y Peak 301",
    faqs: [
      { q: "¿Peak 301 garantiza que mi seguro será renovado?", a: "No, y cualquiera que le diga eso no está siendo honesto. Lo que Peak 301 hace es restaurar su techo a una condición que respalda que un inspector con licencia certifique 5+ años de vida útil restante. Esa certificación es lo que la ley de Florida requiere que las aseguradoras acepten. El tratamiento hace posible la certificación; la ley hace que la aseguradora cumpla." },
      { q: "¿Qué pasa si mi aseguradora aún se niega a renovar después de que envío la certificación?", a: "Si su aseguradora se niega a renovar únicamente por la edad del techo después de que usted ha proporcionado una certificación VUR válida de un inspector autorizado, pueden estar violando el Estatuto de Florida 627.7011. Su primer paso es solicitar la razón de la no renovación por escrito. Luego contacte la Oficina de Regulación de Seguros de Florida (FLOIR) para presentar una queja. También puede trabajar con su agente de seguros para buscar otras aseguradoras. Muchas aseguradoras basadas en condición aceptarán la misma certificación." },
      { q: "¿El rejuvenecimiento de techo es lo mismo que un recubrimiento de techo?", a: "No. Esta distinción importa. Peak 301 es un sellador penetrante a base de soya que se absorbe en sus tejas y restaura los aceites agotados desde adentro hacia afuera. No crea una película superficial ni recubrimiento. Los recubrimientos de techo crean una capa sobre las tejas, lo cual ARMA (la Asociación de Fabricantes de Techos de Asfalto) advierte en contra para tejas de asfalto. El rejuvenecimiento y el recubrimiento son dos productos completamente diferentes con mecanismos distintos." },
      { q: "¿Peak 301 anulará la garantía del fabricante de mis tejas?", a: "En un techo de 15+ años, que es la audiencia principal para este tratamiento, la mayoría de las garantías del fabricante ya han expirado u ofrecen solo cobertura prorrateada de material sin cobertura de mano de obra. Para techos con garantías activas del fabricante, recomendamos consultar con su fabricante antes del tratamiento. En la práctica, el valor de la garantía en un techo de 15+ años es mínimo comparado con el valor de mantener la cobertura de seguro." },
      { q: "¿Cómo sé si mi techo es un buen candidato?", a: "La mayoría de los techos de tejas de asfalto entre 8 y 20 años son candidatos. Su techo debe estar estructuralmente sólido sin filtraciones activas, sin secciones grandes faltantes, y sin ondulaciones o deformaciones severas. Inspeccionamos cada techo antes de recomendar el tratamiento, y le diremos honestamente si su techo necesita reemplazo en vez de rejuvenecimiento. No todos los techos califican, y preferimos ganarnos su confianza siendo directos con usted que vender un tratamiento que no cumplirá." },
      { q: "¿Cuánto cuesta el tratamiento realmente?", a: "Cada techo es diferente. Tamaño, tipo de teja y condición afectan el precio. Para la mayoría de los hogares de Tampa Bay, el tratamiento Peak 301 cuesta alrededor de 60 a 75% menos que un reemplazo completo ($15,000 a $25,000+). Proporcionamos precios exactos solo después de inspeccionar su techo específico. La evaluación gratuita es la forma más rápida de obtener un número real para su hogar. El tratamiento incluye aplicación, documentación de garantía y coordinación con el inspector para su certificación VUR." },
      { q: "¿Puedo hacer esto en español? / Can I do this in Spanish?", a: "Sí. JR One es una empresa bilingüe. Ofrecemos consultas, documentación y servicio al cliente en inglés y español. Todos los documentos descargables en esta página están disponibles en ambos idiomas. / Yes. JR One is a bilingual company. We provide consultations, documentation, and customer service in both English and Spanish. All downloadable documents on this page are available in both languages." },
    ],
    ctaTitle: "Proteja Su Techo y Su Seguro",
    ctaSub: "No espere a recibir una carta de no renovación. Llámenos hoy para una evaluación profesional del techo y descubra si Peak 301 puede salvar su cobertura, y ahorrarle miles.",
    ctaButton: "OBTENGA SU EVALUACIÓN GRATUITA DEL TECHO",
    bilingualNote: "Do you speak English? Call us, we are a bilingual company.",
    disclaimerLabel: "Aviso Legal:",
    disclaimerText: "La información en esta página se proporciona con fines educativos y no constituye asesoramiento legal. Aunque citamos los estatutos de Florida con precisión, las decisiones de cobertura de seguros involucran muchos factores más allá de la edad del techo. Recomendamos consultar con un agente de seguros con licencia y/o abogado para orientación específica a su póliza y situación. JR One Aluminum LLC es un aplicador autorizado de Peak 301. No somos una compañía de seguros, agente de seguros ni firma legal. Las referencias a estatutos son vigentes a partir de 2026 y pueden estar sujetas a cambios legislativos.",
  },
};

const CARRIER_ICON = {
  check: CheckIcon,
  x: XIcon,
  edge: RoofEdgeIcon,
  shield: ShieldIcon,
};

function PageEyebrow({ children, alert = false }) {
  return (
    <div
      style={{
        display: "inline-block",
        padding: "6px 14px",
        background: alert ? "rgba(177, 26, 33, 0.16)" : "var(--jr-gold-pale)",
        border: `1px solid ${alert ? "rgba(177, 26, 33, 0.4)" : "rgba(212, 175, 55, 0.28)"}`,
        borderRadius: "var(--jr-radius-sm)",
        marginBottom: "var(--jr-space-3)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--jr-font-heading)",
          fontSize: "var(--jr-text-xs)",
          fontWeight: 700,
          color: alert ? "var(--jr-alert)" : "var(--jr-gold)",
          letterSpacing: "3px",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
    </div>
  );
}

export default function InsuranceResourceCenter() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [activeTab, setActiveTab] = useState(0);
  const [openQ, setOpenQ] = useState(null);

  return (
    <div style={{ background: "var(--jr-navy)", color: "var(--jr-paper)", minHeight: "100vh" }}>
      <a href="#main" className="jr-skip-link">Skip to content</a>
      <SiteNav promoBanner={t.promoBanner} />

      <main id="main">
        {/* BREADCRUMB */}
        <div style={{ padding: "var(--jr-space-4) 0 0" }}>
          <Container>
            <nav
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-sm)",
                color: "var(--jr-muted-on-dark)",
              }}
            >
              {t.breadcrumb.map((item, i) => (
                <span key={i}>
                  {i > 0 && <span style={{ margin: "0 8px", opacity: 0.5 }}>/</span>}
                  {i === t.breadcrumb.length - 1 ? (
                    <span style={{ color: "var(--jr-gold)" }}>{item}</span>
                  ) : i === 0 ? (
                    <a href={localizeHref("/", lang)} style={{ color: "var(--jr-muted-on-dark)", textDecoration: "none" }}>
                      {item}
                    </a>
                  ) : item === "Peak 301" ? (
                    <a href={localizeHref("/peak-301", lang)} style={{ color: "var(--jr-muted-on-dark)", textDecoration: "none" }}>
                      {item}
                    </a>
                  ) : (
                    <span style={{ color: "var(--jr-muted-on-dark)" }}>{item}</span>
                  )}
                </span>
              ))}
            </nav>
          </Container>
        </div>

        {/* HERO */}
        <section
          style={{
            padding: "var(--jr-space-12) var(--jr-space-6) var(--jr-space-16)",
            background: "linear-gradient(165deg, var(--jr-navy-deep) 0%, var(--jr-navy) 60%, var(--jr-navy-2) 100%)",
          }}
        >
          <Container>
            <div style={{ maxWidth: 800 }}>
              <PageEyebrow>{t.heroTag}</PageEyebrow>
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
                {t.heroH1}<br />
                <span style={{ color: "var(--jr-gold)" }}>{t.heroH1Gold}</span>
              </h1>
              <p
                style={{
                  fontFamily: "var(--jr-font-body)",
                  fontSize: "var(--jr-text-lg)",
                  color: "var(--jr-cream-2)",
                  lineHeight: 1.7,
                  marginBottom: "var(--jr-space-8)",
                  maxWidth: 720,
                }}
              >
                {t.heroP}
              </p>
              <div style={{ display: "flex", gap: "var(--jr-space-4)", flexWrap: "wrap" }}>
                <Button href="/peak-301/" variant="primary" size="lg" iconRight>
                  {t.learnPeak301}
                </Button>
                <Button href="tel:8444443114" variant="outline" size="lg" iconLeft={<PhoneIcon size={18} />}>
                  {t.callCta}
                </Button>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "var(--jr-space-5)",
                marginTop: "var(--jr-space-12)",
              }}
            >
              {t.stats.map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--jr-navy-deep)",
                    border: "1px solid var(--jr-navy-3)",
                    borderRadius: "var(--jr-radius-lg)",
                    padding: "var(--jr-space-6)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--jr-font-heading)",
                      fontSize: "var(--jr-text-2xl)",
                      fontWeight: 800,
                      color: "var(--jr-gold)",
                      marginBottom: "var(--jr-space-2)",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--jr-font-body)",
                      fontSize: "var(--jr-text-sm)",
                      color: "var(--jr-muted-on-dark)",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FLORIDA LAW */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <div style={{ textAlign: "center", marginBottom: "var(--jr-space-10)" }}>
              <PageEyebrow alert>{t.knowYourRights}</PageEyebrow>
              <h2
                style={{
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "var(--jr-text-3xl)",
                  fontWeight: 700,
                  color: "var(--jr-paper)",
                  letterSpacing: "0.3px",
                  lineHeight: 1.2,
                  marginBottom: "var(--jr-space-3)",
                }}
              >
                {t.lawTitle}
              </h2>
              <div
                aria-hidden
                style={{
                  width: 60,
                  height: 3,
                  background: "var(--jr-gold)",
                  borderRadius: 2,
                  margin: "var(--jr-space-3) auto var(--jr-space-4)",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--jr-font-body)",
                  fontSize: "var(--jr-text-lg)",
                  color: "var(--jr-muted-on-dark)",
                  maxWidth: 640,
                  margin: "0 auto",
                  lineHeight: 1.65,
                }}
              >
                {t.lawIntro}
              </p>
            </div>
            <div style={{ display: "grid", gap: "var(--jr-space-5)" }}>
              {t.laws.map((law, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--jr-navy)",
                    border: "1px solid var(--jr-navy-3)",
                    borderRadius: "var(--jr-radius-lg)",
                    padding: "var(--jr-space-8)",
                  }}
                >
                  <PageEyebrow>{law.tag}</PageEyebrow>
                  <h3
                    style={{
                      fontFamily: "var(--jr-font-heading)",
                      fontSize: "var(--jr-text-xl)",
                      fontWeight: 700,
                      color: "var(--jr-paper)",
                      marginBottom: "var(--jr-space-4)",
                    }}
                  >
                    {law.title}
                  </h3>
                  {law.points.map((point, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        gap: "var(--jr-space-3)",
                        marginBottom: "var(--jr-space-3)",
                        alignItems: "flex-start",
                      }}
                    >
                      <span style={{ color: "var(--jr-gold)", flexShrink: 0, marginTop: 2 }}>
                        <CheckIcon size={16} />
                      </span>
                      <p
                        style={{
                          fontFamily: "var(--jr-font-body)",
                          fontSize: "var(--jr-text-md)",
                          color: "var(--jr-muted-on-dark)",
                          lineHeight: 1.65,
                        }}
                      >
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              style={{
                background: "var(--jr-gold-pale)",
                border: "1px solid var(--jr-gold)",
                borderRadius: "var(--jr-radius-lg)",
                padding: "var(--jr-space-6)",
                marginTop: "var(--jr-space-8)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "var(--jr-text-sm)",
                  fontWeight: 700,
                  color: "var(--jr-gold)",
                  letterSpacing: "1.5px",
                  marginBottom: "var(--jr-space-2)",
                }}
              >
                {t.bottomLine}
              </p>
              <p
                style={{
                  fontFamily: "var(--jr-font-body)",
                  fontSize: "var(--jr-text-md)",
                  color: "var(--jr-paper)",
                  maxWidth: 720,
                  margin: "0 auto",
                  lineHeight: 1.65,
                }}
              >
                {t.bottomLineText}
              </p>
            </div>
          </Container>
        </section>

        {/* CARRIER TYPES */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading
              eyebrow={t.carrierGuide}
              title={t.carrierTitle}
              subtitle={t.carrierIntro}
              theme="dark"
            />
            <div
              style={{
                display: "flex",
                gap: "var(--jr-space-2)",
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: "var(--jr-space-8)",
              }}
            >
              {t.carrierTypes.map((ct, i) => {
                const Icon = CARRIER_ICON[ct.icon] || ShieldIcon;
                const active = activeTab === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className="jr-press"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 18px",
                      fontFamily: "var(--jr-font-heading)",
                      fontSize: "var(--jr-text-xs)",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      color: active ? "var(--jr-gold)" : "var(--jr-muted-on-dark)",
                      background: active ? "var(--jr-gold-pale)" : "transparent",
                      border: `1px solid ${active ? "var(--jr-gold)" : "var(--jr-navy-3)"}`,
                      borderRadius: "var(--jr-radius-md)",
                      cursor: "pointer",
                      transition:
                        "background-color var(--jr-dur-fast) var(--jr-ease-out), color var(--jr-dur-fast) var(--jr-ease-out), border-color var(--jr-dur-fast) var(--jr-ease-out)",
                    }}
                  >
                    <Icon size={14} /> {ct.type.toUpperCase()}
                  </button>
                );
              })}
            </div>
            {t.carrierTypes.map((ct, i) => {
              if (activeTab !== i) return null;
              const Icon = CARRIER_ICON[ct.icon] || ShieldIcon;
              return (
                <div
                  key={i}
                  style={{
                    background: "var(--jr-navy-deep)",
                    border: "1px solid var(--jr-navy-3)",
                    borderRadius: "var(--jr-radius-xl)",
                    padding: "var(--jr-space-10) var(--jr-space-8)",
                    maxWidth: 880,
                    margin: "0 auto",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--jr-space-4)",
                      marginBottom: "var(--jr-space-5)",
                    }}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "var(--jr-radius-md)",
                        background: "var(--jr-gold-pale)",
                        border: "1px solid rgba(212, 175, 55, 0.32)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--jr-gold)",
                      }}
                    >
                      <Icon size={28} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--jr-font-heading)",
                        fontSize: "var(--jr-text-2xl)",
                        fontWeight: 700,
                        color: "var(--jr-paper)",
                      }}
                    >
                      {ct.type}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--jr-font-body)",
                      fontSize: "var(--jr-text-md)",
                      color: "var(--jr-cream-2)",
                      lineHeight: 1.7,
                      marginBottom: "var(--jr-space-6)",
                    }}
                  >
                    {ct.desc}
                  </p>
                  <div
                    style={{
                      background: "var(--jr-gold-pale)",
                      border: "1px solid rgba(212, 175, 55, 0.32)",
                      borderRadius: "var(--jr-radius-md)",
                      padding: "var(--jr-space-5)",
                      marginBottom: "var(--jr-space-3)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--jr-font-heading)",
                        fontSize: "var(--jr-text-xs)",
                        fontWeight: 700,
                        color: "var(--jr-gold)",
                        letterSpacing: "2px",
                        marginBottom: "var(--jr-space-2)",
                      }}
                    >
                      {t.whatThisMeans}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--jr-font-body)",
                        fontSize: "var(--jr-text-md)",
                        color: "var(--jr-paper)",
                        lineHeight: 1.65,
                      }}
                    >
                      {ct.whatItMeans}
                    </p>
                  </div>
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      borderRadius: "var(--jr-radius-md)",
                      padding: "var(--jr-space-5)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--jr-font-heading)",
                        fontSize: "var(--jr-text-xs)",
                        fontWeight: 700,
                        color: "var(--jr-gold)",
                        letterSpacing: "2px",
                        marginBottom: "var(--jr-space-2)",
                      }}
                    >
                      {t.howToIdentify}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--jr-font-body)",
                        fontSize: "var(--jr-text-md)",
                        color: "var(--jr-muted-on-dark)",
                        lineHeight: 1.65,
                      }}
                    >
                      {ct.lookFor}
                    </p>
                  </div>
                </div>
              );
            })}
          </Container>
        </section>

        {/* ACTION PLAN */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container size="narrow">
            <SectionHeading
              eyebrow={t.actionPlan}
              title={t.stepsTitle}
              subtitle={t.stepsIntro}
              theme="dark"
            />
            <div style={{ display: "grid", gap: "var(--jr-space-4)" }}>
              {t.steps.map((step) => (
                <div
                  key={step.num}
                  style={{
                    background: "var(--jr-navy)",
                    border: "1px solid var(--jr-navy-3)",
                    borderRadius: "var(--jr-radius-lg)",
                    padding: "var(--jr-space-5) var(--jr-space-6)",
                    display: "flex",
                    gap: "var(--jr-space-5)",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "var(--jr-gold)",
                      color: "var(--jr-navy)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--jr-font-heading)",
                      fontSize: "var(--jr-text-sm)",
                      fontWeight: 800,
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--jr-font-heading)",
                        fontSize: "var(--jr-text-md)",
                        fontWeight: 700,
                        color: "var(--jr-paper)",
                        marginBottom: "var(--jr-space-2)",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--jr-font-body)",
                        fontSize: "var(--jr-text-md)",
                        color: "var(--jr-muted-on-dark)",
                        lineHeight: 1.65,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* DOWNLOAD CENTER */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading
              eyebrow={t.downloadCenter}
              title={t.toolkitTitle}
              subtitle={t.toolkitIntro}
              theme="dark"
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "var(--jr-space-5)",
              }}
            >
              {t.documents.map((doc, i) => (
                <div
                  key={i}
                  className="jr-hover-lift"
                  style={{
                    background: "var(--jr-navy-deep)",
                    border: "1px solid var(--jr-navy-3)",
                    borderRadius: "var(--jr-radius-lg)",
                    padding: "var(--jr-space-6)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "var(--jr-radius-md)",
                      background: "var(--jr-gold-pale)",
                      border: "1px solid rgba(212, 175, 55, 0.32)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--jr-gold)",
                      marginBottom: "var(--jr-space-4)",
                    }}
                  >
                    <CardIcon size={26} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--jr-font-heading)",
                      fontSize: "var(--jr-text-md)",
                      fontWeight: 700,
                      color: "var(--jr-paper)",
                      marginBottom: "var(--jr-space-3)",
                    }}
                  >
                    {doc.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--jr-font-body)",
                      fontSize: "var(--jr-text-sm)",
                      color: "var(--jr-muted-on-dark)",
                      lineHeight: 1.65,
                      flex: 1,
                      marginBottom: "var(--jr-space-5)",
                    }}
                  >
                    {doc.desc}
                  </p>
                  <div style={{ display: "flex", gap: "var(--jr-space-2)", flexWrap: "wrap" }}>
                    <Button
                      href={`/documents/${doc.file}`}
                      variant="primary"
                      size="sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.englishPdf}
                    </Button>
                    <Button
                      href={`/documents/es-${doc.file}`}
                      variant="outline"
                      size="sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.spanishPdf}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* QUESTIONS FOR AGENT */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container size="prose">
            <SectionHeading
              eyebrow={t.bePrepared}
              title={t.questionsTitle}
              subtitle={t.questionsIntro}
              theme="dark"
            />
            <div>
              {t.questionsForAgent.map((item, i) => {
                const isOpen = openQ === i;
                return (
                  <div
                    key={i}
                    style={{
                      borderTop: i === 0 ? "1px solid var(--jr-navy-3)" : "none",
                      borderBottom: "1px solid var(--jr-navy-3)",
                    }}
                  >
                    <button
                      onClick={() => setOpenQ(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      style={{
                        width: "100%",
                        padding: "var(--jr-space-5) var(--jr-space-1)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "var(--jr-space-4)",
                        textAlign: "left",
                      }}
                    >
                      <div style={{ display: "flex", gap: "var(--jr-space-3)", alignItems: "flex-start", flex: 1 }}>
                        <span
                          style={{
                            fontFamily: "var(--jr-font-heading)",
                            fontSize: "var(--jr-text-sm)",
                            fontWeight: 800,
                            color: "var(--jr-gold)",
                            flexShrink: 0,
                          }}
                        >
                          Q{i + 1}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--jr-font-heading)",
                            fontSize: "var(--jr-text-md)",
                            fontWeight: 600,
                            color: "var(--jr-paper)",
                          }}
                        >
                          {item.q}
                        </span>
                      </div>
                      <span
                        aria-hidden
                        style={{
                          color: "var(--jr-gold)",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform var(--jr-dur-base) var(--jr-ease-out)",
                          flexShrink: 0,
                          display: "inline-flex",
                        }}
                      >
                        <ChevronDownIcon size={20} />
                      </span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: "0 var(--jr-space-1) var(--jr-space-5) var(--jr-space-8)" }}>
                        <p
                          style={{
                            fontFamily: "var(--jr-font-heading)",
                            fontSize: "var(--jr-text-xs)",
                            fontWeight: 700,
                            color: "var(--jr-gold)",
                            letterSpacing: "2px",
                            marginBottom: "var(--jr-space-2)",
                          }}
                        >
                          {t.whyThisMatters}
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--jr-font-body)",
                            fontSize: "var(--jr-text-md)",
                            color: "var(--jr-muted-on-dark)",
                            lineHeight: 1.7,
                          }}
                        >
                          {item.why}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container size="prose">
            <SectionHeading eyebrow={t.faqTag} title={t.faqTitle} theme="dark" />
            <FAQAccordion items={t.faqs} theme="dark" />
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
              {t.ctaTitle}
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
              {t.ctaSub}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--jr-space-4)",
                justifyContent: "center",
              }}
            >
              <Button href="/peak-301/" variant="primary" size="lg" iconRight>
                {t.ctaButton}
              </Button>
              <Button href="tel:8444443114" variant="outline" size="lg" iconLeft={<PhoneIcon size={18} />}>
                {t.callCta}
              </Button>
            </div>
            <p
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-sm)",
                color: "var(--jr-muted-on-dark)",
                marginTop: "var(--jr-space-6)",
              }}
            >
              {t.bilingualNote}
            </p>
          </Container>
        </section>

        {/* DISCLAIMER */}
        <section
          style={{
            background: "var(--jr-navy-deep)",
            padding: "var(--jr-space-8) 0",
            borderTop: "1px solid var(--jr-navy-3)",
          }}
        >
          <Container size="narrow">
            <p
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-xs)",
                color: "var(--jr-muted-on-dark)",
                lineHeight: 1.6,
                textAlign: "center",
              }}
            >
              <strong style={{ color: "var(--jr-cream-2)" }}>{t.disclaimerLabel}</strong> {t.disclaimerText}
            </p>
          </Container>
        </section>
      </main>

      <SiteFooter />
      <MobileCTA />
    </div>
  );
}
