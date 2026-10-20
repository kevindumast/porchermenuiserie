import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Les URLs des photos sont stables (versionnées par ?v=), on peut garder
    // les versions optimisées longtemps et éviter des retransformations.
    minimumCacheTTL: 60 * 60 * 24 * 31,
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
