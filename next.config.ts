import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    qualities: [60, 75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pplr1yqdlwhx3zqh.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
