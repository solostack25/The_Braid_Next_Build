import type { Metadata } from "next";
import Link from "next/link";
import { houseFund, site } from "@/content/site";

export const metadata: Metadata = {
  title: "The House Fund",
  description:
    "The Braid is raising funds to secure a safe recovery home in Lee County, Florida. See where your gift goes and how to help.",
};

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

const faqs = [
  {
    q: "Why doesn't The Braid have a house yet?",
    a: "Securing a recovery home takes funding, the right property and approvals. We'd rather tell you honestly where we are than announce a house before it's ready. The House Fund is how we get there.",
  },
  {
    q: "What happens to people who need housing now?",
    a: "Our case managers keep working today. We connect people with partner beds through the Lee County Continuum of Care and our partner agencies, and help them build a plan.",
  },
  {
    q: "Can I give monthly, or give Zakat or Sadaqah?",
    a: "Yes. On the donation page you can choose monthly or one time, and mark your gift as General, Sadaqah or Zakat.",
  },
  {
    q: "Is my gift tax-deductible?",
    a: "The Braid Inc is a 501(c)(3) nonprofit. Gifts are tax-deductible as allowed by law, and you'll get a receipt.",
  },
  {
    q: "I know of a property. Who do I tell?",
    a: `We'd love to hear about it. Email ${site.email} with the address and any details you have.`,
  },
];

export default function HouseFundPage() {
  const { goal, raised, donors, uses } = houseFund;
  const pct = goal && raised != null ? Math.min(100, Math.round((raised / goal) * 100)) : null;

  return (
    <div style={{ paddingBottom: 96 }}>
      <section className="wrap hero split">
        <div className="stack" style={{ gap: 20 }}>
          <span className="eyebrow">The House Fund</span>
          <h1>Help us secure a home for recovery.</h1>
          <p className="lead" style={{ maxWidth: 560 }}>
            The Braid doesn&apos;t have its recovery home yet. We&apos;re raising the money to secure one — a safe,
            dignified place in Lee County where people can rest, recover and rise.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link href="/donate?amount=100" className="btn btn-gold">
              Give to The House Fund
            </Link>
            <Link href="#uses" className="btn btn-ghost">
              Where the money goes
            </Link>
          </div>
        </div>

        <div className="card stack" style={{ gap: 18, padding: 32, boxShadow: "0 20px 50px rgba(47,58,31,0.08)" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26 }}>Our progress</span>
          {pct != null && goal ? (
            <>
              <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Raised toward goal">
                <span style={{ width: `${pct}%` }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <strong style={{ fontSize: 20 }}>{money(raised ?? 0)} raised</strong>
                <span className="muted">of {money(goal)} goal</span>
              </div>
              {donors != null && <span className="muted">From {donors.toLocaleString("en-US")} donors · {pct}% of the way</span>}
            </>
          ) : (
            <>
              <div className="progress" aria-hidden="true">
                <span style={{ width: "4%" }} />
              </div>
              <p className="muted" style={{ lineHeight: 1.6 }}>
                We&apos;re setting our goal now. We&apos;ll share it here, along with our progress, as gifts come in.
              </p>
            </>
          )}
          <Link href="/donate?amount=50&freq=monthly" style={{ fontWeight: 600 }}>
            Give monthly →
          </Link>
        </div>
      </section>

      <section id="uses" className="wrap section stack" style={{ gap: 32, scrollMarginTop: 96 }}>
        <div className="stack" style={{ gap: 12, maxWidth: 680 }}>
          <span className="eyebrow">Where the money goes</span>
          <h2 className="h2">Three strands to a home.</h2>
        </div>
        <div className="grid-auto">
          {uses.map((u, i) => (
            <div key={u.name} className="card stack" style={{ gap: 10 }}>
              <span className="caps" style={{ color: "var(--gold)", fontWeight: 600 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <strong style={{ fontFamily: "var(--font-display)", fontSize: 26 }}>{u.name}</strong>
              <span className="muted" style={{ lineHeight: 1.6 }}>
                {u.text}
              </span>
              {u.amount != null && <strong style={{ color: "var(--olive)", fontSize: 20 }}>{money(u.amount)}</strong>}
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--white)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap section split" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Until the house opens</span>
            <h2 className="h2">The work doesn&apos;t wait.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-soft)" }}>
              Our case managers help people today — making a plan, connecting them with partner beds through the
              Lee County Continuum of Care, and linking them to healthcare, benefits and work. The House Fund adds
              the one thing we can&apos;t borrow: a home of our own.
            </p>
            <Link href="/get-help" style={{ fontWeight: 600 }}>
              Need help now? Start here →
            </Link>
          </div>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Other ways to help</span>
            <div className="stack" style={{ gap: 10 }}>
              <Link href="/volunteer" className="card" style={{ textDecoration: "none", color: "var(--ink)", padding: 20 }}>
                <strong>Volunteer</strong> <span className="muted">— events, supply drives, mentoring</span>
              </Link>
              <Link href="/volunteer#partner" className="card" style={{ textDecoration: "none", color: "var(--ink)", padding: 20 }}>
                <strong>Partner or sponsor</strong> <span className="muted">— masjids, churches, businesses</span>
              </Link>
              <a href={`mailto:${site.email}`} className="card" style={{ textDecoration: "none", color: "var(--ink)", padding: 20 }}>
                <strong>Know of a property?</strong> <span className="muted">— tell us about it</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap section stack" style={{ gap: 20, maxWidth: 860 }}>
        <h2 className="h2">Questions</h2>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="wrap">
        <div className="card-dark stack" style={{ borderRadius: 28, padding: "clamp(32px, 6vw, 56px)", gap: 20, alignItems: "flex-start" }}>
          <h2 className="h2">Every strand makes the rope stronger.</h2>
          <p style={{ color: "var(--on-dark)", fontSize: 18, lineHeight: 1.6, maxWidth: 640 }}>
            A gift of any size moves us closer to a home.
          </p>
          <Link href="/donate?amount=100" className="btn btn-gold">
            Give to The House Fund
          </Link>
        </div>
      </section>
    </div>
  );
}
