"use client";

/**
 * FAQAccordion , single-open accordion with proper ARIA + custom easing.
 *
 * Emil rules applied:
 *   - transition: grid-template-rows (CSS-grid expand trick), not height (which would trigger layout)
 *   - Custom ease-out curve, 220ms (under 300ms limit)
 *   - Chevron uses transform (hardware-accel), not rotate via inline style swap
 *   - aria-expanded + aria-controls + matching IDs
 *   - Reduced-motion fallback handled by global CSS rule
 */
import { useState, useId } from "react";
import { ChevronDownIcon } from "../../lib/icons";

export default function FAQAccordion({ items, theme = "dark" }) {
  const [openIndex, setOpenIndex] = useState(null);
  const groupId = useId();

  const onDark = theme === "dark";
  const dividerColor = onDark ? "var(--jr-navy-3)" : "rgba(0,0,0,0.08)";
  const titleColor = onDark ? "var(--jr-paper)" : "var(--jr-ink)";
  const bodyColor = onDark ? "var(--jr-muted-on-dark)" : "var(--jr-muted-on-light)";

  return (
    <div role="region" aria-label="Frequently asked questions">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const triggerId = `${groupId}-q-${i}`;
        const panelId = `${groupId}-a-${i}`;

        return (
          <div
            key={i}
            style={{
              borderTop: i === 0 ? `1px solid ${dividerColor}` : "none",
              borderBottom: `1px solid ${dividerColor}`,
            }}
          >
            {/* WAI-ARIA accordion pattern: the trigger is wrapped in a real
                heading so each question is a question-shaped heading in the
                rendered HTML. Passage-level retrieval (AI answer engines) uses
                the nearest heading to decide what a passage is about. */}
            <h3 style={{ margin: 0 }}>
              <button
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 4px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "var(--jr-text-md)",
                  fontWeight: 600,
                  color: titleColor,
                  textAlign: "left",
                  gap: "var(--jr-space-4)",
                }}
              >
                <span style={{ flex: 1 }}>{item.q}</span>
                <span
                  aria-hidden
                  style={{
                    display: "inline-flex",
                    color: "var(--jr-gold)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform var(--jr-dur-base) var(--jr-ease-out)",
                  }}
                >
                  <ChevronDownIcon size={20} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows var(--jr-dur-slow) var(--jr-ease-out)",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <p
                  style={{
                    fontFamily: "var(--jr-font-body)",
                    fontSize: "var(--jr-text-md)",
                    lineHeight: 1.7,
                    color: bodyColor,
                    padding: "0 4px var(--jr-space-6)",
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
