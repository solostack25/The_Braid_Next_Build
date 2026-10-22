import type { Metadata } from "next";
import Link from "next/link";
import { leadership, partners, values } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "The Braid Inc serves Lee County's most vulnerable people with housing, healthcare, education and life skills.",
};

export default function AboutPage() {
  return (
    <div style={{ paddingBottom: 96 }}>
      <div className="wrap page-hero">
        <span className="eyebrow">Our story</span>
        <h1>Every person deserves dignity, support and the chance to rise.</h1>
        <p className="lead">
          The Braid Inc is based in Fort Myers, Florida, and serves Lee County&apos;s most vulnerable people. Our
          28-bed recovery residence is coming soon, and it is just the beginning: we bring housing, healthcare, education and essential life
          skills together, because individual services are stronger when they&apos;re woven together.
        </p>
      </div>

      <section className="wrap split" style={{ alignItems: "stretch", gap: 20, marginTop: 24 }}>
        <div className="card-dark stack" style={{ gap: 12 }}>
          <span className="eyebrow" style={{ color: "var(--gold)" }}>
            Mission
          </span>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 26, lineHeight: 1.3 }}>
            To weave hope, resilience and perseverance through community enrichment, outreach and education —
            extending a rope of hope through wrap-around services in recovery, housing and life-building skills.
          </p>
        </div>
        <div className="card stack" style={{ gap: 12, borderRadius: 20 }}>
          <span className="eyebrow">Vision</span>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 26, lineHeight: 1.3 }}>
            A community where everyone facing hardship has dignified housing, real support and the resources to build
            a stable, self-reliant future — where no one falls through the cracks.
          </p>
        </div>
      </section>

      <section className="wrap section stack" style={{ gap: 32 }}>
        <h2 className="h2">What we believe</h2>
        <div className="grid-auto">
          {values.map((v) => (
            <div key={v.name} className="card stack" style={{ gap: 8 }}>
              <strong style={{ fontFamily: "var(--font-display)", fontSize: 24 }}>{v.name}</strong>
              <span className="muted" style={{ lineHeight: 1.6 }}>
                {v.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--white)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap section stack" style={{ gap: 32 }}>
          <h2 className="h2">Leadership</h2>
          <div className="grid-auto">
            {leadership.map((l) => (
              <div key={l.title} className="stack" style={{ gap: 4, borderLeft: "3px solid var(--gold)", paddingLeft: 16 }}>
                <strong style={{ fontSize: 18 }}>{l.title}</strong>
                <span className="muted">{l.focus}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section stack" style={{ gap: 24 }}>
        <h2 className="h2">Our partners</h2>
        <p className="lead" style={{ maxWidth: 720 }}>
          We coordinate placements and services with agencies across Lee County.
        </p>
        <ul style={{ display: "flex", flexWrap: "wrap", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
          {partners.map((p) => (
            <li key={p} className="card" style={{ padding: "12px 18px", borderRadius: 999 }}>
              {p}
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 12 }}>
          <Link href="/volunteer#partner" className="btn btn-olive">
            Partner with us
          </Link>
          <Link href="/donate" className="btn btn-gold">
            Donate
          </Link>
        </div>
      </section>
    </div>
  );
}
