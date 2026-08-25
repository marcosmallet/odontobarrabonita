import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/blog-article";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getPostBySlug, getAllPosts, loadPostComponent } from "@/lib/blog/posts";
import { getBlogPostMetadata } from "@/lib/blog/seo";

type BlogRouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const posts = getAllPosts()
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
  if (!post) return {};
  return getBlogPostMetadata(post);
}

export default async function BlogPostPage({ params }: BlogRouteProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const Post = await loadPostComponent(slug);
  return (
    <>
      <Header />
      <BlogArticle post={post}>{<Post />}</BlogArticle>
      <Footer />
    </>
  );
}
