import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { buildSitemap, normalizeSitemapUrl } from "../../src/lib/seo-pages";
import { validateSeoExport } from "../../scripts/validate-seo";
import { SITE_URL } from "../../src/lib/site-data";

function createSyntheticExport() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "odontobarrabonita-seo-"));
  const entries = buildSitemap();
  const urls = entries.map((entry) => `<url><loc>${entry.url}</loc>${entry.lastModified ? `<lastmod>${new Date(entry.lastModified).toISOString()}</lastmod>` : ""}</url>`).join("");
  fs.writeFileSync(path.join(directory, "sitemap.xml"), `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  for (const entry of entries) {
    const pathname = new URL(entry.url).pathname;
    const htmlDirectory = path.join(directory, pathname.slice(1));
    fs.mkdirSync(htmlDirectory, { recursive: true });
    fs.writeFileSync(path.join(htmlDirectory, "index.html"), `<!doctype html><html><head><link rel="canonical" href="${entry.url}"></head><body></body></html>`);
  }
  const reviewDirectory = path.join(directory, "avaliar");
  fs.mkdirSync(reviewDirectory, { recursive: true });
  fs.writeFileSync(path.join(reviewDirectory, "index.html"), `<!doctype html><html><head><meta name="robots" content="noindex, follow"><link rel="canonical" href="${SITE_URL}/avaliar"></head></html>`);
  fs.writeFileSync(path.join(directory, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  const feedItems = entries.filter((entry) => entry.url.includes("/blog/") && entry.url !== `${SITE_URL}/blog/`).map((entry) => `<item><link>${entry.url}</link><guid isPermaLink="true">${entry.url}</guid></item>`).join("");
  fs.mkdirSync(path.join(directory, "blog"), { recursive: true });
  fs.writeFileSync(path.join(directory, "blog", "feed.xml"), `<rss><channel>${feedItems}</channel></rss>`);
  return { directory, entries };
}

test("normaliza URLs internas e rejeita destinos fora do site", () => {
  assert.equal(normalizeSitemapUrl("/blog"), `${SITE_URL}/blog/`);
  assert.equal(normalizeSitemapUrl(`${SITE_URL}/blog/`), `${SITE_URL}/blog/`);
  for (const value of ["", "/blog?x=1", "/blog/#faq", "/blog/../", "/blog/%2Fextra/", "https://example.com/blog/", "http://odontobarrabonita.com.br/blog/", "//example.com/blog/"]) {
    assert.throws(() => normalizeSitemapUrl(value));
  }
});

test("deriva serviços, deduplica URLs e bloqueia páginas não indexáveis", () => {
  const entries = buildSitemap([], [{ detailsHref: "/servico/" }, { detailsHref: "/servico/" }], ["/"]);
  assert.deepEqual(entries.map((entry) => entry.url), [`${SITE_URL}/`, `${SITE_URL}/servico/`]);
  assert.throws(() => buildSitemap([], [{ detailsHref: "" }], []));
  assert.throws(() => buildSitemap([], [{ detailsHref: "/avaliar/" }], []));
});

test("valida um export sintético completo", () => {
  const fixture = createSyntheticExport();
  try {
    assert.deepEqual(validateSeoExport(fixture.directory).errors, []);
  } finally {
    fs.rmSync(fixture.directory, { recursive: true, force: true });
  }
});

test("detecta XML inválido, URL duplicada, página ausente e noindex no sitemap", () => {
  const fixture = createSyntheticExport();
  try {
    const sitemapPath = path.join(fixture.directory, "sitemap.xml");
    const original = fs.readFileSync(sitemapPath, "utf8");
    fs.writeFileSync(sitemapPath, "<urlset><url><loc>");
    assert.equal(validateSeoExport(fixture.directory).errors.some((error) => error.includes("out/sitemap.xml:")), true);
    fs.writeFileSync(sitemapPath, original.replace("</urlset>", `${original.match(/<url>[\s\S]*?<\/url>/)?.[0] ?? ""}</urlset>`));
    assert.equal(validateSeoExport(fixture.directory).errors.some((error) => error.includes("URL duplicada")), true);

    fs.writeFileSync(sitemapPath, original);
    const firstEntry = fixture.entries[0];
    const firstPath = path.join(fixture.directory, new URL(firstEntry.url).pathname.slice(1), "index.html");
    fs.rmSync(firstPath);
    assert.equal(validateSeoExport(fixture.directory).errors.some((error) => error.includes("HTML indexável exportado")), true);

    const reviewPath = path.join(fixture.directory, "avaliar", "index.html");
    fs.writeFileSync(reviewPath, `<!doctype html><html><head><meta name="robots" content="noindex"><link rel="canonical" href="${SITE_URL}/avaliar"></head></html>`);
    fs.writeFileSync(sitemapPath, `${original.replace("</urlset>", `<url><loc>${SITE_URL}/avaliar/</loc></url></urlset>`)}`);
    assert.equal(validateSeoExport(fixture.directory).errors.some((error) => error.includes("página noindex presente")), true);
  } finally {
    fs.rmSync(fixture.directory, { recursive: true, force: true });
  }
});
