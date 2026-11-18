import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Case management in Fort Myers",
  description:
    "Free, confidential case management in Fort Myers and Lee County, Florida: a personal plan, partner beds, healthcare, benefits and work.",
};

const helps = [
  { title: "A plan that's yours", text: "A case manager sits down with you, listens, and builds a plan around what you need most." },
  { title: "A safe place to stay", text: "We connect you with partner beds and shelter options through the Lee County Continuum of Care." },
  { title: "Health and mental health", text: "Help getting to doctors, clinics and mental health support — and advocating for you there." },
  { title: "Benefits and paperwork", text: "Help applying for benefits and gathering IDs and documents." },
  { title: "Work and skills", text: "Job readiness, résumés, and life skills like budgeting and digital literacy." },
  { title: "The right referrals", text: "If another agency can help better, we connect you — and follow up." },
];

export default function CaseManagementPage() {
  return (
    <div style={{ paddingBottom: 96 }}>
      <div className="wrap page-hero">
        <span className="eyebrow">Case management · Fort Myers, FL</span>
        <h1>Someone in your corner, with a plan.</h1>
        <p className="lead">
          The Braid&apos;s case managers help people facing hardship in Lee County find stability — one step at a time,
          and in confidence.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
          <a href={site.intakePortal} className="btn btn-olive">
            Start a confidential request
          </a>
          <Link href="/refer" className="btn btn-ghost">
            Refer someone
          </Link>
        </div>
      </div>

      <section className="wrap section stack" style={{ gap: 32, paddingTop: 24 }}>
        <h2 className="h2">What a case manager can help with</h2>
        <div className="grid-auto">
          {helps.map((h) => (
            <div key={h.title} className="card stack" style={{ gap: 8 }}>
              <strong style={{ fontFamily: "var(--font-display)", fontSize: 24 }}>{h.title}</strong>
              <span className="muted" style={{ lineHeight: 1.6 }}>
                {h.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--white)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap section split" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">How it works</span>
            <ol style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8, fontSize: 17, color: "var(--ink-soft)" }}>
              <li>Start a request online or call our intake line.</li>
              <li>A case manager reaches out at the number or email you choose.</li>
              <li>You make a plan together, and they stay with you as it moves forward.</li>
            </ol>
          </div>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Recovery housing</span>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-soft)" }}>
              We&apos;re raising funds to secure our own recovery home. Until it opens, case management continues and we
              connect people with partner beds.
            </p>
            <Link href="/housing-interest" style={{ fontWeight: 600 }}>
              Join the recovery housing interest list →
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="notice notice-danger">
          <strong>In immediate danger? Call 911.</strong> Crisis or thoughts of suicide: call or text <a href="tel:988">988</a>.{" "}
          <Link href="/resources">More crisis lines and resources →</Link>
        </div>
      </section>
    </div>
  );
}
