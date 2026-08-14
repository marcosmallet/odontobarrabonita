import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { isPublishedPost, blogFrontmatterSchema, type BlogPost } from "./schema";

export const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function isFixtureFile(fileName: string) {
  return fileName.startsWith("__") || fileName === "fixture-blog.mdx";
}

function sourceFiles() {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) return [];
  return fs.readdirSync(BLOG_CONTENT_DIR)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .filter((fileName) => fileName !== "_template.mdx")
    .filter((fileName) => process.env.BLOG_INCLUDE_FIXTURES === "1" || !isFixtureFile(fileName))
    .map((fileName) => path.join(BLOG_CONTENT_DIR, fileName));
}

function readingTimeMinutes(content: string) {
  const words = content.replace(/[`*_>#\[\]()]/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function parseBlogFile(sourcePath: string): BlogPost {
  const raw = fs.readFileSync(sourcePath, "utf8");
  const parsed = matter(raw);
  const frontmatter = blogFrontmatterSchema.parse(parsed.data);
  const fileSlug = path.basename(sourcePath, ".mdx");
  if (frontmatter.slug !== fileSlug) {
    throw new Error(`${sourcePath}: slug deve ser igual ao nome do arquivo (${fileSlug}).`);
  }
  return {
    ...frontmatter,
    content: parsed.content.trim(),
    sourcePath,
    isFixture: isFixtureFile(path.basename(sourcePath)),
    readingTimeMinutes: readingTimeMinutes(parsed.content),
  };
}

export function getAllPosts() {
  return sourceFiles().map(parseBlogFile);
}

function publishedAtTimestamp(value: string | null) {
  if (!value) return Number.NEGATIVE_INFINITY;
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? Number.NEGATIVE_INFINITY : timestamp;
}

export function comparePublishedPosts(a: Pick<BlogPost, "publishedAt" | "slug">, b: Pick<BlogPost, "publishedAt" | "slug">) {
  const byTimestamp = publishedAtTimestamp(b.publishedAt) - publishedAtTimestamp(a.publishedAt);
  if (byTimestamp !== 0) return byTimestamp;
  return a.slug.localeCompare(b.slug);
}

export function getPublishedPosts() {
  return getAllPosts()
    .filter((post) => isPublishedPost(post))
    .sort(comparePublishedPosts);
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByService(service: BlogPost["service"]) {
  return getPublishedPosts().filter((post) => post.service === service);
}

export function selectRelatedPosts(post: BlogPost, published: BlogPost[], limit = 3) {
  const candidates = published.filter((candidate) => candidate.slug !== post.slug);
  const bySlug = new Map(candidates.map((candidate) => [candidate.slug, candidate]));
  const selected: BlogPost[] = [];
  const add = (candidate: BlogPost | undefined) => {
    if (candidate && !selected.some((item) => item.slug === candidate.slug) && selected.length < limit) selected.push(candidate);
  };
  for (const slug of post.relatedPosts) add(bySlug.get(slug));
  for (const candidate of candidates.filter((item) => item.service === post.service)) add(candidate);
  for (const candidate of candidates.filter((item) => item.category === post.category)) add(candidate);
  return selected;
}

export function getRelatedPosts(post: BlogPost, limit = 3) {
  return selectRelatedPosts(post, getPublishedPosts(), limit);
}

export async function loadPostComponent(slug: string) {
  return (await import(`../../../content/blog/${slug}.mdx`)).default;
}
