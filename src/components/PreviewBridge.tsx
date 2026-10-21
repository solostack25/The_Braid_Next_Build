"use client";

import { useEffect } from "react";

/**
 * Live preview for the SoloStack Command Center's site editor.
 *
 * Does nothing for normal visitors. Only when this page is shown inside the
 * Command Center (an iframe) and the Command Center says hello does it:
 *  - swap in unsaved text, links and images as you type, outlined in gold;
 *  - in "click to edit" mode, tell the editor what you clicked so it can jump
 *    to that field.
 * It never changes anything saved; reloading shows the real site again.
 */

const ALLOWED = [
  /^https:\/\/siqa-admin\.vercel\.app$/,
  /^https:\/\/siqa-admin-[a-z0-9-]+-solo-stack1\.vercel\.app$/,
  /^http:\/\/localhost:\d+$/,
];

type Pair = { from: string; to: string };

const STYLE = `
[data-cc-changed]{outline:2px dashed #c9a227 !important;outline-offset:3px;border-radius:2px}
[data-cc-hover]{outline:2px solid #5b6fd8 !important;outline-offset:2px;cursor:pointer !important}
`;

export function PreviewBridge() {
  useEffect(() => {
    if (window.parent === window) return;

    let editor: string | null = null;
    let pairs: Pair[] = [];
    let selecting = false;
    const textOrig = new Map<Text, string>();
    const attrOrig = new Map<Element, { attr: string; value: string }>();
    const marked = new Set<Element>();
    let hovered: Element | null = null;

    const send = (msg: object) => {
      if (editor) window.parent.postMessage(msg, editor);
    };

    // A whole text node (or attribute) that equals the old value is swapped.
    // Inside longer text, only long values are swapped, so a short edit like
    // "28" → "30" can't change unrelated numbers elsewhere on the page.
    const swap = (orig: string): string => {
      const trimmed = orig.trim();
      for (const p of pairs) {
        if (!p.from) continue;
        if (trimmed === p.from.trim()) return orig.replace(trimmed, p.to);
      }
      let out = orig;
      for (const p of pairs) {
        if (p.from.length >= 12 && out.includes(p.from)) out = out.split(p.from).join(p.to);
      }
      return out;
    };

    const sameUrl = (a: string, b: string) => {
      try {
        const A = new URL(a, location.href);
        const B = new URL(b, location.href);
        if (A.href === B.href) return true;
        // next/image: /_next/image?url=%2Fuploads%2Fx.png&w=…
        if (A.pathname === "/_next/image") return new URL(A.searchParams.get("url") ?? "", location.href).href === B.href;
      } catch {}
      return false;
    };

    const observer = new MutationObserver((muts) => {
      // React changed something: forget our copy of those nodes and re-apply.
      for (const m of muts) {
        if (m.type === "characterData") textOrig.delete(m.target as Text);
      }
      schedule();
    });

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    function apply() {
      observer.disconnect();
      marked.forEach((el) => el.removeAttribute("data-cc-changed"));
      marked.clear();

      // Restore everything first so edits that were undone disappear.
      textOrig.forEach((orig, node) => {
        if (node.isConnected) node.nodeValue = orig;
      });
      textOrig.clear();
      attrOrig.forEach(({ attr, value }, el) => {
        if (el.isConnected) el.setAttribute(attr, value);
      });
      attrOrig.clear();

      if (pairs.length) {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode() as Text | null; n; n = walker.nextNode() as Text | null) {
          const orig = n.nodeValue ?? "";
          if (!orig.trim()) continue;
          const next = swap(orig);
          if (next !== orig) {
            textOrig.set(n, orig);
            n.nodeValue = next;
            if (n.parentElement) {
              n.parentElement.setAttribute("data-cc-changed", "");
              marked.add(n.parentElement);
            }
          }
        }
        document.querySelectorAll("img[src], a[href]").forEach((el) => {
          const attr = el.tagName === "IMG" ? "src" : "href";
          const value = el.getAttribute(attr) ?? "";
          const p = pairs.find((x) => x.from && sameUrl(value, x.from));
          if (!p) return;
          attrOrig.set(el, { attr, value });
          if (attr === "src") {
            const srcset = el.getAttribute("srcset");
            if (srcset) {
              attrOrig.set(el, { attr: "srcset", value: srcset });
              el.removeAttribute("srcset");
            }
            el.setAttribute("src", new URL(p.to, location.href).href);
          } else el.setAttribute("href", p.to);
          el.setAttribute("data-cc-changed", "");
          marked.add(el);
        });
      }
      observer.observe(document.body, { subtree: true, childList: true, characterData: true });
    }

    const onMessage = (e: MessageEvent) => {
      if (!ALLOWED.some((r) => r.test(e.origin))) return;
      const d = e.data as { type?: string; pairs?: Pair[]; on?: boolean };
      if (d?.type === "cc:hello") {
        editor = e.origin;
        if (!document.getElementById("cc-preview-style")) {
          const s = document.createElement("style");
          s.id = "cc-preview-style";
          s.textContent = STYLE;
          document.head.appendChild(s);
        }
        send({ type: "cc:ready", path: location.pathname });
        return;
      }
      if (e.origin !== editor) return;
      if (d.type === "cc:pairs" && Array.isArray(d.pairs)) {
        pairs = d.pairs.filter((p) => typeof p?.from === "string" && typeof p?.to === "string").slice(0, 500);
        schedule();
      } else if (d.type === "cc:select") {
        selecting = !!d.on;
        if (!selecting && hovered) {
          hovered.removeAttribute("data-cc-hover");
          hovered = null;
        }
      }
    };

    const onOver = (e: MouseEvent) => {
      if (!selecting) return;
      const t = e.target as Element;
      if (hovered && hovered !== t) hovered.removeAttribute("data-cc-hover");
      hovered = t;
      t.setAttribute("data-cc-hover", "");
    };
    const onClick = (e: MouseEvent) => {
      if (!selecting) return;
      e.preventDefault();
      e.stopPropagation();
      const el = e.target as HTMLElement;
      const img = el.closest("img") as HTMLImageElement | null;
      // Both what's on screen now (unsaved edits) and what it was before them.
      const own = Array.from(el.childNodes).filter((n) => n.nodeType === Node.TEXT_NODE) as Text[];
      const texts = [
        ...own.map((n) => n.nodeValue ?? ""),
        ...own.map((n) => textOrig.get(n) ?? ""),
        el.innerText ?? "",
      ]
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t) => t.slice(0, 2000));
      const link = el.closest("a")?.getAttribute("href") ?? undefined;
      send({
        type: "cc:picked",
        texts,
        src: img ? attrOrig.get(img)?.value ?? img.getAttribute("src") : undefined,
        href: link,
      });
    };

    // Tell the editor when the visitor follows a link inside the preview.
    let lastPath = location.pathname;
    const pathTimer = window.setInterval(() => {
      if (location.pathname !== lastPath) {
        lastPath = location.pathname;
        send({ type: "cc:location", path: lastPath });
        schedule();
      }
    }, 400);

    window.addEventListener("message", onMessage);
    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("message", onMessage);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("click", onClick, true);
      window.clearInterval(pathTimer);
      observer.disconnect();
    };
  }, []);

  return null;
}
