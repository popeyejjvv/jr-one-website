// CityPortfolio — per-city CompanyCam evidence on /areas/[slug] + combo pages.
// HIGH/MEDIUM density cities render the real per-city portfolio with neighborhood-named alt text.
// LOW density cities (Tarpon Springs only) render honest county-level fallback labeled as such.
// Every photo emits an ImageObject JSON-LD block with contentLocation + datePublished + creator.
//
// Usage:
//   <CityPortfolio citySlug="lakeland" cityName="Lakeland" limit={9} />
//   <CityPortfolio citySlug="tampa" cityName="Tampa" serviceFilter="copper-gutters" limit={12} />

import Image from "next/image";
import {
  getJobsByCity,
  getCityEvidenceDensity,
  getCountyFallbackJobs,
} from "../lib/companycam/by-city";

export default async function CityPortfolio({
  citySlug,
  cityName,
  serviceFilter,
  limit = 12,
}) {
  // Min-render gate: never show a sparse 1-2 photo grid. If filtering (PII/unprofessional
  // removal) or thin evidence leaves fewer than this, omit the portfolio entirely.
  const MIN_PORTFOLIO = 3;

  const density = await getCityEvidenceDensity(citySlug);

  // LOW or NONE density → regional fallback. Honest county labeling, no city-specific claims.
  if (density.tier === "low" || density.tier === "none") {
    const fallback = await getCountyFallbackJobs(density.county, { limit });
    if (fallback.length < MIN_PORTFOLIO) {
      return null; // not enough safe evidence — render nothing (let other page content carry)
    }
    return (
      <section
        className="city-portfolio city-portfolio--regional"
        aria-labelledby={`portfolio-heading-${citySlug}`}
      >
        <h2 id={`portfolio-heading-${citySlug}`}>
          Recent {density.county} County Work
        </h2>
        <p className="portfolio-intro">
          We work across {density.county} County year-round. Below is a sample of recent JR One
          gutter, soffit, and fascia work in the area. Every photo is from a real JR One job.
        </p>
        <PortfolioGrid photos={fallback} regional />
      </section>
    );
  }

  // HIGH or MEDIUM density → real per-city portfolio
  const photos = await getJobsByCity(citySlug, { limit, serviceFilter });

  if (photos.length < MIN_PORTFOLIO) {
    // Density said HIGH/MEDIUM but the service filter (or PII filtering) narrowed this too
    // far (e.g., copper filter on a city with few copper jobs). Fall back to mixed-service.
    const mixed = await getJobsByCity(citySlug, { limit });
    if (mixed.length < MIN_PORTFOLIO) return null;
    return (
      <section
        className="city-portfolio"
        aria-labelledby={`portfolio-heading-${citySlug}`}
      >
        <h2 id={`portfolio-heading-${citySlug}`}>
          Real JR One Work in {cityName}, FL
        </h2>
        <p className="portfolio-intro">
          {density.count} JR One jobs in {cityName} since November 2022. Every photo is a real install.
        </p>
        <PortfolioGrid photos={mixed} />
      </section>
    );
  }

  return (
    <section
      className="city-portfolio"
      aria-labelledby={`portfolio-heading-${citySlug}`}
    >
      <h2 id={`portfolio-heading-${citySlug}`}>
        Real JR One Work in {cityName}, FL
      </h2>
      <p className="portfolio-intro">
        {density.count} JR One jobs in {cityName} since November 2022. Every photo is a real install
        captured on a CompanyCam-tracked jobsite by our crew.
      </p>
      <PortfolioGrid photos={photos} />
    </section>
  );
}

function PortfolioGrid({ photos, regional = false }) {
  return (
    <div className="portfolio-grid" role="list">
      {photos.map((photo) => (
        <figure key={photo.id} className="portfolio-photo" role="listitem">
          <Image
            src={photo.web}
            alt={photo.altText}
            width={400}
            height={300}
            sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
            loading="lazy"
          />
          <figcaption>
            <span className="portfolio-photo__service">{photo.serviceLabel}</span>
            {" / "}
            <span className="portfolio-photo__location">
              {regional ? `${photo.countyDisplay} County` : `${photo.cityNameDisplay}, FL`}
            </span>
            {" / "}
            <span className="portfolio-photo__date">{photo.captionDate}</span>
          </figcaption>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ImageObject",
                contentUrl: photo.original || photo.web,
                thumbnailUrl: photo.thumbnail || photo.web,
                name: photo.altText,
                contentLocation: {
                  "@type": "Place",
                  name: regional
                    ? `${photo.countyDisplay} County, FL`
                    : `${photo.cityNameDisplay}, FL`,
                  address: {
                    "@type": "PostalAddress",
                    ...(regional ? {} : { addressLocality: photo.cityNameDisplay }),
                    addressRegion: "FL",
                    addressCountry: "US",
                  },
                },
                datePublished: photo.capturedAt,
                creator: {
                  "@type": "Organization",
                  name: "JR One Aluminum LLC",
                  url: "https://www.jronegutters.com",
                },
                copyrightHolder: {
                  "@type": "Organization",
                  name: "JR One Aluminum LLC",
                  url: "https://www.jronegutters.com",
                },
                license: "https://www.jronegutters.com/image-license",
                acquireLicensePage: "https://www.jronegutters.com/image-license",
                copyrightNotice: "Copyright 2022 to 2026 JR One Aluminum LLC. All rights reserved.",
                creditText: "JR One Aluminum LLC",
              }),
            }}
          />
        </figure>
      ))}
    </div>
  );
}
