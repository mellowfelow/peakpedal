/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // Vercel's Image Optimization is disabled: the Hobby plan's monthly transform
  // quota runs out and then every `next/image` returns HTTP 402 with a blank
  // image (which is exactly what happened in production). This is a small catalog
  // of already-web-sized webp files, so serving them straight from the CDN —
  // no optimizer, no quota — is the right call. Source images are kept small by
  // scripts/images.mjs + scripts/gen-brand-images.mjs.
  images: {
    unoptimized: true,
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
