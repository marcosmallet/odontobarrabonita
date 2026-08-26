import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import { parse } from "parse5";
import { getPublishedPosts } from "@/lib/blog/posts";
import { buildSitemap, normalizeSitemapUrl } from "@/lib/seo-pages";
import { SITE_URL } from "@/lib/site-data";

type HtmlAttribute = { name: string; value: string };
type HtmlNode = { nodeName?: string; tagName?: string; attrs?: HtmlAttribute[]; childNodes?: HtmlNode[] };
type SeoExportResult = { errors: string[] };

const outputDirectory = path.join(process.cwd(), "out");
const xmlParser = new XMLParser({ ignoreAttributes: false, trimValues: false });

function asArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function collectHtmlFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    return entry.isDirectory() ? collectHtmlFiles(absolutePath) : entry.name.endsWith(".html") ? [absolutePath] : [];
  });
}

function routeForHtmlFile(filePath: string, outputDir: string) {
  const relativePath = path.relative(outputDir, filePath).replaceAll(path.sep, "/");
  if (relativePath === "404.html") return undefined;
  if (relativePath === "index.html") return "/";
  if (!relativePath.endsWith("/index.html")) return undefined;
  const directory = relativePath.slice(0, -"/index.html".length);
  return directory ? `/${directory}/` : "/";
}

function visitHtml(node: HtmlNode, callback: (node: HtmlNode) => void) {
  callback(node);
  for (const child of node.childNodes ?? []) visitHtml(child, callback);
}

function htmlMetadata(html: string) {
  const metadata = { robots: [] as string[], canonicals: [] as string[] };
  const document = parse(html) as unknown as HtmlNode;
  visitHtml(document, (node) => {
    const tagName = (node.tagName ?? node.nodeName ?? "").toLowerCase();
    const attributes = new Map((node.attrs ?? []).map((attribute) => [attribute.name.toLowerCase(), attribute.value]));
    if (tagName === "meta") {
      const name = (attributes.get("name") ?? "").toLowerCase();
      if (name === "robots" || name === "googlebot") metadata.robots.push(attributes.get("content") ?? "");
    }
    if (tagName === "link" && (attributes.get("rel") ?? "").toLowerCase().split(/\s+/).includes("canonical")) {
      const href = attributes.get("href");
      if (href) metadata.canonicals.push(href);
    }
  });
  return metadata;
}

function isNoIndex(robots: readonly string[]) {
  return robots
    .flatMap((value) => value.toLowerCase().split(/[\s,]+/))
    .some((directive) => directive === "noindex" || directive === "none");
}

function errorFor(filePath: string, message: string) {
  return `${path.relative(process.cwd(), filePath)}: ${message}`;
}

function parseSitemap(xml: string, errors: string[]) {
  const validation = XMLValidator.validate(xml);
  if (validation !== true) {
    const detail = typeof validation === "object" && validation.err ? validation.err.msg : "XML inválido.";
    errors.push(`out/sitemap.xml: ${detail}`);
    return [];
  }

  let parsed: { urlset?: { url?: unknown } };
  try {
    parsed = xmlParser.parse(xml) as { urlset?: { url?: unknown } };
  } catch (error) {
    errors.push(`out/sitemap.xml: não foi possível interpretar o XML (${String(error)}).`);
    return [];
  }
  const nodes = asArray(parsed.urlset?.url as Record<string, unknown> | Record<string, unknown>[] | undefined);
  if (!parsed.urlset || !nodes.length && xml.includes("<url>")) {
    errors.push("out/sitemap.xml: raiz urlset ou URLs não encontrada.");
  }

  return nodes.flatMap((node) => {
    const loc = typeof node.loc === "string" ? node.loc : undefined;
    if (!loc) {
      errors.push("out/sitemap.xml: cada URL precisa de um loc textual.");
      return [];
    }
    let normalized: string;
    try {
      normalized = normalizeSitemapUrl(loc);
    } catch (error) {
      errors.push(`out/sitemap.xml (${loc}): ${error instanceof Error ? error.message : String(error)}`);
      return [];
    }
    const lastmodValue = typeof node.lastmod === "string" ? node.lastmod : undefined;
    if (lastmodValue !== undefined && Number.isNaN(Date.parse(lastmodValue))) {
      errors.push(`out/sitemap.xml (${loc}): lastmod inválido.`);
    }
    return [{ loc: normalized, lastmod: lastmodValue }];
  });
}

function validateRobotsFile(outDir: string, errors: string[]) {
  const robotsPath = path.join(outDir, "robots.txt");
  if (!fs.existsSync(robotsPath)) {
    errors.push("out/robots.txt: arquivo ausente.");
    return;
  }
  const robots = fs.readFileSync(robotsPath, "utf8");
  const sitemapLines = robots.split(/\r?\n/).filter((line) => /^\s*Sitemap:/i.test(line));
  if (sitemapLines.length !== 1 || sitemapLines[0].trim() !== `Sitemap: ${SITE_URL}/sitemap.xml`) {
    errors.push("out/robots.txt: Sitemap incorreto ou ausente.");
  }
}

function validateFeed(outDir: string, errors: string[]) {
  const feedPath = path.join(outDir, "blog", "feed.xml");
  if (!fs.existsSync(feedPath)) {
    errors.push("out/blog/feed.xml: arquivo ausente.");
    return;
  }
  const feed = fs.readFileSync(feedPath, "utf8");
  const validation = XMLValidator.validate(feed);
  if (validation !== true) {
    errors.push(`out/blog/feed.xml: XML inválido${typeof validation === "object" && validation.err ? ` (${validation.err.msg})` : ""}.`);
  }
  if (/<pubDate\b/i.test(feed)) errors.push("out/blog/feed.xml: não deve gerar pubDate automaticamente.");
  const feedUrls = new Set([...feed.matchAll(/<link>(https:\/\/[^<]+)<\/link>/gi)].map((match) => match[1]).filter((url) => url !== `${SITE_URL}/blog/`));
  const expectedUrls = new Set(getPublishedPosts().map((post) => `${SITE_URL}/blog/${post.slug}/`));
  for (const url of feedUrls) if (!expectedUrls.has(url)) errors.push(`out/blog/feed.xml (${url}): artigo inesperado.`);
  for (const url of expectedUrls) {
    if (!feedUrls.has(url) || !feed.includes(`<guid isPermaLink="true">${url}</guid>`)) errors.push(`out/blog/feed.xml (${url}): artigo ausente.`);
  }
}

export function validateSeoExport(outDir = outputDirectory): SeoExportResult {
  const errors: string[] = [];
  const sitemapPath = path.join(outDir, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    errors.push("out/sitemap.xml: arquivo ausente.");
    return { errors };
  }

  const actualEntries = parseSitemap(fs.readFileSync(sitemapPath, "utf8"), errors);
  const actualByUrl = new Map<string, (typeof actualEntries)[number]>();
  for (const entry of actualEntries) {
    if (actualByUrl.has(entry.loc)) errors.push(`out/sitemap.xml (${entry.loc}): URL duplicada.`);
    actualByUrl.set(entry.loc, entry);
  }

  let expectedEntries: ReturnType<typeof buildSitemap> = [];
  try {
    expectedEntries = buildSitemap();
  } catch (error) {
    errors.push(`src/lib/seo-pages.ts: ${error instanceof Error ? error.message : String(error)}`);
  }
  const expectedByUrl = new Map(expectedEntries.map((entry) => [normalizeSitemapUrl(entry.url), entry]));
  for (const [url, expected] of expectedByUrl) {
    const actual = actualByUrl.get(url);
    if (!actual) {
      errors.push(`out/sitemap.xml (${url}): URL esperada não foi gerada.`);
      continue;
    }
    const expectedTimestamp = expected.lastModified instanceof Date ? expected.lastModified.valueOf() : undefined;
    if (expectedTimestamp === undefined && actual.lastmod !== undefined) errors.push(`out/sitemap.xml (${url}): página estática não deve ter lastmod.`);
    if (expectedTimestamp !== undefined && actual.lastmod === undefined) errors.push(`out/sitemap.xml (${url}): artigo precisa de lastmod.`);
    if (expectedTimestamp !== undefined && actual.lastmod !== undefined && Date.parse(actual.lastmod) !== expectedTimestamp) {
      errors.push(`out/sitemap.xml (${url}): lastmod não corresponde à data editorial.`);
    }
  }
  for (const url of actualByUrl.keys()) {
    if (!expectedByUrl.has(url)) errors.push(`out/sitemap.xml (${url}): URL não pertence às fontes indexáveis.`);
  }

  const htmlIndexableUrls = new Set<string>();
  for (const filePath of collectHtmlFiles(outDir)) {
    const route = routeForHtmlFile(filePath, outDir);
    const html = fs.readFileSync(filePath, "utf8");
    const metadata = htmlMetadata(html);
    const noindex = isNoIndex(metadata.robots);
    if (!route) {
      if (!noindex && path.basename(filePath).toLowerCase() === "404.html") errors.push(errorFor(filePath, "página técnica precisa ser noindex."));
      continue;
    }
    let url: string;
    try {
      url = normalizeSitemapUrl(route);
    } catch (error) {
      errors.push(errorFor(filePath, error instanceof Error ? error.message : String(error)));
      continue;
    }
    if (route === "/avaliar/" && (!noindex || metadata.canonicals[0] !== `${SITE_URL}/avaliar`)) {
      errors.push(errorFor(filePath, "/avaliar/ deve manter noindex e canonical sem trailing slash."));
    }
    if (noindex) {
      if (actualByUrl.has(url)) errors.push(errorFor(filePath, "página noindex presente no sitemap."));
      continue;
    }
    htmlIndexableUrls.add(url);
    if (!actualByUrl.has(url)) errors.push(errorFor(filePath, "página indexável ausente do sitemap."));
    if (metadata.canonicals.length !== 1 || metadata.canonicals[0] !== url) errors.push(errorFor(filePath, `canonical único deve ser ${url}.`));
  }
  for (const url of actualByUrl.keys()) {
    if (!htmlIndexableUrls.has(url)) errors.push(`out (${url}): URL do sitemap não possui HTML indexável exportado.`);
  }

  validateRobotsFile(outDir, errors);
  validateFeed(outDir, errors);
  return { errors };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  const result = validateSeoExport();
  if (result.errors.length) {
    console.error(result.errors.map((error) => `- ${error}`).join("\n"));
    process.exitCode = 1;
  } else {
    console.log("SEO export validation passed.");
  }
}
