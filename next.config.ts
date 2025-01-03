import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: { remotePatterns: [{ hostname: "ui-avatars.com" }] },
};

export default nextConfig;
