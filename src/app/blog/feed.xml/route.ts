import { getPublishedPosts } from "@/lib/blog/posts";
import { blogPostUrl } from "@/lib/blog/seo";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", "\"": "&quot;" }[character] ?? character));
}

export function GET() {
  const posts = getPublishedPosts();
  const items = posts.map((post) => `<item><title>${escapeXml(post.title)}</title><description>${escapeXml(post.description)}</description><link>${blogPostUrl(post.slug)}</link><guid isPermaLink="true">${blogPostUrl(post.slug)}</guid><pubDate>${new Date(post.publishedAt!).toUTCString()}</pubDate></item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Clínica Odontológica Barra Bonita — Blog</title><link>https://odontobarrabonita.com.br/blog/</link><description>Conteúdos sobre saúde bucal da Clínica Odontológica Barra Bonita.</description><language>pt-BR</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
