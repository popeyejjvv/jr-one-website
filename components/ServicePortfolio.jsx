// ServicePortfolio — cross-city CompanyCam evidence on top-level service pages.
// Renders real JR One {service} installs across Tampa Bay, labeled with the actual city per photo
// so the evidence is verifiable and honest (no city-spoofing).
// Each photo emits an ImageObject JSON-LD block with contentLocation + datePublished + creator.
//
// Usage:
//   <ServicePortfolio serviceSlug="seamless-aluminum-gutters" serviceLabel="Seamless aluminum gutter" limit={12} />

import Image from "next/image";
import {
  getJobsByService,
  getServiceEvidenceDensity,
} from "../lib/companycam/by-city";

export default async function ServicePortfolio({
  serviceSlug,
  serviceLabel,
  limit = 12,
}) {
  const density = await getServiceEvidenceDensity(serviceSlug);
  if (density.tier === "none") return null;

  const photos = await getJobsByService(serviceSlug, { limit });
  // Min-render gate: never show a sparse 1-2 photo grid. If the quality filter (or a thin
  // service line) leaves fewer than MIN_PORTFOLIO photos, omit the section entirely and let
  // the rest of the page carry. Better no portfolio than a sparse, low-trust one.
  const MIN_PORTFOLIO = 3;
  if (photos.length < MIN_PORTFOLIO) return null;

  const headingLabel = serviceLabel || "JR One";

  return (
    <section
      className="service-portfolio"
      aria-labelledby={`service-portfolio-${serviceSlug}`}
    >
      <h2 id={`service-portfolio-${serviceSlug}`}>
        Recent {headingLabel} Work Across Tampa Bay
      </h2>
      <p className="portfolio-intro">
        {density.count} JR One {headingLabel.toLowerCase()} jobs across the Tampa Bay
        service area since November 2022. Every photo is from a real install captured
        on a CompanyCam-tracked jobsite by our crew.
      </p>
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
              <span className="portfolio-photo__location">{photo.cityNameDisplay}, FL</span>
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
                  contentLocation: `${photo.cityNameDisplay}, FL`,
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
    </section>
  );
}
