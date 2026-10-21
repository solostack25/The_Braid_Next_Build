"use client";

import { useEffect } from "react";

/**
 * Live preview for the SoloStack Command Center's site editor.
 *
 * Does nothing for normal visitors. Only when this page is shown inside the
 * Command Center (an iframe) and the Command Center says hello does it:
 *  - swap in unsaved text, links and images as you type, outlined in gold;
 *  - in "click to edit" mode, tell the editor what you clicked so it can jump
 *    to that field. Images (including ones behind text, and empty photo slots
 *    marked with data-cc-image="<description>") get a "Change image" badge.
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
[data-cc-hover-img]{outline:3px solid #c9a227 !important;outline-offset:-3px;cursor:pointer !important}
#cc-img-badge{position:fixed;z-index:2147483647;pointer-events:none;background:#c9a227;color:#1a1a1a;font:600 12px/1 system-ui,sans-serif;padding:6px 9px;border-radius:999px;box-shadow:0 2px 8px rgba(0,0,0,.3)}
`;

export function PreviewBridge() {
  useEffect(() => {
    if (window.parent === window) return;

    let editor: string | null = null;
    let pairs: Pair[] = [];
    let selecting = false;
    const textOrig = new Map<Text, string>();
    const attrOrig = new Map<Element, { attr: string; value: string }[]>();
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
      attrOrig.forEach((list, el) => {
        if (el.isConnected) for (const { attr, value } of list) el.setAttribute(attr, value);
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
          const list = [{ attr, value }];
          attrOrig.set(el, list);
          if (attr === "src") {
            const srcset = el.getAttribute("srcset");
            if (srcset) {
              list.push({ attr: "srcset", value: srcset });
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
        if (!selecting) clearHover();
      }
    };

    const origSrc = (img: Element) => attrOrig.get(img)?.find((a) => a.attr === "src")?.value ?? img.getAttribute("src") ?? undefined;
    const ownText = (el: Element) =>
      Array.from(el.childNodes).some((n) => n.nodeType === Node.TEXT_NODE && (n.nodeValue ?? "").trim());

    // The image the pointer is on, if it's on one: a photo slot, an <img>, or
    // a CSS background, even underneath an overlay. Text wins over an image
    // behind it, so headings on a photo still edit the heading.
    type Hit = { el: Element; src?: string; alt?: string };
    const imageAt = (x: number, y: number, target: Element): Hit | null => {
      const slot = target.closest("[data-cc-image]");
      if (slot && (!ownText(target) || target.closest("[data-cc-image-label]"))) {
        const img = slot.querySelector("img");
        return { el: slot, src: img ? origSrc(img) : undefined, alt: slot.getAttribute("data-cc-image") || undefined };
      }
      if (ownText(target)) return null;
      for (const el of document.elementsFromPoint(x, y)) {
        if (el === document.body || el === document.documentElement) break;
        if (el.id === "cc-img-badge") continue;
        if (el.tagName === "IMG") {
          const s = el.closest("[data-cc-image]");
          // Outline the photo's box when it has one (the <img> itself is often clipped).
          return { el: s ?? el, src: origSrc(el), alt: s?.getAttribute("data-cc-image") || (el as HTMLImageElement).alt || undefined };
        }
        if (el.matches("[data-cc-image]")) {
          const img = el.querySelector("img");
          return { el, src: img ? origSrc(img) : undefined, alt: el.getAttribute("data-cc-image") || undefined };
        }
        const bg = getComputedStyle(el).backgroundImage;
        const m = bg && bg !== "none" ? /url\(["']?([^"')]+)["']?\)/.exec(bg) : null;
        if (m && !m[1].startsWith("data:")) return { el, src: m[1] };
      }
      return null;
    };

    let badge: HTMLDivElement | null = null;
    let hoveredImg: Element | null = null;
    const clearHover = () => {
      hovered?.removeAttribute("data-cc-hover");
      hoveredImg?.removeAttribute("data-cc-hover-img");
      hovered = hoveredImg = null;
      badge?.remove();
      badge = null;
    };
    const showBadge = (el: Element) => {
      if (!badge) {
        badge = document.createElement("div");
        badge.id = "cc-img-badge";
        badge.textContent = "📷 Change image";
        document.body.appendChild(badge);
      }
      const r = el.getBoundingClientRect();
      badge.style.left = `${Math.max(8, Math.min(r.right - 150, innerWidth - 150))}px`;
      badge.style.top = `${Math.max(8, Math.min(r.top + 10, innerHeight - 36))}px`;
    };

    const onOver = (e: MouseEvent) => {
      if (!selecting) return;
      const t = e.target as Element;
      if (t.id === "cc-img-badge") return;
      const hit = imageAt(e.clientX, e.clientY, t);
      if (hit) {
        if (hoveredImg === hit.el) return showBadge(hit.el);
        clearHover();
        hoveredImg = hit.el;
        hit.el.setAttribute("data-cc-hover-img", "");
        showBadge(hit.el);
        return;
      }
      if (hovered === t && !hoveredImg) return;
      clearHover();
      hovered = t;
      t.setAttribute("data-cc-hover", "");
    };
    const onClick = (e: MouseEvent) => {
      if (!selecting) return;
      e.preventDefault();
      e.stopPropagation();
      const el = e.target as HTMLElement;
      const hit = imageAt(e.clientX, e.clientY, el);
      if (hit) {
        send({ type: "cc:picked", src: hit.src, imageAlt: hit.alt });
        return;
      }
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
      send({ type: "cc:picked", texts, href: link });
    };
    const onScroll = () => hoveredImg && showBadge(hoveredImg);

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
    window.addEventListener("scroll", onScroll, true);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      badge?.remove();
      window.removeEventListener("message", onMessage);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("click", onClick, true);
      window.clearInterval(pathTimer);
      observer.disconnect();
    };
  }, []);

  return null;
}
