import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/blog-card";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getPublishedPosts } from "@/lib/blog/posts";
import { SITE_URL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Conteúdos sobre saúde bucal | Clínica Barra Bonita",
  description: "Conteúdos educativos sobre saúde bucal e tratamentos da Clínica Odontológica Barra Bonita.",
  alternates: { canonical: `${SITE_URL}/blog/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog/`,
    title: "Conteúdos sobre saúde bucal | Clínica Barra Bonita",
    description: "Conteúdos educativos sobre saúde bucal e tratamentos da Clínica Odontológica Barra Bonita.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Clínica Odontológica Barra Bonita" }],
  },
};

export default function BlogIndexPage() {
  const posts = getPublishedPosts();
  return (
    <>
      <Header />
      <main>
        <section className="bg-hero pb-20 pt-36 sm:pb-24 sm:pt-44">
          <div className="site-container">
            <p className="eyebrow">Blog da Clínica Barra Bonita</p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight text-petroleum sm:text-5xl lg:text-6xl">Conteúdos sobre saúde bucal</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite/75">A Clínica Odontológica Barra Bonita publica conteúdos educativos relacionados à saúde bucal e aos tratamentos realizados por seus profissionais.</p>
          </div>
        </section>
        <section className="section-space bg-white" aria-labelledby="blog-list-title">
          <div className="site-container">
            <h2 id="blog-list-title" className="sr-only">Artigos publicados</h2>
            {posts.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((post) => <BlogCard key={post.slug} post={post} />)}</div> : <div className="rounded-[2rem] border border-line bg-mist/55 p-8 text-center"><p className="font-display text-2xl font-semibold text-petroleum">Novos conteúdos em breve</p><p className="mx-auto mt-3 max-w-xl leading-7 text-graphite/75">Estamos preparando materiais educativos para ajudar você a encontrar informações claras sobre saúde bucal e avaliação odontológica.</p></div>}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
