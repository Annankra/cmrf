import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import dns from "node:dns";

// Force IPv4-first resolution for Vercel IPv4-only build containers
try {
  dns.setDefaultResultOrder("ipv4first");
} catch {
  // ignore
}

const nextConfig: NextConfig = {
  devIndicators: false,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://js.paystack.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://images.unsplash.com https://images.squarespace-cdn.com https://*.public.blob.vercel-storage.com; frame-src 'self' https://js.stripe.com https://checkout.paystack.com https://maps.google.com https://www.google.com; connect-src 'self' https://api.stripe.com https://api.paystack.co https://umiff0vttpz6cxtl.public.blob.vercel-storage.com;",
          },
        ],
      },
      {
        // Only cache static assets, not /api routes (which serve dynamic media from Blob)
        source: "/:path((?!api/).*)\\.(jpg|jpeg|png|webp|avif|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig);
