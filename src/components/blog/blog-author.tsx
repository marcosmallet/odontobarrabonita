import Image from "next/image";
import { getBlogAuthor, getDentist } from "@/lib/blog/authors";
import type { BlogPost } from "@/lib/blog/schema";

export function BlogAuthor({ post }: { post: BlogPost }) {
  const author = getBlogAuthor(post.author);
  const reviewer = post.review.status === "approved" ? getDentist(post.review.reviewer) : undefined;
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-graphite/70">
      <span>Por <strong className="text-petroleum">{author.name}</strong></span>
      {reviewer ? (
        <span className="flex items-center gap-2 border-l border-line pl-4">
          <span className="relative size-9 overflow-hidden rounded-full bg-mist">
            <Image src={reviewer.photoPath} alt={`Retrato profissional de ${reviewer.name}`} fill sizes="36px" className="object-cover" />
          </span>
          <span>Revisado por <strong className="text-petroleum">{reviewer.name}</strong> · {reviewer.cro}{post.review.reviewedAt ? ` · ${new Date(`${post.review.reviewedAt}T12:00:00`).toLocaleDateString("pt-BR")}` : ""}</span>
        </span>
      ) : null}
    </div>
  );
}
