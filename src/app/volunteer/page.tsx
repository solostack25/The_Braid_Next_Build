import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Volunteer & partner",
  description: "Mentor, cook, drive or teach a life skill — or partner with The Braid as an agency, masjid, church or business.",
};

const roles = [
  { title: "Mentor", text: "Walk alongside a resident as they rebuild — weekly check-ins, encouragement and accountability." },
  { title: "Cook or serve", text: "Prepare a meal for the house or help stock and run the food pantry." },
  { title: "Drive", text: "Get residents to appointments, interviews and job sites." },
  { title: "Teach a life skill", text: "Budgeting, résumés, cooking, digital skills — share what you know." },
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
              Refer clients, host a speaker event through Rope of Allah, sponsor a room, or help us open Yasamine&apos;s
              Place and the Mobile Health Clinic.
            </p>
          </div>
          <div className="stack" style={{ gap: 12, alignSelf: "center" }}>
            <span style={{ color: "var(--on-dark)" }}>Admin office</span>
            <strong style={{ fontSize: 20 }}>
              {site.office.line1}, {site.office.line2}
            </strong>
            <span style={{ color: "var(--on-dark)" }}>{site.email}</span>
            <Link href="/donate" className="btn btn-gold" style={{ alignSelf: "flex-start", marginTop: 8 }}>
              Sponsor with a gift
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
