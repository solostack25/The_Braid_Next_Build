import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap page-hero" style={{ paddingBottom: 96 }}>
      <span className="eyebrow">Page not found</span>
      <h1>This strand came loose.</h1>
      <p className="lead">The page you&apos;re looking for isn&apos;t here.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 12 }}>
        <Link href="/" className="btn btn-olive">Home</Link>
        <Link href="/get-help" className="btn btn-ghost">Get help</Link>
      </div>
    </div>
  );
}
