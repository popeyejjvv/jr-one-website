"use client";

// =============================================================================
// JR One — client-side lead-form bot guard (honeypot + fill-time)
// =============================================================================
// Added 2026-07-29 with lib/lead-spam.js (server-side scorer). Every lead form
// mounts this hook, renders {honeypot} inside its <form>, and spreads
// ...guardFields() into the POST body.
//
// - The hidden input uses a deliberately meaningless name/label so browser
//   autofill NEVER touches it (autofill filling a hidden "company" field would
//   false-positive a real customer). Bots that fill every text input still hit it.
// - form_ms = ms between form mount and submit. Under 2.5s = bot (server rule).
// =============================================================================

import { useRef, useState, useCallback } from "react";

import { useLanguage } from "./LanguageContext";

export function useLeadGuard() {
  const mountedAt = useRef(Date.now());
  const [trapValue, setTrapValue] = useState("");
  // Safe on every route: app/providers.jsx:6 wraps the whole tree in a
  // LanguageProvider, and LanguageContext.jsx:5 also ships a default value,
  // so this cannot throw even if a form ever mounts outside a provider.
  const { lang } = useLanguage();

  // Spread into the fetch body: maps the trap to the `company` field the
  // server-side scorer checks, plus the fill-time.
  const guardFields = useCallback(
    () => ({
      company: trapValue,
      form_ms: Date.now() - mountedAt.current,
    }),
    [trapValue]
  );

  const honeypot = (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        top: "auto",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      {/* aria-label added 2026-08-10. The live crawl flags every input with no
          aria-label and no <label for> (audit.py:86-95); that check does not look
          at aria-hidden, on the element or on an ancestor, so this trap tripped
          input_missing_label on 18 pages.
          It leaks nothing new to a bot: the placeholder one line down has said
          "Leave this field empty" since 2026-07-29, and anything parsing
          aria-label already parses placeholder. Nothing a screen reader can reach
          changes either, because the wrapper above is aria-hidden and tabIndex is
          -1, so this string is never announced in either language.
          name, value, onChange and the guardFields() -> `company` mapping are
          untouched, so the POST body and the server-side scorer see no difference. */}
      <input
        type="text"
        name="jr1_ref_x9"
        aria-label={lang === "es" ? "No complete este campo" : "Do not fill in this field"}
        tabIndex={-1}
        autoComplete="off"
        placeholder="Leave this field empty"
        value={trapValue}
        onChange={(e) => setTrapValue(e.target.value)}
      />
    </div>
  );

  return { guardFields, honeypot };
}
