import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, postBySlug, posts } from "@/content/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  return (
    <article className="wrap" style={{ paddingBottom: 96 }}>
      <div className="page-hero" style={{ maxWidth: 760 }}>
        <Link href="/news" style={{ fontWeight: 600 }}>
          ← News
        </Link>
        <h1>{post.title}</h1>
        <span className="muted">{formatDate(post.date)}</span>
      </div>
      <div className="prose" style={{ marginTop: 16 }}>
        {post.body.map((b, i) =>
          b.type === "ul" ? (
            <ul key={i}>
              {b.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          ) : b.type === "h2" ? (
            <h2 key={i}>{b.text}</h2>
          ) : (
            <p key={i}>{b.text}</p>
          ),
        )}
        {post.cta && (
          <p style={{ marginTop: 32 }}>
            <Link href={post.cta.href} className="btn btn-gold">
              {post.cta.label}
            </Link>
          </p>
        )}
      </div>
    </article>
  );
}
