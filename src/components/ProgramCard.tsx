import Link from "next/link";
import type { Program } from "@/content/site";
import { Icon } from "@/components/Icon";

export function ProgramCard({ p }: { p: Program }) {
  return (
    <article className="card stack" style={{ gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className={`icon-tile ${p.tint}`}>
          <Icon name={p.icon} size={26} />
        </span>
        <span className={`pill ${p.status === "Active" ? "pill-active" : "pill-soon"}`}>{p.status}</span>
      </div>
      <h3 style={{ fontSize: 22 }}>{p.name}</h3>
      <p className="muted" style={{ fontSize: 15, lineHeight: 1.6 }}>
        {p.short}
      </p>
      <Link href={`/programs#${p.slug}`} style={{ marginTop: "auto", fontWeight: 600, fontSize: 15 }}>
        {p.status === "Active" ? "Learn more →" : "How to help it open →"}
      </Link>
    </article>
  );
}
