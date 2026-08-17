import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, blogPosts } from "../data";
import { WhatIsMissingContent } from "../what-is-missing-in-my-area/content";
import { BlogPostPage } from "./BlogPostPage";

const contentMap: Record<string, React.ComponentType> = {
  "what-is-missing-in-my-area": WhatIsMissingContent,
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Metadata {
  // We need to use sync access for metadata in static export
  // The slug is available from the static params
  return {
    title: "Blog | Sohel Ansari",
    description: "Blog posts and product ideas by Sohel Ansari",
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const ContentComponent = contentMap[slug];

  if (!ContentComponent) {
    notFound();
  }

  return <BlogPostPage post={post} ContentComponent={ContentComponent} />;
}
