import type { Metadata } from "next";
import { Suspense } from "react";
import { SplitGift } from "@/components/SplitGift";

export const metadata: Metadata = {
  title: "Donate",
  description: "Split one gift across The Braid's programs — monthly or one time, General, Sadaqah or Zakat.",
};

export default function DonatePage() {
  return (
    <div className="wrap stack" style={{ gap: 40, paddingBottom: 96 }}>
      <div className="page-hero" style={{ maxWidth: 720 }}>
        <span className="eyebrow">Weave your gift</span>
        <h1>Choose where every dollar goes.</h1>
        <p className="lead">Split one gift across our programs — or leave it with us for wherever the need is greatest.</p>
      </div>
      <Suspense fallback={<div className="card" style={{ minHeight: 400 }} />}>
        <SplitGift />
      </Suspense>
    </div>
  );
}
