import Image from "next/image";
import Link from "next/link";
import { programs, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="stack" style={{ gap: 12 }}>
            <span style={{ background: "var(--cream)", borderRadius: 14, padding: 14, alignSelf: "flex-start" }}>
              <Image
                src="/brand/braid-logo-full.png"
                alt="The Braid Inc. — Rest, Recover, Rise"
                width={200}
                height={99}
              />
            </span>
            <span>
              {site.facility.line1}
              <br />
              {site.facility.line2}
            </span>
            <span>
              Admin office: {site.office.line1}
              <br />
              {site.office.line2}
            </span>
          </div>
          <div className="stack" style={{ gap: 10 }}>
            <strong style={{ color: "var(--white)" }}>Programs</strong>
            {programs.map((p) => (
              <Link key={p.slug} href={`/programs#${p.slug}`}>
                {p.name}
              </Link>
            ))}
          </div>
          <div className="stack" style={{ gap: 10 }}>
            <strong style={{ color: "var(--white)" }}>Get involved</strong>
            <Link href="/donate">Donate</Link>
            <Link href="/volunteer">Volunteer</Link>
            <Link href="/volunteer#partner">Partner with us</Link>
            <Link href="/about">About us</Link>
          </div>
          <div className="stack" style={{ gap: 10 }}>
            <strong style={{ color: "var(--white)" }}>Need help?</strong>
            <Link href="/get-help">Get help now</Link>
            <Link href="/resources">Crisis lines & resources</Link>
            <span>Call or text 988 any time.</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} The Braid Inc · 501(c)(3) nonprofit · EIN {site.ein}
          </span>
          <span>Rest · Recover · Rise</span>
        </div>
      </div>
    </footer>
  );
}
