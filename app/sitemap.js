import { getAllPostSlugs } from "@/lib/blog";

const BASE_URL = "https://jronegutters.com";

const CITY_SLUGS = [
  "tampa","clearwater","st-petersburg","sarasota","bradenton",
  "lakeland","brandon","wesley-chapel","palm-harbor","riverview",
  "new-port-richey","largo","spring-hill","tarpon-springs",
  "land-o-lakes","dunedin","ruskin","sun-city-center",
  "temple-terrace","plant-city","lutz",
];

const STATIC_PAGES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/seamless-aluminum-gutters", priority: 0.9, changeFrequency: "monthly" },
  { path: "/gutter-guards", priority: 0.9, changeFrequency: "monthly" },
  { path: "/soffit-and-fascia", priority: 0.9, changeFrequency: "monthly" },
  { path: "/siding", priority: 0.8, changeFrequency: "monthly" },
  { path: "/gutter-repair", priority: 0.9, changeFrequency: "monthly" },
  { path: "/peak-301", priority: 0.7, changeFrequency: "monthly" },
  { path: "/copper-gutters", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.7, changeFrequency: "weekly" },
  { path: "/warranties", priority: 0.5, changeFrequency: "yearly" },
  { path: "/financing", priority: 0.7, changeFrequency: "monthly" },
  { path: "/service-plans", priority: 0.7, changeFrequency: "monthly" },
  { path: "/govee-lights", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "daily" },
];

export default function sitemap() {
  const staticEntries = STATIC_PAGES.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const cityEntries = CITY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/areas/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogSlugs = getAllPostSlugs();
  const blogEntries = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...cityEntries, ...blogEntries];
}
