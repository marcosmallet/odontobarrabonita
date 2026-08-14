import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle, blogPreviewBanner } from "@/components/blog/blog-article";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getPostBySlug, getAllPosts, loadPostComponent } from "@/lib/blog/posts";
import { getBlogPostMetadata } from "@/lib/blog/seo";
import { isPublishedPost } from "@/lib/blog/schema";

type BlogRouteProps = { params: Promise<{ slug: string }> };

function productionBuild() {
  return process.env.NODE_ENV === "production" || process.env.NEXT_PHASE === "phase-production-build";
}

function visibleInCurrentEnvironment(post: ReturnType<typeof getPostBySlug>) {
  return Boolean(post && (!productionBuild() || isPublishedPost(post)));
}

export function generateStaticParams() {
  const posts = getAllPosts()
    .filter((post) => !productionBuild() || isPublishedPost(post))
    .filter((post) => !post.isFixture || process.env.BLOG_INCLUDE_FIXTURES === "1")
    .map((post) => ({ slug: post.slug }));
  // Next 16 rejects an empty generateStaticParams() result for static
  // exports. The build cleanup script removes this sentinel from out/.
  return posts.length ? posts : [{ slug: "__empty" }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: BlogRouteProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "__empty") notFound();
  const post = getPostBySlug(slug);
  if (!post || !visibleInCurrentEnvironment(post)) return {};
  return getBlogPostMetadata(post);
}

export default async function BlogPostPage({ params }: BlogRouteProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !visibleInCurrentEnvironment(post)) notFound();
  const Post = await loadPostComponent(slug);
  return (
    <>
      <Header />
      <BlogArticle post={post}>{<Post />}</BlogArticle>
      {blogPreviewBanner(post)}
      <Footer />
    </>
  );
}
