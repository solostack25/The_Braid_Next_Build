import type { Metadata } from "next";
import Link from "next/link";
import { QuickExit } from "@/components/QuickExit";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Recovery housing interest list",
  description:
    "The Braid is raising funds to secure a recovery home in Lee County. Join the interest list and get support from a case manager now.",
};

export default function HousingInterestPage() {
  return (
    <div className="wrap stack" style={{ gap: 40, paddingTop: 40, paddingBottom: 96 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "end", justifyContent: "space-between" }}>
        <div className="stack" style={{ gap: 12, maxWidth: 760 }}>
          <span className="eyebrow">Recovery housing</span>
          <h1 style={{ fontSize: "clamp(38px, 6vw, 56px)", letterSpacing: -1.5 }}>Tell us you&apos;ll need a place.</h1>
          <p className="lead">
            We don&apos;t have our recovery home yet — we&apos;re raising funds to secure one. Join the interest list so we can
            reach you when it opens, and get help from a case manager now.
          </p>
        </div>
        <div className="stack" style={{ gap: 6, alignItems: "flex-start" }}>
          <QuickExit />
          <span className="muted" style={{ fontSize: 13 }}>
            Or press Esc twice to leave fast
          </span>
        </div>
      </div>

      <div className="split" style={{ gap: 24, alignItems: "start" }}>
        <div className="card stack" style={{ gap: 16, borderRadius: 20, padding: 32 }}>
          <strong style={{ fontFamily: "var(--font-display)", fontSize: 26 }}>How to join</strong>
          <ol style={{ margin: 0, paddingLeft: 20, lineHeight: 1.7 }}>
            <li>Start a confidential request on our secure intake site.</li>
            <li>Choose &ldquo;I need a safe place to stay&rdquo; and say you&apos;d like to be on the recovery housing list.</li>
            <li>A case manager will reach out — to help now, and again when the home opens.</li>
          </ol>
          <a href={site.intakePortal} className="btn btn-olive" style={{ alignSelf: "flex-start" }}>
            Join the interest list
          </a>
          <p className="muted" style={{ fontSize: 14 }}>
            Joining the list doesn&apos;t guarantee a bed or a date. We&apos;ll be honest with you about timing.
          </p>
        </div>
        <div className="card-dark stack" style={{ gap: 12, borderRadius: 20, padding: 32 }}>
          <strong style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--white)" }}>Need somewhere tonight?</strong>
          <p style={{ color: "var(--on-dark)", lineHeight: 1.6 }}>
            Call our intake line and we&apos;ll connect you with a partner bed. In immediate danger, call 911. Crisis or
            thoughts of suicide: call or text 988.
          </p>
          {site.intakePhoneHref ? (
            <a href={site.intakePhoneHref} style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: "var(--gold)" }}>
              {site.intakePhone}
            </a>
          ) : (
            <strong style={{ fontFamily: "var(--font-display)", fontSize: 30, color: "var(--gold)" }}>{site.intakePhone}</strong>
          )}
          <Link href="/resources" style={{ color: "var(--white)", fontWeight: 600 }}>
            Crisis lines and resources →
          </Link>
        </div>
      </div>

      <p className="muted">
        Want to help the home open sooner? <Link href="/house-fund">Give to The House Fund</Link>.
      </p>
    </div>
  );
}
