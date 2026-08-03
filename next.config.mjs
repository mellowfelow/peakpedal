/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 768, 1024, 1280, 1920],
    imageSizes: [128, 256, 384],
  },
  async redirects() {
    return [
      // Bosch PowerMore and Kiox 300 moved from /products/ into the new
      // /accessories/ section (Part 5) — keep the old URLs resolving.
      { source: '/products/bosch-powermore-range-extender', destination: '/accessories/bosch-powermore-250-range-extender', permanent: true },
      { source: '/products/bosch-kiox-300-display', destination: '/accessories/bosch-kiox-300-display', permanent: true },
    ];
  },
};

export default nextConfig;
