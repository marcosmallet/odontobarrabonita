import type { Metadata } from "next";
import { blogCategories } from "./categories";
import { getBlogAuthor, getDentist } from "./authors";
import { getDentalService } from "./services";
import { isPublishedPost, type BlogPost } from "./schema";
import { clinic, SITE_URL } from "@/lib/site-data";

export function blogPostUrl(slug: string) {
  return `${SITE_URL}/blog/${slug}/`;
}

export function getBlogPostMetadata(post: BlogPost): Metadata {
  const url = blogPostUrl(post.slug);
  const publicPost = isPublishedPost(post);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    robots: publicPost ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      url,
      siteName: clinic.name,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? post.publishedAt ?? undefined,
      authors: [getBlogAuthor(post.author).name],
      images: [{ url: post.featuredImage, alt: post.featuredImageAlt }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [post.featuredImage] },
  };
}

export function getBlogPostJsonLd(post: BlogPost) {
  const url = blogPostUrl(post.slug);
  const service = getDentalService(post.service)!;
  const author = getBlogAuthor(post.author);
  const reviewer = getDentist(post.review.reviewer);
  const category = blogCategories[post.category];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        image: `${SITE_URL}${post.featuredImage}`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        inLanguage: "pt-BR",
        articleSection: category.label,
        keywords: [post.primaryQuery, ...post.secondaryQueries],
        author: author.type === "Person" ? { "@type": "Person", name: author.name } : { "@type": "Organization", name: author.name, url: author.url },
        publisher: { "@type": "Organization", name: clinic.name, url: `${SITE_URL}/`, logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` } },
        contributor: post.review.status === "approved" && reviewer ? { "@type": "Person", name: reviewer.name, identifier: reviewer.cro } : undefined,
        about: { "@type": "Service", name: service.label, url: `${SITE_URL}${service.landingPage}` },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog/` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}
