import type { BlogPost } from "@/lib/blog/schema";

export function BlogFAQ({ post }: { post: BlogPost }) {
  if (!post.faq.length) return null;
  return (
    <section className="blog-faq" aria-labelledby="blog-faq-title">
      <h2 id="blog-faq-title">Perguntas frequentes</h2>
      <div className="grid gap-3">
        {post.faq.map((item) => (
          <details key={item.question} className="rounded-2xl border border-line bg-white px-5 py-4">
            <summary className="cursor-pointer font-semibold text-petroleum">{item.question}</summary>
            <p className="mt-3 leading-7 text-graphite/75">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
