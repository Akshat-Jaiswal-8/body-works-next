import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      new URL("https://d2ppnttncjw8dy.cloudfront.net/assets/**"),
    ],
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
