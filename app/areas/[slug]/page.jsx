import CityLandingPage from "@/components/CityLandingPage";

const VALID_SLUGS = [
  "tampa","clearwater","st-petersburg","sarasota","bradenton",
  "lakeland","brandon","wesley-chapel","palm-harbor","riverview",
  "new-port-richey","largo","spring-hill","tarpon-springs",
  "land-o-lakes","dunedin","ruskin","sun-city-center",
  "temple-terrace","plant-city","lutz"
];

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cityName = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `Gutter & Soffit Services in ${cityName}, FL | JR One Aluminum`,
    description: `Professional gutter installation, soffit, fascia, and siding services in ${cityName}, Florida. 30+ years experience. Free estimates. Call (844) 444-3114.`,
  };
}

export default async function CityPage({ params }) {
  const { slug } = await params;
  return <CityLandingPage citySlug={slug} />;
}
