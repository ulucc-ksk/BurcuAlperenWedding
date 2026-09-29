import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/davet/:path*",
        destination: "/",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
