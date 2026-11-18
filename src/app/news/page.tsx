import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "News",
  description: "Updates from The Braid Inc in Fort Myers: The House Fund, our programs and how to help.",
};

export default function NewsPage() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <div className="page-hero">
        <span className="eyebrow">News</span>
        <h1>Updates from The Braid.</h1>
        <p className="lead">Where things stand, what&apos;s next, and how you can help.</p>
      </div>
      <div className="grid-auto" style={{ marginTop: 24 }}>
        {posts.map((p) => (
          <Link key={p.slug} href={`/news/${p.slug}`} className="card stack" style={{ gap: 10, textDecoration: "none", color: "var(--ink)" }}>
            <span className="muted" style={{ fontSize: 14 }}>
              {formatDate(p.date)}
            </span>
            <strong style={{ fontFamily: "var(--font-display)", fontSize: 26, lineHeight: 1.2 }}>{p.title}</strong>
            <span className="muted" style={{ lineHeight: 1.6 }}>
              {p.summary}
            </span>
            <span style={{ fontWeight: 600, color: "var(--olive)", marginTop: "auto" }}>Read more →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
