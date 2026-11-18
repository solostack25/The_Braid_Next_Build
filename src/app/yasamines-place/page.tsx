import type { Metadata } from "next";
import Link from "next/link";
import { pillClass, programBySlug } from "@/content/site";

export const metadata: Metadata = {
  title: "Yasamine's Place",
  description:
    "Yasamine's Place: a planned respite home for single mothers with babies under two facing homelessness in Lee County, Florida.",
};

export default function YasaminesPlacePage() {
  const p = programBySlug("yasamines-place");

  return (
    <div style={{ paddingBottom: 96 }}>
      <div className="wrap page-hero">
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <span className="eyebrow">Mothers and babies</span>
          <span className={pillClass(p.status)}>{p.status}</span>
        </div>
        <h1>Yasamine&apos;s Place</h1>
        <p className="lead">{p.short}</p>
      </div>

      <section className="wrap split" style={{ gap: 32, alignItems: "start", marginTop: 24 }}>
        <div className="stack" style={{ gap: 16, fontSize: 18, lineHeight: 1.75, color: "var(--ink-soft)" }}>
          {p.body.map((b, i) => (
            <p key={i}>{b}</p>
          ))}
          <p>
            Yasamine&apos;s Place isn&apos;t open yet. If you&apos;re a mom who needs help now, reach out — our case
            managers will help you find a safe place and make a plan in the meantime.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link href="/get-help" className="btn btn-olive">
              I&apos;m a mom who needs help
            </Link>
          </div>
        </div>
        {p.services && (
          <div className="card stack" style={{ gap: 12, borderRadius: 20, padding: 32 }}>
            <strong style={{ fontFamily: "var(--font-display)", fontSize: 26 }}>Planned services</strong>
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9, color: "var(--ink-soft)" }}>
              {p.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {p.needs && (
        <section className="wrap section">
          <div className="card-dark split" style={{ borderRadius: 28, padding: "clamp(32px, 6vw, 56px)", gap: 32 }}>
            <div className="stack" style={{ gap: 12 }}>
              <span className="eyebrow" style={{ color: "var(--gold)" }}>
                Help it open
              </span>
              <h2 className="h2">What Yasamine&apos;s Place needs.</h2>
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9, color: "var(--on-dark)", fontSize: 17 }}>
                {p.needs.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
            <div className="stack" style={{ gap: 12, alignSelf: "center" }}>
              <Link href="/donate" className="btn btn-gold" style={{ alignSelf: "flex-start" }}>
                Give to Yasamine&apos;s Place
              </Link>
              <Link href="/volunteer#partner" style={{ color: "var(--white)", fontWeight: 600 }}>
                Partner, donate supplies or offer your skills →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
