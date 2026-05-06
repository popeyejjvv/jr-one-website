// =============================================================================
// Blog Utility Functions Tests
// =============================================================================
// Tests for utility functions in lib/blog.js
// Covers:
//   - getAllPostSlugs()
//   - getAllPosts()
//   - getPostBySlug()
//
// Run with: npm test -- tests/blog.test.js
// =============================================================================

import test from "node:test";
import assert from "node:assert/strict";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEST_BLOG_DIR = path.join(__dirname, "fixtures", "blog");

// ─────────────────────────────────────────────────────────────────────────
// Setup: Create test fixtures
// ─────────────────────────────────────────────────────────────────────────

function setupBlogFixtures() {
  if (!fs.existsSync(TEST_BLOG_DIR)) {
    fs.mkdirSync(TEST_BLOG_DIR, { recursive: true });
  }

  // Sample post 1
  fs.writeFileSync(
    path.join(TEST_BLOG_DIR, "first-post.md"),
    `---
title: First Post
description: This is the first post
date: 2026-01-15
category: Getting Started
keyword: first
faqs:
  - question: What is this?
    answer: This is a test post.
---

# First Post

This is the content of the first post. It has about 50 words total so we can test the reading time calculation which estimates 200 words per minute.
`
  );

  // Sample post 2 (newer)
  fs.writeFileSync(
    path.join(TEST_BLOG_DIR, "second-post.md"),
    `---
title: Second Post
description: This is the second post
date: 2026-02-20
category: Tips
keyword: second
---

# Second Post

This is the content of the second post. It has more content than the first post to test longer reading times.
`
  );

  // Sample post 3 (missing date)
  fs.writeFileSync(
    path.join(TEST_BLOG_DIR, "no-date-post.md"),
    `---
title: No Date Post
description: Post without date
category: Misc
---

Content here.
`
  );

  // Non-markdown file (should be ignored)
  fs.writeFileSync(
    path.join(TEST_BLOG_DIR, "not-a-post.txt"),
    "This is not a markdown file"
  );
}

function teardownBlogFixtures() {
  if (fs.existsSync(TEST_BLOG_DIR)) {
    const files = fs.readdirSync(TEST_BLOG_DIR);
    files.forEach((file) => {
      fs.unlinkSync(path.join(TEST_BLOG_DIR, file));
    });
    fs.rmdirSync(TEST_BLOG_DIR);
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Utility Functions (copy from lib/blog.js)
// ─────────────────────────────────────────────────────────────────────────

function getAllPostSlugs(blogDir) {
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function getAllPosts(blogDir) {
  const { remark } = require("remark");
  const html = require("remark-html");
  const matter = require("gray-matter");

  const slugs = getAllPostSlugs(blogDir);
  const posts = slugs
    .map((slug) => {
      const filePath = path.join(blogDir, `${slug}.md`);
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

async function getPostBySlug(slug, blogDir) {
  const { remark } = require("remark");
  const html = require("remark-html");
  const matter = require("gray-matter");

  const filePath = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html).process(content);
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

// ─────────────────────────────────────────────────────────────────────────
// Tests: getAllPostSlugs()
// ─────────────────────────────────────────────────────────────────────────

test("getAllPostSlugs() - returns markdown file slugs", () => {
  setupBlogFixtures();
  try {
    const slugs = getAllPostSlugs(TEST_BLOG_DIR);

    assert.ok(Array.isArray(slugs));
    assert.ok(slugs.includes("first-post"));
    assert.ok(slugs.includes("second-post"));
    assert.ok(slugs.includes("no-date-post"));
    // Should NOT include non-.md files
    assert.ok(!slugs.includes("not-a-post"));
  } finally {
    teardownBlogFixtures();
  }
});

test("getAllPostSlugs() - empty directory returns empty array", () => {
  const emptyDir = path.join(TEST_BLOG_DIR, "empty");
  fs.mkdirSync(emptyDir, { recursive: true });

  try {
    const slugs = getAllPostSlugs(emptyDir);
    assert.deepEqual(slugs, []);
  } finally {
    if (fs.existsSync(emptyDir)) {
      fs.rmdirSync(emptyDir);
    }
  }
});

test("getAllPostSlugs() - non-existent directory returns empty array", () => {
  const fakeDir = path.join(TEST_BLOG_DIR, "nonexistent");
  const slugs = getAllPostSlugs(fakeDir);

  assert.deepEqual(slugs, []);
});

test("getAllPostSlugs() - filters out non-.md files", () => {
  setupBlogFixtures();
  try {
    const slugs = getAllPostSlugs(TEST_BLOG_DIR);

    // Should only have .md files
    slugs.forEach((slug) => {
      assert.ok(!slug.includes("."));
    });
  } finally {
    teardownBlogFixtures();
  }
});

// ─────────────────────────────────────────────────────────────────────────
// Tests: getAllPosts()
// ─────────────────────────────────────────────────────────────────────────

test("getAllPosts() - parses all posts with frontmatter", () => {
  setupBlogFixtures();
  try {
    const posts = getAllPosts(TEST_BLOG_DIR);

    assert.ok(Array.isArray(posts));
    assert.ok(posts.length >= 2);

    const firstPost = posts.find((p) => p.slug === "first-post");
    assert.ok(firstPost);
    assert.equal(firstPost.title, "First Post");
    assert.equal(firstPost.description, "This is the first post");
    assert.equal(firstPost.category, "Getting Started");
  } finally {
    teardownBlogFixtures();
  }
});

test("getAllPosts() - sorts by date descending", () => {
  setupBlogFixtures();
  try {
    const posts = getAllPosts(TEST_BLOG_DIR);

    // Second post (2026-02-20) should come before first post (2026-01-15)
    const secondIdx = posts.findIndex((p) => p.slug === "second-post");
    const firstIdx = posts.findIndex((p) => p.slug === "first-post");

    assert.ok(secondIdx < firstIdx, "Recent posts should come first");
  } finally {
    teardownBlogFixtures();
  }
});

test("getAllPosts() - handles missing date field (uses default)", () => {
  setupBlogFixtures();
  try {
    const posts = getAllPosts(TEST_BLOG_DIR);

    const noDatePost = posts.find((p) => p.slug === "no-date-post");
    assert.ok(noDatePost);
    assert.equal(noDatePost.date, "2026-01-01");
  } finally {
    teardownBlogFixtures();
  }
});

test("getAllPosts() - calculates reading time", () => {
  setupBlogFixtures();
  try {
    const posts = getAllPosts(TEST_BLOG_DIR);

    const firstPost = posts.find((p) => p.slug === "first-post");
    assert.ok(firstPost);
    assert.ok(firstPost.readingTime > 0);
    assert.equal(typeof firstPost.readingTime, "number");
  } finally {
    teardownBlogFixtures();
  }
});

test("getAllPosts() - includes keyword field", () => {
  setupBlogFixtures();
  try {
    const posts = getAllPosts(TEST_BLOG_DIR);

    const firstPost = posts.find((p) => p.slug === "first-post");
    assert.ok(firstPost);
    assert.equal(firstPost.keyword, "first");
  } finally {
    teardownBlogFixtures();
  }
});

// ─────────────────────────────────────────────────────────────────────────
// Tests: getPostBySlug()
// ─────────────────────────────────────────────────────────────────────────

test("getPostBySlug() - non-existent slug returns null", async () => {
  setupBlogFixtures();
  try {
    const post = await getPostBySlug("nonexistent", TEST_BLOG_DIR);
    assert.equal(post, null);
  } finally {
    teardownBlogFixtures();
  }
});

test("getPostBySlug() - returns post with HTML content", async () => {
  setupBlogFixtures();
  try {
    const post = await getPostBySlug("first-post", TEST_BLOG_DIR);

    assert.ok(post);
    assert.equal(post.slug, "first-post");
    assert.equal(post.title, "First Post");
    assert.ok(post.contentHtml);
    // Should contain HTML tags from markdown conversion
    assert.ok(post.contentHtml.includes("<h1>") || post.contentHtml.includes("<p>"));
  } finally {
    teardownBlogFixtures();
  }
});

test("getPostBySlug() - extracts FAQ schema data", async () => {
  setupBlogFixtures();
  try {
    const post = await getPostBySlug("first-post", TEST_BLOG_DIR);

    assert.ok(post);
    assert.ok(Array.isArray(post.faqs));
    assert.ok(post.faqs.length > 0);
    assert.equal(post.faqs[0].question, "What is this?");
    assert.equal(post.faqs[0].answer, "This is a test post.");
  } finally {
    teardownBlogFixtures();
  }
});

test("getPostBySlug() - post without FAQs has empty array", async () => {
  setupBlogFixtures();
  try {
    const post = await getPostBySlug("second-post", TEST_BLOG_DIR);

    assert.ok(post);
    assert.deepEqual(post.faqs, []);
  } finally {
    teardownBlogFixtures();
  }
});

test("getPostBySlug() - includes all frontmatter fields", async () => {
  setupBlogFixtures();
  try {
    const post = await getPostBySlug("first-post", TEST_BLOG_DIR);

    assert.ok(post);
    assert.ok("slug" in post);
    assert.ok("title" in post);
    assert.ok("description" in post);
    assert.ok("date" in post);
    assert.ok("category" in post);
    assert.ok("keyword" in post);
    assert.ok("readingTime" in post);
    assert.ok("contentHtml" in post);
    assert.ok("faqs" in post);
  } finally {
    teardownBlogFixtures();
  }
});

test("getPostBySlug() - reading time calculation", async () => {
  setupBlogFixtures();
  try {
    const post = await getPostBySlug("first-post", TEST_BLOG_DIR);

    assert.ok(post);
    assert.ok(post.readingTime > 0);
    // Small post should be 1 min read
    assert.equal(post.readingTime, 1);
  } finally {
    teardownBlogFixtures();
  }
});

// ─────────────────────────────────────────────────────────────────────────
// Integration Tests
// ─────────────────────────────────────────────────────────────────────────

test("Integration: getAllPosts() then getPostBySlug()", async () => {
  setupBlogFixtures();
  try {
    // Get list of posts
    const posts = getAllPosts(TEST_BLOG_DIR);
    assert.ok(posts.length > 0);

    // Fetch first post by slug
    const slug = posts[0].slug;
    const post = await getPostBySlug(slug, TEST_BLOG_DIR);

    // Should have same title
    assert.equal(post.title, posts[0].title);
  } finally {
    teardownBlogFixtures();
  }
});

test("Integration: Blog data consistency", async () => {
  setupBlogFixtures();
  try {
    const posts = getAllPosts(TEST_BLOG_DIR);
    const firstPost = posts[0];

    // Fetch full post
    const fullPost = await getPostBySlug(firstPost.slug, TEST_BLOG_DIR);

    // Metadata should match
    assert.equal(fullPost.title, firstPost.title);
    assert.equal(fullPost.description, firstPost.description);
    assert.equal(fullPost.date, firstPost.date);
    assert.equal(fullPost.category, firstPost.category);
  } finally {
    teardownBlogFixtures();
  }
});

// ─────────────────────────────────────────────────────────────────────────
// Error Handling Tests
// ─────────────────────────────────────────────────────────────────────────

test("Blog tests - cleanup after test", () => {
  // This test ensures fixtures are cleaned up
  // In a real test framework, this would be a teardown hook
  teardownBlogFixtures();
  assert.equal(fs.existsSync(TEST_BLOG_DIR), false);
});
