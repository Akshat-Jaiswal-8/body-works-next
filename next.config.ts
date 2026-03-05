import type { NextConfig } from 'next';

import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [new URL('https://d2ppnttncjw8dy.cloudfront.net/assets/**')],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,

  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['motion', 'lucide-react'],
  },
};

export default withBundleAnalyzer(nextConfig);
