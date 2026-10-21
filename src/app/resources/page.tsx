import type { Metadata } from "next";
import { resourceGroups } from "@/content/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "Crisis lines, treatment, support groups and local services in Fort Myers and Lee County.",
};

export default function ResourcesPage() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <div className="page-hero">
        <span className="eyebrow">Resources</span>
        <h1>Help, wherever you are on the road.</h1>
        <p className="lead">
          Crisis lines, treatment, free support groups and local services. In an emergency, call 911.
        </p>
      </div>

      <div className="stack" style={{ gap: 48, marginTop: 24 }}>
        {resourceGroups.map((g) => (
          <section key={g.title} className="stack" style={{ gap: 16 }}>
            <h2 style={{ fontSize: 30 }}>{g.title}</h2>
            <div className="grid-auto" style={{ gap: 14 }}>
              {g.items.map((r) => (
                <div key={r.name} className="card stack" style={{ gap: 6, padding: 22 }}>
                  <strong style={{ fontSize: 17 }}>{r.name}</strong>
                  {r.phone &&
                    (r.tel ? (
                      <a href={`tel:${r.tel}`} style={{ fontWeight: 700, fontSize: 18 }}>
                        {r.phone}
                      </a>
                    ) : (
                      <span style={{ fontWeight: 700, fontSize: 18, color: "var(--olive)" }}>{r.phone}</span>
                    ))}
                  <span className="muted" style={{ fontSize: 15, lineHeight: 1.5 }}>
                    {r.text}
                  </span>
                  {r.url && (
                    <a href={r.url} target="_blank" rel="noreferrer" style={{ fontSize: 14, fontWeight: 600, marginTop: "auto" }}>
                      Website ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
