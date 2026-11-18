// News posts live in src/content/data/posts.json. Newest first.
import data from "./data/posts.json";

export type PostBlock = { type: "p" | "h2"; text: string } | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: PostBlock[];
  cta?: { label: string; href: string };
};

export const posts: Post[] = (data as unknown as Post[]).slice().sort((a, b) => b.date.localeCompare(a.date));

export function postBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
