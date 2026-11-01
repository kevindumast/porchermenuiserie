import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Les URLs des photos sont stables (versionnées par ?v=), on peut garder
    // les versions optimisées longtemps et éviter des retransformations.
    minimumCacheTTL: 60 * 60 * 24 * 31,
    // Une seule qualité autorisée : sinon chaque ?q= demandé à /_next/image
    // compte comme une transformation de plus.
    qualities: [75],
    // Sans 2048 ni 3840 : moins de variantes par photo, assez net pour un site vitrine.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "bvzuxkvjvnhxlczxqjab.supabase.co",
      },
      {
        protocol: "https",
        hostname: "pnsaquisjdsyfiqmqxph.supabase.co",
      },
    ],
  },
};

export default nextConfig;
