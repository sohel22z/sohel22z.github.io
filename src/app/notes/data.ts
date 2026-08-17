export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readingTime: string;
  description: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-missing-in-my-area",
    title: "What Is Missing in My Area?",
    subtitle: "A Local Opportunity Discovery Platform for Business Owners and Explorers",
    category: "Product Idea",
    date: "August 2026",
    readingTime: "12 min read",
    description:
      "A platform that helps people understand their local area by identifying gaps, trends, competition, and opportunities — for both business owners and explorers.",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
