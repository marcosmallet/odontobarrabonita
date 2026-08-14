import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import sharp from "sharp";
import { getAllPosts } from "@/lib/blog/posts";
import { dentalServices } from "@/lib/blog/services";
import { isPublishedPost, validatePublicationState, type BlogPost } from "@/lib/blog/schema";

export type BlogValidationResult = { errors: string[]; warnings: string[] };

const publicStaticPaths = new Set([
  "/",
  "/blog/",
  "/politica-de-privacidade/",
  ...Object.values(dentalServices).map((service) => service.landingPage),
]);

function errorFor(post: BlogPost, message: string) {
  return `${path.relative(process.cwd(), post.sourcePath)}: ${message}`;
}

function isRealDate(value: string | null) {
  if (!value) return true;
  const parsed = new Date(value);
  return !Number.isNaN(parsed.valueOf());
}

function internalLinks(content: string) {
  const links = new Set<string>();
  for (const match of content.matchAll(/\]\((\/[a-z0-9][^\s)#?]*)/gi)) links.add(match[1]);
  for (const match of content.matchAll(/href=["'](\/[a-z0-9][^"'#?]*)/gi)) links.add(match[1]);
  return [...links].map((link) => link.endsWith("/") ? link : `${link}/`);
}

function similar(a: string, b: string) {
  const tokenize = (value: string) => new Set(value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split(/[^a-z0-9]+/).filter((token) => token.length > 2));
  const left = tokenize(a);
  const right = tokenize(b);
  const intersection = [...left].filter((token) => right.has(token)).length;
  return intersection >= 2 && intersection / Math.max(left.size, right.size, 1) >= 0.75;
}

export function validateMdxSyntax(content: string) {
  const errors: string[] = [];
  if (/^\s*#\s+/m.test(content)) errors.push("MDX não pode conter H1; o template gera o único H1.");
  if (/^\s*(?:import|export)\b/m.test(content)) errors.push("imports/exports não são permitidos no conteúdo do blog.");
  if (/<\/?[A-Za-z][^>]*>/m.test(content)) errors.push("HTML/JSX não é permitido no conteúdo do blog.");
  if (/(^|\s)\{[^}\n]+\}/m.test(content)) errors.push("expressões JavaScript não são permitidas no conteúdo do blog.");
  return errors;
}

async function validateImage(post: BlogPost, result: BlogValidationResult) {
  const imagePath = path.join(process.cwd(), "public", post.featuredImage.replace(/^\//, ""));
  if (!fs.existsSync(imagePath)) {
    result.errors.push(errorFor(post, `imagem ausente: ${post.featuredImage}`));
    return;
  }
  const stat = fs.statSync(imagePath);
  if (stat.size > 500 * 1024) result.errors.push(errorFor(post, "imagem excede 500 KB."));
  try {
    const metadata = await sharp(imagePath).metadata();
    if (!metadata.width || !metadata.height) result.errors.push(errorFor(post, "não foi possível ler as dimensões da imagem."));
    if ((metadata.width ?? 0) > 2000 || (metadata.height ?? 0) > 2000) result.errors.push(errorFor(post, "imagem excede 2000 px."));
    if (String(metadata.format) !== "webp" && String(metadata.format) !== "avif") result.errors.push(errorFor(post, "imagem deve ser WebP ou AVIF."));
  } catch (error) {
    result.errors.push(errorFor(post, `imagem inválida: ${error instanceof Error ? error.message : String(error)}`));
  }
}

export async function validateBlog(): Promise<BlogValidationResult> {
  const result: BlogValidationResult = { errors: [], warnings: [] };
  let posts: BlogPost[];
  try {
    posts = getAllPosts();
  } catch (error) {
    result.errors.push(error instanceof Error ? error.message : String(error));
    return result;
  }

  const slugs = new Map<string, BlogPost>();
  const queries = new Map<string, BlogPost>();
  for (const post of posts) {
    result.errors.push(...validatePublicationState(post).map((message) => errorFor(post, message)));
    const service = dentalServices[post.service];
    if (service.category !== post.category) result.errors.push(errorFor(post, `categoria ${post.category} não corresponde ao serviço ${post.service}.`));
    if (!isRealDate(post.publishedAt) || !isRealDate(post.updatedAt) || !isRealDate(post.review.reviewedAt)) result.errors.push(errorFor(post, "data de frontmatter inválida."));
    if (slugs.has(post.slug)) result.errors.push(errorFor(post, `slug duplicado com ${slugs.get(post.slug)!.sourcePath}.`));
    slugs.set(post.slug, post);
    const queryKey = post.primaryQuery.trim().toLocaleLowerCase("pt-BR");
    if (queries.has(queryKey)) {
      const previous = queries.get(queryKey)!;
      const message = isPublishedPost(post) && isPublishedPost(previous) ? "primaryQuery duplicada entre artigos publicados." : "primaryQuery duplicada; revisar possível canibalização.";
      result.errors.push(errorFor(post, `${message} Também aparece em ${previous.sourcePath}.`));
    }
    queries.set(queryKey, post);
    for (const other of posts) {
      if (other.slug !== post.slug && (similar(post.title, other.title) || similar(post.slug, other.slug))) result.warnings.push(errorFor(post, `título/slug semelhante a ${other.slug}; avaliar canibalização.`));
    }
    const related = new Set<string>();
    for (const slug of post.relatedPosts) {
      if (slug === post.slug) result.errors.push(errorFor(post, "relatedPosts não pode incluir o próprio artigo."));
      if (related.has(slug)) result.errors.push(errorFor(post, `relatedPosts duplicado: ${slug}.`));
      related.add(slug);
      const relatedPost = posts.find((candidate) => candidate.slug === slug);
      if (!relatedPost) result.errors.push(errorFor(post, `related post inexistente: ${slug}.`));
      if (isPublishedPost(post) && relatedPost && !isPublishedPost(relatedPost)) result.errors.push(errorFor(post, `artigo publicado não pode relacionar draft/review: ${slug}.`));
    }
    for (const link of internalLinks(post.content)) {
      if (link.startsWith("/blog/")) {
        const target = link.replace(/^\/blog\//, "").replace(/\/$/, "");
        const targetPost = posts.find((candidate) => candidate.slug === target);
        if (!targetPost) result.errors.push(errorFor(post, `link de blog inexistente: ${link}.`));
        if (isPublishedPost(post) && targetPost && !isPublishedPost(targetPost)) result.errors.push(errorFor(post, `link público aponta para draft/review: ${link}.`));
      } else if (!publicStaticPaths.has(link)) {
        result.warnings.push(errorFor(post, `link interno não catalogado: ${link}.`));
      }
    }
    const raw = fs.readFileSync(post.sourcePath, "utf8");
    const parsed = matter(raw);
    result.errors.push(...validateMdxSyntax(parsed.content).map((message) => errorFor(post, message)));
    await validateImage(post, result);
  }
  return result;
}
