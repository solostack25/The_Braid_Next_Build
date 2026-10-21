"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Icon } from "@/components/Icon";
import { QuickExit } from "@/components/QuickExit";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <div className="crisis-bar">
        <div className="wrap">
          <span>
            In crisis? Call 911. For a bed tonight call{" "}
            {site.intakePhoneHref ? (
              <a href={site.intakePhoneHref} style={{ color: "var(--white)" }}>
                {site.intakePhone}
              </a>
            ) : (
              site.intakePhone
            )}
            .
          </span>
          <QuickExit />
        </div>
      </div>
      <header className="site-header">
        <nav aria-label="Main" className="wrap">
          <Link href="/" className="brand">
            <Image src="/brand/braid-mark.png" alt="" width={156} height={40} priority />
            <span>THE BRAID INC.</span>
          </Link>
          <div className="nav-links">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
            <Link href="/donate" className="btn btn-gold">
              Donate
            </Link>
          </div>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </nav>
        <div id="mobile-menu" className="mobile-menu" data-open={open}>
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
          <Link href="/donate" className="btn btn-gold">
            Donate
          </Link>
        </div>
      </header>
    </>
  );
}
