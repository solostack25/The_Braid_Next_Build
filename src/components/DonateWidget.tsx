"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const AMOUNTS = [25, 50, 100, 250];

/** Homepage gift picker. Hands the choice to /donate, where checkout happens. */
export function DonateWidget() {
  const router = useRouter();
  const [freq, setFreq] = useState<"monthly" | "once">("monthly");
  const [amount, setAmount] = useState<number>(50);
  const [other, setOther] = useState("");

  const otherNum = Number(other.replace(/[^0-9.]/g, ""));
  const chosen = other && otherNum > 0 ? Math.round(otherNum) : amount;

  return (
    <form
      className="card stack"
      style={{ gap: 20, padding: 32, boxShadow: "0 20px 50px rgba(47,58,31,0.08)" }}
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/donate?amount=${chosen}&freq=${freq}`);
      }}
    >
      <div className="stack" style={{ gap: 6 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26 }}>Hold a strand for someone</span>
        <span className="muted" style={{ fontSize: 15 }}>
          $35 covers one night of safe, supported housing.
        </span>
      </div>
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
        <input
          className="input"
          inputMode="decimal"
          placeholder="$"
          value={other}
          onChange={(e) => setOther(e.target.value)}
        />
      </label>
      <button type="submit" className="btn btn-gold" style={{ fontSize: 17, padding: 18 }}>
        Give ${chosen}
        {freq === "monthly" ? " / month" : ""}
      </button>
      <span className="muted" style={{ fontSize: 13, textAlign: "center" }}>
        The Braid Inc is a 501(c)(3). Gifts are tax-deductible.
      </span>
    </form>
  );
}
