import Link from "next/link";
import type { BlogPost } from "@/lib/blog/schema";

export function BlogRelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;
  return (
    <section className="mt-16 border-t border-line pt-12" aria-labelledby="related-posts-title">
      <p className="eyebrow">Continue lendo</p>
      <h2 id="related-posts-title" className="mt-3 font-display text-3xl font-semibold text-petroleum">Conteúdos relacionados</h2>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}/`} prefetch={false} className="rounded-2xl border border-line bg-white p-5 text-sm font-semibold leading-6 text-petroleum transition-colors hover:border-turquoise hover:bg-mist focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-turquoise">{post.title}</Link>
        ))}
      </div>
    </section>
  );
}
