import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import MobileCTA from "@/components/MobileCTA";

const C = {
  bg: "#0B1628",
  navy: "#1B2A4A",
  gold: "#D4AF37",
  cream: "#F5F3EF",
  muted: "#7A8FA8",
};
const f = { h: "'Montserrat', sans-serif", b: "'Source Sans 3', sans-serif" };

const CITY_GROUPS = [
  {
    county: "Condado de Hillsborough",
    cities: ["tampa", "new-tampa", "brandon", "riverview", "ruskin", "sun-city-center", "temple-terrace", "plant-city", "lutz", "valrico", "lithia"],
  },
  {
    county: "Condado de Pinellas",
    cities: ["clearwater", "st-petersburg", "palm-harbor", "largo", "tarpon-springs", "dunedin", "oldsmar", "safety-harbor", "seminole", "pinellas-park"],
  },
  {
    county: "Condado de Pasco",
    cities: ["wesley-chapel", "land-o-lakes", "new-port-richey"],
  },
  {
    county: "Condado de Hernando",
    cities: ["spring-hill"],
  },
  {
    county: "Condado de Manatee",
    cities: ["bradenton"],
  },
  {
    county: "Condado de Polk",
    cities: ["lakeland"],
  },
  {
    county: "Condado de Sarasota",
    cities: ["sarasota"],
  },
];

const slugToCity = (slug) =>
  slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

export const metadata = {
  title: "Zonas de Servicio, JR One Aluminum LLC, Canaletas Tampa Bay",
  description: "Canaletas sin costura, sofito, fascia, protectores de canaletas y siding en 28 ciudades del area de Tampa Bay. Condados de Hillsborough, Pinellas, Pasco, Manatee, Sarasota, Polk y Hernando.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/areas",
    languages: {
      "en-US": "https://www.jronegutters.com/areas",
      "es-US": "https://www.jronegutters.com/es/areas",
      "x-default": "https://www.jronegutters.com/areas",
    },
  },
};

export default function AreasIndexPageES() {
  const allCities = CITY_GROUPS.flatMap((g) => g.cities);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
      { "@type": "ListItem", position: 2, name: "Zonas de Servicio", item: "https://www.jronegutters.com/es/areas" },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Zonas de Servicio de JR One Aluminum",
    url: "https://www.jronegutters.com/es/areas",
    description: "28 ciudades de Tampa Bay atendidas por JR One Aluminum LLC para canaletas sin costura, sofito, fascia, protectores, cobre, iluminacion Govee permanente y siding.",
    isPartOf: {
      "@type": "WebSite",
      name: "JR One Aluminum LLC",
      url: "https://www.jronegutters.com",
    },
    hasPart: allCities.map((slug) => ({
      "@type": "WebPage",
      name: `${slugToCity(slug)}, FL`,
      url: `https://www.jronegutters.com/es/areas/${slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <SiteNav />
      <main id="main" style={{ background: C.bg, color: C.cream, fontFamily: f.b, minHeight: "100vh" }}>
        <section style={{ padding: "var(--jr-space-16) var(--jr-space-6) var(--jr-space-8)", textAlign: "center" }}>
          <div style={{ maxWidth: "var(--jr-container)", margin: "0 auto" }}>
            <nav style={{ fontFamily: f.b, fontSize: "var(--jr-text-sm)", color: C.muted, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: "var(--jr-space-4)" }}>
              <Link href="/es" style={{ color: C.muted, textDecoration: "none" }}>Inicio</Link>
              <span style={{ opacity: 0.5 }}>/</span>
              <span style={{ color: C.gold }}>Zonas de Servicio</span>
            </nav>
            <h1 style={{ fontFamily: f.h, fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: C.cream, lineHeight: 1.15, marginBottom: "var(--jr-space-4)" }}>
              Zonas de Servicio de JR One
            </h1>
            <p style={{ fontSize: "var(--jr-text-lg)", color: C.muted, maxWidth: "780px", margin: "0 auto var(--jr-space-2)" }}>
              28 ciudades en 7 condados del area de Tampa Bay. Canaletas de aluminio sin costura, sofito, fascia, protectores de canaletas, cobre, iluminacion Govee permanente, siding y drenaje. Mas de 30 anos en el oficio, empresa familiar, totalmente asegurada.
            </p>
            <p style={{ fontSize: "var(--jr-text-base)", color: C.muted }}>
              <a href="tel:+18444443114" style={{ color: C.gold, fontWeight: 600, textDecoration: "none" }}>Estimado gratis: (844) 444-3114</a>
            </p>
          </div>
        </section>

        <section style={{ padding: "var(--jr-space-8) var(--jr-space-6) var(--jr-space-16)" }}>
          <div style={{ maxWidth: "var(--jr-container)", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--jr-space-8)" }}>
            {CITY_GROUPS.map((group) => (
              <div key={group.county} style={{ background: C.navy, border: `1px solid rgba(212,175,55,0.18)`, borderRadius: "var(--jr-radius-md)", padding: "var(--jr-space-6)" }}>
                <h2 style={{ fontFamily: f.h, fontSize: "var(--jr-text-xl)", fontWeight: 600, color: C.gold, marginBottom: "var(--jr-space-4)", letterSpacing: "0.02em" }}>
                  {group.county}
                </h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--jr-space-2)" }}>
                  {group.cities.map((slug) => (
                    <li key={slug}>
                      <Link
                        href={`/es/areas/${slug}`}
                        style={{ color: C.cream, fontSize: "var(--jr-text-base)", textDecoration: "none", display: "block", padding: "8px 12px", borderRadius: "4px", transition: "background 0.15s" }}
                        className="jr-area-link"
                      >
                        {slugToCity(slug)}, FL
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileCTA />
    </>
  );
}
