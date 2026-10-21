import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old WordPress addresses. (/programs/, /about/ etc. already redirect to
  // their no-slash versions, which is Next.js's default.)
  async redirects() {
    return [{ source: "/resources/contact.html", destination: "/get-help", permanent: true }];
  },
};

export default nextConfig;
