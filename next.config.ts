import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: "/Jag_Karnan_Resume.pdf",
        destination: "/api/resume",
      },
    ];
  },
};

export default nextConfig;
