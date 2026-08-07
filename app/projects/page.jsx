"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM: PROJECTS GALLERY
   Brand-brain compliant. Tokens via app/tokens.css.
   CompanyCam API logic + lightbox preserved verbatim.
   ═══════════════════════════════════════════════════════════ */

import { useState, useEffect, useCallback } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import ReviewCard from "../../components/ui/ReviewCard";
import CTABand from "../../components/ui/CTABand";
import { useLanguage } from "../../lib/LanguageContext";
import { XIcon, ChevronRightIcon } from "../../lib/icons";

const T = {
  en: {
    tag: "OUR WORK",
    heroTitle1: "Real Projects.",
    heroTitle2: "Real Homes.",
    heroP: "Every photo is from an actual JR One job. No stock images, no staged shoots. This is what our craftsmanship looks like across Tampa Bay.",
    statProjects: "Completed projects",
    statRating: "Google rating",
    statCities: "Cities served",
    statExperience: "Years experience",
    statUnitNote: "A project is one job at one address. A single project can carry gutters, soffit, and fascia as three separate installations, so our per-service installation counts run higher than the project count.",
    filterAll: "All",
    loading: "Loading projects from CompanyCam...",
    error: "Could not load project photos. Please try again later.",
    noPhotos: "No photos found for this filter.",
    ctaTitle: "Your Home Could Be Next",
    ctaP: "Every project in this gallery started with a phone call or a form submission. Ready to see what JR One can do for your home?",
    reviews: [
      { text: "Work was done exactly to the quote and mock-up images. Not one detail missed.", name: "Jaclyn G.", service: "Gutters & Soffits", stars: 5 },
      { text: "Amazing work and so respectful. Their work was beautiful and had it all done in one day.", name: "Jessica L.", service: "Same-Day Install", stars: 5 },
      { text: "They took pictures of each step showing me what was transpiring. The workmanship was outstanding.", name: "Lois G.", service: "Full Install", stars: 5 },
    ],
  },
  es: {
    tag: "NUESTRO TRABAJO",
    heroTitle1: "Proyectos Reales.",
    heroTitle2: "Hogares Reales.",
    heroP: "Cada foto es de un trabajo real de JR One. Sin imágenes de archivo, sin sesiones montadas. Así se ve nuestra artesanía en toda el área de Tampa Bay.",
    statProjects: "Proyectos completados",
    statRating: "Calificación en Google",
    statCities: "Ciudades atendidas",
    statExperience: "Años de experiencia",
    statUnitNote: "Un proyecto es un trabajo en una dirección. Un solo proyecto puede llevar canaletas, sofito y fascia como tres instalaciones distintas, por eso nuestros conteos de instalaciones por servicio son más altos que el conteo de proyectos.",
    filterAll: "Todos",
    loading: "Cargando proyectos desde CompanyCam...",
    error: "No se pudieron cargar las fotos del proyecto. Intente de nuevo más tarde.",
    noPhotos: "No se encontraron fotos para este filtro.",
    ctaTitle: "Su Hogar Podría Ser el Siguiente",
    ctaP: "Cada proyecto en esta galería comenzó con una llamada telefónica o un formulario enviado. ¿Listo para ver lo que JR One puede hacer por su hogar?",
    reviews: [
      { text: "El trabajo se hizo exactamente según el presupuesto y las imágenes de muestra. No se pasó ni un detalle.", name: "Jaclyn G.", service: "Canaletas y Sofitos", stars: 5 },
      { text: "Trabajo increíble y muy respetuosos. Su trabajo fue hermoso y lo terminaron todo en un día.", name: "Jessica L.", service: "Instalación en un día", stars: 5 },
      { text: "Tomaron fotos de cada paso mostrándome lo que estaba pasando. La mano de obra fue excepcional.", name: "Lois G.", service: "Instalación Completa", stars: 5 },
    ],
  },
};

export default function ProjectsPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [filter, setFilter] = useState("all");
  const [photos, setPhotos] = useState([]);
  const [tagLabels, setTagLabels] = useState({});
  const [stats, setStats] = useState({ totalPhotos: 0, totalProjects: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightbox, setLightbox] = useState(null); // { photo, index }

  useEffect(() => {
    fetch("/api/companycam")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load");
        return r.json();
      })
      .then((data) => {
        setPhotos(data.photos || []);
        setTagLabels(data.tagLabels || {});
        setStats({ totalPhotos: data.totalPhotos || 0, totalProjects: data.totalProjects || 0 });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = filter === "all" ? photos : photos.filter((p) => p.tags.includes(filter));
  const filterTabs = [{ key: "all", label: t.filterAll }, ...Object.entries(tagLabels).map(([k, v]) => ({ key: k, label: v }))];

  const openLightbox = (photo) => {
    const idx = filtered.indexOf(photo);
    setLightbox({ photo, index: idx });
  };
  const closeLightbox = () => setLightbox(null);
  const navLightbox = useCallback(
    (dir) => {
      if (!lightbox) return;
      const newIdx = lightbox.index + dir;
      if (newIdx < 0 || newIdx >= filtered.length) return;
      setLightbox({ photo: filtered[newIdx], index: newIdx });
    },
    [lightbox, filtered]
  );

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navLightbox(-1);
      if (e.key === "ArrowRight") navLightbox(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, navLightbox]);

  const statsData = [
    // 2,122 JR One projects documented with photos in CompanyCam (live count, 2026-06-19);
    // shown as a stable floor that stays true as the count grows.
    { v: "2,100+", l: t.statProjects },
    { v: "4.9 ★", l: t.statRating },
    { v: "20+", l: t.statCities },
    { v: "30+", l: t.statExperience },
  ];

  return (
    <div style={{ background: "var(--jr-navy)", color: "var(--jr-paper)", minHeight: "100vh" }}>
      <a href="#main" className="jr-skip-link">Skip to content</a>
      <SiteNav />

      <main id="main">
        {/* HERO */}
        <section
          style={{
            padding: "var(--jr-space-16) var(--jr-space-6) var(--jr-space-8)",
            background: "linear-gradient(165deg, var(--jr-navy-deep) 0%, var(--jr-navy) 60%, var(--jr-navy-2) 100%)",
          }}
        >
          <Container size="narrow" style={{ textAlign: "center" }}>
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
                {t.tag}
              </span>
            </div>
            <h1
              style={{
                fontFamily: "var(--jr-font-heading)",
                fontSize: "var(--jr-text-4xl)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: "var(--jr-space-4)",
                letterSpacing: "-0.5px",
              }}
            >
              {t.heroTitle1}<br />
              <span style={{ color: "var(--jr-gold)" }}>{t.heroTitle2}</span>
            </h1>
            <p
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-lg)",
                color: "var(--jr-cream-2)",
                lineHeight: 1.65,
                maxWidth: "640px",
                margin: "0 auto",
              }}
            >
              {t.heroP}
            </p>
          </Container>
        </section>

        {/* STATS */}
        <section style={{ padding: "var(--jr-space-5) 0 var(--jr-space-10)" }}>
          <Container size="narrow">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "var(--jr-space-10)",
                flexWrap: "wrap",
              }}
            >
              {statsData.map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "var(--jr-font-heading)",
                      fontSize: "var(--jr-text-2xl)",
                      fontWeight: 800,
                      color: "var(--jr-gold)",
                    }}
                  >
                    {s.v}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--jr-font-body)",
                      fontSize: "var(--jr-text-xs)",
                      color: "var(--jr-muted-on-dark)",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-xs)",
                color: "var(--jr-muted-on-dark)",
                textAlign: "center",
                maxWidth: "58ch",
                margin: "var(--jr-space-4) auto 0",
                lineHeight: 1.6,
              }}
            >
              {t.statUnitNote}
            </p>
          </Container>
        </section>

        {/* FILTER TABS */}
        <section style={{ padding: "0 0 var(--jr-space-10)" }}>
          <Container>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "var(--jr-space-2)",
              }}
            >
              {filterTabs.map((tab) => {
                const active = filter === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key)}
                    className="jr-press"
                    style={{
                      padding: "10px 20px",
                      fontFamily: "var(--jr-font-heading)",
                      fontSize: "var(--jr-text-sm)",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      background: active ? "var(--jr-gold)" : "var(--jr-navy-deep)",
                      color: active ? "var(--jr-navy)" : "var(--jr-muted-on-dark)",
                      border: `1px solid ${active ? "var(--jr-gold)" : "var(--jr-navy-3)"}`,
                      borderRadius: "var(--jr-radius-md)",
                      cursor: "pointer",
                      transition:
                        "background-color var(--jr-dur-fast) var(--jr-ease-out), color var(--jr-dur-fast) var(--jr-ease-out), border-color var(--jr-dur-fast) var(--jr-ease-out)",
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </Container>
        </section>

        {/* PHOTO GRID */}
        <section style={{ padding: "0 0 var(--jr-space-20)" }}>
          <Container size="wide">
            {loading && (
              <div style={{ textAlign: "center", padding: "var(--jr-space-16) 0" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    border: "3px solid var(--jr-navy-3)",
                    borderTopColor: "var(--jr-gold)",
                    borderRadius: "50%",
                    animation: "jr-spin 0.8s linear infinite",
                    margin: "0 auto var(--jr-space-4)",
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--jr-font-heading)",
                    fontSize: "var(--jr-text-sm)",
                    color: "var(--jr-muted-on-dark)",
                  }}
                >
                  {t.loading}
                </p>
              </div>
            )}

            {error && (
              <div style={{ textAlign: "center", padding: "var(--jr-space-16) 0" }}>
                <p
                  style={{
                    fontFamily: "var(--jr-font-heading)",
                    fontSize: "var(--jr-text-md)",
                    color: "var(--jr-alert)",
                  }}
                >
                  {t.error}
                </p>
              </div>
            )}

            {!loading && !error && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "var(--jr-space-4)",
                }}
              >
                {filtered.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => openLightbox(photo)}
                    className="jr-hover-lift jr-press"
                    style={{
                      background: "var(--jr-navy-deep)",
                      border: "1px solid var(--jr-navy-3)",
                      borderRadius: "var(--jr-radius-lg)",
                      overflow: "hidden",
                      cursor: "pointer",
                      padding: 0,
                      textAlign: "left",
                      width: "100%",
                      color: "inherit",
                    }}
                  >
                    <div
                      style={{
                        aspectRatio: "4/3",
                        position: "relative",
                        overflow: "hidden",
                        background: "var(--jr-navy)",
                      }}
                    >
                      <img
                        src={photo.web || photo.thumbnail}
                        alt={`${photo.tags.map((tg) => tagLabels[tg] || tg).join(", ")} in ${photo.city || "Tampa Bay"}, ${photo.state || "FL"}`}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 10,
                          display: "flex",
                          gap: 4,
                          flexWrap: "wrap",
                        }}
                      >
                        {photo.tags.slice(0, 2).map((tg) => (
                          <span
                            key={tg}
                            style={{
                              padding: "3px 10px",
                              background: "rgba(11, 22, 40, 0.85)",
                              borderRadius: "var(--jr-radius-sm)",
                              fontFamily: "var(--jr-font-heading)",
                              fontSize: 10,
                              fontWeight: 700,
                              color: "var(--jr-gold)",
                              letterSpacing: "1px",
                              backdropFilter: "blur(4px)",
                            }}
                          >
                            {(tagLabels[tg] || tg).toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                    {photo.city && (
                      <div style={{ padding: "12px 16px" }}>
                        <p
                          style={{
                            fontFamily: "var(--jr-font-body)",
                            fontSize: "var(--jr-text-sm)",
                            color: "var(--jr-muted-on-dark)",
                          }}
                        >
                          {photo.city}, {photo.state}
                        </p>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {!loading && !error && filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "var(--jr-space-16) 0" }}>
                <p
                  style={{
                    fontFamily: "var(--jr-font-heading)",
                    fontSize: "var(--jr-text-md)",
                    color: "var(--jr-muted-on-dark)",
                  }}
                >
                  {t.noPhotos}
                </p>
              </div>
            )}
          </Container>
        </section>

        {/* CTA */}
        <CTABand title={t.ctaTitle} sub={t.ctaP} primaryHref="/contact" />

        {/* REVIEW STRIP */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-16) 0" }}>
          <Container>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "var(--jr-space-5)",
              }}
            >
              {t.reviews.map((rev, i) => (
                <ReviewCard key={i} {...rev} />
              ))}
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
      <MobileCTA />

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(11, 22, 40, 0.94)",
            zIndex: "var(--jr-z-modal)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "var(--jr-space-5)",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              borderRadius: "var(--jr-radius-pill)",
              color: "var(--jr-paper)",
              cursor: "pointer",
              width: 44,
              height: 44,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <XIcon size={20} />
          </button>

          {lightbox.index > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navLightbox(-1);
              }}
              aria-label="Previous"
              style={{
                position: "absolute",
                left: 20,
                top: "50%",
                transform: "translateY(-50%) rotate(180deg)",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.16)",
                color: "var(--jr-paper)",
                width: 48,
                height: 48,
                borderRadius: "50%",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronRightIcon size={22} />
            </button>
          )}

          {lightbox.index < filtered.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navLightbox(1);
              }}
              aria-label="Next"
              style={{
                position: "absolute",
                right: 20,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.16)",
                color: "var(--jr-paper)",
                width: 48,
                height: 48,
                borderRadius: "50%",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronRightIcon size={22} />
            </button>
          )}

          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "85vh", position: "relative" }}>
            <img
              src={lightbox.photo.original || lightbox.photo.web}
              alt={`Project photo in ${lightbox.photo.city || "Tampa Bay"}`}
              style={{
                maxWidth: "90vw",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: "var(--jr-radius-md)",
              }}
            />
            <div style={{ textAlign: "center", marginTop: "var(--jr-space-3)" }}>
              <span
                style={{
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "var(--jr-text-sm)",
                  color: "var(--jr-muted-on-dark)",
                }}
              >
                {lightbox.photo.city && `${lightbox.photo.city}, ${lightbox.photo.state}`}
                {lightbox.photo.tags.length > 0 && ` / ${lightbox.photo.tags.map((tg) => tagLabels[tg] || tg).join(", ")}`}
              </span>
              <span
                style={{
                  fontFamily: "var(--jr-font-body)",
                  fontSize: "var(--jr-text-xs)",
                  color: "var(--jr-muted-on-dark)",
                  marginLeft: "var(--jr-space-3)",
                  opacity: 0.7,
                }}
              >
                {lightbox.index + 1} / {filtered.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes jr-spin { to { transform: rotate(360deg) } }
      `}</style>
    </div>
  );
}
