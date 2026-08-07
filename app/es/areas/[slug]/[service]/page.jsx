// Spanish mirror of /areas/[slug]/[service]. Added 2026-08-07 with the
// Brandon + Lutz buildout. Renders ONLY the six pairs in ES_COMBO_PAIRS, each of
// which carries real enriched Spanish copy. See lib/city-service-es.js for why
// the scope is narrow, and projects/brandon-lutz/measurement-and-plan-2026-08.md
// for the demand data behind the six.
//
// dynamicParams = false, so anything outside the six is a real 404 rather than a
// soft-404 Spanish page. Same discipline as the 2026-06-15 audit applied to
// /areas/[slug].

import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import MobileCTA from "@/components/MobileCTA";
import CityPortfolio from "@/components/CityPortfolio";
import { ES_COMBO_PAIRS, SERVICES_ES, CITY_META_ES, ENRICHMENT_ES } from "@/lib/city-service-es";

const C = {
  bg: "#0B1628",
  navy: "#1B2A4A",
  navyMid: "#243556",
  navyLight: "#2C3E5A",
  navyFade: "linear-gradient(180deg, #1B2A4A 0%, #0B1628 100%)",
  gold: "#D4AF37",
  goldPale: "rgba(200,149,46,0.12)",
  cream: "#F5F3EF",
  white: "#FFFFFF",
  offWhite: "#E8E4DC",
  muted: "#7A8FA8",
  charcoal: "#2D2D2D",
};
const f = { h: "'Montserrat', sans-serif", b: "'Source Sans 3', sans-serif" };

const pairKey = (slug, service) => `${slug}/${service}`;

// A pair only renders when the enrichment actually exists. This is what keeps the
// English route's es-US hreflang honest: if someone adds a slug to ES_COMBO_PAIRS
// and forgets the copy, the build drops the param instead of shipping an
// alternate that points at a 404.
export async function generateStaticParams() {
  return [...ES_COMBO_PAIRS]
    .filter((pair) => ENRICHMENT_ES[pair])
    .map((pair) => {
      const [slug, service] = pair.split("/");
      return { slug, service };
    });
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug, service } = await params;
  const pair = pairKey(slug, service);
  if (!ES_COMBO_PAIRS.has(pair) || !ENRICHMENT_ES[pair]) return { title: "No Encontrado" };

  const city = CITY_META_ES[slug];
  const svc = SERVICES_ES[service];
  const url = `https://www.jronegutters.com/es/areas/${slug}/${service}`;
  const enUrl = `https://www.jronegutters.com/areas/${slug}/${service}`;

  return {
    title: { absolute: `${svc.name} en ${city.name}, FL | JR One` },
    description: `${svc.name} en ${city.name}, Florida. Empresa familiar con más de 30 años en Tampa Bay. Equipos propios y asegurados. Estimado gratis: (844) 444-3114.`,
    alternates: {
      canonical: url,
      languages: {
        "en-US": enUrl,
        "es-US": url,
        "x-default": enUrl,
      },
    },
    keywords: [
      `${svc.short} ${city.name} FL`,
      `${svc.short} en ${city.name}`,
      `${svc.name} ${city.name}`,
      `contratista de aluminio ${city.name}`,
    ],
    openGraph: {
      title: `${svc.name} en ${city.name}, FL`,
      description: `${svc.name} en ${city.name}, FL. Contratista especialista en aluminio, más de 30 años. (844) 444-3114.`,
      url,
      type: "website",
      locale: "es_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${svc.name} en ${city.name}, FL`,
      description: `${svc.name} en ${city.name}, FL. Estimado gratis, (844) 444-3114.`,
    },
  };
}

export default async function EsCityServicePage({ params }) {
  const { slug, service } = await params;
  const pair = pairKey(slug, service);
  if (!ES_COMBO_PAIRS.has(pair) || !ENRICHMENT_ES[pair]) notFound();

  const city = CITY_META_ES[slug];
  const svc = SERVICES_ES[service];
  const enrichment = ENRICHMENT_ES[pair];
  const url = `https://www.jronegutters.com/es/areas/${slug}/${service}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${svc.name} en ${city.name}, FL`,
    serviceType: svc.name,
    description: `${svc.blurb} Al servicio de propietarios en ${city.name}, Florida, con más de 30 años como especialistas en aluminio en Tampa Bay.`,
    inLanguage: "es",
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
    },
    offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
      { "@type": "ListItem", position: 2, name: "Áreas de Servicio", item: "https://www.jronegutters.com/es/areas" },
      { "@type": "ListItem", position: 3, name: city.name, item: `https://www.jronegutters.com/es/areas/${slug}` },
      { "@type": "ListItem", position: 4, name: svc.name, item: url },
    ],
  };

  // Same FAQPage decision as the English route (see the long note there,
  // 2026-08-02): kept deliberately for Bing and the AI/RAG crawlers, which is the
  // AEO-first surface this site optimizes for.
  const faqSchema = enrichment.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: "es",
        mainEntity: enrichment.faqs.map((q) => ({
          "@type": "Question",
          name: q.q,
          acceptedAnswer: { "@type": "Answer", text: q.a },
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
                {city.name.toUpperCase()}, FL / CONTRATISTA ESPECIALISTA EN ALUMINIO
              </span>
            </div>
            <h1 style={{ fontFamily: f.h, fontSize: "clamp(32px,5vw,54px)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 18px", color: C.white }}>
              {svc.name} en <span style={{ color: C.gold }}>{city.name}, FL</span>
            </h1>
            <p style={{ fontSize: "18px", color: C.offWhite, maxWidth: "720px", margin: "0 auto 28px", lineHeight: 1.6 }}>
              {svc.blurb}
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="tel:+18444443114" style={{ background: C.gold, color: C.navy, padding: "14px 28px", borderRadius: "8px", fontFamily: f.h, fontWeight: 700, textDecoration: "none", fontSize: "15px" }}>
                Llame al (844) 444-3114
              </a>
              <Link href="/estimator" style={{ background: "transparent", color: C.white, border: `2px solid ${C.gold}`, padding: "12px 28px", borderRadius: "8px", fontFamily: f.h, fontWeight: 700, textDecoration: "none", fontSize: "15px" }}>
                Estimado Gratis
              </Link>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <nav style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px", fontSize: "13px", color: C.muted }}>
          <Link href="/es" style={{ color: C.muted, textDecoration: "none" }}>Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/es/areas" style={{ color: C.muted, textDecoration: "none" }}>Áreas de Servicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href={`/es/areas/${slug}`} style={{ color: C.muted, textDecoration: "none" }}>{city.name}</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: C.gold }}>{svc.name}</span>
        </nav>

        {/* Intro */}
        <section style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
          <h2 style={{ fontFamily: f.h, fontSize: "28px", fontWeight: 700, color: C.gold, marginBottom: "18px" }}>
            Por qué importa {svc.short} en {city.name}
          </h2>
          <p style={{ fontSize: "17px", lineHeight: 1.7, color: C.offWhite, marginBottom: "18px" }}>
            {enrichment.introOverride}
          </p>
          <p style={{ fontSize: "17px", lineHeight: 1.7, color: C.offWhite }}>
            {svc.who} JR One lleva más de 30 años como especialista en aluminio en Tampa Bay, y traemos el mismo estándar a cada trabajo en {city.name}: totalmente asegurados, bilingües en inglés y español, empresa familiar.
          </p>
          {enrichment.trustNumbers?.length > 0 && (
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: C.gold, marginTop: "18px", fontStyle: "italic" }}>
              {enrichment.trustNumbers.join(" / ")}
            </p>
          )}
        </section>

        {/* Value props */}
        <section style={{ background: C.navyFade, padding: "50px 20px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: f.h, fontSize: "26px", fontWeight: 700, color: C.white, textAlign: "center", marginBottom: "36px" }}>
              Lo que recibe un propietario de {city.name} con JR One
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "22px" }}>
              {enrichment.propsOverride.map(([title, body]) => (
                <div key={title} style={{ background: C.navyMid, padding: "22px", borderRadius: "10px", border: `1px solid ${C.navyLight}` }}>
                  <h3 style={{ fontFamily: f.h, fontSize: "16px", fontWeight: 700, color: C.gold, marginBottom: "8px" }}>{title}</h3>
                  <p style={{ fontSize: "14.5px", color: C.offWhite, lineHeight: 1.55, margin: 0 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CompanyCam evidence */}
        <section
          className="city-portfolio-section"
          style={{ background: C.cream, color: C.charcoal, padding: "60px 20px" }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <CityPortfolio citySlug={slug} cityName={city.name} serviceFilter={service} limit={9} />
          </div>
        </section>

        {/* FAQ */}
        {enrichment.faqs?.length > 0 && (
          <section style={{ maxWidth: "900px", margin: "0 auto", padding: "50px 20px" }}>
            <h2 style={{ fontFamily: f.h, fontSize: "28px", fontWeight: 700, color: C.gold, marginBottom: "28px", textAlign: "center" }}>
              Preguntas frecuentes sobre {svc.short} en {city.name}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              {enrichment.faqs.map((q, i) => (
                <div key={i} style={{ background: C.navyMid, padding: "22px 24px", borderRadius: "10px", border: `1px solid ${C.navyLight}` }}>
                  <h3 style={{ fontFamily: f.h, fontSize: "17px", fontWeight: 700, color: C.white, margin: "0 0 12px" }}>
                    {q.q}
                  </h3>
                  <p style={{ fontSize: "15.5px", color: C.offWhite, lineHeight: 1.65, margin: 0 }}>
                    {q.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Neighborhood callouts */}
        {enrichment.neighborhoodsOfNote?.length > 0 && (
          <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 20px 40px" }}>
            <div style={{ background: C.navyMid, padding: "28px", borderRadius: "10px", border: `1px solid ${C.gold}` }}>
              <h3 style={{ fontFamily: f.h, fontSize: "18px", fontWeight: 700, color: C.gold, marginBottom: "14px" }}>
                {svc.name} en los barrios de {city.name}
              </h3>
              <p style={{ fontSize: "15px", color: C.offWhite, lineHeight: 1.65, margin: "0 0 14px" }}>
                Trabajamos {svc.short} en todo {city.name}, incluyendo:
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

        {/* Cross-links: the other ES combos in this same city, plus the ES city page */}
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 20px 50px" }}>
          <div style={{ background: C.navyMid, padding: "24px", borderRadius: "10px" }}>
            <h3 style={{ fontFamily: f.h, fontSize: "17px", fontWeight: 700, color: C.gold, marginBottom: "14px" }}>
              También en {city.name}
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[...ES_COMBO_PAIRS]
                .filter((p) => p.startsWith(`${slug}/`) && p !== pair && ENRICHMENT_ES[p])
                .map((p) => {
                  const other = p.split("/")[1];
                  return (
                    <li key={p} style={{ marginBottom: "8px" }}>
                      <Link href={`/es/areas/${slug}/${other}`} style={{ color: C.offWhite, textDecoration: "none", fontSize: "14.5px" }}>
                        › {SERVICES_ES[other].name} en {city.name}
                      </Link>
                    </li>
                  );
                })}
              <li style={{ marginBottom: "8px" }}>
                <Link href={`/es/areas/${slug}`} style={{ color: C.offWhite, textDecoration: "none", fontSize: "14.5px" }}>
                  › Todos los servicios en {city.name}
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 100%)`, padding: "60px 20px", textAlign: "center" }}>
          <h2 style={{ fontFamily: f.h, fontSize: "28px", fontWeight: 800, color: C.white, marginBottom: "14px" }}>
            ¿Listo para {svc.short} en {city.name}?
          </h2>
          <p style={{ fontSize: "16px", color: C.offWhite, maxWidth: "560px", margin: "0 auto 26px", lineHeight: 1.6 }}>
            Estimado gratis, sin presión. Atendemos en inglés y español. Contratista especialista en aluminio, totalmente asegurado, al servicio de {city.name} y todo Tampa Bay.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:+18444443114" style={{ background: C.gold, color: C.navy, padding: "15px 32px", borderRadius: "8px", fontFamily: f.h, fontWeight: 800, textDecoration: "none", fontSize: "16px" }}>
              Llame al (844) 444-3114
            </a>
            <Link href={svc.link} style={{ background: "transparent", color: C.white, border: `2px solid ${C.gold}`, padding: "13px 32px", borderRadius: "8px", fontFamily: f.h, fontWeight: 700, textDecoration: "none", fontSize: "16px" }}>
              Más sobre {svc.name}
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
