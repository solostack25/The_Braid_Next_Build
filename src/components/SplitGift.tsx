"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { funds } from "@/content/site";

type Freq = "monthly" | "once";
type GiftType = "general" | "sadaqah" | "zakat";

const MAX = 500;

export function SplitGift() {
  const params = useSearchParams();
  const startAmount = Math.min(MAX, Math.max(0, Math.round(Number(params.get("amount")) || 0)));

  const [freq, setFreq] = useState<Freq>(params.get("freq") === "once" ? "once" : "monthly");
  const [type, setType] = useState<GiftType>("general");
  const [coverFees, setCoverFees] = useState(true);
  const [vals, setVals] = useState<Record<string, number>>(() =>
    Object.fromEntries(
      funds.map((f) => [f.id, startAmount ? (f.id === "housing" ? startAmount : 0) : f.start])
    )
  );
  const [notice, setNotice] = useState(false);

  const subtotal = useMemo(() => Object.values(vals).reduce((a, b) => a + b, 0), [vals]);
  const total = coverFees ? Math.round(subtotal * 1.03) : subtotal;
  const active = funds.filter((f) => vals[f.id] > 0);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "flex-start" }}>
      <section aria-label="Gift details" className="stack" style={{ flex: "999 1 560px", minWidth: 0, gap: 24 }}>
        <div className="card" style={{ borderRadius: 20, display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between" }}>
          <div className="stack" style={{ gap: 10, minWidth: 220 }}>
            <strong style={{ fontSize: 15 }}>How often</strong>
            <div className="seg" role="group" aria-label="How often">
              <button type="button" aria-pressed={freq === "monthly"} onClick={() => setFreq("monthly")}>
                Monthly
              </button>
              <button type="button" aria-pressed={freq === "once"} onClick={() => setFreq("once")}>
                One time
              </button>
            </div>
          </div>
          <div className="stack" style={{ gap: 10 }}>
            <strong style={{ fontSize: 15 }}>Type of giving</strong>
            <div role="group" aria-label="Type of giving" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {(
                [
                  ["general", "General"],
                  ["sadaqah", "Sadaqah"],
                  ["zakat", "Zakat"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className="chip"
                  aria-pressed={type === id}
                  onClick={() => setType(id)}
                  style={{ padding: "10px 18px", fontSize: 15, borderRadius: 999 }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card stack" style={{ borderRadius: 20, gap: 4 }}>
          <strong style={{ fontSize: 15 }}>Split across programs</strong>
          {funds.map((f) => (
            <div
              key={f.id}
              style={{
                display: "grid",
                gridTemplateColumns: "14px minmax(0, 1fr) 80px",
                gap: 16,
                alignItems: "center",
                padding: "16px 0",
                borderBottom: "1px solid var(--sand)",
              }}
            >
              <span style={{ width: 14, height: 40, borderRadius: 999, background: f.color }} />
              <label className="stack" style={{ gap: 8 }}>
                <span style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "baseline" }}>
                  <strong style={{ fontSize: 16 }}>{f.name}</strong>
                  <span className="muted" style={{ fontSize: 13 }}>
                    {f.note}
                  </span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={MAX}
                  step={5}
                  value={vals[f.id]}
                  aria-valuetext={`$${vals[f.id]}`}
                  onChange={(e) => setVals((v) => ({ ...v, [f.id]: Number(e.target.value) }))}
                />
              </label>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, textAlign: "right" }}>
                ${vals[f.id]}
              </span>
            </div>
          ))}
          {type === "zakat" && (
            <p className="muted" style={{ fontSize: 14, marginTop: 12 }}>
              Zakat gifts go only to eligible recipients in our programs.
            </p>
          )}
        </div>
      </section>

      <aside aria-label="Summary" className="card-dark stack" style={{ flex: "1 1 340px", minWidth: 0, gap: 18, position: "sticky", top: 96 }}>
        <strong style={{ fontFamily: "var(--font-display)", fontSize: 24 }}>Your braid</strong>
        <div style={{ display: "flex", height: 14, borderRadius: 999, overflow: "hidden", background: "#46512f" }}>
          {active.map((f) => (
            <span key={f.id} style={{ height: 14, width: `${(vals[f.id] / (subtotal || 1)) * 100}%`, background: f.color }} />
          ))}
        </div>
        <div className="stack" style={{ gap: 10 }}>
          {active.length === 0 && <span style={{ color: "var(--on-dark)" }}>Move a slider to start your gift.</span>}
          {active.map((f) => (
            <div key={f.id} style={{ display: "flex", justifyContent: "space-between", gap: 12, color: "var(--on-dark)" }}>
              <span>{f.name}</span>
              <span>${vals[f.id]}</span>
            </div>
          ))}
        </div>
        <label style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "var(--on-dark)", fontSize: 14, lineHeight: 1.5 }}>
          <input
            type="checkbox"
            checked={coverFees}
            onChange={(e) => setCoverFees(e.target.checked)}
            style={{ width: 20, height: 20, accentColor: "var(--gold)", margin: 0, flex: "none" }}
          />
          Add 3% so 100% of my gift reaches the program
        </label>
        <div style={{ borderTop: "1px solid #46512f", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ color: "var(--on-dark)" }}>Total {freq === "monthly" ? "per month" : "today"}</span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 36, color: "var(--gold)" }}>${total}</span>
        </div>
        <button
          type="button"
          className="btn btn-gold"
          style={{ fontSize: 17, padding: 18 }}
          disabled={total === 0}
          onClick={() => setNotice(true)}
        >
          Continue to payment
        </button>
        {notice && (
          <p role="status" className="notice notice-warn">
            Online checkout is being connected. Thank you for your patience — please check back soon.
          </p>
        )}
        <span style={{ fontSize: 13, color: "#cfcdb8", lineHeight: 1.5 }}>
          Tax-deductible · 501(c)(3). You&apos;ll get a receipt and updates from the programs you chose.
        </span>
      </aside>
    </div>
  );
}
