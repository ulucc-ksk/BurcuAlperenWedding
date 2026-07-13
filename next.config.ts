import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/davet/nikah/demo",
        destination: "/davet/nikah",
        permanent: true
      },
      {
        source: "/davet/nikah-ve-dugun/demo",
        destination: "/davet/nikah-ve-dugun",
        permanent: true
      },
      {
        source: "/davet/nikah-ve-dugun/demo/katilim",
        destination: "/davet/nikah-ve-dugun/katilim",
        permanent: true
      }
    ];
  }
};

export default nextConfig;