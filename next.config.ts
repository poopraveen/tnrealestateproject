import { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'" },
        ],
      },
    ];
  },

  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint warnings during production builds
  },

  eslintConfig: {
    rules: {
      "no-unused-vars": "off",
      "react/prop-types": "off",
    },
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"), // Ensures `@` points to `src/`
    };
    return config;
  },
};

export default nextConfig;
