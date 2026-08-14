import Link from "next/link";
import { getDentalService, type DentalServiceId } from "@/lib/blog/services";
import { getPostsByService } from "@/lib/blog/posts";

export function BlogRelatedService({ service }: { service: DentalServiceId }) {
  const posts = getPostsByService(service).slice(0, 3);
  if (!posts.length) return null;
  const config = getDentalService(service)!;
  return (
    <section className="border-y border-line bg-mist/55 py-10" aria-labelledby={`${service}-blog-title`}>
      <div className="site-container">
        <p className="eyebrow">Conteúdos relacionados</p>
        <h2 id={`${service}-blog-title`} className="mt-3 font-display text-2xl font-semibold text-petroleum">Leia mais sobre {config.label.toLowerCase()}</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-3">
          {posts.map((post) => <li key={post.slug}><Link href={`/blog/${post.slug}/`} prefetch={false} className="block rounded-2xl border border-line bg-white p-5 text-sm font-semibold leading-6 text-petroleum hover:border-turquoise focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-turquoise">{post.title}</Link></li>)}
        </ul>
      </div>
    </section>
  );
}
