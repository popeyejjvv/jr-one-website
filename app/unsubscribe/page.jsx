"use client";

import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

/**
 * CAN-SPAM opt-out page. Lives at https://jronegutters.com/unsubscribe -- the exact
 * URL email_shell.py has been putting in the footer of every JR One email for months,
 * and which returned 404 until 2026-08-01.
 *
 * Two entry shapes, because both exist in the wild:
 *   /unsubscribe                 every email sent BEFORE 2026-08-01 (bare link, no
 *                                identifying info) -> user types their address
 *   /unsubscribe?e=<em>&t=<hmac> emails sent AFTER  -> address prefilled, signed
 *
 * The form posts to /api/unsubscribe, which records the opt-out two independent ways
 * (BuilderPrime doNotContact + a machine-parseable note to info@ that reply_triage.py
 * ingests). If BOTH fail, the API returns 500 and this page shows the mailto fallback
 * rather than lying that the opt-out succeeded.
 */

const NAVY = "#1B2A4A";
const GOLD = "#D4AF37";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const e = p.get("e") || p.get("email");
    if (e) setEmail(e);
  }, []);

  async function onSubmit(evt) {
    evt.preventDefault();
    setState("sending");
    setMessage("");
    try {
      const qs = window.location.search || "";
      const res = await fetch(`/api/unsubscribe${qs}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setState("done");
      } else {
        setState("error");
        setMessage(data.error || "Something went wrong on our end.");
      }
    } catch {
      setState("error");
      setMessage("We could not reach the server.");
    }
  }

  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 20px",
        fontFamily: "'Source Sans 3', system-ui, -apple-system, sans-serif",
        color: "#222",
      }}
    >
      <div style={{ width: "100%", maxWidth: 520 }}>
        <h1
          style={{
            fontFamily: "Montserrat, system-ui, sans-serif",
            fontSize: 26,
            fontWeight: 700,
            color: NAVY,
            margin: "0 0 6px",
            letterSpacing: "0.3px",
          }}
        >
          Email preferences
        </h1>
        <div style={{ width: 56, height: 3, background: GOLD, marginBottom: 22 }} />

        {state === "done" ? (
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.6, margin: "0 0 12px" }}>
              You have been unsubscribed. We will not send you any more marketing email.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "#555", margin: 0 }}>
              If you have an active job or estimate with us, you may still hear from us
              about that specific work. To stop those as well, just reply to any message
              or call us at (844) 444-3114.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 18px" }}>
              Enter the email address you would like removed from JR One Aluminum
              marketing email. This takes effect right away.
            </p>
            <label
              htmlFor="unsub-email"
              style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 6 }}
            >
              Email address
            </label>
            <input
              id="unsub-email"
              type="email"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: 16,
                border: "1px solid #ccc",
                borderRadius: 4,
                marginBottom: 16,
                boxSizing: "border-box",
              }}
            />
            <button
              type="submit"
              disabled={state === "sending" || !email}
              style={{
                background: NAVY,
                border: `2px solid ${GOLD}`,
                color: "#fff",
                fontFamily: "Montserrat, system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "1px",
                textTransform: "uppercase",
                padding: "13px 26px",
                borderRadius: 3,
                cursor: state === "sending" ? "default" : "pointer",
                opacity: state === "sending" || !email ? 0.65 : 1,
              }}
            >
              {state === "sending" ? "Processing..." : "Unsubscribe"}
            </button>

            {state === "error" && (
              <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.6, color: "#8a1f1f" }}>
                {message}{" "}
                <a href="mailto:info@jronegutters.com?subject=UNSUBSCRIBE" style={{ color: NAVY }}>
                  Email us directly
                </a>{" "}
                and we will remove you right away.
              </p>
            )}
          </form>
        )}

        <hr style={{ border: 0, borderTop: "1px solid #e5e5e5", margin: "28px 0 14px" }} />
        <p style={{ fontSize: 13, lineHeight: 1.6, color: "#777", margin: 0 }}>
          JR One Aluminum LLC
          <br />
          3420 W Cherry St, Tampa, FL 33607
          <br />
          (844) 444-3114
        </p>
      </div>
    </main>
  );
}
