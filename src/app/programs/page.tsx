import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { programs } from "@/content/site";

export const metadata: Metadata = {
  title: "Programs",
  description: "Recovery housing, Rope of Allah, a mobile health clinic and Yasamine's Place mother-baby home.",
};

export default function ProgramsPage() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <div className="page-hero">
        <span className="eyebrow">Programs of service</span>
        <h1>Separate services, woven into one plan.</h1>
        <p className="lead">
          Each program stands on its own. Together they give someone a bed, a plan and a way forward.
        </p>
      </div>

      <div className="stack" style={{ gap: 24, marginTop: 24 }}>
        {programs.map((p) => (
          <section key={p.slug} id={p.slug} className="card" style={{ scrollMarginTop: 96, borderRadius: 20, padding: "clamp(24px, 4vw, 40px)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", marginBottom: 16 }}>
              <span className={`icon-tile ${p.tint}`}>
                <Icon name={p.icon} size={26} />
              </span>
              <h2 style={{ fontSize: "clamp(26px, 4vw, 34px)", flex: "1 1 260px" }}>{p.name}</h2>
              <span className={`pill ${p.status === "Active" ? "pill-active" : "pill-soon"}`}>{p.status}</span>
            </div>
            <div className="split" style={{ gap: 32, alignItems: "start" }}>
              <div className="stack" style={{ gap: 14, fontSize: 17, lineHeight: 1.7, color: "var(--ink-soft)" }}>
                {p.body.map((b, i) => (
                  <p key={i}>{b}</p>
                ))}
              </div>
              <div className="stack" style={{ gap: 20 }}>
                {p.services && (
                  <div>
                    <strong style={{ display: "block", marginBottom: 8 }}>{p.status === "Active" ? "Services" : "Planned services"}</strong>
                    <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8, color: "var(--ink-soft)" }}>
                      {p.services.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {p.needs && (
                  <div style={{ background: "var(--sand)", borderRadius: 14, padding: 20 }}>
                    <strong style={{ display: "block", marginBottom: 8 }}>Help it open</strong>
                    <ul style={{ margin: "0 0 14px", paddingLeft: 20, lineHeight: 1.8 }}>
                      {p.needs.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                      <Link href="/donate" className="btn btn-gold">
                        Give
                      </Link>
                      <Link href="/volunteer#partner" className="btn btn-ghost">
                        Partner
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}

        <section id="survivors" className="card" style={{ scrollMarginTop: 96, borderRadius: 20, padding: "clamp(24px, 4vw, 40px)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", marginBottom: 16 }}>
            <span className="icon-tile olive">
              <Icon name="shield" size={26} />
            </span>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 34px)" }}>Domestic violence & trafficking survivors</h2>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-soft)", maxWidth: 760 }}>
            Confidential support and safe referrals for survivors of domestic violence and human trafficking, and
            awareness work in the community.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
            <Link href="/get-help" className="btn btn-olive">
              Get confidential help
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
