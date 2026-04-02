import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import BlogIndex from "./BlogIndex";

export const metadata = {
  title: "Blog | Gutter, Soffit & Fascia Tips",
  description:
    "Expert tips on gutter installation, soffit repair, fascia replacement, siding, and home exterior maintenance from Tampa Bay's aluminum specialists.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogIndex posts={posts} />;
}
