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

  // Build FAQ schema if FAQs exist

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
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "JR One Aluminum LLC", url: "https://www.jronegutters.com" },
    publisher: { "@type": "Organization", name: "JR One Aluminum LLC", url: "https://www.jronegutters.com" },
    mainEntityOfPage: `https://jronegutters.com/blog/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BlogPost post={post} related={related} />
    </>
  );
}
