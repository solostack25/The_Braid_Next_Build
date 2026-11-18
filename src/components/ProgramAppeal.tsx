"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AMOUNTS = [25, 50, 100, 250];

/** Donation appeal on a program page. Sends the gift to /donate with this program's fund pre-selected. */
export function ProgramAppeal({
  fund,
  programName,
  headline,
  text,
  extra,
}: {
  fund: string;
  programName: string;
  headline: string;
  text: string;
  extra?: { label: string; href: string };
}) {
  const router = useRouter();
  const [freq, setFreq] = useState<"monthly" | "once">("monthly");
  const [amount, setAmount] = useState<number>(50);
  const [other, setOther] = useState("");

  const otherNum = Number(other.replace(/[^0-9.]/g, ""));
  const chosen = other && otherNum > 0 ? Math.round(otherNum) : amount;

  return (
    <section id="give" className="card-dark split" style={{ borderRadius: 28, padding: "clamp(28px, 5vw, 56px)", gap: 40, scrollMarginTop: 96 }}>
      <div className="stack" style={{ gap: 14 }}>
        <span className="eyebrow" style={{ color: "var(--gold)" }}>
          Give to {programName}
        </span>
        <h2 className="h2">{headline}</h2>
        <p style={{ color: "var(--on-dark)", fontSize: 18, lineHeight: 1.7 }}>{text}</p>
        {extra && (
          <Link href={extra.href} style={{ color: "var(--white)", fontWeight: 600 }}>
            {extra.label} →
          </Link>
        )}
      </div>
      <form
        className="card stack"
        style={{ gap: 18, padding: 28, color: "var(--ink)" }}
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/donate?fund=${encodeURIComponent(fund)}&amount=${chosen}&freq=${freq}`);
        }}
      >
        <div className="seg" role="group" aria-label="How often">
          <button type="button" aria-pressed={freq === "monthly"} onClick={() => setFreq("monthly")}>
            Monthly
          </button>
          <button type="button" aria-pressed={freq === "once"} onClick={() => setFreq("once")}>
            One time
          </button>
        </div>
        <div role="group" aria-label="Amount" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 10 }}>
          {AMOUNTS.map((a) => (
            <button
              key={a}
              type="button"
              className="chip"
              aria-pressed={!other && amount === a}
              onClick={() => {
                setAmount(a);
                setOther("");
              }}
            >
              ${a}
            </button>
          ))}
        </div>
        <label className="field">
          Other amount
          <input className="input" inputMode="decimal" placeholder="$" value={other} onChange={(e) => setOther(e.target.value)} />
        </label>
        <button type="submit" className="btn btn-gold" style={{ fontSize: 17, padding: 18 }}>
          Give ${chosen}
          {freq === "monthly" ? " / month" : ""}
        </button>
        <span className="muted" style={{ fontSize: 13, textAlign: "center" }}>
          The Braid Inc is a 501(c)(3). Gifts are tax-deductible.
        </span>
      </form>
    </section>
  );
}
