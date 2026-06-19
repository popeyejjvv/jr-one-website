import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Get all blog post slugs for static generation
 */
export function getAllPostSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/**
 * Get all posts with frontmatter (for index page)
 * Sorted by date descending
 */
export function getAllPosts() {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => {
      const filePath = path.join(BLOG_DIR, `${slug}.md`);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      // Estimate reading time: ~200 words per minute
      const wordCount = fileContents.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 200);
      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || "2026-01-01",
        category: data.category || "General",
        keyword: data.keyword || "",
        readingTime,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
}

/**
 * Get a single post by slug with full HTML content
 */
export async function getPostBySlug(slug) {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Strip a leading markdown H1 — BlogPost renders post.title as the page H1,
  // so the body's "# Title" would emit a duplicate H1 (2026-06-19 SEO audit fix).
  const body = content.replace(/^\s*#[^#].*(?:\r?\n|$)/, "");

  const processed = await remark().use(html).process(body);
  const contentHtml = processed.toString();

  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "2026-01-01",
    category: data.category || "General",
    keyword: data.keyword || "",
    readingTime,
    contentHtml,
    // FAQ schema data if present
    faqs: data.faqs || [],
  };
}
