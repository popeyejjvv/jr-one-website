import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug, getAllPosts } from "@/lib/blog";
import BlogPost from "./BlogPost";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  // Pair hreflang with the Spanish version only if it has actually been translated.
  const esPost = await getPostBySlug(slug, "es");
  const languages = {
    "en-US": `https://www.jronegutters.com/blog/${slug}`,
    "x-default": `https://www.jronegutters.com/blog/${slug}`,
  };
  if (esPost) languages["es-US"] = `https://www.jronegutters.com/es/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["JR One Aluminum"],
    },
    alternates: {
      canonical: `https://www.jronegutters.com/blog/${slug}`,
      languages,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // Get related posts (same category, exclude current)
  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, 3);

  // No FAQPage JSON-LD on blog posts: FAQ content renders as visible on-page text (AEO),
  // and FAQPage rich results were deprecated site-wide per the 2026-05-26 audit. 2026-06-29 (E5).

  // Breadcrumb schema for blog posts
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.jronegutters.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://www.jronegutters.com/blog/${slug}` },
    ],
  };

  // Article schema for rich results
  // image, dateModified, publisher.logo added 2026-06-29 (E1) for Article rich-result eligibility.
  // Per-post image falls back to the brand OG card when frontmatter has none.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image ? `https://www.jronegutters.com${post.image}` : "https://www.jronegutters.com/og/og-card.png",
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    author: { "@type": "Organization", name: "JR One Aluminum LLC", url: "https://www.jronegutters.com" },
    publisher: {
      "@type": "Organization",
      name: "JR One Aluminum LLC",
      url: "https://www.jronegutters.com",
      logo: { "@type": "ImageObject", url: "https://www.jronegutters.com/og/og-card.png" },
    },
    mainEntityOfPage: `https://www.jronegutters.com/blog/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BlogPost post={post} related={related} />
    </>
  );
}
