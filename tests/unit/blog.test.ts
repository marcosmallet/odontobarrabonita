import assert from "node:assert/strict";
import test from "node:test";
import { blogFrontmatterSchema, isPublishedPost, validatePublicationState, type BlogPost } from "../../src/lib/blog/schema";
import { selectRelatedPosts } from "../../src/lib/blog/posts";
import { getBlogPostJsonLd, getBlogPostMetadata } from "../../src/lib/blog/seo";
import { validateMdxSyntax } from "../../scripts/validate-blog";
import sitemap from "../../src/app/sitemap";
import { GET as getFeed } from "../../src/app/blog/feed.xml/route";

function post(overrides: Partial<BlogPost> = {}): BlogPost {
  return {
    title: "Tratamento de canal dói?",
    slug: "tratamento-de-canal-doi",
    description: "Entenda como funciona a avaliação.",
    status: "published",
    publishedAt: "2026-08-01",
    updatedAt: null,
    category: "endodontia",
    service: "canal",
    searchIntent: "informational",
    primaryQuery: "tratamento de canal dói",
    secondaryQueries: [],
    author: "clinic",
    review: { status: "approved", reviewer: "francisco", reviewedAt: "2026-08-02" },
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

test("aceita frontmatter válido e rejeita categoria inexistente", () => {
  assert.equal(blogFrontmatterSchema.safeParse(post()).success, true);
  assert.equal(blogFrontmatterSchema.safeParse({ ...post(), category: "categoria-inventada" }).success, false);
  assert.equal(blogFrontmatterSchema.safeParse({ ...post(), service: "servico-inventado" }).success, false);
  assert.equal(blogFrontmatterSchema.safeParse({ ...post(), publishedAt: new Date("2026-08-01T00:00:00Z") }).success, true);
});

test("publicação não exige aprovação, mas exige publishedAt", () => {
  const published = post({ status: "published", review: { status: "pending", reviewer: "francisco", reviewedAt: null } });
  assert.deepEqual(validatePublicationState(published), []);
  assert.equal(isPublishedPost(published), true);
  const incomplete = post({ status: "published", review: { status: "pending", reviewer: "francisco", reviewedAt: null }, publishedAt: null, featuredImage: "/images/blog/tratamento-de-canal-doi.webp" });
  assert.deepEqual(validatePublicationState(incomplete), ["status published exige publishedAt."]);
  assert.equal(isPublishedPost(incomplete), false);
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
  assert.equal(getBlogPostMetadata(current).alternates?.canonical, "https://odontobarrabonita.com.br/blog/tratamento-de-canal-doi/");
  const jsonLd = getBlogPostJsonLd(current);
  assert.equal(jsonLd["@graph"][0]["@type"], "BlogPosting");
  assert.equal(jsonLd["@graph"][0].datePublished, "2026-08-01");
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
});
