/**
 * SectionHeading , Eyebrow tag + H2 + gold divider + optional subtitle.
 *
 * Replaces the inline SectionTag + h2 + GoldDivider triplet in homepage.
 * Theme: "dark" (on navy) | "light" (on cream).
 * Align: "center" | "left".
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  theme = "dark",
  align = "center",
  as: Tag = "h2",
  id,
}) {
  const onDark = theme === "dark";
  const isCentered = align === "center";

  return (
    <header
      style={{
        textAlign: align,
        maxWidth: isCentered ? "720px" : "880px",
        margin: isCentered ? "0 auto" : 0,
        marginBottom: "var(--jr-space-12)",
      }}
    >
      {eyebrow && (
        <div
          style={{
            display: "inline-block",
            padding: "6px 14px",
            background: "var(--jr-gold-pale)",
            border: "1px solid rgba(200, 149, 46, 0.28)",
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
              whiteSpace: "nowrap",
            }}
          >
            {eyebrow}
          </span>
        </div>
      )}
      <Tag
        id={id}
        style={{
          fontFamily: "var(--jr-font-heading)",
          fontSize: "var(--jr-text-3xl)",
          fontWeight: 700,
          letterSpacing: "1px",
          lineHeight: 1.15,
          color: onDark ? "var(--jr-paper)" : "var(--jr-ink)",
          marginBottom: "var(--jr-space-3)",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </Tag>
      <div
        aria-hidden
        style={{
          width: "60px",
          height: "3px",
          background: "var(--jr-gold)",
          borderRadius: "2px",
          margin: isCentered ? "var(--jr-space-3) auto var(--jr-space-4)" : "var(--jr-space-3) 0 var(--jr-space-4)",
        }}
      />
      {subtitle && (
        <p
          style={{
            fontFamily: "var(--jr-font-body)",
            fontSize: "var(--jr-text-lg)",
            lineHeight: 1.65,
            color: onDark ? "var(--jr-muted-on-dark)" : "var(--jr-muted-on-light)",
            maxWidth: "640px",
            margin: isCentered ? "0 auto" : 0,
          }}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
