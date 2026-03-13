import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // Suporte para deploy Docker/Self-Hosted (remoção de Vercel)
};

export default nextConfig;
