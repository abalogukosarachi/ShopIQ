/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/webp"],
    // Short cache so a replaced photo shows up quickly.
    minimumCacheTTL: 60,
    remotePatterns: [
      // Add real product-image CDN domains here once you source images,
      // e.g. { protocol: 'https', hostname: 'images.yourcdn.com' }
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

module.exports = nextConfig;
