// FAQPage schema, server-side JSON-LD so Google gets rich Q&A snippets
// in search results even though the /faq UI is a client component.
// Top 20 Q&As covering the highest-intent customer queries.

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does JR One offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JR One specializes in seamless aluminum gutters (6\" and 7\"), copper gutters, gutter guards (aluminum, standard, micro mesh, EZ mesh), soffit and fascia installation, siding, SAGIPER architectural cladding, gutter repair, Peak 301 roof rejuvenation, Govee smart light installation, drainage installation, and maintenance plans. Aluminum exterior specialists, that's all we do.",
      },
    },
    {
      "@type": "Question",
      name: "What areas does JR One serve in Tampa Bay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JR One serves 21+ cities across Tampa Bay and Florida's west coast including Tampa, Brandon, Riverview, Wesley Chapel, Clearwater, St. Petersburg, Bradenton, Sarasota, Lakeland, Land O' Lakes, Lutz, Palm Harbor, Sun City Center, Apollo Beach, Plant City, Valrico, Spring Hill, and Dunedin. If you're within an hour of Tampa, JR One likely covers your area.",
      },
    },
    {
      "@type": "Question",
      name: "How long has JR One been in business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JR One Aluminum LLC was formed in 2006 by Christopher Rivera. Family roots in the Tampa Bay gutter trade go back to 1990, when Christopher's father Javier Rivera began installing gutters in Tampa. Over 30 years of family experience in the Tampa gutter industry across two generations.",
      },
    },
    {
      "@type": "Question",
      name: "Is JR One Aluminum licensed and insured?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. JR One Aluminum LLC is fully licensed and insured in the state of Florida. General liability insurance and workers' compensation coverage. Proof of insurance is provided on request.",
      },
    },
    {
      "@type": "Question",
      name: "Does JR One speak Spanish?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. JR One is a fully bilingual company, English and Spanish. Communication happens in whichever language the customer is most comfortable with, from first call through final walkthrough. Hablamos Español.",
      },
    },
    {
      "@type": "Question",
      name: "Does JR One use subcontractors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Never. Every person on the property is a trained, full-time JR One crew member. JR One runs three in-house crews. No subcontracted work, quality control and accountability stay in-house on every job.",
      },
    },
    {
      "@type": "Question",
      name: "Does JR One offer free estimates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Free on-site assessments for all services. JR One inspects the home, discusses needs, and provides a detailed transparent estimate with no obligation and no pressure.",
      },
    },
    {
      "@type": "Question",
      name: "What are seamless gutters and why do they matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Seamless gutters are custom-formed on-site from a single continuous piece of aluminum, no seams, joints, or splice points along the run. Traditional sectional gutters have joints every 10 feet that eventually leak. Seamless gutters eliminate those failure points for fewer leaks and cleaner aesthetics.",
      },
    },
    {
      "@type": "Question",
      name: "Should I get 5-inch or 6-inch gutters in Tampa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "6-inch gutters have 40% more water-carrying capacity than 5-inch. For most Tampa homes, given Florida's intense rainfall (46-50 inches annually) and larger roof footprints, 6-inch is often the right choice. JR One recommends size based on specific roof area and pitch during the free assessment.",
      },
    },
    {
      "@type": "Question",
      name: "How long do seamless aluminum gutters last in Tampa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Quality aluminum gutters installed correctly last 20-30 years in Tampa's climate with basic maintenance. Copper gutters last 50+ years. Main factors that shorten life: improper installation, standing water from incorrect pitch, and infrequent cleaning.",
      },
    },
    {
      "@type": "Question",
      name: "How much does gutter installation cost in Tampa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For a typical Tampa home with 150-180 linear feet of gutters, full seamless aluminum gutter installation runs approximately $1,500-$2,500 depending on configuration. Exact pricing depends on linear footage, gutter size, downspout count, and access.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I clean my gutters in Tampa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Homes with trees nearby typically need cleaning 2-4 times per year due to live oak leaves, pine needles, and seed pods. Without gutter guards, neglected gutters cause overflow, fascia damage, and foundation issues. Gutter guards reduce cleaning frequency to every 1-3 years for most homes.",
      },
    },
    {
      "@type": "Question",
      name: "What is soffit and why does it matter in Florida?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Soffit is the material that covers the underside of the roof overhang. Vented soffit allows airflow into the attic. In Florida, attics without adequate soffit ventilation can exceed 160°F, accelerating roof deck damage, increasing cooling costs dramatically, and creating mold conditions.",
      },
    },
    {
      "@type": "Question",
      name: "What is fascia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fascia is the horizontal board at the lower edge of the roofline, directly behind the gutters. It's what gutters mount to. Rotted or damaged fascia causes gutters to sag, pull away, and fail to drain properly, no matter how well the gutters themselves are installed.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best gutter guards for Tampa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Micro mesh guards perform best for Tampa's mix of large leaves and small debris (pine needles, seed pods). JR One's 6-inch micro mesh guard is the most recommended option for Tampa homes with tree coverage.",
      },
    },
    {
      "@type": "Question",
      name: "Are LeafFilter and Gutter Helmet worth the extra cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They make quality products, but pricing ($13-$20+/ft) reflects national advertising budgets and franchise overhead. JR One installs equivalent micro mesh technology at significantly lower rates, typically $1,000-$1,500 less for the average home, with 30+ years local specialist experience.",
      },
    },
    {
      "@type": "Question",
      name: "How long does aluminum soffit and fascia last?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aluminum soffit and fascia, properly installed, can last 30-40+ years. It does not rot, does not require painting, and is corrosion-resistant, ideal for Florida's humid, salt-air environment.",
      },
    },
    {
      "@type": "Question",
      name: "What is aluminum fascia wrapping?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fascia wrapping covers existing wood fascia boards with custom-bent aluminum coil stock. The aluminum is formed on-site to match the exact trim profile, permanently sealing the wood from moisture and eliminating the need for repainting.",
      },
    },
    {
      "@type": "Question",
      name: "What is Peak 301 roof rejuvenation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Peak 301 is a soy-based roof rejuvenation sealant that penetrates asphalt shingles and restores the oils UV and heat have depleted. Not a coating, works from inside the shingle out. Adds 6-10 years of life to an existing roof, backed by a 6-year warranty.",
      },
    },
    {
      "@type": "Question",
      name: "Does JR One Aluminum work as a subcontractor for roofing companies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. JR One Aluminum is an active subcontractor for roofing companies across Tampa Bay. Roofers use JR One for soffit, fascia, and gutter work on full roof replacement projects. Volume pricing and preferred scheduling available for trade partners.",
      },
    },
  ],
};

export const metadata = {
  title: "FAQ, Gutter, Soffit, Siding Questions Answered | JR One Aluminum Tampa",
  description:
    "Straight answers to every gutter, soffit, fascia, gutter guard, siding, and Peak 301 question Tampa Bay homeowners ask. Still stuck? Call (844) 444-3114.",
  alternates: { canonical: "https://jronegutters.com/faq" },
  openGraph: {
    title: "JR One Aluminum FAQ, Tampa Gutter & Soffit Questions Answered",
    description: "60+ honest answers on gutters, soffit, fascia, guards, siding, Peak 301, and insurance claims.",
    url: "https://jronegutters.com/faq",
    type: "website",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
