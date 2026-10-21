import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { QuickExit } from "@/components/QuickExit";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Get help",
  description: "Recovery housing, mother-baby support and confidential help for survivors in Fort Myers.",
};

const doors = [
  { icon: "home", tint: "olive", title: "I need a safe place to stay", text: "Recovery housing and rapid re-housing in Fort Myers." },
  { icon: "baby", tint: "gold", title: "I'm a mom with a baby", text: "Yasamine's Place is opening soon. Reach out now and we'll help in the meantime." },
  { icon: "shield", tint: "olive", title: "I'm not safe at home", text: "Confidential support for domestic violence and trafficking survivors." },
] as const;

export default function GetHelpPage() {
  return (
    <div className="wrap stack" style={{ gap: 40, paddingTop: 40, paddingBottom: 96 }}>
      <div className="notice notice-danger" style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", alignItems: "center" }}>
        <strong style={{ color: "#7a1a12", fontSize: 17 }}>In immediate danger? Call 911.</strong>
        <span>
          Crisis or thoughts of suicide: call or text <a href="tel:988">988</a> · Domestic violence:{" "}
          <a href="tel:18007997233">1-800-799-7233</a> · Trafficking: <a href="tel:18883737888">1-888-373-7888</a>
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "end", justifyContent: "space-between" }}>
        <div className="stack" style={{ gap: 12, maxWidth: 760 }}>
          <h1 style={{ fontSize: "clamp(38px, 6vw, 56px)", letterSpacing: -1.5 }}>You don&apos;t have to figure this out alone.</h1>
          <p className="lead">
            Tell us what&apos;s going on and a case manager will reach out. Everything you share stays private.
          </p>
        </div>
        <div className="stack" style={{ gap: 6, alignItems: "flex-start" }}>
          <QuickExit />
          <span className="muted" style={{ fontSize: 13 }}>
            Or press Esc twice to leave fast
          </span>
        </div>
      </div>

      <div className="grid-auto" style={{ gap: 16 }}>
        {doors.map((d) => (
          <a
            key={d.title}
            href={site.intakePortal}
            className="card stack"
            style={{ gap: 10, textDecoration: "none", color: "var(--ink)", borderWidth: 2 }}
          >
            <span className={`icon-tile ${d.tint}`}>
              <Icon name={d.icon} size={28} />
            </span>
            <strong style={{ fontSize: 20 }}>{d.title}</strong>
            <span className="muted" style={{ lineHeight: 1.5 }}>
              {d.text}
            </span>
            <span style={{ fontWeight: 600, color: "var(--olive)", marginTop: "auto" }}>Start a confidential request →</span>
          </a>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "flex-start" }}>
        <div className="card stack" style={{ flex: "999 1 520px", minWidth: 0, gap: 16, borderRadius: 20, padding: 32 }}>
          <strong style={{ fontFamily: "var(--font-display)", fontSize: 26 }}>How it works</strong>
          <ol className="stack" style={{ gap: 12, margin: 0, paddingLeft: 20, lineHeight: 1.6 }}>
            <li>Start a request on our secure intake site. Only The Braid&apos;s case managers can see it.</li>
            <li>A case manager reviews it and reaches out at the number or email you choose.</li>
            <li>Together you make a plan: housing, recovery support, health care, or a referral to a partner.</li>
          </ol>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a href={site.intakePortal} className="btn btn-olive">
              Start a confidential request
            </a>
            <Link href="/resources" className="btn btn-ghost">
              Crisis lines & resources
            </Link>
          </div>
          <p className="muted" style={{ fontSize: 14 }}>
            If someone else checks your phone or computer, use a private browsing window, or call instead.
          </p>
        </div>

        <aside className="stack" style={{ flex: "1 1 320px", minWidth: 0, gap: 16 }}>
          <div className="card-dark stack" style={{ gap: 10 }}>
            <span style={{ color: "var(--on-dark)" }}>24/7 intake line</span>
            {site.intakePhoneHref ? (
              <a href={site.intakePhoneHref} style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--gold)" }}>
                {site.intakePhone}
              </a>
            ) : (
              <strong style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--gold)" }}>{site.intakePhone}</strong>
            )}
            <span style={{ color: "var(--on-dark)", lineHeight: 1.5 }}>
              Call any time. If we&apos;re full tonight, we&apos;ll connect you with a partner bed.
            </span>
          </div>
          <div className="card stack" style={{ gap: 10, borderRadius: 20 }}>
            <strong>Walk-in</strong>
            <span className="muted" style={{ lineHeight: 1.5 }}>
              {site.facility.line1}
              <br />
              {site.facility.line2}
            </span>
            <a
              href="https://www.google.com/maps/search/?api=1&query=1389+N+Tamiami+Trail+Fort+Myers+FL+33903"
              target="_blank"
              rel="noreferrer"
              style={{ fontWeight: 600 }}
            >
              Get directions →
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
