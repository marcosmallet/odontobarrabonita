import { getBlogAuthor } from "@/lib/blog/authors";
import type { BlogPost } from "@/lib/blog/schema";

export function BlogAuthor({ post }: { post: BlogPost }) {
  const author = getBlogAuthor(post.author);
  return <div className="flex flex-wrap items-center gap-4 text-sm text-graphite/70"><span>Por <strong className="text-petroleum">{author.name}</strong></span></div>;
}
