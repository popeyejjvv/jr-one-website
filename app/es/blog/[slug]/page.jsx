import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug, getAllPosts } from "@/lib/blog";
import BlogPost from "../../../blog/[slug]/BlogPost";

// Only Spanish-translated slugs resolve; any other returns a real 404
// (no English content served under an /es URL).
export function generateStaticParams() {
  return getAllPostSlugs("es").map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, "es");
  if (!post) return { title: "Artículo no encontrado" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["JR One Aluminum"],
      locale: "es_US",
    },
    alternates: {
      canonical: `https://www.jronegutters.com/es/blog/${slug}`,
      languages: {
        "en-US": `https://www.jronegutters.com/blog/${slug}`,
        "es-US": `https://www.jronegutters.com/es/blog/${slug}`,
        "x-default": `https://www.jronegutters.com/blog/${slug}`,
      },
    },
  };
}

export default async function EsBlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, "es");
  if (!post) notFound();

  const allPosts = getAllPosts("es");
  const related = allPosts
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.jronegutters.com/es/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://www.jronegutters.com/es/blog/${slug}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    inLanguage: "es-US",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "JR One Aluminum LLC", url: "https://www.jronegutters.com" },
    publisher: { "@type": "Organization", name: "JR One Aluminum LLC", url: "https://www.jronegutters.com" },
    mainEntityOfPage: `https://www.jronegutters.com/es/blog/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BlogPost post={post} related={related} />
    </>
  );
}
