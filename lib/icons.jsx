/**
 * JR One , Custom SVG icon library.
 *
 * Replaces every emoji on the site (taste-skill ANTI-EMOJI POLICY [CRITICAL]).
 * All icons: 24x24 viewBox, currentColor stroke, stroke-width 1.5, round caps/joins.
 *
 * Usage:
 *   import { WaterDropIcon, ShieldIcon } from "../lib/icons";
 *   <WaterDropIcon size={20} color="var(--jr-gold)" />
 */

const base = ({ size = 24, color = "currentColor", className = "", "aria-hidden": ariaHidden = true, ...rest }) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className,
  "aria-hidden": ariaHidden,
  ...rest,
});

// Service icons -------------------------------------------------------------

export const WaterDropIcon = (p) => (
  <svg {...base(p)}>
    <path d="M12 3.5c2.6 3.6 5.5 6.6 5.5 10.2a5.5 5.5 0 0 1-11 0c0-3.6 2.9-6.6 5.5-10.2Z" />
  </svg>
);

export const ShieldIcon = (p) => (
  <svg {...base(p)}>
    <path d="M12 3.5 4.5 6.5v6c0 4.6 3.2 7.5 7.5 8.5 4.3-1 7.5-3.9 7.5-8.5v-6L12 3.5Z" />
    <path d="M9 12.5l2 2 4-4" />
  </svg>
);

export const RoofEdgeIcon = (p) => (
  <svg {...base(p)}>
    <path d="M3 13 12 5l9 8" />
    <path d="M5 13v6h14v-6" />
    <path d="M5 16h14" />
  </svg>
);

export const WrenchIcon = (p) => (
  <svg {...base(p)}>
    <path d="M14.7 6.3a4 4 0 0 1 5 5l-2.5-1-2 2 1 2.5a4 4 0 0 1-5-5L8.3 6.7l1.5-1.5a4 4 0 0 1 5 1.1Z" />
    <path d="m13.5 10.5-9 9" />
  </svg>
);

export const RulerIcon = (p) => (
  <svg {...base(p)}>
    <path d="m3 16 13-13 5 5L8 21l-5-5Z" />
    <path d="M7 14l2 2" />
    <path d="M10 11l2 2" />
    <path d="M13 8l2 2" />
    <path d="M16 5l2 2" />
  </svg>
);

export const BroomIcon = (p) => (
  <svg {...base(p)}>
    <path d="M14 4l6 6" />
    <path d="m11 7 6 6-6 8H4l3-7 4-7Z" />
    <path d="m7 14 4 4" />
    <path d="m9 11 4 4" />
  </svg>
);

export const HouseIcon = (p) => (
  <svg {...base(p)}>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-5h4v5" />
  </svg>
);

export const LightBulbIcon = (p) => (
  <svg {...base(p)}>
    <path d="M9 18h6" />
    <path d="M10 21h4" />
    <path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.4 1 2.5h6c0-1.1.3-1.8 1-2.5A6 6 0 0 0 12 3Z" />
  </svg>
);

// Trust / credentials ------------------------------------------------------

export const ClockIcon = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const StarIcon = (p) => (
  <svg {...base(p)} fill={p.fill || "currentColor"} stroke="none">
    <path d="m12 3.5 2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8L6.7 20l1-6L3.4 9.9l6-.9L12 3.5Z" />
  </svg>
);

export const StarOutlineIcon = (p) => (
  <svg {...base(p)}>
    <path d="m12 3.5 2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8L6.7 20l1-6L3.4 9.9l6-.9L12 3.5Z" />
  </svg>
);

export const HardHatIcon = (p) => (
  <svg {...base(p)}>
    <path d="M4 17h16v3H4z" />
    <path d="M4 17v-1a8 8 0 0 1 16 0v1" />
    <path d="M10 9V6h4v3" />
  </svg>
);

export const CheckIcon = (p) => (
  <svg {...base(p)}>
    <path d="m4 12 5 5L20 6" />
  </svg>
);

export const CheckCircleIcon = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 3 3 5-6" />
  </svg>
);

export const ShieldCheckIcon = ShieldIcon; // alias , shield + check is the same icon visually

export const FamilyIcon = (p) => (
  <svg {...base(p)}>
    <circle cx="8" cy="8" r="2.5" />
    <circle cx="16" cy="8" r="2.5" />
    <path d="M3 19c.5-2.5 2.5-4 5-4s4.5 1.5 5 4" />
    <path d="M11 19c.5-2.5 2.5-4 5-4s4.5 1.5 5 4" />
  </svg>
);

// Promo / offers -----------------------------------------------------------

export const CardIcon = (p) => (
  <svg {...base(p)}>
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path d="M3 10h18" />
    <path d="M7 15h4" />
  </svg>
);

export const GiftIcon = (p) => (
  <svg {...base(p)}>
    <rect x="3" y="9" width="18" height="11" rx="1" />
    <path d="M12 9v11" />
    <path d="M3 13h18" />
    <path d="M8 9c-2 0-3-1-3-2.5S6 4 8 4c2 0 4 5 4 5s2-5 4-5c2 0 3 1 3 2.5S18 9 16 9" />
  </svg>
);

export const PercentIcon = (p) => (
  <svg {...base(p)}>
    <path d="m6 18 12-12" />
    <circle cx="7.5" cy="7.5" r="2" />
    <circle cx="16.5" cy="16.5" r="2" />
  </svg>
);

// Comms / contact ----------------------------------------------------------

export const PhoneIcon = (p) => (
  <svg {...base(p)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2C9.7 21 3 14.3 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export const MailIcon = (p) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const MapPinIcon = (p) => (
  <svg {...base(p)}>
    <path d="M12 22c-4-5-7-8.5-7-12a7 7 0 0 1 14 0c0 3.5-3 7-7 12Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

// Navigation / chrome ------------------------------------------------------

export const ChevronDownIcon = (p) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronRightIcon = (p) => (
  <svg {...base(p)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const ArrowRightIcon = (p) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const MenuIcon = (p) => (
  <svg {...base(p)}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
);

export const XIcon = (p) => (
  <svg {...base(p)}>
    <path d="m6 6 12 12" />
    <path d="m6 18 12-12" />
  </svg>
);

// Feature/utility icons ----------------------------------------------------

export const SparkleIcon = (p) => (
  <svg {...base(p)}>
    <path d="M12 4v4M12 16v4M4 12h4M16 12h4" />
    <path d="m6 6 2 2M16 16l2 2M6 18l2-2M16 8l2-2" />
  </svg>
);

export const QuoteIcon = (p) => (
  <svg {...base(p)} fill={p.fill || "currentColor"} stroke="none">
    <path d="M7 7h4v4c0 2.5-1.5 4-4 4v-2c1.5 0 2-.7 2-2H7V7Zm6 0h4v4c0 2.5-1.5 4-4 4v-2c1.5 0 2-.7 2-2h-2V7Z" />
  </svg>
);

export const PlayIcon = (p) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M7 4v16l13-8L7 4Z" />
  </svg>
);

// Convenience: render N stars
export const StarRow = ({ count = 5, size = 14, color = "var(--jr-gold)", gap = 2 }) => (
  <span style={{ display: "inline-flex", gap, color }} aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: count }).map((_, i) => (
      <StarIcon key={i} size={size} />
    ))}
  </span>
);
