import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Volunteer & partner",
  description: "Mentor, cook, drive or teach a life skill — or partner with The Braid as an agency, masjid, church or business.",
};

const roles = [
  { title: "Mentor", text: "Walk alongside someone as they rebuild — weekly check-ins, encouragement and accountability." },
  { title: "Help at events", text: "Set up, serve and greet at fundraisers and community events for The House Fund." },
  { title: "Drive", text: "Get the people we serve to appointments, interviews and job sites." },
  { title: "Teach a life skill", text: "Budgeting, résumés, cooking, digital skills — share what you know." },
  { title: "Collect supplies", text: "Run a drive for furnishings, linens and household basics for the future home." },
  { title: "Spread the word", text: "Share The House Fund with your masjid, church, workplace or friends." },
];

export default function VolunteerPage() {
  return (
    <div style={{ paddingBottom: 96 }}>
      <div className="wrap page-hero">
        <span className="eyebrow">Get involved</span>
        <h1>Hold a strand.</h1>
        <p className="lead">Every volunteer hour extends the rope to someone who needs it.</p>
      </div>

      <section className="wrap stack" style={{ gap: 20, marginTop: 24 }}>
        <div className="grid-auto">
          {roles.map((r) => (
            <div key={r.title} className="card stack" style={{ gap: 8 }}>
              <strong style={{ fontFamily: "var(--font-display)", fontSize: 24 }}>{r.title}</strong>
              <span className="muted" style={{ lineHeight: 1.6 }}>
                {r.text}
              </span>
            </div>
          ))}
        </div>
        <div className="card" style={{ background: "var(--sand)", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 17 }}>
            To volunteer, email <strong>{site.email}</strong> with what you&apos;d like to help with and when you&apos;re free.
          </span>
        </div>
      </section>

      <section id="partner" className="wrap section" style={{ scrollMarginTop: 96 }}>
        <div className="card-dark split" style={{ borderRadius: 28, padding: "clamp(32px, 6vw, 56px)", gap: 32 }}>
          <div className="stack" style={{ gap: 12 }}>
            <span className="eyebrow" style={{ color: "var(--gold)" }}>
              Partner with us
            </span>
            <h2 className="h2">Agencies, masjids, churches and businesses.</h2>
            <p style={{ color: "var(--on-dark)", fontSize: 17, lineHeight: 1.7 }}>
              Refer clients, host a speaker event through Rope of Allah, sponsor The House Fund, help us find a
              property, or help us open Yasamine&apos;s Place and the Mobile Health Clinic.
            </p>
          </div>
          <div className="stack" style={{ gap: 12, alignSelf: "center" }}>
            <span style={{ color: "var(--on-dark)" }}>Admin office</span>
            <strong style={{ fontSize: 20 }}>
              {site.office.line1}, {site.office.line2}
            </strong>
            <span style={{ color: "var(--on-dark)" }}>{site.email}</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
              <Link href="/refer" className="btn btn-gold">
                Refer someone
              </Link>
              <Link href="/house-fund" className="btn btn-ghost" style={{ color: "var(--white)", borderColor: "var(--on-dark)" }}>
                Sponsor The House Fund
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
