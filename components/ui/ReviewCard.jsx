/**
 * ReviewCard , testimonial card.
 *
 * Quote glyph header, body in regular weight, name + service line at bottom.
 * Stars rendered as SVG (replacing emoji ★).
 */
import { QuoteIcon, StarRow } from "../../lib/icons";

export default function ReviewCard({ text, name, service, stars = 5 }) {
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--jr-navy-deep)",
        border: "1px solid var(--jr-navy-3)",
        borderRadius: "var(--jr-radius-lg)",
        padding: "28px 24px",
        height: "100%",
        position: "relative",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 16,
          right: 18,
          color: "var(--jr-gold)",
          opacity: 0.32,
        }}
      >
        <QuoteIcon size={28} />
      </div>
      <StarRow count={stars} size={14} />
      <p
        style={{
          fontFamily: "var(--jr-font-body)",
          fontSize: "var(--jr-text-md)",
          lineHeight: 1.7,
          color: "var(--jr-paper)",
          margin: "var(--jr-space-4) 0 var(--jr-space-6)",
          flex: 1,
        }}
      >
        {text}
      </p>
      <footer style={{ borderTop: "var(--jr-hair-darker)", paddingTop: "var(--jr-space-3)" }}>
        <div
          style={{
            fontFamily: "var(--jr-font-heading)",
            fontSize: "var(--jr-text-sm)",
            fontWeight: 700,
            color: "var(--jr-gold)",
            letterSpacing: "0.5px",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "var(--jr-font-body)",
            fontSize: "var(--jr-text-xs)",
            color: "var(--jr-muted-on-dark)",
            marginTop: 2,
          }}
        >
          {service}
        </div>
      </footer>
    </article>
  );
}
