"use client";

// ServiceAreaList -- renders all 29 city links for a given service slug, each
// pointing at the /areas/{city}/{service} combo page. Added 2026-05-26 per audit
// Tier 2.4 to feed internal link equity from top-level service pages down to
// the 232 combo pages that were previously orphans from the service-page side
// of the link graph.
//
// Source of truth for the city list: app/sitemap.js CITY_SLUGS.

import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import { localizeHref } from "../lib/locale";

const CITY_SLUGS = [
  "tampa", "clearwater", "st-petersburg", "sarasota", "bradenton",
  "lakeland", "brandon", "wesley-chapel", "palm-harbor", "riverview",
  "new-port-richey", "largo", "spring-hill", "tarpon-springs",
  "land-o-lakes", "dunedin", "ruskin", "sun-city-center",
  "temple-terrace", "plant-city", "lutz",
  "new-tampa", "valrico", "lithia", "oldsmar", "safety-harbor",
  "seminole", "pinellas-park", "south-tampa",
];

const CITY_DISPLAY = {
  "tampa": "Tampa",
  "clearwater": "Clearwater",
  "st-petersburg": "St. Petersburg",
  "sarasota": "Sarasota",
  "bradenton": "Bradenton",
  "lakeland": "Lakeland",
  "brandon": "Brandon",
  "wesley-chapel": "Wesley Chapel",
  "palm-harbor": "Palm Harbor",
  "riverview": "Riverview",
  "new-port-richey": "New Port Richey",
  "largo": "Largo",
  "spring-hill": "Spring Hill",
  "tarpon-springs": "Tarpon Springs",
  "land-o-lakes": "Land O' Lakes",
  "dunedin": "Dunedin",
  "ruskin": "Ruskin",
  "sun-city-center": "Sun City Center",
  "temple-terrace": "Temple Terrace",
  "plant-city": "Plant City",
  "lutz": "Lutz",
  "new-tampa": "New Tampa",
  "valrico": "Valrico",
  "lithia": "Lithia",
  "oldsmar": "Oldsmar",
  "safety-harbor": "Safety Harbor",
  "seminole": "Seminole",
  "pinellas-park": "Pinellas Park",
  "south-tampa": "South Tampa",
};

export default function ServiceAreaList({ service, serviceLabel, lang = "en" }) {
  const heading = lang === "es" ? "Areas de Servicio" : "Service Areas";
  const eyebrow = lang === "es" ? "DONDE TRABAJAMOS" : "WHERE WE WORK";
  const sub = lang === "es"
    ? `${serviceLabel} en todo Tampa Bay. Pulse su ciudad para ver detalles locales y agendar.`
    : `${serviceLabel} across Tampa Bay. Tap your city for local detail and to book.`;

  return (
    <section style={{ background: "var(--jr-paper)", padding: "var(--jr-space-16) 0", borderTop: "1px solid rgba(27,42,74,0.08)" }}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={heading} subtitle={sub} theme="light" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "var(--jr-space-3)",
            marginTop: "var(--jr-space-6)",
          }}
        >
          {CITY_SLUGS.map((slug) => (
            <a
              key={slug}
              href={localizeHref(`/areas/${slug}/${service}`, lang)}
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(27,42,74,0.10)",
                borderLeft: "3px solid var(--jr-gold)",
                borderRadius: "var(--jr-radius-sm)",
                padding: "var(--jr-space-3) var(--jr-space-4)",
                textDecoration: "none",
                color: "var(--jr-navy)",
                fontFamily: "var(--jr-font-heading)",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {serviceLabel} {CITY_DISPLAY[slug] || slug}
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
