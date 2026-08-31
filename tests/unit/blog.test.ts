import assert from "node:assert/strict";
import test from "node:test";
import { blogFrontmatterSchema, type BlogPost } from "../../src/lib/blog/schema";
import { comparePublishedPosts, getPublishedPosts, selectRelatedPosts } from "../../src/lib/blog/posts";
import { getBlogPostJsonLd, getBlogPostMetadata } from "../../src/lib/blog/seo";
import { validateMdxSyntax } from "../../scripts/validate-blog";
import sitemap from "../../src/app/sitemap";
import { GET as getFeed } from "../../src/app/blog/feed.xml/route";
import { buildSitemap } from "../../src/lib/seo-pages";
import { services } from "../../src/lib/site-data";

function post(overrides: Partial<BlogPost> = {}): BlogPost {
  return {
    title: "Tratamento de canal dói?",
    slug: "tratamento-de-canal-doi",
    description: "Entenda como funciona a avaliação.",
    publishedAt: "2026-08-01T00:00:00.000Z",
    category: "endodontia",
    service: "canal",
    searchIntent: "informational",
    primaryQuery: "tratamento de canal dói",
    secondaryQueries: [],
    author: "clinic",
    featuredImage: "/images/blog/tratamento-de-canal-doi.webp",
    featuredImageAlt: "Dentista conversando com paciente",
    relatedPosts: [],
    faq: [],
    references: [],
    content: "## Resposta\n\nConteúdo.",
    sourcePath: "content/blog/tratamento-de-canal-doi.mdx",
    isFixture: false,
    readingTimeMinutes: 1,
    ...overrides,
  };
}

function frontmatter(value: BlogPost) {
  const result: Record<string, unknown> = { ...value };
  delete result.content;
  delete result.sourcePath;
  delete result.isFixture;
  delete result.readingTimeMinutes;
  return result;
}

test("aceita frontmatter válido e rejeita categoria inexistente", () => {
  assert.equal(blogFrontmatterSchema.safeParse(frontmatter(post())).success, true);
  assert.equal(blogFrontmatterSchema.safeParse({ ...frontmatter(post()), category: "categoria-inventada" }).success, false);
  assert.equal(blogFrontmatterSchema.safeParse({ ...frontmatter(post()), service: "servico-inventado" }).success, false);
  assert.equal(blogFrontmatterSchema.safeParse({ ...frontmatter(post()), author: "francisco" }).success, false);
  assert.equal(blogFrontmatterSchema.safeParse({ ...frontmatter(post()), publishedAt: new Date("2026-08-01T00:00:00Z") }).success, true);
  assert.equal(blogFrontmatterSchema.safeParse({ ...frontmatter(post()), publishedAt: "2026-08-14T15:17:04-03:00" }).success, true);
  assert.equal(blogFrontmatterSchema.safeParse({ ...frontmatter(post()), publishedAt: "2026-08-14" }).success, false);
  assert.equal(blogFrontmatterSchema.safeParse({ ...frontmatter(post()), status: "published" }).success, false);
  assert.equal(blogFrontmatterSchema.safeParse({ ...frontmatter(post()), updatedAt: null }).success, false);
  assert.equal(blogFrontmatterSchema.safeParse({ ...frontmatter(post()), updatedAt: "2026-08-02" }).success, true);
  assert.equal(blogFrontmatterSchema.safeParse({ ...frontmatter(post()), updatedAt: "2026-07-31" }).success, false);
  assert.equal(blogFrontmatterSchema.safeParse({ ...frontmatter(post()), updatedAt: "2026-02-30" }).success, false);
  assert.equal(blogFrontmatterSchema.safeParse({ ...frontmatter(post()), review: { status: "approved" } }).success, false);
});

test("ordena artigos pelo horário publicado e usa o slug como desempate", () => {
  const newer = { publishedAt: "2026-08-14T15:17:04-03:00", slug: "mais-novo" } as const;
  const older = { publishedAt: "2026-08-14T12:19:31-03:00", slug: "mais-velho" } as const;
  assert.equal(comparePublishedPosts(newer, older) < 0, true);
  assert.equal(comparePublishedPosts({ publishedAt: "2026-08-14T00:00:00.000Z", slug: "a" }, { publishedAt: "2026-08-14T00:00:00.000Z", slug: "b" }) < 0, true);
});

test("todo artigo válido é público e publishedAt é obrigatório para publicação e ordenação", () => {
  const withoutPublishedAt = frontmatter(post());
  delete withoutPublishedAt.publishedAt;
  assert.equal(blogFrontmatterSchema.safeParse(withoutPublishedAt).success, false);
  const posts = getPublishedPosts();
  assert.equal(posts.length >= 4, true);
  assert.equal(posts.every((item) => item.author === "clinic"), true);
  assert.equal(posts.every((item) => !item.isFixture), true);
  assert.equal(posts.some((item) => item.slug === "tratamento-de-canal-doi"), true);
  assert.equal(posts.some((item) => item.slug === "protese-dentaria-tipos-e-indicacoes"), true);
});

test("relaciona explícitos, serviço e categoria sem repetir o próprio artigo", () => {
  const current = post({ relatedPosts: ["clareamento-dental"] });
  const explicit = post({ slug: "clareamento-dental", title: "Clareamento dental", service: "clareamento", category: "estetica", primaryQuery: "clareamento dental", featuredImage: "/images/blog/clareamento-dental.webp" });
  const sameService = post({ slug: "canal-depois", title: "Depois do canal", primaryQuery: "depois do canal", featuredImage: "/images/blog/canal-depois.webp" });
  const sameCategory = post({ slug: "dor-dente", title: "Dor de dente", primaryQuery: "dor de dente", featuredImage: "/images/blog/dor-dente.webp" });
  assert.deepEqual(selectRelatedPosts(current, [current, explicit, sameService, sameCategory]).map((item) => item.slug), ["clareamento-dental", "canal-depois", "dor-dente"]);
});

test("gera metadata e BlogPosting derivados do post", () => {
  const current = post();
  const metadata = getBlogPostMetadata(current);
  assert.equal(metadata.alternates?.canonical, "https://odontobarrabonita.com.br/blog/tratamento-de-canal-doi/");
  assert.equal("publishedTime" in (metadata.openGraph ?? {}), false);
  assert.equal("modifiedTime" in (metadata.openGraph ?? {}), false);
  const jsonLd = getBlogPostJsonLd(current);
  assert.equal(jsonLd["@graph"][0]["@type"], "BlogPosting");
  assert.equal((jsonLd["@graph"][0] as Record<string, unknown>).datePublished, undefined);
});

test("rejeita MDX inseguro e H1 no corpo", () => {
  const errors = validateMdxSyntax("# H1\n\nimport X from 'x'\n\n<div>HTML</div>\n\n{Date.now()}");
  assert.equal(errors.length, 4);
});

test("sitemap e RSS incluem o índice e artigos publicados", async () => {
  const entries = sitemap();
  assert.equal(entries.some((entry) => entry.url === "https://odontobarrabonita.com.br/blog/"), true);
  assert.equal(entries.some((entry) => entry.url?.includes("/blog/tratamento-de-canal-doi/")), true);
  const feed = await getFeed();
  assert.equal(feed.headers.get("content-type"), "application/rss+xml; charset=utf-8");
  const feedText = await feed.text();
  assert.match(feedText, /<channel>/);
  assert.match(feedText, /tratamento-de-canal-doi/);
  assert.doesNotMatch(feedText, /<pubDate>/);
  const articleEntry = entries.find((entry) => entry.url?.includes("/blog/tratamento-de-canal-doi/"));
  assert.equal(articleEntry?.lastModified instanceof Date, true);
  assert.equal(entries.every((entry) => !("priority" in entry) && !("changeFrequency" in entry)), true);
  assert.equal(new Set(entries.map((entry) => entry.url)).size, entries.length);
  for (const service of services) {
    if (service.detailsHref) {
      assert.equal(entries.filter((entry) => entry.url?.endsWith(service.detailsHref!)).length, 1);
    }
  }
  assert.equal(entries.some((entry) => entry.url?.endsWith("/avaliar/")), false);
});

test("sitemap usa updatedAt quando disponível e publishedAt como fallback", () => {
  const withUpdate = buildSitemap([
    post({ publishedAt: "2026-08-01T00:00:00.000Z", updatedAt: "2026-08-05", slug: "artigo-atualizado" }),
  ], [], []);
  const withoutUpdate = buildSitemap([
    post({ publishedAt: "2026-08-01T00:00:00.000Z", slug: "artigo-sem-atualizacao" }),
  ], [], []);
  assert.equal(new Date(withUpdate[0].lastModified as string | Date).toISOString(), "2026-08-05T00:00:00.000Z");
  assert.equal(new Date(withoutUpdate[0].lastModified as string | Date).toISOString(), "2026-08-01T00:00:00.000Z");
});
