import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BlogAuthor } from "./blog-author";
import { BlogCTA } from "./blog-cta";
import { BlogFAQ } from "./blog-faq";
import { BlogRelatedPosts } from "./blog-related-posts";
import { getBlogPostJsonLd, blogPostUrl } from "@/lib/blog/seo";
import { blogCategories } from "@/lib/blog/categories";
import { getDentalService } from "@/lib/blog/services";
import { getRelatedPosts } from "@/lib/blog/posts";
import type { BlogPost } from "@/lib/blog/schema";
import { SITE_URL } from "@/lib/site-data";

export function BlogArticle({ post, children }: { post: BlogPost; children: ReactNode }) {
  const service = getDentalService(post.service)!;
  const jsonLd = getBlogPostJsonLd(post);
  return (
    <>
      <main>
        <div className="site-container pb-20 pt-32 sm:pt-36">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-graphite/65">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" prefetch={false} className="underline decoration-turquoise/35 underline-offset-4 hover:text-petroleum">Início</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog/" prefetch={false} className="underline decoration-turquoise/35 underline-offset-4 hover:text-petroleum">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-petroleum">{post.title}</li>
            </ol>
          </nav>
          <article data-testid="blog-article" className="mx-auto max-w-4xl">
            <header>
              <p className="eyebrow">{blogCategories[post.category].label}</p>
              <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight text-petroleum sm:text-5xl lg:text-6xl">{post.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-graphite/75">{post.description}</p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-graphite/60"><time dateTime={post.publishedAt ?? undefined}>{post.publishedAt ? `Publicado em ${new Date(`${post.publishedAt}T12:00:00`).toLocaleDateString("pt-BR")}` : "Prévia local"}</time>{post.updatedAt ? <time dateTime={post.updatedAt}>Atualizado em {new Date(`${post.updatedAt}T12:00:00`).toLocaleDateString("pt-BR")}</time> : null}<span>{post.readingTimeMinutes} min de leitura</span></div>
              <div className="mt-6"><BlogAuthor post={post} /></div>
            </header>
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[2rem] bg-mist"><Image src={post.featuredImage} alt={post.featuredImageAlt} fill priority sizes="(max-width: 1024px) 100vw, 896px" className="object-cover" /></div>
            <div className="blog-prose mt-12">{children}</div>
            <p className="mt-10 rounded-2xl border border-turquoise/25 bg-mist p-5 text-sm leading-6 text-graphite/75">Este conteúdo tem caráter informativo e não substitui uma avaliação individual realizada por cirurgião-dentista.</p>
            <BlogFAQ post={post} />
            {post.references.length ? <section className="blog-references"><h2>Referências</h2><ul>{post.references.map((reference) => <li key={reference.url}><a href={reference.url} target="_blank" rel="noopener noreferrer">{reference.title} — {reference.publisher}</a></li>)}</ul></section> : null}
            <section className="blog-service-card" aria-labelledby="blog-service-title"><p className="eyebrow">Tratamento relacionado</p><h2 id="blog-service-title">{service.label}</h2><p>Saiba mais sobre a avaliação e o atendimento da Clínica Odontológica Barra Bonita.</p><Link href={service.landingPage} prefetch={false}>Conhecer {service.label.toLowerCase()}</Link></section>
            <BlogCTA post={post} />
            <BlogRelatedPosts posts={getRelatedPosts(post)} />
          </article>
        </div>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}

export function blogPreviewBanner(post: BlogPost) {
  return post.status === "published" && post.review.status === "approved" ? null : (
    <p className="fixed inset-x-0 bottom-0 z-50 bg-petroleum px-4 py-3 text-center text-sm font-semibold text-white">Prévia local — este artigo não está publicado.</p>
  );
}

export const blogCanonical = (slug: string) => `${SITE_URL}${blogPostUrl(slug).replace(SITE_URL, "")}`;
