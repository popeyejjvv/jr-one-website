import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import BlogIndex from "./BlogIndex";

export const metadata = {
  title: "Blog: Gutter, Soffit & Fascia Tips",
  description:
    "Expert tips on gutter installation (6\" and 7\" only), soffit repair, fascia replacement, drainage, Peak 301, and home exterior maintenance from Tampa Bay's aluminum specialists.",
  alternates: { canonical: "https://www.jronegutters.com/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogIndex posts={posts} />;
}
