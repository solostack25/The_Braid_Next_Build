import type { Metadata } from "next";
import Link from "next/link";
import { partners, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Refer someone",
  description:
    "For case managers, treatment providers, courts, hospitals, shelters, masjids and churches in Lee County: how to refer someone to The Braid.",
};

const steps = [
  { title: "Ask first", text: "Talk with the person and get their consent to share their information with The Braid." },
  { title: "Send the referral", text: "Start a request on our secure intake site, or call our intake line. Only our case managers can see it." },
  { title: "We take it from there", text: "A case manager reaches out to the person directly and, with their permission, keeps you updated." },
];

const today = [
  "Case management and a personal plan",
  "Connection to partner beds through the Continuum of Care",
  "Healthcare, mental health and benefits navigation",
  "Job readiness and life skills",
  "Confidential support for domestic violence and trafficking survivors",
];

export default function ReferPage() {
  return (
    <div style={{ paddingBottom: 96 }}>
      <div className="wrap page-hero">
        <span className="eyebrow">For partners</span>
        <h1>Refer someone to The Braid.</h1>
        <p className="lead">
          For case managers, treatment providers, courts and probation, hospitals, shelters, masjids and churches in Lee
          County.
        </p>
      </div>

      <section className="wrap stack" style={{ gap: 20, marginTop: 24 }}>
        <div className="grid-auto">
          {steps.map((s, i) => (
            <div key={s.title} className="card stack" style={{ gap: 10 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 40, color: "var(--gold)", lineHeight: 1 }}>{i + 1}</span>
              <strong style={{ fontSize: 20 }}>{s.title}</strong>
              <span className="muted" style={{ lineHeight: 1.6 }}>
                {s.text}
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a href={site.intakePortal} className="btn btn-olive">
            Start a secure referral
          </a>
          {site.intakePhoneHref ? (
            <a href={site.intakePhoneHref} className="btn btn-ghost">
              Call {site.intakePhone}
            </a>
          ) : (
            <span className="btn btn-ghost" aria-disabled="true">
              Intake line: {site.intakePhone}
            </span>
          )}
        </div>
      </section>

      <section className="wrap section split" style={{ gap: 32, alignItems: "start" }}>
        <div className="card stack" style={{ gap: 14, borderRadius: 20, padding: 32 }}>
          <strong style={{ fontFamily: "var(--font-display)", fontSize: 26 }}>What we can help with today</strong>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9, color: "var(--ink-soft)" }}>
            {today.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="notice notice-warn" style={{ margin: 0 }}>
            <strong>About recovery housing:</strong> we don&apos;t have our own recovery home yet — we&apos;re raising{" "}
            <Link href="/house-fund">The House Fund</Link> to secure one. Until then, we coordinate partner beds.
          </p>
        </div>
        <div className="card-dark stack" style={{ gap: 14, borderRadius: 20, padding: 32 }}>
          <strong style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--white)" }}>Our commitments</strong>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9, color: "var(--on-dark)" }}>
            <li>Every referral is confidential.</li>
            <li>We only share updates with the person&apos;s consent.</li>
            <li>We never pay for referrals, and never accept payment for them.</li>
            <li>We&apos;ll tell you honestly if we can&apos;t help, and point you to who can.</li>
          </ul>
        </div>
      </section>

      <section className="wrap stack" style={{ gap: 20 }}>
        <span className="eyebrow" style={{ color: "var(--muted)" }}>
          We work alongside
        </span>
        <ul style={{ display: "flex", flexWrap: "wrap", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
          {partners.map((p) => (
            <li key={p} className="card" style={{ padding: "12px 18px", borderRadius: 999 }}>
              {p}
            </li>
          ))}
        </ul>
        <div className="card" style={{ background: "var(--sand)", marginTop: 12 }}>
          <span style={{ fontSize: 17 }}>
            Want a partner one-pager or a visit from our team? Email <strong>{site.email}</strong>.
          </span>
        </div>
      </section>
    </div>
  );
}
