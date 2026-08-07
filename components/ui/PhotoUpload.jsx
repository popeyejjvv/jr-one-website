"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE — Reusable photo upload for any contact form.
   Multi-file picker (opens native sheet on iOS / Android: Camera,
   Photo Library, Browse). Client-side resize via canvas keeps each
   photo ~300-500KB so the full payload stays under Vercel's body
   limit and Gmail's 25MB attachment cap. Controlled component:
   parent owns the photos array.

   Props:
     photos             [{ filename, dataUrl, mimeType }]
     onChange(arr)      called whenever photos change
     onProcessingChange(bool)  optional, lets parent disable submit
     theme              "dark" (navy form) | "light" (white card form)
     idPrefix           unique per page in case of multiple instances
   ═══════════════════════════════════════════════════════════ */

import { useState, useRef } from "react";
import { useLanguage } from "../../lib/LanguageContext";

const MAX_PHOTOS = 5;
const MAX_ORIGINAL_BYTES = 10 * 1024 * 1024;
const RESIZE_MAX_EDGE = 1600;

const T = {
  en: {
    label: "Add Photos",
    hint: "Optional. Share up to 5 photos of your gutters, soffit, or the project area. Helps us prepare a more accurate estimate.",
    button: "Choose Photos",
    changeButton: "Add More",
    remove: "Remove",
    countSuffix: "attached",
    tooBig: "Each photo must be under 10 MB.",
    maxCount: "Maximum 5 photos.",
    processing: "Processing photos...",
    processError: "Could not process one of the photos.",
  },
  es: {
    label: "Agregar Fotos",
    hint: "Opcional. Comparta hasta 5 fotos de sus canaletas, sofito o el área del proyecto. Nos ayuda a preparar una cotización más precisa.",
    button: "Elegir Fotos",
    changeButton: "Agregar Más",
    remove: "Quitar",
    countSuffix: "adjuntas",
    tooBig: "Cada foto debe ser menor a 10 MB.",
    maxCount: "Máximo 5 fotos.",
    processing: "Procesando fotos...",
    processError: "No se pudo procesar una de las fotos.",
  },
};

// Decode file → Image → canvas → JPEG dataURL. iOS Safari converts
// HEIC transparently through the FileReader/Image path.
function resizeImageToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read failed"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("decode failed"));
      img.onload = () => {
        const longest = Math.max(img.width, img.height);
        const scale = longest > RESIZE_MAX_EDGE ? RESIZE_MAX_EDGE / longest : 1;
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve({
          filename: (file.name || "photo").replace(/\.[^.]+$/, "") + ".jpg",
          dataUrl: canvas.toDataURL("image/jpeg", 0.82),
          mimeType: "image/jpeg",
        });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function PhotoUpload({
  photos,
  onChange,
  onProcessingChange,
  theme = "dark",
  idPrefix = "photo-upload",
}) {
  const { lang } = useLanguage();
  const t = T[lang] || T.en;
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const isDark = theme === "dark";
  // Gold only on dark theme; navy on light cards (gold fails AA on white/cream).
  const labelColor = isDark ? "var(--jr-gold)" : "var(--jr-navy)";
  const hintColor = isDark ? "var(--jr-muted-on-dark)" : "var(--jr-muted-on-light)";
  const tileBg = isDark ? "var(--jr-navy-deep)" : "#FFFFFF";
  const tileBorder = isDark ? "1.5px solid var(--jr-navy-3)" : "1.5px solid #D1D5DB";
  const removeBg = "rgba(15, 23, 42, 0.85)";
  const errorColor = "#DC2626";

  const setBoth = (val) => {
    setProcessing(val);
    if (onProcessingChange) onProcessingChange(val);
  };

  const handleSelect = async (e) => {
    setError("");
    const files = Array.from(e.target.files || []);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (files.length === 0) return;

    if (photos.length + files.length > MAX_PHOTOS) {
      setError(t.maxCount);
      return;
    }
    if (files.some((f) => f.size > MAX_ORIGINAL_BYTES)) {
      setError(t.tooBig);
      return;
    }

    setBoth(true);
    try {
      const resized = [];
      for (const f of files) {
        if (!f.type.startsWith("image/")) continue;
        const r = await resizeImageToDataUrl(f);
        resized.push(r);
      }
      onChange([...photos, ...resized].slice(0, MAX_PHOTOS));
    } catch {
      setError(t.processError);
    } finally {
      setBoth(false);
    }
  };

  const remove = (idx) => {
    onChange(photos.filter((_, i) => i !== idx));
    setError("");
  };

  const inputId = `${idPrefix}-input`;
  const disabled = processing || photos.length >= MAX_PHOTOS;

  return (
    <div style={{ marginBottom: "14px" }}>
      <label
        htmlFor={inputId}
        style={{
          display: "block",
          fontFamily: "var(--jr-font-heading)",
          fontSize: "var(--jr-text-xs)",
          fontWeight: 700,
          color: labelColor,
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: "var(--jr-space-2)",
        }}
      >
        {t.label}
      </label>
      <p
        style={{
          fontFamily: "var(--jr-font-body)",
          fontSize: "var(--jr-text-sm)",
          color: hintColor,
          marginBottom: "var(--jr-space-3)",
          lineHeight: 1.5,
        }}
      >
        {t.hint}
      </p>
      <input
        id={inputId}
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleSelect}
        disabled={disabled}
        style={{ display: "none" }}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        style={{
          display: "inline-block",
          padding: "10px 18px",
          fontFamily: "var(--jr-font-heading)",
          fontSize: "var(--jr-text-xs)",
          fontWeight: 700,
          color: "var(--jr-gold)",
          background: "var(--jr-gold-pale)",
          border: "1.5px solid var(--jr-gold)",
          borderRadius: "var(--jr-radius-sm)",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.55 : 1,
          transition: "opacity var(--jr-dur-fast) var(--jr-ease-out)",
        }}
      >
        {processing ? t.processing : (photos.length > 0 ? t.changeButton : t.button)}
      </button>

      {error && (
        <p
          role="alert"
          style={{
            fontFamily: "var(--jr-font-body)",
            fontSize: "var(--jr-text-sm)",
            color: errorColor,
            marginTop: "var(--jr-space-2)",
          }}
        >
          {error}
        </p>
      )}

      {photos.length > 0 && (
        <>
          <p
            style={{
              fontFamily: "var(--jr-font-body)",
              fontSize: "var(--jr-text-sm)",
              color: hintColor,
              marginTop: "var(--jr-space-3)",
              marginBottom: "var(--jr-space-2)",
            }}
          >
            {photos.length} / {MAX_PHOTOS} {t.countSuffix}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {photos.map((p, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  width: "84px",
                  height: "84px",
                  borderRadius: "var(--jr-radius-sm)",
                  overflow: "hidden",
                  border: tileBorder,
                  background: tileBg,
                }}
              >
                <img
                  src={p.dataUrl}
                  alt={`Photo ${i + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <button
                  type="button"
                  aria-label={t.remove}
                  onClick={() => remove(i)}
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    width: "22px",
                    height: "22px",
                    padding: 0,
                    borderRadius: "50%",
                    background: removeBg,
                    color: "var(--jr-paper)",
                    border: "1px solid var(--jr-gold)",
                    fontFamily: "var(--jr-font-heading)",
                    fontSize: "12px",
                    fontWeight: 700,
                    lineHeight: 1,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
