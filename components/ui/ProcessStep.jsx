/**
 * ProcessStep , Gold Standard step card.
 *
 * Big numeral watermark, eyebrow STEP NN, step title, description.
 * Hover: gold border, lift (gated to mouse).
 */
export default function ProcessStep({ num, title, desc, accent }) {
  // When accent passed, use it for both the watermark number behind the card
  // (low-opacity) and the "STEP 01" eyebrow label. Default = gold.
  const watermarkColor = accent ? `${accent}1A` : "rgba(212, 175, 55, 0.10)";
  const stepLabelColor = accent || "var(--jr-gold)";

  return (
    <article
      className="jr-hover-lift"
      style={{
        position: "relative",
        background: "var(--jr-navy-deep)",
        border: "1px solid var(--jr-navy-3)",
        borderRadius: "var(--jr-radius-lg)",
        padding: "28px 24px",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 12,
          right: 16,
          fontFamily: "var(--jr-font-heading)",
          fontSize: "84px",
          fontWeight: 800,
          color: watermarkColor,
          lineHeight: 1,
          letterSpacing: "-2px",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {num}
      </span>
      <div
        style={{
          fontFamily: "var(--jr-font-heading)",
          fontSize: "var(--jr-text-xs)",
          fontWeight: 700,
          color: stepLabelColor,
          letterSpacing: "3px",
          marginBottom: "var(--jr-space-2)",
          textTransform: "uppercase",
        }}
      >
        Step {num}
      </div>
      <h3
        style={{
          fontFamily: "var(--jr-font-heading)",
          fontSize: "var(--jr-text-xl)",
          fontWeight: 700,
          color: "var(--jr-paper)",
          marginBottom: "var(--jr-space-3)",
          letterSpacing: "0.3px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--jr-font-body)",
          fontSize: "var(--jr-text-md)",
          lineHeight: 1.65,
          color: "var(--jr-muted-on-dark)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {desc}
      </p>
    </article>
  );
}
