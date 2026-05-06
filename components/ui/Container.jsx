/**
 * Container , centered max-width wrapper.
 * Variants: default (1200px), wide (1320px), narrow (880px), prose (720px).
 */
export default function Container({
  children,
  size = "default",
  className = "",
  style = {},
  as: Tag = "div",
  ...rest
}) {
  const widths = {
    default: "var(--jr-container)",
    wide: "var(--jr-container-wide)",
    narrow: "var(--jr-container-narrow)",
    prose: "var(--jr-container-prose)",
  };
  return (
    <Tag
      className={className}
      style={{
        maxWidth: widths[size] || widths.default,
        margin: "0 auto",
        paddingLeft: "var(--jr-space-6)",
        paddingRight: "var(--jr-space-6)",
        width: "100%",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
