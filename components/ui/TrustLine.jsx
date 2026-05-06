/**
 * TrustLine , single inline credentials line.
 *
 * Replaces the impeccable-banned hero-metric template (4 colored trust badges
 * in a row). Renders as: [icon] item · [icon] item · [icon] item · [icon] item
 *
 * Items are dot-separated with a thin divider, NOT colored backgrounds.
 * Use on any dark surface (hero, footer band, CTA band).
 */
import { FamilyIcon, ClockIcon, HardHatIcon, ShieldCheckIcon, StarIcon } from "../../lib/icons";

const ICONS = {
  family: FamilyIcon,
  clock: ClockIcon,
  crew: HardHatIcon,
  insured: ShieldCheckIcon,
  star: StarIcon,
};

export default function TrustLine({ items, theme = "dark", size = "md" }) {
  const onDark = theme === "dark";
  const labelColor = onDark ? "var(--jr-paper)" : "var(--jr-ink)";
  const iconColor = "var(--jr-gold)";
  const dividerColor = onDark
    ? "rgba(255, 255, 255, 0.18)"
    : "rgba(0, 0, 0, 0.14)";

  const fontSizes = {
    sm: "var(--jr-text-xs)",
    md: "var(--jr-text-sm)",
    lg: "var(--jr-text-base)",
  };
  const iconSizes = { sm: 14, md: 16, lg: 18 };

  return (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "var(--jr-space-2) 0",
        listStyle: "none",
        padding: 0,
        margin: 0,
      }}
    >
      {items.map((it, i) => {
        const Icon = ICONS[it.icon] || ShieldCheckIcon;
        return (
          <li
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--jr-space-2)",
              paddingRight: "var(--jr-space-4)",
              paddingLeft: i === 0 ? 0 : "var(--jr-space-4)",
              borderLeft: i === 0 ? "none" : `1px solid ${dividerColor}`,
              fontFamily: "var(--jr-font-heading)",
              fontSize: fontSizes[size] || fontSizes.md,
              fontWeight: 600,
              letterSpacing: "0.5px",
              color: labelColor,
              textTransform: "uppercase",
            }}
          >
            <Icon size={iconSizes[size] || iconSizes.md} color={iconColor} />
            <span>{it.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
