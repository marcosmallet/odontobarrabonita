import type { MetadataRoute } from "next";
import { blogPostUrl } from "@/lib/blog/seo";
import { getPublishedPosts } from "@/lib/blog/posts";
import type { BlogPost } from "@/lib/blog/schema";
import { SITE_URL, services, type Service } from "@/lib/site-data";

/** Pages that are indexable but are not service landings or blog posts. */
export const staticIndexablePages = [
  "/",
  "/dentista-no-recreio/",
  "/alinhadores-no-recreio/",
  "/politica-de-privacidade/",
  "/blog/",
] as const;

/** Pages that intentionally must never be advertised to search engines. */
export const nonIndexablePages = ["/avaliar/"] as const;

const siteOrigin = new URL(SITE_URL).origin;
const blockedPaths = new Set<string>(nonIndexablePages);

export function normalizeSitemapUrl(value: string) {
  if (!value || value.trim() !== value || value.includes("\\") || value.includes("?") || value.includes("#") || /%(?:2e|2f|23|3f)/i.test(value)) {
    throw new Error(`URL de sitemap inválida: ${value || "(vazia)"}.`);
  }
  if (/(^|\/)(?:\.{1,2})(?:\/|$)/.test(value)) {
    throw new Error(`Caminho de sitemap ambíguo: ${value}.`);
  }

  const isPath = value.startsWith("/") && !value.startsWith("//");
  const isAbsoluteUrl = /^https:\/\//i.test(value);
  if (!isPath && !isAbsoluteUrl) {
    throw new Error(`URL de sitemap deve ser um caminho interno ou HTTPS: ${value}.`);
  }

  const parsed = new URL(value, SITE_URL);
  if (parsed.origin !== siteOrigin || parsed.protocol !== "https:" || parsed.username || parsed.password || parsed.search || parsed.hash) {
    throw new Error(`URL de sitemap deve apontar apenas para ${SITE_URL}: ${value}.`);
  }
  if (parsed.pathname.includes("//") || /%2f/i.test(parsed.pathname)) {
    throw new Error(`Caminho de sitemap ambíguo: ${value}.`);
  }

  const pathname = parsed.pathname === "/" ? "/" : parsed.pathname.replace(/\/+$/, "") + "/";
  return `${siteOrigin}${pathname}`;
}

function addUniqueEntry(entries: MetadataRoute.Sitemap, seen: Set<string>, entry: MetadataRoute.Sitemap[number]) {
  const url = normalizeSitemapUrl(entry.url);
  const path = new URL(url).pathname;
  if (blockedPaths.has(path)) {
    throw new Error(`Página não indexável não pode entrar no sitemap: ${path}.`);
  }
  if (seen.has(url)) return;
  seen.add(url);
  entries.push({ ...entry, url });
}

export function getServiceSitemapUrls(serviceList: readonly Pick<Service, "detailsHref">[] = services) {
  return serviceList.flatMap((service) => {
    if (service.detailsHref === undefined) return [];
    if (!service.detailsHref) throw new Error("detailsHref de serviço não pode ser vazio.");
    return [normalizeSitemapUrl(service.detailsHref)];
  });
}

export type SitemapPost = Pick<BlogPost, "slug" | "publishedAt"> & Partial<Pick<BlogPost, "updatedAt">>;

export function buildSitemap(
  posts: readonly SitemapPost[] = getPublishedPosts(),
  serviceList: readonly Pick<Service, "detailsHref">[] = services,
  staticPages: readonly string[] = staticIndexablePages,
): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  for (const page of staticPages) addUniqueEntry(entries, seen, { url: page });
  for (const url of getServiceSitemapUrls(serviceList)) addUniqueEntry(entries, seen, { url });
  for (const post of posts) {
    const dateValue = post.updatedAt ?? post.publishedAt;
    const lastModified = new Date(dateValue);
    if (Number.isNaN(lastModified.valueOf())) {
      throw new Error(`Data inválida no sitemap do artigo ${post.slug}: ${dateValue}.`);
    }
    addUniqueEntry(entries, seen, { url: blogPostUrl(post.slug), lastModified });
  }

  return entries;
}
