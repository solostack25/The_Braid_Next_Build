import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How The Braid Inc collects, uses and protects your information.",
};

export default function PrivacyPage() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <div className="page-hero" style={{ maxWidth: 760 }}>
        <span className="eyebrow">Privacy</span>
        <h1>Your privacy matters to us.</h1>
        <p className="muted">Last updated November 2026</p>
      </div>
      <div className="prose" style={{ marginTop: 16 }}>
        <p>
          The Braid Inc serves people at hard moments in their lives. Protecting what you share with us is part of
          treating you with dignity. This page explains what we collect and how we use it.
        </p>

        <h2>If you&apos;re asking for help</h2>
        <p>
          Requests for help go through our secure intake site. Only The Braid&apos;s case managers can see them. We use
          what you share to contact you and to help you, and we only share it with partner agencies when you agree to
          it — or where the law requires it, such as to protect someone from serious harm.
        </p>
        <p>
          If someone else uses your phone or computer, use a private browsing window, or call us instead. The Quick exit
          button (or pressing Esc twice) takes you away from this site fast.
        </p>

        <h2>If you give</h2>
        <p>
          Donations are processed by a secure payment provider. We don&apos;t store your full card number. We keep your
          name, contact details and gift history to send receipts and, if you choose, updates about our work.
        </p>

        <h2>If you email us or sign up for updates</h2>
        <p>
          We use your contact details to reply and to send the updates you asked for. Every email includes a way to
          unsubscribe.
        </p>

        <h2>What we never do</h2>
        <ul>
          <li>We never sell or rent your information.</li>
          <li>We never share the identity of the people we serve in our marketing without their written consent.</li>
        </ul>

        <h2>Website analytics</h2>
        <p>
          We may use basic analytics to understand how many people visit our pages and which ones are useful. This
          doesn&apos;t identify you personally.
        </p>

        <h2>Questions or requests</h2>
        <p>
          To ask what information we hold about you, or to have it corrected or deleted, email{" "}
          <strong>{site.email}</strong> or write to us at {site.office.line1}, {site.office.line2}.
        </p>
      </div>
    </div>
  );
}
