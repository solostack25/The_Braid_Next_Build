import Image from "next/image";
import Link from "next/link";
import { DonateWidget } from "@/components/DonateWidget";
import { ProgramCard } from "@/components/ProgramCard";
import { homePhoto, partners, programs, stats, strands } from "@/content/site";

export default function Home() {
  return (
    <>
      <section className="wrap hero split">
        <div className="stack" style={{ gap: 24 }}>
          <span className="caps" style={{ fontSize: 15, fontWeight: 600, color: "var(--olive)" }}>
            Rest <span style={{ color: "var(--gold)" }}>•</span> Recover <span style={{ color: "var(--gold)" }}>•</span> Rise — Fort Myers, FL
          </span>
          <h1>Weaving hope into every life.</h1>
          <p className="lead" style={{ maxWidth: 540 }}>
            We extend a rope of hope to people facing hardship in Lee County — recovery housing, case management and
            wrap-around care that restores dignity and builds lasting stability.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link href="/get-help" className="btn btn-olive">
              Get help now
            </Link>
            <Link href="#programs" className="btn btn-ghost">
              Our programs
            </Link>
          </div>
        </div>
        <DonateWidget />
      </section>

      <div className="wrap braid-divider" aria-hidden="true">
        <span />
        <Image src="/brand/braid-mark.png" alt="" width={281} height={72} />
        <span />
      </div>

      <section aria-label="By the numbers" className="stats">
        <div className="wrap">
          {stats.map((s) => (
            <div key={s.label} className="stack" style={{ gap: 4 }}>
              <span className="stat-num">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="programs" className="wrap section stack" style={{ gap: 40 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "end" }}>
          <div className="stack" style={{ gap: 12, maxWidth: 640 }}>
            <span className="eyebrow">Programs of service</span>
            <h2 className="h2">Separate services, woven into one plan.</h2>
          </div>
          <Link href="/programs" style={{ fontWeight: 600 }}>
            See all programs →
          </Link>
        </div>
        <div className="grid-auto">
          {programs.map((p) => (
            <ProgramCard key={p.slug} p={p} />
          ))}
        </div>
      </section>

      <section style={{ background: "var(--white)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap section split">
          {homePhoto.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={homePhoto.src}
              alt={homePhoto.alt}
              data-cc-image={homePhoto.alt}
              style={{ aspectRatio: "4 / 3", width: "100%", objectFit: "cover", borderRadius: 20 }}
            />
          ) : (
            <div
              data-cc-image={homePhoto.alt}
              data-cc-image-label=""
              style={{
                aspectRatio: "4 / 3",
                borderRadius: 20,
                background: "#eaebd9",
                border: "2px dashed var(--sage)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
                textAlign: "center",
                color: "var(--olive)",
                fontWeight: 500,
              }}
            >
              [Photo: the residence at 1389 N Tamiami Trail — residents or staff, with consent]
            </div>
          )}
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">Why a braid</span>
            <h2 className="h2">One strand frays. Three hold.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-soft)" }}>
              Individual services are stronger when woven together. We don&apos;t just provide a bed — we provide hope,
              healing and a pathway to self-sufficiency.
            </p>
            <div className="stack" style={{ gap: 16 }}>
              {strands.map((s) => (
                <div key={s.name} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <span style={{ width: 14, height: 48, borderRadius: 999, background: s.color, flex: "none" }} />
                  <div className="stack">
                    <strong style={{ fontSize: 18 }}>{s.name}</strong>
                    <span className="muted">{s.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap stack" style={{ gap: 28, alignItems: "center", paddingTop: 72, paddingBottom: 72 }}>
        <span className="eyebrow" style={{ color: "var(--muted)" }}>
          Working alongside
        </span>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px 48px",
            justifyContent: "center",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 20,
            color: "var(--ink-soft)",
            textAlign: "center",
          }}
        >
          {partners.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 96 }}>
        <div className="stack" style={{ background: "var(--olive)", color: "var(--white)", borderRadius: 28, padding: "clamp(32px, 6vw, 64px) clamp(24px, 5vw, 48px)", gap: 36 }}>
          <div className="stack" style={{ gap: 12, maxWidth: 680 }}>
            <h2 className="h2">Join us in weaving hope.</h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--on-dark)" }}>
              Every gift, every volunteer hour and every partnership extends the rope to someone who needs it.
            </p>
          </div>
          <div className="grid-auto" style={{ gap: 16 }}>
            <Link href="/donate" className="stack" style={{ background: "var(--gold)", color: "var(--ink)", textDecoration: "none", borderRadius: 18, padding: 28, gap: 8 }}>
              <strong style={{ fontSize: 20 }}>Donate</strong>
              <span>Monthly or one-time, to the program you choose.</span>
            </Link>
            <Link href="/volunteer" className="stack" style={{ background: "var(--ink)", color: "var(--white)", textDecoration: "none", borderRadius: 18, padding: 28, gap: 8 }}>
              <strong style={{ fontSize: 20 }}>Volunteer</strong>
              <span style={{ color: "var(--on-dark)" }}>Mentor, cook, drive or teach a life skill.</span>
            </Link>
            <Link href="/volunteer#partner" className="stack" style={{ background: "var(--ink)", color: "var(--white)", textDecoration: "none", borderRadius: 18, padding: 28, gap: 8 }}>
              <strong style={{ fontSize: 20 }}>Partner with us</strong>
              <span style={{ color: "var(--on-dark)" }}>Agencies, masjids, churches and businesses.</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
