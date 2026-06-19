"use client";

/**
 * ServiceCard , replaces emoji-icon service cards.
 *
 * Custom SVG icon in a tinted gold tile, title, body copy, fine "Learn more" affordance.
 * Hover: subtle translateY + gold border (gated to mouse devices).
 * Press: scale(0.97) (Emil).
 */
import {
  WaterDropIcon,
  ShieldIcon,
  RoofEdgeIcon,
  WrenchIcon,
  RulerIcon,
  BroomIcon,
  HouseIcon,
  LightBulbIcon,
  ArrowRightIcon,
} from "../../lib/icons";
import { useLanguage } from "../../lib/LanguageContext";
import { localizeHref } from "../../lib/locale";

const ICON_MAP = {
  water: WaterDropIcon,
  shield: ShieldIcon,
  edge: RoofEdgeIcon,
  wrench: WrenchIcon,
  ruler: RulerIcon,
  broom: BroomIcon,
  house: HouseIcon,
  bulb: LightBulbIcon,
};

export default function ServiceCard({
  icon = "shield",
  title,
  desc,
  href,
  cta = "Learn more",
}) {
  const { lang } = useLanguage();
  // Icon prop can be either an SVG-key (rendered via ICON_MAP) or a literal
  // emoji/text string (rendered directly). Falls through to ShieldIcon only
  // when it's an unknown SVG-key (i.e. plain ASCII like "shield-x").
  const Icon = ICON_MAP[icon] || (typeof icon === "string" && /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F8FF}]/u.test(icon) ? null : ShieldIcon);
  const isEmoji = !Icon;

  const inner = (
    <>
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "var(--jr-radius-md)",
          background: "var(--jr-gold-pale)",
          border: "1px solid rgba(212, 175, 55, 0.32)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "var(--jr-space-5)",
          color: "var(--jr-gold)",
        }}
      >
        {isEmoji ? (
          <span style={{ fontSize: 28, lineHeight: 1 }} aria-hidden>{icon}</span>
        ) : (
          <Icon size={26} />
        )}
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
          lineHeight: 1.6,
          color: "var(--jr-muted-on-dark)",
          marginBottom: "var(--jr-space-5)",
          flex: 1,
        }}
      >
        {desc}
      </p>
      {cta && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--jr-font-heading)",
            fontSize: "var(--jr-text-xs)",
            fontWeight: 700,
            color: "var(--jr-gold)",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          {cta} <ArrowRightIcon size={14} />
        </span>
      )}
    </>
  );

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    background: "var(--jr-navy-deep)",
    border: "1px solid var(--jr-navy-3)",
    borderRadius: "var(--jr-radius-lg)",
    padding: "28px 24px",
    height: "100%",
    textDecoration: "none",
    color: "inherit",
  };

  if (href) {
    return (
      <a href={localizeHref(href, lang)} className="jr-hover-lift jr-press" style={cardStyle}>
        {inner}
      </a>
    );
  }

  return <div className="jr-hover-lift" style={cardStyle}>{inner}</div>;
}
