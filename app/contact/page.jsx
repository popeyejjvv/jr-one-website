"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM | CONTACT
   Brand-brain compliant. Migrated to design tokens + UI components.
   ═══════════════════════════════════════════════════════════ */

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { useLeadGuard } from "../../lib/lead-guard";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import ProcessStep from "../../components/ui/ProcessStep";
import PhotoUpload from "../../components/ui/PhotoUpload";
import { CheckCircleIcon, PhoneIcon, MailIcon, MapPinIcon, CardIcon } from "../../lib/icons";

const CITIES = [
  "Tampa", "Clearwater", "St. Petersburg", "Sarasota", "Bradenton", "Lakeland",
  "Brandon", "Wesley Chapel", "Palm Harbor", "Riverview", "New Port Richey",
  "Largo", "Spring Hill", "Tarpon Springs", "Land O' Lakes", "Dunedin",
  "Ruskin", "Sun City Center", "Temple Terrace", "Plant City", "Lutz",
  "Odessa", "Oldsmar", "Safety Harbor", "Seminole", "Pinellas Park",
];

const T = {
  en: {
    heroTag: "CONTACT US",
    heroH1a: "Let's Talk About",
    heroH1b: "Your Project.",
    heroP: "Call us, fill out the form, or just tell us what you need. We respond within hours, not days.",
    formTitle: "Send Us a Message",
    placeholderName: "Full Name *",
    placeholderPhone: "Phone Number *",
    placeholderEmail: "Email Address *",
    placeholderZip: "ZIP Code",
    serviceDefault: "What do you need?",
    serviceOptions: ["Commercial Gutters", "Copper Gutters", "Drainage Installation", "Govee Lights", "Gutter Cleaning", "Gutter Guards", "Gutter Repair", "Peak 301", "SAGIPER", "Seamless Gutters", "Service Plans", "Siding", "Soffit & Fascia", "Specialty Gutters", "HOA Contracts", "Rental Property Maintenance", "Other / Not Sure"],
    placeholderMessage: "Tell us about your project (optional)",
    submitBtn: "Send Message",
    formDisclaimer: "No spam. No pressure. We just want to help.",
    successTitle: "Message Received",
    successP1: "We'll get back to you within hours. If it's urgent, call us directly at ",
    callUsLabel: "CALL US",
    callUsHours: "Monday to Saturday, 7:00 AM to 6:00 PM",
    callUsBilingual: "Hablamos Español",
    emailUsLabel: "EMAIL US",
    emailUsP: "We respond to emails within the same business day.",
    locationLabel: "LOCATION",
    locationCity: "Tampa, Florida",
    locationP: "Serving Tampa Bay and Florida's west coast, from Spring Hill to Sarasota and everywhere in between.",
    financingLabel: "FINANCING AVAILABLE",
    financingP: "We offer flexible financing options to make quality aluminum services accessible. Ask about current programs when you contact us.",
    serviceAreaTag: "SERVICE AREA",
    serviceAreaTitle: "Where We Work",
    serviceAreaP: "We serve 20+ cities across Tampa Bay and Florida's west coast. If you're in the area, we can help.",
    whatNextTag: "WHAT HAPPENS NEXT",
    whatNextTitle: "After You Reach Out",
    whatNextSteps: [
      { num: "01", title: "We respond", desc: "Within hours of your call or form submission, you'll hear from us. Not a call center, our actual team." },
      { num: "02", title: "We schedule", desc: "We set up a time for your free on-site assessment at your convenience. No surprise visits." },
      { num: "03", title: "We assess", desc: "We inspect your home, listen to your concerns, take photos, and explain what we find honestly." },
      { num: "04", title: "We estimate", desc: "You receive a detailed, transparent estimate with line items. No vague numbers, no hidden fees." },
    ],
  },
  es: {
    heroTag: "CONTÁCTENOS",
    heroH1a: "Hablemos Sobre",
    heroH1b: "Tu Proyecto.",
    heroP: "Llámanos, llena el formulario, o simplemente dinos lo que necesitas. Respondemos en horas, no en días.",
    formTitle: "Envíanos un Mensaje",
    placeholderName: "Nombre Completo *",
    placeholderPhone: "Número de Teléfono *",
    placeholderEmail: "Correo Electrónico *",
    placeholderZip: "Código Postal",
    serviceDefault: "Qué necesitas?",
    serviceOptions: ["Canaletas Comerciales", "Canaletas de Cobre", "Instalación de Drenaje", "Luces Govee", "Limpieza de Canaletas", "Protectores de Canaletas", "Reparación de Canaletas", "Peak 301", "SAGIPER", "Canaletas Sin Costura", "Planes de Servicio", "Revestimiento", "Sofito y Fascia", "Canaletas Especiales", "Contratos HOA", "Mantenimiento de Alquileres", "Otro / No Estoy Seguro"],
    placeholderMessage: "Cuéntanos sobre tu proyecto (opcional)",
    submitBtn: "Enviar Mensaje",
    formDisclaimer: "Sin spam. Sin presión. Solo queremos ayudar.",
    successTitle: "Mensaje Recibido",
    successP1: "Te responderemos en horas. Si es urgente, llámanos directamente al ",
    callUsLabel: "LLÁMANOS",
    callUsHours: "Lunes a Sábado, 7:00 AM a 6:00 PM",
    callUsBilingual: "Hablamos Español",
    emailUsLabel: "CORREO ELECTRÓNICO",
    emailUsP: "Respondemos correos electrónicos el mismo día hábil.",
    locationLabel: "UBICACIÓN",
    locationCity: "Tampa, Florida",
    locationP: "Sirviendo a Tampa Bay y la costa oeste de Florida, desde Spring Hill hasta Sarasota y todo lo que hay en medio.",
    financingLabel: "FINANCIAMIENTO DISPONIBLE",
    financingP: "Ofrecemos opciones de financiamiento flexibles para hacer accesibles nuestros servicios de aluminio de calidad. Pregunta sobre los programas actuales cuando nos contactes.",
    serviceAreaTag: "ÁREA DE SERVICIO",
    serviceAreaTitle: "Dónde Trabajamos",
    serviceAreaP: "Servimos a más de 20 ciudades en Tampa Bay y la costa oeste de Florida. Si estás en el área, podemos ayudarte.",
    whatNextTag: "QUÉ PASA DESPUÉS",
    whatNextTitle: "Después de Que Nos Contactes",
    whatNextSteps: [
      { num: "01", title: "Respondemos", desc: "Dentro de las primeras horas de tu llamada o formulario, te contactaremos. No es un centro de llamadas, es nuestro equipo real." },
      { num: "02", title: "Programamos", desc: "Agendamos una cita para tu evaluación gratuita en el sitio a tu conveniencia. Sin visitas sorpresa." },
      { num: "03", title: "Evaluamos", desc: "Inspeccionamos tu hogar, escuchamos tus inquietudes, tomamos fotos y te explicamos lo que encontramos honestamente." },
      { num: "04", title: "Cotizamos", desc: "Recibes un estimado detallado y transparente con cada item desglosado. Sin números vagos, sin cargos ocultos." },
    ],
  },
};

const inputDarkStyle = {
  width: "100%",
  padding: "14px 16px",
  fontFamily: "var(--jr-font-body)",
  fontSize: "15px",
  border: "1.5px solid var(--jr-navy-3)",
  borderRadius: "var(--jr-radius-md)",
  outline: "none",
  color: "var(--jr-paper)",
  marginBottom: "14px",
  background: "var(--jr-navy-deep)",
  transition: "border-color var(--jr-dur-fast) var(--jr-ease-out)",
};

const infoCardStyle = {
  background: "var(--jr-navy-deep)",
  border: "1px solid var(--jr-navy-3)",
  borderRadius: "var(--jr-radius-lg)",
  padding: "var(--jr-space-6)",
  marginBottom: "var(--jr-space-4)",
};

const infoLabelStyle = {
  fontFamily: "var(--jr-font-heading)",
  fontSize: "var(--jr-text-xs)",
  fontWeight: 700,
  color: "var(--jr-gold)",
  letterSpacing: "2px",
  marginBottom: "var(--jr-space-2)",
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--jr-space-2)",
  textTransform: "uppercase",
};

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", zip: "", service: "", message: "" });
  const [photos, setPhotos] = useState([]);
  const [photoProcessing, setPhotoProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { guardFields, honeypot } = useLeadGuard();

  const handleForm = async (e) => {
    e?.preventDefault?.();
    if (!formData.name || !formData.phone) return;
    setLoading(true);
    try {
      const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
      await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...guardFields(),
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          zip: formData.zip,
          service: formData.service,
          message: formData.message,
          photos,
          page: typeof window !== "undefined" ? window.location.pathname : "/contact",
          gclid: params.get("gclid") || "",
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
          utm_term: params.get("utm_term") || "",
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const serviceDropdown = [t.serviceDefault, ...t.serviceOptions];

  return (
    <div style={{ background: "var(--jr-navy)", color: "var(--jr-paper)", minHeight: "100vh" }}>
      <a href="#main" className="jr-skip-link">Skip to content</a>
      <SiteNav />
      <main id="main">
        {/* HERO */}
        <section style={{ padding: "var(--jr-space-16) var(--jr-space-6) var(--jr-space-10)" }}>
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

        {/* CONTACT GRID */}
        <section style={{ padding: "var(--jr-space-5) var(--jr-space-6) var(--jr-space-20)" }}>
          <Container>
            <div className="jr-contact-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: "var(--jr-space-10)" }}>
              {/* LEFT: form */}
              <div>
                {submitted ? (
                  <div
                    style={{
                      background: "var(--jr-navy-deep)",
                      border: "1px solid var(--jr-success)",
                      borderRadius: "var(--jr-radius-xl)",
                      padding: "var(--jr-space-12) var(--jr-space-8)",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ display: "inline-flex", color: "var(--jr-success)", marginBottom: "var(--jr-space-3)" }}>
                      <CheckCircleIcon size={48} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--jr-font-heading)",
                        fontSize: "var(--jr-text-xl)",
                        fontWeight: 700,
                        color: "var(--jr-paper)",
                        marginBottom: "var(--jr-space-2)",
                      }}
                    >
                      {t.successTitle}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--jr-font-body)",
                        fontSize: "var(--jr-text-md)",
                        color: "var(--jr-muted-on-dark)",
                      }}
                    >
                      {t.successP1}
                      <a href="tel:8444443114" style={{ color: "var(--jr-gold)", textDecoration: "none", fontWeight: 600 }}>(844) 444-3114</a>.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleForm}
                    style={{
                      background: "var(--jr-navy-deep)",
                      border: "1px solid var(--jr-navy-3)",
                      borderRadius: "var(--jr-radius-xl)",
                      padding: "var(--jr-space-8)",
                    }}
                  >
                    {honeypot}
                    <h2
                      style={{
                        fontFamily: "var(--jr-font-heading)",
                        fontSize: "var(--jr-text-xl)",
                        fontWeight: 700,
                        color: "var(--jr-paper)",
                        marginBottom: "var(--jr-space-1)",
                      }}
                    >
                      {t.formTitle}
                    </h2>
                    <div aria-hidden style={{ width: 40, height: 3, background: "var(--jr-gold)", borderRadius: 2, margin: "10px 0 var(--jr-space-6)" }} />

                    <div className="jr-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--jr-space-3)" }}>
                      <input
                        aria-label={t.placeholderName}
                        style={inputDarkStyle}
                        placeholder={t.placeholderName}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <input
                        aria-label={t.placeholderPhone}
                        style={inputDarkStyle}
                        placeholder={t.placeholderPhone}
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="jr-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--jr-space-3)" }}>
                      <input
                        aria-label={t.placeholderEmail}
                        style={inputDarkStyle}
                        placeholder={t.placeholderEmail}
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <input
                        aria-label={t.placeholderZip}
                        style={inputDarkStyle}
                        placeholder={t.placeholderZip}
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        maxLength={5}
                      />
                    </div>
                    <select
                      aria-label={t.serviceDefault}
                      style={{ ...inputDarkStyle, cursor: "pointer", color: formData.service ? "var(--jr-paper)" : "var(--jr-muted-on-dark)" }}
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      {serviceDropdown.map((opt, i) => (
                        <option key={i} value={i === 0 ? "" : opt} style={{ color: "var(--jr-ink)" }}>{opt}</option>
                      ))}
                    </select>
                    <textarea
                      aria-label={t.placeholderMessage}
                      style={{ ...inputDarkStyle, height: "120px", resize: "vertical" }}
                      placeholder={t.placeholderMessage}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />

                    <PhotoUpload
                      photos={photos}
                      onChange={setPhotos}
                      onProcessingChange={setPhotoProcessing}
                      theme="dark"
                      idPrefix="contact-photo"
                    />

                    <Button type="submit" variant="primary" size="md" fullWidth iconRight disabled={loading || photoProcessing}>
                      {loading ? (lang === "en" ? "Sending..." : "Enviando...") : t.submitBtn}
                    </Button>
                    <p
                      style={{
                        fontFamily: "var(--jr-font-body)",
                        fontSize: "var(--jr-text-xs)",
                        color: "var(--jr-muted-on-dark)",
                        textAlign: "center",
                        marginTop: "var(--jr-space-3)",
                      }}
                    >
                      {t.formDisclaimer}
                    </p>
                  </form>
                )}
              </div>

              {/* RIGHT: contact info */}
              <div>
                <div style={infoCardStyle}>
                  <div style={infoLabelStyle}>
                    <PhoneIcon size={14} /> {t.callUsLabel}
                  </div>
                  <a
                    href="tel:8444443114"
                    style={{
                      display: "block",
                      fontFamily: "var(--jr-font-heading)",
                      fontSize: "var(--jr-text-2xl)",
                      fontWeight: 700,
                      color: "var(--jr-paper)",
                      textDecoration: "none",
                    }}
                  >
                    (844) 444-3114
                  </a>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)", marginTop: "var(--jr-space-2)" }}>
                    {t.callUsHours}
                  </p>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-gold)", marginTop: "var(--jr-space-1)" }}>
                    {t.callUsBilingual}
                  </p>
                </div>

                <div style={infoCardStyle}>
                  <div style={infoLabelStyle}>
                    <MailIcon size={14} /> {t.emailUsLabel}
                  </div>
                  <a
                    href="mailto:info@jronegutters.com"
                    style={{
                      display: "block",
                      fontFamily: "var(--jr-font-body)",
                      fontSize: "var(--jr-text-md)",
                      color: "var(--jr-paper)",
                      textDecoration: "none",
                    }}
                  >
                    info@jronegutters.com
                  </a>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)", marginTop: "var(--jr-space-2)" }}>
                    {t.emailUsP}
                  </p>
                </div>

                <div style={infoCardStyle}>
                  <div style={infoLabelStyle}>
                    <MapPinIcon size={14} /> {t.locationLabel}
                  </div>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-paper)" }}>{t.locationCity}</p>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)", marginTop: "var(--jr-space-2)" }}>
                    {t.locationP}
                  </p>
                </div>

                <div
                  style={{
                    background: "var(--jr-gold-pale)",
                    border: "1px solid rgba(212, 175, 55, 0.28)",
                    borderRadius: "var(--jr-radius-lg)",
                    padding: "var(--jr-space-6)",
                  }}
                >
                  <div style={infoLabelStyle}>
                    <CardIcon size={14} /> {t.financingLabel}
                  </div>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-cream-2)", lineHeight: 1.55 }}>
                    {t.financingP}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* SERVICE AREA MAP */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading
              eyebrow={t.serviceAreaTag}
              title={t.serviceAreaTitle}
              subtitle={t.serviceAreaP}
              theme="dark"
            />
            <div
              style={{
                borderRadius: "var(--jr-radius-xl)",
                overflow: "hidden",
                border: "1px solid var(--jr-navy-3)",
                aspectRatio: "16/9",
                marginBottom: "var(--jr-space-10)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1BhrHVWGj21ruUX0-Y4-CmuFd4y3KQCk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JR One Aluminum service area map"
              />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "var(--jr-space-2)" }}>
              {CITIES.map((city, i) => (
                <span
                  key={i}
                  className="jr-city-chip"
                  style={{
                    padding: "8px 16px",
                    background: "var(--jr-navy)",
                    border: "1px solid var(--jr-navy-3)",
                    borderRadius: "var(--jr-radius-md)",
                    fontFamily: "var(--jr-font-heading)",
                    fontSize: "var(--jr-text-sm)",
                    fontWeight: 500,
                    color: "var(--jr-cream-2)",
                  }}
                >
                  {city}
                </span>
              ))}
            </div>
          </Container>
        </section>

        {/* WHAT TO EXPECT */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container size="narrow">
            <SectionHeading
              eyebrow={t.whatNextTag}
              title={t.whatNextTitle}
              theme="dark"
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.whatNextSteps.map((step) => (
                <ProcessStep key={step.num} num={step.num} title={step.title} desc={step.desc} />
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
      <MobileCTA />

      <style>{`
        @media (max-width: 900px) {
          .jr-contact-grid { grid-template-columns: 1fr !important; gap: var(--jr-space-8) !important; }
          .jr-form-row { grid-template-columns: 1fr !important; }
        }
        .jr-city-chip { transition: border-color var(--jr-dur-fast) var(--jr-ease-out), color var(--jr-dur-fast) var(--jr-ease-out); }
        @media (hover: hover) {
          .jr-city-chip:hover { border-color: var(--jr-gold); color: var(--jr-gold); }
        }
      `}</style>
    </div>
  );
}
