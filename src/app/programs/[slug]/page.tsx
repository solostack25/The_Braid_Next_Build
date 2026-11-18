import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { ProgramAppeal } from "@/components/ProgramAppeal";
import { QuickExit } from "@/components/QuickExit";
import { pillClass, programs, type Program } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = programs.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.name, description: p.short };
}

/** Program-specific notes shown beside the description. */
function sideNote(p: Program) {
  switch (p.slug) {
    case "recovery-housing":
      return {
        title: "Where things stand",
        text: "We don't have our recovery home yet. Until it opens, our case managers connect people with partner beds through the Lee County Continuum of Care.",
        link: { label: "Join the recovery housing interest list", href: "/housing-interest" },
      };
    case "yasamines-place":
      return {
        title: "A mom who needs help now?",
        text: "Yasamine's Place isn't open yet. Reach out anyway — our case managers will help you find a safe place and make a plan.",
        link: { label: "Get help", href: "/get-help" },
      };
    case "survivors":
      return {
        title: "Need help now?",
        text: "Reaching out is confidential. A case manager will contact you only in the way you choose.",
        link: { label: "Get confidential help", href: "/get-help" },
      };
    case "mobile-health":
      return {
        title: "Not on the road yet",
        text: "The clinic is still being funded and equipped. Healthcare providers and funders who want to help launch it, we'd love to hear from you.",
        link: { label: "Partner with us", href: "/volunteer#partner" },
      };
    default:
      return {
        title: "Bring us to your community",
        text: "Masjids, community centers and interfaith groups can host a speaker event or partner with us.",
        link: { label: "Partner with us", href: "/volunteer#partner" },
      };
  }
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const p = programs.find((x) => x.slug === slug);
  if (!p) notFound();

  const note = sideNote(p);
  const others = programs.filter((x) => x.slug !== p.slug);
  const isSurvivors = p.slug === "survivors";

  return (
    <div style={{ paddingBottom: 96 }}>
      {isSurvivors && (
        <div className="wrap" style={{ paddingTop: 32 }}>
          <div className="notice notice-danger" style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", alignItems: "center", justifyContent: "space-between" }}>
            <span>
              <strong style={{ color: "#7a1a12" }}>In immediate danger? Call 911.</strong> Domestic violence:{" "}
              <a href="tel:18007997233">1-800-799-7233</a> · Trafficking: <a href="tel:18883737888">1-888-373-7888</a>
            </span>
            <QuickExit />
          </div>
        </div>
      )}

      <div className="wrap page-hero">
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <span className={`icon-tile ${p.tint}`}>
            <Icon name={p.icon} size={26} />
          </span>
          <span className="eyebrow">Programs of service</span>
          <span className={pillClass(p.status)}>{p.status}</span>
        </div>
        <h1>{p.name}</h1>
        <p className="lead">{p.short}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
          {p.fund && (
            <Link href="#give" className="btn btn-gold">
              Give to this program
            </Link>
          )}
          <Link href={note.link.href} className="btn btn-ghost">
            {note.link.label}
          </Link>
        </div>
      </div>

      <section className="wrap split" style={{ gap: 32, alignItems: "start", marginTop: 24 }}>
        <div className="stack" style={{ gap: 16, fontSize: 18, lineHeight: 1.75, color: "var(--ink-soft)" }}>
          {p.body.map((b, i) => (
            <p key={i}>{b}</p>
          ))}
          <div className="card stack" style={{ gap: 8, background: "var(--sand)", marginTop: 8 }}>
            <strong style={{ color: "var(--ink)" }}>{note.title}</strong>
            <span style={{ fontSize: 16, lineHeight: 1.6 }}>{note.text}</span>
            <Link href={note.link.href} style={{ fontWeight: 600, fontSize: 16 }}>
              {note.link.label} →
            </Link>
          </div>
        </div>
        <div className="stack" style={{ gap: 20 }}>
          {p.services && (
            <div className="card stack" style={{ gap: 12, borderRadius: 20, padding: 32 }}>
              <strong style={{ fontFamily: "var(--font-display)", fontSize: 26 }}>
                {p.status === "Active" ? "What we do" : "Planned services"}
              </strong>
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9, color: "var(--ink-soft)" }}>
                {p.services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          )}
          {p.needs && (
            <div className="card stack" style={{ gap: 12, borderRadius: 20, padding: 32 }}>
              <strong style={{ fontFamily: "var(--font-display)", fontSize: 26 }}>What it needs to open</strong>
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9, color: "var(--ink-soft)" }}>
                {p.needs.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {p.fund && p.appeal && (
        <div className="wrap section">
          <ProgramAppeal
            fund={p.fund}
            programName={p.name}
            headline={p.appeal.headline}
            text={p.appeal.text}
            extra={p.slug === "recovery-housing" ? { label: "See The House Fund campaign", href: "/house-fund" } : undefined}
          />
        </div>
      )}

      <section className="wrap stack" style={{ gap: 24 }}>
        <h2 className="h2">Our other programs</h2>
        <div className="grid-auto">
          {others.map((o) => (
            <Link key={o.slug} href={o.page ?? `/programs/${o.slug}`} className="card stack" style={{ gap: 10, textDecoration: "none", color: "var(--ink)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className={`icon-tile ${o.tint}`}>
                  <Icon name={o.icon} size={22} />
                </span>
                <span className={pillClass(o.status)}>{o.status}</span>
              </div>
              <strong style={{ fontSize: 19 }}>{o.name}</strong>
              <span style={{ fontWeight: 600, color: "var(--olive)", fontSize: 15, marginTop: "auto" }}>Learn more →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
