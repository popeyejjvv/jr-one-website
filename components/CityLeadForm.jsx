"use client";

import { useState } from "react";
import Button from "./ui/Button";
import PhotoUpload from "./ui/PhotoUpload";
import { CheckCircleIcon } from "../lib/icons";
import { useLeadGuard } from "../lib/lead-guard";
import { useLanguage } from "../lib/LanguageContext";
import { submitLeadForm, SUBMIT_ERROR_STYLE } from "../lib/lead-submit";

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

export default function CityLeadForm({ citySlug, cityName, strings }) {
  const t = strings;
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", zip: "", service: "" });
  const [photos, setPhotos] = useState([]);
  const [photoProcessing, setPhotoProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const { guardFields, honeypot } = useLeadGuard();

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!formData.name || !formData.phone) return;
    setFormError("");
    setFormLoading(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const result = await submitLeadForm({
        formId: "city-lead-form",
        lang,
        body: {
          ...guardFields(),
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          zip: formData.zip,
          photos,
          page: window.location.pathname,
          city: cityName,
          state: "FL",
          gclid: params.get("gclid") || "",
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
          utm_term: params.get("utm_term") || "",
        },
      });
      if (result.ok) setSubmitted(true);
      else setFormError(result.message);
    } finally {
      setFormLoading(false);
    }
  };

  return (
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
          <form onSubmit={handleSubmit}>
            {honeypot}
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
              {cityName}
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
            <PhotoUpload
              photos={photos}
              onChange={setPhotos}
              onProcessingChange={setPhotoProcessing}
              theme="light"
              idPrefix={`city-photo-${citySlug}`}
            />
            <Button type="submit" variant="primary" size="md" fullWidth iconRight disabled={formLoading || photoProcessing}>
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
            {formError ? (
              <p role="alert" style={SUBMIT_ERROR_STYLE}>{formError}</p>
            ) : null}
          </form>
        )}
      </div>
    </div>
  );
}
