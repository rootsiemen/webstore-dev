/** @type {import('next').NextConfig} */
const nextConfig = {
  // All visuals are local CSS/SVG — no remote image domains needed.
  async redirects() {
    return [
      {
        source: "/services/ecommerce-website",
        destination: "/services/full-stack-web-development",
        permanent: true,
      },
      {
        source: "/packages",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/blog/ecommerce-launch-checklist",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
