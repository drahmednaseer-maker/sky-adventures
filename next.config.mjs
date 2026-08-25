/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [64, 96, 128, 200, 256, 320, 400],
    minimumCacheTTL: 31536000,
  },
  experimental: { optimizePackageImports: [] },
  async redirects() {
    return [
    { source: '/tripgo/blog', destination: '/blog', permanent: true },
    { source: '/tripgo/blog/:path*', destination: '/blog', permanent: true },
    { source: '/tripgo/:path*', destination: '/', permanent: true },
    { source: '/sample-page', destination: '/about-us', permanent: true },
    { source: '/demo', destination: '/', permanent: true },
    { source: '/contact-test', destination: '/contact', permanent: true },
    { source: '/error', destination: '/error-page', permanent: true },
    { source: '/wishlist-2', destination: '/wishlist', permanent: true },
    { source: '/cart-2', destination: '/cart', permanent: true },
    { source: '/checkout-2', destination: '/checkout', permanent: true },
    { source: '/my-account-2', destination: '/my-account', permanent: true },
    { source: '/rx-schedule-email-unsubscribe', destination: '/contact', permanent: true },
    { source: '/privacy-policy', destination: '/privacy-policy-2', permanent: true },
    { source: '/refund_returns', destination: '/refund_returns-2', permanent: true },
    { source: '/feed', destination: '/', permanent: true },
    { source: '/comments/feed', destination: '/', permanent: true },
    { source: '/xmlrpc.php', destination: '/', permanent: true },
    { source: '/wp-json/:path*', destination: '/', permanent: true },
    { source: '/wp-login.php', destination: '/', permanent: true },
    { source: '/wp-admin/:path*', destination: '/', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff2)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};
export default nextConfig;
