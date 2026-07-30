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

export function useLeadGuard() {
  const mountedAt = useRef(Date.now());
  const [trapValue, setTrapValue] = useState("");

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
      <input
        type="text"
        name="jr1_ref_x9"
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
