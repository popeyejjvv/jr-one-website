// =============================================================================
// JR One - Instant Estimator customer email (added 2026-07-13)
// =============================================================================
// The estimator UI told customers "Estimate sent to {email}" but no email was
// ever sent. This module builds the real branded estimate email. It is a
// TRANSACTIONAL email (the customer asked for their quote), sent from the JS
// website via nodemailer. It mirrors the JR One brand standard (navy #1B2A4A,
// gold #D4AF37, phone, Christopher Rivera signature, EST. 2006) but does NOT
// pass through the Python email_shell gate, which the website cannot reach -
// so brand correctness is baked into this template. Keyboard punctuation only
// (no em/en dash, no curly quotes). No gutter-guard false claims.
// =============================================================================

const NAVY = "#1B2A4A";
const GOLD = "#D4AF37";
const PHONE = "(844) 444-3114";
const PHONE_TEL = "+18444443114";

function money(n) {
  const v = Math.max(0, Math.round(Number(n) || 0));
  return "$" + v.toLocaleString("en-US");
}

// Friendly service labels from the estimator measurement totals (feet).
function serviceList(measurements, lang) {
  const m = measurements || {};
  const L = {
    en: { gutter: "Seamless gutters", guard: "Gutter guards", soffit: "Soffit", fascia: "Fascia", cleaning: "Gutter cleaning" },
    es: { gutter: "Canaletas sin costura", guard: "Protectores de canaletas", soffit: "Sofito", fascia: "Fascia", cleaning: "Limpieza de canaletas" },
  }[lang === "es" ? "es" : "en"];
  return ["gutter", "guard", "soffit", "fascia", "cleaning"]
    .filter((k) => (m[k] || 0) > 0)
    .map((k) => L[k]);
}

const T = {
  en: {
    subject: (name) => `Your JR One estimate, ${name}`,
    hello: (name) => `Hi ${name},`,
    intro: "Thanks for using our Instant Estimator. Here is your preliminary estimate based on the measurements you entered.",
    estLabel: "Your estimated range",
    estNote: "This is a preliminary range from your inputs. Your exact price is confirmed with a free on-site measurement, with no obligation.",
    servicesLabel: "Services included",
    discountLabel: "Your savings code",
    discountSub: (exp) => `Mention this code when you book${exp ? `, good through ${exp}` : ""}.`,
    cta: `CALL ${PHONE}`,
    ctaSub: "Prefer we reach out? Reply to this email and we will call you.",
    signName: "Christopher Rivera",
    signCo: "JR One Aluminum LLC",
    family: "Family owned and operated, serving Tampa Bay since 2006.",
    footer: "You received this because you requested an estimate at jronegutters.com. 3420 W Cherry St, Tampa, FL 33607.",
    referral: "Know a neighbor who needs gutters? Refer them and you both benefit when they book.",
  },
  es: {
    subject: (name) => `Su estimado de JR One, ${name}`,
    hello: (name) => `Hola ${name},`,
    intro: "Gracias por usar nuestro Estimador Instantaneo. Aqui esta su estimado preliminar segun las medidas que ingreso.",
    estLabel: "Su rango estimado",
    estNote: "Este es un rango preliminar segun sus datos. Su precio exacto se confirma con una medicion gratuita en el sitio, sin compromiso.",
    servicesLabel: "Servicios incluidos",
    discountLabel: "Su codigo de ahorro",
    discountSub: (exp) => `Mencione este codigo al reservar${exp ? `, valido hasta ${exp}` : ""}.`,
    cta: `LLAME AL ${PHONE}`,
    ctaSub: "Prefiere que le contactemos? Responda a este correo y le llamamos.",
    signName: "Christopher Rivera",
    signCo: "JR One Aluminum LLC",
    family: "Empresa familiar, sirviendo a Tampa Bay desde 2006.",
    footer: "Recibio este correo porque solicito un estimado en jronegutters.com. 3420 W Cherry St, Tampa, FL 33607.",
    referral: "Conoce a un vecino que necesita canaletas? Refieralo y ambos se benefician cuando reserva.",
  },
};

/**
 * Build the estimate email. data: { customerName, lang, estimateLow, estimateHigh,
 * discountCode, expDate, measurements }. Returns { subject, html, text }.
 */
export function buildEstimateEmail(data = {}) {
  const lang = data.lang === "es" ? "es" : "en";
  const t = T[lang];
  const name = (data.customerName || "").trim().split(/\s+/)[0] || (lang === "es" ? "vecino" : "there");
  const low = data.estimateLow;
  const high = data.estimateHigh;
  const range = low && high ? `${money(low)} - ${money(high)}` : money(data.estimate || high || low);
  const services = serviceList(data.measurements, lang);
  const code = data.discountCode || "";
  const exp = data.expDate || "";

  const servicesHtml = services.length
    ? `<tr><td style="padding:18px 32px 0;">
         <div style="font:600 12px/1.4 Montserrat,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#8a94a6;">${t.servicesLabel}</div>
         <div style="font:400 15px/1.7 'Source Sans 3',Arial,sans-serif;color:${NAVY};margin-top:4px;">${services.join(" &middot; ".replace("&middot;", "|"))}</div>
       </td></tr>`
    : "";

  const discountHtml = code
    ? `<tr><td style="padding:24px 32px 0;">
         <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
           <td style="border:2px dashed ${GOLD};border-radius:10px;padding:16px 20px;text-align:center;">
             <div style="font:600 11px/1.4 Montserrat,Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#8a94a6;">${t.discountLabel}</div>
             <div style="font:700 26px/1.2 Montserrat,Arial,sans-serif;color:${NAVY};letter-spacing:.04em;margin:6px 0 4px;">${code}</div>
             <div style="font:400 13px/1.5 'Source Sans 3',Arial,sans-serif;color:#5b6472;">${t.discountSub(exp)}</div>
           </td>
         </tr></table>
       </td></tr>`
    : "";

  const html = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${t.subject(name)}</title></head>
<body style="margin:0;padding:0;background:#eef1f5;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f5;padding:24px 12px;"><tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(27,42,74,.10);">
    <!-- header -->
    <tr><td style="background:${NAVY};padding:26px 32px;">
      <div style="font:800 22px/1 Montserrat,Arial,sans-serif;color:#fff;letter-spacing:.04em;">JR ONE <span style="color:${GOLD};">ALUMINUM</span></div>
      <div style="font:600 11px/1.4 Montserrat,Arial,sans-serif;color:#c7cfdd;letter-spacing:.14em;text-transform:uppercase;margin-top:6px;">The Superior Gutter &amp; Soffit Experts</div>
    </td></tr>
    <!-- greeting -->
    <tr><td style="padding:30px 32px 0;">
      <div style="font:700 20px/1.3 Montserrat,Arial,sans-serif;color:${NAVY};">${t.hello(name)}</div>
      <div style="font:400 16px/1.7 'Source Sans 3',Arial,sans-serif;color:#3d4658;margin-top:10px;">${t.intro}</div>
    </td></tr>
    <!-- estimate box -->
    <tr><td style="padding:22px 32px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="background:#f6f8fb;border-left:4px solid ${GOLD};border-radius:8px;padding:20px 24px;">
          <div style="font:600 12px/1.4 Montserrat,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#8a94a6;">${t.estLabel}</div>
          <div style="font:800 34px/1.15 Montserrat,Arial,sans-serif;color:${NAVY};margin:6px 0 8px;">${range}</div>
          <div style="font:400 13px/1.6 'Source Sans 3',Arial,sans-serif;color:#5b6472;">${t.estNote}</div>
        </td>
      </tr></table>
    </td></tr>
    ${servicesHtml}
    ${discountHtml}
    <!-- CTA -->
    <tr><td style="padding:28px 32px 4px;" align="center">
      <a href="tel:${PHONE_TEL}" style="display:inline-block;background:${NAVY};color:#fff;border:2px solid ${GOLD};border-radius:8px;padding:14px 34px;font:700 15px/1 Montserrat,Arial,sans-serif;letter-spacing:.06em;text-decoration:none;">${t.cta}</a>
      <div style="font:400 13px/1.6 'Source Sans 3',Arial,sans-serif;color:#5b6472;margin-top:12px;">${t.ctaSub}</div>
    </td></tr>
    <!-- signature -->
    <tr><td style="padding:26px 32px 0;">
      <div style="border-top:1px solid #e6eaf0;padding-top:18px;">
        <div style="font:700 16px/1.3 Montserrat,Arial,sans-serif;color:${NAVY};">${t.signName}</div>
        <div style="font:400 14px/1.5 'Source Sans 3',Arial,sans-serif;color:#3d4658;">${t.signCo} &nbsp;|&nbsp; <a href="tel:${PHONE_TEL}" style="color:${NAVY};text-decoration:none;">${PHONE}</a></div>
        <div style="font:italic 400 13px/1.5 'Source Sans 3',Arial,sans-serif;color:#5b6472;margin-top:4px;">${t.family}</div>
      </div>
    </td></tr>
    <!-- referral + footer -->
    <tr><td style="padding:20px 32px 30px;">
      <div style="font:400 13px/1.6 'Source Sans 3',Arial,sans-serif;color:#5b6472;background:#f6f8fb;border-radius:8px;padding:12px 16px;">${t.referral}</div>
      <div style="font:400 11px/1.6 'Source Sans 3',Arial,sans-serif;color:#98a1b2;margin-top:16px;">${t.footer}</div>
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;

  const text = [
    t.hello(name), "", t.intro, "",
    `${t.estLabel}: ${range}`, t.estNote, "",
    services.length ? `${t.servicesLabel}: ${services.join(", ")}` : "",
    code ? `${t.discountLabel}: ${code} - ${t.discountSub(exp)}` : "", "",
    `${t.cta.replace(/[A-Z ]+$/, "")} ${PHONE}`, "",
    t.signName, t.signCo, PHONE, t.family, "", t.footer,
  ].filter((l) => l !== "").join("\n");

  return { subject: t.subject(name), html, text };
}
