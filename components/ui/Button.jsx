"use client";

/**
 * Button , JR One brand-brain CTA chrome.
 *
 * Variants:
 *   - "primary"    Gold bg, navy text. Strongest call.
 *   - "outline"    Transparent bg, gold 2px border, gold text. On dark surfaces.
 *   - "navy"       Navy bg, gold 2px border, gold text. Brand-brain canonical CTA.
 *   - "ghost"      Text-only.
 *
 * Size: "md" (default) | "sm" | "lg".
 *
 * Polish (Emil):
 *   - :active scale(0.97) tactile press feedback.
 *   - transition: transform only (not "all"), custom ease, under 200ms.
 *   - Focus-visible ring inherits from globals.
 */
import { ArrowRightIcon } from "../../lib/icons";
import { useLanguage } from "../../lib/LanguageContext";
import { localizeHref } from "../../lib/locale";

export default function Button({
  as = "button",
  href,
  variant = "primary",
  size = "md",
  fullWidth = false,
  iconRight = false,
  iconLeft = null,
  accent,
  accentLight,
  children,
  type,
  style = {},
  className = "",
  ...rest
}) {
  const { lang } = useLanguage();
  const Tag = href ? "a" : as;

  const sizes = {
    sm: { padding: "10px 18px", fontSize: 12, letterSpacing: "1.5px" },
    md: { padding: "14px 24px", fontSize: 13, letterSpacing: "2px" },
    lg: { padding: "18px 32px", fontSize: 15, letterSpacing: "2px" },
  };

  // When `accent` is passed, all variants render in the page accent color
  // (overrides the gold defaults so service pages can keep their identity).
  const goldFill = accent || "var(--jr-gold)";
  const goldFillLight = accentLight || accent || "var(--jr-gold-2)";
  const goldStroke = accent || "var(--jr-gold)";
  const goldText = accent || "var(--jr-gold)";
  const goldShadow = accent ? `0 8px 24px ${accent}33` : "var(--jr-shadow-gold)";

  const variants = {
    primary: {
      background: accent ? `linear-gradient(135deg, ${goldFill}, ${goldFillLight})` : "var(--jr-gold)",
      color: "var(--jr-navy)",
      border: `2px solid ${goldStroke}`,
      boxShadow: goldShadow,
    },
    navy: {
      background: "var(--jr-navy)",
      color: goldText,
      border: `2px solid ${goldStroke}`,
    },
    outline: {
      background: "transparent",
      color: goldText,
      border: `2px solid ${goldStroke}`,
    },
    ghost: {
      background: "transparent",
      color: goldText,
      border: "2px solid transparent",
      padding: 0,
    },
  };

  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;

  return (
    <Tag
      href={localizeHref(href, lang)}
      type={!href && Tag === "button" ? type || "button" : undefined}
      className={`jr-press ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        width: fullWidth ? "100%" : "auto",
        fontFamily: "var(--jr-font-heading)",
        fontWeight: 700,
        textTransform: "uppercase",
        textDecoration: "none",
        cursor: "pointer",
        borderRadius: "var(--jr-radius-md)",
        transition: "transform var(--jr-dur-press) var(--jr-ease-out), background-color var(--jr-dur-fast) var(--jr-ease-out), color var(--jr-dur-fast) var(--jr-ease-out)",
        ...s,
        ...v,
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      <span>{children}</span>
      {iconRight && <ArrowRightIcon size={s.fontSize + 4} />}
    </Tag>
  );
}
