import Image from "next/image";
import Link from "next/link";
import { blogCategories } from "@/lib/blog/categories";
import type { BlogPost } from "@/lib/blog/schema";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-[0_16px_45px_rgba(15,83,78,0.06)]">
      <Link href={`/blog/${post.slug}/`} prefetch={false} className="group block focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-turquoise">
        <div className="relative aspect-[16/9] overflow-hidden bg-mist">
          <Image src={post.featuredImage} alt={post.featuredImageAlt} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-6 sm:p-7">
          <p className="eyebrow">{blogCategories[post.category].label}</p>
          <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-petroleum">{post.title}</h2>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-graphite/75">{post.description}</p>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-graphite/60">
            <time dateTime={post.publishedAt ?? undefined}>{post.publishedAt ? new Date(`${post.publishedAt}T12:00:00`).toLocaleDateString("pt-BR") : "Prévia"}</time>
            <span>{post.readingTimeMinutes} min de leitura</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
