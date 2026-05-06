/**
 * CTABand , final-call CTA strip.
 *
 * Title + sub + two buttons (call + form). Used at end of every page.
 */
import Container from "./Container";
import Button from "./Button";
import { PhoneIcon } from "../../lib/icons";

export default function CTABand({
  title,
  sub,
  phone = "(844) 444-3114",
  phoneHref = "tel:8444443114",
  primaryLabel = "Request a Quote",
  primaryHref = "/contact",
  accent,
  accentLight,
}) {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, var(--jr-navy) 0%, var(--jr-navy-deep) 100%)",
        padding: "var(--jr-space-20) var(--jr-space-6)",
        borderTop: "var(--jr-hair-darker)",
      }}
    >
      <Container size="narrow" style={{ textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "var(--jr-font-heading)",
            fontSize: "var(--jr-text-3xl)",
            fontWeight: 700,
            color: "var(--jr-paper)",
            letterSpacing: "1px",
            marginBottom: "var(--jr-space-3)",
            textTransform: "uppercase",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontFamily: "var(--jr-font-body)",
            fontSize: "var(--jr-text-lg)",
            lineHeight: 1.65,
            color: "var(--jr-muted-on-dark)",
            maxWidth: "560px",
            margin: "0 auto var(--jr-space-8)",
          }}
        >
          {sub}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--jr-space-4)",
            justifyContent: "center",
          }}
        >
          <Button
            href={phoneHref}
            variant="primary"
            size="lg"
            iconLeft={<PhoneIcon size={18} />}
            accent={accent}
            accentLight={accentLight}
          >
            Call {phone}
          </Button>
          <Button
            href={primaryHref}
            variant="outline"
            size="lg"
            iconRight
            accent={accent}
            accentLight={accentLight}
          >
            {primaryLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
