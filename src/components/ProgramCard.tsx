import Link from "next/link";
import { pillClass, type Program } from "@/content/site";
import { Icon } from "@/components/Icon";

function linkText(p: Program): string {
  if (p.status === "Active") return "Learn more →";
  if (p.status === "Raising funds") return "Give to The House Fund →";
  return "How to help it open →";
}

export function ProgramCard({ p }: { p: Program }) {
  return (
    <article className="card stack" style={{ gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className={`icon-tile ${p.tint}`}>
          <Icon name={p.icon} size={26} />
        </span>
        <span className={pillClass(p.status)}>{p.status}</span>
      </div>
      <h3 style={{ fontSize: 22 }}>{p.name}</h3>
      <p className="muted" style={{ fontSize: 15, lineHeight: 1.6 }}>
        {p.short}
      </p>
      <Link href={p.page ?? `/programs#${p.slug}`} style={{ marginTop: "auto", fontWeight: 600, fontSize: 15 }}>
        {linkText(p)}
      </Link>
    </article>
  );
}
