"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { hasIntakeLine, nav, programs, supportLine } from "@/content/site";
import { Icon } from "@/components/Icon";
import { QuickExit } from "@/components/QuickExit";

/** Links shown under "Programs" in the menu. */
const programLinks = [
  ...programs.map((p) => ({ href: p.page ?? `/programs/${p.slug}`, label: p.name })),
  { href: "/case-management", label: "Case management" },
];

function ProgramsMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = pathname === "/programs" || pathname.startsWith("/programs/") || pathname === "/case-management";

  return (
    <div
      ref={ref}
      className="nav-dropdown"
      data-open={open}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="nav-dropdown-btn"
        aria-expanded={open}
        aria-controls="programs-menu"
        aria-current={active ? "page" : undefined}
        onClick={() => setOpen((o) => !o)}
      >
        Programs <span aria-hidden="true" className="nav-caret">▾</span>
      </button>
      <div id="programs-menu" className="nav-dropdown-panel">
        {programLinks.map((l) => (
          <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined}>
            {l.label}
          </Link>
        ))}
        <Link href="/programs" className="nav-dropdown-all">
          All programs →
        </Link>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <div className="crisis-bar">
        <div className="wrap">
          <span>
            In crisis? Call 911.{" "}
            {hasIntakeLine ? "For support call " : "For 24/7 support, call or text "}
            <a href={supportLine.href} style={{ color: "var(--white)", fontWeight: 600 }}>
              {supportLine.label}
            </a>
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
            {nav.map((n) =>
              n.href === "/programs" ? (
                <ProgramsMenu key={n.href} pathname={pathname} />
              ) : (
                <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined}>
                  {n.label}
                </Link>
              ),
            )}
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
          {nav.map((n) =>
            n.href === "/programs" ? (
              <div key={n.href} className="mobile-sub">
                <Link href="/programs" aria-current={pathname === "/programs" ? "page" : undefined}>
                  Programs
                </Link>
                {programLinks.map((l) => (
                  <Link key={l.href} href={l.href} className="mobile-sub-link" aria-current={pathname === l.href ? "page" : undefined}>
                    {l.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined}>
                {n.label}
              </Link>
            ),
          )}
          <Link href="/donate" className="btn btn-gold">
            Donate
          </Link>
        </div>
      </header>
    </>
  );
}
