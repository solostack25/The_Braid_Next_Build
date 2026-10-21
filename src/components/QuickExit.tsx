"use client";

import { useEffect } from "react";

/**
 * Leaves the site fast for someone who may be watched. Replaces this page in
 * history (so Back doesn't return here) and goes to a neutral site.
 * Pressing Esc twice within a second does the same.
 */
export function leaveNow() {
  document.body.style.display = "none";
  window.location.replace("https://www.google.com/search?q=weather");
}

export function QuickExit({ label = "Quick exit", className = "btn btn-exit" }: { label?: string; className?: string }) {
  return (
    <a
      href="https://www.google.com/search?q=weather"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        leaveNow();
      }}
    >
      {label}
    </a>
  );
}

export function EscapeShortcut() {
  useEffect(() => {
    let last = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const now = Date.now();
      if (now - last < 1000) leaveNow();
      last = now;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}
