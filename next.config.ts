import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
